module feng3d
{
	/**
	 * 测试3D环境缓存类
	 * @author feng 2015-7-1
	 */
	export class Context3DCacheDebugText extends TestBase
	{
		private debugTextPath:string = "context3DCacheDebug.txt";
//		private debugTextPath:string = "TestMaterial_context3DBufferDebug.txt";

		private stage3D:Stage3D;
		private renderContext:Context3D;
		private context3DCache:Context3DCache;

		constructor()
		{
			super();
			this.resourceList = [this.debugTextPath];
		}

		/**
		 * Global initialise function
		 */
		public init()
		{
			var obj:Object = JSON.parse(this.resourceDic[this.debugTextPath]);

			this.context3DCache = Context3DBufferDebug.getContext3DCache(obj);

			this.stage3D = this.stage.stage3Ds[0];

			//Add event listener before requesting the context
			this.stage3D.addEventListener(Event.CONTEXT3D_CREATE, this.contextCreated);
			this.stage3D.requestContext3D(Context3DRenderMode.AUTO, Context3DProfile.STANDARD);
		}

		//Note, context3DCreate event can happen at any time, such as when the hardware resources are taken by another process
		private contextCreated(event:Event)
		{
			this.renderContext = as(event.target,Stage3D).context3D;
			logger("3D driver: " + this.renderContext.driverInfo);
			this.setupScene();
		}

		private setupScene()
		{
			this.renderContext.enableErrorChecking = true; //Can slow rendering - only turn on when developing/testing
			this.renderContext.configureBackBuffer(this.stage.stageWidth, this.stage.stageHeight, 2, false);

//			this.stage.addEventListener(Event.ENTER_FRAME, this.render);
			this.render(null);
		}

		private render(event:Event)
		{
			this.renderContext.clear(1, 1, 1);

			this.context3DCache.render(this.renderContext);

			//Show the frame
			this.renderContext.present();
		}

		private contextCreationError(error:ErrorEvent)
		{
			logger(error);
		}

	}
}
