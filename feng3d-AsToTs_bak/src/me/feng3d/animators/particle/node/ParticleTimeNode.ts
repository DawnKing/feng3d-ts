module feng3d
{
	
	
	
	
	

	

	/**
	 * 粒子时间节点
	 * @author feng 2014-11-17
	 */
	export class ParticleTimeNode extends ParticleNodeBase
	{
		/**
		 * @inheritDoc
		 */
		public get vaId():string
		{
			return _.particleTime_va_4;
		}

		/**
		 * @inheritDoc
		 */
		public get vaLen():number
		{
			return 4;
		}

		/**
		 * 创建一个粒子时间节点
		 * @param usesDuration	是否持续
		 * @param usesLooping	是否延时
		 * @param usesDelay		是否循环
		 */
		public ParticleTimeNode()
		{
			super("ParticleTime", ParticlePropertiesMode.LOCAL_STATIC, 4, 0);
		}

		/**
		 * @inheritDoc
		 */
		public generatePropertyOfOneParticle(param:ParticleProperties)
		{
			_oneData[0] = param.startTime;
			_oneData[1] = param.duration;
			_oneData[2] = param.delay + param.duration;
			_oneData[3] = 1 / param.duration;
		}

		/**
		 * @inheritDoc
		 */
		public processAnimationSetting(shaderParams:ShaderParams)
		{
			var particleShaderParams:ParticleShaderParams = shaderParams.getOrCreateComponentByClass(ParticleShaderParams);

			particleShaderParams[this.name] = true;
		}
	}
}