module feng3d
{
	
	
	
	
	
	

	/**
	 * 被添加到组件容器后触发
	 */
	[Event(name = "beAddedComponet", type = "me.feng.component.event.ComponentEvent")]

	/**
	 * 从组件容器被移除后触发
	 */
	[Event(name = "beRemovedComponet", type = "me.feng.component.event.ComponentEvent")]

	/**
	 * 添加子组件后触发
	 */
	[Event(name = "addedComponet", type = "me.feng.component.event.ComponentEvent")]

	/**
	 * 移除子组件后触发
	 */
	[Event(name = "removedComponet", type = "me.feng.component.event.ComponentEvent")]

	/**
	 * 组件容器（集合）
	 * @author feng 2015-5-6
	 */
	export class Component extends FEventDispatcher
	{
		private _componentName:string;

		/**
		 * 组件列表
		 */
		protected components:Array = []; //我并不喜欢使用vector，这使得我不得不去处理越界的问题，繁琐！此处重新修改为Array！

		public set componentName(value:string)
		{
			_componentName = value;
		}

		/**
		 * 组件名称
		 */
		public get componentName():string
		{
			_componentName ||= ClassUtils.getDefaultName(this);

			return _componentName;
		}

		/**
		 * 创建一个组件容器
		 */
		constructor()
		{
			super();
		}

		/**
		 * 子组件个数
		 */
		public get numComponents():number
		{
			return components.length;
		}

		/**
		 * 添加组件
		 * @param com 被添加组件
		 */
		public addComponent(com:Component)
		{
			assert(com != this, "子项与父项不能相同");

			if (this.hasComponent(com))
			{
				this.setComponentIndex(com, this.components.length - 1);
				return;
			}

			this.addComponentAt(com, this.components.length);
		}

		/**
		 * 添加组件到指定位置
		 * @param component		被添加的组件
		 * @param index			插入的位置
		 */
		public addComponentAt(component:Component, index:number)
		{
			assert(component != this, "子项与父项不能相同");
			assert(index >= 0 && index <= this.numComponents, "给出索引超出范围");

			if (this.hasComponent(component))
			{
				index = Math.min(index, this.components.length - 1);
				this.setComponentIndex(component, index)
				return;
			}

			this.components.splice(index, 0, component);
			var addedComponentEventVO:AddedComponentEventVO = new AddedComponentEventVO(this, component);
			var addedComponentEvent:ComponentEvent = new ComponentEvent(ComponentEvent.ADDED_COMPONET, addedComponentEventVO);
			this.dispatchEvent(addedComponentEvent);
			var beAddedComponentEvent:ComponentEvent = new ComponentEvent(ComponentEvent.BE_ADDED_COMPONET, addedComponentEventVO);
			component.dispatchEvent(beAddedComponentEvent);
		}

		/**
		 * 移除组件
		 * @param com 被移除组件
		 */
		public removeComponent(com:Component)
		{
			assert(this.hasComponent(com), "只能移除在容器中的组件");

			var index:number = this.getComponentIndex(com);
			this.removeComponentAt(index);
		}

		/**
		 * 移除组件
		 * @param index		要删除的 Component 的子索引。
		 */
		public removeComponentAt(index:number):Component
		{
			assert(index >= 0 && index < this.numComponents, "给出索引超出范围");

			var removeComponent:Component = this.components.splice(index, 1)[0];
			return removeComponent;
		}

		/**
		 * 获取组件在容器的索引位置
		 * @param com			查询的组件
		 * @return				组件在容器的索引位置
		 */
		public getComponentIndex(com:Component):number
		{
			assert(this.components.indexOf(com) != -1, "组件不在容器中");

			var index:number = this.components.indexOf(com);
			return index;
		}

