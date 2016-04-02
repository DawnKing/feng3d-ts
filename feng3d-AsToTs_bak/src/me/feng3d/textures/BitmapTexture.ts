module feng3d
{
	
	
	

	/**
	 * 位图纹理
	 * @author feng 2014-3-24
	 */
	export class BitmapTexture extends Texture2DBase
	{
		private _bitmapData:BitmapData;
		private _mipMapHolder:BitmapData;
		private _generateMipmaps:boolean;

		public BitmapTexture(bitmapData:BitmapData, generateMipmaps:boolean = true)
		{
			super();
			this.bitmapData = bitmapData;
			this._generateMipmaps = generateMipmaps;
		}

		public get bitmapData():BitmapData
		{
			return _bitmapData;
		}

		public set bitmapData(value:BitmapData)
		{
			if (value == _bitmapData)
				return;
			
			if (!TextureUtils.isBitmapDataValid(value))
				throw new Error("Invalid bitmapData: Width and height must be power of 2 and cannot exceed 2048");
			
			invalidateContent();
			setSize(value.width, value.height);
			
			_bitmapData = value;
		}

		public get generateMipmaps():boolean
		{
			return _generateMipmaps;
		}

		public set generateMipmaps(value:boolean)
		{
			_generateMipmaps = value;
		}

		public get mipMapHolder():BitmapData
		{
			return _mipMapHolder;
		}

		public set mipMapHolder(value:BitmapData)
		{
			_mipMapHolder = value;
		}


	}
}
