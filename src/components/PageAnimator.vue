<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import { eventBus } from '../utils/eventBus';

const isAnimating = ref(false);
const currentSectionIndex = ref(0);
let sections: HTMLElement[] = [];

onMounted(() => {
	gsap.registerPlugin(Observer);
	sections = gsap.utils.toArray('.snap-section');
	
	// --- 初始状态设置 (基于绝对定位) ---
	// 将所有 section 的 transform 清空，并设为不可见
	gsap.set(sections, { yPercent: 0, autoAlpha: 0 });
	// 仅显示第一个 section，并把它放在最上层
	gsap.set(sections[0], { autoAlpha: 1, zIndex: 1 });
	
	// --- 页面初始加载动画 (Header + 第一个 section 的内容) ---
	const headerTl = gsap.timeline();
	headerTl.from(".logo, .title-text", {
		y: -30, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.2
	});
	headerTl.from(sections[0].querySelector('.fullscreen-photo'), {
		opacity: 0, scale: 1.05, duration: 1.2, ease: 'power3.out'
	}, '-=0.5');
	
	// --- Observer 监听用户交互 ---
	const observer = Observer.create({
		type: "wheel,touch,pointer",
		wheelSpeed: -1,//1改为自然滚动
		// onDown: () => goToSection(currentSectionIndex.value + 1, 1),
		// onUp: () => goToSection(currentSectionIndex.value - 1, -1),
		onDown: () => goToSection(currentSectionIndex.value - 1, -1), // 手指向下滑
		onUp: () => goToSection(currentSectionIndex.value + 1, 1),    // 手指向上滑
		
		tolerance: 10,
		preventDefault: true,
	});
	
	// --- 监听按钮点击事件 ---
	eventBus.on('changeSection', (direction: 'next' | 'prev') => {
		if (direction === 'next') {
			goToSection(currentSectionIndex.value + 1, 1);
		} else {
			goToSection(currentSectionIndex.value - 1, -1);
		}
	});
	
	// 初始时就通知按钮总数
	eventBus.emit('sectionChanged', { newIndex: 0, total: sections.length });
	
	onUnmounted(() => {
		observer.kill();
		eventBus.off('changeSection');
	});
});

// --- 核心动画函数 (重写) ---
function goToSection(index: number, direction: number) {
	if (isAnimating.value || index < 0 || index >= sections.length) {
		return;
	}
	
	isAnimating.value = true;
	
	const outgoingSection = sections[currentSectionIndex.value];
	const incomingSection = sections[index];
	
	const tl = gsap.timeline({
		onComplete: () => {
			// 动画结束后，把旧的 section 彻底隐藏并降低层级
			gsap.set(outgoingSection, { autoAlpha: 0, zIndex: 0 });
			isAnimating.value = false;
		},
		defaults: {
			duration: 1.2,
			ease: 'power4.inOut'
		}
	});
	
	// 1. 准备 incomingSection：把它放在滑入的起始位置，设为可见，并置于顶层
	gsap.set(incomingSection, {
		yPercent: 100 * direction,
		autoAlpha: 1,
		zIndex: 2 // 确保它在 outgoingSection 之上
	});
	
	// 2. outgoingSection 滑出
	tl.to(outgoingSection, { yPercent: -100 * direction });
	
	// 3. incomingSection 滑入
	tl.to(incomingSection, { yPercent: 0 }, "<");
	
	currentSectionIndex.value = index;
	eventBus.emit('sectionChanged', { newIndex: index, total: sections.length });
}
</script>

<template></template>