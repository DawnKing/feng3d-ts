module feng3d {

    //
    // 测试事件调度器
    // @author warden_feng 2014-11-26
    //
    export class EventDispatcherTest {
        public init(): void {
            var dispatcher = new EventDispatcher();
            dispatcher.addEventListener("testEvent", this.onTestEvent, this);
            dispatcher.addEventListener("testEvent", this.onTestEvent, this);
            dispatcher.dispatchEvent(new Event("testEvent"));
        }

        private onTestEvent(event: Event): void {
            console.log(event.type, event);
        }
    }
}