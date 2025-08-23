<template>
  <div :class="cardClasses" @click="handleClick">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  elevation?: "none" | "low" | "medium" | "high";
  hoverable?: boolean;
  clickable?: boolean;
  padding?: "none" | "small" | "medium" | "large";
}

const props = withDefaults(defineProps<Props>(), {
  elevation: "low",
  hoverable: false,
  clickable: false,
  padding: "medium",
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const cardClasses = computed(() => [
  "base-card",
  `base-card--elevation-${props.elevation}`,
  `base-card--padding-${props.padding}`,
  {
    "base-card--hoverable": props.hoverable,
    "base-card--clickable": props.clickable,
  },
]);

const handleClick = (event: MouseEvent): void => {
  if (props.clickable) {
    emit("click", event);
  }
}

</script>

<style scoped>
.base-card {
  background: var(--color-white);
  border-radius: 0; /* from 12px to square edges */
  transition: all var(--duration-normal) var(--ease-out);
  position: relative;
  overflow: hidden;
}

/* Elevations */
.base-card--elevation-none {
  box-shadow: none;
}

.base-card--elevation-low {
  box-shadow: var(--shadow-sm);
}

.base-card--elevation-medium {
  box-shadow: var(--shadow-md);
}

.base-card--elevation-high {
  box-shadow: var(--shadow-lg);
}

/* Padding */
.base-card--padding-none {
  padding: 0;
}

.base-card--padding-small {
  padding: var(--spacing-4);
}

.base-card--padding-medium {
  padding: var(--spacing-6);
}

.base-card--padding-large {
  padding: var(--spacing-8);
}

/* Interactive states */
.base-card--hoverable:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

.base-card--clickable {
  cursor: pointer;
}

.base-card--clickable:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.base-card--clickable:active {
  transform: translateY(0);
  box-shadow: var(--shadow-md);
}

/* Ripple effect */
.base-card--clickable {
  position: relative;
  overflow: hidden;
}
.base-card--clickable::after {
  content: "";
  position: absolute;
  inset: 0;
  background: currentColor;
  opacity: 0;
  transition: opacity var(--duration-fast) var(--ease-out);
  pointer-events: none;
}
.base-card--clickable:active::after {
  opacity: 0.05;
}

/* Focus styles for accessibility */
.base-card--clickable:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .base-card--padding-medium {
    padding: var(--spacing-4);
  }

  .base-card--padding-large {
    padding: var(--spacing-6);
  }
}

/* Mobile (<480px) padding tweaks */
@media (max-width: 480px) {
  .base-card--padding-medium {
    padding: var(--spacing-4);
  }

  .base-card--padding-large {
    padding: var(--spacing-5);
  }
}
</style>
