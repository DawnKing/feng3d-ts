package
{
	/**
	 * 测试基础渲染函数
	 * @author feng 2014-10-24
	 */
	[SWF(width = "640", height = "362", frameRate = "60")]
	export class BaseShaderTest extends TestBase
	{
		private context:Context3D;
		private stage3D:Stage3D;

		private baseGem:BaseGeometry;
		private baseMesh:BaseMesh;

		private CONTEXT_WIDTH:number = 670;
		private CONTEXT_HEIGHT:number = 380;

		private DEGS_TO_RADIANS:number = Math.PI / 180;

		constructor()
		{
			this.resourceList = [];
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

			logger("Awaiting this.context...");
		}

		private contextReady(event:Event)
		{
			this.stage3D.removeEventListener(Event.CONTEXT3D_CREATE, this.contextReady);
			logger("Got this.context!");

			// Get the new this.context
			this.context = this.stage3D.context3D;

			// Configure back buffer
			this.context.configureBackBuffer(this.CONTEXT_WIDTH, this.CONTEXT_HEIGHT, 2, true);
			this.stage3D.x = this.stage3D.y = 0;

			// Prepare vertex data
			var vertexPositionData:number[] = number[]([-0.5, -0.5, 0, //<- 1st vertex this.x,this.y,this.z,
				-0.5, 0.5, 0, //<- 2nd vertex this.x,this.y,this.z,
				0.5, 0.0, 0 //<- 3rd vertex this.x,this.y,this.z,
				]);
			var vertexColorData:number[] = number[]([1.0, 0.0, 0.0, //<- 1st vertex r,g,b
				0.0, 1.0, 0.0, //<- 2nd vertex r,g,b
				0.0, 0.0, 1.0 //<- 3rd vertex r,g,b
				]);

			// Connect the vertices into a triangle (in counter-clockwise order)
			var indexData:number[] = number[]([0, 1, 2]);

			this.baseGem = new BaseGeometry();
			this.baseGem.setGeometry(vertexPositionData, vertexColorData, indexData);
			this.baseMesh = new BaseMesh(this.baseGem);

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
			m.appendRotation(getTimer() / 30, Vector3D.Z_AXIS);
			m.appendTranslation(0, 0, 2);
			m.append(view);

			return m;
		}
	}
}
