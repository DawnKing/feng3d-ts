var testSources = [//
    // "me/feng/events/EventBubblesTest.js",//
    // "me/feng/events/EventBubblesTest2.js",//
    // "me/feng/events/EventDispatcherTest.js",//
    // "me/feng/events/IEventDispatcherTest.js",//
];

function loadjs(jsPath: string, onLoad = null) {
    var oHead = document.getElementsByTagName('HEAD').item(0);
    var loadedJs = document.createElement("script");
    loadedJs.onload = onLoad;
    loadedJs.src = jsPath + "?version=" + Math.random();
    oHead.appendChild(loadedJs);
}

function onFeng3dInited(ev: Event) {
        loadjs("../../libs/fagal.js");
}

function getClassName(url: string): string {
    return url.split("/").pop().split(".")[0];
}

loadjs("../libs/feng3d.js", onFeng3dInited);


// var requestAnimationFrame1 =
//     window["requestAnimationFrame"] ||
//     window["webkitRequestAnimationFrame"] ||
//     window["mozRequestAnimationFrame"] ||
//     window["oRequestAnimationFrame"] ||
//     window["msRequestAnimationFrame"];

// if (!requestAnimationFrame) {
//     requestAnimationFrame1 = function(callback) {
//         return window.setTimeout(callback, 1000 / 60);
//     };
// }

// var n:number = 0;

// requestAnimationFrame.call(window, onTick);
// function onTick(): void {
//     console.log(n++);
//     requestAnimationFrame.call(window, onTick)
// }