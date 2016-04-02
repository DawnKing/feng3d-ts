module feng3d
{
	
	
	
	

	
	
	

	/**
	 * 基于PixelBender计算与实体的相交
	 */
	export class PBPickingCollider extends PickingColliderBase implements IPickingCollider
	{
		[Embed("../../../../../pb/RayTriangleKernel.pbj", mimeType = "application/octet-stream")]
		private RayTriangleKernelClass:Class;

		/** 是否查找最短距离碰撞 */
		private _findClosestCollision:boolean;

		/** 射线与三角形相交检测渲染器 */
		private _rayTriangleKernel:Shader;
		/** 最后被检测的几何体 */
		private _lastSubMeshUploaded:SubMesh;
		/** 渲染器输出内容 */
		private _kernelOutputBuffer:number[];

		/**
		 * 创建一个 PBPickingCollider
		 * @param findClosestCollision 是否查找最短距离碰撞
		 */
		constructor(findClosestCollision:boolean = false)
		{
			this._findClosestCollision = findClosestCollision;

			//初始化出入缓存
			this._kernelOutputBuffer = new number[]();
			//初始化渲染器
			this._rayTriangleKernel = new Shader(new this.RayTriangleKernelClass() as ByteArray);
		}

		public setLocalRay(ray3D:Ray3D)
		{
			super.setLocalRay(ray3D);

			//上传射线信息到渲染器
			this._rayTriangleKernel.data.rayStartPoint.value = [ray3D.position.x, ray3D.position.y, ray3D.position.z];
			this._rayTriangleKernel.data.rayDirection.value = [ray3D.direction.x, ray3D.direction.y, ray3D.direction.z];
		}

		public testSubMeshCollision(subMesh:SubMesh, pickingCollisionVO:PickingCollisionVO, shortestCollisionDistance:number, bothSides:boolean = true):boolean
		{
			var subGeom:SubGeometry = subMesh.subGeometry;

			var cx:number, cy:number, cz:number;
			var u:number, v:number, w:number;
			var indexData:number[] = subGeom.indexData;
			var vertexData:number[] = subGeom.vertexPositionData;
			var uvData:number[] = subGeom.UVData;
			var numericIndexData:number[] = number[](indexData);
			var indexBufferDims:Point = this.evaluateArrayAsGrid(numericIndexData);

			//更新几何体数据到渲染器
			if (!this._lastSubMeshUploaded || this._lastSubMeshUploaded !== subMesh)
			{
				//上传顶点数据到pb
				var duplicateVertexData:number[] = vertexData.concat();
				var vertexBufferDims:Point = this.evaluateArrayAsGrid(duplicateVertexData);
				this._rayTriangleKernel.data.vertexBuffer.width = vertexBufferDims.x;
				this._rayTriangleKernel.data.vertexBuffer.height = vertexBufferDims.y;
				this._rayTriangleKernel.data.vertexBufferWidth.value = [vertexBufferDims.x];
				this._rayTriangleKernel.data.vertexBuffer.input = duplicateVertexData;
				this._rayTriangleKernel.data.bothSides.value = [bothSides ? 1.0 : 0.0];

				//上传索引数据到pb
				this._rayTriangleKernel.data.indexBuffer.width = indexBufferDims.x;
				this._rayTriangleKernel.data.indexBuffer.height = indexBufferDims.y;
				this._rayTriangleKernel.data.indexBuffer.input = numericIndexData;
			}

			this._lastSubMeshUploaded = subMesh;

			//运行渲染器(计算器)
			var shaderJob:ShaderJob = new ShaderJob(this._rayTriangleKernel, this._kernelOutputBuffer, indexBufferDims.x, indexBufferDims.y);
			shaderJob.start(true);

			//从输出数据中查找最优相交
			var i:number;
			var t:number;
			var collisionTriangleIndex:number = -1;
			var len:number = this._kernelOutputBuffer.length;
			for (i = 0; i < len; i += 3)
			{
				t = this._kernelOutputBuffer[i];
				if (t > 0 && t < shortestCollisionDistance)
				{
					shortestCollisionDistance = t;
					collisionTriangleIndex = i;

					if (!this._findClosestCollision)
						break;
				}
			}

			//检测冲突，收集数据
			if (collisionTriangleIndex >= 0)
			{
				pickingCollisionVO.rayEntryDistance = shortestCollisionDistance;

				pickingCollisionVO.localPosition = ray3D.getPoint(shortestCollisionDistance);

				pickingCollisionVO.localNormal = getCollisionNormal(indexData, vertexData, collisionTriangleIndex, pickingCollisionVO.localNormal);

				v = this._kernelOutputBuffer[collisionTriangleIndex + 1]; // barycentric coord 1
				w = this._kernelOutputBuffer[collisionTriangleIndex + 2]; // barycentric coord 2
				u = 1.0 - v - w;
				pickingCollisionVO.uv = getCollisionUV(indexData, uvData, collisionTriangleIndex, v, w, u, 0, 2, pickingCollisionVO.uv);
				pickingCollisionVO.index = collisionTriangleIndex * 3;
				return true;
			}

			return false;
		}

		/**
		 * 评估格子
		 * @param array
		 * @return
		 */
		private evaluateArrayAsGrid(array:number[]):Point
		{
			var count:number = array.length / 3;
			var w:number = Math.floor(Math.sqrt(count));
			var h:number = w;
			var i:number;
			while (w * h < count)
			{
				for (i = 0; i < w; ++i)
					array.push(0.0, 0.0, 0.0);
				h++;
			}
			return new Point(w, h);
		}
	}
}
