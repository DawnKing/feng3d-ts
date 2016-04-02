module feng3d
{

	
	
	

	/**
	 * IRenderable为对象提供一个表示可以被渲染的接口
	 * @author feng 2014-4-9
	 */
	public interface IRenderable extends IMaterialOwner
	{
		/**
		 * 是否可响应鼠标事件
		 */
		function get mouseEnabled():boolean;

		/**
		 * 三角形数量
		 */
		function get numTriangles():number;

		/**
		 * 渲染缓存
		 */
		function get context3dCache():Context3DCache;

		/**
		 * 渲染实体
		 */
		function get sourceEntity():Entity;

		/**
		 * 渲染对象是投射阴影
		 */
		function get castsShadows():boolean;
	}
}
