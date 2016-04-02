module feng3d
{
	

	/**
	 * 动画状态接口
	 * @author feng 2015-9-18
	 */
	public interface IAnimationState
	{
		/**
		 * 位置偏移
		 */
		function get positionDelta():Vector3D;

		/**
		 * 设置一个新的开始时间
		 * @param startTime		开始时间
		 */
		function offset(startTime:number);

		/**
		 * 更新
		 * @param time		当前时间
		 */
		function update(time:number);

		/**
		 * 设置动画的播放进度(0,1)
		 * @param	播放进度。 0：动画起点，1：动画终点。
		 */
		function phase(value:number);
	}
}
