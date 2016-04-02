module feng3d
{
	
	
	
	
	

	

	/**
	 * 雾函数
	 * @author feng 2015-8-27
	 */
	export class FogMethod extends EffectMethodBase
	{
		private _minDistance:number = 0;
		private _maxDistance:number = 1000;
		private _fogColor:number;

		/**
		 * 雾颜色常量数据
		 */
		private fogColorData:Number[] = Number[]([0, 0, 0, 1]);

		/**
		 * 雾通用常量数据
		 */
		private fogCommonData:Number[] = Number[]([0, 0, 0, 0]);

		/**
		 * 出现雾效果的最近距离
		 */
		public get minDistance():number
		{
			return _minDistance;
		}

		public set minDistance(value:number)
		{
			_minDistance = value;
		}

		/**
		 * 最远距离
		 */
		public get maxDistance():number
		{
			return _maxDistance;
		}

		public set maxDistance(value:number)
		{
			_maxDistance = value;
		}

		/**
		 * 雾的颜色
		 */
		public get fogColor():number
		{
			return _fogColor;
		}

		public set fogColor(value:number)
		{
			_fogColor = value;
			fogColorData[0] = ((value >> 16) & 0xff) / 0xff;
			fogColorData[1] = ((value >> 8) & 0xff) / 0xff;
			fogColorData[2] = (value & 0xff) / 0xff;
		}

		/**
		 * 创建FogMethod实例
		 * @param minDistance			出现雾效果的最近距离
		 * @param maxDistance			最远距离
		 * @param fogColor				雾的颜色
		 */
		public FogMethod(minDistance:number, maxDistance:number, fogColor:number = 0x808080)
		{
			super();
			this.minDistance = minDistance;
			this.maxDistance = maxDistance;
			this.fogColor = fogColor;
		}

		/**
		 * @inheritDoc
		 */
		protected initBuffers()
		{
			super.initBuffers();
			this.context3DBufferOwner.mapContext3DBuffer(this._.fogColor_fc_vector, this.updateFogColorBuffer);
			this.context3DBufferOwner.mapContext3DBuffer(this._.fogCommonData_fc_vector, this.updateFogCommonDataBuffer);
		}

		/**
		 * 更新雾颜色常量数据
		 */
		private updateFogColorBuffer(fcVectorBuffer:FCVectorBuffer)
		{
			fcVectorBuffer.update(this.fogColorData);
		}

		/**
		 * 更新雾通用常量数据
		 */
		private updateFogCommonDataBuffer(fcVectorBuffer:FCVectorBuffer)
		{
			fcVectorBuffer.update(this.fogCommonData);
		}

		/**
		 * @inheritDoc
		 */
		public override function activate(shaderParams:ShaderParams)
		{
			this.fogCommonData[0] = this._minDistance;
			this.fogCommonData[1] = 1 / (this._maxDistance - this._minDistance);

			var fogShaderParams:FogShaderParams = shaderParams.getOrCreateComponentByClass(FogShaderParams);
			fogShaderParams.useFog++;

			var shadowShaderParams:ShadowShaderParams = shaderParams.getOrCreateComponentByClass(ShadowShaderParams);
			shadowShaderParams.needsProjection++;
		}

	}
}
