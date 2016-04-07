module feng3dMap
{
	

	_colorMap;
	_colorMap;

	
	
	
	

	/**
	 * 颜色映射材质
	 * @author feng 2015-5-14
	 */
	export class ColorMapMaterial extends BaseMaterial
	{
		/**
		 * 通用数据
		 */
		protected commonsData:number[] = new number[](4);

		/**
		 * 创建一个颜色映射材质
		 */
		constructor()
		{
			super();
		}

		/**
		 * @inheritDoc
		 */
		protected initBuffers()
		{
			this.mapContext3DBuffer(this._.commonsData_vc_vector, this.updateCommonsDataBuffer);
			super.initBuffers();
		}

		/**
		 * 更新通用数据
		 */
		protected updateCommonsDataBuffer(vcVectorBuffer:VCVectorBuffer)
		{
			this.commonsData[0] = 2;
			this.commonsData[1] = 1;
			this.commonsData[2] = 0;
			this.commonsData[3] = 0;
			vcVectorBuffer.update(this.commonsData);
		}

		/**
		 * @inheritDoc
		 */
		protected updateProgramBuffer(programBuffer:ProgramBuffer)
		{
			var result:FagalShaderResult = FagalRE.runShader(V_colorMap, F_colorMap);

			//上传程序
			programBuffer.update(result.vertexCode, result.fragmentCode);
		}
	}
}
