module feng3d {

    //
    // 事件冒泡测试(使用接口)
    // @author warden_feng 2014-11-26
    //
    export class EventBubblesTest2 extends EventDispatcher {
        public a: Container2 = new Container2("a");
        public b: Container2 = new Container2("b");
        public c: Container2 = new Container2("c");

        public init(): void {
            this.a.addChild(this.b);
            this.b.addChild(this.c);
            this.a.addEventListener("testEvent", this.onTestEvent, this);
            this.b.addEventListener("testEvent", this.onTestEvent, this);
            this.c.addEventListener("testEvent", this.onTestEvent, this);

            // this.a.dispatchEvent(new feng3d.Event("testEvent", null, true));
            //			b.dispatchEvent(new FEvent("testEvent", null, true));
            this.c.dispatchEvent(new feng3d.Event("testEvent", null, true));
        }

        private onTestEvent(event: feng3d.Event): void {
            console.log(event.type, (<Container2>event.target).tostring(), (<Container2>event.currentTarget).tostring());
        }
    }

    export class Container2 implements feng3d.IEventDispatcher {
        // 使用于冒泡 
        public parent: Container2;

        private _name: string;
        private dispatcher: feng3d.EventDispatcher;

        constructor(name: string) {
            this._name = name;
            this.dispatcher = new feng3d.EventDispatcher(this);
        }

        public addChild(Container2: Container2): void {
            Container2.parent = this;
        }

        public tostring(): string {
            return this._name;
        }

        public addEventListener(type: string, listener: (event: feng3d.Event) => any, thisObject: any, priority: number = 0): void {
            this.dispatcher.addEventListener(type, listener, thisObject, priority);
        }

        public dispatchEvent(event: feng3d.Event): boolean {
            return this.dispatcher.dispatchEvent(event);
        }

        public removeEventListener(type: string, listener: (event: feng3d.Event) => any, thisObject: any): void {
            this.dispatcher.removeEventListener(type, listener, thisObject);
        }

        public hasEventListener(type: string): boolean {
            return this.dispatcher.hasEventListener(type);
        }
    }
}