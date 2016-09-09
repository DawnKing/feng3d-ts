var testSources = [//
    // "WebglDemo.js",//
    // "me/feng3d/events/EventBubblesTest2.js",//
    // "me/feng3d/events/EventDispatcherTest.js",//
    // "me/feng3d/events/IEventDispatcherTest.js",//
    // "me/feng3d/events/EventPriortyTest.js",//
];

function loadjs(jsPath: string, onLoad = null) {
    var oHead = document.getElementsByTagName('HEAD').item(0);
    var loadedJs = document.createElement("script");
    loadedJs.onload = onLoad;
    loadedJs.src = jsPath + "?version=" + Math.random();
    oHead.appendChild(loadedJs);
}

function onFeng3dInited(ev: Event) {

    if (testSources.length == 0)
        start();
    for (var i = 0; i < testSources.length; i++) {
        var element = testSources[i];

        loadjs("bin/" + element, alljsLoadOk);
        var className = getClassName(element);
    }
}

function alljsLoadOk(event: Event) {
    start();
}

function getClassName(url: string): string {
    return "me.feng3d." + url.split("/").pop().split(".")[0];
}

function assert(b: boolean) {
    if (!b)
        throw new Error();
}

function onLoad() {
    loadjs("libs/feng3d.js", onFeng3dInited);
}