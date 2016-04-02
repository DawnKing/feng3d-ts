module feng3d
{
	
	
	
	
	
	
	
	/**
	 * MipmapGenerator is a helper class that uploads BitmapData to a Texture including mipmap levels.
	 */
	export class MipmapGenerator
	{
		private static var _matrix:Matrix = new Matrix();
		private static var _rect:Rectangle = new Rectangle();
		
		/**
		 * Uploads a BitmapData with mip maps to a target Texture object.
		 * @param source The source BitmapData to upload.
		 * @param target The target Texture to upload to.
		 * @param mipmap An optional mip map holder to avoids creating new instances for fe animated materials.
		 * @param alpha Indicate whether or not the uploaded bitmapData is transparent.
		 */
		public static generateMipMaps(source:BitmapData, target:TextureBase, mipmap:BitmapData = null, alpha:boolean = false, side:number = -1)
		{
			var w:number = source.width,
				h:number = source.height;
			var i:number;
			var regen:boolean = mipmap != null;
			mipmap ||= new BitmapData(w, h, alpha);
			
			_rect.width = w;
			_rect.height = h;
			
			while (w >= 1 || h >= 1) {
				if (alpha)
					mipmap.fillRect(_rect, 0);
				
				_matrix.a = _rect.width/source.width;
				_matrix.d = _rect.height/source.height;
				
				mipmap.draw(source, _matrix, null, null, null, true);
				
				if (target is Texture)
					Texture(target).uploadFromBitmapData(mipmap, i++);
				else
					CubeTexture(target).uploadFromBitmapData(mipmap, side, i++);
				
				w >>= 1;
				h >>= 1;
				
				_rect.width = w > 1? w : 1;
				_rect.height = h > 1? h : 1;
			}
			
			if (!regen)
				mipmap.dispose();
		}
	}
}
