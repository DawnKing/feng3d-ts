module feng3d
{
	

	
	
	

	

	/**
	 * 点灯光
	 * @author feng 2014-10-9
	 */
	export class PointLight extends LightBase
	{
		public _radius:number = 90000;
		public _fallOff:number = 100000;
		public _fallOffFactor:number;

		constructor()
		{
			super();
			this._fallOffFactor = 1 / (this._fallOff * this._fallOff - this._radius * this._radius);
		}

		/**
		 * 灯光可照射的最小距离
		 */
		public get radius():number
		{
			return _radius;
		}

		public set radius(value:number)
		{
			_radius = value;
			if (_radius < 0)
				_radius = 0;
			else if (_radius > _fallOff)
			{
				_fallOff = _radius;
				invalidateBounds();
			}

			_fallOffFactor = 1 / (_fallOff * _fallOff - _radius * _radius);
		}

		/**
		 * 灯光可照射的最大距离
		 */
		public get fallOff():number
		{
			return _fallOff;
		}

		public set fallOff(value:number)
		{
			_fallOff = value;
			if (_fallOff < 0)
				_fallOff = 0;
			if (_fallOff < _radius)
				_radius = _fallOff;
			_fallOffFactor = 1 / (_fallOff * _fallOff - _radius * _radius);
			invalidateBounds();
		}

		/**
		 * @inheritDoc
		 */
		protected createEntityPartitionNode():EntityNode
		{
			return new PointLightNode(this);
		}

		/**
		 * @inheritDoc
		 */
		protected updateBounds()
		{
			//			super.updateBounds();
			//			_bounds.fromExtremes(-this._fallOff, -this._fallOff, -this._fallOff, this._fallOff, this._fallOff, this._fallOff);
			_bounds.fromSphere(new Vector3D(), this._fallOff);
			_boundsInvalid = false;
		}

	}
}
