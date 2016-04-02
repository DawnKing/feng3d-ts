module feng3d
{
	
	

	/**
	 * 镜头事件
	 * @author feng 2014-10-14
	 */
	export class LensEvent extends Event
	{
		public static MATRIX_CHANGED:string = "matrixChanged";

		constructor(type:string, lens:LensBase = null, bubbles:boolean = false, cancelable:boolean = false)
		{
			super(type, this.data, bubbles, cancelable);
		}

		public get lens():LensBase
		{
			return data as LensBase;
		}
	}
}
