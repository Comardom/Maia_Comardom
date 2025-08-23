<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick, computed } from 'vue'
import { useThemeObserver } from '../../../utils/useThemeObserver'

/**
 * Props: events - array of timeline events
 * 完整优化版：入场动画可稳定触发；待机波动动画不卡顿
 */
const props = defineProps<{ events: { year: string; title: string; description: string }[] }>()

// 主题
const { isDark } = useThemeObserver()

// -------------------- REFS & STATE --------------------
const root = ref<HTMLElement | null>(null)
const svgEl = ref<SVGSVGElement | null>(null)
const pathEl = ref<SVGPathElement | null>(null)
const pathGlowEl = ref<SVGPathElement | null>(null)

const nodes = ref<{ x: number; y: number }[]>([])
const isInitialized = ref(false)

let ro: ResizeObserver | null = null
let animationFrameId: number | null = null
let lastTimestamp = 0
let waveOffset = 0 // ❗ 非响应式，避免每帧触发 Vue 更新

// 速度与随机种子
const WAVE_SPEED = 0.0005
const WAVE_SEED = Math.random() * 1000

// 运行时根据容器宽度决定尖峰数量（性能友好）
let dynamicSpikes = 3

// -------------------- COLORS --------------------
const timelineGradientStart = computed(() => (isDark.value ? '#00F260' : '#43C6AC'))
const timelineGradientEnd   = computed(() => (isDark.value ? '#0575E6' : '#191654'))
const nodeDotFill           = computed(() => (isDark.value ? '#0b1320'  : '#FFFFFF'))
const nodeDotStroke         = computed(() => (isDark.value ? '#00F260' : '#43C6AC'))
const cardBg                = computed(() => (isDark.value ? 'rgba(0, 30, 60, 0.42)' : 'rgba(255, 255, 255, 0.72)'))
const cardTitleColor        = computed(() => (isDark.value ? '#E2E8F0' : '#1A202C'))
const cardDescColor         = computed(() => (isDark.value ? '#9FB0C2' : '#4A5568'))
const titleColor            = computed(() => (isDark.value ? '#CBD5E0' : '#2D3748'))

// -------------------- CORE PATH GEN --------------------
/** 生成“数字流光”路径 */
function generateDigitalStreamD(baseXs: number[], baseYs: number[], offset: number, numSpikes: number) {
	if (baseXs.length < 2) return ''
	let d = `M ${baseXs[0].toFixed(1)} ${baseYs[0].toFixed(1)}`
	for (let i = 1; i < baseXs.length; i++) {
		const p0 = { x: baseXs[i - 1], y: baseYs[i - 1] }
		const p1 = { x: baseXs[i],     y: baseYs[i] }
		const dx = p1.x - p0.x
		const dy = p1.y - p0.y
		const segmentLength = Math.sqrt(dx * dx + dy * dy) || 1
		const nx = -dy / segmentLength
		const ny =  dx / segmentLength
		
		const points = [p0]
		const spikes = Math.max(0, Math.min(numSpikes|0, 3)) // 上限 3
		for (let j = 1; j <= spikes; j++) {
			const posOnSegment = (j + (Math.sin(offset * 2 + j) * 0.2)) / (spikes + 1)
			// 适度降低峰值，移动端更稳
			const spikeHeight = (Math.sin(offset + WAVE_SEED + p0.x / 50 + j) * 0.5 + 0.5) * 30
			points.push({
				x: p0.x + dx * posOnSegment + nx * spikeHeight,
				y: p0.y + dy * posOnSegment + ny * spikeHeight,
			})
		}
		points.push(p1)
		
		for (let k = 0; k < points.length - 1; k++) {
			const a = points[k], b = points[k + 1]
			const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }
			d += ` Q ${a.x.toFixed(1)} ${a.y.toFixed(1)}, ${mid.x.toFixed(1)} ${mid.y.toFixed(1)}`
		}
		d += ` L ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`
	}
	return d
}

/** 首帧/尺寸变化时，根据 nodes 写入路径与 dash 长度 */
function paintInitialPath() {
	if (!pathEl.value || nodes.value.length === 0) return
	const xs = nodes.value.map(n => n.x)
	const ys = nodes.value.map(n => n.y)
	const d0 = generateDigitalStreamD(xs, ys, 0, dynamicSpikes)
	pathEl.value.setAttribute('d', d0)
	pathGlowEl.value?.setAttribute('d', d0)
	// 设置 stroke 长度，确保入场描边动画真实有效
	try {
		const len = pathEl.value.getTotalLength()
		pathEl.value.style.strokeDasharray = `${len}`
		pathEl.value.style.strokeDashoffset = `${len}`
	} catch { /* 某些极端情况下 getTotalLength 可能抛错，忽略 */ }
}

