module feng3d
{
	
	/**
	 * 
	 * @author cdz 2015-11-5
	 */
	export class TextureTest extends TestBase
	{
		private context:Context3D;
		private stage3D:Stage3D;
		
		private baseGem:TextureTestGeometry;
		private baseMesh:BaseMesh;
		
		private CONTEXT_WIDTH:number = 670;
		private CONTEXT_HEIGHT:number = 380;
		
		private DEGS_TO_RADIANS:number = Math.PI / 180;
		
		private texturePath:string = "embeds/wheel.png";
		constructor()
		{
			super();
			this.resourceList = [this.texturePath];
			this.rootPath = "http://images.feng3d.me/feng3dDemo/assets/";
		}
		
		/**
		 * Global initialise function
		 */
		public init()
		{
			
			// Request a 3D this.context instance
			this.stage3D = this.stage.stage3Ds[0];
			this.stage3D.addEventListener(Event.CONTEXT3D_CREATE, this.contextReady, 0, true);
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
			var vertexPositionData:number[] = [-0.5, -0.5, 0, //<- 1st vertex this.x,this.y,this.z,
				-0.5, 0.5, 0, //<- 2nd vertex this.x,this.y,this.z,
				0.5, 0.5, 0, //<- 3rd vertex this.x,this.y,this.z,
				0.5, -0.5, 0, //<- 2nd vertex this.x,this.y,this.z,
			];
			var vertexColorData:number[] = [1.0, 0.0, 0.0, //<- 1st vertex r,g,b
				0.0, 1.0, 0.0, //<- 2nd vertex r,g,b
				0.0, 0.0, 1.0, //<- 3rd vertex r,g,b
				0.0, 0.0, 1.0, //<- 4rd vertex r,g,b
			];
			
			var vertexUVData:number[] = [ //
				0.0, 0.0, //<- 1st vertex u,v
				0.0, 1.0, //<- 2nd vertex u,v
				1.0, 1.0, //<- 3rd vertex u,v
				1.0, 0.0 //<- 4rd vertex u,v
			];
			
			// Connect the vertices into a triangle (in counter-clockwise order)
			var indexData:number[] = [0, 1, 2, 2, 3, 0];
			
			this.baseGem = new TextureTestGeometry();
			this.baseGem.setGeometry(vertexPositionData, vertexColorData, indexData);
			this.baseGem.vertexUVData = vertexUVData;
			
			var textureData:TextureProxyBase = Cast.bitmapTexture(this.resourceDic[this.texturePath]);
			var textureMaterial:TextureTestMaterial = new TextureTestMaterial(textureData);
			
			this.baseMesh = new BaseMesh(this.baseGem, textureMaterial);
			
			// ...and start rendering frames!
			this.addEventListener(Event.ENTER_FRAME, this.renderFrame, 0, true);
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
			m.appendRotation(Date.now() / 30, Vector3D.Z_AXIS);
			m.appendTranslation(0, 0, 2);
			m.append(view);
			
			return m;
		}
		
		
	}
}