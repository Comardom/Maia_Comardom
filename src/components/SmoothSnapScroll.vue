<script setup lang="ts">
import { onMounted } from "vue";
import { setupSmoothSnapScroll } from "../utils/smoothSnapScroll";

onMounted(() => {
	setupSmoothSnapScroll();
});

</script>

<template>
<!--无需渲染-->
</template>
