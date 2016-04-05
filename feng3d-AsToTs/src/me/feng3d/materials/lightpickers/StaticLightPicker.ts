module feng3d
{
	

	
	
	

	/**
	 * 灯光采集器
	 * @author feng 2014-9-11
	 */
	export class StaticLightPicker extends LightPickerBase
	{
		private _lights;

		constructor(lights)
		{
			this.lights = lights;
		}

		/**
		 * 需要渲染的灯光
		 */
		public get lights()
		{
			return this._lights;
		}

		public set lights(value)
		{
			var numPointLights:number = 0;
			var numDirectionalLights:number = 0;
			var light:LightBase;

			this._lights = value;

			this._directionalLights = [];
			this._pointLights = [];

			//灯光分类
			var len:number = value.length;
			for (var i:number = 0; i < len; ++i)
			{
				light = value[i];
				if (light is PointLight)
				{
					this._pointLights[numPointLights++] = PointLight(light);
				}
				else if (light is DirectionalLight)
				{
					this._directionalLights[numDirectionalLights++] = DirectionalLight(light);
				}
			}

			this._numDirectionalLights = numDirectionalLights;
			this._numPointLights = numPointLights;

			this.dispatchEvent(new Event(Event.CHANGE));
		}

	}
}
