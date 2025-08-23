<script setup>
import { ref, onMounted } from 'vue'
import PlasticThemeToggleIsland from '../../components/PlasticThemeToggleIsland.vue'

// 检测 <html> 是否有类名 'dark'
const isDark = ref(false)

onMounted(() => {
	const htmlClassList = document.documentElement.classList
	isDark.value = htmlClassList.contains('dark')
	
	// 可选：监听类名变化（如果你有动态切换）
	const observer = new MutationObserver(() => {
		isDark.value = htmlClassList.contains('dark')
	})
	observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
})
</script>

<template>
	<header>
		<!-- 🌞 Light 顶栏 -->
		<div v-if="!isDark" class="top-bar light">
			<div class="top-bar-content">
				<div class="logo-title-wrapper">
					<a href="">
						<img src="/plastic-black-trans-wswd.svg" alt="logo" class="logo" />
					</a>
					<span class="title-text">河南大学网站工作室</span>
				</div>
				<div class="theme-toggle-wrapper">
					<PlasticThemeToggleIsland client:load />
				</div>
			</div>
		</div>
		
		<!-- 🌚 Dark 顶栏 -->
		<div v-else class="top-bar dark">
			<div class="top-bar-content">
				<div class="logo-title-wrapper">
					<a href="">
						<img src="/plastic-white-trans-wswd.svg" alt="logo" class="logo" />
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
.top-bar {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 3rem;
	padding: 0.5rem 1rem;
	font-size: 1rem;
	line-height: 1.5;
	z-index: 1000;
	display: flex;
	align-items: center;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	transition: background-color 0.3s ease, color 0.3s ease;
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
}

.logo-title-wrapper {
	display: flex;
	align-items: center;
	gap: 0.5rem;
}

.logo {
	height: 3rem;
	width: auto;
	padding-left:  1rem;
}

.title-text {
	font-weight: 600;
	letter-spacing: 0.125rem;
	padding-left:  1rem;
}

</style>
