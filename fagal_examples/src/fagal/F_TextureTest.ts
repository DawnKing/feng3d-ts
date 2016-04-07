module feng3d
{
	
	
	
	
	
	
	
	/**
	 * 
	 * @author cdz 2015-11-9
	 */
	export class F_TextureTest extends FagalMethod
	{
		constructor()
		{
			_shaderType = Context3DProgramType.FRAGMENT;
		}
		
		public runFunc()
		{
			var _ = FagalRE.instance.space;
						
			//最终颜色寄存器（输出到oc寄存器的颜色）
			var finalColorReg:Register = _.getFreeTemp("最终颜色寄存器（输出到oc寄存器的颜色）");
			var currentColorReg:Register = _.getFreeTemp("当前纹理颜色值");

			_.tex(currentColorReg, _.uv_v, _.texture_fs); // 使用地面纹理 得到该纹理颜色值

			_.mov(finalColorReg, currentColorReg);
			
			_.mov(_._oc, finalColorReg);
		}
	}
}