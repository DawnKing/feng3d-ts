module feng3d
{
	

	/**
	 * 寄存器数组元素
	 * @author feng 2014-11-3
	 */
	export class RegisterArrayItem extends Register
	{
		/**
		 * 数组编号
		 */
		protected _arrayIndex:number;

		protected _registerArray:RegisterArray;

		/**
		 * 创建一个寄存器数组元素
		 * @param registerArray			所属寄存器数组
		 * @param arrayIndex			所在寄存器数组中的索引
		 */
		public RegisterArrayItem(registerArray:RegisterArray, arrayIndex:number)
		{
			super(registerArray.regId);

			this._registerArray = registerArray;
			this._arrayIndex = arrayIndex;
		}

		public toString():string
		{
			if (Register.TO_STRING == Register.NAME)
				return this.regId + "[" + this._arrayIndex + "]";

			if (_regType != RegisterType.OP && _regType != RegisterType.OC)
				return this.regType + (this._arrayIndex + this._registerArray.index);
			return _regType;
		}

	}
}
