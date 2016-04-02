module feng3d
{
	
	/**
	 * 
	 * @author feng 2014-5-19
	 */
	export class ColorMultiPassMaterial extends MultiPassMaterialBase
	{
		private _ambientColor:number = 0xffffff;
		private _specularColor:number = 0xffffff;
		private _specular:number = 1;
		
		constructor(color:number = 0xcccccc)
		{
			super();
		}

		public get ambientColor():number
		{
			return _ambientColor;
		}

		public set ambientColor(value:number)
		{
			_ambientColor = value;
		}

		public get specularColor():number
		{
			return _specularColor;
		}

		public set specularColor(value:number)
		{
			_specularColor = value;
		}

		public get specular():number
		{
			return _specular;
		}

		public set specular(value:number)
		{
			_specular = value;
		}


	}
}