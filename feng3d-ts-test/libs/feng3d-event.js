var feng3d;
(function (feng3d) {
    /**
     * 事件
     * @author warden_feng 2014-5-7
     */
    var Event = (function () {
        /**
         * 创建一个作为参数传递给事件侦听器的 Event 对象。
         * @param type 事件的类型，可以作为 Event.type 访问。
         * @param bubbles 确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
         */
        function Event(type, data, bubbles) {
            if (data === void 0) { data = null; }
            if (bubbles === void 0) { bubbles = false; }
            this._type = type;
            this._bubbles = bubbles;
            this.data = data;
        }
        Object.defineProperty(Event.prototype, "isStop", {
            /**
             * 是否停止处理事件监听器
             */
            get: function () {
                return this._isStop;
            },
            set: function (value) {
                this._isStopBubbles = this._isStop = this._isStopBubbles || value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Event.prototype, "isStopBubbles", {
            /**
             * 是否停止冒泡
             */
            get: function () {
                return this._isStopBubbles;
            },
            set: function (value) {
                this._isStopBubbles = this._isStopBubbles || value;
            },
            enumerable: true,
            configurable: true
        });
        Event.prototype.tostring = function () {
            return "[" + (typeof this) + " type=\"" + this._type + "\" bubbles=" + this._bubbles + "]";
        };
        Object.defineProperty(Event.prototype, "bubbles", {
            /**
             * 表示事件是否为冒泡事件。如果事件可以冒泡，则此值为 true；否则为 false。
             */
            get: function () {
                return this._bubbles;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Event.prototype, "type", {
            /**
             * 事件的类型。类型区分大小写。
             */
            get: function () {
                return this._type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Event.prototype, "target", {
            /**
             * 事件目标。
             */
            get: function () {
                return this._target;
            },
            set: function (value) {
                this._currentTarget = value;
                if (this._target == null) {
                    this._target = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Event.prototype, "currentTarget", {
            /**
             * 当前正在使用某个事件侦听器处理 Event 对象的对象。
             */
            get: function () {
                return this._currentTarget;
            },
            enumerable: true,
            configurable: true
        });
        return Event;
    }());
    feng3d.Event = Event;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 为了实现非flash原生显示列表的冒泡事件，自定义事件适配器
     * @author feng 2016-3-22
     */
    var EventDispatcher = (function () {
        /**
         * 构建事件适配器
         * @param target		事件适配主体
         */
        function EventDispatcher(target) {
            if (target === void 0) { target = null; }
            /**
             * 冒泡属性名称为“parent”
             */
            this.bubbleAttribute = "parent";
            this.target = target;
            if (this.target == null)
                this.target = this;
        }
        /**
         * 使用 EventDispatcher 对象注册事件侦听器对象，以使侦听器能够接收事件通知。
         * @param type						事件的类型。
         * @param listener					处理事件的侦听器函数。此函数必须接受 Event 对象作为其唯一的参数，并且不能返回任何结果，如下面的实例所示： <pre>function(evt:Event):void</pre>函数可以有任何名称。
         * @param thisObject                listener函数作用域
         * @param priority					事件侦听器的优先级。优先级由一个带符号的 32 位整数指定。数字越大，优先级越高。优先级为 n 的所有侦听器会在优先级为 n -1 的侦听器之前得到处理。如果两个或更多个侦听器共享相同的优先级，则按照它们的添加顺序进行处理。默认优先级为 0。
         */
        EventDispatcher.prototype.addEventListener = function (type, listener, thisObject, priority) {
            if (priority === void 0) { priority = 0; }
            if (listener == null)
                return;
            $listernerCenter.getListenerVOUtils(this.target) //
                .remove(type, listener, thisObject) //
                .add(type, listener, thisObject, priority);
        };
        /**
         * 从 EventDispatcher 对象中删除侦听器. 如果没有向 EventDispatcher 对象注册任何匹配的侦听器，则对此方法的调用没有任何效果。
         *
         * @param type						事件的类型。
         * @param listener					要删除的侦听器对象。
         * @param thisObject                listener函数作用域
         */
        EventDispatcher.prototype.removeEventListener = function (type, listener, thisObject) {
            $listernerCenter.getListenerVOUtils(this.target) //
                .remove(type, listener, thisObject);
        };
        /**
         * 将事件调度到事件流中. 事件目标是对其调用 dispatchEvent() 方法的 EventDispatcher 对象。
         *
         * @param event						调度到事件流中的 Event 对象。如果正在重新调度事件，则会自动创建此事件的一个克隆。在调度了事件后，其 target 属性将无法更改，因此您必须创建此事件的一个新副本以能够重新调度。
         */
        EventDispatcher.prototype.dispatchEvent = function (event) {
            var target = this.target;
            while (target != null && !event.isStopBubbles) {
                //设置目标
                event.target = target;
                var listeners = $listernerCenter.getListenerVOUtils(target).getListeners(event.type);
                //遍历调用事件回调函数
                for (var i = 0; i < listeners.length && !event.isStop; i++) {
                    var element = listeners[i];
                    element.listener.call(element.thisObject, event);
                }
                //事件冒泡(冒泡阶段)
                target = event.bubbles ? this.parentDispatcher : null;
            }
        };
        /**
         * 检查 EventDispatcher 对象是否为特定事件类型注册了任何侦听器. 这样，您就可以确定 EventDispatcher 对象在事件流层次结构中的哪个位置改变了对事件类型的处理。要确定特定事件类型是否确实触发了事件侦听器，请使用 willTrigger()。
         *
         * @param type		事件的类型。
         * @return 			如果指定类型的侦听器已注册，则值为 true；否则，值为 false。
         */
        EventDispatcher.prototype.hasEventListener = function (type) {
            var has = $listernerCenter.getListenerVOUtils(this.target).hasEventListener(type);
            return has;
        };
        Object.defineProperty(EventDispatcher.prototype, "parentDispatcher", {
            /**
             * 父事件适配器
             */
            get: function () {
                return this.target[this.bubbleAttribute];
            },
            enumerable: true,
            configurable: true
        });
        return EventDispatcher;
    }());
    feng3d.EventDispatcher = EventDispatcher;
    /**
     * 监听数据
     */
    var ListenerVO = (function () {
        function ListenerVO() {
        }
        return ListenerVO;
    }());
    /**
     * 监听数据工具类
     */
    var ListenerVOUtils = (function () {
        function ListenerVOUtils() {
            this.eventListeners = {};
        }
        /**
         * 判断是否有监听事件
         * @param type  事件类型
         */
        ListenerVOUtils.prototype.hasEventListener = function (type) {
            return !!this.eventListeners[type];
        };
        /**
         * 获取某类型事件的监听列表
         * @param type  事件类型
         */
        ListenerVOUtils.prototype.getListeners = function (type) {
            var listeners = this.eventListeners[type];
            if (listeners == null)
                listeners = this.eventListeners[type] = [];
            return listeners;
        };
        /**
         * 添加监听
         */
        ListenerVOUtils.prototype.add = function (type, listener, thisObject, priority) {
            if (thisObject === void 0) { thisObject = null; }
            if (priority === void 0) { priority = 0; }
            var listeners = this.getListeners(type);
            var addItem = { listener: listener, thisObject: thisObject, priority: priority };
            for (var i = 0; i < listeners.length; i++) {
                var element = listeners[i];
                if (addItem.priority > element.priority) {
                    i++;
                    break;
                }
            }
            listeners.splice(i, 0, addItem);
            return this;
        };
        /**
         * 移除监听
         */
        ListenerVOUtils.prototype.remove = function (type, listener, thisObject) {
            if (thisObject === void 0) { thisObject = null; }
            var listeners = this.getListeners(type);
            for (var i = listeners.length - 1; i >= 0; i--) {
                var element = listeners[i];
                if (element.listener == listener && element.thisObject == thisObject) {
                    listeners.splice(i, 1);
                }
            }
            return this;
        };
        return ListenerVOUtils;
    }());
    /**
     * 事件监听中心
     */
    var ListenerCenter = (function () {
        function ListenerCenter() {
            this.map = [];
        }
        ListenerCenter.prototype.getListenerVOUtils = function (dispatcher) {
            this.map.forEach(function (element) {
                if (element.dispatcher == dispatcher)
                    return element.listener;
            });
            var listenerVOUtils = new ListenerVOUtils();
            this.map.push({ dispatcher: dispatcher, listener: listenerVOUtils });
            return listenerVOUtils;
        };
        return ListenerCenter;
    }());
    var $listernerCenter = new ListenerCenter;
})(feng3d || (feng3d = {}));
//# sourceMappingURL=feng3d-event.js.map