declare module feng3d {
    /**
     * feng3d引擎
     * @author feng 2014-3-14
     */
    class Feng3D {
        static WEBSITE_URL: string;
        static MAJOR_VERSION: number;
        static MINOR_VERSION: number;
        static REVISION: number;
    }
}
declare module feng3d {
    /**
     * 构建Map类代替Dictionary
     */
    class Map<K, V> {
        /**
         * key,value组合列表
         */
        private list;
        /**
         * 删除
         */
        delete(k: K): void;
        /**
         * 添加映射
         */
        push(k: K, v: V): void;
        /**
         * 通过key获取value
         */
        get(k: K): V;
        /**
         * 获取键列表
         */
        getKeys(): K[];
        /**
         * 清理字典
         */
        clear(): void;
        /**
         * 通过key获取(key,value)组合
         */
        private _getKV(k);
    }
}
declare module feng3d {
    /**
     * @language en_US
     * Returns a reference to the class object of the class specified by the name parameter.
     * @param name The name of a class.
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/utils/getDefinitionByName.ts
     */
    /**
     * @language zh_CN
     * 返回 name 参数指定的类的类对象引用。
     * @param name 类的名称。
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/utils/getDefinitionByName.ts
     */
    function getDefinitionByName(name: string): any;
}
declare var __global: any;
declare module feng3d {
    /**
     * @language en_US
     * Return the fully qualified class name of an object
     * @param value The object for which a fully qualified class name is desired. Any JavaScript value may be passed to
     * this method including all available JavaScript types, object instances, primitive types such as number, and class objects.
     * @returns A string containing the fully qualified class name.
     * @example
     * <pre>
     *  egret.getQualifiedClassName(egret.DisplayObject) //return "egret.DisplayObject"
     * </pre>
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/utils/getQualifiedClassName.ts
     */
    /**
     * @language zh_CN
     * 返回对象的完全限定类名。
     * @param value 需要完全限定类名称的对象，可以将任何 JavaScript 值传递给此方法，包括所有可用的 JavaScript 类型、对象实例、原始类型
     * （如number)和类对象
     * @returns 包含完全限定类名称的字符串。
     * @example
     * <pre>
     *  egret.getQualifiedClassName(egret.DisplayObject) //返回 "egret.DisplayObject"
     * </pre>
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/utils/getQualifiedClassName.ts
     */
    function getQualifiedClassName(value: any): string;
}
declare module feng3d {
    /** @language en_US
     * Returns the fully qualified class name of the base class of the object specified by the value parameter.
     * @param value The object for which a parent class is desired. Any JavaScript value may be passed to this method including
     * all available JavaScript types, object instances, primitive types such as number, and class objects.
     * @returns  A fully qualified base class name, or null if none exists.
     * @example
     * <pre>
     *  egret.getQualifiedSuperclassName(egret.Bitmap) //return "egret.DisplayObject"
     * </pre>
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/utils/getQualifiedSuperclassName.ts
     */
    /**
     * @language zh_CN
     * 返回 value 参数指定的对象的基类的完全限定类名。
     * @param value 需要取得父类的对象，可以将任何 JavaScript 值传递给此方法，包括所有可用的 JavaScript 类型、对象实例、原始类型（如number）和类对象
     * @returns 完全限定的基类名称，或 null（如果不存在基类名称）。
     * @example
     * <pre>
     *  egret.getQualifiedSuperclassName(egret.Sprite) //返回 "egret.DisplayObject"
     * </pre>
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/utils/getQualifiedSuperclassName.ts
     */
    function getQualifiedSuperclassName(value: any): string;
}
declare module feng3d {
    /**
     * 自定义事件
     * @author warden_feng 2014-5-7
     */
    class Event {
        /**
         * [广播事件] 进入新的一帧,监听此事件将会在下一帧开始时触发一次回调。这是一个广播事件，可以在任何一个显示对象上监听，无论它是否在显示列表中。
         */
        static ENTER_FRAME: string;
        static EXIT_FRAME: string;
        static CHANGE: string;
        static COMPLETE: string;
        static ADDED_TO_STAGE: string;
        static ADDED: string;
        static REMOVED_FROM_STAGE: string;
        static CONTEXT3D_CREATE: string;
        private _type;
        private _data;
        private _bubbles;
        private _target;
        private _currentTarget;
        private _stopsPropagation;
        private _stopsImmediatePropagation;
        /**
         * 创建一个作为参数传递给事件侦听器的 Event 对象。
         * @param type 事件的类型，可以作为 Event.type 访问。
         * @param bubbles 确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
         * @param cancelable 确定是否可以取消 Event 对象。默认值为 false。
         */
        constructor(type: string, data?: any, bubbles?: boolean, cancelable?: boolean);
        /**
         * 防止对事件流中当前节点中和所有后续节点中的事件侦听器进行处理。此方法会立即生效，并且会影响当前节点中的事件侦听器。相比之下，在当前节点中的所有事件侦听器都完成处理之前，stopPropagation() 方法不会生效。
         */
        stopImmediatePropagation(): void;
        /**
         * 防止对事件流中当前节点的后续节点中的所有事件侦听器进行处理。此方法不会影响当前节点 (currentTarget) 中的任何事件侦听器。相比之下，stopImmediatePropagation() 方法可以防止对当前节点中和后续节点中的事件侦听器进行处理。对此方法的其他调用没有任何效果。可以在事件流的任何阶段中调用此方法。
         */
        stopPropagation(): void;
        tostring(): string;
        /**
         * 表示事件是否为冒泡事件。如果事件可以冒泡，则此值为 true；否则为 false。
         */
        bubbles: boolean;
        /**
         * 事件的类型。类型区分大小写。
         */
        type: string;
        /** 事件携带的自定义数据 */
        /**
         * @private
         */
        data: any;
        setData(value: any): void;
        /**
         * 事件目标。
         */
        target: IEventDispatcher;
        /**
         * 当前正在使用某个事件侦听器处理 Event 对象的对象。
         */
        currentTarget: IEventDispatcher;
        stopsImmediatePropagation: boolean;
        stopsPropagation: boolean;
        setTarget(value: IEventDispatcher): void;
        setCurrentTarget(value: IEventDispatcher): void;
    }
}
declare module feng3d {
    /**
     * 为了实现非flash原生显示列表的冒泡事件，自定义事件适配器
     * @author feng 2016-3-22
     */
    class EventDispatcher implements IEventDispatcher {
        name: string;
        _target: IEventDispatcher;
        _eventListeners: any;
        /** 冒泡属性名称为“parent” */
        static BUBBLE_PROPERTY: string;
        /**
         * 构建事件适配器
         * @param target		事件适配主体
         */
        constructor(target?: IEventDispatcher);
        addEventListener(type: string, listener: Function, priority?: number, useWeakReference?: boolean): void;
        removeEventListener(type: string, listener: Function): void;
        removeEventListeners(type?: string): void;
        /**
         * @inheritDoc
         */
        dispatchEvent(event: Event): boolean;
        hasEventListener(type: string): boolean;
        /**
         * 该功能暂未实现
         * @param type
         * @return
         */
        willTrigger(type: string): boolean;
        /**
         * 父事件适配器
         */
        private parentDispatcher;
        /**
         * 抛出错误事件
         * <p>该函数会抛出 ErrorEvent.ERROR 事件</p>
         * <p>仅当错误事件被正确处理（FErrorEvent.isProcessed == true）时不会使用throw抛出错误</p>
         * @see me.feng.events.FErrorEvent
         *
         * @author feng 2015-12-7
         */
        protected throwEvent(error: Error): void;
    }
}
declare module feng3d {
    /**
     * IEventDispatcher 接口定义用于添加或删除事件侦听器的方法，检查是否已注册特定类型的事件侦听器，并调度事件。
     * @author feng 2016-3-22
     */
    interface IEventDispatcher {
        /**
         * 使用 EventDispatcher 对象注册事件侦听器对象，以使侦听器能够接收事件通知。
         */
        addEventListener(type: string, listener: Function, priority?: number, useWeakReference?: boolean): void;
        /**
         * 将事件调度到事件流中。
         */
        dispatchEvent(event: Event): boolean;
        /**
         * 检查 EventDispatcher 对象是否为特定事件类型注册了任何侦听器。
         */
        hasEventListener(type: string): boolean;
        /**
         * 从 EventDispatcher 对象中删除侦听器。
         */
        removeEventListener(type: string, listener: Function): void;
        /**
         * 检查是否用此 EventDispatcher 对象或其任何祖代为指定事件类型注册了事件侦听器。
         */
        willTrigger(type: string): boolean;
    }
}
declare module feng3d {
    /**
     * 心跳计时器
     */
    class SystemTicker extends EventDispatcher {
        /**
         * @private
         */
        constructor();
        private init();
        /**
         * @private
         * 执行一次刷新
         */
        update(): void;
    }
    /**
     * 心跳计时器单例
     */
    var $ticker: SystemTicker;
    var $feng3dStartTime: number;
}
declare module feng3d {
    /**
     * 心跳基础类
     * @author cdz 2015-10-27
     */
    class BeatBase {
        /**
         * 心跳类型
         */
        BeatType: string;
        /**
         * 心跳间隔
         */
        protected _beatInterval: number;
        /**
         * 上次跳动时间
         */
        protected _lastBeatTime: Date;
        private _isSuspend;
        constructor();
        /**
         * 设置跳动间隔， 毫秒为单位
         * @param interval 时间间隔
         *
         */
        setInterval(interval: number): void;
        /**
         * 开始跳动
         *
         */
        beginBeat(): void;
        /**
         * 心跳
         * @param nowDate
         *
         */
        beat(nowDate: Date): void;
        /**
         * 挂起
         */
        suspend(): void;
        /**
         * 恢复
         */
        resume(): void;
        /**
         * 析构
         */
        dispose(): void;
    }
}
declare module feng3d {
    /**
     ** 心跳模块类
     * @includeExample HeatBeatModuleTest.as
     * @author cdz 2015-10-31
     */
    class HeartBeat {
        private static heartBeatManager;
        /**
         * 初始化模块
         */
        static init(): void;
    }
}
declare module feng3d {
    /**
     * 生成日志
     * <p>此处使用CommonDebug.loggerFunc方法输出日志</p>
     * @see	me.feng.debug.CommonDebug
     */
    function logger(...args: any[]): void;
}
declare module feng3d {
    /**
     * 添加组件事件数据
     * @author feng 2015-12-2
     */
    class AddedComponentEventVO {
        container: Component;
        child: Component;
        /**
         * 添加组件事件数据
         * @param container			组件容器
         * @param child				子组件
         */
        constructor(container: Component, child: Component);
    }
}
declare module feng3d {
    /**
     *
     * @author feng 2015-12-2
     */
    class RemovedComponentEventVO {
        container: Component;
        child: Component;
        /**
         * 添加组件事件数据
         * @param container			组件容器
         * @param child				子组件
         */
        constructor(container: Component, child: Component);
    }
}
declare module feng3d {
    /**
     * 模块管理者
     * <p>负责模块与外部的事件交互</p>
     * @author feng
     */
    class FModuleManager {
        /**
         * 全局事件
         */
        protected dispatcher: GlobalDispatcher;
        /**
         * 创建一个模块
         */
        constructor();
        /**
         * 初始化模块
         */
        protected init(): void;
        /**
         * 派发全局事件
         *
         * @param event						调度到事件流中的 Event 对象。如果正在重新调度事件，则会自动创建此事件的一个克隆。在调度了事件后，其 target 属性将无法更改，因此您必须创建此事件的一个新副本以能够重新调度。
         * @return 							如果成功调度了事件，则值为 true。值 false 表示失败或对事件调用了 preventDefault()。
         */
        dispatchEvent(event: Event): boolean;
        /**
         * 监听全局事件
         * 使用 EventDispatcher 对象注册事件侦听器对象，以使侦听器能够接收事件通知. 可以为特定类型的事件、阶段和优先级在显示列表中的所有节点上注册事件侦听器。
         *
         * <p>成功注册一个事件侦听器后，无法通过额外调用 addEventListener() 来更改其优先级。要更改侦听器的优先级，必须首先调用 removeListener()。然后，可以使用新的优先级再次注册该侦听器。 </p>
         * <p>请记住，注册该侦听器后，如果继续调用具有不同 type 或 useCapture 值的 addEventListener()，则会创建单独的侦听器注册。例如，如果首先注册 useCapture 设置为 true 的侦听器，则该侦听器只在捕获阶段进行侦听。如果使用同一个侦听器对象再次调用 addEventListener()，并将 useCapture 设置为 false，那么便会拥有两个单独的侦听器：一个在捕获阶段进行侦听，另一个在目标和冒泡阶段进行侦听。 </p>
         * <p>不能只为目标阶段或冒泡阶段注册事件侦听器。这些阶段在注册期间是成对出现的，因为冒泡阶段只适用于目标节点的祖代。</p>
         * <p>如果不再需要某个事件侦听器，可调用 removeEventListener() 删除它，否则会产生内存问题。事件侦听器不会自动从内存中删除，因为只要调度对象存在，垃圾回收器就不会删除侦听器（除非 useWeakReference 参数设置为 true）。</p>
         * <p>复制 EventDispatcher 实例时并不复制其中附加的事件侦听器。（如果新近创建的节点需要一个事件侦听器，必须在创建该节点后附加该侦听器。）但是，如果移动 EventDispatcher 实例，则其中附加的事件侦听器也会随之移动。</p>
         * <p>如果在正在处理事件的节点上注册事件侦听器，则不会在当前阶段触发事件侦听器，但会在事件流的稍后阶段触发，如冒泡阶段。</p>
         * <p>如果从正在处理事件的节点中删除事件侦听器，则该事件侦听器仍由当前操作触发。删除事件侦听器后，决不会再次调用该事件侦听器（除非再次注册以备将来处理）。 </p>
         * <P>类级别成员函数不属于垃圾回收的对象，因此可以对类级别成员函数将 useWeakReference 设置为 true 而不会使它们受垃圾回收的影响。如果对作为嵌套内部函数的侦听器将 useWeakReference 设置为 true，则该函数将作为垃圾回收并且不再是永久函数。如果创建对该内部函数的引用（将该函数保存到另一个变量中），则该函数将不作为垃圾回收并仍将保持永久。</P>
         *
         * @param type						事件的类型。
         * @param listener					处理事件的侦听器函数。此函数必须接受 Event 对象作为其唯一的参数，并且不能返回任何结果，如下面的实例所示： <pre>function(evt:Event)</pre>函数可以有任何名称。
         * @param useCapture				确定侦听器是运行于捕获阶段还是运行于目标和冒泡阶段。如果将 useCapture 设置为 true，则侦听器只在捕获阶段处理事件，而不在目标或冒泡阶段处理事件。如果 useCapture 为 false，则侦听器只在目标或冒泡阶段处理事件。要在所有三个阶段都侦听事件，请调用 addEventListener 两次：一次将 useCapture 设置为 true，一次将 useCapture 设置为 false。
         * @param priority					事件侦听器的优先级。优先级由一个带符号的 32 位整数指定。数字越大，优先级越高。优先级为 n 的所有侦听器会在优先级为 n -1 的侦听器之前得到处理。如果两个或更多个侦听器共享相同的优先级，则按照它们的添加顺序进行处理。默认优先级为 0。
         * @param useWeakReference			确定对侦听器的引用是强引用，还是弱引用。强引用（默认值）可防止您的侦听器被当作垃圾回收。弱引用则没有此作用。
         *
         * @see flash.events.EventDispatcher.addEventListener()
         */
        addEventListener(type: string, listener: Function, priority?: number, useWeakReference?: boolean): void;
    }
}
declare module feng3d {
    /**
     *
     * @author cdz 2015-10-28
     */
    class HeartBeatManager extends FModuleManager {
        /**
         * 心跳跳字典
         */
        private _HeartBeatDic;
        constructor();
        /**
         * @inheritDoc
         */
        protected init(): void;
        /**
         * 添加事件监听器
         */
        private addListeners();
        /**
         * 注册心跳
         */
        registerBeat(e: HeartBeatModuleEvent): void;
        /**
         * 注销心跳
         */
        unregisterBeat(e: HeartBeatModuleEvent): void;
        /**
         * 暂停一个
         */
        suspendOne(e: HeartBeatModuleEvent): void;
        /**
         * 恢复跳动一个
         */
        resumeOne(e: HeartBeatModuleEvent): void;
        /**
         * 全部暂停
         */
        suspendAll(e?: HeartBeatModuleEvent): void;
        /**
         * 恢复跳动
         */
        resumeAll(e: HeartBeatModuleEvent): void;
        private onEnterFrame(e);
    }
}
declare module feng3d {
    /**
     * 加载管理器
     * @author feng 2014-7-25
     */
    class LoadManager extends FModuleManager {
        /** 加载器 */
        loader: BulkLoader;
        /** 完成一个资源后执行的函数字典 */
        private urlFuncsDic;
        /** 完成一组资源后执行的函数字典 */
        private urlsFuncsDic;
        /**
         * 创建一个加载管理器
         */
        constructor();
        /**
         * 初始化加载模块
         */
        protected init(): void;
        /**
         * 添加事件监听器
         */
        private addListeners();
        /**
         * 处理加载资源事件
         * @param event
         */
        private onLoadResource(event);
        /**
         * 加载完成所有资源事件
         * @param evt
         */
        private onAllItemsLoaded(evt);
        /**
         * 加载进度事件
         */
        private onAllItemsProgress(evt);
    }
}
declare module feng3d {
    /**
     * 任务模块管理类
     * @author feng 2015-10-29
     */
    class TaskManager extends FModuleManager {
        /**
         * 任务集合类型字典（任务类型名称：任务类型定义）
         */
        private taskCollectionTypeDic;
        /**
         * 创建一个任务管理器
         */
        constructor();
        /**
         * @inheritDoc
         */
        protected init(): void;
        /**
         * 注册任务集合类型
         * @param taskCollectionType			任务类型名称
         * @param taskCollectionTypeClass		任务类型定义
         */
        private registerTaskCollectionType(taskCollectionType, taskCollectionTypeClass);
        /**
         * 添加事件监听器
         */
        private addListeners();
        protected onRegisterTaskCollectionType(event: TaskModuleEvent): void;
        /**
         * 处理派发的任务事件
         */
        protected onDispatchTask(event: TaskModuleEvent): void;
        /**
         * 处理完成任务事件
         */
        protected onCompleted(event: TaskEvent): void;
        /**
         * 处理完成单个任务事件
         */
        protected onCompletedItem(event: TaskEvent): void;
    }
}
declare module feng3d {
    /**
     * 公共库调试类
     * @author feng 2015-7-23
     */
    class DebugCommon {
        /**
         * 日志方法
         */
        static loggerFunc: Function;
    }
}
declare module feng3d {
    /**
     * 断言
     * @b			判定为真的表达式
     * @msg			在表达式为假时将输出的错误信息
     * @author feng 2014-10-29
     */
    function assert(b: boolean, msg?: string): void;
}
declare module feng3d {
    /**
     * 动画类型
     * @author feng 2015-1-27
     */
    enum AnimationType {
        /** 没有动画 */
        NONE = 0,
        /** 顶点动画由GPU计算 */
        VERTEX_CPU = 1,
        /** 顶点动画由GPU计算 */
        VERTEX_GPU = 2,
        /** 骨骼动画由GPU计算 */
        SKELETON_CPU = 3,
        /** 骨骼动画由GPU计算 */
        SKELETON_GPU = 4,
        /** 粒子特效 */
        PARTICLE = 5,
    }
}
declare module feng3d {
    /**
     *
     * @author cdz 2015-10-31
     */
    class HeartBeatModuleData {
        /**
         * 心跳类型名称
         * @see
         */
        BeatType: string;
        /**
         * 心跳时间间隔 单位毫秒
         */
        Interval: number;
        /**
         *
         * @param taskCollectionType			任务集合类型名称
         * @param taskCollectionTypeClass		任务集合类型定义
         */
        constructor(BeatType: string, Interval: number);
    }
}
declare module feng3d {
    /**
     * 任务模块事件注册任务类型数据
     * @author feng 2015-10-30
     */
    class TaskModuleEventRegisterData {
        /**
         * 任务集合类型名称
         * @see me.feng.task.type.TaskCollectionType
         */
        taskCollectionType: string;
        /**
         * 任务集合类型定义
         */
        taskCollectionTypeClass: any;
        /**
         *
         * @param taskCollectionType			任务集合类型名称
         * @param taskCollectionTypeClass		任务集合类型定义
         */
        constructor(taskCollectionType: string, taskCollectionTypeClass: any);
    }
}
declare module feng3d {
    /**
     *
     * @author cdz 2015-10-31
     */
    class HeartBeatEvent extends Event {
        /** 渲染心跳 */
        static RENDER_BEAT: string;
        /** 逻辑心跳 */
        static LOGIC_BEAT: string;
        /** 资源解析心跳 */
        static RESOURCE_PARSE_BEAT: string;
        /** 物理心跳 */
        static PHYSICS_BEAT: string;
        /** 鼠标检测心跳 */
        static MOUSE_CHECK_BEAT: string;
        constructor(type: string, data?: any, bubbles?: boolean, cancelable?: boolean);
    }
}
declare module feng3d {
    /**
     * 组件事件
     * @author feng 2015-12-2
     */
    class ComponentEvent extends Event {
        /**
         * 添加子组件事件
         */
        static ADDED_COMPONET: string;
        /**
         * 被组件容器添加事件
         */
        static BE_ADDED_COMPONET: string;
        /**
         * 移除子组件事件
         */
        static REMOVED_COMPONET: string;
        /**
         * 被容器删除事件
         */
        static BE_REMOVED_COMPONET: string;
        constructor(type: string, data?: any, bubbles?: boolean, cancelable?: boolean);
    }
}
declare module feng3d {
    /**
     * 错误事件
     * <p>为了与flash.events.ErrorEvent区分添加前缀F</p>
     * @author feng 2015-12-7
     */
    class FErrorEvent extends ComponentEvent {
        /**
         * 错误事件
         */
        static ERROR_EVENT: string;
        /**
         * 是否已经处理错误
         */
        isProcessed: boolean;
        constructor(type: string, data?: any, bubbles?: boolean, cancelable?: boolean);
    }
}
declare module feng3d {
    /**
     *
     * @author cdz 2015-10-31
     */
    class HeartBeatModuleEvent extends Event {
        /** 注册心跳类型 */
        static REGISTER_BEAT_TYPE: string;
        /** 注销心跳类型 */
        static UNREGISTER_BEAT_TYPE: string;
        /** 暂停一个心跳类型 */
        static SUSPEND_ONE_BEAT: string;
        /** 恢复心跳类型 */
        static RESUME_ONE_BEAT: string;
        /** 停止所有心跳 */
        static SUSPEND_All_BEAT: string;
        /** 停止所有心跳 */
        static RESUME_ALL_BEAT: string;
        /**
         * 创建任务模块事件
         * @param type 					事件的类型
         * @param data					事件携带的数据
         * @param bubbles 				确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
         * @param cancelable 			确定是否可以取消 Event 对象。默认值为 false。
         */
        constructor(type: string, data?: any, bubbles?: boolean, cancelable?: boolean);
    }
}
declare module feng3d {
    /**
     * 加载事件
     * @author feng 2014-7-25
     */
    class LoadModuleEvent extends Event {
        /** 加载资源 */
        static LOAD_RESOURCE: string;
        /**
         * 创建一个加载事件。
         * @param data					加载事件数据
         * @param type 					事件的类型，可以作为 Event.type 访问。
         * @param bubbles 				确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
         * @param cancelable 			确定是否可以取消 Event 对象。默认值为 false。
         */
        constructor(type: string, data: LoadModuleEventData, bubbles?: boolean, cancelable?: boolean);
        /**
         * 加载事件数据
         */
        loadEventData: LoadModuleEventData;
    }
}
declare module feng3d {
    /**
     * 任务模块事件
     * @author feng 2015-10-29
     */
    class TaskModuleEvent extends Event {
        /** 派发任务 */
        static DISPATCH_TASK: string;
        /** 注册任务集合类型 */
        static REGISTER_TASKCOLLECTIONTYPE: string;
        /**
         * 创建任务模块事件
         * @param type 					事件的类型
         * @param data					事件携带的数据
         * @param bubbles 				确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
         * @param cancelable 			确定是否可以取消 Event 对象。默认值为 false。
         */
        constructor(type: string, data?: any, bubbles?: boolean, cancelable?: boolean);
    }
}
declare module feng3d {
    /**
     * 加载url事件
     * @author feng 2015-10-22
     */
    class LoadUrlEvent extends Event {
        /** 单项资源加载完成 */
        static LOAD_SINGLE_COMPLETE: string;
        /** 资源加载完成 */
        static LOAD_COMPLETE: string;
        /**
         * 创建一个加载事件。
         * @param data					加载事件数据
         * @param type 					事件的类型，可以作为 Event.type 访问。
         * @param bubbles 				确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
         * @param cancelable 			确定是否可以取消 Event 对象。默认值为 false。
         */
        constructor(type: string, data?: LoadTaskItem, bubbles?: boolean, cancelable?: boolean);
        /**
         * 加载事件数据
         */
        loadTaskItem: LoadTaskItem;
    }
}
declare module feng3d {
    /**
     * 任务事件
     * @author feng 2014-7-24
     */
    class TaskEvent extends Event {
        /** 完成任务 */
        static COMPLETED: string;
        /** 完成一个任务单元 */
        static COMPLETEDITEM: string;
        /**
         * 创建任务事件
         * @param data					事件携带的数据
         * @param type 					事件的类型
         * @param bubbles 				确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
         * @param cancelable 			确定是否可以取消 Event 对象。默认值为 false。
         */
        constructor(type: string, data?: any, bubbles?: boolean, cancelable?: boolean);
    }
}
declare module feng3d {
    /**
     * Dispatched to notify changes in an animation state's state.
     */
    class AnimationStateEvent extends Event {
        /**
         * Dispatched when a non-looping clip node inside an animation state reaches the end of its timeline.
         */
        static PLAYBACK_COMPLETE: string;
        static TRANSITION_COMPLETE: string;
        private _animator;
        private _animationState;
        private _animationNode;
        /**
         * Create a new <code>AnimatonStateEvent</code>
         *
         * @param type The event type.
         * @param animator The animation state object that is the subject of this event.
         * @param animationNode The animation node inside the animation state from which the event originated.
         */
        constructor(type: string, animator: AnimatorBase, animationState: IAnimationState, animationNode: AnimationNodeBase);
        /**
         * The animator object that is the subject of this event.
         */
        animator: AnimatorBase;
        /**
         * The animation state object that is the subject of this event.
         */
        animationState: IAnimationState;
        /**
         * The animation node inside the animation state from which the event originated.
         */
        animationNode: AnimationNodeBase;
        /**
         * Clones the event.
         *
         * @return An exact duplicate of the current object.
         */
        clone(): Event;
    }
}
declare module feng3d {
    /**
     * 动画事件
     * @author feng 2014-5-27
     */
    class AnimatorEvent extends Event {
        /** 开始播放动画 */
        static START: string;
        /** 继续播放动画 */
        static PLAY: string;
        /** 停止播放动画 */
        static STOP: string;
        /** 周期完成 */
        static CYCLE_COMPLETE: string;
        /**
         * 创建一个动画时间
         * @param type			事件类型
         * @param data			事件数据
         * @param bubbles		是否冒泡
         */
        constructor(type: string, data?: any, bubbles?: boolean);
    }
}
declare module feng3d {
    /**
     * Dispatched whenever a ressource (asset) is parsed and created completly.
     */
    class AssetEvent extends Event {
        static ASSET_COMPLETE: string;
        static ENTITY_COMPLETE: string;
        static SKYBOX_COMPLETE: string;
        static CAMERA_COMPLETE: string;
        static MESH_COMPLETE: string;
        static GEOMETRY_COMPLETE: string;
        static SKELETON_COMPLETE: string;
        static SKELETON_POSE_COMPLETE: string;
        static CONTAINER_COMPLETE: string;
        static TEXTURE_COMPLETE: string;
        static TEXTURE_PROJECTOR_COMPLETE: string;
        static MATERIAL_COMPLETE: string;
        static ANIMATOR_COMPLETE: string;
        static ANIMATION_SET_COMPLETE: string;
        static ANIMATION_STATE_COMPLETE: string;
        static ANIMATION_NODE_COMPLETE: string;
        static STATE_TRANSITION_COMPLETE: string;
        static SEGMENT_SET_COMPLETE: string;
        static LIGHT_COMPLETE: string;
        static LIGHTPICKER_COMPLETE: string;
        static EFFECTMETHOD_COMPLETE: string;
        static SHADOWMAPMETHOD_COMPLETE: string;
        static ASSET_RENAME: string;
        static ASSET_CONFLICT_RESOLVED: string;
        static TEXTURE_SIZE_ERROR: string;
        private _asset;
        private _prevName;
        constructor(type: string, asset?: IAsset, prevName?: string);
        asset: IAsset;
        assetPrevName: string;
    }
}
declare module feng3d {
    /**
     * 摄像机事件
     * @author feng 2014-10-14
     */
    class CameraEvent extends Event {
        static LENS_CHANGED: string;
        constructor(type: string, camera?: Camera3D, bubbles?: boolean);
        camera: Camera3D;
    }
}
declare module feng3d {
    /**
     *
     * @author feng 2014-9-10
     */
    class Container3DEvent extends Event {
        constructor(type: string, data?: any, bubbles?: boolean);
    }
}
declare module feng3d {
    /**
     * 3D环境缓冲拥有者事件
     * @author feng 2015-7-18
     */
    class Context3DBufferOwnerEvent extends Event {
        /**
         * 添加3D环境缓冲事件
         */
        static ADD_CONTEXT3DBUFFER: string;
        /**
         * 移除3D环境缓冲事件
         */
        static REMOVE_CONTEXT3DBUFFER: string;
        /**
         * 添加子项3D环境缓冲拥有者事件
         */
        static ADDCHILD_CONTEXT3DBUFFEROWNER: string;
        /**
         * 移除子项3D环境缓冲拥有者事件
         */
        static REMOVECHILD_CONTEXT3DBUFFEROWNER: string;
        /**
         * 创建3D环境缓冲拥有者事件
         * @param type 					事件的类型，可以作为 Event.type 访问。
         * @param data					事件携带的数据
         * @param bubbles 				确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
         * @param cancelable 			确定是否可以取消 Event 对象。默认值为 false。
         */
        constructor(type: string, data?: any, bubbles?: boolean, cancelable?: boolean);
    }
}
declare module feng3d {
    /**
     * Fagal函数事件
     * @author feng 2015-8-8
     */
    class FagalMathEvent extends Event {
        /**
         * Fagal函数追加代码事件
         */
        static FAGALMATHEVENT_APPEND: string;
        /**
         * 创建一个作为参数传递给事件侦听器的 Event 对象.
         * @param type 					事件的类型，可以作为 Event.type 访问。
         * @param code					fagal代码
         * @param bubbles 				确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
         * @param cancelable 			确定是否可以取消 Event 对象。默认值为 false。
         */
        constructor(type: string, code: string, bubbles?: boolean, cancelable?: boolean);
        /**
         * fagal代码
         */
        code: string;
    }
}
declare module feng3d {
    /**
     * 几何体组件事件
     * @author feng 2015-12-8
     */
    class GeometryComponentEvent extends Event {
        /**
         * 获取几何体顶点数据
         */
        static GET_VA_DATA: string;
        /**
         * 改变几何体顶点数据事件
         */
        static CHANGED_VA_DATA: string;
        /**
         * 改变顶点索引数据事件
         */
        static CHANGED_INDEX_DATA: string;
        constructor(type: string, data?: any, bubbles?: boolean, cancelable?: boolean);
    }
}
declare module feng3d {
    /**
     * 几何体事件
     * @author feng 2014-5-15
     */
    class GeometryEvent extends Event {
        /** 添加子几何体 */
        static SUB_GEOMETRY_ADDED: string;
        /** 溢出子几何体 */
        static SUB_GEOMETRY_REMOVED: string;
        /** 几何体外形发生改变 */
        static SHAPE_CHANGE: string;
        private _subGeometry;
        constructor(type: string, subGeometry?: SubGeometry, bubbles?: boolean, cancelable?: boolean);
        subGeometry: SubGeometry;
    }
}
declare module feng3d {
    /**
     * 镜头事件
     * @author feng 2014-10-14
     */
    class LensEvent extends Event {
        static MATRIX_CHANGED: string;
        constructor(type: string, lens?: LensBase, bubbles?: boolean, cancelable?: boolean);
        lens: LensBase;
    }
}
declare module feng3d {
    /**
     *
     * @author feng 2015-5-28
     */
    class LightEvent extends Event {
        static CASTS_SHADOW_CHANGE: string;
        constructor(type: string, data?: any, bubbles?: boolean, cancelable?: boolean);
    }
}
declare module feng3d {
    /**
     * 材质事件
     * @author feng 2014-9-9
     */
    class MaterialEvent extends Event {
        /** 添加pass */
        static PASS_ADDED: string;
        /** 移除pass */
        static PASS_REMOVED: string;
        constructor(type: string, data?: any, bubbles?: boolean);
    }
}
declare module feng3d {
    /**
     * 网格事件
     * @author feng 2015-3-20
     */
    class MeshEvent extends Event {
        /**
         * 材质发生变化
         */
        static MATERIAL_CHANGE: string;
        /**
         * 创建一个网格事件。
         * @param data					事件携带的数据
         * @param type 					事件的类型，可以作为 Event.type 访问。
         * @param bubbles 				确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
         * @param cancelable 			确定是否可以取消 Event 对象。默认值为 false。
         */
        constructor(type: string, data?: any, bubbles?: boolean, cancelable?: boolean);
    }
}
declare module feng3d {
    /**
     * 3d鼠标事件
     * @author feng 2014-4-29
     * @see flash.events.MouseEvent
     */
    class MouseEvent3D extends Event {
        /**
         * 单击
         */
        static CLICK: string;
        /**
         * 鼠标移人对象
         */
        static MOUSE_OVER: string;
        /**
         * 鼠标移出对象
         */
        static MOUSE_OUT: string;
        /**
         * 鼠标在对象上移动
         */
        static MOUSE_MOVE: string;
        /**
         * 鼠标在对象上双击
         */
        static DOUBLE_CLICK: string;
        /**
         * 鼠标在对象上按下
         */
        static MOUSE_DOWN: string;
        /**
         * 鼠标在对象上弹起
         */
        static MOUSE_UP: string;
        /**
         * 鼠标在对象上滚轮滚动
         */
        static MOUSE_WHEEL: string;
        /**
         * 鼠标事件对象
         */
        object: Container3D;
        /**
         * 相交数据
         */
        collider: PickingCollisionVO;
        /**
         * 创建一个3D鼠标事件
         * @param data					事件携带的数据
         * @param type 					事件的类型，可以作为 Event.type 访问。
         * @param bubbles 				确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
         * @param cancelable 			确定是否可以取消 Event 对象。默认值为 false。
         */
        constructor(type: string, data?: any, bubbles?: boolean, cancelable?: boolean);
    }
}
declare module feng3d {
    /**
     * 解析事件
     * @author feng 2014-5-16
     */
    class ParserEvent extends Event {
        private _message;
        /**
         * Dispatched when parsing of an asset completed.
         */
        static PARSE_COMPLETE: string;
        /**
         * Dispatched when an error occurs while parsing the data (e.g. because it's
         * incorrectly formatted.)
         */
        static PARSE_ERROR: string;
        /**
         * Dispatched when a parser is ready to have dependencies retrieved and resolved.
         * This is an internal event that should rarely (if ever) be listened for by
         * external classes.
         */
        static READY_FOR_DEPENDENCIES: string;
        constructor(type: string, message?: string);
        /**
         * Additional human-readable message. Usually supplied for PARSE_ERROR events.
         */
        message: string;
    }
}
declare module feng3d {
    /**
     * 渲染函数事件
     * @author feng 2014-7-1
     */
    class ShadingMethodEvent extends Event {
        /** 渲染函数失效 */
        static SHADER_INVALIDATED: string;
        /**
         * 构建一个渲染函数失效事件
         * @param type 			事件的类型，可以作为 Event.type 访问。
         * @param data			数据
         * @param bubbles 		确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
         * @param cancelable 	确定是否可以取消 Event 对象。默认值为 false。
         */
        constructor(type: string, data?: any, bubbles?: boolean, cancelable?: boolean);
    }
}
declare module feng3d {
    /**
     * 3D对象事件(3D状态发生改变、位置、旋转、缩放)
     * @author feng 2014-3-31
     */
    class Transform3DEvent extends Event {
        /**
         * 平移
         */
        static POSITION_CHANGED: string;
        /**
         * 旋转
         */
        static ROTATION_CHANGED: string;
        /**
         * 缩放
         */
        static SCALE_CHANGED: string;
        /**
         * 变换
         */
        static TRANSFORM_CHANGED: string;
        /**
         * 变换已更新
         */
        static TRANSFORM_UPDATED: string;
        /**
         * 场景变换矩阵发生变化
         */
        static SCENETRANSFORM_CHANGED: string;
        /**
         * 创建3D对象事件
         * @param type			事件类型
         * @param element3D		发出事件的3D元素
         */
        constructor(type: string, element3D: Element3D, bubbles?: boolean, cancelable?: boolean);
        /**
         * 发出事件的3D元素
         */
        element3D: Element3D;
    }
}
declare module feng3d {
    /**
     * 组件容器（集合）
     * @author feng 2015-5-6
     */
    class Component extends EventDispatcher {
        private _componentName;
        /**
         * 组件列表
         */
        protected components: any[];
        /**
         * 组件名称
         */
        componentName: string;
        /**
         * 创建一个组件容器
         */
        constructor();
        /**
         * 子组件个数
         */
        numComponents: number;
        /**
         * 添加组件
         * @param com 被添加组件
         */
        addComponent(com: Component): void;
        /**
         * 添加组件到指定位置
         * @param component		被添加的组件
         * @param index			插入的位置
         */
        addComponentAt(component: Component, index: number): void;
        /**
         * 移除组件
         * @param com 被移除组件
         */
        removeComponent(com: Component): void;
        /**
         * 移除组件
         * @param index		要删除的 Component 的子索引。
         */
        removeComponentAt(index: number): Component;
        /**
         * 获取组件在容器的索引位置
         * @param com			查询的组件
         * @return				组件在容器的索引位置
         */
        getComponentIndex(com: Component): number;
        /**
         * 设置子组件的位置
         * @param com				子组件
         * @param index				位置索引
         */
        setComponentIndex(com: Component, index: number): void;
        /**
         * 获取指定位置索引的子组件
         * @param index			位置索引
         * @return				子组件
         */
        getComponentAt(index: number): any;
        /**
         * 根据组件名称获取组件
         * <p>注意：此处比较的是componentName而非name</p>
         * @param componentName		组件名称
         * @return 					获取到的组件
         */
        getComponentByName(componentName: string): Component;
        /**
         * 获取与给出组件名称相同的所有组件
         * <p>注意：此处比较的是componentName而非name</p>
         * @param componentName		组件名称
         * @return 					获取到的组件
         */
        getComponentsByName(componentName: string): Component[];
        /**
         * 根据类定义获取组件
         * <p>如果存在多个则返回第一个</p>
         * @param cls				类定义
         * @return
         */
        getComponentByClass(cls: any): any;
        /**
         * 根据类定义查找组件
         * @param cls		类定义
         * @return			返回与给出类定义一致的组件
         */
        getComponentsByClass(cls: any): Component[];
        /**
         * 根据类定义获取或创建组件
         * <p>当不存在该类型对象时创建一个该组件并且添加到容器中</p>
         * @param cls
         * @return
         */
        getOrCreateComponentByClass(cls: any): any;
        /**
         * 判断是否拥有组件
         * @param com	被检测的组件
         * @return		true：拥有该组件；false：不拥有该组件。
         */
        hasComponent(com: Component): boolean;
        /**
         * 交换子组件位置
         * @param index1		第一个子组件的索引位置
         * @param index2		第二个子组件的索引位置
         */
        swapComponentsAt(index1: number, index2: number): void;
        /**
         * 交换子组件位置
         * @param com1		第一个子组件
         * @param com2		第二个子组件
         */
        swapComponents(com1: Component, com2: Component): void;
        /**
         * 派发子组件事件
         * <p>事件广播给子组件</p>
         * @param event
         */
        protected dispatchChildrenEvent(event: Event): void;
    }
}
declare module feng3d {
    /**
     * 唯一类型组件
     * <p>不允许容器内存在两个相同类型的子组件</p>
     * @author feng 2015-12-2
     */
    class UniqueClassComponent extends Component {
        constructor();
        /**
         * 处理被添加事件
         * @param event
         */
        protected onBeAddedComponet(event: ComponentEvent): void;
        /**
         * 处理被移除事件
         * @param event
         */
        protected onBeRemovedComponet(event: ComponentEvent): void;
        /**
         * 处理添加组件事件
         * @param event
         */
        protected onAddedComponetContainer(event: ComponentEvent): void;
        /**
         * 检查子组件中类型是否唯一
         * @param container
         */
        private checkUniqueName(container);
    }
}
declare module feng3d {
    /**
     * 唯一名称组件
     * <p>不允许容器内存在两个名称相同的子组件</p>
     * @author feng 2015-12-2
     */
    class UniqueNameComponent extends Component {
        constructor();
        /**
         * 处理被添加事件
         * @param event
         */
        protected onBeAddedComponet(event: ComponentEvent): void;
        /**
         * 处理被移除事件
         * @param event
         */
        protected onBeRemovedComponet(event: ComponentEvent): void;
        /**
         * 处理添加组件事件
         * @param event
         */
        protected onAddedComponetContainer(event: ComponentEvent): void;
        /**
         * 检查子组件中名称是否唯一
         * @param container
         */
        private checkUniqueName(container);
    }
}
declare module feng3d {
    /**
     * 动画节点基类
     * @author feng 2014-5-20
     */
    class AnimationNodeBase extends Component implements IAsset {
        private _namedAsset;
        context3DBufferOwner: Context3DBufferOwner;
        protected _stateClass: any;
        /**
         * 状态类
         */
        stateClass: any;
        /**
         * 创建一个动画节点基类
         */
        constructor();
        /**
         * 初始化Context3d缓存
         */
        protected initBuffers(): void;
        /**
         * Fagal编号中心
         */
        _: any;
        namedAsset: NamedAsset;
    }
}
declare module feng3d {
    /**
     * 动画剪辑节点基类(用于控制动画播放，包含每帧持续时间，是否循环播放等)
     * @author feng 2014-5-20
     */
    class AnimationClipNodeBase extends AnimationNodeBase {
        protected _looping: boolean;
        protected _totalDuration: number;
        protected _lastFrame: number;
        protected _stitchDirty: boolean;
        protected _stitchFinalFrame: boolean;
        protected _numFrames: number;
        protected _durations: number[];
        protected _totalDelta: Vector3D;
        /** 是否稳定帧率 */
        fixedFrameRate: boolean;
        /**
         * 创建一个动画剪辑节点基类
         */
        constructor();
        /**
         * 持续时间列表（ms）
         */
        durations: number[];
        /**
         * 总坐标偏移量
         */
        totalDelta: Vector3D;
        /**
         * 是否循环播放
         */
        looping: boolean;
        /**
         * 是否过渡结束帧
         */
        stitchFinalFrame: boolean;
        /**
         * 总持续时间
         */
        totalDuration: number;
        /**
         * 最后帧数
         */
        lastFrame: number;
        /**
         * 更新动画播放控制状态
         */
        protected updateStitch(): void;
    }
}
declare module feng3d {
    /**
     * 骨骼动画节点（一般用于一个动画的帧列表）
     * 包含基于时间的动画数据作为单独的骨架构成。
     * @author feng 2014-5-20
     */
    class SkeletonClipNode extends AnimationClipNodeBase {
        private _frames;
        /**
         * 创建骨骼动画节点
         */
        constructor();
        /**
         * 骨骼姿势动画帧列表
         */
        frames: SkeletonPose[];
        /**
         * 添加帧到动画
         * @param skeletonPose 骨骼姿势
         * @param duration 持续时间
         */
        addFrame(skeletonPose: SkeletonPose, duration: number): void;
        /**
         * @inheritDoc
         */
        protected updateStitch(): void;
    }
}
declare module feng3d {
    /**
     * sprite动画剪辑节点
     * @author feng 2015-9-18
     */
    class SpriteSheetClipNode extends AnimationClipNodeBase {
        private _frames;
        /**
         * 创建<code>SpriteSheetClipNode</code>实例.
         */
        constructor();
        /**
         * 帧列表
         */
        frames: SpriteSheetAnimationFrame[];
        /**
         * 添加帧到动画节点
         * @param spriteSheetAnimationFrame				sprite动画帧
         * @param duration								间隔时间
         */
        addFrame(spriteSheetAnimationFrame: SpriteSheetAnimationFrame, duration: number): void;
    }
}
declare module feng3d {
    /**
     * A uv animation node containing time-based animation data as individual uv animation frames.
     */
    /**
     * UV动画剪辑节点
     * @author feng 2014-5-20
     */
    class UVClipNode extends AnimationClipNodeBase {
        private _frames;
        /**
         * 帧数据列表
         */
        frames: UVAnimationFrame[];
        /**
         * 创建<code>UVClipNode</code>实例
         */
        constructor();
        /**
         * 添加帧
         * @param uvFrame				UV动画帧
         * @param duration				间隔时间
         */
        addFrame(uvFrame: UVAnimationFrame, duration: number): void;
        /**
         * @inheritDoc
         */
        protected updateStitch(): void;
    }
}
declare module feng3d {
    /**
     * 顶点动画剪辑节点
     * @author feng 2014-5-30
     */
    class VertexClipNode extends AnimationClipNodeBase {
        private _frames;
        private _translations;
        /**
         * 创建一个顶点动画剪辑节点
         */
        constructor();
        /**
         * 帧数据列表
         */
        frames: Geometry[];
        /**
         * 添加顶点动画帧
         * @param geometry 几何体
         * @param duration 持续时间
         * @param translation 偏移量
         */
        addFrame(geometry: Geometry, duration: number, translation?: Vector3D): void;
        /**
         * @inheritDoc
         */
        protected updateStitch(): void;
    }
}
declare module feng3d {
    /**
     * 粒子节点
     * @author feng 2014-11-13
     */
    abstract class ParticleNodeBase extends AnimationNodeBase {
        /** 模式列表 */
        private static MODES;
        private static GLOBAL;
        private static LOCAL_STATIC;
        private static LOCAL_DYNAMIC;
        protected _mode: number;
        private _priority;
        protected _dataLength: number;
        protected _oneData: number[];
        /**
         * 顶点数据编号
         */
        abstract getVaId(): string;
        /**
         * 顶点数据长度
         */
        abstract getVaLen(): number;
        /**
         * 创建一个粒子节点
         * @param animationName		节点名称
         * @param mode				模式
         * @param dataLength		数据长度
         * @param priority			优先级
         */
        constructor(animationName: string, mode: number, dataLength: number, priority?: number);
        /**
         * 优先级
         */
        priority: number;
        /**
         * 数据长度
         */
        dataLength: number;
        /**
         * 单个粒子数据
         */
        oneData: number[];
        /**
         * 粒子属性模式
         */
        mode: number;
        /**
         * 创建单个粒子属性
         */
        generatePropertyOfOneParticle(param: ParticleProperties): void;
        /**
         * 设置粒子渲染参数
         * @param particleShaderParam 粒子渲染参数
         */
        abstract processAnimationSetting(shaderParam: ShaderParams): any;
        /**
         * 设置渲染状态
         * @param stage3DProxy			显卡代理
         * @param renderable			渲染实体
         * @param camera				摄像机
         */
        setRenderState(renderable: IRenderable, camera: Camera3D): void;
    }
}
declare module feng3d {
    /**
     * 广告牌节点
     * @author feng 2014-11-13
     */
    class ParticleBillboardNode extends ParticleNodeBase {
        private _matrix;
        /** 广告牌轴线 */
        _billboardAxis: Vector3D;
        /**
         * 顶点数据编号
         */
        getVaId(): string;
        /**
         * 顶点数据长度
         */
        getVaLen(): number;
        /**
         * 创建一个广告牌节点
         * @param billboardAxis
         */
        constructor(billboardAxis?: Vector3D);
        /**
         * @inheritDoc
         */
        protected initBuffers(): void;
        private updateBillboardMatrixBuffer(billboardMatrixBuffer);
        /**
         * @inheritDoc
         */
        setRenderState(renderable: IRenderable, camera: Camera3D): void;
        /**
         * 广告牌轴线
         */
        billboardAxis: Vector3D;
        /**
         * @inheritDoc
         */
        processAnimationSetting(shaderParams: ShaderParams): void;
    }
}
declare module feng3d {
    /**
     * 粒子颜色节点
     * @author feng 2015-1-20
     */
    class ParticleColorNode extends ParticleNodeBase {
        /** 是否使用Multiplier数据对渲染中颜色进行变换 */
        private _usesMultiplier;
        /** 是否使用offset数据对渲染中颜色进行变换 */
        private _usesOffset;
        /** 开始颜色数据 */
        private _startColor;
        /** 结束颜色数据 */
        private _endColor;
        private _startMultiplierData;
        private _deltaMultiplierData;
        private _startOffsetData;
        private _deltaOffsetData;
        /**
          * 顶点数据编号
          */
        getVaId(): string;
        /**
         * 顶点数据长度
         */
        getVaLen(): number;
        /**
         * 开始颜色属性
         */
        static COLOR_START_COLORTRANSFORM: string;
        /**
         * 结束颜色属性
         */
        static COLOR_END_COLORTRANSFORM: string;
        /**
         * 创建一个粒子颜色节点
         * @param mode					属性模式
         * @param usesMultiplier		是否使用Multiplier数据对渲染中颜色进行变换
         * @param usesOffset			是否使用offset数据对渲染中颜色进行变换
         * @param usesCycle
         * @param usesPhase
         * @param startColor			开始颜色数据
         * @param endColor				结束颜色数据
         * @param cycleDuration
         * @param cyclePhase
         */
        constructor(mode: number, usesMultiplier?: boolean, usesOffset?: boolean, usesCycle?: boolean, usesPhase?: boolean, startColor?: ColorTransform, endColor?: ColorTransform, cycleDuration?: number, cyclePhase?: number);
        /**
         * @inheritDoc
         */
        protected initBuffers(): void;
        private updateStartColorMultiplierConstBuffer(vcVectorBuffer);
        private updateDeltaColorMultiplierConstBuffer(vcVectorBuffer);
        private updateStartColorOffsetConstBuffer(vcVectorBuffer);
        private updateDeltaColorOffsetConstBuffer(vcVectorBuffer);
        /**
         * @inheritDoc
         */
        generatePropertyOfOneParticle(param: ParticleProperties): void;
        /**
         * 更新颜色数据
         */
        private updateColorData();
        /**
         * @inheritDoc
         */
        processAnimationSetting(shaderParams: ShaderParams): void;
    }
}
declare module feng3d {
    /**
     * 粒子缩放节点
     * @author feng 2015-1-15
     */
    class ParticleScaleNode extends ParticleNodeBase {
        private _minScale;
        private _maxScale;
        private _scaleData;
        /**
         * 缩放属性名
         */
        static SCALE_VECTOR3D: string;
        /**
         * 顶点数据编号
         */
        getVaId(): string;
        /**
         * 顶点数据长度
         */
        getVaLen(): number;
        /**
         * 最小缩放
         */
        minScale: number;
        /**
         * 最大缩放
         */
        maxScale: number;
        /**
         * 创建一个粒子缩放节点
         * @param mode				模式
         * @param usesCycle
         * @param usesPhase
         * @param minScale			最小缩放
         * @param maxScale			最大缩放
         * @param cycleDuration
         * @param cyclePhase
         */
        constructor(mode: number, usesCycle: boolean, usesPhase: boolean, minScale?: number, maxScale?: number, cycleDuration?: number, cyclePhase?: number);
        /**
         * @inheritDoc
         */
        protected initBuffers(): void;
        private updateVelocityConstBuffer(velocityConstBuffer);
        private updateScaleData();
        /**
         * @inheritDoc
         */
        generatePropertyOfOneParticle(param: ParticleProperties): void;
        /**
         * @inheritDoc
         */
        processAnimationSetting(shaderParams: ShaderParams): void;
    }
}
declare module feng3d {
    /**
     * 粒子时间节点
     * @author feng 2014-11-17
     */
    class ParticleTimeNode extends ParticleNodeBase {
        /**
         * @inheritDoc
         */
        getVaId(): string;
        /**
         * @inheritDoc
         */
        getVaLen(): number;
        /**
         * 创建一个粒子时间节点
         * @param usesDuration	是否持续
         * @param usesLooping	是否延时
         * @param usesDelay		是否循环
         */
        constructor();
        /**
         * @inheritDoc
         */
        generatePropertyOfOneParticle(param: ParticleProperties): void;
        /**
         * @inheritDoc
         */
        processAnimationSetting(shaderParams: ShaderParams): void;
    }
}
declare module feng3d {
    /**
     * 粒子速度节点
     * @author feng 2014-11-13
     */
    class ParticleVelocityNode extends ParticleNodeBase {
        /** 粒子速度 */
        _velocity: number[];
        /**
         * 粒子的速度属性
         */
        static VELOCITY_VECTOR3D: string;
        /**
         * @inheritDoc
         */
        getVaId(): string;
        /**
         * @inheritDoc
         */
        getVaLen(): number;
        /**
         * 创建一个粒子速度节点
         * @param mode		模式
         * @param velocity	粒子速度
         */
        constructor(mode: number, velocity?: Vector3D);
        /**
         * @inheritDoc
         */
        protected initBuffers(): void;
        private updateVelocityConstBuffer(velocityConstBuffer);
        /**
         * @inheritDoc
         */
        generatePropertyOfOneParticle(param: ParticleProperties): void;
        /**
         * @inheritDoc
         */
        processAnimationSetting(shaderParams: ShaderParams): void;
    }
}
declare module feng3d {
    /**
     * 两个骨骼动画节点间进行线性插值得出骨骼姿势
     * @author feng 2014-5-20
     */
    class SkeletonBinaryLERPNode extends AnimationNodeBase {
        /**
         * 为混合输出提供输入节点A
         */
        inputA: AnimationNodeBase;
        /**
         * 为混合输出提供输入节点B
         */
        inputB: AnimationNodeBase;
        /**
         * 创建<code>SkeletonBinaryLERPNode</code>对象
         */
        constructor();
        /**
         * @inheritDoc
         */
        getAnimationState(animator: AnimatorBase): SkeletonBinaryLERPState;
    }
}
declare module feng3d {
    /**
     * 淡入淡出变换节点
     * @author feng 2014-5-20
     */
    class CrossfadeTransitionNode extends SkeletonBinaryLERPNode {
        /**
         * 混合速度
         */
        blendSpeed: number;
        /**
         * 开始混合
         */
        startBlend: number;
        /**
         * 创建<code>CrossfadeTransitionNode</code>实例
         */
        constructor();
    }
}
declare module feng3d {
    /**
     * 动画集合基类
     * @author feng 2014-5-20
     */
    abstract class AnimationSetBase extends Component implements IAsset {
        private _namedAsset;
        context3DBufferOwner: Context3DBufferOwner;
        private _usesCPU;
        /** 动画节点列表 */
        private _animations;
        /** 动画名称列表 */
        private _animationNames;
        /** 动画字典 */
        private _animationDictionary;
        /**
         * 创建一个动画集合基类
         */
        constructor();
        /**
         * 初始化Context3d缓存
         */
        protected initBuffers(): void;
        /**
         * Fagal编号中心
         */
        _: FagalIdCenter;
        /**
         * 是否使用CPU
         */
        usesCPU: boolean;
        /**
         * Returns a vector of animation state objects that make up the contents of the animation data set.
         */
        animations: AnimationNodeBase[];
        /**
         * 添加动画
         * @param node 动画节点
         */
        addAnimation(node: AnimationNodeBase): void;
        /**
         * 获取动画节点
         * @param name 动画名称
         * @return 动画节点
         */
        getAnimation(animationName: string): AnimationNodeBase;
        /**
         * 是否有某动画
         * @param name 动画名称
         */
        hasAnimation(animationName: string): boolean;
        /**
         * 重置使用GPU
         */
        resetGPUCompatibility(): void;
        /**
         * 取消使用GPU
         */
        cancelGPUCompatibility(): void;
        /**
         * 激活
         * @param shaderParams	渲染参数
         * @param stage3DProxy	3d舞台代理
         * @param pass			渲染通道
         * @throws	me.feng.error.AbstractMethodError
         */
        abstract activate(shaderParams: ShaderParams, pass: MaterialPassBase): any;
        namedAsset: NamedAsset;
    }
}
declare module feng3d {
    /**
     * 粒子动画set
     * @author feng 2014-11-13
     */
    class ParticleAnimationSet extends AnimationSetBase implements IAnimationSet {
        /**
         * 颜色优先级
         */
        static COLOR_PRIORITY: number;
        /** 所有粒子动画都需要的时间节点 */
        private _timeNode;
        private _particleNodes;
        private _localStaticNodes;
        /** 初始化粒子函数 */
        initParticleFunc: Function;
        /** 是否为广告牌 */
        hasBillboard: boolean;
        /** 动画节点列表 */
        private _effects;
        /** 动画名称列表 */
        private _effectNames;
        /** 动画字典 */
        private _effectDictionary;
        private _usesDuration;
        private _usesLooping;
        private _usesDelay;
        /**
         * 创建一个粒子动画集合
         * @param usesDuration	是否持续
         * @param usesLooping	是否循环
         * @param usesDelay		是否延时
         */
        constructor(usesDuration?: boolean, usesLooping?: boolean, usesDelay?: boolean);
        /**
         * 粒子节点列表
         */
        particleNodes: ParticleNodeBase[];
        /**
         * 添加粒子特效
         * @param node
         */
        addParticleEffect(node: ParticleNodeBase): void;
        /**
         * @inheritDoc
         */
        activate(shaderParams: ShaderParams, pass: MaterialPassBase): void;
        /**
         * 生成粒子动画数据
         * @param mesh
         */
        generateAnimationSubGeometries(mesh: Mesh): void;
        /**
         * 设置渲染状态
         * @param renderable		可渲染对象
         * @param camera			摄像机
         */
        setRenderState(renderable: IRenderable, camera: Camera3D): void;
    }
}
declare module feng3d {
    /**
     * 骨骼动画集合
     * @author feng 2014-5-20
     */
    class SkeletonAnimationSet extends AnimationSetBase implements IAnimationSet {
        private _jointsPerVertex;
        private _numJoints;
        /**
         * 创建一个骨骼动画集合
         * @param jointsPerVertex 每个顶点关联关节的数量
         */
        constructor(jointsPerVertex?: number);
        /**
         * 每个顶点关联关节的数量
         */
        jointsPerVertex: number;
        /**
         * @inheritDoc
         */
        activate(shaderParams: ShaderParams, pass: MaterialPassBase): void;
        /**
         * 设置关节数量
         */
        numJoints: number;
    }
}
declare module feng3d {
    /**
     * sprite动画集合
     * @author feng 2015-9-18
     */
    class SpriteSheetAnimationSet extends AnimationSetBase implements IAnimationSet {
        /**
         * 创建sprite动画集合
         */
        constructor();
        /**
         * @inheritDoc
         */
        activate(shaderParams: ShaderParams, pass: MaterialPassBase): void;
    }
}
declare module feng3d {
    /**
     * UV动画集合
     * @author feng 2014-5-20
     */
    class UVAnimationSet extends AnimationSetBase implements IAnimationSet {
        /**
         * 创建UV动画集合实例
         */
        constructor();
        /**
         * @inheritDoc
         */
        activate(shaderParams: ShaderParams, pass: MaterialPassBase): void;
    }
}
declare module feng3d {
    /**
     * 顶点动画集合
     * @author feng 2014-5-30
     */
    class VertexAnimationSet extends AnimationSetBase implements IAnimationSet {
        private _numPoses;
        /**
         * 创建一个顶点动画集合
         * @param numPoses		姿势数量
         */
        constructor(numPoses?: number);
        /**
         * 姿势数量
         */
        numPoses: number;
        /**
         * @inheritDoc
         */
        activate(shaderParams: ShaderParams, pass: MaterialPassBase): void;
    }
}
declare module feng3d {
    /**
     * 当开始播放动画时触发
     * @eventType me.feng3d.events.AnimatorEvent
     */
    /**
     * 当动画停止时触发
     * @eventType me.feng3d.events.AnimatorEvent
     */
    /**
     * 当动画播放完一次时触发
     * @eventType me.feng3d.events.AnimatorEvent
     */
    /**
     * 动画基类
     * @author feng 2014-5-27
     */
    abstract class AnimatorBase extends Component implements IAsset {
        private _namedAsset;
        context3DBufferOwner: Context3DBufferOwner;
        /** 是否正在播放动画 */
        private _isPlaying;
        private _autoUpdate;
        private _time;
        /** 播放速度 */
        private _playbackSpeed;
        protected _animationSet: IAnimationSet;
        protected _owners: Mesh[];
        protected _activeNode: AnimationNodeBase;
        protected _activeState: IAnimationState;
        protected _activeAnimationName: string;
        /** 当前动画时间 */
        protected _absoluteTime: number;
        private _animationStates;
        /**
         * 是否更新位置
         * @see me.feng3d.animators.base.states.IAnimationState#positionDelta
         */
        updatePosition: boolean;
        /**
         * 创建一个动画基类
         * @param animationSet
         */
        constructor(animationSet: IAnimationSet);
        /**
         * 初始化Context3d缓存
         */
        protected initBuffers(): void;
        /**
         * Fagal编号中心
         */
        _: any;
        /**
         * 获取动画状态
         * @param node		动画节点
         * @return			动画状态
         */
        getAnimationState(node: AnimationNodeBase): AnimationStateBase;
        /**
         * 根据名字获取动画状态
         * @param name			动作名称
         * @return				动画状态
         */
        getAnimationStateByName(name: string): AnimationStateBase;
        /**
         * 绝对时间（游戏时间）
         * @see #time
         * @see #playbackSpeed
         */
        absoluteTime: number;
        /**
         * 动画设置
         */
        animationSet: IAnimationSet;
        /**
         * 活动的动画状态
         */
        activeState: IAnimationState;
        /**
         * 活动的动画节点
         */
        activeAnimation: AnimationNodeBase;
        /**
         * 活动的动作名
         */
        activeAnimationName: string;
        /**
         * 是否自动更新，当值为true时，动画将会随时间播放
         * @see #time
         * @see #update()
         */
        autoUpdate: boolean;
        /**
         * 动画时间
         */
        time: number;
        /**
         * 设置当前活动状态的动画剪辑的播放进度(0,1)
         * @param	播放进度。 0：动画起点，1：动画终点。
         */
        phase(value: number): void;
        /**
         * The amount by which passed time should be scaled. Used to slow down or speed up animations. Defaults to 1.
         */
        /**
         * 播放速度
         * <p>默认为1，表示正常速度</p>
         */
        playbackSpeed: number;
        /**
         * 开始动画，当自动更新为true时有效
         * @see #autoUpdate
         */
        start(): void;
        /**
         * 暂停播放动画
         * @see #time
         * @see #update()
         */
        stop(): void;
        /**
         * 更新动画
         * @param time			动画时间
         *
         * @see #stop()
         * @see #autoUpdate
         */
        update(time: number): void;
        /**
         * 重置动画
         * @param name			动画名称
         * @param offset		动画时间偏移
         */
        reset(name: string, offset?: number): void;
        /**
         * 添加应用动画的网格
         * @private
         */
        addOwner(mesh: Mesh): void;
        /**
         * 移除应用动画的网格
         * @private
         */
        removeOwner(mesh: Mesh): void;
        /**
         * 更新偏移时间
         * @private
         */
        protected updateDeltaTime(dt: number): void;
        /**
         * 自动更新动画时帧更新事件
         */
        private onEnterFrame(event?);
        /**
         * 应用位置偏移量
         */
        private applyPositionDelta();
        /**
         * 派发动画播放完成一周期事件
         * @private
         */
        dispatchCycleEvent(): void;
        /**
         * @inheritDoc
         */
        abstract setRenderState(renderable: IRenderable, camera: Camera3D): any;
        namedAsset: NamedAsset;
    }
}
declare module feng3d {
    /**
     * 粒子动画
     * @author feng 2014-11-13
     */
    class ParticleAnimator extends AnimatorBase {
        private _particleAnimationSet;
        private _animationParticleStates;
        private _timeParticleStates;
        /** 常量数据 */
        private vertexZeroConst;
        /** 时间常数（粒子当前时间） */
        private timeConstData;
        /**
         * 创建粒子动画
         * @param particleAnimationSet 粒子动画集合
         */
        constructor(particleAnimationSet: ParticleAnimationSet);
        /**
         * @inheritDoc
         */
        protected initBuffers(): void;
        private updateTimeConstBuffer(timeConstBuffer);
        private updateParticleConstDataBuffer(particleConstDataBuffer);
        /**
         * @inheritDoc
         */
        setRenderState(renderable: IRenderable, camera: Camera3D): void;
        /**
         * @inheritDoc
         */
        start(): void;
        /**
         * @inheritDoc
         */
        protected updateDeltaTime(dt: number): void;
    }
}
declare module feng3d {
    /**
     * 骨骼动画
     * @author feng 2014-5-27
     */
    class SkeletonAnimator extends AnimatorBase {
        private _globalMatrices;
        private _globalPose;
        private _globalPropertiesDirty;
        private _numJoints;
        private _animationStates1;
        private _skeleton;
        private _forceCPU;
        private _jointsPerVertex;
        private _activeSkeletonState;
        /**
         * 当前骨骼姿势的全局矩阵
         * @see #globalPose
         */
        globalMatrices: number[];
        /**
         * 当前全局骨骼姿势
         */
        globalPose: SkeletonPose;
        /**
         * 骨骼
         */
        skeleton: Skeleton;
        /**
         * 是否强行使用cpu
         */
        forceCPU: boolean;
        /**
         * 创建一个骨骼动画类
         * @param animationSet 动画集合
         * @param skeleton 骨骼
         * @param forceCPU 是否强行使用cpu
         */
        constructor(animationSet: SkeletonAnimationSet, skeleton: Skeleton, forceCPU?: boolean);
        /**
         * @inheritDoc
         */
        protected initBuffers(): void;
        private updateGlobalmatricesBuffer(globalmatricesBuffer);
        /**
         * 播放动画
         * @param name 动作名称
         * @param offset 偏移量
         */
        play(name: string, transition?: IAnimationTransition, offset?: number): void;
        /**
         * @inheritDoc
         */
        setRenderState(renderable: IRenderable, camera: Camera3D): void;
        /**
         * @inheritDoc
         */
        protected updateDeltaTime(dt: number): void;
        /**
         * 更新骨骼全局变换矩阵
         */
        private updateGlobalProperties();
        /**
         * 几何体变形
         * @param state 动画几何体数据
         * @param subGeom 蒙皮几何体
         */
        private morphGeometry(state, subGeom);
        /**
         * 本地转换到全局姿势
         * @param sourcePose 原姿势
         * @param targetPose 目标姿势
         * @param skeleton 骨骼
         */
        protected localToGlobalPose(sourcePose: SkeletonPose, targetPose: SkeletonPose, skeleton: Skeleton): void;
        /**
         * 处理动画变换完成时间
         */
        private onTransitionComplete(event);
    }
}
declare module feng3d {
    /**
     * sprite动画
     * @author feng 2014-5-27
     */
    class SpriteSheetAnimator extends AnimatorBase {
        private _vectorFrame;
        private _activeSpriteSheetState;
        private _spriteSheetAnimationSet;
        private _frame;
        private _fps;
        private _ms;
        private _lastTime;
        private _reverse;
        private _backAndForth;
        private _specsDirty;
        private _mapDirty;
        /**
         * 创建sprite动画实例
         * @param spriteSheetAnimationSet			sprite动画集合
         */
        constructor(spriteSheetAnimationSet: SpriteSheetAnimationSet);
        /**
         * 帧率
         */
        fps: number;
        /**
         * 是否反向
         */
        reverse: boolean;
        /**
         * 改变播放方向
         */
        backAndForth: boolean;
        /**
         * 跳到某帧播放（起始帧为1）
         * @param frameNumber			帧编号
         */
        gotoAndPlay(frameNumber: number): void;
        /**
         * 跳到某帧停止（起始帧为1）
         * @param frameNumber			帧编号
         */
        gotoAndStop(frameNumber: number): void;
        /**
         * 当前帧编号
         */
        currentFrameNumber: number;
        /**
         * 总帧数
         */
        totalFrames: number;
        /**
         * @inheritDoc
         */
        protected initBuffers(): void;
        private updateVectorFrameBuffer(vcVectorBuffer);
        /**
         * @inheritDoc
         */
        setRenderState(renderable: IRenderable, camera: Camera3D): void;
        /**
         * @inheritDoc
         */
        play(name: string, transition?: IAnimationTransition, offset?: number): void;
        /**
         * @inheritDoc
         */
        protected updateDeltaTime(dt: number): void;
        /**
         * 克隆
         */
        clone(): AnimatorBase;
        /**
         * 跳转某帧
         * @param frameNumber			帧编号
         * @param doPlay				是否播放
         */
        private gotoFrame(frameNumber, doPlay);
    }
}
declare module feng3d {
    /**
     * UV动画
     * @author feng 2014-5-27
     */
    class UVAnimator extends AnimatorBase {
        private _matrix2d;
        private _translate;
        private _uvAnimationSet;
        private _deltaFrame;
        private _activeUVState;
        private _uvTransform;
        private _autoRotation;
        private _rotationIncrease;
        private _autoTranslate;
        private _translateIncrease;
        /**
         * 创建<code>UVAnimator</code>实例
         * @param uvAnimationSet			UV动画集合
         */
        constructor(uvAnimationSet: UVAnimationSet);
        /**
         * 是否自动旋转
         */
        autoRotation: boolean;
        /**
         * 旋转增量（当autoRotation = true生效）
         */
        rotationIncrease: number;
        /**
         * 是否自动转换
         */
        autoTranslate: boolean;
        /**
         * 设置转换值
         * @param u
         * @param v
         */
        setTranslateIncrease(u: number, v: number): void;
        /**
         * 转换值
         */
        translateIncrease: number[];
        /**
         * @inheritDoc
         */
        protected initBuffers(): void;
        private updateTranslateBuffer(buffer);
        private updateMatrix2dBuffer(buffer);
        /**
         * @inheritDoc
         */
        setRenderState(renderable: IRenderable, camera: Camera3D): void;
        /**
         * @inheritDoc
         */
        play(name: string, transition?: IAnimationTransition, offset?: number): void;
        /**
         * @inheritDoc
         */
        protected updateDeltaTime(dt: number): void;
        /**
         * @inheritDoc
         */
        clone(): AnimatorBase;
    }
}
declare module feng3d {
    /**
     * 顶点动画
     * @author feng 2014-5-13
     */
    class VertexAnimator extends AnimatorBase {
        private _weights;
        private _vertexAnimationSet;
        private _poses;
        private _numPoses;
        private _activeVertexState;
        /**
         * 创建一个顶点动画
         * @param vertexAnimationSet 顶点动画集合
         */
        constructor(vertexAnimationSet: VertexAnimationSet);
        /**
         * @inheritDoc
         */
        protected initBuffers(): void;
        private updateWeightsBuffer(weightsBuffer);
        /**
         * 播放动画
         * @param name 动作名称
         * @param offset 时间偏移量
         */
        play(name: string, transition?: IAnimationTransition, offset?: number): void;
        /**
         * @inheritDoc
         */
        protected updateDeltaTime(dt: number): void;
        /**
         * @inheritDoc
         */
        setRenderState(renderable: IRenderable, camera: Camera3D): void;
        /**
         * 设置空姿势
         * @param renderable		渲染对象
         */
        private setNullPose(renderable);
        addOwner(mesh: Mesh): void;
    }
}
declare module feng3d {
    /**
     * 骨骼数据
     * @author feng 2014-5-20
     */
    class Skeleton extends Component implements IAsset {
        private _namedAsset;
        /** 骨骼关节数据列表 */
        joints: SkeletonJoint[];
        constructor();
        numJoints: number;
        namedAsset: NamedAsset;
    }
}
declare module feng3d {
    /**
     * 骨骼pose
     * @author feng 2014-5-20
     */
    class SkeletonPose extends Component implements IAsset {
        private _namedAsset;
        /** 关节pose列表 */
        jointPoses: JointPose[];
        numJointPoses: number;
        constructor();
        namedAsset: NamedAsset;
    }
}
declare module feng3d {
    /**
     * 子几何体组件
     * @author feng 2015-12-10
     */
    class SubGeometryComponent extends Component {
        protected _subGeometry: SubGeometry;
        constructor();
        protected subGeometry: SubGeometry;
        /**
         * 处理被添加事件
         * @param event
         */
        protected onBeAddedComponet(event: ComponentEvent): void;
        /**
         * 处理被移除事件
         * @param event
         */
        protected onBeRemovedComponet(event: ComponentEvent): void;
        /**
         * Fagal编号中心
         */
        protected _: any;
    }
}
declare module feng3d {
    /**
     * 自动生成顶点法线数据
     * @author feng 2015-12-8
     */
    class AutoDeriveVertexNormals extends SubGeometryComponent {
        /** 面法线脏标记 */
        private _faceNormalsDirty;
        private _faceNormals;
        /** 是否使用面权重 */
        private _useFaceWeights;
        /** 面权重 */
        private _faceWeights;
        private dataTypeId;
        private target;
        private needGenerate;
        constructor();
        protected subGeometry: SubGeometry;
        /**
         * 处理被添加事件
         * @param event
         */
        protected onBeAddedComponet(event: ComponentEvent): void;
        protected onGetVAData(event: GeometryComponentEvent): void;
        protected onChangedVAData(event: GeometryComponentEvent): void;
        protected onChangedIndexData(event: GeometryComponentEvent): void;
        /** 面法线 */
        faceNormals: number[];
        /**
         * Indicates whether or not to take the size of faces into account when auto-deriving vertex normals and tangents.
         */
        useFaceWeights: boolean;
        /** 更新面法线数据 */
        private updateFaceNormals();
        /**
         * 更新顶点法线数据
         * @param target 顶点法线数据
         * @return 顶点法线数据
         */
        private updateVertexNormals(target);
    }
}
declare module feng3d {
    /**
     * 自动生成切线组件
     * @author feng 2014-12-19
     */
    class AutoDeriveVertexTangents extends SubGeometryComponent {
        /** 面切线脏标记 */
        private _faceTangentsDirty;
        /** 是否使用面权重 */
        private _useFaceWeights;
        private _faceTangents;
        /** 面权重 */
        private _faceWeights;
        private dataTypeId;
        private target;
        private needGenerate;
        constructor();
        protected subGeometry: SubGeometry;
        /**
         * 处理被添加事件
         * @param event
         */
        protected onBeAddedComponet(event: ComponentEvent): void;
        protected onGetVAData(event: GeometryComponentEvent): void;
        protected onChangedVAData(event: GeometryComponentEvent): void;
        protected onChangedIndexData(event: GeometryComponentEvent): void;
        /** 面切线 */
        faceTangents: number[];
        /**
         * Indicates whether or not to take the size of faces into account when auto-deriving vertex normals and tangents.
         */
        useFaceWeights: boolean;
        /** 更新面切线数据 */
        private updateFaceTangents();
        /**
         * 更新顶点切线数据
         * @param target 顶点切线数据
         * @return 顶点切线数据
         */
        protected updateVertexTangents(target: number[]): number[];
    }
}
declare module feng3d {
    /**
     * 自动生成虚拟UV
     * @author feng 2015-12-8
     */
    class AutoGenerateDummyUVs extends SubGeometryComponent {
        private dataTypeId;
        private target;
        private needGenerate;
        constructor();
        protected subGeometry: SubGeometry;
        /**
         * 处理被添加事件
         * @param event
         */
        protected onBeAddedComponet(event: ComponentEvent): void;
        protected onGetVAData(event: GeometryComponentEvent): void;
        /**
         * 更新虚拟uv
         * @param target 虚拟uv(输出)
         * @return 虚拟uv
         */
        private updateDummyUVs(target);
        protected onChangedVAData(event: GeometryComponentEvent): void;
    }
}
declare module feng3d {
    /**
     * 蒙皮子网格
     * 提供了关节 索引数据与权重数据
     */
    class SkinnedSubGeometry extends SubGeometryComponent {
        private _jointsPerVertex;
        /**
         * 创建蒙皮子网格
         */
        constructor(jointsPerVertex: number);
        /**
         * 处理被添加事件
         * @param event
         */
        protected onBeAddedComponet(event: ComponentEvent): void;
        /**
         * 更新动画顶点数据
         */
        updateAnimatedData(value: number[]): void;
        /**
         * 关节权重数据
         */
        jointWeightsData: number[];
        /**
         * 关节索引数据
         */
        jointIndexData: number[];
        /**
         * 更新关节权重数据
         */
        updateJointWeightsData(value: number[]): void;
        /**
         * 更新关节索引数据
         */
        updateJointIndexData(value: number[]): void;
    }
}
declare module feng3d {
    /**
     * 子几何体形变组件
     * @author feng 2015-12-10
     */
    class SubGeometryTransformation extends SubGeometryComponent {
        private _scaleU;
        private _scaleV;
        constructor();
        scaleU: number;
        scaleV: number;
        scaleUV(scaleU?: number, scaleV?: number): void;
        /**
         * 缩放网格尺寸
         */
        scale(scale: number): void;
        /**
         * 应用变换矩阵
         * @param transform 变换矩阵
         */
        applyTransformation(transform: Matrix3D): void;
    }
}
declare module feng3d {
    /**
     * 顶点动画 子网格
     * @author feng 2014-8-28
     */
    class VertexSubGeometry extends SubGeometryComponent {
        constructor();
        /**
         * 处理被添加事件
         * @param event
         */
        protected onBeAddedComponet(event: ComponentEvent): void;
        updateVertexData0(vertices: number[]): void;
        updateVertexData1(vertices: number[]): void;
    }
}
declare module feng3d {
    /**
     * 3d容器变换组件
     * @author feng 2016-3-9
     */
    class ContainerTransform3D extends Component {
        private objectContainer3D;
        /**
         * 创建一个3d容器变换组件
         */
        constructor();
        /**
         * 处理组件被添加事件
         * @param event
         */
        protected onBeAddedComponet(event: ComponentEvent): void;
        /**
         * 处理容器变换事件
         * @param event
         */
        protected onContainer3DTranformChange(event: Transform3DEvent): void;
    }
}
declare module feng3d {
    /**
     * 位移时抛出
     */
    /**
     * 旋转时抛出
     */
    /**
     * 缩放时抛出
     */
    /**
     * 变换状态抛出
     */
    /**
     * 变换已更新
     */
    /**
     * 3D元素<br/><br/>
     *
     * 主要功能:
     * <ul>
     *     <li>管理3D元素的位置、旋转、缩放状态</li>
     * </ul>
     * @author feng 2014-3-31
     */
    class Element3D extends Component {
        private _smallestNumber;
        protected _transformDirty: boolean;
        private _positionDirty;
        private _rotationDirty;
        private _scaleDirty;
        private _positionChanged;
        private _rotationChanged;
        private _scaleChanged;
        private _transformChanged;
        private _eulers;
        private _listenToPositionChanged;
        private _listenToRotationChanged;
        private _listenToScaleChanged;
        private _listenToTransformChanged;
        protected _transform: Matrix3D;
        protected _x: number;
        protected _y: number;
        protected _z: number;
        protected _rotationX: number;
        protected _rotationY: number;
        protected _rotationZ: number;
        protected _scaleX: number;
        protected _scaleY: number;
        protected _scaleZ: number;
        protected _pivotPoint: Vector3D;
        protected _pivotZero: boolean;
        protected _pos: Vector3D;
        protected _rot: Vector3D;
        protected _sca: Vector3D;
        protected _transformComponents: Vector3D[];
        constructor();
        /**
         * 相对父容器的X坐标
         */
        x: number;
        /**
         * 相对父容器的Y坐标
         */
        y: number;
        /**
         * 相对父容器的Z坐标
         */
        z: number;
        /**
         * 绕X轴旋转角度
         */
        rotationX: number;
        /**
         * 绕Y轴旋转角度
         */
        rotationY: number;
        /**
         * 绕Z轴旋转角度
         */
        rotationZ: number;
        /**
         * X轴旋方向缩放
         */
        scaleX: number;
        /**
         * Y轴旋方向缩放
         */
        scaleY: number;
        /**
         * Z轴旋方向缩放
         */
        scaleZ: number;
        /**
         * 欧拉角
         * <ul>
         *     <li>使用Vector3D对象表示 相对x、y、z轴上的旋转角度</li>
         * </ul>
         */
        eulers: Vector3D;
        /**
         * 3d元素变换矩阵
         */
        transform: Matrix3D;
        /**
         * 中心点坐标（本地对象旋转点）
         */
        pivotPoint: Vector3D;
        /**
         * 获取在父容器中的坐标
         */
        position: Vector3D;
        /**
         * 使位置数据无效
         */
        protected invalidatePosition(): void;
        /**
         * 发出平移事件
         */
        private notifyPositionChanged();
        /**
         * 使变换矩阵失效
         */
        invalidateTransform(): void;
        /**
         * 发出状态改变消息
         */
        private notifyTransformChanged();
        /**
         * 更新变换矩阵
         */
        protected updateTransform(): void;
        /**
         * 使中心点无效
         */
        protected invalidatePivot(): void;
        /**
         * 监听事件
         * @param type 事件类型
         * @param listener 回调函数
         */
        addEventListener(type: string, listener: Function, priority?: number, useWeakReference?: boolean): void;
        /**
         * 移除事件
         * @param type 事件类型
         * @param listener 回调函数
         */
        removeEventListener(type: string, listener: Function): void;
        /**
         * 使旋转角度无效
         */
        protected invalidateRotation(): void;
        /**
         * 抛出旋转事件
         */
        private notifyRotationChanged();
        /**
         * 使缩放无效
         */
        protected invalidateScale(): void;
        /**
         * 抛出缩放事件
         */
        private notifyScaleChanged();
    }
}
declare module feng3d {
    /**
     * 3D元素状态变换<br/><br/>
     *
     * 主要功能:
     * <ul>
     *     <li>处理3d元素的平移、旋转、缩放等操作</li>
     * </ul>
     *
     * @author feng 2014-3-31
     */
    class Transform3D extends Element3D {
        /**
         * 创建3D元素状态变换实例
         */
        constructor();
        /**
         * 前方单位向量
         * <ul>
         * 		<li>自身的Z轴方向</li>
         * </ul>
         */
        forwardVector: Vector3D;
        /**
         * 右方单位向量
         * <ul>
         * 		<li>自身的X轴方向</li>
         * </ul>
         */
        rightVector: Vector3D;
        /**
         * 上方单位向量
         * <ul>
         * 		<li>自身的Y轴方向</li>
         * </ul>
         */
        upVector: Vector3D;
        /**
         * 后方单位向量
         * <ul>
         * 		<li>自身的Z轴负方向</li>
         * </ul>
         */
        backVector: Vector3D;
        /**
         * 左方单位向量
         * <ul>
         * 		<li>自身的X轴负方向</li>
         * </ul>
         */
        leftVector: Vector3D;
        /**
         * 下方单位向量
         * <ul>
         * 		<li>自身的Y轴负方向</li>
         * </ul>
         */
        downVector: Vector3D;
        /**
         * 等比缩放
         * @param value 缩放比例
         */
        scale(value: number): void;
        /**
         * 向前（Z轴方向）位移
         * @param distance 位移距离
         */
        moveForward(distance: number): void;
        /**
         * 向后（Z轴负方向）位移
         * @param distance 位移距离
         */
        moveBackward(distance: number): void;
        /**
         * 向左（X轴负方向）位移
         * @param distance 位移距离
         */
        moveLeft(distance: number): void;
        /**
         * 向右（X轴方向）位移
         * @param distance 位移距离
         */
        moveRight(distance: number): void;
        /**
         * 向上（Y轴方向）位移
         * @param distance 位移距离
         */
        moveUp(distance: number): void;
        /**
         * 向下（Y轴负方向）位移
         * @param distance 位移距离
         */
        moveDown(distance: number): void;
        /**
         * 直接移到空间的某个位置
         * @param newX x坐标
         * @param newY y坐标
         * @param newZ z坐标
         */
        moveTo(newX: number, newY: number, newZ: number): void;
        /**
         * 移动中心点（旋转点）
         * @param dx X轴方向位移
         * @param dy Y轴方向位移
         * @param dz Z轴方向位移
         */
        movePivot(dx: number, dy: number, dz: number): void;
        /**
         * 在自定义轴上位移
         * @param axis 自定义轴
         * @param distance 位移距离
         */
        translate(axis: Vector3D, distance: number): void;
        /**
         * 在自定义轴上位移<br/>
         *
         * 注意：
         * <ul>
         * 		<li>没太理解 与 translate的区别</li>
         * </ul>
         * @param axis 自定义轴
         * @param distance 位移距离
         */
        translateLocal(axis: Vector3D, distance: number): void;
        /**
         * 绕X轴旋转
         * @param angle 旋转角度
         */
        pitch(angle: number): void;
        /**
         * 绕Y轴旋转
         * @param angle 旋转角度
         */
        yaw(angle: number): void;
        /**
         * 绕Z轴旋转
         * @param angle 旋转角度
         */
        roll(angle: number): void;
        /**
         * 直接修改欧拉角
         * @param ax X轴旋转角度
         * @param ay Y轴旋转角度
         * @param az Z轴旋转角度
         */
        rotateTo(ax: number, ay: number, az: number): void;
        /**
         * 绕所给轴旋转
         * @param axis 任意轴
         * @param angle 旋转角度
         */
        rotate(axis: Vector3D, angle: number): void;
        /**
         * 观察目标
         * <ul>
         * 		<li>旋转至朝向给出的点</li>
         * </ul>
         * @param target 	目标点
         * @param upAxis 	旋转后向上方向（并非绝对向上），默认为null，当值为null时会以Y轴为向上方向计算
         */
        lookAt(target: Vector3D, upAxis?: Vector3D): void;
    }
}
declare module feng3d {
    /**
     * 可渲染对象基类
     * @author feng 2015-5-27
     */
    abstract class Renderable extends Component implements IRenderable {
        protected _context3dCache: Context3DCache;
        /**
         * 创建一个可渲染对象基类
         */
        constructor();
        /**
         * Fagal编号中心
         */
        _: any;
        /**
         * @inheritDoc
         */
        context3dCache: Context3DCache;
        /**
         * @inheritDoc
         */
        mouseEnabled: boolean;
        /**
         * @inheritDoc
         */
        numTriangles: number;
        /**
         * @inheritDoc
         */
        sourceEntity: Entity;
        /**
         * @inheritDoc
         */
        material: MaterialBase;
        /**
         * @inheritDoc
         */
        animator: AnimatorBase;
        /**
         * @inheritDoc
         */
        castsShadows: boolean;
    }
}
declare module feng3d {
    /**
     * 可渲染对象基类
     * @author feng 2015-5-27
     */
    class MeshRenderable extends Renderable {
        subMesh: SubMesh;
        /**
         * 创建一个可渲染对象基类
         */
        constructor(subMesh: SubMesh);
        /**
         * @inheritDoc
         */
        getMouseEnabled(): boolean;
        /**
         * @inheritDoc
         */
        getNumTriangles(): number;
        /**
         * @inheritDoc
         */
        getSourceEntity(): Entity;
        /**
         * @inheritDoc
         */
        getMaterial(): MaterialBase;
        /**
         * @inheritDoc
         */
        getAnimator(): AnimatorBase;
        /**
         * @inheritDoc
         */
        getCastsShadows(): boolean;
    }
}
declare module feng3d {
    /**
     *
     * @author feng 2015-12-30
     */
    class SegmentRenderable extends Renderable {
        private segmentSet;
        /**
         * 创建一个可渲染对象基类
         */
        constructor(subMesh: SegmentSet);
        /**
         * @inheritDoc
         */
        getMouseEnabled(): boolean;
        /**
         * @inheritDoc
         */
        getNumTriangles(): number;
        /**
         * @inheritDoc
         */
        getSourceEntity(): Entity;
        /**
         * @inheritDoc
         */
        getMaterial(): MaterialBase;
        /**
         * @inheritDoc
         */
        getAnimator(): AnimatorBase;
        /**
         * @inheritDoc
         */
        getCastsShadows(): boolean;
    }
}
declare module feng3d {
    /**
     * 子网格，可渲染对象
     */
    class SubMesh extends Component {
        renderableBase: MeshRenderable;
        context3DBufferOwner: Context3DBufferOwner;
        protected _parentMesh: Mesh;
        protected _subGeometry: SubGeometry;
        _index: number;
        protected _materialSelf: MaterialBase;
        private _material;
        private _materialDirty;
        private _animator;
        private _animationSubGeometry;
        /**
         * 创建一个子网格
         * @param subGeometry 子几何体
         * @param parentMesh 父网格
         * @param material 材质
         */
        constructor(subGeometry: SubGeometry, parentMesh: Mesh, material?: MaterialBase);
        /**
         * 渲染材质
         */
        material: MaterialBase;
        /**
         * 自身材质
         */
        materialSelf: MaterialBase;
        /**
         * 更新材质
         */
        private updateMaterial();
        /**
         * 所属实体
         */
        sourceEntity: Entity;
        /**
         * 子网格
         */
        subGeometry: SubGeometry;
        /**
         * 动画顶点数据(例如粒子特效的时间、位置偏移、速度等等)
         */
        animationSubGeometry: AnimationSubGeometry;
        /**
         * @inheritDoc
         */
        animator: AnimatorBase;
        /**
         * 父网格
         */
        parentMesh: Mesh;
        castsShadows: boolean;
        /**
         * @inheritDoc
         */
        mouseEnabled: boolean;
        /**
         * @inheritDoc
         */
        numTriangles: number;
        /**
         * 处理材质变化事件
         */
        private onMaterialChange(event);
        /**
         * 销毁
         */
        dispose(): void;
    }
}
declare module feng3d {
    /**
     * 添加3D环境缓冲事件
     */
    /**
     * 移除3D环境缓冲事件
     */
    /**
     * 添加子项3D环境缓冲拥有者事件
     */
    /**
     * 移除子项3D环境缓冲拥有者事件
     */
    /**
     * Context3D缓存拥有者
     * @author feng 2014-11-26
     */
    class Context3DBufferOwner extends Component {
        private _bufferDic;
        private _bufferList;
        /**
         * 缓冲拥有者子项列表
         */
        private childrenBufferOwner;
        private allBufferList;
        /**
         * 所有缓冲列表是否有效
         */
        private bufferInvalid;
        /**
         * 创建Context3D缓存拥有者
         */
        constructor();
        /**
         * Fagal编号中心
         */
        _: FagalIdCenter;
        /**
         * @inheritDoc
         */
        bufferDic: any;
        /**
         * @inheritDoc
         */
        bufferList: Context3DBuffer[];
        /**
         * 初始化Context3d缓存
         */
        protected initBuffers(): void;
        /**
         * 添加子项缓存拥有者
         * @param childBufferOwner
         */
        addChildBufferOwner(childBufferOwner: Context3DBufferOwner): void;
        /**
         * 移除子项缓存拥有者
         * @param childBufferOwner
         */
        removeChildBufferOwner(childBufferOwner: Context3DBufferOwner): void;
        /**
         * 向上冒泡
         */
        private bubbleDispatchEvent(event);
        /**
         * 标记Context3d缓存脏了
         * @param dataTypeId
         */
        markBufferDirty(dataTypeId: string): void;
        /**
         * @inheritDoc
         */
        mapContext3DBuffer(dataTypeId: string, updateFunc: Function): Context3DBuffer;
        /**
         * @inheritDoc
         */
        getAllBufferList(): Context3DBuffer[];
    }
}
declare module feng3d {
    /**
     * 几何体
     * @author feng 2014-3-17
     */
    class Geometry extends Component implements IAsset {
        private _namedAsset;
        private _subGeometries;
        subGeometries: SubGeometry[];
        getSubGeometries(): SubGeometry[];
        constructor();
        /**
         * 顶点个数
         */
        numVertices: number;
        /**
         * 应用变换矩阵
         * @param transform 变换矩阵
         */
        applyTransformation(transform: Matrix3D): void;
        /**
         * 添加子几何体
         * @param subGeometry 子几何体
         */
        addSubGeometry(subGeometry: SubGeometry): void;
        /**
         * 移除子几何体
         * @param subGeometry 子几何体
         */
        removeSubGeometry(subGeometry: SubGeometry): void;
        protected removeAllSubGeometry(): void;
        clone(): Geometry;
        /**
         * 缩放几何体
         * @param scale 缩放系数
         */
        scale(scale: number): void;
        /**
         * 缩放uv
         * @param scaleU u缩放系数
         * @param scaleV v缩放系数
         */
        scaleUV(scaleU?: number, scaleV?: number): void;
        dispose(): void;
        namedAsset: NamedAsset;
    }
}
declare module feng3d {
    /**
     * 粒子几何体
     */
    class ParticleGeometry extends Geometry {
        /**
         * 粒子数据
         */
        particles: ParticleData[];
        /**
         * 粒子数量
         */
        numParticles: number;
        constructor();
        clone(): Geometry;
    }
}
declare module feng3d {
    /**
     *
     * @author feng 2015-12-30
     */
    class SegmentGeometry extends Geometry {
        private _segments;
        constructor();
        /**
         * 添加线段
         * @param segment		线段数据
         */
        addSegment(segment: Segment, needUpdateGeometry?: boolean): void;
        updateGeometry(): void;
        /**
         * 获取线段数据
         * @param index 		线段索引
         * @return				线段数据
         */
        getSegment(index: number): Segment;
        /**
         * 移除所有线段
         */
        removeAllSegments(): void;
        /**
         * 线段列表
         */
        segments: Segment[];
    }
}
declare module feng3d {
    /**
     * 基础网格
     * @author feng 2014-10-11
     */
    abstract class PrimitiveBase extends Geometry {
        protected _geomDirty: boolean;
        protected _uvDirty: boolean;
        private _subGeometry;
        constructor();
        /**
         * @inheritDoc
         */
        subGeometries: SubGeometry[];
        /**
         * @inheritDoc
         */
        clone(): Geometry;
        /**
         * @inheritDoc
         */
        scale(scale: number): void;
        /**
         * @inheritDoc
         */
        scaleUV(scaleU?: number, scaleV?: number): void;
        /**
         * @inheritDoc
         */
        applyTransformation(transform: Matrix3D): void;
        /**
         * 创建几何体
         */
        protected abstract buildGeometry(target: SubGeometry): any;
        /**
         * 创建uv
         */
        protected abstract buildUVs(target: SubGeometry): any;
        /**
         * 几何体失效
         */
        protected invalidateGeometry(): void;
        /**
         * uv失效
         */
        protected invalidateUVs(): void;
        /**
         * 更新几何体
         */
        private updateGeometry();
        /**
         * 更新uv
         */
        private updateUVs();
    }
}
declare module feng3d {
    /**
     * A Cube primitive mesh.
     */
    class CubeGeometry extends PrimitiveBase {
        private _width;
        private _height;
        private _depth;
        private _tile6;
        private _segmentsW;
        private _segmentsH;
        private _segmentsD;
        /**
         * Creates a new Cube object.
         * @param width The size of the cube along its X-axis.
         * @param height The size of the cube along its Y-axis.
         * @param depth The size of the cube along its Z-axis.
         * @param segmentsW The number of segments that make up the cube along the X-axis.
         * @param segmentsH The number of segments that make up the cube along the Y-axis.
         * @param segmentsD The number of segments that make up the cube along the Z-axis.
         * @param tile6 The type of uv mapping to use. When true, a texture will be subdivided in a 2x3 grid, each used for a single face. When false, the entire image is mapped on each face.
         */
        constructor(width?: number, height?: number, depth?: number, segmentsW?: number, segmentsH?: number, segmentsD?: number, tile6?: boolean);
        /**
         * The size of the cube along its X-axis.
         */
        width: number;
        /**
         * The size of the cube along its Y-axis.
         */
        height: number;
        /**
         * The size of the cube along its Z-axis.
         */
        depth: number;
        /**
         * The type of uv mapping to use. When false, the entire image is mapped on each face.
         * When true, a texture will be subdivided in a 3x2 grid, each used for a single face.
         * Reading the tiles from left to right, top to bottom they represent the faces of the
         * cube in the following order: bottom, top, back, left, front, right. This creates
         * several shared edges (between the top, front, left and right faces) which simplifies
         * texture painting.
         */
        tile6: boolean;
        /**
         * The number of segments that make up the cube along the X-axis. Defaults to 1.
         */
        segmentsW: number;
        /**
         * The number of segments that make up the cube along the Y-axis. Defaults to 1.
         */
        segmentsH: number;
        /**
         * The number of segments that make up the cube along the Z-axis. Defaults to 1.
         */
        segmentsD: number;
        /**
         * @inheritDoc
         */
        protected buildGeometry(target: SubGeometry): void;
        /**
         * @inheritDoc
         */
        protected buildUVs(target: SubGeometry): void;
    }
}
declare module feng3d {
    /**
     * 平面网格（四边形）
     * @author feng 2014-4-15
     */
    class PlaneGeometry extends PrimitiveBase {
        private _segmentsW;
        private _segmentsH;
        private _yUp;
        private _width;
        private _height;
        private _doubleSided;
        /**
         * 创建一个平面
         * @param width 宽度
         * @param height 高度
         * @param segmentsW 横向分割数
         * @param segmentsH 纵向分割数
         * @param yUp 正面朝向 true:Y+ false:Z+
         * @param doubleSided 是否双面
         */
        constructor(width?: number, height?: number, segmentsW?: number, segmentsH?: number, yUp?: boolean, doubleSided?: boolean);
        /**
         * 横向分割数
         */
        segmentsW: number;
        /**
         * 纵向分割数
         */
        segmentsH: number;
        /**
         * 正面朝向 true:Y+ false:Z+
         */
        yUp: boolean;
        /**
         * 是否双面
         */
        doubleSided: boolean;
        /**
         * 宽度
         */
        width: number;
        /**
         * 高度
         */
        height: number;
        /**
         * @inheritDoc
         */
        protected buildGeometry(target: SubGeometry): void;
        protected buildUVs(target: SubGeometry): void;
    }
}
declare module feng3d {
    /**
     * 球体网格
     */
    class SphereGeometry extends PrimitiveBase {
        private _radius;
        private _segmentsW;
        private _segmentsH;
        private _yUp;
        /**
         * 创建一个球体
         * @param radius 半径
         * @param segmentsW 横向分割数，默认值16
         * @param segmentsH 纵向分割数，默认值12
         * @param yUp 球体朝向 true:Y+ false:Z+
         */
        constructor(radius?: number, segmentsW?: number, segmentsH?: number, yUp?: boolean);
        /**
         * @inheritDoc
         */
        protected buildGeometry(target: SubGeometry): void;
        /**
         * @inheritDoc
         */
        protected buildUVs(target: SubGeometry): void;
        /**
         * 半径
         */
        radius: number;
        /**
         * 横向分割数，默认值16
         */
        segmentsW: number;
        /**
         * 纵向分割数，默认值12
         */
        segmentsH: number;
        /**
         * 球体朝向 true:Y+ false:Z+
         */
        yUp: boolean;
    }
}
declare module feng3d {
    /**
     * 圆环几何体
     */
    class TorusGeometry extends PrimitiveBase {
        protected _radius: number;
        protected _tubeRadius: number;
        protected _segmentsR: number;
        protected _segmentsT: number;
        protected _yUp: boolean;
        protected vertexPositionData: number[];
        protected vertexNormalData: number[];
        protected vertexTangentData: number[];
        private _rawIndices;
        private _vertexIndex;
        private _currentTriangleIndex;
        private _numVertices;
        private vertexPositionStride;
        private vertexNormalStride;
        private vertexTangentStride;
        /**
         * 添加顶点数据
         */
        private addVertex(vertexIndex, px, py, pz, nx, ny, nz, tx, ty, tz);
        /**
         * 添加三角形索引数据
         * @param currentTriangleIndex		当前三角形索引
         * @param cwVertexIndex0			索引0
         * @param cwVertexIndex1			索引1
         * @param cwVertexIndex2			索引2
         */
        private addTriangleClockWise(currentTriangleIndex, cwVertexIndex0, cwVertexIndex1, cwVertexIndex2);
        /**
         * @inheritDoc
         */
        protected buildGeometry(target: SubGeometry): void;
        /**
         * @inheritDoc
         */
        protected buildUVs(target: SubGeometry): void;
        /**
         * 圆环半径
         */
        radius: number;
        /**
         * 管子半径
         */
        tubeRadius: number;
        /**
         * 横向段数
         */
        segmentsR: number;
        /**
         * 纵向段数
         */
        segmentsT: number;
        /**
         * Y轴是否朝上
         */
        yUp: boolean;
        /**
         * 创建<code>Torus</code>实例
         * @param radius						圆环半径
         * @param tuebRadius					管道半径
         * @param segmentsR						横向段数
         * @param segmentsT						纵向段数
         * @param yUp							Y轴是否朝上
         */
        constructor(radius?: number, tubeRadius?: number, segmentsR?: number, segmentsT?: number, yUp?: boolean);
    }
}
declare module feng3d {
    /**
     * 3D对象<br/><br/>
     * 主要功能:
     * <ul>
     *     <li>能够被addChild添加到3d场景中</li>
     *     <li>维护场景变换矩阵sceneTransform、inverseSceneTransform</li>
     *     <li>维护父对象parent</li>
     * </ul>
     *
     * @author feng
     */
    class Object3D extends Component {
        private _transform3D;
        /** @private */
        _controller: ControllerBase;
        protected _parent: Container3D;
        protected _sceneTransform: Matrix3D;
        protected _sceneTransformDirty: boolean;
        private _inverseSceneTransform;
        private _inverseSceneTransformDirty;
        private _scenePosition;
        private _scenePositionDirty;
        _explicitPartition: Partition3D;
        protected _implicitPartition: Partition3D;
        private _visible;
        private _sceneTransformChanged;
        private _listenToSceneTransformChanged;
        _scene: Scene3D;
        protected _zOffset: number;
        /**
         * 创建3D对象
         */
        constructor();
        transform3D: Transform3D;
        /**
         * 场景
         */
        scene: Scene3D;
        setScene(value: Scene3D): void;
        /**
         * 克隆3D对象
         */
        clone(): Object3D;
        /**
         * 场景变换逆矩阵，场景空间转模型空间
         */
        inverseSceneTransform: Matrix3D;
        /**
         * 场景变换矩阵，模型空间转场景空间
         */
        sceneTransform: Matrix3D;
        /**
         * 更新场景变换矩阵
         */
        protected updateSceneTransform(): void;
        /**
         * 使变换矩阵失效，场景变换矩阵也将失效
         */
        protected onTransformChanged(event: Transform3DEvent): void;
        /**
         * 场景变化失效
         */
        protected invalidateSceneTransform(): void;
        /**
         * 通知场景变换改变
         */
        private notifySceneTransformChange();
        /**
         * 父容器
         */
        parent: Container3D;
        /**
         * 获取场景坐标
         */
        scenePosition: Vector3D;
        /**
         * 本地坐标转换为世界坐标
         * @param localVector3D 本地坐标
         * @return
         */
        positionLocalToGlobal(localPosition: Vector3D): Vector3D;
        /**
         * 世界坐标转换为本地坐标
         * @param globalPosition 世界坐标
         * @return
         */
        positionGlobalToLocal(globalPosition: Vector3D): Vector3D;
        /**
         * 本地方向转换为世界方向
         * @param localDirection 本地方向
         * @return
         */
        directionLocalToGlobal(localDirection: Vector3D): Vector3D;
        /**
         * 世界方向转换为本地方向
         * @param globalDirection 世界方向
         * @return
         */
        directionGlobalToLocal(globalDirection: Vector3D): Vector3D;
        /**
         * @inheritDoc
         */
        dispatchEvent(event: Event): boolean;
        /**
         * 是否可见
         */
        visible: boolean;
        /**
         * 是否在场景上可见
         */
        sceneVisible: boolean;
        /**
         * @inheritDoc
         */
        addEventListener(type: string, listener: Function, priority?: number, useWeakReference?: boolean): void;
        /**
         * @inheritDoc
         */
        removeEventListener(type: string, listener: Function, useCapture?: boolean): void;
        /**
         * 空间分区
         */
        partition: Partition3D;
        /**
         * 隐式空间分区
         */
        implicitPartition: Partition3D;
        /**
         * Z偏移值
         */
        zOffset: number;
        protected onPositionChanged(event: Transform3DEvent): void;
        /**
         * The minimum extremum of the object along the X-axis.
         */
        minX: number;
        /**
         * The minimum extremum of the object along the Y-axis.
         */
        minY: number;
        /**
         * The minimum extremum of the object along the Z-axis.
         */
        minZ: number;
        /**
         * The maximum extremum of the object along the X-axis.
         */
        maxX: number;
        /**
         * The maximum extremum of the object along the Y-axis.
         */
        maxY: number;
        /**
         * The maximum extremum of the object along the Z-axis.
         */
        maxZ: number;
        /**
         * Cleans up any resources used by the current object.
         */
        dispose(): void;
    }
}
declare module feng3d {
    /**
     * 当鼠标点击时触发
     * @eventType me.feng3d.events.MouseEvent3D
     */
    /**
     * 当鼠标移上时触发
     * @eventType me.feng3d.events.MouseEvent3D
     */
    /**
     * 当鼠标移出时触发
     * @eventType me.feng3d.events.MouseEvent3D
     */
    /**
     * 当鼠标移动时触发
     * @eventType me.feng3d.events.MouseEvent3D
     */
    /**
     * 当鼠标双击时触发
     * @eventType me.feng3d.events.MouseEvent3D
     */
    /**
     * 当鼠标按下时触发
     * @eventType me.feng3d.events.MouseEvent3D
     */
    /**
     * 当鼠标弹起时触发
     * @eventType me.feng3d.events.MouseEvent3D
     */
    /**
     * 当滚动鼠标滚轮时触发
     * @eventType me.feng3d.events.MouseEvent3D
     */
    /**
     * InteractiveObject3D 类是用户可以使用鼠标、键盘或其他用户输入设备与之交互的所有显示对象的抽象基类。
     * @see		flash.display.InteractiveObject
     * @author 	warden_feng 2014-5-5
     */
    abstract class InteractiveObject3D extends Object3D {
        protected _mouseEnabled: boolean;
        /**
         * 调用新的 InteractiveObject3D() 构造函数会引发 ArgumentError 异常。
         * @throws	me.feng.error.AbstractClassError
         */
        constructor();
        /**
         * 是否开启鼠标事件
         */
        mouseEnabled: boolean;
        /**
         * @inheritDoc
         */
        dispatchEvent(event: Event): boolean;
    }
}
declare module feng3d {
    /**
     * 3d对象容器
     * @author feng 2014-3-21
     */
    class Container3D extends InteractiveObject3D implements IAsset {
        protected _namedAsset: NamedAsset;
        /** 容器内对象列表 */
        protected _children: Object3D[];
        private _mouseChildren;
        /** 是否给根容器 */
        _isRoot: boolean;
        constructor();
        /**
         * 添加子对象
         * @param child		子对象
         * @return			新增的子对象
         */
        addChild(child: Object3D): Object3D;
        /**
         * 移出指定索引的子对象
         * @param childIndex	子对象索引
         * @return				被移除对象
         */
        removeChildAt(childIndex: number): Object3D;
        /**
         * 移除子对象
         * @param child		子对象
         */
        removeChild(child: Object3D): void;
        /**
         * 移除所有子对象
         */
        removeAllChild(): void;
        /**
         * 内部移除子对象
         * @param childIndex	移除子对象所在索引
         * @param child			移除子对象
         */
        private removeChildInternal(childIndex, child);
        scene: Scene3D;
        setScene(scene: Scene3D): void;
        /**
         * 子对象个数
         */
        numChildren: number;
        /**
         * 获取子对象
         * @param index
         * @return
         */
        getChildAt(index: number): Object3D;
        /**
         * 是否包含该对象
         * @param child
         * @return
         */
        contains(child: Object3D): boolean;
        /**
         * 确定对象的子级是否支持鼠标或用户输入设备。
         */
        mouseChildren: boolean;
        /**
         * 祖先是否允许鼠标事件
         */
        ancestorsAllowMouseEnabled: boolean;
        /**
         * @inheritDoc
         */
        implicitPartition: Partition3D;
        setImplicitPartition(value: Partition3D): void;
        /**
         * The minimum extremum of the object along the X-axis.
         */
        minX: number;
        /**
         * The minimum extremum of the object along the Y-axis.
         */
        minY: number;
        /**
         * The minimum extremum of the object along the Z-axis.
         */
        minZ: number;
        /**
         * The maximum extremum of the object along the X-axis.
         */
        maxX: number;
        /**
         * The maximum extremum of the object along the Y-axis.
         */
        maxY: number;
        /**
         * The maximum extremum of the object along the Z-axis.
         */
        maxZ: number;
        /**
         * @inheritDoc
         */
        dispose(): void;
        namedAsset: NamedAsset;
    }
}
declare module feng3d {
    /**
     * 3d场景
     * @author feng 2014-3-17
     */
    class Scene3D extends Container3D {
        private _partitions;
        /** 实体字典 */
        private _entityDic;
        private _displayEntityDic;
        private _mouseCollisionEntitys;
        /**
         * 创建一个3d场景
         */
        constructor();
        /** 显示实体字典 */
        displayEntityDic: any;
        /**
         * 添加对象到场景
         * @param object3D		3d对象
         */
        addedObject3d(object3D: Object3D): void;
        /**
         * 从场景中移除对象
         * @param object3D	3d对象
         */
        removedObject3d(object3D: Object3D): void;
        /**
         * 收集需要检测鼠标碰撞的实体
         */
        collectMouseCollisionEntitys(): void;
        /**
         * 需要检测鼠标碰撞的实体
         */
        mouseCollisionEntitys: Entity[];
        /**
         * 横穿分区
         * @param traverser 横越者
         */
        traversePartitions(traverser: PartitionTraverser): void;
        /**
         * 注销实体
         * @param entity	实体
         */
        unregisterEntity(entity: Entity): void;
        /**
         * 注册实体
         * @param entity		实体
         */
        registerEntity(entity: Entity): void;
        /**
         * 添加分区，如果不在列表中
         * @param partition		分区
         */
        protected addPartitionUnique(partition: Partition3D): void;
        /**
         * 注册分区
         * @param entity	注册分区的实体
         */
        registerPartition(entity: Entity): void;
        /**
         * 注销分区
         * @param entity	注销分区的实体
         */
        unregisterPartition(entity: Entity): void;
    }
}
declare module feng3d {
    /**
     * Entity为所有场景绘制对象提供一个基类，表示存在场景中。可以被entityCollector收集。
     * @author feng 2014-3-24
     */
    abstract class Entity extends Container3D {
        private _showBounds;
        private _partitionNode;
        private _boundsIsShown;
        protected _bounds: BoundingVolumeBase;
        protected _boundsInvalid: boolean;
        _pickingCollisionVO: PickingCollisionVO;
        _pickingCollider: IPickingCollider;
        private _worldBounds;
        private _worldBoundsInvalid;
        /**
         * 创建一个实体，该类为虚类
         */
        constructor();
        /**
         * 是否显示边界
         */
        showBounds: boolean;
        /**
         * 添加边界
         */
        private addBounds();
        /**
         * 移除边界
         */
        private removeBounds();
        /**
         * @inheritDoc
         */
        minX: number;
        /**
         * @inheritDoc
         */
        minY: number;
        /**
         * @inheritDoc
         */
        minZ: number;
        /**
         * @inheritDoc
         */
        maxX: number;
        /**
         * @inheritDoc
         */
        maxY: number;
        /**
         * @inheritDoc
         */
        maxZ: number;
        /**
         * 边界
         */
        bounds: BoundingVolumeBase;
        /**
         * @inheritDoc
         */
        protected invalidateSceneTransform(): void;
        /**
         * 边界失效
         */
        protected invalidateBounds(): void;
        /**
         * 获取默认边界（默认盒子边界）
         * @return
         */
        protected getDefaultBoundingVolume(): BoundingVolumeBase;
        /**
         * 更新边界
         */
        protected abstract updateBounds(): any;
        /**
         * 获取碰撞数据
         */
        pickingCollisionVO: PickingCollisionVO;
        /**
         * 判断射线是否穿过实体
         * @param ray3D
         * @return
         */
        isIntersectingRay(ray3D: Ray3D): boolean;
        /**
         * 获取采集的碰撞
         */
        pickingCollider: IPickingCollider;
        setPickingCollider(value: IPickingCollider): void;
        /**
         * 碰撞前设置碰撞状态
         * @param shortestCollisionDistance 最短碰撞距离
         * @param findClosest 是否寻找最优碰撞
         * @return
         */
        collidesBefore(shortestCollisionDistance: number, findClosest: boolean): boolean;
        /**
         * @inheritDoc
         */
        implicitPartition: Partition3D;
        /**
         * 通知场景一个新分区已分配
         */
        private notifyPartitionAssigned();
        /**
         * 通知场景一个分区取消分配
         */
        private notifyPartitionUnassigned();
        /**
         * @inheritDoc
         */
        scene: Scene3D;
        /**
         * 获取实体分区节点
         */
        getEntityPartitionNode(): EntityNode;
        /**
         * 创建实体分区节点，该函数为虚函数，需要子类重写。
         */
        protected abstract createEntityPartitionNode(): EntityNode;
        /**
         * 内部更新
         */
        internalUpdate(): void;
        /**
         * 世界边界
         */
        worldBounds: BoundingVolumeBase;
        /**
         * 更新世界边界
         */
        private updateWorldBounds();
        /**
         * The transformation matrix that transforms from model to world space, adapted with any special operations needed to render.
         * For example, assuring certain alignedness which is not inherent in the scene transform. By default, this would
         * return the scene transform.
         */
        getRenderSceneTransform(camera: Camera3D): Matrix3D;
    }
}
declare module feng3d {
    /**
     * 摄像机
     * @author feng 2014-3-17
     */
    class Camera3D extends Entity {
        private _viewProjection;
        private _viewProjectionDirty;
        private _lens;
        private _frustumPlanes;
        private _frustumPlanesDirty;
        /**
         * 创建一个摄像机
         * @param lens 摄像机镜头
         */
        constructor(lens?: LensBase);
        /**
         * 处理镜头变化事件
         */
        private onLensMatrixChanged(event);
        /**
         * @inheritDoc
         */
        protected invalidateSceneTransform(): void;
        /**
         * @inheritDoc
         */
        protected createEntityPartitionNode(): EntityNode;
        /**
         * 镜头
         */
        lens: LensBase;
        /**
         * 场景投影矩阵，世界空间转投影空间
         */
        viewProjection: Matrix3D;
        /**
         * 视锥体面
         */
        frustumPlanes: Plane3D[];
        /**
         * 更新视锥体6个面，平面均朝向视锥体内部
         * @see http://www.linuxgraphics.cn/graphics/opengl_view_frustum_culling.html
         */
        private updateFrustum();
        /**
         * 屏幕坐标投影到场景坐标
         * @param nX 屏幕坐标X -1（左） -> 1（右）
         * @param nY 屏幕坐标Y -1（上） -> 1（下）
         * @param sZ 到屏幕的距离
         * @param v 场景坐标（输出）
         * @return 场景坐标
         */
        unproject(nX: number, nY: number, sZ: number, v?: Vector3D): Vector3D;
        /**
         * 场景坐标投影到屏幕坐标
         * @param point3d 场景坐标
         * @param v 屏幕坐标（输出）
         * @return 屏幕坐标
         */
        project(point3d: Vector3D, v?: Vector3D): Vector3D;
        /**
         * @inheritDoc
         */
        protected getDefaultBoundingVolume(): BoundingVolumeBase;
        /**
 * 更新边界
 */
        protected updateBounds(): void;
    }
}
declare module feng3d {
    /**
     * 材质发生变化时抛出
     */
    /**
     * 网格
     * @author feng 2014-4-9
     */
    class Mesh extends Entity implements IMaterialOwner {
        protected _subMeshes: SubMesh[];
        protected _geometry: Geometry;
        protected _materialSelf: MaterialBase;
        protected _animator: AnimatorBase;
        private _castsShadows;
        /**
         * 新建网格
         * @param geometry 几何体
         * @param material 材质
         */
        constructor(geometry?: Geometry, material?: MaterialBase);
        /** 几何形状 */
        geometry: Geometry;
        /**
         * 渲染材质
         */
        getMaterial(): MaterialBase;
        /**
         * 自身材质
         */
        materialSelf: MaterialBase;
        material: MaterialBase;
        /**
         * 源实体
         */
        sourceEntity: Entity;
        /**
         * @inheritDoc
         */
        protected updateBounds(): void;
        /**
         * @inheritDoc
         */
        collidesBefore(shortestCollisionDistance: number, findClosest: boolean): boolean;
        /**
         * @inheritDoc
         */
        getAnimator(): AnimatorBase;
        animator: AnimatorBase;
        /**
         * 子网格列表
         */
        subMeshes: SubMesh[];
        /**
         * 添加子网格包装子几何体
         * @param subGeometry		被添加的子几何体
         */
        protected addSubMesh(subGeometry: SubGeometry): void;
        /**
         * 处理几何体边界变化事件
         */
        private onGeometryBoundsInvalid(event);
        /**
         * 处理子几何体添加事件
         */
        private onSubGeometryAdded(event);
        /**
         * 处理子几何体移除事件
         */
        private onSubGeometryRemoved(event);
        /**
         * 是否捕获阴影
         */
        castsShadows: boolean;
        /**
         * @inheritDoc
         */
        protected createEntityPartitionNode(): EntityNode;
    }
}
declare module feng3d {
    /**
     * 高度地形
     * @author feng 2014-7-16
     */
    class Elevation extends Mesh {
        private _segmentsW;
        private _segmentsH;
        private _width;
        private _height;
        private _depth;
        private _heightMap;
        private _minElevation;
        private _maxElevation;
        protected _geomDirty: boolean;
        protected _uvDirty: boolean;
        private _subGeometry;
        /**
         * 创建高度地形 拥有segmentsW*segmentsH个顶点
         * @param    material	地形纹理
         * @param    heightMap	高度图
         * @param    width	地形宽度
         * @param    height	地形高度
         * @param    depth	地形深度
         * @param    segmentsW	x轴上网格段数
         * @param    segmentsH	y轴上网格段数
         * @param    maxElevation	最大地形高度
         * @param    minElevation	最小地形高度
         * @param    smoothMap	是否平滑
         */
        constructor(material: MaterialBase, heightMap: BitmapData, width?: number, height?: number, depth?: number, segmentsW?: number, segmentsH?: number, maxElevation?: number, minElevation?: number);
        /**
         * 创建顶点坐标
         */
        private buildGeometry();
        /**
         * 创建uv坐标
         */
        private buildUVs();
        /**
         * 获取位置在（x，z）处的高度y值
         * @param x x坐标
         * @param z z坐标
         * @return 高度
         */
        getHeightAt(x: number, z: number): number;
    }
}
declare module feng3d {
    /**
     * 线段集合
     * @author feng 2014-4-9
     */
    class SegmentSet extends Mesh implements IRenderable {
        private _numIndices;
        protected segmentGeometry: SegmentGeometry;
        /**
         * 创建一个线段集合
         */
        constructor();
        /**
         * 添加线段
         * @param segment		线段数据
         */
        addSegment(segment: Segment, needUpdateGeometry?: boolean): void;
        /**
         * @inheritDoc
         */
        context3dCache: Context3DCache;
        /**
         * @inheritDoc
         */
        numTriangles: number;
        /**
         * 线段不会投射阴影，始终为false
         */
        castsShadows: boolean;
    }
}
declare module feng3d {
    /**
     * 坐标系,三叉戟
     * @param length 长度
     * @param showLetters 显示字母
     */
    class Trident extends SegmentSet {
        constructor(length?: number, showLetters?: boolean);
        private buildTrident(length, showLetters);
    }
}
declare module feng3d {
    /**
     * 线框基元基类
     * @author feng 2014-4-27
     */
    abstract class WireframePrimitiveBase extends SegmentSet {
        private _color;
        private _thickness;
        /**
         * @param color 线框颜色
         * @param thickness 线框厚度
         */
        constructor(color?: number, thickness?: number);
        /** 线框颜色 */
        color: number;
        /** 线条粗细值 */
        thickness: number;
        /**
         * 更新线条
         * @param index 线段编号
         * @param v0 线段起点
         * @param v1 线段终点
         */
        protected updateOrAddSegment(index: number, v0: Vector3D, v1: Vector3D): void;
    }
}
declare module feng3d {
    /**
     * 线框立方体
     * @author feng 2014-4-27
     */
    class WireframeCube extends WireframePrimitiveBase {
        private _cubeWidth;
        private _cubeHeight;
        private _cubeDepth;
        /**
         * @param width X轴方向宽度
         * @param height Y轴方向高度
         * @param depth Z轴方向深度
         * @param color 线条颜色
         * @param thickness 线条厚度
         */
        constructor(width?: number, height?: number, depth?: number, color?: number, thickness?: number);
        /**
         * The size of the cube along its X-axis.
         */
        cubeWidth: number;
        /**
         * The size of the cube along its Y-axis.
         */
        cubeHeight: number;
        /**
         * The size of the cube along its Z-axis.
         */
        cubeDepth: number;
        /**
         * @inheritDoc
         */
        protected buildGeometry(): void;
    }
}
declare module feng3d {
    /**
    * 线框几何体
     * @author feng 2014-5-8
     */
    class WireframeGeometry extends WireframePrimitiveBase {
        private _drawGeometry;
        /**
         * 创建几何体线框
         * @param geometry 几何体
         * @param color 线条颜色
         * @param thickness 线条粗细
         */
        constructor(color?: number, thickness?: number);
        drawGeometry: Geometry;
        /**
         * 绘制几何体线框
         */
        setDrawGeometry(value: Geometry): void;
        protected buildGeometry(): void;
    }
}
declare module feng3d {
    /**
     * A WireframePlane primitive mesh.
     */
    class WireframePlane extends WireframePrimitiveBase {
        static ORIENTATION_YZ: string;
        static ORIENTATION_XY: string;
        static ORIENTATION_XZ: string;
        private _width;
        private _height;
        private _segmentsW;
        private _segmentsH;
        private _orientation;
        /**
         * Creates a new WireframePlane object.
         * @param width The size of the cube along its X-axis.
         * @param height The size of the cube along its Y-axis.
         * @param segmentsW The number of segments that make up the cube along the X-axis.
         * @param segmentsH The number of segments that make up the cube along the Y-axis.
         * @param color The colour of the wireframe lines
         * @param thickness The thickness of the wireframe lines
         * @param orientation The orientaion in which the plane lies.
         */
        constructor(width: number, height: number, segmentsW?: number, segmentsH?: number, color?: number, thickness?: number, orientation?: string);
        /**
         * The orientaion in which the plane lies.
         */
        orientation: string;
        /**
         * The size of the cube along its X-axis.
         */
        width: number;
        /**
         * The size of the cube along its Y-axis.
         */
        height: number;
        /**
         * The number of segments that make up the plane along the X-axis.
         */
        segmentsW: number;
        /**
         * The number of segments that make up the plane along the Y-axis.
         */
        segmentsH: number;
        /**
         * @inheritDoc
         */
        protected buildGeometry(): void;
    }
}
declare module feng3d {
    /**
     * 球体线框
     * @author feng 2015-3-21
     */
    class WireframeSphere extends WireframePrimitiveBase {
        private _segmentsW;
        private _segmentsH;
        private _radius;
        /**
         * 创建一个球体线框对象
         * @param radius			球体半径
         * @param segmentsW			球体的横向分割数
         * @param segmentsH			球体的纵向分割数
         * @param color				线框颜色
         * @param thickness			线条粗细
         */
        constructor(radius?: number, segmentsW?: number, segmentsH?: number, color?: number, thickness?: number);
        /**
         * @inheritDoc
         */
        protected buildGeometry(): void;
    }
}
declare module feng3d {
    /**
     * 天空盒类用于渲染的场景中的天空。
     * 总是被认为是静态的,在无穷远处,并且总是集中在相机的位置和大小符合在相机的视锥体,
     * 确保天空盒总是尽可能大而不被裁剪。
     * @author feng 2014-7-11
     */
    class SkyBox extends Mesh {
        private subGeometry;
        /**
         * 创建天空盒实例
         * @param cubeMap		立方体贴图
         */
        constructor(cubeMap: CubeTextureBase);
        /**
         * 创建天空盒 顶点与索引数据
         */
        private buildGeometry();
        /**
         * @inheritDoc
         */
        protected createEntityPartitionNode(): EntityNode;
        /**
         * @inheritDoc
         */
        protected updateBounds(): void;
        /**
         * 天空盒不会投射阴影，始终为false
         */
        castsShadows: boolean;
    }
}
declare module feng3d {
    /**
     * Sprite3D is a 3D billboard, a renderable rectangular area that is always aligned with the projection plane.
     * As a result, no perspective transformation occurs on a Sprite3D object.
     *
     * todo: mvp generation or vertex shader code can be optimized
     */
    class Sprite3D extends Mesh {
        private static _sprite3DGeometry;
        private _spriteMatrix;
        private _pickingSubMesh;
        private _pickingTransform;
        private _camera;
        private _width;
        private _height;
        private _shadowCaster;
        constructor(material: MaterialBase, width: number, height: number);
        pickingCollider: IPickingCollider;
        width: number;
        height: number;
        castsShadows: boolean;
        protected updateBounds(): void;
        protected onTransformUpdated(event: Transform3DEvent): void;
        collidesBefore(shortestCollisionDistance: number, findClosest: boolean): boolean;
        getRenderSceneTransform(camera: Camera3D): Matrix3D;
    }
}
declare module feng3d {
    /**
     * 灯光基类
     * @author feng 2014-9-11
     */
    abstract class LightBase extends Entity {
        private _color;
        private _colorR;
        private _colorG;
        private _colorB;
        private _ambientColor;
        private _ambient;
        _ambientR: number;
        _ambientG: number;
        _ambientB: number;
        private _specular;
        _specularR: number;
        _specularG: number;
        _specularB: number;
        private _diffuse;
        _diffuseR: number;
        _diffuseG: number;
        _diffuseB: number;
        private _castsShadows;
        private _shadowMapper;
        /**
         * 创建一个灯光
         */
        constructor();
        castsShadows: boolean;
        protected abstract createShadowMapper(): ShadowMapperBase;
        /**
         * 灯光颜色。默认为<code>0xffffff</code>。
         */
        color: number;
        /**
         * 环境光强。默认为<code>0</code>。
         */
        ambient: number;
        /**
         * 环境光颜色。默认为<code>0xffffff</code>。
         */
        ambientColor: number;
        /**
         * 漫反射光强。默认为<code>1</code>。
         */
        diffuse: number;
        /**
         * 镜面反射光强。默认为<code>1</code>。
         */
        specular: number;
        /**
         * 更新镜面反射光成分
         */
        private updateSpecular();
        /**
         * 更新漫反射光成分
         */
        private updateDiffuse();
        /**
         * 更新环境光成分
         */
        private updateAmbient();
        shadowMapper: ShadowMapperBase;
        /**
         * Gets the optimal projection matrix to render a light-based depth map for a single object.
         *
         * @param renderable The IRenderable object to render to a depth map.
         * @param target An optional target Matrix3D object. If not provided, an instance will be created.
         * @return A Matrix3D object containing the projection transformation.
         */
        abstract getObjectProjectionMatrix(renderable: IRenderable, target: Matrix3D): Matrix3D;
    }
}
declare module feng3d {
    /**
     * 方向灯光
     * @author feng 2014-9-11
     */
    class DirectionalLight extends LightBase {
        private _direction;
        private _tmpLookAt;
        private _sceneDirection;
        /**
         * 创建一个方向灯光
         * @param xDir		方向X值
         * @param yDir		方向Y值
         * @param zDir		方向Z值
         */
        constructor(xDir?: number, yDir?: number, zDir?: number);
        /**
         * 灯光方向
         */
        direction: Vector3D;
        /**
         * 灯光场景方向
         */
        sceneDirection: Vector3D;
        /**
         * @inheritDoc
         */
        protected updateSceneTransform(): void;
        /**
         * @inheritDoc
         */
        protected createEntityPartitionNode(): EntityNode;
        /**
         * @inheritDoc
         */
        protected getDefaultBoundingVolume(): BoundingVolumeBase;
        /**
         * @inheritDoc
         */
        protected updateBounds(): void;
        protected createShadowMapper(): ShadowMapperBase;
        getObjectProjectionMatrix(renderable: IRenderable, target: Matrix3D): Matrix3D;
    }
}
declare module feng3d {
    /**
     * 点灯光
     * @author feng 2014-10-9
     */
    class PointLight extends LightBase {
        _radius: number;
        _fallOff: number;
        _fallOffFactor: number;
        constructor();
        /**
         * 灯光可照射的最小距离
         */
        radius: number;
        /**
         * 灯光可照射的最大距离
         */
        fallOff: number;
        /**
         * @inheritDoc
         */
        protected createEntityPartitionNode(): EntityNode;
        /**
         * @inheritDoc
         */
        protected updateBounds(): void;
        protected createShadowMapper(): ShadowMapperBase;
        getObjectProjectionMatrix(renderable: IRenderable, target: Matrix3D): Matrix3D;
    }
}
declare module feng3d {
    /**
     * 顶点数据拥有者
     * @author feng 2015-1-14
     */
    class VertexBufferOwner extends Component {
        context3DBufferOwner: Context3DBufferOwner;
        protected _numVertices: number;
        private _vaIdList;
        /** 顶点属性数据缓存字典 */
        private vaBufferDic;
        /** 顶点数据长度字典 */
        private data32PerVertexDic;
        /** 顶点数据字典 */
        protected vertexDataDic: {};
        /** 数据有效(与脏相反)标记字典 */
        private dataValidDic;
        /**
         * 创建顶点数据拥有者
         */
        constructor();
        /**
         * 顶点个数
         */
        numVertices: number;
        /**
         * 注册顶点数据
         * @param dataTypeId
         * @param data32PerVertex
         */
        mapVABuffer(dataTypeId: string, data32PerVertex: number): void;
        /**
         * 更新顶点数据缓冲
         * @param vaBuffer
         */
        private updateVABuffer(vaBuffer);
        /**
         * 使顶点数据失效
         * @param dataTypeId
         */
        invalidVAData(dataTypeId: string): void;
        /**
         * 获取顶点属性长度(1-4)
         * @param dataTypeId 数据类型编号
         * @return 顶点属性长度
         */
        getVALen(dataTypeId: string): number;
        /**
         * 设置顶点属性数据
         * @param dataTypeId 数据类型编号
         * @param data 顶点属性数据
         */
        setVAData(dataTypeId: string, data: number[]): void;
        /**
         * 获取顶点属性数据
         * @param dataTypeId 数据类型编号
         * @param needUpdate 是否需要更新数据
         * @return 顶点属性数据
         */
        getVAData(dataTypeId: string): number[];
        /**
         * 通知数据发生变化<br/>
         * 通常会在setVAData后被调用<br/>
         * 处理某数据改变后对其他数据造成的影响<br/>
         * 比如顶点数据发生变化后法线、切线等数据就变得无效了
         * @param dataTypeId 数据类型编号
         */
        protected notifyVADataChanged(dataTypeId: string): void;
        /**
         * 更新顶点数据
         * @param dataTypeId 数据类型编号
         */
        protected updateVAdata(dataTypeId: string): void;
        /** 顶点属性编号列表 */
        vaIdList: string[];
        /**
         * Fagal编号中心
         */
        _: any;
    }
}
declare module feng3d {
    /**
     * 动画数据
     * @author feng 2015-1-14
     */
    class AnimationSubGeometry extends VertexBufferOwner {
        /**
         * 创建一个动画数据
         */
        constructor();
    }
}
declare module feng3d {
    /**
     * 获取几何体顶点数据时触发
     */
    /**
     * 改变几何体顶点数据后触发
     */
    /**
     * 改变顶点索引数据后触发
     */
    /**
     * 子几何体
     */
    class SubGeometry extends VertexBufferOwner {
        private _parent;
        protected _indices: number[];
        protected _numIndices: number;
        protected _numTriangles: number;
        /**
         * 创建一个新几何体
         */
        constructor();
        protected initBuffers(): void;
        /**
         * 更新索引数据
         * @param indexBuffer 索引缓存
         */
        protected updateIndexBuffer(indexBuffer: IndexBuffer): void;
        /**
         * 可绘制三角形的个数
         */
        numTriangles: number;
        /**
         * 销毁
         */
        dispose(): void;
        /**
         * 顶点索引数据
         */
        indexData: number[];
        /**
         * 索引数量
         */
        numIndices: number;
        /**
         * 索引数据
         */
        indices: number[];
        /**
         * 更新顶点索引数据
         */
        updateIndexData(indices: number[]): void;
        fromVectors(vertices: number[], uvs: number[]): void;
        /**
         * 应用变换矩阵
         * @param transform 变换矩阵
         */
        applyTransformation(transform: Matrix3D): void;
        /**
         * 更新uv数据
         * @param data	uv数据
         */
        updateUVData(data: number[]): void;
        /**
         * 更新顶点数据
         */
        updateVertexPositionData(data: number[]): void;
        /**
         * 更新顶点法线数据
         * @param vertexNormals 顶点法线数据
         */
        updateVertexNormalData(vertexNormals: number[]): void;
        /**
         * 更新顶点切线数据
         * @param vertexTangents 顶点切线数据
         */
        updateVertexTangentData(vertexTangents: number[]): void;
        /**
         * 顶点数据
         */
        vertexPositionData: number[];
        /**
         * 顶点法线数据
         */
        vertexNormalData: number[];
        /**
         * 顶点切线数据
         */
        vertexTangentData: number[];
        /**
         * uv数据
         */
        UVData: number[];
        /**
         * 顶点坐标数据步长
         */
        vertexPositionStride: number;
        /**
         * 顶点切线步长
         */
        vertexTangentStride: number;
        /**
         * 顶点法线步长
         */
        vertexNormalStride: number;
        /**
         * UV步长
         */
        UVStride: number;
        protected notifyVADataChanged(dataTypeId: string): void;
        getVAData(dataTypeId: string): number[];
        clone(): SubGeometry;
        /**
         * 父网格
         */
        parent: Geometry;
    }
}
declare module feng3d {
    /**
     * 线段渲染数据缓存
     * @author feng 2014-5-9
     */
    class SegmentSubGeometry extends SubGeometry {
        constructor();
        protected initBuffers(): void;
        vertexPositionData: number[];
        pointData0: number[];
        pointData1: number[];
        thicknessData: number[];
        colorData: number[];
        pointData0Stride: number;
        pointData1Stride: number;
        thicknessDataStride: number;
        colorDataStride: number;
        updatePointData0(value: number[]): void;
        updatePointData1(value: number[]): void;
        updateThicknessData(value: number[]): void;
        updateColorData(value: number[]): void;
    }
}
declare module feng3d {
    /**
     * 动画渲染参数
     * @author feng 2015-12-1
     */
    class AnimationShaderParams extends Component {
        /** 骨骼动画中的骨骼数量 */
        numJoints: number;
        /** 每个顶点关联关节的数量 */
        jointsPerVertex: number;
        /** 动画Fagal函数类型 */
        animationType: AnimationType;
        /** 是否使用uv动画 */
        useUVAnimation: number;
        /** 是否使用SpritSheet动画 */
        useSpriteSheetAnimation: number;
        /**
         * 动画渲染参数
         */
        constructor();
        init(): void;
    }
}
declare module feng3d {
    /**
     * 通用渲染参数
     * @author feng 2015-12-1
     */
    class CommonShaderParams extends Component {
        /** 是否有漫反射贴图 */
        hasDiffuseTexture: number;
        /** 是否使用漫反射函数 */
        usingDiffuseMethod: number;
        useAmbientTexture: number;
        alphaThreshold: number;
        /** 是否需要uv坐标 */
        needsUV: number;
        /**
         * 通用渲染参数
         */
        constructor();
        /**
         * 初始化
         */
        init(): void;
    }
}
declare module feng3d {
    /**
     * 环境渲染参数
     * @author feng 2015-12-1
     */
    class EnvShaderParams extends Component {
        /**  */
        useEnvMapMethod: number;
        /**  */
        useEnvMapMask: number;
        constructor();
    }
}
declare module feng3d {
    /**
     * 雾渲染参数
     * @author feng 2015-12-1
     */
    class FogShaderParams extends Component {
        /**
         * 是否渲染雾
         */
        useFog: number;
        /**
         * 雾渲染参数
         */
        constructor();
        /**
         * 初始化
         */
        init(): void;
    }
}
declare module feng3d {
    /**
     * 灯光渲染参数
     * @author feng 2015-12-1
     */
    class LightShaderParams extends Component {
        /** 点光源数量 */
        numPointLights: number;
        private _numDirectionalLights;
        /** 是否使用灯光衰减 */
        useLightFallOff: boolean;
        /** 是否需要视线 */
        needsViewDir: number;
        /** 方向光源数量 */
        /**
         * @private
         */
        numDirectionalLights: number;
        /** 漫反射函数 */
        diffuseMethod: Function;
        /** 是否使用镜面反射函数 */
        usingSpecularMethod: number;
        /** 是否需要法线 */
        needsNormals: number;
        /** 是否有法线贴图 */
        hasNormalTexture: boolean;
        /** 是否有光泽贴图 */
        hasSpecularTexture: number;
        /** 是否为第一个渲染的镜面反射灯光 */
        isFirstSpecLight: boolean;
        /** 是否为第一个渲染的漫反射灯光 */
        isFirstDiffLight: boolean;
        /**
         * 灯光渲染参数
         */
        constructor();
        /**
         * 初始化
         */
        init(): void;
        /**
         * 运行渲染程序前
         */
        preRun(): void;
        /** 灯光数量 */
        numLights: number;
        /** 是否需要世界坐标 */
        needWorldPosition: boolean;
        /** 片段程序是否需要世界坐标 */
        usesGlobalPosFragment: boolean;
    }
}
declare module feng3d {
    /**
     * 粒子渲染参数
     * @author feng 2015-12-1
     */
    class ParticleShaderParams extends Component {
        /** 是否持续 */
        usesDuration: boolean;
        /** 是否延时 */
        usesDelay: boolean;
        /** 是否循环 */
        usesLooping: boolean;
        /** 时间静态 */
        ParticleTimeLocalStatic: boolean;
        ParticleVelocityGlobal: boolean;
        ParticleVelocityLocalStatic: boolean;
        ParticleBillboardGlobal: boolean;
        ParticleScaleGlobal: boolean;
        ParticleColorGlobal: boolean;
        /** 是否改变坐标计数 */
        changePosition: number;
        /** 是否改变颜色信息 */
        changeColor: number;
        /**
         * 粒子渲染参数
         */
        constructor();
        /**
         * 初始化
         */
        init(): void;
    }
}
declare module feng3d {
    /**
     * 渲染参数
     * <p>? 是否需要限定组件为ShaderParamsComponent</p>
     * @author feng 2014-11-4
     */
    class ShaderParams extends Component {
        /** 取样标记字典 */
        private sampleFlagsDic;
        /** 是否使用贴图分层细化 */
        useMipmapping: boolean;
        /** 是否使用平滑纹理 */
        useSmoothTextures: boolean;
        /** 是否重复纹理 */
        repeatTextures: boolean;
        /**
         * 是否为入射光
         */
        incidentLight: boolean;
        specularModelType: string;
        diffuseModulateMethod: Function;
        modulateMethod: Function;
        alphaPremultiplied: boolean;
        /**
         * 创建一个渲染参数
         */
        constructor();
        protected onAddedComponet(event: ComponentEvent): void;
        /**
         * 初始化渲染参数
         */
        initParams(): void;
        /**
         * 渲染前初始化
         */
        preRunParams(): void;
        /**
         * 初始化
         */
        init(): void;
        /**
         * 运行渲染程序前
         */
        preRun(): void;
        /**
         * 添加纹理取样参数
         * @param dataTypeId		纹理数据缓冲类型编号
         * @param texture			纹理代理
         * @param forceWrap			强制重复纹理参数
         */
        addSampleFlags(dataTypeId: string, texture: TextureProxyBase, forceWrap?: string): void;
        /**
         * 设置取样标记
         * @param dataTypeId		纹理数据缓冲类型编号
         * @param flags				纹理取样标记
         */
        setSampleFlags(dataTypeId: string, flags: any): void;
        /**
         * 获取取样标记
         * @param dataTypeId		纹理数据缓冲类型编号
         * @return					纹理取样标记
         */
        getFlags(dataTypeId: string): any;
    }
}
declare module feng3d {
    /**
     * 阴影渲染参数
     * @author feng 2015-12-1
     */
    class ShadowShaderParams extends Component {
        /**
         * 是否使用阴影映射函数
         */
        usingShadowMapMethod: number;
        /**
         * 是否使用点光源
         */
        usePoint: number;
        /**
         * 是否需要投影顶点坐标数据
         */
        needsProjection: number;
        /**
         * 使用近阴影渲染
         */
        useNearShadowMap: number;
        /**
         * 是否需要阴影寄存器
         */
        needsShadowRegister: number;
        /**
         * 阴影渲染参数
         */
        constructor();
        /**
         * 初始化
         */
        init(): void;
    }
}
declare module feng3d {
    /**
     * 地形渲染参数
     * @author feng 2015-12-1
     */
    class TerrainShaderParams extends Component {
        /** 土壤纹理个数 */
        splatNum: number;
        /**
         * 地形渲染参数
         */
        constructor();
        /**
         * 初始化
         */
        init(): void;
    }
}
declare module feng3d {
    /**
     * 灯光采集器
     * @author feng 2014-9-11
     */
    class LightPickerBase extends Component implements IAsset {
        protected _namedAsset: NamedAsset;
        protected _numPointLights: number;
        protected _numDirectionalLights: number;
        protected _allPickedLights: LightBase[];
        protected _pointLights: PointLight[];
        protected _directionalLights: DirectionalLight[];
        constructor();
        assetType: string;
        /**
         * 方向光数量
         */
        numDirectionalLights: number;
        /**
         * 点光源数量
         */
        numPointLights: number;
        /**
         * 点光源列表
         */
        pointLights: PointLight[];
        /**
         * 方向光列表
         */
        directionalLights: DirectionalLight[];
        /**
         * A collection of all the collected lights.
         */
        allPickedLights: LightBase[];
        namedAsset: NamedAsset;
    }
}
declare module feng3d {
    /**
     * 灯光采集器
     * @author feng 2014-9-11
     */
    class StaticLightPicker extends LightPickerBase {
        private _lights;
        constructor(lights: any);
        /**
         * 需要渲染的灯光
         */
        lights: any;
    }
}
declare module feng3d {
    /**
     * 渲染函数设置
     * @author feng 2014-7-1
     */
    class ShaderMethodSetup extends Component {
        context3DBufferOwner: Context3DBufferOwner;
        private uniqueMethodDic;
        methods: ShadingMethodBase[];
        /**
         * 创建一个渲染函数设置
         */
        constructor();
        /**
         * 初始化Context3d缓存
         */
        protected initBuffers(): void;
        /**
         * Fagal编号中心
         */
        _: FagalIdCenter;
        /**
         * The number of "effect" methods added to the material.
         */
        numMethods: number;
        /**
         * 漫反射函数
         */
        diffuseMethod: BasicDiffuseMethod;
        /**
         * 镜面反射函数
         */
        specularMethod: BasicSpecularMethod;
        /**
         * 法线函数
         */
        normalMethod: BasicNormalMethod;
        /**
         * 漫反射函数
         */
        ambientMethod: BasicAmbientMethod;
        /**
         * 阴影映射函数
         */
        shadowMethod: ShadowMapMethodBase;
        /**
         * 通知渲染程序失效
         */
        private invalidateShaderProgram();
        /**
         * 渲染程序失效事件处理函数
         */
        private onShaderInvalidated(event);
        /**
         * 添加渲染函数
         * @param method			渲染函数
         */
        addMethod(method: ShadingMethodBase): void;
        /**
         * 移除渲染函数
         * @param method			渲染函数
         */
        removeMethod(method: ShadingMethodBase): void;
        /**
         * 添加唯一渲染函数
         * @param method			渲染函数
         */
        private addUniqueMethod(method);
        /**
         * 移除唯一渲染函数
         * @param method			渲染函数
         */
        private removeUniqueMethod(method);
        /**
         * 添加函数
         * @param method			渲染函数
         */
        private $addMethod(method);
        /**
         * 删除函数
         * @param method			渲染函数
         */
        private $removeMethod(method);
        /**
         * 设置渲染状态
         * @param renderable		可渲染对象
         * @param stage3DProxy		3D舞台代理
         * @param camera			摄像机
         */
        setRenderState(renderable: IRenderable, camera: Camera3D): void;
        /**
         * 激活
         * @param shaderParams		渲染参数
         * @param stage3DProxy		3D舞台代理
         */
        activate(shaderParams: ShaderParams): void;
        /**
         * 初始化常量数据
         */
        initConstants(): void;
    }
}
declare module feng3d {
    /**
     * 渲染函数基类
     * @author feng 2014-7-1
     */
    class ShadingMethodBase extends Component {
        context3DBufferOwner: Context3DBufferOwner;
        protected _passes: MaterialPassBase[];
        /**
         * 渲染函数类型
         * <p>当typeUnique为true时，用于唯一性判断</p>
         * @see #typeUnique
         */
        methodType: string;
        /**
         * 是否唯一
         * <p>值为true时一个pass只能包含一个该类型函数，否则允许多个</p>
         * @see #methodType
         */
        typeUnique: boolean;
        /**
         * 创建渲染寄函数基类
         */
        constructor();
        /**
         * 初始化Context3d缓存
         */
        protected initBuffers(): void;
        /**
         * Fagal编号中心
         */
        _: any;
        /**
         * 激活渲染函数
         * @param shaderParams 		渲染参数
         */
        activate(shaderParams: ShaderParams): void;
        /**
         * 设置渲染状态
         * @param renderable 		渲染对象
         * @param camera 			摄像机
         */
        setRenderState(renderable: IRenderable, camera: Camera3D): void;
        /**
         * 初始化常量数据
         */
        initConstants(): void;
        /**
         * 清除编译数据
         */
        cleanCompilationData(): void;
        /**
         * 使渲染程序失效
         */
        protected invalidateShaderProgram(): void;
        /**
         * 拷贝渲染方法
         * @param method		被拷贝的方法
         */
        copyFrom(method: ShadingMethodBase): void;
        /**
         * Any passes required that render to a texture used by this method.
         */
        passes: MaterialPassBase[];
        /**
         * Cleans up any resources used by the current object.
         */
        dispose(): void;
    }
}
declare module feng3d {
    /**
     * 环境光函数
     *
     * 参考《3d数学基础：图形与游戏开发》337页，15.4.6 环境光分量
     * Camb = Gamb X Mamb
     * Camb：环境光分量。
     * Gamb：整个场景的环境光值。
     * Mamb：材质的环境光分量。它总是等于漫反射分量——由纹理图定义。
     *
     * @author feng 2014-7-1
     */
    class BasicAmbientMethod extends ShadingMethodBase {
        static METHOD_TYPE: string;
        protected _useTexture: boolean;
        private _texture;
        private _ambientColor;
        private _ambient;
        _lightAmbientR: number;
        _lightAmbientG: number;
        _lightAmbientB: number;
        /** 环境光分量数据 */
        private ambientColorData;
        /**
         * 创建一个基础环境光函数
         */
        constructor();
        /**
         * @inheritDoc
         */
        protected initBuffers(): void;
        private updateAmbientInputBuffer(ambientInputBuffer);
        private updateSpecularTextureBuffer(fsBuffer);
        /**
         * 更新环境光数据
         */
        private updateAmbient();
        /**
         * @inheritDoc
         */
        setRenderState(renderable: IRenderable, camera: Camera3D): void;
        /**
         * 环境光强
         */
        ambient: number;
        /**
         * 环境光颜色
         */
        ambientColor: number;
        /**
         * The bitmapData to use to define the diffuse reflection color per texel.
         */
        texture: Texture2DBase;
        activate(shaderParams: ShaderParams): void;
        copyFrom(method: ShadingMethodBase): void;
    }
}
declare module feng3d {
    /**
     * 基础法线函数
     * @author feng 2014-7-16
     */
    class BasicNormalMethod extends ShadingMethodBase {
        static METHOD_TYPE: string;
        private _texture;
        /**
         * 创建一个基础法线函数
         */
        constructor();
        /**
         * @inheritDoc
         */
        protected initBuffers(): void;
        private updateNormalTextureBuffer(normalTextureBuffer);
        /**
         * The texture containing the normals per pixel.
         */
        normalMap: Texture2DBase;
        /**
         * Indicates if the normal method output is not based on a texture (if not, it will usually always return true)
         * Override if subclasses are different.
         */
        hasOutput: boolean;
        /**
         * @inheritDoc
         */
        copyFrom(method: ShadingMethodBase): void;
        activate(shaderParams: ShaderParams): void;
    }
}
declare module feng3d {
    /**
     * 特效函数基类
     * @author feng 2015-8-27
     */
    class EffectMethodBase extends ShadingMethodBase implements IAsset {
        protected _namedAsset: NamedAsset;
        /**
         * 创建特效函数基类实例
         */
        constructor();
        namedAsset: NamedAsset;
    }
}
declare module feng3d {
    /**
     * 环境映射函数
     * @author feng 2015-8-27
     */
    class EnvMapMethod extends EffectMethodBase {
        private _envMapData;
        private _cubeTexture;
        private _alpha;
        private _mask;
        /**
         * 创建EnvMapMethod实例
         * @param envMap		环境映射贴图
         * @param alpha			反射率
         */
        constructor(envMap: CubeTextureBase, alpha?: number);
        /**
         * 用来调节反射率的纹理
         */
        mask: Texture2DBase;
        /**
         * 环境映射贴图
         */
        envMap: CubeTextureBase;
        /**
         * 反射率
         */
        alpha: number;
        /**
         * @inheritDoc
         */
        protected initBuffers(): void;
        private updateCubeTextureBuffer(fsBuffer);
        private updateMaskTextureBuffer(fsBuffer);
        private updateDataBuffer(fcVectorBuffer);
        /**
         * @inheritDoc
         */
        activate(shaderParams: ShaderParams): void;
    }
}
declare module feng3d {
    /**
     * 雾函数
     * @author feng 2015-8-27
     */
    class FogMethod extends EffectMethodBase {
        private _minDistance;
        private _maxDistance;
        private _fogColor;
        /**
         * 雾颜色常量数据
         */
        private fogColorData;
        /**
         * 雾通用常量数据
         */
        private fogCommonData;
        /**
         * 出现雾效果的最近距离
         */
        minDistance: number;
        /**
         * 最远距离
         */
        maxDistance: number;
        /**
         * 雾的颜色
         */
        fogColor: number;
        /**
         * 创建FogMethod实例
         * @param minDistance			出现雾效果的最近距离
         * @param maxDistance			最远距离
         * @param fogColor				雾的颜色
         */
        constructor(minDistance: number, maxDistance: number, fogColor?: number);
        /**
         * @inheritDoc
         */
        protected initBuffers(): void;
        /**
         * 更新雾颜色常量数据
         */
        private updateFogColorBuffer(fcVectorBuffer);
        /**
         * 更新雾通用常量数据
         */
        private updateFogCommonDataBuffer(fcVectorBuffer);
        /**
         * @inheritDoc
         */
        activate(shaderParams: ShaderParams): void;
    }
}
declare module feng3d {
    /**
     * 灯光函数
     * @author feng 2014-7-1
     */
    class LightingMethodBase extends ShadingMethodBase {
        _modulateMethod: Function;
    }
}
declare module feng3d {
    /**
     * 基础漫反射函数
     * @author feng 2014-7-1
     */
    class BasicDiffuseMethod extends LightingMethodBase {
        static METHOD_TYPE: string;
        /** 漫反射纹理 */
        protected _texture: Texture2DBase;
        private _diffuseColor;
        /** 漫反射颜色数据RGBA */
        private diffuseInputData;
        private alphaThresholdData;
        /** 是否使用环境光材质 */
        private _useAmbientTexture;
        protected _alphaThreshold: number;
        /**
         * 创建一个基础漫反射函数
         */
        constructor();
        /**
         * @inheritDoc
         */
        protected initBuffers(): void;
        /** 漫反射颜色 */
        diffuseColor: number;
        /**
         * 更新漫反射值
         */
        private updateDiffuse();
        /** 漫反射alpha */
        diffuseAlpha: number;
        /**
         * 更新纹理缓冲
         */
        private updateTextureBuffer(textureBuffer);
        /**
         * 更新漫反射输入片段常量缓冲
         */
        private updateDiffuseInputBuffer(diffuseInputBuffer);
        private updateAlphaThresholdBuffer(fcVectorBuffer);
        /**
         * 漫反射纹理
         */
        texture: Texture2DBase;
        /**
         * The minimum alpha value for which pixels should be drawn. This is used for transparency that is either
         * invisible or entirely opaque, often used with textures for foliage, etc.
         * Recommended values are 0 to disable alpha, or 0.5 to create smooth edges. Default value is 0 (disabled).
         */
        alphaThreshold: number;
        /**
         * @inheritDoc
         */
        activate(shaderParams: ShaderParams): void;
        /**
         * @inheritDoc
         */
        copyFrom(method: ShadingMethodBase): void;
    }
}
declare module feng3d {
    /**
     * CompositeDiffuseMethod provides a base class for diffuse methods that wrap a diffuse method to alter the
     * calculated diffuse reflection strength.
     */
    class CompositeDiffuseMethod extends BasicDiffuseMethod {
        protected _baseMethod: BasicDiffuseMethod;
        /**
         * Creates a new WrapDiffuseMethod object.
         * @param modulateMethod The method which will add the code to alter the base method's strength. It needs to have the signature clampDiffuse(t : ShaderRegisterElement, regCache : ShaderRegisterCache) : string, in which t.w will contain the diffuse strength.
         * @param baseDiffuseMethod The base diffuse method on which this method's shading is based.
         */
        constructor(modulateMethod?: Function, baseDiffuseMethod?: BasicDiffuseMethod);
        /**
         * The base diffuse method on which this method's shading is based.
         */
        baseMethod: BasicDiffuseMethod;
        /**
         * @inheritDoc
         */
        dispose(): void;
        /**
         * @inheritDoc
         */
        alphaThreshold: number;
        /**
         * @inheritDoc
         */
        /**
         * @inheritDoc
         */
        texture: Texture2DBase;
        /**
         * @inheritDoc
         */
        /**
         * @inheritDoc
         */
        diffuseAlpha: number;
        /**
         * @inheritDoc
         */
        /**
         * @inheritDoc
         */
        diffuseColor: number;
        /**
         * @inheritDoc
         */
        activate(shaderParams: ShaderParams): void;
        /**
         * @inheritDoc
         */
        cleanCompilationData(): void;
        /**
         * Called when the base method's shader code is invalidated.
         */
        private onShaderInvalidated(event);
    }
}
declare module feng3d {
    /**
     * SubsurfaceScatteringDiffuseMethod provides a depth map-based diffuse shading method that mimics the scattering of
     * light inside translucent surfaces. It allows light to shine through an object and to soften the diffuse shading.
     * It can be used for candle wax, ice, skin, ...
     */
    class SubsurfaceScatteringDiffuseMethod extends CompositeDiffuseMethod {
        private _depthPass;
        private _propReg;
        private _scattering;
        private _translucency;
        private _lightColorReg;
        private _scatterColor;
        private _decReg;
        private _scatterR;
        private _scatterG;
        private _scatterB;
        private _targetReg;
        private vertexToTexData;
        private f$ColorData;
        private fragmentData0;
        private fragmentData1;
        private _isFirstLight;
        private _depthMap;
        private lightProjection;
        /**
         * Creates a new SubsurfaceScatteringDiffuseMethod object.
         * @param depthMapSize The size of the depth map used.
         * @param depthMapOffset The amount by which the rendered object will be inflated, to prevent depth map rounding errors.
         */
        constructor(depthMapSize?: number, depthMapOffset?: number);
        private depthMap;
        /**
         * @inheritDoc
         */
        protected initBuffers(): void;
        private SSD$ToTexBuffer(vcVectorBuffer);
        private f$ColorDataBuffer(fcVectorBuffer);
        private fragmentData0Buffer(fcVectorBuffer);
        private fragmentData1Buffer(fcVectorBuffer);
        private updateDepthMapBuffer(textureBuffer);
        protected updateLightProjectionBuffer(vcMatrixBuffer: VCMatrixBuffer): void;
        cleanCompilationData(): void;
        /**
         * The amount by which the light scatters. It can be used to set the translucent surface's thickness. Use low
         * values for skin.
         */
        scattering: number;
        /**
         * The translucency of the object.
         */
        translucency: number;
        /**
         * The colour of the "insides" of the object, ie: the colour the light becomes after leaving the object.
         */
        scatterColor: number;
        /**
         * @inheritDoc
         */
        getVertexCode(): void;
        /**
         * @inheritDoc
         */
        getFragmentPreLightingCode(): void;
        /**
         * @inheritDoc
         */
        getFragmentCodePerLight(): void;
        /**
         * @inheritDoc
         */
        getFragmentPostLightingCode(): void;
        /**
         * @inheritDoc
         */
        activate(shaderParams: ShaderParams): void;
        /**
         * @inheritDoc
         */
        setRenderState(renderable: IRenderable, camera: Camera3D): void;
        /**
         * Generates the code for this method
         */
        private scatterLight();
    }
}
declare module feng3d {
    /**
     * 地形渲染函数
     * @author feng 2014-7-16
     */
    class TerrainDiffuseMethod extends BasicDiffuseMethod {
        private tileData;
        private _blendingTexture;
        private _splats;
        private _numSplattingLayers;
        constructor(splatTextures: any, blendingTexture: Texture2DBase, tileData: number[]);
        splats: any;
        blendingTexture: Texture2DBase;
        protected initBuffers(): void;
        private updateTerrainTextureBuffer(terrainTextureBufferArr);
        private updateTileDataBuffer(tileDataBuffer);
        private updateBlendingTextureBuffer(nBlendingTextureBuffer);
        activate(shaderParams: ShaderParams): void;
    }
}
declare module feng3d {
    /**
     * 镜面反射函数
     * @author feng 2014-5-19
     */
    class BasicSpecularMethod extends LightingMethodBase {
        static METHOD_TYPE: string;
        private _gloss;
        private _specular;
        private _specularColor;
        /** 镜面反射数据 */
        protected _specularData: number[];
        private _texture;
        /**
         * 创建镜面反射函数
         */
        constructor();
        /**
         * 镜面反射颜色
         */
        specularColor: number;
        /**
         * 镜面反射光泽图
         */
        texture: Texture2DBase;
        /**
         * The sharpness of the specular highlight.
         */
        gloss: number;
        /**
         * 镜面反射光反射强度
         */
        specular: number;
        /**
         * @inheritDoc
         */
        protected initBuffers(): void;
        private updateSpecularDataBuffer(_specularDataBuffer);
        private updateSpecularTextureBuffer(_specularTextureBuffer);
        /**
         * @inheritDoc
         */
        activate(shaderParams: ShaderParams): void;
        private updateSpecular();
    }
}
declare module feng3d {
    /**
     * CompositeSpecularMethod provides a base class for specular methods that wrap a specular method to alter the
     * calculated specular reflection strength.
     */
    class CompositeSpecularMethod extends BasicSpecularMethod {
        private _baseMethod;
        /**
         * Creates a new WrapSpecularMethod object.
         * @param modulateMethod The method which will add the code to alter the base method's strength. It needs to have the signature modSpecular(t : ShaderRegisterElement, regCache : ShaderRegisterCache) : string, in which t.w will contain the specular strength and t.xyz will contain the half-vector or the reflection vector.
         * @param baseSpecularMethod The base specular method on which this method's shading is based.
         */
        constructor(modulateMethod: Function, baseSpecularMethod?: BasicSpecularMethod);
        /**
         * The base specular method on which this method's shading is based.
         */
        baseMethod: BasicSpecularMethod;
        /**
         * @inheritDoc
         */
        gloss: number;
        /**
         * @inheritDoc
         */
        specular: number;
        /**
         * @inheritDoc
         */
        dispose(): void;
        /**
         * @inheritDoc
         */
        texture: Texture2DBase;
        /**
         * @inheritDoc
         */
        activate(shaderParams: ShaderParams): void;
        /**
         * @inheritDoc
         */
        cleanCompilationData(): void;
        /**
         * Called when the base method's shader code is invalidated.
         */
        private onShaderInvalidated(event);
    }
}
declare module feng3d {
    /**
     * PhongSpecularMethod provides a specular method that provides Phong highlights.
     */
    class PhongSpecularMethod extends BasicSpecularMethod {
        /**
         * Creates a new PhongSpecularMethod object.
         */
        constructor();
        activate(shaderParams: ShaderParams): void;
    }
}
declare module feng3d {
    /**
     * FresnelSpecularMethod provides a specular shading method that causes stronger highlights on grazing view angles.
     */
    class FresnelSpecularMethod extends PhongSpecularMethod {
        private _incidentLight;
        private _fresnelPower;
        private _normalReflectance;
        private data;
        /**
         * Creates a new FresnelSpecularMethod object.
         * @param basedOnSurface Defines whether the fresnel effect should be based on the view angle on the surface (if true), or on the angle between the light and the view.
         * @param baseSpecularMethod The specular method to which the fresnel equation. Defaults to BasicSpecularMethod.
         */
        constructor(basedOnSurface?: boolean);
        /**
         * Defines whether the fresnel effect should be based on the view angle on the surface (if true), or on the angle between the light and the view.
         */
        basedOnSurface: boolean;
        /**
         * The power used in the Fresnel equation. Higher values make the fresnel effect more pronounced. Defaults to 5.
         */
        fresnelPower: number;
        /**
         * The minimum amount of reflectance, ie the reflectance when the view direction is normal to the surface or light direction.
         */
        normalReflectance: number;
        protected initBuffers(): void;
        private updateSpecularDataBuffer1(fcVectorBuffer);
        /**
         * @inheritDoc
         */
        activate(shaderParams: ShaderParams): void;
    }
}
declare module feng3d {
    /**
     * 阴影映射函数基类
     * @author feng 2015-5-28
     */
    class ShadowMapMethodBase extends ShadingMethodBase implements IAsset {
        static METHOD_TYPE: string;
        protected _namedAsset: NamedAsset;
        protected _castingLight: LightBase;
        protected _shadowMapper: ShadowMapperBase;
        protected _epsilon: number;
        protected _alpha: number;
        /**
         * 创建阴影映射函数基类
         * @param castingLight		投射灯光
         */
        constructor(castingLight: LightBase);
        /**
         * 投射灯光
         */
        castingLight: LightBase;
        /**
         * The "transparency" of the shadows. This allows making shadows less strong.
         */
        alpha: number;
        /**
         * A small value to counter floating point precision errors when comparing values in the shadow map with the
         * calculated depth value. Increase this if shadow banding occurs, decrease it if the shadow seems to be too detached.
         */
        epsilon: number;
        /**
         * @inheritDoc
         */
        activate(shaderParams: ShaderParams): void;
        namedAsset: NamedAsset;
    }
}
declare module feng3d {
    /**
     * 简单阴影映射函数基类
     * @author feng 2015-5-28
     */
    class SimpleShadowMapMethodBase extends ShadowMapMethodBase {
        /**
         * 是否使用点光源
         */
        protected _usePoint: boolean;
        /**
         * 顶点常量数据0
         */
        protected shadowCommonsVCData0: number[];
        /**
         * 通用数据0
         */
        protected shadowCommonsData0: number[];
        /**
         * 通用数据1
         */
        protected shadowCommonsData1: number[];
        /**
         * 通用数据2
         */
        protected shadowCommonsData2: number[];
        /**
         * 深度投影矩阵
         */
        protected depthProjection: Matrix3D;
        /**
         * 创建简单阴影映射方法基类
         * @param castingLight			投射阴影的灯光
         */
        constructor(castingLight: LightBase);
        /**
         * @inheritDoc
         */
        protected initBuffers(): void;
        protected updateShadowCommonVCData0Buffer(vcVectorBuffer: VCVectorBuffer): void;
        protected updateShadowCommonData0Buffer(fcVectorBuffer: FCVectorBuffer): void;
        protected updateShadowCommonData1Buffer(fcVectorBuffer: FCVectorBuffer): void;
        protected updateShadowCommonData2Buffer(fcVectorBuffer: FCVectorBuffer): void;
        /**
         * 更新深度投影矩阵缓冲
         * @param sceneTransformMatrixBuffer		场景变换矩阵缓冲
         */
        protected updateDepthProjectionMatrixBuffer(sceneTransformMatrixBuffer: VCMatrixBuffer): void;
        /**
         * 更新深度图纹理缓冲
         */
        private updateTextureBuffer(textureBuffer);
        /**
         * @inheritDoc
         */
        activate(shaderParams: ShaderParams): void;
        /**
         * @inheritDoc
         */
        setRenderState(renderable: IRenderable, camera: Camera3D): void;
    }
}
declare module feng3d {
    /**
     * 过滤的阴影映射函数
     * @author feng 2015-5-28
     */
    class FilteredShadowMapMethod extends SimpleShadowMapMethodBase {
        /**
         * 过滤的阴影映射函数
         * @param castingLight		投射灯光
         */
        constructor(castingLight: DirectionalLight);
    }
}
declare module feng3d {
    /**
     * 近阴影映射函数
     * @author feng 2015-5-28
     */
    class NearShadowMapMethod extends SimpleShadowMapMethodBase {
        private secondaryFragmentConstants;
        private _baseMethod;
        /**
         * 阴影消退比例值
         */
        private _fadeRatio;
        private _nearShadowMapper;
        /**
         * 创建近阴影映射函数
         * @param baseMethod		基础映射函数
         * @param fadeRatio			消退比率
         */
        constructor(baseMethod: SimpleShadowMapMethodBase, fadeRatio?: number);
        /**
         * The base shadow map method on which this method's shading is based.
         */
        baseMethod: SimpleShadowMapMethodBase;
        /**
         * @inheritDoc
         */
        protected initBuffers(): void;
        /**
         * @inheritDoc
         */
        initConstants(): void;
        private updateSecondaryCommonData0Buffer(fcVectorBuffer);
        /**
         * @inheritDoc
         */
        setRenderState(renderable: IRenderable, camera: Camera3D): void;
        /**
         * @inheritDoc
         */
        activate(shaderParams: ShaderParams): void;
        /**
         * 处理渲染程序失效事件
         */
        private onShaderInvalidated(event);
    }
}
declare module feng3d {
    /**
     * 材质基类
     * @author feng 2014-4-15
     */
    class MaterialBase extends Component implements IAsset {
        protected _namedAsset: NamedAsset;
        /**
         * 唯一编号
         */
        _uniqueId: number;
        /**
         * 渲染序列编号
         */
        _renderOrderId: number;
        private _bothSides;
        private _owners;
        private _alphaPremultiplied;
        private _blendMode;
        protected _numPasses: number;
        protected _mipmap: boolean;
        protected _smooth: boolean;
        protected _repeat: boolean;
        protected _passes: MaterialPassBase[];
        protected _depthPass: DepthMapPass;
        protected _planarShadowPass: PlanarShadowPass;
        protected _lightPicker: LightPickerBase;
        /**
         * 创建一个材质基类
         */
        constructor();
        /**
         * 深度渲染通道
         */
        depthPass: DepthMapPass;
        /**
         * 平面阴影映射通道
         */
        planarShadowPass: PlanarShadowPass;
        /**
         * 是否双面渲染
         */
        bothSides: boolean;
        /**
         * 是否需要混合
         */
        requiresBlending: boolean;
        /**
         * @inheritDoc
         */
        getRequiresBlending(): boolean;
        /**
         * 混合模式
         */
        setBlendMode(value: string): void;
        /**
         * 混合模式
         */
        blendMode: string;
        /**
         * Indicates whether visible textures (or other pixels) used by this material have
         * already been premultiplied. Toggle this if you are seeing black halos around your
         * blended alpha edges.
         */
        alphaPremultiplied: boolean;
        /**
         * 是否使用纹理分级细化
         */
        mipmap: boolean;
        /**
         * 是否重复
         */
        repeat: boolean;
        /**
         * 是否平滑
         */
        smooth: boolean;
        /**
         * 添加通道
         * @param pass 通道
         */
        protected addPass(pass: MaterialPassBase): void;
        /**
         * 获取渲染通道
         * @param index		渲染通道索引
         * @return			返回指定索引处渲染通道
         */
        getPass(index: number): MaterialPassBase;
        /**
         * 处理通道变化事件
         */
        private onPassChange(event);
        /**
         * 移除通道
         * @param pass 通道
         */
        protected removePass(pass: MaterialPassBase): void;
        /**
         * 动画集合
         */
        animationSet: IAnimationSet;
        /**
         * 灯光采集器
         */
        lightPicker: LightPickerBase;
        setLightPicker(value: LightPickerBase): void;
        /**
         * 通道失效
         */
        invalidatePasses(triggerPass: MaterialPassBase): void;
        /**
         * 渲染通道数量
         */
        numPasses: number;
        /**
         * 更新材质
         */
        updateMaterial(): void;
        /**
         * 清除通道渲染状态
         * @param index				通道索引
         * @param stage3DProxy		3D舞台代理
         */
        deactivatePass(index: number): void;
        /**
         * 停用材质的最后一个通道
         */
        deactivate(): void;
        /**
         * 添加材质拥有者
         * @param owner		材质拥有者
         */
        addOwner(owner: IMaterialOwner): void;
        /**
         * 移除材质拥有者
         * @param owner		材质拥有者
         */
        removeOwner(owner: IMaterialOwner): void;
        /**
         * Cleans up resources owned by the material, including passes. Textures are not owned by the material since they
         * could be used by other materials and will not be disposed.
         */
        dispose(): void;
        namedAsset: NamedAsset;
    }
}
declare module feng3d {
    /**
     *
     * @author feng 2014-5-19
     */
    class MultiPassMaterialBase extends MaterialBase {
        constructor();
        texture: Texture2DBase;
    }
}
declare module feng3d {
    /**
     *
     * @author feng 2014-5-19
     */
    class ColorMultiPassMaterial extends MultiPassMaterialBase {
        private _ambientColor;
        private _specularColor;
        private _specular;
        constructor(color?: number);
        ambientColor: number;
        specularColor: number;
        specular: number;
    }
}
declare module feng3d {
    /**
     *
     * @author feng 2014-5-19
     */
    class TextureMultiPassMaterial extends MultiPassMaterialBase {
        private _ambientColor;
        private _specularMethod;
        private _normalMethod;
        constructor(texture?: Texture2DBase, smooth?: boolean, repeat?: boolean, mipmap?: boolean);
        ambientColor: number;
        specularMethod: BasicSpecularMethod;
        /**
         * The normal map to modulate the direction of the surface for each texel. The default normal method expects
         * tangent-space normal maps, but others could expect object-space maps.
         */
        normalMap: Texture2DBase;
        /**
         * 高光贴图
         *
         * A specular map that defines the strength of specular reflections for each texel in the red channel,
         * and the gloss factor in the green channel. You can use SpecularBitmapTexture if you want to easily set
         * specular and gloss maps from grayscale images, but correctly authored images are preferred.
         */
        specularMap: Texture2DBase;
        /**
         * The overall strength of the specular reflection.
         */
        specular: number;
    }
}
declare module feng3d {
    /**
     * 线段材质
     * @author feng 2014-4-16
     */
    class SegmentMaterial extends MaterialBase {
        private _screenPass;
        constructor(thickness?: number);
    }
}
declare module feng3d {
    /**
     * 单通道纹理
     * @author feng 2014-6-5
     */
    class SinglePassMaterialBase extends MaterialBase {
        protected _screenPass: SuperShaderPass;
        private _alphaBlending;
        /**
         * 创建一个单通道纹理
         */
        constructor();
        /**
         * The number of "effect" methods added to the material.
         */
        numMethods: number;
        /**
         * @inheritDoc
         */
        blendMode: string;
        /**
         * @inheritDoc
         */
        requiresBlending: boolean;
        /**
          * @inheritDoc
          */
        getRequiresBlending(): boolean;
        /**
         * The minimum alpha value for which pixels should be drawn. This is used for transparency that is either
         * invisible or entirely opaque, often used with textures for foliage, etc.
         * Recommended values are 0 to disable alpha, or 0.5 to create smooth edges. Default value is 0 (disabled).
         */
        alphaThreshold: number;
        /**
         * 环境光反射颜色
         */
        ambientColor: number;
        /**
         * 镜面反射光反射颜色
         */
        specularColor: number;
        /**
         * 镜面反射光反射强度
         */
        specular: number;
        /**
         * 环境光反射强度
         */
        ambient: number;
        /**
         * 是否透明度混合
         */
        alphaBlending: boolean;
        /**
         * 漫反射函数
         */
        diffuseMethod: BasicDiffuseMethod;
        /**
         * The method used to generate the per-pixel normals. Defaults to BasicNormalMethod.
         */
        normalMethod: BasicNormalMethod;
        /**
         * 环境光函数
         */
        ambientMethod: BasicAmbientMethod;
        /**
         * 镜面反射函数
         */
        specularMethod: BasicSpecularMethod;
        /**
         * 法线贴图
         */
        normalMap: Texture2DBase;
        /**
         * 镜面反射光泽图
         */
        specularMap: Texture2DBase;
        /**
         * 高光值
         */
        gloss: number;
        /**
         * 阴影映射函数
         */
        shadowMethod: ShadowMapMethodBase;
        /**
         * @inheritDoc
         */
        lightPicker: LightPickerBase;
        /**
         * 添加特效函数
         * @param method		特效函数
         */
        addMethod(method: EffectMethodBase): void;
    }
}
declare module feng3d {
    /**
     * 颜色材质
     * @author feng 2014-4-15
     */
    class ColorMaterial extends SinglePassMaterialBase {
        private _diffuseAlpha;
        constructor(color?: number, alpha?: number);
        /**
         * 透明度
         */
        alpha: number;
        /**
         * 颜色
         */
        color: number;
        requiresBlending: boolean;
    }
}
declare module feng3d {
    /**
     * 纹理材质
     * @author feng 2014-4-15
     */
    class TextureMaterial extends SinglePassMaterialBase {
        private _alpha;
        _specularMethod: BasicSpecularMethod;
        /**
         * 创建纹理材质
         * @param texture		纹理
         * @param smooth		是否平滑
         * @param repeat		是否重复
         * @param mipmap		是否使用mipmap
         */
        constructor(texture?: Texture2DBase, smooth?: boolean, repeat?: boolean, mipmap?: boolean);
        /**
         * 纹理
         */
        texture: Texture2DBase;
        /**
         * 透明度
         */
        alpha: number;
        /**
         * The texture object to use for the ambient colour.
         */
        ambientTexture: Texture2DBase;
    }
}
declare module feng3d {
    /**
     * SpriteSheet材质
     * @author feng 2014-4-15
     */
    class SpriteSheetMaterial extends TextureMaterial {
        private _diffuses;
        private _normals;
        private _speculars;
        private _TBDiffuse;
        private _TBNormal;
        private _TBSpecular;
        private _currentMapID;
        /**
         * 创建SpriteSheetMaterial实例
         *
         * @param diffuses			漫反射纹理列表
         * @param normals			法线纹理列表
         * @param speculars			高光纹理列表
         * @param smooth			是否平滑
         * @param repeat			是否重复
         * @param mipmap			是否使用mipmap
         */
        constructor(diffuses: Texture2DBase[], normals?: Texture2DBase[], speculars?: Texture2DBase[], smooth?: boolean, repeat?: boolean, mipmap?: boolean);
        private initTextures();
        /**
         * 切换
         * @param mapID			映射编号
         * @return				是否切换成功
         */
        swap(mapID?: number): boolean;
    }
}
declare module feng3d {
    /**
     * 天空盒材质
     * @author feng 2014-7-11
     */
    class SkyBoxMaterial extends MaterialBase {
        private _cubeMap;
        private _skyboxPass;
        /**
         * 创建天空盒材质实例
         * @param cubeMap			立方体映射纹理
         */
        constructor(cubeMap: CubeTextureBase);
        /**
         * 立方体映射纹理
         */
        cubeMap: CubeTextureBase;
    }
}
declare module feng3d {
    /**
     * 纹理通道基类
     * <p>该类实现了生成与管理渲染程序功能</p>
     * @author feng 2014-4-15
     */
    class MaterialPassBase extends Component {
        context3DBufferOwner: Context3DBufferOwner;
        protected _material: MaterialBase;
        protected _animationSet: IAnimationSet;
        protected _methodSetup: ShaderMethodSetup;
        protected _blendFactorSource: string;
        protected _blendFactorDest: string;
        protected _depthCompareMode: string;
        protected _enableBlending: boolean;
        private _bothSides;
        protected _lightPicker: LightPickerBase;
        protected _defaultCulling: string;
        protected _writeDepth: boolean;
        protected _smooth: boolean;
        protected _repeat: boolean;
        protected _mipmap: boolean;
        protected _numDirectionalLights: number;
        protected _numPointLights: number;
        protected _alphaPremultiplied: boolean;
        private _shaderParams;
        /**
         * 创建一个纹理通道基类
         */
        constructor();
        /**
         * Fagal编号中心
         */
        _: any;
        /**
         * The material to which this pass belongs.
         */
        material: MaterialBase;
        /**
         * 渲染参数
         */
        shaderParams: ShaderParams;
        /**
         * 是否平滑
         */
        smooth: boolean;
        /**
         * 是否重复平铺
         */
        repeat: boolean;
        /**
         * 贴图是否使用分级细化
         */
        mipmap: boolean;
        /**
         * 是否开启混合模式
         */
        enableBlending: boolean;
        /**
         * 初始化Context3d缓存
         */
        protected initBuffers(): void;
        /**
         * 动画数据集合
         */
        animationSet: IAnimationSet;
        /**
         * 激活渲染通道
         * @param shaderParams		渲染参数
         * @param stage3DProxy		3D舞台代理
         * @param camera			摄像机
         */
        activate(camera: Camera3D, target?: TextureProxyBase): void;
        /**
         * 清除通道渲染数据
         * @param stage3DProxy		3D舞台代理
         */
        deactivate(): void;
        /**
         * 更新动画状态
         * @param renderable			渲染对象
         * @param stage3DProxy			3D舞台代理
         * @param camera				摄像机
         */
        updateAnimationState(renderable: IRenderable, camera: Camera3D): void;
        /**
         * 渲染
         * @param renderable			渲染对象
         * @param stage3DProxy			3D舞台代理
         * @param camera				摄像机
         * @param renderIndex			渲染编号
         */
        render(renderable: IRenderable, stage3DProxy: Stage3DProxy, camera: Camera3D, renderIndex: number): void;
        /**
         * 更新常量数据
         * @param renderable			渲染对象
         * @param camera				摄像机
         */
        protected updateConstantData(renderable: IRenderable, camera: Camera3D): void;
        /**
         * 标记渲染程序失效
         */
        invalidateShaderProgram(): void;
        /**
         * 更新深度测试缓冲
         * @param depthTestBuffer			深度测试缓冲
         */
        protected updateDepthTestBuffer(depthTestBuffer: DepthTestBuffer): void;
        /**
         * 更新混合因子缓冲
         * @param blendFactorsBuffer		混合因子缓冲
         */
        protected updateBlendFactorsBuffer(blendFactorsBuffer: BlendFactorsBuffer): void;
        /**
         * 更新剔除模式缓冲
         * @param cullingBuffer		剔除模式缓冲
         */
        protected updateCullingBuffer(cullingBuffer: CullingBuffer): void;
        /**
         * 更新（编译）渲染程序
         */
        updateProgramBuffer(programBuffer: ProgramBuffer): void;
        /**
         * 灯光采集器
         */
        lightPicker: LightPickerBase;
        /**
         * 灯光发生变化
         */
        private onLightsChange(event);
        /**
         * 更新灯光渲染
         */
        protected updateLights(): void;
        /**
         * 设置混合模式
         * @param value		混合模式
         */
        setBlendMode(value: string): void;
        /**
         * 是否写入到深度缓存
         */
        writeDepth: boolean;
        /**
         * 深度比较模式
         */
        depthCompareMode: string;
        /**
         * 是否双面渲染
         */
        bothSides: boolean;
        /**
         * 渲染中是否使用了灯光
         */
        protected usesLights(): boolean;
        /**
         * Indicates whether visible textures (or other pixels) used by this material have
         * already been premultiplied. Toggle this if you are seeing black halos around your
         * blended alpha edges.
         */
        alphaPremultiplied: boolean;
        /**
         * Cleans up any resources used by the current object.
         * @param deep Indicates whether other resources should be cleaned up, that could potentially be shared across different instances.
         */
        dispose(): void;
    }
}
declare module feng3d {
    /**
     * 编译通道
     * <p>用于处理复杂的渲染通道</p>
     * @author feng 2014-6-5
     */
    class CompiledPass extends MaterialPassBase {
        _passes: MaterialPassBase[];
        /**
         * 物体投影变换矩阵（模型空间坐标-->GPU空间坐标）
         */
        protected modelViewProjection: Matrix3D;
        /**
         * 法线场景变换矩阵（模型空间坐标-->世界空间坐标）
         */
        protected normalSceneMatrix: Matrix3D;
        /**
         * 场景变换矩阵（模型空间坐标-->世界空间坐标）
         */
        protected sceneTransformMatrix: Matrix3D;
        /**
         * 世界投影矩阵（世界空间坐标-->投影空间坐标）
         */
        protected worldProjectionMatrix: Matrix3D;
        protected _ambientLightR: number;
        protected _ambientLightG: number;
        protected _ambientLightB: number;
        /**
         * 通用数据
         */
        protected commonsData: number[];
        /**
         * 摄像机世界坐标
         */
        protected cameraPosition: number[];
        /**
         * 是否开启灯光衰减
         */
        protected _enableLightFallOff: boolean;
        /**
         * 创建一个编译通道类
         */
        constructor();
        /**
         * 初始化
         */
        private init();
        /**
         * @inheritDoc
         */
        protected initBuffers(): void;
        /**
         * @inheritDoc
         */
        activate(camera: Camera3D, target?: TextureProxyBase): void;
        /**
         * @inheritDoc
         */
        protected updateConstantData(renderable: IRenderable, camera: Camera3D): void;
        /**
         * 更新摄像机坐标缓冲
         * @param cameraPositionBuffer		摄像机坐标缓冲
         */
        protected updateCameraPositionBuffer(cameraPositionBuffer: VCVectorBuffer): void;
        /**
         * 更新通用缓冲
         * @param commonsDataBuffer		通用缓冲
         */
        protected updateCommonsDataBuffer(commonsDataBuffer: FCVectorBuffer): void;
        /**
         * 更新投影矩阵缓冲
         * @param projectionBuffer		投影矩阵缓冲
         */
        protected updateProjectionBuffer(projectionBuffer: VCMatrixBuffer): void;
        /**
         * 更新摄像机投影矩阵缓冲
         * @param cameraProjectionMatrixBuffer		摄像机投影矩阵缓冲
         */
        protected updateWordProjectionMatrixBuffer(worldProjectionMatrixBuffer: VCMatrixBuffer): void;
        /**
         * 更新场景变换矩阵缓冲
         * @param sceneTransformMatrixBuffer		场景变换矩阵缓冲
         */
        protected updateSceneTransformMatrixBuffer(sceneTransformMatrixBuffer: VCMatrixBuffer): void;
        /**
         * 更新法线场景变换矩阵缓冲
         * @param normalSceneMatrixBuffer			法线场景变换矩阵缓冲
         */
        protected updateSceneNormalMatrixBuffer(normalSceneMatrixBuffer: VCMatrixBuffer): void;
        /**
         * @inheritDoc
         */
        updateProgramBuffer(programBuffer: ProgramBuffer): void;
        /**
         * 重置编译通道
         */
        private reset();
        /**
         * 初始化常量数据
         */
        private initConstantData();
        /**
         * 更新函数常量数据
         */
        protected updateMethodConstants(): void;
        /**
         * 漫反射方法，默认为BasicDiffuseMethod
         */
        diffuseMethod: BasicDiffuseMethod;
        /**
         * 镜面反射方法，默认为BasicSpecularMethod
         */
        specularMethod: BasicSpecularMethod;
        /**
         * 环境光方法，默认为BasicAmbientMethod
         */
        ambientMethod: BasicAmbientMethod;
        /**
         * 法线函数，默认为BasicNormalMethod
         */
        normalMethod: BasicNormalMethod;
        /**
         * 是否开启灯光衰减，可以提高灯光渲染性能与真实性
         */
        enableLightFallOff: boolean;
        /**
         * 处理渲染失效事件
         */
        private onShaderInvalidated(event);
        /**
         * Adds any possible passes needed by the used methods.
         */
        protected addPassesFromMethods(): void;
        /**
         * Adds internal passes to the material.
         *
         * @param passes The passes to add.
         */
        protected addPasses(passes: MaterialPassBase[]): void;
        /**
         * 更新灯光常数数据
         */
        protected updateLightConstants(): void;
        /**
         * 阴影映射函数
         */
        shadowMethod: ShadowMapMethodBase;
    }
}
declare module feng3d {
    /**
     * 超级渲染通道
     * <p>提供灯光渲染相关信息</p>
     * @author feng 2014-7-1
     */
    class SuperShaderPass extends CompiledPass {
        /** 方向光源场景方向数据 */
        private dirLightSceneDirData;
        /** 方向光源漫反射光颜色数据 */
        private dirLightDiffuseData;
        /** 方向光源镜面反射颜色数据 */
        private dirLightSpecularData;
        /** 点光源场景位置数据 */
        private pointLightScenePositionData;
        /** 点光源漫反射光颜色数据 */
        private pointLightDiffuseData;
        /** 点光源镜面反射颜色数据 */
        private pointLightSpecularData;
        /**
         * 创建超级渲染通道
         */
        constructor();
        /**
         * The number of "effect" methods added to the material.
         */
        numMethods: number;
        /**
         * @inheritDoc
         */
        protected initBuffers(): void;
        private updateDirLightSpecularBuffer(dirLightSpecularBuffer);
        private updateDirLightDiffuseReg(dirLightDiffuseBuffer);
        private updateDirLightSceneDirBuffer(dirLightSceneDirBuffer);
        private updatePointLightSpecularBuffer(pointLightSpecularBuffer);
        private updatePointLightDiffuseReg(pointLightDiffuseBuffer);
        private updatePointLightScenePositionBuffer(pointLightScenePositionBuffer);
        /**
         * 添加特效函数
         * @param method		特效函数
         */
        addMethod(method: EffectMethodBase): void;
        /**
         * @inheritDoc
         */
        activate(camera: Camera3D, target?: TextureProxyBase): void;
        /**
         * @inheritDoc
         */
        protected updateLightConstants(): void;
    }
}
declare module feng3d {
    /**
     * 深度映射通道
     * @author feng 2015-5-29
     */
    class DepthMapPass extends MaterialPassBase {
        /**
         * 物体投影变换矩阵（模型空间坐标-->GPU空间坐标）
         */
        private modelViewProjection;
        /**
         * 通用数据
         */
        private depthCommonsData0;
        /**
         * 通用数据
         */
        private depthCommonsData1;
        private _depthMap;
        /**
         * 创建深度映射通道
         */
        constructor();
        /**
         * 深度图纹理
         */
        depthMap: TextureProxyBase;
        /**
         * @inheritDoc
         */
        protected initBuffers(): void;
        /**
         * 更新投影矩阵缓冲
         * @param projectionBuffer		投影矩阵缓冲
         */
        protected updateProjectionBuffer(projectionBuffer: VCMatrixBuffer): void;
        /**
         * 更新深度顶点常数0 (1.0, 255.0, 65025.0, 16581375.0)
         * @param fcVectorBuffer
         */
        protected updateDepthCommonData0Buffer(fcVectorBuffer: FCVectorBuffer): void;
        /**
         * 更新深度顶点常数1 (1.0/255.0, 1.0/255.0, 1.0/255.0, 0.0)
         * @param fcVectorBuffer
         */
        protected updateDepthCommonData1Buffer(fcVectorBuffer: FCVectorBuffer): void;
        /**
         * 更新深度图纹理
         * @param textureBuffer
         */
        private updateTextureBuffer(textureBuffer);
        /**
         * @inheritDoc
         */
        activate(camera: Camera3D, target?: TextureProxyBase): void;
        /**
         * @inheritDoc
         */
        render(renderable: IRenderable, stage3DProxy: Stage3DProxy, camera: Camera3D, renderIndex: number): void;
        /**
         * @inheritDoc
         */
        updateProgramBuffer(programBuffer: ProgramBuffer): void;
    }
}
declare module feng3d {
    /**
     * 平面阴影映射通道
     * @author feng 2015-5-29
     */
    class PlanarShadowPass extends MaterialPassBase {
        /**
         * 物体投影变换矩阵（模型空间坐标-->GPU空间坐标）
         */
        private modelViewProjection;
        /**
         * 阴影颜色
         */
        private shadowColorCommonsData;
        static groundY: number;
        /**
         * 创建深度映射通道
         */
        constructor();
        /**
         * @inheritDoc
         */
        protected initBuffers(): void;
        /**
         * 更新投影矩阵缓冲
         * @param projectionBuffer		投影矩阵缓冲
         */
        protected updateProjectionBuffer(projectionBuffer: VCMatrixBuffer): void;
        /**
         * 更新阴影颜色常数
         * @param fcVectorBuffer
         */
        protected updateShadowColorCommonsDataBuffer(fcVectorBuffer: FCVectorBuffer): void;
        /**
         * @inheritDoc
         */
        render(renderable: IRenderable, stage3DProxy: Stage3DProxy, camera: Camera3D, renderIndex: number): void;
        /**
         * 参考《实时阴影技术》P22
         * @return 平面投影矩阵
         */
        private getShadowMatrix3D();
        /**
         * @inheritDoc
         */
        updateProgramBuffer(programBuffer: ProgramBuffer): void;
    }
}
declare module feng3d {
    /**
     * 线段渲染通道
     * @author feng 2014-4-16
     */
    class SegmentPass extends MaterialPassBase {
        /**
         * (1,1,1,1)向量
         */
        protected static ONE_VECTOR: number[];
        /**
         * 正面向量（Z轴负方向）
         */
        protected static FRONT_VECTOR: number[];
        /**
         * 常量数据
         */
        private constants;
        /**
         * 摄像机坐标系到投影坐标系变换矩阵（c：camera，p：projection）
         */
        private c2pMatrix;
        /**
         * 模型坐标系到摄像机坐标系变换矩阵（m：model，c：camera）
         */
        private m2cMatrix;
        private _thickness;
        constructor(thickness: number);
        /**
         * @inheritDoc
         */
        protected initBuffers(): void;
        private updateConstantsBuffer(constantsBuffer);
        private updateFrontBuffer(frontBuffer);
        private updateOneBuffer(oneBuffer);
        private updateC2pMatrixBuffer(c2pMatrixBuffer);
        private updateM2cMatrixBuffer(m2cMatrixBuffer);
        /**
         * @inheritDoc
         */
        updateProgramBuffer(programBuffer: ProgramBuffer): void;
        /**
         * @inheritDoc
         */
        protected updateConstantData(renderable: IRenderable, camera: Camera3D): void;
    }
}
declare module feng3d {
    /**
     * The SingleObjectDepthPass provides a material pass that renders a single object to a depth map from the point
     * of view from a light.
     */
    class SingleObjectDepthPass extends MaterialPassBase {
        private _textures;
        private _projections;
        private _textureSize;
        private _projectionTexturesInvalid;
        private _polyOffset;
        /**
         * 通用数据
         */
        private depthCommonsData0;
        /**
         * 通用数据
         */
        private depthCommonsData1;
        private objectProjectionMatrix;
        /**
         * Creates a new SingleObjectDepthPass object.
         * @param textureSize The size of the depth map texture to render to.
         * @param polyOffset The amount by which the rendered object will be inflated, to prevent depth map rounding errors.
         *
         * todo: provide custom vertex code to assembler
         */
        constructor(textureSize?: number, polyOffset?: number);
        protected initBuffers(): void;
        private updatePolyOffsetBuffer(vcVectorBuffer);
        protected updateObjectProjectionBuffer(vcMatrixBuffer: VCMatrixBuffer): void;
        private updateDepthCommonsData0Buffer(fcVectorBuffer);
        private updateDepthCommonsData1Buffer(fcVectorBuffer);
        /**
         * @inheritDoc
         */
        dispose(): void;
        /**
         * Updates the projection textures used to contain the depth renders.
         */
        private updateProjectionTextures();
        /**
         * @inheritDoc
         */
        getVertexCode(): void;
        /**
         * @inheritDoc
         */
        getFragmentCode(animationCode: string): void;
        /**
         * Gets the depth maps rendered for this object from all lights.
         * @param renderable The renderable for which to retrieve the depth maps.
         * @param stage3DProxy The Stage3DProxy object currently used for rendering.
         * @return A list of depth map textures for all supported lights.
         */
        getDepthMap(renderable: IRenderable): TextureProxyBase;
        /**
         * Retrieves the depth map projection maps for all lights.
         * @param renderable The renderable for which to retrieve the projection maps.
         * @return A list of projection maps for all supported lights.
         */
        getProjection(renderable: IRenderable): Matrix3D;
        /**
         * @inheritDoc
         */
        activate(camera: Camera3D, target?: TextureProxyBase): void;
    }
}
declare module feng3d {
    /**
     * 天空盒通道
     * @author feng 2014-7-11
     */
    class SkyBoxPass extends MaterialPassBase {
        private cameraPos;
        private scaleSkybox;
        private modelViewProjection;
        private _cubeTexture;
        /**
         * 创建一个天空盒通道
         */
        constructor();
        /**
         * @inheritDoc
         */
        protected initBuffers(): void;
        private updateProjectionBuffer(projectionBuffer);
        private updateCameraPosBuffer(cameraPosBuffer);
        private updateScaleSkyboxBuffer(scaleSkyboxBuffer);
        private updateTextureBuffer(textureBuffer);
        /**
         * @inheritDoc
         */
        protected updateDepthTestBuffer(depthTestBuffer: DepthTestBuffer): void;
        /**
         * 立方体纹理
         */
        cubeTexture: CubeTextureBase;
        /**
         * @inheritDoc
         */
        updateProgramBuffer(programBuffer: ProgramBuffer): void;
        /**
         * @inheritDoc
         */
        protected updateConstantData(renderable: IRenderable, camera: Camera3D): void;
        /**
         * @inheritDoc
         */
        activate(camera: Camera3D, target?: TextureProxyBase): void;
    }
}
declare module feng3d {
    /**
     * 纹理代理基类
     * <p>处理纹理与stage3d的关系</p>
     * @author feng 2014-4-15
     */
    class TextureProxyBase extends Component {
        /** 纹理类型 */
        type: string;
        /**
         * 纹理格式
         */
        protected _format: string;
        /**
         * 是否有miplevel
         */
        protected _hasMipmaps: boolean;
        /**
         * 纹理宽度
         */
        protected _width: number;
        /**
         * 纹理高度
         */
        protected _height: number;
        /**
         * 创建一个纹理代理基类
         */
        constructor();
        /**
         * 是否有miplevel
         */
        hasMipMaps: boolean;
        /**
         * 纹理格式
         * @see flash.display3D.Context3DTextureFormat
         */
        format: string;
        /**
         * 纹理宽度
         */
        width: number;
        /**
         * 纹理高度
         */
        height: number;
        /**
         * 设置纹理尺寸
         * @param width		纹理宽度
         * @param height	纹理高度
         */
        protected setSize(width: number, height: number): void;
        /**
         * 尺寸失效
         */
        protected invalidateSize(): void;
        /**
         * 纹理失效
         */
        invalidateContent(): void;
    }
}
declare module feng3d {
    /**
     * 立方体纹理代理基类
     * @author feng 2014-7-12
     */
    class CubeTextureBase extends TextureProxyBase {
        /**
         * 创建一个立方体纹理代理基类
         */
        constructor();
        /**
         * 获取纹理尺寸
         */
        size: number;
    }
}
declare module feng3d {
    /**
     * 位图立方体纹理代理
     * @author feng 2014-7-12
     */
    class BitmapCubeTexture extends CubeTextureBase {
        private _bitmapDatas;
        optimizeForRenderToTexture: boolean;
        streamingLevels: number;
        /**
         * 创建位图立方体纹理代理
         * @param posX			X正方向位图
         * @param negX			X负方向位图
         * @param posY			Y正方向位图
         * @param negY			Y负方向位图
         * @param posZ			Z正方向位图
         * @param negZ			Z负方向位图
         */
        constructor(posX: BitmapData, negX: BitmapData, posY: BitmapData, negY: BitmapData, posZ: BitmapData, negZ: BitmapData);
        /**
         * 位图列表
         */
        bitmapDatas: BitmapData[];
        /**
         * 正X方向位图（右面位图）
         */
        positiveX: BitmapData;
        /**
         * 负X方向位图（左面位图）
         */
        negativeX: BitmapData;
        /**
         * 正Y方向位图（上面位图）
         */
        positiveY: BitmapData;
        /**
         * 负Y方向位图（下面位图）
         */
        negativeY: BitmapData;
        /**
         * 正Z方向位图（前面位图）
         */
        positiveZ: BitmapData;
        /**
         * 负Z方向位图（后面位图）
         */
        negativeZ: BitmapData;
        /**
         * 检查位图尺寸
         * @param value		位图
         */
        private testSize(value);
    }
}
declare module feng3d {
    /**
     * 纹理基类
     * @author feng 2014-4-15
     */
    class Texture2DBase extends TextureProxyBase {
        constructor();
    }
}
declare module feng3d {
    /**
     * 位图纹理
     * @author feng 2014-3-24
     */
    class BitmapTexture extends Texture2DBase {
        private _bitmapData;
        private _mipMapHolder;
        private _generateMipmaps;
        constructor(bitmapData: BitmapData, generateMipmaps?: boolean);
        bitmapData: BitmapData;
        generateMipmaps: boolean;
        mipMapHolder: BitmapData;
    }
}
declare module feng3d {
    /**
     * 渲染纹理
     * @author feng 2015-5-28
     */
    class RenderTexture extends Texture2DBase {
        /**
         * 创建一个渲染纹理
         * @param width			纹理宽度
         * @param height		纹理高度
         */
        constructor(width: number, height: number);
    }
}
declare module feng3d {
    /**
     * 全局事件适配器
     * @author feng
     */
    class GlobalDispatcher extends EventDispatcher {
        private static _instance;
        /**
         * 创建一个全局事件适配器
         * <p>此类为单例，只能构造一次，使用时请使用GlobalDispatcher.instance获取实例</p>
         */
        constructor();
        /**
         * 适配器实例
         */
        static instance: GlobalDispatcher;
    }
}
declare module feng3d {
    /**
     * 加载事件数据
     * @author feng 2015-5-27
     */
    class LoadModuleEventData extends EventDispatcher {
        private _urls;
        /**
         * 自定义数据，可用于保存数据在加载资源后处理
         */
        data: any;
        private _taskModuleEventData;
        /**
         * 加载事件数据
         * @param urls		加载路径列表
         * @param data		自定义数据，可用于保存数据在加载资源后处理
         */
        constructor(urls?: any[], data?: any);
        /**
         * 加载路径列表
         */
        /**
         * @private
         */
        urls: any[];
        /**
         * 加载任务列表
         * <p>该函数提供给加载模块内部使用，使用者并不需要知道</p>
         */
        private loadTaskItems;
        /**
         * 加载任务数据
         */
        taskModuleEventData: TaskModuleEventDispatchTaskData;
        /**
         * 处理完成加载单项事件
         */
        protected onCompletedItem(event: TaskEvent): void;
        /**
         * 处理完成所有加载项事件
         */
        private onCompleted(event);
    }
}
declare module feng3d {
    /**
     * 任务模块事件数据
     * @author feng 2015-10-29
     */
    class TaskModuleEventDispatchTaskData extends EventDispatcher {
        /**
         * 任务集合类型
         */
        taskCollectionType: string;
        /**
         * 任务列表
         */
        taskList: TaskItem[];
        /**
         * 任务执行参数
         */
        params: any;
        constructor(taskList?: TaskItem[], taskCollectionType?: string, params?: any);
    }
}
declare module feng3d {
    /**
     * 任务
     * @author feng 2015-5-27
     */
    class TaskItem extends EventDispatcher {
        /** 任务状态 */
        protected _state: number;
        /**
         * 任务状态
         */
        state: number;
        /**
         * 创建一个任务单元数据
         */
        constructor();
        /**
         * 执行任务
         * @param params	执行参数
         */
        execute(params?: any): void;
        /**
         * 执行完成事件
         */
        protected doComplete(): void;
        /**
         * 销毁
         */
        destroy(): void;
    }
}
declare module feng3d {
    /**
     * 加载单元数据
     * @author feng 2015-5-27
     */
    class LoadTaskItem extends TaskItem {
        private _url;
        private _type;
        private _loadingItem;
        /**
         * 创建一个加载单元数据
         * @param url		加载路径信息
         */
        constructor(url: any);
        /**
         * 单项资源加载器
         */
        loadingItem: LoadingItem;
        /**
         * 资源类型
         */
        type: string;
        /**
         * 资源路径
         */
        url: string;
        /**
         * @inheritDoc
         */
        execute(param?: any): void;
        /**
         * 完成任务事件
         */
        private onLoadComplete(event?);
    }
}
declare module feng3d {
    /**
     * 任务集合，任务列表与任务队列等的基类
     * @author feng 2015-6-16
     */
    abstract class TaskCollection extends TaskItem {
        /**
         * 所有子任务
         */
        protected allItemList: TaskItem[];
        /**
         * 排队中的任务
         * <p>等待执行中的任务</p>
         */
        protected waitingItemList: TaskItem[];
        /**
         * 进行中的任务
         */
        protected executingItemList: TaskItem[];
        /**
         * 已完成任务列表
         */
        protected completedItemList: TaskItem[];
        data: TaskModuleEventDispatchTaskData;
        /**
         * 是否已经结束任务
         */
        isComplete: boolean;
        /**
         * 创建一个任务集合
         * <p>该类为抽象类，无法直接被实例化，请使用其子类</p>
         */
        constructor();
        /**
         * @inheritDoc
         */
        execute(params?: any): void;
        /**
         * 执行子任务
         * @param taskItem	子任务
         * @param params	执行参数
         */
        protected executeItem(taskItem: TaskItem, params: any): void;
        /**
         * 添加子任务
         */
        addItem(item: TaskItem): void;
        /**
         * 添加任务列表
         * @param taskList		任务列表
         */
        addItems(taskList: TaskItem[]): void;
        /**
         * 移除子任务
         */
        removeItem(item: TaskItem): void;
        /**
         * 移除所有子任务
         */
        removeAllItem(): void;
        /**
         * 处理子任务完成事件
         */
        protected onCompletedItem(event: TaskEvent): void;
        /**
         * 检查是否完成任务
         */
        protected checkComplete(): void;
        /**
         * @inheritDoc
         */
        destroy(): void;
    }
}
declare module feng3d {
    /**
     * 任务列表
     * <p>所有子任务将会在同一时间开始执行</p>
     * @includeExample TaskListTest.as
     * @includeExample KeyDownTask.as
     *
     * @author feng 2014-7-24
     */
    class TaskList extends TaskCollection {
        /**
         * 创建一个任务队列
         */
        constructor();
        /**
         * 执行任务
         * @param params	执行参数
         */
        execute(params?: any): void;
    }
}
declare module feng3d {
    /**
     * 任务队列（按先后顺序依次完成子任务，只有完成当前任务才会开始下个任务）
     * @includeExample TaskQueueTest.as
     * @includeExample KeyDownTask.as
     * @author feng 2015-6-17
     */
    class TaskQueue extends TaskCollection {
        /**
         * 执行参数
         */
        private executeParams;
        /**
         * 创建任务队列
         */
        constructor();
        /**
         * @inheritDoc
         */
        execute(params?: any): void;
        /**
         * 执行下个任务
         */
        protected executeNextTask(): void;
        /**
         * @inheritDoc
         */
        protected onCompletedItem(event: TaskEvent): void;
    }
}
declare module feng3d {
    /**
     * 尝试获取可连接地址
     * @author feng 2015-12-15
     */
    class TryConnectURL extends TaskQueue {
        connectedUrls: any[];
        tryConnect(urls: any[]): void;
        /**
         * @inheritDoc
         */
        protected onCompletedItem(event: TaskEvent): void;
    }
}
declare module feng3d {
    /**
     * 尝试获取可连接地址
     * @author feng 2015-12-15
     */
    class TryConnectURLTaskItem extends TaskItem {
        private loader;
        result: boolean;
        url: string;
        constructor(url: string);
        /**
         * @inheritDoc
         */
        execute(param?: any): void;
        private tryConnect();
        private addListeners();
        private removeListeners();
        private connectFailure(...args);
        private connectSucceed(...args);
        private connentEnd();
        private ioErrorHandler(event);
    }
}
declare module feng3d {
    /**
     * 摄像机镜头
     * @author feng 2014-10-14
     */
    abstract class LensBase extends EventDispatcher {
        protected _matrix: Matrix3D;
        protected _scissorRect: Rectangle;
        protected _viewPort: Rectangle;
        protected _near: number;
        protected _far: number;
        protected _aspectRatio: number;
        protected _matrixInvalid: boolean;
        protected _frustumCorners: number[];
        private _unprojection;
        private _unprojectionInvalid;
        /**
         * 创建一个摄像机镜头
         */
        constructor();
        /**
         * Retrieves the corner points of the lens frustum.
         */
        frustumCorners: number[];
        /**
         * 投影矩阵
         */
        matrix: Matrix3D;
        /**
         * 最近距离
         */
        near: number;
        /**
         * 最远距离
         */
        far: number;
        /**
         * 视窗缩放比例(width/height)，在渲染器中设置
         */
        aspectRatio: number;
        /**
         * 场景坐标投影到屏幕坐标
         * @param point3d 场景坐标
         * @param v 屏幕坐标（输出）
         * @return 屏幕坐标
         */
        project(point3d: Vector3D, v?: Vector3D): Vector3D;
        /**
         * 投影逆矩阵
         */
        unprojectionMatrix: Matrix3D;
        /**
         * 屏幕坐标投影到摄像机空间坐标
         * @param nX 屏幕坐标X -1（左） -> 1（右）
         * @param nY 屏幕坐标Y -1（上） -> 1（下）
         * @param sZ 到屏幕的距离
         * @param v 场景坐标（输出）
         * @return 场景坐标
         */
        abstract unproject(nX: number, nY: number, sZ: number, v: Vector3D): Vector3D;
        /**
         * 投影矩阵失效
         */
        protected invalidateMatrix(): void;
        /**
         * 更新投影矩阵
         */
        protected abstract updateMatrix(): any;
    }
}
declare module feng3d {
    /**
     *
     * @author feng 2015-5-28
     */
    class FreeMatrixLens extends LensBase {
        constructor();
        protected updateMatrix(): void;
        /**
 * 屏幕坐标投影到摄像机空间坐标
 * @param nX 屏幕坐标X -1（左） -> 1（右）
 * @param nY 屏幕坐标Y -1（上） -> 1（下）
 * @param sZ 到屏幕的距离
 * @param v 场景坐标（输出）
 * @return 场景坐标
 */
        unproject(nX: number, nY: number, sZ: number, v: Vector3D): Vector3D;
    }
}
declare module feng3d {
    /**
     * 透视摄像机镜头
     * @author feng 2014-10-14
     */
    class PerspectiveLens extends LensBase {
        private _fieldOfView;
        private _focalLength;
        private _focalLengthInv;
        private _yMax;
        private _xMax;
        private _coordinateSystem;
        /**
         * 创建一个透视摄像机镜头
         * @param fieldOfView 视野
         * @param coordinateSystem 坐标系统类型
         */
        constructor(fieldOfView?: number, coordinateSystem?: number);
        /**
         * 视野
         */
        fieldOfView: number;
        /**
         * 焦距
         */
        focalLength: number;
        unproject(nX: number, nY: number, sZ: number, v?: Vector3D): Vector3D;
        /**
         * 坐标系类型
         */
        coordinateSystem: number;
        protected updateMatrix(): void;
    }
}
declare module feng3d {
    /**
     * Fagal函数追加代码事件
     */
    /**
     * Fagal数学运算
     * @author feng 2015-7-22
     */
    class FagalMath extends EventDispatcher {
        /**
         * destination=abs(source1):一个寄存器的绝对值，分量形式
         */
        abs(destination: IField, source1: IField): void;
        /**
         * destination=source1+source2:两个寄存器相加，分量形式
         */
        add(destination: IField, source1: IField, source2: IField): void;
        /**
         * destination=cos(source1):一个寄存器的余弦值，分量形式
         */
        cos(destination: IField, source1: IField): void;
        /**
         * crs:两个寄存器间的叉积
         * <p>destination.x=source1.y*source2.z-source1.z*source2.y</p>
         * <p>destination.y=source1.z*source2.x-source1.x*source2.z</p>
         * <p>destination.z=source1.x*source2.y-source1.y*source2.x</p>
         */
        crs(destination: IField, source1: IField, source2: IField): void;
        /**
         * destination=source1/source2:两个寄存器相除，分量形式
         */
        div(destination: IField, source1: IField, source2: IField): void;
        /**
         * dp3:两个寄存器间的点积，3分量
         * <br/>
         * destination=source1.x*source2.x+source1.y*source2.y+source1.z*source2.z
         */
        dp3(destination: IField, source1: IField, source2: IField): void;
        /**
         * dp4:两个寄存器间的点积，4分量
         * <br/>
         * destination=source1.x*source2.x+source1.y*source2.y+source1.z*source2.z+source1.w+source2.w
         */
        dp4(destination: IField, source1: IField, source2: IField): void;
        /**
         * destination=2^source1:2的source1次方，分量形式
         */
        exp(destination: IField, source1: IField): void;
        /**
         * destination=source1-(float)floor(source1)一个寄存器的分数部分，分量形式
         */
        frc(destination: IField, source1: IField): void;
        /**
         * 如果寄存器有任意一个分量小于0，则丢弃该像素不进行绘制(只适用于片段着色器)
         */
        kil(source1: IField): void;
        /**
         * destination=log(source1)一个寄存器以2为底的对数，分量形式
         */
        log(destination: IField, source1: IField): void;
        /**
         * m33:由一个3*3的矩阵对一个3分量的向量进行矩阵乘法
         * <br/>
         * destination.x=(source1.x*source2[0].x)+(source1.y*source2[0].y)+(source1.z*source2[0].z)
         * <br/>
         * destination.y=(source1.x*source2[1].x)+(source1.y*source2[1].y)+(source1.z*source2[1].z)
         * <br/>
         * destination.z=(source1.x*source2[2].x)+(source1.y*source2[2].y)+(source1.z*source2[2].z)

         */
        m33(destination: IField, source1: IField, source2: IField): void;
        /**
         * m34:由一个3*4的矩阵对一个4分量的向量进行矩阵乘法
         * <br/>
         * destination.x=(source1.x*source2[0].x)+(source1.y*source2[0].y)+(source1.z*source2[0].z)+(source1.w*source2[0].w)
         * <br/>
         * destination.y=(source1.x*source2[1].x)+(source1.y*source2[1].y)+(source1.z*source2[1].z)+(source1.w*source2[1].w)
         * <br/>destination.z=(source1.x*source2[2].x)+(source1.y*source2[2].y)+(source1.z*source2[2].z)+(source1.w*source2[2].w)

         */
        m34(destination: IField, source1: IField, source2: IField): void;
        /**
         * m44:由一个4*4的矩阵对一个4分量的向量进行矩阵乘法
         * <br/>
         * destination.x=(source1.x*source2[0].x)+(source1.y*source2[0].y)+(source1.z*source2[0].z)+(source1.w*source2[0].w)
         * <br/>
         * destination.y=(source1.x*source2[1].x)+(source1.y*source2[1].y)+(source1.z*source2[1].z)+(source1.w*source2[1].w)
         * <br/>
         * destination.z=(source1.x*source2[2].x)+(source1.y*source2[2].y)+(source1.z*source2[2].z)+(source1.w*source2[2].w)
         * <br/>
         * destination.w=(source1.x*source2[3].x)+(source1.y*source2[3].y)+(source1.z*source2[3].z)+(source1.w*source2[3].w)
         */
        m44(destination: Register, source1: Register, source2: RegisterMatrix): void;
        /**
         * max:destination=max(source1 ，source2): 两个寄存器之间的较大值，分量形式
         */
        max(destination: IField, source1: IField, source2: IField): void;
        /**
         * min:destination=min(source1 ， source2) : 两个寄存器之间的较小值，分量形式
         */
        min(destination: IField, source1: IField, source2: IField): void;
        /**
         * mov:destination=source :将数据从源寄存器复制到目标寄存器
         */
        mov(destination: IField, source1: IField): void;
        /**
         * destination = source1 * source2:两个寄存器相乘，分量形式
         */
        mul(destination: IField, source1: IField, source2: IField): void;
        /**
         * destination=-source1:一个寄存器取反，分量形式
         */
        neg(destination: IField, source1: IField): void;
        /**
         * destination=normalize(source1):将一个寄存器标准化为长度1的单位向量
         */
        nrm(destination: IField, source1: IField): void;
        /**
         * destination=pow(source1 ，source2):source1的source2次冥，分量形式
         */
        pow(destination: IField, source1: IField, source2: IField): void;
        /**
         * destination=1/source1:一个寄存器的倒数，分量形式
         */
        rcp(destination: IField, source1: IField): void;
        /**
         * destination=1/sqrt(source) 一个寄存器的平方根倒数，分量形式
         */
        rsq(destination: IField, source1: IField): void;
        /**
         * destination=max(min(source1,1),0):将一个寄存器锁0-1的范围里
         */
        sat(destination: IField, source1: IField): void;
        /**
         * destination= source1==source2 ? 1 : 0
         */
        seq(destination: IField, source1: IField, source2: IField): void;
        /**
         * destination = source1>=source2 ? 1 : 0 类似三元操作符 分量形式
         */
        sge(destination: IField, source1: IField, source2: IField): void;
        /**
         * destination=sin(source1):一个寄存器的正弦值，分量形式
         */
        sin(destination: IField, source1: IField): void;
        /**
         * destination = source1小于source2 ? 1 : 0
         */
        slt(destination: IField, source1: IField, source2: IField): void;
        /**
         * destination=source1!=source2 ? 1:0
         */
        sne(destination: IField, source1: IField, source2: IField): void;
        /**
         * destination=sqrt(source):一个寄存器的平方根，分量形式
         */
        sqt(destination: IField, source1: IField): void;
        /**
         * destination=source1-source2:两个寄存器相减，分量形式
         */
        sub(destination: IField, source1: IField, source2: IField): void;
        /**
         * 纹理取样
         * @param	colorReg	目标寄存器
         * @param	uvReg		UV坐标
         * @param	textureReg	纹理寄存器
         * @param	flags		取样参数
         */
        tex(colorReg: Register, uvReg: Register, textureReg: Register): void;
        /**
         * 混合数据
         * <p>destination = source1 + (source2-source1) x factor</p>
         * @author feng 2015-7-4
         */
        blend(destination: IField, source1: IField, source2: IField, factor: IField): void;
        /**
         * 添加注释
         */
        comment(...remarks: any[]): void;
        /**
         * 添加代码
         */
        append(code: string): void;
    }
}
declare module feng3d {
    /**
     * 解析基类
     * @author feng 2014-5-16
     */
    abstract class ParserBase extends EventDispatcher {
        protected static PARSING_DONE: boolean;
        protected static MORE_TO_PARSE: boolean;
        _fileName: string;
        protected _dataFormat: string;
        protected _data: any;
        protected _frameLimit: number;
        protected _lastFrameTime: number;
        /** 依赖资源列表 */
        private _dependencies;
        private _parsingPaused;
        private _parsingComplete;
        /** 是否解析失败 */
        private _parsingFailure;
        private _timer;
        /**  */
        private _materialMode;
        constructor(format: string);
        protected getTextData(): string;
        protected getByteData(): ByteArray;
        materialMode: number;
        /** 数据格式 */
        dataFormat: string;
        /**
         * 完成资源分析（派发资源事件）
         * @param asset 完成的资源
         * @param name 资源名称
         */
        protected finalizeAsset(asset: IAsset, name?: string): void;
        /**
         * 解决依赖
         * @param resourceDependency 依赖资源
         */
        abstract resolveDependency(resourceDependency: ResourceDependency): any;
        /**
         * 解决依赖失败
         * @param resourceDependency 依赖资源
         */
        abstract resolveDependencyFailure(resourceDependency: ResourceDependency): any;
        resolveDependencyName(resourceDependency: ResourceDependency, asset: IAsset): string;
        /**
         * 是否在解析中
         */
        protected abstract proceedParsing(): boolean;
        /**
         * 是否暂停解析
         */
        parsingPaused: boolean;
        /**
         * 是否解析完成
         */
        parsingComplete: boolean;
        /**
         * 异步解析数据
         * @param data 数据
         * @param frameLimit 帧时间限制
         */
        parseAsync(data: any, frameLimit?: number): void;
        /**
         * A list of dependencies that need to be loaded and resolved for the object being parsed.
         */
        dependencies: ResourceDependency[];
        /**
         * 是否还有时间
         */
        protected hasTime(): boolean;
        /**
         * 开始解析数据
         * @param frameLimit 帧时间限制
         */
        protected startParsing(frameLimit: number): void;
        /**
         * 触发解析
         * @param event
         */
        protected onInterval(event?: TimerEvent): void;
        /**
         * 暂停解析，去准备依赖项
         */
        protected pauseAndRetrieveDependencies(): void;
        /**
         * 继续解析，准备好依赖项后
         */
        resumeParsingAfterDependencies(): void;
        /**
         * 完成解析
         */
        protected finishParsing(): void;
        /**
         * 添加依赖项
         * @param id 编号
         * @param req url请求
         * @param retrieveAsRawData
         * @param data
         * @param suppressErrorEvents
         */
        protected addDependency(id: string, req: URLRequest, retrieveAsRawData?: boolean, data?: any, suppressErrorEvents?: boolean): void;
    }
}
declare module feng3d {
    /**
     * ImageParser provides a "parser" for natively supported image types (jpg, png). While it simply loads bytes into
     * a loader object, it wraps it in a BitmapDataResource so resource management can happen consistently without
     * exception cases.
     */
    class ImageParser extends ParserBase {
        private _byteData;
        private _startedParsing;
        private _doneParsing;
        private _loader;
        /**
         * Creates a new ImageParser object.
         * @param uri The url or id of the data or file to be parsed.
         * @param extra The holder for extra contextual data that the parser might need.
         */
        constructor();
        /**
         * 解决依赖
         * @param resourceDependency 依赖资源
         */
        resolveDependency(resourceDependency: ResourceDependency): void;
        /**
         * 解决依赖失败
         * @param resourceDependency 依赖资源
         */
        resolveDependencyFailure(resourceDependency: ResourceDependency): void;
        /**
         * Indicates whether or not a given file extension is supported by the parser.
         * @param extension The file extension of a potential file to be parsed.
         * @return Whether or not the given file type is supported.
         */
        static supportsType(extension: string): boolean;
        /**
         * Tests whether a data block can be parsed by the parser.
         * @param data The data block to potentially be parsed.
         * @return Whether or not the given data is supported.
         */
        static supportsData(data: any): boolean;
        /**
         * @inheritDoc
         */
        protected proceedParsing(): boolean;
    }
}
declare module feng3d {
    /**
     * 该类提供md5anim类型数据的解析，提供一个MD5类型的动画序列
     */
    class MD5AnimParser extends ParserBase {
        /** 文本数据 */
        private _textData;
        /** 是否正在解析中 */
        private _startedParsing;
        private static VERSION_TOKEN;
        private static COMMAND_LINE_TOKEN;
        private static NUM_FRAMES_TOKEN;
        private static NUM_JOINTS_TOKEN;
        private static FRAME_RATE_TOKEN;
        private static NUM_ANIMATED_COMPONENTS_TOKEN;
        private static HIERARCHY_TOKEN;
        private static BOUNDS_TOKEN;
        private static BASE_FRAME_TOKEN;
        private static FRAME_TOKEN;
        private static COMMENT_TOKEN;
        /** 当前解析位置 */
        private _parseIndex;
        /** 是否文件尾 */
        private _reachedEOF;
        /** 当前解析行号 */
        private _line;
        /** 当前行的字符位置 */
        private _charLineIndex;
        /** 版本号 */
        private _version;
        /** 帧率 */
        private _frameRate;
        /** 总帧数 */
        private _numFrames;
        /** 关节个数 */
        private _numJoints;
        private _numAnimatedComponents;
        /** 层级关系 */
        private _hierarchy;
        /** 包围盒数据 */
        private _bounds;
        /** 帧数据 */
        private _frameData;
        /** 基础帧数据 */
        private _baseFrameData;
        /** 旋转四元素 */
        private _rotationQuat;
        private _clip;
        /**
         * 创建一个MD5动画解析类
         * @param additionalRotationAxis 附加旋转轴
         * @param additionalRotationRadians 附加旋转角度
         */
        constructor(additionalRotationAxis?: Vector3D, additionalRotationRadians?: number);
        /**
         * 判断是否支持解析
         * @param extension 文件类型
         * @return
         */
        static supportsType(extension: string): boolean;
        /**
         * 判断是否支持该数据的解析
         * @param data 需要解析的数据
         * @return
         */
        static supportsData(data: any): boolean;
        protected proceedParsing(): boolean;
        /**
         * 收集所有的关键帧数据
         */
        private translateClip();
        /**
         * 将一个关键帧数据转换为SkeletonPose
         * @param frameData 帧数据
         * @return 包含帧数据的SkeletonPose对象
         */
        private translatePose(frameData);
        /**
         * 解析骨骼的层级数据
         */
        private parseHierarchy();
        /**
         * 解析帧边界
         */
        private parseBounds();
        /**
         * 解析基础帧
         */
        private parseBaseFrame();
        /**
         * 解析帧
         */
        private parseFrame();
        /**
         * 返回到上个字符位置
         */
        private putBack();
        /**
         * 获取下个关键字
         */
        private getNextToken();
        /**
         * 跳过空白
         */
        private skipWhiteSpace();
        /**
         * 忽略该行
         */
        private ignoreLine();
        /**
         * 读取下个字符
         */
        private getNextChar();
        /**
         * 读取下个number
         */
        private getNextInt();
        /**
         * 读取下个number
         */
        private getNextNumber();
        /**
         * 解析3d向量
         */
        private parseVector3D();
        /**
         * 解析四元素
         */
        private parseQuaternion();
        /**
         * 解析命令行数据
         */
        private parseCMD();
        /**
         * 解析带双引号的字符串
         */
        private parseLiteralString();
        /**
         * 抛出一个文件尾过早结束文件时遇到错误
         */
        private sendEOFError();
        /**
         * 遇到了一个意想不到的令牌时将抛出一个错误。
         * @param expected 发生错误的标记
         */
        private sendParseError(expected);
        /**
         * 发生未知关键字错误
         */
        private sendUnknownKeywordError();
        /**
         * 解决依赖
         * @param resourceDependency 依赖资源
         */
        resolveDependency(resourceDependency: ResourceDependency): void;
        /**
         * 解决依赖失败
         * @param resourceDependency 依赖资源
         */
        resolveDependencyFailure(resourceDependency: ResourceDependency): void;
    }
}
declare module feng3d {
    /**
     * MD5Mesh文件解析类
     */
    class MD5MeshParser extends ParserBase {
        private _textData;
        private _startedParsing;
        private static VERSION_TOKEN;
        private static COMMAND_LINE_TOKEN;
        private static NUM_JOINTS_TOKEN;
        private static NUM_MESHES_TOKEN;
        private static COMMENT_TOKEN;
        private static JOINTS_TOKEN;
        private static MESH_TOKEN;
        private static MESH_SHADER_TOKEN;
        private static MESH_NUM_VERTS_TOKEN;
        private static MESH_VERT_TOKEN;
        private static MESH_NUM_TRIS_TOKEN;
        private static MESH_TRI_TOKEN;
        private static MESH_NUM_WEIGHTS_TOKEN;
        private static MESH_WEIGHT_TOKEN;
        /** 当前解析位置 */
        private _parseIndex;
        /** 是否文件尾 */
        private _reachedEOF;
        /** 当前解析行号 */
        private _line;
        /** 当前行的字符位置 */
        private _charLineIndex;
        /** 版本号 */
        private _version;
        /** 关节数量 */
        private _numJoints;
        /** 网格数量 */
        private _numMeshes;
        /** 渲染材质信息 */
        private _shaders;
        /** 顶点最大关节关联数 */
        private _maxJointCount;
        /** 网格原始数据 */
        private _meshData;
        /** bindpose姿态下的变换矩阵 */
        private _bindPoses;
        /** 骨骼数据 */
        private _skeleton;
        private _animationSet;
        /** 旋转四元素 */
        private _rotationQuat;
        /**
         * 创建一个MD5Mesh解析对象
         */
        constructor(additionalRotationAxis?: Vector3D, additionalRotationRadians?: number);
        /**
         * 判断是否支持解析
         * @param extension 文件类型
         * @return
         */
        static supportsType(extension: string): boolean;
        /**
         * 判断是否支持该数据的解析
         * @param data 需要解析的数据
         * @return
         */
        static supportsData(data: any): boolean;
        protected proceedParsing(): boolean;
        /**
         * 计算最大关节数量
         */
        private calculateMaxJointCount();
        /**
         * 计算0权重关节数量
         * @param vertex 顶点数据
         * @param weights 关节权重数组
         * @return
         */
        private countZeroWeightJoints(vertex, weights);
        /**
         * 解析关节
         */
        private parseJoints();
        /**
         * 返回到上个字符位置
         */
        private putBack();
        /**
         * 解析网格几何体
         */
        private parseMesh();
        /**
         * 转换网格数据为SkinnedSubGeometry实例
         * @param vertexData 网格顶点数据
         * @param weights 每个顶点的关节权重数据
         * @param indices 顶点索引数据
         * @return 包含所有几何体数据的SkinnedSubGeometry实例
         */
        private translateGeom(vertexData, weights, indices);
        /**
         * 解析三角形数据
         * @param indices 索引数据
         */
        private parseTri(indices);
        /**
         * 解析关节数据
         * @param weights 权重数据列表
         */
        private parseJoint(weights);
        /**
         * 解析一个顶点
         * @param vertexData 顶点数据列表
         */
        private parseVertex(vertexData);
        /**
         * 解析uv坐标
         * @param vertexData 包含uv坐标的顶点数据
         */
        private parseUV(vertexData);
        /**
         * 获取下个关键字
         */
        private getNextToken();
        /**
         * 跳过空白
         */
        private skipWhiteSpace();
        /**
         * 忽略该行
         */
        private ignoreLine();
        /**
         * 读取下个字符
         */
        private getNextChar();
        /**
         * 读取下个number
         */
        private getNextInt();
        /**
         * 读取下个number
         */
        private getNextNumber();
        /**
         * 解析3d向量
         */
        private parseVector3D();
        /**
         * 解析四元素
         */
        private parseQuaternion();
        /**
         * 解析命令行数据
         */
        private parseCMD();
        /**
         * 解析带双引号的字符串
         */
        private parseLiteralString();
        /**
         * 抛出一个文件尾过早结束文件时遇到错误
         */
        private sendEOFError();
        /**
         * 遇到了一个意想不到的令牌时将抛出一个错误。
         * @param expected 发生错误的标记
         */
        private sendParseError(expected);
        /**
         * 发生未知关键字错误
         */
        private sendUnknownKeywordError();
        /**
 * 解决依赖
 * @param resourceDependency 依赖资源
 */
        resolveDependency(resourceDependency: ResourceDependency): void;
        /**
         * 解决依赖失败
         * @param resourceDependency 依赖资源
         */
        resolveDependencyFailure(resourceDependency: ResourceDependency): void;
    }
}
declare module feng3d {
    /**
     * Max3DSParser provides a parser for the 3ds data type.
     */
    class Max3DSParser extends ParserBase {
        private _byteData;
        private _textures;
        private _materials;
        private _unfinalized_objects;
        private _cur_obj_end;
        private _cur_obj;
        private _cur_mat_end;
        private _cur_mat;
        private _useSmoothingGroups;
        /**
         * Creates a new <code>Max3DSParser</code> object.
         *
         * @param useSmoothingGroups Determines whether the parser looks for smoothing groups in the 3ds file or assumes uniform smoothing. Defaults to true.
         */
        constructor(useSmoothingGroups?: boolean);
        /**
         * Indicates whether or not a given file extension is supported by the parser.
         * @param extension The file extension of a potential file to be parsed.
         * @return Whether or not the given file type is supported.
         */
        static supportsType(extension: string): boolean;
        /**
         * Tests whether a data block can be parsed by the parser.
         * @param data The data block to potentially be parsed.
         * @return Whether or not the given data is supported.
         */
        static supportsData(data: any): boolean;
        /**
         * @inheritDoc
         */
        resolveDependency(resourceDependency: ResourceDependency): void;
        /**
         * @inheritDoc
         */
        resolveDependencyFailure(resourceDependency: ResourceDependency): void;
        /**
         * @inheritDoc
         */
        protected startParsing(frameLimit: number): void;
        /**
         * @inheritDoc
         */
        protected proceedParsing(): boolean;
        private parseMaterial();
        private parseTexture(end);
        private parseVertexList();
        private parseFaceList();
        private parseSmoothingGroups();
        private parseUVList();
        private parseFaceMaterialList();
        private parseObjectAnimation(end);
        private constructObject(obj, pivot?);
        private prepareData(vertices, faces, obj);
        private applySmoothGroups(vertices, faces);
        private finalizeCurrentMaterial();
        private readNulTermString();
        private readTransform();
        private readColor();
    }
}
declare module feng3d {
    /**
     * Obj模型解析者
     */
    class OBJParser extends ParserBase {
        /** 字符串数据 */
        private _textData;
        /** 是否开始了解析 */
        private _startedParsing;
        /** 当前读取到的位置 */
        private _charIndex;
        /** 刚才读取到的位置 */
        private _oldIndex;
        /** 字符串数据长度 */
        private _stringLength;
        /** 当前解析的对象 */
        private _currentObject;
        /** 当前组 */
        private _currentGroup;
        /** 当前材质组 */
        private _currentMaterialGroup;
        /** 对象组列表 */
        private _objects;
        /** 材质编号列表 */
        private _materialIDs;
        /** 加载了的材质列表 */
        private _materialLoaded;
        private _materialSpecularData;
        /** 网格列表 */
        private _meshes;
        /** 最后的材质编号 */
        private _lastMtlID;
        /** object索引 */
        private _objectIndex;
        /** 真实索引列表 */
        private _realIndices;
        /** 顶点索引 */
        private _vertexIndex;
        /** 顶点坐标数据 */
        private _vertices;
        /** 顶点法线数据 */
        private _vertexNormals;
        /** uv数据 */
        private _uvs;
        /** 缩放尺度 */
        private _scale;
        /**  */
        private _mtlLib;
        /** 材质库是否已加载 */
        private _mtlLibLoaded;
        /** 活动材质编号 */
        private _activeMaterialID;
        /**
         * 创建Obj模型解析对象
         * @param scale 缩放比例
         */
        constructor(scale?: number);
        /**
         * 判断是否支持解析
         * @param extension 文件类型
         * @return
         */
        static supportsType(extension: string): boolean;
        /**
         * 判断是否支持该数据的解析
         * @param data 需要解析的数据
         * @return
         */
        static supportsData(data: any): boolean;
        resolveDependency(resourceDependency: ResourceDependency): void;
        resolveDependencyFailure(resourceDependency: ResourceDependency): void;
        protected proceedParsing(): boolean;
        /**
         * 解析行
         */
        private parseLine(trunk);
        /**
         * 把解析出来的数据转换成引擎使用的数据结构
         */
        private translate();
        /**
         * 转换材质组为子网格
         * @param materialGroup 材质组网格数据
         * @param geometry 解析出子网格的父网格
         */
        private translateMaterialGroup(materialGroup, geometry);
        /**
         * 把面数据转换为顶点等数据
         * @param face
         * @param vertexIndex
         * @param vertices
         * @param uvs
         * @param indices
         * @param normals
         */
        private translateVertexData(face, vertexIndex, vertices, uvs, indices, normals);
        /**
         * 创建对象组
         * @param trunk 包含材料标记的数据块和它的参数
         */
        private createObject(trunk);
        /**
         * 创建一个组
         * @param trunk 包含材料标记的数据块和它的参数
         */
        private createGroup(trunk);
        /**
         * 创建材质组
         * @param trunk 包含材料标记的数据块和它的参数
         */
        private createMaterialGroup(trunk);
        /**
         * 解析顶点坐标数据
         * @param trunk 坐标数据
         */
        private parseVertex(trunk);
        /**
         * 解析uv
         * @param trunk uv数据
         */
        private parseUV(trunk);
        /**
         * 解析顶点法线
         * @param trunk 法线数据
         */
        private parseVertexNormal(trunk);
        /**
         * 解析面
         * @param trunk 面数据
         */
        private parseFace(trunk);
        /**
         * This is a hack around negative face coords
         */
        private parseIndex(index, length);
        /**
         * 解析材质数据
         * @param data 材质数据
         */
        private parseMtl(data);
        private parseMapKdString(trunk);
        /**
         * 加载材质
         * @param mtlurl 材质地址
         */
        private loadMtl(mtlurl);
        /**
         * 应用材质
         * @param lm 加载到的材质
         */
        private applyMaterial(lm);
        /**
         * 应用材质
         */
        private applyMaterials();
    }
}
declare module feng3d {
    /**
     * 加载模块类
     * @author feng 2014-7-25
     */
    class Load {
        private static loadManager;
        /**
         * 初始化加载模块
         */
        static init(): void;
        /**
         * 加载器
         */
        static loader: BulkLoader;
        /**
         * 根据类名获取类定义
         * @param className			类名
         * @return					类定义
         */
        static getDefinitionByName(className: string): void;
        /**
         * 根据类名获取实例
         * @param className		类名
         * @return 				实例
         */
        static getInstance(className: string): any;
    }
}
declare module feng3d {
    /**
     * 任务集合类型
     * @author feng 2015-10-29
     */
    class TaskCollectionType {
        /**
         * 列表
         * <p>所有任务全部执行</p>
         */
        static LIST: string;
        /**
         * 队列
         * <p>按照队列中的顺序一个一个依次执行</p>
         */
        static QUEUE: string;
    }
}
declare module feng3d {
    /**
     * 任务模块类
     * @includeExample TaskModuleTest.as
     *
     * @author feng 2015-5-27
     */
    class Task {
        private static _isInit;
        private static taskManager;
        /**
         * 模块是否初始化
         */
        static isInit: boolean;
        /**
         * 初始化模块
         */
        static init(): void;
    }
}
declare module feng3d {
    /**
     * 任务状态
     * @author feng 2015-6-16
     */
    class TaskStateType {
        /** 初始状态 */
        static STATE_INIT: number;
        /** 任务正在执行 */
        static STATE_EXECUTING: number;
        /** 任务已完成 */
        static STATE_COMPLETED: number;
    }
}
declare module feng3d {
    /**
     * 类工具
     * @author feng 2015-4-27
     */
    class ClassUtils {
        /**
         * 基础类型列表
         */
        static BASETYPES: string[];
        /**
         * 获取类定义
         * @param obj
         * @return
         */
        static getClass(obj: any): any;
        /**
         * 获取类实例
         * @param obj
         * @return
         */
        static getInstance(obj: any): any;
        /**
         * 构造实例
         * @param cla						类定义
         * @param params					构造参数
         * @return							构造出的实例
         */
        static structureInstance(cla: any, params: any[]): any;
        /**
         * 构造实例
         * @param space						运行空间
         * @param funcName					函数名称
         * @param params					函数参数
         * @return							函数返回值
         */
        static call(space: Object, funcName: string, params: any[]): any;
        /**
         * 编码参数
         * @param params		参数数组
         */
        static encodeParams(params: any[]): void;
        /**
         * 解码参数
         * @param params		参数数组
         */
        static decodeParams(params: any[]): void;
        /**
         * 拷贝数据
         * @param obj			需要赋值的对象
         * @param value			拥有数据的对象
         */
        static copyValue(obj: Object, value: Object): void;
        /**
         * 判断对象是否为基础类型
         * @param obj			对象
         * @return				true为基础类型，false为复杂类型
         */
        static isBaseType(obj: Object): boolean;
        /**
         * 获取对象默认名称
         * @param obj				对象
         * @return					对象默认名称
         */
        static getDefaultName(obj: Object): string;
        /**
         * 判断两个对象的完全限定类名是否相同
         * @param obj1			对象1
         * @param obj2			对象2
         * @return
         */
        static isSameClass(obj1: any, obj2: any): boolean;
    }
}
declare module feng3d {
    /**
     * 格式化输出字符串
     * @param format		需要格式化的字符串
     * @param ...args		传入一个或多个需要替换的参数
     *
     * @example
     * <pre>
        trace(formatString("[{0} type=\"{1}\" bubbles={2}  cancelable={3}]", "MouseEvent", "click", true, false));

         // trace output
         [MouseEvent type="click" bubbles=true  cancelable=false]
     * </pre>
     * @author feng 2014-5-7
     */
    function formatString(format: string, ...args: any[]): string;
}
declare module feng3d {
    /**
     * 动画状态基类
     * @author feng 2015-9-18
     */
    class AnimationStateBase implements IAnimationState {
        protected _animationNode: AnimationNodeBase;
        protected _rootDelta: Vector3D;
        protected _positionDeltaDirty: boolean;
        protected _time: number;
        protected _startTime: number;
        protected _animator: AnimatorBase;
        /**
         * @inheritDoc
         */
        positionDelta: Vector3D;
        /**
         * 创建动画状态基类
         * @param animator				动画
         * @param animationNode			动画节点
         */
        constructor(animator: AnimatorBase, animationNode: AnimationNodeBase);
        /**
         * @inheritDoc
         */
        offset(startTime: number): void;
        /**
         * @inheritDoc
         */
        update(time: number): void;
        /**
         * @inheritDoc
         */
        phase(value: number): void;
        /**
         * 更新时间
         * @param time		当前时间
         */
        protected updateTime(time: number): void;
        /**
         * 位置偏移
         */
        protected updatePositionDelta(): void;
    }
}
declare module feng3d {
    /**
     * 动画剪辑状态
     * @author feng 2015-9-18
     */
    class AnimationClipState extends AnimationStateBase {
        private _animationClipNode;
        protected _blendWeight: number;
        protected _currentFrame: number;
        protected _nextFrame: number;
        protected _oldFrame: number;
        protected _timeDir: number;
        protected _framesDirty: boolean;
        /**
         * 混合权重	(0[当前帧],1[下一帧])
         * @see #currentFrame
         * @see #nextFrame
         */
        blendWeight: number;
        /**
         * 当前帧
         */
        currentFrame: number;
        /**
         * 下一帧
         */
        nextFrame: number;
        /**
         * 创建一个帧动画状态
         * @param animator				动画
         * @param animationClipNode		帧动画节点
         */
        constructor(animator: AnimatorBase, animationClipNode: AnimationClipNodeBase);
        /**
         * @inheritDoc
         */
        update(time: number): void;
        /**
         * @inheritDoc
         */
        phase(value: number): void;
        /**
         * @inheritDoc
         */
        protected updateTime(time: number): void;
        /**
         * 更新帧，计算当前帧、下一帧与混合权重
         *
         * @see #currentFrame
         * @see #nextFrame
         * @see #blendWeight
         */
        protected updateFrames(): void;
        /**
         * 通知播放完成
         */
        private notifyPlaybackComplete();
    }
}
declare module feng3d {
    /**
     * 骨骼剪辑状态
     * @author feng 2015-9-18
     */
    class SkeletonClipState extends AnimationClipState implements ISkeletonAnimationState {
        private _rootPos;
        private _frames;
        private _skeletonClipNode;
        private _skeletonPose;
        private _skeletonPoseDirty;
        private _currentPose;
        private _nextPose;
        /**
         * 当前骨骼姿势
         */
        currentPose: SkeletonPose;
        /**
         * 下个姿势
         */
        nextPose: SkeletonPose;
        /**
         * 创建骨骼剪辑状态实例
         * @param animator				动画
         * @param skeletonClipNode		骨骼剪辑节点
         */
        constructor(animator: AnimatorBase, skeletonClipNode: SkeletonClipNode);
        /**
         * @inheritDoc
         */
        getSkeletonPose(skeleton: Skeleton): SkeletonPose;
        /**
         * @inheritDoc
         */
        protected updateTime(time: number): void;
        /**
         * @inheritDoc
         */
        protected updateFrames(): void;
        /**
         * 更新骨骼姿势
         * @param skeleton 骨骼
         */
        private updateSkeletonPose(skeleton);
        /**
         * @inheritDoc
         */
        protected updatePositionDelta(): void;
    }
}
declare module feng3d {
    /**
     * sprite动画状态
     * @author feng 2015-9-18
     */
    class SpriteSheetAnimationState extends AnimationClipState implements ISpriteSheetAnimationState {
        private _frames;
        private _clipNode;
        private _currentFrameID;
        private _reverse;
        private _backAndForth;
        private _forcedFrame;
        /**
         * 创建sprite动画状态实例
         * @param animator			动画
         * @param clipNode			动画剪辑节点
         */
        constructor(animator: AnimatorBase, clipNode: SpriteSheetClipNode);
        /**
         * 是否反向播放
         */
        reverse: boolean;
        /**
         * 改变播放方向
         */
        backAndForth: boolean;
        /**
         * @inheritDoc
         */
        currentFrameData: SpriteSheetAnimationFrame;
        /**
         * 当前帧数
         */
        currentFrameNumber: number;
        /**
         * 总帧数
         */
        totalFrames: number;
        /**
         * @inheritDoc
         */
        protected updateFrames(): void;
    }
}
declare module feng3d {
    /**
     * UV动画剪辑状态
     * @author feng 2015-9-18
     */
    class UVClipState extends AnimationClipState implements IUVAnimationState {
        private _frames;
        private _uvClipNode;
        private _currentUVFrame;
        private _nextUVFrame;
        /**
         * @inheritDoc
         */
        currentUVFrame: UVAnimationFrame;
        /**
         * @inheritDoc
         */
        nextUVFrame: UVAnimationFrame;
        /**
         * 创建UVClipState实例
         * @param animator				动画
         * @param uvClipNode			UV动画剪辑节点
         */
        constructor(animator: AnimatorBase, uvClipNode: UVClipNode);
        /**
         * @inheritDoc
         */
        protected updateFrames(): void;
    }
}
declare module feng3d {
    /**
     * 顶点动画剪辑状态
     * @author feng 2015-9-18
     */
    class VertexClipState extends AnimationClipState implements IVertexAnimationState {
        private _frames;
        private _vertexClipNode;
        private _currentGeometry;
        private _nextGeometry;
        /**
         * @inheritDoc
         */
        getCurrentGeometry(): Geometry;
        /**
         * @inheritDoc
         */
        getNextGeometry(): Geometry;
        /**
         * 创建VertexClipState实例
         * @param animator				动画
         * @param vertexClipNode		顶点动画节点
         */
        constructor(animator: AnimatorBase, vertexClipNode: VertexClipNode);
        /**
         * @inheritDoc
         */
        protected updateFrames(): void;
    }
}
declare module feng3d {
    /**
     * 粒子状态基类
     * @author feng 2014-5-20
     */
    class ParticleStateBase extends AnimationStateBase {
        private _particleNode;
        protected _dynamicProperties: Vector3D[];
        protected _dynamicPropertiesDirty: {};
        protected _needUpdateTime: boolean;
        /**
         * 创建粒子状态基类
         * @param animator				粒子动画
         * @param particleNode			粒子节点
         * @param needUpdateTime		是否需要更新时间
         */
        constructor(animator: ParticleAnimator, particleNode: ParticleNodeBase, needUpdateTime?: boolean);
        /**
         * 是否需要更新时间
         */
        needUpdateTime: boolean;
    }
}
declare module feng3d {
    /**
     * 骨骼线性插值状态接口
     * @author feng 2015-9-18
     */
    class SkeletonBinaryLERPState extends AnimationStateBase implements ISkeletonAnimationState {
        private _blendWeight;
        private _skeletonAnimationNode;
        private _skeletonPose;
        private _skeletonPoseDirty;
        private _inputA;
        private _inputB;
        /**
         * 混合权重	(0[inputA],1[inputB])
         */
        blendWeight: number;
        /**
         * 创建SkeletonBinaryLERPState实例
         * @param animator						动画
         * @param skeletonAnimationNode			骨骼动画节点
         */
        constructor(animator: AnimatorBase, skeletonAnimationNode: SkeletonBinaryLERPNode);
        /**
         * @inheritDoc
         */
        phase(value: number): void;
        /**
         * @inheritDoc
         */
        protected updateTime(time: number): void;
        /**
         * @inheritDoc
         */
        getSkeletonPose(skeleton: Skeleton): SkeletonPose;
        /**
         * @inheritDoc
         */
        protected updatePositionDelta(): void;
        /**
         * 更新骨骼姿势
         * @param skeleton		骨骼
         */
        private updateSkeletonPose(skeleton);
    }
}
declare module feng3d {
    /**
     * 淡入淡出变换状态
     * @author feng 2015-9-18
     */
    class CrossfadeTransitionState extends SkeletonBinaryLERPState {
        private _skeletonAnimationNode1;
        private _animationStateTransitionComplete;
        /**
         * 创建淡入淡出变换状态实例
         * @param animator						动画
         * @param skeletonAnimationNode			骨骼动画节点
         */
        constructor(animator: AnimatorBase, skeletonAnimationNode: CrossfadeTransitionNode);
        /**
         * @inheritDoc
         */
        protected updateTime(time: number): void;
    }
}
declare module feng3d {
    /**
     * 动画状态接口
     * @author feng 2015-9-18
     */
    interface IAnimationState {
        /**
         * 位置偏移
         */
        positionDelta: Vector3D;
        /**
         * 设置一个新的开始时间
         * @param startTime		开始时间
         */
        offset(startTime: number): any;
        /**
         * 更新
         * @param time		当前时间
         */
        update(time: number): any;
        /**
         * 设置动画的播放进度(0,1)
         * @param	播放进度。 0：动画起点，1：动画终点。
         */
        phase(value: number): any;
    }
}
declare module feng3d {
    /**
     * 淡入淡出变换接口
     * @author feng 2015-9-18
     */
    interface IAnimationTransition {
        /**
         * 获取动画变换节点
         * @param animator				动画
         * @param startNode				开始节点
         * @param endNode				结束节点
         * @param startTime				开始时间
         * @return						动画变换节点
         */
        getAnimationNode(animator: AnimatorBase, startNode: AnimationNodeBase, endNode: AnimationNodeBase, startTime: number): AnimationNodeBase;
    }
}
declare module feng3d {
    /**
     * ...
     */
    class ParticleAnimationData {
        index: number;
        startTime: number;
        totalTime: number;
        duration: number;
        delay: number;
        startVertexIndex: number;
        numVertices: number;
        constructor(index: number, startTime: number, duration: number, delay: number, particle: ParticleData);
    }
}
declare module feng3d {
    /**
     * 粒子属性
     * @author feng 2014-11-13
     */
    class ParticleProperties {
        /**
         * 索引
         */
        index: number;
        /**
         * 粒子总数
         */
        total: number;
        /**
         * 开始时间
         */
        startTime: number;
        /**
         * 持续时间
         */
        duration: number;
        /**
         * 延迟周期
         */
        delay: number;
    }
}
declare module feng3d {
    /**
     * 粒子属性模型
     * @author feng 2014-11-13
     */
    class ParticlePropertiesMode {
        /**
         * 全局粒子属性，数据将上传至常量寄存器中
         */
        static GLOBAL: number;
        /**
         * 本地静态粒子属性，数据将上传顶点属性寄存器
         */
        static LOCAL_STATIC: number;
    }
}
declare module feng3d {
    /**
     * 关节pose
     * @author feng 2014-5-20
     */
    class JointPose {
        /** 旋转信息 */
        orientation: Quaternion;
        /** 位移信息 */
        translation: Vector3D;
        constructor();
        /**
         * Converts the transformation to a Matrix3D representation.
         *
         * @param target An optional target matrix to store the transformation. If not provided, it will create a new instance.
         * @return The transformation matrix of the pose.
         */
        toMatrix3D(target?: Matrix3D): Matrix3D;
    }
}
declare module feng3d {
    /**
     * 骨骼关节数据
     * @author feng 2014-5-20
     */
    class SkeletonJoint {
        /** 父关节索引 （-1说明本身是总父节点，这个序号其实就是行号了，譬如上面”origin“节点的序号就是0，无父节点； "body"节点序号是1，父节点序号是0，也就是说父节点是”origin“）*/
        parentIndex: number;
        /** 关节名字 */
        name: string;
        /** bind-pose姿态下节点的位置（位移）和旋转 */
        inverseBindPose: number[];
        constructor();
    }
}
declare module feng3d {
    /**
     * 骨骼动画状态接口
     * @author feng 2015-9-18
     */
    interface ISkeletonAnimationState extends IAnimationState {
        /**
         * 获取骨骼姿势
         * @param skeleton		骨骼
         */
        getSkeletonPose(skeleton: Skeleton): SkeletonPose;
    }
}
declare module feng3d {
    /**
     * sprite动画状态接口
     * @author feng 2015-9-18
     */
    interface ISpriteSheetAnimationState extends IAnimationState {
        /**
         * 当前帧数据
         */
        currentFrameData: SpriteSheetAnimationFrame;
        /**
         * 当前帧数
         */
        currentFrameNumber: number;
    }
}
declare module feng3d {
    /**
     * sprite动画帧
     * @author feng 2015-9-18
     * @see me.feng3d.animators.uv.UVAnimationFrame
     */
    class SpriteSheetAnimationFrame {
        /**
         * U元素偏移
         */
        offsetU: number;
        /**
         * V元素偏移
         */
        offsetV: number;
        /**
         * U元素缩放
         */
        scaleU: number;
        /**
         * V元素缩放
         */
        scaleV: number;
        /**
         * 映射编号
         */
        mapID: number;
        /**
         * 创建<code>SpriteSheetAnimationFrame</code>实例
         *
         * @param offsetU			U元素偏移
         * @param offsetV			V元素偏移
         * @param scaleU			U元素缩放
         * @param scaleV			V元素缩放
         * @param mapID				映射编号
         */
        constructor(offsetU?: number, offsetV?: number, scaleU?: number, scaleV?: number, mapID?: number);
    }
}
declare module feng3d {
    /**
     * 淡入淡出变换
     * @author feng 2015-9-18
     */
    class CrossfadeTransition implements IAnimationTransition {
        blendSpeed: number;
        /**
         * 创建淡入淡出变换实例
         * @param blendSpeed			混合速度
         */
        constructor(blendSpeed: number);
        /**
         * @inheritDoc
         */
        getAnimationNode(animator: AnimatorBase, startNode: AnimationNodeBase, endNode: AnimationNodeBase, startBlend: number): AnimationNodeBase;
    }
}
declare module feng3d {
    /**
     * UV动画状态接口
     * @author feng 2015-9-18
     */
    interface IUVAnimationState extends IAnimationState {
        /**
         * 当前UV帧编号
         */
        currentUVFrame: UVAnimationFrame;
        /**
         * UV下帧编号
         */
        nextUVFrame: UVAnimationFrame;
        /**
         * 混合权重
         */
        blendWeight: number;
    }
}
declare module feng3d {
    /**
     * UV动画帧
     * @author feng 2015-9-18
     * @see me.feng3d.animators.spriteSheet.SpriteSheetAnimationFrame
     */
    class UVAnimationFrame {
        /**
         * U偏移
         */
        offsetU: number;
        /**
         * V偏移
         */
        offsetV: number;
        /**
         * U缩放
         */
        scaleU: number;
        /**
         * V缩放
         */
        scaleV: number;
        /**
         * 旋转角度（度数）
         */
        rotation: number;
        /**
         * 创建<code>UVAnimationFrame</code>实例
         *
         * @param offsetU			U元素偏移
         * @param offsetV			V元素偏移
         * @param scaleU			U元素缩放
         * @param scaleV			V元素缩放
         * @param rotation			旋转角度（度数）
         */
        constructor(offsetU?: number, offsetV?: number, scaleU?: number, scaleV?: number, rotation?: number);
    }
}
declare module feng3d {
    /**
     * Provides an interface for animation node classes that hold animation data for use in the Vertex animator class.
     *
     * @see away3d.animators.VertexAnimator
     */
    interface IVertexAnimationState extends IAnimationState {
        /**
         * Returns the current geometry frame of animation in the clip based on the internal playhead position.
         */
        getCurrentGeometry(): Geometry;
        /**
         * Returns the current geometry frame of animation in the clip based on the internal playhead position.
         */
        getNextGeometry(): Geometry;
        /**
         * Returns a fractional value between 0 and 1 representing the blending ratio of the current playhead position
         * between the current geometry frame (0) and next geometry frame (1) of the animation.
         */
        getBlendWeight(): number;
    }
}
declare module feng3d {
    /**
     * 提供动画数据集合的接口
     * @author feng 2015-9-18
     */
    interface IAnimationSet {
        /**
         * 检查是否有该动作名称
         * @param name			动作名称
         */
        hasAnimation(name: string): boolean;
        /**
         * 获取动画节点
         * @param name			动作名称
         */
        getAnimation(name: string): AnimationNodeBase;
        /**
         * 判断是否使用CPU计算
         * @private
         */
        usesCPU: boolean;
        /**
         * 取消使用GPU计算
         * @private
         */
        cancelGPUCompatibility(): any;
        /**
         * 激活状态，收集GPU渲染所需数据及其状态
         * @param shaderParams			渲染参数
         * @param pass					材质渲染通道
         */
        activate(shaderParams: ShaderParams, pass: MaterialPassBase): any;
    }
}
declare module feng3d {
    /**
     * 包围盒基类
     * @author feng 2014-4-27
     */
    abstract class BoundingVolumeBase {
        /** 最小坐标 */
        protected _min: Vector3D;
        /** 最大坐标 */
        protected _max: Vector3D;
        protected _aabbPointsDirty: boolean;
        protected _boundingRenderable: WireframePrimitiveBase;
        /**
         * The maximum extreme of the bounds
         */
        max: Vector3D;
        /**
         * The minimum extreme of the bounds
         */
        min: Vector3D;
        /**
         * 创建包围盒
         */
        constructor();
        /**
         * 渲染实体
         */
        boundingRenderable: WireframePrimitiveBase;
        /**
         * 销毁渲染实体
         */
        disposeRenderable(): void;
        /**
         * 更新边界渲染实体
         */
        protected abstract updateBoundingRenderable(): any;
        /**
         * 创建渲染边界
         */
        protected abstract createBoundingRenderable(): WireframePrimitiveBase;
        /**
         * 根据几何结构更新边界
         */
        fromGeometry(geometry: Geometry): void;
        /**
         * 根据所给极值设置边界
         * @param minX 边界最小X坐标
         * @param minY 边界最小Y坐标
         * @param minZ 边界最小Z坐标
         * @param maxX 边界最大X坐标
         * @param maxY 边界最大Y坐标
         * @param maxZ 边界最大Z坐标
         */
        fromExtremes(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number): void;
        /**
         * 检测射线是否与边界交叉
         * @param ray3D						射线
         * @param targetNormal				交叉点法线值
         * @return							射线起点到交点距离
         */
        rayIntersection(ray3D: Ray3D, targetNormal: Vector3D): number;
        /**
         * 检测是否包含指定点
         * @param position 		被检测点
         * @return				true：包含指定点
         */
        containsPoint(position: Vector3D): boolean;
        /**
         * 测试是否出现在摄像机视锥体内
         * @param planes 		视锥体面向量
         * @param numPlanes		面数
         * @return 				true：出现在视锥体内
         */
        abstract isInFrustum(planes: Plane3D[], numPlanes: number): boolean;
        /**
         * 对包围盒进行变换
         * @param bounds		包围盒
         * @param matrix		变换矩阵
         */
        abstract transformFrom(bounds: BoundingVolumeBase, matrix: Matrix3D): any;
        /**
         * 从给出的球体设置边界
         * @param center 		球心坐标
         * @param radius 		球体半径
         */
        fromSphere(center: Vector3D, radius: number): void;
    }
}
declare module feng3d {
    /**
     * 轴对其包围盒
     * @author feng 2014-4-27
     */
    class AxisAlignedBoundingBox extends BoundingVolumeBase {
        private _centerX;
        private _centerY;
        private _centerZ;
        private _halfExtentsX;
        private _halfExtentsY;
        private _halfExtentsZ;
        /**
         * 创建轴对其包围盒
         */
        constructor();
        /**
         * 创建渲染边界
         */
        protected createBoundingRenderable(): WireframePrimitiveBase;
        /**
         * 测试轴对其包围盒是否出现在摄像机视锥体内
         * @param planes 		视锥体面向量
         * @return 				true：出现在视锥体内
         * @see me.feng3d.cameras.Camera3D.updateFrustum()
         */
        isInFrustum(planes: Plane3D[], numPlanes: number): boolean;
        /**
         * @inheritDoc
         */
        protected updateBoundingRenderable(): void;
        /**
         * @inheritDoc
         */
        fromExtremes(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number): void;
        /**
         * @inheritDoc
         */
        rayIntersection(ray3D: Ray3D, targetNormal: Vector3D): number;
        /**
         * @inheritDoc
         */
        containsPoint(position: Vector3D): boolean;
        /**
         * 对包围盒进行变换
         * @param bounds		包围盒
         * @param matrix		变换矩阵
         * @see http://www.cppblog.com/lovedday/archive/2008/02/23/43122.html
         */
        transformFrom(bounds: BoundingVolumeBase, matrix: Matrix3D): void;
    }
}
declare module feng3d {
    /**
     * 无空间包围盒，用于表示一直处于视锥体内或之外
     * <p>用于某些一直处于视锥体的实体，例如方向光源、天空盒等</p>
     * @author feng 2015-3-21
     */
    class NullBounds extends BoundingVolumeBase {
        private _alwaysIn;
        private _renderable;
        /**
         * 构建空无空间包围盒
         * @param alwaysIn				是否总在视锥体内
         * @param renderable			渲染实体
         */
        constructor(alwaysIn?: boolean, renderable?: WireframePrimitiveBase);
        /**
         * 更新边界渲染实体
         */
        protected updateBoundingRenderable(): void;
        /**
         * @inheritDoc
         */
        protected createBoundingRenderable(): WireframePrimitiveBase;
        /**
         * @inheritDoc
         */
        isInFrustum(planes: Plane3D[], numPlanes: number): boolean;
        /**
         * @inheritDoc
         */
        fromGeometry(geometry: Geometry): void;
        /**
         * @inheritDoc
         */
        fromExtremes(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number): void;
        /**
         * @inheritDoc
         */
        transformFrom(bounds: BoundingVolumeBase, matrix: Matrix3D): void;
    }
}
declare module feng3d {
    /**
     * 坐标系统类型
     * @author feng 2014-10-14
     */
    class CoordinateSystem {
        /**
         * 默认坐标系统，左手坐标系统
         */
        static LEFT_HANDED: number;
        /**
         * 右手坐标系统
         */
        static RIGHT_HANDED: number;
    }
}
declare module feng3d {
    /**
     * 3D缓冲编号配置
     * @author feng 2015-7-21
     */
    class Context3DBufferIDConfig {
        /**
         * 缓冲编号配置
         */
        static bufferIdConfigs: string[][];
    }
}
declare module feng3d {
    /**
     * 3D视图
     * @author feng 2014-3-17
     */
    class View3D extends Sprite {
        /**
         * 射线坐标临时变量
         */
        private static tempRayPosition;
        /**
         * 射线方向临时变量
         */
        private static tempRayDirection;
        private _width;
        private _height;
        private _localPos;
        private _globalPos;
        private _globalPosDirty;
        protected _parentIsStage: boolean;
        private _antiAlias;
        protected _backBufferInvalid: boolean;
        private _camera;
        private _scene;
        protected _entityCollector: EntityCollector;
        private _stage3DProxy;
        /** 渲染器 */
        protected _renderer: RendererBase;
        /** 是否被添加到舞台 */
        private _addedToStage;
        /** 是否强行使用软件渲染 */
        private _forceSoftware;
        /** 指定 Flash Player 支持低级别 GPU 的范围 */
        private _profile;
        private _backgroundColor;
        private _backgroundAlpha;
        protected _mouse3DManager: Mouse3DManager;
        /**
         * 点击区域
         */
        private _hitField;
        private _scissorRectDirty;
        private _viewportDirty;
        protected _aspectRatio: number;
        protected _shareContext: boolean;
        /**
         * 创建一个3D视图
         * @param scene 				场景
         * @param camera 				摄像机
         * @param renderer				渲染器
         * @param forceSoftware			是否强行使用软件渲染
         * @param profile				指定 Flash Player 支持低级别 GPU 的范围
         */
        constructor(scene?: Scene3D, camera?: Camera3D, renderer?: RendererBase, forceSoftware?: boolean, profile?: string);
        x: number;
        y: number;
        visible: boolean;
        /**
         * The amount of anti-aliasing to be used.
         */
        antiAlias: number;
        /**
         * 摄像机
         */
        camera: Camera3D;
        /**
         * 处理镜头改变事件
         */
        private onLensChanged(event);
        /**
         * 处理添加到舞台事件
         */
        private onAddedToStage(event);
        /**
         * 添加事件
         * @param event
         */
        private onAdded(event);
        /**
         * 处理3D环境被重建事件
         */
        private onContext3DRecreated(event);
        /**
         * 处理从舞台移除事件
         */
        private onRemoveFromeStage(event);
        /**
         * 初始化点击区域
         */
        private initHitField();
        /**
         * 添加源码地址
         * @param url
         */
        addSourceURL(url: string): void;
        /**
         * 渲染3D视图
         */
        render(): void;
        /** 3d场景 */
        /**
         * @private
         */
        scene: Scene3D;
        /**
         * 3D舞台代理
         */
        stage3DProxy: Stage3DProxy;
        /**
         * 宽度
         */
        width: number;
        /**
         * 高度
         */
        height: number;
        /**
         * 渲染面数
         */
        renderedFacesCount: number;
        /**
         * Defers control of Context3D clear() and present() calls to Stage3DProxy, enabling multiple Stage3D frameworks
         * to share the same Context3D object.
         */
        shareContext: boolean;
        /**
         * 更新背景缓冲大小
         */
        protected updateBackBuffer(): void;
        /**
         * 更新全局坐标
         */
        protected updateGlobalPos(): void;
        /**
         * 背景颜色
         */
        backgroundColor: number;
        /**
         * 投影坐标（世界坐标转换为3D视图坐标）
         * @param point3d 世界坐标
         * @return 屏幕的绝对坐标
         */
        project(point3d: Vector3D): Vector3D;
        /**
         * 屏幕坐标投影到场景坐标
         * @param nX 屏幕坐标X ([0-width])
         * @param nY 屏幕坐标Y ([0-height])
         * @param sZ 到屏幕的距离
         * @param v 场景坐标（输出）
         * @return 场景坐标
         */
        unproject(sX: number, sY: number, sZ: number, v?: Vector3D): Vector3D;
        /**
         * 屏幕坐标转GPU坐标
         * @param screenPos 屏幕坐标 (x:[0-width],y:[0-height])
         * @return GPU坐标 (x:[-1,1],y:[-1-1])
         */
        screenToGpuPosition(screenPos: Point): Point;
        /**
         * 获取鼠标射线（与鼠标重叠的摄像机射线）
         */
        getMouseRay3D(): Ray3D;
        /**
         * 获取与坐标重叠的射线
         * @param x view3D上的X坐标
         * @param y view3D上的X坐标
         * @return
         */
        getRay3D(x: number, y: number): Ray3D;
        /**
         * 渲染器
         */
        renderer: RendererBase;
    }
}
declare module feng3d {
    /**
     * 控制器
     * @author feng 2014-10-10
     */
    abstract class ControllerBase {
        protected _autoUpdate: boolean;
        protected _targetObject: Entity;
        /**
         * 创建控制器
         * @param targetObject 被控制对象
         */
        constructor(targetObject?: Entity);
        /**
         * 被控制对象
         */
        targetObject: Entity;
        /**
         * 通知被控制对象更新
         */
        protected notifyUpdate(): void;
        /**
         * 更新被控制对象状态
         */
        abstract update(): any;
    }
}
declare module feng3d {
    /**
     * 注视点控制器
     * @author feng 2014-10-10
     */
    class LookAtController extends ControllerBase {
        protected _lookAtPosition: Vector3D;
        protected _lookAtObject: Container3D;
        protected _upAxis: Vector3D;
        private _pos;
        /**
         * 创建注视点控制器
         * @param targetObject 控制对象
         * @param lookAtObject 被注视对象
         */
        constructor(targetObject?: Entity, lookAtObject?: Container3D);
        /**
         * 目标对象的上朝向
         */
        upAxis: Vector3D;
        /**
         * 被注视目标所在位置
         */
        lookAtPosition: Vector3D;
        /**
         * 被注视目标
         */
        lookAtObject: Container3D;
        /**
         * 处理注视目标变化事件
         */
        private onLookAtObjectChanged(event);
        /**
         * @inheritDoc
         */
        update(): void;
    }
}
declare module feng3d {
    /**
     * 盘旋控制器
     * @author feng 2014-10-10
     */
    class HoverController extends LookAtController {
        _currentPanAngle: number;
        _currentTiltAngle: number;
        protected _origin: Vector3D;
        private _panAngle;
        private _tiltAngle;
        private _distance;
        private _minPanAngle;
        private _maxPanAngle;
        private _minTiltAngle;
        private _maxTiltAngle;
        private _yFactor;
        private _wrapPanAngle;
        private _pos1;
        /**
         * 创建盘旋控制器
         * @param targetObject 控制对象
         * @param lookAtObject 被注视对象
         * @param panAngle 摄像机以Y轴旋转的角度
         * @param tiltAngle 摄像机以X轴旋转的角度
         * @param distance 与注视对象的距离
         * @param minTiltAngle 以X轴旋转的最小角度。
         * @param maxTiltAngle 以X轴旋转的最大角度。
         * @param minPanAngle 以Y轴旋转的最小角度。
         * @param maxPanAngle 以Y轴旋转的最大角度。
         * @param yFactor
         * @param wrapPanAngle 是否把角度约束在0到360度
         */
        constructor(targetObject?: Entity, lookAtObject?: Container3D, panAngle?: number, tiltAngle?: number, distance?: number, minTiltAngle?: number, maxTiltAngle?: number, minPanAngle?: number, maxPanAngle?: number, yFactor?: number, wrapPanAngle?: boolean);
        /**
         * 与注视目标的距离
         */
        distance: number;
        /**
         * 最小摆动角度
         */
        minPanAngle: number;
        /**
         * 最大摆动角度
         */
        maxPanAngle: number;
        /**
         * 倾斜角度
         */
        tiltAngle: number;
        /**
         * 最小倾斜角度
         */
        minTiltAngle: number;
        /**
         * 最大倾斜角度
         */
        maxTiltAngle: number;
        /**
         * y因子，用于体现摄像机水平与垂直旋转的差异
         * @see #distance
         */
        yFactor: number;
        /**
         * 是否把角度约束在0到360度
         */
        wrapPanAngle: boolean;
        /**
         * 摆动角度
         */
        panAngle: number;
        /**
         * 更新当前倾斜与摆动角度
         * @see    #tiltAngle
         * @see    #panAngle
         * @see    #steps
         */
        update(): void;
    }
}
declare module feng3d {
    /**
     * Face value object.
     */
    class Face {
        private static _calcPoint;
        private _vertices;
        private _uvs;
        private _faceIndex;
        private _v0Index;
        private _v1Index;
        private _v2Index;
        private _uv0Index;
        private _uv1Index;
        private _uv2Index;
        /**
         * Creates a new <code>Face</code> value object.
         *
         * @param    vertices        [optional] 9 entries long Vector.&lt;number&gt; representing the x, y and z of v0, v1, and v2 of a face
         * @param    uvs            [optional] 6 entries long Vector.&lt;number&gt; representing the u and v of uv0, uv1, and uv2 of a face
         */
        constructor(vertices?: number[], uvs?: number[]);
        /**
         * To set uv values for either uv0, uv1 or uv2.
         * @param    index        The id of the uv (0, 1 or 2)
         * @param    u            The horizontal coordinate of the texture value.
         * @param    v            The vertical coordinate of the texture value.
         */
        setUVat(index: number, u: number, v: number): void;
        /**
         * @return            Returns the tmp index set for this Face object
         */
        /**
         * To store a temp index of a face during a loop
         * @param    ind        The index
         */
        faceIndex: number;
        /**
         * @return return the index set for uv0 in this Face value object
         */
        /**
         * the index set for uv0 in this Face value object
         * @param    ind        The index
         */
        uv0Index: number;
        /**
         * uv0 u and v values
         * @param    u        The u value
         * @param    v        The v value
         */
        setUv0Value(u: number, v: number): void;
        /**
         * @return return the u value of the uv0 of this Face value object
         */
        uv0u: number;
        /**
         * @return return the v value of the uv0 of this Face value object
         */
        uv0v: number;
        /**
         * @return Returns the index set for uv1 in this Face value object
         */
        /**
         * the index set for uv1 in this Face value object
         * @param    ind        The index
         */
        uv1Index: number;
        /**
         * uv1 u and v values
         * @param    u        The u value
         * @param    v        The v value
         */
        setUv1Value(u: number, v: number): void;
        /**
         * @return Returns the u value of the uv1 of this Face value object
         */
        uv1u: number;
        /**
         * @return Returns the v value of the uv1 of this Face value object
         */
        uv1v: number;
        /**
         * @return return the index set for uv2 in this Face value object
         */
        /**
         * the index set for uv2 in this Face value object
         * @param    ind        The index
         */
        uv2Index: number;
        /**
         * uv2 u and v values
         * @param    u        The u value
         * @param    v        The v value
         */
        setUv2Value(u: number, v: number): void;
        /**
         * @return return the u value of the uv2 of this Face value object
         */
        uv2u: number;
        /**
         * @return return the v value of the uv2 of this Face value object
         */
        uv2v: number;
        /**
         * To set uv values for either v0, v1 or v2.
         * @param    index        The id of the uv (0, 1 or 2)
         * @param    x            The x value of the vertex.
         * @param    y            The y value of the vertex.
         * @param    z            The z value of the vertex.
         */
        setVertexAt(index: number, x: number, y: number, z: number): void;
        /**
         * @return Returns the index value of the v0 stored in the Face value object
         */
        /**
         * set the index value for v0
         * @param    ind            The index value to store
         */
        v0Index: number;
        /**
         * @return Returns a number[] representing the v0 stored in the Face value object
         */
        v0: number[];
        /**
         * @return Returns the x value of the v0 stored in the Face value object
         */
        v0x: number;
        /**
         * @return Returns the y value of the v0 stored in the Face value object
         */
        v0y: number;
        /**
         * @return Returns the z value of the v0 stored in the Face value object
         */
        v0z: number;
        /**
         * @return Returns the index value of the v1 stored in the Face value object
         */
        /**
         * set the index value for v1
         * @param    ind            The index value to store
         */
        v1Index: number;
        /**
         * @return Returns a number[] representing the v1 stored in the Face value object
         */
        v1: number[];
        /**
         * @return Returns the x value of the v1 stored in the Face value object
         */
        v1x: number;
        /**
         * @return Returns the y value of the v1 stored in the Face value object
         */
        v1y: number;
        /**
         * @return Returns the z value of the v1 stored in the Face value object
         */
        v1z: number;
        /**
         * @return return the index value of the v2 stored in the Face value object
         */
        /**
         * set the index value for v2
         * @param    ind            The index value to store
         */
        v2Index: number;
        /**
         * @return Returns a number[] representing the v2 stored in the Face value object
         */
        v2: number[];
        /**
         * @return Returns the x value of the v2 stored in the Face value object
         */
        v2x: number;
        /**
         * @return Returns the y value of the v2 stored in the Face value object
         */
        v2y: number;
        /**
         * @return Returns the z value of the v2 stored in the Face value object
         */
        v2z: number;
        /**
         * returns a new Face value Object
         */
        clone(): Face;
        /**
         * Returns the first two barycentric coordinates for a point on (or outside) the triangle. The third coordinate is 1 - x - y
         * @param point The point for which to calculate the new target
         * @param target An optional Point object to store the calculation in order to prevent creation of a new object
         */
        getBarycentricCoords(point: Vector3D, target?: Point): Point;
        /**
         * Tests whether a given point is inside the triangle
         * @param point The point to test against
         * @param maxDistanceToPlane The minimum distance to the plane for the point to be considered on the triangle. This is usually used to allow for rounding error, but can also be used to perform a volumetric test.
         */
        containsPoint(point: Vector3D, maxDistanceToPlane?: number): boolean;
        private planeContains(point, epsilon?);
        /**
         * Returns the target coordinates for a point on a triangle
         * @param v0 The triangle's first vertex
         * @param v1 The triangle's second vertex
         * @param v2 The triangle's third vertex
         * @param uv0 The UV coord associated with the triangle's first vertex
         * @param uv1 The UV coord associated with the triangle's second vertex
         * @param uv2 The UV coord associated with the triangle's third vertex
         * @param point The point for which to calculate the new target
         * @param target An optional UV object to store the calculation in order to prevent creation of a new object
         */
        getUVAtPoint(point: Vector3D, target?: UV): UV;
    }
}
declare module feng3d {
    /**
     * 单个粒子数据
     * @author feng 2014-12-9
     */
    class ParticleData {
        /** 粒子索引 */
        particleIndex: number;
        /** 该粒子所包含的粒子数量 */
        numVertices: number;
        /** 粒子所在子几何体的顶点位置 */
        startVertexIndex: number;
        /** 粒子子几何体 */
        subGeometry: SubGeometry;
        constructor();
    }
}
declare module feng3d {
    /**
     * Texture coordinates value object.
     */
    class UV {
        private _u;
        private _v;
        /**
         * Creates a new <code>UV</code> object.
         *
         * @param    u        [optional]    The horizontal coordinate of the texture value. Defaults to 0.
         * @param    v        [optional]    The vertical coordinate of the texture value. Defaults to 0.
         */
        constructor(u?: number, v?: number);
        /**
         * Defines the vertical coordinate of the texture value.
         */
        v: number;
        /**
         * Defines the horizontal coordinate of the texture value.
         */
        u: number;
        /**
         * returns a new UV value Object
         */
        clone(): UV;
        /**
         * returns the value object as a string for trace/debug purpose
         */
        toString(): string;
    }
}
declare module feng3d {
    /**
     * 顶点
     */
    class Vertex {
        private _x;
        private _y;
        private _z;
        private _index;
        /**
         *
         * @param x X轴坐标
         * @param y Y轴坐标
         * @param z Z轴坐标
         * @param index 顶点索引
         */
        constructor(x?: number, y?: number, z?: number, index?: number);
        /**
         * To define/store the index of value object
         * @param    ind        The index
         */
        index: number;
        x: number;
        y: number;
        z: number;
        clone(): Vertex;
        toString(): string;
    }
}
declare module feng3d {
    /**
     * IRenderable为对象提供一个表示可以被渲染的接口
     * @author feng 2014-4-9
     */
    interface IRenderable extends IMaterialOwner {
        /**
         * 是否可响应鼠标事件
         */
        mouseEnabled: boolean;
        /**
         * 三角形数量
         */
        numTriangles: number;
        /**
         * 渲染缓存
         */
        context3dCache: Context3DCache;
        /**
         * 渲染实体
         */
        sourceEntity: Entity;
        /**
         * 渲染对象是投射阴影
         */
        castsShadows: boolean;
    }
}
declare module feng3d {
    /**
     * 3D环境缓冲编号集合
     * @author feng 2015-7-21
     */
    class Context3DBufferID {
        private static _instance;
        /**
         * 创建3D环境缓冲编号集合
         */
        constructor();
        static instance: Context3DBufferID;
    }
}
declare module feng3d {
    /**
     * 材质拥有者
     * IMaterialOwner为一个对象提供能够使用材质的接口
     * IMaterialOwner provides an interface for objects that can use materials.
     */
    interface IMaterialOwner {
        /**
         * 渲染材质
         */
        material: MaterialBase;
        /**
         * 动画
         */
        animator: AnimatorBase;
    }
}
declare module feng3d {
    /**
     *
     * @author feng 2014-8-26
     */
    class IndexBufferItem {
        /** 是否无效 */
        invalid: boolean;
        indexBuffer3D: IndexBuffer3D;
        context3D: Context3D;
        constructor(context3D: Context3D, numIndices: number);
        uploadFromVector(data: number[], startOffset: number, count: number): void;
        drawTriangles(firstIndex?: number, numTriangles?: number): void;
    }
}
declare module feng3d {
    /**
     * 顶点VA数据缓冲
     * @author feng 2014-8-28
     */
    class VADataBuffer {
        /** 要在缓存区中存储的顶点数量。单个缓存区中的最大顶点数为 65535。 */
        numVertices: number;
        /** 与每个顶点关联的 32 位（4 字节）数据值的数量。每个顶点的 32 位数据元素数量最多为 64 个（或 256 个字节）。请注意，顶点着色器程序在任何给定时间只能访问 8 个属性寄存器。使用 SetVertextBufferAt() 在顶点缓存区内选择属性。  */
        data32PerVertex: number;
        /** 顶点数据 */
        data: number[];
        /** 缓存字典 可在多个寄存器共享数据缓存时使用同一个 */
        private bufferItemDic;
        /** 是否无效 */
        private invalid;
        /** 缓存是否无效 */
        private bufferInvalid;
        /**
         * 创建顶点VA数据缓冲
         */
        constructor();
        /**
         * 获取顶点缓冲项
         * @param context3D		3d环境
         * @return 				顶点缓冲项
         */
        getBufferItem(context3D: Context3D): VertexBufferItem;
        /**
         * 更新数据
         * @param data 				顶点数据
         * @param numVertices 		要在缓存区中存储的顶点数量。单个缓存区中的最大顶点数为 65535。
         * @param data32PerVertex 	与每个顶点关联的 32 位（4 字节）数据值的数量。每个顶点的 32 位数据元素数量最多为 64 个（或 256 个字节）。请注意，顶点着色器程序在任何给定时间只能访问 8 个属性寄存器。使用 SetVertextBufferAt() 在顶点缓存区内选择属性。
         */
        update(data: number[], numVertices: number, data32PerVertex: number): void;
    }
}
declare module feng3d {
    /**
     * 顶点缓冲项
     * @author feng 2014-8-26
     */
    class VertexBufferItem {
        /** 是否无效 */
        invalid: boolean;
        /** 顶点缓冲 */
        private vertexBuffer3D;
        /** 3d环境 */
        private context3D;
        /**
         * 创建顶点缓冲项
         * @param context3D
         * @param numVertices			要在缓冲区中存储的顶点数量。单个缓冲区中的最大顶点数为 65535。
         * @param data32PerVertex		与每个顶点关联的 32 位（4 字节）数据值的数量。每个顶点的 32 位数据元素数量最多为 64 个（或 256 个字节）。请注意，顶点着色器程序在任何给定时间只能访问 8 个属性寄存器。使用 SetVertextBufferAt() 在顶点缓冲区内选择属性。
         */
        constructor(context3D: Context3D, numVertices: number, data32PerVertex: number);
        /**
         * 从矢量数组上载一组顶点的数据到渲染上下文。
         * @param data					位值的矢量。单个顶点由许多按顺序存储在矢量中的值组成。顶点中的值数量在创建缓冲区时使用 Context3D createVertexBuffer3D() 方法的 data32PerVertex 参数指定。矢量的长度必须为每个顶点的值数量乘以顶点数量。
         * @param startVertex			要加载的第一个顶点的索引。startVertex 的非零值可用于加载顶点数据的子区域。
         * @param numVertices			data 表示的顶点数量。
         */
        uploadFromVector(data: number[], startVertex: number, numVertices: number): void;
        /**
         * 指定与单个着色器程序输入相对应的顶点数据组件。
         * <p>使用 setVertexBufferAt 方法来标识 VertexBuffer3D 缓冲区中每个顶点定义的哪些数据组件属于顶点程序的哪些输入。顶点程序的开发人员会确定每个顶点需要的数据量。该数据从 1 个或多个 VertexBuffer3D 流映射到顶点着色器程序的属性寄存器中。</p>
         * <p>顶点着色器所使用数据的最小单位为 32 位数据。距顶点流的偏移量以 32 位的倍数指定。</p>
         * 举例来说，编程人员可以使用以下数据定义每个顶点：
         * <pre>
         * position:	x    float32
         * 		y    float32
         * 		z    float32
         * color:	r    unsigned byte
         *		g    unsigned byte
         *		b    unsigned byte
         *		a    unsigned byte
         * </pre>
         * 假定在 VertexBuffer3D 对象中定义了名为 buffer 的对象，则可使用以下代码将其分配给顶点着色器：
         * <pre>
         * setVertexBufferAt( 0, buffer, 0, Context3DVertexBufferFormat.FLOAT_3 );   // attribute #0 will contain the position information
         * setVertexBufferAt( 1, buffer, 3, Context3DVertexBufferFormat.BYTES_4 );    // attribute #1 will contain the color information
         * </pre>
         *
         * @param index				顶点着色器中的属性寄存器的索引（0 到 7）。
         * @param bufferOffset		单个顶点的起始数据偏移量，从此处开始读取此属性。在上例中，位置数据的偏移量为 0，因为它是第一个属性；颜色的偏移量为 3，因为颜色属性跟在 3 个 32 位位置值之后。以 32 位为单位指定偏移量。
         * @param format			来自<code>Context3DVertexBufferFormat</code>类的值，指定此属性的数据类型。
         */
        setVertexBufferAt(index: number, bufferOffset: number, format: string): void;
    }
}
declare module feng3d {
    /**
     * Context3D可执行的数据缓存
     * @author feng 2014-6-9
     */
    abstract class Context3DBuffer {
        /** 3d缓存类型编号 */
        private _dataTypeId;
        /** 数据脏了 */
        protected _dataDirty: boolean;
        /** 更新回调函数 */
        protected _updateFunc: Function;
        /**
         * 创建一个Context3D可执行的数据缓存
         * @param dataTypeId 		数据缓存编号
         * @param updateFunc 		更新回调函数
         */
        constructor(dataTypeId: string, updateFunc: Function);
        /**
         * 使缓存无效
         */
        invalid(): void;
        /**
         * 运行更新回调函数
         */
        protected doUpdateFunc(): void;
        /**
         * 缓存类型编号
         */
        dataTypeId: string;
        /**
         * 执行Context3DBuffer
         * <p><b>注：</b>该函数为虚函数</p>
         *
         * @param context3D		3d环境
         *
         * @see me.feng3d.core.buffer.Context3DCache
         */
        abstract doBuffer(context3D: Context3D): any;
        /**
         * 字符串描述
         */
        toString(): string;
    }
}
declare module feng3d {
    /**
     * 混合因素缓存
     * @author feng 2014-8-28
     */
    class BlendFactorsBuffer extends Context3DBuffer {
        /** 用于与源颜色相乘的系数。默认为 Context3DBlendFactor.ONE。 */
        sourceFactor: string;
        /** 用于与目标颜色相乘的系数。默认为 Context3DBlendFactor.ZERO */
        destinationFactor: string;
        /**
         * 创建混合因素缓存
         * @param dataTypeId	数据缓存编号
         * @param updateFunc	更新回调函数
         */
        constructor(dataTypeId: string, updateFunc: Function);
        /**
         * 更新混合因素缓存
         * @param sourceFactor 用于与源颜色相乘的系数。默认为 Context3DBlendFactor.ONE。
         * @param destinationFactor 用于与目标颜色相乘的系数。默认为 Context3DBlendFactor.ZERO。
         * @see flash.display3D.Context3D
         * @see flash.display3D.Context3D.setBlendFactors
         */
        update(sourceFactor: string, destinationFactor: string): void;
        /**
         * 执行混合因素缓存
         * @param context3D		3d环境
         */
        doBuffer(context3D: Context3D): void;
    }
}
declare module feng3d {
    /**
     * 三角形剔除模式缓存
     * @author feng 2014-8-14
     */
    class CullingBuffer extends Context3DBuffer {
        /** 三角形剔除模式 */
        triangleFaceToCull: string;
        /**
         * 创建一个三角形剔除模式缓存
         * @param dataTypeId 		数据缓存编号
         * @param updateFunc 		更新回调函数
         */
        constructor(dataTypeId: string, updateFunc: Function);
        /**
         * @inheritDoc
         */
        doBuffer(context3D: Context3D): void;
        /**
         * 更新
         * @param triangleFaceToCull
         */
        update(triangleFaceToCull: string): void;
    }
}
declare module feng3d {
    /**
     * 深度测试缓存
     * @author feng 2014-8-28
     */
    class DepthTestBuffer extends Context3DBuffer {
        depthMask: boolean;
        passCompareMode: string;
        /**
         * 创建一个深度测试缓存
         * @param dataTypeId 		数据缓存编号
         * @param updateFunc 		更新回调函数
         */
        constructor(dataTypeId: string, updateFunc: Function);
        /**
         * @inheritDoc
         */
        doBuffer(context3D: Context3D): void;
        /**
         * 更新
         * @param depthMask
         * @param passCompareMode
         */
        update(depthMask: boolean, passCompareMode: string): void;
    }
}
declare module feng3d {
    /**
     * 索引缓存
     * @author feng 2014-8-21
     */
    class IndexBuffer extends Context3DBuffer {
        private _bufferItemDic;
        /** data 中索引的数量。 */
        count: number;
        /** 此 IndexBuffer3D 对象中的索引，要加载的第一个索引。不等于零的 startOffset 值可用于加载索引数据的子区域。 */
        _startOffset: number;
        /** 顶点索引的矢量。仅使用每个索引值的低 16 位。矢量的长度必须大于或等于 count。 */
        data: number[];
        /** 要在缓存区中存储的顶点数量。单个缓存区中的最大索引数为 524287。 */
        numIndices: number;
        firstIndex: number;
        numTriangles: number;
        /** 是否无效 */
        private dicInvalid;
        /** 缓存无效 */
        private bufferInvalid;
        /**
         * 创建一个索引缓存
         * @param dataTypeId 		数据缓存编号
         * @param updateFunc 		更新回调函数
         */
        constructor(dataTypeId: string, updateFunc: Function);
        /**
         * @inheritDoc
         */
        doBuffer(context3D: Context3D): void;
        /**
         * 销毁数据
         */
        dispose(): void;
        /**
         * 更新数据
         * @param data 顶点索引的矢量。仅使用每个索引值的低 16 位。矢量的长度必须大于或等于 count。
         * @param numIndices 要在缓存区中存储的顶点数量。单个缓存区中的最大索引数为 524287。
         * @param count data 中索引的数量。
         */
        update(data: number[], numIndices: number, count: number, firstIndex?: number, numTriangles?: number): void;
    }
}
declare module feng3d {
    /**
     * 渲染程序缓存
     * @author feng 2014-8-14
     */
    class ProgramBuffer extends Context3DBuffer {
        private bufferItemDic;
        vertexCode: string;
        fragmentCode: string;
        /** 是否无效 */
        private bufferInvalid;
        /** 使用到的数据寄存器 */
        dataRegisterDic: any;
        /**
         * 创建一个渲染程序缓存
         * @param dataTypeId 		数据缓存编号
         * @param updateFunc 		更新回调函数
         */
        constructor(dataTypeId: string, updateFunc: Function);
        /**
         * @inheritDoc
         */
        protected doUpdateFunc(): void;
        doBuffer(context3D: Context3D): void;
        update(vertexCode: string, fragmentCode: string): void;
    }
}
declare module feng3d {
    /**
     * Context3D关联寄存器的数据缓存
     * @author feng 2014-8-14
     */
    abstract class RegisterBuffer extends Context3DBuffer {
        /** 需要寄存器的个数 */
        numRegisters: number;
        /** 要设置的首个寄存器的索引 */
        firstRegister: number;
        /**
         * 创建寄存器数据缓存
         * @param dataTypeId 		数据编号
         * @param updateFunc 		数据更新回调函数
         */
        constructor(dataTypeId: string, updateFunc: Function);
    }
}
declare module feng3d {
    /**
     * 3d环境常量数据缓存
     * @author feng 2014-8-20
     */
    abstract class ConstantsBuffer extends RegisterBuffer {
        /**
         * 创建3d环境常量数据缓存
         * @param dataTypeId 		数据编号
         * @param updateFunc 		数据更新回调函数
         */
        constructor(dataTypeId: string, updateFunc: Function);
    }
}
declare module feng3d {
    /**
     * Context3D 片段字节数组常量数据缓存
     * @author feng 2014-8-20
     */
    class FCByteArrayBuffer extends ConstantsBuffer {
        private data;
        /**
         * 创建一个片段字节数组常量数据缓存
         * @param dataTypeId		数据编号
         * @param updateFunc		数据更新回调函数
         */
        constructor(dataTypeId: string, updateFunc: Function);
        /**
         * @inheritDoc
         */
        doBuffer(context3D: Context3D): void;
    }
}
declare module feng3d {
    /**
     * Context3D 片段矩阵常量数据缓存
     * @author feng 2014-8-20
     */
    class FCMatrixBuffer extends ConstantsBuffer {
        /** 静态矩阵数据 */
        matrix: Matrix3D;
        /** transposedMatrix 如果为 true，则将按颠倒顺序将矩阵条目复制到寄存器中。默认值为 false。 */
        transposedMatrix: boolean;
        /**
         * 创建片段矩阵常量数据缓存
         * @param dataTypeId 		数据编号
         * @param updateFunc 		数据更新回调函数
         */
        constructor(dataTypeId: string, updateFunc: Function);
        /**
         * @inheritDoc
         */
        doBuffer(context3D: Context3D): void;
        /**
         * 更新
         * @param matrix
         * @param transposedMatrix
         */
        update(matrix: Matrix3D, transposedMatrix?: boolean): void;
    }
}
declare module feng3d {
    /**
     * Context3D 片段向量常量数据缓存
     * @author feng 2014-8-20
     */
    class FCVectorBuffer extends ConstantsBuffer {
        /** 常量向量数据 */
        data: number[];
        /**
         * 创建片段向量常量数据缓存
         * @param dataTypeId 		数据编号
         * @param updateFunc 		数据更新回调函数
         */
        constructor(dataTypeId: string, updateFunc: Function);
        /**
         * @inheritDoc
         */
        doBuffer(context3D: Context3D): void;
        /**
         * 更新数据
         * @param data
         * @param numRegisters
         *
         */
        update(data: number[], numRegisters?: number): void;
    }
}
declare module feng3d {
    /**
     * Context3D 顶点字节数组常量数据缓存
     * @author feng 2014-8-20
     */
    class VCByteArrayBuffer extends ConstantsBuffer {
        private data;
        /**
         * 创建一个顶点字节数组常量数据缓存
         * @param dataTypeId		数据编号
         * @param updateFunc		数据更新回调函数
         */
        constructor(dataTypeId: string, updateFunc: Function);
        /**
         * @inheritDoc
         */
        doBuffer(context3D: Context3D): void;
    }
}
declare module feng3d {
    /**
     * Context3D 顶点矩阵常量数据缓存
     * @author feng 2014-8-20
     */
    class VCMatrixBuffer extends ConstantsBuffer {
        /** 静态矩阵数据 */
        matrix: Matrix3D;
        /** transposedMatrix 如果为 true，则将按颠倒顺序将矩阵条目复制到寄存器中。默认值为 false。 */
        transposedMatrix: boolean;
        /**
         * 创建顶点矩阵常量数据缓存
         * @param dataTypeId 		数据编号
         * @param updateFunc 		数据更新回调函数
         */
        constructor(dataTypeId: string, updateFunc: Function);
        /**
         * @inheritDoc
         */
        doBuffer(context3D: Context3D): void;
        /**
         * 更新数据
         * @param matrix					静态矩阵数据
         * @param transposedMatrix			如果为 true，则将按颠倒顺序将矩阵条目复制到寄存器中。默认值为 false。
         */
        update(matrix: Matrix3D, transposedMatrix?: boolean): void;
    }
}
declare module feng3d {
    /**
     * Context3D 顶点向量常量数据缓存
     * @author feng 2014-8-20
     */
    class VCVectorBuffer extends ConstantsBuffer {
        /** 静态向量数据 */
        data: number[];
        /**
         * 创建一个顶点向量常量数据缓存
         * @param dataTypeId		数据编号
         * @param updateFunc		数据更新回调函数
         */
        constructor(dataTypeId: string, updateFunc: Function);
        /**
         * @inheritDoc
         */
        doBuffer(context3D: Context3D): void;
        /**
         * 更新顶点常量数据
         * @param data				静态向量数据
         * @param numRegisters		需要寄存器的个数
         */
        update(data: number[], numRegisters?: number): void;
    }
}
declare module feng3d {
    /**
     * 纹理数组缓存（解决类似地形多纹理混合）
     * @author feng 2014-11-6
     */
    class FSArrayBuffer extends RegisterBuffer {
        /** 纹理数据 */
        textures: any[];
        /**
         * 创建纹理数组缓存
         * @param dataTypeId 数据编号
         * @param updateFunc 数据更新回调函数
         * @param textureFlags	取样参数回调函数
         */
        constructor(dataTypeId: string, updateFunc: Function);
        /**
         * @inheritDoc
         */
        doBuffer(context3D: Context3D): void;
        /**
         * 更新纹理
         * @param textures		纹理数组
         */
        update(textures: any[]): void;
    }
}
declare module feng3d {
    /**
     * 纹理缓存
     * @author feng 2014-8-14
     */
    class FSBuffer extends RegisterBuffer {
        /** 纹理数据 */
        texture: TextureProxyBase;
        /**
         * 创建纹理数据缓存
         * @param dataTypeId 	数据编号
         * @param updateFunc 	数据更新回调函数
         * @param textureFlags	取样参数回调函数
         */
        constructor(dataTypeId: string, updateFunc: Function);
        /**
         * @inheritDoc
         */
        doBuffer(context3D: Context3D): void;
        /**
         * 更新纹理数据
         * @param texture
         */
        update(texture: TextureProxyBase): void;
    }
}
declare module feng3d {
    /**
     * 输出纹理缓冲
     * @author feng 2015-6-3
     */
    class OCBuffer extends RegisterBuffer {
        /** 纹理数据 */
        texture: TextureProxyBase;
        private enableDepthAndStencil;
        private surfaceSelector;
        private _antiAlias;
        /**
         * 创建一个输出纹理缓冲
         * @param dataTypeId 		数据缓存编号
         * @param updateFunc 		更新回调函数
         */
        constructor(dataTypeId: string, updateFunc: Function);
        /**
         * @inheritDoc
         */
        doBuffer(context3D: Context3D): void;
        /**
         * 更新纹理数据
         * @param texture
         */
        update(texture: TextureProxyBase): void;
    }
}
declare module feng3d {
    /**
     * 顶点数据缓冲
     * @author feng 2014-8-14
     */
    class VABuffer extends RegisterBuffer {
        /**
         * 顶点数据缓冲格式数组
         */
        private static bufferFormats;
        /** 顶点数据缓存(真正的数据缓存) */
        dataBuffer: VADataBuffer;
        private _format;
        /**
         * 来自 Context3DVertexBufferFormat 类的值，指定此属性的数据类型。
         */
        format: string;
        /**
         * 创建顶点数据缓存
         * @param dataTypeId 数据编号
         * @param updateFunc 数据更新回调函数
         */
        constructor(dataTypeId: string, updateFunc: Function);
        /**
         * @inheritDoc
         */
        doBuffer(context3D: Context3D): void;
        /**
         * 更新数据
         * @param data 				顶点数据
         * @param numVertices 		要在缓存区中存储的顶点数量。单个缓存区中的最大顶点数为 65535。
         * @param data32PerVertex 	与每个顶点关联的 32 位（4 字节）数据值的数量。每个顶点的 32 位数据元素数量最多为 64 个（或 256 个字节）。请注意，顶点着色器程序在任何给定时间只能访问 8 个属性寄存器。使用 SetVertextBufferAt() 在顶点缓存区内选择属性。
         */
        update(data: number[], numVertices: number, data32PerVertex: number): void;
    }
}
declare module feng3d {
    var _bId: Context3DBufferID;
}
declare module feng3d {
    /**
     * 3d缓存类型
     * @author feng 2014-8-20
     */
    class Context3DBufferType {
        /**
         * 寄存器类型
         * @see me.feng3d.core.register.RegisterType
         */
        registerType: string;
        /**
         * 数据类型
         * @see me.feng3d.core.buffer.ConstantsDataType
         */
        dataType: string;
    }
}
declare module feng3d {
    /**
     * AGAL程序缓冲
     * @author feng 2014-8-20
     */
    class AGALProgram3DCache {
        /**
         * 实例字典
         */
        private static _instanceDic;
        /**
         * 字符串与二进制字典
         */
        private static shaderByteCodeDic;
        /**
         * 当前3D环境
         */
        private _context3D;
        /**
         * 字符串与程序字典
         */
        private _program3Ds;
        /**
         * 程序使用计数
         */
        private _usages;
        /**
         * 程序与字符串字典
         */
        private _keys;
        /**
         * 创建AGAL程序缓冲
         * @param context3D			3D环境
         */
        constructor(context3D: Context3D);
        /**
         * 获取AGAL程序缓冲实例
         * @param context3D			3D环境
         * @return					AGAL程序缓冲实例
         */
        static getInstance(context3D: Context3D): AGALProgram3DCache;
        /**
         * 销毁
         */
        dispose(): void;
        /**
         * 获取渲染程序
         * @param oldProgram3D			原来的渲染程序
         * @param vertexCode			顶点渲染代码
         * @param fragmentCode			片段渲染代码
         * @return						渲染程序
         */
        getProgram3D(oldProgram3D: Program3D, vertexCode: string, fragmentCode: string): Program3D;
        /**
         * 获取片段渲染二进制
         * @param fragmentCode		片段渲染代码
         * @return					片段渲染二进制
         */
        private getFragmentByteCode(fragmentCode);
        /**
         * 获取顶点渲染二进制
         * @param vertexCode		顶点渲染代码
         * @return 					顶点渲染二进制
         */
        private getVertexByteCode(vertexCode);
        /**
         * 过滤代码中的注释
         * @param code			渲染代码
         * @return				没有注释的渲染代码
         */
        private filterComment(code);
        /**
         * 释放渲染程序
         * @param program3D		被释放的渲染程序
         */
        freeProgram3D(program3D: Program3D): void;
        /**
         * 销毁渲染程序
         * @param key		渲染代码
         */
        private destroyProgram(key);
        /**
         * 获取渲染代码键值
         * @param vertexCode			顶点渲染代码
         * @param fragmentCode			片段渲染代码
         * @return						渲染代码键值
         */
        private getKey(vertexCode, fragmentCode);
    }
}
declare module feng3d {
    /**
     * 3D环境缓冲收集器
     * @author feng 2015-7-18
     */
    class Context3DBufferCollector {
        /** 根3D环境缓冲拥有者 */
        private _rootBufferOwner;
        /** 所有数据缓存 */
        private bufferDic;
        /**
         * 创建3D环境缓冲收集器
         * @bufferOwner		缓冲拥有者
         */
        constructor();
        /**
         * 根3D环境缓冲拥有者
         */
        private rootBufferOwner;
        /**
         * 添加子项缓存拥有者
         * @param childBufferOwner
         */
        addChildBufferOwner(childBufferOwner: Context3DBufferOwner): void;
        /**
         * 移除子项缓存拥有者
         * @param childBufferOwner
         */
        removeChildBufferOwner(childBufferOwner: Context3DBufferOwner): void;
        /**
         * 添加数据缓存
         * @param context3DDataBuffer 数据缓存
         */
        addDataBuffer(context3DDataBuffer: Context3DBuffer): void;
        /**
         * 移除数据缓存
         * @param dataTypeId 数据缓存类型编号
         */
        removeDataBuffer(context3DDataBuffer: Context3DBuffer): void;
        /**
         * 处理添加缓冲拥有者事件
         */
        private onAddChildContext3DBufferOwner(event);
        /**
         * 处理移除缓冲拥有者事件
         */
        private onRemoveChildContext3DBufferOwner(event);
        /**
         * 处理添加缓冲事件
         */
        private onAddContext3DBuffer(event);
        /**
         * 处理移除缓冲事件
         */
        private onRemoveContext3DBuffer(event);
        /**
         * 添加缓冲拥有者
         * @param bufferOwer		缓冲拥有者
         */
        private addContext3DBufferOwer(bufferOwer);
        /**
         * 移除缓冲拥有者
         * @param bufferOwer		缓冲拥有者
         */
        private removeContext3DBufferOwer(bufferOwer);
        /**
         * 销毁
         */
        dispose(): void;
    }
}
declare module feng3d {
    /**
     * 3D环境缓存类(方便调试与管理渲染操作)
     * @author feng 2014-6-6
     */
    class Context3DCache extends Context3DBufferCollector {
        /** 寄存器数据缓存 */
        private regBufferDic;
        /** 其他数据缓存 */
        otherBufferDic: {};
        /**
         * 运行寄存器缓冲列表
         */
        runRegBufferList: any[];
        /** 渲染程序缓存 */
        programBuffer: ProgramBuffer;
        /** 索引缓存 */
        indexBuffer: IndexBuffer;
        /**
         * 片段输出缓冲
         */
        ocBuffer: OCBuffer;
        /**
         * 数据寄存器字典
         */
        private _dataRegisterDic;
        /**
         * 渲染参数
         */
        shaderParams: ShaderParams;
        /**
         * 创建3D环境缓存类
         */
        constructor();
        /**
         * @inheritDoc
         */
        addDataBuffer(context3DDataBuffer: Context3DBuffer): void;
        /**
         * @inheritDoc
         */
        removeDataBuffer(context3DDataBuffer: Context3DBuffer): void;
        /**
         * 使用Context3D缓存绘制
         * <p>过程：渲染程序缓存（标记使用的寄存器数据缓存）-->寄存器数据缓存(标记使用的数据)-->其他缓存-->绘制三角形</p>
         * @param context3D				3d环境
         * @param renderIndex			渲染编号
         */
        render(context3D: Context3D, renderIndex?: number): void;
        /**
         * 使用到的数据寄存器
         */
        /**
         * @private
         */
        private dataRegisterDic;
        /**
         * 清理3D环境
         */
        private clearContext3D(context3D);
        /**
         * 映射寄存器
         */
        private mapRegister();
        /**
         * Fagal函数运行环境
         */
        private fagalRE;
    }
}
declare module feng3d {
    /**
     * 3d环境缓存类型管理者
     * @author feng 2014-9-3
     */
    class Context3DBufferTypeManager {
        private static NAME_REGEXP;
        /** 缓存类型字典 */
        private bufferTypeDic;
        private typeClassDic;
        /** 实例 */
        private static _instance;
        private static config;
        /**
         * 创建3d环境缓存类型管理者
         */
        constructor();
        /**
         * 3d环境缓存类型管理者实例
         */
        private static instance;
        /**
         * 获取或创建3d缓存类型
         * @param typeId 		3d缓存类型编号
         * @return				3d缓存类型实例
         */
        static getBufferType(typeId: string): Context3DBufferType;
        /**
         * 获取3d缓存类定义
         * @param typeId 		3d缓存类型编号
         * @return				3d缓存类定义
         */
        static getBufferClass(typeId: string): string | typeof BlendFactorsBuffer | typeof CullingBuffer | typeof DepthTestBuffer | typeof FCByteArrayBuffer | typeof FCMatrixBuffer | typeof FCVectorBuffer | typeof FSArrayBuffer | typeof FSBuffer | typeof IndexBuffer | typeof ProgramBuffer | typeof VABuffer | typeof VCByteArrayBuffer;
        /**
         * 获取或创建3d缓存类型
         * @param typeId 		3d缓存类型编号
         * @return				3d缓存类型实例
         */
        getBufferType(typeId: string): Context3DBufferType;
        /**
         * 获取3d缓存类定义
         * @param typeId 		3d缓存类型编号
         * @return				3d缓存类定义
         */
        getBufferClass(typeId: string): string | typeof BlendFactorsBuffer | typeof CullingBuffer | typeof DepthTestBuffer | typeof FCByteArrayBuffer | typeof FCMatrixBuffer | typeof FCVectorBuffer | typeof FSArrayBuffer | typeof FSBuffer | typeof IndexBuffer | typeof ProgramBuffer | typeof VABuffer | typeof VCByteArrayBuffer;
    }
}
declare module feng3d {
    /**
     * 寄存器数据类型
     * @author feng 2014-8-20
     */
    class RgisterDataType {
        /** 字节数组(ByteArray) */
        static BYTEARRAY: string;
        /** 向量(Vector) */
        static VECTOR: string;
        /** 矩阵（Matrix3D ） */
        static MATRIX: string;
        /**
         * 寄存器数组
         */
        static ARRAY: string;
    }
}
declare module feng3d {
    /**
     * 纹理缓存中心
     * @author feng 2014-8-14
     */
    class TextureCenter {
        /** 纹理字典 */
        private static textureDic;
        /**
         * 创建一个纹理缓存中心
         */
        constructor();
        /**
         * 获取纹理
         * @param context3D		3D环境
         * @param texture		纹理代理
         * @return				纹理
         */
        static getTexture(context3D: Context3D, texture: TextureProxyBase): TextureBase;
        /**
         * 获取纹理
         * @param context3D		3D环境
         * @param texture		纹理代理
         * @return				纹理
         */
        private static $getTexture(context3D, texture);
        /**
         * 创建纹理
         * @param context3D				3D环境
         * @param bitmapTexture			位图纹理代理
         * @return						纹理
         */
        private static createTexture(context3D, bitmapTexture);
        /**
         * 创建纹理
         * @param context3D				3D环境
         * @param renderTexture			渲染纹理代理
         * @return						纹理
         */
        private static createRenderTexture(context3D, renderTexture);
        /**
         * 创建立方体纹理
         * @param context3D				3D环境
         * @param bitmapTexture			位图立方体纹理代理
         * @return						立方体纹理
         */
        private static createCubeTexture(context3D, bitmapTexture);
        /**
         * 保存纹理缓存
         * @param texture				纹理代理
         * @param context3D				3D环境
         * @param textureBase			纹理
         */
        private static saveTextureBuffer(texture, context3D, textureBase);
    }
}
declare module feng3d {
    /**
     * 实体列表元素池
     * @author feng 2015-3-6
     */
    class EntityListItemPool {
        private _index;
        /**
         * 创建一个实体列表元素池
         */
        constructor();
        /**
         * 释放所有
         */
        freeAll(): void;
    }
}
declare module feng3d {
    /**
     * 可渲染元素链表（元素）
     * @author feng 2015-3-6
     */
    class RenderableListItem {
        /**
         * 指向下个可渲染列表元素
         */
        next: RenderableListItem;
        /**
         * 当前可渲染对象
         */
        renderable: IRenderable;
        /**
         * 材质编号
         */
        materialId: number;
        /**
         * 渲染顺序编号
         */
        renderOrderId: number;
        /**
         * Z索引
         */
        zIndex: number;
        /**
         * 渲染场景矩阵
         */
        renderSceneTransform: Matrix3D;
        /**
         * 创建一个可渲染列表
         */
        constructor();
    }
}
declare module feng3d {
    /**
     * 可渲染列表元素池
     * @author feng 2015-3-6
     */
    class RenderableListItemPool {
        private _pool;
        private _index;
        private _poolSize;
        /**
         * 创建可渲染列表元素池
         */
        constructor();
        /**
         * 获取 可渲染列表元
         */
        getItem(): RenderableListItem;
        /**
         * 释放所有
         */
        freeAll(): void;
    }
}
declare module feng3d {
    /**
     * 鼠标事件管理
     * @author feng 2014-4-29
     */
    class Mouse3DManager {
        /** 射线采集器(采集射线穿过场景中物体的列表) */
        private _mousePicker;
        /** 收集的鼠标事件列表 */
        private mouseEventList;
        /** 是否开启鼠标事件检测 */
        private mouseEventOpen;
        /** 当前相交数据 */
        private _collidingObject;
        /** 上次相交数据 */
        private _previousCollidingObject;
        /** 普通鼠标事件与3d鼠标事件对应关系 */
        private static eventMap;
        constructor();
        /**
         * 开启鼠标事件
         */
        enableMouseListeners(view: View3D): void;
        private onMouseOver(event);
        private onMouseOut(event);
        /**
         * 收集玩家触发的鼠标事件
         */
        private onMouseEvent(event);
        /**
         * 处理玩家触发的鼠标事件
         */
        fireMouseEvents(mouseRay3D: Ray3D, mouseCollisionEntitys: Entity[]): void;
        /**
         * 抛出所有3D鼠标事件
         * @param mouseEvent3DList
         */
        private dispatchAllEvent(mouseEvent3DList);
        /**
         * 创建3D鼠标事件
         * @param sourceEvent 2d鼠标事件
         * @param collider 碰撞信息
         * @return 3D鼠标事件
         */
        private createMouseEvent3D(sourceEventType, collider?);
    }
}
declare module feng3d {
    /**
     * The Stage3DManager class provides a multiton object that handles management for Stage3D objects. Stage3D objects
     * should not be requested directly, but are exposed by a Stage3DProxy.
     *
     * @see away3d.core.managers.Stage3DProxy
     */
    class Stage3DManager {
        private static _instances;
        private static _stageProxies;
        private static _numStageProxies;
        private _stage;
        /**
         * Creates a new Stage3DManager class.
         * @param stage The Stage object that contains the Stage3D objects to be managed.
         * @private
         */
        constructor(stage: Stage, stage3DManagerSingletonEnforcer: any);
        /**
         * Gets a Stage3DManager instance for the given Stage object.
         * @param stage The Stage object that contains the Stage3D objects to be managed.
         * @return The Stage3DManager instance for the given Stage object.
         */
        static getInstance(stage: Stage): Stage3DManager;
        /**
         * Requests the Stage3DProxy for the given index.
         * @param index The index of the requested Stage3D.
         * @param forceSoftware Whether to force software mode even if hardware acceleration is available.
         * @param profile The compatibility profile, an enumeration of Context3DProfile
         * @return The Stage3DProxy for the given index.
         */
        getStage3DProxy(index: number, forceSoftware?: boolean, profile?: string): Stage3DProxy;
        /**
         * Removes a Stage3DProxy from the manager.
         * @param stage3DProxy
         * @private
         */
        removeStage3DProxy(stage3DProxy: Stage3DProxy): void;
        /**
         * Get the next available stage3DProxy. An error is thrown if there are no Stage3DProxies available
         * @param forceSoftware Whether to force software mode even if hardware acceleration is available.
         * @param profile The compatibility profile, an enumeration of Context3DProfile
         * @return The allocated stage3DProxy
         */
        getFreeStage3DProxy(forceSoftware?: boolean, profile?: string): Stage3DProxy;
        /**
         * Checks if a new stage3DProxy can be created and managed by the class.
         * @return true if there is one slot free for a new stage3DProxy
         */
        hasFreeStage3DProxy: boolean;
        /**
         * Returns the amount of stage3DProxy objects that can be created and managed by the class
         * @return the amount of free slots
         */
        numProxySlotsFree: number;
        /**
         * Returns the amount of Stage3DProxy objects currently managed by the class.
         * @return the amount of slots used
         */
        numProxySlotsUsed: number;
        /**
         * Returns the maximum amount of Stage3DProxy objects that can be managed by the class
         * @return the maximum amount of Stage3DProxy objects that can be managed by the class
         */
        numProxySlotsTotal: number;
    }
}
declare module feng3d {
    /**
     * 分区节点基类
     * @author feng 2015-3-8
     */
    class NodeBase {
        protected _childNodes: NodeBase[];
        protected _numChildNodes: number;
        protected _debugPrimitive: WireframePrimitiveBase;
        /**
         * 父分区节点
         */
        _parent: NodeBase;
        _numEntities: number;
        _collectionMark: number;
        /**
         * 创建一个分区节点基类
         */
        constructor();
        /**
         * 父分区节点
         */
        parent: NodeBase;
        /**
         * 是否显示调试边界
         */
        /**
         * @private
         */
        showDebugBounds: boolean;
        /**
         * 添加节点
         * @param node	节点
         */
        addNode(node: NodeBase): void;
        /**
         * 移除节点
         * @param node 节点
         */
        removeNode(node: NodeBase): void;
        /**
         * 为给定实体查找分区节点
         * @param entity		实体
         * @return 				实体所在分区节点
         */
        findPartitionForEntity(entity: Entity): NodeBase;
        /**
         * 接受横越者
         * @param traverser		访问节点的横越者
         */
        acceptTraverser(traverser: PartitionTraverser): void;
        /**
         * 创建调试边界
         */
        protected createDebugBounds(): WireframePrimitiveBase;
        /**
         * 更新多个实体
         * @param value 数量
         */
        protected updateNumEntities(value: number): void;
        /**
         * 测试是否出现在摄像机视锥体内
         * @param planes		视锥体面向量
         * @param numPlanes		面数
         * @return 				true：在视锥体内
         */
        isInFrustum(planes: Plane3D[], numPlanes: number): boolean;
    }
}
declare module feng3d {
    /**
     * 实体分区节点
     * @author feng 2015-3-8
     */
    class EntityNode extends NodeBase {
        /**
         * 节点中的实体
         */
        private _entity;
        /**
         * 指向队列中下个更新的实体分区节点
         */
        _updateQueueNext: EntityNode;
        /**
         * 创建一个实体分区节点
         * @param entity		实体
         */
        constructor(entity: Entity);
        /**
         * 从父节点中移除
         */
        removeFromParent(): void;
        /**
         * 实体
         */
        entity: Entity;
        /**
         * @inheritDoc
         */
        isInFrustum(planes: Plane3D[], numPlanes: number): boolean;
    }
}
declare module feng3d {
    /**
     * 摄像机分区节点
     * @author feng 2015-3-21
     */
    class CameraNode extends EntityNode {
        /**
         * 创建一个摄像机分区节点
         * @param camera		摄像机
         */
        constructor(camera: Camera3D);
        /**
         * @inheritDoc
         */
        acceptTraverser(traverser: PartitionTraverser): void;
    }
}
declare module feng3d {
    /**
     * 方向光分区节点
     * @author feng 2015-3-21
     */
    class DirectionalLightNode extends EntityNode {
        private _light;
        /**
         * 创建一个方向光分区节点
         * @param light 		方向光
         */
        constructor(light: DirectionalLight);
        /**
         * 方向光
         */
        light: DirectionalLight;
        /**
         * @inheritDoc
         */
        acceptTraverser(traverser: PartitionTraverser): void;
    }
}
declare module feng3d {
    /**
     * 网格分区节点
     * @author feng 2015-3-8
     */
    class MeshNode extends EntityNode {
        private _mesh;
        /**
         * 创建一个网格分区节点
         * @param mesh		网格
         */
        constructor(mesh: Mesh);
        /**
         * @inheritDoc
         */
        acceptTraverser(traverser: PartitionTraverser): void;
    }
}
declare module feng3d {
    /**
     * 点光源分区节点
     * @author feng 2015-3-23
     */
    class PointLightNode extends EntityNode {
        private _light;
        /**
         * 创建一个点光源分区节点
         * @param light		点光源
         */
        constructor(light: PointLight);
        /**
         * 点光源
         */
        light: PointLight;
        /**
         * @inheritDoc
         */
        acceptTraverser(traverser: PartitionTraverser): void;
    }
}
declare module feng3d {
    /**
     * RenderableNode is a space partitioning leaf node that contains any Entity that is itself a IRenderable
     * object. This excludes Mesh (since the renderable objects are its SubMesh children).
     */
    class RenderableNode extends EntityNode {
        private _renderable;
        /**
         * Creates a new RenderableNode object.
         * @param mesh The mesh to be contained in the node.
         */
        constructor(renderable: IRenderable);
        /**
         * @inheritDoc
         */
        acceptTraverser(traverser: PartitionTraverser): void;
    }
}
declare module feng3d {
    /**
     * 天空盒分区节点
     * @author feng 2015-3-8
     */
    class SkyBoxNode extends EntityNode {
        private _skyBox;
        /**
         * 创建SkyBoxNode实例
         * @param skyBox		天空盒实例
         */
        constructor(skyBox: SkyBox);
        /**
         * @inheritDoc
         */
        acceptTraverser(traverser: PartitionTraverser): void;
        /**
         * @inheritDoc
         */
        isInFrustum(planes: Plane3D[], numPlanes: number): boolean;
    }
}
declare module feng3d {
    /**
     * 空分区节点
     * @author feng 2015-3-9
     */
    class NullNode extends NodeBase {
        /**
         * 创建一个空分区节点
         */
        constructor();
    }
}
declare module feng3d {
    /**
     * 3D空间分区
     * <p>用于把3D空间分区，便于搜索出有必要渲染的对象，从而优化性能</p>
     * @author feng 2015-3-5
     */
    class Partition3D {
        /**
         * 分区根节点
         */
        protected _rootNode: NodeBase;
        /**
         * 待更新链表脏标记，true表示需要更新
         */
        private _updatesMade;
        /**
         * 待更新链表
         */
        private _updateQueue;
        /**
         * 创建一个3D空间分区
         * @param rootNode	根节点
         */
        constructor(rootNode: NodeBase);
        /**
         * 发送一个横越者穿过分区
         * @param traverser		横越者
         */
        traverse(traverser: PartitionTraverser): void;
        /**
         * 从分区树种移除实体
         * @param entity 被移除实体
         */
        removeEntity(entity: Entity): void;
        /**
         * 标记为待更新节点，把新节点添加到待更新节点链表表头
         * @param entity	更新的实体
         */
        markForUpdate(entity: Entity): void;
        /**
         * 更新待更新节点中的实体
         */
        private updateEntities();
    }
}
declare module feng3d {
    /**
     *
     * @author feng 2014-4-30
     */
    interface IPickingCollider {
        /**
         * 设置本地射线
         * @param ray3D		射线
         */
        setLocalRay(ray3D: Ray3D): any;
        /**
         * 测试几何体的碰撞
         * @param subMesh 						被检测网格
         * @param pickingCollisionVO 			碰撞数据
         * @param shortestCollisionDistance 	最短碰撞距离
         * @param bothSides 					是否三角形双面判定
         * @return 								是否碰撞
         */
        testSubMeshCollision(subMesh: SubMesh, pickingCollisionVO: PickingCollisionVO, shortestCollisionDistance: number, bothSides: boolean): boolean;
    }
}
declare module feng3d {
    /**
     *
     * @author feng 2014-4-30
     */
    class PickingColliderBase {
        protected ray3D: Ray3D;
        constructor();
        /**
         * 获取碰撞法线
         * @param indexData 顶点索引数据
         * @param vertexData 顶点数据
         * @param triangleIndex 三角形索引
         * @param normal 碰撞法线
         * @return 碰撞法线
         *
         */
        protected getCollisionNormal(indexData: number[], vertexData: number[], triangleIndex: number, normal?: Vector3D): Vector3D;
        /**
         * 获取碰撞uv
         * @param indexData 顶点数据
         * @param uvData uv数据
         * @param triangleIndex 三角形所有
         * @param v
         * @param w
         * @param u
         * @param uvOffset
         * @param uvStride
         * @param uv uv坐标
         * @return 碰撞uv
         */
        protected getCollisionUV(indexData: number[], uvData: number[], triangleIndex: number, v: number, w: number, u: number, uvOffset: number, uvStride: number, uv?: Point): Point;
        /**
         * 设置碰撞射线
         */
        setLocalRay(ray3D: Ray3D): void;
    }
}
declare module feng3d {
    /**
     * 使用纯AS3计算与实体相交
     */
    class AS3PickingCollider extends PickingColliderBase implements IPickingCollider {
        /** 是否查找最短距离碰撞 */
        private _findClosestCollision;
        /**
         * 创建一个AS碰撞检测器
         * @param findClosestCollision 是否查找最短距离碰撞
         */
        constructor(findClosestCollision?: boolean);
        testSubMeshCollision(subMesh: SubMesh, pickingCollisionVO: PickingCollisionVO, shortestCollisionDistance: number, bothSides?: boolean): boolean;
    }
}
declare module feng3d {
    /**
     * 定义检测相交的工具类
     * @author feng 2014-4-30
     */
    class PickingColliderType {
        /**
         * Default null collider that forces picker to only use entity bounds for hit calculations on an Entity
         */
        static BOUNDS_ONLY: IPickingCollider;
        /**
         * 使用纯AS3计算与实体相交
         */
        static AS3_BEST_HIT: IPickingCollider;
    }
}
declare module feng3d {
    /**
     * 采集的碰撞数据
     * @author feng 2014-4-29
     */
    class PickingCollisionVO {
        /**
         * 第一个穿过的物体
         */
        firstEntity: Entity;
        /**
         * 碰撞的uv坐标
         */
        uv: Point;
        /**
         * 实体上碰撞本地坐标
         */
        localPosition: Vector3D;
        /**
         * 射线顶点到实体的距离
         */
        rayEntryDistance: number;
        /**
         * 本地坐标系射线
         */
        localRay: Ray3D;
        /**
         * 本地坐标碰撞法线
         */
        localNormal: Vector3D;
        /**
         * 场景中碰撞射线
         */
        ray3D: Ray3D;
        /**
         * 射线坐标是否在边界内
         */
        rayOriginIsInsideBounds: boolean;
        /**
         * 碰撞三角形索引
         */
        index: number;
        /**
         * 碰撞关联的渲染对象
         */
        renderable: IRenderable;
        /**
         * 创建射线拾取碰撞数据
         * @param entity
         */
        constructor(entity: Entity);
        /**
         * 实体上碰撞世界坐标
         */
        scenePosition: Vector3D;
    }
}
declare module feng3d {
    /**
     * 光线投射采集
     * @author feng 2014-4-29
     */
    class RaycastPicker {
        /** 是否需要寻找最接近的 */
        private _findClosestCollision;
        protected _entities: Entity[];
        /**
         *
         * @param findClosestCollision 是否需要寻找最接近的
         */
        constructor(findClosestCollision: boolean);
        /**
         * 获取射线穿过的实体
         * @param ray3D 射线
         * @param entitys 实体列表
         * @return
         */
        getViewCollision(ray3D: Ray3D, entitys: Entity[]): PickingCollisionVO;
        /**
         *获取射线穿过的实体
         */
        private getPickingCollisionVO();
        /**
         * 按与射线原点距离排序
         */
        private sortOnNearT(entity1, entity2);
        /**
         * 更新碰撞本地坐标
         * @param pickingCollisionVO
         */
        private updateLocalPosition(pickingCollisionVO);
    }
}
declare module feng3d {
    /**
     * 3D舞台代理
     */
    class Stage3DProxy extends EventDispatcher {
        private _frameEventDriver;
        private _context3D;
        private _stage3DIndex;
        private _usesSoftwareRendering;
        private _profile;
        private _stage3D;
        private _stage3DManager;
        private _backBufferWidth;
        private _backBufferHeight;
        private _antiAlias;
        private _backBufferEnableDepthAndStencil;
        private _contextRequested;
        private _scissorRect;
        private _backBufferDirty;
        private _viewPort;
        private _enterFrame;
        private _exitFrame;
        private _viewportUpdated;
        private _viewportDirty;
        private _bufferClear;
        private _color;
        /**
         * 创建一个3D舞台代理
         * @param stage3DIndex		被代理3D舞台编号
         * @param stage3D			被代理的3D舞台
         * @param stage3DManager	3D舞台管理类
         * @param forceSoftware		是否强制软件渲染
         * @param profile
         */
        constructor(stage3DIndex: number, stage3D: Stage3D, stage3DManager: Stage3DManager, forceSoftware?: boolean, profile?: string);
        /**
         * The background color of the Stage3D.
         */
        color: number;
        /**
         * 通知视窗发生变化
         */
        private notifyViewportUpdated();
        /**
         * 通知进入帧事件
         */
        private notifyEnterFrame();
        /**
         * 通知退出帧事件
         */
        private notifyExitFrame();
        /**
         * 释放3D舞台代理，同时释放3D舞台中的3D环境
         */
        dispose(): void;
        /**
         * 设置渲染缓冲区的视口尺寸和其他属性
         * @param backBufferWidth		缓冲区的宽度，以像素为单位。
         * @param backBufferHeight		缓冲区的高度，以像素为单位。
         * @param antiAlias				一个整数值，指定所请求的消除锯齿品质。该值与消除锯齿时使用的子实例的数量相关联。使用更多子实例要求执行更多的计算，尽管相对性能影响取决于特定的渲染硬件。消除锯齿的类型和是否执行消除锯齿操作取决于设备和渲染模式。软件渲染上下文完全不支持消除锯齿。
         */
        configureBackBuffer(backBufferWidth: number, backBufferHeight: number, antiAlias: number): void;
        /**
         * 清除与重置缓冲区
         */
        clear(): void;
        /**
         * 显示渲染缓冲
         */
        present(): void;
        /**
         * 添加事件侦听
         * @param type							事件的类型
         * @param listener						处理事件的侦听器函数
         * @param useCapture					确定侦听器是运行于捕获阶段还是运行于目标和冒泡阶段
         * @param priority						事件侦听器的优先级。优先级由一个带符号的 32 位整数指定。数字越大，优先级越高。优先级为 n 的所有侦听器会在优先级为 n -1 的侦听器之前得到处理。如果两个或更多个侦听器共享相同的优先级，则按照它们的添加顺序进行处理。默认优先级为 0。
         * @param useWeakReference				确定对侦听器的引用是强引用，还是弱引用。强引用（默认值）可防止您的侦听器被当作垃圾回收。弱引用则没有此作用。
         */
        addEventListener(type: string, listener: Function, priority?: number, useWeakReference?: boolean): void;
        /**
         * 移除事件侦听
         * @param type				事件的类型
         * @param listener			要删除的侦听器函数
         * @param useCapture		指出是为捕获阶段还是为目标和冒泡阶段注册了侦听器。如果为捕获阶段以及目标和冒泡阶段注册了侦听器，则需要对 removeEventListener() 进行两次调用才能将这两个侦听器删除，一次调用将 useCapture() 设置为 true，另一次调用将 useCapture() 设置为 false。
         */
        removeEventListener(type: string, listener: Function): void;
        /**
         * 裁剪矩形
         */
        scissorRect: Rectangle;
        /**
         * 3D舞台编号
         */
        stage3DIndex: number;
        /**
         * 3D舞台
         */
        stage3D: Stage3D;
        /**
         * 3D环境
         */
        context3D: Context3D;
        /**
         * 驱动信息
         */
        driverInfo: string;
        /**
         * 是否在软件模式渲染
         */
        usesSoftwareRendering: boolean;
        /**
         * 3D舞台X坐标
         */
        x: number;
        /**
         * 3D舞台Y坐标
         */
        y: number;
        /**
         * 3D舞台宽度
         */
        width: number;
        /**
         * 3D舞台高度
         */
        height: number;
        /**
         * 抗锯齿值
         */
        antiAlias: number;
        /**
         * 视窗矩形
         */
        viewPort: Rectangle;
        /**
         * 是否可见
         */
        visible: boolean;
        /**
         * 缓冲区清理状态
         */
        bufferClear: boolean;
        /**
         * 释放3D环境
         */
        private freeContext3D();
        /**
         * 处理3D环境变化事件
         */
        private onContext3DUpdate(event);
        /**
         * 请求3D环境
         */
        private requestContext(forceSoftware?, profile?);
        /**
         * 处理进入帧事件
         */
        private onEnterFrame(event);
        /**
         *	判断3D环境是否可用
         */
        recoverFromDisposal(): boolean;
    }
}
declare module feng3d {
    /**
     * 寄存器(链表)
     * @author feng 2014-6-9
     */
    class Register implements IRegister {
        /**
         * 输出寄存器名称
         */
        static NAME: string;
        /**
         * 输出寄存器值
         */
        static VALUE: string;
        /**
         * 寄存器输出方式
         */
        static TO_STRING: string;
        /**
         * 寄存器中元素数组
         */
        private static COMPONENTS;
        protected _regType: string;
        protected _index: number;
        private _regId;
        /** 描述 */
        description: string;
        valueString: string;
        nameString: string;
        /**
         * 寄存器编号
         */
        index: number;
        /** 寄存器id */
        regId: string;
        regType: string;
        /**
         * 创建一个寄存器
         * @param regId			寄存器id
         */
        constructor(regId: string);
        /**
         * 初始化
         */
        private init();
        /**
         * @inheritDoc
         */
        toString(): string;
        /**
         * 寄存器分量
         * @param component 分量编号
         * @return 寄存器分量
         */
        c(component: number): RegisterComponent;
        /**
         * 获取寄存器分量
         * @param name 分量名称
         * @return
         */
        getProperty(name: any): RegisterComponent | RegisterComponentSelection;
        /**
         * @inheritDoc
         */
        callProperty(name: any, ...parameters: any[]): any;
        /**
         * @inheritDoc
         */
        desc: string;
        /**
         * @inheritDoc
         */
        regLen: number;
        /**
         * 清理寄存器值
         */
        clear(): void;
    }
}
declare module feng3d {
    /**
     * 寄存器数组
     * @author feng 2014-11-4
     */
    class RegisterArray extends Register {
        private _regs;
        /**
         * 创建一个寄存器数组
         * @param regId		寄存器id
         */
        constructor(regId: string);
        /**
         * 第一个寄存器
         */
        first: Register;
        /**
         * 最后一个寄存器
         */
        last: Register;
        /**
         * 获取寄存器链表中的元素
         * @param $index 链表中的位置
         * @return 寄存器
         */
        getReg($index: number): Register;
        /**
         * 获取寄存器数组中的寄存器
         * @param args 索引信息
         * @return
         */
        getReg1(...args: any[]): Register;
        /**
         * @inheritDoc
         */
        regLen: number;
        /**
         * @inheritDoc
         */
        clear(): void;
    }
}
declare module feng3d {
    /**
     * 寄存器矩阵
     * @author feng 2014-11-4
     */
    class RegisterMatrix extends RegisterArray {
        /**
         *
         * @param regId
         */
        constructor(regId: string);
        /**
         * @inheritDoc
         */
        clear(): void;
    }
}
declare module feng3d {
    /**
     * 寄存器数组元素
     * @author feng 2014-11-3
     */
    class RegisterArrayItem extends Register {
        /**
         * 数组编号
         */
        protected _arrayIndex: number;
        protected _registerArray: RegisterArray;
        /**
         * 创建一个寄存器数组元素
         * @param registerArray			所属寄存器数组
         * @param arrayIndex			所在寄存器数组中的索引
         */
        constructor(registerArray: RegisterArray, arrayIndex: number);
        toString(): string;
    }
}
declare module feng3d {
    /**
     * 寄存器数组复杂元素
     * @author feng 2014-11-3
     */
    class RegisterArrayComplexItem extends RegisterArrayItem {
        private _complexArgs;
        /**
         * 创建一个寄存器数组复杂元素
         * @param registerArray			所属寄存器数组
         * @param complexArgs			复杂参数（用来计算所在寄存器数组中的索引值）
         * @param arrayIndex			起始索引值
         */
        constructor(registerArray: RegisterArray, complexArgs: any[], startIndex: number);
        /**
         * 复杂参数（用来计算所在寄存器数组中的索引值）
         */
        complexArgs: any[];
        /**
         * @inheritDoc
         */
        toString(): string;
    }
}
declare module feng3d {
    /**
     * 寄存器池
     * @author feng 2014-6-9
     */
    class RegisterPool {
        private _regType;
        private _regCount;
        /** 使用中的寄存器数组 */
        private usedRegisters;
        /**
         * 创建寄存器池
         * @param regType 寄存器类型
         * @param regCount 寄存器总数
         */
        constructor(regType: string, regCount: number);
        /**
         * 寄存器总数
         */
        regCount: number;
        /**
         * 寄存器类型
         */
        regType: string;
        /**
         * 初始化
         */
        private init();
        /**
         * 获取寄存器
         * @param num 寄存器个数
         */
        requestFreeRegisters(num: number): RegisterValue;
        /**
         * 移除使用寄存器
         * @param register 寄存器
         */
        removeUsage(register: Register): void;
        /**
         * 销毁
         */
        dispose(): void;
        /**
         * 重置
         */
        reset(): void;
        /**
         * 寻找连续可用寄存器编号
         * @param num 个数
         * @return 如果找到返回非负值，未找到返回-1
         */
        private find(num?);
    }
}
declare module feng3d {
    /**
     * 寄存器类型
     * @author feng 2014-6-9
     */
    class RegisterType {
        /** 顶点属性寄存器 */
        static VA: string;
        /** 顶点程序常量寄存器 */
        static VC: string;
        /** 顶点临时寄存器 */
        static VT: string;
        /** 顶点程序输出寄存器 */
        static OP: string;
        /**变量寄存器 */
        static V: string;
        /** 片段程序的纹理寄存器 */
        static FS: string;
        /** 片段程序常量寄存器 */
        static FC: string;
        /** 片段程序临时寄存器 */
        static FT: string;
        /** 片段程序输出寄存器 */
        static OC: string;
        /**
         * 是否常量
         * @param regType		寄存器类型
         */
        static isConst(regType: string): boolean;
        /**
         * 是否临时变量
         * @param regType		寄存器类型
         */
        static isTemp(regType: string): boolean;
        /**
         * 是否只读
         * @param regType		寄存器类型
         * @return
         */
        static isReadOnly(regType: string): boolean;
        /**
         * 是否可以在顶点寄存器中出现
         * @param regType		寄存器类型
         * @return
         */
        static inVertex(regType: string): boolean;
        /**
         * 是否可以在片段寄存器中出现
         * @param regType		寄存器类型
         * @return
         */
        static inFragment(regType: string): boolean;
        /**
         * 是否为输入数据寄存器
         * @param regType		寄存器类型
         * @return
         */
        static isInputDataRegister(regType: string): boolean;
    }
}
declare module feng3d {
    /**
     * 寄存器值
     * @author feng 2015-7-30
     */
    class RegisterValue {
        /**
         * 数据类型编号
         */
        dataTypeId: string;
        /**
         * 寄存器类型
         */
        regType: string;
        /**
         * 寄存器索引
         */
        index: number;
        /**
         * 寄存器长度
         */
        length: number;
        /**
         * 输出为字符串
         */
        toString(): string;
    }
}
declare module feng3d {
    /**
     * 渲染寄存器缓存
     * @author feng 2014-6-5
     */
    class ShaderRegisterCache {
        private static _instance;
        /** 脏标记 */
        private static _dirty;
        /** 数据寄存器缓存 */
        private _dataRegisterDic;
        /** 使用到的寄存器个数 */
        private usedDataRegisterNum;
        /** 寄存器池字典 */
        private registerPoolDic;
        /**
         * AGAL2寄存器配置
         */
        private static registerConfig;
        /**
         * 创建渲染寄存器缓存
         */
        constructor();
        /**
         * 初始化
         */
        private init();
        /**
         * 重置
         */
        private reset();
        /**
         * 回收不需要再使用的临时寄存器
         * @param register 不需要再使用的临时寄存器
         */
        removeTempUsage(dataTypeId: string): void;
        /**
         * 申请数据寄存器
         * @param dataType 数据类型
         * @param numRegister 寄存器的个数(默认1个)
         * @return 数据寄存器
         */
        requestRegister(dataTypeId: string): void;
        /**
         * 是否存在 dataType 类型寄存器
         * @param dataType 数据类型
         * @return
         */
        hasReg(dataType: string): boolean;
        /**
         * 注销
         */
        dispose(): void;
        /**
         * 实例
         */
        static instance: ShaderRegisterCache;
        /**
         * 使缓存失效
         */
        static invalid(): void;
        /**
         * 数据寄存器缓存
         */
        dataRegisterDic: any;
    }
}
declare module feng3d {
    /**
     * 渲染器抽象基类
     * @author feng 2015-3-1
     */
    abstract class RendererBase {
        protected _backgroundR: number;
        protected _backgroundG: number;
        protected _backgroundB: number;
        protected _backgroundColor: number;
        protected _backgroundAlpha: number;
        protected _viewWidth: number;
        protected _viewHeight: number;
        /**
         * 渲染对象排序类
         */
        protected _renderableSorter: IEntitySorter;
        protected _textureRatioX: number;
        protected _textureRatioY: number;
        protected _shareContext: boolean;
        /**
         * 渲染编号
         */
        protected _renderIndex: number;
        /**
         * 创建一个渲染创新基类
         * @param renderToTexture		释放渲染到纹理
         */
        constructor(renderToTexture?: boolean);
        /**
         * 创建一个实体收集器
         */
        createEntityCollector(): EntityCollector;
        /**
         * 窗口宽度
         */
        viewWidth: number;
        /**
         * 窗口高度
         */
        viewHeight: number;
        /**
         * 背景颜色透明度部分
         */
        backgroundAlpha: number;
        /**
         * 背景颜色
         */
        backgroundColor: number;
        /**
         * Defers control of Context3D clear() and present() calls to Stage3DProxy, enabling multiple Stage3D frameworks
         * to share the same Context3D object.
         *
         * @private
         */
        shareContext: boolean;
        /**
         * 释放
         */
        dispose(): void;
        /**
         * 渲染潜在可见几何体到缓冲区或纹理
         * @param stage3DProxy			3D舞台代理
         * @param entityCollector 		实体收集器
         * @param target 				目标纹理，默认为null表示渲染到缓冲区
         */
        render(stage3DProxy: Stage3DProxy, entityCollector: EntityCollector, target?: TextureProxyBase): void;
        /**
         * 执行渲染
         * @param stage3DProxy			3D舞台代理
         * @param entityCollector		实体收集器
         * @param target				渲染目标
         */
        protected executeRender(stage3DProxy: Stage3DProxy, entityCollector: EntityCollector, target?: TextureProxyBase): void;
        /**
         * 绘制
         * @param stage3DProxy			3D舞台代理
         * @param entityCollector		实体收集器
         * @param target				渲染目标
         */
        protected abstract draw(stage3DProxy: Stage3DProxy, entityCollector: EntityCollector, target: TextureProxyBase): any;
    }
}
declare module feng3d {
    /**
     * 默认渲染器，使用根据材质渲染场景图
     * @author feng 2015-3-5
     */
    class DefaultRenderer extends RendererBase {
        private static SCREEN_PASSES;
        private static ALL_PASSES;
        private _activeMaterial;
        private _depthRenderer;
        private _planarShadowRenderer;
        /**
         * 是否使用平面阴影
         */
        static usePlanarShadow: boolean;
        /**
         * 创建一个默认渲染器
         */
        constructor();
        /**
         * @inheritDoc
         */
        protected executeRender(stage3DProxy: Stage3DProxy, entityCollector: EntityCollector, target?: TextureProxyBase): void;
        /**
         * @inheritDoc
         */
        protected draw(stage3DProxy: Stage3DProxy, entityCollector: EntityCollector, target: TextureProxyBase): void;
        /**
         * Draw the skybox if present.
         * @param entityCollector The EntityCollector containing all potentially visible information.
         */
        /**
         * 绘制天空盒
         * @param stage3DProxy				3D舞台代理
         * @param entityCollector			实体收集器
         *
         */
        private drawSkyBox(stage3DProxy, entityCollector);
        /**
         * 绘制可渲染列表
         * @param renderables 			可渲染列表
         * @param entityCollector 		实体收集器，包含所有潜在显示实体信息
         */
        private drawRenderables(stage3DProxy, item, entityCollector);
        /**
         * 更新灯光
         * @param stage3DProxy				3D场景代理
         * @param entityCollector			实体集合
         */
        private updateLights(stage3DProxy, entityCollector);
    }
}
declare module feng3d {
    /**
     * 深度渲染器
     * @author feng 2015-5-28
     */
    class DepthRenderer extends RendererBase {
        private _activeMaterial;
        /**
         * 创建一个深度渲染器
         */
        constructor();
        /**
         * @inheritDoc
         */
        protected draw(stage3DProxy: Stage3DProxy, entityCollector: EntityCollector, target: TextureProxyBase): void;
        /**
         * 绘制渲染列表
         * @param stage3DProxy			3D场景代理
         * @param item					渲染对象列表单元
         * @param entityCollector		实体集合
         * @param target				渲染目标
         */
        private drawRenderables(stage3DProxy, item, entityCollector, target);
    }
}
declare module feng3d {
    /**
     * 平面阴影渲染器
     * @author feng 2015-8-23
     */
    class PlanarShadowRenderer extends RendererBase {
        private _activeMaterial;
        /**
         * 创建一个深度渲染器
         */
        constructor();
        /**
         * @inheritDoc
         */
        protected executeRender(stage3DProxy: Stage3DProxy, entityCollector: EntityCollector, target?: TextureProxyBase): void;
        /**
         * @inheritDoc
         */
        protected draw(stage3DProxy: Stage3DProxy, entityCollector: EntityCollector, target: TextureProxyBase): void;
        /**
         * 绘制渲染列表
         * @param stage3DProxy			3D场景代理
         * @param item					渲染对象列表单元
         * @param entityCollector		实体集合
         * @param target				渲染目标
         */
        private drawRenderables(stage3DProxy, item, entityCollector, target);
    }
}
declare module feng3d {
    /**
     * 实体排序接口
     * <p>为优化渲染EntityCollector排序</p>
     * @author feng 2015-3-6
     */
    interface IEntitySorter {
        /**
         * 排序实体收集器中潜在显示对象
         * @param collector		实体收集器
         */
        sort(collector: EntityCollector): any;
    }
}
declare module feng3d {
    /**
     * 可渲染合并排序
     * <p>为了提升渲染性能，排序EntityCollector中潜在显示对象。</p>
     * <p>排序方式优先使用材质，其次是离摄像机的距离。不透明对象从前往后移，当对象需要混合的从后往前移，确保能够正确渲染。</p>
     * @author feng 2015-3-9
     */
    class RenderableMergeSort implements IEntitySorter {
        /**
         * 创建一个可渲染合并排序对象
         */
        constructor();
        /**
         * @inheritDoc
         */
        sort(collector: EntityCollector): void;
        /**
         * 合并按深度排序
         * @param head			可渲染链表（头元素）
         * @return				排好序的可渲染链表（头元素）
         */
        private mergeSortByDepth(head);
        /**
         * 合并按材质排序
         * @param head			可渲染链表（头元素）
         * @return				排好序的可渲染链表（头元素）
         */
        private mergeSortByMaterial(head);
    }
}
declare module feng3d {
    /**
     * 分区横越者
     * @author feng 2015-3-1
     */
    abstract class PartitionTraverser {
        /**
         * 3D场景
         */
        scene: Scene3D;
        /**
         * 进入点
         */
        _entryPoint: Vector3D;
        /**
         * 碰撞标记，避免多次检测
         */
        static _collectionMark: number;
        /**
         * 构建一个分区横越者
         */
        constructor();
        /**
         * 进入节点
         * <p>正在穿过节点，或者正在与该节点进行检测</p>
         * @param node 		被进入的节点
         * @return			true：需要进一步检测子节点
         */
        enterNode(node: NodeBase): boolean;
        /**
         * 应用天空盒
         * @param skyBox		天空盒
         */
        abstract applySkyBox(skyBox: SkyBox): any;
        /**
         * 应用渲染对象
         * @param renderable		被横越者通过的可渲染对象
         */
        abstract applyRenderable(renderable: IRenderable): any;
        /**
         * 应用方向光源
         * @param light		被横越者通过的方向光源
         */
        abstract applyDirectionalLight(light: DirectionalLight): any;
        /**
         * 应用点光源
         * @param light		被横越者通过的点光源
         */
        abstract applyPointLight(light: PointLight): any;
    }
}
declare module feng3d {
    /**
     * 实体收集器
     * <p>为场景分区收集所有场景图中被认为潜在显示对象</p>
     *
     * @see me.feng3d.core.partition.Partition3D
     * @see me.feng3d.entities.Entity
     *
     * @author feng 2015-3-1
     */
    class EntityCollector extends PartitionTraverser {
        protected _skyBox: SkyBox;
        protected _opaqueRenderableHead: RenderableListItem;
        protected _blendedRenderableHead: RenderableListItem;
        protected _renderableListItemPool: RenderableListItemPool;
        protected _entityListItemPool: EntityListItemPool;
        protected _lights: LightBase[];
        private _directionalLights;
        private _pointLights;
        protected _numLights: number;
        private _numDirectionalLights;
        private _numPointLights;
        protected _numTriangles: number;
        protected _numMouseEnableds: number;
        protected _camera: Camera3D;
        protected _cameraForward: Vector3D;
        private _customCullPlanes;
        private _cullPlanes;
        private _numCullPlanes;
        /**
         * 创建一个实体收集器
         */
        constructor();
        /**
         * 初始化
         */
        private init();
        /**
         * 清除
         */
        clear(): void;
        /**
         * 提供可见视锥体的摄像机
         */
        camera: Camera3D;
        /**
         * 视椎面
         */
        cullPlanes: Plane3D[];
        /**
         * 天空盒对象
         */
        skyBox: SkyBox;
        /**
         * 不透明渲染对象链表头
         */
        opaqueRenderableHead: RenderableListItem;
        /**
         * 透明渲染对象链表头
         */
        blendedRenderableHead: RenderableListItem;
        /**
         * 添加渲染对象到潜在显示对象中
         * @param renderable	可渲染对象
         */
        applyRenderable(renderable: IRenderable): void;
        /**
         * 判断节点是否出现在视锥体中
         * @param node 用于测试的节点
         */
        enterNode(node: NodeBase): boolean;
        /**
         * @inheritDoc
         */
        applySkyBox(skyBox: SkyBox): void;
        /**
         * @inheritDoc
         */
        applyDirectionalLight(light: DirectionalLight): void;
        /**
         * @inheritDoc
         */
        applyPointLight(light: PointLight): void;
        /**
         * 方向光列表
         */
        directionalLights: DirectionalLight[];
    }
}
declare module feng3d {
    /**
     * 阴影投射者集合
     * @author feng 2015-5-29
     */
    class ShadowCasterCollector extends EntityCollector {
        /**
         * 创建阴影投射者集合
         */
        constructor();
        /**
         * 应用可渲染对象
         * @param renderable		可渲染对象
         */
        applyRenderable(renderable: IRenderable): void;
    }
}
declare module feng3d {
    /**
     * 3d环境缓存调试工具类
     * @author feng 2014-9-9
     */
    class Context3DBufferDebug {
        /**
         * 创建3d环境缓存调试工具类
         */
        constructor();
        /**
         * 调试Context3DCache
         * @param context3DCache			3D环境缓冲
         * @return							调试信息
         */
        static debug(context3DCache: Context3DCache): any[];
        /**
         * 调试Context3DCache
         * @param context3DBuffer			3D环境缓冲
         * @return							调试信息
         */
        private static debugInfo(context3DBuffer);
        /**
         * 获取Context3DCache
         * @param obj				3D环境数据
         * @return					3D环境实例
         */
        static getContext3DCache(obj: Object): Context3DCache;
    }
}
declare module feng3d {
    /**
     * 调试配置
     * @author feng 2014-4-13
     */
    class Debug {
        /**
         * 是否开启AGAL调试
         */
        static agalDebug: boolean;
    }
}
declare module feng3d {
    /**
     *
     * @author feng 2015-12-30
     */
    class SegmentUtils {
        private LIMIT;
        /**
         * 数据缓存
         */
        protected _segmentSubGeometry: SegmentSubGeometry;
        private _indices;
        private _pointData0;
        private _pointData1;
        private _thicknessData;
        private _colorData;
        constructor();
        static getSegmentSubGeometrys(_segments: Segment[]): SegmentSubGeometry;
        getSegmentSubGeometry(_segments: Segment[]): SegmentSubGeometry;
        /**
         * 计算线段数据
         * @param segment 			线段数据
         * @param segmentIndex 		线段编号
         */
        private computeSegment(segment, segmentIndex);
    }
}
declare module feng3d {
    class AnimationSetError extends Error {
        constructor(message: string);
    }
}
declare module feng3d {
    /**
     * 3D舞台事件
     * @author feng 2015-3-5
     */
    class Stage3DEvent extends Event {
        /** 3D环境被创建事件 */
        static CONTEXT3D_CREATED: string;
        /** 3D环境被摧毁事件 */
        static CONTEXT3D_DISPOSED: string;
        /** 3D环境被重新创建事件 */
        static CONTEXT3D_RECREATED: string;
        /** 视窗有发生变化 */
        static VIEWPORT_UPDATED: string;
        /**
         * 构建一个3D舞台事件
         * @param type			事件的类型，可以作为 Event.type 访问。
         * @param bubbles		确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
         */
        constructor(type: string, bubbles?: boolean);
    }
}
declare module feng3d {
    /**
     *
     * @author feng 2015-9-25
     */
    function F_AlphaPremultiplied(): void;
}
declare module feng3d {
    /**
     * 环境光片段渲染程序
     * @author feng 2014-11-7
     */
    function F_Ambient(): void;
}
declare module feng3d {
    /**
     * blinn-phong half vector model
     * @author feng 2015-9-24
     */
    function F_Blinn_Phong(singleSpecularColorReg: any, lightDirReg: Register): void;
}
declare module feng3d {
    /**
     * 发布漫反射光
     * @author feng 2014-11-7
     */
    function F_DiffusePostLighting(): void;
}
declare module feng3d {
    /**
     * 方向光渲染函数
     * @author feng 2014-11-7
     */
    function F_DirectionalLight(): void;
}
declare module feng3d {
    /**
     * phong model
     * @author feng 2015-9-24
     */
    function F_Phong(singleSpecularColorReg: any, lightDirReg: any): void;
}
declare module feng3d {
    /**
     * 点光源渲染
     * @author feng 2014-11-8
     */
    function F_PointLight(): void;
}
declare module feng3d {
    /**
     * 结算镜面反射光
     * @author feng 2014-11-7
     */
    function F_SpecularPostLighting(): void;
}
declare module feng3d {
    /**
     *
     * @author feng 2015-9-24
     */
    class SpecularModelType {
        static BLINN_PHONG: string;
        static PHONG: string;
    }
}
declare module feng3d {
    /**
     * 处理
     * @author feng 2015-4-24
     */
    function getDiffCodePerLight(lightDirReg: any, diffuseColorReg: Register): void;
}
declare module feng3d {
    /**
     * 计算单个镜面反射光
     * @author feng 2015-4-24
     */
    function getSpecCodePerLight(lightDirReg: any, specularColorReg: any): void;
}
declare module feng3d {
    /**
     *
     * @author feng 2015-9-24
     */
    function F_FresnelSpecular(target: any): void;
}
declare module feng3d {
    /**
     *
     * @author feng 2015-1-21
     */
    function F_ParticleColorCombination(): void;
}
declare module feng3d {
    /**
     * 粒子片段渲染程序
     * @author feng 2015-1-21
     */
    function F_Particles(): void;
}
declare module feng3d {
    /**
     * 编译阴影映射片段程序
     * @author feng 2015-6-23
     */
    function F_ShadowMap(): void;
}
declare module feng3d {
    /**
     * 阴影图采样比较计算阴影值
     * @author feng 2015-7-17
     */
    function F_ShadowMapSample(): void;
}
declare module feng3d {
    /**
     * 漫反射材质颜色
     * @author feng 2014-11-6
     */
    function F_DiffuseColor(): void;
}
declare module feng3d {
    /**
     * 漫反射纹理取样
     * @author feng 2014-11-6
     */
    function F_DiffuseTexure(): void;
}
declare module feng3d {
    /**
     *
     * @author feng 2015-9-5
     */
    function F_EnvMapMethod(): void;
}
declare module feng3d {
    /**
     * 最终颜色输出函数
     * @author feng 2014-11-7
     */
    function F_FinalOut(): void;
}
declare module feng3d {
    /**
     * 雾片段着色器
     * @author feng 2015-8-27
     */
    function F_Fog(): void;
}
declare module feng3d {
    /**
     * 法线取样函数
     * @author feng 2014-10-23
     */
    function F_NormalSample(): void;
}
declare module feng3d {
    /**
     * 光泽图取样函数
     * @author feng 2014-10-23
     */
    function F_SpecularSample(): void;
}
declare module feng3d {
    /**
     * 编译切线法线贴图片段程序
     * @author feng 2014-11-7
     */
    function F_TangentNormalMap(): void;
}
declare module feng3d {
    /**
     * 编译切线片段程序(无法线图)
     * @author feng 2014-11-7
     */
    function F_TangentNormalNoMap(): void;
}
declare module feng3d {
    /**
     * 地形渲染函数
     * @author feng 2014-11-6
     */
    function F_TerrainDiffusePostLighting(): void;
}
declare module feng3d {
    /**
     * 视线片段渲染函数
     * @author feng 2014-11-7
     */
    function F_ViewDir(): void;
}
declare module feng3d {
    /**
     * Fagal函数
     * @author feng 2014-10-23
     */
    abstract class FagalMethod {
        protected _shaderType: string;
        /**
         * 构建一个Fagal函数
         */
        constructor();
        /**
         * 渲染参数
         */
        shaderParams: ShaderParams;
        /**
         * 着色器类型
         */
        shaderType: string;
        /**
         * 运行函数，产生agal代码，最核心部分
         */
        abstract runFunc(): any;
    }
}
declare module feng3d {
    /**
     * 深度图片段主程序
     * @author feng 2015-5-30
     */
    class F_Main_DepthMap extends FagalMethod {
        /**
         * 创建深度图片段主程序
         */
        constructor();
        /**
         * @inheritDoc
         */
        runFunc(): void;
    }
}
declare module feng3d {
    /**
     * 深度图片段主程序
     * @author feng 2015-5-30
     */
    class F_Main_PlanarShadow extends FagalMethod {
        /**
         * 创建深度图片段主程序
         */
        constructor();
        /**
         * @inheritDoc
         */
        runFunc(): void;
    }
}
declare module feng3d {
    /**
     * 片段渲染程序主入口
     * @author feng 2014-10-30
     */
    class F_Main extends FagalMethod {
        /**
         * 创建片段渲染程序主入口
         */
        constructor();
        /**
         * @inheritDoc
         */
        runFunc(): void;
    }
}
declare module feng3d {
    /**
     * 线段片段渲染程序
     * @author feng 2014-10-28
     */
    class F_Segment extends FagalMethod {
        constructor();
        runFunc(): void;
    }
}
declare module feng3d {
    /**
     * 天空盒片段渲染程序
     * @author feng 2014-11-4
     */
    class F_SkyBox extends FagalMethod {
        constructor();
        runFunc(): void;
    }
}
declare module feng3d {
    /**
     * 深度图顶点主程序
     * @author feng 2015-5-30
     */
    class V_Main_DepthMap extends FagalMethod {
        /**
         * 构建 深度图顶点主程序
         */
        constructor();
        /**
         * @inheritDoc
         */
        runFunc(): void;
        /**
         * 生成动画代码
         */
        protected buildAnimationAGAL(): void;
    }
}
declare module feng3d {
    /**
     * 平面阴影顶点主程序
     * @author feng 2015-5-30
     */
    class V_Main_PlanarShadow extends FagalMethod {
        /**
         * 构建 深度图顶点主程序
         */
        constructor();
        /**
         * @inheritDoc
         */
        runFunc(): void;
        /**
         * 生成动画代码
         */
        protected buildAnimationAGAL(): void;
    }
}
declare module feng3d {
    /**
     * 顶点渲染程序主入口
     * @author feng 2014-10-30
     */
    class V_Main extends FagalMethod {
        /**
         * 创建顶点渲染程序主入口
         *
         */
        constructor();
        /**
         * @inheritDoc
         */
        runFunc(): void;
        /**
         * 生成动画代码
         */
        protected buildPositionAnimationAGAL(): void;
    }
}
declare module feng3d {
    /**
     * 线段顶点渲染程序
     * @author feng 2014-10-28
     */
    class V_Segment extends FagalMethod {
        constructor();
        runFunc(): void;
    }
}
declare module feng3d {
    /**
     * 天空盒顶点渲染程序
     * @author feng 2014-11-4
     */
    class V_SkyBox extends FagalMethod {
        constructor();
        runFunc(): void;
    }
}
declare module feng3d {
    /**
     * 骨骼动画渲染程序(CPU)
     * @author feng 2014-11-3
     */
    function V_SkeletonAnimationCPU(): void;
}
declare module feng3d {
    /**
     * 骨骼动画渲染程序(GPU)
     * @author feng 2014-11-3
     */
    function V_SkeletonAnimationGPU(): Register;
}
declare module feng3d {
    /**
     * Sprite动画顶点渲染程序
     * @author feng 2015-9-5
     */
    function V_SpriteSheetAnimation(UVSource: Register, UVTarget: Register): void;
}
declare module feng3d {
    /**
     * UV动画顶点渲染程序
     * @author feng 2015-9-5
     */
    function V_UVAnimation(UVSource: Register, UVTarget: Register): void;
}
declare module feng3d {
    /**
     * 顶点动画渲染程序(CPU)
     * @author feng 2014-11-3
     */
    function V_VertexAnimationCPU(): void;
}
declare module feng3d {
    /**
     * 顶点动画渲染程序(GPU)
     * @author feng 2014-11-3
     */
    function V_VertexAnimationGPU(): void;
}
declare module feng3d {
    /**
     * 粒子广告牌节点顶点渲染程序
     * @param particleBillboardMtx			广告牌旋转矩阵(3个长度向量形式)
     * @param animatedPosition				动画后的顶点坐标数据
     * @author feng 2014-12-26
     */
    function V_ParticleBillboard(particleBillboardMtx: Register, animatedPosition: any): void;
}
declare module feng3d {
    /**
     * 粒子颜色变化结算顶点渲染程序
     * @param colorMulTarget			粒子颜色乘数因子，用于乘以纹理上的颜色值
     * @param colorAddTarget			粒子颜色偏移值，在片段渲染的最终颜色值上偏移
     * @param colorMulVary				粒子颜色乘数因子，用于乘以纹理上的颜色值
     * @param colorAddVary				粒子颜色偏移值，在片段渲染的最终颜色值上偏移
     * @author feng 2015-1-20
     */
    function V_ParticleColorEnd(colorMulTarget: Register, colorAddTarget: Register, colorMulVary: Register, colorAddVary: Register): void;
}
declare module feng3d {
    /**
     * 粒子颜色节点顶点渲染程序
     * @author feng 2015-1-20
     */
    function V_ParticleColorGlobal(startMultiplierValue: Register, deltaMultiplierValue: Register, startOffsetValue: Register, deltaOffsetValue: Register, inCycleTimeTemp: any, colorMulTarget: Register, colorAddTarget: Register): void;
}
declare module feng3d {
    /**
     * 粒子结算偏移坐标渲染程序
     * @param animatedPosition			动画后的顶点坐标数据
     * @param positionTemp				偏移坐标临时寄存器
     * @author feng 2014-12-26
     */
    function V_ParticlePositionEnd(animatedPosition: any, positionTemp: any): void;
}
declare module feng3d {
    /**
     * 粒子缩放节点顶点渲染程序
     * @param scaleRegister				粒子缩放常数数据
     * @param inCycleTimeTemp			粒子周期内时间临时寄存器
     * @param animatedPosition			动画后的顶点坐标数据
     * @author feng 2014-12-26
     */
    function V_ParticleScaleGlobal(scaleRegister: any, inCycleTimeTemp: any, animatedPosition: any): void;
}
declare module feng3d {
    /**
     * 粒子速度节点顶点渲染程序
     * @param particleVelocity			粒子速度数据
     * @param positionTemp				偏移坐标临时寄存器
     * @param inCycleTimeTemp			粒子周期内时间临时寄存器
     * @author feng 2014-12-26
     */
    function V_ParticleVelocity(particleVelocity: any, positionTemp: any, inCycleTimeTemp: any): void;
}
declare module feng3d {
    /**
     * 粒子速度节点顶点渲染程序
     * @param particleVelocity			粒子速度数据
     * @param positionTemp				偏移坐标临时寄存器
     * @param inCycleTimeTemp			粒子周期内时间临时寄存器
     * @author feng 2014-12-26
     */
    function V_ParticleVelocityGlobal(particleVelocity: any, positionTemp: any, inCycleTimeTemp: any): void;
}
declare module feng3d {
    /**
     * 粒子顶点渲染程序
     * @author feng 2014-11-14
     */
    function V_Particles(): void;
}
declare module feng3d {
    /**
     * 粒子初始化顶点渲染程序
     * @param positionTemp			偏移坐标临时寄存器
     * @param animatedPosition		动画后的顶点坐标数据
     * @param positionReg			顶点坐标数据
     * @param particleCommon		粒子常数数据[0,1,2,0]
     * @author feng 2014-12-26
     */
    function V_ParticlesInit(positionTemp: any, animatedPosition: Register, positionReg: Register, particleCommon: any): void;
}
declare module feng3d {
    /**
     * 粒子颜色初始化
     * @param particleCommon		粒子常数数据[0,1,2,0]
     * @param colorMulTarget		粒子颜色乘数因子，用于乘以纹理上的颜色值
     * @param colorAddTarget		粒子颜色偏移值，在片段渲染的最终颜色值上偏移
     * @author feng 2015-1-20
     */
    function V_ParticlesInitColor(particleCommon: any, colorMulTarget: Register, colorAddTarget: Register): void;
}
declare module feng3d {
    /**
     * 粒子时间节点顶点渲染程序
     * @author feng 2014-12-26
     */
    function V_ParticlesTime(particleCommon: any, animatedPosition: any, particleTimeVA: any, particleTimeVC: any, inCycleTimeTemp: any): void;
}
declare module feng3d {
    /**
     * 编译阴影映射顶点程序
     * @author feng 2015-6-23
     */
    function V_ShadowMap(): void;
}
declare module feng3d {
    /**
     * 方向光阴影映射
     * @author feng 2015-7-17
     */
    function V_ShadowMapPlanar(): void;
}
declare module feng3d {
    /**
     * 点光源阴影映射
     * @author feng 2015-7-17
     */
    function V_ShadowMapPoint(): void;
}
declare module feng3d {
    /**
     * 基础动画顶点渲染函数(无动画)
     * @author feng 2014-11-3
     */
    function V_BaseAnimation(): void;
}
declare module feng3d {
    /**
     * 基本顶点投影渲染
     * @author feng 2014-10-30
     */
    function V_BaseOut(): void;
}
declare module feng3d {
    /**
     * 编译切线顶点程序
     * @author feng 2014-11-7
     */
    function V_TangentNormalMap(): void;
}
declare module feng3d {
    /**
     * 编译切线顶点程序(无法线图)
     * @author feng 2014-11-7
     */
    function V_TangentNormalNoMap(): void;
}
declare module feng3d {
    /**
     * 视线顶点渲染函数
     * @author feng 2014-11-7
     */
    function V_ViewDir(): void;
}
declare module feng3d {
    /**
     * 顶点世界坐标渲染函数
     * @author feng 2014-11-7
     */
    function V_WorldPosition(): void;
}
declare module feng3d {
    /**
     * 世界坐标输出函数
     * @author feng 2014-11-7
     */
    function V_WorldPositionOut(): void;
}
declare module feng3d {
    /**
     * Fagal标记
     * @author feng 2014-10-22
     */
    class FagalToken {
        /** AGAL换行符 */
        static BREAK: string;
        /** 单行注释符 */
        static COMMENT: string;
    }
}
declare module feng3d {
    /**
     * 寄存器项
     * @author feng 2014-10-22
     */
    interface IField {
        /**
         * 寄存器类型
         */
        regType: string;
        /**
         * 寄存器id
         */
        regId: string;
        /**
         * 寄存器描述
         */
        desc: string;
        /**
         * 转换为字符串
         */
        toString(): string;
    }
}
declare module feng3d {
    /**
     *
     * @author feng 2014-10-22
     */
    interface IRegister extends IField {
        /**
         * 寄存器长度
         */
        regLen: number;
    }
}
declare module feng3d {
    /**
     * 寄存器组件接口
     * @author feng 2014-10-22
     */
    interface IRegisterComponent extends IField {
    }
}
declare module feng3d {
    /**
     * 寄存器单元
     * @author feng 2014-10-22
     */
    class RegisterComponent implements IRegisterComponent {
        private _register;
        private _prop;
        private _regType;
        private _regId;
        protected _registerString: string;
        protected _nameString: string;
        /** 寄存器id */
        /**
         * @private
         */
        regId: string;
        /**
         * 创建一个寄存器单元
         * @param register 寄存器类型
         * @param prop 单元名称
         */
        constructor(register: Register, prop: string);
        /**
         * @inheritDoc
         */
        regType: string;
        toString(): string;
        /**
         * 判断是否有效
         * @param prop
         * @return			true：有效，false：无效
         */
        static valid(prop: string): boolean;
        /**
         * @inheritDoc
         */
        desc: string;
    }
}
declare module feng3d {
    /**
     * 寄存器单元组合
     * @author feng 2014-10-22
     */
    class RegisterComponentSelection implements IField {
        private _register;
        private _prop;
        private _regType;
        private _regId;
        /** 寄存器id */
        /**
         * @private
         */
        regId: string;
        /**
         * 创建一个寄存器单元组合
         * @param register 		寄存器类型
         * @param prop 			组合名称
         */
        constructor(register: Register, prop: string);
        /**
         * @inheritDoc
         */
        regType: string;
        /**
         * @inheritDoc
         */
        toString(): string;
        /**
         * @inheritDoc
         */
        desc: string;
    }
}
declare module feng3d {
    /**
     * 纹理类型
     * @author feng 2014-10-23
     */
    class TextureType {
        /**  Images in this texture all are 2-dimensional. They have width and height, but no depth. */
        static TYPE_2D: string;
        /**  Images in this texture all are 3-dimensional. They have width, height, and depth. */
        static TYPE_3D: string;
        /**  There are exactly 6 distinct sets of 2D images, all of the same size. They act as 6 faces of a cube. */
        static TYPE_CUBE: string;
    }
}
declare module feng3d {
    /**
     * Fagal编号中心
     * @author feng 2015-7-23
     */
    class FagalIdCenter extends Proxy {
        private static _instance;
        /**
         * 创建Fagal编号中心
         */
        FagalIdCenter(): void;
        /**
         * @inheritDoc
         */
        hasOwnProperty(V?: any): boolean;
        /**
         * @inheritDoc
         */
        getProperty(name: any): string;
        /**
         * Fagal编号中心实例
         */
        static instance: FagalIdCenter;
    }
}
declare module feng3d {
    /**
     * fagal函数单元
     * @author feng 2015-8-8
     */
    class FagalItem {
        funcName: string;
        parameters: any;
        /**
         * 创建一个fagal函数单元
         * @param funcName			函数名称
         * @param parameters		参数
         */
        constructor(funcName: string, parameters: any);
        /**
         * 获取参数中出现的寄存器id以及次数
         * @param parameters			拥有寄存器的参数
         * @return						寄存器id字典(key:regID,value:count)
         */
        getRegCountDic(): {};
        /**
         * 获取寄存器列表
         */
        private getIFieldList();
    }
}
declare module feng3d {
    /**
     * Fagal函数运行环境(FagalMethodRuntimeEnvironment)
     * @author feng 2014-10-24
     */
    class FagalRE {
        private static _instance;
        private _context3DCache;
        private _shaderType;
        private _space;
        runState: string;
        /**
         * 数据id字典
         */
        static idDic: {};
        /**
         * 添加3d缓冲编号配置
         * @param configs
         */
        static addBufferID(configs: any): void;
        /**
         * 创建一个Fagal函数运行环境
         */
        constructor();
        /**
         * Fagal运行环境空间
         */
        space: any;
        /**
         * 3D环境缓存类(方便调试与管理渲染操作)
         */
        context3DCache: Context3DCache;
        /**
         * 运行Fagal函数
         * @param agalMethod Fagal函数
         */
        static runShader(vertexShader: any, fragmentShader: any): FagalShaderResult;
        /**
         * Fagal寄存器中心
         */
        private registerCenter;
        /**
         * 运行Fagal函数
         * @param agalMethod Fagal函数
         */
        runShader(vertexShader: any, fragmentShader: any): FagalShaderResult;
        /**
         * 运行Fagal函数
         * @param agalMethod Fagal函数
         */
        run(agalMethod: any): FagalItem[];
        /**
         * 着色器类型
         */
        shaderType: string;
        /**
         * Fagal函数运行环境实例
         */
        static instance: FagalRE;
    }
}
declare module feng3d {
    /**
     * Fagal运行环境空间
     * @author feng 2015-7-23
     */
    class FagalRESpace extends Proxy {
        private callLog;
        private _math;
        /**
         * Fagal数学运算
         */
        private math;
        /**
         * Fagal寄存器中心
         */
        private registerCenter;
        /**
         * 创建Fagal运行环境空间
         */
        FagalRESpace(): void;
        /**
         * @inheritDoc
         */
        getProperty(name: any): any;
        /**
         * @inheritDoc
         */
        callProperty(name: any, ...parameters: any[]): void;
        /**
         * 执行渲染函数
         * @param fagalMethod
         * @return
         */
        run(fagalMethod: Function): FagalItem[];
        /**
         * 获取临时寄存器
         * @param description 寄存器描述
         * @return
         * @author feng 2015-4-24
         */
        getFreeTemp(description?: string): Register;
        /**
         * 获取临时寄存器
         * @param description 寄存器描述
         * @return
         * @author feng 2015-4-24
         */
        getFreeTemps(description?: string, num?: number): RegisterArray;
    }
}
declare module feng3d {
    /**
     * Fagal寄存器中心
     * @author feng 2015-7-23
     */
    class FagalRegisterCenter extends Proxy {
        private static _instance;
        private static _dataRegisterDic;
        /**
         * 临时寄存器递增索引（目的是为了获取唯一的临时寄存器名称，顶点与片段临时寄存器公用一个递增索引）
         */
        private static tempIndex;
        /**
         * 构建Fagal寄存器中心
         */
        FagalRegisterCenter(): void;
        /**
         * 数据寄存器缓存
         */
        static dataRegisterDic: any;
        /**
         * @inheritDoc
         */
        hasOwnProperty(V?: any): boolean;
        /**
         * @inheritDoc
         */
        getProperty(name: any): Register;
        /**
         * 创建寄存器
         * @param dataTypeId
         * @param numRegister
         * @return
         */
        static createRegister(dataTypeId: string): Register;
        /**
         * 获取临时寄存器
         * @param description 寄存器描述
         * @return
         * @author feng 2015-4-24
         */
        static getFreeTemp(description?: string): Register;
        /**
         * 获取临时寄存器
         * @param description 寄存器描述
         * @return
         * @author feng 2015-4-24
         */
        static getFreeTemps(description?: string, num?: number): Register;
        /**
         * 清理寄存器值
         */
        static clear(): void;
        /**
         * Fagal寄存器中心实例
         */
        static instance: FagalRegisterCenter;
    }
}
declare module feng3d {
    /**
     * Fagal渲染结果
     * @author feng 2015-8-8
     */
    class FagalShaderResult {
        vertexCallLog: FagalItem[];
        fragmentCallLog: FagalItem[];
        private _math;
        private agalCode;
        private regDic;
        vertexFCode: string;
        vertexCode: string;
        fragmentFCode: string;
        fragmentCode: string;
        /**
         * 创建一个Fagal渲染结果
         */
        constructor();
        /**
         * 打印输出结果
         */
        print(): void;
        /**
         * 根据寄存器引用计数进行申请与释放寄存器
         * 处理寄存器值(va0,vc0....)
         */
        requestRegisterValue(): void;
        private fagalCodeList;
        /**
         * 执行Fagal函数记录
         */
        doCallLog(callLog: FagalItem[], type: string): string;
        /**
         * 寄存器缓存
         */
        private regCache;
        /**
         * Fagal数学运算
         */
        private math;
        /**
         * 处理Fagal数学函数事件
         */
        private onFagalCodeAppend(event);
    }
}
declare module feng3d {
    class AssetType {
        /** 实体 */
        static ENTITY: string;
        /** 天空盒 */
        static SKYBOX: string;
        /** 摄像机 */
        static CAMERA: string;
        /** 线条 */
        static SEGMENT_SET: string;
        /** 网格 */
        static MESH: string;
        /** 几何体 */
        static GEOMETRY: string;
        /** 骨骼 */
        static SKELETON: string;
        /** 骨骼姿势 */
        static SKELETON_POSE: string;
        /** 容器 */
        static CONTAINER: string;
        /** 纹理 */
        static TEXTURE: string;
        static TEXTURE_PROJECTOR: string;
        /** 材质 */
        static MATERIAL: string;
        static ANIMATION_SET: string;
        /** 动画状态 */
        static ANIMATION_STATE: string;
        /** 动画节点 */
        static ANIMATION_NODE: string;
        /** 动画 */
        static ANIMATOR: string;
        static STATE_TRANSITION: string;
        /** 灯光 */
        static LIGHT: string;
        /** 灯光采集器 */
        static LIGHT_PICKER: string;
        /** 阴影投射方法 */
        static SHADOW_MAP_METHOD: string;
        static EFFECTS_METHOD: string;
    }
}
declare module feng3d {
    interface IAsset {
        namedAsset: NamedAsset;
    }
}
declare module feng3d {
    /**
     * 拥有名字的对象
     * @author feng 2014-5-7
     */
    class NamedAsset {
        private static nameDic;
        private _asset;
        _assetType: string;
        private _name;
        /**
         * 创建一个拥有名字的对象
         */
        constructor(asset: IAsset, assetType: string);
        /**
         * 名称
         */
        name: string;
        /**
         * @inheritDoc
         */
        assetType: string;
    }
}
declare module feng3d {
    /**
     * 阴影映射基类
     * @author feng 2015-5-28
     */
    abstract class ShadowMapperBase {
        protected _casterCollector: ShadowCasterCollector;
        private _depthMap;
        protected _depthMapSize: number;
        protected _light: LightBase;
        private _autoUpdateShadows;
        _shadowsInvalid: boolean;
        /**
         * 创建阴影映射
         */
        constructor();
        /**
         * 创建阴影投射者集合
         */
        protected createCasterCollector(): ShadowCasterCollector;
        /**
         * 灯光
         */
        light: LightBase;
        /**
         * 深度图
         */
        depthMap: TextureProxyBase;
        /**
         * 是否自动更新阴影
         */
        autoUpdateShadows: boolean;
        /**
         * 渲染深度图
         * @param stage3DProxy			3D场景代理
         * @param entityCollector		实体集合
         * @param renderer				渲染器
         */
        renderDepthMap(stage3DProxy: Stage3DProxy, entityCollector: EntityCollector, renderer: DepthRenderer): void;
        /**
         * 创建深度纹理
         */
        protected createDepthTexture(): TextureProxyBase;
        /**
         * 更新深度投影矩阵
         * @param viewCamera		摄像机
         */
        protected abstract updateDepthProjection(viewCamera: Camera3D): any;
        /**
         * 绘制深度图
         * @param depthMap				深度图纹理
         * @param stage3DProxy			3D舞台代理
         * @param scene					场景
         * @param renderer				渲染器
         */
        protected abstract drawDepthMap(depthMap: TextureProxyBase, stage3DProxy: Stage3DProxy, scene: Scene3D, renderer: DepthRenderer): any;
        /**
         * 深度图尺寸
         */
        depthMapSize: number;
        /**
         * 销毁
         */
        dispose(): void;
    }
}
declare module feng3d {
    /**
     * 方向光阴影映射
     * @author feng 2015-5-28
     */
    class DirectionalShadowMapper extends ShadowMapperBase {
        protected _overallDepthCamera: Camera3D;
        protected _localFrustum: number[];
        protected _lightOffset: number;
        protected _matrix: Matrix3D;
        protected _overallDepthLens: FreeMatrixLens;
        protected _snap: number;
        protected _cullPlanes: Plane3D[];
        protected _minZ: number;
        protected _maxZ: number;
        /**
         * 创建方向光阴影映射
         */
        constructor();
        /**
         * 深度投影矩阵
         * <p>世界坐标转换为深度图空间</p>
         */
        depthProjection: Matrix3D;
        /**
         * 投影深度
         * Depth projection matrix that projects from scene space to depth map.
         */
        depth: number;
        /**
         * @inheritDoc
         */
        protected drawDepthMap(target: TextureProxyBase, stage3DProxy: Stage3DProxy, scene: Scene3D, renderer: DepthRenderer): void;
        protected updateCullPlanes(viewCamera: Camera3D): void;
        protected updateDepthProjection(viewCamera: Camera3D): void;
        /**
         * 更新投影矩阵
         * @param viewCamera		摄像机
         * @param corners
         * @param matrix
         */
        protected updateProjectionFromFrustumCorners(viewCamera: Camera3D, corners: number[], matrix: Matrix3D): void;
    }
}
declare module feng3d {
    /**
     * 近方向光阴影映射
     * @author feng 2015-5-28
     */
    class NearDirectionalShadowMapper extends DirectionalShadowMapper {
        private _coverageRatio;
        /**
         * 创建近方向光阴影映射
         * @param coverageRatio		覆盖比例
         */
        constructor(coverageRatio?: number);
        /**
         * 阴影的覆盖视椎体的比例
         * <p>0表示视椎体内看不到阴影，0.5表示从近平面到与远平面之间可以看到阴影，1表示视椎体内都可以看到阴影。</p>
         * <p><b>注：看到阴影的前提是有阴影产生</b></p>
         */
        coverageRatio: number;
        /**
         * @inheritDoc
         */
        protected updateDepthProjection(viewCamera: Camera3D): void;
    }
}
declare module feng3d {
    class Point {
        x: number;
        y: number;
        constructor(x?: number, y?: number);
    }
}
declare module feng3d {
    /**
     * Matrix3D 类表示一个转换矩阵，该矩阵确定三维 (3D) 显示对象的位置和方向。
     * 该矩阵可以执行转换功能，包括平移（沿 x、y 和 z 轴重新定位）、旋转和缩放（调整大小）。
     * Matrix3D 类还可以执行透视投影，这会将 3D 坐标空间中的点映射到二维 (2D) 视图。
     *
     *  ---            方向              平移 ---
     *  |   scaleX      0         0       tx    |
     *  |     0       scaleY      0       ty    |
     *  |     0         0       scaleZ    tz    |
     *  |     0         0         0       tw    |
     *  ---  x轴        y轴      z轴          ---
     *
     *  ---            方向              平移 ---
     *  |     0         4         8       12    |
     *  |     1         5         9       13    |
     *  |     2         6        10       14    |
     *  |     3         7        11       15    |
     *  ---  x轴        y轴      z轴          ---
     */
    class Matrix3D {
        /**
         * 一个由 16 个数字组成的矢量，其中，每四个元素可以是 4x4 矩阵的一列。
         */
        rawData: Array<number>;
        /**
         * 一个保存显示对象在转换参照帧中的 3D 坐标 (x,y,z) 位置的 Vector3D 对象。
         */
        position: Vector3D;
        /**
         * 一个用于确定矩阵是否可逆的数字。
         */
        determinant: number;
        /**
         * 前方（+Z轴方向）
         */
        forward: Vector3D;
        /**
         * 上方（+y轴方向）
         */
        up: Vector3D;
        /**
         * 右方（+x轴方向）
         */
        right: Vector3D;
        /**
         * 创建 Matrix3D 对象。
         * @param   datas    一个由 16 个数字组成的矢量，其中，每四个元素可以是 4x4 矩阵的一列。
         */
        constructor(datas?: Array<number>);
        /**
         * 创建旋转矩阵
         * @param   degrees         角度
         * @param   axis            旋转轴
         * @param   pivotPoint      旋转中心点
         */
        static createRotationMatrix3D(degrees: number, axis: Vector3D): Matrix3D;
        /**
         * 创建缩放矩阵
         * @param   xScale      用于沿 x 轴缩放对象的乘数。
         * @param   yScale      用于沿 y 轴缩放对象的乘数。
         * @param   zScale      用于沿 z 轴缩放对象的乘数。
         */
        static createScaleMatrix3D(xScale: number, yScale: number, zScale: number): Matrix3D;
        /**
         * 创建位移矩阵
         * @param   x   沿 x 轴的增量平移。
         * @param   y   沿 y 轴的增量平移。
         * @param   z   沿 z 轴的增量平移。
         */
        static createTranslationMatrix3D(x: number, y: number, z: number): Matrix3D;
        /**
         * 通过将另一个 Matrix3D 对象与当前 Matrix3D 对象相乘来后置一个矩阵。
         */
        append(lhs: Matrix3D): void;
        /**
         * 在 Matrix3D 对象上后置一个增量旋转。
         * @param   degrees         角度
         * @param   axis            旋转轴
         * @param   pivotPoint      旋转中心点
         */
        appendRotation(degrees: number, axis: Vector3D, pivotPoint?: Vector3D): void;
        /**
         * 在 Matrix3D 对象上后置一个增量缩放，沿 x、y 和 z 轴改变位置。
         * @param   xScale      用于沿 x 轴缩放对象的乘数。
         * @param   yScale      用于沿 y 轴缩放对象的乘数。
         * @param   zScale      用于沿 z 轴缩放对象的乘数。
         */
        appendScale(xScale: number, yScale: number, zScale: number): void;
        /**
         * 在 Matrix3D 对象上后置一个增量平移，沿 x、y 和 z 轴重新定位。
         * @param   x   沿 x 轴的增量平移。
         * @param   y   沿 y 轴的增量平移。
         * @param   z   沿 z 轴的增量平移。
         */
        appendTranslation(x: number, y: number, z: number): void;
        /**
         * 返回一个新 Matrix3D 对象，它是与当前 Matrix3D 对象完全相同的副本。
         */
        clone(): Matrix3D;
        /**
         * 将 Vector3D 对象复制到调用方 Matrix3D 对象的特定列中。
         * @param   column      副本的目标列。
         * @param   vector3D    要从中复制数据的 Vector3D 对象。
         */
        copyColumnFrom(column: number, vector3D: Vector3D): void;
        /**
         * 将调用方 Matrix3D 对象的特定列复制到 Vector3D 对象中。
         * @param   column       要从中复制数据的列。
         * @param   vector3D     副本的目标 Vector3D 对象。
         */
        copyColumnTo(column: number, vector3D: Vector3D): void;
        /**
         * 将源 Matrix3D 对象中的所有矩阵数据复制到调用方 Matrix3D 对象中。
         * @param   sourceMatrix3D      要从中复制数据的 Matrix3D 对象。
         */
        copyFrom(sourceMatrix3D: Matrix3D): void;
        /**
         * 将源 Vector 对象中的所有矢量数据复制到调用方 Matrix3D 对象中。利用可选索引参数，您可以选择矢量中的任何起始文字插槽。
         * @param   vector      要从中复制数据的 Vector 对象。
         * @param   index       vector中的起始位置
         * @param   transpose   是否转置当前矩阵
         */
        copyRawDataFrom(vector: Array<number>, index?: number, transpose?: boolean): void;
        /**
         * 将调用方 Matrix3D 对象中的所有矩阵数据复制到提供的矢量中。
         * @param   vector      要将数据复制到的 Vector 对象。
         * @param   index       vector中的起始位置
         * @param   transpose   是否转置当前矩阵
         */
        copyRawDataTo(vector: Array<number>, index?: number, transpose?: boolean): void;
        /**
         * 将 Vector3D 对象复制到调用方 Matrix3D 对象的特定行中。
         * @param   row         要将数据复制到的行。
         * @param   vector3D    要从中复制数据的 Vector3D 对象。
         */
        copyRowFrom(row: number, vector3D: Vector3D): void;
        /**
         * 将调用方 Matrix3D 对象的特定行复制到 Vector3D 对象中。
         * @param   row         要从中复制数据的行。
         * @param   vector3D    将作为数据复制目的地的 Vector3D 对象。
         */
        copyRowTo(row: number, vector3D: Vector3D): void;
        /**
         * 拷贝当前矩阵
         * @param   dest    目标矩阵
         */
        copyToMatrix3D(dest: Matrix3D): void;
        /**
         * 将转换矩阵的平移、旋转和缩放设置作为由三个 Vector3D 对象组成的矢量返回。
         * @return      一个由三个 Vector3D 对象组成的矢量，其中，每个对象分别容纳平移、旋转和缩放设置。
         */
        decompose(): Vector3D[];
        /**
         * 使用不含平移元素的转换矩阵将 Vector3D 对象从一个空间坐标转换到另一个空间坐标。
         * @param   v   一个容纳要转换的坐标的 Vector3D 对象。
         * @return  一个包含转换后的坐标的 Vector3D 对象。
         */
        deltaTransformVector(v: Vector3D): Vector3D;
        /**
         * 将当前矩阵转换为恒等或单位矩阵。
         */
        identity(): void;
        /**
         * 反转当前矩阵。逆矩阵
         * @return      如果成功反转矩阵，则返回 true。
         */
        invert(): boolean;
        /**
         * 通过将当前 Matrix3D 对象与另一个 Matrix3D 对象相乘来前置一个矩阵。得到的结果将合并两个矩阵转换。
         * @param   rhs     个右侧矩阵，它与当前 Matrix3D 对象相乘。
         */
        prepend(rhs: Matrix3D): void;
        /**
         * 在 Matrix3D 对象上前置一个增量旋转。在将 Matrix3D 对象应用于显示对象时，矩阵会在 Matrix3D 对象中先执行旋转，然后再执行其他转换。
         * @param   degrees     旋转的角度。
         * @param   axis        旋转的轴或方向。常见的轴为 X_AXIS (Vector3D(1,0,0))、Y_AXIS (Vector3D(0,1,0)) 和 Z_AXIS (Vector3D(0,0,1))。此矢量的长度应为 1。
         * @param   pivotPoint  一个用于确定旋转中心的点。对象的默认轴点为该对象的注册点。
         */
        prependRotation(degrees: number, axis: Vector3D, pivotPoint?: Vector3D): void;
        /**
         * 在 Matrix3D 对象上前置一个增量缩放，沿 x、y 和 z 轴改变位置。在将 Matrix3D 对象应用于显示对象时，矩阵会在 Matrix3D 对象中先执行缩放更改，然后再执行其他转换。
         * @param   xScale      用于沿 x 轴缩放对象的乘数。
         * @param   yScale      用于沿 y 轴缩放对象的乘数。
         * @param   zScale      用于沿 z 轴缩放对象的乘数。
         */
        prependScale(xScale: number, yScale: number, zScale: number): void;
        /**
         * 在 Matrix3D 对象上前置一个增量平移，沿 x、y 和 z 轴重新定位。在将 Matrix3D 对象应用于显示对象时，矩阵会在 Matrix3D 对象中先执行平移更改，然后再执行其他转换。
         * @param   x   沿 x 轴的增量平移。
         * @param   y   沿 y 轴的增量平移。
         * @param   z   沿 z 轴的增量平移。
         */
        prependTranslation(x: number, y: number, z: number): void;
        /**
         * 设置转换矩阵的平移、旋转和缩放设置。
         * @param   components      一个由三个 Vector3D 对象组成的矢量，这些对象将替代 Matrix3D 对象的平移、旋转和缩放元素。
         */
        recompose(components: Vector3D[]): boolean;
        /**
         * 使用转换矩阵将 Vector3D 对象从一个空间坐标转换到另一个空间坐标。
         * @param   v   一个容纳要转换的坐标的 Vector3D 对象。
         * @return  一个包含转换后的坐标的 Vector3D 对象。
         */
        transformVector(v: Vector3D): Vector3D;
        /**
         * 使用转换矩阵将由数字构成的矢量从一个空间坐标转换到另一个空间坐标。
         * @param   vin     一个由多个数字组成的矢量，其中每三个数字构成一个要转换的 3D 坐标 (x,y,z)。
         * @param   vout    一个由多个数字组成的矢量，其中每三个数字构成一个已转换的 3D 坐标 (x,y,z)。
         */
        transformVectors(vin: number[], vout: number[]): void;
        /**
         * 将当前 Matrix3D 对象转换为一个矩阵，并将互换其中的行和列。
         */
        transpose(): void;
        /**
         * 比较矩阵是否相等
         */
        compare(matrix3D: Matrix3D, precision?: number): boolean;
        /**
         * 以字符串返回矩阵的值
         */
        toString(): string;
    }
}
declare module feng3d {
    /**
     * Orientation3D 类是用于表示 Matrix3D 对象的方向样式的常量值枚举。方向的三个类型分别为欧拉角、轴角和四元数。Matrix3D 对象的 decompose 和 recompose 方法采用其中的某一个枚举类型来标识矩阵的旋转组件。
     * @author feng 2016-3-21
     */
    class Orientation3D {
        /**
        * 轴角方向结合使用轴和角度来确定方向。
        */
        static AXIS_ANGLE: string;
        /**
        * 欧拉角（decompose() 和 recompose() 方法的默认方向）通过三个不同的对应于每个轴的旋转角来定义方向。
        */
        static EULER_ANGLES: string;
        /**
        * 四元数方向使用复数。
        */
        static QUATERNION: string;
    }
}
declare module feng3d {
    /**
     * A Quaternion object which can be used to represent rotations.
     */
    class Quaternion {
        /**
         * The x value of the quaternion.
         */
        x: number;
        /**
         * The y value of the quaternion.
         */
        y: number;
        /**
         * The z value of the quaternion.
         */
        z: number;
        /**
         * The w value of the quaternion.
         */
        w: number;
        /**
         * Creates a new Quaternion object.
         * @param x The x value of the quaternion.
         * @param y The y value of the quaternion.
         * @param z The z value of the quaternion.
         * @param w The w value of the quaternion.
         */
        constructor(x?: number, y?: number, z?: number, w?: number);
        /**
         * Returns the magnitude of the quaternion object.
         */
        magnitude: number;
        /**
         * Fills the quaternion object with the result from a multiplication of two quaternion objects.
         *
         * @param    qa    The first quaternion in the multiplication.
         * @param    qb    The second quaternion in the multiplication.
         */
        multiply(qa: Quaternion, qb: Quaternion): void;
        multiplyVector(vector: Vector3D, target?: Quaternion): Quaternion;
        /**
         * Fills the quaternion object with values representing the given rotation around a vector.
         *
         * @param    axis    The axis around which to rotate
         * @param    angle    The angle in radians of the rotation.
         */
        fromAxisAngle(axis: Vector3D, angle: number): void;
        /**
         * Spherically interpolates between two quaternions, providing an interpolation between rotations with constant angle change rate.
         * @param qa The first quaternion to interpolate.
         * @param qb The second quaternion to interpolate.
         * @param t The interpolation weight, a value between 0 and 1.
         */
        slerp(qa: Quaternion, qb: Quaternion, t: number): void;
        /**
         * 线性求插值
         * @param qa 第一个四元素
         * @param qb 第二个四元素
         * @param t 权重
         */
        lerp(qa: Quaternion, qb: Quaternion, t: number): void;
        /**
         * Fills the quaternion object with values representing the given euler rotation.
         *
         * @param    ax        The angle in radians of the rotation around the ax axis.
         * @param    ay        The angle in radians of the rotation around the ay axis.
         * @param    az        The angle in radians of the rotation around the az axis.
         */
        fromEulerAngles(ax: number, ay: number, az: number): void;
        /**
         * Fills a target Vector3D object with the Euler angles that form the rotation represented by this quaternion.
         * @param target An optional Vector3D object to contain the Euler angles. If not provided, a new object is created.
         * @return The Vector3D containing the Euler angles.
         */
        toEulerAngles(target?: Vector3D): Vector3D;
        /**
         * Normalises the quaternion object.
         */
        normalize(val?: number): void;
        /**
         * Used to trace the values of a quaternion.
         *
         * @return A string representation of the quaternion object.
         */
        toString(): string;
        /**
         * Converts the quaternion to a Matrix3D object representing an equivalent rotation.
         * @param target An optional Matrix3D container to store the transformation in. If not provided, a new object is created.
         * @return A Matrix3D object representing an equivalent rotation.
         */
        toMatrix3D(target?: Matrix3D): Matrix3D;
        /**
         * Extracts a quaternion rotation matrix out of a given Matrix3D object.
         * @param matrix The Matrix3D out of which the rotation will be extracted.
         */
        fromMatrix(matrix: Matrix3D): void;
        /**
         * Converts the quaternion to a Vector.&lt;number&gt; matrix representation of a rotation equivalent to this quaternion.
         * @param target The Vector.&lt;number&gt; to contain the raw matrix data.
         * @param exclude4thRow If true, the last row will be omitted, and a 4x3 matrix will be generated instead of a 4x4.
         */
        toRawData(target: number[], exclude4thRow?: boolean): void;
        /**
         * Clones the quaternion.
         * @return An exact duplicate of the current Quaternion.
         */
        clone(): Quaternion;
        /**
         * Rotates a point.
         * @param vector The Vector3D object to be rotated.
         * @param target An optional Vector3D object that will contain the rotated coordinates. If not provided, a new object will be created.
         * @return A Vector3D object containing the rotated point.
         */
        rotatePoint(vector: Vector3D, target?: Vector3D): Vector3D;
        /**
         * Copies the data from a quaternion into this instance.
         * @param q The quaternion to copy from.
         */
        copyFrom(q: Quaternion): void;
    }
}
declare module feng3d {
    /**
     * Vector3D 类使用笛卡尔坐标 x、y 和 z 表示三维空间中的点或位置
     * @author feng 2016-3-21
     */
    class Vector3D {
        /**
        * 定义为 Vector3D 对象的 x 轴，坐标为 (1,0,0)。
        */
        static X_AXIS: Vector3D;
        /**
        * 定义为 Vector3D 对象的 y 轴，坐标为 (0,1,0)
        */
        static Y_AXIS: Vector3D;
        /**
        * 定义为 Vector3D 对象的 z 轴，坐标为 (0,0,1)
        */
        static Z_AXIS: Vector3D;
        /**
        * Vector3D 对象中的第一个元素，例如，三维空间中某个点的 x 坐标。默认值为 0
        */
        x: number;
        /**
        * Vector3D 对象中的第二个元素，例如，三维空间中某个点的 y 坐标。默认值为 0
        */
        y: number;
        /**
        * Vector3D 对象中的第三个元素，例如，三维空间中某个点的 z 坐标。默认值为 0
        */
        z: number;
        /**
        * Vector3D 对象的第四个元素（除了 x、y 和 z 属性之外）可以容纳数据，例如旋转角度。默认值为 0
        */
        w: number;
        /**
        * 当前 Vector3D 对象的长度（大小），即从原点 (0,0,0) 到该对象的 x、y 和 z 坐标的距离。w 属性将被忽略。单位矢量具有的长度或大小为一。
        */
        length: number;
        /**
        * 当前 Vector3D 对象长度的平方，它是使用 x、y 和 z 属性计算出来的。w 属性将被忽略。尽可能使用 lengthSquared() 方法，而不要使用 Vector3D.length() 方法的 Math.sqrt() 方法调用，后者速度较慢。
        */
        lengthSquared: number;
        /**
         * 创建 Vector3D 对象的实例。如果未指定构造函数的参数，则将使用元素 (0,0,0,0) 创建 Vector3D 对象。
         * @param x 第一个元素，例如 x 坐标。
         * @param y 第二个元素，例如 y 坐标。
         * @param z 第三个元素，例如 z 坐标。
         * @param w 表示额外数据的可选元素，例如旋转角度
         */
        constructor(x?: number, y?: number, z?: number, w?: number);
        /**
         * 将当前 Vector3D 对象的 x、y 和 z 元素的值与另一个 Vector3D 对象的 x、y 和 z 元素的值相加。
         * @param a 要与当前 Vector3D 对象相加的 Vector3D 对象。
         * @return 一个 Vector3D 对象，它是将当前 Vector3D 对象与另一个 Vector3D 对象相加所产生的结果。
         */
        add(a: Vector3D): Vector3D;
        /**
         * 返回一个新 Vector3D 对象，它是与当前 Vector3D 对象完全相同的副本。
         * @return 一个新 Vector3D 对象，它是当前 Vector3D 对象的副本。
         */
        clone(): Vector3D;
        /**
         * 将源 Vector3D 对象中的所有矢量数据复制到调用方 Vector3D 对象中。
         * @return 要从中复制数据的 Vector3D 对象。
         */
        copyFrom(sourceVector3D: Vector3D): void;
        /**
         * 返回一个新的 Vector3D 对象，它与当前 Vector3D 对象和另一个 Vector3D 对象垂直（成直角）。
         */
        crossProduct(a: Vector3D): Vector3D;
        /**
         * 按照指定的 Vector3D 对象的 x、y 和 z 元素的值递减当前 Vector3D 对象的 x、y 和 z 元素的值。
         */
        decrementBy(a: Vector3D): void;
        /**
         * 返回两个 Vector3D 对象之间的距离。
         */
        static distance(pt1: Vector3D, pt2: Vector3D): number;
        /**
         * 如果当前 Vector3D 对象和作为参数指定的 Vector3D 对象均为单位顶点，此方法将返回这两个顶点之间所成角的余弦值。
         */
        dotProduct(a: Vector3D): number;
        /**
         * 通过将当前 Vector3D 对象的 x、y 和 z 元素与指定的 Vector3D 对象的 x、y 和 z 元素进行比较，确定这两个对象是否相等。
         */
        equals(toCompare: Vector3D, allFour?: boolean): boolean;
        /**
         * 按照指定的 Vector3D 对象的 x、y 和 z 元素的值递增当前 Vector3D 对象的 x、y 和 z 元素的值。
         */
        incrementBy(a: Vector3D): void;
        /**
         * 将当前 Vector3D 对象设置为其逆对象。
         */
        negate(): void;
        /**
         * 通过将最前面的三个元素（x、y、z）除以矢量的长度可将 Vector3D 对象转换为单位矢量。
         */
        normalize(thickness?: number): void;
        /**
         * 按标量（大小）缩放当前的 Vector3D 对象。
         */
        scaleBy(s: number): void;
        /**
         * 将 Vector3D 的成员设置为指定值
         */
        setTo(xa: number, ya: number, za: number): void;
        /**
         * 从另一个 Vector3D 对象的 x、y 和 z 元素的值中减去当前 Vector3D 对象的 x、y 和 z 元素的值。
         */
        subtract(a: Vector3D): Vector3D;
        /**
         * 返回当前 Vector3D 对象的字符串表示形式。
         */
        toString(): string;
    }
}
declare module feng3d {
    /**
     * 3d直线
     * @author feng 2013-6-13
     */
    class Line3D {
        /** 直线上某一点 */
        position: Vector3D;
        /** 直线方向 */
        direction: Vector3D;
        /**
         * 根据直线某点与方向创建直线
         * @param position 直线上某点
         * @param direction 直线的方向
         */
        constructor(position?: Vector3D, direction?: Vector3D);
        /**
         * 根据直线上两点初始化直线
         * @param p0 Vector3D
         * @param p1 Vector3D
         */
        fromPoints(p0: Vector3D, p1: Vector3D): void;
        /**
         * 根据直线某点与方向初始化直线
         * @param position 直线上某点
         * @param direction 直线的方向
         */
        fromPosAndDir(position: Vector3D, direction: Vector3D): void;
        /**
         * 获取直线上的一个点
         * @param length 与原点距离
         */
        getPoint(length?: number): Vector3D;
    }
}
declare module feng3d {
    /**
     * 3D射线
     * @author feng 2013-6-13
     */
    class Ray3D extends Line3D {
        constructor(position?: Vector3D, direction?: Vector3D);
    }
}
declare module feng3d {
    /**
     * 数学常量类
     */
    class MathConsts {
        /**
         * 弧度转角度因子
         */
        static RADIANS_TO_DEGREES: number;
        /**
         * 角度转弧度因子
         */
        static DEGREES_TO_RADIANS: number;
    }
}
declare module feng3d {
    /**
     * 矩阵工具类
     * Matrix3DUtils provides additional Matrix3D math functions.
     */
    class Matrix3DUtils {
        /**
         * A reference to a Vector to be used as a temporary raw data container, to prevent object creation.
         */
        static RAW_DATA_CONTAINER: number[];
        static CALCULATION_MATRIX: Matrix3D;
        static CALCULATION_VECTOR3D: Vector3D;
        static CALCULATION_DECOMPOSE: Vector3D[];
        /**
         * Fills the 3d matrix object with values representing the transformation made by the given quaternion.
         *
         * @param    quarternion    The quarterion object to convert.
         */
        static quaternion2matrix(quarternion: Quaternion, m?: Matrix3D): Matrix3D;
        /**
         *
         * Returns a normalised <code>Vector3D</code> object representing the forward vector of the given matrix.
         * @param    m        The Matrix3D object to use to get the forward vector
         * @param    v        [optional] A vector holder to prevent make new Vector3D instance if already exists. Default is null.
         * @return            The forward vector
         */
        static getForward(m: Matrix3D, v?: Vector3D): Vector3D;
        /**
         * Returns a normalised <code>Vector3D</code> object representing the up vector of the given matrix.
         * @param    m        The Matrix3D object to use to get the up vector
         * @param    v        [optional] A vector holder to prevent make new Vector3D instance if already exists. Default is null.
         * @return            The up vector
         */
        static getUp(m: Matrix3D, v?: Vector3D): Vector3D;
        /**
         * Returns a normalised <code>Vector3D</code> object representing the right vector of the given matrix.
         * @param    m        The Matrix3D object to use to get the right vector
         * @param    v        [optional] A vector holder to prevent make new Vector3D instance if already exists. Default is null.
         * @return            The right vector
         */
        static getRight(m: Matrix3D, v?: Vector3D): Vector3D;
        /**
         * Returns a boolean value representing whether there is any significant difference between the two given 3d matrices.
         */
        static compare(m1: Matrix3D, m2: Matrix3D): boolean;
        static lookAt(matrix: Matrix3D, pos: Vector3D, dir: Vector3D, up: Vector3D): void;
        static reflection(plane: Plane3D, target?: Matrix3D): Matrix3D;
        static decompose(sourceMatrix: Matrix3D, orientationStyle?: string): Vector3D[];
        static transformVector(matrix: Matrix3D, vector: Vector3D, result?: Vector3D): Vector3D;
        static deltaTransformVector(matrix: Matrix3D, vector: Vector3D, result?: Vector3D): Vector3D;
        static getTranslation(transform: Matrix3D, result?: Vector3D): Vector3D;
        static deltaTransformVectors(matrix: Matrix3D, vin: number[], vout: number[]): void;
        /**
         * 更新本地射线
         * @param inverseSceneTransform 逆场景变换矩阵
         * @param ray3D 场景射线
         * @param localRay 本地射线
         */
        static updateLocalRay(inverseSceneTransform: Matrix3D, ray3D: Ray3D, localRay: Ray3D): void;
    }
}
declare module feng3d {
    /**
     * 3d面
     */
    class Plane3D {
        /**
         * 平面A系数
         * <p>同样也是面法线x尺寸</p>
         */
        a: number;
        /**
         * 平面B系数
         * <p>同样也是面法线y尺寸</p>
         */
        b: number;
        /**
         * 平面C系数
         * <p>同样也是面法线z尺寸</p>
         */
        c: number;
        /**
         * 平面D系数
         * <p>同样也是（0，0）点到平面的距离的负值</p>
         */
        d: number;
        /**
         * 对齐类型
         */
        _alignment: number;
        /**
         * 普通平面
         * <p>不与对称轴平行或垂直</p>
         */
        static ALIGN_ANY: number;
        /**
         * XY方向平面
         * <p>法线与Z轴平行</p>
         */
        static ALIGN_XY_AXIS: number;
        /**
         * YZ方向平面
         * <p>法线与X轴平行</p>
         */
        static ALIGN_YZ_AXIS: number;
        /**
         * XZ方向平面
         * <p>法线与Y轴平行</p>
         */
        static ALIGN_XZ_AXIS: number;
        /**
         * 创建一个平面
         * @param a		A系数
         * @param b		B系数
         * @param c		C系数
         * @param d		D系数
         */
        constructor(a?: number, b?: number, c?: number, d?: number);
        /**
         * 通过3顶点定义一个平面
         * @param p0		点0
         * @param p1		点1
         * @param p2		点2
         */
        fromPoints(p0: Vector3D, p1: Vector3D, p2: Vector3D): void;
        /**
         * 根据法线与点定义平面
         * @param normal		平面法线
         * @param point			平面上任意一点
         */
        fromNormalAndPoint(normal: Vector3D, point: Vector3D): void;
        /**
         * 标准化平面
         * @return		标准化后的平面
         */
        normalize(): Plane3D;
        /**
         * 计算点与平面的距离
         * @param p		点
         * @returns		距离
         */
        distance(p: Vector3D): number;
        /**
         * 顶点分类
         * <p>把顶点分为后面、前面、相交三类</p>
         * @param p			顶点
         * @return			顶点类型 PlaneClassification.BACK,PlaneClassification.FRONT,PlaneClassification.INTERSECT
         * @see				me.feng3d.core.math.PlaneClassification
         */
        classifyPoint(p: Vector3D, epsilon?: number): number;
        /**
         * 输出字符串
         */
        toString(): string;
    }
}
declare module feng3d {
    /**
     * 点与面的相对位置
     * @author feng
     */
    class PlaneClassification {
        /**
         * 在平面后面
         * <p>等价于平面内</p>
         * @see #IN
         */
        static BACK: number;
        /**
         * 在平面前面
         * <p>等价于平面外</p>
         * @see #OUT
         */
        static FRONT: number;
        /**
         * 在平面内
         * <p>等价于在平面后</p>
         * @see #BACK
         */
        static IN: number;
        /**
         * 在平面外
         * <p>等价于平面前面</p>
         * @see #FRONT
         */
        static OUT: number;
        /**
         * 与平面相交
         */
        static INTERSECT: number;
    }
}
declare module feng3d {
    /**
     * 三角形
     * @author feng 2014-5-4
     */
    class Triangle3D {
        private _p0;
        private _p1;
        private _p2;
        private _normal;
        constructor(p0: Vector3D, p1: Vector3D, p2: Vector3D);
        /**
         * 测试是否与直线相交
         * @param line3D 直线
         * @return 是否相交
         */
        testLineCollision(line3D: Line3D): boolean;
        /**
         * 第1个点
         */
        p0: Vector3D;
        /**
         * 第2个点
         */
        p1: Vector3D;
        /**
         * 第3个点
         */
        p2: Vector3D;
        /**
         * 法线
         */
        normal: Vector3D;
        private updateNomal();
    }
}
declare module feng3d {
    /**
     * 解析工具类
     */
    class ParserUtil {
        /**
         * 把数据转换为字符串
         * @param data 数据
         * @param length 需要转换的长度
         * @return
         */
        static toString(data: any, length?: number): string;
    }
}
declare module feng3d {
    /**
     * 解析数据的格式
     */
    class ParserDataFormat {
        /**
         * 二进制文件
         */
        static BINARY: string;
        /**
         * 明文
         */
        static PLAIN_TEXT: string;
    }
}
declare module feng3d {
    /**
     * 资源依赖(包含需要加载与处理的资源)
     * @author feng 2014-5-19
     */
    class ResourceDependency {
        private _id;
        private _req;
        private _assets;
        private _parentParser;
        private _data;
        private _retrieveAsRawData;
        private _suppressAssetEvents;
        private _dependencies;
        success: boolean;
        /**
         * 创建资源依赖
         * @param id 编号
         * @param req url请求
         * @param data 数据
         * @param parentParser 被依赖的解析者
         * @param retrieveAsRawData
         * @param suppressAssetEvents
         */
        constructor(id: string, req: URLRequest, data: any, parentParser: ParserBase, retrieveAsRawData?: boolean, suppressAssetEvents?: boolean);
        id: string;
        assets: IAsset[];
        dependencies: ResourceDependency[];
        request: URLRequest;
        retrieveAsRawData: boolean;
        suppresAssetEvents: boolean;
        data: any;
        setData(data: any): void;
        /**
         * 被依赖的解析者
         */
        parentParser: ParserBase;
        /**
         * 解决依赖
         */
        resolve(): void;
        /**
         * 解决失败
         */
        resolveFailure(): void;
        /**
         * 解决资源的名称
         */
        resolveName(asset: IAsset): string;
    }
}
declare module feng3d {
    /**
     * 单条线段数据
     * @author feng 2014-4-9
     */
    class Segment {
        protected _thickness: number;
        protected _start: Vector3D;
        protected _end: Vector3D;
        protected _startR: number;
        protected _startG: number;
        protected _startB: number;
        protected _endR: number;
        protected _endG: number;
        protected _endB: number;
        private _startColor;
        private _endColor;
        /**
         * 创建一条线段数据
         * @param start 起点坐标
         * @param end 终点坐标
         * @param colorStart 起点颜色
         * @param colorEnd 终点颜色
         * @param thickness 线段厚度
         */
        constructor(start: Vector3D, end: Vector3D, colorStart?: number, colorEnd?: number, thickness?: number);
        /**
         * 更新线段信息
         * @param start 起点坐标
         * @param end 终点坐标
         * @param colorStart 起点颜色
         * @param colorEnd 终点颜色
         * @param thickness 线段厚度
         */
        updateSegment(start: Vector3D, end: Vector3D, colorStart?: number, colorEnd?: number, thickness?: number): void;
        /**
         * 起点坐标
         */
        start: Vector3D;
        /**
         * 终点坐标
         */
        end: Vector3D;
        /**
         * 线段厚度
         */
        thickness: number;
        /**
         * 起点颜色
         */
        startColor: number;
        /**
         * 终点颜色
         */
        endColor: number;
        dispose(): void;
        startR: number;
        startG: number;
        startB: number;
        endR: number;
        endG: number;
        endB: number;
    }
}
declare module feng3d {
    /**
     * A Line Segment primitive.
     */
    class LineSegment extends Segment {
        TYPE: string;
        /**
         * Create a line segment
         * @param v0 Start position of the line segment
         * @param v1 Ending position of the line segment
         * @param color0 Starting color of the line segment
         * @param color1 Ending colour of the line segment
         * @param thickness Thickness of the line
         */
        constructor(v0: Vector3D, v1: Vector3D, color0?: number, color1?: number, thickness?: number);
    }
}
declare module feng3d {
    /**
     * 测试基类
     * @author feng 2014-4-9
     */
    class TestBase extends Sprite {
        protected rootPaths: string[];
        protected rootPath: string;
        /**
         * 资源列表
         */
        protected resourceList: any;
        /** 资源字典 */
        protected resourceDic: any;
        constructor();
        private initModules();
        private tryConnect();
        private tryRootPathComplete(event);
        /**
         * 加载纹理资源
         */
        private loadTextures();
        /** 单个资源加载完毕 */
        private singleGeometryComplete(evnet);
        /**
         * 处理全部加载完成事件
         */
        protected allItemsLoaded(event: LoadUrlEvent): void;
    }
}
declare module feng3d {
    /**
     * 粒子几何体帮助类
     */
    class ParticleGeometryHelper {
        /** stage3d单次渲染支持的最大顶点数 */
        static MAX_VERTEX: number;
        /**
         * 创建一个粒子几何体
         * @param geometries 单个粒子几何体列表
         * @param transforms
         * @return 粒子几何体
         */
        static generateGeometry(geometries: Geometry[]): ParticleGeometry;
        static createParticleSubGeometry(): SubGeometry;
    }
}
declare module feng3d {
    /**
     * sprite动画剪辑节帮助程序
     * @author feng 2015-9-18
     */
    class SpriteSheetHelper {
        /**
         * 创建sprite动画剪辑节帮助程序实例
         */
        constructor();
        /**
         * 根据影片剪辑生成纹理列表
         * @param sourceMC					源影片剪辑
         * @param cols						U方向个数
         * @param rows						V方向个数
         * @param width						宽度
         * @param height					高度
         * @param transparent 				是否透明
         * @param backgroundColor			贝爷颜色
         */
        generateFromMovieClip(sourceMC: MovieClip, cols: number, rows: number, width: number, height: number, transparent?: boolean, backgroundColor?: number): Texture2DBase[];
        /**
         * 生成一个SpriteSheetClipNode
         * @param animID					动画编号
         * @param cols						U方向个数
         * @param rows						V方向个数
         * @param mapCount					映射数量
         * @param from						起始索引
         * @param to						终止索引
         */
        generateSpriteSheetClipNode(animID: string, cols: number, rows: number, mapCount?: number, from?: number, to?: number): SpriteSheetClipNode;
    }
}
declare module feng3d {
    /**
     * Helper Class to retrieve objects bounds <code>Bounds</code>
     */
    class Bounds {
        private static _minX;
        private static _minY;
        private static _minZ;
        private static _maxX;
        private static _maxY;
        private static _maxZ;
        private static _defaultPosition;
        private static _containers;
        /**
         * Calculate the bounds of a Mesh object
         * @param mesh        Mesh. The Mesh to get the bounds from.
         * Use the getters of this class to retrieve the results
         */
        static getMeshBounds(mesh: Mesh): void;
        /**
         * Calculate the bounds of an ObjectContainer3D object
         * @param container        ObjectContainer3D. The ObjectContainer3D to get the bounds from.
         * Use the getters of this class to retrieve the results
         */
        static getObjectContainerBounds(container: Container3D, worldBased?: boolean): void;
        /**
         * Calculate the bounds from a vector of number representing the vertices. &lt;x,y,z,x,y,z.....&gt;
         * @param vertices        Vector.&lt;number&gt;. The vertices to get the bounds from.
         * Use the getters of this class to retrieve the results
         */
        static getVerticesVectorBounds(vertices: number[]): void;
        /**
         * @param outCenter        Vector3D. Optional Vector3D, if provided the same Vector3D is returned with the bounds center.
         * @return the center of the bound
         */
        static getCenter(outCenter?: Vector3D): Vector3D;
        /**
         * @return the smalest x value
         */
        static minX: number;
        /**
         * @return the smalest y value
         */
        static minY: number;
        /**
         * @return the smalest z value
         */
        static minZ: number;
        /**
         * @return the biggest x value
         */
        static maxX: number;
        /**
         * @return the biggest y value
         */
        static maxY: number;
        /**
         * @return the biggest z value
         */
        static maxZ: number;
        /**
         * @return the width value from the bounds
         */
        static width: number;
        /**
         * @return the height value from the bounds
         */
        static height: number;
        /**
         * @return the depth value from the bounds
         */
        static depth: number;
        private static reset();
        private static parseObjectContainerBounds(obj, parentTransform?);
        private static isInfinite(value);
        private static parseObjectBounds(oC, parentTransform?, resetBounds?);
        private static getBoundsCorners(minX, minY, minZ, maxX, maxY, maxZ);
        private static transformContainer(bounds, corners, matrix);
    }
}
declare module feng3d {
    /**
     * 资源处理
     * @author feng 2014-3-24
     */
    class Cast {
        private static _notClasses;
        private static _classes;
        /**
         * 获取类定义
         * @param name		类描述字符串
         * @return			类定义
         */
        static tryClass(name: string): Object;
        /**
         * 转换位图数据
         * @param data		位图数据
         * @return 			位图数据
         */
        static bitmapData(data: any): BitmapData;
        /**
         * 转换位图纹理
         * @param data		位图数据
         * @return 			位图纹理
         */
        static bitmapTexture(data: any): BitmapTexture;
    }
}
declare module feng3d {
    /**
     *
     * @author feng 2015-4-28
     */
    class ColliderUtils {
        constructor();
        /**
         * 射线与三角形碰撞
         * @param rayPosition		射线顶点
         * @param rayDirection		射线方向
         * @param p0				三角形顶点0
         * @param p1				三角形顶点1
         * @param p2				三角形顶点2
         * @return					交点
         */
        static rayTriangleCollision(rayPosition: Vector3D, rayDirection: Vector3D, p0: Vector3D, p1: Vector3D, p2: Vector3D): Vector3D;
    }
}
declare module feng3d {
    class DefaultMaterialManager {
        private static _defaultTextureBitmapData;
        private static _defaultMaterial;
        private static _defaultTexture;
        static getDefaultMaterial(): TextureMaterial;
        static getDefaultTexture(): BitmapTexture;
        private static createDefaultTexture(color?);
        private static createDefaultMaterial();
    }
}
declare module feng3d {
    /**
     *
     * @author feng 2014-5-19
     */
    class GeomUtil {
        /** stage3d单次渲染支持的最大顶点数 */
        static MAX_VERTEX: number;
        /**
         * 根据数据数组创建子网格
         * @param verts
         * @param indices
         * @param uvs
         * @param normals
         * @param tangents
         * @param weights
         * @param jointIndices
         * @param triangleOffset
         * @return
         */
        static fromVectors(verts: number[], indices: number[], uvs: number[], weights: number[], jointIndices: number[], triangleOffset?: number): SubGeometry[];
        static constructSubGeometry(verts: number[], indices: number[], uvs: number[], weights: number[], jointIndices: number[], triangleOffset: number): SubGeometry;
        /**
         * 拷贝子网格数据
         * @param source 源子网格
         * @param target 目标子网格
         */
        static copyDataSubGeom(source: SubGeometry, target: SubGeometry): void;
        /**
         * source添加到target中
         * @param source 源自几何体
         * @param target 目标子几何体
         * @return true：添加成功；false：添加失败，应该是顶点个数超出最大值65535
         */
        static addSubGeometry(source: SubGeometry, target: SubGeometry): boolean;
    }
}
declare module feng3d {
    /**
     * 纹理材质工厂
     * @author feng 2014-7-7
     */
    class MaterialUtils {
        private static dispatcher;
        /**
         * 创建纹理材质
         * @param url		贴图路径
         * @return			纹理材质
         */
        static createTextureMaterial(url: string): TextureMaterial;
        protected static onLoadSingleComplete(event: LoadUrlEvent): void;
    }
}
declare module feng3d {
    /**
     * MipmapGenerator is a helper class that uploads BitmapData to a Texture including mipmap levels.
     */
    class MipmapGenerator {
        private static _matrix;
        private static _rect;
        /**
         * Uploads a BitmapData with mip maps to a target Texture object.
         * @param source The source BitmapData to upload.
         * @param target The target Texture to upload to.
         * @param mipmap An optional mip map holder to avoids creating new instances for fe animated materials.
         * @param alpha Indicate whether or not the uploaded bitmapData is transparent.
         */
        static generateMipMaps(source: BitmapData, target: TextureBase, mipmap?: BitmapData, alpha?: boolean, side?: number): void;
    }
}
declare module feng3d {
    /**
     *
     * @author feng 2014-12-18
     */
    class SubGeomUtil {
        /**
         * 更新面法线数据
         * @param _faceNormals
         * @param vertices
         * @param _faceWeights
         * @param _indices
         * @param _useFaceWeights
         * @return
         */
        static updateFaceNormals(_faceNormals: number[], vertices: number[], _indices: number[]): number[];
        /**
         * 更新面切线数据
         * @param _faceTangents
         * @param vertices
         * @param uvs
         * @param _indices
         * @return
         *
         */
        static updateFaceTangents(_faceTangents: number[], vertices: number[], uvs: number[], _indices: number[]): number[];
        /**
         * 计算顶点法线数据
         * @param target
         * @param _faceNormals
         * @param _faceWeights
         * @param _indices
         * @param numVertices
         * @param _useFaceWeights
         * @return
         */
        static updateVertexNormals(target: number[], _faceNormals: number[], _indices: number[], numVertices: number): number[];
        /**
         * 计算切线数据
         * @param target
         * @param _faceTangents
         * @param _faceWeights
         * @param _indices
         * @param numVertices
         * @param _useFaceWeights
         * @return
         */
        static updateVertexTangents(target: number[], _faceTangents: number[], _indices: number[], numVertices: number): number[];
    }
}
declare module feng3d {
    /**
     * 纹理工具类
     * @author feng 2015-7-7
     */
    class TextureUtils {
        /**
         * 支持的最大纹理尺寸
         */
        private static MAX_SIZE;
        /**
         * 判断是否为有效位图
         * @param bitmapData		位图
         * @return
         */
        static isBitmapDataValid(bitmapData: BitmapData): boolean;
        /**
         * 尺寸是否有效
         * @param d		尺寸
         * @return
         */
        static isDimensionValid(d: number): boolean;
        /**
         * 是否为2的指数次方
         * @param value			被检查的值
         * @return
         */
        static isPowerOfTwo(value: number): boolean;
        /**
         * 转换为最佳2的指数次方值
         * @param value			尺寸
         * @return
         */
        static getBestPowerOf2(value: number): number;
        /**
         * 获取纹理取样参数
         * @param useMipmapping 		是否使用贴图分层细化
         * @param useSmoothTextures 	是否使用平滑纹理
         * @param repeatTextures 		是否重复纹理
         * @param texture 				取样纹理
         * @param forceWrap 			强制重复纹理参数
         * @return
         */
        static getFlags(useMipmapping: boolean, useSmoothTextures: boolean, repeatTextures: boolean, texture: TextureProxyBase, forceWrap?: string): string[];
    }
}
declare module feng3d {
    /**
     * 向量工具类
     * @author feng 2014-12-10
     */
    class VectorUtils {
        /**
         * 把source添加到target中
         * @param source 源向量
         * @param target 目标向量
         */
        static add(source: number[], target: number[]): number[];
        /**
         * 拷贝数组
         * @param source		源数组
         * @param target		目标数组
         * @param offset		在源数组中的偏移量
         */
        static copy(source: number[], target: number[], offset: number): void;
        /**
         * 把source添加到target中
         * @param source 源向量
         * @param target 目标向量
         */
        static add1(source: number[], target: number[], addNum: number): number[];
    }
}
declare module feng3d {
    /**
     * Fagal
     * @author feng 2015-4-27
     */
    class Fagal {
        /**
         * 网站
         */
        static WEBSITE_URL: string;
        /**
         * Fagal版本号
         */
        static REVISION: string;
    }
}
declare module feng3d {
    class Bitmap extends DisplayObject {
    }
}
declare module feng3d {
    class BitmapData {
        getPixel: any;
        transparent: any;
        height: any;
        width: any;
        rect: any;
        draw(sourceMC: any, t: any, s: any, dd: any, rect: any, d: any): void;
        constructor(sclw: any, sclh: any, transparent: any, c?: any);
        copyPixels(tmpCache: any, rect: any, pastePoint: any): void;
        fillRect(rect: any, d: any): void;
        dispose(): void;
        setPixel(i: any, j: any, k: any): void;
    }
}
declare module feng3d {
    class BlendMode {
        static ADD: string;
        static ALPHA: string;
        static DARKEN: string;
        static DIFFERENCE: string;
        static ERASE: string;
        static HARDLIGHT: string;
        static INVERT: string;
        static LAYER: string;
        static LIGHTEN: string;
        static MULTIPLY: string;
        static NORMAL: string;
        static OVERLAY: string;
        static SCREEN: string;
        static SHADER: string;
        static SUBTRACT: string;
    }
}
declare module feng3d {
    class BulkLoader extends EventDispatcher {
        static LOG_ERRORS: any;
        start: any;
        isRunning: any;
        logLevel: any;
        constructor(a: any);
        static COMPLETE: any;
        static PROGRESS: any;
        items: any;
        hasItem(_url: any): void;
        add(_url: any, d?: any): void;
        get(_url: any): LoadingItem;
    }
}
declare module feng3d {
    class BulkProgressEvent {
    }
}
declare module feng3d {
    class ColorTransform {
        redMultiplier: any;
        greenMultiplier: any;
        blueMultiplier: any;
        alphaMultiplier: any;
        redOffset: any;
        greenOffset: any;
        blueOffset: any;
        alphaOffset: any;
    }
}
declare module feng3d {
    class Context3DBlendFactor {
        static ONE: any;
        static ZERO: any;
        static SOURCE_ALPHA: any;
        static ONE_MINUS_SOURCE_ALPHA: any;
        static SOURCE_COLOR: any;
        static ONE_MINUS_SOURCE_COLOR: any;
    }
}
declare module feng3d {
    class Context3DCompareMode {
        static LESS_EQUAL: any;
        static ALWAYS: any;
        static BACK: any;
        static LESS: any;
    }
}
declare module feng3d {
    class Context3DMipFilter {
        static MIPLINEAR: any;
        static MIPNEAREST: any;
    }
}
declare module feng3d {
    class Context3DProfile {
        static STANDARD: any;
    }
}
declare module feng3d {
    class Context3DTextureFormat {
        static BGRA: any;
    }
}
declare module feng3d {
    class Context3DTriangleFace {
        static BACK: any;
        static NONE: any;
    }
}
declare module feng3d {
    class CubeTexture {
    }
}
declare module feng3d {
    class DisplayObject extends EventDispatcher {
        alpha: any;
        localToGlobal: any;
        stage: Stage;
        visible: any;
        parent: any;
        x: any;
        getx(): any;
        gety(): any;
        y: any;
        width: any;
        height: any;
        transform: any;
        blendMode: any;
    }
}
declare module feng3d {
    class Endian {
        static LITTLE_ENDIAN: any;
    }
}
declare module feng3d {
    class ImageItem {
        content: any;
        getDefinitionByName: any;
    }
}
declare module feng3d {
    class IOErrorEvent {
        static IO_ERROR: any;
    }
}
declare module feng3d {
    class Loader {
    }
}
declare module feng3d {
    class LoadingItem extends EventDispatcher {
        content: any;
        isLoaded: any;
    }
}
declare module feng3d {
    class Matrix {
        rotate: any;
        identity: any;
        a: any;
        b: any;
        c: any;
        d: any;
        tx: any;
        ty: any;
        scale(sclw: any, sclh: any): void;
    }
}
declare module feng3d {
    class MovieClip extends Sprite {
        totalFrames: any;
        gotoAndStop(a: any): void;
        draw(sourceMC: any, t: any, a: any, b: any, rect: any, d: any): void;
    }
}
declare module feng3d {
    class Rectangle {
        width: any;
        height: any;
        x: any;
        y: any;
    }
}
declare module feng3d {
    class SecurityErrorEvent {
        static SECURITY_ERROR: any;
    }
}
declare module feng3d {
    class Shape extends DisplayObject {
    }
}
declare module feng3d {
    class Sprite extends DisplayObject {
        mouseX: any;
        mouseY: any;
        addChild: any;
        doubleClickEnabled: any;
        graphics: any;
    }
}
declare module feng3d {
    class Stage extends DisplayObject {
        stage3Ds: any;
        stageWidth: any;
        stageHeight: any;
    }
}
declare module feng3d {
    class Texture {
        uploadFromBitmapData(bitmapData: any, n: any): void;
    }
}
declare module feng3d {
    class TextureBase {
    }
}
declare module feng3d {
    class Timer extends EventDispatcher {
        constructor(a: any, b: any);
        start(): void;
        stop(): void;
    }
}
declare module feng3d {
    class TimerEvent {
        static TIMER: any;
    }
}
declare module feng3d {
    class URLLoader extends EventDispatcher {
        load: any;
        bytesLoaded: any;
    }
}
declare module feng3d {
    class URLRequest {
        constructor(url: any);
    }
}
declare module feng3d {
    class Context3D {
        enableErrorChecking: any;
        dispose: any;
        driverInfo: any;
        setScissorRectangle: any;
        present: any;
        clear: any;
        configureBackBuffer: any;
        setRenderToTexture: any;
        setProgram: any;
        setProgramConstantsFromVector: any;
        createVertexBuffer: any;
        drawTriangles: any;
        createIndexBuffer: any;
        setDepthTest: any;
        setBlendFactors: any;
        setProgramConstantsFromMatrix: any;
        setProgramConstantsFromByteArray: any;
        setCulling: any;
        createTexture(width: any, height: any, format: any, b: any): Texture;
        createProgram(): Program3D;
        setRenderToBackBuffer(): void;
        setVertexBufferAt: any;
        setTextureAt(i: any, b: any): void;
    }
}
declare module feng3d {
    class Context3DProgramType {
        static FRAGMENT: string;
        static VERTEX: string;
    }
}
declare module feng3d {
    class Context3DRenderMode {
        static SOFTWARE: any;
        static AUTO: any;
    }
}
declare module feng3d {
    class Context3DTextureFilter {
        static ANISOTROPIC16X: string;
        static ANISOTROPIC2X: string;
        static ANISOTROPIC4X: string;
        static ANISOTROPIC8X: string;
        static LINEAR: string;
        static NEAREST: string;
    }
}
declare module feng3d {
    class Context3DVertexBufferFormat {
        static FLOAT_1: any;
        static FLOAT_2: any;
        static FLOAT_3: any;
        static FLOAT_4: any;
    }
}
declare module feng3d {
    class Context3DWrapMode {
        static CLAMP: string;
        static CLAMP_U_REPEAT_V: string;
        static REPEAT: string;
        static REPEAT_U_CLAMP_V: string;
    }
}
declare module feng3d {
    class IndexBuffer3D {
        uploadFromVector: any;
    }
}
declare module feng3d {
    class Program3D {
        upload(vertexByteCode: any, fragmentByteCode: any): void;
    }
}
declare module feng3d {
    class Stage3D extends DisplayObject {
        context3D: any;
        requestContext3D: any;
    }
}
declare module feng3d {
    class VertexBuffer3D {
        uploadFromVector: any;
    }
}
declare module feng3d {
    class AGALMiniAssembler {
        constructor(b: any);
        assemble(a: any, noCommentCode: any): void;
    }
}
declare module feng3d {
    class ByteArray {
        endian: any;
        position: any;
        bytesAvailable: any;
        readUTFBytes(a: any): string;
        readUnsignedShort(): number;
        readFloat(): number;
        readUnsignedInt(): number;
        readShort(): number;
        readByte(): number;
        readUnsignedByte(): number;
    }
}
declare module feng3d {
    class Proxy {
    }
}
declare module feng3d {
    class MouseEvent extends Event {
        static CLICK: any;
        static DOUBLE_CLICK: any;
        static MOUSE_DOWN: any;
        static MOUSE_MOVE: any;
        static MOUSE_OUT: any;
        static MOUSE_OVER: any;
        static MOUSE_UP: any;
        static MOUSE_WHEEL: any;
    }
}
