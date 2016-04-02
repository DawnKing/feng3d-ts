module feng3d
{

	/**
	 * 3D环境缓冲编号集合
	 * @author feng 2015-7-21
	 */
	public dynamic class Context3DBufferID
	{
		private static var _instance:Context3DBufferID;

		/**
		 * 创建3D环境缓冲编号集合
		 */
		constructor()
		{
		}

		public static function get instance():Context3DBufferID
		{
			return _instance ||= new Context3DBufferID();
		}
	}
}
