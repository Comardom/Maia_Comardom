<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useThemeObserver } from '../../../utils/useThemeObserver'

const props = defineProps<{ events: { year: string; title: string; description: string }[] }>()

// 主题
const { isDark } = useThemeObserver()

const container = ref<HTMLElement | null>(null)
const line = ref<HTMLElement | null>(null)

const verticalLineColor = computed(() => (isDark.value ? '#E6EEF8' : '#0b3d91'))
const vnodeBgColor = computed(() => (isDark.value ? 'rgba(255,255,255,0.08)' : '#fff'))
const vnodeShadow = computed(() => (isDark.value ? 'none' : '0 6px 18px rgba(9,30,66,0.06)'))
const vnodeTextColor = computed(() => (isDark.value ? '#E6EEF8' : '#333'))
const vnodeDescColor = computed(() => (isDark.value ? 'rgba(230,238,248,0.85)' : 'rgba(0,0,0,0.65)'))

onMounted(() => {
	requestAnimationFrame(() => {
		if (line.value) {
			line.value.style.height = '100%'
			line.value.style.transition = 'height 1.2s ease-out'
		}
	})
})

onUnmounted(() => {
	if (line.value) line.value.style.height = '0'
})
</script>

<template>
	<div ref="container" class="vertical-root" :data-theme="isDark ? 'dark' : 'light'">
		<div class="vertical-inner">
			<!-- 竖线 -->
			<div class="vertical-line-wrap">
				<div ref="line" class="vertical-line" :style="{ backgroundColor: verticalLineColor }"></div>
			</div>
			
			<!-- 节点 -->
			<div class="vertical-list">
				<div v-for="(ev, i) in props.events" :key="i" class="vnode"
				     :style="{
               backgroundColor: vnodeBgColor,
               boxShadow: vnodeShadow,
               animationDelay: (0.4 + i * 0.15) + 's'
             }">
					<div class="vnode-year" :style="{ color: vnodeTextColor }">{{ ev.year }}</div>
					<div class="vnode-title" :style="{ color: vnodeTextColor }">{{ ev.title }}</div>
					<!-- <div class="vnode-desc" :style="{ color: vnodeDescColor }">{{ ev.description }}</div> -->
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.vertical-root {
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	overflow: auto;
	-webkit-overflow-scrolling: touch;
	padding-inline: 1rem;
	padding-top: 0.5rem;
}

.vertical-inner {
	position: relative;
	display: flex;
	align-items: flex-start;
	height: 100%;
	box-sizing: border-box;
}

/* 竖线 */
.vertical-line-wrap {
	width: 36px;
	display: flex;
	justify-content: center;
	position: absolute;
	height: 100%;
	top: 0;
	left: 0;
	z-index: 0;
}
.vertical-line {
	width: 4px;
	border-radius: 2px;
	height: 0;
	transition: height 1.2s ease-out;
	animation: line-breathe 4s ease-in-out infinite 2s; /* 待机呼吸动画 */
}

/* 节点列表 */
.vertical-list {
	flex: 1 1 auto;
	display: flex;
	flex-direction: column;
	
	/* --- 以下是修改点 --- */
	
	/* 移除固定的 gap */
	/* gap: 0.5rem; */
	
	/* 让列表本身占满可用高度 */
	height: 100%;
	/* 让 flex 容器在主轴（垂直方向）上均匀分布项目 */
	justify-content: space-between;
	
	/* --- 以上是修改点 --- */
	
	padding-bottom: 2rem;
	margin-left: 36px;
	z-index: 1;
}

.vnode {
	padding: .3rem .5rem;
	border-radius: 8px;
	transition: all 0.3s ease;
	opacity: 0;
	transform: translateY(10px) scale(0.95);
	animation: node-fade-in 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards;
	/*animation-delay: var(--delay, 0s);*/
}

/* 待机脉冲 */
.vnode:hover {
	transform: translateY(-3px) scale(1.02);
}
.vnode::after {
	content: "";
	position: absolute;
}

/* 字体 */
.vnode-year { font-weight:700; font-size:.8rem; margin-bottom: .15rem; }
.vnode-title { font-weight:600; font-size:.8rem; margin-bottom:.15rem; }
.vnode-desc { font-size:0.7rem; line-height:1.25; }

/* Keyframes */
@keyframes node-fade-in {
	to { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes line-breathe {
	0%, 100% { opacity: 0.6; }
	50% { opacity: 1; }
}
</style>
