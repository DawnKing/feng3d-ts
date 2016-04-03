module feng3d
{
	

	
	
	
	
	
	
	
	
	
	

	

	/**
	 * 单通道纹理
	 * @author feng 2014-6-5
	 */
	export class SinglePassMaterialBase extends MaterialBase
	{
		protected _screenPass:SuperShaderPass;
		private _alphaBlending:boolean;

		/**
		 * 创建一个单通道纹理
		 */
		constructor()
		{
			super();
			addPass(this._screenPass = new SuperShaderPass());
		}

		/**
		 * The number of "effect" methods added to the material.
		 */
		public get numMethods():number
		{
			return _screenPass.numMethods;
		}

		/**
		 * @inheritDoc
		 */
		public set blendMode(value:string)
		{
			super.blendMode = value;
			_screenPass.setBlendMode(blendMode == BlendMode.NORMAL && requiresBlending ? BlendMode.LAYER : blendMode);
		}

		/**
		 * @inheritDoc
		 */
		public get requiresBlending():boolean
		{
			return super.requiresBlending || _alphaBlending;
		}

		/**
		 * The minimum alpha value for which pixels should be drawn. This is used for transparency that is either
		 * invisible or entirely opaque, often used with textures for foliage, etc.
		 * Recommended values are 0 to disable alpha, or 0.5 to create smooth edges. Default value is 0 (disabled).
		 */
		public get alphaThreshold():number
		{
			return _screenPass.diffuseMethod.alphaThreshold;
		}

		public set alphaThreshold(value:number)
		{
			_screenPass.diffuseMethod.alphaThreshold = value;
		}

		/**
		 * 环境光反射颜色
		 */
		public get ambientColor():number
		{
			return _screenPass.ambientMethod.ambientColor;
		}

		public set ambientColor(value:number)
		{
			_screenPass.ambientMethod.ambientColor = value;
		}

		/**
		 * 镜面反射光反射颜色
		 */
		public get specularColor():number
		{
			return _screenPass.specularMethod.specularColor;
		}

		public set specularColor(value:number)
		{
			_screenPass.specularMethod.specularColor = value;
		}

		/**
		 * 镜面反射光反射强度
		 */
		public get specular():number
		{
			return _screenPass.specularMethod ? _screenPass.specularMethod.specular : 0;
		}

		public set specular(value:number)
		{
			if (_screenPass.specularMethod)
				_screenPass.specularMethod.specular = value;
		}

		/**
		 * 环境光反射强度
		 */
		public get ambient():number
		{
			return _screenPass.ambientMethod.ambient;
		}

		public set ambient(value:number)
		{
			_screenPass.ambientMethod.ambient = value;
		}

		/**
		 * 是否透明度混合
		 */
		public get alphaBlending():boolean
		{
			return _alphaBlending;
		}

		public set alphaBlending(value:boolean)
		{
			_alphaBlending = value;
			_screenPass.setBlendMode(blendMode == BlendMode.NORMAL && requiresBlending ? BlendMode.LAYER : blendMode);
//			_screenPass.preserveAlpha = requiresBlending;
		}

		/**
		 * 漫反射函数
		 */
		public get diffuseMethod():BasicDiffuseMethod
		{
			return _screenPass.diffuseMethod;
		}

		public set diffuseMethod(value:BasicDiffuseMethod)
		{
			_screenPass.diffuseMethod = value;
		}

		/**
		 * The method used to generate the per-pixel normals. Defaults to BasicNormalMethod.
		 */
		public get normalMethod():BasicNormalMethod
		{
			return _screenPass.normalMethod;
		}

		public set normalMethod(value:BasicNormalMethod)
		{
			_screenPass.normalMethod = value;
		}

		/**
		 * 环境光函数
		 */
		public get ambientMethod():BasicAmbientMethod
		{
			return _screenPass.ambientMethod;
		}

		public set ambientMethod(value:BasicAmbientMethod)
		{
			_screenPass.ambientMethod = value;
		}

		/**
		 * 镜面反射函数
		 */
		public get specularMethod():BasicSpecularMethod
		{
			return _screenPass.specularMethod;
		}

		public set specularMethod(value:BasicSpecularMethod)
		{
			_screenPass.specularMethod = value;
		}

		/**
		 * 法线贴图
		 */
		public get normalMap():Texture2DBase
		{
			return _screenPass.normalMethod.normalMap;
		}

		public set normalMap(value:Texture2DBase)
		{
			_screenPass.normalMethod.normalMap = value;
		}

		/**
		 * 镜面反射光泽图
		 */
		public get specularMap():Texture2DBase
		{
			return _screenPass.specularMethod.texture;
		}

		public set specularMap(value:Texture2DBase)
		{
			if (_screenPass.specularMethod)
				_screenPass.specularMethod.texture = value;
			else
				throw new Error("No specular method was set to assign the specularGlossMap to");
		}

		/**
		 * 高光值
		 */
		public get gloss():number
		{
			return _screenPass.specularMethod ? _screenPass.specularMethod.gloss : 0;
		}

		public set gloss(value:number)
		{
			if (_screenPass.specularMethod)
				_screenPass.specularMethod.gloss = value;
		}

		/**
		 * 阴影映射函数
		 */
		public get shadowMethod():ShadowMapMethodBase
		{
			return _screenPass.shadowMethod;
		}

		public set shadowMethod(value:ShadowMapMethodBase)
		{
			_screenPass.shadowMethod = value;
		}

		/**
		 * @inheritDoc
		 */
		public set lightPicker(value:LightPickerBase)
		{
			super.lightPicker = value;
			_screenPass.lightPicker = value;
		}

		/**
		 * 添加特效函数
		 * @param method		特效函数
		 */
		public addMethod(method:EffectMethodBase)
		{
			this._screenPass.addMethod(method);
		}
	}
}
