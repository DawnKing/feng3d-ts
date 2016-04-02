//
// 测试事件调度器
// @author warden_feng 2014-11-26
//
var EventDispatcherTest = (function () {
    function EventDispatcherTest() {
    }
    EventDispatcherTest.prototype.init = function () {
        var dispatcher = new feng3d.EventDispatcher();
        dispatcher.addEventListener("testEvent", this.onTestEvent);
        dispatcher.addEventListener("testEvent", this.onTestEvent);
        dispatcher.dispatchEvent(new feng3d.Event("testEvent"));
    };
    EventDispatcherTest.prototype.onTestEvent = function (event) {
        console.log(event.type, event);
    };
    return EventDispatcherTest;
}());
//# sourceMappingURL=EventDispatcherTest.js.map