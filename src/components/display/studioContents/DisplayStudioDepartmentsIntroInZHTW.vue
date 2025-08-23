<script setup lang="ts">
import { ref, nextTick, onMounted, onUnmounted, watch } from 'vue'
import { useThemeObserver } from '../../../utils/useThemeObserver'
import { useFloatingBlocks } from './scripts/useFloatingBlocks'
import { bus } from '../../../utils/eventBus'
import { useMediaQuery } from '../../../utils/useMediaQuery'

// 主题检测
const { isDark } = useThemeObserver()

// 使用 ref 数组来存储 DOM 元素引用
const blockRefs = ref<(HTMLElement | null)[]>([]);

// 这个函数现在接受一个更宽泛的类型，以兼容 Vue 的 :ref 回调
const setBlockRef = (el: any, index: number) => {
	// 检查 el 是否为 HTMLElement 的实例
	if (el instanceof HTMLElement) {
		blockRefs.value[index] = el;
	}
};

const blocks = [
	{ color: 'rgba(255, 0, 0, 0.2)',
		title: '辦公室',
		link:"/display/office",
		short:"在溫柔的秩序中編織熱情，我們用溝通與協作把彼此的心靠得更近。",
		content: '辦公室是一個溫暖和諧的大家庭，主要負責活動企劃、值班安排、場地申請等工作，能大大訓練個人溝通交流與組織協調能力。這裡有帥氣開朗的學長，也有漂亮大方的學姊，沒有部長與部員的距離感，大家都是彼此的好朋友，可以自由自在地做自己想做的事。如果你是邊緣人，我們建議你加入辦公室，因為我們致力於將邊緣人訓練為社交王。如果你是社交王，我們建議你加入辦公室，因為我們也是社交王星球的常駐民。加入穩賺不賠，別再猶豫了，快點來吧！'
	},
	{ color: 'rgba(255, 165, 0, 0.2)',
		title: '網頁部',
		link:"/display/web.html",
		short:"程式碼是我們的詩，網頁是我們的畫，在邏輯與美感之間建造數位的家園。",
		content: '作為網站工作室中一個很猛的部門，我們主要負責河南大學官網和部分學院官網的製作與維護。在這裡，有活潑可愛的學長學姊帶領大家一起將一個個可愛的小程式碼，變身為一個個超讚的網頁。千萬別擔心自己沒基礎喔，學長學姊會手把手教你，還在等什麼？！快來網頁部吧，給自己一次從新手變大神的華麗轉變！網頁部在這裡等各位學弟學妹喔！'
	},
	{ color: 'rgba(255, 255, 0, 0.2)',
		title: '設計部',
		link:"/nihilum",
		short:"每一筆都是靈感的流動，每一圖都是心意的表達，在像素間描繪理想的形狀。",
		content: '超讚部門，穩賺不賠！設計部主要用 PS 來設計河南大學官網輪播圖並製作網站工作室活動宣傳海報。在這裡，你可以學到圖片編輯、圖案設計等超實用的技能，在這裡你可以透過各種海報的設計展現自己的創意。相信透過學長學姊們的「手把手」教學，你一定會熟練駕馭 PS，不論你是大神還是菜鳥，我們都期待在設計部與你相遇，我們一起學習，一起進步！'
	},
	{ color: 'rgba(0, 128, 0, 0.2)',
		title: '維修部',
		link:"/display/repair",
		short:"拆解的不只是機器，更是對世界運作方式的好奇心，在螺絲與電路中修復秩序。",
		content: '還在被電腦跳出視窗搞得很煩嗎？還在苦惱別人求助電腦維修時，自己卻束手無策嗎？同學，會一技之長，走遍天下都不怕，來維修部學電腦維修知識吧！學長學姊手把手教學，帶你從零開始，玩轉電腦不是夢。重灌系統、拆機清灰、硬碟安裝……超多技能免費教學，讓你收穫滿滿，走上大神之路！'
	},
	{ color: 'rgba(0, 0, 255, 0.2)',
		title: '新傳部',
		link:"/display/newMedia.html",
		short:"文字是心跳的回聲，營運是思想的流動，我們在字裡行間種下星辰。",
		content: '我們是投身於新聞事業的小隊伍、也是工作室新媒體帳號經營的主要平台。我們主要負責審查學校官網新聞，經營新媒體帳號。在這裡，你可以欣賞到很棒的文章，在這裡你可以學會新媒體經營技術。文案撰寫、活動企劃、帳號經營、學校官網新聞審稿，你總能學到屬於你的技能。不需要有多麼優秀的文筆，只要你有一顆熱愛文字的心；不需要有帳號經營的基礎，只要你有一顆願意學習的心。在這裡，你可以盡情發揮你的聰明才智，我們為每個人提供了展現才華和個人創意的機會，相信自己，每個人都是藝術，我們在這裡等你！'
	},
	{ color: 'rgba(128, 0, 128, 0.2)',
		title: '影視部',
		link:"/display/video",
		short:"用鏡頭捕捉生活的光影，用剪輯講述屬於我們的故事，一幀一秒皆是詩。",
		content: '學什麼不如學技能。同學，多會一招也不會吃虧！影視化時代，學會影片剪輯不僅能提升就業競爭力，更能利用剪輯的副業多一份額外收入。來影視部吧，學長學姊會跟你們分享所學，帶你們從零開始學影片剪輯、特效製作、攝影錄影。在這裡，街頭採訪、好玩團康，精彩不斷！不用擔心零基礎，影視部大家庭帶你從頭學起，來吧！我們一同啟程！'
	},
]

