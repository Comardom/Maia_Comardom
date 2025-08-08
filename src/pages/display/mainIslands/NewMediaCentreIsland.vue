<template>
	<div id="page-container">
		<main id="content-panel">
			<header id="center-header">
				<img
					src="https://www.henu.edu.cn/images/logo.png"
					alt="河南大学Logo"
					class="logo"
				/>
				<h1>河南大学新媒体中心</h1>
			</header>
			
			<section id="about-section">
				<h2>关于我们</h2>
				<p>
					又名新传部，我们是投身于新闻事业的小分队，也是工作室新媒体账号运营的主平台。
				</p>
			</section>
			
			<section id="departments-section">
				<h2>我们的职责</h2>
				<div class="departments-grid">
					<div
						class="department-card"
						v-for="(item, index) in departments"
						:key="index"
					>
						<h3>{{ item.title }}</h3>
						<p>{{ item.description }}</p>
					</div>
				</div>
			</section>
			
			<footer id="contact-footer">
				<p>加入我们</p>
				<div class="social-links">
					<a href="#" title="微信公众号">QQ迎新群:1039461214</a>
				</div>
			</footer>
		</main>
		
		<aside id="visual-panel">
			<div class="visual-content">
				<img
					src="https://plus.unsplash.com/premium_photo-1679082305850-63541e846a4a?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA0fHxsZWFybnxlbnwwfHwwfHx8MA%3D%3D"
					alt=""
				/>
			</div>
		</aside>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const departments = ref([
	{
		title: '成为官网的“守门人”，我们是学校官方声音的第一道防线。',
		description:
			'在这里，你将以最严谨的态度，审视每一条即将发布的新闻，确保信息的精准无误与时效性。你的每一次点击，都关系到学校形象的权威呈现，这份责任感将是你最宝贵的收获。',
	},
	{
		title: '我们是校园潮流的捕手，是热门话题的制造机。',
		description:
			'你将主导官方新媒体平台的日常运营，从零到一打造“爆款”内容。我们玩转最新的梗，策划最酷的线上活动，让官方账号成为每个河大学子都想置顶的“特别关注”。你的创意，将在这里引爆整个校园。',
	},
	{
		title: '在字里行间，感受文字的力量。你将成为一名真正的故事讲述者。',
		description:
			'从深度报道到趣味推文，从活动策划案到采访稿，你将在这里锤炼全方位的文案驾驭能力。我们相信，好的文字能够跨越屏幕，引发共鸣。在这里，你的每一个字，都掷地有声。',
	},
	{
		title: '成为文字的“雕刻师”，在细节中追求极致的完美。',
		description:
			'审稿不仅是寻找错别字，更是对文章逻辑、语言流畅度和事实准确性的全面打磨。你将通过字斟句酌，让每一篇新闻稿件都以最专业、最客观、最易读的面貌呈现给全校师生。这份对文字的敬畏，将是你的专业素养。',
	},
])

