module feng3d
{	

	/**
	 * 颜色地形材质
	 * @author feng 2015-5-14
	 */
	export class ColorTerrainMaterial extends BaseMaterial
	{
		private _splats;

		constructor(splats)
		{
			super();
			this._splats = splats;
		}

		protected initBuffers()
		{
			this.mapContext3DBuffer(this._.terrainTextures_fs_array, this.updateTerrainTextureBuffer);
			super.initBuffers();
		}

		private updateTerrainTextureBuffer(terrainTextureBufferArr:FSArrayBuffer)
		{
			terrainTextureBufferArr.update(this._splats);
		}

		protected updateProgramBuffer(programBuffer:ProgramBuffer)
		{
			var result:FagalShaderResult = FagalRE.runShader(V_colorTerrain, F_colorTerrain);

			//上传程序
			programBuffer.update(result.vertexCode, result.fragmentCode);
		}
	}
}
