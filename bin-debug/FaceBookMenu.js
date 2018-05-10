/**
 * facebook 测试菜单
 *
 * 商业词汇【活命】
 * 1 看广告活命
 * 2 分享活命
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var Context = /** @class */ (function () {
    function Context() {
    }
    Context.init = function (_stage) {
        Context.stageWidth = _stage.stageWidth;
        Context.stageHeight = _stage.stageHeight;
    };
    Context.stageWidth = 0;
    Context.stageHeight = 0;
    return Context;
}());
var FaceBookMenu = /** @class */ (function (_super) {
    __extends(FaceBookMenu, _super);
    function FaceBookMenu(title) {
        var _this = _super.call(this) || this;
        _this.viewNum = 0;
        _this.graphics.lineStyle(2, 0x282828);
        _this.graphics.moveTo(0, 35);
        _this.graphics.lineTo(Context.stageWidth, 35);
        _this.graphics.endFill();
        _this.graphics.lineStyle(2, 0x6a6a6a);
        _this.graphics.moveTo(0, 37);
        _this.graphics.lineTo(Context.stageWidth, 37);
        _this.graphics.endFill();
        _this.drawText(title);
        _this.addChild(_this.textF);
        return _this;
    }
    FaceBookMenu.prototype.drawText = function (label) {
        if (this.textF == null) {
            var text = new egret.TextField();
            text.text = label;
            text.width = Context.stageWidth;
            text.height = 35;
            text.size = 22;
            text.verticalAlign = egret.VerticalAlign.MIDDLE;
            text.textAlign = egret.HorizontalAlign.CENTER;
            this.textF = text;
            this.textF.strokeColor = 0x292b2f;
        }
    };
    FaceBookMenu.prototype.addTestFunc = function (label, callback, target) {
        // let btn: eui.Button = new eui.Button();
        // btn.label = label;
        // btn.x = (Context.stageWidth - 30) / 2 + 20;
        // btn.y = 48 + this.viewNum * 47;
        // this.addChild(btn);
        // btn.addEventListener("CHAGE_STAGE", callback, target);
        this.viewNum++;
    };
    return FaceBookMenu;
}(egret.Sprite));
var FaceBookMain = /** @class */ (function (_super) {
    __extends(FaceBookMain, _super);
    function FaceBookMain() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.addStage, _this);
        return _this;
    }
    FaceBookMain.prototype.addStage = function (evt) {
        var _this = this;
        this.initializeAsync();
        /**
         * FBInstant初始化动作
         */
        FBInstant.startGameAsync().then(function () {
            egret.log("start game");
            FaceBookMain._that = _this;
            Context.init(_this.stage);
            FaceBookMain.menu = new FaceBookMenu("Egret Facebook SDK Demo");
            _this.addChild(FaceBookMain.menu);
            _this.createMenu();
        });
    };
    FaceBookMain.backMenu = function () {
        FaceBookMain._that.removeChildren();
        FaceBookMain._that.addChild(FaceBookMain.menu);
    };
    FaceBookMain.prototype.createMenu = function () {
        FaceBookMain.menu.addTestFunc("baseinfo", this.baseinfo, this);
        FaceBookMain.menu.addTestFunc("quit", this.quit, this);
        FaceBookMain.menu.addTestFunc("logEvent", this.logEvent, this);
        FaceBookMain.menu.addTestFunc("shareAsync", this.shareAsync, this);
        FaceBookMain.menu.addTestFunc("player", this.player, this);
        FaceBookMain.menu.addTestFunc("getConnectedPlayersAsync", this.getEgretConnectedPlayersAsync, this);
        FaceBookMain.menu.addTestFunc("contextinfo", this.contextinfo, this);
        FaceBookMain.menu.addTestFunc("share", this.share, this);
    };
    FaceBookMain.prototype.initializeAsync = function () {
        FBInstant.initializeAsync().then(function () {
            egret.log("getLocale:", FBInstant.getLocale());
            egret.log("getPlatform:", FBInstant.getPlatform());
            egret.log("getSDKVersion", FBInstant.getSDKVersion());
            egret.log("getSupportedAPIs", FBInstant.getSupportedAPIs());
            egret.log("getEntryPointData", FBInstant.getEntryPointData());
        });
        setTimeout(function () {
            FBInstant.setLoadingProgress(100);
        }, 1000);
    };
    FaceBookMain.prototype.baseinfo = function () {
        egret.log("baseinfo");
        egret.log("getLocale:", FBInstant.getLocale());
        egret.log("getPlatform:", FBInstant.getPlatform());
        egret.log("getSDKVersion", FBInstant.getSDKVersion());
        egret.log("getSupportedAPIs", FBInstant.getSupportedAPIs());
        egret.log("getEntryPointData", FBInstant.getEntryPointData());
    };
    FaceBookMain.prototype.quit = function () {
        egret.log("quit");
        FBInstant.quit();
    };
    FaceBookMain.prototype.logEvent = function () {
        egret.log("logEvent");
        FBInstant.logEvent("test", 2, { "test": "ta" });
    };
    FaceBookMain.prototype.share = function () {
        egret.log("share");
        var data = {
            intent: "",
            text: "",
            image: "",
        };
        FBInstant.shareAsync(data);
    };
    FaceBookMain.prototype.shareAsync = function () {
        egret.log("shareAsync");
        var data = {
            intent: "",
            text: "",
            image: "",
        };
        FBInstant.shareAsync(data);
    };
    FaceBookMain.prototype.player = function () {
        egret.log("player");
        egret.log("player.getID", FBInstant.player.getID());
        egret.log("player.getName", FBInstant.player.getName());
        egret.log("player.getPhoto", FBInstant.player.getPhoto());
    };
    FaceBookMain.prototype.getEgretConnectedPlayersAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var datas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        egret.log("frends info:::");
                        return [4 /*yield*/, FBInstant.player.getConnectedPlayersAsync()];
                    case 1:
                        datas = _a.sent();
                        egret.log(datas);
                        datas.forEach(function (element) {
                            egret.log("player.getID", element.getID());
                            egret.log("player.getName", element.getName());
                            egret.log("player.getPhoto", element.getPhoto());
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    FaceBookMain.prototype.contextinfo = function () {
        egret.log("Context.getID", FBInstant.context.getID());
        egret.log("Context.getType", FBInstant.context.getType());
    };
    return FaceBookMain;
}(egret.DisplayObjectContainer));
//# sourceMappingURL=FaceBookMenu.js.map