var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
})(feng3d || (feng3d = {}));
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
                throw new feng3d.ArgumentError();
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
            return true;
        };
        /**
         * 使用转换矩阵将 Vector3D 对象从一个空间坐标转换到另一个空间坐标。
         * @param   v   一个容纳要转换的坐标的 Vector3D 对象。
         * @return  一个包含转换后的坐标的 Vector3D 对象。
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
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * Orientation3D 类是用于表示 Matrix3D 对象的方向样式的常量值枚举。方向的三个类型分别为欧拉角、轴角和四元数。Matrix3D 对象的 decompose 和 recompose 方法采用其中的某一个枚举类型来标识矩阵的旋转组件。
     * @author feng 2016-3-21
     */
    var Orientation3D = (function () {
        function Orientation3D() {
        }
        /**
        * 轴角方向结合使用轴和角度来确定方向。
        */
        Orientation3D.AXIS_ANGLE = "axisAngle";
        /**
        * 欧拉角（decompose() 和 recompose() 方法的默认方向）通过三个不同的对应于每个轴的旋转角来定义方向。
        */
        Orientation3D.EULER_ANGLES = "eulerAngles";
        /**
        * 四元数方向使用复数。
        */
        Orientation3D.QUATERNION = "quaternion";
        return Orientation3D;
    }());
    feng3d.Orientation3D = Orientation3D;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 四元素
     *
     * 定义了一个四元数表示物体在空间的旋转。
     * 四元数通常用作替代欧拉角和旋转矩阵的方式来实现平滑插值和避免万向节锁
     * 注意，这四元数类不自动保持四元数标准化。因此，在必要的时候，必须采取单位化的四元数，通过调用单位化方法
     */
    var Quaternion = (function () {
        /**
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
            * 四元数的x值.
            */
            this.x = 0;
            /**
            * 四元数的y值.
            */
            this.y = 0;
            /**
            * 四元数的z值.
            */
            this.z = 0;
            /**
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
        * 创建一个以axis轴为中心旋转angle旋转弧度的四元数
        *
        * @param axis   旋转轴
        * @param angle  旋转弧度
        */
        Quaternion.prototype.fromAxisAngle = function (axis, angle) {
            var halfAngle = angle * 0.5;
            var sin_a = Math.sin(halfAngle);
            this.w = Math.cos(halfAngle);
            this.x = axis.x * sin_a;
            this.y = axis.y * sin_a;
            this.z = axis.z * sin_a;
            this.normalize();
        };
        /**
        * 两个四元数之间球形插值，插值之间提供旋转恒定角变化率。
        *
        * @param qa 四元数1
        * @param qb 四元数2
        * @param t 权重
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
        * 两个四元数之间的线性插值
        *
        * @param qa 四元数1
        * @param qb 四元数2
        * @param t 权重
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
        * 用数值表示给定的欧拉旋转填充四元数对象。
        *
        * @param ax x轴旋转弧度
        * @param ay y轴旋转弧度
        * @param az z轴旋转弧度
        */
        Quaternion.prototype.fromEulerAngles = function (ax, ay, az) {
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
        * 把四元数转成欧拉角返回
        *
        * @param target 转成的欧拉返回值，如果为null就新建一个对象返回
        * @retruns 转成的欧拉弧度返回值
        */
        Quaternion.prototype.toEulerAngles = function (target) {
            if (target === void 0) { target = null; }
            target != new feng3d.Vector3D();
            target.x = Math.atan2(2.0 * (this.w * this.x + this.y * this.z), 1.0 - 2.0 * (this.x * this.x + this.y * this.y));
            target.y = Math.asin(2.0 * (this.w * this.y - this.z * this.x));
            target.z = Math.atan2(2.0 * (this.w * this.z + this.x * this.y), 1.0 - 2.0 * (this.y * this.y + this.z * this.z));
            return target;
        };
        /**
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
        * 以字符串形式返回四元数的值
        * @returns
        */
        Quaternion.prototype.toString = function () {
            return "{x:" + this.x + " y:" + this.y + " z:" + this.z + " w:" + this.w + "}";
        };
        /**
        * 把一个四元数转换成矩阵
        * @param target 返回转换后的矩阵，如果为null就新建一个对象返回
        * @returns 返回转换后的矩阵
        */
        Quaternion.prototype.toMatrix3D = function (target) {
            if (target === void 0) { target = null; }
            var rawData = [];
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
        * 用一个旋转矩阵生成四元数
        * @param matrix 旋转矩阵
        */
        Quaternion.prototype.fromMatrix = function (matrix) {
            var v = matrix.decompose()[1];
            this.fromEulerAngles(v.x, v.y, v.z);
        };
        /**
        * 克隆一个四元数
        * @returns 当前四元数复制后返回.
        */
        Quaternion.prototype.clone = function () {
            return new Quaternion(this.x, this.y, this.z, this.w);
        };
        /**
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
var feng3d;
(function (feng3d) {
    /**
     * 3d直线
     * @author feng 2013-6-13
     */
    var Line3D = (function () {
        /**
         * 根据直线某点与方向创建直线
         * @param position 直线上某点
         * @param direction 直线的方向
         */
        function Line3D(position, direction) {
            if (position === void 0) { position = null; }
            if (direction === void 0) { direction = null; }
            this.position = position ? position : new feng3d.Vector3D();
            this.direction = direction ? direction : new feng3d.Vector3D(0, 0, 1);
        }
        /**
         * 根据直线上两点初始化直线
         * @param p0 Vector3D
         * @param p1 Vector3D
         */
        Line3D.prototype.fromPoints = function (p0, p1) {
            this.position = p0;
            this.direction = p1.subtract(p0);
        };
        /**
         * 根据直线某点与方向初始化直线
         * @param position 直线上某点
         * @param direction 直线的方向
         */
        Line3D.prototype.fromPosAndDir = function (position, direction) {
            this.position = position;
            this.direction = direction;
        };
        /**
         * 获取直线上的一个点
         * @param length 与原点距离
         */
        Line3D.prototype.getPoint = function (length) {
            if (length === void 0) { length = 0; }
            var lengthDir = this.direction.clone();
            lengthDir.scaleBy(length);
            var newPoint = this.position.add(lengthDir);
            return newPoint;
        };
        return Line3D;
    }());
    feng3d.Line3D = Line3D;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 3D射线
     * @author feng 2013-6-13
     */
    var Ray3D = (function (_super) {
        __extends(Ray3D, _super);
        function Ray3D(position, direction) {
            if (position === void 0) { position = null; }
            if (direction === void 0) { direction = null; }
            _super.call(this, position, direction);
        }
        return Ray3D;
    }(feng3d.Line3D));
    feng3d.Ray3D = Ray3D;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 三角形
     * @author feng 2014-5-4
     */
    var Triangle3D = (function () {
        function Triangle3D() {
        }
        Triangle3D.prototype.Triangle3D = function (p0, p1, p2) {
            this.p0 = p0;
            this.p1 = p1;
            this.p2 = p2;
        };
        /**
         * 测试是否与直线相交
         * @param line3D 直线
         * @return 是否相交
         */
        Triangle3D.prototype.testLineCollision = function (line3D) {
            return false;
        };
        Object.defineProperty(Triangle3D.prototype, "p0", {
            /**
             * 第1个点
             */
            get: function () {
                return this._p0;
            },
            set: function (value) {
                this._p0 = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Triangle3D.prototype, "p1", {
            /**
             * 第2个点
             */
            get: function () {
                return this._p1;
            },
            set: function (value) {
                this._p1 = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Triangle3D.prototype, "p2", {
            /**
             * 第3个点
             */
            get: function () {
                return this._p2;
            },
            set: function (value) {
                this._p2 = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Triangle3D.prototype, "normal", {
            /**
             * 法线
             */
            get: function () {
                if (this._normal == null)
                    this.updateNomal();
                return this._normal;
            },
            enumerable: true,
            configurable: true
        });
        Triangle3D.prototype.updateNomal = function () {
            this._normal = this.p1.subtract(this.p0).crossProduct(this.p2.subtract(this.p0));
        };
        return Triangle3D;
    }());
    feng3d.Triangle3D = Triangle3D;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 3d面
     */
    var Plane3D = (function () {
        function Plane3D() {
        }
        /**
         * 创建一个平面
         * @param a		A系数
         * @param b		B系数
         * @param c		C系数
         * @param d		D系数
         */
        Plane3D.prototype.Plane3D = function (a, b, c, d) {
            if (a === void 0) { a = 0; }
            if (b === void 0) { b = 0; }
            if (c === void 0) { c = 0; }
            if (d === void 0) { d = 0; }
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            if (a == 0 && b == 0)
                this._alignment = Plane3D.ALIGN_XY_AXIS;
            else if (b == 0 && c == 0)
                this._alignment = Plane3D.ALIGN_YZ_AXIS;
            else if (a == 0 && c == 0)
                this._alignment = Plane3D.ALIGN_XZ_AXIS;
            else
                this._alignment = Plane3D.ALIGN_ANY;
        };
        /**
         * 通过3顶点定义一个平面
         * @param p0		点0
         * @param p1		点1
         * @param p2		点2
         */
        Plane3D.prototype.fromPoints = function (p0, p1, p2) {
            //计算向量1
            var d1x = p1.x - p0.x;
            var d1y = p1.y - p0.y;
            var d1z = p1.z - p0.z;
            //计算向量2
            var d2x = p2.x - p0.x;
            var d2y = p2.y - p0.y;
            var d2z = p2.z - p0.z;
            //叉乘计算法线
            this.a = d1y * d2z - d1z * d2y;
            this.b = d1z * d2x - d1x * d2z;
            this.c = d1x * d2y - d1y * d2x;
            //平面上点与法线点乘计算D值
            this.d = this.a * p0.x + this.b * p0.y + this.c * p0.z;
            //法线平行z轴
            if (this.a == 0 && this.b == 0)
                this._alignment = Plane3D.ALIGN_XY_AXIS;
            else if (this.b == 0 && this.c == 0)
                this._alignment = Plane3D.ALIGN_YZ_AXIS;
            else if (this.a == 0 && this.c == 0)
                this._alignment = Plane3D.ALIGN_XZ_AXIS;
            else
                this._alignment = Plane3D.ALIGN_ANY;
        };
        /**
         * 根据法线与点定义平面
         * @param normal		平面法线
         * @param point			平面上任意一点
         */
        Plane3D.prototype.fromNormalAndPoint = function (normal, point) {
            this.a = normal.x;
            this.b = normal.y;
            this.d = this.a * point.x + this.b * point.y + this.c * point.z;
            if (this.a == 0 && this.b == 0)
                this._alignment = Plane3D.ALIGN_XY_AXIS;
            else if (this.b == 0 && this.c == 0)
                this._alignment = Plane3D.ALIGN_YZ_AXIS;
            else if (this.a == 0 && this.c == 0)
                this._alignment = Plane3D.ALIGN_XZ_AXIS;
            else
                this._alignment = Plane3D.ALIGN_ANY;
        };
        /**
         * 标准化平面
         * @return		标准化后的平面
         */
        Plane3D.prototype.normalize = function () {
            var len = 1 / Math.sqrt(this.a * this.a + this.b * this.b + this.c * this.c);
            this.a *= len;
            this.b *= len;
            this.c *= len;
            this.d *= len;
            return this;
        };
        /**
         * 计算点与平面的距离
         * @param p		点
         * @returns		距离
         */
        Plane3D.prototype.distance = function (p) {
            if (this._alignment == Plane3D.ALIGN_YZ_AXIS)
                return this.a * p.x - this.d;
            else if (this._alignment == Plane3D.ALIGN_XZ_AXIS)
                return this.b * p.y - this.d;
            else if (this._alignment == Plane3D.ALIGN_XY_AXIS)
                return this.c * p.z - this.d;
            else
                return this.a * p.x + this.b * p.y + this.c * p.z - this.d;
        };
        /**
         * 顶点分类
         * <p>把顶点分为后面、前面、相交三类</p>
         * @param p			顶点
         * @return			顶点类型 PlaneClassification.BACK,PlaneClassification.FRONT,PlaneClassification.INTERSECT
         * @see				me.feng3d.core.math.PlaneClassification
         */
        Plane3D.prototype.classifyPoint = function (p, epsilon) {
            if (epsilon === void 0) { epsilon = 0.01; }
            // check NaN
            if (this.d != this.d)
                return PlaneClassification.FRONT;
            var len;
            if (this._alignment == Plane3D.ALIGN_YZ_AXIS)
                len = this.a * p.x - this.d;
            else if (this._alignment == Plane3D.ALIGN_XZ_AXIS)
                len = this.b * p.y - this.d;
            else if (this._alignment == Plane3D.ALIGN_XY_AXIS)
                len = this.c * p.z - this.d;
            else
                len = this.a * p.x + this.b * p.y + this.c * p.z - this.d;
            if (len < -epsilon)
                return PlaneClassification.BACK;
            else if (len > epsilon)
                return PlaneClassification.FRONT;
            else
                return PlaneClassification.INTERSECT;
        };
        /**
         * 输出字符串
         */
        Plane3D.prototype.toString = function () {
            return "Plane3D [a:" + this.a + ", b:" + this.b + ", c:" + this.c + ", d:" + this.d + "]";
        };
        /**
         * 普通平面
         * <p>不与对称轴平行或垂直</p>
         */
        Plane3D.ALIGN_ANY = 0;
        /**
         * XY方向平面
         * <p>法线与Z轴平行</p>
         */
        Plane3D.ALIGN_XY_AXIS = 1;
        /**
         * YZ方向平面
         * <p>法线与X轴平行</p>
         */
        Plane3D.ALIGN_YZ_AXIS = 2;
        /**
         * XZ方向平面
         * <p>法线与Y轴平行</p>
         */
        Plane3D.ALIGN_XZ_AXIS = 3;
        return Plane3D;
    }());
    feng3d.Plane3D = Plane3D;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 类工具
     * @author feng 2015-4-27
     */
    var ClassUtils = (function () {
        function ClassUtils() {
        }
        /**
         * 获取类定义
         * @param obj
         * @return
         */
        ClassUtils.getClass = function (obj) {
            if (typeof obj === "string") {
                try {
                    return feng3d.getDefinitionByName(obj);
                }
                catch (error) {
                    return null;
                }
            }
            var cla = obj;
            var className = feng3d.getQualifiedClassName(obj);
            if (className == "null" || className == "void") {
                return null;
            }
            if (cla == null) {
                cla = feng3d.getDefinitionByName(className);
            }
            return cla;
        };
        /**
         * 获取类实例
         * @param obj
         * @return
         */
        ClassUtils.getInstance = function (obj) {
            if (typeof obj === "function") {
                return new obj();
            }
            if (typeof obj == "string") {
                var cla = this.getClass(obj);
                return new cla;
            }
            return obj;
        };
        /**
         * 构造实例
         * @param cla						类定义
         * @param params					构造参数
         * @return							构造出的实例
         */
        ClassUtils.structureInstance = function (cla, params) {
            if (params == null) {
                return new cla();
            }
            var paramNum = params.length;
            switch (paramNum) {
                case 0:
                    return new cla();
                case 1:
                    return new cla(params[0]);
                case 2:
                    return new cla(params[0], params[1]);
                case 3:
                    return new cla(params[0], params[1], params[2]);
                case 4:
                    return new cla(params[0], params[1], params[2], params[3]);
                case 5:
                    return new cla(params[0], params[1], params[2], params[3], params[4]);
                case 6:
                    return new cla(params[0], params[1], params[2], params[3], params[4], params[5]);
                case 7:
                    return new cla(params[0], params[1], params[2], params[3], params[4], params[5], params[6]);
                case 8:
                    return new cla(params[0], params[1], params[2], params[3], params[4], params[5], params[6], params[7]);
                case 9:
                    return new cla(params[0], params[1], params[2], params[3], params[4], params[5], params[6], params[7], params[8]);
                case 10:
                    return new cla(params[0], params[1], params[2], params[3], params[4], params[5], params[6], params[7], params[8], params[9]);
                default:
                    throw new Error("不支持" + paramNum + "个参数的类构造");
            }
        };
        /**
         * 构造实例
         * @param space						运行空间
         * @param funcName					函数名称
         * @param params					函数参数
         * @return							函数返回值
         */
        ClassUtils.call = function (space, funcName, params) {
            var func = space[funcName];
            var result = func.apply(null, params);
            return result;
        };
        /**
         * 编码参数
         * @param params		参数数组
         */
        ClassUtils.encodeParams = function (params) {
            for (var i = 0; i < params.length; i++) {
                var item = params[i];
                var paramType = feng3d.getQualifiedClassName(item);
                params[i] = { paramType: paramType, paramValue: item };
            }
        };
        /**
         * 解码参数
         * @param params		参数数组
         */
        ClassUtils.decodeParams = function (params) {
            for (var i = 0; i < params.length; i++) {
                var item = params[i];
                if (item.hasOwnProperty("paramType") && item.hasOwnProperty("paramValue")) {
                    var obj;
                    if (item.paramType == "flash.geom::Matrix3D") {
                        obj = new feng3d.Matrix3D(item.paramValue.rawData);
                    }
                    else {
                        obj = ClassUtils.getInstance(item.paramType);
                        if (this.isBaseType(item.paramValue)) {
                            obj = item.paramValue;
                        }
                        else {
                            this.copyValue(obj, item.paramValue);
                        }
                    }
                    params[i] = obj;
                }
            }
        };
        /**
         * 拷贝数据
         * @param obj			需要赋值的对象
         * @param value			拥有数据的对象
         */
        ClassUtils.copyValue = function (obj, value) {
            for (var key in value) {
                var attrValue = value[key];
                var attrType = feng3d.getQualifiedClassName(attrValue);
                var baseType = this.isBaseType(value[key]);
                if (baseType) {
                    obj[key] = value[key];
                }
                else {
                    this.copyValue(obj[key], value[key]);
                }
            }
        };
        /**
         * 判断对象是否为基础类型
         * @param obj			对象
         * @return				true为基础类型，false为复杂类型
         */
        ClassUtils.isBaseType = function (obj) {
            var type = feng3d.getQualifiedClassName(obj);
            var index = ClassUtils.BASETYPES.indexOf(type);
            return index != -1;
        };
        /**
         * 获取对象默认名称
         * @param obj				对象
         * @return					对象默认名称
         */
        ClassUtils.getDefaultName = function (obj) {
            return feng3d.getQualifiedClassName(obj).split("::").pop();
        };
        /**
         * 判断两个对象的完全限定类名是否相同
         * @param obj1			对象1
         * @param obj2			对象2
         * @return
         */
        ClassUtils.isSameClass = function (obj1, obj2) {
            var className1 = feng3d.getQualifiedClassName(obj1);
            var className2 = feng3d.getQualifiedClassName(obj2);
            return className1 == className2;
        };
        /**
         * 基础类型列表
         */
        ClassUtils.BASETYPES = ["int", "boolean", "Number", "uint", "string", "null"];
        return ClassUtils;
    }());
    feng3d.ClassUtils = ClassUtils;
})(feng3d || (feng3d = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var feng3d;
(function (feng3d) {
    /**
     * @private
     */
    var getDefinitionByNameCache = {};
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
    function getDefinitionByName(name) {
        if (!name)
            return null;
        var definition = getDefinitionByNameCache[name];
        if (definition) {
            return definition;
        }
        var paths = name.split(".");
        var length = paths.length;
        definition = __global;
        for (var i = 0; i < length; i++) {
            var path = paths[i];
            definition = definition[path];
            if (!definition) {
                return null;
            }
        }
        getDefinitionByNameCache[name] = definition;
        return definition;
    }
    feng3d.getDefinitionByName = getDefinitionByName;
})(feng3d || (feng3d = {}));
var __global = __global || this;
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var feng3d;
(function (feng3d) {
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
    function getQualifiedClassName(value) {
        var type = typeof value;
        if (!value || (type != "object" && !value.prototype)) {
            return type;
        }
        var prototype = value.prototype ? value.prototype : Object.getPrototypeOf(value);
        if (prototype.hasOwnProperty("__class__")) {
            return prototype["__class__"];
        }
        var constructorString = prototype.constructor.toString().trim();
        var index = constructorString.indexOf("(");
        var className = constructorString.substring(9, index);
        Object.defineProperty(prototype, "__class__", {
            value: className,
            enumerable: false,
            writable: true
        });
        return className;
    }
    feng3d.getQualifiedClassName = getQualifiedClassName;
})(feng3d || (feng3d = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var feng3d;
(function (feng3d) {
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
    function getQualifiedSuperclassName(value) {
        if (!value || (typeof value != "object" && !value.prototype)) {
            return null;
        }
        var prototype = value.prototype ? value.prototype : Object.getPrototypeOf(value);
        var superProto = Object.getPrototypeOf(prototype);
        if (!superProto) {
            return null;
        }
        var superClass = feng3d.getQualifiedClassName(superProto.constructor);
        if (!superClass) {
            return null;
        }
        return superClass;
    }
    feng3d.getQualifiedSuperclassName = getQualifiedSuperclassName;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var StringUtils = (function () {
        function StringUtils() {
        }
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
})(feng3d || (feng3d = {}));
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
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * ArgumentError 类表示一种错误，如果函数提供的参数与为该函数定义的参数不一致，则会出现该错误。例如，如果在调用函数时使用了错误的参数数目、不正确的参数类型或无效参数，则会发生此错误。
     * @author feng 2016-3-25
     */
    var ArgumentError = (function (_super) {
        __extends(ArgumentError, _super);
        function ArgumentError(message) {
            _super.call(this, message);
            console.error("ArgumentError: One of the parameters is invalid.");
        }
        return ArgumentError;
    }(Error));
    feng3d.ArgumentError = ArgumentError;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 自定义事件
     * @author warden_feng 2014-5-7
     */
    var Event = (function () {
        /**
         * 创建一个作为参数传递给事件侦听器的 Event 对象。
         * @param type 事件的类型，可以作为 Event.type 访问。
         * @param bubbles 确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
         * @param cancelable 确定是否可以取消 Event 对象。默认值为 false。
         */
        function Event(type, data, bubbles, cancelable) {
            if (data === void 0) { data = null; }
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            this._type = type;
            this._data = data;
            this._bubbles = bubbles;
        }
        /**
         * 防止对事件流中当前节点中和所有后续节点中的事件侦听器进行处理。此方法会立即生效，并且会影响当前节点中的事件侦听器。相比之下，在当前节点中的所有事件侦听器都完成处理之前，stopPropagation() 方法不会生效。
         */
        Event.prototype.stopImmediatePropagation = function () {
            this._stopsPropagation = this._stopsImmediatePropagation = true;
        };
        /**
         * 防止对事件流中当前节点的后续节点中的所有事件侦听器进行处理。此方法不会影响当前节点 (currentTarget) 中的任何事件侦听器。相比之下，stopImmediatePropagation() 方法可以防止对当前节点中和后续节点中的事件侦听器进行处理。对此方法的其他调用没有任何效果。可以在事件流的任何阶段中调用此方法。
         */
        Event.prototype.stopPropagation = function () {
            this._stopsPropagation = true;
        };
        Event.prototype.tostring = function () {
            return "[" + (typeof this) + " type=\"" + this._type + "\" bubbles=" + this._bubbles + "]";
        };
        Object.defineProperty(Event.prototype, "bubbles", {
            /**
             * 表示事件是否为冒泡事件。如果事件可以冒泡，则此值为 true；否则为 false。
             */
            get: function () {
                return this._bubbles;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Event.prototype, "type", {
            /**
             * 事件的类型。类型区分大小写。
             */
            get: function () {
                return this._type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Event.prototype, "data", {
            /** 事件携带的自定义数据 */
            get: function () {
                return this._data;
            },
            /**
             * @private
             */
            set: function (value) {
                this._data = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Event.prototype, "target", {
            /**
             * 事件目标。
             */
            get: function () {
                return this._target;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Event.prototype, "currentTarget", {
            /**
             * 当前正在使用某个事件侦听器处理 Event 对象的对象。
             */
            get: function () {
                return this._currentTarget;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Event.prototype, "stopsImmediatePropagation", {
            get: function () {
                return this._stopsImmediatePropagation;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Event.prototype, "stopsPropagation", {
            get: function () {
                return this._stopsPropagation;
            },
            enumerable: true,
            configurable: true
        });
        Event.prototype.setTarget = function (value) {
            this._target = value;
        };
        Event.prototype.setCurrentTarget = function (value) {
            this._currentTarget = value;
        };
        return Event;
    }());
    feng3d.Event = Event;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 为了实现非flash原生显示列表的冒泡事件，自定义事件适配器
     * @author feng 2016-3-22
     */
    var EventDispatcher = (function () {
        /**
         * 构建事件适配器
         * @param target		事件适配主体
         */
        function EventDispatcher(target) {
            if (target === void 0) { target = null; }
            this._target = target;
            if (this._target == null)
                this._target = this;
            this._eventListeners = {};
        }
        EventDispatcher.prototype.addEventListener = function (type, listener, priority, useWeakReference) {
            if (priority === void 0) { priority = 0; }
            if (useWeakReference === void 0) { useWeakReference = false; }
            if (listener == null)
                return;
            var listeners = this._eventListeners[type];
            if (listeners == null)
                listeners = this._eventListeners[type] = [];
            var index = listeners.indexOf(listener);
            if (index == -1) {
                listeners.push(listener);
            }
        };
        EventDispatcher.prototype.removeEventListener = function (type, listener) {
            if (this._eventListeners) {
                var listeners = this._eventListeners[type];
                var index = listeners.indexOf(listener);
                listeners.splice(index, 1);
            }
        };
        EventDispatcher.prototype.removeEventListeners = function (type) {
            if (type === void 0) { type = null; }
            if (type && this._eventListeners)
                delete this._eventListeners[type];
            else
                this._eventListeners = {};
        };
        /**
         * @inheritDoc
         */
        EventDispatcher.prototype.dispatchEvent = function (event) {
            var _this = this;
            //停止事件流
            if (!event || event.stopsPropagation)
                return false;
            //设置目标
            if (!event.target)
                event.setTarget(this._target);
            //处理当前事件(目标阶段)
            var listeners = this._eventListeners[event.type];
            if (!event.stopsImmediatePropagation) {
                listeners.forEach(function (listener) {
                    //设置当前目标
                    event.setCurrentTarget(_this._target);
                    listener(event);
                });
            }
            //事件冒泡(冒泡阶段)
            if (event.bubbles && this.parentDispatcher) {
                this.parentDispatcher.dispatchEvent(event);
            }
            return event.stopsPropagation;
        };
        EventDispatcher.prototype.hasEventListener = function (type) {
            var listeners = this._eventListeners ? this._eventListeners[type] : null;
            for (var key in listeners) {
                return true;
            }
            return false;
        };
        /**
         * 该功能暂未实现
         * @param type
         * @return
         */
        EventDispatcher.prototype.willTrigger = function (type) {
            // TODO Auto Generated method stub
            return false;
        };
        Object.defineProperty(EventDispatcher.prototype, "parentDispatcher", {
            /**
             * 父事件适配器
             */
            get: function () {
                return this._target[EventDispatcher.BUBBLE_PROPERTY];
            },
            enumerable: true,
            configurable: true
        });
        /** 冒泡属性名称为“parent” */
        EventDispatcher.BUBBLE_PROPERTY = "parent";
        return EventDispatcher;
    }());
    feng3d.EventDispatcher = EventDispatcher;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 组件容器（集合）
     * @author feng 2015-5-6
     */
    var Component = (function (_super) {
        __extends(Component, _super);
        /**
         * 创建一个组件容器
         */
        function Component() {
            _super.call(this);
            /**
             * 组件列表
             */
            this.components = []; //我并不喜欢使用vector，这使得我不得不去处理越界的问题，繁琐！此处重新修改为Array！
        }
        Object.defineProperty(Component.prototype, "componentName", {
            /**
             * 组件名称
             */
            get: function () {
                if (this._componentName == null)
                    this._componentName = feng3d.ClassUtils.getDefaultName(this);
                return this._componentName;
            },
            set: function (value) {
                this._componentName = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Component.prototype, "numComponents", {
            /**
             * 子组件个数
             */
            get: function () {
                return this.components.length;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 添加组件
         * @param com 被添加组件
         */
        Component.prototype.addComponent = function (com) {
            feng3d.assert(com != this, "子项与父项不能相同");
            if (this.hasComponent(com)) {
                this.setComponentIndex(com, this.components.length - 1);
                return;
            }
            this.addComponentAt(com, this.components.length);
        };
        /**
         * 添加组件到指定位置
         * @param component		被添加的组件
         * @param index			插入的位置
         */
        Component.prototype.addComponentAt = function (component, index) {
            feng3d.assert(component != this, "子项与父项不能相同");
            feng3d.assert(index >= 0 && index <= this.numComponents, "给出索引超出范围");
            if (this.hasComponent(component)) {
                index = Math.min(index, this.components.length - 1);
                this.setComponentIndex(component, index);
                return;
            }
            this.components.splice(index, 0, component);
            var addedComponentEventVO = new feng3d.AddedComponentEventVO(this, component);
            var addedComponentEvent = new feng3d.ComponentEvent(feng3d.ComponentEvent.ADDED_COMPONET, addedComponentEventVO);
            this.dispatchEvent(addedComponentEvent);
            var beAddedComponentEvent = new feng3d.ComponentEvent(feng3d.ComponentEvent.BE_ADDED_COMPONET, addedComponentEventVO);
            component.dispatchEvent(beAddedComponentEvent);
        };
        /**
         * 移除组件
         * @param com 被移除组件
         */
        Component.prototype.removeComponent = function (com) {
            feng3d.assert(this.hasComponent(com), "只能移除在容器中的组件");
            var index = this.getComponentIndex(com);
            this.removeComponentAt(index);
        };
        /**
         * 移除组件
         * @param index		要删除的 Component 的子索引。
         */
        Component.prototype.removeComponentAt = function (index) {
            feng3d.assert(index >= 0 && index < this.numComponents, "给出索引超出范围");
            var removeComponent = this.components.splice(index, 1)[0];
            return removeComponent;
        };
        /**
         * 获取组件在容器的索引位置
         * @param com			查询的组件
         * @return				组件在容器的索引位置
         */
        Component.prototype.getComponentIndex = function (com) {
            feng3d.assert(this.components.indexOf(com) != -1, "组件不在容器中");
            var index = this.components.indexOf(com);
            return index;
        };
        /**
         * 设置子组件的位置
         * @param com				子组件
         * @param index				位置索引
         */
        Component.prototype.setComponentIndex = function (com, index) {
            feng3d.assert(index >= 0 && index < this.numComponents, "给出索引超出范围");
            var oldIndex = this.components.indexOf(com);
            feng3d.assert(oldIndex >= 0 && oldIndex < this.numComponents, "子组件不在容器内");
            this.components.splice(oldIndex, 1);
            this.components.splice(index, 0, com);
        };
        /**
         * 获取指定位置索引的子组件
         * @param index			位置索引
         * @return				子组件
         */
        Component.prototype.getComponentAt = function (index) {
            feng3d.assert(index < this.numComponents, "给出索引超出范围");
            return this.components[index];
        };
        /**
         * 根据组件名称获取组件
         * <p>注意：此处比较的是componentName而非name</p>
         * @param componentName		组件名称
         * @return 					获取到的组件
         */
        Component.prototype.getComponentByName = function (componentName) {
            var filterResult = this.getComponentsByName(this.componentName);
            return filterResult[0];
        };
        /**
         * 获取与给出组件名称相同的所有组件
         * <p>注意：此处比较的是componentName而非name</p>
         * @param componentName		组件名称
         * @return 					获取到的组件
         */
        Component.prototype.getComponentsByName = function (componentName) {
            var filterResult = this.components.filter(function (item) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                return item.componentName == componentName;
            });
            return filterResult;
        };
        /**
         * 根据类定义获取组件
         * <p>如果存在多个则返回第一个</p>
         * @param cls				类定义
         * @return
         */
        Component.prototype.getComponentByClass = function (cls) {
            var component = this.getComponentsByClass(cls)[0];
            return component;
        };
        /**
         * 根据类定义查找组件
         * @param cls		类定义
         * @return			返回与给出类定义一致的组件
         */
        Component.prototype.getComponentsByClass = function (cls) {
            var filterResult = this.components.filter(function (item) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                return feng3d.ClassUtils.isSameClass(item, cls);
            });
            return filterResult;
        };
        /**
         * 根据类定义获取或创建组件
         * <p>当不存在该类型对象时创建一个该组件并且添加到容器中</p>
         * @param cls
         * @return
         */
        Component.prototype.getOrCreateComponentByClass = function (cls) {
            var component = this.getComponentByClass(cls);
            if (component == null) {
                component = new cls();
                this.addComponent(component);
            }
            return component;
        };
        /**
         * 判断是否拥有组件
         * @param com	被检测的组件
         * @return		true：拥有该组件；false：不拥有该组件。
         */
        Component.prototype.hasComponent = function (com) {
            return this.components.indexOf(com) != -1;
        };
        /**
         * 交换子组件位置
         * @param index1		第一个子组件的索引位置
         * @param index2		第二个子组件的索引位置
         */
        Component.prototype.swapComponentsAt = function (index1, index2) {
            feng3d.assert(index1 >= 0 && index1 < this.numComponents, "第一个子组件的索引位置超出范围");
            feng3d.assert(index2 >= 0 && index2 < this.numComponents, "第二个子组件的索引位置超出范围");
            var temp = this.components[index1];
            this.components[index1] = this.components[index2];
            this.components[index2] = temp;
        };
        /**
         * 交换子组件位置
         * @param com1		第一个子组件
         * @param com2		第二个子组件
         */
        Component.prototype.swapComponents = function (com1, com2) {
            feng3d.assert(this.hasComponent(com1), "第一个子组件不在容器中");
            feng3d.assert(this.hasComponent(com2), "第二个子组件不在容器中");
            this.swapComponentsAt(this.getComponentIndex(com1), this.getComponentIndex(com2));
        };
        /**
         * 派发子组件事件
         * <p>事件广播给子组件</p>
         * @param event
         */
        Component.prototype.dispatchChildrenEvent = function (event) {
            this.components.forEach(function (item) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                item.dispatchEvent(event);
            });
        };
        return Component;
    }(feng3d.EventDispatcher));
    feng3d.Component = Component;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 添加组件事件数据
     * @author feng 2015-12-2
     */
    var AddedComponentEventVO = (function () {
        /**
         * 添加组件事件数据
         * @param container			组件容器
         * @param child				子组件
         */
        function AddedComponentEventVO(container, child) {
            this.container = container;
            this.child = child;
        }
        return AddedComponentEventVO;
    }());
    feng3d.AddedComponentEventVO = AddedComponentEventVO;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     *
     * @author feng 2015-12-2
     */
    var RemovedComponentEventVO = (function () {
        /**
         * 添加组件事件数据
         * @param container			组件容器
         * @param child				子组件
         */
        function RemovedComponentEventVO(container, child) {
            this.container = container;
            this.child = child;
        }
        return RemovedComponentEventVO;
    }());
    feng3d.RemovedComponentEventVO = RemovedComponentEventVO;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 组件事件
     * @author feng 2015-12-2
     */
    var ComponentEvent = (function (_super) {
        __extends(ComponentEvent, _super);
        function ComponentEvent(type, data, bubbles, cancelable) {
            if (data === void 0) { data = null; }
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            _super.call(this, type, data, bubbles, cancelable);
        }
        /**
         * 添加子组件事件
         */
        ComponentEvent.ADDED_COMPONET = "addedComponet";
        /**
         * 被组件容器添加事件
         */
        ComponentEvent.BE_ADDED_COMPONET = "beAddedComponet";
        /**
         * 移除子组件事件
         */
        ComponentEvent.REMOVED_COMPONET = "removedComponet";
        /**
         * 被容器删除事件
         */
        ComponentEvent.BE_REMOVED_COMPONET = "beRemovedComponet";
        return ComponentEvent;
    }(feng3d.Event));
    feng3d.ComponentEvent = ComponentEvent;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var AssetType = (function () {
        function AssetType() {
        }
        /** 实体 */
        AssetType.ENTITY = 'entity';
        /** 天空盒 */
        AssetType.SKYBOX = 'skybox';
        /** 摄像机 */
        AssetType.CAMERA = 'camera';
        /** 线条 */
        AssetType.SEGMENT_SET = 'segmentSet';
        /** 网格 */
        AssetType.MESH = 'mesh';
        /** 几何体 */
        AssetType.GEOMETRY = 'geometry';
        /** 骨骼 */
        AssetType.SKELETON = 'skeleton';
        /** 骨骼姿势 */
        AssetType.SKELETON_POSE = 'skeletonPose';
        /** 容器 */
        AssetType.CONTAINER = 'container';
        /** 纹理 */
        AssetType.TEXTURE = 'texture';
        AssetType.TEXTURE_PROJECTOR = 'textureProjector';
        /** 材质 */
        AssetType.MATERIAL = 'material';
        AssetType.ANIMATION_SET = 'animationSet';
        /** 动画状态 */
        AssetType.ANIMATION_STATE = 'animationState';
        /** 动画节点 */
        AssetType.ANIMATION_NODE = 'animationNode';
        /** 动画 */
        AssetType.ANIMATOR = 'animator';
        AssetType.STATE_TRANSITION = 'stateTransition';
        /** 灯光 */
        AssetType.LIGHT = 'light';
        /** 灯光采集器 */
        AssetType.LIGHT_PICKER = 'lightPicker';
        /** 阴影投射方法 */
        AssetType.SHADOW_MAP_METHOD = 'shadowMapMethod';
        AssetType.EFFECTS_METHOD = 'effectsMethod';
        return AssetType;
    }());
    feng3d.AssetType = AssetType;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 拥有名字的对象
     * @author feng 2014-5-7
     */
    var NamedAsset = (function () {
        /**
         * 创建一个拥有名字的对象
         */
        function NamedAsset(asset, assetType) {
            this._asset = asset;
            this._assetType = assetType;
        }
        Object.defineProperty(NamedAsset.prototype, "name", {
            /**
             * 名称
             */
            get: function () {
                if (!this._name) {
                    var defaultName = feng3d.ClassUtils.getDefaultName(this);
                    this._name = defaultName + (NamedAsset.nameDic[defaultName]);
                    NamedAsset.nameDic[defaultName] = (NamedAsset.nameDic[defaultName]) + 1;
                }
                return this._name;
            },
            set: function (value) {
                //			if (_name)
                //				throw new Error(getQualifiedClassName(this) + " -- 对象已经有名称，无法更改");
                this._name = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NamedAsset.prototype, "assetType", {
            /**
             * @inheritDoc
             */
            get: function () {
                return this._assetType;
            },
            enumerable: true,
            configurable: true
        });
        NamedAsset.nameDic = {};
        return NamedAsset;
    }());
    feng3d.NamedAsset = NamedAsset;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 3D对象事件(3D状态发生改变、位置、旋转、缩放)
     * @author feng 2014-3-31
     */
    var Transform3DEvent = (function (_super) {
        __extends(Transform3DEvent, _super);
        /**
         * 创建3D对象事件
         * @param type			事件类型
         * @param element3D		发出事件的3D元素
         */
        function Transform3DEvent(type, element3D, bubbles, cancelable) {
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            _super.call(this, type, element3D, bubbles, cancelable);
        }
        Object.defineProperty(Transform3DEvent.prototype, "element3D", {
            /**
             * 发出事件的3D元素
             */
            get: function () {
                return this.data;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 平移
         */
        Transform3DEvent.POSITION_CHANGED = "positionChanged";
        /**
         * 旋转
         */
        Transform3DEvent.ROTATION_CHANGED = "rotationChanged";
        /**
         * 缩放
         */
        Transform3DEvent.SCALE_CHANGED = "scaleChanged";
        /**
         * 变换
         */
        Transform3DEvent.TRANSFORM_CHANGED = "transformChanged";
        /**
         * 变换已更新
         */
        Transform3DEvent.TRANSFORM_UPDATED = "transformUpdated";
        /**
         * 场景变换矩阵发生变化
         */
        Transform3DEvent.SCENETRANSFORM_CHANGED = "scenetransformChanged";
        return Transform3DEvent;
    }(feng3d.Event));
    feng3d.Transform3DEvent = Transform3DEvent;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 3D元素<br/><br/>
     *
     * 主要功能:
     * <ul>
     *     <li>管理3D元素的位置、旋转、缩放状态</li>
     * </ul>
     * @author feng 2014-3-31
     */
    var Element3D = (function (_super) {
        __extends(Element3D, _super);
        function Element3D() {
            _super.call(this);
            this._smallestNumber = 0.0000000000000000000001;
            this._transformDirty = true;
            this._eulers = new feng3d.Vector3D();
            this._transform = new feng3d.Matrix3D();
            this._x = 0;
            this._y = 0;
            this._z = 0;
            this._rotationX = 0;
            this._rotationY = 0;
            this._rotationZ = 0;
            this._scaleX = 1;
            this._scaleY = 1;
            this._scaleZ = 1;
            this._pivotPoint = new feng3d.Vector3D();
            this._pivotZero = true;
            this._pos = new feng3d.Vector3D();
            this._rot = new feng3d.Vector3D();
            this._sca = new feng3d.Vector3D();
            // Cached vector of transformation components used when
            // recomposing the transform matrix in updateTransform()
            this._transformComponents = [];
            this._transformComponents[0] = this._pos;
            this._transformComponents[1] = this._rot;
            this._transformComponents[2] = this._sca;
            this._transform.identity();
        }
        Object.defineProperty(Element3D.prototype, "x", {
            /**
             * 相对父容器的X坐标
             */
            get: function () {
                return this._x;
            },
            set: function (val) {
                if (this._x == val)
                    return;
                this._x = val;
                this.invalidatePosition();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element3D.prototype, "y", {
            /**
             * 相对父容器的Y坐标
             */
            get: function () {
                return this._y;
            },
            set: function (val) {
                if (this._y == val)
                    return;
                this._y = val;
                this.invalidatePosition();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element3D.prototype, "z", {
            /**
             * 相对父容器的Z坐标
             */
            get: function () {
                return this._z;
            },
            set: function (val) {
                if (this._z == val)
                    return;
                this._z = val;
                this.invalidatePosition();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element3D.prototype, "rotationX", {
            /**
             * 绕X轴旋转角度
             */
            get: function () {
                return this._rotationX * feng3d.MathConsts.RADIANS_TO_DEGREES;
            },
            set: function (val) {
                if (this.rotationX == val)
                    return;
                this._rotationX = val * feng3d.MathConsts.DEGREES_TO_RADIANS;
                this.invalidateRotation();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element3D.prototype, "rotationY", {
            /**
             * 绕Y轴旋转角度
             */
            get: function () {
                return this._rotationY * feng3d.MathConsts.RADIANS_TO_DEGREES;
            },
            set: function (val) {
                if (this.rotationY == val)
                    return;
                this._rotationY = val * feng3d.MathConsts.DEGREES_TO_RADIANS;
                this.invalidateRotation();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element3D.prototype, "rotationZ", {
            /**
             * 绕Z轴旋转角度
             */
            get: function () {
                return this._rotationZ * feng3d.MathConsts.RADIANS_TO_DEGREES;
            },
            set: function (val) {
                if (this.rotationZ == val)
                    return;
                this._rotationZ = val * feng3d.MathConsts.DEGREES_TO_RADIANS;
                this.invalidateRotation();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element3D.prototype, "scaleX", {
            /**
             * X轴旋方向缩放
             */
            get: function () {
                return this._scaleX;
            },
            set: function (val) {
                if (this._scaleX == val)
                    return;
                this._scaleX = val;
                this.invalidateScale();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element3D.prototype, "scaleY", {
            /**
             * Y轴旋方向缩放
             */
            get: function () {
                return this._scaleY;
            },
            set: function (val) {
                if (this._scaleY == val)
                    return;
                this._scaleY = val;
                this.invalidateScale();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element3D.prototype, "scaleZ", {
            /**
             * Z轴旋方向缩放
             */
            get: function () {
                return this._scaleZ;
            },
            set: function (val) {
                if (this._scaleZ == val)
                    return;
                this._scaleZ = val;
                this.invalidateScale();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element3D.prototype, "eulers", {
            /**
             * 欧拉角
             * <ul>
             *     <li>使用Vector3D对象表示 相对x、y、z轴上的旋转角度</li>
             * </ul>
             */
            get: function () {
                this._eulers.x = this._rotationX * feng3d.MathConsts.RADIANS_TO_DEGREES;
                this._eulers.y = this._rotationY * feng3d.MathConsts.RADIANS_TO_DEGREES;
                this._eulers.z = this._rotationZ * feng3d.MathConsts.RADIANS_TO_DEGREES;
                return this._eulers;
            },
            set: function (value) {
                this._rotationX = value.x * feng3d.MathConsts.DEGREES_TO_RADIANS;
                this._rotationY = value.y * feng3d.MathConsts.DEGREES_TO_RADIANS;
                this._rotationZ = value.z * feng3d.MathConsts.DEGREES_TO_RADIANS;
                this.invalidateRotation();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element3D.prototype, "transform", {
            /**
             * 3d元素变换矩阵
             */
            get: function () {
                if (this._transformDirty)
                    this.updateTransform();
                return this._transform;
            },
            set: function (val) {
                //ridiculous matrix error
                var raw = [];
                val.copyRawDataTo(raw);
                if (!raw[0]) {
                    raw[0] = this._smallestNumber;
                    val.copyRawDataFrom(raw);
                }
                var elements = val.decompose();
                var vec;
                vec = elements[0];
                if (this._x != vec.x || this._y != vec.y || this._z != vec.z) {
                    this._x = vec.x;
                    this._y = vec.y;
                    this._z = vec.z;
                    this.invalidatePosition();
                }
                vec = elements[1];
                if (this._rotationX != vec.x || this._rotationY != vec.y || this._rotationZ != vec.z) {
                    this._rotationX = vec.x;
                    this._rotationY = vec.y;
                    this._rotationZ = vec.z;
                    this.invalidateRotation();
                }
                vec = elements[2];
                if (this._scaleX != vec.x || this._scaleY != vec.y || this._scaleZ != vec.z) {
                    this._scaleX = vec.x;
                    this._scaleY = vec.y;
                    this._scaleZ = vec.z;
                    this.invalidateScale();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element3D.prototype, "pivotPoint", {
            /**
             * 中心点坐标（本地对象旋转点）
             */
            get: function () {
                return this._pivotPoint;
            },
            set: function (pivot) {
                if (!this._pivotPoint)
                    this._pivotPoint = new feng3d.Vector3D();
                this._pivotPoint.x = pivot.x;
                this._pivotPoint.y = pivot.y;
                this._pivotPoint.z = pivot.z;
                this.invalidatePivot();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element3D.prototype, "position", {
            /**
             * 获取在父容器中的坐标
             */
            get: function () {
                this.transform.copyColumnTo(3, this._pos);
                return this._pos.clone();
            },
            set: function (value) {
                this._x = value.x;
                this._y = value.y;
                this._z = value.z;
                this.invalidatePosition();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 使位置数据无效
         */
        Element3D.prototype.invalidatePosition = function () {
            if (this._positionDirty)
                return;
            this._positionDirty = true;
            this.invalidateTransform();
            if (this._listenToPositionChanged)
                this.notifyPositionChanged();
        };
        /**
         * 发出平移事件
         */
        Element3D.prototype.notifyPositionChanged = function () {
            if (!this._positionChanged)
                this._positionChanged = new feng3d.Transform3DEvent(feng3d.Transform3DEvent.POSITION_CHANGED, this);
            this.dispatchEvent(this._positionChanged);
        };
        /**
         * 使变换矩阵失效
         */
        Element3D.prototype.invalidateTransform = function () {
            this._transformDirty = true;
            if (this._listenToTransformChanged)
                this.notifyTransformChanged();
        };
        /**
         * 发出状态改变消息
         */
        Element3D.prototype.notifyTransformChanged = function () {
            if (!this._transformChanged)
                this._transformChanged = new feng3d.Transform3DEvent(feng3d.Transform3DEvent.TRANSFORM_CHANGED, this);
            this.dispatchEvent(this._transformChanged);
        };
        /**
         * 更新变换矩阵
         */
        Element3D.prototype.updateTransform = function () {
            this._pos.x = this._x;
            this._pos.y = this._y;
            this._pos.z = this._z;
            this._rot.x = this._rotationX;
            this._rot.y = this._rotationY;
            this._rot.z = this._rotationZ;
            if (!this._pivotZero) {
                this._sca.x = 1;
                this._sca.y = 1;
                this._sca.z = 1;
                this._transform.recompose(this._transformComponents);
                this._transform.appendTranslation(this._pivotPoint.x, this._pivotPoint.y, this._pivotPoint.z);
                this._transform.prependTranslation(-this._pivotPoint.x, -this._pivotPoint.y, -this._pivotPoint.z);
                this._transform.prependScale(this._scaleX, this._scaleY, this._scaleZ);
                this._sca.x = this._scaleX;
                this._sca.y = this._scaleY;
                this._sca.z = this._scaleZ;
            }
            else {
                this._sca.x = this._scaleX;
                this._sca.y = this._scaleY;
                this._sca.z = this._scaleZ;
                this._transform.recompose(this._transformComponents);
            }
            this._transformDirty = false;
            this._positionDirty = false;
            this._rotationDirty = false;
            this._scaleDirty = false;
            this.dispatchEvent(new feng3d.Transform3DEvent(feng3d.Transform3DEvent.TRANSFORM_UPDATED, this));
        };
        /**
         * 使中心点无效
         */
        Element3D.prototype.invalidatePivot = function () {
            this._pivotZero = (this._pivotPoint.x == 0) && (this._pivotPoint.y == 0) && (this._pivotPoint.z == 0);
            this.invalidateTransform();
        };
        /**
         * 监听事件
         * @param type 事件类型
         * @param listener 回调函数
         */
        Element3D.prototype.addEventListener = function (type, listener, priority, useWeakReference) {
            if (priority === void 0) { priority = 0; }
            if (useWeakReference === void 0) { useWeakReference = false; }
            _super.prototype.addEventListener.call(this, type, listener, priority, useWeakReference);
            switch (type) {
                case feng3d.Transform3DEvent.POSITION_CHANGED:
                    this._listenToPositionChanged = true;
                    break;
                case feng3d.Transform3DEvent.ROTATION_CHANGED:
                    this._listenToRotationChanged = true;
                    break;
                case feng3d.Transform3DEvent.SCALE_CHANGED:
                    this._listenToRotationChanged = true;
                    break;
                case feng3d.Transform3DEvent.TRANSFORM_CHANGED:
                    this._listenToTransformChanged = true;
                    break;
            }
        };
        /**
         * 移除事件
         * @param type 事件类型
         * @param listener 回调函数
         */
        Element3D.prototype.removeEventListener = function (type, listener) {
            _super.prototype.removeEventListener.call(this, type, listener);
            if (this.hasEventListener(type))
                return;
            switch (type) {
                case feng3d.Transform3DEvent.POSITION_CHANGED:
                    this._listenToPositionChanged = false;
                    break;
                case feng3d.Transform3DEvent.ROTATION_CHANGED:
                    this._listenToRotationChanged = false;
                    break;
                case feng3d.Transform3DEvent.SCALE_CHANGED:
                    this._listenToScaleChanged = false;
                    break;
                case feng3d.Transform3DEvent.TRANSFORM_CHANGED:
                    this._listenToTransformChanged = false;
                    break;
            }
        };
        /**
         * 使旋转角度无效
         */
        Element3D.prototype.invalidateRotation = function () {
            if (this._rotationDirty)
                return;
            this._rotationDirty = true;
            this.invalidateTransform();
            if (this._listenToRotationChanged)
                this.notifyRotationChanged();
        };
        /**
         * 抛出旋转事件
         */
        Element3D.prototype.notifyRotationChanged = function () {
            if (!this._rotationChanged)
                this._rotationChanged = new feng3d.Transform3DEvent(feng3d.Transform3DEvent.ROTATION_CHANGED, this);
            this.dispatchEvent(this._rotationChanged);
        };
        /**
         * 使缩放无效
         */
        Element3D.prototype.invalidateScale = function () {
            if (this._scaleDirty)
                return;
            this._scaleDirty = true;
            this.invalidateTransform();
            if (this._listenToScaleChanged)
                this.notifyScaleChanged();
        };
        /**
         * 抛出缩放事件
         */
        Element3D.prototype.notifyScaleChanged = function () {
            if (!this._scaleChanged)
                this._scaleChanged = new feng3d.Transform3DEvent(feng3d.Transform3DEvent.SCALE_CHANGED, this);
            this.dispatchEvent(this._scaleChanged);
        };
        return Element3D;
    }(feng3d.Component));
    feng3d.Element3D = Element3D;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
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
    var Transform3D = (function (_super) {
        __extends(Transform3D, _super);
        /**
         * 创建3D元素状态变换实例
         */
        function Transform3D() {
            _super.call(this);
        }
        Object.defineProperty(Transform3D.prototype, "forwardVector", {
            /**
             * 前方单位向量
             * <ul>
             * 		<li>自身的Z轴方向</li>
             * </ul>
             */
            get: function () {
                return this.transform.forward;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform3D.prototype, "rightVector", {
            /**
             * 右方单位向量
             * <ul>
             * 		<li>自身的X轴方向</li>
             * </ul>
             */
            get: function () {
                return this.transform.right;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform3D.prototype, "upVector", {
            /**
             * 上方单位向量
             * <ul>
             * 		<li>自身的Y轴方向</li>
             * </ul>
             */
            get: function () {
                return this.transform.up;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform3D.prototype, "backVector", {
            /**
             * 后方单位向量
             * <ul>
             * 		<li>自身的Z轴负方向</li>
             * </ul>
             */
            get: function () {
                var director = this.transform.forward;
                director.negate();
                return director;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform3D.prototype, "leftVector", {
            /**
             * 左方单位向量
             * <ul>
             * 		<li>自身的X轴负方向</li>
             * </ul>
             */
            get: function () {
                var director = this.transform.right;
                director.negate();
                return director;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform3D.prototype, "downVector", {
            /**
             * 下方单位向量
             * <ul>
             * 		<li>自身的Y轴负方向</li>
             * </ul>
             */
            get: function () {
                var director = this.transform.up;
                director.negate();
                return director;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 等比缩放
         * @param value 缩放比例
         */
        Transform3D.prototype.scale = function (value) {
            this._scaleX *= value;
            this._scaleY *= value;
            this._scaleZ *= value;
            this.invalidateScale();
        };
        /**
         * 向前（Z轴方向）位移
         * @param distance 位移距离
         */
        Transform3D.prototype.moveForward = function (distance) {
            this.translateLocal(feng3d.Vector3D.Z_AXIS, distance);
        };
        /**
         * 向后（Z轴负方向）位移
         * @param distance 位移距离
         */
        Transform3D.prototype.moveBackward = function (distance) {
            this.translateLocal(feng3d.Vector3D.Z_AXIS, -distance);
        };
        /**
         * 向左（X轴负方向）位移
         * @param distance 位移距离
         */
        Transform3D.prototype.moveLeft = function (distance) {
            this.translateLocal(feng3d.Vector3D.X_AXIS, -distance);
        };
        /**
         * 向右（X轴方向）位移
         * @param distance 位移距离
         */
        Transform3D.prototype.moveRight = function (distance) {
            this.translateLocal(feng3d.Vector3D.X_AXIS, distance);
        };
        /**
         * 向上（Y轴方向）位移
         * @param distance 位移距离
         */
        Transform3D.prototype.moveUp = function (distance) {
            this.translateLocal(feng3d.Vector3D.Y_AXIS, distance);
        };
        /**
         * 向下（Y轴负方向）位移
         * @param distance 位移距离
         */
        Transform3D.prototype.moveDown = function (distance) {
            this.translateLocal(feng3d.Vector3D.Y_AXIS, -distance);
        };
        /**
         * 直接移到空间的某个位置
         * @param newX x坐标
         * @param newY y坐标
         * @param newZ z坐标
         */
        Transform3D.prototype.moveTo = function (newX, newY, newZ) {
            if (this._x == newX && this._y == newY && this._z == newZ)
                return;
            this._x = newX;
            this._y = newY;
            this._z = newZ;
            this.invalidatePosition();
        };
        /**
         * 移动中心点（旋转点）
         * @param dx X轴方向位移
         * @param dy Y轴方向位移
         * @param dz Z轴方向位移
         */
        Transform3D.prototype.movePivot = function (dx, dy, dz) {
            if (!this._pivotPoint)
                this._pivotPoint = new feng3d.Vector3D();
            this._pivotPoint.x += dx;
            this._pivotPoint.y += dy;
            this._pivotPoint.z += dz;
            this.invalidatePivot();
        };
        /**
         * 在自定义轴上位移
         * @param axis 自定义轴
         * @param distance 位移距离
         */
        Transform3D.prototype.translate = function (axis, distance) {
            var x = axis.x, y = axis.y, z = axis.z;
            var len = distance / Math.sqrt(x * x + y * y + z * z);
            this._x += x * len;
            this._y += y * len;
            this._z += z * len;
            this.invalidatePosition();
        };
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
        Transform3D.prototype.translateLocal = function (axis, distance) {
            var len = distance / axis.length;
            this.transform.prependTranslation(axis.x * len, axis.y * len, axis.z * len);
            this._transform.copyColumnTo(3, this._pos);
            this._x = this._pos.x;
            this._y = this._pos.y;
            this._z = this._pos.z;
            this.invalidatePosition();
        };
        /**
         * 绕X轴旋转
         * @param angle 旋转角度
         */
        Transform3D.prototype.pitch = function (angle) {
            this.rotate(feng3d.Vector3D.X_AXIS, angle);
        };
        /**
         * 绕Y轴旋转
         * @param angle 旋转角度
         */
        Transform3D.prototype.yaw = function (angle) {
            this.rotate(feng3d.Vector3D.Y_AXIS, angle);
        };
        /**
         * 绕Z轴旋转
         * @param angle 旋转角度
         */
        Transform3D.prototype.roll = function (angle) {
            this.rotate(feng3d.Vector3D.Z_AXIS, angle);
        };
        /**
         * 直接修改欧拉角
         * @param ax X轴旋转角度
         * @param ay Y轴旋转角度
         * @param az Z轴旋转角度
         */
        Transform3D.prototype.rotateTo = function (ax, ay, az) {
            this._rotationX = ax * feng3d.MathConsts.DEGREES_TO_RADIANS;
            this._rotationY = ay * feng3d.MathConsts.DEGREES_TO_RADIANS;
            this._rotationZ = az * feng3d.MathConsts.DEGREES_TO_RADIANS;
            this.invalidateRotation();
        };
        /**
         * 绕所给轴旋转
         * @param axis 任意轴
         * @param angle 旋转角度
         */
        Transform3D.prototype.rotate = function (axis, angle) {
            var m = new feng3d.Matrix3D();
            m.prependRotation(angle, axis);
            var vec = m.decompose()[1];
            this._rotationX += vec.x;
            this._rotationY += vec.y;
            this._rotationZ += vec.z;
            this.invalidateRotation();
        };
        /**
         * 观察目标
         * <ul>
         * 		<li>旋转至朝向给出的点</li>
         * </ul>
         * @param target 	目标点
         * @param upAxis 	旋转后向上方向（并非绝对向上），默认为null，当值为null时会以Y轴为向上方向计算
         */
        Transform3D.prototype.lookAt = function (target, upAxis) {
            if (upAxis === void 0) { upAxis = null; }
            var tempAxeX;
            var tempAxeY;
            var tempAxeZ;
            if (!tempAxeX)
                tempAxeX = new feng3d.Vector3D();
            if (!tempAxeY)
                tempAxeY = new feng3d.Vector3D();
            if (!tempAxeZ)
                tempAxeZ = new feng3d.Vector3D();
            //旋转后的X轴
            var xAxis = tempAxeX;
            //旋转后的Y轴
            var yAxis = tempAxeY;
            //旋转后的Z轴
            var zAxis = tempAxeZ;
            var raw;
            //向上方向默认值为Y轴
            if (upAxis == null)
                upAxis = feng3d.Vector3D.Y_AXIS;
            if (this._transformDirty) {
                this.updateTransform();
            }
            //物体与目标点在相同位置时，稍作偏移
            if (new feng3d.Vector3D(this._x, this._y, this._z).subtract(target).length == 0) {
                this._z = target.z + 0.1;
            }
            //获得Z轴
            zAxis.x = target.x - this._x;
            zAxis.y = target.y - this._y;
            zAxis.z = target.z - this._z;
            zAxis.normalize();
            //向上方向与Z轴 叉乘 得到X轴
            xAxis.x = upAxis.y * zAxis.z - upAxis.z * zAxis.y;
            xAxis.y = upAxis.z * zAxis.x - upAxis.x * zAxis.z;
            xAxis.z = upAxis.x * zAxis.y - upAxis.y * zAxis.x;
            xAxis.normalize();
            if (xAxis.length < .05) {
                xAxis.x = upAxis.y;
                xAxis.y = upAxis.x;
                xAxis.z = 0;
                xAxis.normalize();
            }
            //Z轴叉乘X轴 得到 Y轴，Z与X为标准化向量，得到的Y轴也将是标准化向量
            yAxis.x = zAxis.y * xAxis.z - zAxis.z * xAxis.y;
            yAxis.y = zAxis.z * xAxis.x - zAxis.x * xAxis.z;
            yAxis.z = zAxis.x * xAxis.y - zAxis.y * xAxis.x;
            raw = [];
            //根据XYZ轴计算变换矩阵
            raw[0] = this._scaleX * xAxis.x;
            raw[1] = this._scaleX * xAxis.y;
            raw[2] = this._scaleX * xAxis.z;
            raw[3] = 0;
            raw[4] = this._scaleY * yAxis.x;
            raw[5] = this._scaleY * yAxis.y;
            raw[6] = this._scaleY * yAxis.z;
            raw[7] = 0;
            raw[8] = this._scaleZ * zAxis.x;
            raw[9] = this._scaleZ * zAxis.y;
            raw[10] = this._scaleZ * zAxis.z;
            raw[11] = 0;
            raw[12] = this._x;
            raw[13] = this._y;
            raw[14] = this._z;
            raw[15] = 1;
            this._transform.copyRawDataFrom(raw);
            this.transform = this.transform;
            if (zAxis.z < 0) {
                this.rotationY = (180 - this.rotationY);
                this.rotationX -= 180;
                this.rotationZ -= 180;
            }
        };
        return Transform3D;
    }(feng3d.Element3D));
    feng3d.Transform3D = Transform3D;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 3D对象<br/><br/>
     * 主要功能:
     * <ul>
     *     <li>能够被addChild添加到3d场景中</li>
     *     <li>维护场景变换矩阵sceneTransform、inverseSceneTransform</li>
     *     <li>维护父对象parent</li>
     * </ul>
     *
     * @author feng
     */
    var Object3D = (function (_super) {
        __extends(Object3D, _super);
        /**
         * 创建3D对象
         */
        function Object3D() {
            _super.call(this);
            this._sceneTransform = new feng3d.Matrix3D();
            this._sceneTransformDirty = true;
            this._inverseSceneTransform = new feng3d.Matrix3D();
            this._inverseSceneTransformDirty = true;
            this._scenePosition = new feng3d.Vector3D();
            this._scenePositionDirty = true;
            this._visible = true;
            this._zOffset = 0;
            this.transform3D = new feng3d.Transform3D();
        }
        Object.defineProperty(Object3D.prototype, "transform3D", {
            get: function () {
                return this._transform3D;
            },
            set: function (value) {
                if (this.transform3D != null) {
                    this.transform3D.removeEventListener(feng3d.Transform3DEvent.TRANSFORM_CHANGED, this.onTransformChanged);
                    this.transform3D.removeEventListener(feng3d.Transform3DEvent.POSITION_CHANGED, this.onPositionChanged);
                }
                this._transform3D = value;
                this.transform3D.addEventListener(feng3d.Transform3DEvent.TRANSFORM_CHANGED, this.onTransformChanged);
                this.transform3D.addEventListener(feng3d.Transform3DEvent.POSITION_CHANGED, this.onPositionChanged);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "scene", {
            /**
             * 场景
             */
            get: function () {
                return this._scene;
            },
            set: function (value) {
                if (this._scene != value) {
                    if (this._scene)
                        this._scene.removedObject3d(this);
                    this._scene = value;
                    if (this._scene)
                        this._scene.addedObject3d(this);
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 克隆3D对象
         */
        Object3D.prototype.clone = function () {
            var clone1 = new Object3D();
            clone1.transform3D = new feng3d.Transform3D();
            clone1.transform3D.pivotPoint = this.transform3D.pivotPoint;
            clone1.transform3D.transform = this.transform3D.transform;
            return clone1;
        };
        Object.defineProperty(Object3D.prototype, "inverseSceneTransform", {
            /**
             * 场景变换逆矩阵，场景空间转模型空间
             */
            get: function () {
                if (this._inverseSceneTransformDirty) {
                    this._inverseSceneTransform.copyFrom(this.sceneTransform);
                    this._inverseSceneTransform.invert();
                    this._inverseSceneTransformDirty = false;
                }
                return this._inverseSceneTransform;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "sceneTransform", {
            /**
             * 场景变换矩阵，模型空间转场景空间
             */
            get: function () {
                if (this._sceneTransformDirty)
                    this.updateSceneTransform();
                return this._sceneTransform;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 更新场景变换矩阵
         */
        Object3D.prototype.updateSceneTransform = function () {
            if (this._parent && !this._parent._isRoot) {
                this._sceneTransform.copyFrom(this._parent.sceneTransform);
                this._sceneTransform.prepend(this.transform3D.transform);
            }
            else
                this._sceneTransform.copyFrom(this.transform3D.transform);
            this._sceneTransformDirty = false;
        };
        /**
         * 使变换矩阵失效，场景变换矩阵也将失效
         */
        Object3D.prototype.onTransformChanged = function (event) {
            this.notifySceneTransformChange();
        };
        /**
         * 场景变化失效
         */
        Object3D.prototype.invalidateSceneTransform = function () {
            this._sceneTransformDirty = true;
            this._inverseSceneTransformDirty = true;
            this._scenePositionDirty = true;
        };
        /**
         * 通知场景变换改变
         */
        Object3D.prototype.notifySceneTransformChange = function () {
            if (this._sceneTransformDirty)
                return;
            //处理场景变换事件
            if (this._listenToSceneTransformChanged) {
                if (!this._sceneTransformChanged)
                    this._sceneTransformChanged = new feng3d.Transform3DEvent(feng3d.Transform3DEvent.SCENETRANSFORM_CHANGED, this.transform3D);
                this.dispatchEvent(this._sceneTransformChanged);
            }
            this.invalidateSceneTransform();
        };
        Object.defineProperty(Object3D.prototype, "parent", {
            /**
             * 父容器
             */
            get: function () {
                return this._parent;
            },
            set: function (value) {
                if (this._parent != null)
                    this._parent.removeChild(this);
                this._parent = value;
                this.transform3D.invalidateTransform();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "scenePosition", {
            /**
             * 获取场景坐标
             */
            get: function () {
                if (this._scenePositionDirty) {
                    this.sceneTransform.copyColumnTo(3, this._scenePosition);
                    this._scenePositionDirty = false;
                }
                return this._scenePosition;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 本地坐标转换为世界坐标
         * @param localVector3D 本地坐标
         * @return
         */
        Object3D.prototype.positionLocalToGlobal = function (localPosition) {
            var globalPosition = this.sceneTransform.transformVector(localPosition);
            return globalPosition;
        };
        /**
         * 世界坐标转换为本地坐标
         * @param globalPosition 世界坐标
         * @return
         */
        Object3D.prototype.positionGlobalToLocal = function (globalPosition) {
            var localPosition = this.inverseSceneTransform.transformVector(globalPosition);
            return localPosition;
        };
        /**
         * 本地方向转换为世界方向
         * @param localDirection 本地方向
         * @return
         */
        Object3D.prototype.directionLocalToGlobal = function (localDirection) {
            var globalDirection = this.sceneTransform.deltaTransformVector(localDirection);
            return globalDirection;
        };
        /**
         * 世界方向转换为本地方向
         * @param globalDirection 世界方向
         * @return
         */
        Object3D.prototype.directionGlobalToLocal = function (globalDirection) {
            var localDirection = this.inverseSceneTransform.deltaTransformVector(globalDirection);
            return localDirection;
        };
        /**
         * @inheritDoc
         */
        Object3D.prototype.dispatchEvent = function (event) {
            if ((feng3d.getQualifiedClassName(event) == "MouseEvent3D") && this.parent && !this.parent.ancestorsAllowMouseEnabled) {
                if (this.parent) {
                    return this.parent.dispatchEvent(event);
                }
                return false;
            }
            return _super.prototype.dispatchEvent.call(this, event);
        };
        Object.defineProperty(Object3D.prototype, "visible", {
            /**
             * 是否可见
             */
            get: function () {
                return this._visible;
            },
            set: function (value) {
                this._visible = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "sceneVisible", {
            /**
             * 是否在场景上可见
             */
            get: function () {
                //从这里开始一直找父容器到场景了，且visible全为true则为场景上可见
                return this.visible && (this.scene != null) && ((this.parent == this.scene) ? true : (this.parent ? this.parent.sceneVisible : false));
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @inheritDoc
         */
        Object3D.prototype.addEventListener = function (type, listener, priority, useWeakReference) {
            if (priority === void 0) { priority = 0; }
            if (useWeakReference === void 0) { useWeakReference = false; }
            _super.prototype.addEventListener.call(this, type, listener, priority, useWeakReference);
            switch (type) {
                case feng3d.Transform3DEvent.SCENETRANSFORM_CHANGED:
                    this._listenToSceneTransformChanged = true;
                    break;
            }
        };
        /**
         * @inheritDoc
         */
        Object3D.prototype.removeEventListener = function (type, listener, useCapture) {
            if (useCapture === void 0) { useCapture = false; }
            _super.prototype.removeEventListener.call(this, type, listener);
            if (this.hasEventListener(type))
                return;
            switch (type) {
                case feng3d.Transform3DEvent.SCENETRANSFORM_CHANGED:
                    this._listenToSceneTransformChanged = false;
                    break;
            }
        };
        Object.defineProperty(Object3D.prototype, "partition", {
            /**
             * 空间分区
             */
            get: function () {
                return this._explicitPartition;
            },
            set: function (value) {
                this._explicitPartition = value;
                this.implicitPartition = value ? value : (this._parent ? this._parent.implicitPartition : null);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "implicitPartition", {
            /**
             * 隐式空间分区
             */
            get: function () {
                return this._implicitPartition;
            },
            set: function (value) {
                if (value == this._implicitPartition)
                    return;
                this._implicitPartition = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "zOffset", {
            /**
             * Z偏移值
             */
            get: function () {
                return this._zOffset;
            },
            set: function (value) {
                this._zOffset = value;
            },
            enumerable: true,
            configurable: true
        });
        Object3D.prototype.onPositionChanged = function (event) {
            this.notifySceneTransformChange();
        };
        Object.defineProperty(Object3D.prototype, "minX", {
            /**
             * The minimum extremum of the object along the X-axis.
             */
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "minY", {
            /**
             * The minimum extremum of the object along the Y-axis.
             */
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "minZ", {
            /**
             * The minimum extremum of the object along the Z-axis.
             */
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "maxX", {
            /**
             * The maximum extremum of the object along the X-axis.
             */
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "maxY", {
            /**
             * The maximum extremum of the object along the Y-axis.
             */
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "maxZ", {
            /**
             * The maximum extremum of the object along the Z-axis.
             */
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Cleans up any resources used by the current object.
         */
        Object3D.prototype.dispose = function () {
        };
        return Object3D;
    }(feng3d.Component));
    feng3d.Object3D = Object3D;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * InteractiveObject3D 类是用户可以使用鼠标、键盘或其他用户输入设备与之交互的所有显示对象的抽象基类。
     * @see		flash.display.InteractiveObject
     * @author 	warden_feng 2014-5-5
     */
    var InteractiveObject3D = (function (_super) {
        __extends(InteractiveObject3D, _super);
        /**
         * 调用新的 InteractiveObject3D() 构造函数会引发 ArgumentError 异常。
         * @throws	me.feng.error.AbstractClassError
         */
        function InteractiveObject3D() {
            _super.call(this);
            this._mouseEnabled = false;
        }
        Object.defineProperty(InteractiveObject3D.prototype, "mouseEnabled", {
            /**
             * 是否开启鼠标事件
             */
            get: function () {
                return this._mouseEnabled;
            },
            set: function (value) {
                this._mouseEnabled = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @inheritDoc
         */
        InteractiveObject3D.prototype.dispatchEvent = function (event) {
            //处理3D鼠标事件禁用
            if (feng3d.getQualifiedClassName(event) == "MouseEvent3D" && !this.mouseEnabled) {
                if (this.parent) {
                    return this.parent.dispatchEvent(event);
                }
                return false;
            }
            return _super.prototype.dispatchEvent.call(this, event);
        };
        return InteractiveObject3D;
    }(feng3d.Object3D));
    feng3d.InteractiveObject3D = InteractiveObject3D;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 分区节点基类
     * @author feng 2015-3-8
     */
    var NodeBase = (function () {
        function NodeBase() {
        }
        /**
         * 创建一个分区节点基类
         */
        NodeBase.prototype.NodeBase = function () {
            this._childNodes = [];
        };
        Object.defineProperty(NodeBase.prototype, "parent", {
            /**
             * 父分区节点
             */
            get: function () {
                return this._parent;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NodeBase.prototype, "showDebugBounds", {
            /**
             * 是否显示调试边界
             */
            get: function () {
                return this._debugPrimitive != null;
            },
            /**
             * @private
             */
            set: function (value) {
                if ((this._debugPrimitive != null) == value)
                    return;
                if (value)
                    this._debugPrimitive = this.createDebugBounds();
                else {
                    //				_debugPrimitive.dispose();
                    this._debugPrimitive = null;
                }
                for (var i = 0; i < this._numChildNodes; ++i)
                    this._childNodes[i].showDebugBounds = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 添加节点
         * @param node	节点
         */
        NodeBase.prototype.addNode = function (node) {
            node._parent = this;
            this._numEntities += node._numEntities;
            this._childNodes[this._numChildNodes++] = node;
            node.showDebugBounds = this._debugPrimitive != null;
            var numEntities = node._numEntities;
            node = this;
            do
                node._numEntities += numEntities;
            while ((node = node._parent) != null);
        };
        /**
         * 移除节点
         * @param node 节点
         */
        NodeBase.prototype.removeNode = function (node) {
            var index = this._childNodes.indexOf(node);
            this._childNodes[index] = this._childNodes[--this._numChildNodes];
            this._childNodes.pop();
            var numEntities = node._numEntities;
            node = this;
            do
                node._numEntities -= numEntities;
            while ((node = node._parent) != null);
        };
        /**
         * 为给定实体查找分区节点
         * @param entity		实体
         * @return 				实体所在分区节点
         */
        NodeBase.prototype.findPartitionForEntity = function (entity) {
            entity = entity;
            return this;
        };
        /**
         * 接受横越者
         * @param traverser		访问节点的横越者
         */
        NodeBase.prototype.acceptTraverser = function (traverser) {
            if (this._numEntities == 0 && !this._debugPrimitive)
                return;
            if (traverser.enterNode(this)) {
                var i;
                while (i < this._numChildNodes)
                    this._childNodes[i++].acceptTraverser(traverser);
                if (this._debugPrimitive)
                    traverser.applyRenderable(this._debugPrimitive);
            }
        };
        /**
         * 创建调试边界
         */
        NodeBase.prototype.createDebugBounds = function () {
            return null;
        };
        /**
         * 更新多个实体
         * @param value 数量
         */
        NodeBase.prototype.updateNumEntities = function (value) {
            var diff = value - this._numEntities;
            var node = this;
            do
                node._numEntities += diff;
            while ((node = node._parent) != null);
        };
        /**
         * 测试是否出现在摄像机视锥体内
         * @param planes		视锥体面向量
         * @param numPlanes		面数
         * @return 				true：在视锥体内
         */
        NodeBase.prototype.isInFrustum = function (planes, numPlanes) {
            return true;
        };
        return NodeBase;
    }());
    feng3d.NodeBase = NodeBase;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 实体分区节点
     * @author feng 2015-3-8
     */
    var EntityNode = (function (_super) {
        __extends(EntityNode, _super);
        /**
         * 创建一个实体分区节点
         * @param entity		实体
         */
        function EntityNode(entity) {
            _super.call(this);
            this._entity = entity;
            this._numEntities = 1;
        }
        /**
         * 从父节点中移除
         */
        EntityNode.prototype.removeFromParent = function () {
            if (this._parent)
                this._parent.removeNode(this);
            this._parent = null;
        };
        Object.defineProperty(EntityNode.prototype, "entity", {
            /**
             * 实体
             */
            get: function () {
                return this._entity;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @inheritDoc
         */
        EntityNode.prototype.isInFrustum = function (planes, numPlanes) {
            if (!this._entity.sceneVisible)
                return false;
            return this._entity.worldBounds.isInFrustum(planes, numPlanes);
        };
        return EntityNode;
    }(feng3d.NodeBase));
    feng3d.EntityNode = EntityNode;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 3D空间分区
     * <p>用于把3D空间分区，便于搜索出有必要渲染的对象，从而优化性能</p>
     * @author feng 2015-3-5
     */
    var Partition3D = (function () {
        /**
         * 创建一个3D空间分区
         * @param rootNode	根节点
         */
        function Partition3D(rootNode) {
            this._rootNode = rootNode || new NullNode();
        }
        /**
         * 发送一个横越者穿过分区
         * @param traverser		横越者
         */
        Partition3D.prototype.traverse = function (traverser) {
            if (this._updatesMade)
                this.updateEntities();
            //更新收集标记
            ++PartitionTraverser._collectionMark;
            //接受一个穿越者来收集实体
            this._rootNode.acceptTraverser(traverser);
        };
        /**
         * 从分区树种移除实体
         * @param entity 被移除实体
         */
        Partition3D.prototype.removeEntity = function (entity) {
            var node = entity.getEntityPartitionNode();
            var t;
            //从父节点中移除
            node.removeFromParent();
            //链表中移除节点
            if (node == this._updateQueue)
                this._updateQueue = node._updateQueueNext;
            else {
                t = this._updateQueue;
                while (t && t._updateQueueNext != node)
                    t = t._updateQueueNext;
                //连接删除节点的前节点与后节点
                if (t)
                    t._updateQueueNext = node._updateQueueNext;
            }
            //清空删除节点的next指针
            node._updateQueueNext = null;
            if (!this._updateQueue)
                this._updatesMade = false;
        };
        /**
         * 标记为待更新节点，把新节点添加到待更新节点链表表头
         * @param entity	更新的实体
         */
        Partition3D.prototype.markForUpdate = function (entity) {
            var node = entity.getEntityPartitionNode();
            //链表中添加节点到表头
            var t = this._updateQueue;
            //判断节点是否已经存在链表中
            while (t) {
                if (node == t)
                    return;
                t = t._updateQueueNext;
            }
            //把表头添加到新节点的next指针
            node._updateQueueNext = this._updateQueue;
            //把新节点设置为表头
            this._updateQueue = node;
            this._updatesMade = true;
        };
        /**
         * 更新待更新节点中的实体
         */
        Partition3D.prototype.updateEntities = function () {
            var node = this._updateQueue;
            var targetNode;
            var t;
            //为了重新标记实体，清除更新队列
            this._updateQueue = null;
            this._updatesMade = false;
            do {
                targetNode = this._rootNode.findPartitionForEntity(node.entity);
                // 更新 待更新链表中节点的父节点
                if (node.parent != targetNode) {
                    if (node)
                        node.removeFromParent();
                    targetNode.addNode(node);
                }
                //获取链表中下个节点
                t = node._updateQueueNext;
                node._updateQueueNext = null;
                //调用节点实体的内部更新
                node.entity.internalUpdate();
            } while ((node = t) != null);
        };
        return Partition3D;
    }());
    feng3d.Partition3D = Partition3D;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 3d对象容器
     * @author feng 2014-3-21
     */
    var Container3D = (function (_super) {
        __extends(Container3D, _super);
        function Container3D() {
            _super.call(this);
            /** 容器内对象列表 */
            this._children = [];
            this._mouseChildren = true;
            /** 是否给根容器 */
            this._isRoot = false;
            this.namedAsset = new feng3d.NamedAsset(this, feng3d.AssetType.CONTAINER);
            this.addComponent(new feng3d.ContainerTransform3D());
        }
        /**
         * 添加子对象
         * @param child		子对象
         * @return			新增的子对象
         */
        Container3D.prototype.addChild = function (child) {
            if (!child._explicitPartition)
                child.implicitPartition = this._implicitPartition;
            child.parent = this;
            child.scene = this.scene;
            this._children.push(child);
            return child;
        };
        /**
         * 移出指定索引的子对象
         * @param childIndex	子对象索引
         * @return				被移除对象
         */
        Container3D.prototype.removeChildAt = function (childIndex) {
            var child = this.getChildAt(childIndex);
            this.removeChildInternal(childIndex, child);
            return child;
        };
        /**
         * 移除子对象
         * @param child		子对象
         */
        Container3D.prototype.removeChild = function (child) {
            var childIndex = this._children.indexOf(child);
            if (childIndex != -1) {
                this.removeChildInternal(childIndex, child);
            }
        };
        /**
         * 移除所有子对象
         */
        Container3D.prototype.removeAllChild = function () {
            for (var i = this._children.length - 1; i >= 0; i--) {
                this.removeChildAt(i);
            }
        };
        /**
         * 内部移除子对象
         * @param childIndex	移除子对象所在索引
         * @param child			移除子对象
         */
        Container3D.prototype.removeChildInternal = function (childIndex, child) {
            this._children.splice(childIndex, 1);
            child.parent = null;
            child.scene = null;
        };
        Object.defineProperty(Container3D.prototype, "scene", {
            set: function (scene) {
                _super.prototype.scene = scene;
                var len = this._children.length;
                for (var i = 0; i < len; i++) {
                    this._children[i].scene = scene;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container3D.prototype, "numChildren", {
            /**
             * 子对象个数
             */
            get: function () {
                return this._children.length;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 获取子对象
         * @param index
         * @return
         */
        Container3D.prototype.getChildAt = function (index) {
            return this._children[index];
        };
        /**
         * 是否包含该对象
         * @param child
         * @return
         */
        Container3D.prototype.contains = function (child) {
            return this._children.indexOf(child) >= 0;
        };
        Object.defineProperty(Container3D.prototype, "mouseChildren", {
            /**
             * 确定对象的子级是否支持鼠标或用户输入设备。
             */
            get: function () {
                return this._mouseChildren;
            },
            set: function (value) {
                this._mouseChildren = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container3D.prototype, "ancestorsAllowMouseEnabled", {
            /**
             * 祖先是否允许鼠标事件
             */
            get: function () {
                return this.mouseChildren && (this.parent ? this.parent.ancestorsAllowMouseEnabled : true);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container3D.prototype, "implicitPartition", {
            /**
             * @inheritDoc
             */
            set: function (value) {
                if (value == this._implicitPartition)
                    return;
                this._implicitPartition = value;
                var i;
                var len = this._children.length;
                var child;
                while (i < len) {
                    child = this._children[i];
                    i++;
                    if (!child._explicitPartition)
                        child.implicitPartition = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container3D.prototype, "minX", {
            /**
             * The minimum extremum of the object along the X-axis.
             */
            get: function () {
                var i;
                var len = this._children.length;
                var min = Number.POSITIVE_INFINITY;
                var m;
                while (i < len) {
                    var child = this._children[i++];
                    m = child.minX + child.transform3D.x;
                    if (m < min)
                        min = m;
                }
                return min;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container3D.prototype, "minY", {
            /**
             * The minimum extremum of the object along the Y-axis.
             */
            get: function () {
                var i;
                var len = this._children.length;
                var min = Number.POSITIVE_INFINITY;
                var m;
                while (i < len) {
                    var child = this._children[i++];
                    m = child.minY + child.transform3D.y;
                    if (m < min)
                        min = m;
                }
                return min;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container3D.prototype, "minZ", {
            /**
             * The minimum extremum of the object along the Z-axis.
             */
            get: function () {
                var i;
                var len = this._children.length;
                var min = Number.POSITIVE_INFINITY;
                var m;
                while (i < len) {
                    var child = this._children[i++];
                    m = child.minZ + child.transform3D.z;
                    if (m < min)
                        min = m;
                }
                return min;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container3D.prototype, "maxX", {
            /**
             * The maximum extremum of the object along the X-axis.
             */
            get: function () {
                // todo: this isn't right, doesn't take into account transforms
                var i;
                var len = this._children.length;
                var max = Number.NEGATIVE_INFINITY;
                var m;
                while (i < len) {
                    var child = this._children[i++];
                    m = child.maxX + child.transform3D.x;
                    if (m > max)
                        max = m;
                }
                return max;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container3D.prototype, "maxY", {
            /**
             * The maximum extremum of the object along the Y-axis.
             */
            get: function () {
                var i;
                var len = this._children.length;
                var max = Number.NEGATIVE_INFINITY;
                var m;
                while (i < len) {
                    var child = this._children[i++];
                    m = child.maxY + child.transform3D.y;
                    if (m > max)
                        max = m;
                }
                return max;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container3D.prototype, "maxZ", {
            /**
             * The maximum extremum of the object along the Z-axis.
             */
            get: function () {
                var i;
                var len = this._children.length;
                var max = Number.NEGATIVE_INFINITY;
                var m;
                while (i < len) {
                    var child = this._children[i++];
                    m = child.maxZ + child.transform3D.z;
                    if (m > max)
                        max = m;
                }
                return max;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @inheritDoc
         */
        Container3D.prototype.dispose = function () {
            if (this.parent)
                this.parent.removeChild(this);
        };
        return Container3D;
    }(feng3d.InteractiveObject3D));
    feng3d.Container3D = Container3D;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 3d容器变换组件
     * @author feng 2016-3-9
     */
    var ContainerTransform3D = (function (_super) {
        __extends(ContainerTransform3D, _super);
        function ContainerTransform3D() {
            _super.apply(this, arguments);
        }
        /**
         * 创建一个3d容器变换组件
         */
        ContainerTransform3D.prototype.ContainerTransform3D = function () {
            this.addEventListener(feng3d.ComponentEvent.BE_ADDED_COMPONET, this.onBeAddedComponet);
        };
        /**
         * 处理组件被添加事件
         * @param event
         */
        ContainerTransform3D.prototype.onBeAddedComponet = function (event) {
            var data = event.data;
            this.objectContainer3D = data.container;
            this.objectContainer3D.transform3D.addEventListener(feng3d.Transform3DEvent.TRANSFORM_CHANGED, this.onContainer3DTranformChange);
        };
        /**
         * 处理容器变换事件
         * @param event
         */
        ContainerTransform3D.prototype.onContainer3DTranformChange = function (event) {
            var len = this.objectContainer3D.numChildren;
            for (var i = 0; i < len; i++) {
                var transform3D = this.objectContainer3D.getChildAt(i).transform3D;
                transform3D.invalidateTransform();
            }
        };
        return ContainerTransform3D;
    }(feng3d.Component));
    feng3d.ContainerTransform3D = ContainerTransform3D;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 3d场景
     * @author feng 2014-3-17
     */
    var Scene3D = (function (_super) {
        __extends(Scene3D, _super);
        function Scene3D() {
            _super.apply(this, arguments);
        }
        /**
         * 创建一个3d场景
         */
        Scene3D.prototype.Scene3D = function () {
            this._isRoot = true;
            this._scene = this;
            this._entityDic = {};
            this._displayEntityDic = {};
            this._mouseCollisionEntitys = [];
            this._partitions = [];
            this.partition = new feng3d.Partition3D(new feng3d.NodeBase());
        };
        Object.defineProperty(Scene3D.prototype, "displayEntityDic", {
            /** 显示实体字典 */
            get: function () {
                return this._displayEntityDic;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 添加对象到场景
         * @param object3D		3d对象
         */
        Scene3D.prototype.addedObject3d = function (object3D) {
            if (feng3d.getQualifiedClassName(object3D) == "Entity") {
                this._entityDic[object3D.name] = object3D;
                if (object3D.visible) {
                    this._displayEntityDic[object3D.name] = object3D;
                }
            }
        };
        /**
         * 从场景中移除对象
         * @param object3D	3d对象
         */
        Scene3D.prototype.removedObject3d = function (object3D) {
            delete this._entityDic[object3D.name];
            delete this._displayEntityDic[object3D.name];
        };
        /**
         * 收集需要检测鼠标碰撞的实体
         */
        Scene3D.prototype.collectMouseCollisionEntitys = function () {
            this._mouseCollisionEntitys.length = 0;
            //3d对象堆栈
            var mouseCollisionStack = [];
            mouseCollisionStack.push(this);
            var object3D;
            var entity;
            var container3D;
            //遍历堆栈中需要检测鼠标碰撞的实体
            while (mouseCollisionStack.length > 0) {
                object3D = mouseCollisionStack.pop();
                if (!object3D.visible)
                    continue;
                entity = object3D;
                container3D = object3D;
                //收集需要检测鼠标碰撞的实体到检测列表
                if (entity && entity.mouseEnabled) {
                    this._mouseCollisionEntitys.push(object3D);
                }
                //收集容器内子对象到堆栈
                if (container3D && container3D.mouseChildren) {
                    var len = container3D.numChildren;
                    for (var i = 0; i < len; i++) {
                        mouseCollisionStack.push(container3D.getChildAt(i));
                    }
                }
            }
        };
        Object.defineProperty(Scene3D.prototype, "mouseCollisionEntitys", {
            /**
             * 需要检测鼠标碰撞的实体
             */
            get: function () {
                return this._mouseCollisionEntitys;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 横穿分区
         * @param traverser 横越者
         */
        Scene3D.prototype.traversePartitions = function (traverser) {
            var i;
            var len = this._partitions.length;
            traverser.scene = this;
            while (i < len) {
                this._partitions[i].traverse(traverser);
                i = i + 1;
            }
        };
        /**
         * 注销实体
         * @param entity	实体
         */
        Scene3D.prototype.unregisterEntity = function (entity) {
            entity.implicitPartition.removeEntity(entity);
        };
        /**
         * 注册实体
         * @param entity		实体
         */
        Scene3D.prototype.registerEntity = function (entity) {
            var partition = entity.implicitPartition;
            this.addPartitionUnique(partition);
            partition.markForUpdate(entity);
        };
        /**
         * 添加分区，如果不在列表中
         * @param partition		分区
         */
        Scene3D.prototype.addPartitionUnique = function (partition) {
            if (this._partitions.indexOf(partition) == -1)
                this._partitions.push(partition);
        };
        /**
         * 注册分区
         * @param entity	注册分区的实体
         */
        Scene3D.prototype.registerPartition = function (entity) {
            this.addPartitionUnique(entity.implicitPartition);
        };
        /**
         * 注销分区
         * @param entity	注销分区的实体
         */
        Scene3D.prototype.unregisterPartition = function (entity) {
            // todo: wait... is this even correct?
            // shouldn't we check the number of children in implicitPartition and remove partition if 0?
            entity.implicitPartition.removeEntity(entity);
        };
        return Scene3D;
    }(feng3d.Container3D));
    feng3d.Scene3D = Scene3D;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * Entity为所有场景绘制对象提供一个基类，表示存在场景中。可以被entityCollector收集。
     * @author feng 2014-3-24
     */
    var Entity = (function (_super) {
        __extends(Entity, _super);
        /**
         * 创建一个实体，该类为虚类
         */
        function Entity() {
            _super.call(this);
            this._boundsIsShown = false;
            this._boundsInvalid = true;
            this._worldBoundsInvalid = true;
            this._bounds = this.getDefaultBoundingVolume();
            this._worldBounds = this.getDefaultBoundingVolume();
        }
        Object.defineProperty(Entity.prototype, "showBounds", {
            /**
             * 是否显示边界
             */
            get: function () {
                return this._showBounds;
            },
            set: function (value) {
                if (value == this._showBounds)
                    return;
                this._showBounds = value;
                if (this._showBounds)
                    this.addBounds();
                else
                    this.removeBounds();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 添加边界
         */
        Entity.prototype.addBounds = function () {
            if (!this._boundsIsShown) {
                this._boundsIsShown = true;
                this.addChild(this.bounds.boundingRenderable);
            }
        };
        /**
         * 移除边界
         */
        Entity.prototype.removeBounds = function () {
            if (this._boundsIsShown) {
                this._boundsIsShown = false;
                this.removeChild(this._bounds.boundingRenderable);
                this._bounds.disposeRenderable();
            }
        };
        Object.defineProperty(Entity.prototype, "minX", {
            /**
             * @inheritDoc
             */
            get: function () {
                if (this._boundsInvalid)
                    this.updateBounds();
                return this._bounds.min.x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Entity.prototype, "minY", {
            /**
             * @inheritDoc
             */
            get: function () {
                if (this._boundsInvalid)
                    this.updateBounds();
                return this._bounds.min.y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Entity.prototype, "minZ", {
            /**
             * @inheritDoc
             */
            get: function () {
                if (this._boundsInvalid)
                    this.updateBounds();
                return this._bounds.min.z;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Entity.prototype, "maxX", {
            /**
             * @inheritDoc
             */
            get: function () {
                if (this._boundsInvalid)
                    this.updateBounds();
                return this._bounds.max.x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Entity.prototype, "maxY", {
            /**
             * @inheritDoc
             */
            get: function () {
                if (this._boundsInvalid)
                    this.updateBounds();
                return this._bounds.max.y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Entity.prototype, "maxZ", {
            /**
             * @inheritDoc
             */
            get: function () {
                if (this._boundsInvalid)
                    this.updateBounds();
                return this._bounds.max.z;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Entity.prototype, "bounds", {
            /**
             * 边界
             */
            get: function () {
                if (this._boundsInvalid)
                    this.updateBounds();
                return this._bounds;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @inheritDoc
         */
        Entity.prototype.invalidateSceneTransform = function () {
            _super.prototype.invalidateSceneTransform.call(this);
            this._worldBoundsInvalid = true;
        };
        /**
         * 边界失效
         */
        Entity.prototype.invalidateBounds = function () {
            this._boundsInvalid = true;
        };
        /**
         * 获取默认边界（默认盒子边界）
         * @return
         */
        Entity.prototype.getDefaultBoundingVolume = function () {
            return new AxisAlignedBoundingBox();
        };
        Object.defineProperty(Entity.prototype, "pickingCollisionVO", {
            /**
             * 获取碰撞数据
             */
            get: function () {
                if (!this._pickingCollisionVO)
                    this._pickingCollisionVO = new PickingCollisionVO(this);
                return this._pickingCollisionVO;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 判断射线是否穿过实体
         * @param ray3D
         * @return
         */
        Entity.prototype.isIntersectingRay = function (ray3D) {
            if (!this.pickingCollisionVO.localNormal)
                this.pickingCollisionVO.localNormal = new feng3d.Vector3D();
            //转换到当前实体坐标系空间
            var localRay = this.pickingCollisionVO.localRay;
            localRay.position = this.inverseSceneTransform.transformVector(ray3D.position);
            localRay.direction = this.inverseSceneTransform.deltaTransformVector(ray3D.direction);
            //检测射线与边界的碰撞
            var rayEntryDistance = this.bounds.rayIntersection(localRay, this.pickingCollisionVO.localNormal);
            if (rayEntryDistance < 0)
                return false;
            //保存碰撞数据
            this.pickingCollisionVO.rayEntryDistance = rayEntryDistance;
            this.pickingCollisionVO.ray3D = ray3D;
            this.pickingCollisionVO.rayOriginIsInsideBounds = rayEntryDistance == 0;
            return true;
        };
        Object.defineProperty(Entity.prototype, "pickingCollider", {
            /**
             * 获取采集的碰撞
             */
            get: function () {
                return this._pickingCollider;
            },
            set: function (value) {
                this._pickingCollider = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 碰撞前设置碰撞状态
         * @param shortestCollisionDistance 最短碰撞距离
         * @param findClosest 是否寻找最优碰撞
         * @return
         */
        Entity.prototype.collidesBefore = function (shortestCollisionDistance, findClosest) {
            return true;
        };
        Object.defineProperty(Entity.prototype, "implicitPartition", {
            /**
             * @inheritDoc
             */
            set: function (value) {
                if (value == this._implicitPartition)
                    return;
                if (this._implicitPartition)
                    this.notifyPartitionUnassigned();
                _super.prototype.implicitPartition = value;
                this.notifyPartitionAssigned();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 通知场景一个新分区已分配
         */
        Entity.prototype.notifyPartitionAssigned = function () {
            if (this._scene)
                this._scene.registerPartition(this);
        };
        /**
         * 通知场景一个分区取消分配
         */
        Entity.prototype.notifyPartitionUnassigned = function () {
            if (this._scene)
                this._scene.unregisterPartition(this);
        };
        Object.defineProperty(Entity.prototype, "scene", {
            /**
             * @inheritDoc
             */
            set: function (value) {
                if (value == this._scene)
                    return;
                if (this._scene)
                    this._scene.unregisterEntity(this);
                if (value)
                    value.registerEntity(this);
                _super.prototype.scene = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 获取实体分区节点
         */
        Entity.prototype.getEntityPartitionNode = function () {
            if (this._partitionNode == null) {
                this._partitionNode = this.createEntityPartitionNode();
            }
            return this._partitionNode;
        };
        /**
         * 内部更新
         */
        Entity.prototype.internalUpdate = function () {
            if (this._controller)
                this._controller.update();
        };
        Object.defineProperty(Entity.prototype, "worldBounds", {
            /**
             * 世界边界
             */
            get: function () {
                if (this._worldBoundsInvalid)
                    this.updateWorldBounds();
                return this._worldBounds;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 更新世界边界
         */
        Entity.prototype.updateWorldBounds = function () {
            this._worldBounds.transformFrom(this.bounds, this.sceneTransform);
            this._worldBoundsInvalid = false;
        };
        /**
         * The transformation matrix that transforms from model to world space, adapted with any special operations needed to render.
         * For example, assuring certain alignedness which is not inherent in the scene transform. By default, this would
         * return the scene transform.
         */
        Entity.prototype.getRenderSceneTransform = function (camera) {
            return this.sceneTransform;
        };
        return Entity;
    }(feng3d.Container3D));
    feng3d.Entity = Entity;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 控制器
     * @author feng 2014-10-10
     */
    var ControllerBase = (function () {
        /**
         * 创建控制器
         * @param targetObject 被控制对象
         */
        function ControllerBase(targetObject) {
            if (targetObject === void 0) { targetObject = null; }
            this._autoUpdate = true;
            this.targetObject = targetObject;
        }
        Object.defineProperty(ControllerBase.prototype, "targetObject", {
            /**
             * 被控制对象
             */
            get: function () {
                return this._targetObject;
            },
            set: function (val) {
                if (this._targetObject == val)
                    return;
                if (this._targetObject && this._autoUpdate)
                    this._targetObject._controller = null;
                this._targetObject = val;
                if (this._targetObject && this._autoUpdate)
                    this._targetObject._controller = this;
                this.notifyUpdate();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 通知被控制对象更新
         */
        ControllerBase.prototype.notifyUpdate = function () {
            this.update();
            //
            if (this._targetObject && this._targetObject.implicitPartition && this._autoUpdate)
                this._targetObject.implicitPartition.markForUpdate(this._targetObject);
        };
        return ControllerBase;
    }());
    feng3d.ControllerBase = ControllerBase;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 包围盒基类
     * @author feng 2014-4-27
     */
    var BoundingVolumeBase = (function () {
        /**
         * 创建包围盒
         */
        function BoundingVolumeBase() {
            this._aabbPointsDirty = true;
            this._min = new feng3d.Vector3D();
            this._max = new feng3d.Vector3D();
        }
        Object.defineProperty(BoundingVolumeBase.prototype, "max", {
            /**
             * The maximum extreme of the bounds
             */
            get: function () {
                return this._max;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BoundingVolumeBase.prototype, "min", {
            /**
             * The minimum extreme of the bounds
             */
            get: function () {
                return this._min;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BoundingVolumeBase.prototype, "boundingRenderable", {
            /**
             * 渲染实体
             */
            get: function () {
                if (!this._boundingRenderable) {
                    this._boundingRenderable = this.createBoundingRenderable();
                    this.updateBoundingRenderable();
                }
                return this._boundingRenderable;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 销毁渲染实体
         */
        BoundingVolumeBase.prototype.disposeRenderable = function () {
            this._boundingRenderable = null;
        };
        /**
         * 根据几何结构更新边界
         */
        BoundingVolumeBase.prototype.fromGeometry = function (geometry) {
            var subGeoms = geometry.subGeometries;
            var numSubGeoms = subGeoms.length;
            var minX, minY, minZ;
            var maxX, maxY, maxZ;
            if (numSubGeoms > 0) {
                var subGeom = subGeoms[0];
                var vertices = subGeom.vertexPositionData;
                var i = 0;
                minX = maxX = vertices[i];
                minY = maxY = vertices[i + 1];
                minZ = maxZ = vertices[i + 2];
                var j = 0;
                while (j < numSubGeoms) {
                    subGeom = subGeoms[j++];
                    vertices = subGeom.vertexPositionData;
                    var vertexDataLen = vertices.length;
                    i = 0;
                    var stride = subGeom.vertexPositionStride;
                    while (i < vertexDataLen) {
                        var v = vertices[i];
                        if (v < minX)
                            minX = v;
                        else if (v > maxX)
                            maxX = v;
                        v = vertices[i + 1];
                        if (v < minY)
                            minY = v;
                        else if (v > maxY)
                            maxY = v;
                        v = vertices[i + 2];
                        if (v < minZ)
                            minZ = v;
                        else if (v > maxZ)
                            maxZ = v;
                        i += stride;
                    }
                }
                this.fromExtremes(minX, minY, minZ, maxX, maxY, maxZ);
            }
            else
                this.fromExtremes(0, 0, 0, 0, 0, 0);
        };
        /**
         * 根据所给极值设置边界
         * @param minX 边界最小X坐标
         * @param minY 边界最小Y坐标
         * @param minZ 边界最小Z坐标
         * @param maxX 边界最大X坐标
         * @param maxY 边界最大Y坐标
         * @param maxZ 边界最大Z坐标
         */
        BoundingVolumeBase.prototype.fromExtremes = function (minX, minY, minZ, maxX, maxY, maxZ) {
            this._min.x = minX;
            this._min.y = minY;
            this._min.z = minZ;
            this._max.x = maxX;
            this._max.y = maxY;
            this._max.z = maxZ;
            if (this._boundingRenderable)
                this.updateBoundingRenderable();
        };
        /**
         * 检测射线是否与边界交叉
         * @param ray3D						射线
         * @param targetNormal				交叉点法线值
         * @return							射线起点到交点距离
         */
        BoundingVolumeBase.prototype.rayIntersection = function (ray3D, targetNormal) {
            return -1;
        };
        /**
         * 检测是否包含指定点
         * @param position 		被检测点
         * @return				true：包含指定点
         */
        BoundingVolumeBase.prototype.containsPoint = function (position) {
            return false;
        };
        /**
         * 从给出的球体设置边界
         * @param center 		球心坐标
         * @param radius 		球体半径
         */
        BoundingVolumeBase.prototype.fromSphere = function (center, radius) {
            this.fromExtremes(center.x - radius, center.y - radius, center.z - radius, center.x + radius, center.y + radius, center.z + radius);
        };
        return BoundingVolumeBase;
    }());
    feng3d.BoundingVolumeBase = BoundingVolumeBase;
})(feng3d || (feng3d = {}));
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
//# sourceMappingURL=feng3d.js.map