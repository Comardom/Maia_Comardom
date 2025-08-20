// /src/components/display/studioContents/scripts/useShakeDetector.ts
// 说明：封装“摇一摇”检测（DeviceMotionEvent），iOS 13+ 需权限
import { bus } from '../../../../utils/eventBus';

export type ShakeOptions = {
    threshold?: number; // 加速度阈值（含重力），默认 18
    burstCount?: number; // 在窗口内需要命中的高加速度次数，默认 2
    windowMs?: number;   // 判定窗口时长，默认 600ms
    minIntervalMs?: number; // 两次触发的最小间隔，默认 1200ms
};

export function useShakeDetector() {
    let enabled = false;
    let lastFire = 0;
    let hits: number[] = []; // 时间戳集合
    let onMotion: ((e: DeviceMotionEvent) => void) | null = null;

    const opts: Required<ShakeOptions> = {
        threshold: 18,
        burstCount: 2,
        windowMs: 600,
        minIntervalMs: 1200,
    };

    const isSupported = () =>
        typeof window !== 'undefined' &&
        'DeviceMotionEvent' in window;

    async function requestPermissionIfNeeded(): Promise<boolean> {
        try {
            const DME = DeviceMotionEvent as any;
            if (typeof DME?.requestPermission === 'function') {
                const res = await DME.requestPermission();
                return res === 'granted';
            }
            return true;
        } catch {
            return false;
        }
    }


    function handleMotion(e: DeviceMotionEvent) {
        const acc = e.accelerationIncludingGravity;
        if (!acc) return;

        // 计算合加速度强度
        const ax = acc.x ?? 0, ay = acc.y ?? 0, az = acc.z ?? 0;
        const mag = Math.sqrt(ax * ax + ay * ay + az * az);

        const now = Date.now();
        // 命中高加速度阈值则记录时间
        if (mag >= opts.threshold) {
            hits.push(now);
            // 清理窗口之外的记录
            const cutoff = now - opts.windowMs;
            hits = hits.filter(t => t >= cutoff);

            // 与上次触发间隔检查
            if (hits.length >= opts.burstCount && now - lastFire >= opts.minIntervalMs) {
                lastFire = now;
                bus.emit('shake:detected');
            }
        }
    }

    async function start(custom?: ShakeOptions) {
        if (!isSupported()) return false;
        Object.assign(opts, custom || {});

        const ok = await requestPermissionIfNeeded();
        if (!ok) return false;

        if (enabled) return true;
        enabled = true;
        bus.emit('shake:enabled-changed', true);

        onMotion = handleMotion;
        window.addEventListener('devicemotion', onMotion, { passive: true });
        return true;
    }

    function stop() {
        if (!enabled) return;
        enabled = false;
        bus.emit('shake:enabled-changed', false);
        if (onMotion) {
            window.removeEventListener('devicemotion', onMotion);
            onMotion = null;
        }
        hits = [];
    }

    return { start, stop, isSupported, requestPermissionIfNeeded };
}
