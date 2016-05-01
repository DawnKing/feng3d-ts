/// <reference path="../libs/feng3d.d.ts" />

function start() {

    var canvas = document.getElementById("glcanvas");
    view3D = new me.feng3d.View3D(canvas);

    var plane0 = new me.feng3d.Object3D("p", [
        me.feng3d.primitives.createPlane(1, 1),
        new me.feng3d.Space3D(0, 0, 3, 90)
    ]);
    view3D.scene.addObject3D(plane0);

    var plane = new me.feng3d.Object3D("plane", [
        me.feng3d.primitives.createPlane(1, 1),
        new me.feng3d.Space3D(1, 1, 3, 90, 0, 45),
    ]);
    view3D.scene.addObject3D(plane);

    var plane1 = new me.feng3d.Object3D("plane1", [
        me.feng3d.primitives.createPlane(1, 1),
        new me.feng3d.Space3D(-1, -1, 3, 90, 0, 45),
    ]);
    view3D.scene.addObject3D(plane1);

    var cube = me.feng3d.Object3D.createPrimitive(me.feng3d.PrimitiveType.Cube);
    cube.space3D.x = -1;
    cube.space3D.y = 1;
    cube.space3D.z = 3;
    cube.space3D.rx = 45;
    cube.space3D.ry = 45;
    view3D.scene.addObject3D(cube);
}

var view3D: me.feng3d.View3D;