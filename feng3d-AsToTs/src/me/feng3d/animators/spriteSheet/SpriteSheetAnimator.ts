module feng3dSheet
{
	
	

	
	
	
	
	
	
	
	
	
	
	

	

	/**
	 * sprite动画
	 * @author feng 2014-5-27
	 */
	export class SpriteSheetAnimator extends AnimatorBase
	{
		private _vectorFrame:number[] = new number[](4, true);

		private _activeSpriteSheetState:ISpriteSheetAnimationState;
		private _spriteSheetAnimationSet:SpriteSheetAnimationSet;
		private _frame:SpriteSheetAnimationFrame = new SpriteSheetAnimationFrame();
		private _fps:number = 10;
		private _ms:number = 100;
		private _lastTime:number;
		private _reverse:boolean;
		private _backAndForth:boolean;
		private _specsDirty:boolean;
		private _mapDirty:boolean;

		/**
		 * 创建sprite动画实例
		 * @param spriteSheetAnimationSet			sprite动画集合
		 */
		public SpriteSheetAnimator(spriteSheetAnimationSet:SpriteSheetAnimationSet)
		{
			super(spriteSheetAnimationSet);
			this._spriteSheetAnimationSet = spriteSheetAnimationSet;
		}

		public set fps(val:number)
		{
			_ms = 1000 / val;
			_fps = val;
		}

		/**
		 * 帧率
		 */
		public get fps():number
		{
			return _fps;
		}

		public set reverse(b:boolean)
		{
			_reverse = b;
			_specsDirty = true;
		}

		/**
		 * 是否反向
		 */
		public get reverse():boolean
		{
			return _reverse;
		}

		public set backAndForth(b:boolean)
		{
			_backAndForth = b;
			_specsDirty = true;
		}

		/**
		 * 改变播放方向
		 */
		public get backAndForth():boolean
		{
			return _backAndForth;
		}

		/**
		 * 跳到某帧播放（起始帧为1）
		 * @param frameNumber			帧编号
		 */
		public gotoAndPlay(frameNumber:number)
		{
			this.gotoFrame(frameNumber, true);
		}

		/**
		 * 跳到某帧停止（起始帧为1）
		 * @param frameNumber			帧编号
		 */
		public gotoAndStop(frameNumber:number)
		{
			this.gotoFrame(frameNumber, false);
		}

		/**
		 * 当前帧编号
		 */
		public get currentFrameNumber():number
		{
			return SpriteSheetAnimationState(_activeState).currentFrameNumber;
		}

		/**
		 * 总帧数
		 */
		public get totalFrames():number
		{
			return SpriteSheetAnimationState(_activeState).totalFrames;
		}

		/**
		 * @inheritDoc
		 */
		protected initBuffers()
		{
			super.initBuffers();
			this.context3DBufferOwner.mapContext3DBuffer(this._.spriteSheetVectorFrame_vc_vector, this.updateVectorFrameBuffer);
		}

		private updateVectorFrameBuffer(vcVectorBuffer:VCVectorBuffer)
		{
			vcVectorBuffer.update(this._vectorFrame);
		}

		/**
		 * @inheritDoc
		 */
		public setRenderState(renderable:IRenderable, camera:Camera3D)
		{
			var material:MaterialBase = renderable.material;
			if (!material || !material is TextureMaterial)
				return;

			var subMesh:SubMesh = MeshRenderable(renderable).subMesh;
			if (!subMesh)
				return;

			//because textures are already uploaded, we can't offset the uv's yet
			var swapped:boolean;

			if (material is SpriteSheetMaterial && this._mapDirty)
				swapped = SpriteSheetMaterial(material).swap(this._frame.mapID);

			if (!swapped)
			{
				this._vectorFrame[0] = this._frame.offsetU;
				this._vectorFrame[1] = this._frame.offsetV;
				this._vectorFrame[2] = this._frame.scaleU;
				this._vectorFrame[3] = this._frame.scaleV;
			}
		}

		/**
		 * @inheritDoc
		 */
		public play(name:string, transition:IAnimationTransition = null, offset:number = NaN)
		{
			transition = transition;
			offset = offset;
			if (_activeAnimationName == name)
				return;

			_activeAnimationName = name;

			if (!_animationSet.hasAnimation(name))
				throw new Error("Animation root node " + name + " not found!");

			_activeNode = _animationSet.getAnimation(name);
			_activeState = this.getAnimationState(_activeNode);
			this._frame = SpriteSheetAnimationState(_activeState).currentFrameData;
			this._activeSpriteSheetState = _activeState as ISpriteSheetAnimationState;

			this.start();
		}

		/**
		 * @inheritDoc
		 */
		protected updateDeltaTime(dt:number)
		{
			if (this._specsDirty)
			{
				SpriteSheetAnimationState(this._activeSpriteSheetState).reverse = this._reverse;
				SpriteSheetAnimationState(this._activeSpriteSheetState).backAndForth = this._backAndForth;
				this._specsDirty = false;
			}

			_absoluteTime += dt;
			var now:number = getTimer();

			if ((now - this._lastTime) > this._ms)
			{
				this._mapDirty = true;
				this._activeSpriteSheetState.update(_absoluteTime);
				this._frame = SpriteSheetAnimationState(this._activeSpriteSheetState).currentFrameData;
				this._lastTime = now;

			}
			else
				this._mapDirty = false;

		}

		/**
		 * 克隆
		 */
		public clone():AnimatorBase
		{
			return new SpriteSheetAnimator(this._spriteSheetAnimationSet);
		}

		/**
		 * 跳转某帧
		 * @param frameNumber			帧编号
		 * @param doPlay				是否播放
		 */
		private gotoFrame(frameNumber:number, doPlay:boolean)
		{
			if (!_activeState)
				return;
			SpriteSheetAnimationState(_activeState).currentFrameNumber = (frameNumber == 0) ? frameNumber : frameNumber - 1;
			var currentMapID:number = this._frame.mapID;
			this._frame = SpriteSheetAnimationState(this._activeSpriteSheetState).currentFrameData;

			if (doPlay)
				this.start();
			else
			{
				if (currentMapID != this._frame.mapID)
				{
					this._mapDirty = true;
					setTimeout(this.stop, this._fps);
				}
				else
					this.stop();

			}
		}

	}
}
