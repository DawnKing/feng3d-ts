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
//# sourceMappingURL=Matrix3DUtils.js.map