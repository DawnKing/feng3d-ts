module feng3d
{

	/**
	 * 3D环境缓冲编号集合
	 * @author feng 2015-7-21
	 */
	public dynamic class Context3DBufferID
	{
		private static _instance:Context3DBufferID;

		/**
		 * 创建3D环境缓冲编号集合
		 */
		public Context3DBufferID()
		{
		}

		public static get instance():Context3DBufferID
		{
			return null._instance ||= new Context3DBufferID();
		}
	}
}
