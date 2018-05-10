/**
 * facebook 测试菜单
 *
 * 商业词汇【活命】
 * 1 看广告活命
 * 2 分享活命
 */
class FaceBookManger {
    // private static _that: egret.DisplayObjectContainer;
    // public constructor() {
    //     // super();
    //     // this.once(egret.Event.ADDED_TO_STAGE, this.addStage, this);
    // }

    public init() {
        this.initializeAsync();

    }

    public startGameAsync() {

        FBInstant.startGameAsync().then(() => {
            console.log("start game");

        });
    }

    private initializeAsync(): void {
        FBInstant.initializeAsync().then(function () {
            console.log("getLocale:", FBInstant.getLocale());
            console.log("getPlatform:", FBInstant.getPlatform());
            console.log("getSDKVersion", FBInstant.getSDKVersion());
            console.log("getSupportedAPIs", FBInstant.getSupportedAPIs());
            console.log("getEntryPointData", FBInstant.getEntryPointData());
        });
        setTimeout(function () {
            FBInstant.setLoadingProgress(100);
        }, 1000);
    }

    private baseinfo() {
        console.log("baseinfo");
        console.log("getLocale:", FBInstant.getLocale());
        console.log("getPlatform:", FBInstant.getPlatform());
        console.log("getSDKVersion", FBInstant.getSDKVersion());
        console.log("getSupportedAPIs", FBInstant.getSupportedAPIs());
        console.log("getEntryPointData", FBInstant.getEntryPointData());
    }

    private quit(): void {
        console.log("quit");
        FBInstant.quit();
    }

    private logEvent(): void {
        console.log("logEvent");
        FBInstant.logEvent("test", 2, {"test": "ta"});
    }

    private share(): void {
        console.log("share");
        let data: FBInstant.SharePayload = {
            intent: "",
            text: "",
            image: "",
        };

        FBInstant.shareAsync(data);
    }

    private shareAsync(): void {
        console.log("shareAsync");
        let data: FBInstant.SharePayload = {
            intent: "",
            text: "",
            image: "",
        };
        FBInstant.shareAsync(data);
    }

    private player() {
        console.log("player");
        console.log("player.getID", FBInstant.player.getID());
        console.log("player.getName", FBInstant.player.getName());
        console.log("player.getPhoto", FBInstant.player.getPhoto());
    }

    private async getEgretConnectedPlayersAsync() {
        console.log("frends info:::");
        let datas: FBInstant.ConnectedPlayer[] = await FBInstant.player.getConnectedPlayersAsync();
        console.log(datas);
        datas.forEach(element => {
            console.log("player.getID", element.getID());
            console.log("player.getName", element.getName());
            console.log("player.getPhoto", element.getPhoto());
        });
    }

    private contextinfo(): void {
        console.log("Context.getID", FBInstant.context.getID());
        console.log("Context.getType", FBInstant.context.getType());
    }


    /**
     * 排行榜设置数据
     * Add Scores to your Leaderboard
     * use the setScoreAsync method
     * @param {number} number
     * @param {string} ext
     */
    public setPaiHangBang(number: number, ext: string) {
        FBInstant
            .getLeaderboardAsync(R.P_PAIHAI + FBInstant.context.getID())
            .then(leaderboard => {
                console.log(leaderboard.getName());
                return leaderboard.setScoreAsync(number, ext);
            })
            .then(() => console.log('Score saved'))
            .catch(error => console.error(error));
    }


    public getEntriesAsync(): void {
        FBInstant
            .getLeaderboardAsync(R.P_PAIHAI + FBInstant.context.getID())
            .then(leaderboard => leaderboard.getEntriesAsync(10, 0))
            .then(entries => {
                console.log("entries:", entries);
                // for (var i = 0; i < entries.length; i++) {
                //     console.log(
                //         entries[i].getRank() + '. ' +
                //         entries[i].getPlayer().getName() + ': ' +
                //         entries[i].getScore()
                //     );
                // }
            }).catch(error => console.error(error));
    }

    public getPlayerEntryAsync() {
        FBInstant
            .getLeaderboardAsync('my_awesome_leaderboard.' + FBInstant.context.getID())
            .then(leaderboard => leaderboard.getPlayerEntryAsync())
            .then(entries => {
                console.log("entries", entries);
                // for (var i = 0; i < entries.length; i++) {
                //     console.log(
                //         entries[i].getRank() + '. ' +
                //         entries[i].getPlayer().getName() + ': ' +
                //         entries[i].getScore()
                //     );
                // }
            }).catch(error => console.error(error));
    }

    /**
     * 显示预加载广告
     */
    public showPreloadAd() {
        //预加载广告对象
        let preloadedInterstitial = null;

        FBInstant.getInterstitialAdAsync(
            R.PRELOAD_AD, // Your Ad Placement Id
        ).then(function (interstitial) {
            // Load the Ad asynchronously
            preloadedInterstitial = interstitial;
            return preloadedInterstitial.loadAsync();
        }).then(function () {
            console.log('Interstitial preloaded');
            show_ad();
        }).catch(function (err) {
            console.error('Interstitial failed to preload: ' + err.message);
        });

        //显示预加载广告
        function show_ad() {
            preloadedInterstitial.showAsync()
                .then(function () {
                    // Perform post-ad success operation
                    console.log('Rewarded video watched successfully');
                })
                .catch(function (e) {
                    console.error(e.message);
                });
        }
    }

    /**
     * 显示【奖励】视频广告
     */
    public showRewardedVideoAsync() {
        //视频广告对象
        let preloadedRewardedVideo = null;

        FBInstant.getRewardedVideoAsync(
            R.PREVIDEO_AD, // Your Ad Placement Id
        ).then(function (rewarded) {
            // Load the Ad asynchronously
            preloadedRewardedVideo = rewarded;
            return preloadedRewardedVideo.loadAsync();
        }).then(function () {
            console.log('Rewarded video preloaded')
        }).catch(function (err) {
            console.error('Rewarded video failed to preload: ' + err.message);
        });

        //播放视频广告
        function showAd() {
            preloadedRewardedVideo.showAsync()
                .then(function () {
                    // Perform post-ad success operation
                    console.log('Rewarded video watched successfully');
                })
                .catch(function (e) {
                    console.error(e.message);
                });
        }
    }
}