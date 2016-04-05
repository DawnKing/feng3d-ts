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
		constructor(subMesh:SegmentSet)
		{
			super();

			this.segmentSet = subMesh;
//			this._context3dCache.addChildBufferOwner(subMesh.context3DBufferOwner);
		}

		/**
		 * @inheritDoc
		 */
		public get mouseEnabled():boolean
		{
			return this.segmentSet.mouseEnabled;
		}

		/**
		 * @inheritDoc
		 */
		public get numTriangles():number
		{
			return this.segmentSet.numTriangles;
		}

		/**
		 * @inheritDoc
		 */
		public get sourceEntity():Entity
		{
			return this.segmentSet.sourceEntity;
		}

		/**
		 * @inheritDoc
		 */
		public get material():MaterialBase
		{
			return this.segmentSet.material;
		}

		/**
		 * @inheritDoc
		 */
		public get animator():AnimatorBase
		{
			return this.segmentSet.animator;
		}

		/**
		 * @inheritDoc
		 */
		public get castsShadows():boolean
		{
			return this.segmentSet.castsShadows;
		}
	}
}

