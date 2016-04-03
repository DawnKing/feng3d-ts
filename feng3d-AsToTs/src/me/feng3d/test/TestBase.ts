module feng3d
{
	
	
	

	
	
	
	
	
	
	
	
	
	
	

	/**
	 * 测试基类
	 * @author feng 2014-4-9
	 */
	export class TestBase extends Sprite
	{
		protected rootPaths = [ //
			"http://127.0.0.1:9080/", //
			"http://images.feng3d.me/feng3dDemo/assets/", //
			];

		//资源根路径
		protected rootPath:string = "http://127.0.0.1:9080/";

		/**
		 * 资源列表
		 */
		protected resourceList;

		/** 资源字典 */
		protected resourceDic;

		constructor()
		{
			this.initModules();

			this.tryConnect();
		}

		private initModules()
		{
			Task.init();
			Load.init();
		}

		private tryConnect()
		{
			var tryRootPath:TryConnectURL = new TryConnectURL();
			tryRootPath.addEventListener(TaskEvent.COMPLETED, this.tryRootPathComplete);
			tryRootPath.tryConnect(this.rootPaths);
		}

		private tryRootPathComplete(event:Event)
		{
			var tryConnectURL:TryConnectURL = event.currentTarget as TryConnectURL;
			if (tryConnectURL.connectedUrls.length == 0)
			{
				trace("没有可连接的资源路径！");
			}
			else
			{
				trace("以下为可连接的资源路径：");
				trace(tryConnectURL.connectedUrls);
				this.rootPath = tryConnectURL.connectedUrls[0];
				this.loadTextures();
			}
		}

		/**
		 * 加载纹理资源
		 */
		private loadTextures()
		{
			this.resourceDic = {};

			//加载资源
			var loadObj:LoadModuleEventData = new LoadModuleEventData();
			loadObj.urls = [];
			for (var i:number = 0; this.resourceList != null && i < this.resourceList.length; i++)
			{
				if (this.resourceList[i] is string)
				{
					loadObj.urls.push(this.rootPath + this.resourceList[i]);
				}
				else
				{
					this.resourceList[i].url = this.rootPath + this.resourceList[i].url;
					loadObj.urls.push(this.resourceList[i]);
				}
			}
			loadObj.addEventListener(LoadUrlEvent.LOAD_SINGLE_COMPLETE, this.singleGeometryComplete);
			loadObj.addEventListener(LoadUrlEvent.LOAD_COMPLETE, this.allItemsLoaded);
			GlobalDispatcher.instance.dispatchEvent(new LoadModuleEvent(LoadModuleEvent.LOAD_RESOURCE, loadObj));
		}

		/** 单个资源加载完毕 */
		private singleGeometryComplete(evnet:LoadUrlEvent)
		{
			var path:string = evnet.loadTaskItem.url;
			path = path.substr(this.rootPath.length);

			this.resourceDic[path] = evnet.loadTaskItem.loadingItem.content;
		}

		/**
		 * 处理全部加载完成事件
		 */
		protected allItemsLoaded(event:LoadUrlEvent)
		{
			//配置3d缓存编号
			FagalRE.addBufferID(Context3DBufferIDConfig.bufferIdConfigs);

			this["init"]();
		}
	}
}


