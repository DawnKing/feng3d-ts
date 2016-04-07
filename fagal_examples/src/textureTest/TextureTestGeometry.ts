module feng3dTest
{
	

	/**
	 *
	 * @author feng 2015-5-14
	 */
	export class TextureTestGeometry extends BaseGeometry
	{
		constructor()
		{
			super();
		}

		public get vertexUVData():number[]
		{
			return this.getVAData(this._.uv_va_2);
		}

		public set vertexUVData(value:number[])
		{
			this.setVAData(this._.uv_va_2, value);
		}

		protected initBuffers()
		{
			this.mapVABuffer(this._.uv_va_2, 2);
			super.initBuffers();
		}
	}
}
