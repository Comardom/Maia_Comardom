<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { bus } from '../../../utils/eventBus'
import { useShakeDetector } from './scripts/useShakeDetector'
import { useThemeObserver } from '../../../utils/useThemeObserver'
import { pickUmbrellaAsset } from './scripts/umbrellaAssetMap'

const props = withDefaults(defineProps<{
	forumUrl: string;
	examUrl: string;
	deptHubUrl: string;
}>(), {
	forumUrl: '/nihilum',
	examUrl: '/nihilum',
	deptHubUrl: '/nihilum',
})

const { isDark } = useThemeObserver()
const open = ref(false)
const shakeEnabled = ref(false)
// 新增一个响应式变量来存储权限被拒绝的状态
const permissionDenied = ref(false);

// 移动检测
const isMobile = () => typeof window !== 'undefined' && window.matchMedia('(max-width: 48rem)').matches

const { start: startShake, stop: stopShake, isSupported } = useShakeDetector()

async function toggleShake() {
	if (!isSupported()) return;
	
	// 如果已经启用，则关闭
	if (shakeEnabled.value) {
		stopShake();
		shakeEnabled.value = false;
		permissionDenied.value = false; // 关闭时也重置状态
	} else {
		// 尝试启动摇一摇功能，并等待权限结果
		const success = await startShake({ threshold: 18, burstCount: 2, windowMs: 600, minIntervalMs: 1200 });
		shakeEnabled.value = success;
		permissionDenied.value = !success; // 如果不成功，设置权限被拒绝为 true
		open.value = false; // 关闭菜单
	}
}

function goto(url: string) { window.open(url, '_blank') }
function triggerFloat() { bus.emit('float:start'); open.value = false }
function stopFloat() { bus.emit('float:stop'); open.value = false }

const iconSrc = computed(() => pickUmbrellaAsset(open.value, isDark.value))

// 点击外部/ESC 关闭弹窗
function onDocClick(e: MouseEvent) {
	const root = document.querySelector('.umbrella-root')
	if (!root) return
	if (!root.contains(e.target as Node)) {
		open.value = false;
		permissionDenied.value = false; // 关闭菜单时也清除提示
	}
}
function onKeyDown(e: KeyboardEvent) {
	if (e.key === 'Escape') {
		open.value = false;
		permissionDenied.value = false; // 关闭菜单时也清除提示
	}
}

onMounted(() => {
	document.addEventListener('click', onDocClick);
	document.addEventListener('keydown', onKeyDown);
});
onUnmounted(() => {
	document.removeEventListener('click', onDocClick);
	document.removeEventListener('keydown', onKeyDown);
});
</script>

<template>
	<div v-if="isMobile()" class="umbrella-root">
		<button class="umbrella-btn" @click.stop="open = !open; permissionDenied = false;" :aria-expanded="open" aria-label="Tools Menu">
			<img :src="iconSrc" alt="umbrella" class="icon-img" />
		</button>
		
		<div v-if="open" class="popover" role="menu" aria-orientation="vertical">
			<button class="pop-item" @click="toggleShake">{{ shakeEnabled ? 'Disable Shake' : 'Enable Shake' }}</button>
			<button class="pop-item" @click="triggerFloat">Force Float</button>
			<button class="pop-item" @click="goto(forumUrl)">Go to Forum</button>
			<button class="pop-item" @click="goto(examUrl)">Exam System</button>
		</div>
		
		<transition name="fade">
			<div v-if="permissionDenied" class="permission-alert">
				Please allow access to device motion permissions to enable this feature.
			</div>
		</transition>
	</div>
</template>

<style scoped>
.umbrella-root {
	position: relative;
	display: inline-block;
	z-index: 1200;
}

/* 与 theme-toggle 保持一致 */
.umbrella-btn {
	padding: 0.4rem 0.8rem;
	font-size: 0.9rem;
	border-radius: 6px;
	min-height: 2.2rem;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	border: 1px solid currentColor;
	background: transparent;
	color: inherit;
	cursor: pointer;
}
.icon-img { width: 1.1rem; height: 1.1rem; display:block; }

/* 弹窗：垂直菜单，宽度随内容但有最小宽度 */
.popover {
	position: absolute;
	top: calc(100% + 8px);
	right: 0;
	min-width: 10rem;
	border-radius: 8px;
	box-shadow: 0 8px 20px rgba(0,0,0,0.12);
	padding: 0.35rem;
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
	transform-origin: top right;
	animation: pop-in .16s ease;
	background-color: var(--theme-bg-button); /* 确保背景色 */
}

/* 动画 */
@keyframes pop-in {
	from { opacity: 0; transform: translateY(-6px) scale(.98); }
	to   { opacity: 1; transform: translateY(0) scale(1); }
}

.pop-item {
	border: none;
	background: transparent;
	padding: 0.45rem 0.6rem;
	text-align: left;
	border-radius: 6px;
	font-size: 0.9rem;
	cursor: pointer;
}
.pop-item:hover { background: rgba(0,0,0,0.06); color: inherit; }

/* 新增的权限提示样式 */
.permission-alert {
	position: absolute;
	top: calc(100% + 8px);
	right: 0;
	min-width: 10rem;
	padding: 0.5rem;
	background-color: #f8d7da; /* 柔和的红色背景 */
	color: #721c24; /* 深红色文字 */
	border-radius: 8px;
	box-shadow: 0 4px 12px rgba(0,0,0,0.1);
	z-index: 1201;
	font-size: 0.85rem;
	text-align: center;
	animation: fade-in 0.3s ease;
}

/* 简单的淡入淡出动画 */
.fade-enter-active, .fade-leave-active {
	transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
	opacity: 0;
}
</style>
