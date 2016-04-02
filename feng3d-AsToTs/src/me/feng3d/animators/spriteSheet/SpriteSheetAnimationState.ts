module feng3dSheet
{
	
	
	

	

	/**
	 * sprite动画状态
	 * @author feng 2015-9-18
	 */
	export class SpriteSheetAnimationState extends AnimationClipState implements ISpriteSheetAnimationState
	{
		private _frames:SpriteSheetAnimationFrame[];
		private _clipNode:SpriteSheetClipNode;
		private _currentFrameID:number = 0;
		private _reverse:boolean;
		private _backAndForth:boolean;
		private _forcedFrame:boolean;

		/**
		 * 创建sprite动画状态实例
		 * @param animator			动画
		 * @param clipNode			动画剪辑节点
		 */
		function SpriteSheetAnimationState(animator:AnimatorBase, clipNode:SpriteSheetClipNode)
		{
			super(animator, clipNode);

			_clipNode = clipNode;
			_frames = _clipNode.frames;
		}

		/**
		 * 是否反向播放
		 */
		public set reverse(b:boolean)
		{
			_reverse = b;
		}

		/**
		 * 改变播放方向
		 */
		public set backAndForth(b:boolean)
		{
			if (b)
				_reverse = false;
			_backAndForth = b;
		}

		/**
		 * @inheritDoc
		 */
		public get currentFrameData():SpriteSheetAnimationFrame
		{
			if (_framesDirty)
				updateFrames();

			return _frames[_currentFrameID];
		}

		/**
		 * 当前帧数
		 */
		public get currentFrameNumber():number
		{
			return _currentFrameID;
		}

		public set currentFrameNumber(frameNumber:number)
		{
			_currentFrameID = (frameNumber > _frames.length - 1) ? _frames.length - 1 : frameNumber;
			_forcedFrame = true;
		}

		/**
		 * 总帧数
		 */
		public get totalFrames():number
		{
			return (!_frames) ? 0 : _frames.length;
		}

		/**
		 * @inheritDoc
		 */
		protected updateFrames()
		{
			if (this._forcedFrame)
			{
				this._forcedFrame = false;
				return;
			}

			super.updateFrames();

			if (this._reverse)
			{

				if (this._currentFrameID - 1 > -1)
					this._currentFrameID--;

				else
				{

					if (this._clipNode.looping)
					{

						if (this._backAndForth)
						{
							this._reverse = false;
							this._currentFrameID++;
						}
						else
							this._currentFrameID = this._frames.length - 1;
					}

					SpriteSheetAnimator(_animator).dispatchCycleEvent();
				}

			}
			else
			{

				if (this._currentFrameID < this._frames.length - 1)
					this._currentFrameID++;

				else
				{

					if (this._clipNode.looping)
					{

						if (this._backAndForth)
						{
							this._reverse = true;
							this._currentFrameID--;
						}
						else
							this._currentFrameID = 0;
					}

					SpriteSheetAnimator(_animator).dispatchCycleEvent();
				}
			}

		}
	}
}
