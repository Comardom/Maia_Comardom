<script setup lang="ts">
//监测黑白主题
import { useThemeObserver } from "../../../utils/useThemeObserver.ts"
const { isDark } = useThemeObserver()
//展示照片引入
import {computed} from "vue";
import {fullScreenPhotoMap} from "./scripts/fullScreenPhotoMap.ts";
const photoSrc =  computed(() => fullScreenPhotoMap[isDark.value ? 'dark' : 'light'])
//内容实时编辑
defineProps<{
	
}>();
</script>

<template>
	<div class="fullscreen-photo">
		<img :src=photoSrc alt="light photo" loading="lazy" />
		<!-- 暗色模式内容 -->
		<div v-if="isDark" class="content dark-content">
			<h1>河南大学网站工作室</h1>
			<p>在无风的夜晚默默挠一根弦，击打着水波越过倒映的月，萦绕在池塘的轮廓边，连水痕也不曾留下过，只是悄悄地靠在月边，默默看着那静止的粼粼。</p>
<!--			<p>Speramus cursum sub sole, Amor tuus nos protegat.</p>-->
		</div>
		
		<!-- 亮色模式内容 -->
		<div v-else class="content light-content">
			<h1>河南大学网站工作室</h1>
			<p>于是那几束开天的丝，便得寸进尺般的摇曳，反复闪动。每一次那样的闪动，天都会不可抗的，增加一丝光亮，划破一点凝固的气流。</p>
<!--			<p>Oramus iter per astra, Lux tua nos dirigat.</p>-->
		</div>
	</div>
</template>

<style scoped>
@font-face {
	font-family: 'Taiwan';
	src: url('/subset_font.woff2') format('woff2');
	font-weight: normal;
	font-style: normal;
	font-display: swap; /* 推荐：确保字体加载时的用户体验 */
}
h1,p{
	font-family: 'Taiwan',serif;
}
h1{
	font-size: 2rem;
}
p{
	font-size: 1.125rem;
}
.fullscreen-photo {
	position: relative;
	width: 100vw;
	height: 100vh;
	overflow: hidden;
}

.fullscreen-photo img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: center;
	display: block;
	opacity: 0.2;
	filter: brightness(0.3);
}

.content {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 10;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

p {
	text-align: center;
	padding: 2rem;
}

</style>