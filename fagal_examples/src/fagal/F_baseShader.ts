module feng3d
{
	

	
	

	/**
	 * 基础片段渲染
	 * @author feng 2014-10-24
	 */
	export class F_baseShader extends FagalMethod
	{
		constructor()
		{
            super();
			this._shaderType = Context3DProgramType.FRAGMENT;
		}

		public runFunc()
		{
			var _ = FagalRE.instance.space;

			_.comment("传递顶点颜色数据", _._oc, "到片段寄存器", _.color_v);
			_.mov(_._oc, _.color_v);
		}
	}
}


