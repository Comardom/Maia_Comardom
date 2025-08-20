<script setup lang="ts">
import { onMounted } from "vue";
import { setupSnapSectionObserver } from "./scripts/snapObserver.ts";

onMounted(() => {
	setupSnapSectionObserver();
});
</script>

<template>
	<!-- 这个组件不渲染任何内容，只负责挂载逻辑 -->
</template>
