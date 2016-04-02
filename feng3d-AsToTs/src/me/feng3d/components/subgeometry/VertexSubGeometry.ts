module feng3d
{
	

	/**
	 * 顶点动画 子网格
	 * @author feng 2014-8-28
	 */
	export class VertexSubGeometry extends SubGeometryComponent
	{
		public VertexSubGeometry()
		{
			super();
		}

		/**
		 * 处理被添加事件
		 * @param event
		 */
		protected onBeAddedComponet(event:ComponentEvent)
		{
			super.onBeAddedComponet(event);

			subGeometry.mapVABuffer(_.position0_va_3, 3);
			subGeometry.mapVABuffer(_.position1_va_3, 3);

			this.updateVertexData0(subGeometry.vertexPositionData.concat());
			this.updateVertexData1(subGeometry.vertexPositionData.concat());
		}

		public updateVertexData0(vertices:number[])
		{
			subGeometry.updateVertexPositionData(vertices);
			subGeometry.setVAData(_.position0_va_3, vertices);
		}

		public updateVertexData1(vertices:number[])
		{
			subGeometry.setVAData(_.position1_va_3, vertices);
		}
	}
}
