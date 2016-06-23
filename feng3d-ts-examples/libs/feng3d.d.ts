declare module me.feng3d {
}
declare module me.feng3d {
    /**
     * 断言
     * @b			判定为真的表达式
     * @msg			在表达式为假时将输出的错误信息
     * @author feng 2014-10-29
     */
    function assert(b: boolean, msg?: string): void;
}
declare module me.feng3d {
    /**
     * 获取对象的类名
     * @author feng 2016-4-24
     */
    function getClassName(value: any): string;
}
declare module me.feng3d {
    class StringUtils {
        /**
         * 获取字符串
         * @param obj 转换为字符串的对象
         * @param showLen       显示长度
         * @param fill          长度不够是填充的字符串
         * @param tail          true（默认）:在尾部添加；false：在首部添加
         */
        static getString(obj: any, showLen?: number, fill?: string, tail?: boolean): string;
    }
}
declare module me.feng3d {
    /**
     * 构建Map类代替Dictionary
     */
    class Map<K, V> {
        /**
         * key,value组合列表
         */
        private list;
        /**
         * 删除
         */
        delete(k: K): void;
        /**
         * 添加映射
         */
        push(k: K, v: V): void;
        /**
         * 通过key获取value
         */
        get(k: K): V;
        /**
         * 获取键列表
         */
        getKeys(): K[];
        /**
         * 清理字典
         */
        clear(): void;
        /**
         * 通过key获取(key,value)组合
         */
        private _getKV(k);
    }
}
declare module me.feng3d {
    /**
     * 获取对象UID
     * @author feng 2016-05-08
     */
    function getUID(object: {
        __uid__?: string;
    }): any;
}
declare module me.feng3d {
    class Version {
        /**
         * 获取对象版本
         * @param object 对象
         */
        getVersion(object: Object): number;
        /**
         * 升级对象版本（版本号+1）
         * @param object 对象
         */
        upgradeVersion(object: Object): void;
        /**
         * 设置版本号
         * @param object 对象
         * @param version 版本号
         */
        setVersion(object: Object, version: number): void;
        /**
         * 判断两个对象的版本号是否相等
         */
        equal(a: Object, b: Object): boolean;
        /**
         * 断言object为对象类型
         */
        private assertObject(object);
    }
    /**
     * 对象版本
     */
    var version: Version;
}
declare module me.feng3d {
    /**
     * 数学常量类
     */
    class MathConsts {
        /**
         * 弧度转角度因子
         */
        static RADIANS_TO_DEGREES: number;
        /**
         * 角度转弧度因子
         */
        static DEGREES_TO_RADIANS: number;
    }
}
declare module me.feng3d {
    /**
     * 矩形
     * @author feng 2016-04-27
     */
    class Rectangle {
        /**
         * X坐标
         */
        x: number;
        /**
         * Y坐标
         */
        y: number;
        /**
         * 宽度
         */
        width: number;
        /**
         * 高度
         */
        height: number;
        /**
         * 是否包含指定点
         * @param x 点的X坐标
         * @param y 点的Y坐标
         */
        contains(x: number, y: number): boolean;
    }
}
declare module me.feng3d {
    /**
     * Vector3D 类使用笛卡尔坐标 x、y 和 z 表示三维空间中的点或位置
     * @author feng 2016-3-21
     */
    class Vector3D {
        /**
        * 定义为 Vector3D 对象的 x 轴，坐标为 (1,0,0)。
        */
        static X_AXIS: Vector3D;
        /**
        * 定义为 Vector3D 对象的 y 轴，坐标为 (0,1,0)
        */
        static Y_AXIS: Vector3D;
        /**
        * 定义为 Vector3D 对象的 z 轴，坐标为 (0,0,1)
        */
        static Z_AXIS: Vector3D;
        /**
        * Vector3D 对象中的第一个元素，例如，三维空间中某个点的 x 坐标。默认值为 0
        */
        x: number;
        /**
        * Vector3D 对象中的第二个元素，例如，三维空间中某个点的 y 坐标。默认值为 0
        */
        y: number;
        /**
        * Vector3D 对象中的第三个元素，例如，三维空间中某个点的 z 坐标。默认值为 0
        */
        z: number;
        /**
        * Vector3D 对象的第四个元素（除了 x、y 和 z 属性之外）可以容纳数据，例如旋转角度。默认值为 0
        */
        w: number;
        /**
        * 当前 Vector3D 对象的长度（大小），即从原点 (0,0,0) 到该对象的 x、y 和 z 坐标的距离。w 属性将被忽略。单位矢量具有的长度或大小为一。
        */
        length: number;
        /**
        * 当前 Vector3D 对象长度的平方，它是使用 x、y 和 z 属性计算出来的。w 属性将被忽略。尽可能使用 lengthSquared() 方法，而不要使用 Vector3D.length() 方法的 Math.sqrt() 方法调用，后者速度较慢。
        */
        lengthSquared: number;
        /**
         * 创建 Vector3D 对象的实例。如果未指定构造函数的参数，则将使用元素 (0,0,0,0) 创建 Vector3D 对象。
         * @param x 第一个元素，例如 x 坐标。
         * @param y 第二个元素，例如 y 坐标。
         * @param z 第三个元素，例如 z 坐标。
         * @param w 表示额外数据的可选元素，例如旋转角度
         */
        constructor(x?: number, y?: number, z?: number, w?: number);
        /**
         * 将当前 Vector3D 对象的 x、y 和 z 元素的值与另一个 Vector3D 对象的 x、y 和 z 元素的值相加。
         * @param a 要与当前 Vector3D 对象相加的 Vector3D 对象。
         * @return 一个 Vector3D 对象，它是将当前 Vector3D 对象与另一个 Vector3D 对象相加所产生的结果。
         */
        add(a: Vector3D): Vector3D;
        /**
         * 返回一个新 Vector3D 对象，它是与当前 Vector3D 对象完全相同的副本。
         * @return 一个新 Vector3D 对象，它是当前 Vector3D 对象的副本。
         */
        clone(): Vector3D;
        /**
         * 将源 Vector3D 对象中的所有矢量数据复制到调用方 Vector3D 对象中。
         * @return 要从中复制数据的 Vector3D 对象。
         */
        copyFrom(sourceVector3D: Vector3D): void;
        /**
         * 返回一个新的 Vector3D 对象，它与当前 Vector3D 对象和另一个 Vector3D 对象垂直（成直角）。
         */
        crossProduct(a: Vector3D): Vector3D;
        /**
         * 按照指定的 Vector3D 对象的 x、y 和 z 元素的值递减当前 Vector3D 对象的 x、y 和 z 元素的值。
         */
        decrementBy(a: Vector3D): void;
        /**
         * 返回两个 Vector3D 对象之间的距离。
         */
        static distance(pt1: Vector3D, pt2: Vector3D): number;
        /**
         * 如果当前 Vector3D 对象和作为参数指定的 Vector3D 对象均为单位顶点，此方法将返回这两个顶点之间所成角的余弦值。
         */
        dotProduct(a: Vector3D): number;
        /**
         * 通过将当前 Vector3D 对象的 x、y 和 z 元素与指定的 Vector3D 对象的 x、y 和 z 元素进行比较，确定这两个对象是否相等。
         */
        equals(toCompare: Vector3D, allFour?: boolean): boolean;
        /**
         * 按照指定的 Vector3D 对象的 x、y 和 z 元素的值递增当前 Vector3D 对象的 x、y 和 z 元素的值。
         */
        incrementBy(a: Vector3D): void;
        /**
         * 将当前 Vector3D 对象设置为其逆对象。
         */
        negate(): void;
        /**
         * 通过将最前面的三个元素（x、y、z）除以矢量的长度可将 Vector3D 对象转换为单位矢量。
         */
        normalize(thickness?: number): void;
        /**
         * 按标量（大小）缩放当前的 Vector3D 对象。
         */
        scaleBy(s: number): void;
        /**
         * 将 Vector3D 的成员设置为指定值
         */
        setTo(xa: number, ya: number, za: number): void;
        /**
         * 从另一个 Vector3D 对象的 x、y 和 z 元素的值中减去当前 Vector3D 对象的 x、y 和 z 元素的值。
         */
        subtract(a: Vector3D): Vector3D;
        /**
         * 返回当前 Vector3D 对象的字符串表示形式。
         */
        toString(): string;
    }
}
declare module me.feng3d {
    /**
     * Matrix3D 类表示一个转换矩阵，该矩阵确定三维 (3D) 显示对象的位置和方向。
     * 该矩阵可以执行转换功能，包括平移（沿 x、y 和 z 轴重新定位）、旋转和缩放（调整大小）。
     * Matrix3D 类还可以执行透视投影，这会将 3D 坐标空间中的点映射到二维 (2D) 视图。
     *
     *  ---            方向              平移 ---
     *  |   scaleX      0         0       tx    |
     *  |     0       scaleY      0       ty    |
     *  |     0         0       scaleZ    tz    |
     *  |     0         0         0       tw    |
     *  ---  x轴        y轴      z轴          ---
     *
     *  ---            方向              平移 ---
     *  |     0         4         8       12    |
     *  |     1         5         9       13    |
     *  |     2         6        10       14    |
     *  |     3         7        11       15    |
     *  ---  x轴        y轴      z轴          ---
     */
    class Matrix3D {
        /**
         * 一个由 16 个数字组成的矢量，其中，每四个元素可以是 4x4 矩阵的一列。
         */
        rawData: Float32Array;
        /**
         * 一个保存显示对象在转换参照帧中的 3D 坐标 (x,y,z) 位置的 Vector3D 对象。
         */
        position: Vector3D;
        /**
         * 一个用于确定矩阵是否可逆的数字。
         */
        determinant: number;
        /**
         * 前方（+Z轴方向）
         */
        forward: Vector3D;
        /**
         * 上方（+y轴方向）
         */
        up: Vector3D;
        /**
         * 右方（+x轴方向）
         */
        right: Vector3D;
        /**
         * 创建 Matrix3D 对象。
         * @param   datas    一个由 16 个数字组成的矢量，其中，每四个元素可以是 4x4 矩阵的一列。
         */
        constructor(datas?: Float32Array | number[]);
        /**
         * 创建旋转矩阵
         * @param   degrees         角度
         * @param   axis            旋转轴
         * @param   pivotPoint      旋转中心点
         */
        static createRotationMatrix3D(degrees: number, axis: Vector3D): Matrix3D;
        /**
         * 创建缩放矩阵
         * @param   xScale      用于沿 x 轴缩放对象的乘数。
         * @param   yScale      用于沿 y 轴缩放对象的乘数。
         * @param   zScale      用于沿 z 轴缩放对象的乘数。
         */
        static createScaleMatrix3D(xScale: number, yScale: number, zScale: number): Matrix3D;
        /**
         * 创建位移矩阵
         * @param   x   沿 x 轴的增量平移。
         * @param   y   沿 y 轴的增量平移。
         * @param   z   沿 z 轴的增量平移。
         */
        static createTranslationMatrix3D(x: number, y: number, z: number): Matrix3D;
        /**
         * 通过将另一个 Matrix3D 对象与当前 Matrix3D 对象相乘来后置一个矩阵。
         */
        append(lhs: Matrix3D): void;
        /**
         * 在 Matrix3D 对象上后置一个增量旋转。
         * @param   degrees         角度
         * @param   axis            旋转轴
         * @param   pivotPoint      旋转中心点
         */
        appendRotation(degrees: number, axis: Vector3D, pivotPoint?: Vector3D): void;
        /**
         * 在 Matrix3D 对象上后置一个增量缩放，沿 x、y 和 z 轴改变位置。
         * @param   xScale      用于沿 x 轴缩放对象的乘数。
         * @param   yScale      用于沿 y 轴缩放对象的乘数。
         * @param   zScale      用于沿 z 轴缩放对象的乘数。
         */
        appendScale(xScale: number, yScale: number, zScale: number): void;
        /**
         * 在 Matrix3D 对象上后置一个增量平移，沿 x、y 和 z 轴重新定位。
         * @param   x   沿 x 轴的增量平移。
         * @param   y   沿 y 轴的增量平移。
         * @param   z   沿 z 轴的增量平移。
         */
        appendTranslation(x: number, y: number, z: number): void;
        /**
         * 返回一个新 Matrix3D 对象，它是与当前 Matrix3D 对象完全相同的副本。
         */
        clone(): Matrix3D;
        /**
         * 将 Vector3D 对象复制到调用方 Matrix3D 对象的特定列中。
         * @param   column      副本的目标列。
         * @param   vector3D    要从中复制数据的 Vector3D 对象。
         */
        copyColumnFrom(column: number, vector3D: Vector3D): void;
        /**
         * 将调用方 Matrix3D 对象的特定列复制到 Vector3D 对象中。
         * @param   column       要从中复制数据的列。
         * @param   vector3D     副本的目标 Vector3D 对象。
         */
        copyColumnTo(column: number, vector3D: Vector3D): void;
        /**
         * 将源 Matrix3D 对象中的所有矩阵数据复制到调用方 Matrix3D 对象中。
         * @param   sourceMatrix3D      要从中复制数据的 Matrix3D 对象。
         */
        copyFrom(sourceMatrix3D: Matrix3D): void;
        /**
         * 将源 Vector 对象中的所有矢量数据复制到调用方 Matrix3D 对象中。利用可选索引参数，您可以选择矢量中的任何起始文字插槽。
         * @param   vector      要从中复制数据的 Vector 对象。
         * @param   index       vector中的起始位置
         * @param   transpose   是否转置当前矩阵
         */
        copyRawDataFrom(vector: Float32Array, index?: number, transpose?: boolean): void;
        /**
         * 将调用方 Matrix3D 对象中的所有矩阵数据复制到提供的矢量中。
         * @param   vector      要将数据复制到的 Vector 对象。
         * @param   index       vector中的起始位置
         * @param   transpose   是否转置当前矩阵
         */
        copyRawDataTo(vector: Array<number>, index?: number, transpose?: boolean): void;
        /**
         * 将 Vector3D 对象复制到调用方 Matrix3D 对象的特定行中。
         * @param   row         要将数据复制到的行。
         * @param   vector3D    要从中复制数据的 Vector3D 对象。
         */
        copyRowFrom(row: number, vector3D: Vector3D): void;
        /**
         * 将调用方 Matrix3D 对象的特定行复制到 Vector3D 对象中。
         * @param   row         要从中复制数据的行。
         * @param   vector3D    将作为数据复制目的地的 Vector3D 对象。
         */
        copyRowTo(row: number, vector3D: Vector3D): void;
        /**
         * 拷贝当前矩阵
         * @param   dest    目标矩阵
         */
        copyToMatrix3D(dest: Matrix3D): void;
        /**
         * 将转换矩阵的平移、旋转和缩放设置作为由三个 Vector3D 对象组成的矢量返回。
         * @return      一个由三个 Vector3D 对象组成的矢量，其中，每个对象分别容纳平移、旋转和缩放设置。
         */
        decompose(): Vector3D[];
        /**
         * 使用不含平移元素的转换矩阵将 Vector3D 对象从一个空间坐标转换到另一个空间坐标。
         * @param   v   一个容纳要转换的坐标的 Vector3D 对象。
         * @return  一个包含转换后的坐标的 Vector3D 对象。
         */
        deltaTransformVector(v: Vector3D): Vector3D;
        /**
         * 将当前矩阵转换为恒等或单位矩阵。
         */
        identity(): void;
        /**
         * 反转当前矩阵。逆矩阵
         * @return      如果成功反转矩阵，则返回 true。
         */
        invert(): boolean;
        /**
         * 通过将当前 Matrix3D 对象与另一个 Matrix3D 对象相乘来前置一个矩阵。得到的结果将合并两个矩阵转换。
         * @param   rhs     个右侧矩阵，它与当前 Matrix3D 对象相乘。
         */
        prepend(rhs: Matrix3D): void;
        /**
         * 在 Matrix3D 对象上前置一个增量旋转。在将 Matrix3D 对象应用于显示对象时，矩阵会在 Matrix3D 对象中先执行旋转，然后再执行其他转换。
         * @param   degrees     旋转的角度。
         * @param   axis        旋转的轴或方向。常见的轴为 X_AXIS (Vector3D(1,0,0))、Y_AXIS (Vector3D(0,1,0)) 和 Z_AXIS (Vector3D(0,0,1))。此矢量的长度应为 1。
         * @param   pivotPoint  一个用于确定旋转中心的点。对象的默认轴点为该对象的注册点。
         */
        prependRotation(degrees: number, axis: Vector3D, pivotPoint?: Vector3D): void;
        /**
         * 在 Matrix3D 对象上前置一个增量缩放，沿 x、y 和 z 轴改变位置。在将 Matrix3D 对象应用于显示对象时，矩阵会在 Matrix3D 对象中先执行缩放更改，然后再执行其他转换。
         * @param   xScale      用于沿 x 轴缩放对象的乘数。
         * @param   yScale      用于沿 y 轴缩放对象的乘数。
         * @param   zScale      用于沿 z 轴缩放对象的乘数。
         */
        prependScale(xScale: number, yScale: number, zScale: number): void;
        /**
         * 在 Matrix3D 对象上前置一个增量平移，沿 x、y 和 z 轴重新定位。在将 Matrix3D 对象应用于显示对象时，矩阵会在 Matrix3D 对象中先执行平移更改，然后再执行其他转换。
         * @param   x   沿 x 轴的增量平移。
         * @param   y   沿 y 轴的增量平移。
         * @param   z   沿 z 轴的增量平移。
         */
        prependTranslation(x: number, y: number, z: number): void;
        /**
         * 设置转换矩阵的平移、旋转和缩放设置。
         * @param   components      一个由三个 Vector3D 对象组成的矢量，这些对象将替代 Matrix3D 对象的平移、旋转和缩放元素。
         */
        recompose(components: Vector3D[]): void;
        /**
         * 使用转换矩阵将 Vector3D 对象从一个空间坐标转换到另一个空间坐标。
         * @param   vin   一个容纳要转换的坐标的 Vector3D 对象。
         * @return  一个包含转换后的坐标的 Vector3D 对象。
         */
        transformVector(vin: Vector3D, vout?: Vector3D): Vector3D;
        /**
         * 使用转换矩阵将由数字构成的矢量从一个空间坐标转换到另一个空间坐标。
         * @param   vin     一个由多个数字组成的矢量，其中每三个数字构成一个要转换的 3D 坐标 (x,y,z)。
         * @param   vout    一个由多个数字组成的矢量，其中每三个数字构成一个已转换的 3D 坐标 (x,y,z)。
         */
        transformVectors(vin: number[], vout: number[]): void;
        /**
         * 将当前 Matrix3D 对象转换为一个矩阵，并将互换其中的行和列。
         */
        transpose(): void;
        /**
         * 比较矩阵是否相等
         */
        compare(matrix3D: Matrix3D, precision?: number): boolean;
        /**
         * 以字符串返回矩阵的值
         */
        toString(): string;
    }
}
declare module me.feng3d {
    /**
     * 对象池
     * @author feng 2016-04-26
     */
    class RenderBufferPool {
        /**
         * @param context3D     3D环境
         */
        private getContext3DBufferPool(context3D);
        /**
         * 获取渲染程序
         * @param context3D     3D环境
         * @param vertexCode    顶点着色器代码
         * @param fragmentCode  片段着色器代码
         * @return  渲染程序
         */
        getWebGLProgram(context3D: WebGLRenderingContext, vertexCode: string, fragmentCode: string): WebGLProgram;
        /**
         * 获取顶点渲染程序
         * @param context3D         3D环境
         * @param vertexCode        顶点渲染代码
         * @return                  顶点渲染程序
         */
        getVertexShader(context3D: WebGLRenderingContext, vertexCode: string): WebGLShader;
        /**
         * 获取顶点渲染程序
         * @param context3D         3D环境
         * @param fragmentCode      顶点渲染代码
         * @return                  顶点渲染程序
         */
        getFragmentShader(context3D: WebGLRenderingContext, fragmentCode: string): WebGLShader;
        /**
         * 3D环境缓冲池
         */
        private context3DBufferPools;
    }
    /**
     * 3D环境对象池
     */
    var context3DPool: RenderBufferPool;
}
declare module me.feng3d {
    /**
     * 3D空间
     * @author feng 2016-04-26
     */
    class Space3D extends Component {
        /**
         * 构建3D空间
         * @param x X坐标
         * @param y Y坐标
         * @param z Z坐标
         * @param rx X旋转
         * @param ry Y旋转
         * @param rz Z旋转
         * @param sx X缩放
         * @param sy Y缩放
         * @param sz Z缩放
         */
        constructor(x?: number, y?: number, z?: number, rx?: number, ry?: number, rz?: number, sx?: number, sy?: number, sz?: number);
        /**
         * X坐标
         */
        x: number;
        /**
         * Y坐标
         */
        y: number;
        /**
         * Z坐标
         */
        z: number;
        /**
         * X旋转
         */
        rx: number;
        /**
         * Y旋转
         */
        ry: number;
        /**
         * Z旋转
         */
        rz: number;
        /**
         * X缩放
         */
        sx: number;
        /**
         * Y缩放
         */
        sy: number;
        /**
         * Z缩放
         */
        sz: number;
        /**
         * 空间变换矩阵
         */
        transform3D: Matrix3D;
        /**
         * 更新变换矩阵
         */
        private updateTransform3D();
        /**
         * 使变换矩阵无效
         */
        protected invalidateTransform3D(): void;
        private _x;
        private _y;
        private _z;
        private _rx;
        private _ry;
        private _rz;
        private _sx;
        private _sy;
        private _sz;
        private _transform3D;
        private transform3DDirty;
    }
}
declare module me.feng3d {
    /**
     * 3D对象
     * @author feng 2016-04-26
     */
    class Object3D extends Component {
        /**
         * 3D空间
         */
        space3D: Space3D;
        /**
         * 构建3D对象
         */
        constructor(name?: string, conponents?: Component[]);
        /**
         * 创建
         */
        static createPrimitive(type: PrimitiveType): Object3D;
    }
}
declare module me.feng3d {
    /**
     * 3D视图
     * @author feng 2016-05-01
     */
    class View3D {
        private gl;
        private _camera;
        private _scene;
        private renderer;
        /**
         * 构建3D视图
         * @param canvas    画布
         * @param scene     3D场景
         * @param camera    摄像机
         */
        constructor(canvas: any, scene?: Scene3D, camera?: Object3D);
        /** 3d场景 */
        scene: Scene3D;
        private drawScene();
    }
}
declare module me.feng3d {
    /**
     * 3D场景节点
     */
    class Scene3DNode extends EventDispatcher {
        /**
         * 父节点
         */
        parent: Scene3DNode;
        /**
         * 子节点列表
         */
        children: Scene3DNode[];
        /**
         * 3D对象
         */
        object3D: Object3D;
        /**
         * 构建3D场景节点
         * @param object3D 3D对象
         * @param parent 父节点
         */
        constructor(object3D: Object3D, parent: Scene3DNode);
        /**
         * 节点名称
         */
        name: string;
        /**
         * 添加3D对象生成节点
         */
        addObject3D(object3D: Object3D): this;
        /**
         * 移除3D对象节点
         */
        removeObject(object3D: Object3D): this;
        /**
         * 根据名称深度查找节点
         * @param name 节点名称
         */
        find(name: string): Scene3DNode;
        /**
         * 是否可渲染
         */
        renderable: boolean;
        /**
         * 获取可渲染对象列表
         */
        getRenderables(renderables?: Object3D[]): Object3D[];
    }
}
declare module me.feng3d {
    /**
     * 3D场景
     * @author feng 2016-05-01
     */
    class Scene3D extends Scene3DNode {
        /**
         * 构造3D场景
         */
        constructor();
        /**
         * 场景名称默认为root
         */
        name: string;
    }
}
declare module me.feng3d {
    /**
     * 3D场景事件
     * author feng 2016-05-01
     */
    class Scene3DEvent extends Event {
        /**
         * 添加3D场景节点
         */
        static ADDED: string;
        /**
         * 删除3D场景节点
         */
        static REMOVED: string;
        /**
         * 数据
         */
        data: Scene3DNode;
        /**
         * 构建3D场景事件
         * @param type 事件的类型，可以作为 Event.type 访问。
         * @param data 携带数据
         * @param bubbles 确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
         */
        constructor(type: string, data?: Scene3DNode, bubbles?: boolean);
    }
}
declare module me.feng3d {
    /**
     * opengl顶点属性名称
     */
    class GLAttribute {
        /**
         * 坐标
         */
        static position: string;
        /**
         * 法线
         */
        static normal: string;
        /**
         * 切线
         */
        static tangent: string;
        /**
         * uv（纹理坐标）
         */
        static uv: string;
    }
}
declare module me.feng3d {
    /**
     * 几何体
     * @author feng 2016-04-28
     */
    class Geometry extends Component {
        private _vaIdList;
        /** 顶点属性数据步长字典 */
        private strideObj;
        /** 顶点属性数据字典 */
        private vaDataObj;
        private _indices;
        /**
         * Context3D数据缓冲
         */
        context3DBuffer: Context3DBuffer;
        /**
         * 创建一个几何体
         */
        constructor();
        /**
         * 索引数据
         */
        /**
         * 更新顶点索引数据
         */
        indices: Uint16Array;
        /**
         * 获取顶点属性步长(1-4)
         * @param vaId          顶点属性编号
         * @return 顶点属性步长
         */
        getVAStride(vaId: string): number;
        /**
         * 设置顶点属性数据
         * @param vaId          顶点属性编号
         * @param data          顶点属性数据
         * @param stride        顶点数据步长
         */
        setVAData(vaId: string, data: Float32Array, stride: number): void;
        /**
         * 获取顶点属性数据
         * @param vaId 数据类型编号
         * @return 顶点属性数据
         */
        getVAData(vaId: string): Float32Array;
        /**
         * 顶点属性编号列表
         */
        vaIdList: string[];
    }
}
declare module me.feng3d {
    /**
     * 几何体事件
     * @author feng 2015-12-8
     */
    class GeometryEvent extends Event {
        /**
         * 获取几何体顶点数据
         */
        static GET_VA_DATA: string;
        /**
         * 改变几何体顶点数据事件
         */
        static CHANGED_VA_DATA: string;
        /**
         * 改变顶点索引数据事件
         */
        static CHANGED_INDEX_DATA: string;
        /**
         * 事件目标
         */
        target: Geometry;
        /**
         * 构建几何体事件
         */
        constructor(type: string, data?: any, bubbles?: boolean);
    }
}
declare module me.feng3d {
    /**
     * 摄像机（镜头）事件
     * @author feng 2014-10-14
     */
    class CameraEvent extends Event {
        static MATRIX_CHANGED: string;
        /**
         * 摄像机（镜头）
         */
        data: CameraBase;
        /**
         * 创建一个摄像机（镜头）事件。
         * @param type 事件的类型
         * @param camera 摄像机（镜头）
         * @param bubbles 确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
         */
        constructor(type: string, camera?: CameraBase, bubbles?: boolean);
    }
}
declare module me.feng3d {
    /**
     * 坐标系统类型
     * @author feng 2014-10-14
     */
    class CoordinateSystem {
        /**
         * 默认坐标系统，左手坐标系统
         */
        static LEFT_HANDED: number;
        /**
         * 右手坐标系统
         */
        static RIGHT_HANDED: number;
    }
}
declare module me.feng3d {
    /**
     * 摄像机镜头
     * @author feng 2014-10-14
     */
    abstract class CameraBase extends Component {
        protected _projectionMatrix3D: Matrix3D;
        protected _scissorRect: Rectangle;
        protected _viewPort: Rectangle;
        protected _near: number;
        protected _far: number;
        protected _aspectRatio: number;
        protected _projectionMatrix3DDirty: boolean;
        private _unprojection;
        private _unprojectionInvalid;
        /**
         * 创建一个摄像机镜头
         */
        constructor();
        /**
         * 投影矩阵
         */
        projectionMatrix3D: Matrix3D;
        /**
         * 最近距离
         */
        near: number;
        /**
         * 最远距离
         */
        far: number;
        /**
         * 视窗缩放比例(width/height)，在渲染器中设置
         */
        aspectRatio: number;
        /**
         * 场景坐标投影到屏幕坐标
         * @param point3d 场景坐标
         * @param v 屏幕坐标（输出）
         * @return 屏幕坐标
         */
        project(point3d: Vector3D, v?: Vector3D): Vector3D;
        /**
         * 投影逆矩阵
         */
        unprojectionMatrix: Matrix3D;
        /**
         * 屏幕坐标投影到摄像机空间坐标
         * @param nX 屏幕坐标X -1（左） -> 1（右）
         * @param nY 屏幕坐标Y -1（上） -> 1（下）
         * @param sZ 到屏幕的距离
         * @param v 场景坐标（输出）
         * @return 场景坐标
         */
        abstract unproject(nX: number, nY: number, sZ: number, v: Vector3D): Vector3D;
        /**
         * 投影矩阵失效
         */
        protected invalidateProjectionMatrix(): void;
        /**
         * 更新投影矩阵
         */
        protected abstract updateProjectionMatrix(): any;
    }
}
declare module me.feng3d {
    /**
     * 透视摄像机（镜头）
     * @author feng 2014-10-14
     */
    class Camera extends CameraBase {
        private _fieldOfView;
        private _focalLength;
        private _focalLengthInv;
        private _yMax;
        private _xMax;
        private _coordinateSystem;
        /**
         * 创建一个透视摄像机镜头
         * @param fieldOfView 视野
         * @param coordinateSystem 坐标系统类型
         */
        constructor(fieldOfView?: number, coordinateSystem?: number);
        /**
         * 视野
         */
        fieldOfView: number;
        /**
         * 焦距
         */
        focalLength: number;
        unproject(nX: number, nY: number, sZ: number, v?: Vector3D): Vector3D;
        /**
         * 坐标系类型
         */
        coordinateSystem: number;
        /**
         * 更新投影矩阵
         */
        protected updateProjectionMatrix(): void;
    }
}
declare module me.feng3d {
    /**
     * 3D基元类型
     * @author feng 2016-05-01
     */
    enum PrimitiveType {
        Plane = 0,
        Cube = 1,
    }
}
declare module me.feng3d.primitives {
    /**
     * 创建平面几何体
     * @param width 宽度
     * @param height 高度
     * @param segmentsW 横向分割数
     * @param segmentsH 纵向分割数
     * @param yUp 正面朝向 true:Y+ false:Z+
     * @param elements 顶点元素列表
     */
    function createPlane(width?: number, height?: number, segmentsW?: number, segmentsH?: number, yUp?: boolean, elements?: string[]): Geometry;
}
declare module me.feng3d.primitives {
    /**
     * 创建立方几何体
     * @param width 宽度
     */
    function createCube(width?: number, height?: number, depth?: number, segmentsW?: number, segmentsH?: number, segmentsD?: number, tile6?: boolean, elements?: string[]): Geometry;
}
declare module me.feng3d.factory {
    /**
     * 创建摄像机3D对象
     */
    function createCamera(): Object3D;
}
declare module me.feng3d {
    /**
     * 渲染器
     * @author feng 2016-05-01
     */
    class Renderer {
        private context3D;
        private shaderProgram;
        private scene;
        private camera;
        /**
         * 构建渲染器
         * @param context3D    webgl渲染上下文
         * @param scene 场景
         * @param camera 摄像机对象
         */
        constructor(context3D: WebGLRenderingContext, scene: Scene3D, camera: Object3D);
        /**
         * 初始化GL
         */
        private initGL();
        /**
         * 渲染
         */
        render(): void;
        /**
         * 绘制3D对象
         */
        private drawObject3D(object3D);
    }
}
declare module me.feng3d {
    /**
     * 3D缓冲编号
     * @author feng 2016-06-20
     */
    class Context3DBufferID {
        /**
         * 顶点索引
         */
        static index: string;
        /**
         * 模型矩阵
         */
        static uMVMatrix: string;
        /**
         * 投影矩阵
         */
        static uPMatrix: string;
    }
}
declare module me.feng3d {
    /**
     * Context3D数据缓冲
     * @author feng 2016-6-7
     */
    class Context3DBuffer extends Component {
        private indexBuffer;
        private programBuffer;
        private attributes;
        private uniforms;
        /**
         * 创建Context3D数据缓冲
         */
        constructor();
        /**
         * 映射索引缓冲
         */
        mapIndexBuffer(value: Uint16Array): void;
        /**
         * 映射属性缓冲
         */
        mapAttributeBuffer(name: string, value: Uint16Array, stride: number): void;
        /**
         * 映射程序缓冲
         * @param vertexCode        顶点渲染程序代码
         * @param fragmentCode      片段渲染程序代码
         */
        mapProgramBuffer(vertexCode: string, fragmentCode: string): void;
        /**
         * 映射常量缓冲
         */
        mapUniformBuffer(name: string, data: Matrix3D): void;
        /**
         * 处理获取索引缓冲事件
         */
        private onGetIndexBuffer(event);
        /**
         * 处理获取属性缓冲事件
         */
        private onGetAttributeBuffer(event);
        /**
         * 处理获取缓冲事件
         */
        private onGetUniformBuffer(event);
        /**
         * 处理获取缓冲事件
         */
        private onGetProgramBuffer(event);
    }
    /**
     * 索引缓冲
     */
    class IndexBuffer {
        /**
         * 索引数据
         */
        indices: Uint16Array;
    }
    /**
     * 属性缓冲
     * @author feng 2014-8-14
     */
    class AttributeBuffer {
        /**
         * 属性缓冲名称
         */
        name: string;
        /** 顶点数据 */
        data: Float32Array;
        /** 与每个顶点关联的 32 位（4 字节）数据值的数量。 */
        size: number;
    }
    /**
     * 常量缓冲
     */
    class UniformBuffer {
        /**
         * 常量缓冲名称
         */
        name: string;
        /**
         * 矩阵数据
         */
        matrix: Matrix3D;
    }
}
declare module me.feng3d {
    /**
     * 渲染程序缓存
     * @author feng 2016-05-09
     */
    class ProgramBuffer {
        private _vertexCode;
        private _fragmentCode;
        private _shaderProgram;
        /**
         * 顶点渲染程序代码
         */
        vertexCode: string;
        /**
         * 片段渲染程序代码
         */
        fragmentCode: string;
        /**
         * 使失效
         */
        private invalidCode();
        active(context3D: WebGLRenderingContext): void;
        /**
         * 渲染程序
         */
        getShaderProgram(context3D: WebGLRenderingContext): WebGLProgram;
        /**
         * 获取属性gpu地址
         */
        getAttribLocations(context3D: WebGLRenderingContext): {
            [name: string]: {
                type: string;
                location?: number;
            };
        };
        /**
         * 获取属性列表
         */
        getAttributes(): {
            [name: string]: {
                type: string;
            };
        };
        /**
         * 获取常量
         */
        getUniforms(): {
            [name: string]: {
                type: string;
            };
        };
    }
}
declare module me.feng3d {
    /**
     * 渲染代码工具
     * @author feng 2016-06-22
     */
    class ShaderCodeUtils {
        /**
         * 获取程序属性列表
         */
        static getAttributes(code: string): {
            [name: string]: {
                type: string;
            };
        };
        /**
         * 获取程序常量列表
         */
        static getUniforms(code: string): {
            [name: string]: {
                type: string;
            };
        };
        /**
         * 获取WebGLProgram
         * @param context3D     3D环境上下文
         * @param vertexCode    顶点着色器代码
         * @param fragmentCode  片段着色器代码
         * @return  WebGL程序
         */
        static getWebGLProgram(context3D: WebGLRenderingContext, vertexCode: string, fragmentCode: string): WebGLProgram;
        /**
         * 获取顶点渲染程序
         * @param context3D         3D环境上下文
         * @param vertexCode        顶点渲染代码
         * @return                  顶点渲染程序
         */
        static getVertexShader(context3D: WebGLRenderingContext, vertexCode: string): WebGLShader;
        /**
         * 获取片段渲染程序
         * @param context3D         3D环境上下文
         * @param fragmentCode      片段渲染代码
         * @return                  片段渲染程序
         */
        static getFragmentShader(context3D: WebGLRenderingContext, fragmentCode: string): WebGLShader;
        /**
         * 编译渲染程序
         * @param context3D         3D环境上下文
         * @param shader            渲染程序
         * @param shaderCode        渲染代码
         * @return                  完成编译的渲染程序
         */
        static compileShader(context3D: WebGLRenderingContext, shader: WebGLShader, shaderCode: string): WebGLShader;
    }
}
declare module me.feng3d {
    /**
     * 3D对象渲染数据
     * @author feng 2016-06-20
     */
    class RenderData {
        object3D: Object3D;
        /**
         * 顶点索引缓冲
         */
        indexBuffer: IndexBuffer;
        /**
         * 渲染程序缓存
         */
        programBuffer: ProgramBuffer;
        /**
         * 属性数据列表
         */
        attributes: {
            [name: string]: {
                type: string;
                buffer?: AttributeBuffer;
            };
        };
        /**
         * 常量数据列表
         */
        uniforms: {
            [name: string]: {
                type: string;
                buffer?: UniformBuffer;
            };
        };
        /**
         * 渲染数据字典
         */
        private static renderDataMap;
        /**
         * 获取3D对象渲染数据实例
         */
        static getInstance(object3D: Object3D): RenderData;
        private renderBufferMap;
        getRenderBuffer(context3D: WebGLRenderingContext): RenderBuffer;
        /**
         * 构建3D对象渲染数据
         */
        constructor(object3D: Object3D);
        /**
         * 准备数据
         */
        prepare(): void;
        /**
         * 准备程序
         */
        private prepareProgram();
        /**
         * 准备索引
         */
        private prepareIndex();
        /**
         * 准备属性
         */
        private prepareAttributes();
        /**
         * 准备常量
         */
        private prepareUniforms();
    }
}
declare module me.feng3d {
    /**
     * 3D对象缓冲
     * @author feng 2016-06-20
     */
    class RenderBuffer {
        /**
         * 3D上下文
         */
        private context3D;
        /**
         * 渲染数据
         */
        private renderData;
        constructor(context3D: WebGLRenderingContext, renderData: RenderData);
        /**
         * 激活缓冲
         */
        active(): void;
        /**
         * 激活程序
         */
        activeProgram(): void;
        /**
         * 激活属性
         */
        private activeAttributes();
        /**
         * 激活常量
         */
        activeUniforms(): void;
        /**
         * 绘制
         */
        private draw();
    }
}
declare module me.feng3d {
    /**
     * 3D上下文缓冲中心
     * @author feng 2016-06-20
     */
    class Context3DBufferCenter {
        /**
         * 3D上下文缓冲中心字典
         */
        private static map;
        /**
         * 3D上下文
         */
        private context3D;
        /**
         * 缓冲字典
         */
        private bufferMap;
        /**
         * 获取3D上下文缓冲中心
         * @param context3D 3D上下文
         */
        static getInstance(context3D: WebGLRenderingContext): Context3DBufferCenter;
        /**
         * 构建3D上下文缓冲中心
         * @param context3D 3D上下文
         */
        constructor(context3D: WebGLRenderingContext);
        /**
         * 获取索引缓冲
         */
        getIndexBuffer(indices: Uint16Array): WebGLBuffer;
        /**
         * 获取顶点属性缓冲
         * @param data  数据
         */
        getVABuffer(data: Float32Array): WebGLBuffer;
        /**
         * 获取缓冲
         * @param data  数据
         */
        getBuffer(data: ArrayBufferView | ArrayBuffer, target: number): WebGLBuffer;
    }
}
declare module me.feng3d {
    /**
     * Context3D缓冲事件
     * @author feng 2016-05-26
     */
    class Context3DBufferEvent extends Event {
        /**
         * 获取AttributeBuffer
         */
        static GET_ATTRIBUTEBUFFER: string;
        /**
         * 获取IndexBuffer
         */
        static GET_INDEXBUFFER: string;
        /**
         * 获取ProgramBuffer
         */
        static GET_PROGRAMBUFFER: string;
        /**
         * 获取UniformBuffer
         */
        static GET_UNIFORMBUFFER: string;
    }
    /**
     * 获取AttributeBuffer事件数据
     */
    class GetAttributeBufferEventData {
        /**
         * 属性名称
         */
        name: string;
        /**
         * 属性缓冲
         */
        buffer: AttributeBuffer;
    }
    /**
     * 获取IndexBuffer事件数据
     */
    class GetIndexBufferEventData {
        /**
         * 索引缓冲
         */
        buffer: IndexBuffer;
    }
    /**
     * 获取ProgramBuffer事件数据
     */
    class GetProgramBufferEventData {
        /**
         * 渲染程序缓存
         */
        buffer: ProgramBuffer;
    }
    /**
     * 获取UniformBuffer事件数据
     */
    class GetUniformBufferEventData {
        /**
         * 常量名称
         */
        name: string;
        /**
         * 常量缓存
         */
        buffer: UniformBuffer;
    }
}
declare module me.feng3d {
    /**
     * 材质
     * @author feng 2016-05-02
     */
    class Material extends Component {
        vertexShaderStr: string;
        fragmentShaderStr: string;
        pass: MaterialPass;
        /**
         * 构建材质
         */
        constructor();
        /**
         * Context3D数据缓冲
         */
        context3DBuffer: Context3DBuffer;
    }
}
declare module me.feng3d {
    /**
     * 颜色材质
     * @author feng 2016-05-02
     */
    class ColorMaterial extends Material {
        color: number;
        /**
         * 构建颜色材质
         * @param color 颜色
         */
        constructor(color?: number);
    }
}
declare module me.feng3d {
    /**
     * 材质通道
     */
    class MaterialPass {
    }
}
