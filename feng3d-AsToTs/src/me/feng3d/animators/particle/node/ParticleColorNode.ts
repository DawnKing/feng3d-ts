module feng3d
{
	

	
	
	
	
	
	
	

	

	/**
	 * 粒子颜色节点
	 * @author feng 2015-1-20
	 */
	export class ParticleColorNode extends ParticleNodeBase
	{
		/** 是否使用Multiplier数据对渲染中颜色进行变换 */
		private _usesMultiplier:boolean;
		/** 是否使用offset数据对渲染中颜色进行变换 */
		private _usesOffset:boolean;
		/** 开始颜色数据 */
		private _startColor:ColorTransform;
		/** 结束颜色数据 */
		private _endColor:ColorTransform;

		private _startMultiplierData:number[];
		private _deltaMultiplierData:number[];
		private _startOffsetData:number[];
		private _deltaOffsetData:number[];

		/**
		 * 开始颜色属性
		 */
		public static COLOR_START_COLORTRANSFORM:string = "ColorStartColorTransform";

		/**
		 * 结束颜色属性
		 */
		public static COLOR_END_COLORTRANSFORM:string = "ColorEndColorTransform";

		/**
		 * 创建一个粒子颜色节点
		 * @param mode					属性模式
		 * @param usesMultiplier		是否使用Multiplier数据对渲染中颜色进行变换
		 * @param usesOffset			是否使用offset数据对渲染中颜色进行变换
		 * @param usesCycle
		 * @param usesPhase
		 * @param startColor			开始颜色数据
		 * @param endColor				结束颜色数据
		 * @param cycleDuration
		 * @param cyclePhase
		 */
		constructor(mode:number, usesMultiplier:boolean = true, usesOffset:boolean = true, usesCycle:boolean = false, usesPhase:boolean = false, startColor:ColorTransform = null, endColor:ColorTransform = null, cycleDuration:number = 1, cyclePhase:number = 0)
		{
			this._usesMultiplier = usesMultiplier;
			this._usesOffset = usesOffset;

			this._startColor = startColor || new ColorTransform();
			this._endColor = endColor || new ColorTransform();

			super("ParticleColor", mode, (this._usesMultiplier && this._usesOffset) ? 16 : 8, ParticleAnimationSet.COLOR_PRIORITY);

			this.updateColorData();
		}

		/**
		 * @inheritDoc
		 */
		protected initBuffers()
		{
			super.initBuffers();

			if (this.mode == ParticlePropertiesMode.GLOBAL)
			{
				this.context3DBufferOwner.mapContext3DBuffer(this._.particleStartColorMultiplier_vc_vector, this.updateStartColorMultiplierConstBuffer);
				this.context3DBufferOwner.mapContext3DBuffer(this._.particleDeltaColorMultiplier_vc_vector, this.updateDeltaColorMultiplierConstBuffer);

				this.context3DBufferOwner.mapContext3DBuffer(this._.particleStartColorOffset_vc_vector, this.updateStartColorOffsetConstBuffer);
				this.context3DBufferOwner.mapContext3DBuffer(this._.particleDeltaColorOffset_vc_vector, this.updateDeltaColorOffsetConstBuffer);
			}
		}

		private updateStartColorMultiplierConstBuffer(vcVectorBuffer:VCVectorBuffer)
		{
			vcVectorBuffer.update(this._startMultiplierData);
		}

		private updateDeltaColorMultiplierConstBuffer(vcVectorBuffer:VCVectorBuffer)
		{
			vcVectorBuffer.update(this._deltaMultiplierData);
		}

		private updateStartColorOffsetConstBuffer(vcVectorBuffer:VCVectorBuffer)
		{
			vcVectorBuffer.update(this._startOffsetData);
		}

		private updateDeltaColorOffsetConstBuffer(vcVectorBuffer:VCVectorBuffer)
		{
			vcVectorBuffer.update(this._deltaOffsetData);
		}

		/**
		 * @inheritDoc
		 */
		public generatePropertyOfOneParticle(param:ParticleProperties)
		{
			var startColor:ColorTransform = param[COLOR_START_COLORTRANSFORM];
			if (!startColor)
				throw(new Error("there is no " + COLOR_START_COLORTRANSFORM + " in param!"));

			var endColor:ColorTransform = param[COLOR_END_COLORTRANSFORM];
			if (!endColor)
				throw(new Error("there is no " + COLOR_END_COLORTRANSFORM + " in param!"));

			var i:number;

			//multiplier
			if (this._usesMultiplier)
			{
				_oneData[i++] = startColor.redMultiplier;
				_oneData[i++] = startColor.greenMultiplier;
				_oneData[i++] = startColor.blueMultiplier;
				_oneData[i++] = startColor.alphaMultiplier;
				_oneData[i++] = endColor.redMultiplier - startColor.redMultiplier;
				_oneData[i++] = endColor.greenMultiplier - startColor.greenMultiplier;
				_oneData[i++] = endColor.blueMultiplier - startColor.blueMultiplier;
				_oneData[i++] = endColor.alphaMultiplier - startColor.alphaMultiplier;
			}

			//offset
			if (this._usesOffset)
			{
				_oneData[i++] = startColor.redOffset / 255;
				_oneData[i++] = startColor.greenOffset / 255;
				_oneData[i++] = startColor.blueOffset / 255;
				_oneData[i++] = startColor.alphaOffset / 255;
				_oneData[i++] = (endColor.redOffset - startColor.redOffset) / 255;
				_oneData[i++] = (endColor.greenOffset - startColor.greenOffset) / 255;
				_oneData[i++] = (endColor.blueOffset - startColor.blueOffset) / 255;
				_oneData[i++] = (endColor.alphaOffset - startColor.alphaOffset) / 255;
			}
		}

		/**
		 * 更新颜色数据
		 */
		private updateColorData()
		{
			if (this.mode == ParticlePropertiesMode.GLOBAL)
			{
				if (this._usesMultiplier)
				{
					this._startMultiplierData = number[]([this._startColor.redMultiplier, this._startColor.greenMultiplier, this._startColor.blueMultiplier, this._startColor.alphaMultiplier]);
					this._deltaMultiplierData = number[]([(this._endColor.redMultiplier - this._startColor.redMultiplier), (this._endColor.greenMultiplier - this._startColor.greenMultiplier), (this._endColor.blueMultiplier - this._startColor.blueMultiplier), (this._endColor.alphaMultiplier - this._startColor.alphaMultiplier)]);
				}

				if (this._usesOffset)
				{
					this._startOffsetData = number[]([this._startColor.redOffset / 255, this._startColor.greenOffset / 255, this._startColor.blueOffset / 255, this._startColor.alphaOffset / 255]);
					this._deltaOffsetData = number[]([(this._endColor.redOffset - this._startColor.redOffset) / 255, (this._endColor.greenOffset - this._startColor.greenOffset) / 255, (this._endColor.blueOffset - this._startColor.blueOffset) / 255, (this._endColor.alphaOffset - this._startColor.alphaOffset) / 255]);
				}
			}
		}

		/**
		 * @inheritDoc
		 */
		public processAnimationSetting(shaderParams:ShaderParams)
		{
			var particleShaderParams:ParticleShaderParams = shaderParams.getOrCreateComponentByClass(ParticleShaderParams);

			particleShaderParams.changeColor++;
			particleShaderParams[this.name] = true;
		}
	}
}
