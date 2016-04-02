module feng3d
{
	
	
	
	
	
	
	
	

	

	/**
	 * 可渲染对象基类
	 * @author feng 2015-5-27
	 */
	export class Renderable extends Component implements IRenderable
	{
		protected _context3dCache:Context3DCache;

		/**
		 * 创建一个可渲染对象基类
		 */
		public Renderable()
		{
			this._context3dCache = new Context3DCache();
		}

		/**
		 * Fagal编号中心
		 */
		public get _():FagalIdCenter
		{
			return FagalIdCenter.instance;
		}

		/**
		 * @inheritDoc
		 */
		public get context3dCache():Context3DCache
		{
			return _context3dCache;
		}

		/**
		 * @inheritDoc
		 */
		public get mouseEnabled():boolean
		{
			throw new AbstractMethodError();
		}

		/**
		 * @inheritDoc
		 */
		public get numTriangles():number
		{
			throw new AbstractMethodError();
		}

		/**
		 * @inheritDoc
		 */
		public get sourceEntity():Entity
		{
			throw new AbstractMethodError();
		}

		/**
		 * @inheritDoc
		 */
		public get material():MaterialBase
		{
			throw new AbstractMethodError();
		}

		/**
		 * @inheritDoc
		 */
		public get animator():AnimatorBase
		{
			throw new AbstractMethodError();
		}

		/**
		 * @inheritDoc
		 */
		public get castsShadows():boolean
		{
			throw new AbstractMethodError();
		}
	}
}
