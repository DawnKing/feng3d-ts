module feng3d
{
	


	/**
	 *
	 * @author feng 2015-5-28
	 */
	export class LightEvent extends FEvent
	{
		public static CASTS_SHADOW_CHANGE:string = "castsShadowChange";

		public LightEvent(type:string, data:* = null, bubbles:boolean = false, cancelable:boolean = false)
		{
			super(type, data, bubbles, cancelable);
		}
	}
}