// 动画 API
let api: ReturnType<typeof useFloatingBlocks> | null = null

// 媒体查询 ref
const isMobile = useMediaQuery('(max-width: 48rem)')

onMounted(async () => {
	// Vue 会自动填充 blockRefs 数组，所以这里不需要清空它。
	
	// 等 DOM 渲染完（v-for 的 :ref 回调也会在 nextTick 里执行）
	await nextTick()
	
	// 收集真实 DOM（过滤 null）
	const elements = blockRefs.value.filter((el): el is HTMLElement => !!el)
	
	// 如果没有元素就直接返回（安全保护）
	if (!elements.length) return
	
	// 初始化动画（传入真实元素数组）
	api = useFloatingBlocks(elements, {
		maxYDesktop: 5,
		maxYMobile: 2,
		maxX: 0.5,
		startupStaggerMs: 220,
	})
	
	api.entrance()
	
	// 桌面端默认启动 idle；移动端等待摇一摇或按钮
	if (!isMobile.value) api.start()
	
	// 监听断点切换：移动->停止；桌面->开启
	const stopWatch = watch(isMobile, (nowMobile) => {
		if (nowMobile) {
			api?.stop()
		} else {
			api?.start()
		}
	})
	
	// 总线事件（shake / 手动触发）
	const offShake = bus.on('shake:detected', () => api?.start())
	const offManualStart = bus.on('float:start', () => api?.start())
	const offManualStop = bus.on('float:stop', () => api?.stop())
	
	onUnmounted(() => {
		offShake(); offManualStart(); offManualStop()
		stopWatch()
		api?.stop()
	})
})
</script>

<template>
	<div class="external">
		<div class="internal">
			<a
				v-for="(block, i) in blocks"
				:key="i"
				:ref="el => setBlockRef(el, i)"
				:href="block.link"
				target="_blank"
				class="floating-block"
				:style="{ backgroundColor: block.color }"
			>
				<h3>{{ block.title }}</h3>
				<p class="desktop-only">{{ block.content }}</p>
				<p class="mobile-only">{{ block.short }}</p>
			</a>
		</div>
	</div>
</template>

<style scoped>
.external { width:100vw; height:100vh; padding-block:4rem; box-sizing:border-box; overflow:hidden; }
.internal {
	display:grid;
	grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
	gap: 2rem;
	justify-content:center;
	align-items:center;
	height:100%;
	padding-inline:2rem;
}

/* 每个块统一为块级布局，避免 inline 元素引起换行/对齐问题 */
.floating-block {
	display:flex;
	flex-direction:column;
	justify-content:center;
	align-items:center;
	text-decoration:none;
	color: inherit;
	padding:1.5rem;
	border-radius:.75rem;
	box-shadow:0 0.3rem 1rem rgba(0,0,0,.15);
	transition: transform .3s ease, box-shadow .3s ease;
	will-change: transform;
}
.floating-block::before {
	content: "";
	position: absolute;
	top: 0; left: 0;
	border-radius:.75rem;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.1); /* 半透明遮罩 */
	z-index: 1;
	pointer-events: none;
}

@media (max-width:48rem) {
	.internal { grid-template-columns: repeat(2,1fr); gap:1.5rem; }
	.floating-block { padding:1rem; }
}

/* 桌面显示完整，移动显示短句 */
.desktop-only { display:block; }
.mobile-only { display:none; }

@media (max-width:86rem) {
	.desktop-only { display:none; }
	.mobile-only { display:block; }
}
</style>
