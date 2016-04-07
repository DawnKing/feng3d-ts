module feng3d
{
	
	

	

	/**
	 *
	 * @author feng 2014-10-27
	 */
	export class BaseMesh
	{
		private _context3dCache:Context3DCache;

		private _geometry:BaseGeometry;
		private _material:BaseMaterial;

		constructor(geometry:BaseGeometry = null, material:BaseMaterial = null)
		{
			this._geometry = geometry || new BaseGeometry();
			this.context3dCache.addChildBufferOwner(this._geometry.context3DBufferOwner);

			this._material = material || new BaseMaterial();
			this.context3dCache.addChildBufferOwner(this._material);
		}

		public render(context3D:Context3D, viewMatrix:Matrix3D)
		{
			this._material.shaderParams.initParams();
			this.context3dCache.shaderParams = this._material.shaderParams;

			this._material.render(viewMatrix);

			//绘制图形
			this.context3dCache.render(context3D);
		}

		protected get context3dCache():Context3DCache
		{
			return this._context3dCache ||= new Context3DCache();
		}
	}
}
