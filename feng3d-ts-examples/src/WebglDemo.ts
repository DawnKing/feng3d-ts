/// <reference path="../libs/feng3d.d.ts" />

function start() {

    var canvas = document.getElementById("glcanvas");
    view3D = new me.feng3d.View3D(canvas);

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
}

var view3D: me.feng3d.View3D;