module feng3dTest
{
	

	_TextureTest;
	_TextureTest;

	
	
	
	
	

	/**
	 * 颜色地形材质
	 * @author feng 2015-5-14
	 */
	export class TextureTestMaterial extends BaseMaterial
	{
		private _texture:TextureProxyBase;

		constructor(texture:TextureProxyBase)
		{
			this._texture = texture;
			super();
		}

		protected initBuffers()
		{
			super.initBuffers();
			this.mapContext3DBuffer(this._.texture_fs, this.updateTextureBuffer);
		}

		private updateTextureBuffer(textureBuffer:FSBuffer)
		{
			textureBuffer.update(this._texture);
		}

		protected updateProgramBuffer(programBuffer:ProgramBuffer)
		{
			this.shaderParams.addSampleFlags(this._.texture_fs, this._texture);
			var result:FagalShaderResult = FagalRE.runShader(V_TextureTest, F_TextureTest);

			//上传程序
			programBuffer.update(result.vertexCode, result.fragmentCode);
		}
	}
}
