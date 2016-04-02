module feng3d
{
	
	
	
	
	
	
	
	
	
	
	
	
	
	

	
	

	/**
	 * 材质发生变化时抛出
	 */
	[Event(name = "materialChange", type = "me.feng3d.events.MeshEvent")]

	/**
	 * 网格
	 * @author feng 2014-4-9
	 */
	export class Mesh extends Entity implements IMaterialOwner
	{
		protected _subMeshes:SubMesh[];

		protected _geometry:Geometry;

		protected _materialSelf:MaterialBase;

		protected _animator:AnimatorBase;

		private _castsShadows:boolean = true;

		/**
		 * 新建网格
		 * @param geometry 几何体
		 * @param material 材质
		 */
		public Mesh(geometry:Geometry = null, material:MaterialBase = null)
		{
			super();
			_namedAsset._assetType = AssetType.MESH;
			this._subMeshes = new SubMesh[]();

			this.geometry = geometry || new Geometry();

			this.material = material || DefaultMaterialManager.getDefaultMaterial();
		}

		/** 几何形状 */
		public get geometry():Geometry
		{
			return _geometry;
		}

		public set geometry(value:Geometry)
		{
			var i:number;

			if (_geometry)
			{
				_geometry.removeEventListener(GeometryEvent.SHAPE_CHANGE, onGeometryBoundsInvalid);
				_geometry.removeEventListener(GeometryEvent.SUB_GEOMETRY_ADDED, onSubGeometryAdded);
				_geometry.removeEventListener(GeometryEvent.SUB_GEOMETRY_REMOVED, onSubGeometryRemoved);

				for (i = 0; i < _subMeshes.length; ++i)
					_subMeshes[i].dispose();
				_subMeshes.length = 0;
			}

			_geometry = value;

			if (_geometry)
			{
				_geometry.addEventListener(GeometryEvent.SHAPE_CHANGE, onGeometryBoundsInvalid);
				_geometry.addEventListener(GeometryEvent.SUB_GEOMETRY_ADDED, onSubGeometryAdded);
				_geometry.addEventListener(GeometryEvent.SUB_GEOMETRY_REMOVED, onSubGeometryRemoved);

				var subGeoms:SubGeometry[] = _geometry.subGeometries;

				for (i = 0; i < subGeoms.length; ++i)
					addSubMesh(subGeoms[i]);
			}

			invalidateBounds();
		}

		/**
		 * 渲染材质
		 */
		public get material():MaterialBase
		{
			return _materialSelf;
		}

		/**
		 * 自身材质
		 */
		public get materialSelf():MaterialBase
		{
			return _materialSelf;
		}

		public set material(value:MaterialBase)
		{
			if (value == _materialSelf)
				return;
			if (_materialSelf)
				_materialSelf.removeOwner(this);
			_materialSelf = value;
			if (_materialSelf)
				_materialSelf.addOwner(this);

			dispatchEvent(new MeshEvent(MeshEvent.MATERIAL_CHANGE));
		}

		/**
		 * 源实体
		 */
		public get sourceEntity():Entity
		{
			return this;
		}

		/**
		 * @inheritDoc
		 */
		protected updateBounds()
		{
			_bounds.fromGeometry(this.geometry);
			_boundsInvalid = false;
		}

		/**
		 * @inheritDoc
		 */
		public collidesBefore(shortestCollisionDistance:number, findClosest:boolean):boolean
		{
			this._pickingCollider.setLocalRay(this._pickingCollisionVO.localRay);
			this._pickingCollisionVO.renderable = null;

			var len:number = this._subMeshes.length;
			for (var i:number = 0; i < len; ++i)
			{
				var subMesh:SubMesh = this._subMeshes[i];
				//var ignoreFacesLookingAway:boolean = _material ? !_material.bothSides : true;
				if (this._pickingCollider.testSubMeshCollision(subMesh, this._pickingCollisionVO, shortestCollisionDistance))
				{
					shortestCollisionDistance = this._pickingCollisionVO.rayEntryDistance;
					this._pickingCollisionVO.renderable = subMesh.renderableBase;
					if (!findClosest)
						return true;
				}
			}

			return this._pickingCollisionVO.renderable != null;
		}

		/**
		 * @inheritDoc
		 */
		public get animator():AnimatorBase
		{
			return _animator;
		}

		public set animator(value:AnimatorBase)
		{
			if (_animator)
				_animator.removeOwner(this);

			_animator = value;

			var i:number;

			for (i = 0; i < subMeshes.length; i++)
			{
				var subMesh:SubMesh = subMeshes[i];
				subMesh.animator = _animator;
			}

			if (_animator)
				_animator.addOwner(this);
		}

		/**
		 * 子网格列表
		 */
		public get subMeshes():SubMesh[]
		{
			return _subMeshes;
		}

		/**
		 * 添加子网格包装子几何体
		 * @param subGeometry		被添加的子几何体
		 */
		protected addSubMesh(subGeometry:SubGeometry)
		{
			var subMesh:SubMesh = new SubMesh(subGeometry, this, null);
			var len:number = this._subMeshes.length;
			subMesh._index = len;
			this._subMeshes[len] = subMesh;
			invalidateBounds();
		}

		/**
		 * 处理几何体边界变化事件
		 */
		private onGeometryBoundsInvalid(event:GeometryEvent)
		{
			invalidateBounds();
		}

		/**
		 * 处理子几何体添加事件
		 */
		private onSubGeometryAdded(event:GeometryEvent)
		{
			this.addSubMesh(event.subGeometry);
			invalidateBounds();
		}

		/**
		 * 处理子几何体移除事件
		 */
		private onSubGeometryRemoved(event:GeometryEvent)
		{
			var subMesh:SubMesh;
			var subGeom:SubGeometry = event.subGeometry;
			var len:number = this._subMeshes.length;
			var i:number;

			for (i = 0; i < len; ++i)
			{
				subMesh = this._subMeshes[i];
				if (subMesh.subGeometry == subGeom)
				{
					subMesh.dispose();
					this._subMeshes.splice(i, 1);
					break;
				}
			}

			--len;
			for (; i < len; ++i)
				this._subMeshes[i]._index = i;

			invalidateBounds();
		}

		/**
		 * 是否捕获阴影
		 */
		public get castsShadows():boolean
		{
			return _castsShadows;
		}

		public set castsShadows(value:boolean)
		{
			_castsShadows = value;
		}

		/**
		 * @inheritDoc
		 */
		protected createEntityPartitionNode():EntityNode
		{
			return new MeshNode(this);
		}
	}
}
