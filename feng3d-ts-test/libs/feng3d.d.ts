declare module feng3d {
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
declare module feng3d {
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
        rawData: Array<number>;
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
        constructor(datas?: Array<number>);
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
        copyRawDataFrom(vector: Array<number>, index?: number, transpose?: boolean): void;
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
        recompose(components: Vector3D[]): boolean;
        /**
         * 使用转换矩阵将 Vector3D 对象从一个空间坐标转换到另一个空间坐标。
         * @param   v   一个容纳要转换的坐标的 Vector3D 对象。
         * @return  一个包含转换后的坐标的 Vector3D 对象。
         */
        transformVector(v: Vector3D): Vector3D;
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
        compare(matrix3D: Matrix3D, precision?: number): Boolean;
        /**
         * 以字符串返回矩阵的值
         */
        toString(): string;
    }
}
declare module feng3d {
    /**
     * Orientation3D 类是用于表示 Matrix3D 对象的方向样式的常量值枚举。方向的三个类型分别为欧拉角、轴角和四元数。Matrix3D 对象的 decompose 和 recompose 方法采用其中的某一个枚举类型来标识矩阵的旋转组件。
     * @author feng 2016-3-21
     */
    class Orientation3D {
        /**
        * 轴角方向结合使用轴和角度来确定方向。
        */
        static AXIS_ANGLE: string;
        /**
        * 欧拉角（decompose() 和 recompose() 方法的默认方向）通过三个不同的对应于每个轴的旋转角来定义方向。
        */
        static EULER_ANGLES: string;
        /**
        * 四元数方向使用复数。
        */
        static QUATERNION: string;
    }
}
declare module feng3d {
    /**
     * 四元素
     *
     * 定义了一个四元数表示物体在空间的旋转。
     * 四元数通常用作替代欧拉角和旋转矩阵的方式来实现平滑插值和避免万向节锁
     * 注意，这四元数类不自动保持四元数标准化。因此，在必要的时候，必须采取单位化的四元数，通过调用单位化方法
     */
    class Quaternion {
        /**
        * 四元数的x值.
        */
        x: number;
        /**
        * 四元数的y值.
        */
        y: number;
        /**
        * 四元数的z值.
        */
        z: number;
        /**
        * 四元数的w值.
        */
        w: number;
        /**
        * 创建一个四元数.
        * @param x
        * @param y
        * @param z
        * @param w
        */
        constructor(x?: number, y?: number, z?: number, w?: number);
        /**
        * 返回四元数的大小.
        * @param w
        * @returns 四元数的大小.
        */
        magnitude: number;
        /**
        * 两个四元数相乘,然后结果给当调用者.
        * @param qa 第一个四元数
        * @param qb 第二个四元数
        */
        multiply(qa: Quaternion, qb: Quaternion): void;
        /**
        * 四元数乘以一个3维向量，结果返回一个四元数
        * @param vector 相乘的向量
        * @param target 返回的结果，如果为null就会实例化一个四元数对象返回
        * @returns 返回相乘后的结果
        */
        multiplyVector(vector: Vector3D, target?: Quaternion): Quaternion;
        /**
        * 创建一个以axis轴为中心旋转angle旋转弧度的四元数
        *
        * @param axis   旋转轴
        * @param angle  旋转弧度
        */
        fromAxisAngle(axis: Vector3D, angle: number): void;
        /**
        * 两个四元数之间球形插值，插值之间提供旋转恒定角变化率。
        *
        * @param qa 四元数1
        * @param qb 四元数2
        * @param t 权重
        */
        slerp(qa: Quaternion, qb: Quaternion, t: number): void;
        /**
        * 两个四元数之间的线性插值
        *
        * @param qa 四元数1
        * @param qb 四元数2
        * @param t 权重
        */
        lerp(qa: Quaternion, qb: Quaternion, t: number): void;
        /**
        * 用数值表示给定的欧拉旋转填充四元数对象。
        *
        * @param ax x轴旋转弧度
        * @param ay y轴旋转弧度
        * @param az z轴旋转弧度
        */
        fromEulerAngles(ax: number, ay: number, az: number): Quaternion;
        /**
        * 把四元数转成欧拉角返回
        *
        * @param target 转成的欧拉返回值，如果为null就新建一个对象返回
        * @retruns 转成的欧拉弧度返回值
        */
        toEulerAngles(target?: Vector3D): Vector3D;
        /**
        * 单位化四元数
        */
        normalize(val?: number): void;
        /**
        * 以字符串形式返回四元数的值
        * @returns
        */
        toString(): string;
        /**
        * 把一个四元数转换成矩阵
        * @param target 返回转换后的矩阵，如果为null就新建一个对象返回
        * @returns 返回转换后的矩阵
        */
        toMatrix3D(target?: Matrix3D): Matrix3D;
        /**
        * 用一个旋转矩阵生成四元数
        * @param matrix 旋转矩阵
        */
        fromMatrix(matrix: Matrix3D): void;
        /**
        * 克隆一个四元数
        * @returns 当前四元数复制后返回.
        */
        clone(): Quaternion;
        /**
        * 旋转一个3量坐标点
        * @param vector 被旋转的对象
        * @param target 旋转后的坐标对象。如果为null，将创建一个新的对象
        * @returns 返回旋转后的坐标对象
        */
        rotatePoint(vector: Vector3D, target?: Vector3D): Vector3D;
        /**
        * 将数据从四元数复制到该实例
        * @param q 被复制的四元数对象
        */
        copyFrom(q: Quaternion): void;
    }
}
declare module feng3d {
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
declare module feng3d {
    /**
     * 类工具
     * @author feng 2015-4-27
     */
    class ClassUtils {
        /**
         * 基础类型列表
         */
        static BASETYPES: string[];
        /**
         * 获取类定义
         * @param obj
         * @return
         */
        static getClass(obj: any): any;
        /**
         * 获取类实例
         * @param obj
         * @return
         */
        static getInstance(obj: any): any;
        /**
         * 构造实例
         * @param cla						类定义
         * @param params					构造参数
         * @return							构造出的实例
         */
        static structureInstance(cla: any, params: any[]): any;
        /**
         * 构造实例
         * @param space						运行空间
         * @param funcName					函数名称
         * @param params					函数参数
         * @return							函数返回值
         */
        static call(space: Object, funcName: string, params: any[]): any;
        /**
         * 编码参数
         * @param params		参数数组
         */
        static encodeParams(params: any[]): void;
        /**
         * 解码参数
         * @param params		参数数组
         */
        static decodeParams(params: any[]): void;
        /**
         * 拷贝数据
         * @param obj			需要赋值的对象
         * @param value			拥有数据的对象
         */
        static copyValue(obj: Object, value: Object): void;
        /**
         * 判断对象是否为基础类型
         * @param obj			对象
         * @return				true为基础类型，false为复杂类型
         */
        static isBaseType(obj: Object): boolean;
        /**
         * 获取对象默认名称
         * @param obj				对象
         * @return					对象默认名称
         */
        static getDefaultName(obj: Object): string;
        /**
         * 判断两个对象的完全限定类名是否相同
         * @param obj1			对象1
         * @param obj2			对象2
         * @return
         */
        static isSameClass(obj1: any, obj2: any): boolean;
    }
}
declare module feng3d {
    /**
     * @language en_US
     * Returns a reference to the class object of the class specified by the name parameter.
     * @param name The name of a class.
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/utils/getDefinitionByName.ts
     */
    /**
     * @language zh_CN
     * 返回 name 参数指定的类的类对象引用。
     * @param name 类的名称。
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/utils/getDefinitionByName.ts
     */
    function getDefinitionByName(name: string): any;
}
declare var __global: any;
declare module feng3d {
    /**
     * @language en_US
     * Return the fully qualified class name of an object
     * @param value The object for which a fully qualified class name is desired. Any JavaScript value may be passed to
     * this method including all available JavaScript types, object instances, primitive types such as number, and class objects.
     * @returns A string containing the fully qualified class name.
     * @example
     * <pre>
     *  egret.getQualifiedClassName(egret.DisplayObject) //return "egret.DisplayObject"
     * </pre>
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/utils/getQualifiedClassName.ts
     */
    /**
     * @language zh_CN
     * 返回对象的完全限定类名。
     * @param value 需要完全限定类名称的对象，可以将任何 JavaScript 值传递给此方法，包括所有可用的 JavaScript 类型、对象实例、原始类型
     * （如number)和类对象
     * @returns 包含完全限定类名称的字符串。
     * @example
     * <pre>
     *  egret.getQualifiedClassName(egret.DisplayObject) //返回 "egret.DisplayObject"
     * </pre>
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/utils/getQualifiedClassName.ts
     */
    function getQualifiedClassName(value: any): string;
}
declare module feng3d {
    /** @language en_US
     * Returns the fully qualified class name of the base class of the object specified by the value parameter.
     * @param value The object for which a parent class is desired. Any JavaScript value may be passed to this method including
     * all available JavaScript types, object instances, primitive types such as number, and class objects.
     * @returns  A fully qualified base class name, or null if none exists.
     * @example
     * <pre>
     *  egret.getQualifiedSuperclassName(egret.Bitmap) //return "egret.DisplayObject"
     * </pre>
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/utils/getQualifiedSuperclassName.ts
     */
    /**
     * @language zh_CN
     * 返回 value 参数指定的对象的基类的完全限定类名。
     * @param value 需要取得父类的对象，可以将任何 JavaScript 值传递给此方法，包括所有可用的 JavaScript 类型、对象实例、原始类型（如number）和类对象
     * @returns 完全限定的基类名称，或 null（如果不存在基类名称）。
     * @example
     * <pre>
     *  egret.getQualifiedSuperclassName(egret.Sprite) //返回 "egret.DisplayObject"
     * </pre>
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/utils/getQualifiedSuperclassName.ts
     */
    function getQualifiedSuperclassName(value: any): string;
}
declare module feng3d {
    class StringUtils {
        static getString(obj: any, showLen?: number, fill?: string): string;
    }
}
declare module feng3d {
    /**
     * 断言
     * @b			判定为真的表达式
     * @msg			在表达式为假时将输出的错误信息
     * @author feng 2014-10-29
     */
    function assert(b: boolean, msg?: string): void;
}
declare module feng3d {
    /**
     * ArgumentError 类表示一种错误，如果函数提供的参数与为该函数定义的参数不一致，则会出现该错误。例如，如果在调用函数时使用了错误的参数数目、不正确的参数类型或无效参数，则会发生此错误。
     * @author feng 2016-3-25
     */
    class ArgumentError extends Error {
        constructor(message?: string);
    }
}
declare module feng3d {
    /**
     * 自定义事件
     * @author warden_feng 2014-5-7
     */
    class Event {
        private _type;
        private _data;
        private _bubbles;
        private _target;
        private _currentTarget;
        private _stopsPropagation;
        private _stopsImmediatePropagation;
        /**
         * 创建一个作为参数传递给事件侦听器的 Event 对象。
         * @param type 事件的类型，可以作为 Event.type 访问。
         * @param bubbles 确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
         * @param cancelable 确定是否可以取消 Event 对象。默认值为 false。
         */
        constructor(type: string, data?: any, bubbles?: boolean, cancelable?: boolean);
        /**
         * 防止对事件流中当前节点中和所有后续节点中的事件侦听器进行处理。此方法会立即生效，并且会影响当前节点中的事件侦听器。相比之下，在当前节点中的所有事件侦听器都完成处理之前，stopPropagation() 方法不会生效。
         */
        stopImmediatePropagation(): void;
        /**
         * 防止对事件流中当前节点的后续节点中的所有事件侦听器进行处理。此方法不会影响当前节点 (currentTarget) 中的任何事件侦听器。相比之下，stopImmediatePropagation() 方法可以防止对当前节点中和后续节点中的事件侦听器进行处理。对此方法的其他调用没有任何效果。可以在事件流的任何阶段中调用此方法。
         */
        stopPropagation(): void;
        tostring(): string;
        /**
         * 表示事件是否为冒泡事件。如果事件可以冒泡，则此值为 true；否则为 false。
         */
        bubbles: boolean;
        /**
         * 事件的类型。类型区分大小写。
         */
        type: string;
        /** 事件携带的自定义数据 */
        /**
         * @private
         */
        data: any;
        /**
         * 事件目标。
         */
        target: IEventDispatcher;
        /**
         * 当前正在使用某个事件侦听器处理 Event 对象的对象。
         */
        currentTarget: IEventDispatcher;
        stopsImmediatePropagation: boolean;
        stopsPropagation: boolean;
        setTarget(value: IEventDispatcher): void;
        setCurrentTarget(value: IEventDispatcher): void;
    }
}
declare module feng3d {
    /**
     * 为了实现非flash原生显示列表的冒泡事件，自定义事件适配器
     * @author feng 2016-3-22
     */
    class EventDispatcher implements IEventDispatcher {
        _target: IEventDispatcher;
        _eventListeners: any;
        /** 冒泡属性名称为“parent” */
        static BUBBLE_PROPERTY: string;
        /**
         * 构建事件适配器
         * @param target		事件适配主体
         */
        constructor(target?: IEventDispatcher);
        addEventListener(type: string, listener: Function, priority?: number, useWeakReference?: boolean): void;
        removeEventListener(type: string, listener: Function): void;
        removeEventListeners(type?: string): void;
        /**
         * @inheritDoc
         */
        dispatchEvent(event: Event): boolean;
        hasEventListener(type: string): boolean;
        /**
         * 该功能暂未实现
         * @param type
         * @return
         */
        willTrigger(type: string): boolean;
        /**
         * 父事件适配器
         */
        private parentDispatcher;
    }
}
declare module feng3d {
    /**
     * IEventDispatcher 接口定义用于添加或删除事件侦听器的方法，检查是否已注册特定类型的事件侦听器，并调度事件。
     * @author feng 2016-3-22
     */
    interface IEventDispatcher {
        /**
         * 使用 EventDispatcher 对象注册事件侦听器对象，以使侦听器能够接收事件通知。
         */
        addEventListener(type: string, listener: Function, priority?: number, useWeakReference?: boolean): void;
        /**
         * 将事件调度到事件流中。
         */
        dispatchEvent(event: Event): boolean;
        /**
         * 检查 EventDispatcher 对象是否为特定事件类型注册了任何侦听器。
         */
        hasEventListener(type: string): boolean;
        /**
         * 从 EventDispatcher 对象中删除侦听器。
         */
        removeEventListener(type: string, listener: Function): void;
        /**
         * 检查是否用此 EventDispatcher 对象或其任何祖代为指定事件类型注册了事件侦听器。
         */
        willTrigger(type: string): boolean;
    }
}
declare module feng3d {
    /**
     * 组件容器（集合）
     * @author feng 2015-5-6
     */
    class Component extends EventDispatcher {
        private _componentName;
        /**
         * 组件列表
         */
        protected components: any[];
        /**
         * 组件名称
         */
        componentName: string;
        /**
         * 创建一个组件容器
         */
        constructor();
        /**
         * 子组件个数
         */
        numComponents: number;
        /**
         * 添加组件
         * @param com 被添加组件
         */
        addComponent(com: Component): void;
        /**
         * 添加组件到指定位置
         * @param component		被添加的组件
         * @param index			插入的位置
         */
        addComponentAt(component: Component, index: number): void;
        /**
         * 移除组件
         * @param com 被移除组件
         */
        removeComponent(com: Component): void;
        /**
         * 移除组件
         * @param index		要删除的 Component 的子索引。
         */
        removeComponentAt(index: number): Component;
        /**
         * 获取组件在容器的索引位置
         * @param com			查询的组件
         * @return				组件在容器的索引位置
         */
        getComponentIndex(com: Component): number;
        /**
         * 设置子组件的位置
         * @param com				子组件
         * @param index				位置索引
         */
        setComponentIndex(com: Component, index: number): void;
        /**
         * 获取指定位置索引的子组件
         * @param index			位置索引
         * @return				子组件
         */
        getComponentAt(index: number): any;
        /**
         * 根据组件名称获取组件
         * <p>注意：此处比较的是componentName而非name</p>
         * @param componentName		组件名称
         * @return 					获取到的组件
         */
        getComponentByName(componentName: String): any;
        /**
         * 获取与给出组件名称相同的所有组件
         * <p>注意：此处比较的是componentName而非name</p>
         * @param componentName		组件名称
         * @return 					获取到的组件
         */
        getComponentsByName(componentName: String): any[];
        /**
         * 根据类定义获取组件
         * <p>如果存在多个则返回第一个</p>
         * @param cls				类定义
         * @return
         */
        getComponentByClass(cls: any): any;
        /**
         * 根据类定义查找组件
         * @param cls		类定义
         * @return			返回与给出类定义一致的组件
         */
        getComponentsByClass(cls: any): any[];
        /**
         * 根据类定义获取或创建组件
         * <p>当不存在该类型对象时创建一个该组件并且添加到容器中</p>
         * @param cls
         * @return
         */
        getOrCreateComponentByClass(cls: any): any;
        /**
         * 判断是否拥有组件
         * @param com	被检测的组件
         * @return		true：拥有该组件；false：不拥有该组件。
         */
        hasComponent(com: Component): boolean;
        /**
         * 交换子组件位置
         * @param index1		第一个子组件的索引位置
         * @param index2		第二个子组件的索引位置
         */
        swapComponentsAt(index1: number, index2: number): void;
        /**
         * 交换子组件位置
         * @param com1		第一个子组件
         * @param com2		第二个子组件
         */
        swapComponents(com1: Component, com2: Component): void;
        /**
         * 派发子组件事件
         * <p>事件广播给子组件</p>
         * @param event
         */
        protected dispatchChildrenEvent(event: Event): void;
    }
}
declare module feng3d {
    /**
     * 添加组件事件数据
     * @author feng 2015-12-2
     */
    class AddedComponentEventVO {
        container: Component;
        child: Component;
        /**
         * 添加组件事件数据
         * @param container			组件容器
         * @param child				子组件
         */
        constructor(container: Component, child: Component);
    }
}
declare module feng3d {
    /**
     *
     * @author feng 2015-12-2
     */
    class RemovedComponentEventVO {
        container: Component;
        child: Component;
        /**
         * 添加组件事件数据
         * @param container			组件容器
         * @param child				子组件
         */
        constructor(container: Component, child: Component);
    }
}
declare module feng3d {
    /**
     * 组件事件
     * @author feng 2015-12-2
     */
    class ComponentEvent extends Event {
        /**
         * 添加子组件事件
         */
        static ADDED_COMPONET: string;
        /**
         * 被组件容器添加事件
         */
        static BE_ADDED_COMPONET: string;
        /**
         * 移除子组件事件
         */
        static REMOVED_COMPONET: string;
        /**
         * 被容器删除事件
         */
        static BE_REMOVED_COMPONET: string;
        constructor(type: string, data?: any, bubbles?: boolean, cancelable?: boolean);
    }
}
declare module feng3d {
    /**
     * 3D对象事件(3D状态发生改变、位置、旋转、缩放)
     * @author feng 2014-3-31
     */
    class Transform3DEvent extends Event {
        /**
         * 平移
         */
        static POSITION_CHANGED: string;
        /**
         * 旋转
         */
        static ROTATION_CHANGED: string;
        /**
         * 缩放
         */
        static SCALE_CHANGED: string;
        /**
         * 变换
         */
        static TRANSFORM_CHANGED: string;
        /**
         * 变换已更新
         */
        static TRANSFORM_UPDATED: string;
        /**
         * 场景变换矩阵发生变化
         */
        static SCENETRANSFORM_CHANGED: string;
        /**
         * 创建3D对象事件
         * @param type			事件类型
         * @param element3D		发出事件的3D元素
         */
        constructor(type: string, element3D: Element3D, bubbles?: boolean, cancelable?: boolean);
        /**
         * 发出事件的3D元素
         */
        element3D: Element3D;
    }
}
declare module feng3d {
    /**
     * 3D元素<br/><br/>
     *
     * 主要功能:
     * <ul>
     *     <li>管理3D元素的位置、旋转、缩放状态</li>
     * </ul>
     * @author feng 2014-3-31
     */
    class Element3D extends Component {
        private _smallestNumber;
        protected _transformDirty: boolean;
        private _positionDirty;
        private _rotationDirty;
        private _scaleDirty;
        private _positionChanged;
        private _rotationChanged;
        private _scaleChanged;
        private _transformChanged;
        private _eulers;
        private _listenToPositionChanged;
        private _listenToRotationChanged;
        private _listenToScaleChanged;
        private _listenToTransformChanged;
        protected _transform: Matrix3D;
        protected _x: number;
        protected _y: number;
        protected _z: number;
        protected _rotationX: number;
        protected _rotationY: number;
        protected _rotationZ: number;
        protected _scaleX: number;
        protected _scaleY: number;
        protected _scaleZ: number;
        protected _pivotPoint: Vector3D;
        protected _pivotZero: boolean;
        protected _pos: Vector3D;
        protected _rot: Vector3D;
        protected _sca: Vector3D;
        protected _transformComponents: Vector3D[];
        constructor();
        /**
         * 相对父容器的X坐标
         */
        x: number;
        /**
         * 相对父容器的Y坐标
         */
        y: number;
        /**
         * 相对父容器的Z坐标
         */
        z: number;
        /**
         * 绕X轴旋转角度
         */
        rotationX: number;
        /**
         * 绕Y轴旋转角度
         */
        rotationY: number;
        /**
         * 绕Z轴旋转角度
         */
        rotationZ: number;
        /**
         * X轴旋方向缩放
         */
        scaleX: number;
        /**
         * Y轴旋方向缩放
         */
        scaleY: number;
        /**
         * Z轴旋方向缩放
         */
        scaleZ: number;
        /**
         * 欧拉角
         * <ul>
         *     <li>使用Vector3D对象表示 相对x、y、z轴上的旋转角度</li>
         * </ul>
         */
        eulers: Vector3D;
        /**
         * 3d元素变换矩阵
         */
        transform: Matrix3D;
        /**
         * 中心点坐标（本地对象旋转点）
         */
        pivotPoint: Vector3D;
        /**
         * 获取在父容器中的坐标
         */
        position: Vector3D;
        /**
         * 使位置数据无效
         */
        protected invalidatePosition(): void;
        /**
         * 发出平移事件
         */
        private notifyPositionChanged();
        /**
         * 使变换矩阵失效
         */
        invalidateTransform(): void;
        /**
         * 发出状态改变消息
         */
        private notifyTransformChanged();
        /**
         * 更新变换矩阵
         */
        protected updateTransform(): void;
        /**
         * 使中心点无效
         */
        protected invalidatePivot(): void;
        /**
         * 监听事件
         * @param type 事件类型
         * @param listener 回调函数
         */
        addEventListener(type: string, listener: Function, priority?: number, useWeakReference?: boolean): void;
        /**
         * 移除事件
         * @param type 事件类型
         * @param listener 回调函数
         */
        removeEventListener(type: string, listener: Function): void;
        /**
         * 使旋转角度无效
         */
        protected invalidateRotation(): void;
        /**
         * 抛出旋转事件
         */
        private notifyRotationChanged();
        /**
         * 使缩放无效
         */
        protected invalidateScale(): void;
        /**
         * 抛出缩放事件
         */
        private notifyScaleChanged();
    }
}
declare module feng3d {
    /**
     * 3D元素状态变换<br/><br/>
     *
     * 主要功能:
     * <ul>
     *     <li>处理3d元素的平移、旋转、缩放等操作</li>
     * </ul>
     *
     * @author feng 2014-3-31
     */
    class Transform3D extends Element3D {
        /**
         * 创建3D元素状态变换实例
         */
        constructor();
        /**
         * 前方单位向量
         * <ul>
         * 		<li>自身的Z轴方向</li>
         * </ul>
         */
        forwardVector: Vector3D;
        /**
         * 右方单位向量
         * <ul>
         * 		<li>自身的X轴方向</li>
         * </ul>
         */
        rightVector: Vector3D;
        /**
         * 上方单位向量
         * <ul>
         * 		<li>自身的Y轴方向</li>
         * </ul>
         */
        upVector: Vector3D;
        /**
         * 后方单位向量
         * <ul>
         * 		<li>自身的Z轴负方向</li>
         * </ul>
         */
        backVector: Vector3D;
        /**
         * 左方单位向量
         * <ul>
         * 		<li>自身的X轴负方向</li>
         * </ul>
         */
        leftVector: Vector3D;
        /**
         * 下方单位向量
         * <ul>
         * 		<li>自身的Y轴负方向</li>
         * </ul>
         */
        downVector: Vector3D;
        /**
         * 等比缩放
         * @param value 缩放比例
         */
        scale(value: number): void;
        /**
         * 向前（Z轴方向）位移
         * @param distance 位移距离
         */
        moveForward(distance: number): void;
        /**
         * 向后（Z轴负方向）位移
         * @param distance 位移距离
         */
        moveBackward(distance: number): void;
        /**
         * 向左（X轴负方向）位移
         * @param distance 位移距离
         */
        moveLeft(distance: number): void;
        /**
         * 向右（X轴方向）位移
         * @param distance 位移距离
         */
        moveRight(distance: number): void;
        /**
         * 向上（Y轴方向）位移
         * @param distance 位移距离
         */
        moveUp(distance: number): void;
        /**
         * 向下（Y轴负方向）位移
         * @param distance 位移距离
         */
        moveDown(distance: number): void;
        /**
         * 直接移到空间的某个位置
         * @param newX x坐标
         * @param newY y坐标
         * @param newZ z坐标
         */
        moveTo(newX: number, newY: number, newZ: number): void;
        /**
         * 移动中心点（旋转点）
         * @param dx X轴方向位移
         * @param dy Y轴方向位移
         * @param dz Z轴方向位移
         */
        movePivot(dx: number, dy: number, dz: number): void;
        /**
         * 在自定义轴上位移
         * @param axis 自定义轴
         * @param distance 位移距离
         */
        translate(axis: Vector3D, distance: number): void;
        /**
         * 在自定义轴上位移<br/>
         *
         * 注意：
         * <ul>
         * 		<li>没太理解 与 translate的区别</li>
         * </ul>
         * @param axis 自定义轴
         * @param distance 位移距离
         */
        translateLocal(axis: Vector3D, distance: number): void;
        /**
         * 绕X轴旋转
         * @param angle 旋转角度
         */
        pitch(angle: number): void;
        /**
         * 绕Y轴旋转
         * @param angle 旋转角度
         */
        yaw(angle: number): void;
        /**
         * 绕Z轴旋转
         * @param angle 旋转角度
         */
        roll(angle: number): void;
        /**
         * 直接修改欧拉角
         * @param ax X轴旋转角度
         * @param ay Y轴旋转角度
         * @param az Z轴旋转角度
         */
        rotateTo(ax: number, ay: number, az: number): void;
        /**
         * 绕所给轴旋转
         * @param axis 任意轴
         * @param angle 旋转角度
         */
        rotate(axis: Vector3D, angle: number): void;
        /**
         * 观察目标
         * <ul>
         * 		<li>旋转至朝向给出的点</li>
         * </ul>
         * @param target 	目标点
         * @param upAxis 	旋转后向上方向（并非绝对向上），默认为null，当值为null时会以Y轴为向上方向计算
         */
        lookAt(target: Vector3D, upAxis?: Vector3D): void;
    }
}
/**
 * Feng3D
 */
declare class Feng3D {
    static REVISION: number;
    constructor(parameters: any);
}