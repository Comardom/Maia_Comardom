<script setup lang="ts">
//监测黑白主题
import { useThemeObserver } from "../../../utils/useThemeObserver.ts"
const { isDark } = useThemeObserver()
//展示照片引入
import {computed} from "vue";
import {fullScreenPhotoMap} from "./fullScreenPhotoMap.ts";
const photoSrc =  computed(() => fullScreenPhotoMap[isDark.value ? 'dark' : 'light'])
//内容实时编辑
defineProps<{
	message: string
}>();
</script>

<template>
	<div class="fullscreen-photo">
		<img :src=photoSrc alt="light photo" loading="lazy" />
		<div class="content">
			<p>{{message}}</p>
		</div>
	</div>
</template>

<style scoped>
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
	align-items: center;
	justify-content: center;
}

p {
	color: white;
	font-weight: bold;
	font-size: 200px;
}

</style>