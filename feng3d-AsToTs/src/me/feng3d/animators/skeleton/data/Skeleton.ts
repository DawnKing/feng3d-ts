module feng3d
{
	
	
	
	


	/**
	 * 骨骼数据
	 * @author feng 2014-5-20
	 */
	export class Skeleton extends Component implements IAsset
	{
		private _namedAsset:NamedAsset;
		/** 骨骼关节数据列表 */
		public joints:SkeletonJoint[];

		public Skeleton()
		{
			this._namedAsset = new NamedAsset(this,AssetType.SKELETON);
			this.joints = new SkeletonJoint[]();
		}

		public get numJoints():number
		{
			return joints.length;
		}
		
		public get namedAsset():NamedAsset
		{
			return _namedAsset;
		}
	}
}
