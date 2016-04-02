module feng3d
{
	

	/**
	 * 线段材质
	 * @author feng 2014-4-16
	 */
	export class SegmentMaterial extends MaterialBase
	{
		private _screenPass:SegmentPass;
		
		public SegmentMaterial(thickness:number = 1.25)
		{
			super();
			this.bothSides = true;
			addPass(this._screenPass = new SegmentPass(thickness));
		}
	}
}