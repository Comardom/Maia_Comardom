// src/utils/eventBus.ts
import mitt from 'mitt';

// 定义可以触发的事件及其载荷类型
type Events = {
    changeSection: 'next' | 'prev';
    sectionChanged: { newIndex: number; total: number; };
};

// 创建并导出 eventBus 实例
export const eventBus = mitt<Events>();