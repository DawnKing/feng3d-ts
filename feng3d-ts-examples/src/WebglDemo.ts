module me.feng3d {

    export class WebglDemo {

        view3D: View3D;
        constructor() {

            this.init();
        }

        init() {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new View3D(canvas);

            // var cube = Object3D.createPrimitive(PrimitiveType.Cube);
            // cube.space3D.x = -100;
            // cube.space3D.y = 100;
            // cube.space3D.z = 300;
            // cube.space3D.rx = 45;
            // cube.space3D.ry = 45;
            // this.view3D.scene.addObject3D(cube);

            var cube = new Object3D("cube", [
                primitives.createCube(),
                new Space3D(-100, 100, 300, 45, 45.0),
            ]);
            this.view3D.scene.addObject3D(cube);

            var plane = new Object3D("plane", [
                primitives.createPlane(),
                new Space3D(100, 100, 300, 90, 0, 45),
            ]);
            this.view3D.scene.addObject3D(plane);

            var sphere = new Object3D("sphere", [
                primitives.createSphere(),
                new Space3D(0, -100, 300, 90, 0, 45),
            ]);
            this.view3D.scene.addObject3D(sphere);

            var capsule = new Object3D("capsule", [
                primitives.createCapsule(),
                new Space3D(200, -50, 500, 0, 0, 0),
            ]);
            this.view3D.scene.addObject3D(capsule);

            var cylinder = new Object3D("cylinder", [
                primitives.createCylinder(),
                new Space3D(200, -200, 500, -90, 0, 0),
            ]);
            this.view3D.scene.addObject3D(cylinder);
        }

    }

}

new me.feng3d.WebglDemo();