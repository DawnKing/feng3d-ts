module feng3d
{
	

	
	
	
	
	
	
	
	
	
	

	

	/**
	 * UV动画
	 * @author feng 2014-5-27
	 */
	export class UVAnimator extends AnimatorBase
	{
		private _matrix2d:Number[] = Number[]([1, 0, 0, 0, 1, 0, 0, 0]);
		private _translate:Number[] = Number[]([0, 0, 0.5, 0.5]);

		private _uvAnimationSet:UVAnimationSet;
		private _deltaFrame:UVAnimationFrame = new UVAnimationFrame();
		private _activeUVState:IUVAnimationState;

		private _uvTransform:Matrix;

		private _autoRotation:boolean;
		private _rotationIncrease:number = 1;
		private _autoTranslate:boolean;
		private _translateIncrease:Number[];

		/**
		 * 创建<code>UVAnimator</code>实例
		 * @param uvAnimationSet			UV动画集合
		 */
		public UVAnimator(uvAnimationSet:UVAnimationSet)
		{
			super(uvAnimationSet);

			this._uvTransform = new Matrix();
			this._uvAnimationSet = uvAnimationSet;
		}

		public set autoRotation(b:boolean)
		{
			_autoRotation = b;
		}

		/**
		 * 是否自动旋转
		 */
		public get autoRotation():boolean
		{
			return _autoRotation;
		}

		public set rotationIncrease(value:number)
		{
			_rotationIncrease = value;
		}

		/**
		 * 旋转增量（当autoRotation = true生效）
		 */
		public get rotationIncrease():number
		{
			return _rotationIncrease;
		}

		public set autoTranslate(b:boolean)
		{
			_autoTranslate = b;
			if (b && !_translateIncrease)
				_translateIncrease = Number[]([0, 0]);
		}

		/**
		 * 是否自动转换
		 */
		public get autoTranslate():boolean
		{
			return _autoTranslate;
		}

		/**
		 * 设置转换值
		 * @param u
		 * @param v
		 */
		public setTranslateIncrease(u:number, v:number)
		{
			if (!this._translateIncrease)
				this._translateIncrease = Number[]([0, 0]);
			this._translateIncrease[0] = u;
			this._translateIncrease[1] = v;
		}

		/**
		 * 转换值
		 */
		public get translateIncrease():Number[]
		{
			return _translateIncrease;
		}

		/**
		 * @inheritDoc
		 */
		protected initBuffers()
		{
			super.initBuffers();
			this.context3DBufferOwner.mapContext3DBuffer(this._.uvAnimatorTranslate_vc_vector, this.updateTranslateBuffer);
			this.context3DBufferOwner.mapContext3DBuffer(this._.uvAnimatorMatrix2d_vc_vector, this.updateMatrix2dBuffer);
		}

		private updateTranslateBuffer(buffer:VCVectorBuffer)
		{
			buffer.update(this._translate);
		}

		private updateMatrix2dBuffer(buffer:VCVectorBuffer)
		{
			buffer.update(this._matrix2d);
		}

		/**
		 * @inheritDoc
		 */
		public setRenderState(renderable:IRenderable, camera:Camera3D)
		{
			var material:TextureMaterial = renderable.material as TextureMaterial;
			var subMesh:SubMesh = MeshRenderable(renderable).subMesh;
			if (!material || !subMesh)
				return;

			if (this.autoTranslate)
			{
				this._deltaFrame.offsetU += this._translateIncrease[0];
				this._deltaFrame.offsetV += this._translateIncrease[1];
			}

			this._translate[0] = this._deltaFrame.offsetU;
			this._translate[1] = this._deltaFrame.offsetV;

			this._uvTransform.identity();

			if (this._autoRotation)
				this._deltaFrame.rotation += this._rotationIncrease;

			if (this._deltaFrame.rotation != 0)
				this._uvTransform.rotate(this._deltaFrame.rotation * MathConsts.DEGREES_TO_RADIANS);
			if (this._deltaFrame.scaleU != 1 || this._deltaFrame.scaleV != 1)
				this._uvTransform.scale(this._deltaFrame.scaleU, this._deltaFrame.scaleV);

			this._matrix2d[0] = this._uvTransform.a;
			this._matrix2d[1] = this._uvTransform.b;
			this._matrix2d[3] = this._uvTransform.tx;
			this._matrix2d[4] = this._uvTransform.c;
			this._matrix2d[5] = this._uvTransform.d;
			this._matrix2d[7] = this._uvTransform.ty;
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
			this._activeUVState = _activeState as IUVAnimationState;

			this.start();
		}

		/**
		 * @inheritDoc
		 */
		protected updateDeltaTime(dt:number)
		{
			_absoluteTime += dt;
			this._activeUVState.update(_absoluteTime);

			var currentUVFrame:UVAnimationFrame = this._activeUVState.currentUVFrame;
			var nextUVFrame:UVAnimationFrame = this._activeUVState.nextUVFrame;
			var blendWeight:number = this._activeUVState.blendWeight;

			if (currentUVFrame && nextUVFrame)
			{
				this._deltaFrame.offsetU = currentUVFrame.offsetU + blendWeight * (nextUVFrame.offsetU - currentUVFrame.offsetU);
				this._deltaFrame.offsetV = currentUVFrame.offsetV + blendWeight * (nextUVFrame.offsetV - currentUVFrame.offsetV);
				this._deltaFrame.scaleU = currentUVFrame.scaleU + blendWeight * (nextUVFrame.scaleU - currentUVFrame.scaleU);
				this._deltaFrame.scaleV = currentUVFrame.scaleV + blendWeight * (nextUVFrame.scaleV - currentUVFrame.scaleV);
				this._deltaFrame.rotation = currentUVFrame.rotation + blendWeight * (nextUVFrame.rotation - currentUVFrame.rotation);
			}
		}

		/**
		 * @inheritDoc
		 */
		public clone():AnimatorBase
		{
			return new UVAnimator(this._uvAnimationSet);
		}

	}
}
