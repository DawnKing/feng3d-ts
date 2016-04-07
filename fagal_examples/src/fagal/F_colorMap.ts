module feng3d
{
	

	
	

	/**
	 * 输出颜色贴图
	 * @author feng 2014-10-24
	 */
	export class F_colorMap extends FagalMethod
	{
		constructor()
		{
			_shaderType = Context3DProgramType.FRAGMENT;
		}

		public runFunc()
		{
			var _ = FagalRE.instance.space;

			//颜色输出
			_.mov(_._oc, _.color_v);
		}
	}
}


