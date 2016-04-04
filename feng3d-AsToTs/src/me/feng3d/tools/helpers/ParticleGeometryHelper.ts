module feng3d
{
	
	
	
	
	

	/**
	 * 粒子几何体帮助类
	 */
	export class ParticleGeometryHelper
	{
		/** stage3d单次渲染支持的最大顶点数 */
		public static MAX_VERTEX:number = 65535;

		/**
		 * 创建一个粒子几何体
		 * @param geometries 单个粒子几何体列表
		 * @param transforms
		 * @return 粒子几何体
		 */
		public static generateGeometry(geometries:Geometry[]):ParticleGeometry
		{
			var particleGeometry:ParticleGeometry = new ParticleGeometry();
			/** 粒子数量 */
			var numParticles:number = particleGeometry.numParticles = geometries.length;
			/** 粒子数据 */
			var particles:ParticleData[] = particleGeometry.particles = new ParticleData[](numParticles, true);

			/** 当前粒子子几何体 */
			var particleSubGeometry:SubGeometry = createParticleSubGeometry();
			particleGeometry.addSubGeometry(particleSubGeometry);

			//单个粒子几何体
			var sourceGeometry:Geometry;
			/** 单个粒子子几何体列表 */
			var sourceSubGeometries:SubGeometry[];
			/** 单个粒子的子几何体 */
			var sourceSubGeometry:SubGeometry;
			/** 单个粒子子几何体数 */
			var numSubGeometries:number;
			/** 单个粒子子几何体索引 */
			var srcIndex:number = 0;

			/** 粒子索引 */
			var i:number;

			//遍历粒子
			for (i = 0; i < numParticles; i++)
			{
				sourceGeometry = geometries[i];
				if (sourceGeometry.numVertices > MAX_VERTEX)
					throw new Error("不支持顶点数大于" + MAX_VERTEX + "的粒子");

				sourceSubGeometries = geometries[i].subGeometries;
				numSubGeometries = sourceSubGeometries.length;

				//判断 当前单个粒子子网格 是否会使当前粒子子几何体顶点数量超出最大值 ,如果超出就创建一个新的粒子子几何体
				if (sourceGeometry.numVertices + particleSubGeometry.numVertices > MAX_VERTEX)
				{
					particleSubGeometry = createParticleSubGeometry();
					particleGeometry.addSubGeometry(particleSubGeometry);
				}

				//收集粒子数据
				var particleData:ParticleData = new ParticleData();
				particleData.numVertices = sourceGeometry.numVertices;
				particleData.startVertexIndex = particleSubGeometry.numVertices;
				particleData.subGeometry = particleSubGeometry;
				particles[i] = particleData;

				//遍历单个粒子的子几何体
				for (srcIndex = 0; srcIndex < numSubGeometries; srcIndex++)
				{
					//设置当前单个粒子子网格
					sourceSubGeometry = sourceSubGeometries[srcIndex];
					//添加 单个粒子的子几何体 到  当前粒子子几何体
					GeomUtil.addSubGeometry(sourceSubGeometry, particleSubGeometry);
				}
			}

			return particleGeometry;
		}

		public static createParticleSubGeometry():SubGeometry
		{
			/** 当前粒子子几何体 */
			var particleSubGeometry:SubGeometry = new SubGeometry();
			particleSubGeometry.updateIndexData(new number[]());
			return particleSubGeometry;
		}

	}


}