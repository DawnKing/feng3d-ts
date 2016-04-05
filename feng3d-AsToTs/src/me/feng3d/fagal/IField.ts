module feng3d
{

	/**
	 * 寄存器项
	 * @author feng 2014-10-22
	 */
	export interface IField
	{
		/**
		 * 寄存器类型
		 */
		get regType():string;

		/**
		 * 寄存器id
		 */
		get regId():string;

		/**
		 * 寄存器描述
		 */
		get desc():string;

		/**
		 * 转换为字符串
		 */
		toString():string;
	}
}
