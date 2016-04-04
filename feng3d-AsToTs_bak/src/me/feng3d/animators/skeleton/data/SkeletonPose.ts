module feng3d
{
	
	
	
	


	/**
	 * 骨骼pose
	 * @author feng 2014-5-20
	 */
	export class SkeletonPose extends Component implements IAsset
	{
		private _namedAsset:NamedAsset;
		/** 关节pose列表 */
		public jointPoses:JointPose[];

		public get numJointPoses():number
		{
			return jointPoses.length;
		}

		public SkeletonPose()
		{
			this._namedAsset = new NamedAsset(this,AssetType.SKELETON_POSE);
			this.jointPoses = new JointPose[]();
		}

		public get namedAsset():NamedAsset
		{
			return _namedAsset;
		}
	}
}