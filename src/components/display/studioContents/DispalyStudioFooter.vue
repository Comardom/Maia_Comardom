<script setup lang="ts">
//监测黑白主题
import { useThemeObserver } from "../../../utils/useThemeObserver.ts"
const { isDark } = useThemeObserver()
//内容实时编辑
defineProps<{
}>();
</script>

<template>
	<div class="external">
		<div class="internal">
			<a href="https://www.henu.edu.cn">河南大学官网</a>
			<br />
			<a href="https://dwbgs.henu.edu.cn">河南大学党委办公室</a>
			<br />
			<a href="https://news.henu.edu.cn">河南大学新闻网</a>
			<br />
			<a href="https://space.bilibili.com/378145694">bilibili</a>
			<br />
			<p>© 2025 河南大学网站工作室 | HENU Web Studio. All rights reserved.</p>
		</div>
	</div>
</template>

<style scoped>
.external {
	position: relative;
	width: 100vw;
	height: 100vh;
	overflow: hidden;
}
.internal {
	position: absolute;
	z-index: 10;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	padding: 0 1rem;
	box-sizing: border-box;
}
@media (min-width: 48rem) {
	.internal {
		padding: 0 3rem;  /* 大屏更多留白 */
	}
}

@media (max-width: 48rem) {
	.internal {
		padding: 1rem;
		font-size: 1.1rem;
		writing-mode: vertical-rl;        /* 垂直从右到左 */
		text-orientation: mixed;          /* 中文竖排，英文横排 */
		align-items: center;
		justify-content: center;
	}
	
	a, p {
		font-size: 0.85rem;
		margin: 0.5rem 0;
		white-space: nowrap;              /* 防止自动换行 */
	}
}



</style>