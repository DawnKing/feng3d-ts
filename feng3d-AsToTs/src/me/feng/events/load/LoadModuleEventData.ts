module feng3d
{

	
	
	
	
	
	
	



	/**
	 * 完成一个任务单元时触发
	 * @eventType me.feng.load.LoadUrlEvent
	 */
	[Event(name = "loadSingleComplete", type = "me.feng.load.LoadUrlEvent")]

	/**
	 * 资源加载完成
	 * @eventType me.feng.load.LoadUrlEvent
	 */
	[Event(name = "loadComplete", type = "me.feng.load.LoadUrlEvent")]

	/**
	 * 加载事件数据
	 * @author feng 2015-5-27
	 */
	export class LoadModuleEventData extends FEventDispatcher
	{
		private _urls:Array;

		/**
		 * 自定义数据，可用于保存数据在加载资源后处理
		 */
		public data:Object;

		private _taskModuleEventData:TaskModuleEventDispatchTaskData;

		/**
		 * 加载事件数据
		 * @param urls		加载路径列表
		 * @param data		自定义数据，可用于保存数据在加载资源后处理
		 */
		public LoadModuleEventData(urls:Array = null, data:Object = null)
		{
			this.urls = urls;
			this.data = data;
		}

		/**
		 * 加载路径列表
		 */
		public get urls():Array
		{
			return _urls;
		}

		/**
		 * @private
		 */
		public set urls(value:Array)
		{
			_urls = value;
		}

		/**
		 * 加载任务列表
		 * <p>该函数提供给加载模块内部使用，使用者并不需要知道</p>
		 */
		private get loadTaskItems():TaskItem[]
		{
			var _loadTaskItems:TaskItem[] = new TaskItem[]();

			_loadTaskItems.length = 0;
			for each (var url:Object in urls)
			{
				_loadTaskItems.push(new LoadTaskItem(url));
			}

			return _loadTaskItems;
		}

		/**
		 * 加载任务数据
		 */
		public get taskModuleEventData():TaskModuleEventDispatchTaskData
		{
			if (_taskModuleEventData == null)
			{
				_taskModuleEventData = new TaskModuleEventDispatchTaskData();
				_taskModuleEventData.addEventListener(TaskEvent.COMPLETEDITEM, onCompletedItem);
				_taskModuleEventData.addEventListener(TaskEvent.COMPLETED, onCompleted);
			}
			_taskModuleEventData.taskList = loadTaskItems;
			_taskModuleEventData.taskCollectionType = TaskCollectionType.QUEUE;

			return _taskModuleEventData;
		}

		/**
		 * 处理完成加载单项事件
		 */
		protected onCompletedItem(event:TaskEvent)
		{
			var loadItemData:LoadTaskItem = event.data;
			this.dispatchEvent(new LoadUrlEvent(LoadUrlEvent.LOAD_SINGLE_COMPLETE, loadItemData));
		}

		/**
		 * 处理完成所有加载项事件
		 */
		private onCompleted(event:TaskEvent)
		{
			this.dispatchEvent(new LoadUrlEvent(LoadUrlEvent.LOAD_COMPLETE));
		}
	}
}
