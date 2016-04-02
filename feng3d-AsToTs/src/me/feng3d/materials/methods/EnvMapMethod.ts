module feng3d
{
	
	
	
	
	
	
	
	
	

	

	/**
	 * 环境映射函数
	 * @author feng 2015-8-27
	 */
	export class EnvMapMethod extends EffectMethodBase
	{
		private _envMapData:number[] = number[]([1, 0, 0, 0]);

		private _cubeTexture:CubeTextureBase;
		private _alpha:number;
		private _mask:Texture2DBase;

		/**
		 * 创建EnvMapMethod实例
		 * @param envMap		环境映射贴图
		 * @param alpha			反射率
		 */
		public EnvMapMethod(envMap:CubeTextureBase, alpha:number = 1)
		{
			super();
			this._cubeTexture = envMap;
			this.alpha = alpha;
		}

		/**
		 * 用来调节反射率的纹理
		 */
		public get mask():Texture2DBase
		{
			return _mask;
		}

		public set mask(value:Texture2DBase)
		{
			if (boolean(value) != boolean(_mask) || (value && _mask && (value.hasMipMaps != _mask.hasMipMaps || value.format != _mask.format)))
			{
				invalidateShaderProgram();
			}
			_mask = value;

			context3DBufferOwner.markBufferDirty(_.envMapMaskTexture_fs);
		}

		/**
		 * 环境映射贴图
		 */
		public get envMap():CubeTextureBase
		{
			return _cubeTexture;
		}

		public set envMap(value:CubeTextureBase)
		{
			_cubeTexture = value;

			context3DBufferOwner.markBufferDirty(_.envMapcubeTexture_fs);
		}

		/**
		 * 反射率
		 */
		public get alpha():number
		{
			return _alpha;
		}

		public set alpha(value:number)
		{
			_alpha = value;
			_envMapData[0] = _alpha;
		}

		/**
		 * @inheritDoc
		 */
		protected initBuffers()
		{
			super.initBuffers();
			this.context3DBufferOwner.mapContext3DBuffer(this._.envMapcubeTexture_fs, this.updateCubeTextureBuffer);
			this.context3DBufferOwner.mapContext3DBuffer(this._.envMapMaskTexture_fs, this.updateMaskTextureBuffer);
			this.context3DBufferOwner.mapContext3DBuffer(this._.envMapData_fc_vector, this.updateDataBuffer);
		}

		private updateCubeTextureBuffer(fsBuffer:FSBuffer)
		{
			fsBuffer.update(this._cubeTexture);
		}

		private updateMaskTextureBuffer(fsBuffer:FSBuffer)
		{
			fsBuffer.update(this._mask);
		}

		private updateDataBuffer(fcVectorBuffer:FCVectorBuffer)
		{
			fcVectorBuffer.update(this._envMapData);
		}

		/**
		 * @inheritDoc
		 */
		public override function activate(shaderParams:ShaderParams)
		{
			var commonShaderParams:CommonShaderParams = shaderParams.getOrCreateComponentByClass(CommonShaderParams);
			commonShaderParams.needsUV += this._mask != null;

			var lightShaderParams:LightShaderParams = shaderParams.getOrCreateComponentByClass(LightShaderParams);
			lightShaderParams.needsNormals++;
			lightShaderParams.needsViewDir++;

//			shaderParams.needsView = true;

			var envShaderParams:EnvShaderParams = shaderParams.getOrCreateComponentByClass(EnvShaderParams);
			envShaderParams.useEnvMapMethod++;
			envShaderParams.useEnvMapMask += this._mask != null;

			shaderParams.addSampleFlags(this._.envMapcubeTexture_fs, this._cubeTexture);
			shaderParams.addSampleFlags(this._.envMapMaskTexture_fs, this._mask);

//			var context:Context3D = stage3DProxy._context3D;
//			vo.fragmentData[vo.fragmentConstantsIndex] = this._alpha;
//			context.setTextureAt(vo.texturesIndex, this._cubeTexture.getTextureForStage3D(stage3DProxy));
//			if (this._mask)
//				context.setTextureAt(vo.texturesIndex + 1, this._mask.getTextureForStage3D(stage3DProxy));
		}
	}
}
