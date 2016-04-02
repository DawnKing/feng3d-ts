module feng3d
{

	/**
	 *
	 * @author feng 2015-11-22
	 */
	export class ArrayUtils
	{
		/**
		 * Array <-> Vector
		 * @param source			源数据(Array || Vector);in
		 * @param target			目标数据(Array || Vector);in-out
		 * @param targetType		目标类型(Array || Vector);default:Array
		 */
		public static toArray(source:*, target:* = null, targetType:Class = null):*
		{
			if (target == null)
			{
				targetType ||= Array;

				target = new targetType();
			}

			if (target.length != source.length)
			{
				var hasFixed:boolean = ("fixed" in target);
				var fixedValue:boolean;
				if (hasFixed)
				{
					fixedValue = target.fixed;
					target.fixed = false;
				}
				target.length = source.length;
				if (hasFixed)
				{
					target.fixed = fixedValue;
				}
			}

			for (var i:number = 0; i < source.length; i++)
			{
				target[i] = source[i];
			}
			return target;
		}
	}
}
