module feng3d
{
	
	
	
	
	
	
	
	


	

	/**
	 * 环境光函数
	 *
	 * 参考《3d数学基础：图形与游戏开发》337页，15.4.6 环境光分量
	 * Camb = Gamb X Mamb
	 * Camb：环境光分量。
	 * Gamb：整个场景的环境光值。
	 * Mamb：材质的环境光分量。它总是等于漫反射分量——由纹理图定义。
	 *
	 * @author feng 2014-7-1
	 */
	export class BasicAmbientMethod extends ShadingMethodBase
	{
		public static METHOD_TYPE:string = "AmbientMethod";

		protected _useTexture:boolean;
		private _texture:Texture2DBase;

		private _ambientColor:number = 0xffffff;
		private _ambient:number = 1;

		public _lightAmbientR:number = 0;
		public _lightAmbientG:number = 0;
		public _lightAmbientB:number = 0;

		/** 环境光分量数据 */
		private ambientColorData:number[] = new number[](4);

		/**
		 * 创建一个基础环境光函数
		 */
		constructor()
		{
			this.methodType = METHOD_TYPE;
			this.typeUnique = true;
		}

		/**
		 * @inheritDoc
		 */
		protected initBuffers()
		{
			super.initBuffers();
			this.context3DBufferOwner.mapContext3DBuffer(this._.ambientColor_fc_vector, this.updateAmbientInputBuffer);
			this.context3DBufferOwner.mapContext3DBuffer(this._.ambientTexture_fs, this.updateSpecularTextureBuffer);
		}

		private updateAmbientInputBuffer(ambientInputBuffer:FCVectorBuffer)
		{
			ambientInputBuffer.update(this.ambientColorData);
		}

		private updateSpecularTextureBuffer(fsBuffer:FSBuffer)
		{
			fsBuffer.update(this.texture);
		}

		/**
		 * 更新环境光数据
		 */
		private updateAmbient()
		{
			this.ambientColorData[0] = ((this._ambientColor >> 16) & 0xff) / 0xff * this._ambient * this._lightAmbientR;
			this.ambientColorData[1] = ((this._ambientColor >> 8) & 0xff) / 0xff * this._ambient * this._lightAmbientG;
			this.ambientColorData[2] = (this._ambientColor & 0xff) / 0xff * this._ambient * this._lightAmbientB;
			this.ambientColorData[3] = 1;
		}

		/**
		 * @inheritDoc
		 */
		public setRenderState(renderable:IRenderable, camera:Camera3D)
		{
			this.updateAmbient();
		}

		/**
		 * 环境光强
		 */
		public get ambient():number
		{
			return _ambient;
		}

		public set ambient(value:number)
		{
			_ambient = value;
			updateAmbient();
		}

		/**
		 * 环境光颜色
		 */
		public get ambientColor():number
		{
			return _ambientColor;
		}

		public set ambientColor(value:number)
		{
			_ambientColor = value;
			updateAmbient();
		}

		/**
		 * The bitmapData to use to define the diffuse reflection color per texel.
		 */
		public get texture():Texture2DBase
		{
			return _texture;
		}

		public set texture(value:Texture2DBase)
		{
			if (boolean(value) != _useTexture || (value && _texture && (value.hasMipMaps != _texture.hasMipMaps || value.format != _texture.format)))
			{
				invalidateShaderProgram();
			}
			_useTexture = boolean(value);
			_texture = value;

			context3DBufferOwner.markBufferDirty(_.ambientTexture_fs);
		}

		public activate(shaderParams:ShaderParams)
		{
			if (this.texture != null)
			{
				var commonShaderParams:CommonShaderParams = shaderParams.getOrCreateComponentByClass(CommonShaderParams);
				commonShaderParams.needsUV++;
				commonShaderParams.useAmbientTexture++;
				shaderParams.addSampleFlags(this._.ambientTexture_fs, this.texture);
			}
		}

		public copyFrom(method:ShadingMethodBase)
		{
			var diff:BasicAmbientMethod = BasicAmbientMethod(method);
			this.ambient = diff.ambient;
			this.ambientColor = diff.ambientColor;
		}
	}
}
