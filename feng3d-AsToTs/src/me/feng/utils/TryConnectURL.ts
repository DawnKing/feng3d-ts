module feng3d {



	/**
	 * 尝试获取可连接地址
	 * @author feng 2015-12-15
	 */
    export class TryConnectURL extends TaskQueue {
        public connectedUrls: any[];

        public tryConnect(urls: any[]) {
            this.connectedUrls = [];
            for (var i: number = 0; i < urls.length; i++) {
                this.addItem(new TryConnectURLTaskItem(urls[i]));
            }
            this.execute();
        }

		/**
		 * @inheritDoc
		 */
        protected onCompletedItem(event: TaskEvent) {
            var taskItem: TryConnectURLTaskItem = <TryConnectURLTaskItem>event.target;
            if (taskItem.result) {
                this.connectedUrls.push(taskItem.url);
            }

            super.onCompletedItem(event);
        }
    }
}
