module feng3d
{
	
	
	
	/**
	 * 
	 * @author feng 2014-9-10
	 */
	export class Container3DEvent extends FEvent
	{
		public Container3DEvent(type:string, data:*=null, bubbles:boolean=false)
		{
			super(type, data, bubbles);
		}
	}
}