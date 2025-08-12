//useThemeObserver.ts
import { ref, onMounted, onUnmounted } from 'vue'

export function useThemeObserver() {
    const isDark = ref(false)
    let observer: MutationObserver | null = null

    onMounted(() => {
        const htmlClassList = document.documentElement.classList
        isDark.value = htmlClassList.contains('dark')

        observer = new MutationObserver(() => {
            isDark.value = htmlClassList.contains('dark')
        })

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        })
    })

    onUnmounted(() => {
        if (observer) observer.disconnect()
    })

    return { isDark }
}
