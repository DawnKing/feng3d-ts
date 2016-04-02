module feng3d
{
	
	
	

	
	

	

	/**
	 * The Stage3DManager class provides a multiton object that handles management for Stage3D objects. Stage3D objects
	 * should not be requested directly, but are exposed by a Stage3DProxy.
	 *
	 * @see away3d.core.managers.Stage3DProxy
	 */
	export class Stage3DManager
	{
		private static _instances:Dictionary;
		private static _stageProxies:Stage3DProxy[];
		private static _numStageProxies:number = 0;

		private _stage:Stage;

		/**
		 * Creates a new Stage3DManager class.
		 * @param stage The Stage object that contains the Stage3D objects to be managed.
		 * @private
		 */
		constructor(stage:Stage, Stage3DManagerSingletonEnforcer:Stage3DManagerSingletonEnforcer)
		{
			if (!Stage3DManagerSingletonEnforcer)
				throw new Error("This class is a multiton and cannot be instantiated manually. Use Stage3DManager.getInstance instead.");
			this._stage = stage;

			if (!_stageProxies)
				_stageProxies = new Stage3DProxy[](this._stage.stage3Ds.length, true);
		}

		/**
		 * Gets a Stage3DManager instance for the given Stage object.
		 * @param stage The Stage object that contains the Stage3D objects to be managed.
		 * @return The Stage3DManager instance for the given Stage object.
		 */
		public static getInstance(stage:Stage):Stage3DManager
		{
			return (_instances ||= new Dictionary())[stage] ||= new Stage3DManager(stage, new Stage3DManagerSingletonEnforcer());
		}

		/**
		 * Requests the Stage3DProxy for the given index.
		 * @param index The index of the requested Stage3D.
		 * @param forceSoftware Whether to force software mode even if hardware acceleration is available.
		 * @param profile The compatibility profile, an enumeration of Context3DProfile
		 * @return The Stage3DProxy for the given index.
		 */
		public getStage3DProxy(index:number, forceSoftware:boolean = false, profile:string = "baseline"):Stage3DProxy
		{
			if (!_stageProxies[index])
			{
				_numStageProxies++;
				_stageProxies[index] = new Stage3DProxy(index, this._stage.stage3Ds[index], this, forceSoftware, profile);
			}

			return _stageProxies[index];
		}

		/**
		 * Removes a Stage3DProxy from the manager.
		 * @param stage3DProxy
		 * @private
		 */
		public removeStage3DProxy(stage3DProxy:Stage3DProxy)
		{
			_numStageProxies--;
			_stageProxies[stage3DProxy.stage3DIndex] = null;
		}

		/**
		 * Get the next available stage3DProxy. An error is thrown if there are no Stage3DProxies available
		 * @param forceSoftware Whether to force software mode even if hardware acceleration is available.
		 * @param profile The compatibility profile, an enumeration of Context3DProfile
		 * @return The allocated stage3DProxy
		 */
		public getFreeStage3DProxy(forceSoftware:boolean = false, profile:string = Context3DProfile.STANDARD):Stage3DProxy
		{
			var i:number;
			var len:number = _stageProxies.length;

			while (i < len)
			{
				if (!_stageProxies[i])
				{
					this.getStage3DProxy(i, forceSoftware, profile);
					_stageProxies[i].width = this._stage.stageWidth;
					_stageProxies[i].height = this._stage.stageHeight;
					return _stageProxies[i];
				}
				++i;
			}

			throw new Error("Too many Stage3D instances used!");
			return null;
		}

		/**
		 * Checks if a new stage3DProxy can be created and managed by the class.
		 * @return true if there is one slot free for a new stage3DProxy
		 */
		public get hasFreeStage3DProxy():boolean
		{
			return _numStageProxies < _stageProxies.length ? true : false;
		}

		/**
		 * Returns the amount of stage3DProxy objects that can be created and managed by the class
		 * @return the amount of free slots
		 */
		public get numProxySlotsFree():number
		{
			return _stageProxies.length - _numStageProxies;
		}

		/**
		 * Returns the amount of Stage3DProxy objects currently managed by the class.
		 * @return the amount of slots used
		 */
		public get numProxySlotsUsed():number
		{
			return _numStageProxies;
		}

		/**
		 * Returns the maximum amount of Stage3DProxy objects that can be managed by the class
		 * @return the maximum amount of Stage3DProxy objects that can be managed by the class
		 */
		public get numProxySlotsTotal():number
		{
			return _stageProxies.length;
		}
	}

}

class Stage3DManagerSingletonEnforcer
{
}
