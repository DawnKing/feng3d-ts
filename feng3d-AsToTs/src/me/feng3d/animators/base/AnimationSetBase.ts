module feng3d {

	/**
	 * 动画集合基类
	 * @author feng 2014-5-20
	 */
    export class AnimationSetBase extends Component implements IAsset {
        private _namedAsset: NamedAsset;
        public context3DBufferOwner: Context3DBufferOwner;

        private _usesCPU: boolean;
        /** 动画节点列表 */
        private _animations: AnimationNodeBase[] = new AnimationNodeBase[]();
        /** 动画名称列表 */
        private _animationNames: string[] = new string[]();
        /** 动画字典 */
        private _animationDictionary = new Dictionary(true);

		/**
		 * 创建一个动画集合基类
		 */
        constructor() {
            super();
            this._namedAsset = new NamedAsset(this, AssetType.ANIMATION_SET);
            AbstractClassError.check(this);
            this.context3DBufferOwner = new Context3DBufferOwner();
            this.initBuffers();
        }

		/**
		 * 初始化Context3d缓存
		 */
        protected initBuffers() {

        }

		/**
		 * Fagal编号中心
		 */
        public get _(): FagalIdCenter {
            return FagalIdCenter.instance;
        }

		/**
		 * 是否使用CPU
		 */
        public get usesCPU(): boolean {
            return _usesCPU;
        }

		/**
		 * Returns a vector of animation state objects that make up the contents of the animation data set.
		 */
        public get animations(): AnimationNodeBase[] {
            return _animations;
        }

		/**
		 * 添加动画
		 * @param node 动画节点
		 */
        public addAnimation(node: AnimationNodeBase) {
            if (this._animationDictionary[node.name])
                throw new AnimationSetError("root node animationName '" + node.name + "' already exists in the set");

            this._animationDictionary[node.name] = node;

            this._animations.push(node);

            this._animationNames.push(node.name);
        }

		/**
		 * 获取动画节点
		 * @param name 动画名称
		 * @return 动画节点
		 */
        public getAnimation(animationName: string): AnimationNodeBase {
            return this._animationDictionary[animationName];
        }

		/**
		 * 是否有某动画
		 * @param name 动画名称
		 */
        public hasAnimation(animationName: string): boolean {
            return this._animationDictionary[animationName] != null;
        }

		/**
		 * 重置使用GPU
		 */
        public resetGPUCompatibility() {
            this._usesCPU = false;
        }

		/**
		 * 取消使用GPU
		 */
        public cancelGPUCompatibility() {
            this._usesCPU = true;
        }

		/**
		 * 激活
		 * @param shaderParams	渲染参数
		 * @param stage3DProxy	3d舞台代理
		 * @param pass			渲染通道
		 * @throws	me.feng.error.AbstractMethodError
		 */
        public activate(shaderParams: ShaderParams, pass: MaterialPassBase) {
            throw new AbstractMethodError();
        }

        public get namedAsset(): NamedAsset {
            return _namedAsset;
        }

    }
}
