var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var feng3d;
(function (feng3d) {
    /**
     * 测试基础渲染函数
     * @author feng 2014-10-24
     */
    var BaseShaderTest = (function (_super) {
        __extends(BaseShaderTest, _super);
        function BaseShaderTest() {
            _super.call(this);
            this.CONTEXT_WIDTH = 670;
            this.CONTEXT_HEIGHT = 380;
            this.DEGS_TO_RADIANS = Math.PI / 180;
            this.resourceList = [];
        }
        /**
         * Global initialise function
         */
        BaseShaderTest.prototype.init = function () {
            // Request a 3D this.context instance
            this.stage3D = this.stage.stage3Ds[0];
            this.stage3D.addEventListener(Event.CONTEXT3D_CREATE, this.contextReady, 0, true);
            this.stage3D.requestContext3D(Context3DRenderMode.AUTO, Context3DProfile.STANDARD);
            logger("Awaiting this.context...");
        };
        BaseShaderTest.prototype.contextReady = function (event) {
            this.stage3D.removeEventListener(Event.CONTEXT3D_CREATE, this.contextReady);
            logger("Got this.context!");
            // Get the new this.context
            this.context = this.stage3D.context3D;
            // Configure back buffer
            this.context.configureBackBuffer(this.CONTEXT_WIDTH, this.CONTEXT_HEIGHT, 2, true);
            this.stage3D.x = this.stage3D.y = 0;
            // Prepare vertex data
            var vertexPositionData = [-0.5, -0.5, 0,
                -0.5, 0.5, 0,
                0.5, 0.0, 0 //<- 3rd vertex this.x,this.y,this.z,
            ];
            var vertexColorData = [1.0, 0.0, 0.0,
                0.0, 1.0, 0.0,
                0.0, 0.0, 1.0 //<- 3rd vertex r,g,b
            ];
            // Connect the vertices into a triangle (in counter-clockwise order)
            var indexData = [0, 1, 2];
            this.baseGem = new feng3d.BaseGeometry();
            this.baseGem.setGeometry(vertexPositionData, vertexColorData, indexData);
            this.baseMesh = new feng3d.BaseMesh(this.baseGem);
            // ...and start rendering frames!
            this.addEventListener(Event.ENTER_FRAME, this.renderFrame, 0, true);
        };
        BaseShaderTest.prototype.renderFrame = function (e) {
            // Clear away the old frame render
            this.context.clear();
            // Calculate the view matrix, and run the shader program!
            this.baseMesh.render(this.context, this.makeViewMatrix());
            // Show the newly rendered frame on screen
            this.context.present();
        };
        BaseShaderTest.prototype.makeViewMatrix = function () {
            var aspect = this.CONTEXT_WIDTH / this.CONTEXT_HEIGHT;
            var zNear = 0.01;
            var zFar = 1000;
            var fov = 45 * this.DEGS_TO_RADIANS;
            var view = new feng3d.PerspectiveMatrix3D();
            view.perspectiveFieldOfViewLH(fov, aspect, zNear, zFar);
            var m = new Matrix3D();
            m.appendRotation(Date.now() / 30, Vector3D.Z_AXIS);
            m.appendTranslation(0, 0, 2);
            m.append(view);
            return m;
        };
        return BaseShaderTest;
    }(TestBase));
    feng3d.BaseShaderTest = BaseShaderTest;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 通过顶点颜色渲染地形
     * @author feng 2014-10-24
     */
    var ColorMapTest = (function (_super) {
        __extends(ColorMapTest, _super);
        function ColorMapTest() {
            _super.call(this);
            this.CONTEXT_WIDTH = 670;
            this.CONTEXT_HEIGHT = 380;
            this.resourceList = [];
        }
        /**
         * Global initialise function
         */
        ColorMapTest.prototype.init = function () {
            Debug.agalDebug = true;
            // Request a 3D this.context instance
            this.stage3D = this.stage.stage3Ds[0];
            this.stage3D.addEventListener(Event.CONTEXT3D_CREATE, this.contextReady, 0, true);
            this.stage3D.requestContext3D(Context3DRenderMode.AUTO, Context3DProfile.STANDARD);
            console.log("Awaiting this.context...");
        };
        ColorMapTest.prototype.contextReady = function (event) {
            this.stage3D.removeEventListener(Event.CONTEXT3D_CREATE, this.contextReady);
            console.log("Got this.context!");
            // Get the new this.context
            this.context = this.stage3D.context3D;
            // Configure back buffer
            this.context.configureBackBuffer(this.CONTEXT_WIDTH, this.CONTEXT_HEIGHT, 2, true);
            this.stage3D.x = this.stage3D.y = 0;
            var vertexColorData = [
                1.0, 0.0, 0.0,
                0.0, 1.0, 0.0,
                0.0, 0.0, 1.0 //<- 3rd vertex r,g,b
            ];
            var vertexUVData = [
                1.0, 0.0,
                0.0, 1.0,
                0.0, 0.0 //<- 3rd vertex u,v
            ];
            // Connect the vertices into a triangle (in counter-clockwise order)
            var indexData = [0, 1, 2];
            //创建几何体
            this.baseGem = new feng3d.ColorTerrainGeometry();
            this.baseGem.setGeometry(vertexColorData, vertexColorData, indexData);
            this.baseGem.vertexUVData = vertexUVData;
            //创建材质
            var colorMapMaterial = new feng3d.ColorMapMaterial();
            //创建网格
            this.baseMesh = new feng3d.BaseMesh(this.baseGem, colorMapMaterial);
            // ...and start rendering frames!
            this.addEventListener(Event.ENTER_FRAME, this.renderFrame, 0, true);
        };
        ColorMapTest.prototype.renderFrame = function (e) {
            // Clear away the old frame render
            this.context.clear();
            // Calculate the view matrix, and run the shader program!
            this.baseMesh.render(this.context, null);
            // Show the newly rendered frame on screen
            this.context.present();
        };
        return ColorMapTest;
    }(TestBase));
    feng3d.ColorMapTest = ColorMapTest;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 通过顶点颜色渲染地形
     * @author feng 2014-10-24
     */
    var ColorTerrainShaderTest = (function (_super) {
        __extends(ColorTerrainShaderTest, _super);
        function ColorTerrainShaderTest() {
            _super.call(this);
            this.CONTEXT_WIDTH = 670;
            this.CONTEXT_HEIGHT = 380;
            this.DEGS_TO_RADIANS = Math.PI / 180;
            //splat texture maps
            this.grassPath = "embeds/terrain/grass.jpg";
            this.rockPath = "embeds/terrain/rock.jpg";
            this.beachPath = "embeds/terrain/beach.jpg";
            this.resourceList = [this.grassPath, this.rockPath, this.beachPath];
            this.rootPath = "http://images.feng3d.me/feng3dDemo/assets/";
        }
        /**
         * Global initialise function
         */
        ColorTerrainShaderTest.prototype.init = function () {
            // Request a 3D this.context instance
            this.stage3D = this.stage.stage3Ds[0];
            this.stage3D.addEventListener(Event.CONTEXT3D_CREATE, this.contextReady, 0, true);
            this.stage3D.requestContext3D(Context3DRenderMode.AUTO, Context3DProfile.STANDARD);
            console.log("Awaiting this.context...");
        };
        ColorTerrainShaderTest.prototype.contextReady = function (event) {
            this.stage3D.removeEventListener(Event.CONTEXT3D_CREATE, this.contextReady);
            console.log("Got this.context!");
            // Get the new this.context
            this.context = this.stage3D.context3D;
            // Configure back buffer
            this.context.configureBackBuffer(this.CONTEXT_WIDTH, this.CONTEXT_HEIGHT, 2, true);
            this.stage3D.x = this.stage3D.y = 0;
            // Prepare vertex data
            var vertexPositionData = [
                -0.5, -0.5, 0,
                -0.5, 0.5, 0,
                0.5, 0.0, 0 //<- 3rd vertex this.x,this.y,this.z,
            ];
            var vertexColorData = [
                1.0, 0.0, 0.0,
                0.0, 1.0, 0.0,
                0.0, 0.0, 1.0 //<- 3rd vertex r,g,b
            ];
            var vertexUVData = [
                1.0, 0.0,
                0.0, 1.0,
                0.0, 0.0 //<- 3rd vertex u,v
            ];
            // Connect the vertices into a triangle (in counter-clockwise order)
            var indexData = [0, 1, 2];
            //创建几何体
            this.baseGem = new feng3d.ColorTerrainGeometry();
            this.baseGem.setGeometry(vertexPositionData, vertexColorData, indexData);
            this.baseGem.vertexUVData = vertexUVData;
            //创建材质
            var _splats = [Cast.bitmapTexture(this.resourceDic[this.beachPath]), Cast.bitmapTexture(this.resourceDic[this.grassPath]), Cast.bitmapTexture(this.resourceDic[this.rockPath])];
            var colorTerrainMaterial = new feng3d.ColorTerrainMaterial(_splats);
            //创建网格
            this.baseMesh = new feng3d.BaseMesh(this.baseGem, colorTerrainMaterial);
            // ...and start rendering frames!
            this.addEventListener(Event.ENTER_FRAME, this.renderFrame, 0, true);
        };
        ColorTerrainShaderTest.prototype.renderFrame = function (e) {
            // Clear away the old frame render
            this.context.clear();
            // Calculate the view matrix, and run the shader program!
            this.baseMesh.render(this.context, this.makeViewMatrix());
            // Show the newly rendered frame on screen
            this.context.present();
        };
        ColorTerrainShaderTest.prototype.makeViewMatrix = function () {
            var aspect = this.CONTEXT_WIDTH / this.CONTEXT_HEIGHT;
            var zNear = 0.01;
            var zFar = 1000;
            var fov = 45 * this.DEGS_TO_RADIANS;
            var view = new feng3d.PerspectiveMatrix3D();
            view.perspectiveFieldOfViewLH(fov, aspect, zNear, zFar);
            var m = new Matrix3D();
            //			m.appendRotation(getTimer() / 30, Vector3D.Z_AXIS);
            m.appendTranslation(0, 0, 2);
            m.append(view);
            return m;
        };
        return ColorTerrainShaderTest;
    }(TestBase));
    feng3d.ColorTerrainShaderTest = ColorTerrainShaderTest;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 测试3D环境缓存类
     * @author feng 2015-7-1
     */
    var Context3DCacheDebugText = (function (_super) {
        __extends(Context3DCacheDebugText, _super);
        function Context3DCacheDebugText() {
            _super.call(this);
            this.debugTextPath = "context3DCacheDebug.txt";
            this.resourceList = [this.debugTextPath];
        }
        /**
         * Global initialise function
         */
        Context3DCacheDebugText.prototype.init = function () {
            var obj = JSON.parse(this.resourceDic[this.debugTextPath]);
            this.context3DCache = Context3DBufferDebug.getContext3DCache(obj);
            this.stage3D = this.stage.stage3Ds[0];
            //Add event listener before requesting the context
            this.stage3D.addEventListener(Event.CONTEXT3D_CREATE, this.contextCreated);
            this.stage3D.requestContext3D(Context3DRenderMode.AUTO, Context3DProfile.STANDARD);
        };
        //Note, context3DCreate event can happen at any time, such as when the hardware resources are taken by another process
        Context3DCacheDebugText.prototype.contextCreated = function (event) {
            this.renderContext = as(event.target, Stage3D).context3D;
            logger("3D driver: " + this.renderContext.driverInfo);
            this.setupScene();
        };
        Context3DCacheDebugText.prototype.setupScene = function () {
            this.renderContext.enableErrorChecking = true; //Can slow rendering - only turn on when developing/testing
            this.renderContext.configureBackBuffer(this.stage.stageWidth, this.stage.stageHeight, 2, false);
            //			this.stage.addEventListener(Event.ENTER_FRAME, this.render);
            this.render(null);
        };
        Context3DCacheDebugText.prototype.render = function (event) {
            this.renderContext.clear(1, 1, 1);
            this.context3DCache.render(this.renderContext);
            //Show the frame
            this.renderContext.present();
        };
        Context3DCacheDebugText.prototype.contextCreationError = function (error) {
            logger(error);
        };
        return Context3DCacheDebugText;
    }(TestBase));
    feng3d.Context3DCacheDebugText = Context3DCacheDebugText;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     *
     * @author cdz 2015-11-5
     */
    var TextureTest = (function (_super) {
        __extends(TextureTest, _super);
        function TextureTest() {
            _super.call(this);
            this.CONTEXT_WIDTH = 670;
            this.CONTEXT_HEIGHT = 380;
            this.DEGS_TO_RADIANS = Math.PI / 180;
            this.texturePath = "embeds/wheel.png";
            this.resourceList = [this.texturePath];
            this.rootPath = "http://images.feng3d.me/feng3dDemo/assets/";
        }
        /**
         * Global initialise function
         */
        TextureTest.prototype.init = function () {
            // Request a 3D this.context instance
            this.stage3D = this.stage.stage3Ds[0];
            this.stage3D.addEventListener(Event.CONTEXT3D_CREATE, this.contextReady, 0, true);
            this.stage3D.requestContext3D(Context3DRenderMode.AUTO, Context3DProfile.STANDARD);
            logger("Awaiting this.context...");
        };
        TextureTest.prototype.contextReady = function (event) {
            this.stage3D.removeEventListener(Event.CONTEXT3D_CREATE, this.contextReady);
            logger("Got this.context!");
            // Get the new this.context
            this.context = this.stage3D.context3D;
            // Configure back buffer
            this.context.configureBackBuffer(this.CONTEXT_WIDTH, this.CONTEXT_HEIGHT, 2, true);
            this.stage3D.x = this.stage3D.y = 0;
            // Prepare vertex data
            var vertexPositionData = [-0.5, -0.5, 0,
                -0.5, 0.5, 0,
                0.5, 0.5, 0,
                0.5, -0.5, 0,
            ];
            var vertexColorData = [1.0, 0.0, 0.0,
                0.0, 1.0, 0.0,
                0.0, 0.0, 1.0,
                0.0, 0.0, 1.0,
            ];
            var vertexUVData = [
                0.0, 0.0,
                0.0, 1.0,
                1.0, 1.0,
                1.0, 0.0 //<- 4rd vertex u,v
            ];
            // Connect the vertices into a triangle (in counter-clockwise order)
            var indexData = [0, 1, 2, 2, 3, 0];
            this.baseGem = new feng3d.TextureTestGeometry();
            this.baseGem.setGeometry(vertexPositionData, vertexColorData, indexData);
            this.baseGem.vertexUVData = vertexUVData;
            var textureData = Cast.bitmapTexture(this.resourceDic[this.texturePath]);
            var textureMaterial = new feng3d.TextureTestMaterial(textureData);
            this.baseMesh = new feng3d.BaseMesh(this.baseGem, textureMaterial);
            // ...and start rendering frames!
            this.addEventListener(Event.ENTER_FRAME, this.renderFrame, 0, true);
        };
        TextureTest.prototype.renderFrame = function (e) {
            // Clear away the old frame render
            this.context.clear();
            // Calculate the view matrix, and run the shader program!
            this.baseMesh.render(this.context, this.makeViewMatrix());
            // Show the newly rendered frame on screen
            this.context.present();
        };
        TextureTest.prototype.makeViewMatrix = function () {
            var aspect = this.CONTEXT_WIDTH / this.CONTEXT_HEIGHT;
            var zNear = 0.01;
            var zFar = 1000;
            var fov = 45 * this.DEGS_TO_RADIANS;
            var view = new feng3d.PerspectiveMatrix3D();
            view.perspectiveFieldOfViewLH(fov, aspect, zNear, zFar);
            var m = new Matrix3D();
            m.appendRotation(Date.now() / 30, Vector3D.Z_AXIS);
            m.appendTranslation(0, 0, 2);
            m.append(view);
            return m;
        };
        return TextureTest;
    }(TestBase));
    feng3d.TextureTest = TextureTest;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     *
     * @author feng 2014-10-27
     */
    var BaseGeometry = (function (_super) {
        __extends(BaseGeometry, _super);
        function BaseGeometry() {
            _super.call(this);
            this.initBuffers();
        }
        BaseGeometry.prototype.initBuffers = function () {
            this.context3DBufferOwner.mapContext3DBuffer(this._.index, this.updateIndexBuffer);
            this.mapVABuffer(this._.position_va_3, 3);
            this.mapVABuffer(this._.color_va_3, 3);
        };
        BaseGeometry.prototype.updateIndexBuffer = function (indexBuffer) {
            indexBuffer.update(this._indices, this.numIndices, this.numIndices);
        };
        BaseGeometry.prototype.setGeometry = function (positionData, colorData, indexData) {
            this.numVertices = positionData.length / 3;
            this.setVAData(this._.position_va_3, positionData);
            this.setVAData(this._.color_va_3, colorData);
            this._indices = indexData;
            this.numIndices = this._indices.length;
        };
        return BaseGeometry;
    }(VertexBufferOwner));
    feng3d.BaseGeometry = BaseGeometry;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     *
     * @author feng 2015-5-14
     */
    var ColorTerrainGeometry = (function (_super) {
        __extends(ColorTerrainGeometry, _super);
        function ColorTerrainGeometry() {
            _super.call(this);
        }
        Object.defineProperty(ColorTerrainGeometry.prototype, "vertexUVData", {
            get: function () {
                return this.getVAData(this._.uv_va_2);
            },
            set: function (value) {
                this.setVAData(this._.uv_va_2, value);
            },
            enumerable: true,
            configurable: true
        });
        ColorTerrainGeometry.prototype.initBuffers = function () {
            this.mapVABuffer(this._.uv_va_2, 2);
            _super.prototype.initBuffers.call(this);
        };
        return ColorTerrainGeometry;
    }(feng3d.BaseGeometry));
    feng3d.ColorTerrainGeometry = ColorTerrainGeometry;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     *
     * @author feng 2015-5-14
     */
    var TextureTestGeometry = (function (_super) {
        __extends(TextureTestGeometry, _super);
        function TextureTestGeometry() {
            _super.call(this);
        }
        Object.defineProperty(TextureTestGeometry.prototype, "vertexUVData", {
            get: function () {
                return this.getVAData(this._.uv_va_2);
            },
            set: function (value) {
                this.setVAData(this._.uv_va_2, value);
            },
            enumerable: true,
            configurable: true
        });
        TextureTestGeometry.prototype.initBuffers = function () {
            this.mapVABuffer(this._.uv_va_2, 2);
            _super.prototype.initBuffers.call(this);
        };
        return TextureTestGeometry;
    }(feng3d.BaseGeometry));
    feng3d.TextureTestGeometry = TextureTestGeometry;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 基础材质
     * @author feng 2014-10-27
     */
    var BaseMaterial = (function (_super) {
        __extends(BaseMaterial, _super);
        function BaseMaterial() {
            _super.call(this);
            this.modelViewProjection = new Matrix3D();
            this.mre = FagalRE.instance;
        }
        Object.defineProperty(BaseMaterial.prototype, "shaderParams", {
            get: function () {
                return this._shaderParams = this._shaderParams || new ShaderParams();
            },
            enumerable: true,
            configurable: true
        });
        BaseMaterial.prototype.initBuffers = function () {
            this.mapContext3DBuffer(this._.projection_vc_matrix, this.updateProjectionBuffer);
            this.mapContext3DBuffer(this._.program, this.updateProgramBuffer);
        };
        BaseMaterial.prototype.render = function (viewMatrix) {
            this.modelViewProjection = viewMatrix;
            this.markBufferDirty(this._.projection_vc_matrix);
        };
        /**
         * 更新投影矩阵
         */
        BaseMaterial.prototype.updateProjectionBuffer = function (projectionBuffer) {
            projectionBuffer.update(this.modelViewProjection, true);
        };
        /**
         * 更新（编译）渲染程序
         */
        BaseMaterial.prototype.updateProgramBuffer = function (programBuffer) {
            var result = FagalRE.runShader(feng3d.V_baseShader, feng3d.F_baseShader);
            //上传程序
            programBuffer.update(result.vertexCode, result.fragmentCode);
        };
        return BaseMaterial;
    }(Context3DBufferOwner));
    feng3d.BaseMaterial = BaseMaterial;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 颜色映射材质
     * @author feng 2015-5-14
     */
    var ColorMapMaterial = (function (_super) {
        __extends(ColorMapMaterial, _super);
        /**
         * 创建一个颜色映射材质
         */
        function ColorMapMaterial() {
            _super.call(this);
            /**
             * 通用数据
             */
            this.commonsData = [0, 0, 0, 0];
        }
        /**
         * @inheritDoc
         */
        ColorMapMaterial.prototype.initBuffers = function () {
            this.mapContext3DBuffer(this._.commonsData_vc_vector, this.updateCommonsDataBuffer);
            _super.prototype.initBuffers.call(this);
        };
        /**
         * 更新通用数据
         */
        ColorMapMaterial.prototype.updateCommonsDataBuffer = function (vcVectorBuffer) {
            this.commonsData[0] = 2;
            this.commonsData[1] = 1;
            this.commonsData[2] = 0;
            this.commonsData[3] = 0;
            vcVectorBuffer.update(this.commonsData);
        };
        /**
         * @inheritDoc
         */
        ColorMapMaterial.prototype.updateProgramBuffer = function (programBuffer) {
            var result = FagalRE.runShader(feng3d.V_colorMap, feng3d.F_colorMap);
            //上传程序
            programBuffer.update(result.vertexCode, result.fragmentCode);
        };
        return ColorMapMaterial;
    }(feng3d.BaseMaterial));
    feng3d.ColorMapMaterial = ColorMapMaterial;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 颜色地形材质
     * @author feng 2015-5-14
     */
    var ColorTerrainMaterial = (function (_super) {
        __extends(ColorTerrainMaterial, _super);
        function ColorTerrainMaterial(splats) {
            _super.call(this);
            this._splats = splats;
        }
        ColorTerrainMaterial.prototype.initBuffers = function () {
            this.mapContext3DBuffer(this._.terrainTextures_fs_array, this.updateTerrainTextureBuffer);
            _super.prototype.initBuffers.call(this);
        };
        ColorTerrainMaterial.prototype.updateTerrainTextureBuffer = function (terrainTextureBufferArr) {
            terrainTextureBufferArr.update(this._splats);
        };
        ColorTerrainMaterial.prototype.updateProgramBuffer = function (programBuffer) {
            var result = FagalRE.runShader(feng3d.V_colorTerrain, feng3d.F_colorTerrain);
            //上传程序
            programBuffer.update(result.vertexCode, result.fragmentCode);
        };
        return ColorTerrainMaterial;
    }(feng3d.BaseMaterial));
    feng3d.ColorTerrainMaterial = ColorTerrainMaterial;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 颜色地形材质
     * @author feng 2015-5-14
     */
    var TextureTestMaterial = (function (_super) {
        __extends(TextureTestMaterial, _super);
        function TextureTestMaterial(texture) {
            _super.call(this);
            this._texture = texture;
        }
        TextureTestMaterial.prototype.initBuffers = function () {
            _super.prototype.initBuffers.call(this);
            this.mapContext3DBuffer(this._.texture_fs, this.updateTextureBuffer);
        };
        TextureTestMaterial.prototype.updateTextureBuffer = function (textureBuffer) {
            textureBuffer.update(this._texture);
        };
        TextureTestMaterial.prototype.updateProgramBuffer = function (programBuffer) {
            this.shaderParams.addSampleFlags(this._.texture_fs, this._texture);
            var result = FagalRE.runShader(feng3d.V_TextureTest, feng3d.F_TextureTest);
            //上传程序
            programBuffer.update(result.vertexCode, result.fragmentCode);
        };
        return TextureTestMaterial;
    }(feng3d.BaseMaterial));
    feng3d.TextureTestMaterial = TextureTestMaterial;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     *
     * @author feng 2014-10-27
     */
    var BaseMesh = (function () {
        function BaseMesh(geometry, material) {
            if (geometry === void 0) { geometry = null; }
            if (material === void 0) { material = null; }
            this._geometry = geometry || new feng3d.BaseGeometry();
            this.context3dCache.addChildBufferOwner(this._geometry.context3DBufferOwner);
            this._material = material || new feng3d.BaseMaterial();
            this.context3dCache.addChildBufferOwner(this._material);
        }
        BaseMesh.prototype.render = function (context3D, viewMatrix) {
            this._material.shaderParams.initParams();
            this.context3dCache.shaderParams = this._material.shaderParams;
            this._material.render(viewMatrix);
            //绘制图形
            this.context3dCache.render(context3D);
        };
        Object.defineProperty(BaseMesh.prototype, "context3dCache", {
            get: function () {
                return this._context3dCache = this._context3dCache || new Context3DCache();
            },
            enumerable: true,
            configurable: true
        });
        return BaseMesh;
    }());
    feng3d.BaseMesh = BaseMesh;
})(feng3d || (feng3d = {}));
/*
Copyright (c) 2011, Adobe Systems Incorporated
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are
met Redistributions of source code must retain the above copyright notice,
this list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright
notice, this list of conditions and the following disclaimer in the
documentation and/or other materials provided with the distribution.

* Neither the name of Adobe Systems Incorporated nor the names of its
contributors may be used to endorse or promote products derived from
this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
var feng3d;
(function (feng3d) {
    var PerspectiveMatrix3D = (function (_super) {
        __extends(PerspectiveMatrix3D, _super);
        function PerspectiveMatrix3D(v) {
            if (v === void 0) { v = null; }
            _super.call(this, v);
            this._x = new Vector3D();
            this._y = new Vector3D();
            this._z = new Vector3D();
            this._w = new Vector3D();
        }
        PerspectiveMatrix3D.prototype.lookAtLH = function (eye, at, up) {
            this._z.copyFrom(at);
            this._z.subtract(eye);
            this._z.normalize();
            this._z.w = 0.0;
            this._x.copyFrom(up);
            this._crossProductTo(this._x, this._z);
            this._x.normalize();
            this._x.w = 0.0;
            this._y.copyFrom(this._z);
            this._crossProductTo(this._y, this._x);
            this._y.w = 0.0;
            this._w.x = this._x.dotProduct(eye);
            this._w.y = this._y.dotProduct(eye);
            this._w.z = this._z.dotProduct(eye);
            this._w.w = 1.0;
            this.copyRowFrom(0, this._x);
            this.copyRowFrom(1, this._y);
            this.copyRowFrom(2, this._z);
            this.copyRowFrom(3, this._w);
        };
        PerspectiveMatrix3D.prototype.lookAtRH = function (eye, at, up) {
            this._z.copyFrom(eye);
            this._z.subtract(at);
            this._z.normalize();
            this._z.w = 0.0;
            this._x.copyFrom(up);
            this._crossProductTo(this._x, this._z);
            this._x.normalize();
            this._x.w = 0.0;
            this._y.copyFrom(this._z);
            this._crossProductTo(this._y, this._x);
            this._y.w = 0.0;
            this._w.x = this._x.dotProduct(eye);
            this._w.y = this._y.dotProduct(eye);
            this._w.z = this._z.dotProduct(eye);
            this._w.w = 1.0;
            this.copyRowFrom(0, this._x);
            this.copyRowFrom(1, this._y);
            this.copyRowFrom(2, this._z);
            this.copyRowFrom(3, this._w);
        };
        PerspectiveMatrix3D.prototype.perspectiveLH = function (width, height, zNear, zFar) {
            this.copyRawDataFrom([
                2.0 * zNear / width, 0.0, 0.0, 0.0,
                0.0, 2.0 * zNear / height, 0.0, 0.0,
                0.0, 0.0, zFar / (zFar - zNear), 1.0,
                0.0, 0.0, zNear * zFar / (zNear - zFar), 0.0
            ]);
        };
        PerspectiveMatrix3D.prototype.perspectiveRH = function (width, height, zNear, zFar) {
            this.copyRawDataFrom([
                2.0 * zNear / width, 0.0, 0.0, 0.0,
                0.0, 2.0 * zNear / height, 0.0, 0.0,
                0.0, 0.0, zFar / (zNear - zFar), -1.0,
                0.0, 0.0, zNear * zFar / (zNear - zFar), 0.0
            ]);
        };
        PerspectiveMatrix3D.prototype.perspectiveFieldOfViewLH = function (fieldOfViewY, aspectRatio, zNear, zFar) {
            var yScale = 1.0 / Math.tan(fieldOfViewY / 2.0);
            var xScale = yScale / aspectRatio;
            this.copyRawDataFrom([
                xScale, 0.0, 0.0, 0.0,
                0.0, yScale, 0.0, 0.0,
                0.0, 0.0, zFar / (zFar - zNear), 1.0,
                0.0, 0.0, (zNear * zFar) / (zNear - zFar), 0.0
            ]);
        };
        PerspectiveMatrix3D.prototype.perspectiveFieldOfViewRH = function (fieldOfViewY, aspectRatio, zNear, zFar) {
            var yScale = 1.0 / Math.tan(fieldOfViewY / 2.0);
            var xScale = yScale / aspectRatio;
            this.copyRawDataFrom([
                xScale, 0.0, 0.0, 0.0,
                0.0, yScale, 0.0, 0.0,
                0.0, 0.0, zFar / (zNear - zFar), -1.0,
                0.0, 0.0, (zNear * zFar) / (zNear - zFar), 0.0
            ]);
        };
        PerspectiveMatrix3D.prototype.perspectiveOffCenterLH = function (left, right, bottom, top, zNear, zFar) {
            this.copyRawDataFrom([
                2.0 * zNear / (right - left), 0.0, 0.0, 0.0,
                0.0, -2.0 * zNear / (bottom - top), 0.0, 0.0,
                -1.0 - 2.0 * left / (right - left), 1.0 + 2.0 * top / (bottom - top), -zFar / (zNear - zFar), 1.0,
                0.0, 0.0, (zNear * zFar) / (zNear - zFar), 0.0
            ]);
        };
        PerspectiveMatrix3D.prototype.perspectiveOffCenterRH = function (left, right, bottom, top, zNear, zFar) {
            this.copyRawDataFrom([
                2.0 * zNear / (right - left), 0.0, 0.0, 0.0,
                0.0, -2.0 * zNear / (bottom - top), 0.0, 0.0,
                1.0 + 2.0 * left / (right - left), -1.0 - 2.0 * top / (bottom - top), zFar / (zNear - zFar), -1.0,
                0.0, 0.0, (zNear * zFar) / (zNear - zFar), 0.0
            ]);
        };
        PerspectiveMatrix3D.prototype.orthoLH = function (width, height, zNear, zFar) {
            this.copyRawDataFrom([
                2.0 / width, 0.0, 0.0, 0.0,
                0.0, 2.0 / height, 0.0, 0.0,
                0.0, 0.0, 1.0 / (zFar - zNear), 0.0,
                0.0, 0.0, zNear / (zNear - zFar), 1.0
            ]);
        };
        PerspectiveMatrix3D.prototype.orthoRH = function (width, height, zNear, zFar) {
            this.copyRawDataFrom([
                2.0 / width, 0.0, 0.0, 0.0,
                0.0, 2.0 / height, 0.0, 0.0,
                0.0, 0.0, 1.0 / (zNear - zNear), 0.0,
                0.0, 0.0, zNear / (zNear - zFar), 1.0
            ]);
        };
        PerspectiveMatrix3D.prototype.orthoOffCenterLH = function (left, right, bottom, top, zNear, zFar) {
            this.copyRawDataFrom([
                2.0 / (right - left), 0.0, 0.0, 0.0,
                0.0, 2.0 * zNear / (top - bottom), 0.0, 0.0,
                -1.0 - 2.0 * left / (right - left), 1.0 + 2.0 * top / (bottom - top), 1.0 / (zFar - zNear), 0.0,
                0.0, 0.0, zNear / (zNear - zFar), 1.0
            ]);
        };
        PerspectiveMatrix3D.prototype.orthoOffCenterRH = function (left, right, bottom, top, zNear, zFar) {
            this.copyRawDataFrom([
                2.0 / (right - left), 0.0, 0.0, 0.0,
                0.0, 2.0 * zNear / (top - bottom), 0.0, 0.0,
                -1.0 - 2.0 * left / (right - left), 1.0 + 2.0 * top / (bottom - top), 1.0 / (zNear - zFar), 0.0,
                0.0, 0.0, zNear / (zNear - zFar), 1.0
            ]);
        };
        PerspectiveMatrix3D.prototype._crossProductTo = function (a, b) {
            this._w.x = a.y * b.z - a.z * b.y;
            this._w.y = a.z * b.x - a.x * b.z;
            this._w.z = a.x * b.y - a.y * b.x;
            this._w.w = 1.0;
            a.copyFrom(this._w);
        };
        return PerspectiveMatrix3D;
    }(Matrix3D));
    feng3d.PerspectiveMatrix3D = PerspectiveMatrix3D;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     *
     * @author cdz 2015-11-9
     */
    var F_TextureTest = (function (_super) {
        __extends(F_TextureTest, _super);
        function F_TextureTest() {
            _super.call(this);
            this._shaderType = Context3DProgramType.FRAGMENT;
        }
        F_TextureTest.prototype.runFunc = function () {
            var _ = FagalRE.instance.space;
            //最终颜色寄存器（输出到oc寄存器的颜色）
            var finalColorReg = _.getFreeTemp("最终颜色寄存器（输出到oc寄存器的颜色）");
            var currentColorReg = _.getFreeTemp("当前纹理颜色值");
            _.tex(currentColorReg, _.uv_v, _.texture_fs); // 使用地面纹理 得到该纹理颜色值
            _.mov(finalColorReg, currentColorReg);
            _.mov(_._oc, finalColorReg);
        };
        return F_TextureTest;
    }(FagalMethod));
    feng3d.F_TextureTest = F_TextureTest;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 基础片段渲染
     * @author feng 2014-10-24
     */
    var F_baseShader = (function (_super) {
        __extends(F_baseShader, _super);
        function F_baseShader() {
            _super.call(this);
            this._shaderType = Context3DProgramType.FRAGMENT;
        }
        F_baseShader.prototype.runFunc = function () {
            var _ = FagalRE.instance.space;
            _.comment("传递顶点颜色数据", _._oc, "到片段寄存器", _.color_v);
            _.mov(_._oc, _.color_v);
        };
        return F_baseShader;
    }(FagalMethod));
    feng3d.F_baseShader = F_baseShader;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 输出颜色贴图
     * @author feng 2014-10-24
     */
    var F_colorMap = (function (_super) {
        __extends(F_colorMap, _super);
        function F_colorMap() {
            _super.call(this);
            this._shaderType = Context3DProgramType.FRAGMENT;
        }
        F_colorMap.prototype.runFunc = function () {
            var _ = FagalRE.instance.space;
            //颜色输出
            _.mov(_._oc, _.color_v);
        };
        return F_colorMap;
    }(FagalMethod));
    feng3d.F_colorMap = F_colorMap;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 基础片段渲染
     * @author feng 2014-10-24
     */
    var F_colorTerrain = (function (_super) {
        __extends(F_colorTerrain, _super);
        function F_colorTerrain() {
            _super.call(this);
            this._shaderType = Context3DProgramType.FRAGMENT;
        }
        F_colorTerrain.prototype.runFunc = function () {
            var _ = FagalRE.instance.space;
            var numSplattingLayers = 3;
            //最终颜色寄存器（输出到oc寄存器的颜色）
            var finalColorReg = _.getFreeTemp("最终颜色寄存器（输出到oc寄存器的颜色）");
            var currentColorReg = _.getFreeTemp("当前纹理颜色值");
            var isFirst = true;
            for (var i = 0; i < numSplattingLayers; ++i) {
                _.tex(currentColorReg, _.uv_v, _.terrainTextures_fs_array.getReg(i)); // 使用地面纹理 得到该纹理颜色值
                if (isFirst) {
                    _.mov(finalColorReg, currentColorReg);
                }
                else {
                    _.sub(currentColorReg, currentColorReg, finalColorReg); // uvtemp = uvtemp - targetreg; --------------1
                    _.mul(currentColorReg, currentColorReg, _.color_v.c(i)); // uvtemp = uvtemp * blendtemp; ----------2  (0 <= blendtemp <= 1)
                    _.add(finalColorReg, finalColorReg, currentColorReg); // 添加到默认颜色值上  targetreg = targetreg + uvtemp; ------------3
                }
                isFirst = false;
            }
            _.mov(_._oc, finalColorReg);
        };
        return F_colorTerrain;
    }(FagalMethod));
    feng3d.F_colorTerrain = F_colorTerrain;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     *
     * @author cdz 2015-11-9
     */
    var V_TextureTest = (function (_super) {
        __extends(V_TextureTest, _super);
        function V_TextureTest() {
            _super.call(this);
            this._shaderType = Context3DProgramType.VERTEX;
        }
        V_TextureTest.prototype.runFunc = function () {
            var _ = FagalRE.instance.space;
            _.comment("应用投影矩阵", _.projection_vc_matrix, "使世界坐标", _.position_va_3, "转换为投影坐标 并输出到顶点寄存器", _._op);
            _.m44(_._op, _.position_va_3, _.projection_vc_matrix);
            _.comment("传递顶点uv数据", _.uv_va_2, "到变量寄存器", _.uv_v);
            _.mov(_.uv_v, _.uv_va_2);
        };
        return V_TextureTest;
    }(FagalMethod));
    feng3d.V_TextureTest = V_TextureTest;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 基础顶点渲染
     * @author feng 2014-10-24
     */
    var V_baseShader = (function (_super) {
        __extends(V_baseShader, _super);
        function V_baseShader() {
            _super.call(this);
            this._shaderType = Context3DProgramType.VERTEX;
        }
        V_baseShader.prototype.runFunc = function () {
            var _ = FagalRE.instance.space;
            _.comment("应用投影矩阵", _.projection_vc_matrix, "使世界坐标", _.position_va_3, "转换为投影坐标 并输出到顶点寄存器", _._op);
            _.m44(_._op, _.position_va_3, _.projection_vc_matrix);
            _.comment("传递顶点颜色数据", _.color_va_3, "到变量寄存器", _.color_v);
            _.mov(_.color_v, _.color_va_3);
        };
        return V_baseShader;
    }(FagalMethod));
    feng3d.V_baseShader = V_baseShader;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 输出颜色贴图
     * @author feng 2014-10-24
     */
    var V_colorMap = (function (_super) {
        __extends(V_colorMap, _super);
        function V_colorMap() {
            _super.call(this);
            this._shaderType = Context3DProgramType.VERTEX;
        }
        V_colorMap.prototype.runFunc = function () {
            var _ = FagalRE.instance.space;
            //公用数据片段常量数据
            _.comment("传递顶点颜色数据", _.color_va_3, "到变量寄存器", _.color_v);
            _.mov(_.color_v, _.color_va_3);
            var uvTemp = _.getFreeTemp("临时uv数据");
            _.mov(uvTemp, _.uv_va_2);
            _.mul(uvTemp.xy, uvTemp.xy, _.commonsData_vc_vector.x);
            _.sub(uvTemp.xy, uvTemp.xy, _.commonsData_vc_vector.yy);
            //把uv 作为坐标输出
            _.mov(_._op, uvTemp);
        };
        return V_colorMap;
    }(FagalMethod));
    feng3d.V_colorMap = V_colorMap;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 顶点颜色渲染地形 顶点渲染
     * @author feng 2014-10-24
     */
    var V_colorTerrain = (function (_super) {
        __extends(V_colorTerrain, _super);
        function V_colorTerrain() {
            _super.call(this);
            this._shaderType = Context3DProgramType.VERTEX;
        }
        V_colorTerrain.prototype.runFunc = function () {
            var _ = FagalRE.instance.space;
            _.comment("应用投影矩阵", _.projection_vc_matrix, "使世界坐标", _.position_va_3, "转换为投影坐标 并输出到顶点寄存器", _._op);
            _.m44(_._op, _.position_va_3, _.projection_vc_matrix);
            _.comment("传递顶点颜色数据", _.color_va_3, "到变量寄存器", _.color_v);
            _.mov(_.color_v, _.color_va_3);
            _.comment("传递顶点uv数据", _.uv_va_2, "到变量寄存器", _.uv_v);
            _.mov(_.uv_v, _.uv_va_2);
        };
        return V_colorTerrain;
    }(FagalMethod));
    feng3d.V_colorTerrain = V_colorTerrain;
})(feng3d || (feng3d = {}));
//# sourceMappingURL=fagal.js.map