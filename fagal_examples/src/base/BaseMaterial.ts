module feng3d
{

	/**
	 * 基础材质
	 * @author feng 2014-10-27
	 */
	export class BaseMaterial extends Context3DBufferOwner
	{
		protected modelViewProjection:Matrix3D = new Matrix3D();

		private mre:FagalRE = FagalRE.instance;

		private _shaderParams:ShaderParams;

		public get shaderParams():ShaderParams
		{
			return this._shaderParams =this._shaderParams || new ShaderParams();
		}

		constructor()
		{
			super();
		}

		protected initBuffers()
		{
			this.mapContext3DBuffer(this._.projection_vc_matrix, this.updateProjectionBuffer);
			this.mapContext3DBuffer(this._.program, this.updateProgramBuffer);
		}

		public render(viewMatrix:Matrix3D)
		{
			this.modelViewProjection = viewMatrix;
			this.markBufferDirty(this._.projection_vc_matrix);
		}

		/**
		 * 更新投影矩阵
		 */
		protected updateProjectionBuffer(projectionBuffer:VCMatrixBuffer)
		{
			projectionBuffer.update(this.modelViewProjection, true);
		}

		/**
		 * 更新（编译）渲染程序
		 */
		protected updateProgramBuffer(programBuffer:ProgramBuffer)
		{
			var result:FagalShaderResult = FagalRE.runShader(V_baseShader, F_baseShader);

			//上传程序
			programBuffer.update(result.vertexCode, result.fragmentCode);
		}
	}
}
