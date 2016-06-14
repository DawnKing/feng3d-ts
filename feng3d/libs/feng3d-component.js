var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var me;
(function (me) {
    var feng3d;
    (function (feng3d) {
        /**
         * 组件事件
         * @author feng 2015-12-2
         */
        var ComponentEvent = (function (_super) {
            __extends(ComponentEvent, _super);
            /**
             * 构建组件事件
             */
            function ComponentEvent(type, data, bubbles) {
                if (bubbles === void 0) { bubbles = false; }
                _super.call(this, type, data, bubbles);
            }
            /**
             * 添加子组件事件
             */
            ComponentEvent.ADDED_COMPONENT = "addedComponent";
            /**
             * 被组件容器添加事件
             */
            ComponentEvent.BE_ADDED_COMPONENT = "beAddedComponet";
            /**
             * 移除子组件事件
             */
            ComponentEvent.REMOVED_COMPONENT = "removedComponent";
            /**
             * 被容器删除事件
             */
            ComponentEvent.BE_REMOVED_COMPONENT = "beRemovedComponent";
            return ComponentEvent;
        }(feng3d.Event));
        feng3d.ComponentEvent = ComponentEvent;
    })(feng3d = me.feng3d || (me.feng3d = {}));
})(me || (me = {}));
var me;
(function (me) {
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
                assert(component != this, "子项与父项不能相同");
                assert(index >= 0 && index <= this.numComponents, "给出索引超出范围");
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
                assert(this.hasComponent(component), "只能移除在容器中的组件");
                var index = this.getComponentIndex(component);
                this.removeComponentAt(index);
            };
            /**
             * 移除组件
             * @param index		要删除的 Component 的子索引。
             */
            Component.prototype.removeComponentAt = function (index) {
                assert(index >= 0 && index < this.numComponents, "给出索引超出范围");
                var component = this.components.splice(index, 1)[0];
                this.dispatchRemovedEvent(component);
                return component;
            };
            /**
             * 获取组件在容器的索引位置
             * @param component			查询的组件
             * @return				    组件在容器的索引位置
             */
            Component.prototype.getComponentIndex = function (component) {
                assert(this.components.indexOf(component) != -1, "组件不在容器中");
                var index = this.components.indexOf(component);
                return index;
            };
            /**
             * 设置子组件的位置
             * @param component				子组件
             * @param index				位置索引
             */
            Component.prototype.setComponentIndex = function (component, index) {
                assert(index >= 0 && index < this.numComponents, "给出索引超出范围");
                var oldIndex = this.components.indexOf(component);
                assert(oldIndex >= 0 && oldIndex < this.numComponents, "子组件不在容器内");
                this.components.splice(oldIndex, 1);
                this.components.splice(index, 0, component);
            };
            /**
             * 获取指定位置索引的子组件
             * @param index			位置索引
             * @return				子组件
             */
            Component.prototype.getComponentAt = function (index) {
                assert(index < this.numComponents, "给出索引超出范围");
                return this.components[index];
            };
            /**
             * 根据组件名称获取组件
             * <p>注意：此处比较的是componentName而非name</p>
             * @param componentName		组件名称
             * @return 					获取到的组件
             */
            Component.prototype.getComponentByName = function (name) {
                var filterResult = this.getComponentsByName(name);
                return filterResult[0];
            };
            /**
             * 获取与给出组件名称相同的所有组件
             * <p>注意：此处比较的是componentName而非name</p>
             * @param name		        组件名称
             * @return 					获取到的组件
             */
            Component.prototype.getComponentsByName = function (name) {
                var filterResult = this.components.filter(function (item) {
                    var args = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        args[_i - 1] = arguments[_i];
                    }
                    return item.name == name;
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
                assert(index1 >= 0 && index1 < this.numComponents, "第一个子组件的索引位置超出范围");
                assert(index2 >= 0 && index2 < this.numComponents, "第二个子组件的索引位置超出范围");
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
                assert(this.hasComponent(a), "第一个子组件不在容器中");
                assert(this.hasComponent(b), "第二个子组件不在容器中");
                this.swapComponentsAt(this.getComponentIndex(a), this.getComponentIndex(b));
            };
            /**
             * 派发子组件事件
             * <p>事件广播给子组件</p>
             * @param event     事件
             * @param depth     广播深度
             */
            Component.prototype.dispatchChildrenEvent = function (event, depth) {
                if (depth === void 0) { depth = 1; }
                if (depth == 0)
                    return;
                this.components.forEach(function (item) {
                    var args = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        args[_i - 1] = arguments[_i];
                    }
                    item.dispatchEvent(event);
                    item.dispatchChildrenEvent(event, depth - 1);
                });
            };
            /**
             * 派发移除子组件事件
             */
            Component.prototype.dispatchAddedEvent = function (component) {
                this.dispatchEvent(new feng3d.ComponentEvent(feng3d.ComponentEvent.ADDED_COMPONENT, { container: this, child: component }));
                component.dispatchEvent(new feng3d.ComponentEvent(feng3d.ComponentEvent.BE_ADDED_COMPONENT, { container: this, child: component }));
            };
            /**
             * 派发移除子组件事件
             */
            Component.prototype.dispatchRemovedEvent = function (component) {
                this.dispatchEvent(new feng3d.ComponentEvent(feng3d.ComponentEvent.REMOVED_COMPONENT, { container: this, child: component }));
                component.dispatchEvent(new feng3d.ComponentEvent(feng3d.ComponentEvent.BE_REMOVED_COMPONENT, { container: this, child: component }));
            };
            return Component;
        }(feng3d.EventDispatcher));
        feng3d.Component = Component;
        //定义实现 IComponent 的类定义
        // export type IComponentClass<T> = ;
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
    })(feng3d = me.feng3d || (me.feng3d = {}));
})(me || (me = {}));
//# sourceMappingURL=feng3d-component.js.map