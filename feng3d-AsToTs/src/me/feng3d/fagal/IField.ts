module feng3d
{

	/**
	 * 寄存器项
	 * @author feng 2014-10-22
	 */
	public interface IField
	{
		/**
		 * 寄存器类型
		 */
		function get regType():string;

		/**
		 * 寄存器id
		 */
		function get regId():string;

		/**
		 * 寄存器描述
		 */
		function get desc():string;

		/**
		 * 转换为字符串
		 */
		function toString():string;
	}
}
