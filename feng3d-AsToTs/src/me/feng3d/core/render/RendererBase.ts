module feng3d
{
	
	

	
	
	
	
	
	
	

	

	/**
	 * 渲染器抽象基类
	 * @author feng 2015-3-1
	 */
	export class RendererBase
	{
		//背景颜色
		protected _backgroundR:number = 0;
		protected _backgroundG:number = 0;
		protected _backgroundB:number = 0;
		protected _backgroundColor:number = 0;
		protected _backgroundAlpha:number = 1;

		protected _viewWidth:number;
		protected _viewHeight:number;

		/**
		 * 渲染对象排序类
		 */
		protected _renderableSorter:IEntitySorter;

		protected _textureRatioX:number = 1;
		protected _textureRatioY:number = 1;

		protected _shareContext:boolean = false;

		/**
		 * 渲染编号
		 */
		protected _renderIndex:number;

		/**
		 * 创建一个渲染创新基类
		 * @param renderToTexture		释放渲染到纹理
		 */
		public RendererBase(renderToTexture:boolean = false)
		{
			this._renderableSorter = new RenderableMergeSort();
		}

		/**
		 * 创建一个实体收集器
		 */
		public createEntityCollector():EntityCollector
		{
			return new EntityCollector();
		}

		/**
		 * 窗口宽度
		 */
		public get viewWidth():number
		{
			return _viewWidth;
		}

		public set viewWidth(value:number)
		{
			_viewWidth = value;
		}

		/**
		 * 窗口高度
		 */
		public get viewHeight():number
		{
			return _viewHeight;
		}

		public set viewHeight(value:number)
		{
			_viewHeight = value;
		}

		/**
		 * 背景颜色透明度部分
		 */
		public get backgroundAlpha():number
		{
			return _backgroundAlpha;
		}

		public set backgroundAlpha(value:number)
		{
			_backgroundAlpha = value;
		}

		/**
		 * 背景颜色
		 */
		public get backgroundColor():number
		{
			return _backgroundColor;
		}

		public set backgroundColor(value:number)
		{
			_backgroundR = ((value >> 16) & 0xff) / 0xff;
			_backgroundG = ((value >> 8) & 0xff) / 0xff;
			_backgroundB = (value & 0xff) / 0xff;

			_backgroundColor = value;
		}

		/**
		 * Defers control of Context3D clear() and present() calls to Stage3DProxy, enabling multiple Stage3D frameworks
		 * to share the same Context3D object.
		 *
		 * @private
		 */
		public get shareContext():boolean
		{
			return _shareContext;
		}

		public set shareContext(value:boolean)
		{
			_shareContext = value;
		}

		/**
		 * 释放
		 */
		public dispose()
		{
		}

		/**
		 * 渲染潜在可见几何体到缓冲区或纹理
		 * @param stage3DProxy			3D舞台代理
		 * @param entityCollector 		实体收集器
		 * @param target 				目标纹理，默认为null表示渲染到缓冲区
		 */
		public render(stage3DProxy:Stage3DProxy, entityCollector:EntityCollector, target:TextureProxyBase = null)
		{
			var _context:Context3D = stage3DProxy.context3D;

			if (!stage3DProxy || !_context)
				return;

			//执行渲染
			this.executeRender(stage3DProxy, entityCollector, target);

			//清除3D环境缓存
			for (var i:number = 0; i < 8; ++i)
			{
				_context.setVertexBufferAt(i, null);
				_context.setTextureAt(i, null);
			}
		}

		/**
		 * 执行渲染
		 * @param stage3DProxy			3D舞台代理
		 * @param entityCollector		实体收集器
		 * @param target				渲染目标
		 */
		protected executeRender(stage3DProxy:Stage3DProxy, entityCollector:EntityCollector, target:TextureProxyBase = null)
		{
			var _context:Context3D = stage3DProxy.context3D;

			if (this._renderableSorter)
				this._renderableSorter.sort(entityCollector);

			this._renderIndex = 0;

			//重置3D环境背景颜色
			if ((target || !this._shareContext))
				_context.clear(this._backgroundR, this._backgroundG, this._backgroundB, this._backgroundAlpha, 1, 0);
			_context.setDepthTest(false, Context3DCompareMode.ALWAYS);

			//绘制
			this.draw(stage3DProxy, entityCollector, target);
		}

		/**
		 * 绘制
		 * @param stage3DProxy			3D舞台代理
		 * @param entityCollector		实体收集器
		 * @param target				渲染目标
		 */
		protected draw(stage3DProxy:Stage3DProxy, entityCollector:EntityCollector, target:TextureProxyBase)
		{
			throw new AbstractMethodError();
		}
	}
}
