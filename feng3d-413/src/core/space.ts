module feng3d {
    /**
     * 空间，包含坐标、旋转、缩放
     */
    export interface space {
        x: number;
        y: number;
        z: number;
        rx: number;
        ry: number;
        rz: number;
        sx: number;
        sy: number;
        sz: number;
    }
}