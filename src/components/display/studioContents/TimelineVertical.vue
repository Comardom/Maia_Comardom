<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import type { TimelineEvent } from './scripts/timelineData'
import { useThemeObserver } from '../../../utils/useThemeObserver'

/**
 * Props: events - array of timeline events
 */
const props = defineProps<{ events: { year: string; title: string; description: string }[] }>()

// 主题：选择配色
const { isDark } = useThemeObserver()

// refs
const container = ref<HTMLElement | null>(null)
const line = ref<HTMLElement | null>(null)

// 颜色计算属性
// 使用更通用的颜色名称
const verticalLineColor = computed(() => (isDark.value ? '#E6EEF8' : '#0b3d91'));
const vnodeBgColor = computed(() => (isDark.value ? 'rgba(255, 255, 255, 0.08)' : '#fff'));
const vnodeShadow = computed(() => (isDark.value ? 'none' : '0 6px 18px rgba(9,30,66,0.06)'));
const vnodeTextColor = computed(() => (isDark.value ? '#E6EEF8' : '#333'));
const vnodeDescColor = computed(() => (isDark.value ? 'rgba(230,238,248,0.85)' : 'rgba(0,0,0,0.65)'));


// 动画：在 mount 时触发从 0 到 100% 高度的过渡
onMounted(() => {
	// small delay for smoother effect
	requestAnimationFrame(() => {
		if (line.value) {
			line.value.style.height = '100%'
			line.value.style.transition = 'height 1.2s ease-out'
		}
	})
})

onUnmounted(() => {
	if (line.value) {
		line.value.style.height = '0'
	}
})

// 监听主题变化，强制重新应用颜色
watch(isDark, () => {
	// 当主题变化时，可以重新渲染或强制样式更新
	// 由于样式现在是计算属性，Vue 会自动处理
	// 这里可以放一些其他需要手动触发的逻辑
});

</script>

<template>
	<div ref="container" class="vertical-root" :data-theme="isDark ? 'dark' : 'light'">
		<div class="vertical-inner">
			<!-- 左侧的竖线 -->
			<div class="vertical-line-wrap">
				<div ref="line" class="vertical-line" :style="{ backgroundColor: verticalLineColor }"></div>
			</div>
			
			<!-- 右侧的节点列表 -->
			<div class="vertical-list">
				<div v-for="(ev, i) in props.events" :key="i" class="vnode"
				     :style="{
                    backgroundColor: vnodeBgColor,
                    boxShadow: vnodeShadow
                }"
				>
					<div class="vnode-year" :style="{ color: vnodeTextColor }">{{ ev.year }}</div>
					<div class="vnode-title" :style="{ color: vnodeTextColor }">{{ ev.title }}</div>
					<!--                <div class="vnode-desc" :style="{ color: vnodeDescColor }">{{ ev.description }}</div>-->
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.vertical-root {
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	overflow: auto;
	-webkit-overflow-scrolling: touch;
	padding-inline: 1rem;
	padding-top: 0.5rem;
}

/* 调整 inner 容器以支持绝对定位的线条 */
.vertical-inner {
	position: relative;
	display: flex;
	align-items: flex-start;
	height: 100%;
	box-sizing: border-box;
}

/* 线条使用绝对定位，使其在节点列表的后方 */
.vertical-line-wrap {
	width: 36px;
	display: flex;
	justify-content: center;
	position: absolute;
	height: 100%;
	top: 0;
	left: 0;
	z-index: 0; /* 确保线在节点后面 */
}
.vertical-line {
	width: 4px;
	border-radius: 2px;
	height: 0; /* 动画从 0 到 100% */
	transition: height 1.2s ease-out;
}

/* 节点列表 */
.vertical-list {
	flex: 1 1 auto;
	display: flex;
	flex-direction: column;
	/* 压缩节点间距 */
	gap: 0.5rem;
	padding-bottom: 2rem;
	/* 确保列表内容不会与线重叠 */
	margin-left: 36px;
	z-index: 1; /* 确保节点在前面 */
}

/* 压缩节点高度 */
.vnode {
	padding: .3rem .5rem;
	border-radius: 8px;
	transition: all 0.3s ease;
}

/* 压缩字体大小 */
.vnode-year { font-weight:700; font-size:.8rem; margin-bottom: .15rem; }
.vnode-title { font-weight:600; font-size:.8rem; margin-bottom:.15rem; }
.vnode-desc { font-size:0.7rem; line-height:1.25; }

</style>
