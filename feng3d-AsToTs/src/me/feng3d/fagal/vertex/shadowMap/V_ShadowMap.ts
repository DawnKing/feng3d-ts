module feng3dMap
{
	
	
	

	/**
	 * 编译阴影映射顶点程序
	 * @author feng 2015-6-23
	 */
	constructor()
	{
		var shaderParams:ShaderParams = FagalRE.instance.context3DCache.shaderParams;
		var shadowShaderParams:ShadowShaderParams = shaderParams.getOrCreateComponentByClass(ShadowShaderParams);

		shadowShaderParams.usePoint > 0 ? V_ShadowMapPoint() : V_ShadowMapPlanar();
	}
}
