// /src/components/display/studioContents/scripts/useFloatingBlocks.ts
import gsap from 'gsap';

export type FloatOptions = {
    maxYDesktop?: number; // 桌面端上下范围一半（rem），默认 5
    maxYMobile?: number;  // 移动端上下范围一半（rem），默认 2
    maxX?: number;        // 左右范围一半（rem），默认 0.5
    mobileMedia?: string; // 移动端媒体查询，默认 "(max-width: 48rem)"
    startupStaggerMs?: number; // 启动错峰
};

type TweenMap = Map<HTMLElement, gsap.core.Tween>;

export function useFloatingBlocks(blocks: HTMLElement[], options?: FloatOptions) {
    const opts: Required<FloatOptions> = {
        maxYDesktop: 5,
        maxYMobile: 2,
        maxX: 0.5,
        mobileMedia: '(max-width: 48rem)',
        startupStaggerMs: 300,
        ...options,
    };

    const idleTweens: TweenMap = new Map();
    let entered = false;

    function isMobile() {
        return typeof window !== 'undefined' &&
            window.matchMedia(opts.mobileMedia).matches;
    }

    function entrance() {
        if (entered) return;
        entered = true;
        gsap.from(blocks, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
        });
    }

    // 为每个元素做“递归随机目标”的 idle 漂浮
    function makeFloat(el: HTMLElement) {
        const yRange = isMobile() ? opts.maxYMobile : opts.maxYDesktop;
        const xRange = opts.maxX;

        const tween = gsap.to(el, {
            x: `${(Math.random() - 0.5) * (2 * xRange)}rem`, // [-xRange, xRange]
            y: `${(Math.random() - 0.5) * (2 * yRange)}rem`, // [-yRange, yRange]
            duration: 3 + Math.random() * 2,
            ease: 'sine.inOut',
            onComplete: () => {
                // 递归刷新
                if (idleTweens.has(el)) {
                    makeFloat(el);
                }
            },
        });

        idleTweens.set(el, tween);
    }

    function start() {
        // 已经在漂浮则忽略
        if (idleTweens.size) return;
        blocks.forEach((el, i) => {
            setTimeout(() => makeFloat(el), i * opts.startupStaggerMs);
        });
    }

    function stop() {
        idleTweens.forEach((tw, el) => {
            tw.kill();
            // 回到较近的自然位置（非必须）
            gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'power2.out' });
        });
        idleTweens.clear();
    }

    // 轻微“击打”一下（不破坏 idle）
    function nudge(intensity = 0.8) {
        blocks.forEach(el => {
            gsap.to(el, {
                y: `+=${intensity}rem`,
                duration: 0.22,
                yoyo: true,
                repeat: 1,
                ease: 'power1.out',
            });
        });
    }

    return { entrance, start, stop, nudge };
}
