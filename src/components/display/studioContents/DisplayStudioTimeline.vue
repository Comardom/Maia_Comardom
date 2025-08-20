<script setup lang="ts">
import { ref } from 'vue'
import { useThemeObserver } from '../../../utils/useThemeObserver'
import { useMediaQuery } from '../../../utils/useMediaQuery'
import TimelineSnake from './TimelineSnake.vue'
import TimelineVertical from './TimelineVertical.vue'
import { timelineEvents } from './scripts/timelineData'

// 主题（为了在组件内选择颜色）
const { isDark } = useThemeObserver()

// 媒体查询（你已有的工具）
const isMobile = useMediaQuery('(max-width: 48rem)')

// 事件数据（来自脚本文件，便于日后修改）
const events = ref(timelineEvents)
</script>

<template>
	<section class="timeline-root" :data-theme="isDark ? 'dark' : 'light'">
		<!-- 4rem 顶部出血（padding） -->
		<div class="timeline-inner">
			<!-- 桌面：蛇形；移动端：竖向（v-if 实现分离） -->
			<TimelineSnake v-if="!isMobile" :events="events" />
			<TimelineVertical v-else :events="events" />
		</div>
	</section>
</template>

<style scoped>
/* 根容器：占满屏幕高度，不出现滚动条；留 4rem 出血 */
.timeline-root {
	width: 100vw;
	height: 100vh;          /* 填满视口，且你的 layout 已经用 overflow:hidden */
	box-sizing: border-box;
	overflow: hidden;       /* 禁止出现滚动条 */
	padding-top: 4rem;      /* 顶部出血（你的要求） */
	background: transparent;
}

/* 内部区域用于放置 SVG 或竖线，并确保不会溢出 */
.timeline-inner {
	width: 100%;
	height: calc(100% - 0px);
	position: relative;
	box-sizing: border-box;
	overflow: hidden;
}
</style>
