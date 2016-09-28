module me.feng3d {
    export class ControllerBase {
        protected _autoUpdate: boolean = true;
        protected _targetObject: Object3D;

        constructor(targetObject: Object3D) {
            this._targetObject = targetObject;
        }

        public update(interpolate: boolean = true): void {
            throw Error;
        }

        protected notifyUpdate(): void {
            // todo implicitPartition
        }

        public get targetObject(): Object3D {
            return this._targetObject;
        }

        public set targetObject(val: Object3D) {
            if (this._targetObject == val)
                return;

            if (this._targetObject && this._autoUpdate)
                this._targetObject._controller = null;
            
            this._targetObject = val;

            if (this._targetObject && this._autoUpdate)
                this._targetObject._controller = this;
            
            this.notifyUpdate();
        }

        public get autoUpdate(): boolean {
            return this._autoUpdate;
        }

        public set autoUpdate(val: boolean) {
            if (this._autoUpdate == val)
                return;
            
            this._autoUpdate = val;

            if (this._targetObject) {
                if (this._autoUpdate)
                    this._targetObject._controller = this;
                else
                    this._targetObject._controller = null;
            }
        }
    }
}