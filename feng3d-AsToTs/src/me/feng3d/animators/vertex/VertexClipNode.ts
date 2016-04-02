module feng3d
{
	

	
	

	/**
	 * 顶点动画剪辑节点
	 * @author feng 2014-5-30
	 */
	export class VertexClipNode extends AnimationClipNodeBase
	{
		private _frames:Geometry[] = new Geometry[]();
		private _translations:Vector3D[] = new Vector3D[]();

		/**
		 * 创建一个顶点动画剪辑节点
		 */
		constructor()
		{
			_stateClass = VertexClipState;
		}

		/**
		 * 帧数据列表
		 */
		public get frames():Geometry[]
		{
			return _frames;
		}

		/**
		 * 添加顶点动画帧
		 * @param geometry 几何体
		 * @param duration 持续时间
		 * @param translation 偏移量
		 */
		public addFrame(geometry:Geometry, duration:number, translation:Vector3D = null)
		{
			this._frames.push(geometry);
			_durations.push(duration);
			this._translations.push(translation || new Vector3D());

			_numFrames = _durations.length;

			_stitchDirty = true;
		}

		/**
		 * @inheritDoc
		 */
		protected updateStitch()
		{
			super.updateStitch();

			var i:number = _numFrames - 1;
			var p1:Vector3D, p2:Vector3D, delta:Vector3D;
			while (i--)
			{
				_totalDuration += _durations[i];
				p1 = this._translations[i];
				p2 = this._translations[i + 1];
				delta = p2.subtract(p1);
				_totalDelta.x += delta.x;
				_totalDelta.y += delta.y;
				_totalDelta.z += delta.z;
			}

			if (_stitchFinalFrame && _looping)
			{
				_totalDuration += _durations[_numFrames - 1];
				if (_numFrames > 1)
				{
					p1 = this._translations[0];
					p2 = this._translations[1];
					delta = p2.subtract(p1);
					_totalDelta.x += delta.x;
					_totalDelta.y += delta.y;
					_totalDelta.z += delta.z;
				}
			}
		}

	}
}
