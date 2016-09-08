var testSources = [];
function loadjs(jsPath, onLoad) {
    if (onLoad === void 0) { onLoad = null; }
    var oHead = document.getElementsByTagName('HEAD').item(0);
    var loadedJs = document.createElement("script");
    loadedJs.onload = onLoad;
    loadedJs.src = jsPath + "?version=" + Math.random();
    oHead.appendChild(loadedJs);
}
function onFeng3dInited(ev) {
    loadjs("libs/feng3d-component.js", onFeng3dInited1);
}
function onFeng3dInited1(ev) {
    loadjs("libs/feng3d.js", onFeng3dInited2);
}
function onFeng3dInited2(ev) {
    if (testSources.length == 0)
        start();
    for (var i = 0; i < testSources.length; i++) {
        var element = testSources[i];
        loadjs("bin/" + element, alljsLoadOk);
        var className = getClassName(element);
    }
}
function alljsLoadOk(event) {
    start();
}
function getClassName(url) {
    return "me.feng3d." + url.split("/").pop().split(".")[0];
}
function assert(b) {
    if (!b)
        throw new Error();
}
function onLoad() {
    loadjs("libs/feng3d-event.js", onFeng3dInited);
}
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
}
var view3D;
//# sourceMappingURL=examples.js.map