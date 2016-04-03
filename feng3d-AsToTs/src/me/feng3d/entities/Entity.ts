module feng3d
{
	
	

	
	
	
	
	
	
	
	
	
	
	
	
	
	

	

	/**
	 * Entity为所有场景绘制对象提供一个基类，表示存在场景中。可以被entityCollector收集。
	 * @author feng 2014-3-24
	 */
	export class Entity extends Container3D
	{
		private _showBounds:boolean;
		private _partitionNode:EntityNode;
		private _boundsIsShown:boolean = false;

		protected _bounds:BoundingVolumeBase;
		protected _boundsInvalid:boolean = true;

		public _pickingCollisionVO:PickingCollisionVO;
		public _pickingCollider:IPickingCollider;

		private _worldBounds:BoundingVolumeBase;
		private _worldBoundsInvalid:boolean = true;

		/**
		 * 创建一个实体，该类为虚类
		 */
		constructor()
		{
			super();

			this._bounds = this.getDefaultBoundingVolume();
			this._worldBounds = this.getDefaultBoundingVolume();
			AbstractClassError.check(this);
		}

		/**
		 * 是否显示边界
		 */
		public get showBounds():boolean
		{
			return _showBounds;
		}

		public set showBounds(value:boolean)
		{
			if (value == _showBounds)
				return;

			_showBounds = value;

			if (_showBounds)
				addBounds();
			else
				removeBounds();
		}

		/**
		 * 添加边界
		 */
		private addBounds()
		{
			if (!this._boundsIsShown)
			{
				this._boundsIsShown = true;
				this.addChild(this.bounds.boundingRenderable);
			}
		}

		/**
		 * 移除边界
		 */
		private removeBounds()
		{
			if (this._boundsIsShown)
			{
				this._boundsIsShown = false;
				this.removeChild(this._bounds.boundingRenderable);
				this._bounds.disposeRenderable();
			}
		}

		/**
		 * @inheritDoc
		 */
		public get minX():number
		{
			if (_boundsInvalid)
				updateBounds();

			return _bounds.min.x;
		}

		/**
		 * @inheritDoc
		 */
		public get minY():number
		{
			if (_boundsInvalid)
				updateBounds();

			return _bounds.min.y;
		}

		/**
		 * @inheritDoc
		 */
		public get minZ():number
		{
			if (_boundsInvalid)
				updateBounds();

			return _bounds.min.z;
		}

		/**
		 * @inheritDoc
		 */
		public get maxX():number
		{
			if (_boundsInvalid)
				updateBounds();

			return _bounds.max.x;
		}

		/**
		 * @inheritDoc
		 */
		public get maxY():number
		{
			if (_boundsInvalid)
				updateBounds();

			return _bounds.max.y;
		}

		/**
		 * @inheritDoc
		 */
		public get maxZ():number
		{
			if (_boundsInvalid)
				updateBounds();

			return _bounds.max.z;
		}

		/**
		 * 边界
		 */
		public get bounds():BoundingVolumeBase
		{
			if (_boundsInvalid)
				updateBounds();

			return _bounds;
		}

		/**
		 * @inheritDoc
		 */
		protected invalidateSceneTransform()
		{
			super.invalidateSceneTransform();
			this._worldBoundsInvalid = true;
		}

		/**
		 * 边界失效
		 */
		protected invalidateBounds()
		{
			this._boundsInvalid = true;
		}

		/**
		 * 获取默认边界（默认盒子边界）
		 * @return
		 */
		protected getDefaultBoundingVolume():BoundingVolumeBase
		{
			return new AxisAlignedBoundingBox();
		}

		/**
		 * 更新边界
		 */
		protected updateBounds()
		{
			throw new AbstractMethodError();
		}

		/**
		 * 获取碰撞数据
		 */
		public get pickingCollisionVO():PickingCollisionVO
		{
			if (!_pickingCollisionVO)
				_pickingCollisionVO = new PickingCollisionVO(this);

			return _pickingCollisionVO;
		}

		/**
		 * 判断射线是否穿过实体
		 * @param ray3D
		 * @return
		 */
		public isIntersectingRay(ray3D:Ray3D):boolean
		{
			if (!this.pickingCollisionVO.localNormal)
				this.pickingCollisionVO.localNormal = new Vector3D();

			//转换到当前实体坐标系空间
			var localRay:Ray3D = this.pickingCollisionVO.localRay;

			Matrix3DUtils.updateLocalRay(this.inverseSceneTransform, ray3D, localRay);

			//检测射线与边界的碰撞
			var rayEntryDistance:number = this.bounds.rayIntersection(localRay, this.pickingCollisionVO.localNormal);
			if (rayEntryDistance < 0)
				return false;

			//保存碰撞数据
			this.pickingCollisionVO.rayEntryDistance = rayEntryDistance;
			this.pickingCollisionVO.ray3D = ray3D;
			this.pickingCollisionVO.rayOriginIsInsideBounds = rayEntryDistance == 0;

			return true;
		}

		/**
		 * 获取采集的碰撞
		 */
		public get pickingCollider():IPickingCollider
		{
			return _pickingCollider;
		}

		public set pickingCollider(value:IPickingCollider)
		{
			_pickingCollider = value;
		}

		/**
		 * 碰撞前设置碰撞状态
		 * @param shortestCollisionDistance 最短碰撞距离
		 * @param findClosest 是否寻找最优碰撞
		 * @return
		 */
		public collidesBefore(shortestCollisionDistance:number, findClosest:boolean):boolean
		{
			return true;
		}

		/**
		 * @inheritDoc
		 */
		public set implicitPartition(value:Partition3D)
		{
			if (value == _implicitPartition)
				return;

			if (_implicitPartition)
				notifyPartitionUnassigned();

			super.implicitPartition = value;

			notifyPartitionAssigned();
		}

		/**
		 * 通知场景一个新分区已分配
		 */
		private notifyPartitionAssigned()
		{
			if (this._scene)
				this._scene.registerPartition(this);
		}

		/**
		 * 通知场景一个分区取消分配
		 */
		private notifyPartitionUnassigned()
		{
			if (this._scene)
				this._scene.unregisterPartition(this);
		}

		/**
		 * @inheritDoc
		 */
		public set scene(value:Scene3D)
		{
			if (value == _scene)
				return;

			if (_scene)
				_scene.unregisterEntity(this);

			if (value)
				value.registerEntity(this);

			super.scene = value;
		}

		/**
		 * 获取实体分区节点
		 */
		public getEntityPartitionNode():EntityNode
		{
			return this._partitionNode ||= this.createEntityPartitionNode();
		}

		/**
		 * 创建实体分区节点，该函数为虚函数，需要子类重写。
		 */
		protected createEntityPartitionNode():EntityNode
		{
			throw new AbstractMethodError();
		}


		/**
		 * 内部更新
		 */
		public internalUpdate()
		{
			if (this._controller)
				this._controller.update();
		}

		/**
		 * 世界边界
		 */
		public get worldBounds():BoundingVolumeBase
		{
			if (_worldBoundsInvalid)
				updateWorldBounds();

			return _worldBounds;
		}

		/**
		 * 更新世界边界
		 */
		private updateWorldBounds()
		{
			this._worldBounds.transformFrom(this.bounds, this.sceneTransform);
			this._worldBoundsInvalid = false;
		}

		/**
		 * The transformation matrix that transforms from model to world space, adapted with any special operations needed to render.
		 * For example, assuring certain alignedness which is not inherent in the scene transform. By default, this would
		 * return the scene transform.
		 */
		public getRenderSceneTransform(camera:Camera3D):Matrix3D
		{
			return this.sceneTransform;
		}
	}
}
