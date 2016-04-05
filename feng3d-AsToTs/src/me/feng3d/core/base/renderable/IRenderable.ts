module feng3d
{

	
	
	

	/**
	 * IRenderable为对象提供一个表示可以被渲染的接口
	 * @author feng 2014-4-9
	 */
	export interface IRenderable extends IMaterialOwner
	{
		/**
		 * 是否可响应鼠标事件
		 */
		get mouseEnabled():boolean;

		/**
		 * 三角形数量
		 */
		get numTriangles():number;

		/**
		 * 渲染缓存
		 */
		get context3dCache():Context3DCache;

		/**
		 * 渲染实体
		 */
		get sourceEntity():Entity;

		/**
		 * 渲染对象是投射阴影
		 */
		get castsShadows():boolean;
	}
}
