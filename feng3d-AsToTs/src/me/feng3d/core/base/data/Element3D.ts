module feng3d
{
	
	

	
	
	
	

	/**
	 * 位移时抛出
	 */
	[Event(name = "positionChanged", type = "me.feng3d.events.Transform3DEvent")]

	/**
	 * 旋转时抛出
	 */
	[Event(name = "rotationChanged", type = "me.feng3d.events.Transform3DEvent")]

	/**
	 * 缩放时抛出
	 */
	[Event(name = "scaleChanged", type = "me.feng3d.events.Transform3DEvent")]

	/**
	 * 变换状态抛出
	 */
	[Event(name = "transformChanged", type = "me.feng3d.events.Transform3DEvent")]

	/**
	 * 变换已更新
	 */
	[Event(name = "transformUpdated", type = "me.feng3d.events.Transform3DEvent")]


	/**
	 * 3D元素<br/><br/>
	 *
	 * 主要功能:
	 * <ul>
	 *     <li>管理3D元素的位置、旋转、缩放状态</li>
	 * </ul>
	 * @author feng 2014-3-31
	 */
	export class Element3D extends Component
	{
		private _smallestNumber:number = 0.0000000000000000000001;
		protected _transformDirty:boolean = true;

		private _positionDirty:boolean;
		private _rotationDirty:boolean;
		private _scaleDirty:boolean;

		private _positionChanged:Transform3DEvent;
		private _rotationChanged:Transform3DEvent;
		private _scaleChanged:Transform3DEvent;
		private _transformChanged:Transform3DEvent;

		private _eulers:Vector3D = new Vector3D();

		private _listenToPositionChanged:boolean;
		private _listenToRotationChanged:boolean;
		private _listenToScaleChanged:boolean;
		private _listenToTransformChanged:boolean;

		protected _transform:Matrix3D = new Matrix3D();
		protected _x:number = 0;
		protected _y:number = 0;
		protected _z:number = 0;
		protected _rotationX:number = 0;
		protected _rotationY:number = 0;
		protected _rotationZ:number = 0;
		protected _scaleX:number = 1;
		protected _scaleY:number = 1;
		protected _scaleZ:number = 1;
		protected _pivotPoint:Vector3D = new Vector3D();
		protected _pivotZero:boolean = true;
		protected _pos:Vector3D = new Vector3D();
		protected _rot:Vector3D = new Vector3D();
		protected _sca:Vector3D = new Vector3D();
		protected _transformComponents:Vector3D[];

		public Element3D()
		{
			// Cached vector of transformation components used when
			// recomposing the this.transform matrix in this.updateTransform()
			this._transformComponents = new Vector3D[](3, true);
			this._transformComponents[0] = this._pos;
			this._transformComponents[1] = this._rot;
			this._transformComponents[2] = this._sca;

			this._transform.identity();
		}

		/**
		 * 相对父容器的X坐标
		 */
		public get x():number
		{
			return _x;
		}

		public set x(val:number)
		{
			if (_x == val)
				return;

			_x = val;

			invalidatePosition();
		}

		/**
		 * 相对父容器的Y坐标
		 */
		public get y():number
		{
			return _y;
		}

		public set y(val:number)
		{
			if (_y == val)
				return;

			_y = val;

			invalidatePosition();
		}

		/**
		 * 相对父容器的Z坐标
		 */
		public get z():number
		{
			return _z;
		}

		public set z(val:number)
		{
			if (_z == val)
				return;

			_z = val;

			invalidatePosition();
		}

		/**
		 * 绕X轴旋转角度
		 */
		public get rotationX():number
		{
			return _rotationX * MathConsts.RADIANS_TO_DEGREES;
		}

		public set rotationX(val:number)
		{
			if (rotationX == val)
				return;

			_rotationX = val * MathConsts.DEGREES_TO_RADIANS;

			invalidateRotation();
		}

		/**
		 * 绕Y轴旋转角度
		 */
		public get rotationY():number
		{
			return _rotationY * MathConsts.RADIANS_TO_DEGREES;
		}

		public set rotationY(val:number)
		{
			if (rotationY == val)
				return;

			_rotationY = val * MathConsts.DEGREES_TO_RADIANS;

			invalidateRotation();
		}

		/**
		 * 绕Z轴旋转角度
		 */
		public get rotationZ():number
		{
			return _rotationZ * MathConsts.RADIANS_TO_DEGREES;
		}

		public set rotationZ(val:number)
		{
			if (rotationZ == val)
				return;

			_rotationZ = val * MathConsts.DEGREES_TO_RADIANS;

			invalidateRotation();
		}

		/**
		 * X轴旋方向缩放
		 */
		public get scaleX():number
		{
			return _scaleX;
		}

		public set scaleX(val:number)
		{
			if (_scaleX == val)
				return;

			_scaleX = val;

			invalidateScale();
		}

		/**
		 * Y轴旋方向缩放
		 */
		public get scaleY():number
		{
			return _scaleY;
		}

		public set scaleY(val:number)
		{
			if (_scaleY == val)
				return;

			_scaleY = val;

			invalidateScale();
		}

		/**
		 * Z轴旋方向缩放
		 */
		public get scaleZ():number
		{
			return _scaleZ;
		}

		public set scaleZ(val:number)
		{
			if (_scaleZ == val)
				return;

			_scaleZ = val;

			invalidateScale();
		}

		/**
		 * 欧拉角
		 * <ul>
		 *     <li>使用Vector3D对象表示 相对x、y、z轴上的旋转角度</li>
		 * </ul>
		 */
		public get eulers():Vector3D
		{
			_eulers.x = _rotationX * MathConsts.RADIANS_TO_DEGREES;
			_eulers.y = _rotationY * MathConsts.RADIANS_TO_DEGREES;
			_eulers.z = _rotationZ * MathConsts.RADIANS_TO_DEGREES;

			return _eulers;
		}

		public set eulers(value:Vector3D)
		{
			_rotationX = value.x * MathConsts.DEGREES_TO_RADIANS;
			_rotationY = value.y * MathConsts.DEGREES_TO_RADIANS;
			_rotationZ = value.z * MathConsts.DEGREES_TO_RADIANS;

			invalidateRotation();
		}

		/**
		 * 3d元素变换矩阵
		 */
		public get transform():Matrix3D
		{
			if (_transformDirty)
				updateTransform();

			return _transform;
		}

		public set transform(val:Matrix3D)
		{
			//ridiculous matrix error
			var raw:Number[] = Matrix3DUtils.RAW_DATA_CONTAINER;
			val.copyRawDataTo(raw);
			if (!raw[uint(0)])
			{
				raw[uint(0)] = _smallestNumber;
				val.copyRawDataFrom(raw);
			}

			var elements:Vector3D[] = Matrix3DUtils.decompose(val);
			var vec:Vector3D;

			vec = elements[0];

			if (_x != vec.x || _y != vec.y || _z != vec.z)
			{
				_x = vec.x;
				_y = vec.y;
				_z = vec.z;

				invalidatePosition();
			}

			vec = elements[1];

			if (_rotationX != vec.x || _rotationY != vec.y || _rotationZ != vec.z)
			{
				_rotationX = vec.x;
				_rotationY = vec.y;
				_rotationZ = vec.z;

				invalidateRotation();
			}

			vec = elements[2];

			if (_scaleX != vec.x || _scaleY != vec.y || _scaleZ != vec.z)
			{
				_scaleX = vec.x;
				_scaleY = vec.y;
				_scaleZ = vec.z;

				invalidateScale();
			}
		}

		/**
		 * 中心点坐标（本地对象旋转点）
		 */
		public get pivotPoint():Vector3D
		{
			return _pivotPoint;
		}

		public set pivotPoint(pivot:Vector3D)
		{
			if (!_pivotPoint)
				_pivotPoint = new Vector3D();
			_pivotPoint.x = pivot.x;
			_pivotPoint.y = pivot.y;
			_pivotPoint.z = pivot.z;

			invalidatePivot();
		}

		/**
		 * 获取在父容器中的坐标
		 */
		public get position():Vector3D
		{
			transform.copyColumnTo(3, _pos);

			return _pos.clone();
		}

		public set position(value:Vector3D)
		{
			_x = value.x;
			_y = value.y;
			_z = value.z;

			invalidatePosition();
		}

		/**
		 * 使位置数据无效
		 */
		protected invalidatePosition()
		{
			if (this._positionDirty)
				return;

			this._positionDirty = true;

			this.invalidateTransform();

			if (this._listenToPositionChanged)
				this.notifyPositionChanged();
		}

		/**
		 * 发出平移事件
		 */
		private notifyPositionChanged()
		{
			if (!this._positionChanged)
				this._positionChanged = new Transform3DEvent(Transform3DEvent.POSITION_CHANGED, this);

			this.dispatchEvent(this._positionChanged);
		}

		/**
		 * 使变换矩阵失效
		 */
		public invalidateTransform()
		{
			this._transformDirty = true;

			if (this._listenToTransformChanged)
				this.notifyTransformChanged();
		}

		/**
		 * 发出状态改变消息
		 */
		private notifyTransformChanged()
		{
			if (!this._transformChanged)
				this._transformChanged = new Transform3DEvent(Transform3DEvent.TRANSFORM_CHANGED, this);

			this.dispatchEvent(this._transformChanged);
		}

		/**
		 * 更新变换矩阵
		 */
		protected updateTransform()
		{
			this._pos.x = this._x;
			this._pos.y = this._y;
			this._pos.z = this._z;

			this._rot.x = this._rotationX;
			this._rot.y = this._rotationY;
			this._rot.z = this._rotationZ;

			if (!this._pivotZero)
			{
				this._sca.x = 1;
				this._sca.y = 1;
				this._sca.z = 1;

				this._transform.recompose(this._transformComponents);
				this._transform.appendTranslation(this._pivotPoint.x, this._pivotPoint.y, this._pivotPoint.z);
				this._transform.prependTranslation(-this._pivotPoint.x, -this._pivotPoint.y, -this._pivotPoint.z);
				this._transform.prependScale(this._scaleX, this._scaleY, this._scaleZ);

				this._sca.x = this._scaleX;
				this._sca.y = this._scaleY;
				this._sca.z = this._scaleZ;
			}
			else
			{
				this._sca.x = this._scaleX;
				this._sca.y = this._scaleY;
				this._sca.z = this._scaleZ;

				this._transform.recompose(this._transformComponents);
			}

			this._transformDirty = false;
			this._positionDirty = false;
			this._rotationDirty = false;
			this._scaleDirty = false;

			this.dispatchEvent(new Transform3DEvent(Transform3DEvent.TRANSFORM_UPDATED, this));
		}

		/**
		 * 使中心点无效
		 */
		protected invalidatePivot()
		{
			this._pivotZero = (this._pivotPoint.x == 0) && (this._pivotPoint.y == 0) && (this._pivotPoint.z == 0);

			this.invalidateTransform();
		}

		/**
		 * 监听事件
		 * @param type 事件类型
		 * @param listener 回调函数
		 */
		public addEventListener(type:string, listener:Function, useCapture:boolean = false, priority:number = 0, useWeakReference:boolean = false)
		{
			super.addEventListener(type, listener, useCapture, priority, useWeakReference);
			switch (type)
			{
				case Transform3DEvent.POSITION_CHANGED:
					this._listenToPositionChanged = true;
					break;
				case Transform3DEvent.ROTATION_CHANGED:
					this._listenToRotationChanged = true;
					break;
				case Transform3DEvent.SCALE_CHANGED:
					this._listenToRotationChanged = true;
					break;
				case Transform3DEvent.TRANSFORM_CHANGED:
					this._listenToTransformChanged = true;
					break;
			}
		}

		/**
		 * 移除事件
		 * @param type 事件类型
		 * @param listener 回调函数
		 */
		public removeEventListener(type:string, listener:Function, useCapture:boolean = false)
		{
			super.removeEventListener(type, listener, useCapture);

			if (this.hasEventListener(type))
				return;

			switch (type)
			{
				case Transform3DEvent.POSITION_CHANGED:
					this._listenToPositionChanged = false;
					break;
				case Transform3DEvent.ROTATION_CHANGED:
					this._listenToRotationChanged = false;
					break;
				case Transform3DEvent.SCALE_CHANGED:
					this._listenToScaleChanged = false;
					break;
				case Transform3DEvent.TRANSFORM_CHANGED:
					this._listenToTransformChanged = false;
					break;
			}
		}

		/**
		 * 使旋转角度无效
		 */
		protected invalidateRotation()
		{
			if (this._rotationDirty)
				return;

			this._rotationDirty = true;

			this.invalidateTransform();

			if (this._listenToRotationChanged)
				this.notifyRotationChanged();
		}

		/**
		 * 抛出旋转事件
		 */
		private notifyRotationChanged()
		{
			if (!this._rotationChanged)
				this._rotationChanged = new Transform3DEvent(Transform3DEvent.ROTATION_CHANGED, this);

			this.dispatchEvent(this._rotationChanged);
		}

		/**
		 * 使缩放无效
		 */
		protected invalidateScale()
		{
			if (this._scaleDirty)
				return;

			this._scaleDirty = true;

			this.invalidateTransform();

			if (this._listenToScaleChanged)
				this.notifyScaleChanged();
		}

		/**
		 * 抛出缩放事件
		 */
		private notifyScaleChanged()
		{
			if (!this._scaleChanged)
				this._scaleChanged = new Transform3DEvent(Transform3DEvent.SCALE_CHANGED, this);

			this.dispatchEvent(this._scaleChanged);
		}
	}
}
