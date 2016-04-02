/**
 * Matrix3DTest
 */
class Matrix3DTest {
    constructor() {

    }

    init() {
        this.test();
    }

    test() {
       var mat = new feng3d.Matrix3D();
       mat.appendTranslation(1,2,3);
    }
}

// var mtest = new Matrix3DTest();
// mtest.init();