<script setup lang="ts">
//监测黑白主题
import { useThemeObserver } from "../../../utils/useThemeObserver.ts"
const { isDark } = useThemeObserver()
//内容实时编辑
defineProps<{
	h1: string,
	message: string
	
}>();
</script>

<template>
	<div class="external">
		<div class="internal">
			<h1>{{h1}}</h1>
			<h2>{{message}}</h2>
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
	font-weight: bold;
}

</style>