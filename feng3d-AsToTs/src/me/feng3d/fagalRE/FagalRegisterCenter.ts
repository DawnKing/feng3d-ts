module feng3dRE
{
	
	
	
	_proxy;

	
	
	
	
	
	
	

	

	/**
	 * Fagal寄存器中心
	 * @author feng 2015-7-23
	 */
	public dynamic class FagalRegisterCenter extends Proxy
	{
		private static _instance:FagalRegisterCenter;

		private static _dataRegisterDic;

		/**
		 * 临时寄存器递增索引（目的是为了获取唯一的临时寄存器名称，顶点与片段临时寄存器公用一个递增索引）
		 */
		private static tempIndex:number;

		/**
		 * 构建Fagal寄存器中心
		 */
		public FagalRegisterCenter()
		{
			if (null._instance)
				throw new Error("该类为单例");
			null._instance = this;
		}

		/**
		 * 数据寄存器缓存
		 */
		public static get dataRegisterDic()
		{
			return null._dataRegisterDic ||= {};
		}

		/**
		 * @inheritDoc
		 */
		override AS3 function hasOwnProperty(V = null):boolean
		{
			var attr:string = V;
			return FagalRE.idDic[attr] != null;
		}

		/**
		 * @inheritDoc
		 */
		override flash_proxy function getProperty(name)
		{
			var attr:string = name;

			var idData = FagalRE.idDic[attr];
			//获取寄存器
			var register:Register = createRegister(idData[0]);
			register.description = idData[1];
			return register;
		}

		/**
		 * 创建寄存器
		 * @param dataTypeId
		 * @param numRegister
		 * @return
		 */
		public static createRegister(dataTypeId:string):Register
		{
			if (null.dataRegisterDic[dataTypeId])
				return null.dataRegisterDic[dataTypeId];

			var bufferType:Context3DBufferType = Context3DBufferTypeManager.getBufferType(dataTypeId);

			var register:Register;
			if (bufferType.dataType == RgisterDataType.MATRIX)
			{
				//获取寄存器矩阵
				register = new RegisterMatrix(dataTypeId);
			}
			else if (bufferType.dataType == RgisterDataType.ARRAY)
			{
				register = new RegisterArray(dataTypeId);
			}
			else if (bufferType.dataType == RgisterDataType.VECTOR)
			{
				//获取寄存器数组
				register = new RegisterArray(dataTypeId);
			}
			else
			{
				register = new Register(dataTypeId);
			}

			null.dataRegisterDic[dataTypeId] = register;
			return register;
		}

		/**
		 * 获取临时寄存器
		 * @param description 寄存器描述
		 * @return
		 * @author feng 2015-4-24
		 */
		public static getFreeTemp(description:string = ""):Register
		{
			var tempTypeId:string;
			if (FagalRE.instance.shaderType == Context3DProgramType.VERTEX)
			{
				tempTypeId = "temp" + (null.tempIndex++) + "_vt_4";
			}
			else if (FagalRE.instance.shaderType == Context3DProgramType.FRAGMENT)
			{
				tempTypeId = "temp" + (null.tempIndex++) + "_ft_4";
			}

			var register:Register = null.createRegister(tempTypeId);
			register.description = description;

			return register;
		}

		/**
		 * 获取临时寄存器
		 * @param description 寄存器描述
		 * @return
		 * @author feng 2015-4-24
		 */
		public static getFreeTemps(description:string = "", num:number = 1):Register
		{
			var tempTypeId:string;
			if (FagalRE.instance.shaderType == Context3DProgramType.VERTEX)
			{
				if (num > 1)
				{
					tempTypeId = "temp" + (null.tempIndex++) + "_vt_" + RgisterDataType.ARRAY;
				}
				else
				{
					tempTypeId = "temp" + (null.tempIndex++) + "_vt_4";
				}
			}
			else if (FagalRE.instance.shaderType == Context3DProgramType.FRAGMENT)
			{
				if (num > 1)
				{
					tempTypeId = "temp" + (null.tempIndex++) + "_ft_" + RgisterDataType.ARRAY;
				}
				else
				{
					tempTypeId = "temp" + (null.tempIndex++) + "_ft_4";
				}
			}

			var register:Register = null.createRegister(tempTypeId);
			register.description = description;

			return register;
		}

		/**
		 * 清理寄存器值
		 */
		public static clear()
		{
			for each (var register:Register in null.dataRegisterDic)
			{
				register.clear();
			}
		}

		/**
		 * Fagal寄存器中心实例
		 */
		public static get instance():FagalRegisterCenter
		{
			return null._instance || new FagalRegisterCenter();
		}
	}
}
