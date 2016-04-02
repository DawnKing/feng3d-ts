module feng3d
{

	/**
	 * 纹理类型
	 * @author feng 2014-10-23
	 */
	export class TextureType
	{
		/**  Images in this texture all are 2-dimensional. They have width and height, but no depth. */
		static public TYPE_2D:string = "2d";

		/**  Images in this texture all are 3-dimensional. They have width, height, and depth. */
		static public TYPE_3D:string = "3d";

		/**  There are exactly 6 distinct sets of 2D images, all of the same size. They act as 6 faces of a cube. */
		static public TYPE_CUBE:string = "cube";

	}
}
