module feng3d
{
	
	
	

	/**
	 * 骨骼动画状态接口
	 * @author feng 2015-9-18
	 */
	public interface ISkeletonAnimationState extends IAnimationState
	{
		/**
		 * 获取骨骼姿势
		 * @param skeleton		骨骼
		 */
		function getSkeletonPose(skeleton:Skeleton):SkeletonPose;
	}
}
