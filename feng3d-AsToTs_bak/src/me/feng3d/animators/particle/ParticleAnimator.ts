module feng3d
{
	
	
	
	
	
	
	
	

	

	/**
	 * 粒子动画
	 * @author feng 2014-11-13
	 */
	export class ParticleAnimator extends AnimatorBase
	{
		private _particleAnimationSet:ParticleAnimationSet;

		private _animationParticleStates:ParticleStateBase[] = new ParticleStateBase[];
		private _timeParticleStates:ParticleStateBase[] = new ParticleStateBase[];

		/** 常量数据 */
		private vertexZeroConst:Number[] = Number[]([0, 1, 2, 0]);

		/** 时间常数（粒子当前时间） */
		private timeConstData:Number[] = new Number[](4);

		/**
		 * 创建粒子动画
		 * @param particleAnimationSet 粒子动画集合
		 */
		public ParticleAnimator(particleAnimationSet:ParticleAnimationSet)
		{
			super(particleAnimationSet);
			this._particleAnimationSet = particleAnimationSet;

			this.context3DBufferOwner.addChildBufferOwner(this._particleAnimationSet.context3DBufferOwner);
		}

		/**
		 * @inheritDoc
		 */
		protected initBuffers()
		{
			super.initBuffers();
			this.context3DBufferOwner.mapContext3DBuffer(this._.particleCommon_vc_vector, this.updateParticleConstDataBuffer);
			this.context3DBufferOwner.mapContext3DBuffer(this._.particleTime_vc_vector, this.updateTimeConstBuffer);
		}

		private updateTimeConstBuffer(timeConstBuffer:VCVectorBuffer)
		{
			timeConstBuffer.update(this.timeConstData);
		}

		private updateParticleConstDataBuffer(particleConstDataBuffer:VCVectorBuffer)
		{
			particleConstDataBuffer.update(this.vertexZeroConst);
		}

		/**
		 * @inheritDoc
		 */
		public setRenderState(renderable:IRenderable, camera:Camera3D)
		{
			var subMesh:SubMesh = MeshRenderable(renderable).subMesh;

			if (!subMesh)
				throw(new Error("Must be subMesh"));

			if (!subMesh.animationSubGeometry)
				this._particleAnimationSet.generateAnimationSubGeometries(subMesh.parentMesh);

			this.timeConstData[0] = this.timeConstData[1] = this.timeConstData[2] = this.timeConstData[3] = this.time / 1000;

			this._particleAnimationSet.setRenderState(renderable, camera)
		}

		/**
		 * @inheritDoc
		 */
		public start()
		{
			super.start();
			for each (var state:ParticleStateBase in this._timeParticleStates)
				state.offset(_absoluteTime);
		}

		/**
		 * @inheritDoc
		 */
		protected updateDeltaTime(dt:number)
		{
			_absoluteTime += dt;

			for each (var state:ParticleStateBase in this._timeParticleStates)
				state.update(_absoluteTime);
		}

	}
}
