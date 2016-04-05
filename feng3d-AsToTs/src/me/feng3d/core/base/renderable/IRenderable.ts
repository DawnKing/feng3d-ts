module feng3d {

	/**
	 * IRenderable为对象提供一个表示可以被渲染的接口
	 * @author feng 2014-4-9
	 */
    export interface IRenderable extends IMaterialOwner {
		/**
		 * 是否可响应鼠标事件
		 */
        getMouseEnabled(): boolean;

        /**
         * 三角形数量
         */
        getNumTriangles(): number;

        /**
         * 渲染缓存
         */
        getContext3dCache(): Context3DCache;

        /**
         * 渲染实体
         */
        getSourceEntity(): Entity;

        /**
         * 渲染对象是投射阴影
         */
        getCastsShadows(): boolean;
    }
}
