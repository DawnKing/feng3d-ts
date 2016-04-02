/**
 * Matrix3DTest
 */
var Matrix3DTest = (function () {
    function Matrix3DTest() {
    }
    Matrix3DTest.prototype.init = function () {
        this.test();
    };
    Matrix3DTest.prototype.test = function () {
        var mat = new feng3d.Matrix3D();
        mat.appendTranslation(1, 2, 3);
    };
    return Matrix3DTest;
}());
// var mtest = new Matrix3DTest();
// mtest.init(); 
//# sourceMappingURL=Matrix3DTest.js.map