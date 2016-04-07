package
{
	

	
	
	
	
	
	
	
	

	

	
	

	

	/**
	 * 通过顶点颜色渲染地形
	 * @author feng 2014-10-24
	 */
	[SWF(width = "640", height = "362", frameRate = "60")]
	export class ColorTerrainShaderTest extends TestBase
	{
		private context:Context3D;
		private stage3D:Stage3D;

		private baseGem:ColorTerrainGeometry;
		private baseMesh:BaseMesh;

		private CONTEXT_WIDTH:number = 670;
		private CONTEXT_HEIGHT:number = 380;

		private DEGS_TO_RADIANS:number = Math.PI / 180;

		//splat texture maps
		private grassPath:string = "embeds/terrain/grass.jpg";
		private rockPath:string = "embeds/terrain/rock.jpg";
		private beachPath:string = "embeds/terrain/beach.jpg";

		constructor()
		{
			this.resourceList = [this.grassPath, this.rockPath, this.beachPath];
			this.rootPath = "http://images.feng3d.me/feng3dDemo/assets/";
			super();
		}

		/**
		 * Global initialise function
		 */
		public init()
		{
			// Set the default this.stage behavior
			this.stage.scaleMode = StageScaleMode.NO_SCALE;
			this.stage.align = StageAlign.TOP_LEFT;

			// Request a 3D this.context instance
			this.stage3D = this.stage.stage3Ds[0];
			this.stage3D.addEventListener(Event.CONTEXT3D_CREATE, this.contextReady, false, 0, true);
			this.stage3D.requestContext3D(Context3DRenderMode.AUTO, Context3DProfile.STANDARD);

			trace("Awaiting this.context...");
		}

		private contextReady(event:Event)
		{
			this.stage3D.removeEventListener(Event.CONTEXT3D_CREATE, this.contextReady);
			trace("Got this.context!");

			// Get the new this.context
			this.context = this.stage3D.context3D;

			// Configure back buffer
			this.context.configureBackBuffer(this.CONTEXT_WIDTH, this.CONTEXT_HEIGHT, 2, true);
			this.stage3D.x = this.stage3D.y = 0;

			// Prepare vertex data
			var vertexPositionData:number[] = number[]([ //
				-0.5, -0.5, 0, //<- 1st vertex this.x,this.y,this.z,
				-0.5, 0.5, 0, //<- 2nd vertex this.x,this.y,this.z,
				0.5, 0.0, 0 //<- 3rd vertex this.x,this.y,this.z,
				]);
			var vertexColorData:number[] = number[]([ //
				1.0, 0.0, 0.0, //<- 1st vertex r,g,b
				0.0, 1.0, 0.0, //<- 2nd vertex r,g,b
				0.0, 0.0, 1.0 //<- 3rd vertex r,g,b
				]);

			var vertexUVData:number[] = number[]([ //
				1.0, 0.0, //<- 1st vertex u,v
				0.0, 1.0, //<- 2nd vertex u,v
				0.0, 0.0 //<- 3rd vertex u,v
				]);

			// Connect the vertices into a triangle (in counter-clockwise order)
			var indexData:number[] = number[]([0, 1, 2]);

			//创建几何体
			this.baseGem = new ColorTerrainGeometry();
			this.baseGem.setGeometry(vertexPositionData, vertexColorData, indexData);
			this.baseGem.vertexUVData = vertexUVData;

			//创建材质
			var _splats = [Cast.bitmapTexture(this.resourceDic[this.beachPath]), Cast.bitmapTexture(this.resourceDic[this.grassPath]), Cast.bitmapTexture(this.resourceDic[this.rockPath])];
			var colorTerrainMaterial:ColorTerrainMaterial = new ColorTerrainMaterial(_splats);

			//创建网格
			this.baseMesh = new BaseMesh(this.baseGem, colorTerrainMaterial);

			// ...and start rendering frames!
			this.addEventListener(Event.ENTER_FRAME, this.renderFrame, false, 0, true);
		}

		private renderFrame(e:Event)
		{
			// Clear away the old frame render
			this.context.clear();

			// Calculate the view matrix, and run the shader program!
			this.baseMesh.render(this.context, this.makeViewMatrix());

			// Show the newly rendered frame on screen
			this.context.present();
		}

		public makeViewMatrix():Matrix3D
		{
			var aspect:number = this.CONTEXT_WIDTH / this.CONTEXT_HEIGHT;
			var zNear:number = 0.01;
			var zFar:number = 1000;
			var fov:number = 45 * this.DEGS_TO_RADIANS;

			var view:PerspectiveMatrix3D = new PerspectiveMatrix3D();
			view.perspectiveFieldOfViewLH(fov, aspect, zNear, zFar);

			var m:Matrix3D = new Matrix3D();
//			m.appendRotation(getTimer() / 30, Vector3D.Z_AXIS);
			m.appendTranslation(0, 0, 2);
			m.append(view);

			return m;
		}
	}
}
