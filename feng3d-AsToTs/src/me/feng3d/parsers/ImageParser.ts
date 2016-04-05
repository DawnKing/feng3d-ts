module feng3d
{
	
	
	
	

	
	

	

	/**
	 * ImageParser provides a "parser" for natively supported image types (jpg, png). While it simply loads bytes into
	 * a loader object, it wraps it in a BitmapDataResource so resource management can happen consistently without
	 * exception cases.
	 */
	export class ImageParser extends ParserBase
	{
		private _byteData:ByteArray;
		private _startedParsing:boolean;
		private _doneParsing:boolean;
		private _loader:Loader;

		/**
		 * Creates a new ImageParser object.
		 * @param uri The url or id of the data or file to be parsed.
		 * @param extra The holder for extra contextual data that the parser might need.
		 */
		constructor()
		{
			super(ParserDataFormat.BINARY);
		}

		/**
		 * Indicates whether or not a given file extension is supported by the parser.
		 * @param extension The file extension of a potential file to be parsed.
		 * @return Whether or not the given file type is supported.
		 */

		public static supportsType(extension:string):boolean
		{
			extension = extension.toLowerCase();
			return extension == "jpg" || extension == "jpeg" || extension == "png" || extension == "gif" || extension == "bmp" || extension == "atf";
		}

		/**
		 * Tests whether a data block can be parsed by the parser.
		 * @param data The data block to potentially be parsed.
		 * @return Whether or not the given data is supported.
		 */
		public static supportsData(data):boolean
		{
			//shortcut if asset is IFlexAsset
			if (data is Bitmap)
				return true;

			if (data is BitmapData)
				return true;

			if (!(data is ByteArray))
				return false;

			var ba:ByteArray = data as ByteArray;
			ba.position = 0;
			if (ba.readUnsignedShort() == 0xffd8)
				return true; // JPEG, maybe check for "JFIF" as well?

			ba.position = 0;
			if (ba.readShort() == 0x424D)
				return true; // BMP

			ba.position = 1;
			if (ba.readUTFBytes(3) == 'PNG')
				return true;

			ba.position = 0;
			if (ba.readUTFBytes(3) == 'GIF' && ba.readShort() == 0x3839 && ba.readByte() == 0x61)
				return true;

			ba.position = 0;
			if (ba.readUTFBytes(3) == 'ATF')
				return true;

			return false;
		}

		/**
		 * @inheritDoc
		 */
		protected override function proceedParsing():boolean
		{
			var asset;
			if (this._data is Bitmap)
			{
				asset = new BitmapTexture(Bitmap(this._data).bitmapData);
				this.finalizeAsset(asset, this._fileName);
				return PARSING_DONE;
			}

			if (this._data is BitmapData)
			{
				asset = new BitmapTexture(this._data as BitmapData);
				this.finalizeAsset(asset, this._fileName);
				return PARSING_DONE;
			}

			return this._doneParsing;
		}
	}
}
