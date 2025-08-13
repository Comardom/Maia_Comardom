export function setupSmoothSnapScroll() {
    const sections = Array.from(document.querySelectorAll<HTMLElement>(".snap-section"));
    if (sections.length === 0) return;

    let currentIndex = 0;
    let isScrolling = false;

    function smoothScrollTo(targetY: number, duration = 600) {
        const startY = window.scrollY;
        const distance = targetY - startY;
        let startTime: number | null = null;

        function easeOutCubic(t: number): number {
            return 1 - Math.pow(1 - t, 3);
        }

        function step(timestamp: number) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = easeOutCubic(progress);
            window.scrollTo(0, startY + distance * eased);
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }

        requestAnimationFrame(step);
    }

    function scrollTo(index: number) {
        if (index < 0 || index >= sections.length) return;
        isScrolling = true;
        const target = sections[index];
        const targetY = target.offsetTop;
        smoothScrollTo(targetY, 700);
        currentIndex = index;
        setTimeout(() => {
            isScrolling = false;
        }, 750);
    }

    window.addEventListener("wheel", (e) => {
        if (isScrolling) return;

        if (e.deltaY > 30) {
            scrollTo(currentIndex + 1);
        } else if (e.deltaY < -30) {
            scrollTo(currentIndex - 1);
        }
    }, { passive: true });

    // 初始化当前 index
    const observer = new IntersectionObserver(
        (entries) => {
            const visible = entries.find(e => e.isIntersecting);
            if (visible) {
                const i = sections.indexOf(visible.target as HTMLElement);
                if (i !== -1) currentIndex = i;
            }
        },
        { threshold: 0.6 }
    );
    sections.forEach(section => observer.observe(section));
}
