module feng3d
{
	
	
	

	/**
	 * 淡入淡出变换状态
	 * @author feng 2015-9-18
	 */
	export class CrossfadeTransitionState extends SkeletonBinaryLERPState
	{
		private _skeletonAnimationNode:CrossfadeTransitionNode;
		private _animationStateTransitionComplete:AnimationStateEvent;

		/**
		 * 创建淡入淡出变换状态实例
		 * @param animator						动画
		 * @param skeletonAnimationNode			骨骼动画节点
		 */
		constructor(animator:AnimatorBase, skeletonAnimationNode:CrossfadeTransitionNode)
		{
			super(animator, skeletonAnimationNode);

			_skeletonAnimationNode = skeletonAnimationNode;
		}

		/**
		 * @inheritDoc
		 */
		protected updateTime(time:number)
		{
			this.blendWeight = Math.abs(time - this._skeletonAnimationNode.startBlend) / (1000 * this._skeletonAnimationNode.blendSpeed);

			if (this.blendWeight >= 1)
			{
				this.blendWeight = 1;
				this._skeletonAnimationNode.dispatchEvent(this._animationStateTransitionComplete ||= new AnimationStateEvent(AnimationStateEvent.TRANSITION_COMPLETE, this._animator, this, this._skeletonAnimationNode));
			}

			super.updateTime(time);
		}
	}
}
