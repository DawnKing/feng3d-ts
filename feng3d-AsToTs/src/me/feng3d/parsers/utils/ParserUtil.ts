module feng3d
{
	

	/**
	 * 解析工具类
	 */
	export class ParserUtil
	{
		/**
		 * 把数据转换为二进制
		 * @param data 数据
		 * @return
		 *
		 */
		public static function toByteArray(data:*):ByteArray
		{
			if (data is Class)
				data = new data();

			if (data is ByteArray)
				return data;
			else
				return null;
		}

		/**
		 * 把数据转换为字符串
		 * @param data 数据
		 * @param length 需要转换的长度
		 * @return
		 */
		public static function toString(data:*, length:number = 0):string
		{
			var ba:ByteArray;

			length ||= uint.MAX_VALUE;

			if (data is String)
				return String(data).substr(0, length);

			ba = toByteArray(data);
			if (ba)
			{
				ba.position = 0;
				return ba.readUTFBytes(Math.min(ba.bytesAvailable, length));
			}

			return null;
		}
	}
}
