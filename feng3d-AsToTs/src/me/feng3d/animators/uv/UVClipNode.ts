module feng3d
{
	

	/**
	 * A uv animation node containing time-based animation data as individual uv animation frames.
	 */
	/**
	 * UV动画剪辑节点
	 * @author feng 2014-5-20
	 */
	export class UVClipNode extends AnimationClipNodeBase
	{
		private _frames:UVAnimationFrame[] = new UVAnimationFrame[]();

		/**
		 * 帧数据列表
		 */
		public get frames():UVAnimationFrame[]
		{
			return _frames;
		}

		/**
		 * 创建<code>UVClipNode</code>实例
		 */
		constructor()
		{
			_stateClass = UVClipState;
		}

		/**
		 * 添加帧
		 * @param uvFrame				UV动画帧
		 * @param duration				间隔时间
		 */
		public addFrame(uvFrame:UVAnimationFrame, duration:number)
		{
			this._frames.push(uvFrame);
			_durations.push(duration);
			_numFrames = _durations.length;

			_stitchDirty = true;
		}

		/**
		 * @inheritDoc
		 */
		protected updateStitch()
		{
			super.updateStitch();
			var i:number;

			if (_durations.length > 0)
			{

				i = _numFrames - 1;
				while (i--)
					_totalDuration += _durations[i];

				if (_stitchFinalFrame || !_looping)
					_totalDuration += _durations[_numFrames - 1];
			}

		}
	}
}
