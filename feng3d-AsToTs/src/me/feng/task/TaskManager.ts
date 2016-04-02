module feng3d
{
	

	
	
	
	
	
	
	
	

	/**
	 * 任务模块管理类
	 * @author feng 2015-10-29
	 */
	export class TaskManager extends FModuleManager
	{
		/**
		 * 任务集合类型字典（任务类型名称：任务类型定义）
		 */
		private taskCollectionTypeDic;

		/**
		 * 执行中的任务集合字典（执行中的任务集合实例：任务相关数据）
		 */
		private executingTaskCollectionDic;

		/**
		 * 创建一个任务管理器
		 */
		constructor()
		{
			this.init();
		}

		/**
		 * @inheritDoc
		 */
		protected init()
		{
			//初始化默认任务集合类型字典
			this.taskCollectionTypeDic = {};
			this.executingTaskCollectionDic = {};

			this.registerTaskCollectionType(TaskCollectionType.LIST, TaskList);
			this.registerTaskCollectionType(TaskCollectionType.QUEUE, TaskQueue);

			this.addListeners();
		}

		/**
		 * 注册任务集合类型
		 * @param taskCollectionType			任务类型名称
		 * @param taskCollectionTypeClass		任务类型定义
		 */
		private registerTaskCollectionType(taskCollectionType:string, taskCollectionTypeClass:Class)
		{
			this.taskCollectionTypeDic[taskCollectionType] = taskCollectionTypeClass;
		}

		/**
		 * 添加事件监听器
		 */
		private addListeners()
		{
			dispatcher.addEventListener(TaskModuleEvent.DISPATCH_TASK, this.onDispatchTask);

			dispatcher.addEventListener(TaskModuleEvent.REGISTER_TASKCOLLECTIONTYPE, this.onRegisterTaskCollectionType);
		}

		protected onRegisterTaskCollectionType(event:TaskModuleEvent)
		{
			var data:TaskModuleEventRegisterData = event.data;
			this.registerTaskCollectionType(data.taskCollectionType, data.taskCollectionTypeClass);
		}

		/**
		 * 处理派发的任务事件
		 */
		protected onDispatchTask(event:TaskModuleEvent)
		{
			var data:TaskModuleEventDispatchTaskData = event.data;

			var taskCollectionCls:Class = this.taskCollectionTypeDic[data.taskCollectionType];
			assert(taskCollectionCls != null, "尝试使用未注册的（" + data.taskCollectionType + "）任务集合类型");

			var taskCollection:TaskCollection = new taskCollectionCls();
			this.executingTaskCollectionDic[taskCollection] = data;

			taskCollection.addEventListener(TaskEvent.COMPLETEDITEM, this.onCompletedItem);
			taskCollection.addEventListener(TaskEvent.COMPLETED, this.onCompleted);

			taskCollection.addItems(data.taskList);
			taskCollection.execute(data.params);

		}

		/**
		 * 处理完成任务事件
		 */
		protected onCompleted(event:TaskEvent)
		{
			var taskCollection:TaskCollection = event.currentTarget as TaskCollection;
			var data:TaskModuleEventDispatchTaskData = this.executingTaskCollectionDic[taskCollection];
			data.dispatchEvent(event);

			taskCollection.removeEventListener(TaskEvent.COMPLETEDITEM, this.onCompletedItem);
			taskCollection.removeEventListener(TaskEvent.COMPLETED, this.onCompleted);

			delete this.executingTaskCollectionDic[taskCollection];
		}

		/**
		 * 处理完成单个任务事件
		 */
		protected onCompletedItem(event:TaskEvent)
		{
			var taskCollection:TaskCollection = event.currentTarget as TaskCollection;
			var data:TaskModuleEventDispatchTaskData = this.executingTaskCollectionDic[taskCollection];

			data.dispatchEvent(event);
		}

	}
}
