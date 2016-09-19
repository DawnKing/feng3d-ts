/// <reference path="../libs/feng3d.d.ts" />

function start() {

    var canvas = document.getElementById("glcanvas");
    view3D = new me.feng3d.View3D(canvas);

    var cube = me.feng3d.Object3D.createPrimitive(me.feng3d.PrimitiveType.Cube);
    cube.space3D.x = -100;
    cube.space3D.y = 100;
    cube.space3D.z = 300;
    cube.space3D.rx = 45;
    cube.space3D.ry = 45;
    view3D.scene.addObject3D(cube);

    var plane0 = new me.feng3d.Object3D("p", [
        me.feng3d.primitives.createPlane(),
        new me.feng3d.Space3D(0, 0, 300, 90)
    ]);
    
    view3D.scene.addObject3D(plane0);

    var plane = new me.feng3d.Object3D("plane", [
        me.feng3d.primitives.createPlane(),
        new me.feng3d.Space3D(100, 100, 300, 90, 0, 45),
    ]);
    view3D.scene.addObject3D(plane);

    var plane1 = new me.feng3d.Object3D("plane1", [
        me.feng3d.primitives.createPlane(),
        new me.feng3d.Space3D(-100, -100, 300, 90, 0, 45),
    ]);
    view3D.scene.addObject3D(plane1);

    var sphere = new me.feng3d.Object3D("sphere", [
        me.feng3d.primitives.createSphere(),
        new me.feng3d.Space3D(0, -100, 300, 90, 0, 45),
    ]);
    view3D.scene.addObject3D(sphere);

    var capsule = new me.feng3d.Object3D("capsule", [
        me.feng3d.primitives.createCapsule(),
        new me.feng3d.Space3D(200, -50, 500, 0, 0, 0),
    ]);
    view3D.scene.addObject3D(capsule);

    var cylinder = new me.feng3d.Object3D("cylinder", [
        me.feng3d.primitives.createCylinder(),
        new me.feng3d.Space3D(200, -200, 500, -90, 0, 0),
    ]);
    view3D.scene.addObject3D(cylinder);
}

var view3D: me.feng3d.View3D;