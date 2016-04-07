module feng3d
{
	

	
	
	
	

	/**
	 * 输出颜色贴图
	 * @author feng 2014-10-24
	 */
	export class V_colorMap extends FagalMethod
	{
		constructor()
		{
			_shaderType = Context3DProgramType.VERTEX;
		}

		public runFunc()
		{
			var _ = FagalRE.instance.space;

			//公用数据片段常量数据
			_.comment("传递顶点颜色数据", _.color_va_3, "到变量寄存器", _.color_v);
			_.mov(_.color_v, _.color_va_3);

			var uvTemp:Register = _.getFreeTemp("临时uv数据");
			_.mov(uvTemp, _.uv_va_2);
			_.mul(uvTemp.xy, uvTemp.xy, _.commonsData_vc_vector.x);
			_.sub(uvTemp.xy, uvTemp.xy, _.commonsData_vc_vector.yy);

			//把uv 作为坐标输出
			_.mov(_._op, uvTemp);
		}
	}
}


