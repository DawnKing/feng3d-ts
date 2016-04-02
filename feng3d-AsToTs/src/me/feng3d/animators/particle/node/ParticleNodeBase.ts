module feng3d
{
	
	
	
	
	
	
	
	

	

	/**
	 * 粒子节点
	 * @author feng 2014-11-13
	 */
	export class ParticleNodeBase extends AnimationNodeBase
	{
		/** 模式列表 */
		private static var MODES:Object = { //
				0: GLOBAL, //
				1: LOCAL_STATIC, //
				2: LOCAL_DYNAMIC //
			};

		//模式名称
		private static var GLOBAL:string = 'Global';
		private static var LOCAL_STATIC:string = 'LocalStatic';
		private static var LOCAL_DYNAMIC:string = 'LocalDynamic';

		protected _mode:number;
		private _priority:number;

		protected _dataLength:number = 3;
		protected _oneData:number[];

		/**
		 * 顶点数据编号
		 */
		public get vaId():string
		{
			throw new AbstractMethodError();
		}

		/**
		 * 顶点数据长度
		 */
		public get vaLen():number
		{
			throw new AbstractMethodError();
		}

		/**
		 * 创建一个粒子节点
		 * @param animationName		节点名称
		 * @param mode				模式
		 * @param dataLength		数据长度
		 * @param priority			优先级
		 */
		constructor(animationName:string, mode:number, dataLength:number, priority:number = 1)
		{
			this.name = animationName + MODES[mode];

			this._mode = mode;
			this._priority = priority;
			this._dataLength = dataLength;

			this._oneData = new number[](this._dataLength, true);

			super();

			AbstractClassError.check(this);
		}

		/**
		 * 优先级
		 */
		public get priority():number
		{
			return _priority;
		}

		/**
		 * 数据长度
		 */
		public get dataLength():number
		{
			return _dataLength;
		}

		/**
		 * 单个粒子数据
		 */
		public get oneData():number[]
		{
			return _oneData;
		}

		/**
		 * 粒子属性模式
		 */
		public get mode():number
		{
			return _mode;
		}

		/**
		 * 创建单个粒子属性
		 */
		public generatePropertyOfOneParticle(param:ParticleProperties)
		{

		}

		/**
		 * 设置粒子渲染参数
		 * @param particleShaderParam 粒子渲染参数
		 */
		public processAnimationSetting(shaderParam:ShaderParams)
		{
			throw new Error("必须设置对应的渲染参数");
		}

		/**
		 * 设置渲染状态
		 * @param stage3DProxy			显卡代理
		 * @param renderable			渲染实体
		 * @param camera				摄像机
		 */
		public setRenderState(renderable:IRenderable, camera:Camera3D)
		{

		}

	}
}
