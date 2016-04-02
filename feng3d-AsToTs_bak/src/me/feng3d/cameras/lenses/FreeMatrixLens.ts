module feng3d
{

	/**
	 *
	 * @author feng 2015-5-28
	 */
	export class FreeMatrixLens extends LensBase
	{
		public FreeMatrixLens()
		{
			super();
		}

		protected updateMatrix()
		{
			_matrixInvalid = false;
		}
	}
}
