module feng3d
{
	
	

	

	/**
	 * 子几何体形变组件
	 * @author feng 2015-12-10
	 */
	export class SubGeometryTransformation extends SubGeometryComponent
	{
		private _scaleU:number = 1;
		private _scaleV:number = 1;

		public SubGeometryTransformation()
		{
			super();
		}

		public get scaleU():number
		{
			return _scaleU;
		}

		public get scaleV():number
		{
			return _scaleV;
		}

		public scaleUV(scaleU:number = 1, scaleV:number = 1)
		{
			var stride:number = subGeometry.getVALen(_.uv_va_2);
			var uvs:number[] = subGeometry.UVData;
			var len:number = uvs.length;
			var ratioU:number = scaleU / this._scaleU;
			var ratioV:number = scaleV / this._scaleV;

			for (var i:number = 0; i < len; i += stride)
			{
				uvs[i] *= ratioU;
				uvs[i + 1] *= ratioV;
			}

			this._scaleU = scaleU;
			this._scaleV = scaleV;

			subGeometry.setVAData(_.uv_va_2, uvs);
		}

		/**
		 * 缩放网格尺寸
		 */
		public scale(scale:number)
		{
			var vertices:number[] = subGeometry.getVAData(_.position_va_3);
			var len:number = vertices.length;
			var stride:number = subGeometry.getVALen(_.position_va_3);

			for (var i:number = 0; i < len; i += stride)
			{
				vertices[i] *= scale;
				vertices[i + 1] *= scale;
				vertices[i + 2] *= scale;
			}
			subGeometry.setVAData(_.position_va_3, vertices);
		}

		/**
		 * 应用变换矩阵
		 * @param transform 变换矩阵
		 */
		public applyTransformation(transform:Matrix3D)
		{
			var vertices:number[] = subGeometry.vertexPositionData;
			var normals:number[] = subGeometry.vertexNormalData;
			var tangents:number[] = subGeometry.vertexTangentData;

			var posStride:number = subGeometry.vertexPositionStride;
			var normalStride:number = subGeometry.vertexNormalStride;
			var tangentStride:number = subGeometry.vertexTangentStride;

			var len:number = vertices.length / posStride;
			var i:number, i1:number, i2:number;
			var vector:Vector3D = new Vector3D();

			var bakeNormals:boolean = normals != null;
			var bakeTangents:boolean = tangents != null;
			var invTranspose:Matrix3D;

			if (bakeNormals || bakeTangents)
			{
				invTranspose = transform.clone();
				invTranspose.invert();
				invTranspose.transpose();
			}

			var vi0:number = 0;
			var ni0:number = 0;
			var ti0:number = 0;

			for (i = 0; i < len; ++i)
			{
				i1 = vi0 + 1;
				i2 = vi0 + 2;

				// bake position
				vector.x = vertices[vi0];
				vector.y = vertices[i1];
				vector.z = vertices[i2];
				vector = transform.transformVector(vector);
				vertices[vi0] = vector.x;
				vertices[i1] = vector.y;
				vertices[i2] = vector.z;
				vi0 += posStride;

				// bake normal
				if (bakeNormals)
				{
					i1 = ni0 + 1;
					i2 = ni0 + 2;
					vector.x = normals[ni0];
					vector.y = normals[i1];
					vector.z = normals[i2];
					vector = invTranspose.deltaTransformVector(vector);
					vector.normalize();
					normals[ni0] = vector.x;
					normals[i1] = vector.y;
					normals[i2] = vector.z;
					ni0 += normalStride;
				}

				// bake tangent
				if (bakeTangents)
				{
					i1 = ti0 + 1;
					i2 = ti0 + 2;
					vector.x = tangents[ti0];
					vector.y = tangents[i1];
					vector.z = tangents[i2];
					vector = invTranspose.deltaTransformVector(vector);
					vector.normalize();
					tangents[ti0] = vector.x;
					tangents[i1] = vector.y;
					tangents[i2] = vector.z;
					ti0 += tangentStride;
				}
			}

			subGeometry.setVAData(_.position_va_3, vertices);
			subGeometry.setVAData(_.normal_va_3, normals);
			subGeometry.setVAData(_.tangent_va_3, tangents);
		}
	}
}
