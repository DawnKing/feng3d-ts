module feng3d
{
	

	/**
	 * UV动画状态接口
	 * @author feng 2015-9-18
	 */
	public interface IUVAnimationState extends IAnimationState
	{
		/**
		 * 当前UV帧编号
		 */
		function get currentUVFrame():UVAnimationFrame;

		/**
		 * UV下帧编号
		 */
		function get nextUVFrame():UVAnimationFrame;

		/**
		 * 混合权重
		 */
		function get blendWeight():number;
	}
}
