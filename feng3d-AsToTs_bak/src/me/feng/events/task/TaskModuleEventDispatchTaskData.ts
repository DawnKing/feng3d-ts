module feng3d
{
	
	
	

	/**
	 * 完成一个任务单元时触发
	 * @eventType me.feng.events.TaskEvent
	 */
	[Event(name = "completedItem", type = "me.feng.task.TaskEvent")]

	/**
	 * 完成任务时触发
	 * @eventType me.feng.events.TaskEvent
	 */
	[Event(name = "completed", type = "me.feng.task.TaskEvent")]

	/**
	 * 任务模块事件数据
	 * @author feng 2015-10-29
	 */
	export class TaskModuleEventDispatchTaskData extends FEventDispatcher
	{
		/**
		 * 任务集合类型
		 */
		public taskCollectionType:string;

		/**
		 * 任务列表
		 */
		public taskList:TaskItem[];

		/**
		 * 任务执行参数
		 */
		public params:*;

		public TaskModuleEventDispatchTaskData(taskList:TaskItem[] = null, taskCollectionType:string = TaskCollectionType.LIST, params:* = null)
		{
			this.taskList = taskList;
			this.taskCollectionType = taskCollectionType;
			this.params = params;
		}
	}
}
