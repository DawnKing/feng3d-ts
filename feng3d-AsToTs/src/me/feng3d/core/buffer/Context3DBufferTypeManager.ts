module feng3d
{
	

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

	/**
	 * 3d环境缓存类型管理者
	 * @author feng 2014-9-3
	 */
	export class Context3DBufferTypeManager
	{
		private static NAME_REGEXP:string = "[a-zA-Z0-9$]";

		/** 缓存类型字典 */
		private bufferTypeDic;

		private typeClassDic;

		/** 实例 */
		private static _instance:Context3DBufferTypeManager;

		private static config:Array = [ //
			["blendFactors", BlendFactorsBuffer], //
			["culling", CullingBuffer], //
			["depthTest", DepthTestBuffer], //
			["(" + NAME_REGEXP + "+)?_fc_bytes", FCByteArrayBuffer], //
			["(" + NAME_REGEXP + "+)?_fc_matrix", FCMatrixBuffer], //
			["(" + NAME_REGEXP + "+)?_fc_vector", FCVectorBuffer], //
			["(" + NAME_REGEXP + "+)?_fs_array", FSArrayBuffer], //
			["(" + NAME_REGEXP + "+)?_fs", FSBuffer], //
			["index", IndexBuffer], //
			["(" + NAME_REGEXP + "+)?_oc", OCBuffer], //
			["program", ProgramBuffer], //
			["(" + NAME_REGEXP + "+)?_va_([1-4x])", VABuffer], //
			["(" + NAME_REGEXP + "+)?_vc_bytes", VCByteArrayBuffer], //
			["(" + NAME_REGEXP + "+)?_vc_matrix", VCMatrixBuffer], //
			["(" + NAME_REGEXP + "+)?_vc_vector", VCVectorBuffer], //
			];

		/**
		 * 创建3d环境缓存类型管理者
		 */
		constructor()
		{
			if (_instance)
				throw new Error("单例模式");
			_instance = this;
			this.bufferTypeDic = {};
			this.typeClassDic = {};
		}

		/**
		 * 3d环境缓存类型管理者实例
		 */
		private static function get instance():Context3DBufferTypeManager
		{
			return _instance || new Context3DBufferTypeManager();
		}

		/**
		 * 获取或创建3d缓存类型
		 * @param typeId 		3d缓存类型编号
		 * @return				3d缓存类型实例
		 */
		public static getBufferType(typeId:string):Context3DBufferType
		{
			return instance.getBufferType(typeId);
		}

		/**
		 * 获取3d缓存类定义
		 * @param typeId 		3d缓存类型编号
		 * @return				3d缓存类定义
		 */
		public static getBufferClass(typeId:string):Class
		{
			return instance.getBufferClass(typeId);
		}

		/**
		 * 获取或创建3d缓存类型
		 * @param typeId 		3d缓存类型编号
		 * @return				3d缓存类型实例
		 */
		public getBufferType(typeId:string):Context3DBufferType
		{
			var bufferType:Context3DBufferType = this.bufferTypeDic[typeId];

			if (bufferType)
				return bufferType;

			this.bufferTypeDic[typeId] = bufferType = new Context3DBufferType();

			var types:Array = typeId.split("_");
			bufferType.registerType = types[1];
			bufferType.dataType = types[2];

			return bufferType;
		}

		/**
		 * 获取3d缓存类定义
		 * @param typeId 		3d缓存类型编号
		 * @return				3d缓存类定义
		 */
		public getBufferClass(typeId:string):Class
		{
			var cls:Class = this.typeClassDic[typeId];
			if (cls == null)
			{
				for (var i:number = 0; i < config.length; i++)
				{
					var result:Array = typeId.match(config[i][0]);
					if (result != null && result.input == result[0])
					{
						return config[i][1];
					}
				}
			}
			throw new Error("无法为" + typeId + "匹配到3d缓存类");
		}
	}
}
