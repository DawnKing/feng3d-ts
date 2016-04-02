module feng3d
{
	
	
	
	/**
	 * 摄像机事件
	 * @author feng 2014-10-14
	 */
	export class CameraEvent extends FEvent
	{
		public static LENS_CHANGED:string = "lensChanged";
		
		public CameraEvent(type:string, camera:Camera3D = null, bubbles:boolean=false)
		{
			super(type, this.data, bubbles);
		}
		
		public get camera():Camera3D
		{
			return data as Camera3D;
		}
	}
}