// src/utils/horizontalScroll.js

export function initHorizontalScroll(selector = '.horizontal-scroll', enableHashJump = false) {
    const el = document.querySelector(selector);
    if (!el) return;

    // 滚轮横向滚动 + 节流
    let ticking = false;
    el.addEventListener('wheel', (e) => {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(() => {
                if (el.scrollWidth > el.clientWidth) {
                    e.preventDefault();
                    el.scrollBy({ left: e.deltaY, behavior: 'auto' });
                }
                ticking = false;
            });
        }
    }, { passive: false });

    // Hash导航定位（锚点跳转转 scrollLeft）
    if (enableHashJump) {
        window.addEventListener('hashchange', () => {
            const id = location.hash.slice(1);
            const target = document.getElementById(id);
            if (target && el.contains(target)) {
                const offsetLeft = target.offsetLeft - el.offsetLeft;
                el.scrollTo({ left: offsetLeft, behavior: 'smooth' });
            }
        });
    }
}
