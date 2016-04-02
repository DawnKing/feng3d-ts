module feng3d
{
	


	
	
	
	
	



	/**
	 * 粒子速度节点
	 * @author feng 2014-11-13
	 */
	export class ParticleVelocityNode extends ParticleNodeBase
	{
		/** 粒子速度 */
		public _velocity:number[] = number[]([1, 1, 1, 0]);

		/**
		 * 粒子的速度属性
		 */
		public static VELOCITY_VECTOR3D:string = "VelocityVector3D";

		/**
		 * @inheritDoc
		 */
		public get vaId():string
		{
			return _.particleVelocity_va_3;
		}

		/**
		 * @inheritDoc
		 */
		public get vaLen():number
		{
			return 3;
		}

		/**
		 * 创建一个粒子速度节点
		 * @param mode		模式
		 * @param velocity	粒子速度
		 */
		constructor(mode:number, velocity:Vector3D = null)
		{
			super("ParticleVelocity", mode, 3);

			if (velocity)
			{
				this._velocity[0] = velocity.x;
				this._velocity[1] = velocity.y;
				this._velocity[2] = velocity.z;
			}
			else
			{
				this._velocity[0] = 0;
				this._velocity[1] = 0;
				this._velocity[2] = 0;
			}
		}

		/**
		 * @inheritDoc
		 */
		protected initBuffers()
		{
			super.initBuffers();

			if (this.mode == ParticlePropertiesMode.GLOBAL)
				this.context3DBufferOwner.mapContext3DBuffer(this._.particleVelocity_vc_vector, this.updateVelocityConstBuffer);
		}

		private updateVelocityConstBuffer(velocityConstBuffer:VCVectorBuffer)
		{
			velocityConstBuffer.update(this._velocity);
		}

		/**
		 * @inheritDoc
		 */
		public generatePropertyOfOneParticle(param:ParticleProperties)
		{
			var _tempVelocity:Vector3D = param[VELOCITY_VECTOR3D];
			if (!_tempVelocity)
				throw new Error("there is no " + VELOCITY_VECTOR3D + " in param!");

			_oneData[0] = _tempVelocity.x;
			_oneData[1] = _tempVelocity.y;
			_oneData[2] = _tempVelocity.z;
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
