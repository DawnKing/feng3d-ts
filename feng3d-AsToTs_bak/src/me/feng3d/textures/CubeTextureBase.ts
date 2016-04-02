module feng3d
{
	

	/**
	 * 立方体纹理代理基类
	 * @author feng 2014-7-12
	 */
	export class CubeTextureBase extends TextureProxyBase
	{
		/**
		 * 创建一个立方体纹理代理基类
		 */
		public CubeTextureBase()
		{
			super();
			this.type = TextureType.TYPE_CUBE;
		}

		/**
		 * 获取纹理尺寸
		 */
		public get size():number
		{
			return _width;
		}
	}
}
