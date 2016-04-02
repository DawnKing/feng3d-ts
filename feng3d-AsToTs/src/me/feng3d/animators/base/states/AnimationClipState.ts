module feng3d
{
	
	
	

	/**
	 * 动画剪辑状态
	 * @author feng 2015-9-18
	 */
	export class AnimationClipState extends AnimationStateBase
	{
		private _animationClipNode:AnimationClipNodeBase;
		protected _blendWeight:number;
		protected _currentFrame:number;
		protected _nextFrame:number;

		protected _oldFrame:number;
		protected _timeDir:number;
		protected _framesDirty:boolean = true;

		/**
		 * 混合权重	(0[当前帧],1[下一帧])
		 * @see #currentFrame
		 * @see #nextFrame
		 */
		public get blendWeight():number
		{
			if (_framesDirty)
				updateFrames();

			return _blendWeight;
		}

		/**
		 * 当前帧
		 */
		public get currentFrame():number
		{
			if (_framesDirty)
				updateFrames();

			return _currentFrame;
		}

		/**
		 * 下一帧
		 */
		public get nextFrame():number
		{
			if (_framesDirty)
				updateFrames();

			return _nextFrame;
		}

		/**
		 * 创建一个帧动画状态
		 * @param animator				动画
		 * @param animationClipNode		帧动画节点
		 */
		function AnimationClipState(animator:AnimatorBase, animationClipNode:AnimationClipNodeBase)
		{
			super(animator, animationClipNode);

			_animationClipNode = animationClipNode;
		}

		/**
		 * @inheritDoc
		 */
		public update(time:number)
		{
			if (!this._animationClipNode.looping)
			{
				if (time > _startTime + this._animationClipNode.totalDuration)
					time = _startTime + this._animationClipNode.totalDuration;
				else if (time < _startTime)
					time = _startTime;
			}

			if (_time == time - _startTime)
				return;

			this.updateTime(time);
		}

		/**
		 * @inheritDoc
		 */
		public phase(value:number)
		{
			var time:number = value * this._animationClipNode.totalDuration + _startTime;

			if (_time == time - _startTime)
				return;

			this.updateTime(time);
		}

		/**
		 * @inheritDoc
		 */
		protected updateTime(time:number)
		{
			this._framesDirty = true;

			this._timeDir = (time - _startTime > _time) ? 1 : -1;

			super.updateTime(time);
		}

		/**
		 * 更新帧，计算当前帧、下一帧与混合权重
		 *
		 * @see #currentFrame
		 * @see #nextFrame
		 * @see #blendWeight
		 */
		protected updateFrames()
		{
			this._framesDirty = false;

			var looping:boolean = this._animationClipNode.looping;
			var totalDuration:number = this._animationClipNode.totalDuration;
			var lastFrame:number = this._animationClipNode.lastFrame;
			var time:number = _time;

			//trace("time", time, totalDuration)
			if (looping && (time >= totalDuration || time < 0))
			{
				time %= totalDuration;
				if (time < 0)
					time += totalDuration;
			}

			if (!looping && time >= totalDuration)
			{
				this.notifyPlaybackComplete();
				this._currentFrame = lastFrame;
				this._nextFrame = lastFrame;
				this._blendWeight = 0;
			}
			else if (!looping && time <= 0)
			{
				this._currentFrame = 0;
				this._nextFrame = 0;
				this._blendWeight = 0;
			}
			else if (this._animationClipNode.fixedFrameRate)
			{
				var t:number = time / totalDuration * lastFrame;
				this._currentFrame = t;
				this._blendWeight = t - this._currentFrame;
				this._nextFrame = this._currentFrame + 1;
			}
			else
			{
				this._currentFrame = 0;
				this._nextFrame = 0;

				var dur:number = 0, frameTime:number;
				var durations:number[] = this._animationClipNode.durations;

				do
				{
					frameTime = dur;
					dur += durations[this.nextFrame];
					this._currentFrame = this._nextFrame++;
				} while (time > dur);

				if (this._currentFrame == lastFrame)
				{
					this._currentFrame = 0;
					this._nextFrame = 1;
				}

				this._blendWeight = (time - frameTime) / durations[this._currentFrame];
			}
		}

		/**
		 * 通知播放完成
		 */
		private notifyPlaybackComplete()
		{
			this._animationClipNode.dispatchEvent(new AnimationStateEvent(AnimationStateEvent.PLAYBACK_COMPLETE, _animator, this, this._animationClipNode));
		}
	}
}
