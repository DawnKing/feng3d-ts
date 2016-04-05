package
{
	

	/**
	 * 生成日志
	 * <p>此处使用CommonDebug.loggerFunc方法输出日志</p>
	 * @see	me.feng.debug.CommonDebug
	 */
	public logger(... args)
	{
		if (DebugCommon.loggerFunc != null)
			DebugCommon.loggerFunc.apply(null, args);
	}
}
