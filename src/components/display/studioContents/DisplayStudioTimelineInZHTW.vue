<!-- 文件: src/components/display/studioContents/DisplayStudioTimeline.vue -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useThemeObserver } from '../../../utils/useThemeObserver'
import { useMediaQuery } from '../../../utils/useMediaQuery'
import TimelineSnake from './TimelineSnake.vue'
import TimelineVertical from './TimelineVertical.vue'
import { timelineEvents } from './scripts/timelineDataInZHTW.ts'

const { isDark } = useThemeObserver()
const isMobile = useMediaQuery('(max-width: 48rem)')
const events = ref(timelineEvents)

/** 用于强制子组件重播（变更 key 重新挂载） */
const replayKey = ref(0)

/** 确保动画只播放一次的标志 */
const hasPlayedOnce = ref(false)

/** SSR 首帧“遮罩”：默认隐藏，直到真正滚到时间轴这个区块再显示 */
const isRevealed = ref(false)

let observer: MutationObserver | null = null
const TIMELINE_SECTION_INDEX = '3'

/** 防抖：避免短时间内重复触发重播 */
let isAnimationTriggered = false

function triggerAnimationReplay() {
	if (isAnimationTriggered) return
	isAnimationTriggered = true
	// 让“淡入显示”的样式先应用一帧，再开始子组件入场动画，避免视觉竞争
	requestAnimationFrame(() => {
		replayKey.value++
	})
}

function resetAnimationState() {
	isAnimationTriggered = false
}

function revealIfNeeded(section: string | null) {
	if (section === TIMELINE_SECTION_INDEX) {
		// 新增判断：如果该区域尚未显示且动画从未播放过
		if (!isRevealed.value && !hasPlayedOnce.value) {
			// 先显示外壳，再触发内部动画
			isRevealed.value = true
			// 等样式应用后再重播（两次 rAF 更保险）
			requestAnimationFrame(() => {
				requestAnimationFrame(() => triggerAnimationReplay())
			})
			// 动画首次触发后，设置标志为 true
			hasPlayedOnce.value = true
		} else {
			// 已经显示过，可能是二次进入，仅触发重播
			// triggerAnimationReplay()
			// 如果已经显示过或动画已播放，则不再进行任何操作
			// 如果你希望在“二次进入”时仍能显示容器，可以保留 isRevealed.value = true，但动画不会重播
		}
	} else {
		// 离开：重置触发器，允许下次再触发
		resetAnimationState()
		// 如果你希望“离开就隐藏外壳”，取消下面注释即可（通常没必要）
		// isRevealed.value = false
	}
}

onMounted(() => {
	if (typeof window === 'undefined') return
	
	const targetNode = document.getElementById('snap-state')
	if (!targetNode) {
		console.warn('Snap state element (#snap-state) not found.')
		return
	}
	
	// 初始检查：如果进来时就停在第 3 屏，立刻显示并触发动画
	const initialSection = targetNode.getAttribute('data-current-section')
	revealIfNeeded(initialSection)
	
	// 监听 data-current-section 的变化
	const callback: MutationCallback = (mutationsList) => {
		for (const mutation of mutationsList) {
			if (mutation.type === 'attributes' && mutation.attributeName === 'data-current-section') {
				const currentSection = (mutation.target as HTMLElement).getAttribute('data-current-section')
				revealIfNeeded(currentSection)
			}
		}
	}
	
	observer = new MutationObserver(callback)
	observer.observe(targetNode, { attributes: true })
})

onUnmounted(() => {
	observer?.disconnect()
})
</script>

<template>
	<!--
	  关键：SSR 首帧就隐藏（opacity/visibility/pointer-events）
	  仅当 isRevealed = true 时才淡入显示，并开始内部动画
	-->
	<section
		class="timeline-root"
		:data-theme="isDark ? 'dark' : 'light'"
		:aria-hidden="!isRevealed"
		:style="{
      opacity: isRevealed ? '1' : '0',
      visibility: isRevealed ? 'visible' : 'hidden',
      pointerEvents: isRevealed ? 'auto' : 'none',
      transition: 'opacity 380ms ease, visibility 0s linear ' + (isRevealed ? '0ms' : '380ms')
    }"
	>
		<div class="timeline-inner">
			<TimelineSnake v-if="!isMobile" :events="events" :key="'snake-' + replayKey" />
			<TimelineVertical v-else :events="events" :key="'vertical-' + replayKey" />
		</div>
	</section>
</template>

<style scoped>
/* 容器尺寸与裁剪 */
.timeline-root {
	width: 100vw;
	height: 100vh;
	box-sizing: border-box;
	overflow: hidden;
	padding-top: 4rem;
	background: transparent;
	will-change: opacity; /* 提升淡入流畅度 */
}

.timeline-inner {
	width: 100%;
	height: 100%;
	position: relative;
	box-sizing: border-box;
	overflow: hidden;
}
</style>
