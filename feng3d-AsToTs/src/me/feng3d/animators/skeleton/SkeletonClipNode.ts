module feng3d
{
	

	
	

	/**
	 * 骨骼动画节点（一般用于一个动画的帧列表）
	 * 包含基于时间的动画数据作为单独的骨架构成。
	 * @author feng 2014-5-20
	 */
	export class SkeletonClipNode extends AnimationClipNodeBase
	{
		private _frames:SkeletonPose[] = new SkeletonPose[]();

		/**
		 * 创建骨骼动画节点
		 */
		public SkeletonClipNode()
		{
			_stateClass = SkeletonClipState;
		}

		/**
		 * 骨骼姿势动画帧列表
		 */
		public get frames():SkeletonPose[]
		{
			return _frames;
		}

		/**
		 * 添加帧到动画
		 * @param skeletonPose 骨骼姿势
		 * @param duration 持续时间
		 */
		public addFrame(skeletonPose:SkeletonPose, duration:number)
		{
			this._frames.push(skeletonPose);
			_durations.push(duration);
			_totalDuration += duration;

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
				p1 = this._frames[i].jointPoses[0].translation;
				p2 = this._frames[i + 1].jointPoses[0].translation;
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
					p1 = this._frames[0].jointPoses[0].translation;
					p2 = this._frames[1].jointPoses[0].translation;
					delta = p2.subtract(p1);
					_totalDelta.x += delta.x;
					_totalDelta.y += delta.y;
					_totalDelta.z += delta.z;
				}
			}
		}
	}
}
