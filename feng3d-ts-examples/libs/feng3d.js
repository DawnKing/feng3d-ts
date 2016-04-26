var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var me;
(function (me) {
    var feng3d;
    (function (feng3d) {
        /**
         * feng3d的版本号
         */
        var $REVISION = "0.0.0";
        console.log("Feng3D version " + $REVISION);
    })(feng3d = me.feng3d || (me.feng3d = {}));
})(me || (me = {}));
var me;
(function (me) {
    var feng3d;
    (function (feng3d) {
        /**
         * 断言
         * @b			判定为真的表达式
         * @msg			在表达式为假时将输出的错误信息
         * @author feng 2014-10-29
         */
        function assert(b, msg) {
            if (msg === void 0) { msg = "assert"; }
            if (!b)
                throw new Error(msg);
        }
        feng3d.assert = assert;
    })(feng3d = me.feng3d || (me.feng3d = {}));
})(me || (me = {}));
var me;
(function (me) {
    var feng3d;
    (function (feng3d) {
        /**
         * 获取对象的类名
         * @author feng 2016-4-24
         */
        function getClassName(value) {
            var prototype = value.prototype ? value.prototype : Object.getPrototypeOf(value);
            var className = prototype.constructor.name;
            return className;
        }
        feng3d.getClassName = getClassName;
    })(feng3d = me.feng3d || (me.feng3d = {}));
})(me || (me = {}));
var me;
(function (me) {
    var feng3d;
    (function (feng3d) {
        var StringUtils = (function () {
            function StringUtils() {
            }
            /**
             * 获取字符串
             * @param obj 转换为字符串的对象
             * @param showLen       显示长度
             * @param fill          长度不够是填充的字符串
             */
            StringUtils.getString = function (obj, showLen, fill) {
                if (showLen === void 0) { showLen = -1; }
                if (fill === void 0) { fill = " "; }
                var str = "";
                if (obj.toString != null) {
                    str = obj.toString();
                }
                else {
                    obj = obj;
                }
                if (showLen != -1) {
                    while (str.length < showLen) {
                        str += fill;
                    }
                    if (str.length > showLen) {
                        str = str.substr(0, showLen);
                    }
                }
                return str;
            };
            return StringUtils;
        }());
        feng3d.StringUtils = StringUtils;
    })(feng3d = me.feng3d || (me.feng3d = {}));
})(me || (me = {}));
var me;
(function (me) {
    var feng3d;
    (function (feng3d) {
        /**
         * 数学常量类
         */
        var MathConsts = (function () {
            function MathConsts() {
            }
            /**
             * 弧度转角度因子
             */
            MathConsts.RADIANS_TO_DEGREES = 180 / Math.PI;
            /**
             * 角度转弧度因子
             */
            MathConsts.DEGREES_TO_RADIANS = Math.PI / 180;
            return MathConsts;
        }());
        feng3d.MathConsts = MathConsts;
    })(feng3d = me.feng3d || (me.feng3d = {}));
})(me || (me = {}));
var me;
(function (me) {
    var feng3d;
    (function (feng3d) {
        /**
         * 矩形
         * @author feng 2016-04-27
         */
        var Rectangle = (function () {
            function Rectangle() {
                /**
                 * X坐标
                 */
                this.x = 0;
                /**
                 * Y坐标
                 */
                this.y = 0;
                /**
                 * 宽度
                 */
                this.width = 0;
                /**
                 * 高度
                 */
                this.height = 0;
            }
            /**
             * 是否包含指定点
             * @param x 点的X坐标
             * @param y 点的Y坐标
             */
            Rectangle.prototype.contains = function (x, y) {
                return this.x <= x && x < this.x + this.width && this.y <= y && y < this.y + this.height;
            };
            return Rectangle;
        }());
        feng3d.Rectangle = Rectangle;
    })(feng3d = me.feng3d || (me.feng3d = {}));
})(me || (me = {}));
var me;
(function (me) {
    var feng3d;
    (function (feng3d) {
        /**
         * Vector3D 类使用笛卡尔坐标 x、y 和 z 表示三维空间中的点或位置
         * @author feng 2016-3-21
         */
        var Vector3D = (function () {
            /**
             * 创建 Vector3D 对象的实例。如果未指定构造函数的参数，则将使用元素 (0,0,0,0) 创建 Vector3D 对象。
             * @param x 第一个元素，例如 x 坐标。
             * @param y 第二个元素，例如 y 坐标。
             * @param z 第三个元素，例如 z 坐标。
             * @param w 表示额外数据的可选元素，例如旋转角度
             */
            function Vector3D(x, y, z, w) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (z === void 0) { z = 0; }
                if (w === void 0) { w = 0; }
                this.x = x;
                this.y = y;
                this.z = z;
                this.w = w;
            }
            Object.defineProperty(Vector3D.prototype, "length", {
                /**
                * 当前 Vector3D 对象的长度（大小），即从原点 (0,0,0) 到该对象的 x、y 和 z 坐标的距离。w 属性将被忽略。单位矢量具有的长度或大小为一。
                */
                get: function () {
                    return Math.sqrt(this.lengthSquared);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Vector3D.prototype, "lengthSquared", {
                /**
                * 当前 Vector3D 对象长度的平方，它是使用 x、y 和 z 属性计算出来的。w 属性将被忽略。尽可能使用 lengthSquared() 方法，而不要使用 Vector3D.length() 方法的 Math.sqrt() 方法调用，后者速度较慢。
                */
                get: function () {
                    return this.x * this.x + this.y * this.y + this.z * this.z;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 将当前 Vector3D 对象的 x、y 和 z 元素的值与另一个 Vector3D 对象的 x、y 和 z 元素的值相加。
             * @param a 要与当前 Vector3D 对象相加的 Vector3D 对象。
             * @return 一个 Vector3D 对象，它是将当前 Vector3D 对象与另一个 Vector3D 对象相加所产生的结果。
             */
            Vector3D.prototype.add = function (a) {
                return new Vector3D(this.x + a.x, this.y + a.y, this.z + a.z, this.w + a.w);
            };
            /**
             * 返回一个新 Vector3D 对象，它是与当前 Vector3D 对象完全相同的副本。
             * @return 一个新 Vector3D 对象，它是当前 Vector3D 对象的副本。
             */
            Vector3D.prototype.clone = function () {
                return new Vector3D(this.x, this.y, this.z, this.w);
            };
            /**
             * 将源 Vector3D 对象中的所有矢量数据复制到调用方 Vector3D 对象中。
             * @return 要从中复制数据的 Vector3D 对象。
             */
            Vector3D.prototype.copyFrom = function (sourceVector3D) {
                this.x = sourceVector3D.x;
                this.y = sourceVector3D.y;
                this.z = sourceVector3D.z;
                this.w = sourceVector3D.w;
            };
            /**
             * 返回一个新的 Vector3D 对象，它与当前 Vector3D 对象和另一个 Vector3D 对象垂直（成直角）。
             */
            Vector3D.prototype.crossProduct = function (a) {
                return new Vector3D(this.y * a.z - this.z * a.y, this.z * a.x - this.x * a.z, this.x * a.y - this.y * a.x, 1);
            };
            /**
             * 按照指定的 Vector3D 对象的 x、y 和 z 元素的值递减当前 Vector3D 对象的 x、y 和 z 元素的值。
             */
            Vector3D.prototype.decrementBy = function (a) {
                this.x -= a.x;
                this.y -= a.y;
                this.z -= a.z;
            };
            /**
             * 返回两个 Vector3D 对象之间的距离。
             */
            Vector3D.distance = function (pt1, pt2) {
                var x = (pt1.x - pt2.x);
                var y = (pt1.y - pt2.y);
                var z = (pt1.z - pt2.z);
                return Math.sqrt(x * x + y * y + z * z);
            };
            /**
             * 如果当前 Vector3D 对象和作为参数指定的 Vector3D 对象均为单位顶点，此方法将返回这两个顶点之间所成角的余弦值。
             */
            Vector3D.prototype.dotProduct = function (a) {
                return this.x * a.x + this.y * a.y + this.z * a.z;
            };
            /**
             * 通过将当前 Vector3D 对象的 x、y 和 z 元素与指定的 Vector3D 对象的 x、y 和 z 元素进行比较，确定这两个对象是否相等。
             */
            Vector3D.prototype.equals = function (toCompare, allFour) {
                if (allFour === void 0) { allFour = false; }
                return (this.x == toCompare.x && this.y == toCompare.y && this.z == toCompare.z && (!allFour || this.w == toCompare.w));
            };
            /**
             * 按照指定的 Vector3D 对象的 x、y 和 z 元素的值递增当前 Vector3D 对象的 x、y 和 z 元素的值。
             */
            Vector3D.prototype.incrementBy = function (a) {
                this.x += a.x;
                this.y += a.y;
                this.z += a.z;
            };
            /**
             * 将当前 Vector3D 对象设置为其逆对象。
             */
            Vector3D.prototype.negate = function () {
                this.x = -this.x;
                this.y = -this.y;
                this.z = -this.z;
            };
            /**
             * 通过将最前面的三个元素（x、y、z）除以矢量的长度可将 Vector3D 对象转换为单位矢量。
             */
            Vector3D.prototype.normalize = function (thickness) {
                if (thickness === void 0) { thickness = 1; }
                if (this.length != 0) {
                    var invLength = thickness / this.length;
                    this.x *= invLength;
                    this.y *= invLength;
                    this.z *= invLength;
                    return;
                }
            };
            /**
             * 按标量（大小）缩放当前的 Vector3D 对象。
             */
            Vector3D.prototype.scaleBy = function (s) {
                this.x *= s;
                this.y *= s;
                this.z *= s;
            };
            /**
             * 将 Vector3D 的成员设置为指定值
             */
            Vector3D.prototype.setTo = function (xa, ya, za) {
                this.x = xa;
                this.y = ya;
                this.z = za;
            };
            /**
             * 从另一个 Vector3D 对象的 x、y 和 z 元素的值中减去当前 Vector3D 对象的 x、y 和 z 元素的值。
             */
            Vector3D.prototype.subtract = function (a) {
                return new Vector3D(this.x - a.x, this.y - a.y, this.z - a.z);
            };
            /**
             * 返回当前 Vector3D 对象的字符串表示形式。
             */
            Vector3D.prototype.toString = function () {
                return "<" + this.x + ", " + this.y + ", " + this.z + ">";
            };
            /**
            * 定义为 Vector3D 对象的 x 轴，坐标为 (1,0,0)。
            */
            Vector3D.X_AXIS = new Vector3D(1, 0, 0);
            /**
            * 定义为 Vector3D 对象的 y 轴，坐标为 (0,1,0)
            */
            Vector3D.Y_AXIS = new Vector3D(0, 1, 0);
            /**
            * 定义为 Vector3D 对象的 z 轴，坐标为 (0,0,1)
            */
            Vector3D.Z_AXIS = new Vector3D(0, 0, 1);
            return Vector3D;
        }());
        feng3d.Vector3D = Vector3D;
    })(feng3d = me.feng3d || (me.feng3d = {}));
})(me || (me = {}));
var me;
(function (me) {
    var feng3d;
    (function (feng3d) {
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
        var Matrix3D = (function () {
            /**
             * 创建 Matrix3D 对象。
             * @param   datas    一个由 16 个数字组成的矢量，其中，每四个元素可以是 4x4 矩阵的一列。
             */
            function Matrix3D(datas) {
                if (datas === void 0) { datas = null; }
                if (datas) {
                    this.rawData = datas.concat();
                }
                else
                    this.rawData = [
                        1, 0, 0, 0,
                        0, 1, 0, 0,
                        0, 0, 1, 0,
                        0, 0, 0, 1 //
                    ];
            }
            Object.defineProperty(Matrix3D.prototype, "position", {
                /**
                 * 一个保存显示对象在转换参照帧中的 3D 坐标 (x,y,z) 位置的 Vector3D 对象。
                 */
                get: function () {
                    return new feng3d.Vector3D(this.rawData[12], this.rawData[13], this.rawData[14]);
                },
                set: function (value) {
                    this.rawData[12] = value.x;
                    this.rawData[13] = value.y;
                    this.rawData[14] = value.z;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix3D.prototype, "determinant", {
                /**
                 * 一个用于确定矩阵是否可逆的数字。
                 */
                get: function () {
                    return ((this.rawData[0] * this.rawData[5] - this.rawData[4] * this.rawData[1]) * (this.rawData[10] * this.rawData[15] - this.rawData[14] * this.rawData[11]) //
                        - (this.rawData[0] * this.rawData[9] - this.rawData[8] * this.rawData[1]) * (this.rawData[6] * this.rawData[15] - this.rawData[14] * this.rawData[7]) //
                        + (this.rawData[0] * this.rawData[13] - this.rawData[12] * this.rawData[1]) * (this.rawData[6] * this.rawData[11] - this.rawData[10] * this.rawData[7]) //
                        + (this.rawData[4] * this.rawData[9] - this.rawData[8] * this.rawData[5]) * (this.rawData[2] * this.rawData[15] - this.rawData[14] * this.rawData[3]) //
                        - (this.rawData[4] * this.rawData[13] - this.rawData[12] * this.rawData[5]) * (this.rawData[2] * this.rawData[11] - this.rawData[10] * this.rawData[3]) //
                        + (this.rawData[8] * this.rawData[13] - this.rawData[12] * this.rawData[9]) * (this.rawData[2] * this.rawData[7] - this.rawData[6] * this.rawData[3]) //
                    );
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix3D.prototype, "forward", {
                /**
                 * 前方（+Z轴方向）
                 */
                get: function () {
                    var v = new feng3d.Vector3D(0.0, 0.0, 0.0);
                    this.copyColumnTo(2, v);
                    v.normalize();
                    return v;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix3D.prototype, "up", {
                /**
                 * 上方（+y轴方向）
                 */
                get: function () {
                    var v = new feng3d.Vector3D();
                    this.copyColumnTo(1, v);
                    v.normalize();
                    return v;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix3D.prototype, "right", {
                /**
                 * 右方（+x轴方向）
                 */
                get: function () {
                    var v = new feng3d.Vector3D();
                    this.copyColumnTo(0, v);
                    v.normalize();
                    return v;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 创建旋转矩阵
             * @param   degrees         角度
             * @param   axis            旋转轴
             * @param   pivotPoint      旋转中心点
             */
            Matrix3D.createRotationMatrix3D = function (degrees, axis) {
                var n = axis.clone();
                n.normalize();
                var q = degrees * Math.PI / 180;
                var sinq = Math.sin(q);
                var cosq = Math.cos(q);
                var lcosq = 1 - cosq;
                var rotationMat = new Matrix3D([
                    n.x * n.x * lcosq + cosq, n.x * n.y * lcosq + n.z * sinq, n.x * n.z * lcosq - n.y * sinq, 0,
                    n.x * n.y * lcosq - n.z * sinq, n.y * n.y * lcosq + cosq, n.y * n.z * lcosq + n.x * sinq, 0,
                    n.x * n.z * lcosq + n.y * sinq, n.y * n.z * lcosq - n.x * sinq, n.z * n.z * lcosq + cosq, 0,
                    0, 0, 0, 1 //
                ]);
                return rotationMat;
            };
            /**
             * 创建缩放矩阵
             * @param   xScale      用于沿 x 轴缩放对象的乘数。
             * @param   yScale      用于沿 y 轴缩放对象的乘数。
             * @param   zScale      用于沿 z 轴缩放对象的乘数。
             */
            Matrix3D.createScaleMatrix3D = function (xScale, yScale, zScale) {
                var rotationMat = new Matrix3D([
                    xScale, 0.0000, 0.0000, 0,
                    0.0000, yScale, 0.0000, 0,
                    0.0000, 0.0000, zScale, 0,
                    0.0000, 0.0000, 0.0000, 1 //
                ]);
                return rotationMat;
            };
            /**
             * 创建位移矩阵
             * @param   x   沿 x 轴的增量平移。
             * @param   y   沿 y 轴的增量平移。
             * @param   z   沿 z 轴的增量平移。
             */
            Matrix3D.createTranslationMatrix3D = function (x, y, z) {
                var rotationMat = new Matrix3D([
                    1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    x, y, z, 1 //
                ]);
                return rotationMat;
            };
            /**
             * 通过将另一个 Matrix3D 对象与当前 Matrix3D 对象相乘来后置一个矩阵。
             */
            Matrix3D.prototype.append = function (lhs) {
                var //
                m111 = this.rawData[0], m121 = this.rawData[4], m131 = this.rawData[8], m141 = this.rawData[12], //
                m112 = this.rawData[1], m122 = this.rawData[5], m132 = this.rawData[9], m142 = this.rawData[13], //
                m113 = this.rawData[2], m123 = this.rawData[6], m133 = this.rawData[10], m143 = this.rawData[14], //
                m114 = this.rawData[3], m124 = this.rawData[7], m134 = this.rawData[11], m144 = this.rawData[15], //
                m211 = lhs.rawData[0], m221 = lhs.rawData[4], m231 = lhs.rawData[8], m241 = lhs.rawData[12], //
                m212 = lhs.rawData[1], m222 = lhs.rawData[5], m232 = lhs.rawData[9], m242 = lhs.rawData[13], //
                m213 = lhs.rawData[2], m223 = lhs.rawData[6], m233 = lhs.rawData[10], m243 = lhs.rawData[14], //
                m214 = lhs.rawData[3], m224 = lhs.rawData[7], m234 = lhs.rawData[11], m244 = lhs.rawData[15];
                this.rawData[0] = m111 * m211 + m112 * m221 + m113 * m231 + m114 * m241;
                this.rawData[1] = m111 * m212 + m112 * m222 + m113 * m232 + m114 * m242;
                this.rawData[2] = m111 * m213 + m112 * m223 + m113 * m233 + m114 * m243;
                this.rawData[3] = m111 * m214 + m112 * m224 + m113 * m234 + m114 * m244;
                this.rawData[4] = m121 * m211 + m122 * m221 + m123 * m231 + m124 * m241;
                this.rawData[5] = m121 * m212 + m122 * m222 + m123 * m232 + m124 * m242;
                this.rawData[6] = m121 * m213 + m122 * m223 + m123 * m233 + m124 * m243;
                this.rawData[7] = m121 * m214 + m122 * m224 + m123 * m234 + m124 * m244;
                this.rawData[8] = m131 * m211 + m132 * m221 + m133 * m231 + m134 * m241;
                this.rawData[9] = m131 * m212 + m132 * m222 + m133 * m232 + m134 * m242;
                this.rawData[10] = m131 * m213 + m132 * m223 + m133 * m233 + m134 * m243;
                this.rawData[11] = m131 * m214 + m132 * m224 + m133 * m234 + m134 * m244;
                this.rawData[12] = m141 * m211 + m142 * m221 + m143 * m231 + m144 * m241;
                this.rawData[13] = m141 * m212 + m142 * m222 + m143 * m232 + m144 * m242;
                this.rawData[14] = m141 * m213 + m142 * m223 + m143 * m233 + m144 * m243;
                this.rawData[15] = m141 * m214 + m142 * m224 + m143 * m234 + m144 * m244;
            };
            /**
             * 在 Matrix3D 对象上后置一个增量旋转。
             * @param   degrees         角度
             * @param   axis            旋转轴
             * @param   pivotPoint      旋转中心点
             */
            Matrix3D.prototype.appendRotation = function (degrees, axis, pivotPoint) {
                if (pivotPoint === void 0) { pivotPoint = new feng3d.Vector3D(); }
                var rotationMat = Matrix3D.createRotationMatrix3D(degrees, axis);
                if (pivotPoint != null) {
                    this.appendTranslation(-pivotPoint.x, -pivotPoint.y, -pivotPoint.z);
                }
                this.append(rotationMat);
                if (pivotPoint != null) {
                    this.appendTranslation(pivotPoint.x, pivotPoint.y, pivotPoint.z);
                }
            };
            /**
             * 在 Matrix3D 对象上后置一个增量缩放，沿 x、y 和 z 轴改变位置。
             * @param   xScale      用于沿 x 轴缩放对象的乘数。
             * @param   yScale      用于沿 y 轴缩放对象的乘数。
             * @param   zScale      用于沿 z 轴缩放对象的乘数。
             */
            Matrix3D.prototype.appendScale = function (xScale, yScale, zScale) {
                var scaleMat = Matrix3D.createScaleMatrix3D(xScale, yScale, zScale);
                this.append(scaleMat);
            };
            /**
             * 在 Matrix3D 对象上后置一个增量平移，沿 x、y 和 z 轴重新定位。
             * @param   x   沿 x 轴的增量平移。
             * @param   y   沿 y 轴的增量平移。
             * @param   z   沿 z 轴的增量平移。
             */
            Matrix3D.prototype.appendTranslation = function (x, y, z) {
                this.rawData[12] += x;
                this.rawData[13] += y;
                this.rawData[14] += z;
            };
            /**
             * 返回一个新 Matrix3D 对象，它是与当前 Matrix3D 对象完全相同的副本。
             */
            Matrix3D.prototype.clone = function () {
                var ret = new Matrix3D();
                ret.copyFrom(this);
                return ret;
            };
            /**
             * 将 Vector3D 对象复制到调用方 Matrix3D 对象的特定列中。
             * @param   column      副本的目标列。
             * @param   vector3D    要从中复制数据的 Vector3D 对象。
             */
            Matrix3D.prototype.copyColumnFrom = function (column, vector3D) {
                this.rawData[column * 4 + 0] = vector3D.x;
                this.rawData[column * 4 + 1] = vector3D.y;
                this.rawData[column * 4 + 2] = vector3D.z;
                this.rawData[column * 4 + 3] = vector3D.w;
            };
            /**
             * 将调用方 Matrix3D 对象的特定列复制到 Vector3D 对象中。
             * @param   column       要从中复制数据的列。
             * @param   vector3D     副本的目标 Vector3D 对象。
             */
            Matrix3D.prototype.copyColumnTo = function (column, vector3D) {
                vector3D.x = this.rawData[column * 4 + 0];
                vector3D.y = this.rawData[column * 4 + 1];
                vector3D.z = this.rawData[column * 4 + 2];
                vector3D.w = this.rawData[column * 4 + 3];
            };
            /**
             * 将源 Matrix3D 对象中的所有矩阵数据复制到调用方 Matrix3D 对象中。
             * @param   sourceMatrix3D      要从中复制数据的 Matrix3D 对象。
             */
            Matrix3D.prototype.copyFrom = function (sourceMatrix3D) {
                for (var i = 0; i < 16; i++) {
                    this.rawData[i] = sourceMatrix3D.rawData[i];
                }
            };
            /**
             * 将源 Vector 对象中的所有矢量数据复制到调用方 Matrix3D 对象中。利用可选索引参数，您可以选择矢量中的任何起始文字插槽。
             * @param   vector      要从中复制数据的 Vector 对象。
             * @param   index       vector中的起始位置
             * @param   transpose   是否转置当前矩阵
             */
            Matrix3D.prototype.copyRawDataFrom = function (vector, index, transpose) {
                if (index === void 0) { index = 0; }
                if (transpose === void 0) { transpose = false; }
                if (vector.length - index < 16) {
                    throw new Error("vector参数数据长度不够！");
                }
                for (var i = 0; i < 16; i++) {
                    this.rawData[i] = vector[index + i];
                }
                if (transpose) {
                    this.transpose();
                }
            };
            /**
             * 将调用方 Matrix3D 对象中的所有矩阵数据复制到提供的矢量中。
             * @param   vector      要将数据复制到的 Vector 对象。
             * @param   index       vector中的起始位置
             * @param   transpose   是否转置当前矩阵
             */
            Matrix3D.prototype.copyRawDataTo = function (vector, index, transpose) {
                if (index === void 0) { index = 0; }
                if (transpose === void 0) { transpose = false; }
                if (transpose) {
                    this.transpose();
                }
                for (var i = 0; i < 16; i++) {
                    vector[i + index] = this.rawData[i];
                }
                if (transpose) {
                    this.transpose();
                }
            };
            /**
             * 将 Vector3D 对象复制到调用方 Matrix3D 对象的特定行中。
             * @param   row         要将数据复制到的行。
             * @param   vector3D    要从中复制数据的 Vector3D 对象。
             */
            Matrix3D.prototype.copyRowFrom = function (row, vector3D) {
                this.rawData[row + 4 * 0] = vector3D.x;
                this.rawData[row + 4 * 1] = vector3D.y;
                this.rawData[row + 4 * 2] = vector3D.z;
                this.rawData[row + 4 * 3] = vector3D.w;
            };
            /**
             * 将调用方 Matrix3D 对象的特定行复制到 Vector3D 对象中。
             * @param   row         要从中复制数据的行。
             * @param   vector3D    将作为数据复制目的地的 Vector3D 对象。
             */
            Matrix3D.prototype.copyRowTo = function (row, vector3D) {
                vector3D.x = this.rawData[row + 4 * 0];
                vector3D.y = this.rawData[row + 4 * 1];
                vector3D.z = this.rawData[row + 4 * 2];
                vector3D.w = this.rawData[row + 4 * 3];
            };
            /**
             * 拷贝当前矩阵
             * @param   dest    目标矩阵
             */
            Matrix3D.prototype.copyToMatrix3D = function (dest) {
                dest.rawData = this.rawData.slice(0);
            };
            /**
             * 将转换矩阵的平移、旋转和缩放设置作为由三个 Vector3D 对象组成的矢量返回。
             * @return      一个由三个 Vector3D 对象组成的矢量，其中，每个对象分别容纳平移、旋转和缩放设置。
             */
            Matrix3D.prototype.decompose = function () {
                var vec = [];
                var m = this.clone();
                var mr = m.rawData;
                var pos = new feng3d.Vector3D(mr[12], mr[13], mr[14]);
                mr[12] = 0;
                mr[13] = 0;
                mr[14] = 0;
                var scale = new feng3d.Vector3D();
                scale.x = Math.sqrt(mr[0] * mr[0] + mr[1] * mr[1] + mr[2] * mr[2]);
                scale.y = Math.sqrt(mr[4] * mr[4] + mr[5] * mr[5] + mr[6] * mr[6]);
                scale.z = Math.sqrt(mr[8] * mr[8] + mr[9] * mr[9] + mr[10] * mr[10]);
                if (mr[0] * (mr[5] * mr[10] - mr[6] * mr[9]) - mr[1] * (mr[4] * mr[10] - mr[6] * mr[8]) + mr[2] * (mr[4] * mr[9] - mr[5] * mr[8]) < 0)
                    scale.z = -scale.z;
                mr[0] /= scale.x;
                mr[1] /= scale.x;
                mr[2] /= scale.x;
                mr[4] /= scale.y;
                mr[5] /= scale.y;
                mr[6] /= scale.y;
                mr[8] /= scale.z;
                mr[9] /= scale.z;
                mr[10] /= scale.z;
                var rot = new feng3d.Vector3D();
                rot.y = Math.asin(-mr[2]);
                if (mr[2] != 1 && mr[2] != -1) {
                    rot.x = Math.atan2(mr[6], mr[10]);
                    rot.z = Math.atan2(mr[1], mr[0]);
                }
                else {
                    rot.z = 0;
                    rot.x = Math.atan2(mr[4], mr[5]);
                }
                vec.push(pos);
                vec.push(rot);
                vec.push(scale);
                return vec;
            };
            /**
             * 使用不含平移元素的转换矩阵将 Vector3D 对象从一个空间坐标转换到另一个空间坐标。
             * @param   v   一个容纳要转换的坐标的 Vector3D 对象。
             * @return  一个包含转换后的坐标的 Vector3D 对象。
             */
            Matrix3D.prototype.deltaTransformVector = function (v) {
                var tempx = this.rawData[12];
                var tempy = this.rawData[13];
                var tempz = this.rawData[14];
                this.rawData[12] = 0;
                this.rawData[13] = 0;
                this.rawData[14] = 0;
                var result = this.transformVector(v);
                this.rawData[12] = tempx;
                this.rawData[13] = tempy;
                this.rawData[14] = tempz;
                return result;
            };
            /**
             * 将当前矩阵转换为恒等或单位矩阵。
             */
            Matrix3D.prototype.identity = function () {
                this.rawData[1] = 0;
                this.rawData[2] = 0;
                this.rawData[3] = 0;
                this.rawData[4] = 0;
                this.rawData[6] = 0;
                this.rawData[7] = 0;
                this.rawData[8] = 0;
                this.rawData[9] = 0;
                this.rawData[11] = 0;
                this.rawData[12] = 0;
                this.rawData[13] = 0;
                this.rawData[14] = 0;
                this.rawData[0] = 1;
                this.rawData[5] = 1;
                this.rawData[10] = 1;
                this.rawData[15] = 1;
            };
            /**
             * 反转当前矩阵。逆矩阵
             * @return      如果成功反转矩阵，则返回 true。
             */
            Matrix3D.prototype.invert = function () {
                var d = this.determinant;
                var invertable = Math.abs(d) > 0.00000000001;
                if (invertable) {
                    d = 1 / d;
                    var m11 = this.rawData[0];
                    var m21 = this.rawData[4];
                    var m31 = this.rawData[8];
                    var m41 = this.rawData[12];
                    var m12 = this.rawData[1];
                    var m22 = this.rawData[5];
                    var m32 = this.rawData[9];
                    var m42 = this.rawData[13];
                    var m13 = this.rawData[2];
                    var m23 = this.rawData[6];
                    var m33 = this.rawData[10];
                    var m43 = this.rawData[14];
                    var m14 = this.rawData[3];
                    var m24 = this.rawData[7];
                    var m34 = this.rawData[11];
                    var m44 = this.rawData[15];
                    this.rawData[0] = d * (m22 * (m33 * m44 - m43 * m34) - m32 * (m23 * m44 - m43 * m24) + m42 * (m23 * m34 - m33 * m24));
                    this.rawData[1] = -d * (m12 * (m33 * m44 - m43 * m34) - m32 * (m13 * m44 - m43 * m14) + m42 * (m13 * m34 - m33 * m14));
                    this.rawData[2] = d * (m12 * (m23 * m44 - m43 * m24) - m22 * (m13 * m44 - m43 * m14) + m42 * (m13 * m24 - m23 * m14));
                    this.rawData[3] = -d * (m12 * (m23 * m34 - m33 * m24) - m22 * (m13 * m34 - m33 * m14) + m32 * (m13 * m24 - m23 * m14));
                    this.rawData[4] = -d * (m21 * (m33 * m44 - m43 * m34) - m31 * (m23 * m44 - m43 * m24) + m41 * (m23 * m34 - m33 * m24));
                    this.rawData[5] = d * (m11 * (m33 * m44 - m43 * m34) - m31 * (m13 * m44 - m43 * m14) + m41 * (m13 * m34 - m33 * m14));
                    this.rawData[6] = -d * (m11 * (m23 * m44 - m43 * m24) - m21 * (m13 * m44 - m43 * m14) + m41 * (m13 * m24 - m23 * m14));
                    this.rawData[7] = d * (m11 * (m23 * m34 - m33 * m24) - m21 * (m13 * m34 - m33 * m14) + m31 * (m13 * m24 - m23 * m14));
                    this.rawData[8] = d * (m21 * (m32 * m44 - m42 * m34) - m31 * (m22 * m44 - m42 * m24) + m41 * (m22 * m34 - m32 * m24));
                    this.rawData[9] = -d * (m11 * (m32 * m44 - m42 * m34) - m31 * (m12 * m44 - m42 * m14) + m41 * (m12 * m34 - m32 * m14));
                    this.rawData[10] = d * (m11 * (m22 * m44 - m42 * m24) - m21 * (m12 * m44 - m42 * m14) + m41 * (m12 * m24 - m22 * m14));
                    this.rawData[11] = -d * (m11 * (m22 * m34 - m32 * m24) - m21 * (m12 * m34 - m32 * m14) + m31 * (m12 * m24 - m22 * m14));
                    this.rawData[12] = -d * (m21 * (m32 * m43 - m42 * m33) - m31 * (m22 * m43 - m42 * m23) + m41 * (m22 * m33 - m32 * m23));
                    this.rawData[13] = d * (m11 * (m32 * m43 - m42 * m33) - m31 * (m12 * m43 - m42 * m13) + m41 * (m12 * m33 - m32 * m13));
                    this.rawData[14] = -d * (m11 * (m22 * m43 - m42 * m23) - m21 * (m12 * m43 - m42 * m13) + m41 * (m12 * m23 - m22 * m13));
                    this.rawData[15] = d * (m11 * (m22 * m33 - m32 * m23) - m21 * (m12 * m33 - m32 * m13) + m31 * (m12 * m23 - m22 * m13));
                }
                return invertable;
            };
            /**
             * 通过将当前 Matrix3D 对象与另一个 Matrix3D 对象相乘来前置一个矩阵。得到的结果将合并两个矩阵转换。
             * @param   rhs     个右侧矩阵，它与当前 Matrix3D 对象相乘。
             */
            Matrix3D.prototype.prepend = function (rhs) {
                var mat = this.clone();
                this.copyFrom(rhs);
                this.append(mat);
            };
            /**
             * 在 Matrix3D 对象上前置一个增量旋转。在将 Matrix3D 对象应用于显示对象时，矩阵会在 Matrix3D 对象中先执行旋转，然后再执行其他转换。
             * @param   degrees     旋转的角度。
             * @param   axis        旋转的轴或方向。常见的轴为 X_AXIS (Vector3D(1,0,0))、Y_AXIS (Vector3D(0,1,0)) 和 Z_AXIS (Vector3D(0,0,1))。此矢量的长度应为 1。
             * @param   pivotPoint  一个用于确定旋转中心的点。对象的默认轴点为该对象的注册点。
             */
            Matrix3D.prototype.prependRotation = function (degrees, axis, pivotPoint) {
                if (pivotPoint === void 0) { pivotPoint = new feng3d.Vector3D(); }
                var rotationMat = Matrix3D.createRotationMatrix3D(degrees, axis);
                this.prepend(rotationMat);
            };
            /**
             * 在 Matrix3D 对象上前置一个增量缩放，沿 x、y 和 z 轴改变位置。在将 Matrix3D 对象应用于显示对象时，矩阵会在 Matrix3D 对象中先执行缩放更改，然后再执行其他转换。
             * @param   xScale      用于沿 x 轴缩放对象的乘数。
             * @param   yScale      用于沿 y 轴缩放对象的乘数。
             * @param   zScale      用于沿 z 轴缩放对象的乘数。
             */
            Matrix3D.prototype.prependScale = function (xScale, yScale, zScale) {
                var scaleMat = Matrix3D.createScaleMatrix3D(xScale, yScale, zScale);
                this.prepend(scaleMat);
            };
            /**
             * 在 Matrix3D 对象上前置一个增量平移，沿 x、y 和 z 轴重新定位。在将 Matrix3D 对象应用于显示对象时，矩阵会在 Matrix3D 对象中先执行平移更改，然后再执行其他转换。
             * @param   x   沿 x 轴的增量平移。
             * @param   y   沿 y 轴的增量平移。
             * @param   z   沿 z 轴的增量平移。
             */
            Matrix3D.prototype.prependTranslation = function (x, y, z) {
                var translationMat = Matrix3D.createTranslationMatrix3D(x, y, z);
                this.prepend(translationMat);
            };
            /**
             * 设置转换矩阵的平移、旋转和缩放设置。
             * @param   components      一个由三个 Vector3D 对象组成的矢量，这些对象将替代 Matrix3D 对象的平移、旋转和缩放元素。
             */
            Matrix3D.prototype.recompose = function (components) {
                this.identity();
                this.appendRotation(components[1].x * feng3d.MathConsts.RADIANS_TO_DEGREES, feng3d.Vector3D.X_AXIS);
                this.appendRotation(components[1].y * feng3d.MathConsts.RADIANS_TO_DEGREES, feng3d.Vector3D.Y_AXIS);
                this.appendRotation(components[1].z * feng3d.MathConsts.RADIANS_TO_DEGREES, feng3d.Vector3D.Z_AXIS);
                this.appendScale(components[2].x, components[2].y, components[2].z);
                this.appendTranslation(components[0].x, components[0].y, components[0].z);
            };
            /**
             * 使用转换矩阵将 Vector3D 对象从一个空间坐标转换到另一个空间坐标。
             * @param   vin   一个容纳要转换的坐标的 Vector3D 对象。
             * @return  一个包含转换后的坐标的 Vector3D 对象。
             */
            Matrix3D.prototype.transformVector = function (vin, vout) {
                var x = vin.x;
                var y = vin.y;
                var z = vin.z;
                vout = vout || new feng3d.Vector3D();
                vout.x = x * this.rawData[0] + y * this.rawData[4] + z * this.rawData[8] + this.rawData[12];
                vout.y = x * this.rawData[1] + y * this.rawData[5] + z * this.rawData[9] + this.rawData[13];
                vout.z = x * this.rawData[2] + y * this.rawData[6] + z * this.rawData[10] + this.rawData[14];
                vout.w = x * this.rawData[3] + y * this.rawData[7] + z * this.rawData[11] + this.rawData[15];
                return vout;
            };
            /**
             * 使用转换矩阵将由数字构成的矢量从一个空间坐标转换到另一个空间坐标。
             * @param   vin     一个由多个数字组成的矢量，其中每三个数字构成一个要转换的 3D 坐标 (x,y,z)。
             * @param   vout    一个由多个数字组成的矢量，其中每三个数字构成一个已转换的 3D 坐标 (x,y,z)。
             */
            Matrix3D.prototype.transformVectors = function (vin, vout) {
                var vec = new feng3d.Vector3D();
                for (var i = 0; i < vin.length; i += 3) {
                    vec.setTo(vin[i], vin[i + 1], vin[i + 2]);
                    vec = this.transformVector(vec);
                    vout[i] = vec.x;
                    vout[i + 1] = vec.y;
                    vout[i + 2] = vec.z;
                }
            };
            /**
             * 将当前 Matrix3D 对象转换为一个矩阵，并将互换其中的行和列。
             */
            Matrix3D.prototype.transpose = function () {
                var swap;
                for (var i = 0; i < 4; i++) {
                    for (var j = 0; j < 4; j++) {
                        if (i > j) {
                            swap = this.rawData[i * 4 + j];
                            this.rawData[i * 4 + j] = this.rawData[j * 4 + i];
                            this.rawData[j * 4 + i] = swap;
                        }
                    }
                }
            };
            /**
             * 比较矩阵是否相等
             */
            Matrix3D.prototype.compare = function (matrix3D, precision) {
                if (precision === void 0) { precision = 0.0001; }
                var r2 = matrix3D.rawData;
                for (var i = 0; i < 16; ++i) {
                    if (Math.abs(this.rawData[i] - r2[i]) > precision)
                        return false;
                }
                return true;
            };
            /**
             * 以字符串返回矩阵的值
             */
            Matrix3D.prototype.toString = function () {
                var str = "";
                var showLen = 5;
                var precision = Math.pow(10, showLen - 1);
                for (var i = 0; i < 4; i++) {
                    for (var j = 0; j < 4; j++) {
                        str += feng3d.StringUtils.getString(Math.round(this.rawData[i * 4 + j] * precision) / precision, showLen, " ");
                    }
                    if (i != 3)
                        str += "\n";
                }
                return str;
            };
            return Matrix3D;
        }());
        feng3d.Matrix3D = Matrix3D;
    })(feng3d = me.feng3d || (me.feng3d = {}));
})(me || (me = {}));
var me;
(function (me) {
    var feng3d;
    (function (feng3d) {
        /**
         * 镜头事件
         * @author feng 2014-10-14
         */
        var LensEvent = (function (_super) {
            __extends(LensEvent, _super);
            /**
             * 创建一个镜头事件。
             * @param type 事件的类型
             * @param lens 镜头
             * @param bubbles 确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
             */
            function LensEvent(type, lens, bubbles) {
                if (lens === void 0) { lens = null; }
                if (bubbles === void 0) { bubbles = false; }
                _super.call(this, type, lens, bubbles);
            }
            LensEvent.MATRIX_CHANGED = "matrixChanged";
            return LensEvent;
        }(feng3d.Event));
        feng3d.LensEvent = LensEvent;
    })(feng3d = me.feng3d || (me.feng3d = {}));
})(me || (me = {}));
var me;
(function (me) {
    var feng3d;
    (function (feng3d) {
        /**
         * 3D空间
         * @author feng 2016-04-26
         */
        var Space3D = (function (_super) {
            __extends(Space3D, _super);
            function Space3D() {
                _super.apply(this, arguments);
                //private
                this._x = 0;
                this._y = 0;
                this._z = 0;
                this._rx = 0;
                this._ry = 0;
                this._rz = 0;
                this._sx = 1;
                this._sy = 1;
                this._sz = 1;
                this._matrix3D = new feng3d.Matrix3D();
            }
            Object.defineProperty(Space3D.prototype, "x", {
                /**
                 * X坐标
                 */
                get: function () { return this._x; },
                set: function (value) { this._x = value; this.invalidateMatrix3D(); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Space3D.prototype, "y", {
                /**
                 * Y坐标
                 */
                get: function () { return this._y; },
                set: function (value) { this._y = value; this.invalidateMatrix3D(); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Space3D.prototype, "z", {
                /**
                 * Z坐标
                 */
                get: function () { return this._z; },
                set: function (value) { this._z = value; this.invalidateMatrix3D(); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Space3D.prototype, "rx", {
                /**
                 * X旋转
                 */
                get: function () { return this._rx; },
                set: function (value) { this._rx = value; this.invalidateMatrix3D(); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Space3D.prototype, "ry", {
                /**
                 * Y旋转
                 */
                get: function () { return this._ry; },
                set: function (value) { this._ry = value; this.invalidateMatrix3D(); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Space3D.prototype, "rz", {
                /**
                 * Z旋转
                 */
                get: function () { return this._rz; },
                set: function (value) { this._rz = value; this.invalidateMatrix3D(); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Space3D.prototype, "sx", {
                /**
                 * X缩放
                 */
                get: function () { return this._sx; },
                set: function (value) { this._sx = value; this.invalidateMatrix3D(); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Space3D.prototype, "sy", {
                /**
                 * Y缩放
                 */
                get: function () { return this._sy; },
                set: function (value) { this._sy = value; this.invalidateMatrix3D(); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Space3D.prototype, "sz", {
                /**
                 * Z缩放
                 */
                get: function () { return this._sz; },
                set: function (value) { this._sz = value; this.invalidateMatrix3D(); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Space3D.prototype, "matrix3D", {
                /**
                 * 空间矩阵（此处返回的是公共的临时矩阵）
                 */
                get: function () {
                    if (this.matrix3DDirty)
                        this.updateMatrix3D();
                    feng3d.temp.matrix3D.rawData = this._matrix3D.rawData.concat();
                    return feng3d.temp.matrix3D;
                },
                set: function (value) {
                    this.matrix3DDirty = false;
                    this._matrix3D.rawData = value.rawData.concat();
                    var vecs = this._matrix3D.decompose();
                    this.x = vecs[0].x;
                    this.y = vecs[0].y;
                    this.z = vecs[0].z;
                    this.rx = vecs[1].x * feng3d.MathConsts.RADIANS_TO_DEGREES;
                    this.ry = vecs[1].y * feng3d.MathConsts.RADIANS_TO_DEGREES;
                    this.rz = vecs[1].z * feng3d.MathConsts.RADIANS_TO_DEGREES;
                    this.sx = vecs[2].x;
                    this.sy = vecs[2].y;
                    this.sz = vecs[2].z;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 更新矩阵
             */
            Space3D.prototype.updateMatrix3D = function () {
                this._matrix3D.recompose([
                    new feng3d.Vector3D(this.x, this.y, this.z),
                    new feng3d.Vector3D(this.rx * feng3d.MathConsts.DEGREES_TO_RADIANS, this.ry * feng3d.MathConsts.DEGREES_TO_RADIANS, this.rz * feng3d.MathConsts.DEGREES_TO_RADIANS),
                    new feng3d.Vector3D(this.sx, this.sy, this.sz),
                ]);
                this.matrix3DDirty = false;
            };
            /**
             * 使矩阵无效
             */
            Space3D.prototype.invalidateMatrix3D = function () {
                this.matrix3DDirty = true;
            };
            return Space3D;
        }(feng3d.Component));
        feng3d.Space3D = Space3D;
    })(feng3d = me.feng3d || (me.feng3d = {}));
})(me || (me = {}));
var me;
(function (me) {
    var feng3d;
    (function (feng3d) {
        /**
         * 游戏对象
         * @author feng 2016-04-26
         */
        var GameObject = (function (_super) {
            __extends(GameObject, _super);
            function GameObject() {
                _super.apply(this, arguments);
            }
            return GameObject;
        }(feng3d.Component));
        feng3d.GameObject = GameObject;
    })(feng3d = me.feng3d || (me.feng3d = {}));
})(me || (me = {}));
var me;
(function (me) {
    var feng3d;
    (function (feng3d) {
        /**
         * 坐标系统类型
         * @author feng 2014-10-14
         */
        var CoordinateSystem = (function () {
            function CoordinateSystem() {
            }
            /**
             * 默认坐标系统，左手坐标系统
             */
            CoordinateSystem.LEFT_HANDED = 0;
            /**
             * 右手坐标系统
             */
            CoordinateSystem.RIGHT_HANDED = 1;
            return CoordinateSystem;
        }());
        feng3d.CoordinateSystem = CoordinateSystem;
    })(feng3d = me.feng3d || (me.feng3d = {}));
})(me || (me = {}));
var me;
(function (me) {
    var feng3d;
    (function (feng3d) {
        /**
         * 摄像机镜头
         * @author feng 2014-10-14
         */
        var LensBase = (function (_super) {
            __extends(LensBase, _super);
            /**
             * 创建一个摄像机镜头
             */
            function LensBase() {
                _super.call(this);
                this._scissorRect = new feng3d.Rectangle();
                this._viewPort = new feng3d.Rectangle();
                this._near = 0.1;
                this._far = 3000;
                this._aspectRatio = 1;
                this._matrixInvalid = true;
                this._frustumCorners = [];
                this._unprojectionInvalid = true;
                this._matrix = new feng3d.Matrix3D();
            }
            Object.defineProperty(LensBase.prototype, "frustumCorners", {
                /**
                 * Retrieves the corner points of the lens frustum.
                 */
                get: function () {
                    return this._frustumCorners;
                },
                set: function (frustumCorners) {
                    this._frustumCorners = frustumCorners;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LensBase.prototype, "matrix", {
                /**
                 * 投影矩阵
                 */
                get: function () {
                    if (this._matrixInvalid) {
                        this.updateMatrix();
                        this._matrixInvalid = false;
                    }
                    return this._matrix;
                },
                set: function (value) {
                    this._matrix = value;
                    this.invalidateMatrix();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LensBase.prototype, "near", {
                /**
                 * 最近距离
                 */
                get: function () {
                    return this._near;
                },
                set: function (value) {
                    if (value == this._near)
                        return;
                    this._near = value;
                    this.invalidateMatrix();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LensBase.prototype, "far", {
                /**
                 * 最远距离
                 */
                get: function () {
                    return this._far;
                },
                set: function (value) {
                    if (value == this._far)
                        return;
                    this._far = value;
                    this.invalidateMatrix();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LensBase.prototype, "aspectRatio", {
                /**
                 * 视窗缩放比例(width/height)，在渲染器中设置
                 */
                get: function () {
                    return this._aspectRatio;
                },
                set: function (value) {
                    if (this._aspectRatio == value || (value * 0) != 0)
                        return;
                    this._aspectRatio = value;
                    this.invalidateMatrix();
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 场景坐标投影到屏幕坐标
             * @param point3d 场景坐标
             * @param v 屏幕坐标（输出）
             * @return 屏幕坐标
             */
            LensBase.prototype.project = function (point3d, v) {
                if (v === void 0) { v = null; }
                if (!v)
                    v = new feng3d.Vector3D();
                this.matrix.transformVector(point3d, v);
                v.x = v.x / v.w;
                v.y = -v.y / v.w;
                //z is unaffected by transform
                v.z = point3d.z;
                return v;
            };
            Object.defineProperty(LensBase.prototype, "unprojectionMatrix", {
                /**
                 * 投影逆矩阵
                 */
                get: function () {
                    if (this._unprojectionInvalid) {
                        if (this._unprojection == null)
                            this._unprojection = new feng3d.Matrix3D();
                        this._unprojection.copyFrom(this.matrix);
                        this._unprojection.invert();
                        this._unprojectionInvalid = false;
                    }
                    return this._unprojection;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 投影矩阵失效
             */
            LensBase.prototype.invalidateMatrix = function () {
                this._matrixInvalid = true;
                this._unprojectionInvalid = true;
                this.dispatchEvent(new feng3d.LensEvent(feng3d.LensEvent.MATRIX_CHANGED, this));
            };
            return LensBase;
        }(feng3d.EventDispatcher));
        feng3d.LensBase = LensBase;
    })(feng3d = me.feng3d || (me.feng3d = {}));
})(me || (me = {}));
var me;
(function (me) {
    var feng3d;
    (function (feng3d) {
        /**
         * 透视摄像机镜头
         * @author feng 2014-10-14
         */
        var PerspectiveLens = (function (_super) {
            __extends(PerspectiveLens, _super);
            /**
             * 创建一个透视摄像机镜头
             * @param fieldOfView 视野
             * @param coordinateSystem 坐标系统类型
             */
            function PerspectiveLens(fieldOfView, coordinateSystem) {
                if (fieldOfView === void 0) { fieldOfView = 60; }
                if (coordinateSystem === void 0) { coordinateSystem = feng3d.CoordinateSystem.LEFT_HANDED; }
                _super.call(this);
                this.fieldOfView = fieldOfView;
                this.coordinateSystem = coordinateSystem;
            }
            Object.defineProperty(PerspectiveLens.prototype, "fieldOfView", {
                /**
                 * 视野
                 */
                get: function () {
                    return this._fieldOfView;
                },
                set: function (value) {
                    if (value == this._fieldOfView)
                        return;
                    this._fieldOfView = value;
                    this._focalLengthInv = Math.tan(this._fieldOfView * Math.PI / 360);
                    this._focalLength = 1 / this._focalLengthInv;
                    this.invalidateMatrix();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PerspectiveLens.prototype, "focalLength", {
                /**
                 * 焦距
                 */
                get: function () {
                    return this._focalLength;
                },
                set: function (value) {
                    if (value == this._focalLength)
                        return;
                    this._focalLength = value;
                    this._focalLengthInv = 1 / this._focalLength;
                    this._fieldOfView = Math.atan(this._focalLengthInv) * 360 / Math.PI;
                    this.invalidateMatrix();
                },
                enumerable: true,
                configurable: true
            });
            PerspectiveLens.prototype.unproject = function (nX, nY, sZ, v) {
                if (v === void 0) { v = null; }
                if (!v)
                    v = new feng3d.Vector3D();
                v.x = nX;
                v.y = -nY;
                v.z = sZ;
                v.w = 1;
                v.x *= sZ;
                v.y *= sZ;
                this.unprojectionMatrix.transformVector(v, v);
                //z is unaffected by transform
                v.z = sZ;
                return v;
            };
            Object.defineProperty(PerspectiveLens.prototype, "coordinateSystem", {
                /**
                 * 坐标系类型
                 */
                get: function () {
                    return this._coordinateSystem;
                },
                set: function (value) {
                    if (value == this._coordinateSystem)
                        return;
                    this._coordinateSystem = value;
                    this.invalidateMatrix();
                },
                enumerable: true,
                configurable: true
            });
            PerspectiveLens.prototype.updateMatrix = function () {
                var raw = feng3d.temp.rawData;
                this._yMax = this._near * this._focalLengthInv;
                this._xMax = this._yMax * this._aspectRatio;
                var left, right, top, bottom;
                if (this._scissorRect.x == 0 && this._scissorRect.y == 0 && this._scissorRect.width == this._viewPort.width && this._scissorRect.height == this._viewPort.height) {
                    // assume unscissored frustum
                    left = -this._xMax;
                    right = this._xMax;
                    top = -this._yMax;
                    bottom = this._yMax;
                    // assume unscissored frustum
                    raw[0] = this._near / this._xMax;
                    raw[5] = this._near / this._yMax;
                    raw[10] = this._far / (this._far - this._near);
                    raw[11] = 1;
                    raw[1] = raw[2] = raw[3] = raw[4] = raw[6] = raw[7] = raw[8] = raw[9] = raw[12] = raw[13] = raw[15] = 0;
                    raw[14] = -this._near * raw[10];
                }
                else {
                    // assume scissored frustum
                    var xWidth = this._xMax * (this._viewPort.width / this._scissorRect.width);
                    var yHgt = this._yMax * (this._viewPort.height / this._scissorRect.height);
                    var center = this._xMax * (this._scissorRect.x * 2 - this._viewPort.width) / this._scissorRect.width + this._xMax;
                    var middle = -this._yMax * (this._scissorRect.y * 2 - this._viewPort.height) / this._scissorRect.height - this._yMax;
                    left = center - xWidth;
                    right = center + xWidth;
                    top = middle - yHgt;
                    bottom = middle + yHgt;
                    raw[0] = 2 * this._near / (right - left);
                    raw[5] = 2 * this._near / (bottom - top);
                    raw[8] = (right + left) / (right - left);
                    raw[9] = (bottom + top) / (bottom - top);
                    raw[10] = (this._far + this._near) / (this._far - this._near);
                    raw[11] = 1;
                    raw[1] = raw[2] = raw[3] = raw[4] = raw[6] = raw[7] = raw[12] = raw[13] = raw[15] = 0;
                    raw[14] = -2 * this._far * this._near / (this._far - this._near);
                }
                // Switch projection transform from left to right handed.
                if (this._coordinateSystem == feng3d.CoordinateSystem.RIGHT_HANDED)
                    raw[5] = -raw[5];
                this._matrix.copyRawDataFrom(raw);
                var yMaxFar = this._far * this._focalLengthInv;
                var xMaxFar = yMaxFar * this._aspectRatio;
                this._frustumCorners[0] = this._frustumCorners[9] = left;
                this._frustumCorners[3] = this._frustumCorners[6] = right;
                this._frustumCorners[1] = this._frustumCorners[4] = top;
                this._frustumCorners[7] = this._frustumCorners[10] = bottom;
                this._frustumCorners[12] = this._frustumCorners[21] = -xMaxFar;
                this._frustumCorners[15] = this._frustumCorners[18] = xMaxFar;
                this._frustumCorners[13] = this._frustumCorners[16] = -yMaxFar;
                this._frustumCorners[19] = this._frustumCorners[22] = yMaxFar;
                this._frustumCorners[2] = this._frustumCorners[5] = this._frustumCorners[8] = this._frustumCorners[11] = this._near;
                this._frustumCorners[14] = this._frustumCorners[17] = this._frustumCorners[20] = this._frustumCorners[23] = this._far;
                this._matrixInvalid = false;
            };
            return PerspectiveLens;
        }(feng3d.LensBase));
        feng3d.PerspectiveLens = PerspectiveLens;
    })(feng3d = me.feng3d || (me.feng3d = {}));
})(me || (me = {}));
/**
 * 临时值
 * @author feng 2016-04-26
 */
var me;
(function (me) {
    var feng3d;
    (function (feng3d) {
        var temp;
        (function (temp) {
            /**
             * 临时矩阵
             */
            temp.matrix3D = new feng3d.Matrix3D();
            /**
             * 临时矩阵数据
             */
            temp.rawData = [];
        })(temp = feng3d.temp || (feng3d.temp = {}));
    })(feng3d = me.feng3d || (me.feng3d = {}));
})(me || (me = {}));
//# sourceMappingURL=feng3d.js.map