module feng3d
{
	
	
	
	
	
	

	/**
	 * 无空间包围盒，用于表示一直处于视锥体内或之外
	 * <p>用于某些一直处于视锥体的实体，例如方向光源、天空盒等</p>
	 * @author feng 2015-3-21
	 */
	export class NullBounds extends BoundingVolumeBase
	{
		private _alwaysIn:boolean;
		private _renderable:WireframePrimitiveBase;

		/**
		 * 构建空无空间包围盒
		 * @param alwaysIn				是否总在视锥体内
		 * @param renderable			渲染实体
		 */
		constructor(alwaysIn:boolean = true, renderable:WireframePrimitiveBase = null)
		{
			super();
			this._alwaysIn = alwaysIn;
			this._renderable = renderable;
			_max.x = _max.y = _max.z = number.POSITIVE_INFINITY;
			_min.x = _min.y = _min.z = this._alwaysIn ? number.NEGATIVE_INFINITY :number.POSITIVE_INFINITY;
		}

		/**
		 * @inheritDoc
		 */
		protected createBoundingRenderable():WireframePrimitiveBase
		{
			return this._renderable || new WireframeSphere(100, 16, 12, 0xffffff, 0.5);
		}

		/**
		 * @inheritDoc
		 */
		public isInFrustum(planes:Plane3D[], numPlanes:number):boolean
		{
			planes = planes;
			numPlanes = numPlanes;
			return this._alwaysIn;
		}

		/**
		 * @inheritDoc
		 */
		public fromGeometry(geometry:Geometry)
		{
		}

		/**
		 * @inheritDoc
		 */
		public fromExtremes(minX:number, minY:number, minZ:number, maxX:number, maxY:number, maxZ:number)
		{
		}

		/**
		 * @inheritDoc
		 */
		public transformFrom(bounds:BoundingVolumeBase, matrix:Matrix3D)
		{
			matrix = matrix;
			this._alwaysIn = NullBounds(bounds)._alwaysIn;
		}
	}
}
