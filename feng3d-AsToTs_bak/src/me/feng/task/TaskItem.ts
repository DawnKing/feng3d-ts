module feng3d
{
	

	/**
	 * 完成任务时触发
	 * @eventType me.feng.events.TaskEvent
	 */
	[Event(name = "completed", type = "me.feng.task.TaskEvent")]

	/**
	 * 任务
	 * @author feng 2015-5-27
	 */
	export class TaskItem extends FEventDispatcher
	{
		/** 任务状态 */
		protected _state:number = TaskStateType.STATE_INIT;

		/**
		 * 任务状态
		 */
		public get state():number
		{
			return _state;
		}

		/**
		 * 创建一个任务单元数据
		 */
		public TaskItem()
		{
			this._state = TaskStateType.STATE_INIT;
		}

		/**
		 * 执行任务
		 * @param params	执行参数
		 */
		public execute(params:* = null)
		{
			this._state = TaskStateType.STATE_EXECUTING;

		}

		/**
		 * 执行完成事件
		 */
		protected doComplete()
		{
			this._state = TaskStateType.STATE_COMPLETED;

			this.dispatchEvent(new TaskEvent(TaskEvent.COMPLETED));
		}

		/**
		 * 销毁
		 */
		public destroy()
		{

		}
	}
}

