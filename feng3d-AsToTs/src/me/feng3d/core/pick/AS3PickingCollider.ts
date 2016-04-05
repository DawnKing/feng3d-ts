module feng3d
{
	

	
	

	/**
	 * 使用纯AS3计算与实体相交
	 */
	export class AS3PickingCollider extends PickingColliderBase implements IPickingCollider
	{
		/** 是否查找最短距离碰撞 */
		private _findClosestCollision:boolean;

		/**
		 * 创建一个AS碰撞检测器
		 * @param findClosestCollision 是否查找最短距离碰撞
		 */
		constructor(findClosestCollision:boolean = false)
		{
			this._findClosestCollision = findClosestCollision;
		}

		public testSubMeshCollision(subMesh:SubMesh, pickingCollisionVO:PickingCollisionVO, shortestCollisionDistance:number, bothSides:boolean = true):boolean
		{
			var t:number;
			var i0:number, i1:number, i2:number;
			var rx:number, ry:number, rz:number;
			var nx:number, ny:number, nz:number;
			var cx:number, cy:number, cz:number;
			var coeff:number, u:number, v:number, w:number;
			var p0x:number, p0y:number, p0z:number;
			var p1x:number, p1y:number, p1z:number;
			var p2x:number, p2y:number, p2z:number;
			var s0x:number, s0y:number, s0z:number;
			var s1x:number, s1y:number, s1z:number;
			var nl:number, nDotV:number, D:number, disToPlane:number;
			var Q1Q2:number, Q1Q1:number, Q2Q2:number, RQ1:number, RQ2:number;

			var subGeom:SubGeometry = subMesh.subGeometry as SubGeometry;

			var indexData:number[] = subGeom.indexData;
			var vertexData:number[] = subGeom.vertexPositionData;
			var uvData:number[] = subGeom.UVData;
			var collisionTriangleIndex:number = -1;

			var vertexStride:number = subGeom.vertexPositionStride;
			var vertexOffset:number = 0;
			var uvStride:number = subGeom.UVStride;
			var numIndices:number = indexData.length;

			//遍历每个三角形 检测碰撞
			for (var index:number = 0; index < numIndices; index += 3)
			{ // sweep all triangles
				//三角形三个顶点索引
				i0 = vertexOffset + indexData[index] * vertexStride;
				i1 = vertexOffset + indexData[number(index + 1)] * vertexStride;
				i2 = vertexOffset + indexData[number(index + 2)] * vertexStride;

				//三角形三个顶点数据
				p0x = vertexData[i0];
				p0y = vertexData[number(i0 + 1)];
				p0z = vertexData[number(i0 + 2)];
				p1x = vertexData[i1];
				p1y = vertexData[number(i1 + 1)];
				p1z = vertexData[number(i1 + 2)];
				p2x = vertexData[i2];
				p2y = vertexData[number(i2 + 1)];
				p2z = vertexData[number(i2 + 2)];

				//计算出三角面的法线
				s0x = p1x - p0x; // s0 = p1 - p0
				s0y = p1y - p0y;
				s0z = p1z - p0z;
				s1x = p2x - p0x; // s1 = p2 - p0
				s1y = p2y - p0y;
				s1z = p2z - p0z;
				nx = s0y * s1z - s0z * s1y; // n = s0 x s1
				ny = s0z * s1x - s0x * s1z;
				nz = s0x * s1y - s0y * s1x;
				nl = 1 / Math.sqrt(nx * nx + ny * ny + nz * nz); // normalize n
				nx *= nl;
				ny *= nl;
				nz *= nl;

				//初始化射线数据
				var rayPosition:Vector3D = this.ray3D.position;
				var rayDirection:Vector3D = this.ray3D.direction;

				//计算射线与法线的点积，不等于零表示射线所在直线与三角面相交
				nDotV = nx * rayDirection.x + ny * +rayDirection.y + nz * rayDirection.z; // rayDirection . normal
				//判断射线是否与三角面相交
				if ((!bothSides && nDotV < 0.0) || (bothSides && nDotV != 0.0))
				{ // an intersection must exist
					//计算平面方程D值，参考Plane3D
					D = -(nx * p0x + ny * p0y + nz * p0z);
					//射线点到平面的距离
					disToPlane = -(nx * rayPosition.x + ny * rayPosition.y + nz * rayPosition.z + D);
					t = disToPlane / nDotV;
					//得到交点
					cx = rayPosition.x + t * rayDirection.x;
					cy = rayPosition.y + t * rayDirection.y;
					cz = rayPosition.z + t * rayDirection.z;
					//判断交点是否在三角形内( using barycentric coordinates )
					Q1Q2 = s0x * s1x + s0y * s1y + s0z * s1z;
					Q1Q1 = s0x * s0x + s0y * s0y + s0z * s0z;
					Q2Q2 = s1x * s1x + s1y * s1y + s1z * s1z;
					rx = cx - p0x;
					ry = cy - p0y;
					rz = cz - p0z;
					RQ1 = rx * s0x + ry * s0y + rz * s0z;
					RQ2 = rx * s1x + ry * s1y + rz * s1z;
					coeff = 1 / (Q1Q1 * Q2Q2 - Q1Q2 * Q1Q2);
					v = coeff * (Q2Q2 * RQ1 - Q1Q2 * RQ2);
					w = coeff * (-Q1Q2 * RQ1 + Q1Q1 * RQ2);
					if (v < 0)
						continue;
					if (w < 0)
						continue;
					u = 1 - v - w;
					//u v w都大于0表示点在三角形内 射线的坐标t大于0表示射线朝向三角面
					if (!(u < 0) && t > 0 && t < shortestCollisionDistance)
					{
						shortestCollisionDistance = t;
						collisionTriangleIndex = index / 3;
						pickingCollisionVO.rayEntryDistance = t;
						pickingCollisionVO.localPosition = new Vector3D(cx, cy, cz);
						pickingCollisionVO.localNormal = new Vector3D(nx, ny, nz);
						pickingCollisionVO.uv = this.getCollisionUV(indexData, uvData, index, v, w, u, 0, uvStride);
						pickingCollisionVO.index = index;

						//是否继续寻找最优解
						if (!this._findClosestCollision)
							return true;
					}
				}
			}

			if (collisionTriangleIndex >= 0)
				return true;

			return false;
		}
	}
}
