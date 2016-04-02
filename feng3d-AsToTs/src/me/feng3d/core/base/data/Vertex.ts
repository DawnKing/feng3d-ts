module feng3d
{

	/**
	 * 顶点
	 */
	export class Vertex
	{
		private _x:number;
		private _y:number;
		private _z:number;
		private _index:number;

		/**
		 *
		 * @param x X轴坐标
		 * @param y Y轴坐标
		 * @param z Z轴坐标
		 * @param index 顶点索引
		 */
		constructor(x:number = 0, y:number = 0, z:number = 0, index:number = 0)
		{
			this._x = x;
			this._y = y;
			this._z = z;
			this._index = index;
		}

		/**
		 * To define/store the index of value object
		 * @param    ind        The index
		 */
		public set index(ind:number)
		{
			_index = ind;
		}

		public get index():number
		{
			return _index;
		}

		public get x():number
		{
			return _x;
		}

		public set x(value:number)
		{
			_x = value;
		}

		public get y():number
		{
			return _y;
		}

		public set y(value:number)
		{
			_y = value;
		}

		public get z():number
		{
			return _z;
		}

		public set z(value:number)
		{
			_z = value;
		}

		public clone():Vertex
		{
			return new Vertex(this._x, this._y, this._z);
		}

		public toString():string
		{
			return this._x + "," + this._y + "," + this._z;
		}

	}
}
