module feng3d
{
	
	
	
	
	
	
	
	
	
	
	
	
	
	

	

	/**
	 * 材质基类
	 * @author feng 2014-4-15
	 */
	export class MaterialBase extends Component implements IAsset
	{
		protected _namedAsset:NamedAsset;
		/**
		 * 唯一编号
		 */
		public _uniqueId:number;

		/**
		 * 渲染序列编号
		 */
		public _renderOrderId:number;

		private _bothSides:boolean;

		private _owners:IMaterialOwner[];

		private _alphaPremultiplied:boolean;

		private _blendMode:string = BlendMode.NORMAL;

		protected _numPasses:number;

		protected _mipmap:boolean = true;
		protected _smooth:boolean = true;
		protected _repeat:boolean;

		protected _passes:MaterialPassBase[];

		protected _depthPass:DepthMapPass;
		protected _planarShadowPass:PlanarShadowPass;

		protected _lightPicker:LightPickerBase;

		/**
		 * 创建一个材质基类
		 */
		constructor()
		{
			this._namedAsset = new NamedAsset(this,AssetType.MATERIAL);
			this._owners = new IMaterialOwner[]();
			this._passes = new MaterialPassBase[]();
			this._depthPass = new DepthMapPass();
			this._planarShadowPass = new PlanarShadowPass();

			// Default to considering pre-multiplied textures while blending
			this.alphaPremultiplied = true;
		}

		/**
		 * 深度渲染通道
		 */
		public get depthPass():DepthMapPass
		{
			return _depthPass;
		}

		/**
		 * 平面阴影映射通道
		 */
		public get planarShadowPass():PlanarShadowPass
		{
			return _planarShadowPass;
		}

		/**
		 * 是否双面渲染
		 */
		public get bothSides():boolean
		{
			return _bothSides;
		}

		public set bothSides(value:boolean)
		{
			_bothSides = value;

			for (var i:number = 0; i < _numPasses; ++i)
				_passes[i].bothSides = value;
		}

		/**
		 * 是否需要混合
		 */
		public get requiresBlending():boolean
		{
			return _blendMode != BlendMode.NORMAL;
		}

		/**
		 * 混合模式
		 */
		public get blendMode():string
		{
			return _blendMode;
		}

		public set blendMode(value:string)
		{
			_blendMode = value;
		}

		/**
		 * Indicates whether visible textures (or other pixels) used by this material have
		 * already been premultiplied. Toggle this if you are seeing black halos around your
		 * blended alpha edges.
		 */
		public get alphaPremultiplied():boolean
		{
			return _alphaPremultiplied;
		}

		public set alphaPremultiplied(value:boolean)
		{
			_alphaPremultiplied = value;

			for (var i:number = 0; i < _numPasses; ++i)
				_passes[i].alphaPremultiplied = value;
		}

		/**
		 * 是否使用纹理分级细化
		 */
		public get mipmap():boolean
		{
			return _mipmap;
		}

		public set mipmap(value:boolean)
		{
			_mipmap = value;
			for each (var pass:MaterialPassBase in _passes)
			{
				pass.mipmap = value;
			}
		}

		/**
		 * 是否重复
		 */
		public get repeat():boolean
		{
			return _repeat;
		}

		public set repeat(value:boolean)
		{
			_repeat = value;
			for each (var pass:MaterialPassBase in _passes)
			{
				pass.repeat = value;
			}
		}

		/**
		 * 是否平滑
		 */
		public get smooth():boolean
		{
			return _smooth;
		}

		public set smooth(value:boolean)
		{
			_smooth = value;
			for each (var pass:MaterialPassBase in _passes)
			{
				pass.smooth = value;
			}
		}

		/**
		 * 添加通道
		 * @param pass 通道
		 */
		protected addPass(pass:MaterialPassBase)
		{
			this._passes.push(pass);
			this._numPasses = this._passes.length;

			pass.alphaPremultiplied = this._alphaPremultiplied;

			pass.mipmap = this._mipmap;
			pass.smooth = this._smooth;
			pass.repeat = this._repeat;
			pass.bothSides = this._bothSides;
			pass.addEventListener(Event.CHANGE, this.onPassChange);
			this.invalidatePasses(null);
		}

		/**
		 * 获取渲染通道
		 * @param index		渲染通道索引
		 * @return			返回指定索引处渲染通道
		 */
		public getPass(index:number):MaterialPassBase
		{
			return this._passes[index];
		}

		/**
		 * 处理通道变化事件
		 */
		private onPassChange(event:Event)
		{

		}

		/**
		 * 移除通道
		 * @param pass 通道
		 */
		protected removePass(pass:MaterialPassBase)
		{
			this._passes.splice(this._passes.indexOf(pass), 1);
		}

		/**
		 * 动画集合
		 */
		public set animationSet(value:IAnimationSet)
		{
			for each (var pass:MaterialPassBase in _passes)
			{
				pass.animationSet = value;
			}
			depthPass.animationSet = value;
			planarShadowPass.animationSet = value;
		}

		/**
		 * 灯光采集器
		 */
		public get lightPicker():LightPickerBase
		{
			return _lightPicker;
		}

		public set lightPicker(value:LightPickerBase)
		{
			if (value != _lightPicker)
			{
				_lightPicker = value;
				var len:number = _passes.length;
				for (var i:number = 0; i < len; ++i)
					_passes[i].lightPicker = _lightPicker;
			}
		}

		/**
		 * 通道失效
		 */
		public invalidatePasses(triggerPass:MaterialPassBase)
		{
			for each (var pass:MaterialPassBase in this._passes)
			{
				if (pass != triggerPass)
					pass.invalidateShaderProgram();
			}
		}

		/**
		 * 渲染通道数量
		 */
		public get numPasses():number
		{
			return _numPasses;
		}

		/**
		 * 更新材质
		 */
		public updateMaterial()
		{

		}

		/**
		 * 清除通道渲染状态
		 * @param index				通道索引
		 * @param stage3DProxy		3D舞台代理
		 */
		public deactivatePass(index:number)
		{
			this._passes[index].deactivate();
		}

		/**
		 * 停用材质的最后一个通道
		 */
		public deactivate()
		{
			this._passes[this._numPasses - 1].deactivate();
		}

		/**
		 * 添加材质拥有者
		 * @param owner		材质拥有者
		 */
		public addOwner(owner:IMaterialOwner)
		{
			this._owners.push(owner);
		}

		/**
		 * 移除材质拥有者
		 * @param owner		材质拥有者
		 */
		public removeOwner(owner:IMaterialOwner)
		{
			this._owners.splice(this._owners.indexOf(owner), 1);
			if (this._owners.length == 0)
			{
				this.invalidatePasses(null);
			}
		}

		/**
		 * Cleans up resources owned by the material, including passes. Textures are not owned by the material since they
		 * could be used by other materials and will not be disposed.
		 */
		public dispose()
		{
			var i:number;

			for (i = 0; i < this._numPasses; ++i)
				this._passes[i].dispose();

			this._depthPass.dispose();
			this._depthPass.removeEventListener(Event.CHANGE, this.onPassChange);
		}
		
		public get namedAsset():NamedAsset
		{
			return _namedAsset;
		}
	}
}
