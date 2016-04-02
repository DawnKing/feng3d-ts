module feng3d
{
	
	
	

	

	/**
	 * 携带数据的事件，该类为自定义事件基类
	 * @author feng 2014-5-7
	 */
	export class FEvent extends Event
	{
		private _data:*;

		/**
		 * 创建一个作为参数传递给事件侦听器的 Event 对象.
		 * @param type 					事件的类型，可以作为 Event.type 访问。
		 * @param data					事件携带的数据
		 * @param bubbles 				确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
		 * @param cancelable 			确定是否可以取消 Event 对象。默认值为 false。
		 */
		constructor(type:string, data:* = null, bubbles:boolean = false, cancelable:boolean = false)
		{
			this._data = data;
			super(type, bubbles, cancelable);
		}

		/**
		 * 返回一个字符串，其中包含 Event 对象的所有属性.
		 * <p>字符串的格式如下：</p>
		 * <p>[Event type=value bubbles=value cancelable=value]</p>
		 */
		public toString():string
		{
			return formatString("[{0} this.type=\"{1}\" this.bubbles={2}  this.cancelable={3}]", getQualifiedClassName(this).split("::").pop(), this.type, this.bubbles, this.cancelable);
		}

		/**
		 * 事件携带的自定义数据
		 */
		public get data():*
		{
			return _data;
		}

		/**
		 * @private
		 */
		public set data(value:*)
		{
			_data = value;
		}

		/**
		 * 复制 Event 子类的实例.
		 * <p>返回一个新的 Event 对象，它是 Event 对象的原始实例的副本。通常您不需要调用 clone()；当您重新调度事件，即调用 dispatchEvent(event)（从正在处理 event 的处理函数）时，EventDispatcher 类会自动调用它。</p>
		 */
		public clone():Event
		{
			var className:string = getQualifiedClassName(this);
			var cls:Class = getDefinitionByName(className) as Class;
			return new cls(this.type, this.data, this.bubbles, this.cancelable);
		}
	}
}
