module feng3dRE
{
	
	_proxy;
	

	
	
	
	

	/**
	 * Fagal运行环境空间
	 * @author feng 2015-7-23
	 */
	public dynamic class FagalRESpace extends Proxy
	{
		private callLog:FagalItem[];

		private _math:FagalMath;

		/**
		 * Fagal数学运算
		 */
		private get math():FagalMath
		{
			return _math ||= new FagalMath();
		}

		/**
		 * Fagal寄存器中心
		 */
		private get registerCenter():FagalRegisterCenter
		{
			return FagalRegisterCenter.instance;
		}

		/**
		 * 创建Fagal运行环境空间
		 */
		constructor()
		{
			super();
		}

		/**
		 * @inheritDoc
		 */
		override flash_proxy function getProperty(name:*):*
		{
			var attr:string = name;

			if (FagalRESpace.prototype[attr] != null)
			{
				return FagalRESpace.prototype[attr];
			}

			if (registerCenter.hasOwnProperty(attr))
			{
				var value:* = FagalRESpace.prototype[attr] = registerCenter[attr];
				return value;
			}

			throw new ReferenceError("在 " + getQualifiedClassName(this) + " 上找不到属性 " + attr + "，且没有默认值");
		}

		/**
		 * @inheritDoc
		 */
		override flash_proxy function callProperty(name:*, ... parameters):*
		{
			var funcName:string = string(name);
			var func:Function = math[funcName];
			assert(func != null, "在Fagal中尝试调用" + getQualifiedClassName(math) + "." + funcName + "中不存在的函数");

			callLog.push(new FagalItem(funcName, parameters));
		}

		/**
		 * 执行渲染函数
		 * @param fagalMethod
		 * @return
		 */
		public run(fagalMethod:Function):FagalItem[]
		{
			this.callLog = new FagalItem[]();

			fagalMethod();

			return this.callLog;
		}

		/**
		 * 获取临时寄存器
		 * @param description 寄存器描述
		 * @return
		 * @author feng 2015-4-24
		 */
		public getFreeTemp(description:string = ""):Register
		{
			var register:Register = FagalRegisterCenter.getFreeTemp(description);
			return register;
		}

		/**
		 * 获取临时寄存器
		 * @param description 寄存器描述
		 * @return
		 * @author feng 2015-4-24
		 */
		public getFreeTemps(description:string = "", num:number = 1):RegisterArray
		{
			var register:RegisterArray = FagalRegisterCenter.getFreeTemps(description, num) as RegisterArray;
			return register;
		}
	}
}
