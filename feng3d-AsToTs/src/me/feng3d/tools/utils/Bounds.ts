module feng3d
{
	
	
	

	
	
	
	
	

	

	/**
	 * Helper Class to retrieve objects bounds <code>Bounds</code>
	 */

	export class Bounds
	{

		private static _minX:number;
		private static _minY:number;
		private static _minZ:number;
		private static _maxX:number;
		private static _maxY:number;
		private static _maxZ:number;
		private static _defaultPosition:Vector3D = new Vector3D(0.0, 0.0, 0.0);
		private static _containers:Dictionary;

		/**
		 * Calculate the bounds of a Mesh object
		 * @param mesh        Mesh. The Mesh to get the bounds from.
		 * Use the getters of this class to retrieve the results
		 */
		public static getMeshBounds(mesh:Mesh)
		{
			getObjectContainerBounds(mesh);
		}

		/**
		 * Calculate the bounds of an ObjectContainer3D object
		 * @param container        ObjectContainer3D. The ObjectContainer3D to get the bounds from.
		 * Use the getters of this class to retrieve the results
		 */
		public static getObjectContainerBounds(container:Container3D, worldBased:boolean = true)
		{
			reset();
			parseObjectContainerBounds(container);

			if (isInfinite(_minX) || isInfinite(_minY) || isInfinite(_minZ) || isInfinite(_maxX) || isInfinite(_maxY) || isInfinite(_maxZ))
			{
				return;
			}

			// Transform min/max values to the scene if required
			if (worldBased)
			{
				var b:number[] = number[]([Infinity, Infinity, Infinity, -Infinity, -Infinity, -Infinity]);
				var c:number[] = getBoundsCorners(_minX, _minY, _minZ, _maxX, _maxY, _maxZ);
				transformContainer(b, c, container.sceneTransform);
				_minX = b[0];
				_minY = b[1];
				_minZ = b[2];
				_maxX = b[3];
				_maxY = b[4];
				_maxZ = b[5];
			}
		}

		/**
		 * Calculate the bounds from a vector of number representing the vertices. &lt;x,y,z,x,y,z.....&gt;
		 * @param vertices        Vector.&lt;number&gt;. The vertices to get the bounds from.
		 * Use the getters of this class to retrieve the results
		 */
		public static getVerticesVectorBounds(vertices:number[])
		{
			reset();
			var l:number = vertices.length;
			if (l % 3 != 0)
				return;

			var x:number;
			var y:number;
			var z:number;

			for (var i:number = 0; i < l; i += 3)
			{
				x = vertices[i];
				y = vertices[i + 1];
				z = vertices[i + 2];

				if (x < _minX)
					_minX = x;
				if (x > _maxX)
					_maxX = x;

				if (y < _minY)
					_minY = y;
				if (y > _maxY)
					_maxY = y;

				if (z < _minZ)
					_minZ = z;
				if (z > _maxZ)
					_maxZ = z;
			}
		}

		/**
		 * @param outCenter        Vector3D. Optional Vector3D, if provided the same Vector3D is returned with the bounds center.
		 * @return the center of the bound
		 */
		public static getCenter(outCenter:Vector3D = null):Vector3D
		{
			var center:Vector3D = outCenter || new Vector3D();
			center.x = _minX + (_maxX - _minX) * .5;
			center.y = _minY + (_maxY - _minY) * .5;
			center.z = _minZ + (_maxZ - _minZ) * .5;

			return center;
		}

		/**
		 * @return the smalest x value
		 */
		public static get minX():number
		{
			return _minX;
		}

		/**
		 * @return the smalest y value
		 */
		public static get minY():number
		{
			return _minY;
		}

		/**
		 * @return the smalest z value
		 */
		public static get minZ():number
		{
			return _minZ;
		}

		/**
		 * @return the biggest x value
		 */
		public static get maxX():number
		{
			return _maxX;
		}

		/**
		 * @return the biggest y value
		 */
		public static get maxY():number
		{
			return _maxY;
		}

		/**
		 * @return the biggest z value
		 */
		public static get maxZ():number
		{
			return _maxZ;
		}

		/**
		 * @return the width value from the bounds
		 */
		public static get width():number
		{
			return _maxX - _minX;
		}

		/**
		 * @return the height value from the bounds
		 */
		public static get height():number
		{
			return _maxY - _minY;
		}

		/**
		 * @return the depth value from the bounds
		 */
		public static get depth():number
		{
			return _maxZ - _minZ;
		}

		private static function reset()
		{
			_containers = new Dictionary();
			_minX = _minY = _minZ = Infinity;
			_maxX = _maxY = _maxZ = -Infinity;
			_defaultPosition.x = 0.0;
			_defaultPosition.y = 0.0;
			_defaultPosition.z = 0.0;
		}

		private static function parseObjectContainerBounds(obj:Container3D, parentTransform:Matrix3D = null)
		{
			if (!obj.visible)
				return;

			var containerBounds:number[] = _containers[obj] ||= number[]([Infinity, Infinity, Infinity, -Infinity, -Infinity, -Infinity]);

			var child:Container3D;
			var isEntity:Entity = obj as Entity;
			var containerTransform:Matrix3D = new Matrix3D();

			if (isEntity && parentTransform)
			{
				parseObjectBounds(obj, parentTransform);

				containerTransform = obj.transform3D.transform.clone();
				if (parentTransform)
					containerTransform.append(parentTransform);
			}
			else if (isEntity && !parentTransform)
			{
				var mat:Matrix3D = obj.transform3D.transform.clone();
				mat.invert();
				parseObjectBounds(obj, mat);
			}

			for (var i:number = 0; i < obj.numChildren; ++i)
			{
				child = obj.getChildAt(i) as Container3D;
				parseObjectContainerBounds(child, containerTransform);
			}

			var parentBounds:number[] = _containers[obj.parent];
			if (!isEntity && parentTransform)
				parseObjectBounds(obj, parentTransform, true);

			if (parentBounds)
			{
				parentBounds[0] = Math.min(parentBounds[0], containerBounds[0]);
				parentBounds[1] = Math.min(parentBounds[1], containerBounds[1]);
				parentBounds[2] = Math.min(parentBounds[2], containerBounds[2]);
				parentBounds[3] = Math.max(parentBounds[3], containerBounds[3]);
				parentBounds[4] = Math.max(parentBounds[4], containerBounds[4]);
				parentBounds[5] = Math.max(parentBounds[5], containerBounds[5]);
			}
			else
			{
				_minX = containerBounds[0];
				_minY = containerBounds[1];
				_minZ = containerBounds[2];
				_maxX = containerBounds[3];
				_maxY = containerBounds[4];
				_maxZ = containerBounds[5];
			}
		}

		private static function isInfinite(value:number):boolean
		{
			return value == number.POSITIVE_INFINITY || value == number.NEGATIVE_INFINITY;
		}

		private static function parseObjectBounds(oC:Container3D, parentTransform:Matrix3D = null, resetBounds:boolean = false)
		{
			if (oC is LightBase)
				return;

			var e:Entity = oC as Entity;
			var corners:number[];
			var mat:Matrix3D = oC.transform3D.transform.clone();
			var cB:number[] = _containers[oC];
			if (e)
			{
				if (isInfinite(e.minX) || isInfinite(e.minY) || isInfinite(e.minZ) || isInfinite(e.maxX) || isInfinite(e.maxY) || isInfinite(e.maxZ))
				{
					return;
				}

				corners = getBoundsCorners(e.minX, e.minY, e.minZ, e.maxX, e.maxY, e.maxZ);
				if (parentTransform)
					mat.append(parentTransform);
			}
			else
			{
				corners = getBoundsCorners(cB[0], cB[1], cB[2], cB[3], cB[4], cB[5]);
				if (parentTransform)
					mat.prepend(parentTransform);
			}

			if (resetBounds)
			{
				cB[0] = cB[1] = cB[2] = Infinity;
				cB[3] = cB[4] = cB[5] = -Infinity;
			}

			transformContainer(cB, corners, mat);
		}

		private static function getBoundsCorners(minX:number, minY:number, minZ:number, maxX:number, maxY:number, maxZ:number):number[]
		{
			return number[]([minX, minY, minZ, minX, minY, maxZ, minX, maxY, minZ, minX, maxY, maxZ, maxX, minY, minZ, maxX, minY, maxZ, maxX, maxY, minZ, maxX, maxY, maxZ]);
		}

		private static function transformContainer(bounds:number[], corners:number[], matrix:Matrix3D)
		{

			matrix.transformVectors(corners, corners);

			var x:number;
			var y:number;
			var z:number;

			var pCtr:number = 0;
			while (pCtr < corners.length)
			{
				x = corners[pCtr++];
				y = corners[pCtr++];
				z = corners[pCtr++];

				if (x < bounds[0])
					bounds[0] = x;
				if (x > bounds[3])
					bounds[3] = x;

				if (y < bounds[1])
					bounds[1] = y;
				if (y > bounds[4])
					bounds[4] = y;

				if (z < bounds[2])
					bounds[2] = z;
				if (z > bounds[5])
					bounds[5] = z;
			}
		}
	}
}
