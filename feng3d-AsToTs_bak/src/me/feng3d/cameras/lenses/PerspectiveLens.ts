module feng3d
{
	

	

	/**
	 * 透视摄像机镜头
	 * @author feng 2014-10-14
	 */
	export class PerspectiveLens extends LensBase
	{
		private _fieldOfView:number;
		private _focalLength:number;
		private _focalLengthInv:number;
		private _yMax:number;
		private _xMax:number;
		private _coordinateSystem:number;

		/**
		 * 创建一个透视摄像机镜头
		 * @param fieldOfView 视野
		 * @param coordinateSystem 坐标系统类型
		 */
		public PerspectiveLens(fieldOfView:number = 60, coordinateSystem:number = CoordinateSystem.LEFT_HANDED)
		{
			super();

			this.fieldOfView = fieldOfView;
			this.coordinateSystem = coordinateSystem;
		}

		/**
		 * 视野
		 */
		public get fieldOfView():number
		{
			return _fieldOfView;
		}

		public set fieldOfView(value:number)
		{
			if (value == _fieldOfView)
				return;

			_fieldOfView = value;

			_focalLengthInv = Math.tan(_fieldOfView * Math.PI / 360);
			_focalLength = 1 / _focalLengthInv;

			invalidateMatrix();
		}

		/**
		 * 焦距
		 */
		public get focalLength():number
		{
			return _focalLength;
		}

		public set focalLength(value:number)
		{
			if (value == _focalLength)
				return;

			_focalLength = value;

			_focalLengthInv = 1 / _focalLength;
			_fieldOfView = Math.atan(_focalLengthInv) * 360 / Math.PI;

			invalidateMatrix();
		}

		public unproject(nX:number, nY:number, sZ:number, v:Vector3D = null):Vector3D
		{
			if (!v)
				v = new Vector3D();
			v.x = nX;
			v.y = -nY;
			v.z = sZ;
			v.w = 1;

			v.x *= sZ;
			v.y *= sZ;

			Matrix3DUtils.transformVector(this.unprojectionMatrix, v, v);

			//z is unaffected by transform
			v.z = sZ;

			return v;
		}

		/**
		 * 坐标系类型
		 */
		public get coordinateSystem():number
		{
			return _coordinateSystem;
		}

		public set coordinateSystem(value:number)
		{
			if (value == _coordinateSystem)
				return;

			_coordinateSystem = value;

			invalidateMatrix();
		}

		protected updateMatrix()
		{
			var raw:Number[] = Matrix3DUtils.RAW_DATA_CONTAINER;

			this._yMax = _near * this._focalLengthInv;
			this._xMax = this._yMax * _aspectRatio;

			var left:number, right:number, top:number, bottom:number;

			if (_scissorRect.x == 0 && _scissorRect.y == 0 && _scissorRect.width == _viewPort.width && _scissorRect.height == _viewPort.height)
			{
				// assume unscissored frustum
				left = -this._xMax;
				right = this._xMax;
				top = -this._yMax;
				bottom = this._yMax;
				// assume unscissored frustum
				raw[uint(0)] = _near / this._xMax;
				raw[uint(5)] = _near / this._yMax;
				raw[uint(10)] = _far / (_far - _near);
				raw[uint(11)] = 1;
				raw[uint(1)] = raw[uint(2)] = raw[uint(3)] = raw[uint(4)] = raw[uint(6)] = raw[uint(7)] = raw[uint(8)] = raw[uint(9)] = raw[uint(12)] = raw[uint(13)] = raw[uint(15)] = 0;
				raw[uint(14)] = -_near * raw[uint(10)];
			}
			else
			{
				// assume scissored frustum
				var xWidth:number = this._xMax * (_viewPort.width / _scissorRect.width);
				var yHgt:number = this._yMax * (_viewPort.height / _scissorRect.height);
				var center:number = this._xMax * (_scissorRect.x * 2 - _viewPort.width) / _scissorRect.width + this._xMax;
				var middle:number = -this._yMax * (_scissorRect.y * 2 - _viewPort.height) / _scissorRect.height - this._yMax;

				left = center - xWidth;
				right = center + xWidth;
				top = middle - yHgt;
				bottom = middle + yHgt;

				raw[uint(0)] = 2 * _near / (right - left);
				raw[uint(5)] = 2 * _near / (bottom - top);
				raw[uint(8)] = (right + left) / (right - left);
				raw[uint(9)] = (bottom + top) / (bottom - top);
				raw[uint(10)] = (_far + _near) / (_far - _near);
				raw[uint(11)] = 1;
				raw[uint(1)] = raw[uint(2)] = raw[uint(3)] = raw[uint(4)] = raw[uint(6)] = raw[uint(7)] = raw[uint(12)] = raw[uint(13)] = raw[uint(15)] = 0;
				raw[uint(14)] = -2 * _far * _near / (_far - _near);
			}

			// Switch projection transform from left to right handed.
			if (this._coordinateSystem == CoordinateSystem.RIGHT_HANDED)
				raw[uint(5)] = -raw[uint(5)];

			_matrix.copyRawDataFrom(raw);

			var yMaxFar:number = _far * this._focalLengthInv;
			var xMaxFar:number = yMaxFar * _aspectRatio;

			_frustumCorners[0] = _frustumCorners[9] = left;
			_frustumCorners[3] = _frustumCorners[6] = right;
			_frustumCorners[1] = _frustumCorners[4] = top;
			_frustumCorners[7] = _frustumCorners[10] = bottom;

			_frustumCorners[12] = _frustumCorners[21] = -xMaxFar;
			_frustumCorners[15] = _frustumCorners[18] = xMaxFar;
			_frustumCorners[13] = _frustumCorners[16] = -yMaxFar;
			_frustumCorners[19] = _frustumCorners[22] = yMaxFar;

			_frustumCorners[2] = _frustumCorners[5] = _frustumCorners[8] = _frustumCorners[11] = _near;
			_frustumCorners[14] = _frustumCorners[17] = _frustumCorners[20] = _frustumCorners[23] = _far;

			_matrixInvalid = false;
		}
	}
}
