<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { eventBus } from '../../../utils/eventBus.ts';

const current = ref(0);
const total = ref(0);

function triggerChange(direction: 'next' | 'prev') {
	eventBus.emit('changeSection', direction);
}

function updateState({ newIndex, total: totalSections }: { newIndex: number; total: number; }) {
	current.value = newIndex;
	total.value = totalSections;
}

onMounted(() => {
	eventBus.on('sectionChanged', updateState);
});

onUnmounted(() => {
	eventBus.off('sectionChanged', updateState);
});
</script>

<template>
	<div class="side-nav">
		<button @click="triggerChange('prev')" :disabled="current === 0" title="上一页"></button>
		<button @click="triggerChange('next')" :disabled="current === total - 1" title="下一页"></button>
	</div>
</template>

<style scoped>
.side-nav {
	position: fixed;
	top: 50%;
	right: 2rem;
	transform: translateY(-50%); /* 直接定位，不再有入场动画 */
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1.5rem; /* 加大按钮间距 */
	z-index: 1000;
}

button {
	width: 14px; /* 圆点大小 */
	height: 14px;
	border-radius: 50%;
	border: 2px solid white; /* 白色边框 */
	background-color: transparent; /* 透明填充 */
	cursor: pointer;
	transition: background-color 0.3s ease, transform 0.3s ease;
	position: relative;
}
/* 用伪元素创建上下箭头 */
button::before {
	content: '';
	position: absolute;
	top: 50%;
	left: 50%;
	width: 6px;
	height: 6px;
	border-style: solid;
	border-color: white;
	border-width: 0 2px 2px 0;
	transform: translate(-50%, -75%) rotate(45deg);
}

button:first-of-type::before {
	transform: translate(-50%, -25%) rotate(-135deg); /* 向上箭头 */
}

button:hover:not(:disabled) {
	background-color: rgba(255, 255, 255, 0.3); /* 悬停时半透明填充 */
}

button:disabled {
	cursor: not-allowed;
	border-color: rgba(255, 255, 255, 0.3);
}
button:disabled::before {
	border-color: rgba(255, 255, 255, 0.3);
}
</style>