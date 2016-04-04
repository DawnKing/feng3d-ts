module feng3d {

    export function is(a, b: Function): boolean {
        var aClassName = getQualifiedClassName(a);

        var prototype: any = a.prototype ? a.prototype : Object.getPrototypeOf(a);
        while (prototype != null) {
            //类型==自身原型的构造函数
            if (prototype.constructor == b)
                return true;
            //父类就是原型的原型构造函数
            prototype = Object.getPrototypeOf(a);
        }

        return false;
    }
}