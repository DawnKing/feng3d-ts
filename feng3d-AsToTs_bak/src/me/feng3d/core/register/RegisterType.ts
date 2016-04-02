module feng3d
{


	/**
	 * 寄存器类型
	 * @author feng 2014-6-9
	 */
	export class RegisterType
	{
		/** 顶点属性寄存器 */
		public static VA:string = "va";

		/** 顶点程序常量寄存器 */
		public static VC:string = "vc";

		/** 顶点临时寄存器 */
		public static VT:string = "vt";

		/** 顶点程序输出寄存器 */
		public static OP:string = "op";

		/**变量寄存器 */
		public static V:string = "v";

		/** 片段程序的纹理寄存器 */
		public static FS:string = "fs";

		/** 片段程序常量寄存器 */
		public static FC:string = "fc";

		/** 片段程序临时寄存器 */
		public static FT:string = "ft";

		/** 片段程序输出寄存器 */
		public static OC:string = "oc";

		/**
		 * 是否常量
		 * @param regType		寄存器类型
		 */
		public static function isConst(regType:string):boolean
		{
			return regType == VC || regType == FC;
		}

		/**
		 * 是否临时变量
		 * @param regType		寄存器类型
		 */
		public static function isTemp(regType:string):boolean
		{
			return regType == VT || regType == FT;
		}

		/**
		 * 是否只读
		 * @param regType		寄存器类型
		 * @return
		 */
		public static function isReadOnly(regType:string):boolean
		{
			switch (regType)
			{
				case VA:
					return true;
				case VC:
					return true;
				case VT:
					return false;
				case OP:
					return false;
				case V:
					return false;
				case FS:
					return true;
				case FC:
					return true;
				case FT:
					return false;
				case OC:
					return false;
			}
			throw new Error("错误寄存器类型");
		}

		/**
		 * 是否可以在顶点寄存器中出现
		 * @param regType		寄存器类型
		 * @return
		 */
		public static function inVertex(regType:string):boolean
		{
			switch (regType)
			{
				case VA:
					return true;
				case VC:
					return true;
				case VT:
					return true;
				case OP:
					return true;
				case V:
					return true;
				case FS:
					return false;
				case FC:
					return false;
				case FT:
					return false;
				case OC:
					return false;
			}
			throw new Error("错误寄存器类型");
		}

		/**
		 * 是否可以在片段寄存器中出现
		 * @param regType		寄存器类型
		 * @return
		 */
		public static function inFragment(regType:string):boolean
		{
			switch (regType)
			{
				case VA:
					return false;
				case VC:
					return false;
				case VT:
					return false;
				case OP:
					return false;
				case V:
					return true;
				case FS:
					return true;
				case FC:
					return true;
				case FT:
					return true;
				case OC:
					return true;
			}
			throw new Error("错误寄存器类型");
		}

		/**
		 * 是否为输入数据寄存器
		 * @param regType		寄存器类型
		 * @return
		 */
		public static function isInputDataRegister(regType:string):boolean
		{
			switch (regType)
			{
				case VA:
					return true;
				case VC:
					return true;
				case VT:
					return false;
				case OP:
					return false;
				case V:
					return false;
				case FS:
					return true;
				case FC:
					return true;
				case FT:
					return false;
				case OC:
					return false;
			}
			throw new Error("错误寄存器类型");
		}
	}
}
