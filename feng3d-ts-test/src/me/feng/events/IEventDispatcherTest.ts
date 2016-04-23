module feng3d {

    //
    // 测试事件调度器接口
    // @author warden_feng 2014-11-26
    //
    export class IEventDispatcherTest {
        public init(): void {
            var dispatcher = new DecoratedDispatcher1();
            dispatcher.addEventListener("doSomething", this.didSomething, this);
            dispatcher.dispatchEvent(new Event("doSomething"));
        }

        public didSomething(evt: Event): void {
            console.log(evt.type, evt);
        }
    }

    class DecoratedDispatcher1 implements IEventDispatcher {
        private dispatcher: EventDispatcher;

        constructor() {
            this.dispatcher = new EventDispatcher(this);
        }

        public addEventListener(type: string, listener: (event: Event) => any, thisObject: any, priority: number = 0): void {
            this.dispatcher.addEventListener(type, listener, thisObject, priority);
        }

        public dispatchEvent(event: Event): boolean {
            return this.dispatcher.dispatchEvent(event);
        }

        public removeEventListener(type: string, listener: (event: Event) => any, thisObject: any): void {
            this.dispatcher.removeEventListener(type, listener, thisObject);
        }

        public hasEventListener(type: string): boolean {
            return this.dispatcher.hasEventListener(type);
        }
    }
}
