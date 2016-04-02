module feng3d
{
	

	/**
	 * 抽象类错误
	 * @author feng 2015-2-13
	 */
	export class AbstractClassError extends Error
	{
		/**
		 * 创建一个抽象类错误
		 * @param message 与 Error 对象关联的字符串；此参数为可选。
		 * @param id 与特定错误消息关联的引用数字。
		 */
		constructor(message:string = null, id:number = 0)
		{
			super(message || "无法直接实例化抽象类", id);
		}

		/**
		 * 核查可能存在的创建抽象类错误
		 * @param obj			用来检测的对象
		 */
		public static function check(obj:Object)
		{
			var className:string = getQualifiedClassName(obj);

			//通过抽象类获取 完全限定类名
			var error:Error = new AbstractClassError("无法直接实例化抽象类" + className);
			var stackTrace:string = error.getStackTrace();
			var classLine:string = stackTrace.split("\n")[2];
			var className0:string = classLine.substring(classLine.indexOf("at") + 2, classLine.indexOf("("));
			className0 = className0.replace(/\s/g, "");

			//判断是否实例化抽象类
			if (className == className0)
			{
				throw error;
			}
		}

	}
}
