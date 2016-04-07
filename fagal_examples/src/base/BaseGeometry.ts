module feng3d
{
	
	

	/**
	 *
	 * @author feng 2014-10-27
	 */
	export class BaseGeometry extends VertexBufferOwner
	{
		protected _indices:number[];

		protected numIndices:number;

		constructor()
		{
			super();
			this.initBuffers();
		}

		protected initBuffers()
		{
			this.context3DBufferOwner.mapContext3DBuffer(this._.index, this.updateIndexBuffer);

			this.mapVABuffer(this._.position_va_3, 3);
			this.mapVABuffer(this._.color_va_3, 3);
		}

		protected updateIndexBuffer(indexBuffer:IndexBuffer)
		{
			indexBuffer.update(this._indices, this.numIndices, this.numIndices);
		}

		public setGeometry(positionData:number[], colorData:number[], indexData:number[])
		{
			this.numVertices = positionData.length / 3;

			this.setVAData(this._.position_va_3, positionData);
			this.setVAData(this._.color_va_3, colorData);

			this._indices = indexData;

			this.numIndices = this._indices.length;
		}
	}
}
