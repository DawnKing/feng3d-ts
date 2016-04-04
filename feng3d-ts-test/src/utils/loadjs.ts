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

function onFeng3dInited(ev:Event) {
    
    testSources.forEach(element => {
        
        loadjs("../bin/"+element);
        var className = getClassName(element);
        document.write('<input type="submit" value="'+className+'" onclick="(new '+className+'()).init()">'); 
    });
}

function getClassName(url:string):string
{
    return url.split("/").pop().split(".")[0];
}

loadjs("../libs/feng3d.js", onFeng3dInited);