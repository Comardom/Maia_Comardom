<script setup lang="ts">
import PlasticThemeToggleIsland from "../../PlasticThemeToggleIsland.vue";
import { useThemeObserver } from "../../../utils/useThemeObserver.ts";
import { computed } from "vue";
import { logoMap } from "../../../utils/logoMap.ts";
import { useBreathingMode } from "./scripts/useBreathingMode.ts";
import UmbrellaMenu from "./UmbrellaMenu.vue";
import { useMediaQuery } from "../../../utils/useMediaQuery";

const { isDark } = useThemeObserver();
const logoSrc = computed(() => logoMap[isDark.value ? 'dark' : 'light']);
const { breathingClasses } = useBreathingMode(isDark);

// 媒体查询 ref
const isMobile = useMediaQuery('(max-width: 48rem)');
</script>

<template>
	<header :class="isDark ? 'dark' : ''" :data-theme="isDark ? 'dark' : 'light'">
		<div :class="['top-bar', isDark ? 'dark' : 'light', ...breathingClasses]">
			
			<!-- 桌面端：保持原布局 -->
			<div v-if="!isMobile" class="top-bar-content desktop">
				<div class="logo-title-wrapper">
					<a href=""><img :src="logoSrc" alt="logo" class="logo" /></a>
					<span class="title-text">河南大学网站工作室</span>
				</div>
				<div class="theme-toggle-wrapper">
					<a href="/nihilum" id="forum">前往论坛</a>
					<PlasticThemeToggleIsland client:load />
				</div>
			</div>
			
			<!-- 移动端：左右固定宽度，logo 居中 -->
			<div v-else class="top-bar-content mobile">
				<div class="actions-left">
					<PlasticThemeToggleIsland client:load />
				</div>
				<div class="center">
					<a href=""><img :src="logoSrc" alt="logo" class="logo" /></a>
				</div>
				<div class="actions-right">
					<UmbrellaMenu client:load forumUrl="/nihilum" examUrl="/nihilum" deptHubUrl="/nihilum" />
				</div>
			</div>
		
		</div>
	</header>
</template>

<style scoped>
/* 呼吸动画（保持） */
@keyframes breathe-height { 0%,100%{transform:scaleY(1)} 50%{transform:scaleY(1.07)} }
@keyframes breathe-dark   { 0%,100%{filter:brightness(0.9)} 50%{filter:brightness(1.09)} }
@keyframes breathe-light  { 0%,100%{filter:brightness(1)} 50%{filter:brightness(0.89)} }
.breathe-stretch{animation:breathe-height 4.75s ease-in-out infinite; transform-origin:top center;}
.breathe-dark{animation:breathe-dark 4.75s ease-in-out infinite;}
.breathe-light{animation:breathe-light 4.75s ease-in-out infinite;}
/* 基线 */
.top-bar {
	position: fixed;
	top: 0; left: 0; width: 100%;
	min-height: 3rem;
	padding: .3rem 1rem;
	font-size: 1rem;
	z-index: 1000;
	display: flex;
	align-items: center;
	transition: background-color .3s, color .3s;
	border-bottom: 1px solid rgba(20,20,20,.2);
	box-sizing: border-box;
}
.top-bar.light { background:#f5f5f5; color:#333; }
.top-bar.dark  { background:#2c2c2c; color:#f0f0f0; }
#forum{
	padding-right: 1rem;
	margin-right: 1rem;
	font-size: 0.8rem;
	padding-top:0.1rem;
}
a {
	color: inherit; /* 继承父元素的文本颜色 */
	text-decoration: none; /* 移除下划线 */
}

a:hover, /* 鼠标悬停时的样式 */
a:visited, /* 访问过的链接样式 */
a:active, /* 链接被点击时的样式 */
a:link { /* 未访问过的链接样式 */
	color: inherit; /* 再次确保继承颜色 */
	text-decoration: none; /* 再次确保没有下划线 */
}
/* desktop layout: 保持你原来的样式 */
.top-bar-content { width:100%; display:flex; align-items:center; justify-content:space-between; }

/* 桌面 logo 部分 */
.logo-title-wrapper { display:flex; align-items:center; gap:1rem; }
.logo { height:3rem; width:auto; }
.title-text { font-weight:600; letter-spacing:.125rem; }

/* 移动布局：固定两侧宽度，中央自适应，使 logo 真正居中且两侧按钮不会挤出 */
.mobile {
	display: grid;
	grid-template-columns: 56px 1fr 56px; /* <- 两侧固定宽度（可根据按钮尺寸微调） */
	align-items: center;
	column-gap: .5rem;
	padding: 0 .8rem; /* 保证内间距 */
	width:100%;
	box-sizing:border-box;
}
.actions-left, .actions-right {
	width:56px;                 /* 与 grid 列相匹配 */
	display:flex;
	align-items:center;
	justify-content:center;     /* 居中显示按钮（防止靠边） */
}
.center { justify-self:center; display:flex; align-items:center; }
.center .logo { height:3rem; }

/* 隐藏桌面容器（当屏幕窄）——我们通过 v-if 二分模板，但加上保险 */
@media (max-width:48rem) {
	.desktop { display:none !important; }
}
</style>
