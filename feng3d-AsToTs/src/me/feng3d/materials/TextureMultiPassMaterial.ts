module feng3d
{
	
	
	
	
	
	/**
	 * 
	 * @author feng 2014-5-19
	 */
	export class TextureMultiPassMaterial extends MultiPassMaterialBase
	{
		private _ambientColor:number = 0xffffff;
		private _specularMethod:BasicSpecularMethod = new BasicSpecularMethod();
		private _normalMethod:BasicNormalMethod = new BasicNormalMethod();
		
		public TextureMultiPassMaterial(texture:Texture2DBase = null, smooth:boolean = true, repeat:boolean = false, mipmap:boolean = true)
		{
			super();
			this.texture = texture;
		}

		public get ambientColor():number
		{
			return _ambientColor;
		}

		public set ambientColor(value:number)
		{
			_ambientColor = value;
		}

		public get specularMethod():BasicSpecularMethod
		{
			return _specularMethod;
		}

		public set specularMethod(value:BasicSpecularMethod)
		{
			_specularMethod = value;
		}

		/**
		 * The normal map to modulate the direction of the surface for each texel. The default normal method expects
		 * tangent-space normal maps, but others could expect object-space maps.
		 */
		public get normalMap():Texture2DBase
		{
			return _normalMethod.normalMap;
		}
		
		public set normalMap(value:Texture2DBase)
		{
			_normalMethod.normalMap = value;
		}
		
		/**
		 * 高光贴图
		 * 
		 * A specular map that defines the strength of specular reflections for each texel in the red channel,
		 * and the gloss factor in the green channel. You can use SpecularBitmapTexture if you want to easily set
		 * specular and gloss maps from grayscale images, but correctly authored images are preferred.
		 */
		public get specularMap():Texture2DBase
		{
			return _specularMethod.texture;
		}
		
		public set specularMap(value:Texture2DBase)
		{
			_specularMethod.texture = value;
		}
		
		/**
		 * The overall strength of the specular reflection.
		 */
		public get specular():number
		{
			return _specularMethod? _specularMethod.specular : 0;
		}
		
		public set specular(value:number)
		{
			if (_specularMethod)
				_specularMethod.specular = value;
		}
		
	}
}