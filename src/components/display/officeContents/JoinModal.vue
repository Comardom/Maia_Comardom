<template>
  <!-- 加入我们二维码弹窗：点击遮罩或右上角关闭按钮可关闭 -->
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60" @click.self="$emit('close')">
    <button
      class="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-gray-200 hover:text-white dark:hover:text-gray-100 text-2xl z-10 transition-colors duration-200"
      type="button"
      aria-label="关闭加入我们弹窗"
      @click="$emit('close')"
    >
      ×
    </button>

    <div class="bg-white dark:bg-gray-800 rounded-xl p-6 relative max-w-sm w-11/12 border border-gray-200 dark:border-gray-600 shadow-xl dark:shadow-gray-900/50">
      <img src="/displayOffice/number.jpg" alt="迎新群二维码" class="w-full h-auto rounded-md border border-gray-100 dark:border-gray-600" />
      <p class="mt-4 text-center text-gray-700 dark:text-gray-200 text-sm font-medium">长按或扫描二维码加入办公室迎新群</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// 纯展示组件：通过 v-if 控制显示，通过 close 事件告知父组件关闭
</script>

<style scoped>
/* 组件内无需额外样式，保持语义与简洁 */
</style>