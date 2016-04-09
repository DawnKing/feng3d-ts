var feng;
(function (feng) {
    //
    // 测试事件调度器接口
    // @author warden_feng 2014-11-26
    //
    var IEventDispatcherTest = (function () {
        function IEventDispatcherTest() {
        }
        IEventDispatcherTest.prototype.init = function () {
            var dispatcher = new DecoratedDispatcher1();
            dispatcher.addEventListener("doSomething", this.didSomething);
            dispatcher.dispatchEvent(new feng3d.Event("doSomething"));
        };
        IEventDispatcherTest.prototype.didSomething = function (evt) {
            console.log(evt.type, evt);
        };
        return IEventDispatcherTest;
    }());
    var DecoratedDispatcher1 = (function () {
        function DecoratedDispatcher1() {
            this.dispatcher = new feng3d.EventDispatcher(this);
        }
        DecoratedDispatcher1.prototype.addEventListener = function (type, listener, priority, useWeakReference) {
            if (priority === void 0) { priority = 0; }
            if (useWeakReference === void 0) { useWeakReference = false; }
            this.dispatcher.addEventListener(type, listener);
        };
        DecoratedDispatcher1.prototype.dispatchEvent = function (event) {
            return this.dispatcher.dispatchEvent(event);
        };
        DecoratedDispatcher1.prototype.removeEventListener = function (type, listener) {
            this.dispatcher.removeEventListener(type, listener);
        };
        DecoratedDispatcher1.prototype.hasEventListener = function (type) {
            return this.dispatcher.hasEventListener(type);
        };
        DecoratedDispatcher1.prototype.willTrigger = function (type) {
            return this.dispatcher.willTrigger(type);
        };
        return DecoratedDispatcher1;
    }());
})(feng || (feng = {}));
//# sourceMappingURL=IEventDispatcherTest.js.map