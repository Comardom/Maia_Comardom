<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="loading-spinner"></span>
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "medium",
  disabled: false,
  loading: false,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const buttonClasses = computed(() => [
  "base-button",
  `base-button--${props.variant}`,
  `base-button--${props.size}`,
  {
    "base-button--disabled": props.disabled,
    "base-button--loading": props.loading,
  },
]);

const handleClick = (event: MouseEvent): void => {
  if (props.disabled || props.loading) return;
  emit("click", event);
};
</script>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 0; /* square edges */
  font-family: inherit;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
  position: relative;
  overflow: hidden;
}

.base-button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Variants */
.base-button--primary {
  background: var(--brand-gradient);
  color: var(--color-white);
  box-shadow: var(--shadow-md);
}

.base-button--primary:hover:not(.base-button--disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.base-button--secondary {
  background: var(--color-gray-100);
  color: var(--color-text-primary);
  border: 1px solid var(--color-gray-200);
}

.base-button--secondary:hover:not(.base-button--disabled) {
  background: var(--color-gray-200);
  transform: translateY(-1px);
}

.base-button--outline {
  background: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
}

.base-button--outline:hover:not(.base-button--disabled) {
  background: var(--color-primary);
  color: var(--color-white);
}

.base-button--ghost {
  background: transparent;
  color: var(--color-primary);
  border: none;
}

.base-button--ghost:hover:not(.base-button--disabled) {
  background: var(--color-gray-100);
}

/* Sizes */
.base-button--small {
  padding: var(--spacing-2) var(--spacing-3);
  font-size: var(--font-size-sm);
  min-height: 32px;
}

.base-button--medium {
  padding: var(--spacing-3) var(--spacing-4);
  font-size: var(--font-size-base);
  min-height: 40px;
}

.base-button--large {
  padding: var(--spacing-4) var(--spacing-6);
  font-size: var(--font-size-lg);
  min-height: 48px;
}

/* Responsive (mobile) adjustments */
@media (max-width: 480px) {
  .base-button--small {
    padding: var(--spacing-1) var(--spacing-2);
    font-size: var(--font-size-xs);
    min-height: 28px;
  }

  .base-button--medium {
    padding: var(--spacing-2) var(--spacing-3);
    font-size: var(--font-size-sm);
    min-height: 36px;
  }

  .base-button--large {
    padding: var(--spacing-3) var(--spacing-5);
    font-size: var(--font-size-base);
    min-height: 44px;
  }
}

/* States */
.base-button--disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

.base-button--loading {
  cursor: wait;
}

/* Loading spinner */
.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Active & ripple effect */
.base-button:active:not(.base-button--disabled) {
  transform: translateY(1px);
  box-shadow: var(--shadow-sm);
}

.base-button::after {
  content: "";
  position: absolute;
  inset: 0;
  background: currentColor;
  opacity: 0;
  transition: opacity var(--duration-fast) var(--ease-out);
  pointer-events: none;
}

.base-button:active::after {
  opacity: 0.1;
}
</style>
