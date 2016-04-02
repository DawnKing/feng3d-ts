module feng3d
{
	

	
	
	
	
	

	
	

	/**
	 * AGAL程序缓冲
	 * @author feng 2014-8-20
	 */
	export class AGALProgram3DCache
	{
		/**
		 * 实例字典
		 */
		private static var _instanceDic:Dictionary = new Dictionary();

		/**
		 * 字符串与二进制字典
		 */
		private static var shaderByteCodeDic:Dictionary = new Dictionary();

		/**
		 * 当前3D环境
		 */
		private _context3D:Context3D;

		/**
		 * 字符串与程序字典
		 */
		private _program3Ds:Dictionary;
		/**
		 * 程序使用计数
		 */
		private _usages:Dictionary;
		/**
		 * 程序与字符串字典
		 */
		private _keys:Dictionary;

		/**
		 * 创建AGAL程序缓冲
		 * @param context3D			3D环境
		 */
		public AGALProgram3DCache(context3D:Context3D)
		{
			if (_instanceDic[context3D])
				throw new Error("已经存在对应的实例，请使用GetInstance方法获取。");

			_instanceDic[context3D] = this;

			this._context3D = context3D;

			this._program3Ds = new Dictionary();
			this._usages = new Dictionary();
			this._keys = new Dictionary();
		}

		/**
		 * 获取AGAL程序缓冲实例
		 * @param context3D			3D环境
		 * @return					AGAL程序缓冲实例
		 */
		public static function getInstance(context3D:Context3D):AGALProgram3DCache
		{
			return _instanceDic[context3D] ||= new AGALProgram3DCache(context3D);
		}

		/**
		 * 销毁
		 */
		public dispose()
		{
			for (var key:string in this._program3Ds)
				this.destroyProgram(key);

			this._keys = null;
			this._program3Ds = null;
			this._usages = null;
		}

		/**
		 * 获取渲染程序
		 * @param oldProgram3D			原来的渲染程序
		 * @param vertexCode			顶点渲染代码
		 * @param fragmentCode			片段渲染代码
		 * @return						渲染程序
		 */
		public getProgram3D(oldProgram3D:Program3D, vertexCode:string, fragmentCode:string):Program3D
		{
			var key:string = this.getKey(vertexCode, fragmentCode);
			var program:Program3D = this._program3Ds[key];

			if (program == null)
			{
				program = this._context3D.createProgram();

				var vertexByteCode:ByteArray = this.getVertexByteCode(vertexCode);
				var fragmentByteCode:ByteArray = this.getFragmentByteCode(fragmentCode);

				program.upload(vertexByteCode, fragmentByteCode);

				this._program3Ds[key] = program;
				this._keys[program] = key;
				this._usages[program] = 0;
			}

			if (oldProgram3D != program)
			{
				if (oldProgram3D)
					this.freeProgram3D(oldProgram3D);
				this._usages[program]++;
			}

			return program;
		}

		/**
		 * 获取片段渲染二进制
		 * @param fragmentCode		片段渲染代码
		 * @return					片段渲染二进制
		 */
		private getFragmentByteCode(fragmentCode:string):ByteArray
		{
			var noCommentCode:string = this.filterComment(fragmentCode);
			return shaderByteCodeDic[fragmentCode] ||= new AGALMiniAssembler(Debug.agalDebug).assemble(Context3DProgramType.FRAGMENT, noCommentCode);
		}

		/**
		 * 获取顶点渲染二进制
		 * @param vertexCode		顶点渲染代码
		 * @return 					顶点渲染二进制
		 */
		private getVertexByteCode(vertexCode:string):ByteArray
		{
			var noCommentCode:string = this.filterComment(vertexCode);
			return shaderByteCodeDic[vertexCode] ||= new AGALMiniAssembler(Debug.agalDebug).assemble(Context3DProgramType.VERTEX, noCommentCode);
		}

		/**
		 * 过滤代码中的注释
		 * @param code			渲染代码
		 * @return				没有注释的渲染代码
		 */
		private filterComment(code:string):string
		{
//			return code;
			var codes:Array = code.split(FagalToken.BREAK);
			var line:string;
			var newCode:string = "";
			for (var i:number = 0; i < codes.length; i++)
			{
				line = codes[i];

				if (line.length > 0 && line.substr(0, FagalToken.COMMENT.length) != FagalToken.COMMENT)
				{
					if (newCode.length > 0 && newCode.substr(-FagalToken.BREAK.length) != FagalToken.BREAK)
						newCode += FagalToken.BREAK;
					newCode += line;
				}
			}
			return newCode;
		}

		/**
		 * 释放渲染程序
		 * @param program3D		被释放的渲染程序
		 */
		public freeProgram3D(program3D:Program3D)
		{
			this._usages[program3D]--;
			if (this._usages[program3D] == 0)
				this.destroyProgram(this._keys[program3D]);
		}

		/**
		 * 销毁渲染程序
		 * @param key		渲染代码
		 */
		private destroyProgram(key:string)
		{
			this._program3Ds[key].dispose();
			this._program3Ds[key] = null;
			delete this._program3Ds[key];
		}

		/**
		 * 获取渲染代码键值
		 * @param vertexCode			顶点渲染代码
		 * @param fragmentCode			片段渲染代码
		 * @return						渲染代码键值
		 */
		private getKey(vertexCode:string, fragmentCode:string):string
		{
			return vertexCode + "---" + fragmentCode;
		}
	}
}
