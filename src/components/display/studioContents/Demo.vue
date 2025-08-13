<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from "vue"
import PlasticThemeToggleIsland from "../../PlasticThemeToggleIsland.vue"
import { useThemeObserver } from "../../../utils/useThemeObserver.ts"
import { logoMap } from "../../../utils/logoMap.ts"

const { isDark } = useThemeObserver()
const logoSrc = computed(() => logoMap[isDark.value ? 'dark' : 'light'])

// 是否在页面最顶端
const atTop = ref(true)

const onScroll = () => {
	atTop.value = window.scrollY === 0
}

onMounted(() => {
	window.addEventListener("scroll", onScroll)
	onScroll()
})
onUnmounted(() => {
	window.removeEventListener("scroll", onScroll)
})
</script>

<template>
	<header
		:class="[isDark ? 'dark' : 'light', atTop ? 'at-top' : 'away-from-top']"
		:data-theme="isDark ? 'dark' : 'light'"
	>
		<div class="top-bar">
			<div class="top-bar-content">
				<div class="logo-title-wrapper">
					<a href="">
						<img :src="logoSrc" alt="logo" class="logo" />
					</a>
					<span class="title-text">河南大学网站工作室</span>
				</div>
				<div class="theme-toggle-wrapper">
					<PlasticThemeToggleIsland client:load />
				</div>
			</div>
		</div>
	</header>
</template>

<style scoped>
/* 统一呼吸节奏：0%→50%→100% */
@keyframes breath {
	0%, 100% {
		--scale: 1;
		--height: 3rem;
		--brightness-light: 1;
		--brightness-dark: 0.9;
	}
	50% {
		--scale: 1.12;               /* 放大 12% */
		--height: 3.6rem;            /* 高度增加 0.6rem */
		--brightness-light: 0.89;    /* 浅色模式暗一点 */
		--brightness-dark: 1.09;     /* 深色模式亮一点 */
	}
}

/* 顶栏公共样式 */
.top-bar {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 1000;
	display: flex;
	align-items: center;
	transition: background-color 0.3s ease, color 0.3s ease;
	border-bottom: 1px solid rgba(20, 20, 20, 0.2);
}

.top-bar-content {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding-left: 1rem;
}

.logo-title-wrapper {
	display: flex;
	align-items: center;
	gap: 1rem;
	transform-origin: left center;
	will-change: transform;
}

.logo {
	height: 3rem;
	width: auto;
}

.title-text {
	font-weight: 600;
	letter-spacing: 0.125rem;
}

.theme-toggle-wrapper {
	margin-right: 3rem;
}

/* ===== 在页面最顶端的状态 ===== */
.at-top .top-bar {
	animation: breath 4.75s ease-in-out infinite;
	height: var(--height);
}
.at-top .logo-title-wrapper {
	transform: scale(var(--scale));
}
.at-top.light .top-bar {
	filter: none; /* 顶端时不要亮度呼吸 */
}
.at-top.dark .top-bar {
	filter: none;
}

/* ===== 离开页面顶端的状态 ===== */
.away-from-top .top-bar {
	height: 3rem; /* 固定高度 */
	animation: breath 4.75s ease-in-out infinite;
}
.away-from-top.light .top-bar {
	filter: brightness(var(--brightness-light));
}
.away-from-top.dark .top-bar {
	filter: brightness(var(--brightness-dark));
}
.away-from-top .logo-title-wrapper {
	transform: none; /* 不放大 */
}

/* ===== 主题背景色 ===== */
.light .top-bar {
	background-color: #f5f5f5;
	color: #333;
}
.dark .top-bar {
	background-color: #2c2c2c;
	color: #f0f0f0;
}
</style>
