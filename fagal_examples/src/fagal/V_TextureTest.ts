module feng3d
{
	
	
	
	
	
	
	/**
	 * 
	 * @author cdz 2015-11-9
	 */
	export class V_TextureTest extends FagalMethod
	{
		constructor()
		{
            super();
			this._shaderType = Context3DProgramType.VERTEX;
		}
		
		public runFunc()
		{
			var _ = FagalRE.instance.space;
			
			_.comment("应用投影矩阵", _.projection_vc_matrix, "使世界坐标", _.position_va_3, "转换为投影坐标 并输出到顶点寄存器", _._op);
			_.m44(_._op, _.position_va_3, _.projection_vc_matrix);
			
			_.comment("传递顶点uv数据", _.uv_va_2, "到变量寄存器", _.uv_v);
			_.mov(_.uv_v, _.uv_va_2);
		}
	}
}