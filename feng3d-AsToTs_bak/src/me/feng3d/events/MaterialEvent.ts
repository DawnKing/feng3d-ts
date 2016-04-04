module feng3d
{
	

	/**
	 * 材质事件
	 * @author feng 2014-9-9
	 */
	export class MaterialEvent extends FEvent
	{
		/** 添加pass */
		public static PASS_ADDED:string = "passAdded";
		/** 移除pass */
		public static var PASS_REMOVED:string = "passRemoved";

		public MaterialEvent(type:string, data:* = null, bubbles:boolean = false)
		{
			super(type, data, bubbles);
		}
	}
}