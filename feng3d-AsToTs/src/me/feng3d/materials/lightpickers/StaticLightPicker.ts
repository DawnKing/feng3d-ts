module feng3d
{
	

	
	
	

	/**
	 * 灯光采集器
	 * @author feng 2014-9-11
	 */
	export class StaticLightPicker extends LightPickerBase
	{
		private _lights:Array;

		constructor(lights:Array)
		{
			this.lights = lights;
		}

		/**
		 * 需要渲染的灯光
		 */
		public get lights():Array
		{
			return _lights;
		}

		public set lights(value:Array)
		{
			var numPointLights:number = 0;
			var numDirectionalLights:number = 0;
			var light:LightBase;

			_lights = value;

			_directionalLights = new DirectionalLight[]();
			_pointLights = new PointLight[]();

			//灯光分类
			var len:number = value.length;
			for (var i:number = 0; i < len; ++i)
			{
				light = value[i];
				if (light is PointLight)
				{
					_pointLights[numPointLights++] = PointLight(light);
				}
				else if (light is DirectionalLight)
				{
					_directionalLights[numDirectionalLights++] = DirectionalLight(light);
				}
			}

			_numDirectionalLights = numDirectionalLights;
			_numPointLights = numPointLights;

			dispatchEvent(new Event(Event.CHANGE));
		}

	}
}
