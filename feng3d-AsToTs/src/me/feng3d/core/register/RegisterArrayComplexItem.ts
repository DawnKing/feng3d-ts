module feng3d
{
	

	/**
	 * 寄存器数组复杂元素
	 * @author feng 2014-11-3
	 */
	export class RegisterArrayComplexItem extends RegisterArrayItem
	{
		private _complexArgs:Array;

		/**
		 * 创建一个寄存器数组复杂元素
		 * @param registerArray			所属寄存器数组
		 * @param complexArgs			复杂参数（用来计算所在寄存器数组中的索引值）
		 * @param arrayIndex			起始索引值
		 */
		public RegisterArrayComplexItem(registerArray:RegisterArray, complexArgs:Array, startIndex:number)
		{
			this._complexArgs = complexArgs;

			super(registerArray, startIndex);
		}

		/**
		 * 复杂参数（用来计算所在寄存器数组中的索引值）
		 */
		public get complexArgs():Array
		{
			return _complexArgs;
		}

		/**
		 * @inheritDoc
		 */
		public toString():string
		{
			var _numStr:string = this._complexArgs.join("+");

			if (Register.TO_STRING == Register.NAME)
				return this.regId + "[" + _numStr + "+" + _arrayIndex + "]";

			if (_regType != RegisterType.OP && _regType != RegisterType.OC)
				return this.regType + "[" + _numStr + "+" + (_arrayIndex + _registerArray.index) + "]";
			return _regType;
		}
	}
}
