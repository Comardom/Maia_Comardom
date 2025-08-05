<template>
	<button class="theme-toggle" @click="toggleTheme">
		{{ isDark ? '🌞 亮色' : '🌙 暗色' }}
	</button>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isDark = ref(true);

const getCookieTheme = () => {
	const match = document.cookie.match(/(?:^|;\s*)theme=(dark|light)/);
	return match ? match[1] : null;
};

const setCookieTheme = (value) => {
	document.cookie = `theme=${value}; path=/; max-age=31536000`;
};

const applyTheme = (darkMode) => {
	document.documentElement.classList.toggle('dark', darkMode);
};

const toggleTheme = () => {
	isDark.value = !isDark.value;
	applyTheme(isDark.value);
	setCookieTheme(isDark.value ? 'dark' : 'light');
};

onMounted(() => {
	const saved = getCookieTheme();
	isDark.value = saved !== 'light';
	applyTheme(isDark.value);
});
</script>

<style scoped>
.theme-toggle {
	padding: 0.4rem 0.8rem;
	font-size: 0.9rem;
	background-color: #eee;
	border: 1px solid #ccc;
	border-radius: 6px;
	cursor: pointer;
	transition: background-color 0.2s ease;
}

.theme-toggle:hover {
	background-color: #ddd;
}

.dark .theme-toggle {
	background-color: #333;
	color: white;
	border-color: #666;
}
</style>
