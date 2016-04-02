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
		public MeshRenderable(subMesh:SubMesh)
		{
			super();

			this.subMesh = subMesh;
			_context3dCache.addChildBufferOwner(subMesh.context3DBufferOwner);
		}

		/**
		 * @inheritDoc
		 */
		public get mouseEnabled():boolean
		{
			return subMesh.mouseEnabled;
		}

		/**
		 * @inheritDoc
		 */
		public get numTriangles():number
		{
			return subMesh.numTriangles;
		}

		/**
		 * @inheritDoc
		 */
		public get sourceEntity():Entity
		{
			return subMesh.sourceEntity;
		}

		/**
		 * @inheritDoc
		 */
		public get material():MaterialBase
		{
			return subMesh.material;
		}

		/**
		 * @inheritDoc
		 */
		public get animator():AnimatorBase
		{
			return subMesh.animator;
		}

		/**
		 * @inheritDoc
		 */
		public get castsShadows():boolean
		{
			return subMesh.castsShadows;
		}
	}
}
