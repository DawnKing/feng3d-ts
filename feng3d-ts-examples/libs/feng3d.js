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
                throw msg;
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
         * 构建Map类代替Dictionary
         */
        var Map = (function () {
            function Map() {
                /**
                 * key,value组合列表
                 */
                this.list = [];
            }
            /**
             * 删除
             */
            Map.prototype.delete = function (k) {
                for (var i = 0; i < this.list.length; i++) {
                    var element = this.list[i];
                    if (element.k == k) {
                        this.list.splice(i, 1);
                        break;
                    }
                }
            };
            /**
             * 添加映射
             */
            Map.prototype.push = function (k, v) {
                var target = this._getKV(k);
                if (target != null)
                    target.v = v;
                else {
                    target = new KV(k, v);
                    this.list.push(target);
                }
            };
            /**
             * 通过key获取value
             */
            Map.prototype.get = function (k) {
                var target = this._getKV(k);
                if (target != null)
                    return target.v;
                return null;
            };
            /**
             * 获取键列表
             */
            Map.prototype.getKeys = function () {
                var keys = [];
                this.list.forEach(function (kv) {
                    keys.push(kv.k);
                });
                return keys;
            };
            /**
             * 清理字典
             */
            Map.prototype.clear = function () {
                this.list.length = 0;
            };
            /**
             * 通过key获取(key,value)组合
             */
            Map.prototype._getKV = function (k) {
                var target;
                this.list.forEach(function (kv) {
                    if (kv.k == k) {
                        target = kv;
                    }
                });
                return target;
            };
            return Map;
        }());
        feng3d.Map = Map;
        /**
         * key,value组合
         */
        var KV = (function () {
            function KV(k, v) {
                this.k = k;
                this.v = v;
            }
            return KV;
        }());
    })(feng3d = me.feng3d || (me.feng3d = {}));
})(me || (me = {}));
var me;
(function (me) {
    var feng3d;
    (function (feng3d) {
        /**
         * 获取对象UID
         * @author feng 2016-05-08
         */
        function getUID(object) {
            if (typeof object != "object") {
                throw "\u65E0\u6CD5\u83B7\u53D6" + object + "\u7684UID";
            }
            if (object.hasOwnProperty(uidKey)) {
                return object[uidKey];
            }
            var uid = createUID(object);
            Object.defineProperty(object, uidKey, {
                value: uid,
                enumerable: false,
                writable: false
            });
            return uid;
        }
        feng3d.getUID = getUID;
        /**
         * 创建对象的UID
         * @param object 对象
         */
        function createUID(object) {
            var className = feng3d.getClassName(object);
            var uid = className + "_" + ~~uidStart[className];
            uidStart[className] = ~~uidStart[className] + 1;
            return uid;
        }
        /**
         * uid自增长编号
         */
        var uidStart = {};
        /**
         * uid属性名称
         */
        var uidKey = "__uid__";
    })(feng3d = me.feng3d || (me.feng3d = {}));
})(me || (me = {}));
var me;
(function (me) {
    var feng3d;
    (function (feng3d) {
        /**
         * 获取对象版本
         * @param object 对象
         */
        function getVersion(object) {
            if (typeof object != "object") {
                throw "\u65E0\u6CD5\u83B7\u53D6" + object + "\u7684UID";
            }
            return ~~object[versionKey];
        }
        feng3d.getVersion = getVersion;
        /**
         * 升级对象版本
         * @param object 对象
         */
        function upgradeVersion(object) {
            if (typeof object != "object") {
                throw "\u65E0\u6CD5\u83B7\u53D6" + object + "\u7684\u7248\u672C\u53F7";
            }
            if (!object.hasOwnProperty(versionKey)) {
                Object.defineProperty(object, versionKey, {
                    value: 0,
                    enumerable: false,
                    writable: true
                });
            }
            object[versionKey] = ~~object[versionKey] + 1;
        }
        feng3d.upgradeVersion = upgradeVersion;
        /**
         * 版本号键名称
         */
        var versionKey = "__version__";
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
                datas = datas || [
                    1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 1 //
                ];
                if (datas instanceof Float32Array)
                    this.rawData = datas;
                else {
                    this.rawData = new Float32Array(datas);
                }
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
                this.rawData.set(sourceMatrix3D.rawData);
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
                if (transpose) {
                    this.transpose();
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
                dest.rawData.set(this.rawData);
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
         * 3D空间
         * @author feng 2016-04-26
         */
        var Space3D = (function (_super) {
            __extends(Space3D, _super);
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
            function Space3D(x, y, z, rx, ry, rz, sx, sy, sz) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (z === void 0) { z = 0; }
                if (rx === void 0) { rx = 0; }
                if (ry === void 0) { ry = 0; }
                if (rz === void 0) { rz = 0; }
                if (sx === void 0) { sx = 1; }
                if (sy === void 0) { sy = 1; }
                if (sz === void 0) { sz = 1; }
                _super.call(this);
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
                this._transform3D = new feng3d.Matrix3D();
                this._x = x;
                this._y = y;
                this._z = z;
                this._rx = rx;
                this._ry = ry;
                this._rz = rz;
                this._sx = sx;
                this._sy = sy;
                this._sz = sz;
                this.invalidateTransform3D();
            }
            Object.defineProperty(Space3D.prototype, "x", {
                /**
                 * X坐标
                 */
                get: function () { return this._x; },
                set: function (value) { this._x = value; this.invalidateTransform3D(); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Space3D.prototype, "y", {
                /**
                 * Y坐标
                 */
                get: function () { return this._y; },
                set: function (value) { this._y = value; this.invalidateTransform3D(); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Space3D.prototype, "z", {
                /**
                 * Z坐标
                 */
                get: function () { return this._z; },
                set: function (value) { this._z = value; this.invalidateTransform3D(); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Space3D.prototype, "rx", {
                /**
                 * X旋转
                 */
                get: function () { return this._rx; },
                set: function (value) { this._rx = value; this.invalidateTransform3D(); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Space3D.prototype, "ry", {
                /**
                 * Y旋转
                 */
                get: function () { return this._ry; },
                set: function (value) { this._ry = value; this.invalidateTransform3D(); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Space3D.prototype, "rz", {
                /**
                 * Z旋转
                 */
                get: function () { return this._rz; },
                set: function (value) { this._rz = value; this.invalidateTransform3D(); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Space3D.prototype, "sx", {
                /**
                 * X缩放
                 */
                get: function () { return this._sx; },
                set: function (value) { this._sx = value; this.invalidateTransform3D(); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Space3D.prototype, "sy", {
                /**
                 * Y缩放
                 */
                get: function () { return this._sy; },
                set: function (value) { this._sy = value; this.invalidateTransform3D(); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Space3D.prototype, "sz", {
                /**
                 * Z缩放
                 */
                get: function () { return this._sz; },
                set: function (value) { this._sz = value; this.invalidateTransform3D(); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Space3D.prototype, "transform3D", {
                /**
                 * 空间变换矩阵（此处返回的是公共的临时矩阵）
                 */
                get: function () {
                    if (this.transform3DDirty)
                        this.updateTransform3D();
                    tempMatrix3D.rawData.set(this._transform3D.rawData);
                    return tempMatrix3D;
                },
                set: function (value) {
                    this.transform3DDirty = false;
                    this._transform3D.rawData.set(value.rawData);
                    var vecs = this._transform3D.decompose();
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
             * 更新变换矩阵
             */
            Space3D.prototype.updateTransform3D = function () {
                this._transform3D.recompose([
                    new feng3d.Vector3D(this.x, this.y, this.z),
                    new feng3d.Vector3D(this.rx * feng3d.MathConsts.DEGREES_TO_RADIANS, this.ry * feng3d.MathConsts.DEGREES_TO_RADIANS, this.rz * feng3d.MathConsts.DEGREES_TO_RADIANS),
                    new feng3d.Vector3D(this.sx, this.sy, this.sz),
                ]);
                this.transform3DDirty = false;
            };
            /**
             * 使变换矩阵无效
             */
            Space3D.prototype.invalidateTransform3D = function () {
                this.transform3DDirty = true;
            };
            return Space3D;
        }(feng3d.Component));
        feng3d.Space3D = Space3D;
        /**
         * 临时矩阵
         */
        var tempMatrix3D = new feng3d.Matrix3D();
    })(feng3d = me.feng3d || (me.feng3d = {}));
})(me || (me = {}));
var me;
(function (me) {
    var feng3d;
    (function (feng3d) {
        /**
         * 3D对象
         * @author feng 2016-04-26
         */
        var Object3D = (function (_super) {
            __extends(Object3D, _super);
            /**
             * 构建3D对象
             */
            function Object3D(name, conponents) {
                var _this = this;
                if (conponents === void 0) { conponents = null; }
                _super.call(this);
                this.name = name || feng3d.getClassName(this);
                conponents && conponents.forEach(function (element) {
                    _this.addComponent(element);
                });
                this.getOrCreateComponentByClass(feng3d.Space3D);
            }
            Object.defineProperty(Object3D.prototype, "space3D", {
                /**
                 * 3D空间
                 */
                get: function () {
                    return this.getComponentByClass(feng3d.Space3D);
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 创建
             */
            Object3D.createPrimitive = function (type) {
                var object3D = new Object3D();
                switch (type) {
                    case feng3d.PrimitiveType.Plane:
                        object3D.addComponent(feng3d.primitives.createPlane());
                        break;
                    case feng3d.PrimitiveType.Cube:
                        object3D.addComponent(feng3d.primitives.createCube());
                        break;
                    default:
                        throw "\u65E0\u6CD5\u521B\u5EFA3D\u57FA\u5143\u5BF9\u8C61 " + type;
                }
                return object3D;
            };
            return Object3D;
        }(feng3d.Component));
        feng3d.Object3D = Object3D;
    })(feng3d = me.feng3d || (me.feng3d = {}));
})(me || (me = {}));
var me;
(function (me) {
    var feng3d;
    (function (feng3d) {
        /**
         * 3D视图
         * @author feng 2016-05-01
         */
        var View3D = (function () {
            /**
             * 构建3D视图
             * @param canvas    画布
             * @param scene     3D场景
             * @param camera    摄像机
             */
            function View3D(canvas, scene, camera) {
                if (scene === void 0) { scene = null; }
                if (camera === void 0) { camera = null; }
                feng3d.assert(canvas instanceof HTMLCanvasElement, "canvas\u53C2\u6570\u5FC5\u987B\u4E3A HTMLCanvasElement \u7C7B\u578B\uFF01");
                this.gl = canvas.getContext("experimental-webgl");
                this.gl || alert("Unable to initialize WebGL. Your browser may not support it.");
                this.scene = scene || new feng3d.Scene3D();
                this._camera = camera || feng3d.factory.createCamera();
                this.renderer = new feng3d.Renderer(this.gl, this.scene, this._camera);
                setInterval(this.drawScene.bind(this), 15);
            }
            Object.defineProperty(View3D.prototype, "scene", {
                /** 3d场景 */
                get: function () {
                    return this._scene;
                },
                set: function (value) {
                    this._scene = value;
                },
                enumerable: true,
                configurable: true
            });
            View3D.prototype.drawScene = function () {
                this.renderer.render();
            };
            return View3D;
        }());
        feng3d.View3D = View3D;
    })(feng3d = me.feng3d || (me.feng3d = {}));
})(me || (me = {}));
var me;
(function (me) {
    var feng3d;
    (function (feng3d) {
        /**
         * 3D场景节点
         */
        var Scene3DNode = (function (_super) {
            __extends(Scene3DNode, _super);
            /**
             * 构建3D场景节点
             * @param object3D 3D对象
             * @param parent 父节点
             */
            function Scene3DNode(object3D, parent) {
                _super.call(this);
                /**
                 * 父节点
                 */
                this.parent = null;
                /**
                 * 子节点列表
                 */
                this.children = [];
                this.object3D = object3D;
                this.parent = parent;
            }
            Object.defineProperty(Scene3DNode.prototype, "name", {
                /**
                 * 节点名称
                 */
                get: function () {
                    return this.object3D.name;
                },
                set: function (value) {
                    this.object3D.name = value;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 添加3D对象生成节点
             */
            Scene3DNode.prototype.addObject3D = function (object3D) {
                var child = new Scene3DNode(object3D, this);
                this.children.push(child);
                this.dispatchEvent(new feng3d.Scene3DEvent(feng3d.Scene3DEvent.ADDED, child, true));
                return this;
            };
            /**
             * 移除3D对象节点
             */
            Scene3DNode.prototype.removeObject = function (object3D) {
                var deletedChild;
                for (var i = 0; i < this.children.length; i++) {
                    var element = this.children[i];
                    if (element.object3D == object3D) {
                        this.children.splice(i, 1);
                        deletedChild = deletedChild;
                        this.dispatchEvent(new feng3d.Scene3DEvent(feng3d.Scene3DEvent.REMOVED, deletedChild, true));
                        break;
                    }
                }
                return this;
            };
            /**
             * 根据名称深度查找节点
             * @param name 节点名称
             */
            Scene3DNode.prototype.find = function (name) {
                if (this.name == name) {
                    return this;
                }
                for (var i = 0; i < this.children.length; i++) {
                    var element = this.children[i];
                    var target = element.find(name);
                    if (target != null)
                        return target;
                }
                return null;
            };
            Object.defineProperty(Scene3DNode.prototype, "renderable", {
                /**
                 * 是否可渲染
                 */
                get: function () {
                    return this.object3D != null;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 获取可渲染对象列表
             */
            Scene3DNode.prototype.getRenderables = function (renderables) {
                if (renderables === void 0) { renderables = null; }
                renderables = renderables || [];
                this.renderable && renderables.push(this.object3D);
                this.children.forEach(function (element) {
                    element.getRenderables(renderables);
                });
                return renderables;
            };
            return Scene3DNode;
        }(feng3d.EventDispatcher));
        feng3d.Scene3DNode = Scene3DNode;
    })(feng3d = me.feng3d || (me.feng3d = {}));
})(me || (me = {}));
var me;
(function (me) {
    var feng3d;
    (function (feng3d) {
        /**
         * 3D场景
         * @author feng 2016-05-01
         */
        var Scene3D = (function (_super) {
            __extends(Scene3D, _super);
            /**
             * 构造3D场景
             */
            function Scene3D() {
                _super.call(this, null, null);
            }
            Object.defineProperty(Scene3D.prototype, "name", {
                /**
                 * 场景名称默认为root
                 */
                get: function () {
                    return "root";
                },
                set: function (value) {
                },
                enumerable: true,
                configurable: true
            });
            return Scene3D;
        }(feng3d.Scene3DNode));
        feng3d.Scene3D = Scene3D;
    })(feng3d = me.feng3d || (me.feng3d = {}));
})(me || (me = {}));
var me;
(function (me) {
    var feng3d;
    (function (feng3d) {
        /**
         * 3D场景事件
         * author feng 2016-05-01
         */
        var Scene3DEvent = (function (_super) {
            __extends(Scene3DEvent, _super);
            /**
             * 构建3D场景事件
             * @param type 事件的类型，可以作为 Event.type 访问。
             * @param data 携带数据
             * @param bubbles 确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
             */
            function Scene3DEvent(type, data, bubbles) {
                if (data === void 0) { data = null; }
                if (bubbles === void 0) { bubbles = false; }
                _super.call(this, type, data, bubbles);
            }
            /**
             * 添加3D场景节点
             */
            Scene3DEvent.ADDED = "scene3D_added";
            /**
             * 删除3D场景节点
             */
            Scene3DEvent.REMOVED = "scene3D_removed";
            return Scene3DEvent;
        }(feng3d.Event));
        feng3d.Scene3DEvent = Scene3DEvent;
    })(feng3d = me.feng3d || (me.feng3d = {}));
})(me || (me = {}));
var me;
(function (me) {
    var feng3d;
    (function (feng3d) {
        /**
         * opengl顶点属性名称
         */
        var GLAttribute = (function () {
            function GLAttribute() {
            }
            /**
             * 坐标
             */
            GLAttribute.position = "vaPosition";
            /**
             * 法线
             */
            GLAttribute.normal = "vaNormal";
            /**
             * 切线
             */
            GLAttribute.tangent = "vaTangent";
            /**
             * uv（纹理坐标）
             */
            GLAttribute.uv = "vaUV";
            return GLAttribute;
        }());
        feng3d.GLAttribute = GLAttribute;
    })(feng3d = me.feng3d || (me.feng3d = {}));
})(me || (me = {}));
var me;
(function (me) {
    var feng3d;
    (function (feng3d) {
        /**
         * 几何体
         * @author feng 2016-04-28
         */
        var Geometry = (function (_super) {
            __extends(Geometry, _super);
            function Geometry() {
                _super.apply(this, arguments);
                this._vaIdList = [];
                /** 顶点属性数据步长字典 */
                this.strideDic = {};
                /** 顶点属性数据字典 */
                this.vaDataDic = {};
            }
            Object.defineProperty(Geometry.prototype, "indices", {
                /**
                 * 索引数据
                 */
                get: function () {
                    return this._indices;
                },
                /**
                 * 更新顶点索引数据
                 */
                set: function (value) {
                    this._indices = value;
                    this.dispatchEvent(new feng3d.GeometryEvent(feng3d.GeometryEvent.CHANGED_INDEX_DATA));
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 获取顶点属性步长(1-4)
             * @param vaId          顶点属性编号
             * @return 顶点属性步长
             */
            Geometry.prototype.getVAStride = function (vaId) {
                return this.strideDic[vaId];
            };
            /**
             * 设置顶点属性数据
             * @param vaId          顶点属性编号
             * @param data          顶点属性数据
             * @param stride        顶点数据步长
             */
            Geometry.prototype.setVAData = function (vaId, data, stride) {
                var vaLen = this.getVAStride(vaId);
                this.vaDataDic[vaId] = data;
                this.dispatchEvent(new feng3d.GeometryEvent(feng3d.GeometryEvent.CHANGED_VA_DATA, vaId));
            };
            /**
             * 获取顶点属性数据
             * @param vaId 数据类型编号
             * @return 顶点属性数据
             */
            Geometry.prototype.getVAData = function (vaId) {
                this.dispatchEvent(new feng3d.GeometryEvent(feng3d.GeometryEvent.GET_VA_DATA, vaId));
                return this.vaDataDic[vaId];
            };
            Object.defineProperty(Geometry.prototype, "vaIdList", {
                /**
                 * 顶点属性编号列表
                 */
                get: function () {
                    return this._vaIdList;
                },
                enumerable: true,
                configurable: true
            });
            return Geometry;
        }(feng3d.Component));
        feng3d.Geometry = Geometry;
    })(feng3d = me.feng3d || (me.feng3d = {}));
})(me || (me = {}));
var me;
(function (me) {
    var feng3d;
    (function (feng3d) {
        /**
         * 几何体事件
         * @author feng 2015-12-8
         */
        var GeometryEvent = (function (_super) {
            __extends(GeometryEvent, _super);
            /**
             * 构建几何体事件
             */
            function GeometryEvent(type, data, bubbles) {
                if (data === void 0) { data = null; }
                if (bubbles === void 0) { bubbles = false; }
                _super.call(this, type, data, bubbles);
            }
            /**
             * 获取几何体顶点数据
             */
            GeometryEvent.GET_VA_DATA = "getVAData";
            /**
             * 改变几何体顶点数据事件
             */
            GeometryEvent.CHANGED_VA_DATA = "changedVAData";
            /**
             * 改变顶点索引数据事件
             */
            GeometryEvent.CHANGED_INDEX_DATA = "changedIndexData";
            return GeometryEvent;
        }(feng3d.Event));
        feng3d.GeometryEvent = GeometryEvent;
    })(feng3d = me.feng3d || (me.feng3d = {}));
})(me || (me = {}));
var me;
(function (me) {
    var feng3d;
    (function (feng3d) {
        /**
         * 摄像机（镜头）事件
         * @author feng 2014-10-14
         */
        var CameraEvent = (function (_super) {
            __extends(CameraEvent, _super);
            /**
             * 创建一个摄像机（镜头）事件。
             * @param type 事件的类型
             * @param camera 摄像机（镜头）
             * @param bubbles 确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
             */
            function CameraEvent(type, camera, bubbles) {
                if (camera === void 0) { camera = null; }
                if (bubbles === void 0) { bubbles = false; }
                _super.call(this, type, camera, bubbles);
            }
            CameraEvent.MATRIX_CHANGED = "matrixChanged";
            return CameraEvent;
        }(feng3d.Event));
        feng3d.CameraEvent = CameraEvent;
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
        var CameraBase = (function (_super) {
            __extends(CameraBase, _super);
            /**
             * 创建一个摄像机镜头
             */
            function CameraBase() {
                _super.call(this);
                this._scissorRect = new feng3d.Rectangle();
                this._viewPort = new feng3d.Rectangle();
                this._near = 0.1;
                this._far = 3000;
                this._aspectRatio = 1;
                this._projectionMatrix3DDirty = true;
                this._unprojectionInvalid = true;
                this._projectionMatrix3D = new feng3d.Matrix3D();
            }
            Object.defineProperty(CameraBase.prototype, "projectionMatrix3D", {
                /**
                 * 投影矩阵
                 */
                get: function () {
                    if (this._projectionMatrix3DDirty) {
                        this.updateProjectionMatrix();
                        this._projectionMatrix3DDirty = false;
                    }
                    return this._projectionMatrix3D;
                },
                set: function (value) {
                    this._projectionMatrix3D = value;
                    this.invalidateProjectionMatrix();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CameraBase.prototype, "near", {
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
                    this.invalidateProjectionMatrix();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CameraBase.prototype, "far", {
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
                    this.invalidateProjectionMatrix();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CameraBase.prototype, "aspectRatio", {
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
                    this.invalidateProjectionMatrix();
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
            CameraBase.prototype.project = function (point3d, v) {
                if (v === void 0) { v = null; }
                if (!v)
                    v = new feng3d.Vector3D();
                this.projectionMatrix3D.transformVector(point3d, v);
                v.x = v.x / v.w;
                v.y = -v.y / v.w;
                //z is unaffected by transform
                v.z = point3d.z;
                return v;
            };
            Object.defineProperty(CameraBase.prototype, "unprojectionMatrix", {
                /**
                 * 投影逆矩阵
                 */
                get: function () {
                    if (this._unprojectionInvalid) {
                        if (this._unprojection == null)
                            this._unprojection = new feng3d.Matrix3D();
                        this._unprojection.copyFrom(this.projectionMatrix3D);
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
            CameraBase.prototype.invalidateProjectionMatrix = function () {
                this._projectionMatrix3DDirty = true;
                this._unprojectionInvalid = true;
                this.dispatchEvent(new feng3d.CameraEvent(feng3d.CameraEvent.MATRIX_CHANGED, this));
            };
            return CameraBase;
        }(feng3d.Component));
        feng3d.CameraBase = CameraBase;
    })(feng3d = me.feng3d || (me.feng3d = {}));
})(me || (me = {}));
var me;
(function (me) {
    var feng3d;
    (function (feng3d) {
        /**
         * 透视摄像机（镜头）
         * @author feng 2014-10-14
         */
        var Camera = (function (_super) {
            __extends(Camera, _super);
            /**
             * 创建一个透视摄像机镜头
             * @param fieldOfView 视野
             * @param coordinateSystem 坐标系统类型
             */
            function Camera(fieldOfView, coordinateSystem) {
                if (fieldOfView === void 0) { fieldOfView = 60; }
                if (coordinateSystem === void 0) { coordinateSystem = feng3d.CoordinateSystem.LEFT_HANDED; }
                _super.call(this);
                this.fieldOfView = fieldOfView;
                this.coordinateSystem = coordinateSystem;
            }
            Object.defineProperty(Camera.prototype, "fieldOfView", {
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
                    this.invalidateProjectionMatrix();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Camera.prototype, "focalLength", {
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
                    this.invalidateProjectionMatrix();
                },
                enumerable: true,
                configurable: true
            });
            Camera.prototype.unproject = function (nX, nY, sZ, v) {
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
            Object.defineProperty(Camera.prototype, "coordinateSystem", {
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
                    this.invalidateProjectionMatrix();
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 更新投影矩阵
             */
            Camera.prototype.updateProjectionMatrix = function () {
                var raw = tempRawData;
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
                this._projectionMatrix3D.copyRawDataFrom(raw);
                this._projectionMatrix3DDirty = false;
            };
            return Camera;
        }(feng3d.CameraBase));
        feng3d.Camera = Camera;
        /**
         * 临时矩阵数据
         */
        var tempRawData = new Float32Array(16);
    })(feng3d = me.feng3d || (me.feng3d = {}));
})(me || (me = {}));
var me;
(function (me) {
    var feng3d;
    (function (feng3d) {
        /**
         * 3D基元类型
         * @author feng 2016-05-01
         */
        (function (PrimitiveType) {
            PrimitiveType[PrimitiveType["Plane"] = 0] = "Plane";
            PrimitiveType[PrimitiveType["Cube"] = 1] = "Cube";
        })(feng3d.PrimitiveType || (feng3d.PrimitiveType = {}));
        var PrimitiveType = feng3d.PrimitiveType;
    })(feng3d = me.feng3d || (me.feng3d = {}));
})(me || (me = {}));
var me;
(function (me) {
    var feng3d;
    (function (feng3d) {
        var primitives;
        (function (primitives) {
            /**
             * 创建平面几何体
             * @param width 宽度
             * @param height 高度
             * @param segmentsW 横向分割数
             * @param segmentsH 纵向分割数
             * @param yUp 正面朝向 true:Y+ false:Z+
             * @param elements 顶点元素列表
             */
            function createPlane(width, height, segmentsW, segmentsH, yUp, elements) {
                if (width === void 0) { width = 100; }
                if (height === void 0) { height = 100; }
                if (segmentsW === void 0) { segmentsW = 1; }
                if (segmentsH === void 0) { segmentsH = 1; }
                if (yUp === void 0) { yUp = true; }
                if (elements === void 0) { elements = [feng3d.GLAttribute.position, feng3d.GLAttribute.uv, feng3d.GLAttribute.normal, feng3d.GLAttribute.tangent]; }
                var geometry = new feng3d.Geometry();
                elements.forEach(function (element) {
                    switch (element) {
                        case feng3d.GLAttribute.position:
                            var vertexPositionData = buildPosition(width, height, segmentsW, segmentsH, yUp);
                            geometry.setVAData(element, vertexPositionData, 3);
                            break;
                        case feng3d.GLAttribute.normal:
                            var vertexNormalData = buildNormal(segmentsW, segmentsH, yUp);
                            geometry.setVAData(element, vertexNormalData, 3);
                            break;
                        case feng3d.GLAttribute.tangent:
                            var vertexTangentData = buildTangent(segmentsW, segmentsH, yUp);
                            geometry.setVAData(element, vertexTangentData, 3);
                            break;
                        case feng3d.GLAttribute.uv:
                            var uvData = buildUVs(segmentsW, segmentsH);
                            geometry.setVAData(element, uvData, 2);
                            break;
                        default:
                            throw ("\u4E0D\u652F\u6301\u4E3A\u5E73\u9762\u521B\u5EFA\u9876\u70B9\u5C5E\u6027 " + element);
                    }
                });
                var indices = buildIndices(segmentsW, segmentsH, yUp);
                geometry.indices = indices;
                return geometry;
            }
            primitives.createPlane = createPlane;
            /**
             * 构建顶点坐标
             * @param width 宽度
             * @param height 高度
             * @param segmentsW 横向分割数
             * @param segmentsH 纵向分割数
             * @param yUp 正面朝向 true:Y+ false:Z+
             */
            function buildPosition(width, height, segmentsW, segmentsH, yUp) {
                if (width === void 0) { width = 100; }
                if (height === void 0) { height = 100; }
                if (segmentsW === void 0) { segmentsW = 1; }
                if (segmentsH === void 0) { segmentsH = 1; }
                if (yUp === void 0) { yUp = true; }
                var vertexPositionData = new Float32Array((segmentsH + 1) * (segmentsW + 1) * 3);
                var x, y;
                var positionIndex = 0;
                for (var yi = 0; yi <= segmentsH; ++yi) {
                    for (var xi = 0; xi <= segmentsW; ++xi) {
                        x = (xi / segmentsW - .5) * width;
                        y = (yi / segmentsH - .5) * height;
                        //设置坐标数据
                        vertexPositionData[positionIndex++] = x;
                        if (yUp) {
                            vertexPositionData[positionIndex++] = 0;
                            vertexPositionData[positionIndex++] = y;
                        }
                        else {
                            vertexPositionData[positionIndex++] = y;
                            vertexPositionData[positionIndex++] = 0;
                        }
                    }
                }
                return vertexPositionData;
            }
            /**
             * 构建顶点法线
             * @param segmentsW 横向分割数
             * @param segmentsH 纵向分割数
             * @param yUp 正面朝向 true:Y+ false:Z+
             */
            function buildNormal(segmentsW, segmentsH, yUp) {
                if (segmentsW === void 0) { segmentsW = 1; }
                if (segmentsH === void 0) { segmentsH = 1; }
                if (yUp === void 0) { yUp = true; }
                var vertexNormalData = new Float32Array((segmentsH + 1) * (segmentsW + 1) * 3);
                var normalIndex = 0;
                for (var yi = 0; yi <= segmentsH; ++yi) {
                    for (var xi = 0; xi <= segmentsW; ++xi) {
                        //设置法线数据
                        vertexNormalData[normalIndex++] = 0;
                        if (yUp) {
                            vertexNormalData[normalIndex++] = 1;
                            vertexNormalData[normalIndex++] = 0;
                        }
                        else {
                            vertexNormalData[normalIndex++] = 0;
                            vertexNormalData[normalIndex++] = -1;
                        }
                    }
                }
                return vertexNormalData;
            }
            /**
             * 构建顶点切线
             * @param segmentsW 横向分割数
             * @param segmentsH 纵向分割数
             * @param yUp 正面朝向 true:Y+ false:Z+
             */
            function buildTangent(segmentsW, segmentsH, yUp) {
                if (segmentsW === void 0) { segmentsW = 1; }
                if (segmentsH === void 0) { segmentsH = 1; }
                if (yUp === void 0) { yUp = true; }
                var vertexTangentData = new Float32Array((segmentsH + 1) * (segmentsW + 1) * 3);
                var tangentIndex = 0;
                for (var yi = 0; yi <= segmentsH; ++yi) {
                    for (var xi = 0; xi <= segmentsW; ++xi) {
                        vertexTangentData[tangentIndex++] = 1;
                        vertexTangentData[tangentIndex++] = 0;
                        vertexTangentData[tangentIndex++] = 0;
                    }
                }
                return vertexTangentData;
            }
            /**
             * 构建顶点索引
             * @param segmentsW 横向分割数
             * @param segmentsH 纵向分割数
             * @param yUp 正面朝向 true:Y+ false:Z+
             */
            function buildIndices(segmentsW, segmentsH, yUp) {
                if (segmentsW === void 0) { segmentsW = 1; }
                if (segmentsH === void 0) { segmentsH = 1; }
                if (yUp === void 0) { yUp = true; }
                var indices = new Uint16Array(segmentsH * segmentsW * 6);
                var tw = segmentsW + 1;
                var numIndices = 0;
                var base;
                for (var yi = 0; yi <= segmentsH; ++yi) {
                    for (var xi = 0; xi <= segmentsW; ++xi) {
                        //生成索引数据
                        if (xi != segmentsW && yi != segmentsH) {
                            base = xi + yi * tw;
                            indices[numIndices++] = base;
                            indices[numIndices++] = base + tw;
                            indices[numIndices++] = base + tw + 1;
                            indices[numIndices++] = base;
                            indices[numIndices++] = base + tw + 1;
                            indices[numIndices++] = base + 1;
                        }
                    }
                }
                return indices;
            }
            /**
             * 构建uv
             * @param segmentsW 横向分割数
             * @param segmentsH 纵向分割数
             */
            function buildUVs(segmentsW, segmentsH) {
                if (segmentsW === void 0) { segmentsW = 1; }
                if (segmentsH === void 0) { segmentsH = 1; }
                var data = new Float32Array((segmentsH + 1) * (segmentsW + 1) * 2);
                var stride = 2;
                var index = 0;
                for (var yi = 0; yi <= this._segmentsH; ++yi) {
                    for (var xi = 0; xi <= this._segmentsW; ++xi) {
                        data[index++] = xi / this._segmentsW;
                        data[index++] = 1 - yi / this._segmentsH;
                        if (this._doubleSided) {
                            data[index++] = xi / this._segmentsW;
                            data[index++] = 1 - yi / this._segmentsH;
                        }
                    }
                }
                return data;
            }
        })(primitives = feng3d.primitives || (feng3d.primitives = {}));
    })(feng3d = me.feng3d || (me.feng3d = {}));
})(me || (me = {}));
var me;
(function (me) {
    var feng3d;
    (function (feng3d) {
        var primitives;
        (function (primitives) {
            /**
             * 创建立方几何体
             * @param width 宽度
             */
            function createCube(width, height, depth, segmentsW, segmentsH, segmentsD, tile6, elements) {
                if (width === void 0) { width = 100; }
                if (height === void 0) { height = 100; }
                if (depth === void 0) { depth = 100; }
                if (segmentsW === void 0) { segmentsW = 1; }
                if (segmentsH === void 0) { segmentsH = 1; }
                if (segmentsD === void 0) { segmentsD = 1; }
                if (tile6 === void 0) { tile6 = true; }
                if (elements === void 0) { elements = [feng3d.GLAttribute.position, feng3d.GLAttribute.uv, feng3d.GLAttribute.normal, feng3d.GLAttribute.tangent]; }
                var geometry = new feng3d.Geometry();
                elements.forEach(function (element) {
                    switch (element) {
                        case feng3d.GLAttribute.position:
                            var vertexPositionData = buildPosition(width, height, depth, segmentsW, segmentsH, segmentsD);
                            geometry.setVAData(element, vertexPositionData, 3);
                            break;
                        case feng3d.GLAttribute.normal:
                            var vertexNormalData = buildNormal(segmentsW, segmentsH, segmentsD);
                            geometry.setVAData(element, vertexNormalData, 3);
                            break;
                        case feng3d.GLAttribute.tangent:
                            var vertexTangentData = buildTangent(segmentsW, segmentsH, segmentsD);
                            geometry.setVAData(element, vertexTangentData, 3);
                            break;
                        case feng3d.GLAttribute.uv:
                            var uvData = buildUVs(segmentsW, segmentsH, segmentsD, tile6);
                            geometry.setVAData(element, uvData, 2);
                            break;
                        default:
                            throw ("\u4E0D\u652F\u6301\u4E3A\u5E73\u9762\u521B\u5EFA\u9876\u70B9\u5C5E\u6027 " + element);
                    }
                });
                var indices = buildIndices(segmentsW, segmentsH, segmentsD);
                geometry.indices = indices;
                return geometry;
            }
            primitives.createCube = createCube;
            function buildPosition(width, height, depth, segmentsW, segmentsH, segmentsD) {
                if (width === void 0) { width = 100; }
                if (height === void 0) { height = 100; }
                if (depth === void 0) { depth = 100; }
                if (segmentsW === void 0) { segmentsW = 1; }
                if (segmentsH === void 0) { segmentsH = 1; }
                if (segmentsD === void 0) { segmentsD = 1; }
                var vertexPositionData = new Float32Array(((segmentsW + 1) * (segmentsH + 1) + (segmentsW + 1) * (segmentsD + 1) + (segmentsH + 1) * (segmentsD + 1)) * 2 * 3);
                var i, j;
                var hw, hh, hd; // halves
                var dw, dh, dd; // deltas
                var outer_pos;
                // Indices
                var positionIndex = 0;
                // half cube dimensions
                hw = width / 2;
                hh = height / 2;
                hd = depth / 2;
                // Segment dimensions
                dw = width / segmentsW;
                dh = height / segmentsH;
                dd = depth / segmentsD;
                for (i = 0; i <= segmentsW; i++) {
                    outer_pos = -hw + i * dw;
                    for (j = 0; j <= segmentsH; j++) {
                        // front
                        vertexPositionData[positionIndex++] = outer_pos;
                        vertexPositionData[positionIndex++] = -hh + j * dh;
                        vertexPositionData[positionIndex++] = -hd;
                        // back
                        vertexPositionData[positionIndex++] = outer_pos;
                        vertexPositionData[positionIndex++] = -hh + j * dh;
                        vertexPositionData[positionIndex++] = hd;
                    }
                }
                for (i = 0; i <= segmentsW; i++) {
                    outer_pos = -hw + i * dw;
                    for (j = 0; j <= segmentsD; j++) {
                        // top
                        vertexPositionData[positionIndex++] = outer_pos;
                        vertexPositionData[positionIndex++] = hh;
                        vertexPositionData[positionIndex++] = -hd + j * dd;
                        // bottom
                        vertexPositionData[positionIndex++] = outer_pos;
                        vertexPositionData[positionIndex++] = -hh;
                        vertexPositionData[positionIndex++] = -hd + j * dd;
                    }
                }
                for (i = 0; i <= segmentsD; i++) {
                    outer_pos = hd - i * dd;
                    for (j = 0; j <= segmentsH; j++) {
                        // left
                        vertexPositionData[positionIndex++] = -hw;
                        vertexPositionData[positionIndex++] = -hh + j * dh;
                        vertexPositionData[positionIndex++] = outer_pos;
                        // right
                        vertexPositionData[positionIndex++] = hw;
                        vertexPositionData[positionIndex++] = -hh + j * dh;
                        vertexPositionData[positionIndex++] = outer_pos;
                    }
                }
                return vertexPositionData;
            }
            function buildNormal(segmentsW, segmentsH, segmentsD) {
                if (segmentsW === void 0) { segmentsW = 1; }
                if (segmentsH === void 0) { segmentsH = 1; }
                if (segmentsD === void 0) { segmentsD = 1; }
                var vertexNormalData = new Float32Array(((segmentsW + 1) * (segmentsH + 1) + (segmentsW + 1) * (segmentsD + 1) + (segmentsH + 1) * (segmentsD + 1)) * 2 * 3);
                var i, j;
                // Indices
                var normalIndex = 0;
                for (i = 0; i <= segmentsW; i++) {
                    for (j = 0; j <= segmentsH; j++) {
                        // front
                        vertexNormalData[normalIndex++] = 0;
                        vertexNormalData[normalIndex++] = 0;
                        vertexNormalData[normalIndex++] = -1;
                        // back
                        vertexNormalData[normalIndex++] = 0;
                        vertexNormalData[normalIndex++] = 0;
                        vertexNormalData[normalIndex++] = 1;
                    }
                }
                for (i = 0; i <= segmentsW; i++) {
                    for (j = 0; j <= segmentsD; j++) {
                        // top
                        vertexNormalData[normalIndex++] = 0;
                        vertexNormalData[normalIndex++] = 1;
                        vertexNormalData[normalIndex++] = 0;
                        // bottom
                        vertexNormalData[normalIndex++] = 0;
                        vertexNormalData[normalIndex++] = -1;
                        vertexNormalData[normalIndex++] = 0;
                    }
                }
                for (i = 0; i <= segmentsD; i++) {
                    for (j = 0; j <= segmentsH; j++) {
                        // left
                        vertexNormalData[normalIndex++] = -1;
                        vertexNormalData[normalIndex++] = 0;
                        vertexNormalData[normalIndex++] = 0;
                        // right
                        vertexNormalData[normalIndex++] = 1;
                        vertexNormalData[normalIndex++] = 0;
                        vertexNormalData[normalIndex++] = 0;
                    }
                }
                return new Float32Array(vertexNormalData);
            }
            function buildTangent(segmentsW, segmentsH, segmentsD) {
                if (segmentsW === void 0) { segmentsW = 1; }
                if (segmentsH === void 0) { segmentsH = 1; }
                if (segmentsD === void 0) { segmentsD = 1; }
                var vertexTangentData = new Float32Array(((segmentsW + 1) * (segmentsH + 1) + (segmentsW + 1) * (segmentsD + 1) + (segmentsH + 1) * (segmentsD + 1)) * 2 * 3);
                var i, j;
                // Indices
                var tangentIndex = 0;
                for (i = 0; i <= segmentsW; i++) {
                    for (j = 0; j <= segmentsH; j++) {
                        // front
                        vertexTangentData[tangentIndex++] = 1;
                        vertexTangentData[tangentIndex++] = 0;
                        vertexTangentData[tangentIndex++] = 0;
                        // back
                        vertexTangentData[tangentIndex++] = -1;
                        vertexTangentData[tangentIndex++] = 0;
                        vertexTangentData[tangentIndex++] = 0;
                    }
                }
                for (i = 0; i <= segmentsW; i++) {
                    for (j = 0; j <= segmentsD; j++) {
                        // top
                        vertexTangentData[tangentIndex++] = 1;
                        vertexTangentData[tangentIndex++] = 0;
                        vertexTangentData[tangentIndex++] = 0;
                        // bottom
                        vertexTangentData[tangentIndex++] = 1;
                        vertexTangentData[tangentIndex++] = 0;
                        vertexTangentData[tangentIndex++] = 0;
                    }
                }
                for (i = 0; i <= segmentsD; i++) {
                    for (j = 0; j <= segmentsH; j++) {
                        // left
                        vertexTangentData[tangentIndex++] = 0;
                        vertexTangentData[tangentIndex++] = 0;
                        vertexTangentData[tangentIndex++] = -1;
                        // right
                        vertexTangentData[tangentIndex++] = 0;
                        vertexTangentData[tangentIndex++] = 0;
                        vertexTangentData[tangentIndex++] = 1;
                    }
                }
                return vertexTangentData;
            }
            function buildIndices(segmentsW, segmentsH, segmentsD) {
                if (segmentsW === void 0) { segmentsW = 1; }
                if (segmentsH === void 0) { segmentsH = 1; }
                if (segmentsD === void 0) { segmentsD = 1; }
                var indices = new Uint16Array((segmentsW * segmentsH + segmentsW * segmentsD + segmentsH * segmentsD) * 12);
                var tl, tr, bl, br;
                var i, j, inc = 0;
                var fidx = 0;
                for (i = 0; i <= segmentsW; i++) {
                    for (j = 0; j <= segmentsH; j++) {
                        // front
                        // back
                        if (i && j) {
                            tl = 2 * ((i - 1) * (segmentsH + 1) + (j - 1));
                            tr = 2 * (i * (segmentsH + 1) + (j - 1));
                            bl = tl + 2;
                            br = tr + 2;
                            indices[fidx++] = tl;
                            indices[fidx++] = bl;
                            indices[fidx++] = br;
                            indices[fidx++] = tl;
                            indices[fidx++] = br;
                            indices[fidx++] = tr;
                            indices[fidx++] = tr + 1;
                            indices[fidx++] = br + 1;
                            indices[fidx++] = bl + 1;
                            indices[fidx++] = tr + 1;
                            indices[fidx++] = bl + 1;
                            indices[fidx++] = tl + 1;
                        }
                    }
                }
                inc += 2 * (segmentsW + 1) * (segmentsH + 1);
                for (i = 0; i <= segmentsW; i++) {
                    for (j = 0; j <= segmentsD; j++) {
                        // top
                        // bottom
                        if (i && j) {
                            tl = inc + 2 * ((i - 1) * (segmentsD + 1) + (j - 1));
                            tr = inc + 2 * (i * (segmentsD + 1) + (j - 1));
                            bl = tl + 2;
                            br = tr + 2;
                            indices[fidx++] = tl;
                            indices[fidx++] = bl;
                            indices[fidx++] = br;
                            indices[fidx++] = tl;
                            indices[fidx++] = br;
                            indices[fidx++] = tr;
                            indices[fidx++] = tr + 1;
                            indices[fidx++] = br + 1;
                            indices[fidx++] = bl + 1;
                            indices[fidx++] = tr + 1;
                            indices[fidx++] = bl + 1;
                            indices[fidx++] = tl + 1;
                        }
                    }
                }
                inc += 2 * (segmentsW + 1) * (segmentsD + 1);
                for (i = 0; i <= segmentsD; i++) {
                    for (j = 0; j <= segmentsH; j++) {
                        // left
                        // right
                        if (i && j) {
                            tl = inc + 2 * ((i - 1) * (segmentsH + 1) + (j - 1));
                            tr = inc + 2 * (i * (segmentsH + 1) + (j - 1));
                            bl = tl + 2;
                            br = tr + 2;
                            indices[fidx++] = tl;
                            indices[fidx++] = bl;
                            indices[fidx++] = br;
                            indices[fidx++] = tl;
                            indices[fidx++] = br;
                            indices[fidx++] = tr;
                            indices[fidx++] = tr + 1;
                            indices[fidx++] = br + 1;
                            indices[fidx++] = bl + 1;
                            indices[fidx++] = tr + 1;
                            indices[fidx++] = bl + 1;
                            indices[fidx++] = tl + 1;
                        }
                    }
                }
                return indices;
            }
            function buildUVs(segmentsW, segmentsH, segmentsD, tile6) {
                if (segmentsW === void 0) { segmentsW = 1; }
                if (segmentsH === void 0) { segmentsH = 1; }
                if (segmentsD === void 0) { segmentsD = 1; }
                if (tile6 === void 0) { tile6 = true; }
                var i, j, uidx;
                var data = new Float32Array(((segmentsW + 1) * (segmentsH + 1) + (segmentsW + 1) * (segmentsD + 1) + (segmentsH + 1) * (segmentsD + 1)) * 2 * 2);
                var u_tile_dim, v_tile_dim;
                var u_tile_step, v_tile_step;
                var tl0u, tl0v;
                var tl1u, tl1v;
                var du, dv;
                if (tile6) {
                    u_tile_dim = u_tile_step = 1 / 3;
                    v_tile_dim = v_tile_step = 1 / 2;
                }
                else {
                    u_tile_dim = v_tile_dim = 1;
                    u_tile_step = v_tile_step = 0;
                }
                // Create planes two and two, the same way that they were
                // constructed in the this.buildGeometry() function. First calculate
                // the top-left UV coordinate for both planes, and then loop
                // over the points, calculating the UVs from these numbers.
                // When this.tile6 is true, the layout is as follows:
                //       .-----.-----.-----. (1,1)
                //       | Bot |  T  | Bak |
                //       |-----+-----+-----|
                //       |  L  |  F  |  R  |
                // (0,0)'-----'-----'-----'
                uidx = 0;
                // FRONT / BACK
                tl0u = 1 * u_tile_step;
                tl0v = 1 * v_tile_step;
                tl1u = 2 * u_tile_step;
                tl1v = 0 * v_tile_step;
                du = u_tile_dim / segmentsW;
                dv = v_tile_dim / segmentsH;
                for (i = 0; i <= segmentsW; i++) {
                    for (j = 0; j <= segmentsH; j++) {
                        data[uidx++] = tl0u + i * du;
                        data[uidx++] = tl0v + (v_tile_dim - j * dv);
                        data[uidx++] = tl1u + (u_tile_dim - i * du);
                        data[uidx++] = tl1v + (v_tile_dim - j * dv);
                    }
                }
                // TOP / BOTTOM
                tl0u = 1 * u_tile_step;
                tl0v = 0 * v_tile_step;
                tl1u = 0 * u_tile_step;
                tl1v = 0 * v_tile_step;
                du = u_tile_dim / segmentsW;
                dv = v_tile_dim / segmentsD;
                for (i = 0; i <= segmentsW; i++) {
                    for (j = 0; j <= segmentsD; j++) {
                        data[uidx++] = tl0u + i * du;
                        data[uidx++] = tl0v + (v_tile_dim - j * dv);
                        data[uidx++] = tl1u + i * du;
                        data[uidx++] = tl1v + j * dv;
                    }
                }
                // LEFT / RIGHT
                tl0u = 0 * u_tile_step;
                tl0v = 1 * v_tile_step;
                tl1u = 2 * u_tile_step;
                tl1v = 1 * v_tile_step;
                du = u_tile_dim / segmentsD;
                dv = v_tile_dim / segmentsH;
                for (i = 0; i <= segmentsD; i++) {
                    for (j = 0; j <= segmentsH; j++) {
                        data[uidx++] = tl0u + i * du;
                        data[uidx++] = tl0v + (v_tile_dim - j * dv);
                        data[uidx++] = tl1u + (u_tile_dim - i * du);
                        data[uidx++] = tl1v + (v_tile_dim - j * dv);
                    }
                }
                return data;
            }
        })(primitives = feng3d.primitives || (feng3d.primitives = {}));
    })(feng3d = me.feng3d || (me.feng3d = {}));
})(me || (me = {}));
var me;
(function (me) {
    var feng3d;
    (function (feng3d) {
        var factory;
        (function (factory) {
            /**
             * 创建摄像机3D对象
             */
            function createCamera() {
                var camera = new feng3d.Object3D();
                camera.addComponent(new feng3d.Camera());
                return camera;
            }
            factory.createCamera = createCamera;
        })(factory = feng3d.factory || (feng3d.factory = {}));
    })(feng3d = me.feng3d || (me.feng3d = {}));
})(me || (me = {}));
var me;
(function (me) {
    var feng3d;
    (function (feng3d) {
        /**
         * 渲染器
         * @author feng 2016-05-01
         */
        var Renderer = (function () {
            /**
             * 构建渲染器
             * @param gl    webgl渲染上下文
             * @param scene 场景
             * @param camera 摄像机对象
             */
            function Renderer(gl, scene, camera) {
                this.vertexShaderStr = "\nattribute vec3 aVertexPosition;\n\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\n\nvoid main(void) {\n    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n}";
                this.fragmentShaderStr = "\nvoid main(void) {\n    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n}";
                this.gl = gl;
                this.scene = scene;
                this.camera = camera;
                this.initGL();
                this.initShaders();
            }
            Renderer.prototype.initGL = function () {
                this.gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
                this.gl.clearDepth(1.0); // Clear everything
                this.gl.enable(this.gl.DEPTH_TEST); // Enable depth testing
                this.gl.depthFunc(this.gl.LEQUAL); // Near things obscure far things
            };
            Renderer.prototype.initShaders = function () {
                var vertexShader = this.getShader(this.vertexShaderStr, 1);
                var fragmentShader = this.getShader(this.fragmentShaderStr, 2);
                // Create the shader program
                this.shaderProgram = this.gl.createProgram();
                this.gl.attachShader(this.shaderProgram, vertexShader);
                this.gl.attachShader(this.shaderProgram, fragmentShader);
                this.gl.linkProgram(this.shaderProgram);
                // If creating the shader program failed, alert
                if (!this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS)) {
                    alert("Unable to initialize the shader program.");
                }
                this.gl.useProgram(this.shaderProgram);
                this.vertexPositionAttribute = this.gl.getAttribLocation(this.shaderProgram, "aVertexPosition");
                this.gl.enableVertexAttribArray(this.vertexPositionAttribute);
            };
            /**
             * 渲染
             */
            Renderer.prototype.render = function () {
                var _this = this;
                this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
                var renderables = this.scene.getRenderables();
                renderables.forEach(function (element) {
                    _this.drawObject3D(element);
                });
            };
            Renderer.prototype.getShader = function (theSource, type) {
                // Now figure out what type of shader script we have,
                // based on its MIME type.
                var shader;
                if (type == 2) {
                    shader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
                }
                else if (type == 1) {
                    shader = this.gl.createShader(this.gl.VERTEX_SHADER);
                }
                else {
                    return null; // Unknown shader type
                }
                // Send the source to the shader object
                this.gl.shaderSource(shader, theSource);
                // Compile the shader program
                this.gl.compileShader(shader);
                // See if it compiled successfully
                if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
                    alert("An error occurred compiling the shaders: " + this.gl.getShaderInfoLog(shader));
                    return null;
                }
                return shader;
            };
            Renderer.prototype.setMatrixUniforms = function () {
                var perspectiveMatrix = this.getPerspectiveMatrix();
                this.pUniform = this.pUniform || this.gl.getUniformLocation(this.shaderProgram, "uPMatrix");
                this.gl.uniformMatrix4fv(this.pUniform, false, new Float32Array(perspectiveMatrix.rawData));
            };
            Renderer.prototype.getPerspectiveMatrix = function () {
                var camSpace3D = this.camera.space3D;
                var camera = this.camera.getComponentByClass(feng3d.Camera);
                var perspectiveMatrix = camSpace3D.transform3D;
                perspectiveMatrix.invert();
                perspectiveMatrix.append(camera.projectionMatrix3D);
                return perspectiveMatrix;
            };
            Renderer.prototype.drawObject3D = function (object3D) {
                var object3DBuffer = object3DBufferManager.getBuffer(this.gl, object3D);
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, object3DBuffer.squareVerticesBuffer);
                this.gl.vertexAttribPointer(this.vertexPositionAttribute, 3, this.gl.FLOAT, false, 0, 0);
                var mvMatrix = object3D.space3D.transform3D;
                this.mvUniform = this.mvUniform || this.gl.getUniformLocation(this.shaderProgram, "uMVMatrix");
                this.gl.uniformMatrix4fv(this.mvUniform, false, new Float32Array(mvMatrix.rawData));
                this.setMatrixUniforms();
                this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, object3DBuffer.indexBuffer);
                this.gl.drawElements(this.gl.TRIANGLES, object3DBuffer.count, this.gl.UNSIGNED_SHORT, 0);
            };
            return Renderer;
        }());
        feng3d.Renderer = Renderer;
        var Object3DBuffer = (function () {
            function Object3DBuffer() {
            }
            return Object3DBuffer;
        }());
        var Object3DBufferManager = (function () {
            function Object3DBufferManager() {
                this.map = new feng3d.Map();
            }
            Object3DBufferManager.prototype.getBuffer = function (gl, object3D) {
                var glMap = this.map.get(gl);
                if (glMap == null) {
                    glMap = new feng3d.Map();
                    this.map.push(gl, glMap);
                }
                var buffer = glMap.get(object3D);
                if (buffer == null) {
                    buffer = new Object3DBuffer();
                    glMap.push(object3D, buffer);
                    var geometry = object3D.getComponentByClass(feng3d.Geometry);
                    var positionData = geometry.getVAData(feng3d.GLAttribute.position);
                    // Create a buffer for the square's vertices.
                    var squareVerticesBuffer = buffer.squareVerticesBuffer = gl.createBuffer();
                    gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);
                    gl.bufferData(gl.ARRAY_BUFFER, positionData, gl.STATIC_DRAW);
                    // var vaBuffer = new VABuffer(GLAttribute.position);
                    var indices = geometry.indices;
                    var indexBuffer = buffer.indexBuffer = gl.createBuffer();
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
                    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
                    buffer.count = indices.length;
                }
                return buffer;
            };
            return Object3DBufferManager;
        }());
        var object3DBufferManager = new Object3DBufferManager();
    })(feng3d = me.feng3d || (me.feng3d = {}));
})(me || (me = {}));
var me;
(function (me) {
    var feng3d;
    (function (feng3d) {
        /**
         * 3d缓存类型
         * @author feng 2014-8-20
         */
        var Context3DBufferType = (function () {
            function Context3DBufferType() {
            }
            return Context3DBufferType;
        }());
        feng3d.Context3DBufferType = Context3DBufferType;
    })(feng3d = me.feng3d || (me.feng3d = {}));
})(me || (me = {}));
var me;
(function (me) {
    var feng3d;
    (function (feng3d) {
        /**
         * Context3D可执行的数据缓存
         * @author feng 2014-6-9
         */
        var Context3DBuffer = (function () {
            /**
             * 创建一个gl可执行的数据缓存
             * @param dataTypeId 		数据缓存编号
             * @param updateFunc 		更新回调函数
             */
            function Context3DBuffer(dataTypeId) {
                this._dataTypeId = dataTypeId;
            }
            Object.defineProperty(Context3DBuffer.prototype, "dataTypeId", {
                /**
                 * 缓存类型编号
                 */
                get: function () {
                    return this._dataTypeId;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 字符串描述
             */
            Context3DBuffer.prototype.toString = function () {
                return "[" + feng3d.getClassName(this) + " dataType=\"" + this._dataTypeId + "\"]";
            };
            return Context3DBuffer;
        }());
        feng3d.Context3DBuffer = Context3DBuffer;
    })(feng3d = me.feng3d || (me.feng3d = {}));
})(me || (me = {}));
var me;
(function (me) {
    var feng3d;
    (function (feng3d) {
        /**
         * 顶点数据缓冲
         * @author feng 2014-8-14
         */
        var VABuffer = (function (_super) {
            __extends(VABuffer, _super);
            /**
             * 创建顶点数据缓存
             * @param dataTypeId 数据编号
             * @param updateFunc 数据更新回调函数
             */
            function VABuffer(dataTypeId) {
                _super.call(this, dataTypeId);
            }
            /**
             * @inheritDoc
             */
            VABuffer.prototype.doBuffer = function (context3D) {
                var buffer = feng3d.context3DBufferCenter.getVABuffer(context3D, this.data, context3D.ARRAY_BUFFER);
                // this.vertexPositionAttribute = context3D.getAttribLocation(this.shaderProgram, "aVertexPosition");
                // this.gl.enableVertexAttribArray(this.vertexPositionAttribute);
            };
            /**
             * 绑定缓冲
             */
            VABuffer.prototype.bindBuffer = function (context3D) {
            };
            /**
             * 更新数据
             * @param data 				顶点数据
             * @param numVertices 		要在缓存区中存储的顶点数量。
             * @param size              与每个顶点关联的 32 位（4 字节）数据值的数量。
             */
            VABuffer.prototype.update = function (data, numVertices, size) {
                feng3d.assert(1 <= size && size <= 4);
                this.data = data;
                this.size = size;
            };
            return VABuffer;
        }(feng3d.Context3DBuffer));
        feng3d.VABuffer = VABuffer;
    })(feng3d = me.feng3d || (me.feng3d = {}));
})(me || (me = {}));
var me;
(function (me) {
    var feng3d;
    (function (feng3d) {
        /**
         * Context3D缓存拥有者
         * @author feng 2014-11-26
         */
        var Context3DBufferOwner = (function (_super) {
            __extends(Context3DBufferOwner, _super);
            /**
             * 创建Context3D缓存拥有者
             */
            function Context3DBufferOwner() {
                _super.call(this);
                /**
                 * 所有缓冲列表是否有效
                 */
                this.bufferInvalid = true;
                this.childrenBufferOwner = [];
                this.initBuffers();
            }
            Object.defineProperty(Context3DBufferOwner.prototype, "bufferDic", {
                /**
                 * @inheritDoc
                 */
                get: function () {
                    if (this._bufferDic == null)
                        this._bufferDic = {};
                    return this._bufferDic;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Context3DBufferOwner.prototype, "bufferList", {
                /**
                 * @inheritDoc
                 */
                get: function () {
                    if (this._bufferList == null)
                        this._bufferList = [];
                    return this._bufferList;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 初始化Context3d缓存
             */
            Context3DBufferOwner.prototype.initBuffers = function () {
            };
            /**
             * 添加子项缓存拥有者
             * @param childBufferOwner
             */
            Context3DBufferOwner.prototype.addChildBufferOwner = function (childBufferOwner) {
                var index = this.childrenBufferOwner.indexOf(childBufferOwner);
                feng3d.assert(index == -1, "不能重复添加子项缓存拥有者");
                this.childrenBufferOwner.push(childBufferOwner);
                //添加事件
                childBufferOwner.addEventListener(feng3d.Context3DBufferOwnerEvent.ADD_CONTEXT3DBUFFER, this.bubbleDispatchEvent, this);
                childBufferOwner.addEventListener(feng3d.Context3DBufferOwnerEvent.REMOVE_CONTEXT3DBUFFER, this.bubbleDispatchEvent, this);
                childBufferOwner.addEventListener(feng3d.Context3DBufferOwnerEvent.ADDCHILD_CONTEXT3DBUFFEROWNER, this.bubbleDispatchEvent, this);
                childBufferOwner.addEventListener(feng3d.Context3DBufferOwnerEvent.REMOVECHILD_CONTEXT3DBUFFEROWNER, this.bubbleDispatchEvent, this);
                //派发添加子项缓冲拥有者事件
                this.dispatchEvent(new feng3d.Context3DBufferOwnerEvent(feng3d.Context3DBufferOwnerEvent.ADDCHILD_CONTEXT3DBUFFEROWNER, childBufferOwner));
            };
            /**
             * 移除子项缓存拥有者
             * @param childBufferOwner
             */
            Context3DBufferOwner.prototype.removeChildBufferOwner = function (childBufferOwner) {
                var index = this.childrenBufferOwner.indexOf(childBufferOwner);
                feng3d.assert(index != -1, "无法移除不存在的子项缓存拥有者");
                this.childrenBufferOwner.splice(index, 1);
                //移除事件
                childBufferOwner.removeEventListener(feng3d.Context3DBufferOwnerEvent.ADD_CONTEXT3DBUFFER, this.bubbleDispatchEvent, this);
                childBufferOwner.removeEventListener(feng3d.Context3DBufferOwnerEvent.REMOVE_CONTEXT3DBUFFER, this.bubbleDispatchEvent, this);
                childBufferOwner.removeEventListener(feng3d.Context3DBufferOwnerEvent.ADDCHILD_CONTEXT3DBUFFEROWNER, this.bubbleDispatchEvent, this);
                childBufferOwner.removeEventListener(feng3d.Context3DBufferOwnerEvent.REMOVECHILD_CONTEXT3DBUFFEROWNER, this.bubbleDispatchEvent, this);
                //派发添加子项缓冲拥有者事件
                this.dispatchEvent(new feng3d.Context3DBufferOwnerEvent(feng3d.Context3DBufferOwnerEvent.REMOVECHILD_CONTEXT3DBUFFEROWNER, childBufferOwner));
            };
            /**
             * 向上冒泡
             */
            Context3DBufferOwner.prototype.bubbleDispatchEvent = function (event) {
                this.bufferInvalid = true;
                this.dispatchEvent(event);
            };
            /**
             * 标记Context3d缓存脏了
             * @param dataTypeId
             */
            Context3DBufferOwner.prototype.markBufferDirty = function (dataTypeId) {
                var context3DBuffer = this.bufferDic[dataTypeId];
                // context3DBuffer.invalid();
            };
            /**
             * @inheritDoc
             */
            Context3DBufferOwner.prototype.mapContext3DBuffer = function (dataTypeId, updateFunc) {
                var bufferCls = feng3d.context3DBufferTypeManager.getBufferClass(dataTypeId);
                var context3DBuffer = new bufferCls(dataTypeId, updateFunc);
                this.bufferDic[dataTypeId] = context3DBuffer;
                this.bufferList.push(context3DBuffer);
                this.dispatchEvent(new feng3d.Context3DBufferOwnerEvent(feng3d.Context3DBufferOwnerEvent.ADD_CONTEXT3DBUFFER, context3DBuffer));
                return context3DBuffer;
            };
            /**
             * @inheritDoc
             */
            Context3DBufferOwner.prototype.getAllBufferList = function () {
                if (this.bufferInvalid) {
                    //收集本拥有者缓冲列表
                    this.allBufferList = this.bufferList.concat();
                    var childAllBufferList;
                    //遍历子项拥有者收集缓冲列表
                    for (var i = 0; i < this.childrenBufferOwner.length; i++) {
                        childAllBufferList = this.childrenBufferOwner[i].getAllBufferList();
                        this.allBufferList = this.allBufferList.concat(childAllBufferList);
                    }
                    this.bufferInvalid = false;
                }
                return this.allBufferList;
            };
            return Context3DBufferOwner;
        }(feng3d.Component));
        feng3d.Context3DBufferOwner = Context3DBufferOwner;
    })(feng3d = me.feng3d || (me.feng3d = {}));
})(me || (me = {}));
var me;
(function (me) {
    var feng3d;
    (function (feng3d) {
        /**
         * 3d环境缓存类型管理者
         * @author feng 2014-9-3
         */
        var Context3DBufferTypeManager = (function () {
            function Context3DBufferTypeManager() {
                this.NAME_REGEXP = "[a-zA-Z0-9$]";
                /** 缓存类型字典 */
                this.bufferTypeDic = {};
                this.typeClassDic = {};
                this.config = [];
            }
            /**
             * 获取或创建3d缓存类型
             * @param typeId 		3d缓存类型编号
             * @return				3d缓存类型实例
             */
            Context3DBufferTypeManager.prototype.getBufferType = function (typeId) {
                var bufferType = this.bufferTypeDic[typeId];
                if (bufferType)
                    return bufferType;
                this.bufferTypeDic[typeId] = bufferType = new feng3d.Context3DBufferType();
                var types = typeId.split("_");
                bufferType.registerType = types[1];
                bufferType.dataType = types[2];
                return bufferType;
            };
            /**
             * 获取3d缓存类定义
             * @param typeId 		3d缓存类型编号
             * @return				3d缓存类定义
             */
            Context3DBufferTypeManager.prototype.getBufferClass = function (typeId) {
                var cls = this.typeClassDic[typeId];
                if (cls == null) {
                    for (var i = 0; i < this.config.length; i++) {
                        var result = typeId.match(this.config[i][0]);
                        if (result != null && result.input == result[0]) {
                            return this.config[i][1];
                        }
                    }
                }
                throw ("无法为" + typeId + "匹配到3d缓存类");
            };
            return Context3DBufferTypeManager;
        }());
        feng3d.Context3DBufferTypeManager = Context3DBufferTypeManager;
        /**
         * 3d环境缓存类型管理者
         */
        feng3d.context3DBufferTypeManager = new Context3DBufferTypeManager();
    })(feng3d = me.feng3d || (me.feng3d = {}));
})(me || (me = {}));
var me;
(function (me) {
    var feng3d;
    (function (feng3d) {
        /**
         * 3D上下文缓冲中心
         */
        var Context3DBufferCenter = (function () {
            function Context3DBufferCenter() {
            }
            Context3DBufferCenter.prototype.getVABuffer = function (context3D, data, target) {
                var buffer = context3D.createBuffer();
                context3D.bindBuffer(context3D.ARRAY_BUFFER, buffer);
                context3D.bufferData(context3D.ARRAY_BUFFER, data, context3D.STATIC_DRAW);
                return buffer;
            };
            return Context3DBufferCenter;
        }());
        feng3d.Context3DBufferCenter = Context3DBufferCenter;
        /**
         * 3D上下文缓冲中心
         */
        feng3d.context3DBufferCenter = new Context3DBufferCenter();
    })(feng3d = me.feng3d || (me.feng3d = {}));
})(me || (me = {}));
var me;
(function (me) {
    var feng3d;
    (function (feng3d) {
        /**
         * 3D环境缓冲拥有者事件
         * @author feng 2015-7-18
         */
        var Context3DBufferOwnerEvent = (function (_super) {
            __extends(Context3DBufferOwnerEvent, _super);
            /**
             * 创建3D环境缓冲拥有者事件
             * @param type 					事件的类型，可以作为 Event.type 访问。
             * @param data					事件携带的数据
             * @param bubbles 				确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
             */
            function Context3DBufferOwnerEvent(type, data, bubbles) {
                if (data === void 0) { data = null; }
                if (bubbles === void 0) { bubbles = false; }
                _super.call(this, type, data, bubbles);
            }
            /**
             * 添加3D环境缓冲事件
             */
            Context3DBufferOwnerEvent.ADD_CONTEXT3DBUFFER = "addContext3DBuffer";
            /**
             * 移除3D环境缓冲事件
             */
            Context3DBufferOwnerEvent.REMOVE_CONTEXT3DBUFFER = "removeContext3DBuffer";
            /**
             * 添加子项3D环境缓冲拥有者事件
             */
            Context3DBufferOwnerEvent.ADDCHILD_CONTEXT3DBUFFEROWNER = "addChildContext3DBufferOwner";
            /**
             * 移除子项3D环境缓冲拥有者事件
             */
            Context3DBufferOwnerEvent.REMOVECHILD_CONTEXT3DBUFFEROWNER = "removeChildContext3DBufferOwner";
            return Context3DBufferOwnerEvent;
        }(feng3d.Event));
        feng3d.Context3DBufferOwnerEvent = Context3DBufferOwnerEvent;
    })(feng3d = me.feng3d || (me.feng3d = {}));
})(me || (me = {}));
var me;
(function (me) {
    var feng3d;
    (function (feng3d) {
        /**
         * 渲染程序缓存
         * @author feng 2016-05-09
         */
        var ProgramBuffer = (function (_super) {
            __extends(ProgramBuffer, _super);
            function ProgramBuffer() {
                _super.apply(this, arguments);
            }
            ProgramBuffer.prototype.doBuffer = function (gl) {
                if (this.shaderProgram != null) {
                    var vertexShader = this.getShader(gl, this.vertexCode, 1);
                    var fragmentShader = this.getShader(gl, this.fragmentCode, 2);
                    // Create the shader program
                    this.shaderProgram = gl.createProgram();
                    gl.attachShader(this.shaderProgram, vertexShader);
                    gl.attachShader(this.shaderProgram, fragmentShader);
                    gl.linkProgram(this.shaderProgram);
                    // If creating the shader program failed, alert
                    if (!gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS)) {
                        alert("Unable to initialize the shader program.");
                    }
                }
                gl.useProgram(this.shaderProgram);
            };
            ProgramBuffer.prototype.getAttributes = function () {
                var attributeReg = /attribute\s+(\w+)\s+(\w+)/g;
                var result = attributeReg.exec(this.vertexCode);
                var attributes = [];
                while (result) {
                    var attribute = new feng3d.ProgramAttribute();
                    attribute.type = result[1];
                    attribute.name = result[2];
                    result = attributeReg.exec(this.vertexCode);
                }
                return attributes;
            };
            ProgramBuffer.prototype.getUniforms = function () {
                var uniforms = [];
                var uniformReg = /uniform\s+(\w+)\s+(\w+)/g;
                var result = uniformReg.exec(this.vertexCode);
                while (result) {
                    var attribute = new feng3d.ProgramAttribute();
                    attribute.type = result[1];
                    attribute.name = result[2];
                    result = uniformReg.exec(this.vertexCode);
                }
                return uniforms;
            };
            ProgramBuffer.prototype.getShader = function (gl, theSource, type) {
                // Now figure out what type of shader script we have,
                // based on its MIME type.
                var shader;
                if (type == 2) {
                    shader = gl.createShader(gl.FRAGMENT_SHADER);
                }
                else if (type == 1) {
                    shader = gl.createShader(gl.VERTEX_SHADER);
                }
                else {
                    return null; // Unknown shader type
                }
                // Send the source to the shader object
                gl.shaderSource(shader, theSource);
                // Compile the shader program
                gl.compileShader(shader);
                // See if it compiled successfully
                if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                    alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
                    return null;
                }
                return shader;
            };
            ProgramBuffer.prototype.update = function (vertexCode, fragmentCode) {
                this.vertexCode = vertexCode;
                this.fragmentCode = fragmentCode;
            };
            return ProgramBuffer;
        }(feng3d.Context3DBuffer));
        feng3d.ProgramBuffer = ProgramBuffer;
    })(feng3d = me.feng3d || (me.feng3d = {}));
})(me || (me = {}));
var me;
(function (me) {
    var feng3d;
    (function (feng3d) {
        /**
         * 程序属性
         * @author feng 2016-05-11
         */
        var ProgramAttribute = (function () {
            function ProgramAttribute() {
            }
            return ProgramAttribute;
        }());
        feng3d.ProgramAttribute = ProgramAttribute;
    })(feng3d = me.feng3d || (me.feng3d = {}));
})(me || (me = {}));
var me;
(function (me) {
    var feng3d;
    (function (feng3d) {
        /**
         * 程序常量
         * @author feng 2016-05-11
         */
        var ProgramUniform = (function () {
            function ProgramUniform() {
            }
            return ProgramUniform;
        }());
        feng3d.ProgramUniform = ProgramUniform;
    })(feng3d = me.feng3d || (me.feng3d = {}));
})(me || (me = {}));
var me;
(function (me) {
    var feng3d;
    (function (feng3d) {
        /**
         * 材质
         * @author feng 2016-05-02
         */
        var Material = (function (_super) {
            __extends(Material, _super);
            /**
             * 构建材质
             */
            function Material() {
                _super.call(this);
                this.vertexShaderStr = "\nattribute vec3 aVertexPosition;\n\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\n\nvoid main(void) {\n    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n}";
                this.fragmentShaderStr = "\nvoid main(void) {\n    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n}";
                this.pass = new feng3d.MaterialPass();
            }
            // protected initBuffers(): void {
            //     mapContext3DBuffer(_.projection_vc_matrix, updateProjectionBuffer);
            //     mapContext3DBuffer(_.program, updateProgramBuffer);
            // }
            Material.prototype.initShaders = function (gl) {
                var vertexShader = this.getShader(gl, this.vertexShaderStr, 1);
                var fragmentShader = this.getShader(gl, this.fragmentShaderStr, 2);
                // Create the shader program
                var shaderProgram = gl.createProgram();
                gl.attachShader(shaderProgram, vertexShader);
                gl.attachShader(shaderProgram, fragmentShader);
                gl.linkProgram(shaderProgram);
                // If creating the shader program failed, alert
                if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
                    alert("Unable to initialize the shader program.");
                }
                gl.useProgram(shaderProgram);
                var vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
                gl.enableVertexAttribArray(vertexPositionAttribute);
            };
            Material.prototype.getShader = function (gl, theSource, type) {
                // Now figure out what type of shader script we have,
                // based on its MIME type.
                var shader;
                if (type == 2) {
                    shader = gl.createShader(gl.FRAGMENT_SHADER);
                }
                else if (type == 1) {
                    shader = gl.createShader(gl.VERTEX_SHADER);
                }
                else {
                    return null; // Unknown shader type
                }
                // Send the source to the shader object
                gl.shaderSource(shader, theSource);
                // Compile the shader program
                gl.compileShader(shader);
                // See if it compiled successfully
                if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                    alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
                    return null;
                }
                return shader;
            };
            return Material;
        }(feng3d.Context3DBufferOwner));
        feng3d.Material = Material;
    })(feng3d = me.feng3d || (me.feng3d = {}));
})(me || (me = {}));
var me;
(function (me) {
    var feng3d;
    (function (feng3d) {
        /**
         * 颜色材质
         * @author feng 2016-05-02
         */
        var ColorMaterial = (function (_super) {
            __extends(ColorMaterial, _super);
            /**
             * 构建颜色材质
             * @param color 颜色
             */
            function ColorMaterial(color) {
                if (color === void 0) { color = 0xcccccc; }
                _super.call(this);
                this.color = color;
            }
            return ColorMaterial;
        }(feng3d.Material));
        feng3d.ColorMaterial = ColorMaterial;
    })(feng3d = me.feng3d || (me.feng3d = {}));
})(me || (me = {}));
var me;
(function (me) {
    var feng3d;
    (function (feng3d) {
        /**
         * 材质通道
         */
        var MaterialPass = (function () {
            function MaterialPass() {
            }
            return MaterialPass;
        }());
        feng3d.MaterialPass = MaterialPass;
    })(feng3d = me.feng3d || (me.feng3d = {}));
})(me || (me = {}));
//# sourceMappingURL=feng3d.js.map