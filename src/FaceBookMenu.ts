/**
 * facebook 测试菜单
 *
 * 商业词汇【活命】
 * 1 看广告活命
 * 2 分享活命
 */

class Context {
    static stageWidth: number = 0;
    static stageHeight: number = 0;

    public static init(_stage: egret.Stage): void {
        Context.stageWidth = _stage.stageWidth;
        Context.stageHeight = _stage.stageHeight;
    }
}

class FaceBookMenu extends egret.Sprite {
    public constructor(title: string) {
        super();
        this.graphics.lineStyle(2, 0x282828);
        this.graphics.moveTo(0, 35);
        this.graphics.lineTo(Context.stageWidth, 35);
        this.graphics.endFill();
        this.graphics.lineStyle(2, 0x6a6a6a);
        this.graphics.moveTo(0, 37);
        this.graphics.lineTo(Context.stageWidth, 37);
        this.graphics.endFill();
        this.drawText(title);
        this.addChild(this.textF);
    }

    private textF: egret.TextField;

    private drawText(label: string): void {
        if (this.textF == null) {
            let text: egret.TextField = new egret.TextField();
            text.text = label;
            text.width = Context.stageWidth
            text.height = 35;
            text.size = 22;
            text.verticalAlign = egret.VerticalAlign.MIDDLE;
            text.textAlign = egret.HorizontalAlign.CENTER;
            this.textF = text;
            this.textF.strokeColor = 0x292b2f;
        }
    }

    private viewNum: number = 0;

    public addTestFunc(label: string, callback: Function, target: Object): void {
        // let btn: eui.Button = new eui.Button();
        // btn.label = label;
        // btn.x = (Context.stageWidth - 30) / 2 + 20;
        // btn.y = 48 + this.viewNum * 47;
        // this.addChild(btn);
        // btn.addEventListener("CHAGE_STAGE", callback, target);
        this.viewNum++;
    }
}

class FaceBookMain extends egret.DisplayObjectContainer {
    public static menu: FaceBookMenu;
    private static _that: egret.DisplayObjectContainer;

    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.addStage, this);
    }

    private addStage(evt: egret.Event): void {
        this.initializeAsync();


        /**
         * FBInstant初始化动作
         */
        FBInstant.startGameAsync().then(() => {
            egret.log("start game");
            FaceBookMain._that = this;
            Context.init(this.stage);
            FaceBookMain.menu = new FaceBookMenu("Egret Facebook SDK Demo")
            this.addChild(FaceBookMain.menu);
            this.createMenu();
        });
    }

    public static backMenu(): void {
        FaceBookMain._that.removeChildren();
        FaceBookMain._that.addChild(FaceBookMain.menu);
    }

    private createMenu(): void {
        FaceBookMain.menu.addTestFunc("baseinfo", this.baseinfo, this);
        FaceBookMain.menu.addTestFunc("quit", this.quit, this);
        FaceBookMain.menu.addTestFunc("logEvent", this.logEvent, this);
        FaceBookMain.menu.addTestFunc("shareAsync", this.shareAsync, this);
        FaceBookMain.menu.addTestFunc("player", this.player, this);
        FaceBookMain.menu.addTestFunc("getConnectedPlayersAsync", this.getEgretConnectedPlayersAsync, this);
        FaceBookMain.menu.addTestFunc("contextinfo", this.contextinfo, this);
        FaceBookMain.menu.addTestFunc("share", this.share, this);
    }

    private initializeAsync(): void {
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
    }

    private baseinfo() {
        egret.log("baseinfo");
        egret.log("getLocale:", FBInstant.getLocale());
        egret.log("getPlatform:", FBInstant.getPlatform());
        egret.log("getSDKVersion", FBInstant.getSDKVersion());
        egret.log("getSupportedAPIs", FBInstant.getSupportedAPIs());
        egret.log("getEntryPointData", FBInstant.getEntryPointData());
    }

    private quit(): void {
        egret.log("quit");
        FBInstant.quit();
    }

    private logEvent(): void {
        egret.log("logEvent");
        FBInstant.logEvent("test", 2, {"test": "ta"});
    }

    private share(): void {
        egret.log("share");
        let data: FBInstant.SharePayload = {
            intent: "",
            text: "",
            image: "",
        };
        FBInstant.shareAsync(data);
    }

    private shareAsync(): void {
        egret.log("shareAsync");
        let data: FBInstant.SharePayload = {
            intent: "",
            text: "",
            image: "",
        };
        FBInstant.shareAsync(data);
    }

    private player() {
        egret.log("player");
        egret.log("player.getID", FBInstant.player.getID());
        egret.log("player.getName", FBInstant.player.getName());
        egret.log("player.getPhoto", FBInstant.player.getPhoto());
    }

    private async getEgretConnectedPlayersAsync() {
        egret.log("frends info:::");
        let datas: FBInstant.ConnectedPlayer[] = await FBInstant.player.getConnectedPlayersAsync();
        egret.log(datas);
        datas.forEach(element => {
            egret.log("player.getID", element.getID());
            egret.log("player.getName", element.getName());
            egret.log("player.getPhoto", element.getPhoto());
        });
    }

    private contextinfo(): void {
        egret.log("Context.getID", FBInstant.context.getID());
        egret.log("Context.getType", FBInstant.context.getType());
    }


}