onMounted(() => {
	const departmentCards = document.querySelectorAll('.department-card')
	
	departmentCards.forEach((card) => {
		if (!(card instanceof HTMLElement)) return
		
		card.addEventListener('mouseenter', () => {
			card.classList.add('hovered')
			card.style.animation = 'none'
			setTimeout(() => {
				card.style.animation = ''
			}, 10)
		})
		
		card.addEventListener('mouseleave', () => {
			card.classList.remove('hovered')
		})
		
		card.addEventListener('click', (e) => {
			const ripple = document.createElement('div')
			const rect = card.getBoundingClientRect()
			const size = Math.max(rect.width, rect.height)
			const x = e.clientX - rect.left - size / 2
			const y = e.clientY - rect.top - size / 2
			
			ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
      `
			card.appendChild(ripple)
			setTimeout(() => ripple.remove(), 600)
		})
	})
	
	document.addEventListener('mousemove', (e) => {
		const mouseX = e.clientX / window.innerWidth
		const mouseY = e.clientY / window.innerHeight
		
		const floatingElements = document.querySelectorAll('.floating-circle')
		floatingElements.forEach((element) => {
			if (element instanceof HTMLElement) {
				const speed = (parseInt(element.dataset.index || '0') + 1) * 15
				const x = (mouseX - 0.5) * speed
				const y = (mouseY - 0.5) * speed
				element.style.transform = `translate(${x}px, ${y}px)`
			}
		})
		
		const shapes = document.querySelectorAll('.geometric-shape')
		shapes.forEach((shape) => {
			if (shape instanceof HTMLElement) {
				const speed = (parseInt(shape.dataset.index || '0') + 1) * 10
				const x = (mouseX - 0.5) * speed
				const y = (mouseY - 0.5) * speed
				shape.style.transform += ` translate(${x}px, ${y}px)`
			}
		})
	})
	
	const logo = document.querySelector('.logo')
	if (logo instanceof HTMLElement) {
		logo.addEventListener('click', () => {
			logo.style.animation = 'spin 1s ease-in-out'
			setTimeout(() => {
				logo.style.animation = ''
			}, 1000)
		})
	}
	
	function adjustContentSize() {
		const contentPanel = document.getElementById('content-panel')
		const container = document.getElementById('page-container')
		if (
			contentPanel instanceof HTMLElement &&
			container instanceof HTMLElement
		) {
			const containerHeight = container.offsetHeight
			const contentHeight = contentPanel.scrollHeight
			if (contentHeight > containerHeight) {
				contentPanel.style.fontSize = '0.9em'
			}
		}
	}
	
	adjustContentSize()
	window.addEventListener('resize', adjustContentSize)
	
	document.addEventListener('contextmenu', (e) => {
		e.preventDefault()
	})
	
	let clickCount = 0
	let clickTimer = null
	const clickTimeout = 500
	
	document.addEventListener('click', (e) => {
		clickCount++
		if (clickCount === 1) {
			clickTimer = setTimeout(() => {
				clickCount = 0
			}, clickTimeout)
		}
		if (clickCount === 3) {
			if (clickTimer) clearTimeout(clickTimer)
			clickCount = 0
			
			const body = document.body
			if (body) {
				body.style.filter = 'hue-rotate(0deg)'
				let hue = 0
				const rainbow = setInterval(() => {
					hue += 10
					body.style.filter = `hue-rotate(${hue}deg)`
					if (hue >= 360) {
						clearInterval(rainbow)
						body.style.filter = ''
					}
				}, 100)
			}
		}
	})
})

</script>

<style scoped>
/* --- CSS 变量与全局设置 --- */
:root {
	--primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	--secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
	--accent-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
	--text-primary: #1a1a1a;
	--text-secondary: #666666;
	--text-light: #ffffff;
	--bg-primary: #ffffff;
	--bg-glass: rgba(255, 255, 255, 0.1);
	--bg-card: rgba(255, 255, 255, 0.8);
	--shadow-light: 0 8px 32px rgba(0, 0, 0, 0.1);
	--shadow-medium: 0 16px 40px rgba(0, 0, 0, 0.15);
	--shadow-heavy: 0 24px 48px rgba(0, 0, 0, 0.2);
	--border-radius: 20px;
	--border-radius-small: 12px;
}
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

body,
html {
	width: 100vw;
	height: 100vh;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "SF Pro Display", "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
	color: var(--text-primary);
	overflow: hidden;
	user-select: none;
}

/* --- 动态背景 --- */
.animated-bg {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: -1;
	background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
	background-size: 400% 400%;
	animation: gradientShift 15s ease infinite;
}

@keyframes gradientShift {
	0% {
		background-position: 0% 50%;
	}
	
	50% {
		background-position: 100% 50%;
	}
	
	100% {
		background-position: 0% 50%;
	}
}

/* --- 浮动装饰元素 --- */
.floating-elements {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
	z-index: 1;
}

.floating-circle {
	position: absolute;
	border-radius: 50%;
	background: var(--bg-glass);
	backdrop-filter: blur(10px);
	animation: float 6s ease-in-out infinite;
}

.floating-circle:nth-child(1) {
	width: 80px;
	height: 80px;
	top: 20%;
	left: 10%;
	animation-delay: 0s;
}

.floating-circle:nth-child(2) {
	width: 120px;
	height: 120px;
	top: 60%;
	right: 15%;
	animation-delay: 2s;
}

.floating-circle:nth-child(3) {
	width: 60px;
	height: 60px;
	bottom: 20%;
	left: 20%;
	animation-delay: 4s;
}

@keyframes float {
	
	0%,
	100% {
		transform: translateY(0px) rotate(0deg);
	}
	
	50% {
		transform: translateY(-20px) rotate(180deg);
	}
}

/* --- 页面容器 --- */
#page-container {
	width: 100vw;
	height: 100vh;
	display: grid;
	grid-template-columns: 1fr 1fr;
	position: relative;
	z-index: 2;
	overflow: hidden;
}

/* --- 左侧内容面板 --- */
#content-panel {
	padding: 4vh 5vw;
	display: flex;
	flex-direction: column;
	justify-content: center;
	backdrop-filter: blur(20px);
	background: var(--bg-glass);
	position: relative;
	overflow: hidden;
}

#content-panel::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(20px);
	z-index: -1;
}

/* --- 页眉 --- */
#center-header {
	display: flex;
	align-items: center;
	gap: 20px;
	margin-bottom: 3vh;
	animation: slideInLeft 1s ease-out;
}

.logo {
	height: 50px;
	width: auto;
	filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
	transition: transform 0.3s ease;
}

.logo:hover {
	transform: scale(1.1) rotate(5deg);
}

#center-header h1 {
	font-size: clamp(1.5rem, 3vw, 2.2rem);
	font-weight: 700;
	background: var(--primary-gradient);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	letter-spacing: -0.02em;
}

/* --- 关于我们 --- */
#about-section {
	margin-bottom: 3vh;
	animation: slideInLeft 1s ease-out 0.2s both;
}

#about-section h2 {
	font-size: clamp(1.2rem, 2.5vw, 1.6rem);
	font-weight: 600;
	margin-bottom: 1.5vh;
	position: relative;
	padding-left: 25px;
	color: var(--text-primary);
}

#about-section h2::before {
	content: '';
	position: absolute;
	left: 0;
	top: 50%;
	transform: translateY(-50%);
	width: 5px;
	height: 100%;
	background: var(--accent-gradient);
	border-radius: 3px;
	box-shadow: var(--shadow-light);
}

#about-section p {
	font-size: clamp(0.9rem, 1.8vw, 1rem);
	line-height: 1.6;
	color: var(--text-secondary);
	font-weight: 400;
}

/* --- 部门卡片 --- */
#departments-section {
	animation: slideInLeft 1s ease-out 0.4s both;
	flex: 1;
	display: flex;
	flex-direction: column;
}

#departments-section h2 {
	font-size: clamp(1.2rem, 2.5vw, 1.6rem);
	font-weight: 600;
	margin-bottom: 2vh;
	position: relative;
	padding-left: 25px;
	color: var(--text-primary);
}

#departments-section h2::before {
	content: '';
	position: absolute;
	left: 0;
	top: 50%;
	transform: translateY(-50%);
	width: 5px;
	height: 100%;
	background: var(--secondary-gradient);
	border-radius: 3px;
	box-shadow: var(--shadow-light);
}

.departments-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 1.5vh 1.5vw;
	flex: 1;
}

.department-card {
	background: var(--bg-card);
	backdrop-filter: blur(20px);
	padding: 2vh 1.5vw;
	border-radius: var(--border-radius-small);
	border: 1px solid rgba(255, 255, 255, 0.2);
	box-shadow: var(--shadow-light);
	transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
	position: relative;
	overflow: hidden;
	cursor: pointer;
	display: flex;
	flex-direction: column;
}

.department-card::before {
	content: '';
	position: absolute;
	top: 0;
	left: -100%;
	width: 100%;
	height: 100%;
	background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
	transition: left 0.6s ease;
}

.department-card:hover::before {
	left: 100%;
}

.department-card.hovered {
	transform: translateY(-5px) scale(1.02);
	box-shadow: var(--shadow-heavy);
	border: 1px solid rgba(255, 255, 255, 0.4);
}

.department-card h3 {
	font-size: clamp(0.9rem, 1.8vw, 1.1rem);
	font-weight: 600;
	margin-bottom: 1vh;
	background: var(--primary-gradient);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
}

.department-card p {
	font-size: clamp(0.8rem, 1.5vw, 0.9rem);
	line-height: 1.5;
	color: var(--text-secondary);
	font-weight: 400;
}

/* --- 页脚 --- */
#contact-footer {
	margin-top: 3vh;
	padding-top: 2vh;
	border-top: 1px solid rgba(255, 255, 255, 0.2);
	animation: slideInLeft 1s ease-out 0.6s both;
}

#contact-footer p {
	font-weight: 600;
	margin-bottom: 1.5vh;
	font-size: clamp(0.9rem, 1.8vw, 1rem);
}

.social-links a {
	display: inline-block;
	text-decoration: none;
	color: var(--text-light);
	background: var(--accent-gradient);
	padding: 1vh 2vw;
	border-radius: 25px;
	font-size: clamp(0.8rem, 1.5vw, 0.9rem);
	font-weight: 500;
	box-shadow: var(--shadow-light);
	transition: all 0.3s ease;
	position: relative;
	overflow: hidden;
}

.social-links a::before {
	content: '';
	position: absolute;
	top: 0;
	left: -100%;
	width: 100%;
	height: 100%;
	background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
	transition: left 0.5s ease;
}

.social-links a:hover::before {
	left: 100%;
}

.social-links a:hover {
	transform: translateY(-3px) scale(1.05);
	box-shadow: var(--shadow-medium);
}

/* --- 右侧视觉面板 --- */
#visual-panel {
	position: relative;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
}

.visual-content {
	width: 100%;
	height: 100%;
	background: linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
	backdrop-filter: blur(10px);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: relative;
}

.geometric-shape {
	position: absolute;
	border-radius: 50%;
	background: var(--bg-glass);
	backdrop-filter: blur(15px);
	animation: rotate 20s linear infinite;
}

.shape-1 {
	width: 15vw;
	height: 15vw;
	max-width: 200px;
	max-height: 200px;
	top: 15%;
	right: 15%;
	animation-delay: 0s;
}

.shape-2 {
	width: 12vw;
	height: 12vw;
	max-width: 150px;
	max-height: 150px;
	bottom: 20%;
	left: 10%;
	animation-delay: 7s;
	border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
}

.shape-3 {
	width: 8vw;
	height: 8vw;
	max-width: 100px;
	max-height: 100px;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	animation-delay: 14s;
	border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
}

@keyframes rotate {
	0% {
		transform: rotate(0deg) scale(1);
	}
	
	33% {
		transform: rotate(120deg) scale(1.1);
	}
	
	66% {
		transform: rotate(240deg) scale(0.9);
	}
	
	100% {
		transform: rotate(360deg) scale(1);
	}
}

.visual-text {
	z-index: 10;
	text-align: center;
	color: var(--text-light);
	font-size: clamp(1rem, 2.5vw, 1.5rem);
	font-weight: 300;
	text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
	opacity: 0.8;
}

/* --- 动画关键帧 --- */
@keyframes slideInLeft {
	from {
		opacity: 0;
		transform: translateX(-50px);
	}
	
	to {
		opacity: 1;
		transform: translateX(0);
	}
}

/* --- 响应式设计 --- */
@media (max-width: 900px) {
	#page-container {
		grid-template-columns: 1fr;
	}
	
	#visual-panel {
		display: none;
	}
	
	#content-panel {
		padding: 3vh 4vw;
	}
	
	.departments-grid {
		grid-template-columns: 1fr;
		gap: 2vh;
	}
}

@media (max-width: 600px) {
	#content-panel {
		padding: 2vh 5vw;
	}
	
	#center-header {
		margin-bottom: 2vh;
	}
	
	.department-card {
		padding: 2vh 4vw;
	}
	
	#contact-footer {
		margin-top: 2vh;
		padding-top: 1.5vh;
	}
}

#about-section p {
	color: white;
}

#visual-panel img {
	width: 100%;
	height: auto;
	border-radius: var(--border-radius);
	box-shadow: var(--shadow-medium);
}

/* --- 从 script.js 迁移过来的 Keyframes --- */
@keyframes ripple {
	to {
		transform: scale(2);
		opacity: 0;
	}
}

@keyframes spin {
	from {
		transform: rotate(0deg);
	}
	
	to {
		transform: rotate(360deg);
	}
}
</style>
