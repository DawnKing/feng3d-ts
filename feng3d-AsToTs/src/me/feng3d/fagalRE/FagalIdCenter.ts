module feng3dRE
{
	
	_proxy;

	/**
	 * Fagal编号中心
	 * @author feng 2015-7-23
	 */
	public dynamic class FagalIdCenter extends Proxy
	{
		private static _instance:FagalIdCenter;

		/**
		 * 创建Fagal编号中心
		 */
		public FagalIdCenter()
		{
			if (null._instance)
				throw new Error("该类为单例");
			null._instance = this;
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

			return attr;
		}

		/**
		 * Fagal编号中心实例
		 */
		public static get instance():FagalIdCenter
		{
			return null._instance || new FagalIdCenter();
		}
	}
}
