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
		title: '办公室',
		link:"",
		short:"在温柔的秩序中编织热情，我们用沟通与协作把彼此的心靠得更近。",
		content: '办公室是一个温暖和谐的大家庭，主要负责活动策划、值班安排、场地申请等工作能极大锻炼个人沟通交流能力与组织协调能力，这里有帅气开朗的学长，也有美丽大方的学姐，没有部长与部员的距离感大家都是彼此的好朋友，可以自由自在地做想做的事情。如果你是社恐星人，我们建议你加入办公室，因为我们致力于将社恐锻炼为社牛。如果你是社牛星人，我们建议你加入办公室，因为我们也是社牛星球的常驻民。入股不亏，不要犹豫，快来吧!'
	},
	{ color: 'rgba(255, 165, 0, 0.2)',
		title: '网页部',
		link:"",
		short:"代码是我们的诗，网页是我们的画，在逻辑与美感之间建造数字的家园。",
		content: '作为网站工作室中一个高大上的部门，我们主要负责河南大学官网和部分学院官网的制作与维护。在这里，有活泼可爱的学长学姐带领大家一起将一个个可爱的小代码转化为一个个高大上的网页。千万不要担心自己没基础哦，学长学姐会手把手教还在等什么?!快来网页部吧，给自己一次从小白到大佬的华丽转变!网页部在这里恭候各位小学弟小学妹哦'
	},
	{ color: 'rgba(255, 255, 0, 0.2)',
		title: '设计部',
		link:"",
		short:"每一笔都是灵感的流动，每一图都是心意的表达，在像素间描绘理想的形状。",
		content: '宝藏部门，入股不亏!设计部主要应用PS来设计河南大学官网轮播图并制作网站工作室活动宣传海报。在这里，你可以收获图片编辑、图案设计等现代社会实用技能，在这里你可以通过多样化海报的设计表达自己的创意，相信通过学长学姐们的“手把手”培训，你一定会熟练掌握PS，不论你是大佬还是小白,我们都期待在设计部与你相遇，我们起学习，共同进步!'
	},
	{ color: 'rgba(0, 128, 0, 0.2)',
		title: '维修部',
		link:"",
		short:"拆解的不只是机器，更是对世界运作方式的好奇心，在螺丝与电路中修复秩序。",
		content: '还在为电脑弹窗所困扰吗?还在苦恼他人求助电脑维修时无能为力吗?同学，身怀绝技，走遍天下都不怕，来维修部学习电脑维修知识吧!学长学姐手把手教学，带你从零起步，玩转电脑不是梦重装系统拆机清灰、硬盘安装…诸多技能免费教学，让你收获满满，走上大神之路!'
	},
	{ color: 'rgba(0, 0, 255, 0.2)',
		title: '新传部',
		link:"",
		short:"文字是心跳的回声，运营是思想的流动，我们在字里行间种下星辰。",
		content: '我们是投身于新闻事业的小分队、也是工作室新媒体账号运营的主平台。我们主要负贵审查学校官网新闻，运营新媒体账号，在这里，你可以欣赏到优美的文章，在这里你可以掌握新媒体运营技术，在这里，文案撰写、活动策划、账号运营、学校官网新闻审稿，你总能收获属于你的技能。不需要有多么优秀的文笔只要你有一颗热爱文字的心，不需要有账号运营的基础，只要你有一颗愿意学习的在这里，你可以尽情发挥你的聪明才心。智，我们为每个人提供了展示才华和个人创意的机会，相信自己，每个人都是艺术，我们在这里等你!'
	},
	{ color: 'rgba(128, 0, 128, 0.2)',
		title: '视频部',
		link:"",
		short:"用镜头捕捉生活的光影，用剪辑讲述属于我们的故事，一帧一秒皆是诗。",
		content: '练啥不如练技术，学啥不如学技能。同学技多不压身哦!视频化时代，掌握视频剪辑技能不仅能增强就业竞争力，更能利用剪辑副业多一份外快收入。来视频部吧学长学姐将与你们分享所学，带你们从0到1学习视频剪辑、特效制作、摄影录像在这里，街头采访，趣味团建，精彩不断!不用担心零基础，视频部大家庭带你从零起步，来吧!我们一同启程!'
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

@media (max-width:48rem) {
	.desktop-only { display:none; }
	.mobile-only { display:block; }
}
</style>
