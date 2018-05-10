var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * facebook 测试菜单
 *
 * 商业词汇【活命】
 * 1 看广告活命
 * 2 分享活命
 */
var FaceBookManger = (function () {
    function FaceBookManger() {
    }
    // private static _that: egret.DisplayObjectContainer;
    // public constructor() {
    //     // super();
    //     // this.once(egret.Event.ADDED_TO_STAGE, this.addStage, this);
    // }
    FaceBookManger.prototype.init = function () {
        this.initializeAsync();
    };
    FaceBookManger.prototype.startGameAsync = function () {
        FBInstant.startGameAsync().then(function () {
            console.log("start game");
        });
    };
    FaceBookManger.prototype.initializeAsync = function () {
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
    };
    FaceBookManger.prototype.baseinfo = function () {
        console.log("baseinfo");
        console.log("getLocale:", FBInstant.getLocale());
        console.log("getPlatform:", FBInstant.getPlatform());
        console.log("getSDKVersion", FBInstant.getSDKVersion());
        console.log("getSupportedAPIs", FBInstant.getSupportedAPIs());
        console.log("getEntryPointData", FBInstant.getEntryPointData());
    };
    FaceBookManger.prototype.quit = function () {
        console.log("quit");
        FBInstant.quit();
    };
    FaceBookManger.prototype.logEvent = function () {
        console.log("logEvent");
        FBInstant.logEvent("test", 2, { "test": "ta" });
    };
    FaceBookManger.prototype.share = function () {
        console.log("share");
        var data = {
            intent: "",
            text: "",
            image: "",
        };
        FBInstant.shareAsync(data);
    };
    FaceBookManger.prototype.shareAsync = function () {
        console.log("shareAsync");
        var data = {
            intent: "",
            text: "",
            image: "",
        };
        FBInstant.shareAsync(data);
    };
    FaceBookManger.prototype.player = function () {
        console.log("player");
        console.log("player.getID", FBInstant.player.getID());
        console.log("player.getName", FBInstant.player.getName());
        console.log("player.getPhoto", FBInstant.player.getPhoto());
    };
    FaceBookManger.prototype.getEgretConnectedPlayersAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var datas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("frends info:::");
                        return [4 /*yield*/, FBInstant.player.getConnectedPlayersAsync()];
                    case 1:
                        datas = _a.sent();
                        console.log(datas);
                        datas.forEach(function (element) {
                            console.log("player.getID", element.getID());
                            console.log("player.getName", element.getName());
                            console.log("player.getPhoto", element.getPhoto());
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    FaceBookManger.prototype.contextinfo = function () {
        console.log("Context.getID", FBInstant.context.getID());
        console.log("Context.getType", FBInstant.context.getType());
    };
    /**
     * 排行榜设置数据
     * Add Scores to your Leaderboard
     * use the setScoreAsync method
     * @param {number} number
     * @param {string} ext
     */
    FaceBookManger.prototype.setPaiHangBang = function (number, ext) {
        FBInstant
            .getLeaderboardAsync(R.P_PAIHAI + FBInstant.context.getID())
            .then(function (leaderboard) {
            console.log(leaderboard.getName());
            return leaderboard.setScoreAsync(number, ext);
        })
            .then(function () { return console.log('Score saved'); })
            .catch(function (error) { return console.error(error); });
    };
    FaceBookManger.prototype.getEntriesAsync = function () {
        FBInstant
            .getLeaderboardAsync(R.P_PAIHAI + FBInstant.context.getID())
            .then(function (leaderboard) { return leaderboard.getEntriesAsync(10, 0); })
            .then(function (entries) {
            console.log("entries:", entries);
            // for (var i = 0; i < entries.length; i++) {
            //     console.log(
            //         entries[i].getRank() + '. ' +
            //         entries[i].getPlayer().getName() + ': ' +
            //         entries[i].getScore()
            //     );
            // }
        }).catch(function (error) { return console.error(error); });
    };
    FaceBookManger.prototype.getPlayerEntryAsync = function () {
        FBInstant
            .getLeaderboardAsync('my_awesome_leaderboard.' + FBInstant.context.getID())
            .then(function (leaderboard) { return leaderboard.getPlayerEntryAsync(); })
            .then(function (entries) {
            console.log("entries", entries);
            // for (var i = 0; i < entries.length; i++) {
            //     console.log(
            //         entries[i].getRank() + '. ' +
            //         entries[i].getPlayer().getName() + ': ' +
            //         entries[i].getScore()
            //     );
            // }
        }).catch(function (error) { return console.error(error); });
    };
    /**
     * 显示预加载广告
     */
    FaceBookManger.prototype.showPreloadAd = function () {
        //预加载广告对象
        var preloadedInterstitial = null;
        FBInstant.getInterstitialAdAsync(R.PRELOAD_AD).then(function (interstitial) {
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
    };
    /**
     * 显示【奖励】视频广告
     */
    FaceBookManger.prototype.showRewardedVideoAsync = function () {
        //视频广告对象
        var preloadedRewardedVideo = null;
        FBInstant.getRewardedVideoAsync(R.PREVIDEO_AD).then(function (rewarded) {
            // Load the Ad asynchronously
            preloadedRewardedVideo = rewarded;
            return preloadedRewardedVideo.loadAsync();
        }).then(function () {
            console.log('Rewarded video preloaded');
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
    };
    return FaceBookManger;
}());
__reflect(FaceBookManger.prototype, "FaceBookManger");
//# sourceMappingURL=FaceBookManger.js.map