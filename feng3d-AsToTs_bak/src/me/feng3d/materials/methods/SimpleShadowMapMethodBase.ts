module feng3d
{
	
	
	

	
	
	
	
	
	
	
	
	
	
	
	

	

	/**
	 * 简单阴影映射函数基类
	 * @author feng 2015-5-28
	 */
	export class SimpleShadowMapMethodBase extends ShadowMapMethodBase
	{
		/**
		 * 是否使用点光源
		 */
		protected _usePoint:boolean;

		/**
		 * 顶点常量数据0
		 */
		protected shadowCommonsVCData0:Number[] = Number[]([0.5, -0.5, 0.0, 1.0]);

		/**
		 * 通用数据0
		 */
		protected shadowCommonsData0:Number[] = Number[]([1.0, 1 / 255.0, 1 / 65025.0, 1 / 16581375.0]);

		/**
		 * 通用数据1
		 */
		protected shadowCommonsData1:Number[] = Number[]([0, 0, 0, 1]);

		/**
		 * 通用数据2
		 */
		protected shadowCommonsData2:Number[] = Number[]([0.5, 2048, 1.0 / 2048, 0]);

		/**
		 * 深度投影矩阵
		 */
		protected depthProjection:Matrix3D = new Matrix3D();

		/**
		 * 创建简单阴影映射方法基类
		 * @param castingLight			投射阴影的灯光
		 */
		public SimpleShadowMapMethodBase(castingLight:LightBase)
		{
			this._usePoint = castingLight is PointLight;

			super(castingLight);
		}

		/**
		 * @inheritDoc
		 */
		protected initBuffers()
		{
			super.initBuffers();
			this.context3DBufferOwner.mapContext3DBuffer(this._.shadowCommondata0_vc_vector, this.updateShadowCommonVCData0Buffer);
			this.context3DBufferOwner.mapContext3DBuffer(this._.shadowCommondata0_fc_vector, this.updateShadowCommonData0Buffer);
			this.context3DBufferOwner.mapContext3DBuffer(this._.shadowCommondata1_fc_vector, this.updateShadowCommonData1Buffer);
			this.context3DBufferOwner.mapContext3DBuffer(this._.shadowCommondata2_fc_vector, this.updateShadowCommonData2Buffer);
			this.context3DBufferOwner.mapContext3DBuffer(this._.depthMap_vc_matrix, this.updateDepthProjectionMatrixBuffer);

			this.context3DBufferOwner.mapContext3DBuffer(this._.depthMap_fs, this.updateTextureBuffer);
		}

		protected updateShadowCommonVCData0Buffer(vcVectorBuffer:VCVectorBuffer)
		{
			vcVectorBuffer.update(this.shadowCommonsVCData0);
		}

		protected updateShadowCommonData0Buffer(fcVectorBuffer:FCVectorBuffer)
		{
			fcVectorBuffer.update(this.shadowCommonsData0);
		}

		protected updateShadowCommonData1Buffer(fcVectorBuffer:FCVectorBuffer)
		{
			fcVectorBuffer.update(this.shadowCommonsData1);
		}

		protected updateShadowCommonData2Buffer(fcVectorBuffer:FCVectorBuffer)
		{
			fcVectorBuffer.update(this.shadowCommonsData2);
		}

		/**
		 * 更新深度投影矩阵缓冲
		 * @param sceneTransformMatrixBuffer		场景变换矩阵缓冲
		 */
		protected updateDepthProjectionMatrixBuffer(sceneTransformMatrixBuffer:VCMatrixBuffer)
		{
			sceneTransformMatrixBuffer.update(this.depthProjection, true);
		}

		/**
		 * 更新深度图纹理缓冲
		 */
		private updateTextureBuffer(textureBuffer:FSBuffer)
		{
			textureBuffer.update(_castingLight.shadowMapper.depthMap);
		}

		/**
		 * @inheritDoc
		 */
		public activate(shaderParams:ShaderParams)
		{
			super.activate(shaderParams);

			var shadowShaderParams:ShadowShaderParams = shaderParams.getOrCreateComponentByClass(ShadowShaderParams);
			shadowShaderParams.usePoint += this._usePoint;

			if (this._usePoint)
				this.shadowCommonsData1[0] = -Math.pow(1 / ((_castingLight as PointLight).fallOff * _epsilon), 2);
			else
				this.shadowCommonsVCData0[3] = -1 / (DirectionalShadowMapper(_shadowMapper).depth * _epsilon);

			this.shadowCommonsData1[1] = 1 - _alpha;

			var size:number = this.castingLight.shadowMapper.depthMapSize;
			this.shadowCommonsData2[1] = size;
			this.shadowCommonsData2[2] = 1 / size;

			//通用渲染参数
			var flags:Array = [this.castingLight.shadowMapper.depthMap.type, Context3DTextureFilter.NEAREST, Context3DWrapMode.CLAMP];
			shaderParams.setSampleFlags(this._.depthMap_fs, flags);
		}

		/**
		 * @inheritDoc
		 */
		public setRenderState(renderable:IRenderable, camera:Camera3D)
		{
			if (!this._usePoint)
			{
				this.depthProjection.copyFrom(DirectionalShadowMapper(_shadowMapper).depthProjection);
			}
		}

	}
}
