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
    testSources.forEach(function (element) {
        loadjs("../bin/" + element);
        var className = getClassName(element);
        document.write('<input type="submit" value="' + className + '" onclick="(new ' + className + '()).init()">');
    });
}
function getClassName(url) {
    return url.split("/").pop().split(".")[0];
}
loadjs("../libs/feng3d.js", onFeng3dInited);
//# sourceMappingURL=loadjs.js.map