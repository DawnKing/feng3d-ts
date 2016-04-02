module feng3dBeat {

	/**
	 *
	 * @author cdz 2015-10-28
	 */
    export class HeartBeatManager extends FModuleManager {
		/**
		 * 心跳跳字典
		 */
        private _HeartBeatDic;

        private _frameEventDriver: Shape = new Shape();

        constructor() {
            this.init()

            this._frameEventDriver.addEventListener(Event.ENTER_FRAME, this.onEnterFrame);
        }

		/**
		 * @inheritDoc
		 */
        protected init() {
            //初始化默认任务集合类型字典
            this._HeartBeatDic = {};

            this.addListeners();
        }

		/**
		 * 添加事件监听器
		 */
        private addListeners() {
            dispatcher.addEventListener(HeartBeatModuleEvent.REGISTER_BEAT_TYPE, this.registerBeat);

            dispatcher.addEventListener(HeartBeatModuleEvent.UNREGISTER_BEAT_TYPE, this.unregisterBeat);

            dispatcher.addEventListener(HeartBeatModuleEvent.SUSPEND_ONE_BEAT, this.suspendOne);

            dispatcher.addEventListener(HeartBeatModuleEvent.RESUME_ONE_BEAT, this.resumeOne);

            dispatcher.addEventListener(HeartBeatModuleEvent.SUSPEND_All_BEAT, this.suspendAll);

            dispatcher.addEventListener(HeartBeatModuleEvent.RESUME_ALL_BEAT, this.resumeAll);
        }

		/**
		 * 注册心跳
		 */
        public registerBeat(e: HeartBeatModuleEvent) {
            var registerData: HeartBeatModuleData = e.data as HeartBeatModuleData;
            if (registerData) {
                var beatType: string = registerData.BeatType;
                var beatInterval: number = registerData.Interval;
                if (this._HeartBeatDic == null) {
                    this._HeartBeatDic = new Dictionary;
                }

                if (this._HeartBeatDic[beatType] == null) {
                    var beat: BeatBase = new BeatBase();
                    beat.BeatType = beatType;
                    beat.setInterval(beatInterval);
                    beat.beginBeat();

                    this._HeartBeatDic[beatType] = beat;
                }
            }
        }

		/**
		 * 注销心跳
		 */
        public unregisterBeat(e: HeartBeatModuleEvent) {
            var beatType: string = e.data;
            if (beatType != null && beatType != "") {
                if (this._HeartBeatDic == null) {
                    return;
                }
                var beat: BeatBase = this._HeartBeatDic[beatType];
                beat.dispose();
                this._HeartBeatDic[beatType] = null;
            }
        }

		/**
		 * 暂停一个
		 */
        public suspendOne(e: HeartBeatModuleEvent) {
            var beatType: string = e.data;
            if (beatType != null && beatType != "") {
                if (this._HeartBeatDic == null) {
                    return;
                }

                var pHeartBeat: BeatBase = this._HeartBeatDic[beatType];
                if (pHeartBeat) {
                    pHeartBeat.suspend();
                }
            }
        }

		/**
		 * 恢复跳动一个
		 */
        public resumeOne(e: HeartBeatModuleEvent) {
            var beatType: string = e.data;
            if (beatType != null && beatType != "") {
                if (this._HeartBeatDic == null) {
                    return;
                }

                var pHeartBeat: BeatBase = this._HeartBeatDic[beatType];
                if (pHeartBeat) {
                    pHeartBeat.resume();
                }
            }
        }

		/**
		 * 全部暂停
		 */
        public suspendAll(e: HeartBeatModuleEvent = null) {
            if (this._HeartBeatDic) {
                for each (var pHeartBeat: BeatBase in this._HeartBeatDic)
                {
                    if (pHeartBeat) {
                        pHeartBeat.suspend();
                    }
                }
            }
        }

		/**
		 * 恢复跳动
		 */
        public resumeAll(e: HeartBeatModuleEvent) {
            if (this._HeartBeatDic) {
                for each (var pHeartBeat: BeatBase in this._HeartBeatDic)
                {
                    if (pHeartBeat) {
                        pHeartBeat.resume();
                    }
                }
            }
        }

        private onEnterFrame(e: Event) {
            if (this._HeartBeatDic) {
                var date: Date = new Date;
                for each (var pHeartBeat: BeatBase in this._HeartBeatDic)
                {
                    if (pHeartBeat) {
                        pHeartBeat.beat(date);
                    }
                }
            }
        }

    }
}
