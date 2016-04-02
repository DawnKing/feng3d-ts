module feng3d
{
	

	/**
	 * 平面网格（四边形）
	 * @author feng 2014-4-15
	 */
	export class PlaneGeometry extends PrimitiveBase
	{
		private _segmentsW:number;
		private _segmentsH:number;
		private _yUp:boolean;
		private _width:number;
		private _height:number;
		private _doubleSided:boolean;

		/**
		 * 创建一个平面
		 * @param width 宽度
		 * @param height 高度
		 * @param segmentsW 横向分割数
		 * @param segmentsH 纵向分割数
		 * @param yUp 正面朝向 true:Y+ false:Z+
		 * @param doubleSided 是否双面
		 */
		public PlaneGeometry(width:number = 100, height:number = 100, segmentsW:number = 1, segmentsH:number = 1, yUp:boolean = true, doubleSided:boolean = false)
		{
			super();

			this._segmentsW = segmentsW;
			this._segmentsH = segmentsH;
			this._yUp = yUp;
			this._width = width;
			this._height = height;
			this._doubleSided = doubleSided;
		}

		/**
		 * 横向分割数
		 */
		public get segmentsW():number
		{
			return _segmentsW;
		}

		public set segmentsW(value:number)
		{
			_segmentsW = value;
			invalidateGeometry();
			invalidateUVs();
		}

		/**
		 * 纵向分割数
		 */
		public get segmentsH():number
		{
			return _segmentsH;
		}

		public set segmentsH(value:number)
		{
			_segmentsH = value;
			invalidateGeometry();
			invalidateUVs();
		}

		/**
		 * 正面朝向 true:Y+ false:Z+
		 */
		public get yUp():boolean
		{
			return _yUp;
		}

		public set yUp(value:boolean)
		{
			_yUp = value;
			invalidateGeometry();
		}

		/**
		 * 是否双面
		 */
		public get doubleSided():boolean
		{
			return _doubleSided;
		}

		public set doubleSided(value:boolean)
		{
			_doubleSided = value;
			invalidateGeometry();
		}

		/**
		 * 宽度
		 */
		public get width():number
		{
			return _width;
		}

		public set width(value:number)
		{
			_width = value;
			invalidateGeometry();
		}

		/**
		 * 高度
		 */
		public get height():number
		{
			return _height;
		}

		public set height(value:number)
		{
			_height = value;
			invalidateGeometry();
		}

		/**
		 * @inheritDoc
		 */
		protected override function buildGeometry(target:SubGeometry)
		{
			var vertexPositionData:Number[];
			var vertexNormalData:Number[];
			var vertexTangentData:Number[];
			var indices:uint[];
			var x:number, y:number;
			var numIndices:number;
			var base:number;
			var tw:number = this._segmentsW + 1;
			var numVertices:number = (this._segmentsH + 1) * tw;
			var vertexPositionStride:number = target.vertexPositionStride;
			var vertexNormalStride:number = target.vertexNormalStride;
			var vertexTangentStride:number = target.vertexTangentStride;
			if (this._doubleSided)
				numVertices *= 2;

			numIndices = this._segmentsH * this._segmentsW * 6;
			if (this._doubleSided)
				numIndices <<= 1;

			if (numVertices == target.numVertices)
			{
				vertexPositionData = target.vertexPositionData;
				vertexNormalData = target.vertexNormalData;
				vertexTangentData = target.vertexTangentData;
				indices = target.indexData || new uint[](numIndices, true);
			}
			else
			{
				vertexPositionData = new Number[](numVertices * vertexPositionStride, true);
				vertexNormalData = new Number[](numVertices * vertexNormalStride, true);
				vertexTangentData = new Number[](numVertices * vertexTangentStride, true);
				indices = new uint[](numIndices, true);
				invalidateUVs();
			}
			target.numVertices = numVertices;

			numIndices = 0;
			var positionIndex:number = 0;
			var normalIndex:number = 0;
			var tangentIndex:number = 0;
			for (var yi:number = 0; yi <= this._segmentsH; ++yi)
			{
				for (var xi:number = 0; xi <= this._segmentsW; ++xi)
				{
					x = (xi / this._segmentsW - .5) * this._width;
					y = (yi / this._segmentsH - .5) * this._height;

					//设置坐标数据
					vertexPositionData[positionIndex++] = x;
					if (this._yUp)
					{
						vertexPositionData[positionIndex++] = 0;
						vertexPositionData[positionIndex++] = y;
					}
					else
					{
						vertexPositionData[positionIndex++] = y;
						vertexPositionData[positionIndex++] = 0;
					}

					//设置法线数据
					vertexNormalData[normalIndex++] = 0;
					if (this._yUp)
					{
						vertexNormalData[normalIndex++] = 1;
						vertexNormalData[normalIndex++] = 0;
					}
					else
					{
						vertexNormalData[normalIndex++] = 0;
						vertexNormalData[normalIndex++] = -1;
					}

					vertexTangentData[tangentIndex++] = 1;
					vertexTangentData[tangentIndex++] = 0;
					vertexTangentData[tangentIndex++] = 0;

					//复制反面数据
					if (this._doubleSided)
					{
						for (var i:number = 0; i < 3; ++i)
						{
							vertexPositionData[positionIndex] = vertexPositionData[positionIndex - vertexPositionStride];
							++positionIndex;
						}
						for (i = 0; i < 3; ++i)
						{
							vertexPositionData[normalIndex] = -vertexPositionData[normalIndex - vertexNormalStride];
							++normalIndex;
						}
						for (i = 0; i < 3; ++i)
						{
							vertexTangentData[tangentIndex] = -vertexTangentData[tangentIndex - vertexTangentStride];
							++tangentIndex;
						}
					}

					//生成索引数据
					if (xi != this._segmentsW && yi != this._segmentsH)
					{
						base = xi + yi * tw;
						var mult:number = this._doubleSided ? 2 : 1;

						indices[numIndices++] = base * mult;
						indices[numIndices++] = (base + tw) * mult;
						indices[numIndices++] = (base + tw + 1) * mult;
						indices[numIndices++] = base * mult;
						indices[numIndices++] = (base + tw + 1) * mult;
						indices[numIndices++] = (base + 1) * mult;

						//设置反面索引数据
						if (this._doubleSided)
						{
							indices[numIndices++] = (base + tw + 1) * mult + 1;
							indices[numIndices++] = (base + tw) * mult + 1;
							indices[numIndices++] = base * mult + 1;
							indices[numIndices++] = (base + 1) * mult + 1;
							indices[numIndices++] = (base + tw + 1) * mult + 1;
							indices[numIndices++] = base * mult + 1;
						}
					}
				}
			}

			target.updateVertexPositionData(vertexPositionData);
			target.updateVertexNormalData(vertexNormalData);
			target.updateVertexTangentData(vertexTangentData);
			target.updateIndexData(indices);
		}

		protected buildUVs(target:SubGeometry)
		{
			var data:Number[];
			var stride:number = target.UVStride;
			var numUvs:number = (this._segmentsH + 1) * (this._segmentsW + 1) * stride;

			if (this._doubleSided)
				numUvs *= 2;

			data = target.UVData;
			if (data == null || numUvs != data.length)
			{
				data = new Number[](numUvs, true);
				invalidateGeometry();
			}

			var index:number = 0;

			for (var yi:number = 0; yi <= this._segmentsH; ++yi)
			{
				for (var xi:number = 0; xi <= this._segmentsW; ++xi)
				{
					data[index++] = xi / this._segmentsW;
					data[index++] = 1 - yi / this._segmentsH;

					if (this._doubleSided)
					{
						data[index++] = xi / this._segmentsW;
						data[index++] = 1 - yi / this._segmentsH;
					}
				}
			}

			target.updateUVData(data);
		}
	}
}
