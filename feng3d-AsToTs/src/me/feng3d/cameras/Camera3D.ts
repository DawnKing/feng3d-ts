module feng3d
{
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

	
	
	/**
	 * 摄像机
	 * @author feng 2014-3-17
	 */
	export class Camera3D extends Entity
	{
		private _viewProjection:Matrix3D = new Matrix3D();
		private _viewProjectionDirty:boolean = true;
		private _lens:LensBase;
		private _frustumPlanes:Plane3D[];
		private _frustumPlanesDirty:boolean = true;

		/**
		 * 创建一个摄像机
		 * @param lens 摄像机镜头
		 */
		constructor(lens:LensBase = null)
		{
			super();
			_namedAsset._assetType = AssetType.CAMERA;
			this._lens = lens || new PerspectiveLens();
			this._lens.addEventListener(LensEvent.MATRIX_CHANGED, this.onLensMatrixChanged);

			//setup default frustum planes
			this._frustumPlanes = new Plane3D[](6, true);

			for (var i:number = 0; i < 6; ++i)
				this._frustumPlanes[i] = new Plane3D();

			this.transform3D.z = -1000;
		}

		/**
		 * 处理镜头变化事件
		 */
		private onLensMatrixChanged(event:LensEvent)
		{
			this._viewProjectionDirty = true;
			this._frustumPlanesDirty = true;

			this.dispatchEvent(event);
		}

		/**
		 * @inheritDoc
		 */
		protected invalidateSceneTransform()
		{
			super.invalidateSceneTransform();

			this._viewProjectionDirty = true;
			this._frustumPlanesDirty = true;
		}

		/**
		 * @inheritDoc
		 */
		protected createEntityPartitionNode():EntityNode
		{
			return new CameraNode(this);
		}

		/**
		 * 镜头
		 */
		public get lens():LensBase
		{
			return _lens;
		}

		public set lens(value:LensBase)
		{
			if (_lens == value)
				return;

			if (!value)
				throw new Error("Lens cannot be null!");

			_lens.removeEventListener(LensEvent.MATRIX_CHANGED, onLensMatrixChanged);

			_lens = value;

			_lens.addEventListener(LensEvent.MATRIX_CHANGED, onLensMatrixChanged);

			dispatchEvent(new CameraEvent(CameraEvent.LENS_CHANGED, this));
		}

		/**
		 * 场景投影矩阵，世界空间转投影空间
		 */
		public get viewProjection():Matrix3D
		{
			if (_viewProjectionDirty)
			{
				//场景空间转摄像机空间
				_viewProjection.copyFrom(inverseSceneTransform);
				//+摄像机空间转投影空间 = 场景空间转投影空间
				_viewProjection.append(_lens.matrix);
				_viewProjectionDirty = false;
			}

			return _viewProjection;
		}

		/**
		 * 视锥体面
		 */
		public get frustumPlanes():Plane3D[]
		{
			if (_frustumPlanesDirty)
				updateFrustum();

			return _frustumPlanes;
		}

		/**
		 * 更新视锥体6个面，平面均朝向视锥体内部
		 * @see http://www.linuxgraphics.cn/graphics/opengl_view_frustum_culling.html
		 */
		private updateFrustum()
		{
			var a:number, b:number, c:number;
			//var d :number;
			var c11:number, c12:number, c13:number, c14:number;
			var c21:number, c22:number, c23:number, c24:number;
			var c31:number, c32:number, c33:number, c34:number;
			var c41:number, c42:number, c43:number, c44:number;
			var p:Plane3D;
			var raw:number[] = Matrix3DUtils.RAW_DATA_CONTAINER;
			//长度倒数
			var invLen:number;
			this.viewProjection.copyRawDataTo(raw);

			c11 = raw[number(0)];
			c12 = raw[number(4)];
			c13 = raw[number(8)];
			c14 = raw[number(12)];
			c21 = raw[number(1)];
			c22 = raw[number(5)];
			c23 = raw[number(9)];
			c24 = raw[number(13)];
			c31 = raw[number(2)];
			c32 = raw[number(6)];
			c33 = raw[number(10)];
			c34 = raw[number(14)];
			c41 = raw[number(3)];
			c42 = raw[number(7)];
			c43 = raw[number(11)];
			c44 = raw[number(15)];

			// left plane
			p = this._frustumPlanes[0];
			a = c41 + c11;
			b = c42 + c12;
			c = c43 + c13;
			invLen = 1 / Math.sqrt(a * a + b * b + c * c);
			p.a = a * invLen;
			p.b = b * invLen;
			p.c = c * invLen;
			p.d = -(c44 + c14) * invLen;

			// right plane
			p = this._frustumPlanes[1];
			a = c41 - c11;
			b = c42 - c12;
			c = c43 - c13;
			invLen = 1 / Math.sqrt(a * a + b * b + c * c);
			p.a = a * invLen;
			p.b = b * invLen;
			p.c = c * invLen;
			p.d = (c14 - c44) * invLen;

			// bottom
			p = this._frustumPlanes[2];
			a = c41 + c21;
			b = c42 + c22;
			c = c43 + c23;
			invLen = 1 / Math.sqrt(a * a + b * b + c * c);
			p.a = a * invLen;
			p.b = b * invLen;
			p.c = c * invLen;
			p.d = -(c44 + c24) * invLen;

			// top
			p = this._frustumPlanes[3];
			a = c41 - c21;
			b = c42 - c22;
			c = c43 - c23;
			invLen = 1 / Math.sqrt(a * a + b * b + c * c);
			p.a = a * invLen;
			p.b = b * invLen;
			p.c = c * invLen;
			p.d = (c24 - c44) * invLen;

			// near
			p = this._frustumPlanes[4];
			a = c31;
			b = c32;
			c = c33;
			invLen = 1 / Math.sqrt(a * a + b * b + c * c);
			p.a = a * invLen;
			p.b = b * invLen;
			p.c = c * invLen;
			p.d = -c34 * invLen;

			// far
			p = this._frustumPlanes[5];
			a = c41 - c31;
			b = c42 - c32;
			c = c43 - c33;
			invLen = 1 / Math.sqrt(a * a + b * b + c * c);
			p.a = a * invLen;
			p.b = b * invLen;
			p.c = c * invLen;
			p.d = (c34 - c44) * invLen;

			this._frustumPlanesDirty = false;
		}

		/**
		 * 屏幕坐标投影到场景坐标
		 * @param nX 屏幕坐标X -1（左） -> 1（右）
		 * @param nY 屏幕坐标Y -1（上） -> 1（下）
		 * @param sZ 到屏幕的距离
		 * @param v 场景坐标（输出）
		 * @return 场景坐标
		 */
		public unproject(nX:number, nY:number, sZ:number, v:Vector3D = null):Vector3D
		{
			return Matrix3DUtils.transformVector(this.sceneTransform, this.lens.unproject(nX, nY, sZ, v), v)
		}

		/**
		 * 场景坐标投影到屏幕坐标
		 * @param point3d 场景坐标
		 * @param v 屏幕坐标（输出）
		 * @return 屏幕坐标
		 */
		public project(point3d:Vector3D, v:Vector3D = null):Vector3D
		{
			return this.lens.project(Matrix3DUtils.transformVector(this.inverseSceneTransform, point3d, v), v);
		}

		/**
		 * @inheritDoc
		 */
		protected getDefaultBoundingVolume():BoundingVolumeBase
		{
			return new NullBounds();
		}
	}
}
