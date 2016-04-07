module feng3d
{
	

	
	

	/**
	 * 基础顶点渲染
	 * @author feng 2014-10-24
	 */
	export class V_baseShader extends FagalMethod
	{
		constructor()
		{
			_shaderType = Context3DProgramType.VERTEX;
		}

		public runFunc()
		{
			var _ = FagalRE.instance.space;

			_.comment("应用投影矩阵", _.projection_vc_matrix, "使世界坐标", _.position_va_3, "转换为投影坐标 并输出到顶点寄存器", _._op);
			_.m44(_._op, _.position_va_3, _.projection_vc_matrix);

			_.comment("传递顶点颜色数据", _.color_va_3, "到变量寄存器", _.color_v);
			_.mov(_.color_v, _.color_va_3);
		}
	}
}


