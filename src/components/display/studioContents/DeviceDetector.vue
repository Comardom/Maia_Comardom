<script setup lang="ts">
import { onMounted } from "vue";
import { detectDevice } from "../../../utils/detectDevice";

onMounted(() => {
	const device = detectDevice();
	document.body.classList.add(device.isMobile ? "is-mobile" : "is-desktop");
	document.body.classList.add(`os-${device.os.toLowerCase().replace(/\s/g, "-")}`);
});
</script>

<template>
	<!-- 不渲染任何内容，只负责挂载逻辑 -->
</template>
