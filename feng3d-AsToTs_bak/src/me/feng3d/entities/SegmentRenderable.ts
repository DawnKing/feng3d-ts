module feng3d
{
	
	
	

	/**
	 *
	 * @author feng 2015-12-30
	 */
	export class SegmentRenderable extends Renderable
	{
		private segmentSet:SegmentSet;

		/**
		 * 创建一个可渲染对象基类
		 */
		public SegmentRenderable(subMesh:SegmentSet)
		{
			super();

			this.segmentSet = subMesh;
//			_context3dCache.addChildBufferOwner(subMesh.context3DBufferOwner);
		}

		/**
		 * @inheritDoc
		 */
		public get mouseEnabled():boolean
		{
			return segmentSet.mouseEnabled;
		}

		/**
		 * @inheritDoc
		 */
		public get numTriangles():number
		{
			return segmentSet.numTriangles;
		}

		/**
		 * @inheritDoc
		 */
		public get sourceEntity():Entity
		{
			return segmentSet.sourceEntity;
		}

		/**
		 * @inheritDoc
		 */
		public get material():MaterialBase
		{
			return segmentSet.material;
		}

		/**
		 * @inheritDoc
		 */
		public get animator():AnimatorBase
		{
			return segmentSet.animator;
		}

		/**
		 * @inheritDoc
		 */
		public get castsShadows():boolean
		{
			return segmentSet.castsShadows;
		}
	}
}

