var feng;
(function (feng) {
    //
    // 事件冒泡测试(使用接口)
    // @author warden_feng 2014-11-26
    //
    var EventBubblesTest2 = (function () {
        function EventBubblesTest2() {
            this.a = new Container2("a");
            this.b = new Container2("b");
            this.c = new Container2("c");
        }
        EventBubblesTest2.prototype.init = function () {
            this.a.addChild(this.b);
            this.b.addChild(this.c);
            this.a.addEventListener("testEvent", this.onTestEvent);
            this.b.addEventListener("testEvent", this.onTestEvent);
            this.c.addEventListener("testEvent", this.onTestEvent);
            // this.a.dispatchEvent(new feng3d.Event("testEvent", null, true));
            //			b.dispatchEvent(new FEvent("testEvent", null, true));
            this.c.dispatchEvent(new feng3d.Event("testEvent", null, true));
        };
        EventBubblesTest2.prototype.onTestEvent = function (event) {
            console.log(event.type, event.target.tostring(), event.currentTarget.tostring());
        };
        return EventBubblesTest2;
    }());
    feng.EventBubblesTest2 = EventBubblesTest2;
    var Container2 = (function () {
        function Container2(name) {
            this._name = name;
            this.dispatcher = new feng3d.EventDispatcher(this);
        }
        Container2.prototype.addChild = function (Container2) {
            Container2.parent = this;
        };
        Container2.prototype.tostring = function () {
            return this._name;
        };
        Container2.prototype.addEventListener = function (type, listener, priority, useWeakReference) {
            if (priority === void 0) { priority = 0; }
            if (useWeakReference === void 0) { useWeakReference = false; }
            this.dispatcher.addEventListener(type, listener);
        };
        Container2.prototype.dispatchEvent = function (event) {
            return this.dispatcher.dispatchEvent(event);
        };
        Container2.prototype.removeEventListener = function (type, listener) {
            this.dispatcher.removeEventListener(type, listener);
        };
        Container2.prototype.hasEventListener = function (type) {
            return this.dispatcher.hasEventListener(type);
        };
        Container2.prototype.willTrigger = function (type) {
            // TODO Auto Generated method stub
            return false;
        };
        return Container2;
    }());
})(feng || (feng = {}));
//# sourceMappingURL=EventBubblesTest2.js.map