// -------------------- ANIMATION LOOP（非响应式） --------------------
const animateWave = (timestamp: number) => {
	if (!lastTimestamp) lastTimestamp = timestamp
	const deltaTime = timestamp - lastTimestamp
	lastTimestamp = timestamp
	
	// 如果用户减少动态，则不做待机动画
	const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
	if (!reduce) {
		waveOffset += deltaTime * WAVE_SPEED
		if (nodes.value.length && pathEl.value) {
			const xs = nodes.value.map(n => n.x)
			const ys = nodes.value.map(n => n.y)
			const d = generateDigitalStreamD(xs, ys, waveOffset, dynamicSpikes)
			pathEl.value.setAttribute('d', d)
			pathGlowEl.value?.setAttribute('d', d)
		}
	}
	
	animationFrameId = requestAnimationFrame(animateWave)
}

// -------------------- LAYOUT & LIFECYCLE --------------------
async function recompute() {
	if (!root.value) return
	await nextTick()
	if (!root.value) return
	
	const rect = root.value.getBoundingClientRect()
	const width  = Math.max(200, rect.width)
	const height = Math.max(120, rect.height)
	
	// 根据宽度自适应尖峰数：窄屏更省电
	dynamicSpikes = width < 720 ? 1 : 3
	
	const marginX = 60
	const left = marginX
	const right = width - marginX
	const count = Math.max(1, props.events.length)
	const available = right - left
	
	const xs: number[] = []
	if (count === 1) xs.push(width / 2)
	else for (let i = 0; i < count; i++) xs.push(left + (available * (i / (count - 1))))
	
	const topY = Math.max(40, height * 0.27)
	const botY = Math.max(80, height * 0.73)
	const ys: number[] = xs.map((_, i) => (i % 2 === 0 ? topY : botY))
	
	nodes.value = xs.map((x, i) => ({ x, y: ys[i] }))
	
	if (svgEl.value) {
		svgEl.value.setAttribute('width',  `${width}`)
		svgEl.value.setAttribute('height', `${height}`)
		svgEl.value.setAttribute('viewBox', `0 0 ${width} ${height}`)
	}
	
	// 初次绘制路径 + 计算 dash
	await nextTick()
	paintInitialPath()
}

onMounted(() => {
	if (!root.value) return
	recompute()
	
	// 监听尺寸
	ro = new ResizeObserver(() => {
		recompute()
	})
	ro.observe(root.value)
	
	// ⭐ 确保入场动画一定触发：nextTick + 双 rAF，等首帧布局/样式生效后再加 class
	nextTick(() => {
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				isInitialized.value = true
			})
		})
	})
	
	// 入场动画结束后再启动待机动画（避免竞争）
	const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
	const startStandbyAfter = reduce ? 0 : 3500
	setTimeout(() => {
		if (animationFrameId == null) {
			animationFrameId = requestAnimationFrame(animateWave)
		}
	}, startStandbyAfter)
})

onUnmounted(() => {
	if (ro && root.value) ro.unobserve(root.value)
	ro = null
	if (animationFrameId) cancelAnimationFrame(animationFrameId)
	animationFrameId = null
})

watch(
	() => props.events,
	() => {
		// 数据变化：重算布局 & 重放入场动画
		recompute()
		isInitialized.value = false
		nextTick(() => {
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					isInitialized.value = true
				})
			})
		})
	},
	{ deep: true }
)
</script>

