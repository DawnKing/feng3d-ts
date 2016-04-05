module feng3d {

	/**
	 * 材质拥有者
	 * IMaterialOwner为一个对象提供能够使用材质的接口
	 * IMaterialOwner provides an interface for objects that can use materials.
	 */
    export interface IMaterialOwner {
		/**
		 * 渲染材质
		 */
        getMaterial(): MaterialBase;

		/**
		 * 动画
		 */
        getAnimator(): AnimatorBase;
    }
}
