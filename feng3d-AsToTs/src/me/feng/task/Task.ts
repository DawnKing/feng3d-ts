module feng3d
{

	/**
	 * 任务模块类
	 * @includeExample TaskModuleTest.as
	 *
	 * @author feng 2015-5-27
	 */
	export class Task
	{
		private static var _isInit:boolean = false;

		private static var taskManager:TaskManager;

		/**
		 * 模块是否初始化
		 */
		public static get isInit():boolean
		{
			return _isInit;
		}

		/**
		 * 初始化模块
		 */
		public static init()
		{
			taskManager || (taskManager = new TaskManager());
			_isInit = true;
		}
	}
}
