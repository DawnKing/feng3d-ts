module feng3d
{

	/**
	 *
	 * @author feng 2015-5-28
	 */
	export class FreeMatrixLens extends LensBase
	{
		constructor()
		{
			super();
		}

		protected updateMatrix()
		{
			this._matrixInvalid = false;
		}
	}
}
