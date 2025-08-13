import { ref, onMounted, onUnmounted, computed, type Ref } from "vue"

export function useBreathingMode(isDark: Ref<boolean>, threshold = 10) {
    const isScrolled = ref(false)

    const updateScrollState = () => {
        isScrolled.value = window.scrollY > threshold
    }

    onMounted(() => {
        window.addEventListener("scroll", updateScrollState, { passive: true })
        updateScrollState()
    })

    onUnmounted(() => {
        window.removeEventListener("scroll", updateScrollState)
    })

    const breathingClasses = computed(() => {
        return isScrolled.value
            ? [isDark.value ? "breathe-dark" : "breathe-light"]
            : ["breathe-stretch"]
    })

    return {
        breathingClasses,
        isScrolled,
    }
}