		/**
		 * 设置子组件的位置
		 * @param com				子组件
		 * @param index				位置索引
		 */
		public setComponentIndex(com:Component, index:number)
		{
			assert(index >= 0 && index < this.numComponents, "给出索引超出范围");

			var oldIndex:number = this.components.indexOf(com);
			assert(oldIndex >= 0 && oldIndex < this.numComponents, "子组件不在容器内");

			this.components.splice(oldIndex, 1);
			this.components.splice(index, 0, com);
		}

		/**
		 * 获取指定位置索引的子组件
		 * @param index			位置索引
		 * @return				子组件
		 */
		public getComponentAt(index:number):*
		{
			assert(index < this.numComponents, "给出索引超出范围");
			return this.components[index];
		}

		/**
		 * 根据组件名称获取组件
		 * <p>注意：此处比较的是componentName而非name</p>
		 * @param componentName		组件名称
		 * @return 					获取到的组件
		 */
		public getComponentByName(componentName:string):*
		{
			var filterResult:Array = this.getComponentsByName(componentName);
			return filterResult[0];
		}

		/**
		 * 获取与给出组件名称相同的所有组件
		 * <p>注意：此处比较的是componentName而非name</p>
		 * @param componentName		组件名称
		 * @return 					获取到的组件
		 */
		public getComponentsByName(componentName:string):Array
		{
			var filterResult:Array = this.components.filter(function(item:Component, ... args):boolean
			{
				return item.componentName == componentName;
			});

			return filterResult;
		}

		/**
		 * 根据类定义获取组件
		 * <p>如果存在多个则返回第一个</p>
		 * @param cls				类定义
		 * @return
		 */
		public getComponentByClass(cls:Class):*
		{
			var component:Component = this.getComponentsByClass(cls)[0];

			return component;
		}

		/**
		 * 根据类定义查找组件
		 * @param cls		类定义
		 * @return			返回与给出类定义一致的组件
		 */
		public getComponentsByClass(cls:Class):Array
		{
			var filterResult:Array = this.components.filter(function(item:Component, ... args):boolean
			{
				return ClassUtils.isSameClass(item, cls);
			});

			return filterResult;
		}

		/**
		 * 根据类定义获取或创建组件
		 * <p>当不存在该类型对象时创建一个该组件并且添加到容器中</p>
		 * @param cls
		 * @return
		 */
		public getOrCreateComponentByClass(cls:Class):*
		{
			var component:Component = this.getComponentByClass(cls);

			if (component == null)
			{
				component = new cls();
				this.addComponent(component);
			}

			return component;
		}

		/**
		 * 判断是否拥有组件
		 * @param com	被检测的组件
		 * @return		true：拥有该组件；false：不拥有该组件。
		 */
		public hasComponent(com:Component):boolean
		{
			return this.components.indexOf(com) != -1;
		}

		/**
		 * 交换子组件位置
		 * @param index1		第一个子组件的索引位置
		 * @param index2		第二个子组件的索引位置
		 */
		public swapComponentsAt(index1:number, index2:number)
		{
			assert(index1 >= 0 && index1 < this.numComponents, "第一个子组件的索引位置超出范围");
			assert(index2 >= 0 && index2 < this.numComponents, "第二个子组件的索引位置超出范围");

			var temp:Component = this.components[index1];
			this.components[index1] = this.components[index2];
			this.components[index2] = temp;
		}

		/**
		 * 交换子组件位置
		 * @param com1		第一个子组件
		 * @param com2		第二个子组件
		 */
		public swapComponents(com1:Component, com2:Component)
		{
			assert(this.hasComponent(com1), "第一个子组件不在容器中");
			assert(this.hasComponent(com2), "第二个子组件不在容器中");

			this.swapComponentsAt(this.getComponentIndex(com1), this.getComponentIndex(com2));
		}

		/**
		 * 派发子组件事件
		 * <p>事件广播给子组件</p>
		 * @param event
		 */
		protected dispatchChildrenEvent(event:FEvent)
		{
			this.components.forEach(function(item:Component, ... args)
			{
				item.dispatchEvent(event);
			});
		}

	}
}
