module feng3dSheet
{
	

	/**
	 * sprite动画状态接口
	 * @author feng 2015-9-18
	 */
	export interface ISpriteSheetAnimationState extends IAnimationState
	{
		/**
		 * 当前帧数据
		 */
		get currentFrameData():SpriteSheetAnimationFrame;

		/**
		 * 当前帧数
		 */
		get currentFrameNumber():number;
	}
}
