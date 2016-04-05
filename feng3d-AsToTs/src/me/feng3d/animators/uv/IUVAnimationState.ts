module feng3d
{
	

	/**
	 * UV动画状态接口
	 * @author feng 2015-9-18
	 */
	export interface IUVAnimationState extends IAnimationState
	{
		/**
		 * 当前UV帧编号
		 */
		get currentUVFrame():UVAnimationFrame;

		/**
		 * UV下帧编号
		 */
		get nextUVFrame():UVAnimationFrame;

		/**
		 * 混合权重
		 */
		get blendWeight():number;
	}
}
