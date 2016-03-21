/**
 * Feng3D
 */
var Feng3D = (function () {
    function Feng3D(parameters) {
        console.log("Feng3D version " + Feng3D.REVISION);
    }
    Feng3D.REVISION = 0;
    return Feng3D;
}());
var feng3d;
(function (feng3d) {
    /**
     * Matrix3D 类表示一个转换矩阵，该矩阵确定三维 (3D) 显示对象的位置和方向。
     * 该矩阵可以执行转换功能，包括平移（沿 x、y 和 z 轴重新定位）、旋转和缩放（调整大小）。
     * Matrix3D 类还可以执行透视投影，这会将 3D 坐标空间中的点映射到二维 (2D) 视图。
     */
    var Matrix3D = (function () {
        /**
         * 创建 Matrix3D 对象。
         */
        function Matrix3D(datas) {
            if (datas === void 0) { datas = null; }
            this.oRawData = new Float32Array(16);
            if (datas) {
                this.rawData = datas;
            }
            else
                this.rawData = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
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
        /**
        * @language en_US
        * Build a lookat matrix. (left-handed)
        * @param eye The eye position.
        * @param at The target position.
        * @param up The up direction.
        */
        /**
        * @language zh_CN
        * 生成一个注视目标的矩阵.
        * @param eye 眼睛的位置.
        * @param at 目标的位置.
        * @param up 向上的方向.
        */
        Matrix3D.prototype.lookAt = function (eye, at, up) {
            var zaxis = at.subtract(eye);
            zaxis.normalize();
            var xaxis = up.crossProduct(zaxis);
            xaxis.normalize();
            var yaxis = zaxis.crossProduct(xaxis);
            this.rawData[0] = xaxis.x;
            this.rawData[1] = yaxis.x;
            this.rawData[2] = zaxis.x;
            this.rawData[3] = 0;
            this.rawData[4] = xaxis.y;
            this.rawData[5] = yaxis.y;
            this.rawData[6] = zaxis.y;
            this.rawData[7] = 0;
            this.rawData[8] = xaxis.z;
            this.rawData[9] = yaxis.z;
            this.rawData[10] = zaxis.z;
            this.rawData[11] = 0;
            this.rawData[12] = -xaxis.dotProduct(eye);
            this.rawData[13] = -yaxis.dotProduct(eye);
            this.rawData[14] = -zaxis.dotProduct(eye);
            this.rawData[15] = 1;
        };
        /**
        * @language en_US
        * Build a perspective projection matrix. (left-handed)
        * @param fovy .
        * @param aspect .
        * @param zn min z.
        * @param zf max z.
        */
        /**
        * @language zh_CN
        * 生成一个透视投影矩阵.
        * @param fovy 观察时y 轴方向的角度，就是观察范围夹角。
        * @param aspect 横纵比，在视空间宽度除以高度.
        * @param zn 近裁剪面位置Z值.
        * @param zf 远裁剪面位置Z值.
        */
        Matrix3D.prototype.perspective = function (fovy, aspect, zn, zf) {
            var angle = fovy * (Math.PI / 180.0);
            var yScale = Math.tan((Math.PI - angle) / 2.0);
            var xScale = yScale / aspect;
            this.rawData[0] = xScale;
            this.rawData[1] = 0;
            this.rawData[2] = 0;
            this.rawData[3] = 0;
            this.rawData[4] = 0;
            this.rawData[5] = yScale;
            this.rawData[6] = 0;
            this.rawData[7] = 0;
            this.rawData[8] = 0;
            this.rawData[9] = 0;
            this.rawData[10] = zf / (zf - zn);
            this.rawData[11] = 1;
            this.rawData[12] = 0;
            this.rawData[13] = 0;
            this.rawData[14] = -zn * zf / (zf - zn);
            this.rawData[15] = 0;
        };
        /**
        * @language en_US
        * Build an ortho matrix. (left-handed)
        * @param w screen width.
        * @param h screen height.
        * @param zn min z.
        * @param zf max z.
        */
        /**
        * @language zh_CN
        * 生成一个透视投影矩阵.
        * @param w 屏幕的宽度。
        * @param h 屏幕的高度.
        * @param zn 近裁剪面位置Z值.
        * @param zf 远裁剪面位置Z值.
        */
        Matrix3D.prototype.ortho = function (w, h, zn, zf) {
            this.rawData[0] = 2 / w;
            this.rawData[1] = 0;
            this.rawData[2] = 0;
            this.rawData[3] = 0;
            this.rawData[4] = 0;
            this.rawData[5] = 2 / h;
            this.rawData[6] = 0;
            this.rawData[7] = 0;
            this.rawData[8] = 0;
            this.rawData[9] = 0;
            this.rawData[10] = 1 / (zf - zn);
            this.rawData[11] = 0;
            this.rawData[12] = 0;
            this.rawData[13] = 0;
            this.rawData[14] = zn / (zn - zf);
            this.rawData[15] = 1;
        };
        /**
        * @language en_US
        * Build an ortho matrix. (left-handed)
        * @param l min x.
        * @param r max x.
        * @param b min y.
        * @param t max y.
        * @param zn min z.
        * @param zf max z.
        */
        /**
        * @language zh_CN
        * 生成一个透视投影矩阵.
        * @param l 观察时X轴最小值.
        * @param r 观察时X轴最大值.
        * @param b 观察时Y轴最小值。
        * @param t 观察时Y轴最大值.
        * @param zn 近裁剪面位置Z值.
        * @param zf 远裁剪面位置Z值.
        */
        Matrix3D.prototype.orthoOffCenter = function (l, r, b, t, zn, zf) {
            this.rawData[0] = 2 / (r - 1);
            this.rawData[1] = 0;
            this.rawData[2] = 0;
            this.rawData[3] = 0;
            this.rawData[4] = 0;
            this.rawData[5] = 2 / (t - b);
            this.rawData[6] = 0;
            this.rawData[7] = 0;
            this.rawData[8] = 0;
            this.rawData[9] = 0;
            this.rawData[10] = 1 / (zf - zn);
            this.rawData[11] = 0;
            this.rawData[12] = (1 + r) / (1 - r);
            this.rawData[13] = (t + b) / (b - t);
            this.rawData[14] = zn / (zn - zf);
            this.rawData[15] = 1;
        };
        /**
        * @language en_US
        * matrix multiply
        * @param lhs .
        */
        /**
        * @language zh_CN
        * 通过将当前 Matrix3D 对象与另一个 Matrix3D 对象相乘来前置一个矩阵
        * @param lhs 目标矩阵.
        */
        Matrix3D.prototype.append = function (lhs) {
            var m111 = this.rawData[0], m121 = this.rawData[4], m131 = this.rawData[8], m141 = this.rawData[12], m112 = this.rawData[1], m122 = this.rawData[5], m132 = this.rawData[9], m142 = this.rawData[13], m113 = this.rawData[2], m123 = this.rawData[6], m133 = this.rawData[10], m143 = this.rawData[14], m114 = this.rawData[3], m124 = this.rawData[7], m134 = this.rawData[11], m144 = this.rawData[15], m211 = lhs.rawData[0], m221 = lhs.rawData[4], m231 = lhs.rawData[8], m241 = lhs.rawData[12], m212 = lhs.rawData[1], m222 = lhs.rawData[5], m232 = lhs.rawData[9], m242 = lhs.rawData[13], m213 = lhs.rawData[2], m223 = lhs.rawData[6], m233 = lhs.rawData[10], m243 = lhs.rawData[14], m214 = lhs.rawData[3], m224 = lhs.rawData[7], m234 = lhs.rawData[11], m244 = lhs.rawData[15];
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
        * @language en_US
        * matrix add
        * @param lhs
        * @returns
        */
        /**
        * @language zh_CN
        * 矩阵相加.
        * @param lhs 目标矩阵.
        * @returns 相加后的结果.
        */
        Matrix3D.prototype.add = function (lhs) {
            var m111 = this.rawData[0], m121 = this.rawData[4], m131 = this.rawData[8], m141 = this.rawData[12], m112 = this.rawData[1], m122 = this.rawData[5], m132 = this.rawData[9], m142 = this.rawData[13], m113 = this.rawData[2], m123 = this.rawData[6], m133 = this.rawData[10], m143 = this.rawData[14], m114 = this.rawData[3], m124 = this.rawData[7], m134 = this.rawData[11], m144 = this.rawData[15], m211 = lhs.rawData[0], m221 = lhs.rawData[4], m231 = lhs.rawData[8], m241 = lhs.rawData[12], m212 = lhs.rawData[1], m222 = lhs.rawData[5], m232 = lhs.rawData[9], m242 = lhs.rawData[13], m213 = lhs.rawData[2], m223 = lhs.rawData[6], m233 = lhs.rawData[10], m243 = lhs.rawData[14], m214 = lhs.rawData[3], m224 = lhs.rawData[7], m234 = lhs.rawData[11], m244 = lhs.rawData[15];
            this.rawData[0] = m111 + m211;
            this.rawData[1] = m112 + m212;
            this.rawData[2] = m113 + m213;
            this.rawData[3] = m114 + m214;
            this.rawData[4] = m121 + m221;
            this.rawData[5] = m122 + m222;
            this.rawData[6] = m123 + m223;
            this.rawData[7] = m124 + m224;
            this.rawData[8] = m131 + m231;
            this.rawData[9] = m132 + m232;
            this.rawData[10] = m133 + m233;
            this.rawData[11] = m134 + m234;
            this.rawData[12] = m141 + m241;
            this.rawData[13] = m142 + m242;
            this.rawData[14] = m143 + m243;
            this.rawData[15] = m144 + m244;
            return this;
        };
        /**
        * @language en_US
        * matrix add
        * @param lhs
        * @returns reslut
        */
        /**
        * @language zh_CN
        * 矩阵相减.
        * @param lhs 目标矩阵.
        * @returns 相加减的结果.
        */
        Matrix3D.prototype.sub = function (lhs) {
            var m111 = this.rawData[0], m121 = this.rawData[4], m131 = this.rawData[8], m141 = this.rawData[12], m112 = this.rawData[1], m122 = this.rawData[5], m132 = this.rawData[9], m142 = this.rawData[13], m113 = this.rawData[2], m123 = this.rawData[6], m133 = this.rawData[10], m143 = this.rawData[14], m114 = this.rawData[3], m124 = this.rawData[7], m134 = this.rawData[11], m144 = this.rawData[15], m211 = lhs.rawData[0], m221 = lhs.rawData[4], m231 = lhs.rawData[8], m241 = lhs.rawData[12], m212 = lhs.rawData[1], m222 = lhs.rawData[5], m232 = lhs.rawData[9], m242 = lhs.rawData[13], m213 = lhs.rawData[2], m223 = lhs.rawData[6], m233 = lhs.rawData[10], m243 = lhs.rawData[14], m214 = lhs.rawData[3], m224 = lhs.rawData[7], m234 = lhs.rawData[11], m244 = lhs.rawData[15];
            this.rawData[0] = m111 - m211;
            this.rawData[1] = m112 - m212;
            this.rawData[2] = m113 - m213;
            this.rawData[3] = m114 - m214;
            this.rawData[4] = m121 - m221;
            this.rawData[5] = m122 - m222;
            this.rawData[6] = m123 - m223;
            this.rawData[7] = m124 - m224;
            this.rawData[8] = m131 - m231;
            this.rawData[9] = m132 - m232;
            this.rawData[10] = m133 - m233;
            this.rawData[11] = m134 - m234;
            this.rawData[12] = m141 - m241;
            this.rawData[13] = m142 - m242;
            this.rawData[14] = m143 - m243;
            this.rawData[15] = m144 - m244;
            return this;
        };
        /**
        * @language zh_CN
        * 矩阵乘分量.
        * @param v .
        * @returns 返回一个相乘后的结果 矩阵.
        */
        Matrix3D.prototype.mult = function (v) {
            this.rawData[0] *= v;
            this.rawData[1] *= v;
            this.rawData[2] *= v;
            this.rawData[3] *= v;
            this.rawData[4] *= v;
            this.rawData[5] *= v;
            this.rawData[6] *= v;
            this.rawData[7] *= v;
            this.rawData[8] *= v;
            this.rawData[9] *= v;
            this.rawData[10] *= v;
            this.rawData[11] *= v;
            this.rawData[12] *= v;
            this.rawData[13] *= v;
            this.rawData[14] *= v;
            this.rawData[15] *= v;
            return this;
        };
        /**
        * @language zh_CN
        * 创建一个欧拉旋转矩阵.
        * @param x 绕x轴旋转角度.
        * @param y 绕y轴旋转角度.
        * @param z 绕z轴旋转角度.
        */
        Matrix3D.prototype.rotation = function (x, y, z) {
            this.appendRotation(x, feng3d.Vector3D.X_AXIS);
            this.appendRotation(y, feng3d.Vector3D.Y_AXIS);
            this.appendRotation(z, feng3d.Vector3D.Z_AXIS);
        };
        /**
        * @language zh_CN
        * 当前矩阵乘 (按axis轴旋转degrees角度创建出来的矩阵)
        * @param degrees 旋转角度.
        * @param axis 绕axis轴旋转角度.
        */
        Matrix3D.prototype.appendRotation = function (degrees, axis) {
            var m = Matrix3D.getAxisRotation(axis.x, axis.y, axis.z, degrees);
            ///this.append(m);
            var tmp = new Matrix3D();
            var s, c;
            var angle = degrees * feng3d.Matrix3DUtils.DEGREES_TO_RADIANS;
            s = Math.sin(angle);
            c = Math.cos(angle);
            if (axis.x == 1) {
                tmp.rawData[0] = 1.0;
                tmp.rawData[1] = 0.0;
                tmp.rawData[2] = 0.0;
                tmp.rawData[3] = 0.0;
                tmp.rawData[4] = 0.0;
                tmp.rawData[5] = c;
                tmp.rawData[6] = s;
                tmp.rawData[7] = 0.0;
                tmp.rawData[8] = 0.0;
                tmp.rawData[9] = -s;
                tmp.rawData[10] = c;
                tmp.rawData[7] = 0.0;
                tmp.rawData[12] = 0.0;
                tmp.rawData[13] = 0.0;
                tmp.rawData[14] = 0.0;
                tmp.rawData[15] = 1.0;
            }
            if (axis.y == 1) {
                tmp.rawData[0] = c;
                tmp.rawData[1] = 0.0;
                tmp.rawData[2] = -s;
                tmp.rawData[3] = 0.0;
                tmp.rawData[4] = 0.0;
                tmp.rawData[5] = 1.0;
                tmp.rawData[6] = 0.0;
                tmp.rawData[7] = 0.0;
                tmp.rawData[8] = s;
                tmp.rawData[9] = 0.0;
                tmp.rawData[10] = c;
                tmp.rawData[11] = 0.0;
                tmp.rawData[12] = 0.0;
                tmp.rawData[13] = 0.0;
                tmp.rawData[14] = 0.0;
                tmp.rawData[15] = 1.0;
            }
            if (axis.z == 1) {
                tmp.rawData[0] = c;
                tmp.rawData[1] = s;
                tmp.rawData[2] = 0.0;
                tmp.rawData[3] = 0.0;
                tmp.rawData[4] = -s;
                tmp.rawData[5] = c;
                tmp.rawData[6] = 0.0;
                tmp.rawData[7] = 0.0;
                tmp.rawData[8] = 0.0;
                tmp.rawData[9] = 0.0;
                tmp.rawData[10] = 1.0;
                tmp.rawData[11] = 0.0;
                tmp.rawData[12] = 0.0;
                tmp.rawData[13] = 0.0;
                tmp.rawData[14] = 0.0;
                tmp.rawData[15] = 1.0;
            }
            this.append(tmp);
        };
        /**
        * @language zh_CN
        * 生成一个缩放矩阵
        * @param xScale x轴缩放
        * @param yScale y轴缩放
        * @param zScale z轴缩放
        */
        Matrix3D.prototype.appendScale = function (xScale, yScale, zScale) {
            this.rawData[0] = xScale;
            this.rawData[1] = 0.0;
            this.rawData[2] = 0.0;
            this.rawData[4] = 0.0;
            this.rawData[5] = yScale;
            this.rawData[6] = 0.0;
            this.rawData[8] = 0.0;
            this.rawData[9] = 0.0;
            this.rawData[10] = zScale;
        };
        /**
        * @language zh_CN
        * 加上一个平移矩阵
        * @param x x轴坐标
        * @param y y轴坐标
        * @param z z轴坐标
        */
        Matrix3D.prototype.appendTranslation = function (x, y, z) {
            this.rawData[12] += x;
            this.rawData[13] += y;
            this.rawData[14] += z;
        };
        /**
        * @language zh_CN
        * 返回一个当前矩阵的克隆矩阵
        * @returns 克隆后的矩阵
        */
        Matrix3D.prototype.clone = function () {
            var ret = new Matrix3D();
            ret.copyFrom(this);
            return ret;
        };
        /**
        * @language zh_CN
        * 给当前矩阵其中一行赋值
        * @param column 拷贝的行
        * @param vector3D 拷贝的值
        */
        Matrix3D.prototype.copyColumnFrom = function (column, vector3D) {
            switch (column) {
                case 0:
                    this.rawData[0] = vector3D.x;
                    this.rawData[1] = vector3D.y;
                    this.rawData[2] = vector3D.z;
                    this.rawData[3] = vector3D.w;
                    break;
                case 1:
                    this.rawData[4] = vector3D.x;
                    this.rawData[5] = vector3D.y;
                    this.rawData[6] = vector3D.z;
                    this.rawData[7] = vector3D.w;
                    break;
                case 2:
                    this.rawData[8] = vector3D.x;
                    this.rawData[9] = vector3D.y;
                    this.rawData[10] = vector3D.z;
                    this.rawData[11] = vector3D.w;
                    break;
                case 3:
                    this.rawData[12] = vector3D.x;
                    this.rawData[13] = vector3D.y;
                    this.rawData[14] = vector3D.z;
                    this.rawData[15] = vector3D.w;
                    break;
                default:
            }
        };
        /**
        * @language zh_CN
        * 拷贝矩阵中的其中一行 把值存在vector3D.
        * @param column 拷贝的行
        * @param vector3D 拷贝存值目标
        */
        Matrix3D.prototype.copyRowTo = function (column, vector3D) {
            switch (column) {
                case 0:
                    vector3D.x = this.rawData[0];
                    vector3D.y = this.rawData[1];
                    vector3D.z = this.rawData[2];
                    vector3D.w = this.rawData[3];
                    break;
                case 1:
                    vector3D.x = this.rawData[4];
                    vector3D.y = this.rawData[5];
                    vector3D.z = this.rawData[6];
                    vector3D.w = this.rawData[7];
                    break;
                case 2:
                    vector3D.x = this.rawData[8];
                    vector3D.y = this.rawData[9];
                    vector3D.z = this.rawData[10];
                    vector3D.w = this.rawData[11];
                    break;
                case 3:
                    vector3D.x = this.rawData[12];
                    vector3D.y = this.rawData[13];
                    vector3D.z = this.rawData[14];
                    vector3D.w = this.rawData[15];
                    break;
                default:
            }
        };
        /**
        * @language zh_CN
        * 把一个矩阵的值赋给当前矩阵.
        * @param sourceMatrix3D 源矩阵.
        * @returns 返回当前矩阵
        */
        Matrix3D.prototype.copyFrom = function (sourceMatrix3D) {
            var len = sourceMatrix3D.rawData.length;
            for (var c = 0; c < len; c++)
                this.rawData[c] = sourceMatrix3D.rawData[c];
            return this;
        };
        /**
        * @language zh_CN
        * 把一个 float 数组赋值给当前矩阵.
        * @param vector 源数组.
        * @param index 从数组的index 开始copy.
        * @param transpose 是否转置当前矩阵.
        */
        Matrix3D.prototype.copyRawDataFrom = function (vector, index, transpose) {
            if (index === void 0) { index = 0; }
            if (transpose === void 0) { transpose = false; }
            if (transpose)
                this.transpose();
            var len = vector.length - index;
            for (var c = 0; c < len; c++)
                this.rawData[c] = vector[c + index];
            if (transpose)
                this.transpose();
        };
        /**
        * @language zh_CN
        * 把当前矩阵的值拷贝给一个 float 数组.
        * @param vector 目标数组.
        * @param index 从数组的index 开始copy.
        * @param transpose 是否转置当前矩阵.
        */
        Matrix3D.prototype.copyRawDataTo = function (vector, index, transpose) {
            if (index === void 0) { index = 0; }
            if (transpose === void 0) { transpose = false; }
            if (transpose)
                this.transpose();
            var len = this.rawData.length;
            for (var c = 0; c < len; c++)
                vector[c + index] = this.rawData[c];
            if (transpose)
                this.transpose();
        };
        /**
        * @language zh_CN
        * 给当前矩阵的某一列 赋值
        * @param col 列
        * @param vector3D 值来源
        */
        Matrix3D.prototype.copyColFrom = function (col, vector3D) {
            switch (col) {
                case 0:
                    this.rawData[0] = vector3D.x;
                    this.rawData[4] = vector3D.y;
                    this.rawData[8] = vector3D.z;
                    this.rawData[12] = vector3D.w;
                    break;
                case 1:
                    this.rawData[1] = vector3D.x;
                    this.rawData[5] = vector3D.y;
                    this.rawData[9] = vector3D.z;
                    this.rawData[13] = vector3D.w;
                    break;
                case 2:
                    this.rawData[2] = vector3D.x;
                    this.rawData[6] = vector3D.y;
                    this.rawData[10] = vector3D.z;
                    this.rawData[14] = vector3D.w;
                    break;
                case 3:
                    this.rawData[3] = vector3D.x;
                    this.rawData[7] = vector3D.y;
                    this.rawData[11] = vector3D.z;
                    this.rawData[15] = vector3D.w;
                    break;
                default:
                    new Error("no more raw!");
            }
        };
        /**
        * @language zh_CN
        * 拷贝当前矩阵的某一列
        * @param col 列
        * @param vector3D 拷贝目标
        */
        Matrix3D.prototype.copyColTo = function (col, vector3D) {
            switch (col) {
                case 0:
                    vector3D.x = this.rawData[0];
                    vector3D.y = this.rawData[4];
                    vector3D.z = this.rawData[8];
                    vector3D.w = this.rawData[12];
                    break;
                case 1:
                    vector3D.x = this.rawData[1];
                    vector3D.y = this.rawData[5];
                    vector3D.z = this.rawData[9];
                    vector3D.w = this.rawData[13];
                    break;
                case 2:
                    vector3D.x = this.rawData[2];
                    vector3D.y = this.rawData[6];
                    vector3D.z = this.rawData[10];
                    vector3D.w = this.rawData[14];
                    break;
                case 3:
                    vector3D.x = this.rawData[3];
                    vector3D.y = this.rawData[7];
                    vector3D.z = this.rawData[11];
                    vector3D.w = this.rawData[15];
                    break;
                default:
                    new Error("no more raw!");
            }
        };
        /**
        * @language zh_CN
        * 拷贝当前矩阵
        * @param dest 拷贝目标
        */
        Matrix3D.prototype.copyToMatrix3D = function (dest) {
            dest.rawData = this.rawData.slice(0);
        };
        /**
        * @language zh_CN
        * 分解当前矩阵
        * @param orientationStyle 分解类型
        * @returns Vector3D[3] pos rot scale
        */
        Matrix3D.prototype.decompose = function (orientationStyle) {
            if (orientationStyle === void 0) { orientationStyle = "eulerAngles"; }
            var q;
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
            switch (orientationStyle) {
                case feng3d.Orientation3D.AXIS_ANGLE:
                    rot.w = Math.acos((mr[0] + mr[5] + mr[10] - 1) / 2);
                    var len = Math.sqrt((mr[6] - mr[9]) * (mr[6] - mr[9]) + (mr[8] - mr[2]) * (mr[8] - mr[2]) + (mr[1] - mr[4]) * (mr[1] - mr[4]));
                    rot.x = (mr[6] - mr[9]) / len;
                    rot.y = (mr[8] - mr[2]) / len;
                    rot.z = (mr[1] - mr[4]) / len;
                    break;
                case feng3d.Orientation3D.QUATERNION:
                    var tr = mr[0] + mr[5] + mr[10];
                    if (tr > 0) {
                        rot.w = Math.sqrt(1 + tr) / 2;
                        rot.x = (mr[6] - mr[9]) / (4 * rot.w);
                        rot.y = (mr[8] - mr[2]) / (4 * rot.w);
                        rot.z = (mr[1] - mr[4]) / (4 * rot.w);
                    }
                    else if ((mr[0] > mr[5]) && (mr[0] > mr[10])) {
                        rot.x = Math.sqrt(1 + mr[0] - mr[5] - mr[10]) / 2;
                        rot.w = (mr[6] - mr[9]) / (4 * rot.x);
                        rot.y = (mr[1] + mr[4]) / (4 * rot.x);
                        rot.z = (mr[8] + mr[2]) / (4 * rot.x);
                    }
                    else if (mr[5] > mr[10]) {
                        rot.y = Math.sqrt(1 + mr[5] - mr[0] - mr[10]) / 2;
                        rot.x = (mr[1] + mr[4]) / (4 * rot.y);
                        rot.w = (mr[8] - mr[2]) / (4 * rot.y);
                        rot.z = (mr[6] + mr[9]) / (4 * rot.y);
                    }
                    else {
                        rot.z = Math.sqrt(1 + mr[10] - mr[0] - mr[5]) / 2;
                        rot.x = (mr[8] + mr[2]) / (4 * rot.z);
                        rot.y = (mr[6] + mr[9]) / (4 * rot.z);
                        rot.w = (mr[1] - mr[4]) / (4 * rot.z);
                    }
                    break;
                case feng3d.Orientation3D.EULER_ANGLES:
                    rot.y = Math.asin(-mr[2]);
                    if (mr[2] != 1 && mr[2] != -1) {
                        rot.x = Math.atan2(mr[6], mr[10]);
                        rot.z = Math.atan2(mr[1], mr[0]);
                    }
                    else {
                        rot.z = 0;
                        rot.x = Math.atan2(mr[4], mr[5]);
                    }
                    break;
            }
            vec.push(pos);
            vec.push(rot);
            vec.push(scale);
            return vec;
        };
        /**
        * @language zh_CN
        * 当前矩阵变换一个向量
        * @param v 要变换的向量
        * @returns 变换后的向量
        */
        Matrix3D.prototype.deltaTransformVector = function (v) {
            var x = v.x;
            var y = v.y;
            var z = v.z;
            return new feng3d.Vector3D((x * this.rawData[0] + y * this.rawData[4] + z * this.rawData[8]), (x * this.rawData[1] + y * this.rawData[5] + z * this.rawData[9]), (x * this.rawData[2] + y * this.rawData[6] + z * this.rawData[10]), (x * this.rawData[3] + y * this.rawData[7] + z * this.rawData[11]));
        };
        /**
        * @language zh_CN
        * 单位化当前矩阵
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
        * @language zh_CN
        * 填充当前矩阵
        * @param value 填充的值
        */
        Matrix3D.prototype.fill = function (value) {
            this.rawData[1] = value;
            this.rawData[2] = value;
            this.rawData[3] = value;
            this.rawData[4] = value;
            this.rawData[6] = value;
            this.rawData[7] = value;
            this.rawData[8] = value;
            this.rawData[9] = value;
            this.rawData[11] = value;
            this.rawData[12] = value;
            this.rawData[13] = value;
            this.rawData[14] = value;
            this.rawData[0] = value;
            this.rawData[5] = value;
            this.rawData[10] = value;
            this.rawData[15] = value;
        };
        /**
        * @language zh_CN
        * 当前矩阵求逆
        */
        Matrix3D.prototype.invers33 = function () {
            /// Invert a 3x3 using cofactors.  This is about 8 times faster than
            /// the Numerical Recipes code which uses Gaussian elimination.
            var rkInverse_00 = this.rawData[5] * this.rawData[10] - this.rawData[9] * this.rawData[6];
            var rkInverse_01 = this.rawData[8] * this.rawData[6] - this.rawData[4] * this.rawData[10];
            var rkInverse_02 = this.rawData[4] * this.rawData[9] - this.rawData[8] * this.rawData[5];
            var rkInverse_10 = this.rawData[9] * this.rawData[2] - this.rawData[1] * this.rawData[10];
            var rkInverse_11 = this.rawData[0] * this.rawData[10] - this.rawData[8] * this.rawData[2];
            var rkInverse_12 = this.rawData[8] * this.rawData[1] - this.rawData[0] * this.rawData[9];
            var rkInverse_20 = this.rawData[1] * this.rawData[6] - this.rawData[5] * this.rawData[2];
            var rkInverse_21 = this.rawData[4] * this.rawData[2] - this.rawData[0] * this.rawData[6];
            var rkInverse_22 = this.rawData[0] * this.rawData[5] - this.rawData[4] * this.rawData[1];
            var fDet = this.rawData[0] * rkInverse_00 +
                this.rawData[4] * rkInverse_10 +
                this.rawData[8] * rkInverse_20;
            if (Math.abs(fDet) > 0.00000000001) {
                var fInvDet = 1.0 / fDet;
                this.rawData[0] = fInvDet * rkInverse_00;
                this.rawData[4] = fInvDet * rkInverse_01;
                this.rawData[8] = fInvDet * rkInverse_02;
                this.rawData[1] = fInvDet * rkInverse_10;
                this.rawData[5] = fInvDet * rkInverse_11;
                this.rawData[9] = fInvDet * rkInverse_12;
                this.rawData[2] = fInvDet * rkInverse_20;
                this.rawData[6] = fInvDet * rkInverse_21;
                this.rawData[10] = fInvDet * rkInverse_22;
            }
        };
        /**
        * @language zh_CN
        * 当前矩阵求逆
        * @returns 是否能求逆
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
        * @language zh_CN
        * 生成一个变换矩阵
        * @param pos  位移
        * @param scale 缩放
        * @param rot 旋转
        */
        Matrix3D.prototype.makeTransform = function (pos, scale, rot) {
            rot.toMatrix3D(feng3d.Matrix3DUtils.CALCULATION_MATRIX);
            this.rawData[0] = feng3d.Matrix3DUtils.CALCULATION_MATRIX.rawData[0] * scale.x;
            this.rawData[1] = feng3d.Matrix3DUtils.CALCULATION_MATRIX.rawData[1] * scale.y;
            this.rawData[2] = feng3d.Matrix3DUtils.CALCULATION_MATRIX.rawData[2] * scale.z;
            this.rawData[3] = 0;
            this.rawData[4] = feng3d.Matrix3DUtils.CALCULATION_MATRIX.rawData[4] * scale.x;
            this.rawData[5] = feng3d.Matrix3DUtils.CALCULATION_MATRIX.rawData[5] * scale.y;
            this.rawData[6] = feng3d.Matrix3DUtils.CALCULATION_MATRIX.rawData[6] * scale.z;
            this.rawData[7] = 0;
            this.rawData[8] = feng3d.Matrix3DUtils.CALCULATION_MATRIX.rawData[8] * scale.x;
            this.rawData[9] = feng3d.Matrix3DUtils.CALCULATION_MATRIX.rawData[9] * scale.y;
            this.rawData[10] = feng3d.Matrix3DUtils.CALCULATION_MATRIX.rawData[10] * scale.z;
            this.rawData[11] = 0;
            this.rawData[12] = pos.x;
            this.rawData[13] = pos.y;
            this.rawData[14] = pos.z;
            this.rawData[15] = 1;
        };
        /**
        * @language zh_CN
        * 生成一个变换矩阵
        * @param components Vector3D[3] 位移 旋转 缩放
        * @returns 生成是否成功
        */
        Matrix3D.prototype.recompose = function (components) {
            if (components.length < 3)
                return false;
            this.identity();
            this.appendScale(components[2].x, components[2].y, components[2].z);
            var angle;
            angle = -components[1].x * feng3d.Matrix3DUtils.DEGREES_TO_RADIANS;
            feng3d.Matrix3DUtils.CALCULATION_MATRIX.copyRawDataFrom([1, 0, 0, 0, 0, Math.cos(angle), -Math.sin(angle), 0, 0, Math.sin(angle), Math.cos(angle), 0, 0, 0, 0, 0]);
            this.append(feng3d.Matrix3DUtils.CALCULATION_MATRIX);
            angle = -components[1].y * feng3d.Matrix3DUtils.DEGREES_TO_RADIANS;
            feng3d.Matrix3DUtils.CALCULATION_MATRIX.copyRawDataFrom([Math.cos(angle), 0, Math.sin(angle), 0, 0, 1, 0, 0, -Math.sin(angle), 0, Math.cos(angle), 0, 0, 0, 0, 0]);
            this.append(feng3d.Matrix3DUtils.CALCULATION_MATRIX);
            angle = -components[1].z * feng3d.Matrix3DUtils.DEGREES_TO_RADIANS;
            feng3d.Matrix3DUtils.CALCULATION_MATRIX.copyRawDataFrom([Math.cos(angle), -Math.sin(angle), 0, 0, Math.sin(angle), Math.cos(angle), 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]);
            this.append(feng3d.Matrix3DUtils.CALCULATION_MATRIX);
            this.rawData[12] = components[0].x;
            this.rawData[13] = components[0].y;
            this.rawData[14] = components[0].z;
            this.rawData[15] = 1;
            return true;
        };
        /**
        * @language zh_CN
        * 用当前矩阵变换一个3D向量
        * @param v 变换的向量
        * @returns 变换后的向量
        */
        Matrix3D.prototype.transformVector = function (v) {
            if (v == null)
                return new feng3d.Vector3D();
            var x = v.x;
            var y = v.y;
            var z = v.z;
            var out = new feng3d.Vector3D();
            out.x = x * this.rawData[0] + y * this.rawData[4] + z * this.rawData[8] + this.rawData[12];
            out.y = x * this.rawData[1] + y * this.rawData[5] + z * this.rawData[9] + this.rawData[13];
            out.z = x * this.rawData[2] + y * this.rawData[6] + z * this.rawData[10] + this.rawData[14];
            out.w = x * this.rawData[3] + y * this.rawData[7] + z * this.rawData[11] + this.rawData[15];
            return out;
        };
        /**
        * @language zh_CN
        * 当前矩阵转置
        */
        Matrix3D.prototype.transpose = function () {
            for (var i = 0; i < this.oRawData.length; i++) {
                this.oRawData[i] = this.rawData[i];
            }
            this.rawData[1] = this.oRawData[4];
            this.rawData[2] = this.oRawData[8];
            this.rawData[3] = this.oRawData[12];
            this.rawData[4] = this.oRawData[1];
            this.rawData[6] = this.oRawData[9];
            this.rawData[7] = this.oRawData[13];
            this.rawData[8] = this.oRawData[2];
            this.rawData[9] = this.oRawData[6];
            this.rawData[11] = this.oRawData[14];
            this.rawData[12] = this.oRawData[3];
            this.rawData[13] = this.oRawData[7];
            this.rawData[14] = this.oRawData[11];
        };
        /**
        * @language zh_CN
        * 生成一个(以x,y,z为中心轴旋转degrees角度)的矩阵
        * @param x 中心轴的x
        * @param y 中心轴的y
        * @param z 中心轴的z
        * @param degrees 旋转角度
        */
        Matrix3D.getAxisRotation = function (x, y, z, degrees) {
            var m = new Matrix3D();
            var rad = degrees * (Math.PI / 180);
            var c = Math.cos(rad);
            var s = Math.sin(rad);
            var t = 1 - c;
            var tmp1, tmp2;
            m.rawData[0] = c + x * x * t;
            m.rawData[5] = c + y * y * t;
            m.rawData[10] = c + z * z * t;
            tmp1 = x * y * t;
            tmp2 = z * s;
            m.rawData[1] = tmp1 + tmp2;
            m.rawData[4] = tmp1 - tmp2;
            tmp1 = x * z * t;
            tmp2 = y * s;
            m.rawData[8] = tmp1 + tmp2;
            m.rawData[2] = tmp1 - tmp2;
            tmp1 = y * z * t;
            tmp2 = x * s;
            m.rawData[9] = tmp1 - tmp2;
            m.rawData[6] = tmp1 + tmp2;
            return m;
        };
        Object.defineProperty(Matrix3D.prototype, "determinant", {
            /**
            * @language zh_CN
            * 返回矩阵行列式
            *
            * @returns 行列式值
            */
            get: function () {
                return ((this.rawData[0] * this.rawData[5] - this.rawData[4] * this.rawData[1]) * (this.rawData[10] * this.rawData[15] - this.rawData[14] * this.rawData[11]) - (this.rawData[0] * this.rawData[9] - this.rawData[8] * this.rawData[1]) * (this.rawData[6] * this.rawData[15] - this.rawData[14] * this.rawData[7]) + (this.rawData[0] * this.rawData[13] - this.rawData[12] * this.rawData[1]) * (this.rawData[6] * this.rawData[11] - this.rawData[10] * this.rawData[7]) + (this.rawData[4] * this.rawData[9] - this.rawData[8] * this.rawData[5]) * (this.rawData[2] * this.rawData[15] - this.rawData[14] * this.rawData[3]) - (this.rawData[4] * this.rawData[13] - this.rawData[12] * this.rawData[5]) * (this.rawData[2] * this.rawData[11] - this.rawData[10] * this.rawData[3]) + (this.rawData[8] * this.rawData[13] - this.rawData[12] * this.rawData[9]) * (this.rawData[2] * this.rawData[7] - this.rawData[6] * this.rawData[3]));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Matrix3D.prototype, "scale", {
            /**
            * @language zh_CN
            * 返回矩阵缩放
            *
            * @returns 缩放
            */
            get: function () {
                return new feng3d.Vector3D(this.rawData[0], this.rawData[5], this.rawData[10]);
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @language zh_CN
        * 以字符串返回矩阵的值
        *
        * @returns 字符
        */
        Matrix3D.prototype.toString = function () {
            return "matrix3d(" + Math.round(this.rawData[0] * 1000) / 1000 + "," + Math.round(this.rawData[1] * 1000) / 1000 + "," + Math.round(this.rawData[2] * 1000) / 1000 + "," + Math.round(this.rawData[3] * 1000) / 1000 + "," + Math.round(this.rawData[4] * 1000) / 1000 + "," + Math.round(this.rawData[5] * 1000) / 1000 + "," + Math.round(this.rawData[6] * 1000) / 1000 + "," + Math.round(this.rawData[7] * 1000) / 1000 + "," + Math.round(this.rawData[8] * 1000) / 1000 + "," + Math.round(this.rawData[9] * 1000) / 1000 + "," + Math.round(this.rawData[10] * 1000) / 1000 + "," + Math.round(this.rawData[11] * 1000) / 1000 + "," + Math.round(this.rawData[12] * 1000) / 1000 + "," + Math.round(this.rawData[13] * 1000) / 1000 + "," + Math.round(this.rawData[14] * 1000) / 1000 + "," + Math.round(this.rawData[15] * 1000) / 1000 + ")";
        };
        /**
        * @language zh_CN
        * 求两个矩阵之间的差值
        * @param m0 矩阵0
        * @param m1 矩阵1
        * @param t 时间差 0.0 - 1.0
        */
        Matrix3D.prototype.lerp = function (m0, m1, t) {
            ///t(m1 - m0) + m0
            this.copyFrom(m1).sub(m0).mult(t).add(m0);
        };
        return Matrix3D;
    }());
    feng3d.Matrix3D = Matrix3D;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
    * @language zh_CN
    * @class egret3d.Matrix3DUtils
    * @classdesc
    * 可使用 Matrix3DUtils 类 进行3d矩阵的计算
    * @version Egret 3.0
    * @platform Web,Native
    */
    var Matrix3DUtils = (function () {
        function Matrix3DUtils() {
        }
        /**
        * @language zh_CN
        * 四元数转矩阵
        * @param quarternion 源四元数
        * @param m 目标矩阵
        * @returns 返回转出矩阵
        */
        Matrix3DUtils.quaternion2matrix = function (quarternion, m) {
            if (m === void 0) { m = null; }
            var x = quarternion.x;
            var y = quarternion.y;
            var z = quarternion.z;
            var w = quarternion.w;
            var xx = x * x;
            var xy = x * y;
            var xz = x * z;
            var xw = x * w;
            var yy = y * y;
            var yz = y * z;
            var yw = y * w;
            var zz = z * z;
            var zw = z * w;
            var raw = Matrix3DUtils.RAW_DATA_CONTAINER;
            raw[0] = 1 - 2 * (yy + zz);
            raw[1] = 2 * (xy + zw);
            raw[2] = 2 * (xz - yw);
            raw[4] = 2 * (xy - zw);
            raw[5] = 1 - 2 * (xx + zz);
            raw[6] = 2 * (yz + xw);
            raw[8] = 2 * (xz + yw);
            raw[9] = 2 * (yz - xw);
            raw[10] = 1 - 2 * (xx + yy);
            raw[3] = raw[7] = raw[11] = raw[12] = raw[13] = raw[14] = 0;
            raw[15] = 1;
            if (m) {
                m.copyRawDataFrom(raw);
                return m;
            }
            else
                return new feng3d.Matrix3D(raw);
        };
        /**
        * @language zh_CN
        * 得到矩阵朝前的方向
        * @param m 源矩阵
        * @param v 返回的方向 可为null
        * @returns 返回方向
        */
        Matrix3DUtils.getForward = function (m, v) {
            if (v === void 0) { v = null; }
            if (v === null) {
                v = new feng3d.Vector3D(0.0, 0.0, 0.0);
            }
            m.copyRowTo(2, v);
            v.normalize();
            return v;
        };
        /**
        * @language zh_CN
        * 得到矩阵朝上的方向
        * @param m 源矩阵
        * @param v 返回的方向 可为null
        * @returns 返回方向
        */
        Matrix3DUtils.getUp = function (m, v) {
            //v ||= new Vector3D(0.0, 0.0, 0.0);
            if (v === void 0) { v = null; }
            if (v === null) {
                v = new feng3d.Vector3D(0.0, 0.0, 0.0);
            }
            m.copyRowTo(1, v);
            v.normalize();
            return v;
        };
        /**
        * @language zh_CN
        * 得到矩阵朝右的方向
        * @param m 源矩阵
        * @param v 返回的方向 可为null
        * @returns 返回方向
        */
        Matrix3DUtils.getRight = function (m, v) {
            if (v === void 0) { v = null; }
            //v ||= new Vector3D(0.0, 0.0, 0.0);
            if (v === null) {
                v = new feng3d.Vector3D(0.0, 0.0, 0.0);
            }
            m.copyRowTo(0, v);
            v.normalize();
            return v;
        };
        /**
        * @language zh_CN
        * 比较两个矩阵是否相同
        * @param m1 矩阵1
        * @param m2 矩阵2
        * @returns 相同返回true
        */
        Matrix3DUtils.compare = function (m1, m2) {
            var r1 = Matrix3DUtils.RAW_DATA_CONTAINER;
            var r2 = m2.rawData;
            m1.copyRawDataTo(r1);
            for (var i = 0; i < 16; ++i) {
                if (r1[i] != r2[i])
                    return false;
            }
            return true;
        };
        /**
        * @language zh_CN
        * 得到矩阵的平移
        * @param transform 计算的矩阵
        * @param result 计算返回平移坐标
        * @returns 返回平移坐标
        */
        Matrix3DUtils.getTranslation = function (transform, result) {
            if (result === void 0) { result = null; }
            if (!result)
                result = new feng3d.Vector3D();
            transform.copyRowTo(3, result);
            return result;
        };
        /**
        * @language zh_CN
        * 把一个值固定在一个范围之内
        * @param value 当前判定的值
        * @param min_inclusive 最小取值
        * @param max_inclusive 最大取值
        * @returns 计算后的结果
        */
        Matrix3DUtils.clampf = function (value, min_inclusive, max_inclusive) {
            if (min_inclusive > max_inclusive) {
                var temp = min_inclusive;
                min_inclusive = max_inclusive;
                max_inclusive = temp;
            }
            return value < min_inclusive ? min_inclusive : value < max_inclusive ? value : max_inclusive;
        };
        /**
        * @language zh_CN
        * 1弧度为多少角度
        */
        Matrix3DUtils.RADIANS_TO_DEGREES = 180 / Math.PI;
        /**
        * @language zh_CN
        * 1角度为多少弧度
        */
        Matrix3DUtils.DEGREES_TO_RADIANS = Math.PI / 180;
        /**
        * @private
        * 1角度为多少弧度
        */
        Matrix3DUtils.RAW_DATA_CONTAINER = new Array(16);
        /**
        * @private
        */
        Matrix3DUtils.CALCULATION_MATRIX = new feng3d.Matrix3D();
        return Matrix3DUtils;
    }());
    feng3d.Matrix3DUtils = Matrix3DUtils;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * @language zh_CN
     * @class egret3d.Orientation3D
     * @classdesc
     * 定义 Orientation3D 常量。</p>
     * Matrix4_4.decompose 会分 axisAngle、eulerAngles、quaternion这3种类型进行分解。</p>
     * 比如:</p>
     <pre>
     matrix.decompose(Orientation3D.QUATERNION)
     </pre>
     *
     * @see egret3d.Matrix4_4
     * @see egret3d.Quaternion
     *
     * @version Egret 3.0
     * @platform Web,Native
     */
    var Orientation3D = (function () {
        function Orientation3D() {
        }
        /**
        * @language zh_CN
        * 按轴旋转角度
        * @version Egret 3.0
        * @platform Web,Native
        */
        Orientation3D.AXIS_ANGLE = "axisAngle";
        /**
        * @language zh_CN
        * 按欧拉角旋转角度
        * @version Egret 3.0
        * @platform Web,Native
        */
        Orientation3D.EULER_ANGLES = "eulerAngles";
        /**
        * @language zh_CN
        * 四元数旋转角度
        * @version Egret 3.0
        * @platform Web,Native
        */
        Orientation3D.QUATERNION = "quaternion";
        return Orientation3D;
    }());
    feng3d.Orientation3D = Orientation3D;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * @language zh_CN
     * @class egret3d.Quaternion
     * @classdesc
     * Quaternion类
     *
     * 定义了一个四元数表示物体在空间的旋转。
     * 四元数通常用作替代欧拉角和旋转矩阵的方式来实现平滑插值和避免万向节锁
     * 注意，这四元数类不自动保持四元数标准化。因此，在必要的时候，必须采取单位化的四元数，通过调用单位化方法
     * @version Egret 3.0
     * @platform Web,Native
     */
    var Quaternion = (function () {
        /**
        * @language en_US
        * Creates a new Quaternion object.
        * @param x The x value of the quaternion.
        * @param y The y value of the quaternion.
        * @param z The z value of the quaternion.
        * @param w The w value of the quaternion.
        */
        /**
        * @language zh_CN
        * 创建一个四元数.
        * @param x
        * @param y
        * @param z
        * @param w
        */
        function Quaternion(x, y, z, w) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            if (w === void 0) { w = 1; }
            /**
            * @language en_US
            * The x value of the quaternion.
            */
            /**
            * @language zh_CN
            * 四元数的x值.
            */
            this.x = 0;
            /**
            * @language en_US
            * The y value of the quaternion.
            */
            /**
            * @language zh_CN
            * 四元数的y值.
            */
            this.y = 0;
            /**
            * @language en_US
            * The z value of the quaternion.
            */
            /**
            * @language zh_CN
            * 四元数的z值.
            */
            this.z = 0;
            /**
            * @language en_US
            * The w value of the quaternion.
            */
            /**
            * @language zh_CN
            * 四元数的w值.
            */
            this.w = 1;
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
        }
        Object.defineProperty(Quaternion.prototype, "magnitude", {
            /**
            * @language en_US
            *
            * @returns the magnitude of the quaternion object.
            */
            /**
            * @language zh_CN
            *
            * 返回四元数的大小.
            * @param w
            * @returns 四元数的大小.
            */
            get: function () {
                return Math.sqrt(this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z);
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @language en_US
        * Fills the quaternion object with the result from a multiplication of two quaternion objects.
        *
        * @param    qa    The first quaternion in the multiplication.
        * @param    qb    The second quaternion in the multiplication.
        */
        /**
        * @language zh_CN
        * 两个四元数相乘,然后结果给当调用者.
        * @param qa 第一个四元数
        * @param qb 第二个四元数
        */
        Quaternion.prototype.multiply = function (qa, qb) {
            var w1 = qa.w, x1 = qa.x, y1 = qa.y, z1 = qa.z;
            var w2 = qb.w, x2 = qb.x, y2 = qb.y, z2 = qb.z;
            this.w = w1 * w2 - x1 * x2 - y1 * y2 - z1 * z2;
            this.x = w1 * x2 + x1 * w2 + y1 * z2 - z1 * y2;
            this.y = w1 * y2 - x1 * z2 + y1 * w2 + z1 * x2;
            this.z = w1 * z2 + x1 * y2 - y1 * x2 + z1 * w2;
        };
        /**
        * @language zh_CN
        * 四元数乘以一个3维向量，结果返回一个四元数
        * @param vector 相乘的向量
        * @param target 返回的结果，如果为null就会实例化一个四元数对象返回
        * @returns 返回相乘后的结果
        */
        Quaternion.prototype.multiplyVector = function (vector, target) {
            if (target === void 0) { target = null; }
            if (target === null) {
                target = new Quaternion();
            }
            var x2 = vector.x;
            var y2 = vector.y;
            var z2 = vector.z;
            target.w = -this.x * x2 - this.y * y2 - this.z * z2;
            target.x = this.w * x2 + this.y * z2 - this.z * y2;
            target.y = this.w * y2 - this.x * z2 + this.z * x2;
            target.z = this.w * z2 + this.x * y2 - this.y * x2;
            return target;
        };
        /**
        * @language en_US
        * Fills the quaternion object with values representing the given rotation around a vector.
        *
        * @param    axis    The axis around which to rotate
        * @param    angle    The angle in radians of the rotation.
        */
        /**
        * @language zh_CN
        * 创建一个以axis轴为中心旋转angle角度的四元数
        *
        * @param axis   旋转轴
        * @param angle  旋转角度
        */
        Quaternion.prototype.fromAxisAngle = function (axis, angle) {
            angle *= Math.PI / 180.0;
            var halfAngle = angle * 0.5;
            var sin_a = Math.sin(halfAngle);
            this.w = Math.cos(halfAngle);
            this.x = axis.x * sin_a;
            this.y = axis.y * sin_a;
            this.z = axis.z * sin_a;
            this.normalize();
        };
        /**
        * @language zh_CN
        * 返回四元数绕轴心和角度
        *
        * @param axis 轴心
        * @returns 角度
        */
        Quaternion.prototype.toAxisAngle = function (axis) {
            var sqrLength = this.x * this.x + this.y * this.y + this.z * this.z;
            var angle = 0;
            if (sqrLength > 0.0) {
                angle = 2.0 * Math.acos(this.w);
                sqrLength = 1.0 / Math.sqrt(sqrLength);
                axis.x = this.x * sqrLength;
                axis.y = this.y * sqrLength;
                axis.z = this.z * sqrLength;
            }
            else {
                angle = 0;
                axis.x = 1.0;
                axis.y = 0;
                axis.z = 0;
            }
            angle /= Math.PI / 180.0;
            return angle;
        };
        /**
        * @language en_US
        * Spherically interpolates between two quaternions, providing an interpolation between rotations with constant angle change rate.
        * @param qa The first quaternion to interpolate.
        * @param qb The second quaternion to interpolate.
        * @param t The interpolation weight, a value between 0 and 1.
        */
        /**
        * @language zh_CN
        * 两个四元数之间球形插值，插值之间提供旋转恒定角变化率。
        *
        * @param qa 四元数1
        * @param qb 四元数2
        * @param t 差值时刻
        */
        Quaternion.prototype.slerp = function (qa, qb, t) {
            var w1 = qa.w, x1 = qa.x, y1 = qa.y, z1 = qa.z;
            var w2 = qb.w, x2 = qb.x, y2 = qb.y, z2 = qb.z;
            var dot = w1 * w2 + x1 * x2 + y1 * y2 + z1 * z2;
            // shortest direction
            if (dot < 0) {
                dot = -dot;
                w2 = -w2;
                x2 = -x2;
                y2 = -y2;
                z2 = -z2;
            }
            if (dot < 0.95) {
                // interpolate angle linearly
                var angle = Math.acos(dot);
                var s = 1 / Math.sin(angle);
                var s1 = Math.sin(angle * (1 - t)) * s;
                var s2 = Math.sin(angle * t) * s;
                this.w = w1 * s1 + w2 * s2;
                this.x = x1 * s1 + x2 * s2;
                this.y = y1 * s1 + y2 * s2;
                this.z = z1 * s1 + z2 * s2;
            }
            else {
                // nearly identical angle, interpolate linearly
                this.w = w1 + t * (w2 - w1);
                this.x = x1 + t * (x2 - x1);
                this.y = y1 + t * (y2 - y1);
                this.z = z1 + t * (z2 - z1);
                var len = 1.0 / Math.sqrt(this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z);
                this.w *= len;
                this.x *= len;
                this.y *= len;
                this.z *= len;
            }
        };
        /**
        * @language en_US
        * Linearly interpolates between two quaternions.
        * @param qa The first quaternion to interpolate.
        * @param qb The second quaternion to interpolate.
        * @param t The interpolation weight, a value between 0 and 1.
        */
        /**
        * @language zh_CN
        * 两个四元数之间的线性插值
        *
        * @param qa 四元数1
        * @param qb 四元数2
        * @param t 差值时刻
        */
        Quaternion.prototype.lerp = function (qa, qb, t) {
            var w1 = qa.w, x1 = qa.x, y1 = qa.y, z1 = qa.z;
            var w2 = qb.w, x2 = qb.x, y2 = qb.y, z2 = qb.z;
            var len;
            // shortest direction
            if (w1 * w2 + x1 * x2 + y1 * y2 + z1 * z2 < 0) {
                w2 = -w2;
                x2 = -x2;
                y2 = -y2;
                z2 = -z2;
            }
            this.w = w1 + t * (w2 - w1);
            this.x = x1 + t * (x2 - x1);
            this.y = y1 + t * (y2 - y1);
            this.z = z1 + t * (z2 - z1);
            len = 1.0 / Math.sqrt(this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z);
            this.w *= len;
            this.x *= len;
            this.y *= len;
            this.z *= len;
        };
        /**
        * @language en_US
        * Fills the quaternion object with values representing the given euler rotation.
        *
        * @param    ax        The angle in radians of the rotation around the ax axis.
        * @param    ay        The angle in radians of the rotation around the ay axis.
        * @param    az        The angle in radians of the rotation around the az axis.
        */
        /**
        * @language zh_CN
        * 用数值表示给定的欧拉旋转填充四元数对象。
        *
        * @param ax x轴旋转角度
        * @param ay y轴旋转角度
        * @param az z轴旋转角度
        */
        Quaternion.prototype.fromEulerAngles = function (ax, ay, az) {
            ax *= feng3d.Matrix3DUtils.DEGREES_TO_RADIANS;
            ay *= feng3d.Matrix3DUtils.DEGREES_TO_RADIANS;
            az *= feng3d.Matrix3DUtils.DEGREES_TO_RADIANS;
            var halfX = ax * 0.5, halfY = ay * 0.5, halfZ = az * 0.5;
            var cosX = Math.cos(halfX), sinX = Math.sin(halfX);
            var cosY = Math.cos(halfY), sinY = Math.sin(halfY);
            var cosZ = Math.cos(halfZ), sinZ = Math.sin(halfZ);
            this.w = cosX * cosY * cosZ + sinX * sinY * sinZ;
            this.x = sinX * cosY * cosZ - cosX * sinY * sinZ;
            this.y = cosX * sinY * cosZ + sinX * cosY * sinZ;
            this.z = cosX * cosY * sinZ - sinX * sinY * cosZ;
            return this;
        };
        /**
        * @language en_US
        * Fills a target Vector3D object with the Euler angles that form the rotation represented by this quaternion.
        * @param target An optional Vector3D object to contain the Euler angles. If not provided, a new object is created.
        * @returns The Vector3D containing the Euler angles.
        */
        /**
        * @language zh_CN
        * 把四元数转成欧拉角返回
        *
        * @param target 转成的欧拉返回值，如果为null就新建一个对象返回
        * @retruns 转成的欧拉返回值
        */
        Quaternion.prototype.toEulerAngles = function (target) {
            if (target === void 0) { target = null; }
            if (target === null) {
                target = new feng3d.Vector3D();
            }
            target.x = Math.atan2(2.0 * (this.w * this.x + this.y * this.z), 1.0 - 2.0 * (this.x * this.x + this.y * this.y));
            var temp = 2.0 * (this.w * this.y - this.z * this.x);
            temp = feng3d.Matrix3DUtils.clampf(temp, -1.0, 1.0);
            target.y = Math.asin(temp);
            target.z = Math.atan2(2.0 * (this.w * this.z + this.x * this.y), 1.0 - 2.0 * (this.y * this.y + this.z * this.z));
            target.x /= feng3d.Matrix3DUtils.DEGREES_TO_RADIANS;
            target.y /= feng3d.Matrix3DUtils.DEGREES_TO_RADIANS;
            target.z /= feng3d.Matrix3DUtils.DEGREES_TO_RADIANS;
            return target;
        };
        /**
        * @language en_US
        * Normalises the quaternion object.
        */
        /**
        * @language zh_CN
        * 单位化四元数
        */
        Quaternion.prototype.normalize = function (val) {
            if (val === void 0) { val = 1; }
            var mag = val / Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
            this.x *= mag;
            this.y *= mag;
            this.z *= mag;
            this.w *= mag;
        };
        /**
        * @language en_US
        * Used to trace the values of a quaternion.
        *
        * @returns A string representation of the quaternion object.
        */
        /**
        * @language zh_CN
        * 以字符串形式返回四元数的值
        * @returns
        */
        Quaternion.prototype.toString = function () {
            return "{x:" + this.x + " y:" + this.y + " z:" + this.z + " w:" + this.w + "}";
        };
        /**
        * @language en_US
        * Converts the quaternion to a Matrix3D object representing an equivalent rotation.
        * @param target An optional Matrix3D container to store the transformation in. If not provided, a new object is created.
        * @returns A Matrix3D object representing an equivalent rotation.
        */
        /**
        * @language zh_CN
        * 把一个四元数转换成矩阵
        * @param target 返回转换后的矩阵，如果为null就新建一个对象返回
        * @see egret3d.Matrix3D
        * @returns 返回转换后的矩阵
        */
        Quaternion.prototype.toMatrix3D = function (target) {
            if (target === void 0) { target = null; }
            var rawData = feng3d.Matrix3DUtils.RAW_DATA_CONTAINER;
            var xy2 = 2.0 * this.x * this.y, xz2 = 2.0 * this.x * this.z, xw2 = 2.0 * this.x * this.w;
            var yz2 = 2.0 * this.y * this.z, yw2 = 2.0 * this.y * this.w, zw2 = 2.0 * this.z * this.w;
            var xx = this.x * this.x, yy = this.y * this.y, zz = this.z * this.z, ww = this.w * this.w;
            rawData[0] = xx - yy - zz + ww;
            rawData[4] = xy2 - zw2;
            rawData[8] = xz2 + yw2;
            rawData[12] = 0;
            rawData[1] = xy2 + zw2;
            rawData[5] = -xx + yy - zz + ww;
            rawData[9] = yz2 - xw2;
            rawData[13] = 0;
            rawData[2] = xz2 - yw2;
            rawData[6] = yz2 + xw2;
            rawData[10] = -xx - yy + zz + ww;
            rawData[14] = 0;
            rawData[3] = 0.0;
            rawData[7] = 0.0;
            rawData[11] = 0;
            rawData[15] = 1;
            if (!target)
                return new feng3d.Matrix3D(rawData);
            target.copyRawDataFrom(rawData);
            return target;
        };
        /**
        * @language en_US
        * Extracts a quaternion rotation matrix out of a given Matrix3D object.
        * @param matrix The Matrix3D out of which the rotation will be extracted.
        */
        /**
        * @language zh_CN
        * 用一个旋转矩阵生成四元数
        * @param matrix 旋转矩阵
        */
        Quaternion.prototype.fromMatrix = function (matrix) {
            var v = matrix.decompose(feng3d.Orientation3D.QUATERNION)[1];
            this.x = v.x;
            this.y = v.y;
            this.z = v.z;
            this.w = v.w;
        };
        /**
        * @language en_US
        * Clones the quaternion.
        * @returns An exact duplicate of the current Quaternion.
        */
        /**
        * @language zh_CN
        * 克隆一个四元数
        * @returns 当前四元数复制后返回.
        */
        Quaternion.prototype.clone = function () {
            return new Quaternion(this.x, this.y, this.z, this.w);
        };
        /**
        * @language en_US
        * Rotates a point.
        * @param vector The Vector3D object to be rotated.
        * @param target An optional Vector3D object that will contain the rotated coordinates. If not provided, a new object will be created.
        * @returns A Vector3D object containing the rotated point.
        */
        /**
        * @language zh_CN
        * 旋转一个3量坐标点
        * @param vector 被旋转的对象
        * @param target 旋转后的坐标对象。如果为null，将创建一个新的对象
        * @returns 返回旋转后的坐标对象
        */
        Quaternion.prototype.rotatePoint = function (vector, target) {
            if (target === void 0) { target = null; }
            var x1, y1, z1, w1;
            var x2 = vector.x, y2 = vector.y, z2 = vector.z;
            if (target === null) {
                target = new feng3d.Vector3D();
            }
            // p*q'
            w1 = -this.x * x2 - this.y * y2 - this.z * z2;
            x1 = this.w * x2 + this.y * z2 - this.z * y2;
            y1 = this.w * y2 - this.x * z2 + this.z * x2;
            z1 = this.w * z2 + this.x * y2 - this.y * x2;
            target.x = -w1 * this.x + x1 * this.w - y1 * this.z + z1 * this.y;
            target.y = -w1 * this.y + x1 * this.z + y1 * this.w - z1 * this.x;
            target.z = -w1 * this.z - x1 * this.y + y1 * this.x + z1 * this.w;
            return target;
        };
        /**
        * @language en_US
        * Copies the data from a quaternion into this instance.
        * @param q The quaternion to copy from.
        */
        /**
        * @language zh_CN
        * 将数据从四元数复制到该实例
        * @param q 被复制的四元数对象
        */
        Quaternion.prototype.copyFrom = function (q) {
            this.x = q.x;
            this.y = q.y;
            this.z = q.z;
            this.w = q.w;
        };
        return Quaternion;
    }());
    feng3d.Quaternion = Quaternion;
})(feng3d || (feng3d = {}));
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
})(feng3d || (feng3d = {}));
//# sourceMappingURL=feng3d.js.map