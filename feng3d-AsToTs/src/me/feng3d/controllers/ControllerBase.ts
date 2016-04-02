module feng3d
{
	
	
	
	

	

	/**
	 * 控制器
	 * @author feng 2014-10-10
	 */
	export class ControllerBase
	{
		protected _autoUpdate:boolean = true;
		protected _targetObject:Entity;

		/**
		 * 创建控制器
		 * @param targetObject 被控制对象
		 */
		constructor(targetObject:Entity = null)
		{
			this.targetObject = targetObject;

			AbstractClassError.check(this);
		}

		/**
		 * 被控制对象
		 */
		public get targetObject():Entity
		{
			return _targetObject;
		}

		public set targetObject(val:Entity)
		{
			if (_targetObject == val)
				return;

			if (_targetObject && _autoUpdate)
				_targetObject._controller = null;

			_targetObject = val;

			if (_targetObject && _autoUpdate)
				_targetObject._controller = this;

			notifyUpdate();
		}

		/**
		 * 通知被控制对象更新
		 */
		protected notifyUpdate()
		{
			this.update();
			//
			if (this._targetObject && this._targetObject.implicitPartition && this._autoUpdate)
				this._targetObject.implicitPartition.markForUpdate(this._targetObject);
		}

		/**
		 * 更新被控制对象状态
		 */
		public update()
		{
			throw new AbstractMethodError();
		}
	}
}
