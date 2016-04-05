module feng3d
{
	
	
	
	
	

	

	/**
	 * 可渲染对象基类
	 * @author feng 2015-5-27
	 */
	export class MeshRenderable extends Renderable
	{
		public subMesh:SubMesh;

		/**
		 * 创建一个可渲染对象基类
		 */
		constructor(subMesh:SubMesh)
		{
			super();

			this.subMesh = subMesh;
			this._context3dCache.addChildBufferOwner(subMesh.context3DBufferOwner);
		}

		/**
		 * @inheritDoc
		 */
		public get mouseEnabled():boolean
		{
			return this.subMesh.mouseEnabled;
		}

		/**
		 * @inheritDoc
		 */
		public get numTriangles():number
		{
			return this.subMesh.numTriangles;
		}

		/**
		 * @inheritDoc
		 */
		public get sourceEntity():Entity
		{
			return this.subMesh.sourceEntity;
		}

		/**
		 * @inheritDoc
		 */
		public get material():MaterialBase
		{
			return this.subMesh.material;
		}

		/**
		 * @inheritDoc
		 */
		public get animator():AnimatorBase
		{
			return this.subMesh.animator;
		}

		/**
		 * @inheritDoc
		 */
		public get castsShadows():boolean
		{
			return this.subMesh.castsShadows;
		}
	}
}
