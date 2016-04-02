var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//
// 事件冒泡测试
// @author warden_feng 2014-11-26
//
var EventBubblesTest = (function () {
    function EventBubblesTest() {
        this.a = new Container("a");
        this.b = new Container("b");
        this.c = new Container("c");
    }
    EventBubblesTest.prototype.init = function () {
        this.a.addChild(this.b);
        this.b.addChild(this.c);
        this.a.addEventListener("testEvent", this.onTestEvent);
        this.b.addEventListener("testEvent", this.onTestEvent);
        this.c.addEventListener("testEvent", this.onTestEvent);
        //			a.addEventListener("testEvent", onTestEvent1);
        //			b.addEventListener("testEvent", onTestEvent1);
        //			c.addEventListener("testEvent", onTestEvent1);
        // this.a.dispatchEvent(new feng3d.Event("testEvent", null, true));
        //			b.dispatchEvent(new Event("testEvent", null, true));
        this.c.dispatchEvent(new feng3d.Event("testEvent", null, true));
    };
    EventBubblesTest.prototype.onTestEvent = function (event) {
        console.log(event.type, event.target.name, event.currentTarget.name);
        //测试事件停止函数
        //			if (event.currentTarget == b)
        //				event.stopPropagation();
        //测试事件停止函数
        //			if (event.currentTarget == b)
        //				event.stopImmediatePropagation();
    };
    EventBubblesTest.prototype.onTestEvent1 = function (event) {
        console.log(event.type, event.target.name, event.currentTarget.name);
        //测试事件停止函数
        if (event.currentTarget == this.b)
            event.stopImmediatePropagation();
    };
    return EventBubblesTest;
}());
var Container = (function (_super) {
    __extends(Container, _super);
    function Container(name) {
        _super.call(this);
        this.name = name;
    }
    Container.prototype.addChild = function (container) {
        container.parent = this;
    };
    Container.prototype.toString = function () {
        return this.name;
    };
    return Container;
}(feng3d.EventDispatcher));
var test = new EventBubblesTest();
//# sourceMappingURL=EventBubblesTest.js.map