module feng3d
{
	
	
	

	
	
	
	
	
	

	/**
	 * 摄像机镜头
	 * @author feng 2014-10-14
	 */
	export class LensBase extends FEventDispatcher
	{
		protected _matrix:Matrix3D;
		protected _scissorRect:Rectangle = new Rectangle();
		protected _viewPort:Rectangle = new Rectangle();
		protected _near:number = 20;
		protected _far:number = 3000;
		protected _aspectRatio:number = 1;

		protected _matrixInvalid:boolean = true;
		protected _frustumCorners:number[] = new number[](8 * 3, true);

		private _unprojection:Matrix3D;
		private _unprojectionInvalid:boolean = true;

		/**
		 * 创建一个摄像机镜头
		 */
		constructor()
		{
			this._matrix = new Matrix3D();

			AbstractClassError.check(this);
		}

		/**
		 * Retrieves the corner points of the lens frustum.
		 */
		public get frustumCorners():number[]
		{
			return _frustumCorners;
		}

		public set frustumCorners(frustumCorners:number[])
		{
			_frustumCorners = frustumCorners;
		}

		/**
		 * 投影矩阵
		 */
		public get matrix():Matrix3D
		{
			if (_matrixInvalid)
			{
				updateMatrix();
				_matrixInvalid = false;
			}
			return _matrix;
		}

		public set matrix(value:Matrix3D)
		{
			_matrix = value;
			invalidateMatrix();
		}

		/**
		 * 最近距离
		 */
		public get near():number
		{
			return _near;
		}

		public set near(value:number)
		{
			if (value == _near)
				return;
			_near = value;
			invalidateMatrix();
		}

		/**
		 * 最远距离
		 */
		public get far():number
		{
			return _far;
		}

		public set far(value:number)
		{
			if (value == _far)
				return;
			_far = value;
			invalidateMatrix();
		}

		/**
		 * 视窗缩放比例(width/height)，在渲染器中设置
		 */
		public get aspectRatio():number
		{
			return _aspectRatio;
		}

		public set aspectRatio(value:number)
		{
			if (_aspectRatio == value || (value * 0) != 0)
				return;
			_aspectRatio = value;
			invalidateMatrix();
		}

		/**
		 * 场景坐标投影到屏幕坐标
		 * @param point3d 场景坐标
		 * @param v 屏幕坐标（输出）
		 * @return 屏幕坐标
		 */
		public project(point3d:Vector3D, v:Vector3D = null):Vector3D
		{
			if (!v)
				v = new Vector3D();
			Matrix3DUtils.transformVector(this.matrix, point3d, v);
			v.x = v.x / v.w;
			v.y = -v.y / v.w;

			//z is unaffected by transform
			v.z = point3d.z;

			return v;
		}

		/**
		 * 投影逆矩阵
		 */
		public get unprojectionMatrix():Matrix3D
		{
			if (_unprojectionInvalid)
			{
				_unprojection ||= new Matrix3D();
				_unprojection.copyFrom(matrix);
				_unprojection.invert();
				_unprojectionInvalid = false;
			}

			return _unprojection;
		}

		/**
		 * 屏幕坐标投影到摄像机空间坐标
		 * @param nX 屏幕坐标X -1（左） -> 1（右）
		 * @param nY 屏幕坐标Y -1（上） -> 1（下）
		 * @param sZ 到屏幕的距离
		 * @param v 场景坐标（输出）
		 * @return 场景坐标
		 */
		public unproject(nX:number, nY:number, sZ:number, v:Vector3D = null):Vector3D
		{
			throw new AbstractMethodError();
		}

		/**
		 * 投影矩阵失效
		 */
		protected invalidateMatrix()
		{
			this._matrixInvalid = true;
			this._unprojectionInvalid = true;
			// notify the camera that the lens this.matrix is changing. this will mark the 
			// viewProjectionMatrix in the camera as invalid, and force the this.matrix to
			// be re-queried from the lens, and therefore rebuilt.
			this.dispatchEvent(new LensEvent(LensEvent.MATRIX_CHANGED, this));
		}

		/**
		 * 更新投影矩阵
		 */
		protected updateMatrix()
		{
			throw new AbstractMethodError();
		}
	}
}
