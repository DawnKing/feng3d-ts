module feng3d
{

	/**
	 * 获取类描述
	 * @param type		类类型
	 * @return 			类描述
	 *
	 * @author feng 2012-10-23
	 */
	public describeTypeClass(type:Class):Object
	{
		return describeTypeJSON(type, DescribeTypeFlags.CLASS_FLAGS);
	}
}
