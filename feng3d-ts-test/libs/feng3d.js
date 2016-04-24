var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Feng3D
 */
var Feng3D = (function () {
    function Feng3D(parameters) {
        console.log("Feng3D version " + Feng3D.REVISION);
    }
    Feng3D.REVISION = 0;
    return Feng3D;
}());
var feng3d;
(function (feng3d) {
    /**
     * 断言
     * @b			判定为真的表达式
     * @msg			在表达式为假时将输出的错误信息
     * @author feng 2014-10-29
     */
    function assert(b, msg) {
        if (msg === void 0) { msg = "assert"; }
        if (!b)
            throw new Error(msg);
    }
    feng3d.assert = assert;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 获取对象的完全限定类名
     * @author feng 2016-4-24
     */
    function getQualifiedClassName(value) {
        var type = typeof value;
        if (!value || (type != "object" && !value.prototype)) {
            return type;
        }
        var prototype = value.prototype ? value.prototype : Object.getPrototypeOf(value);
        var constructorString = prototype.constructor.toString().trim();
        var className = /([\w$]+)\(/.exec(constructorString)[1];
        return className;
    }
    feng3d.getQualifiedClassName = getQualifiedClassName;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 自定义事件
     * @author warden_feng 2014-5-7
     */
    var Event = (function () {
        /**
         * 创建一个作为参数传递给事件侦听器的 Event 对象。
         * @param type 事件的类型，可以作为 Event.type 访问。
         * @param bubbles 确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
         * @param cancelable 确定是否可以取消 Event 对象。默认值为 false。
         */
        function Event(type, data, bubbles, cancelable) {
            if (data === void 0) { data = null; }
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            this._type = type;
            this._bubbles = bubbles;
            this.data = data;
        }
        /**
         * 防止对事件流中当前节点中和所有后续节点中的事件侦听器进行处理。此方法会立即生效，并且会影响当前节点中的事件侦听器。相比之下，在当前节点中的所有事件侦听器都完成处理之前，stopPropagation() 方法不会生效。
         */
        Event.prototype.stopImmediatePropagation = function () {
            this._stopsPropagation = this._stopsImmediatePropagation = true;
        };
        /**
         * 防止对事件流中当前节点的后续节点中的所有事件侦听器进行处理。此方法不会影响当前节点 (currentTarget) 中的任何事件侦听器。相比之下，stopImmediatePropagation() 方法可以防止对当前节点中和后续节点中的事件侦听器进行处理。对此方法的其他调用没有任何效果。可以在事件流的任何阶段中调用此方法。
         */
        Event.prototype.stopPropagation = function () {
            this._stopsPropagation = true;
        };
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
        Object.defineProperty(Event.prototype, "stopsImmediatePropagation", {
            get: function () {
                return this._stopsImmediatePropagation;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Event.prototype, "stopsPropagation", {
            get: function () {
                return this._stopsPropagation;
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
            this._target = target;
            if (this._target == null)
                this._target = this;
            this.listenerVOUtils = new ListenerVOUtils();
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
            var listeners = this.listenerVOUtils.getListeners(type);
            this.listenerVOUtils.remove(listeners, listener, thisObject);
            this.listenerVOUtils.add(listeners, listener, thisObject, priority);
        };
        /**
         * 从 EventDispatcher 对象中删除侦听器. 如果没有向 EventDispatcher 对象注册任何匹配的侦听器，则对此方法的调用没有任何效果。
         *
         * @param type						事件的类型。
         * @param listener					要删除的侦听器对象。
         * @param thisObject                listener函数作用域
         */
        EventDispatcher.prototype.removeEventListener = function (type, listener, thisObject) {
            var listeners = this.listenerVOUtils.getListeners(type);
            this.listenerVOUtils.remove(listeners, listener, thisObject);
        };
        /**
         * 将事件调度到事件流中. 事件目标是对其调用 dispatchEvent() 方法的 EventDispatcher 对象。
         *
         * @param event						调度到事件流中的 Event 对象。如果正在重新调度事件，则会自动创建此事件的一个克隆。在调度了事件后，其 target 属性将无法更改，因此您必须创建此事件的一个新副本以能够重新调度。
         * @return 							如果成功调度了事件，则值为 true。值 false 表示失败或对事件调用了 preventDefault()。
         *
         */
        EventDispatcher.prototype.dispatchEvent = function (event) {
            //停止事件流
            if (!event || event.stopsPropagation)
                return false;
            //设置目标
            event.target = this._target;
            //处理当前事件(目标阶段)
            var listeners = this.listenerVOUtils.getListeners(event.type);
            this.listenerVOUtils.dispatchEvent(listeners, event);
            //事件冒泡(冒泡阶段)
            if (event.bubbles && this.parentDispatcher) {
                this.parentDispatcher.dispatchEvent(event);
            }
            return event.stopsPropagation;
        };
        /**
         * 检查 EventDispatcher 对象是否为特定事件类型注册了任何侦听器. 这样，您就可以确定 EventDispatcher 对象在事件流层次结构中的哪个位置改变了对事件类型的处理。要确定特定事件类型是否确实触发了事件侦听器，请使用 willTrigger()。
         *
         * @param type		事件的类型。
         * @return 			如果指定类型的侦听器已注册，则值为 true；否则，值为 false。
         */
        EventDispatcher.prototype.hasEventListener = function (type) {
            var listeners = this.listenerVOUtils.getListeners(type);
            return listeners.length > 0;
        };
        Object.defineProperty(EventDispatcher.prototype, "parentDispatcher", {
            /**
             * 父事件适配器
             */
            get: function () {
                return this._target[this.bubbleAttribute];
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
         * 获取某类型事件的监听列表
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
        ListenerVOUtils.prototype.add = function (listeners, listener, thisObject, priority) {
            if (thisObject === void 0) { thisObject = null; }
            if (priority === void 0) { priority = 0; }
            var addItem = { listener: listener, thisObject: thisObject, priority: priority };
            for (var i = 0; i < listeners.length; i++) {
                var element = listeners[i];
                if (addItem.priority > element.priority) {
                    break;
                }
            }
            listeners.splice(i, 0, addItem);
        };
        /**
         * 移除监听
         */
        ListenerVOUtils.prototype.remove = function (listeners, listener, thisObject) {
            if (thisObject === void 0) { thisObject = null; }
            for (var i = listeners.length - 1; i >= 0; i--) {
                var element = listeners[i];
                if (element.listener == listener && element.thisObject == thisObject) {
                    listeners.splice(i, 1);
                }
            }
        };
        /**
         * 派发事件
         */
        ListenerVOUtils.prototype.dispatchEvent = function (listeners, event) {
            for (var i = 0; i < listeners.length && !event.stopsImmediatePropagation; i++) {
                var element = listeners[i];
                element.listener.call(element.thisObject, event);
            }
        };
        return ListenerVOUtils;
    }());
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 组件事件
     * @author feng 2015-12-2
     */
    var ComponentEvent = (function (_super) {
        __extends(ComponentEvent, _super);
        function ComponentEvent(type, data, bubbles, cancelable) {
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            _super.call(this, type, data, bubbles, cancelable);
        }
        /**
         * 添加子组件事件
         */
        ComponentEvent.ADDED_COMPONET = "addedComponet";
        /**
         * 被组件容器添加事件
         */
        ComponentEvent.BE_ADDED_COMPONET = "beAddedComponet";
        /**
         * 移除子组件事件
         */
        ComponentEvent.REMOVED_COMPONET = "removedComponet";
        /**
         * 被容器删除事件
         */
        ComponentEvent.BE_REMOVED_COMPONET = "beRemovedComponet";
        return ComponentEvent;
    }(feng3d.Event));
    feng3d.ComponentEvent = ComponentEvent;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 组件容器（集合）
     * @author feng 2015-5-6
     */
    var Component = (function (_super) {
        __extends(Component, _super);
        /**
         * 创建一个组件容器
         */
        function Component() {
            _super.call(this);
            /**
             * 组件列表
             */
            this.components = [];
        }
        Object.defineProperty(Component.prototype, "componentName", {
            /**
             * 组件名称
             */
            get: function () {
                if (this._componentName == null)
                    this._componentName = feng3d.getQualifiedClassName(this).split("::").pop();
                return this._componentName;
            },
            set: function (value) {
                this._componentName = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Component.prototype, "numComponents", {
            /**
             * 子组件个数
             */
            get: function () {
                return this.components.length;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 添加组件
         * @param component 被添加组件
         */
        Component.prototype.addComponent = function (component) {
            if (this.hasComponent(component)) {
                this.setComponentIndex(component, this.components.length - 1);
                return;
            }
            this.addComponentAt(component, this.components.length);
        };
        /**
         * 添加组件到指定位置
         * @param component		被添加的组件
         * @param index			插入的位置
         */
        Component.prototype.addComponentAt = function (component, index) {
            feng3d.assert(component != this, "子项与父项不能相同");
            feng3d.assert(index >= 0 && index <= this.numComponents, "给出索引超出范围");
            if (this.hasComponent(component)) {
                index = Math.min(index, this.components.length - 1);
                this.setComponentIndex(component, index);
                return;
            }
            this.components.splice(index, 0, component);
            this.dispatchAddedEvent(component);
        };
        /**
         * 移除组件
         * @param component 被移除组件
         */
        Component.prototype.removeComponent = function (component) {
            feng3d.assert(this.hasComponent(component), "只能移除在容器中的组件");
            var index = this.getComponentIndex(component);
            this.removeComponentAt(index);
        };
        /**
         * 移除组件
         * @param index		要删除的 Component 的子索引。
         */
        Component.prototype.removeComponentAt = function (index) {
            feng3d.assert(index >= 0 && index < this.numComponents, "给出索引超出范围");
            var removeComponent = this.components.splice(index, 1)[0];
            return removeComponent;
        };
        /**
         * 获取组件在容器的索引位置
         * @param component			查询的组件
         * @return				    组件在容器的索引位置
         */
        Component.prototype.getComponentIndex = function (component) {
            feng3d.assert(this.components.indexOf(component) != -1, "组件不在容器中");
            var index = this.components.indexOf(component);
            return index;
        };
        /**
         * 设置子组件的位置
         * @param component				子组件
         * @param index				位置索引
         */
        Component.prototype.setComponentIndex = function (component, index) {
            feng3d.assert(index >= 0 && index < this.numComponents, "给出索引超出范围");
            var oldIndex = this.components.indexOf(component);
            feng3d.assert(oldIndex >= 0 && oldIndex < this.numComponents, "子组件不在容器内");
            this.components.splice(oldIndex, 1);
            this.components.splice(index, 0, component);
        };
        /**
         * 获取指定位置索引的子组件
         * @param index			位置索引
         * @return				子组件
         */
        Component.prototype.getComponentAt = function (index) {
            feng3d.assert(index < this.numComponents, "给出索引超出范围");
            return this.components[index];
        };
        /**
         * 根据组件名称获取组件
         * <p>注意：此处比较的是componentName而非name</p>
         * @param componentName		组件名称
         * @return 					获取到的组件
         */
        Component.prototype.getComponentByName = function (componentName) {
            var filterResult = this.getComponentsByName(this.componentName);
            return filterResult[0];
        };
        /**
         * 获取与给出组件名称相同的所有组件
         * <p>注意：此处比较的是componentName而非name</p>
         * @param componentName		组件名称
         * @return 					获取到的组件
         */
        Component.prototype.getComponentsByName = function (componentName) {
            var filterResult = this.components.filter(function (item) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                return item.componentName == componentName;
            });
            return filterResult;
        };
        /**
         * 根据类定义获取组件
         * <p>如果存在多个则返回第一个</p>
         * @param cls				类定义
         * @return
         */
        Component.prototype.getComponentByClass = function (cls) {
            var component = this.getComponentsByClass(cls)[0];
            return component;
        };
        /**
         * 根据类定义查找组件
         * @param cls		类定义
         * @return			返回与给出类定义一致的组件
         */
        Component.prototype.getComponentsByClass = function (cls) {
            var filterResult = this.components.filter(function (item) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                return item instanceof cls;
            });
            return filterResult;
        };
        /**
         * 根据类定义获取或创建组件
         * <p>当不存在该类型对象时创建一个该组件并且添加到容器中</p>
         * @param cls
         * @return
         */
        Component.prototype.getOrCreateComponentByClass = function (cls) {
            var component = this.getComponentByClass(cls);
            if (component == null) {
                component = new cls();
                this.addComponent(component);
            }
            return component;
        };
        /**
         * 判断是否拥有组件
         * @param com	被检测的组件
         * @return		true：拥有该组件；false：不拥有该组件。
         */
        Component.prototype.hasComponent = function (com) {
            return this.components.indexOf(com) != -1;
        };
        /**
         * 交换子组件位置
         * @param index1		第一个子组件的索引位置
         * @param index2		第二个子组件的索引位置
         */
        Component.prototype.swapComponentsAt = function (index1, index2) {
            feng3d.assert(index1 >= 0 && index1 < this.numComponents, "第一个子组件的索引位置超出范围");
            feng3d.assert(index2 >= 0 && index2 < this.numComponents, "第二个子组件的索引位置超出范围");
            var temp = this.components[index1];
            this.components[index1] = this.components[index2];
            this.components[index2] = temp;
        };
        /**
         * 交换子组件位置
         * @param a		第一个子组件
         * @param b		第二个子组件
         */
        Component.prototype.swapComponents = function (a, b) {
            feng3d.assert(this.hasComponent(a), "第一个子组件不在容器中");
            feng3d.assert(this.hasComponent(b), "第二个子组件不在容器中");
            this.swapComponentsAt(this.getComponentIndex(a), this.getComponentIndex(b));
        };
        /**
         * 派发子组件事件
         * <p>事件广播给子组件</p>
         * @param event
         */
        Component.prototype.dispatchChildrenEvent = function (event) {
            this.components.forEach(function (item) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                item.dispatchEvent(event);
            });
        };
        /**
         * 派发移除子组件事件
         */
        Component.prototype.dispatchAddedEvent = function (component) {
            var addedComponentEventVO = new AddedComponentEventVO(this, component);
            var addedComponentEvent = new feng3d.ComponentEvent(feng3d.ComponentEvent.ADDED_COMPONET, addedComponentEventVO);
            this.dispatchEvent(addedComponentEvent);
            var beAddedComponentEvent = new feng3d.ComponentEvent(feng3d.ComponentEvent.BE_ADDED_COMPONET, addedComponentEventVO);
            component.dispatchEvent(beAddedComponentEvent);
        };
        return Component;
    }(feng3d.EventDispatcher));
    feng3d.Component = Component;
})(feng3d || (feng3d = {}));
//# sourceMappingURL=feng3d.js.map