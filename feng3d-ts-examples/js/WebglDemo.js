var me;
(function (me) {
    var feng3d;
    (function (feng3d) {
        var WebglDemo = (function () {
            function WebglDemo() {
                this.init();
            }
            WebglDemo.prototype.init = function () {
                var canvas = document.getElementById("glcanvas");
                this.view3D = new feng3d.View3D(canvas);
                // var cube = Object3D.createPrimitive(PrimitiveType.Cube);
                // cube.space3D.x = -100;
                // cube.space3D.y = 100;
                // cube.space3D.z = 300;
                // cube.space3D.rx = 45;
                // cube.space3D.ry = 45;
                // this.view3D.scene.addObject3D(cube);
                var cube = new feng3d.Object3D("cube", [
                    feng3d.primitives.createCube(),
                    new feng3d.Space3D(-100, 100, 300, 45, 45.0),
                ]);
                this.view3D.scene.addObject3D(cube);
                var plane = new feng3d.Object3D("plane", [
                    feng3d.primitives.createPlane(),
                    new feng3d.Space3D(100, 100, 300, 90, 0, 45),
                ]);
                this.view3D.scene.addObject3D(plane);
                var sphere = new feng3d.Object3D("sphere", [
                    feng3d.primitives.createSphere(),
                    new feng3d.Space3D(0, -100, 300, 90, 0, 45),
                ]);
                this.view3D.scene.addObject3D(sphere);
                var capsule = new feng3d.Object3D("capsule", [
                    feng3d.primitives.createCapsule(),
                    new feng3d.Space3D(200, -50, 500, 0, 0, 0),
                ]);
                this.view3D.scene.addObject3D(capsule);
                var cylinder = new feng3d.Object3D("cylinder", [
                    feng3d.primitives.createCylinder(),
                    new feng3d.Space3D(200, -200, 500, -90, 0, 0),
                ]);
                this.view3D.scene.addObject3D(cylinder);
            };
            return WebglDemo;
        }());
        feng3d.WebglDemo = WebglDemo;
    })(feng3d = me.feng3d || (me.feng3d = {}));
})(me || (me = {}));
new me.feng3d.WebglDemo();
//# sourceMappingURL=WebglDemo.js.map