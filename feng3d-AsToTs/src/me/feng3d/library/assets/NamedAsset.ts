module feng3d
{
	


	



	/**
	 * 拥有名字的对象
	 * @author feng 2014-5-7
	 */
	export class NamedAsset
	{
		private static nameDic = {};

		private _asset:IAsset;
		public _assetType:string;
		private _name:string;

		/**
		 * 创建一个拥有名字的对象
		 */
		constructor(asset:IAsset, assetType:string)
		{
			super();
			this._asset = asset;
			this._assetType = assetType;
		}

		/**
		 * 名称
		 */
		public get name():string
		{
			if (!_name)
			{
				var defaultName:string = ClassUtils.getDefaultName(this);
				_name = defaultName + number(nameDic[defaultName]);
				nameDic[defaultName] = number(nameDic[defaultName]) + 1;
			}
			return _name;
		}

		public set name(value:string)
		{
//			if (_name)
//				throw new Error(getQualifiedClassName(this) + " -- 对象已经有名称，无法更改");
			_name = value;
		}

		/**
		 * @inheritDoc
		 */
		public get assetType():string
		{
			return _assetType;
		}

	}
}
