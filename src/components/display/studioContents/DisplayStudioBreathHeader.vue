<script setup lang="ts">
import PlasticThemeToggleIsland from "../../PlasticThemeToggleIsland.vue"
//监测黑白主题
import { useThemeObserver } from "../../../utils/useThemeObserver.ts"
const { isDark } = useThemeObserver()
//黑白logo引入
import {computed} from "vue";
import { logoMap } from "../../../utils/logoMap.ts"
const logoSrc = computed(() => logoMap[isDark.value ? 'dark' : 'light'])
//呼吸动效
import {useBreathingMode} from "./useBreathingMode.ts";
const { breathingClasses } = useBreathingMode(isDark)
</script>

<template>
	<header
		:class="isDark ? 'dark' : ''"
		:data-theme="isDark ? 'dark' : 'light'"
	>
		<div
			:class="['top-bar', isDark ? 'dark' : 'light', ...breathingClasses]"
		>
			<div class="top-bar-content">
				<div class="logo-title-wrapper">
					<a href="">
						<img :src=logoSrc alt="logo" class="logo"/>
					</a>
					<span class="title-text">河南大学网站工作室</span>
				</div>
				<div>
					<a href="">
					
					</a>
				</div>
				<div class="theme-toggle-wrapper">
					<PlasticThemeToggleIsland client:load />
				</div>
			</div>
		</div>
	</header>
</template>

<style scoped>
@keyframes breathe-height {
	0%, 100% {
		transform: scaleY(1);
	}
	50% {
		transform: scaleY(1.07);
	}
}

@keyframes breathe-dark {
	0%, 100% {
		filter: brightness(0.9);
	}
	50% {
		filter: brightness(1.09);
	}
}

@keyframes breathe-light {
	0%, 100% {
		filter: brightness(1);
	}
	50% {
		filter: brightness(0.89);
	}
}

.breathe-stretch {
	animation: breathe-height 4.75s ease-in-out infinite;
	transform-origin: top center;
}

.breathe-dark {
	animation: breathe-dark 4.75s ease-in-out infinite;
	filter: brightness(0.9);
}

.breathe-light {
	animation: breathe-light 4.75s ease-in-out infinite;
	filter: brightness(1);
}




.top-bar {
	position: relative;
	top: 0;
	left: 0;
	width: 100%;
	height: 3rem;
	padding: 0.5rem 1rem;
	font-size: 1rem;
	z-index: 1000;
	display: flex;
	align-items: center;
	transition: background-color 0.3s ease, color 0.3s ease;
	border-bottom: 1px solid rgba(20, 20, 20, 0.2);
}

.top-bar.light {
	background-color: #f5f5f5;
	color: #333;
}

.top-bar.dark {
	background-color: #2c2c2c;
	color: #f0f0f0;
}
.top-bar-content {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding-left:  1rem;
}

.logo-title-wrapper {
	display: flex;
	align-items: center;
	gap: 1rem;
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

.top-bar {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 3rem;
	padding: 0.5rem 1rem;
	font-size: 1rem;
	z-index: 1000;
	display: flex;
	align-items: center;
	transition: background-color 0.3s ease, color 0.3s ease;
}

.top-bar-content {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
}

.logo-title-wrapper {
	display: flex;
	align-items: center;
	gap: 1rem;
}

.logo {
	height: 3rem;
	width: auto;
}

.title-text {
	font-weight: 600;
	letter-spacing: 0.125rem;
}
/*
.theme-toggle-wrapper.dark {
	margin-right: 3rem;
	border: #1a1a1a 1px solid;
	background-color: #cccccc;
}
.theme-toggle-wrapper.light {
	margin-right: 3rem;
	border: #1a1a1a 1px solid;
	background-color:#333333;
}
*/
</style>
