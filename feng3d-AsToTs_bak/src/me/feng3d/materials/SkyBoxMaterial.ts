module feng3d
{
	
	
	

	

	/**
	 * 天空盒材质
	 * @author feng 2014-7-11
	 */
	export class SkyBoxMaterial extends MaterialBase
	{
		private _cubeMap:CubeTextureBase;
		private _skyboxPass:SkyBoxPass;

		/**
		 * 创建天空盒材质实例
		 * @param cubeMap			立方体映射纹理
		 */
		public SkyBoxMaterial(cubeMap:CubeTextureBase)
		{
			this._cubeMap = cubeMap;
			addPass(this._skyboxPass = new SkyBoxPass());
			this._skyboxPass.cubeTexture = this._cubeMap;
		}

		/**
		 * 立方体映射纹理
		 */
		public get cubeMap():CubeTextureBase
		{
			return _cubeMap;
		}

		public set cubeMap(value:CubeTextureBase)
		{
			if (value && _cubeMap && (value.hasMipMaps != _cubeMap.hasMipMaps || value.format != _cubeMap.format))
				invalidatePasses(null);

			_cubeMap = value;

			_skyboxPass.cubeTexture = _cubeMap;
		}
	}
}
