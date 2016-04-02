module feng3d
{
	

	
	
	
	
	

	

	/**
	 * 基础网格
	 * @author feng 2014-10-11
	 */
	export class PrimitiveBase extends Geometry
	{
		protected _geomDirty:boolean = true;
		protected _uvDirty:boolean = true;

		private _subGeometry:SubGeometry;

		constructor()
		{
			this._subGeometry = new SubGeometry();
			this.addSubGeometry(this._subGeometry);
			AbstractClassError.check(this);
		}

		/**
		 * @inheritDoc
		 */
		public get subGeometries():SubGeometry[]
		{
			if (_geomDirty)
				updateGeometry();
			if (_uvDirty)
				updateUVs();

			return super.subGeometries;
		}

		/**
		 * @inheritDoc
		 */
		public clone():Geometry
		{
			if (this._geomDirty)
				this.updateGeometry();
			if (this._uvDirty)
				this.updateUVs();

			return super.clone();
		}

		/**
		 * @inheritDoc
		 */
		public scale(scale:number)
		{
			if (this._geomDirty)
				this.updateGeometry();

			super.scale(scale);
		}

		/**
		 * @inheritDoc
		 */
		public scaleUV(scaleU:number = 1, scaleV:number = 1)
		{
			if (this._uvDirty)
				this.updateUVs();

			super.scaleUV(scaleU, scaleV);
		}

		/**
		 * @inheritDoc
		 */
		public applyTransformation(transform:Matrix3D)
		{
			if (this._geomDirty)
				this.updateGeometry();
			super.applyTransformation(transform);
		}

		/**
		 * 创建几何体
		 */
		protected buildGeometry(target:SubGeometry)
		{
			throw new AbstractMethodError();
		}

		/**
		 * 创建uv
		 */
		protected buildUVs(target:SubGeometry)
		{
			throw new AbstractMethodError();
		}

		/**
		 * 几何体失效
		 */
		protected invalidateGeometry()
		{
			this._geomDirty = true;
		}

		/**
		 * uv失效
		 */
		protected invalidateUVs()
		{
			this._uvDirty = true;
		}

		/**
		 * 更新几何体
		 */
		private updateGeometry()
		{
			this.buildGeometry(this._subGeometry);
			this._geomDirty = false;
		}

		/**
		 * 更新uv
		 */
		private updateUVs()
		{
			this.buildUVs(this._subGeometry);
			this._uvDirty = false;
		}
	}
}
