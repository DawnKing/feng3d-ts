module feng3d
{
	

	/**
	 * 动画类型
	 * @author feng 2015-1-27
	 */
	export class AnimationType extends Enum
	{
		/** 没有动画 */
		public static NONE:AnimationType = new AnimationType();

		/** 顶点动画由GPU计算 */
		public static VERTEX_CPU:AnimationType = new AnimationType();

		/** 顶点动画由GPU计算 */
		public static VERTEX_GPU:AnimationType = new AnimationType();

		/** 骨骼动画由GPU计算 */
		public static SKELETON_CPU:AnimationType = new AnimationType();

		/** 骨骼动画由GPU计算 */
		public static SKELETON_GPU:AnimationType = new AnimationType();

		/** 粒子特效 */
		public static PARTICLE:AnimationType = new AnimationType();
	}
}
