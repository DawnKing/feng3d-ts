/**
 * WebglDemo
 */
var WebglDemo = (function () {
    function WebglDemo(document) {
        var canvas = document.getElementById("glcanvas");
        this.start(canvas);
    }
    WebglDemo.prototype.start = function (canvas) {
        this.initWebGL(canvas);
        // Only continue if WebGL is available and working
        if (this.gl) {
            this.initGL(this.gl);
            // Initialize the shaders; this is where all the lighting for the
            // vertices and so forth is established.
            this.initShaders();
        }
    };
    WebglDemo.prototype.initGL = function (gl) {
        gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
        gl.clearDepth(1.0); // Clear everything
        gl.enable(gl.DEPTH_TEST); // Enable depth testing
        gl.depthFunc(gl.LEQUAL); // Near things obscure far things
    };
    WebglDemo.prototype.initWebGL = function (canvas) {
        this.gl = null;
        try {
            this.gl = canvas.getContext("experimental-webgl");
        }
        catch (e) {
        }
        // If we don't have a GL context, give up now
        if (!this.gl) {
            alert("Unable to initialize WebGL. Your browser may not support it.");
        }
    };
    WebglDemo.prototype.initShaders = function () {
        var fragmentShader = this.getShader(this.gl, "shader-fs");
    };
    //
    // getShader
    //
    // Loads a shader program by scouring the current document,
    // looking for a script with the specified ID.
    //
    WebglDemo.prototype.getShader = function (gl, id) {
        var shaderScript = document.getElementById(id);
        // Didn't find an element with the specified ID; abort.
        if (!shaderScript) {
            return null;
        }
        // Walk through the source element's children, building the
        // shader source string.
        var theSource = "";
        var currentChild = shaderScript.firstChild;
        while (currentChild) {
            if (currentChild.nodeType == 3) {
                theSource += currentChild.textContent;
            }
            currentChild = currentChild.nextSibling;
        }
        // Now figure out what type of shader script we have,
        // based on its MIME type.
        var shader;
        if (shaderScript.type == "x-shader/x-fragment") {
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        }
        else if (shaderScript.type == "x-shader/x-vertex") {
            shader = gl.createShader(gl.VERTEX_SHADER);
        }
        else {
            return null; // Unknown shader type
        }
    };
    return WebglDemo;
}());
function start() {
    var demo = new WebglDemo(document);
    demo;
}
//# sourceMappingURL=WebglDemo.js.map