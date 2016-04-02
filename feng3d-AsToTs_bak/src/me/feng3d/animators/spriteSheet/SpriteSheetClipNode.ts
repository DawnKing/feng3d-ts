module feng3dSheet
{
	

	/**
	 * sprite动画剪辑节点
	 * @author feng 2015-9-18
	 */
	export class SpriteSheetClipNode extends AnimationClipNodeBase
	{
		private _frames:SpriteSheetAnimationFrame[] = new SpriteSheetAnimationFrame[]();

		/**
		 * 创建<code>SpriteSheetClipNode</code>实例.
		 */
		public SpriteSheetClipNode()
		{
			_stateClass = SpriteSheetAnimationState;
		}

		/**
		 * 帧列表
		 */
		public get frames():SpriteSheetAnimationFrame[]
		{
			return _frames;
		}

		/**
		 * 添加帧到动画节点
		 * @param spriteSheetAnimationFrame				sprite动画帧
		 * @param duration								间隔时间
		 */
		public addFrame(spriteSheetAnimationFrame:SpriteSheetAnimationFrame, duration:number)
		{
			this._frames.push(spriteSheetAnimationFrame);
			_durations.push(duration);
			_numFrames = _durations.length;

			_stitchDirty = false;
		}
	}
}
