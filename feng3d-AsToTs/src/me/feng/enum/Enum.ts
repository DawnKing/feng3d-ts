module feng3d
{
	
	

	/**
	 * 枚举类
	 * <p>用于实现类似其他语言的枚举对象，该类为虚类，无法直接实例化，请使用子类</p>
	 * <p>枚举元素必须使用 public static 定义</p>
	 * @includeExample EnumTest.as
	 * @includeExample TypeEnum.as
	 * @includeExample TypeEnum1.as
	 *
	 * @author feng 2015-5-7
	 */
	export class Enum
	{
		/**
		 * 枚举计数字典
		 */
		private static autoIndexDic:Dictionary = new Dictionary();
		/**
		 * 枚举值
		 */
		private value:number;
		/**
		 * 枚举类名称
		 */
		private className:string;
		/**
		 * 枚举类短名称
		 */
		private type:string;

		/**
		 * 无法直接实例化
		 */
		constructor()
		{
			this.className = getQualifiedClassName(this);
			this.type = this.className.split("::").pop();

			//获取枚举的值
			this.value = number(autoIndexDic[this.className]);
			autoIndexDic[this.className] = this.value + 1;
		}

		/**
		 * 转换值
		 * @see http://filimanjaro.com/blog/2012/operators-overloading-in-as3-javascript-too-%E2%80%93-workaround/
		 */
		public valueOf():number
		{
			return this.value;
		}

		/**
		 * 输出为字符串
		 */
		public toString():string
		{
			return this.type + "-" + this.value;
		}
	}
}
