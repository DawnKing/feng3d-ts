declare module feng.ds.compare {
    /**
     * 数字排序
     * @param   a   数字a
     * @param   b   数字b
     * @return      小于0：a在前；等于0：顺序不变；大于0：b在前
     */
    function compareNumber(a: number, b: number): number;
}
declare module feng.ds.utils {
    /**
     * 二分查找
     * @param   array   数组
     * @param	target	寻找的目标
     * @param	compare	比较函数
     * @param   start   起始位置
     * @param   end     结束位置
     * @return          目标所在位置（如果该位置上不是目标对象，则该索引为该目标可插入的位置）
     */
    function binarySearch<T>(array: T[], target: T, compare: (a: T, b: T) => number, start: number, end: number): number;
}
declare module feng.ds {
    /**
     * 集合
     * @author feng 2016-4-17
     */
    interface Collection<T> {
        /**
         * 是否包含指定元素
         * @param item       元素
         */
        contains(item: T): boolean;
        /**
         * 清理
         */
        clear(): void;
        /**
         * 获取一个迭代器，用于遍历集合
         */
        getIterator(): Iterator<T>;
        /**
         * 元素数量
         */
        count: number;
        /**
         * 集合尺寸
         */
        size: number;
        /**
         * 输出所有元素到数组
         */
        toArray(): T[];
    }
}
declare module feng.ds {
    /**
     * 迭代器
     * @author feng 2016-4-17
     */
    interface Iterator<T> {
        /**
         * 返回当前元素并且指针移到下一个元素
         */
        next(): T;
        /**
         * 是否有下一个元素
         */
        hasNext(): boolean;
        /**
         * 移到起始位置
         */
        start(): void;
        /**
         * 指向的当前元素
         */
        data: T;
    }
}
declare module feng.ds {
    /**
     * 优先数组迭代器
     * @author feng 2016-4-17
     */
    class PriorityArrayIterator<T> implements Iterator<T> {
        /**
         * 优先数组
         */
        private priorityArray;
        /**
         * 光标、指针
         */
        private cursor;
        /**
         * 构建优先数组迭代器
         * @param priorityArray     优先数组
         */
        constructor(priorityArray: PriorityArray<T>);
        /**
         * 返回当前元素并且指针移到下一个元素
         */
        next(): T;
        /**
         * 是否有下一个元素
         */
        hasNext(): boolean;
        /**
         * 移到起始位置
         */
        start(): void;
        /**
         * 指向的当前元素
         */
        data: T;
    }
}
declare module feng.ds {
    /**
     * 优先数组
     * @author feng 2016-4-17
     */
    class PriorityArray<T> implements Collection<T> {
        /**
         * 数据
         */
        private data;
        /**
         * 比较函数
         */
        private compare;
        /**
         * 构建优先数组
         * @param   compare     比较函数
         */
        constructor(compare: (a: T, b: T) => number);
        /**
         * 是否包含指定元素
         * @param item       元素
         */
        contains(item: T): boolean;
        /**
         * 清理
         */
        clear(): void;
        /**
         * 获取优先数组迭代器
         */
        getIterator(): PriorityArrayIterator<T>;
        /**
         * 元素数量
         */
        count: number;
        /**
         * 集合尺寸
         */
        size: number;
        /**
         * 输出所有元素到数组
         */
        toArray(): T[];
        /**
         * 获取元素
         * @param   index   索引
         */
        getAt(index: number): T;
    }
}
