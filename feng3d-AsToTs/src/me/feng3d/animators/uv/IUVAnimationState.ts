module feng3d {


	/**
	 * UV动画状态接口
	 * @author feng 2015-9-18
	 */
    export interface IUVAnimationState extends IAnimationState {
		/**
		 * 当前UV帧编号
		 */
        getCurrentUVFrame(): UVAnimationFrame;

		/**
		 * UV下帧编号
		 */
        getNextUVFrame(): UVAnimationFrame;

		/**
		 * 混合权重
		 */
        getBlendWeight(): number;
    }
}
