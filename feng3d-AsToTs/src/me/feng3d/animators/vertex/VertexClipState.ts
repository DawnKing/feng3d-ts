module feng3d
{
	
	
	

	/**
	 * 顶点动画剪辑状态
	 * @author feng 2015-9-18
	 */
	export class VertexClipState extends AnimationClipState implements IVertexAnimationState
	{
		private _frames:Geometry[];
		private _vertexClipNode:VertexClipNode;
		private _currentGeometry:Geometry;
		private _nextGeometry:Geometry;

		/**
		 * @inheritDoc
		 */
		public get currentGeometry():Geometry
		{
			if (_framesDirty)
				updateFrames();

			return _currentGeometry;
		}

		/**
		 * @inheritDoc
		 */
		public get nextGeometry():Geometry
		{
			if (_framesDirty)
				updateFrames();

			return _nextGeometry;
		}

		/**
		 * 创建VertexClipState实例
		 * @param animator				动画
		 * @param vertexClipNode		顶点动画节点
		 */
		function VertexClipState(animator:AnimatorBase, vertexClipNode:VertexClipNode)
		{
			super(animator, vertexClipNode);

			_vertexClipNode = vertexClipNode;
			_frames = _vertexClipNode.frames;
		}

		/**
		 * @inheritDoc
		 */
		protected updateFrames()
		{
			super.updateFrames();

			this._currentGeometry = this._frames[_currentFrame];

			if (this._vertexClipNode.looping && _nextFrame >= this._vertexClipNode.lastFrame)
			{
				this._nextGeometry = this._frames[0];
				VertexAnimator(_animator).dispatchCycleEvent();
			}
			else
				this._nextGeometry = this._frames[_nextFrame];
		}
	}
}
