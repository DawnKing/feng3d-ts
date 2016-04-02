module feng3d
{
	

	/**
	 * 颜色材质
	 * @author feng 2014-4-15
	 */
	export class ColorMaterial extends SinglePassMaterialBase
	{
		private _diffuseAlpha:number = 1;

		constructor(color:number = 0xcccccc, alpha:number = 1)
		{
			super();
			this.color = color;
			this.alpha = alpha;
		}

		/**
		 * 透明度
		 */
		public get alpha():number
		{
			return _screenPass.diffuseMethod.diffuseAlpha;
		}

		public set alpha(value:number)
		{
			if (value > 1)
				value = 1;
			else if (value < 0)
				value = 0;
			_screenPass.diffuseMethod.diffuseAlpha = _diffuseAlpha = value;
			_screenPass.setBlendMode(blendMode == BlendMode.NORMAL && requiresBlending ? BlendMode.LAYER : blendMode);
		}

		/**
		 * 颜色
		 */
		public get color():number
		{
			return _screenPass.diffuseMethod.diffuseColor;
		}

		public set color(value:number)
		{
			_screenPass.diffuseMethod.diffuseColor = value;
		}
		
		public get requiresBlending():boolean
		{
			return super.requiresBlending || _diffuseAlpha < 1;
		}
	}
}
