module feng3d
{

	

	/**
	 * 线段渲染数据缓存
	 * @author feng 2014-5-9
	 */
	export class SegmentSubGeometry extends SubGeometry
	{
		public SegmentSubGeometry()
		{
			super();
		}

		protected initBuffers()
		{
			super.initBuffers();

			this.mapVABuffer(this._.segmentStart_va_3, 3);
			this.mapVABuffer(this._.segmentEnd_va_3, 3);
			this.mapVABuffer(this._.segmentThickness_va_1, 1);
			this.mapVABuffer(this._.segmentColor_va_4, 4);
		}

		public get vertexPositionData():Number[]
		{
			return pointData0;
		}

		public get pointData0():Number[]
		{
			var data:Number[] = getVAData(_.segmentStart_va_3);
			return data;
		}

		public get pointData1():Number[]
		{
			var data:Number[] = getVAData(_.segmentEnd_va_3);
			return data;
		}

		public get thicknessData():Number[]
		{
			var data:Number[] = getVAData(_.segmentThickness_va_1);
			return data;
		}

		public get colorData():Number[]
		{
			var data:Number[] = getVAData(_.segmentColor_va_4);
			return data;
		}

		public get pointData0Stride():number
		{
			return 3;
		}

		public get pointData1Stride():number
		{
			return 3;
		}

		public get thicknessDataStride():number
		{
			return 1;
		}

		public get colorDataStride():number
		{
			return 4;
		}

		public updatePointData0(value:Number[])
		{
			this.setVAData(this._.segmentStart_va_3, value);
		}

		public updatePointData1(value:Number[])
		{
			this.setVAData(this._.segmentEnd_va_3, value);
		}

		public updateThicknessData(value:Number[])
		{
			this.setVAData(this._.segmentThickness_va_1, value);
		}

		public updateColorData(value:Number[])
		{
			this.setVAData(this._.segmentColor_va_4, value);
		}

	}
}
