// src/utils/eventBus.ts
import mitt from 'mitt';

// 定义可以触发的事件及其载荷类型
type Events = {
    changeSection: 'next' | 'prev';
    sectionChanged: { newIndex: number; total: number; };
};
// 创建并导出 eventBus 实例
export const eventBus = mitt<Events>();





type BusEventMap = {
    'shake:detected': void;           // 摇一摇命中
    'float:start': void;              // 手动开始漂浮
    'float:stop': void;               // 手动停止漂浮
    'shake:enabled-changed': boolean; // 摇一摇开关状态
};
class TypedBus {
    private target = new EventTarget();

    on<K extends keyof BusEventMap>(type: K, handler: (e: CustomEvent<BusEventMap[K]>) => void) {
        const fn = handler as EventListener;
        this.target.addEventListener(type, fn);
        return () => this.target.removeEventListener(type, fn);
    }

    emit<K extends keyof BusEventMap>(type: K, detail?: BusEventMap[K]) {
        this.target.dispatchEvent(new CustomEvent(type, { detail }));
    }
}
export const bus = new TypedBus();

