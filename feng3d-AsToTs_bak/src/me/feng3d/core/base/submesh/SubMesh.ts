module feng3d
{
	
	
	
	
	
	
	
	
	
	
	
	
	

	

	/**
	 * 子网格，可渲染对象
	 */
	export class SubMesh extends Component
	{
		public renderableBase:MeshRenderable;

		public context3DBufferOwner:Context3DBufferOwner;

		protected _parentMesh:Mesh;
		protected _subGeometry:SubGeometry;
		public _index:number;

		protected _materialSelf:MaterialBase;
		private _material:MaterialBase;
		private _materialDirty:boolean;

		private _animator:AnimatorBase;

		private _animationSubGeometry:AnimationSubGeometry;

		/**
		 * 创建一个子网格
		 * @param subGeometry 子几何体
		 * @param parentMesh 父网格
		 * @param material 材质
		 */
		public SubMesh(subGeometry:SubGeometry, parentMesh:Mesh, material:MaterialBase = null)
		{
			this.context3DBufferOwner = new Context3DBufferOwner();
			this.renderableBase = new MeshRenderable(this);

			this._parentMesh = parentMesh;
			this.subGeometry = subGeometry;
			this.material = material;

			this._parentMesh.addEventListener(MeshEvent.MATERIAL_CHANGE, this.onMaterialChange);
		}

		/**
		 * 渲染材质
		 */
		public get material():MaterialBase
		{
			if (_materialDirty)
				updateMaterial();
			return _material;
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
			_materialSelf = value;
			_materialDirty = true;
		}

		/**
		 * 更新材质
		 */
		private updateMaterial()
		{
			var value:MaterialBase = this._materialSelf ? this._materialSelf : this._parentMesh.material;
			if (value == this._material)
				return;

			if (this._material)
			{
				this._material.removeOwner(this.renderableBase);
			}
			this._material = value;
			if (this._material)
			{
				this._material.addOwner(this.renderableBase);
			}
		}

		/**
		 * 所属实体
		 */
		public get sourceEntity():Entity
		{
			return _parentMesh;
		}

		/**
		 * 子网格
		 */
		public get subGeometry():SubGeometry
		{
			return _subGeometry;
		}

		public set subGeometry(value:SubGeometry)
		{
			if (_subGeometry)
			{
				context3DBufferOwner.removeChildBufferOwner(_subGeometry.context3DBufferOwner);
			}
			_subGeometry = value;
			if (_subGeometry)
			{
				context3DBufferOwner.addChildBufferOwner(_subGeometry.context3DBufferOwner);
			}
		}

		/**
		 * 动画顶点数据(例如粒子特效的时间、位置偏移、速度等等)
		 */
		public get animationSubGeometry():AnimationSubGeometry
		{
			return _animationSubGeometry;
		}

		public set animationSubGeometry(value:AnimationSubGeometry)
		{
			if (_animationSubGeometry)
			{
				context3DBufferOwner.removeChildBufferOwner(_animationSubGeometry.context3DBufferOwner);
			}
			_animationSubGeometry = value;
			if (_animationSubGeometry)
			{
				context3DBufferOwner.addChildBufferOwner(_animationSubGeometry.context3DBufferOwner);
			}
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
			{
				context3DBufferOwner.removeChildBufferOwner(_animator.context3DBufferOwner);
				material.animationSet = null;
			}
			_animator = value;
			if (_animator)
			{
				context3DBufferOwner.addChildBufferOwner(_animator.context3DBufferOwner);
				material.animationSet = _animator.animationSet;
			}
		}

		/**
		 * 父网格
		 */
		public get parentMesh():Mesh
		{
			return _parentMesh;
		}

		public get castsShadows():boolean
		{
			return _parentMesh.castsShadows;
		}

		/**
		 * @inheritDoc
		 */
		public get mouseEnabled():boolean
		{
			return _parentMesh.mouseEnabled || _parentMesh.ancestorsAllowMouseEnabled;
		}

		/**
		 * @inheritDoc
		 */
		public get numTriangles():number
		{
			return _subGeometry.numTriangles;
		}

		/**
		 * 处理材质变化事件
		 */
		private onMaterialChange(event:Event)
		{
			this._materialDirty = true;
		}

		/**
		 * 销毁
		 */
		public dispose()
		{
			this.material = null;
		}
	}
}
