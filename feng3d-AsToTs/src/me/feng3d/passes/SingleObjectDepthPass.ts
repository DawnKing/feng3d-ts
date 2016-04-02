module feng3d
{
	
	

	
	
	
	
	
	
	
	
	
	

	

	/**
	 * The SingleObjectDepthPass provides a material pass that renders a single object to a depth map from the point
	 * of view from a light.
	 */
	export class SingleObjectDepthPass extends MaterialPassBase
	{
		private _textures:Dictionary;
		private _projections:Dictionary;
		private _textureSize:number;
		private _projectionTexturesInvalid:boolean = true;

		private _polyOffset:number[] = number[]([15, 0, 0, 0]);

		/**
		 * 通用数据
		 */
		private depthCommonsData0:number[] = number[]([1.0, 255.0, 65025.0, 16581375.0]);

		/**
		 * 通用数据
		 */
		private depthCommonsData1:number[] = number[]([1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0, 0.0]);

		private objectProjectionMatrix:Matrix3D = new Matrix3D();

		/**
		 * Creates a new SingleObjectDepthPass object.
		 * @param textureSize The size of the depth map texture to render to.
		 * @param polyOffset The amount by which the rendered object will be inflated, to prevent depth map rounding errors.
		 *
		 * todo: provide custom vertex code to assembler
		 */
		constructor(textureSize:number = 512, polyOffset:number = 15)
		{
			super();
			this._textureSize = textureSize;
			this._polyOffset[0] = polyOffset;

			this._textures = new Dictionary();
			this._projections = new Dictionary();

//			_enc = number[]([1.0, 255.0, 65025.0, 16581375.0, 1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0, 0.0]);
//			this.depthCommonsData0 = number[]([1.0, 255.0, 65025.0, 16581375.0]);
//			this.depthCommonsData1 = number[]([1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0, 0.0]);

//			_animatableAttributes = string[](["va0", "va1"]);
//			_animationTargetRegisters = string[](["vt0", "vt1"]);
		}

		protected initBuffers()
		{
			super.initBuffers();

			this.context3DBufferOwner.mapContext3DBuffer(this._.SODP$polyOffset_vc_vector, this.updatePolyOffsetBuffer);
			this.context3DBufferOwner.mapContext3DBuffer(this._.SODP$objectProjection_vc_matrix, this.updateObjectProjectionBuffer);

			this.context3DBufferOwner.mapContext3DBuffer(this._.SODP$depthCommonsData0_fc_vector, this.updateDepthCommonsData0Buffer);
			this.context3DBufferOwner.mapContext3DBuffer(this._.SODP$depthCommonsData1_fc_vector, this.updateDepthCommonsData1Buffer);
		}

		private updatePolyOffsetBuffer(vcVectorBuffer:VCVectorBuffer)
		{
			vcVectorBuffer.update(this._polyOffset);
		}

		protected updateObjectProjectionBuffer(vcMatrixBuffer:VCMatrixBuffer)
		{
			vcMatrixBuffer.update(this.objectProjectionMatrix, true);
		}

		private updateDepthCommonsData0Buffer(fcVectorBuffer:FCVectorBuffer)
		{
			fcVectorBuffer.update(this.depthCommonsData0);
		}

		private updateDepthCommonsData1Buffer(fcVectorBuffer:FCVectorBuffer)
		{
			fcVectorBuffer.update(this.depthCommonsData1);
		}

		/**
		 * @inheritDoc
		 */
		public dispose()
		{
			if (this._textures)
			{
				this._textures = null;
			}
		}

		/**
		 * Updates the projection textures used to contain the depth renders.
		 */
		private updateProjectionTextures()
		{
			this._textures = new Dictionary();
			this._projections = new Dictionary();
			this._projectionTexturesInvalid = false;
		}

		/**
		 * @inheritDoc
		 */
		public getVertexCode()
		{
			var _:* = FagalRE.instance.space;
			var vt7:Object;
			var vt1:Object;
			var vc4:Object;
			var vt0:Object;
			var vc0:Object;
			var vt2:Object;
			var op:Object;
			var v0:Object;

			// offset
			_.mul(vt7, vt1, vc4.x); //
			_.add(vt7, vt7, vt0); //
			_.mov(vt7.w, vt0.w);
			// project
			_.m44(vt2, vt7, vc0); //
			_.mov(op, vt2);

			// perspective divide
			_.div(v0, vt2, vt2.w);
		}

		/**
		 * @inheritDoc
		 */
		public getFragmentCode(animationCode:string)
		{
			// encode float -> rgba
			var _:* = FagalRE.instance.space;
			var ft0:Object;
			var fc0:Object;
			var v0:Object;
			var ft1:Object;
			var fc1:Object;
			var oc:Object;

			_.mul(ft0, fc0, v0.z); //
			_.frc(ft0, ft0); //
			_.mul(ft1, ft0.yzww, fc1); //
			_.sub(ft0, ft0, ft1); //
			_.mov(oc, ft0);
		}

		/**
		 * Gets the depth maps rendered for this object from all lights.
		 * @param renderable The renderable for which to retrieve the depth maps.
		 * @param stage3DProxy The Stage3DProxy object currently used for rendering.
		 * @return A list of depth map textures for all supported lights.
		 */
		public getDepthMap(renderable:IRenderable):TextureProxyBase
		{
			this._textures ||= new Dictionary();

			// todo: use texture proxy?
			var target:TextureProxyBase = this._textures[renderable] ||= new RenderTexture(this._textureSize, this._textureSize);

			//			stage3DProxy.setRenderTarget(target, true);
			//			context.clear(1.0, 1.0, 1.0);

			return this._textures[renderable];
		}

		/**
		 * Retrieves the depth map projection maps for all lights.
		 * @param renderable The renderable for which to retrieve the projection maps.
		 * @return A list of projection maps for all supported lights.
		 */
		public getProjection(renderable:IRenderable):Matrix3D
		{
			var light:LightBase;
			var lights:LightBase[] = _lightPicker.allPickedLights;

			var matrix:Matrix3D = this._projections[renderable] ||= new Matrix3D();

			// local position = enough
			light = lights[0];

			light.getObjectProjectionMatrix(renderable, matrix);
			this.objectProjectionMatrix.copyFrom(matrix);

			return this._projections[renderable];
		}

		/**
		 * @inheritDoc
		 */
		public activate(camera:Camera3D, target:TextureProxyBase = null)
		{
			if (this._projectionTexturesInvalid)
				this.updateProjectionTextures();
			// never scale
			super.activate(camera, target);
		}
	}
}
