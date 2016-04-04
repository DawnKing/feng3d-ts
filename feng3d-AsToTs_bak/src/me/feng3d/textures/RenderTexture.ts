module feng3d
{

	/**
	 * 渲染纹理
	 * @author feng 2015-5-28
	 */
	export class RenderTexture extends Texture2DBase
	{
		/**
		 * 创建一个渲染纹理
		 * @param width			纹理宽度
		 * @param height		纹理高度
		 */
		public RenderTexture(width:number, height:number)
		{
			super();
			setSize(width, height);
		}
	}
}