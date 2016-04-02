module feng3d
{
	


	/**
	 * 任务列表
	 * <p>所有子任务将会在同一时间开始执行</p>
	 * @includeExample TaskListTest.as
	 * @includeExample KeyDownTask.as
	 *
	 * @author feng 2014-7-24
	 */
	export class TaskList extends TaskCollection
	{
		/**
		 * 创建一个任务队列
		 */
		public TaskList()
		{
			super();
		}

		/**
		 * 执行任务
		 * @param params	执行参数
		 */
		public execute(params:* = null)
		{
			super.execute(params);

			//执行所有子任务
			for (var i:number = 0; i < waitingItemList.length; i++)
			{
				executeItem(waitingItemList[i], params);
			}
			waitingItemList.length = 0;
		}
	}
}
