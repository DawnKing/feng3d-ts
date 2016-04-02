module feng3dBeat
{

	/**
	 ** 心跳模块类
	 * @includeExample HeatBeatModuleTest.as
	 * @author cdz 2015-10-31
	 */
	export class HeartBeat
	{
		private static var heartBeatManager:HeartBeatManager;

		/**
		 * 初始化模块
		 */
		public static function init()
		{
			heartBeatManager || (heartBeatManager = new HeartBeatManager());
		}
	}
}
