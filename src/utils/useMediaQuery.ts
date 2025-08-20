// /src/utils/useMediaQuery.ts
import { ref, onMounted, onUnmounted } from 'vue';

export function useMediaQuery(query: string) {
    const matches = ref(false);
    let mql: MediaQueryList | null = null;

    const handler = (e: MediaQueryListEvent) => { matches.value = e.matches; };

    onMounted(() => {
        mql = window.matchMedia(query);
        matches.value = mql.matches;
        mql.addEventListener('change', handler);
    });

    onUnmounted(() => { mql?.removeEventListener('change', handler); });

    return matches;
}
