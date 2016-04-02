module feng3d
{

	

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

	

	/**
	 * 编译通道
	 * <p>用于处理复杂的渲染通道</p>
	 * @author feng 2014-6-5
	 */
	export class CompiledPass extends MaterialPassBase
	{
		public _passes:MaterialPassBase[];

		/**
		 * 物体投影变换矩阵（模型空间坐标-->GPU空间坐标）
		 */
		protected modelViewProjection:Matrix3D = new Matrix3D();

		/**
		 * 法线场景变换矩阵（模型空间坐标-->世界空间坐标）
		 */
		protected normalSceneMatrix:Matrix3D = new Matrix3D();

		/**
		 * 场景变换矩阵（模型空间坐标-->世界空间坐标）
		 */
		protected sceneTransformMatrix:Matrix3D = new Matrix3D();

		/**
		 * 世界投影矩阵（世界空间坐标-->投影空间坐标）
		 */
		protected worldProjectionMatrix:Matrix3D = new Matrix3D();

		protected _ambientLightR:number;
		protected _ambientLightG:number;
		protected _ambientLightB:number;

		/**
		 * 通用数据
		 */
		protected commonsData:number[] = number[]([0.5, 0, 1 / 255, 1]);

		/**
		 * 摄像机世界坐标
		 */
		protected cameraPosition:number[] = new number[](4);

		/**
		 * 是否开启灯光衰减
		 */
		protected _enableLightFallOff:boolean = true;

		/**
		 * 创建一个编译通道类
		 */
		constructor()
		{
			this.init();
		}

		/**
		 * 初始化
		 */
		private init()
		{
			_methodSetup = new ShaderMethodSetup();
			_methodSetup.addEventListener(ShadingMethodEvent.SHADER_INVALIDATED, this.onShaderInvalidated);
			this.context3DBufferOwner.addChildBufferOwner(_methodSetup.context3DBufferOwner);
		}

		/**
		 * @inheritDoc
		 */
		protected initBuffers()
		{
			super.initBuffers();
			this.context3DBufferOwner.mapContext3DBuffer(this._.commonsData_fc_vector, this.updateCommonsDataBuffer);
			this.context3DBufferOwner.mapContext3DBuffer(this._.cameraPosition_vc_vector, this.updateCameraPositionBuffer);
			this.context3DBufferOwner.mapContext3DBuffer(this._.projection_vc_matrix, this.updateProjectionBuffer);
			this.context3DBufferOwner.mapContext3DBuffer(this._.normalSceneTransform_vc_matrix, this.updateSceneNormalMatrixBuffer);
			this.context3DBufferOwner.mapContext3DBuffer(this._.sceneTransform_vc_matrix, this.updateSceneTransformMatrixBuffer);
			this.context3DBufferOwner.mapContext3DBuffer(this._.wordProjection_vc_matrix, this.updateWordProjectionMatrixBuffer);
		}

		/**
		 * @inheritDoc
		 */
		public activate(camera:Camera3D, target:TextureProxyBase = null)
		{
			super.activate(camera, target);

			var lightShaderParams:LightShaderParams = this.shaderParams.getOrCreateComponentByClass(LightShaderParams);
			lightShaderParams.useLightFallOff = this._enableLightFallOff;

			_methodSetup.activate(this.shaderParams);

			this._ambientLightR = this._ambientLightG = this._ambientLightB = 0;
			if (usesLights())
				this.updateLightConstants();

			var ambientMethod:BasicAmbientMethod = _methodSetup.ambientMethod;
			ambientMethod._lightAmbientR = this._ambientLightR;
			ambientMethod._lightAmbientG = this._ambientLightG;
			ambientMethod._lightAmbientB = this._ambientLightB;
		}

		/**
		 * @inheritDoc
		 */
		protected updateConstantData(renderable:IRenderable, camera:Camera3D)
		{
			super.updateConstantData(renderable, camera);

			//场景变换矩阵（物体坐标-->世界坐标）
			var sceneTransform:Matrix3D = renderable.sourceEntity.getRenderSceneTransform(camera);
			//投影矩阵（世界坐标-->投影坐标）
			var projectionmatrix:Matrix3D = camera.viewProjection;

			//全局变换矩阵
			this.sceneTransformMatrix.copyFrom(sceneTransform);

			//投影矩阵
			this.worldProjectionMatrix.copyFrom(projectionmatrix);

			//法线全局变换矩阵
			this.normalSceneMatrix.copyFrom(sceneTransform);

			//物体投影变换矩阵
			this.modelViewProjection.identity();
			this.modelViewProjection.append(sceneTransform);
			this.modelViewProjection.append(projectionmatrix);

			//摄像机世界坐标
			this.cameraPosition[0] = camera.scenePosition.x;
			this.cameraPosition[1] = camera.scenePosition.y;
			this.cameraPosition[2] = camera.scenePosition.z;
			this.cameraPosition[3] = 1;

			_methodSetup.setRenderState(renderable, camera);
		}

		/**
		 * 更新摄像机坐标缓冲
		 * @param cameraPositionBuffer		摄像机坐标缓冲
		 */
		protected updateCameraPositionBuffer(cameraPositionBuffer:VCVectorBuffer)
		{
			cameraPositionBuffer.update(this.cameraPosition);
		}

		/**
		 * 更新通用缓冲
		 * @param commonsDataBuffer		通用缓冲
		 */
		protected updateCommonsDataBuffer(commonsDataBuffer:FCVectorBuffer)
		{
			commonsDataBuffer.update(this.commonsData);
		}

		/**
		 * 更新投影矩阵缓冲
		 * @param projectionBuffer		投影矩阵缓冲
		 */
		protected updateProjectionBuffer(projectionBuffer:VCMatrixBuffer)
		{
			projectionBuffer.update(this.modelViewProjection, true);
		}

		/**
		 * 更新摄像机投影矩阵缓冲
		 * @param cameraProjectionMatrixBuffer		摄像机投影矩阵缓冲
		 */
		protected updateWordProjectionMatrixBuffer(worldProjectionMatrixBuffer:VCMatrixBuffer)
		{
			worldProjectionMatrixBuffer.update(this.worldProjectionMatrix, true);
		}

		/**
		 * 更新场景变换矩阵缓冲
		 * @param sceneTransformMatrixBuffer		场景变换矩阵缓冲
		 */
		protected updateSceneTransformMatrixBuffer(sceneTransformMatrixBuffer:VCMatrixBuffer)
		{
			sceneTransformMatrixBuffer.update(this.sceneTransformMatrix, true);
		}

		/**
		 * 更新法线场景变换矩阵缓冲
		 * @param normalSceneMatrixBuffer			法线场景变换矩阵缓冲
		 */
		protected updateSceneNormalMatrixBuffer(normalSceneMatrixBuffer:VCMatrixBuffer)
		{
			normalSceneMatrixBuffer.update(this.normalSceneMatrix, true);
		}

		/**
		 * @inheritDoc
		 */
		public updateProgramBuffer(programBuffer:ProgramBuffer)
		{
			this.reset();
			super.updateProgramBuffer(programBuffer);
		}

		/**
		 * 重置编译通道
		 */
		private reset()
		{
			this.initConstantData();
		}

		/**
		 * 初始化常量数据
		 */
		private initConstantData()
		{
			this.updateMethodConstants();
		}

		/**
		 * 更新函数常量数据
		 */
		protected updateMethodConstants()
		{
			_methodSetup.initConstants();
		}

		/**
		 * 漫反射方法，默认为BasicDiffuseMethod
		 */
		public get diffuseMethod():BasicDiffuseMethod
		{
			return _methodSetup.diffuseMethod;
		}

		public set diffuseMethod(value:BasicDiffuseMethod)
		{
			_methodSetup.diffuseMethod = value;
		}

		/**
		 * 镜面反射方法，默认为BasicSpecularMethod
		 */
		public get specularMethod():BasicSpecularMethod
		{
			return _methodSetup.specularMethod;
		}

		public set specularMethod(value:BasicSpecularMethod)
		{
			_methodSetup.specularMethod = value;
		}

		/**
		 * 环境光方法，默认为BasicAmbientMethod
		 */
		public get ambientMethod():BasicAmbientMethod
		{
			return _methodSetup.ambientMethod;
		}

		public set ambientMethod(value:BasicAmbientMethod)
		{
			_methodSetup.ambientMethod = value;
		}

		/**
		 * 法线函数，默认为BasicNormalMethod
		 */
		public get normalMethod():BasicNormalMethod
		{
			return _methodSetup.normalMethod;
		}

		public set normalMethod(value:BasicNormalMethod)
		{
			_methodSetup.normalMethod = value;
		}

		/**
		 * 是否开启灯光衰减，可以提高灯光渲染性能与真实性
		 */
		public get enableLightFallOff():boolean
		{
			return _enableLightFallOff;
		}

		public set enableLightFallOff(value:boolean)
		{
			if (value != _enableLightFallOff)
				invalidateShaderProgram();
			_enableLightFallOff = value;
		}

		/**
		 * 处理渲染失效事件
		 */
		private onShaderInvalidated(event:ShadingMethodEvent)
		{
			var oldPasses:MaterialPassBase[] = this._passes;
			this._passes = new MaterialPassBase[]();

			if (_methodSetup)
				this.addPassesFromMethods();



			this.invalidateShaderProgram();
		}

		/**
		 * Adds any possible passes needed by the used methods.
		 */
		protected addPassesFromMethods()
		{
			if (_methodSetup.normalMethod && _methodSetup.normalMethod.hasOutput)
				this.addPasses(_methodSetup.normalMethod.passes);
			if (_methodSetup.ambientMethod)
				this.addPasses(_methodSetup.ambientMethod.passes);
			if (_methodSetup.shadowMethod)
				this.addPasses(_methodSetup.shadowMethod.passes);
			if (_methodSetup.diffuseMethod)
				this.addPasses(_methodSetup.diffuseMethod.passes);
			if (_methodSetup.specularMethod)
				this.addPasses(_methodSetup.specularMethod.passes);
		}

		/**
		 * Adds internal passes to the material.
		 *
		 * @param passes The passes to add.
		 */
		protected addPasses(passes:MaterialPassBase[])
		{
			if (!passes)
				return;

			var len:number = passes.length;

			for (var i:number = 0; i < len; ++i)
			{
				passes[i].material = this.material;
				passes[i].lightPicker = _lightPicker;
				this._passes.push(passes[i]);
			}
		}

		/**
		 * 更新灯光常数数据
		 */
		protected updateLightConstants()
		{
		}

		/**
		 * 阴影映射函数
		 */
		public get shadowMethod():ShadowMapMethodBase
		{
			return _methodSetup.shadowMethod;
		}

		public set shadowMethod(value:ShadowMapMethodBase)
		{
			_methodSetup.shadowMethod = value;
		}
	}
}
