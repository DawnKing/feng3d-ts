module feng3dSheet
{
	

	/**
	 * sprite动画状态接口
	 * @author feng 2015-9-18
	 */
	public interface ISpriteSheetAnimationState extends IAnimationState
	{
		/**
		 * 当前帧数据
		 */
		function get currentFrameData():SpriteSheetAnimationFrame;

		/**
		 * 当前帧数
		 */
		function get currentFrameNumber():number;
	}
}
