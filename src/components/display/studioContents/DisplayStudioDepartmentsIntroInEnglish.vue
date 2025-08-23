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
		title: 'Office',
		link:"/display/office",
		short:"We weave passion into a gentle order, using communication and collaboration to bring our hearts closer together.",
		content: 'The Office Department is a warm and harmonious family. We are mainly responsible for event planning, duty scheduling, and venue applications, which greatly train individuals in communication and organizational skills. Here, you\'ll find handsome and cheerful senior students and beautiful and generous senior students. There is no sense of distance between ministers and members; we are all good friends, free to do what we want. If you are a social phobia person, we recommend you join the Office Department because we are committed to turning social phobia into social extroverts. If you are a social extrovert, we recommend you join the Office Department because we are also permanent residents of the social extrovert planet. It\'s a good deal, don\'t hesitate, come on!'
	},
	{ color: 'rgba(255, 165, 0, 0.2)',
		title: 'Web Department',
		link:"/display/web.html",
		short:"Code is our poetry, webpages are our paintings. We build a digital home between logic and aesthetics.",
		content: 'As a distinguished department in the Web Studio, we are mainly responsible for the creation and maintenance of the official website of Henan University and some college websites. Here, lively and cute senior students will lead everyone to transform adorable little codes into elegant webpages. Don\'t worry if you have no foundation; senior students will teach you hand-in-hand. What are you waiting for?! Come to the Web Department for a magnificent transformation from a novice to a master! The Web Department is waiting for you, little junior students!'
	},
	{ color: 'rgba(255, 255, 0, 0.2)',
		title: 'Design Department',
		link:"/nihilum",
		short:"Every stroke is a flow of inspiration, every image an expression of the heart. We shape ideals in pixels.",
		content: 'A treasure department, a worthy investment! The Design Department mainly uses PS to design the carousel images for the official website of Henan University and create promotional posters for Web Studio events. Here, you can gain practical modern skills such as image editing and graphic design. Here, you can express your creativity through the design of diverse posters. I believe that with the "hand-in-hand" training from senior students, you will master PS. Whether you are a master or a novice, we look forward to meeting you in the Design Department. Let\'s learn and progress together!'
	},
	{ color: 'rgba(0, 128, 0, 0.2)',
		title: 'Repair Department',
		link:"/display/repair",
		short:"It's not just about dismantling machines, but about curiosity for how the world works. We restore order through screws and circuits.",
		content: 'Are you still bothered by computer pop-ups? Are you still worried about being unable to help when others ask for computer repairs? My fellow student, having a special skill allows you to travel anywhere without fear. Come to the Repair Department to learn computer repair knowledge! Senior students will teach you hand-in-hand, taking you from zero to hero. Reinstalling systems, disassembling for dust cleaning, installing hard drives... numerous skills are taught for free, so you will leave with a wealth of knowledge and embark on the path of a master!'
	},
	{ color: 'rgba(0, 0, 255, 0.2)',
		title: 'New Media Centre',
		link:"/display/newMedia.html",
		short:"Words are the echo of a heartbeat, operations are the flow of ideas. We plant stars between the lines.",
		content: 'We are the small team dedicated to journalism and the main platform for operating the studio\'s new media accounts. We are mainly responsible for reviewing news on the university\'s official website and managing new media accounts. Here, you can appreciate beautiful articles and master new media operation techniques. Here, you will always gain skills in copywriting, event planning, account management, and news review. You don\'t need to have excellent writing skills; you just need a heart that loves words. You don\'t need a foundation in account management; you just need a heart willing to learn. Here, you can fully utilize your cleverness and creativity. We provide every person with the opportunity to show their talent and personal creativity. Believe in yourself, everyone is art. We are waiting for you here!'
	},
	{ color: 'rgba(128, 0, 128, 0.2)',
		title: 'Video Department',
		link:"/display/video",
		short:"We capture the light and shadow of life with our lenses and tell our own stories through editing. Every frame and every second is a poem.",
		content: 'Training a skill is better than anything else. My fellow student, having multiple skills is never a burden! In this video-centric era, mastering video editing skills can not only enhance your employability but also provide extra income through side jobs. Come to the Video Department! Senior students will share what they\'ve learned with you, taking you from zero to one in learning video editing, special effects, and videography. Here, we have street interviews, fun team-building activities, and endless excitement! Don\'t worry about having zero foundation; the Video Department family will take you from scratch. Come on! Let\'s embark on this journey together!'
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
