module feng3d
{
	
	


	
	
	
	
	
	
	
	
	



	/**
	 * 3D环境缓存类(方便调试与管理渲染操作)
	 * @author feng 2014-6-6
	 */
	export class Context3DCache extends Context3DBufferCollector
	{
		/** 寄存器数据缓存 */
		private regBufferDic:Dictionary = new Dictionary();
		/** 其他数据缓存 */
		public otherBufferDic:Dictionary = new Dictionary();

		/**
		 * 运行寄存器缓冲列表
		 */
		public runRegBufferList:Array;

		/** 渲染程序缓存 */
		public programBuffer:ProgramBuffer;

		/** 索引缓存 */
		public indexBuffer:IndexBuffer;

		/**
		 * 片段输出缓冲
		 */
		public ocBuffer:OCBuffer;

		/**
		 * 数据寄存器字典
		 */
		private _dataRegisterDic:Dictionary;

		/**
		 * 渲染参数
		 */
		public shaderParams:ShaderParams;

		/**
		 * 创建3D环境缓存类
		 */
		constructor()
		{
			super();
		}

		/**
		 * @inheritDoc
		 */
		public override function addDataBuffer(context3DDataBuffer:Context3DBuffer)
		{
			super.addDataBuffer(context3DDataBuffer);

			var dataTypeId:string = context3DDataBuffer.dataTypeId;
			if (context3DDataBuffer is RegisterBuffer)
				this.regBufferDic[dataTypeId] = context3DDataBuffer;
			else if (context3DDataBuffer is ProgramBuffer)
				this.programBuffer = context3DDataBuffer as ProgramBuffer;
			else if (context3DDataBuffer is IndexBuffer)
				this.indexBuffer = context3DDataBuffer as IndexBuffer;
			else
				this.otherBufferDic[dataTypeId] = context3DDataBuffer;
		}

		/**
		 * @inheritDoc
		 */
		public override function removeDataBuffer(context3DDataBuffer:Context3DBuffer)
		{
			super.removeDataBuffer(context3DDataBuffer);

			var dataTypeId:string = context3DDataBuffer.dataTypeId;
			delete this.regBufferDic[dataTypeId];
			delete this.otherBufferDic[dataTypeId];

			if (context3DDataBuffer is ProgramBuffer)
			{
				this.programBuffer = null;
			}
		}

		/**
		 * 使用Context3D缓存绘制
		 * <p>过程：渲染程序缓存（标记使用的寄存器数据缓存）-->寄存器数据缓存(标记使用的数据)-->其他缓存-->绘制三角形</p>
		 * @param context3D				3d环境
		 * @param renderIndex			渲染编号
		 */
		public render(context3D:Context3D, renderIndex:number = 0)
		{
			//更新渲染程序（标记使用寄存器）
			this.fagalRE.context3DCache = this;

			this.programBuffer.doBuffer(context3D);

			this.fagalRE.context3DCache = null;

			this.dataRegisterDic = this.programBuffer.dataRegisterDic;

			//处理 其他数据缓存
			for each (var context3DDataBuffer:Context3DBuffer in this.otherBufferDic)
			{
				context3DDataBuffer.doBuffer(context3D);
			}
			//处理 需要执行的寄存器数据缓存
			for each (var registerBuffer:RegisterBuffer in this.runRegBufferList)
			{
				registerBuffer.doBuffer(context3D);
			}

			if (this.ocBuffer != null)
			{
				this.ocBuffer.doBuffer(context3D);
				if (renderIndex == 0)
				{
					context3D.clear(1, 1, 1);
				}
			}

			//执行索引数据缓存
			this.indexBuffer.doBuffer(context3D);

			if (this.ocBuffer != null)
			{
				context3D.setRenderToBackBuffer();
			}

			//清理缓存
			this.clearContext3D(context3D);
		}

		/**
		 * 使用到的数据寄存器
		 */
		private get dataRegisterDic():Dictionary
		{
			return _dataRegisterDic;
		}

		/**
		 * @private
		 */
		private set dataRegisterDic(value:Dictionary)
		{
			if (_dataRegisterDic != value)
			{
				_dataRegisterDic = value;
				mapRegister();
			}
		}

		/**
		 * 清理3D环境
		 */
		private clearContext3D(context3D:Context3D)
		{
			for (var i:number = 0; i < 8; ++i)
			{
				context3D.setVertexBufferAt(i, null);
				context3D.setTextureAt(i, null);
			}
		}

		/**
		 * 映射寄存器
		 */
		private mapRegister()
		{
			this.ocBuffer = null;
			this.runRegBufferList = [];

			for each (var register:RegisterValue in this.dataRegisterDic)
			{
				var registerBuffer:RegisterBuffer = this.regBufferDic[register.dataTypeId];
				//输入数据寄存器必须有对应的数据缓存
				if (RegisterType.isInputDataRegister(register.regType))
				{
					if (registerBuffer == null)
					{
						throw new Error("缺少【" + register.dataTypeId + "】寄存器数据缓存");
					}
				}
				if (registerBuffer != null)
				{
					if (registerBuffer is OCBuffer)
					{
						this.ocBuffer = registerBuffer as OCBuffer;
					}
					else
					{
						registerBuffer.firstRegister = register.index;
						this.runRegBufferList.push(registerBuffer);
					}
				}
			}
			this.runRegBufferList.sortOn("dataTypeId");
		}

		/**
		 * Fagal函数运行环境
		 */
		private get fagalRE():FagalRE
		{
			return FagalRE.instance;
		}
	}
}
