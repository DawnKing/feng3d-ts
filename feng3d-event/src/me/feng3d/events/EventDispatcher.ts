module feng3d {

	/**
	 * 为了实现非flash原生显示列表的冒泡事件，自定义事件适配器
	 * @author feng 2016-3-22
	 */
    export class EventDispatcher implements IEventDispatcher {
        /**
         * 名称
         */
        public name: string;

        /** 
         * 冒泡属性名称为“parent” 
         */
        public bubbleAttribute: string = "parent";

        /**
         * 事件适配主体
         */
        private target: IEventDispatcher;

		/**
		 * 构建事件适配器
		 * @param target		事件适配主体
		 */
        constructor(target: IEventDispatcher = null) {
            this.target = target;
            if (this.target == null)
                this.target = this;
        }

        /**
         * 使用 EventDispatcher 对象注册事件侦听器对象，以使侦听器能够接收事件通知。
		 * @param type						事件的类型。
		 * @param listener					处理事件的侦听器函数。
		 * @param thisObject                listener函数作用域
         * @param priority					事件侦听器的优先级。数字越大，优先级越高。默认优先级为 0。
         */
        public addEventListener(type: string, listener: (event: Event) => void, thisObject: any, priority: number = 0): void {
            if (listener == null)
                return;

            $listernerCenter.getDispatcherListener(this.target)//
                .remove(type, listener, thisObject)//
                .add(type, listener, thisObject, priority);
        }

        /**
		 * 从 EventDispatcher 对象中删除侦听器. 如果没有向 IEventDispatcher 对象注册任何匹配的侦听器，则对此方法的调用没有任何效果。
		 *
		 * @param type						事件的类型。
		 * @param listener					要删除的侦听器对象。
         * @param thisObject                listener函数作用域
         */
        public removeEventListener(type: string, listener: (event: Event) => void, thisObject: any): void {

            $listernerCenter.getDispatcherListener(this.target)//
                .remove(type, listener, thisObject);
        }

        /**
		 * 将事件调度到事件流中. 事件目标是对其调用 dispatchEvent() 方法的 IEventDispatcher 对象。
		 * @param event						调度到事件流中的 Event 对象。
         */
        public dispatchEvent(event: Event): void {

            var target = this.target;
            while (target != null) {
                //设置目标
                event.target = target;

                var listeners: ListenerVO[] = $listernerCenter.getDispatcherListener(target).getListeners(event.type);

                //遍历调用事件回调函数
                for (var i = 0; i < listeners.length && !event.isStop; i++) {
                    var element = listeners[i];
                    element.listener.call(element.thisObject, event);
                }

                //事件冒泡(冒泡阶段)
                target = (event.bubbles && !event.isStopBubbles) ? this.parentDispatcher : null;
            }
        }

        /**
		 * 检查 EventDispatcher 对象是否为特定事件类型注册了任何侦听器. 
		 *
		 * @param type		事件的类型。
		 * @return 			如果指定类型的侦听器已注册，则值为 true；否则，值为 false。
         */
        public hasEventListener(type: string): boolean {

            var has: boolean = $listernerCenter.getDispatcherListener(this.target).hasEventListener(type);
            return has;
        }

		/**
		 * 父事件适配器
		 */
        private get parentDispatcher(): IEventDispatcher {
            return this.target[this.bubbleAttribute];
        }
    }

    /**
     * 监听数据
     */
    class ListenerVO {
        /**
         * 监听函数
         */
        listener: (event: Event) => void;
        /**
         * 监听函数作用域
         */
        thisObject: any;
        /**
         * 优先级
         */
        priority: number;
    }

    /**
     * 派发器监听
     */
    class DispatcherListener {
        eventListeners = {};

        /**
         * 判断是否有监听事件
         * @param type  事件类型
         */
        hasEventListener(type: string): boolean {
            return !!this.eventListeners[type];
        }

        /**
         * 获取某类型事件的监听列表
         * @param type  事件类型
         */
        getListeners(type: string): ListenerVO[] {

            var listeners: ListenerVO[] = this.eventListeners[type];
            if (listeners == null)
                listeners = this.eventListeners[type] = [];
            return listeners;
        }

        /**
         * 添加监听
		 * @param type						事件的类型。
		 * @param listener					处理事件的侦听器函数。
		 * @param thisObject                listener函数作用域
         * @param priority					事件侦听器的优先级。数字越大，优先级越高。默认优先级为 0。
         */
        add(type: string, listener: (event: Event) => any, thisObject: any = null, priority: number = 0): this {

            var listeners: ListenerVO[] = this.getListeners(type);

            var addItem: ListenerVO = { listener: listener, thisObject: thisObject, priority: priority };
            for (var i = 0; i < listeners.length; i++) {
                var element = listeners[i];
                if (addItem.priority > element.priority) {
                    i++;
                    break;
                }
            }
            listeners.splice(i, 0, addItem);

            return this;
        }

        /**
         * 移除监听
		 * @param type						事件的类型。
		 * @param listener					要删除的侦听器对象。
         * @param thisObject                listener函数作用域
         */
        remove(type: string, listener: (event: Event) => any, thisObject: any = null): this {

            var listeners: ListenerVO[] = this.getListeners(type);

            for (var i = listeners.length - 1; i >= 0; i--) {
                var element = listeners[i];
                if (element.listener == listener && element.thisObject == thisObject) {
                    listeners.splice(i, 1);
                }
            }
            return this;
        }
    }

    /**
     * 事件监听中心
     */
    class ListenerCenter {
        /**
         * 派发器与监听器字典
         */
        map: { dispatcher: IEventDispatcher, listener: DispatcherListener }[] = [];

        /**
         * 获取派发器监听
         * @param dispatcher 派发器
         */
        getDispatcherListener(dispatcher: IEventDispatcher): DispatcherListener {
            this.map.forEach(element => {
                if (element.dispatcher == dispatcher)
                    return element.listener;
            });

            var listenerVOUtils = new DispatcherListener();
            this.map.push({ dispatcher: dispatcher, listener: listenerVOUtils });
            return listenerVOUtils;
        }
    }

    /**
     * 事件监听中心
     */
    var $listernerCenter = new ListenerCenter;
}
