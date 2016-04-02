module feng3d
{
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

	/**
	 * 当开始播放动画时触发
	 * @eventType me.feng3d.events.AnimatorEvent
	 */
	[Event(name = "start", type = "me.feng3d.events.AnimatorEvent")]

	/**
	 * 当动画停止时触发
	 * @eventType me.feng3d.events.AnimatorEvent
	 */
	[Event(name = "stop", type = "me.feng3d.events.AnimatorEvent")]

	/**
	 * 当动画播放完一次时触发
	 * @eventType me.feng3d.events.AnimatorEvent
	 */
	[Event(name = "cycle_complete", type = "me.feng3d.events.AnimatorEvent")]

	/**
	 * 动画基类
	 * @author feng 2014-5-27
	 */
	export class AnimatorBase extends Component implements IAsset
	{
		private _namedAsset:NamedAsset;
		public context3DBufferOwner:Context3DBufferOwner;

		/** 动画驱动器 */
		private _broadcaster:Sprite = new Sprite();
		/** 是否正在播放动画 */
		private _isPlaying:boolean;
		private _autoUpdate:boolean = true;
		private _time:number;
		/** 播放速度 */
		private _playbackSpeed:number = 1;

		protected _animationSet:IAnimationSet;
		protected _owners:Mesh[] = new Mesh[]();
		protected _activeNode:AnimationNodeBase;
		protected _activeState:IAnimationState;
		protected _activeAnimationName:string;
		/** 当前动画时间 */
		protected _absoluteTime:number;
		private _animationStates:Dictionary = new Dictionary(true);

		/**
		 * 是否更新位置
		 * @see me.feng3d.animators.base.states.IAnimationState#positionDelta
		 */
		public updatePosition:boolean = true;

		/**
		 * 创建一个动画基类
		 * @param animationSet
		 */
		constructor(animationSet:IAnimationSet)
		{
			this._namedAsset = new NamedAsset(this, AssetType.ANIMATOR);
			this.context3DBufferOwner = new Context3DBufferOwner();
			this._animationSet = animationSet;
			this.initBuffers();
		}

		/**
		 * 初始化Context3d缓存
		 */
		protected initBuffers()
		{

		}

		/**
		 * Fagal编号中心
		 */
		public get _():FagalIdCenter
		{
			return FagalIdCenter.instance;
		}

		/**
		 * 获取动画状态
		 * @param node		动画节点
		 * @return			动画状态
		 */
		public getAnimationState(node:AnimationNodeBase):AnimationStateBase
		{
			var className:Class = node.stateClass;

			return this._animationStates[node] ||= new className(this, node);
		}

		/**
		 * 根据名字获取动画状态
		 * @param name			动作名称
		 * @return				动画状态
		 */
		public getAnimationStateByName(name:string):AnimationStateBase
		{
			return this.getAnimationState(this._animationSet.getAnimation(name));
		}


		/**
		 * 绝对时间（游戏时间）
		 * @see #time
		 * @see #playbackSpeed
		 */
		public get absoluteTime():number
		{
			return _absoluteTime;
		}

		/**
		 * 动画设置
		 */
		public get animationSet():IAnimationSet
		{
			return _animationSet;
		}

		/**
		 * 活动的动画状态
		 */
		public get activeState():IAnimationState
		{
			return _activeState;
		}

		/**
		 * 活动的动画节点
		 */
		public get activeAnimation():AnimationNodeBase
		{
			return _animationSet.getAnimation(_activeAnimationName);
		}

		/**
		 * 活动的动作名
		 */
		public get activeAnimationName():string
		{
			return _activeAnimationName;
		}

		/**
		 * 是否自动更新，当值为true时，动画将会随时间播放
		 * @see #time
		 * @see #update()
		 */
		public get autoUpdate():boolean
		{
			return _autoUpdate;
		}

		public set autoUpdate(value:boolean)
		{
			if (_autoUpdate == value)
				return;

			_autoUpdate = value;

			if (_autoUpdate)
				start();
			else
				stop();
		}

		/**
		 * 动画时间
		 */
		public get time():number
		{
			return _time;
		}

		public set time(value:number)
		{
			if (_time == value)
				return;

			update(value);
		}

		/**
		 * 设置当前活动状态的动画剪辑的播放进度(0,1)
		 * @param	播放进度。 0：动画起点，1：动画终点。
		 */
		public phase(value:number)
		{
			this._activeState.phase(value);
		}

		/**
		 * The amount by which passed time should be scaled. Used to slow down or speed up animations. Defaults to 1.
		 */
		/**
		 * 播放速度
		 * <p>默认为1，表示正常速度</p>
		 */
		public get playbackSpeed():number
		{
			return _playbackSpeed;
		}

		public set playbackSpeed(value:number)
		{
			_playbackSpeed = value;
		}

		/**
		 * 开始动画，当自动更新为true时有效
		 * @see #autoUpdate
		 */
		public start()
		{
			if (this._isPlaying || !this._autoUpdate)
				return;

			this._time = this._absoluteTime = getTimer();

			this._isPlaying = true;

			if (!this._broadcaster.hasEventListener(Event.ENTER_FRAME))
				this._broadcaster.addEventListener(Event.ENTER_FRAME, this.onEnterFrame);

			if (!this.hasEventListener(AnimatorEvent.START))
				return;

			this.dispatchEvent(new AnimatorEvent(AnimatorEvent.START, this));
		}


		/**
		 * 暂停播放动画
		 * @see #time
		 * @see #update()
		 */
		public stop()
		{
			if (!this._isPlaying)
				return;

			this._isPlaying = false;

			if (this._broadcaster.hasEventListener(Event.ENTER_FRAME))
				this._broadcaster.removeEventListener(Event.ENTER_FRAME, this.onEnterFrame);

			if (!this.hasEventListener(AnimatorEvent.STOP))
				return;

			this.dispatchEvent(new AnimatorEvent(AnimatorEvent.STOP, this));
		}

		/**
		 * 更新动画
		 * @param time			动画时间
		 *
		 * @see #stop()
		 * @see #autoUpdate
		 */
		public update(time:number)
		{
			var dt:number = (time - this._time) * this.playbackSpeed;

			this.updateDeltaTime(dt);

			this._time = time;
		}

		/**
		 * 重置动画
		 * @param name			动画名称
		 * @param offset		动画时间偏移
		 */
		public reset(name:string, offset:number = 0)
		{
			this.getAnimationState(this._animationSet.getAnimation(name)).offset(offset + this._absoluteTime);
		}

		/**
		 * 添加应用动画的网格
		 * @private
		 */
		public addOwner(mesh:Mesh)
		{
			this._owners.push(mesh);
		}

		/**
		 * 移除应用动画的网格
		 * @private
		 */
		public removeOwner(mesh:Mesh)
		{
			this._owners.splice(this._owners.indexOf(mesh), 1);
		}

		/**
		 * 更新偏移时间
		 * @private
		 */
		protected updateDeltaTime(dt:number)
		{
			this._absoluteTime += dt;

			this._activeState.update(this._absoluteTime);

			if (this.updatePosition)
				this.applyPositionDelta();
		}

		/**
		 * 自动更新动画时帧更新事件
		 */
		private onEnterFrame(event:Event = null)
		{
			this.update(getTimer());
		}

		/**
		 * 应用位置偏移量
		 */
		private applyPositionDelta()
		{
			var delta:Vector3D = this._activeState.positionDelta;
			var dist:number = delta.length;
			var len:number;
			if (dist > 0)
			{
				len = this._owners.length;
				for (var i:number = 0; i < len; ++i)
					this._owners[i].transform3D.translateLocal(delta, dist);
			}
		}

		/**
		 * 派发动画播放完成一周期事件
		 * @private
		 */
		public dispatchCycleEvent()
		{
			if (this.hasEventListener(AnimatorEvent.CYCLE_COMPLETE))
				this.dispatchEvent(new AnimatorEvent(AnimatorEvent.CYCLE_COMPLETE, this));
		}

		/**
		 * @inheritDoc
		 */
		public setRenderState(renderable:IRenderable, camera:Camera3D)
		{
			throw new AbstractMethodError();
		}

		public get namedAsset():NamedAsset
		{
			return _namedAsset;
		}
	}
}
