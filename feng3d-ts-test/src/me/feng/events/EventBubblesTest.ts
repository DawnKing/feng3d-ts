
//
// 事件冒泡测试
// @author warden_feng 2014-11-26
//
class EventBubblesTest {
    public a: Container = new Container("a");
    public b: Container = new Container("b");
    public c: Container = new Container("c");

    public init(): void {
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
    }

    private onTestEvent(event: feng3d.Event): void {
        console.log(event.type, (<Container>event.target).name, (<Container>event.currentTarget).name);

        //测试事件停止函数
        //			if (event.currentTarget == b)
        //				event.stopPropagation();

        //测试事件停止函数
        //			if (event.currentTarget == b)
        //				event.stopImmediatePropagation();
    }

    private onTestEvent1(event: feng3d.Event): void {
        console.log(event.type, (<Container>event.target).name, (<Container>event.currentTarget).name);

        //测试事件停止函数
        if (event.currentTarget == this.b)
            event.stopImmediatePropagation();
    }
}

class Container extends feng3d.EventDispatcher {
    public parent: Container;
    name: string;

    constructor(name: string) {
        super();
        this.name = name;
    }

    public addChild(container: Container) {
        container.parent = this;
    }

    public toString(): String {
        return this.name;
    }
}

var test = new EventBubblesTest();