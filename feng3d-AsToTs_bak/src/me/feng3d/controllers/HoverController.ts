module feng3d
{
	

	
	
	
	
	

	

	/**
	 * 盘旋控制器
	 * @author feng 2014-10-10
	 */
	export class HoverController extends LookAtController
	{
		public _currentPanAngle:number = 0;
		public _currentTiltAngle:number = 90;

		protected _origin:Vector3D = new Vector3D(0.0, 0.0, 0.0);
		private _panAngle:number = 0;
		private _tiltAngle:number = 90;
		private _distance:number = 1000;
		private _minPanAngle:number = -Infinity;
		private _maxPanAngle:number = Infinity;

		private _minTiltAngle:number = -90;
		private _maxTiltAngle:number = 90;
		private _yFactor:number = 2;
		private _wrapPanAngle:boolean = false;
		private _pos:Vector3D = new Vector3D();

		/**
		 * 创建盘旋控制器
		 * @param targetObject 控制对象
		 * @param lookAtObject 被注视对象
		 * @param panAngle 摄像机以Y轴旋转的角度
		 * @param tiltAngle 摄像机以X轴旋转的角度
		 * @param distance 与注视对象的距离
		 * @param minTiltAngle 以X轴旋转的最小角度。
		 * @param maxTiltAngle 以X轴旋转的最大角度。
		 * @param minPanAngle 以Y轴旋转的最小角度。
		 * @param maxPanAngle 以Y轴旋转的最大角度。
		 * @param yFactor
		 * @param wrapPanAngle 是否把角度约束在0到360度
		 */
		public HoverController(targetObject:Entity = null, lookAtObject:Container3D = null, panAngle:number = 0, tiltAngle:number = 90, distance:number = 1000, minTiltAngle:number = -90, maxTiltAngle:number = 90, minPanAngle:number = NaN, maxPanAngle:number = NaN, yFactor:number = 2, wrapPanAngle:boolean = false)
		{
			super(targetObject, lookAtObject);

			this.distance = distance;
			this.panAngle = panAngle;
			this.tiltAngle = tiltAngle;
			this.minPanAngle = minPanAngle || -Infinity;
			this.maxPanAngle = maxPanAngle || Infinity;
			this.minTiltAngle = minTiltAngle;
			this.maxTiltAngle = maxTiltAngle;
			this.yFactor = yFactor;
			this.wrapPanAngle = wrapPanAngle;

			//values passed in contrustor are applied immediately
			_currentPanAngle = _panAngle;
			_currentTiltAngle = _tiltAngle;
		}

		/**
		 * 与注视目标的距离
		 */
		public get distance():number
		{
			return _distance;
		}

		public set distance(val:number)
		{
			if (_distance == val)
				return;

			_distance = val;

			notifyUpdate();
		}

		/**
		 * 最小摆动角度
		 */
		public get minPanAngle():number
		{
			return _minPanAngle;
		}

		public set minPanAngle(val:number)
		{
			if (_minPanAngle == val)
				return;

			_minPanAngle = val;

			panAngle = Math.max(_minPanAngle, Math.min(_maxPanAngle, _panAngle));
		}

		/**
		 * 最大摆动角度
		 */
		public get maxPanAngle():number
		{
			return _maxPanAngle;
		}

		public set maxPanAngle(val:number)
		{
			if (_maxPanAngle == val)
				return;

			_maxPanAngle = val;

			panAngle = Math.max(_minPanAngle, Math.min(_maxPanAngle, _panAngle));
		}

		/**
		 * 倾斜角度
		 */
		public get tiltAngle():number
		{
			return _tiltAngle;
		}

		public set tiltAngle(val:number)
		{
			val = Math.max(_minTiltAngle, Math.min(_maxTiltAngle, val));

			if (_tiltAngle == val)
				return;

			_tiltAngle = val;

			notifyUpdate();
		}

		/**
		 * 最小倾斜角度
		 */
		public get minTiltAngle():number
		{
			return _minTiltAngle;
		}

		public set minTiltAngle(val:number)
		{
			if (_minTiltAngle == val)
				return;

			_minTiltAngle = val;

			tiltAngle = Math.max(_minTiltAngle, Math.min(_maxTiltAngle, _tiltAngle));
		}

		/**
		 * 最大倾斜角度
		 */
		public get maxTiltAngle():number
		{
			return _maxTiltAngle;
		}

		public set maxTiltAngle(val:number)
		{
			if (_maxTiltAngle == val)
				return;

			_maxTiltAngle = val;

			tiltAngle = Math.max(_minTiltAngle, Math.min(_maxTiltAngle, _tiltAngle));
		}

		/**
		 * y因子，用于体现摄像机水平与垂直旋转的差异
		 * @see #distance
		 */
		public get yFactor():number
		{
			return _yFactor;
		}

		public set yFactor(val:number)
		{
			if (_yFactor == val)
				return;

			_yFactor = val;

			notifyUpdate();
		}

		/**
		 * 是否把角度约束在0到360度
		 */
		public get wrapPanAngle():boolean
		{
			return _wrapPanAngle;
		}

		public set wrapPanAngle(val:boolean)
		{
			if (_wrapPanAngle == val)
				return;

			_wrapPanAngle = val;

			notifyUpdate();
		}

		/**
		 * 摆动角度
		 */
		public get panAngle():number
		{
			return _panAngle;
		}

		public set panAngle(val:number)
		{
			val = Math.max(_minPanAngle, Math.min(_maxPanAngle, val));

			if (_panAngle == val)
				return;

			_panAngle = val;

			notifyUpdate();
		}

		/**
		 * 更新当前倾斜与摆动角度
		 * @see    #tiltAngle
		 * @see    #panAngle
		 * @see    #steps
		 */
		public override function update()
		{
			if (this._tiltAngle != this._currentTiltAngle || this._panAngle != this._currentPanAngle)
			{
				if (this._wrapPanAngle)
				{
					if (this._panAngle < 0)
					{
						this._currentPanAngle += this._panAngle % 360 + 360 - this._panAngle;
						this._panAngle = this._panAngle % 360 + 360;
					}
					else
					{
						this._currentPanAngle += this._panAngle % 360 - this._panAngle;
						this._panAngle = this._panAngle % 360;
					}

					while (this._panAngle - this._currentPanAngle < -180)
						this._currentPanAngle -= 360;

					while (this._panAngle - this._currentPanAngle > 180)
						this._currentPanAngle += 360;
				}

				this._currentPanAngle = this._panAngle;
				this._currentTiltAngle = this._tiltAngle;

				//snap coords if angle differences are close
				if ((Math.abs(this.tiltAngle - this._currentTiltAngle) < 0.01) && (Math.abs(this._panAngle - this._currentPanAngle) < 0.01))
				{
					this._currentTiltAngle = this._tiltAngle;
					this._currentPanAngle = this._panAngle;
				}
			}

			if (!_targetObject)
				return;

			if (_lookAtPosition)
			{
				this._pos.x = _lookAtPosition.x;
				this._pos.y = _lookAtPosition.y;
				this._pos.z = _lookAtPosition.z;
			}
			else if (_lookAtObject)
			{
				if (_targetObject.parent && _lookAtObject.parent)
				{
					if (_targetObject.parent != _lookAtObject.parent)
					{ // different spaces
						this._pos.x = _lookAtObject.scenePosition.x;
						this._pos.y = _lookAtObject.scenePosition.y;
						this._pos.z = _lookAtObject.scenePosition.z;
						Matrix3DUtils.transformVector(_targetObject.parent.inverseSceneTransform, this._pos, this._pos);
					}
					else
					{ //one parent
						Matrix3DUtils.getTranslation(_lookAtObject.transform3D.transform, this._pos);
					}
				}
				else if (_lookAtObject.scene)
				{
					this._pos.x = _lookAtObject.scenePosition.x;
					this._pos.y = _lookAtObject.scenePosition.y;
					this._pos.z = _lookAtObject.scenePosition.z;
				}
				else
				{
					Matrix3DUtils.getTranslation(_lookAtObject.transform3D.transform, this._pos);
				}
			}
			else
			{
				this._pos.x = this._origin.x;
				this._pos.y = this._origin.y;
				this._pos.z = this._origin.z;
			}

			_targetObject.transform3D.x = this._pos.x + this._distance * Math.sin(this._currentPanAngle * MathConsts.DEGREES_TO_RADIANS) * Math.cos(this._currentTiltAngle * MathConsts.DEGREES_TO_RADIANS);
			_targetObject.transform3D.z = this._pos.z + this._distance * Math.cos(this._currentPanAngle * MathConsts.DEGREES_TO_RADIANS) * Math.cos(this._currentTiltAngle * MathConsts.DEGREES_TO_RADIANS);
			_targetObject.transform3D.y = this._pos.y + this._distance * Math.sin(this._currentTiltAngle * MathConsts.DEGREES_TO_RADIANS) * this._yFactor;
			super.update();
		}
	}
}
