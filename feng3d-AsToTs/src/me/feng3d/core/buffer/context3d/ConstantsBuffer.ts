module feng3d
{

	/**
	 * 3d环境常量数据缓存
	 * @author feng 2014-8-20
	 */
	export class ConstantsBuffer extends RegisterBuffer
	{
		/**
		 * 创建3d环境常量数据缓存	
		 * @param dataTypeId 		数据编号
		 * @param updateFunc 		数据更新回调函数
		 */
		public ConstantsBuffer(dataTypeId:string, updateFunc:Function)
		{
			super(dataTypeId, updateFunc);
		}
	}
}
