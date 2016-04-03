module feng3d
{
	
	

	

	/**
	 * 蒙皮子网格
	 * 提供了关节 索引数据与权重数据
	 */
	export class SkinnedSubGeometry extends SubGeometryComponent
	{
		private _jointsPerVertex:number;

		/**
		 * 创建蒙皮子网格
		 */
		constructor(jointsPerVertex:number)
		{
			this._jointsPerVertex = jointsPerVertex;
			super();
		}

		/**
		 * 处理被添加事件
		 * @param event
		 */
		protected onBeAddedComponet(event:ComponentEvent)
		{
			super.onBeAddedComponet(event);

			subGeometry.mapVABuffer(_.animated_va_3, 3);
			subGeometry.mapVABuffer(_.jointweights_va_x, this._jointsPerVertex);
			subGeometry.mapVABuffer(_.jointindex_va_x, this._jointsPerVertex);
		}

		/**
		 * 更新动画顶点数据
		 */
		public updateAnimatedData(value:number[])
		{
			subGeometry.setVAData(_.animated_va_3, value);
		}

		/**
		 * 关节权重数据
		 */
		public get jointWeightsData():number[]
		{
			var data:number[] = subGeometry.getVAData(_.jointweights_va_x);
			return data;
		}

		/**
		 * 关节索引数据
		 */
		public get jointIndexData():number[]
		{
			var data:number[] = subGeometry.getVAData(_.jointindex_va_x);
			return data;
		}

		/**
		 * 更新关节权重数据
		 */
		public updateJointWeightsData(value:number[])
		{
			subGeometry.setVAData(_.jointweights_va_x, value);
		}

		/**
		 * 更新关节索引数据
		 */
		public updateJointIndexData(value:number[])
		{
			subGeometry.setVAData(_.jointindex_va_x, value);
		}
	}
}
