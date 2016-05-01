/// <reference path="../libs/feng3d.d.ts" />
function start() {
    var canvas = document.getElementById("glcanvas");
    view3D = new me.feng3d.View3D(canvas);
    var plane = new me.feng3d.Object3D("plane");
    plane.addComponent(me.feng3d.primitives.createPlane(1, 1));
    plane.space3D.x = 1;
    plane.space3D.y = 1;
    plane.space3D.z = 3;
    plane.space3D.rx = 90;
    plane.space3D.sx = .5;
    plane.space3D.sy = .5;
    view3D.scene.addObject3D(plane);
}
var view3D;
//# sourceMappingURL=WebglDemo.js.map