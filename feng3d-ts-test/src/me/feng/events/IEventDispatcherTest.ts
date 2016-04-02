
//
// 测试事件调度器接口
// @author warden_feng 2014-11-26
//
class IEventDispatcherTest {
    public init(): void {
        var dispatcher = new DecoratedDispatcher1();
        dispatcher.addEventListener("doSomething", this.didSomething);
        dispatcher.dispatchEvent(new feng3d.Event("doSomething"));
    }

    public didSomething(evt: feng3d.Event): void {
        console.log(evt.type,evt);
    }
}

class DecoratedDispatcher1 implements feng3d.IEventDispatcher {
    private dispatcher: feng3d.EventDispatcher;

    constructor() {
        this.dispatcher = new feng3d.EventDispatcher(this);
    }

    public addEventListener(type: string, listener: Function, priority: number = 0, useWeakReference: boolean = false): void {
        this.dispatcher.addEventListener(type, listener);
    }

    public dispatchEvent(event: feng3d.Event): boolean {
        return this.dispatcher.dispatchEvent(event);
    }

    public removeEventListener(type: string, listener: Function): void {
        this.dispatcher.removeEventListener(type, listener);
    }

    public hasEventListener(type: string): boolean {
        return this.dispatcher.hasEventListener(type);
    }


    public willTrigger(type: string): boolean {
        return this.dispatcher.willTrigger(type);
    }
}
