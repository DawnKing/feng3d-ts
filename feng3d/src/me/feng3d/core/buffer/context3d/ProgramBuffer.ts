module me.feng3d {

    /**
     * 渲染程序缓存
     * @author feng 2016-05-09
     */
    export class ProgramBuffer extends Component {

        private _vertexCode: string;
        private _fragmentCode: string;

        private _shaderProgram: WebGLProgram;

        /**
         * 创建渲染程序缓存
         * @param code          渲染程序代码
         * @param context3D     webgl渲染上下文
         */
        constructor() {

            super();

            this.addEventListener(Context3DBufferEvent.GET_PROGRAMBUFFER, this.onGetProgramBuffer, this)
        }

        /**
         * 处理获取缓冲事件
         */
        private onGetProgramBuffer(event: Context3DBufferEvent) {

            var eventData: GetProgramBufferEventData = event.data;
            eventData.buffer = this;
        }

        /**
         * 顶点渲染程序代码
         */
        get vertexCode(): string {

            return this._vertexCode;
        }

        set vertexCode(value: string) {

            this._vertexCode = value;
            this.invalidCode();
        }

        /**
         * 片段渲染程序代码
         */
        get fragmentCode(): string {

            return this._fragmentCode;
        }

        set fragmentCode(value: string) {

            this._fragmentCode = value;
            this.invalidCode();
        }

        /**
         * 使失效
         */
        private invalidCode() {

        }

        active(context3D: WebGLRenderingContext) {

            var shaderProgram = this.getShaderProgram(context3D);
            context3D.useProgram(shaderProgram);
        }

        /**
         * 渲染程序
         */
        getShaderProgram(context3D: WebGLRenderingContext): WebGLProgram {

            if (this._shaderProgram == null) {
                this.init(context3D);
            }
            return this._shaderProgram;
        }

        /**
         * 获取属性gpu地址
         */
        getAttribLocations(context3D: WebGLRenderingContext) {

            var attribLocations: { [name: string]: { type: string, location: number } } = {};

            var attributes = ProgramBuffer.getAttributes(this._vertexCode);
            for (var i = 0; i < attributes.length; i++) {
                var element = attributes[i];

                //获取属性在gpu中地址
                var shaderProgram = this.getShaderProgram(context3D);
                var location = context3D.getAttribLocation(shaderProgram, element.name);
                context3D.enableVertexAttribArray(location);

                attribLocations[element.name] = { type: element.type, location: location };
            }
            return attribLocations;
        }

        /**
         * 初始化
         */
        private init(context3D: WebGLRenderingContext) {

            var vertexShader = this.getShader(context3D, this._vertexCode, WebGLRenderingContext.VERTEX_SHADER);
            var fragmentShader = this.getShader(context3D, this._fragmentCode, WebGLRenderingContext.FRAGMENT_SHADER);
            // 创建渲染程序
            var shaderProgram = this._shaderProgram = context3D.createProgram();
            context3D.attachShader(shaderProgram, vertexShader);
            context3D.attachShader(shaderProgram, fragmentShader);
            context3D.linkProgram(shaderProgram);

            // 渲染程序创建失败时给出弹框
            if (!context3D.getProgramParameter(shaderProgram, context3D.LINK_STATUS)) {
                alert("无法初始化渲染程序。");
            }
        }

        /**
         * 获取渲染程序
         * @param code      渲染代码
         * @param type      渲染代码类型
         */
        private getShader(context3D: WebGLRenderingContext, code: string, type: ShaderType) {

            var shader = context3D.createShader(type);
            context3D.shaderSource(shader, code);
            context3D.compileShader(shader);
            if (!context3D.getShaderParameter(shader, context3D.COMPILE_STATUS)) {
                alert("编译渲染程序是发生错误: " + context3D.getShaderInfoLog(shader));
                return null;
            }

            return shader;
        }

        /**
         * 获取程序属性列表
         */
        static getAttributes(code: string) {

            var attributeReg = /attribute\s+(\w+)\s+(\w+)/g;
            var result = attributeReg.exec(code);

            var attributes: { type: string, name: string }[] = [];//属性{类型，名称}
            while (result) {
                attributes.push({ type: result[1], name: result[2] });
                result = attributeReg.exec(code);
            }

            return attributes;
        }

        /**
         * 获取程序常量列表
         */
        static getUniforms(code: string) {

            var uniforms: ProgramUniform[] = [];

            var uniformReg = /uniform\s+(\w+)\s+(\w+)/g;
            var result = uniformReg.exec(code);

            while (result) {
                var attribute = new ProgramAttribute();
                attribute.type = result[1];
                attribute.name = result[2];
                result = uniformReg.exec(code);
            }

            return uniforms;
        }
    }
}