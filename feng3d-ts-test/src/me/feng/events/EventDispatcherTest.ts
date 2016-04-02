//
// 测试事件调度器
// @author warden_feng 2014-11-26
//
class EventDispatcherTest {
    public init(): void {
        var dispatcher = new feng3d.EventDispatcher();
        dispatcher.addEventListener("testEvent", this.onTestEvent);
        dispatcher.addEventListener("testEvent", this.onTestEvent);
        dispatcher.dispatchEvent(new feng3d.Event("testEvent"));
    }

    private onTestEvent(event: feng3d.Event): void {
        console.log(event.type, event);
    }
}