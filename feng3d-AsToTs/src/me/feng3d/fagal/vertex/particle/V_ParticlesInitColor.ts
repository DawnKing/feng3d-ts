module feng3d
{
	
	

	/**
	 * 粒子颜色初始化
	 * @param particleCommon		粒子常数数据[0,1,2,0]
	 * @param colorMulTarget		粒子颜色乘数因子，用于乘以纹理上的颜色值
	 * @param colorAddTarget		粒子颜色偏移值，在片段渲染的最终颜色值上偏移
	 * @author feng 2015-1-20
	 */
	export function V_ParticlesInitColor(particleCommon, colorMulTarget:Register, colorAddTarget:Register)
	{
		var _ = FagalRE.instance.space;

		//初始化  粒子颜色乘数因子 为(1,1,1,1)
		_.mov(colorMulTarget, particleCommon.y);
		//初始化 粒子颜色偏移值 为(0,0,0,0)
		_.mov(colorAddTarget, particleCommon.x);
	}
}
