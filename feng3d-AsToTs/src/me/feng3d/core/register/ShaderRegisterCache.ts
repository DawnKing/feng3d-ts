module feng3d
{
	

	
	

	

	/**
	 * 渲染寄存器缓存
	 * @author feng 2014-6-5
	 */
	export class ShaderRegisterCache
	{
		/* 实例 */
		private static _instance:ShaderRegisterCache;
		/** 脏标记 */
		private static _dirty:boolean = true;

		/** 数据寄存器缓存 */
		private _dataRegisterDic:Dictionary;

		/** 使用到的寄存器个数 */
		private usedDataRegisterNum:number;

		/** 寄存器池字典 */
		private registerPoolDic:Dictionary;

//		/** 寄存器配置 */
//		private registerConfig:Array = //
//			[[RegisterType.VA, 8], //
//			[RegisterType.VC, 128], //
//			[RegisterType.VT, 8], //
//			[RegisterType.V, 8], //
//			[RegisterType.FS, 8], //
//			[RegisterType.FC, 28], //
//			[RegisterType.FT, 8], //
//			[RegisterType.OP, 1], //
//			[RegisterType.OC, 1], //
//			];

		/**
		 * AGAL2寄存器配置
		 */
		private static registerConfig:Array = //
			[[RegisterType.VA, 8], //
			[RegisterType.VC, 250], //
			[RegisterType.VT, 26], //
			[RegisterType.V, 10], //
			[RegisterType.FS, 8], //
			[RegisterType.FC, 64], //
			[RegisterType.FT, 16], //
			[RegisterType.OP, 1], //
			[RegisterType.OC, 1], //
			];

		/**
		 * 创建渲染寄存器缓存
		 */
		constructor()
		{
			if (_instance)
				throw new Error("ShaderRegisterCache 单例");
			_instance = this;

			this.init();
		}

		/**
		 * 初始化
		 */
		private init()
		{
			this._dataRegisterDic = new Dictionary();
			this.registerPoolDic = new Dictionary();
			this.usedDataRegisterNum = 0;

			for (var i:number = 0; i < this.registerConfig.length; i++)
			{
				this.registerPoolDic[this.registerConfig[i][0]] = new RegisterPool(this.registerConfig[i][0], this.registerConfig[i][1]);
			}
			_dirty = false;
		}

		/**
		 * 重置
		 */
		private reset()
		{
			this._dataRegisterDic = new Dictionary();
			this.usedDataRegisterNum = 0;

			for each (var registerPool:RegisterPool in this.registerPoolDic)
			{
				registerPool.reset();
			}

			_dirty = false;
		}

		/**
		 * 回收不需要再使用的临时寄存器
		 * @param register 不需要再使用的临时寄存器
		 */
		public removeTempUsage(dataTypeId:string)
		{
			var register:Register = FagalRegisterCenter.dataRegisterDic[dataTypeId];

			if (!register)
				return;

			var _fragmentTempCache:RegisterPool = this.registerPoolDic[register.regType];
			_fragmentTempCache.removeUsage(register);
		}

		/**
		 * 申请数据寄存器
		 * @param dataType 数据类型
		 * @param numRegister 寄存器的个数(默认1个)
		 * @return 数据寄存器
		 */
		public requestRegister(dataTypeId:string)
		{
			if (this._dataRegisterDic[dataTypeId])
				return;

			var register:Register = FagalRegisterCenter.dataRegisterDic[dataTypeId];

			var registerPool:RegisterPool = this.registerPoolDic[register.regType];
			var registerValue:RegisterValue = registerPool.requestFreeRegisters(register.regLen);

			registerValue.dataTypeId = register.regId;

			register.index = registerValue.index;

			this._dataRegisterDic[dataTypeId] = registerValue;
			this.usedDataRegisterNum++;
		}

		/**
		 * 是否存在 dataType 类型寄存器
		 * @param dataType 数据类型
		 * @return
		 */
		public hasReg(dataType:string):boolean
		{
			return this._dataRegisterDic[dataType] != null;
		}

		/**
		 * 注销
		 */
		public dispose()
		{
			for each (var registerPool:RegisterPool in this.registerPoolDic)
			{
				registerPool.dispose();
			}

			this._dataRegisterDic = null;
			this.registerPoolDic = null;
		}

		/**
		 * 实例
		 */
		public static get instance():ShaderRegisterCache
		{
			_instance || new ShaderRegisterCache();
			if (_dirty)
				_instance.reset();
			return _instance;
		}

		/**
		 * 使缓存失效
		 */
		public static invalid()
		{
			_dirty = true;
		}

		/**
		 * 数据寄存器缓存
		 */
		public get dataRegisterDic():Dictionary
		{
			return _dataRegisterDic;
		}

	}
}


