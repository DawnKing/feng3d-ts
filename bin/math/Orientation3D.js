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
//# sourceMappingURL=Orientation3D.js.map