<template>
	<div ref="root" :class="['snake-root', { 'initialized': isInitialized }]" aria-hidden="false">
		<!-- <h2 class="timeline-title" :style="{ color: titleColor }">重要事件時間線</h2> -->
		
		<svg ref="svgEl" class="snake-svg" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
			<defs>
				<linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" :stop-color="timelineGradientStart" />
					<stop offset="100%" :stop-color="timelineGradientEnd" />
				</linearGradient>
				<!-- 降低模糊强度，移动端更顺滑 -->
				<filter id="glow">
					<feGaussianBlur stdDeviation="2.2" result="coloredBlur" />
					<feMerge>
						<feMergeNode in="coloredBlur" />
						<feMergeNode in="SourceGraphic" />
					</feMerge>
				</filter>
			</defs>
			
			<path
				ref="pathGlowEl"
				class="path-glow"
				:d="''"
			stroke="url(#line-gradient)"
			stroke-width="6"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
			/>
			
			<path
				ref="pathEl"
				class="main-path"
				:d="''"
			stroke="url(#line-gradient)"
			stroke-width="3"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
			/>
		</svg>
		
		<div class="nodes-layer">
			<div
				v-for="(ev, i) in props.events"
				:key="`event-${i}`"
				class="node"
				:style="{
          left: (nodes[i] ? nodes[i].x + 'px' : '-9999px'),
          top:  (nodes[i] ? nodes[i].y + 'px' : '-9999px'),
          '--final-translate-y': (i % 2 === 0 ? '-115%' : '15%'),
          'animation-delay': `${1.5 + i * 0.1}s`
        }"
				role="group"
				:aria-label="`${ev.year} ${ev.title}`"
			>
				<div class="node-dot"
				     :style="{
               backgroundColor: nodeDotFill,
               borderColor: nodeDotStroke,
               animationDelay: `${2 + i * 0.15}s`
             }" />
				<div class="node-card" :style="{ backgroundColor: cardBg }">
					<div class="node-year"  :style="{ color: cardTitleColor }">{{ ev.year }}</div>
					<div class="node-title" :style="{ color: cardTitleColor }">{{ ev.title }}</div>
					<div class="node-desc"  :style="{ color: cardDescColor }">{{ ev.description }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
/* --- 基础与布局 --- */
.snake-root {
	width: 100%;
	height: 100%;
	position: relative;
	box-sizing: border-box;
	overflow: hidden;
	-webkit-font-smoothing: antialiased;
	/*font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;*/
	padding-top: 4rem;
	/*background-color: var(--bg-color, #f0f2f5);*/
}
.dark .snake-root { --bg-color: #0d1117; }

.snake-svg, .nodes-layer {
	position: absolute; left: 0; top: 0; width: 100%; height: 100%;
	pointer-events: none;
}
.nodes-layer { pointer-events: none; }

/* --- 入场动画 --- */
.timeline-title {
	position: absolute;
	top: 1rem; left: 50%;
	font-size: 1.5rem; font-weight: 700;
	opacity: 0; transform: translate(-50%, -20px);
	transition: color 0.3s ease;
}
.initialized .timeline-title { animation: fade-in-down 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) 0.2s forwards; }

/* 路径描边入场（stroke 长度在 JS 中动态设置） */
.main-path {
	/* 这两个值由 JS 初始化：strokeDasharray / strokeDashoffset */
}
.initialized .main-path {
	animation: draw-path 2s cubic-bezier(0.65,0,0.35,1) 0.5s forwards;
}

/* 节点入场：弹跳 */
.node {
	position: absolute;
	pointer-events: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 220px;
	max-width: 30vw;
	opacity: 0;
	/*noinspection CssUnresolvedCustomProperty*/
	transform: scale(0.5) translate(-50%, var(--final-translate-y, -50%));
}
.initialized .node {
	animation: bounce-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

/* --- 待机动画 --- */
/* 辉光层（滤镜降低强度） */
.path-glow { filter: url(#glow); opacity: 0; }
.initialized .path-glow {
	animation: standby-glow 4s ease-in-out 3s infinite;
}

/* 节点圆点脉冲（较轻） */
.node-dot {
	width: 14px; height: 14px;
	border-radius: 50%;
	border: 3px solid;
	box-shadow: 0 0 10px rgba(0, 242, 96, 0);
	flex-shrink: 0;
	z-index: 1; margin: 8px 0;
	transition: all 0.3s ease;
}
.initialized .node-dot { animation: standby-pulse 3s infinite; }

/* --- 关键帧 --- */
@keyframes fade-in-down { to { opacity: 1; transform: translate(-50%, 0); } }

@keyframes draw-path { to { stroke-dashoffset: 0; } }

@keyframes bounce-in {
	to { opacity: 1; /*noinspection CssUnresolvedCustomProperty*/
		transform: scale(1) translate(-50%, var(--final-translate-y)); }
}

@keyframes standby-glow {
	0%, 100% { opacity: 0.35; }
	50%      { opacity: 0.75; }
}

@keyframes standby-pulse {
	0%, 100% { transform: scale(1);    box-shadow: 0 0 10px rgba(0, 242, 96, 0); }
	50%      { transform: scale(1.12); box-shadow: 0 0 16px rgba(0, 242, 96, 0.44); }
}

/* --- 其他样式 --- */
.node-card {
	padding: 0.75rem 1rem;
	border-radius: 12px;
	backdrop-filter: blur(10px) saturate(160%);
	-webkit-backdrop-filter: blur(10px) saturate(160%);
	box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.12);
	border: 1px solid rgba(255, 255, 255, 0.16);
	transition: all 0.3s ease;
	width: 100%;
}
.node:hover .node-card { transform: translateY(-5px); box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.18); z-index: 50;}

.node:nth-child(odd) { flex-direction: column-reverse; }

.node-year  { font-weight: 700; font-size: 0.8rem; margin-bottom: 0.25rem; opacity: 0.85; }
.node-title { font-weight: 600; font-size: 0.95rem; margin-bottom: 0.3rem; }
.node-desc  { font-size: 0.85rem; font-weight: 400; }

/* 响应式（移动端更小的卡片） */
@media (max-width: 768px) {
	.node { width: 180px; max-width: 40vw; }
}

/* 减少动态：系统偏好 */
@media (prefers-reduced-motion: reduce) {
	.initialized .main-path,
	.initialized .node,
	.initialized .path-glow,
	.initialized .node-dot {
		animation: none !important;
	}
}
</style>
