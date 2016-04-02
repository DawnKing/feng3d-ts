module feng3d
{
	

	
	
	
	
	
	

	/**
	 * 方向灯光
	 * @author feng 2014-9-11
	 */
	export class DirectionalLight extends LightBase
	{
		private _direction:Vector3D;
		private _tmpLookAt:Vector3D;
		private _sceneDirection:Vector3D;

		/**
		 * 创建一个方向灯光
		 * @param xDir		方向X值
		 * @param yDir		方向Y值
		 * @param zDir		方向Z值
		 */
		public DirectionalLight(xDir:number = 0, yDir:number = -1, zDir:number = 1)
		{
			super();

			direction = new Vector3D(xDir, yDir, zDir);
			_sceneDirection = new Vector3D();
		}

		/**
		 * 灯光方向
		 */
		public get direction():Vector3D
		{
			return _direction;
		}

		public set direction(value:Vector3D)
		{
			_direction = value;
			//lookAt(new Vector3D(x + _direction.x, y + _direction.y, z + _direction.z));
			if (!_tmpLookAt)
				_tmpLookAt = new Vector3D();
			_tmpLookAt.x = transform3D.x + _direction.x;
			_tmpLookAt.y = transform3D.y + _direction.y;
			_tmpLookAt.z = transform3D.z + _direction.z;

			transform3D.lookAt(_tmpLookAt);
		}

		/**
		 * 灯光场景方向
		 */
		public get sceneDirection():Vector3D
		{
			if (_sceneTransformDirty)
				updateSceneTransform();
			return _sceneDirection;
		}

		/**
		 * @inheritDoc
		 */
		protected updateSceneTransform()
		{
			super.updateSceneTransform();
			this.sceneTransform.copyColumnTo(2, this._sceneDirection);
			this._sceneDirection.normalize();
		}

		/**
		 * @inheritDoc
		 */
		protected createEntityPartitionNode():EntityNode
		{
			return new DirectionalLightNode(this);
		}

		/**
		 * @inheritDoc
		 */
		protected getDefaultBoundingVolume():BoundingVolumeBase
		{
			// 方向光源并没有坐标，因此永远在3D场景中
			return new NullBounds();
		}

		/**
		 * @inheritDoc
		 */
		protected updateBounds()
		{
		}

		protected createShadowMapper():ShadowMapperBase
		{
			return new DirectionalShadowMapper();
		}
	}
}
