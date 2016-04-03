module feng3d
{
	

	
	
	

	/**
	 * 线框基元基类
	 * @author feng 2014-4-27
	 */
	export class WireframePrimitiveBase extends SegmentSet
	{
		private _color:number = 0xffffff;
		private _thickness:number = 1;

		/**
		 * @param color 线框颜色
		 * @param thickness 线框厚度
		 */
		constructor(color:number = 0xffffff, thickness:number = 1)
		{
			if (thickness <= 0)
				thickness = 1;
			this.color = color;
			this.thickness = thickness;
			AbstractClassError.check(this);
		}

		/** 线框颜色 */
		public get color():number
		{
			return _color;
		}

		public set color(value:number)
		{
			_color = value;

			for each (var segment:Segment in segmentGeometry.segments)
			{
				segment.startColor = segment.endColor = value;
			}
			segmentGeometry.updateGeometry();
		}

		/** 线条粗细值 */
		public get thickness():number
		{
			return _thickness;
		}

		public set thickness(value:number)
		{
			_thickness = value;

			for each (var segment:Segment in segmentGeometry.segments)
			{
				segment.thickness = segment.thickness = value;
			}
			segmentGeometry.updateGeometry();
		}

		/**
		 * 更新线条
		 * @param index 线段编号
		 * @param v0 线段起点
		 * @param v1 线段终点
		 */
		protected updateOrAddSegment(index:number, v0:Vector3D, v1:Vector3D)
		{
			var segment:Segment;
			if ((segment = segmentGeometry.getSegment(index)) != null)
			{
				segment.start = v0;
				segment.end = v1;
			}
			else
			{
				segmentGeometry.addSegment(new Segment(v0.clone(), v1.clone(), this._color, this._color, this._thickness));
			}
		}
	}
}
