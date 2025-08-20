<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick, computed } from 'vue'
import type { TimelineEvent } from './scripts/timelineData'
import { useThemeObserver } from '../../../utils/useThemeObserver'

/**
 * Props: events - array of timeline events
 */
const props = defineProps<{ events: { year: string; title: string; description: string }[] }>()

// 主题：选择配色
const { isDark } = useThemeObserver()

// refs
const root = ref<HTMLElement | null>(null)
const svgEl = ref<SVGSVGElement | null>(null)
const pathEl = ref<SVGPathElement | null>(null)

// reactive state: path d, node positions (px)
const pathD = ref('')
const nodes = ref<{ x: number; y: number }[]>([])

let ro: ResizeObserver | null = null
// Animation state
// 動畫狀態
let animationFrameId: number | null = null;
let lastTimestamp = 0;
const waveOffset = ref(0);
const waveSpeed = 0.0002; // Adjust for wave speed // 調整波浪速度
const waveAmplitude = 10; // Adjust for wave height // 調整波浪高度
const waveSeed = Math.random() * 1000; // A random seed for unique wave pattern // 隨機種子用於獨特的波浪模式


// 修正后的颜色计算属性
// 使用更通用的颜色名称
const timelineLineColor = computed(() => (isDark.value ? '#E6EEF8' : '#0b3d91'));
const nodeDotFill = computed(() => (isDark.value ? '#333' : '#fff'));
const nodeDotStroke = computed(() => (isDark.value ? '#E6EEF8' : '#0b3d91'));
const cardBg = computed(() => (isDark.value ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'));
const cardTitleColor = computed(() => (isDark.value ? '#A1C8E5' : '#1a4f89'));
const cardDescColor = computed(() => (isDark.value ? '#C6C6C6' : '#555'));

function generateD(baseXs: number[], baseYs: number[], height: number, offset: number) {
	if (baseXs.length === 0) return '';
	let d = `M ${baseXs[0].toFixed(1)} ${baseYs[0].toFixed(1)}`
	for (let i = 1; i < baseXs.length; i++) {
		const x0 = baseXs[i - 1], y0 = baseYs[i - 1]
		const x1 = baseXs[i], y1 = baseYs[i]
		const dx = (x1 - x0)
		
		// Combine multiple sine waves for a more organic, flowing effect
		// 結合多個正弦波以獲得更自然的流動效果
		// Removed random "timbre" from inside the loop to prevent jitter
		// 移除了循環內的隨機“音色”，以防止顫抖
		const wave1 = Math.sin((x0 / 100) + offset + waveSeed) * waveAmplitude;
		const wave2 = Math.sin((x0 / 50) + offset * 0.5 + waveSeed * 2) * (waveAmplitude * 0.4);
		const wave3 = Math.sin((x0 / 25) + offset * 1.5 + waveSeed * 3) * (waveAmplitude * 0.2);
		const totalWave = wave1 + wave2 + wave3;
		
		const cp1x = (x0 + dx * 0.35)
		const cp1y = y0 + totalWave
		
		const cp2x = (x1 - dx * 0.35)
		const cp2y = y1 - totalWave
		
		d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${x1.toFixed(1)} ${y1.toFixed(1)}`
	}
	return d;
}

// recompute path when container size or events change
async function recompute() {
	if (!root.value) return
	await nextTick()
	const rect = root.value.getBoundingClientRect()
	// 移除最大寬度限制，讓時間線自由鋪滿
	const width = Math.max(200, rect.width);
	const height = Math.max(120, rect.height)
	
	// 左右內邊距使用固定像素值
	const marginX = 50;
	const left = marginX
	const right = width - marginX
	const count = Math.max(1, props.events.length)
	const available = right - left
	
	// x positions equally spaced
	const xs: number[] = []
	for (let i = 0; i < count; i++) {
		const x = left + (available * (i / Math.max(1, count - 1)))
		xs.push(x)
	}
	
	// y positions: 蛇形：交替在上 / 下 兩條基線
	const topY = Math.max(40, height * 0.22)
	const bottomY = Math.max(80, height * 0.68)
	const ys: number[] = xs.map((_, i) => (i % 2 === 0 ? topY : bottomY))
	
	pathD.value = generateD(xs, ys, height, waveOffset.value);
	nodes.value = xs.map((x, i) => ({ x, y: ys[i] }))
	
	// update SVG viewport / viewBox
	if (svgEl.value) {
		svgEl.value.setAttribute('width', `${width}`)
		svgEl.value.setAttribute('height', `${height}`)
		svgEl.value.setAttribute('viewBox', `0 0 ${width} ${height}`)
	}
}

// continuous wave animation loop
// 持續波動動畫循環
const animateWave = (timestamp: number) => {
	if (!lastTimestamp) lastTimestamp = timestamp;
	const deltaTime = timestamp - lastTimestamp;
	lastTimestamp = timestamp;
	
	waveOffset.value += deltaTime * waveSpeed;
	
	const rect = root.value?.getBoundingClientRect();
	if (rect) {
		const width = Math.max(200, rect.width);
		const height = Math.max(120, rect.height)
		const marginX = 50;
		const left = marginX
		const right = width - marginX
		const count = Math.max(1, props.events.length)
		const available = right - left
		const xs: number[] = []
		for (let i = 0; i < count; i++) {
			const x = left + (available * (i / Math.max(1, count - 1)))
			xs.push(x)
		}
		const topY = Math.max(40, height * 0.22)
		const bottomY = Math.max(80, height * 0.68)
		const ys: number[] = xs.map((_, i) => (i % 2 === 0 ? topY : bottomY))
		
		// Update path without transition
		pathD.value = generateD(xs, ys, height, waveOffset.value);
	}
	animationFrameId = requestAnimationFrame(animateWave);
}

// ResizeObserver to recompute on container resize
onMounted(() => {
	if (!root.value) return
	recompute()
	ro = new ResizeObserver(() => recompute())
	ro.observe(root.value)
	
	// Initial path drawing animation
	// 初始路徑繪製動畫
	if (pathEl.value) {
		const path = pathEl.value;
		const total = path.getTotalLength();
		path.style.strokeDasharray = `${total}`;
		path.style.strokeDashoffset = `${total}`;
		void path.getBoundingClientRect();
		path.style.transition = `stroke-dashoffset 2s ease-in-out`;
		requestAnimationFrame(() => {
			path.style.strokeDashoffset = '0';
		});
	}
	
	// Start wave animation after initial draw
	// 初始繪製後開始波動動畫
	setTimeout(() => {
		animationFrameId = requestAnimationFrame(animateWave);
	}, 2500); // Wait for the initial draw to finish // 等待初始繪製完成
})

// cleanup
onUnmounted(() => {
	if (ro && root.value) ro.unobserve(root.value)
	ro = null
	if (animationFrameId) {
		cancelAnimationFrame(animationFrameId);
	}
})

// recompute when events array changes externally
watch(() => props.events, () => {
	recompute();
	// Restart animation when events change
	// 事件改變時重新啟動動畫
	if (pathEl.value) {
		const path = pathEl.value;
		const total = path.getTotalLength();
		path.style.transition = 'none'; // Disable transition for reset // 禁用過渡以進行重置
		path.style.strokeDashoffset = `${total}`;
		// Re-enable transition and animate
		setTimeout(() => {
			path.style.transition = `stroke-dashoffset 2s ease-in-out`;
			path.style.strokeDashoffset = '0';
		}, 50); // Small delay to force reflow // 小延遲以強制重繪
	}
}, { deep: true })
</script>

<template>
	<div ref="root" class="snake-root" aria-hidden="false">
		<!-- 新增主標題 -->
		<h2 class="timeline-title">重要事件時間線</h2>
		<!-- SVG 蛇形路徑 -->
		<svg ref="svg" class="snake-svg" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMaxYMin meet">
			<path ref="pathEl" :d="pathD" :stroke="timelineLineColor" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
		
		<!-- 節點 -->
		<div class="nodes-layer">
			<div
				v-for="(ev, i) in props.events"
				:key="i"
				class="node"
				:style="{
          left: (nodes[i] ? nodes[i].x + 'px' : '-9999px'),
          top: (nodes[i] ? nodes[i].y + 'px' : '-9999px'),
          transform: nodes[i] ? 'translate(-50%, ' + (i % 2 === 0 ? '-110%' : '0') + ')' : 'none'
        }"
				role="group"
				:aria-label="`${ev.year} ${ev.title}`"
			>
				<div class="node-dot" :style="{ backgroundColor: nodeDotFill, borderColor: nodeDotStroke }" />
				<div class="node-card" :style="{ backgroundColor: cardBg, color: cardTitleColor }">
					<div class="node-year">{{ ev.year }}</div>
					<div class="node-title">{{ ev.title }}</div>
					<div class="node-desc" :style="{ color: cardDescColor }">{{ ev.description }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.snake-root {
	width: 100%;
	height: 100%;
	position: relative;
	box-sizing: border-box;
	overflow: hidden;
	-webkit-font-smoothing: antialiased;
	padding-top: 4rem; /* 增加頂部空間以容納標題 */
}

/* 新增標題樣式 */
.timeline-title {
	position: absolute;
	top: 1rem;
	left: 50%;
	transform: translateX(-50%);
	font-size: 1.5rem;
	font-weight: 700;
	text-align: center;
	width: 100%;
}

.snake-svg {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
}

.nodes-layer {
	position: absolute;
	left: 0; top: 0; width: 100%; height: 100%;
	pointer-events: none;
}

.node {
	position: absolute;
	pointer-events: auto;
	display: flex;
	align-items: center;
	gap: 0.65rem;
	width: 220px;
	max-width: 30vw;
	box-sizing: border-box;
	/* 新增過渡效果 */
	transition: all 0.2s ease-in-out;
}

.node:hover {
	z-index: 10;
}

.node-dot {
	width: 12px;
	height: 12px;
	border-radius: 50%;
	border: 2px solid;
	box-shadow: 0 4px 10px rgba(0,0,0,0.08);
	flex-shrink: 0;
	transition: all 0.2s ease-in-out;
}

.node:hover .node-dot {
	box-shadow: 0 6px 15px rgba(0,0,0,0.15);
}

.node-card {
	padding: 0.45rem 0.6rem;
	border-radius: 8px;
	box-shadow: 0 6px 18px rgba(0,0,0,0.08);
	font-size: 0.85rem;
	line-height: 1.25;
	transition: all 0.2s ease-in-out;
}

.node:hover .node-card {
	box-shadow: 0 8px 20px rgba(0,0,0,0.1);
}

.node-year { font-weight: 700; font-size: 0.82rem; margin-bottom: 0.15rem; }
.node-title { font-weight: 600; font-size: 0.9rem; margin-bottom: 0.2rem; }
.node-desc { font-size: 0.8rem; }

@media (max-width: 68rem) {
	.node { width: 200px; max-width: 36vw; }
}
</style>
