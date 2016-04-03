module feng3d {

    /**
     * 尝试获取可连接地址
     * @author feng 2015-12-15
     */
    class TryConnectURLTaskItem extends TaskItem {
        private loader: URLLoader;
        public result: boolean;
        public url: string;

        constructorTaskItem(url: string) {
            this.url = url;
        }

        /**
         * @inheritDoc
         */
        public execute(param = null) {
            this.tryConnect();
        }

        private tryConnect() {
            this.loader = new URLLoader();
            this.addListeners();

            var request: URLRequest = new URLRequest(this.url + "?version=" + Math.random());
            try {
                this.loader.load(request);
            }
            catch (error) {
                this.connectFailure();
            }
        }

        private addListeners() {
            this.loader.addEventListener(Event.COMPLETE, this.connectSucceed);
            this.loader.addEventListener(SecurityErrorEvent.SECURITY_ERROR, this.connectFailure);
            this.loader.addEventListener(IOErrorEvent.IO_ERROR, this.ioErrorHandler);
        }

        private removeListeners() {
            this.loader.removeEventListener(Event.COMPLETE, this.connectSucceed);
            this.loader.removeEventListener(SecurityErrorEvent.SECURITY_ERROR, this.connectFailure);
            this.loader.removeEventListener(IOErrorEvent.IO_ERROR, this.ioErrorHandler);
        }

        private connectFailure(...args) {
            this.result = false;
            this.connentEnd();
        }

        private connectSucceed(...args) {
            this.result = true;
            this.connentEnd();
        }

        private connentEnd() {
            this.removeListeners();
            this.loader = null;

            this.doComplete();
        }

        private ioErrorHandler(event: IOErrorEvent) {
            if (this.loader.bytesLoaded > 0) {
                this.connectSucceed();
            }
            else {
                this.connectFailure();
            }
        }
    }

}