module feng3d
{
	

	
	
	
	
	
	

	

	/**
	 * 粒子缩放节点
	 * @author feng 2015-1-15
	 */
	export class ParticleScaleNode extends ParticleNodeBase
	{
		private _minScale:number;
		private _maxScale:number;

		private _scaleData:number[];

		/**
		 * 缩放属性名
		 */
		public static SCALE_VECTOR3D:string = "ScaleVector3D";

		/**
		 * 最小缩放
		 */
		public get minScale():number
		{
			return _minScale;
		}

		public set minScale(value:number)
		{
			_minScale = value;

			updateScaleData();
		}

		/**
		 * 最大缩放
		 */
		public get maxScale():number
		{
			return _maxScale;
		}

		public set maxScale(value:number)
		{
			_maxScale = value;

			updateScaleData();
		}

		/**
		 * 创建一个粒子缩放节点
		 * @param mode				模式
		 * @param usesCycle
		 * @param usesPhase
		 * @param minScale			最小缩放
		 * @param maxScale			最大缩放
		 * @param cycleDuration
		 * @param cyclePhase
		 */
		public ParticleScaleNode(mode:number, usesCycle:boolean, usesPhase:boolean, minScale:number = 1, maxScale:number = 1, cycleDuration:number = 1, cyclePhase:number = 0)
		{
			var len:number = 2;
			if (usesCycle)
				len++;
			if (usesPhase)
				len++;
			super("ParticleScale", mode, len, 3);

			this._minScale = minScale;
			this._maxScale = maxScale;

			this.updateScaleData();
		}

		/**
		 * @inheritDoc
		 */
		protected initBuffers()
		{
			super.initBuffers();

			if (this.mode == ParticlePropertiesMode.GLOBAL)
				this.context3DBufferOwner.mapContext3DBuffer(this._.particleScale_vc_vector, this.updateVelocityConstBuffer);
		}

		private updateVelocityConstBuffer(velocityConstBuffer:VCVectorBuffer)
		{
			velocityConstBuffer.update(this._scaleData);
		}

		private updateScaleData()
		{
			if (this.mode == ParticlePropertiesMode.GLOBAL)
			{
				this._scaleData = number[]([this._minScale, this._maxScale - this._minScale, 0, 0]);
			}
		}

		/**
		 * @inheritDoc
		 */
		public generatePropertyOfOneParticle(param:ParticleProperties)
		{
			var scale:Vector3D = param[SCALE_VECTOR3D];
			if (!scale)
				throw(new Error("there is no " + SCALE_VECTOR3D + " in param!"));

			_oneData[0] = scale.x;
			_oneData[1] = scale.y - scale.x;
		}

		/**
		 * @inheritDoc
		 */
		public processAnimationSetting(shaderParams:ShaderParams)
		{
			var particleShaderParams:ParticleShaderParams = shaderParams.getOrCreateComponentByClass(ParticleShaderParams);

			particleShaderParams.changePosition++;
			particleShaderParams[this.name] = true;
		}
	}
}


