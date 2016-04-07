package
{
	

	
	

	

	
	
	
	
	
	
	
	
	

	/**
	 *
	 * @author feng 2014-4-9
	 */
	export class TestBase extends Sprite
	{
		//资源根路径
//		protected rootPath:string = "http://images.feng3d.me/feng3dDemo/assets/";
		protected rootPath:string;

		/**
		 * 资源列表
		 */
		protected resourceList;

		/** 资源字典 */
		protected resourceDic;

		constructor()
		{
			this.initModules();

			this.loadTextures();
		}

		private initModules()
		{
			MyCC.initFlashConsole(this);
			DebugCommon.loggerFunc = Cc.log;

			Task.init();
			Load.init();
		}

		/**
		 * 加载纹理资源
		 */
		private loadTextures()
		{
			this.resourceDic = {};

			if (this.rootPath == null)
			{
				this.rootPath = "";
			}

			//加载资源
			var loadObj:LoadModuleEventData = new LoadModuleEventData();
			loadObj.urls = [];
			for (var i:number = 0; i < this.resourceList.length; i++)
			{
				loadObj.urls.push(this.rootPath + this.resourceList[i]);
			}
			loadObj.addEventListener(LoadUrlEvent.LOAD_SINGLE_COMPLETE, this.onLoadSingleComplete);
			loadObj.addEventListener(LoadUrlEvent.LOAD_COMPLETE, this.onLoadComplete);

			GlobalDispatcher.instance.dispatchEvent(new LoadModuleEvent(LoadModuleEvent.LOAD_RESOURCE, loadObj));
		}

		/** 单个资源加载完毕 */
		protected onLoadSingleComplete(event:LoadUrlEvent)
		{
			var loadTaskItem:LoadTaskItem = event.loadTaskItem;
			var path:string = loadTaskItem.url;
			path = path.substr(this.rootPath.length);

			this.resourceDic[path] = loadTaskItem.loadingItem.content;
		}

		/**
		 * 处理全部加载完成事件
		 */
		protected onLoadComplete(event:LoadUrlEvent)
		{
			//配置3d缓存编号
			FagalRE.addBufferID(Context3DBufferIDConfig.bufferIdConfigs);
			this["init"]();
		}
	}
}
