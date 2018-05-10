class R {
    public static URL: string = "resource/";
    public static P_PAIHAI: string = "my_awesome_leaderboard.";
    static PREVIDEO_AD: string = "433380667096621_433969653704389";
    static PRELOAD_AD: String = "433380667096621_433969653704389";
}


class MenuState extends Phaser.State {
    private playerArr: any[];

    public static scoreBest: number = 0;
    public static playerStyle: number = 0;


    // constructor(game: Phaser.Game) {
    //     super()
    // }

    init(...args: any[]) {
        if (!this.game.device.desktop) {
            this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        }
        this.playerArr = [];
        //
        console.log(FBInstant.getSupportedAPIs());
        FBInstant.initializeAsync().then(function () {
            console.log("getLocale:", FBInstant.getLocale());
            console.log("getPlatform:", FBInstant.getPlatform());
            console.log("getSDKVersion", FBInstant.getSDKVersion());
            console.log("getSupportedAPIs", FBInstant.getSupportedAPIs());
            console.log("getEntryPointData", FBInstant.getEntryPointData());
        });
        setTimeout(function () {
            FBInstant.setLoadingProgress(100);
            console.log("facebook 设置初始化完毕 设置进度100%");
        }, 1000);

    };

    preload(): void {
        this.load.image("back", R.URL + "assets/back.png");
        this.load.spritesheet("cloud", R.URL + "assets/clouds.png", 64, 32);
        this.load.spritesheet("plate", R.URL + "assets/plates.png", 64, 40);
        this.load.spritesheet("player", R.URL + "assets/players.png", 36, 64);
        this.load.spritesheet("button", R.URL + "assets/buttons.png", 80, 40);
        this.load.spritesheet("item", R.URL + "assets/items.png", 24, 24);
        this.load.spritesheet("icon", R.URL + "assets/icons.png", 20, 20);
        this.game.add.text(this.world.centerX, this.world.centerY, "Loading...").anchor.set(0.5);
    };

    create(game: Phaser.Game) {
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        let back = this.game.add.sprite(0, 0, "back");
        back.scale.set(this.game.width / 160, this.game.height / 280);
        // clouds
        for (let i = 0; i < 3; i++) {
            let firstX = this.game.rnd.between(20, this.game.width - 20);
            let firstTime = Math.floor((20000 - 3000 * i) * (firstX + 150) / (this.game.width + 200));
            let cloud = this.game.add.sprite(firstX, this.game.height - 250 + 50 * i, "cloud", this.game.rnd.integerInRange(0, 2));
            cloud.scale.set(1 + 0.5 * i);
            cloud.alpha = 0.3;
            this.game.add.tween(cloud).to({x: -150}, firstTime, "Linear", true).onComplete.add(function (obj, tw, twTime) {
                obj.x = this.game.width + 50;
                obj.frame = this.game.rnd.integerInRange(0, 2);
                this.game.add.tween(obj).to({x: -150}, twTime, "Linear", true, 0, -1).onLoop.add(function (obj) {
                    obj.frame = this.game.rnd.integerInRange(0, 2);
                }, this);
            }, this, 0, 20000 - 3000 * i);
        }

        let box = this.game.add.sprite(this.world.centerX, this.world.centerY, "button", 3);
        box.anchor.set(0.5);
        box.scale.set(this.game.width / 80, 4);
        this.game.add.tween(box).from({alpha: 0}, 500, "Linear", true);

        //设置游戏开始的按钮
        let btn = this.game.add.sprite(this.world.centerX, this.world.centerY, "button", 0);
        btn.anchor.set(0.5);
        this.game.add.tween(btn).from({alpha: 0}, 300, "Linear", true).onComplete.add(function (obj) {
            obj.inputEnabled = true;
            obj.events.onInputDown.add(function () {
                this.game.state.start("main");
            }, this);
        }, this);


        //获取游戏的排行榜
        btn = this.game.add.sprite(this.world.centerX, this.world.centerY + 30, "button", 0);
        btn.anchor.set(0.5);
        btn.events.onInputDown.add(() => {
            // this.setPaiHangBang(30, "{}");
        });

        //放3个人物形象放在游戏场景中
        for (let i = 0; i < 3; i++) {
            this.playerArr[i] = this.game.add.sprite(this.world.centerX, 120, "player", i);
            this.playerArr[i].anchor.set(0.5);
            this.playerArr[i].alpha = 0;
        }
        this.playerArr[MenuState.playerStyle].alpha = 1;


        //设置左右两边的人物。。。
        let btn1 = this.game.add.sprite(this.world.centerX - 100, 120, "button", 4);
        btn1.anchor.set(0.5);
        btn1.inputEnabled = true;
        btn1.events.onInputDown.add(() => {
            this._setPlayer(-1);
        }, this);
        let btn2 = this.game.add.sprite(this.world.centerX + 100, 120, "button", 5);
        btn2.anchor.set(0.5);
        btn2.inputEnabled = true;
        btn2.events.onInputDown.add(() => {
            this._setPlayer(1);
        }, this);
    };

    /**
     * 点击事件让玩家起跳
     * @param go
     * @private
     */
    _setPlayer(go) {
        this.playerArr[MenuState.playerStyle].alpha = 1;
        this.playerArr[MenuState.playerStyle].x = this.world.centerX;
        this.game.add.tween(this.playerArr[MenuState.playerStyle]).to({
            alpha: 0,
            x: this.world.centerX + go * 50
        }, 200, "Linear", true);

        MenuState.playerStyle = (((MenuState.playerStyle - go) % 3) + 3) % 3;

        this.playerArr[MenuState.playerStyle].alpha = 1;
        this.playerArr[MenuState.playerStyle].x = this.world.centerX;
        this.game.add.tween(this.playerArr[MenuState.playerStyle]).from({
            alpha: 0,
            x: this.world.centerX - go * 50
        }, 200, "Linear", true);
    };


}

/**
 * 游戏主场景
 */
class MainState extends Phaser.State {
    private pArr: number[];
    private lastX: number;
    private lastY: number;
    private lastD: number;
    private lastP: number;
    private bonus: number;
    private items: any;
    plate2: PlateSprite;
    plate1: PlateSprite;
    player: GamePlayer;
    private isEasy: boolean = true;

    // constructor(game: Phaser.Game) {
    //     super()
    // }

    group: Phaser.Group;

    effect: Phaser.Sprite;
    point: Phaser.Sprite;
    moving: boolean; // 用于记录tween动画状态
    holding: boolean;  // 用于记录鼠标按下状态
    holdTime: number; // 用于记录鼠标按下时间


    init() {
        this.pArr = [17, 15, 12, 10, 15, 13, 8, 17]; // 各种类型平台宽度，与平台spritesheet各帧对应
        this.moving = true;
        this.holding = false;
        this.holdTime = 0;

        this.lastX = 40;// 最后一次的距离、方向、平台类型
        this.lastY = 20;
        this.lastD = 1;
        this.lastP = 0;

        this.bonus = 0;
        //this.playerStyle = this.game.playerStyle; // 角色样式，对应帧号
        this.items = {txt: [null, null, null], val: [0, 3, 3]}; // 游戏数据在一个对象中保存：[分数，生命，瞄准器]
    };

    create() {
        console.log("main state is create!...");
        let back = this.game.add.sprite(0, 0, "back");
        back.scale.set(this.game.width / 160, this.game.height / 280);
        // clouds
        for (let i = 0; i < 3; i++) {
            let firstX = this.game.rnd.between(20, this.game.width - 20);
            let firstTime = Math.floor((20000 - 3000 * i) * (firstX + 150) / (this.game.width + 200));
            let cloud = this.game.add.sprite(firstX, this.game.height - 250 + 50 * i, "cloud", this.game.rnd.integerInRange(0, 2));
            cloud.scale.set(1 + 0.5 * i);
            cloud.alpha = 0.3;
            this.game.add.tween(cloud).to({x: -150}, firstTime, "Linear", true).onComplete.add(function (obj, tw, twTime) {
                obj.x = this.game.width + 50;
                this.game.add.tween(obj).to({x: -150}, twTime, "Linear", true, 0, -1).onLoop.add(function (obj) {
                    obj.frame = this.game.rnd.integerInRange(0, 2);
                }, this);
            }, this, 0, 20000 - 3000 * i);
        }

        this.group = this.game.add.group();
        let group = this.group;
        this.plate1 = this.group.create(this.world.centerX - this.lastX, this.world.centerY + this.lastY, "plate", 0);
        this.plate1.anchor.set(0.5, 0.4);
        // 连环tween
        this.game.add.tween(this.plate1).from({
            y: this.plate1.y - 50,
            alpha: 0
        }, 200, "Linear", true).onComplete.add(() => {

            //this.plate2 = new PlateSprite(this.game, this.world.centerX + this.lastX, this.world.centerY - this.lastY, "plate", 0)
            this.plate2 = group.create(this.world.centerX + this.lastX, this.world.centerY - this.lastY, "plate", 0);
            this.plate2.anchor.set(0.5, 0.4);
            this.plate2.sendToBack();
            this.game.add.tween(this.plate2).from({
                y: this.plate2.y - 50,
                alpha: 0
            }, 200, "Linear", true).onComplete.add(() => {
                // 光效
                this.effect = group.create(0, 0, "button", 6);
                this.effect.anchor.set(0.5);
                this.effect.visible = false; // 与平台共一个组，只用visible控制显示或隐藏，用kill的话会被拿去做平台

                // 瞄准器
                this.point = group.create(0, 0, "button", 7);
                this.point.anchor.set(0.5);
                this.point.scale.set(0.5);
                this.point.visible = false; // 与平台共一个组，只用visible控制显示或隐藏，用kill的话会被拿去做平台

                //this.player = new GamePlayer(this.game, this.world.centerX - this.lastX, this.world.centerY + this.lastY);
                //console.log(this.player);
                //console.log(this.player.x, this.player.y);
                this.player = group.create(this.world.centerX - this.lastX, this.world.centerY + this.lastY);
                //console.log(this.player);
                // 身体
                //this.game.add.sprite(140, 320, "player")
                //
                this.player.b = this.player.addChild(this.game.add.sprite(0, 0, "player", MenuState.playerStyle)) as Phaser.Sprite;
                this.player.b.anchor.set(0.5, 0.875);
                this.player.b.animations.add("delay", [MenuState.playerStyle], 10, false);
                // 加分提示文本
                this.player.txt = this.player.addChild(this.game.add.text(0, -30, "", {
                    fontSize: 16,
                    fill: "#fff"
                })) as Phaser.Text;
                this.player.txt.anchor.set(0.5);

                this.game.add.tween(this.player).from({
                    y: this.player.y - 50,
                    alpha: 0
                }, 200, "Linear", true).onComplete.add(() => {
                    this.moving = false;
                }, this);
            }, this);
        }, this);

        this.items.txt[0] = this.game.add.text(this.world.centerX, 80, "0", {fill: "#999", fontSize: 24});
        this.items.txt[0].anchor.set(0.5);
        this.game.add.sprite(10, 10, "icon", 0);
        this.game.add.sprite(75, 10, "icon", 1);

        this.items.txt[1] = this.game.add.text(35, 10, this.items.val[1], {fontSize: 16, fill: "#999"});
        this.items.txt[2] = this.game.add.text(100, 10, this.items.val[2], {fontSize: 16, fill: "#999"});

        //鼠标输入开始移动标记
        this.game.input.onDown.add(() => {
            if (!this.moving && !this.holding) {
                this.holding = true;
                this.holdTime = this.game.time.now;
                if (this.items.val[2] > 0 || this.isEasy) {
                    this.point.x = this.player.x;
                    this.point.y = this.player.y;
                    this.point.visible = true;
                }


            }
        }, this);
        //鼠标躺起开始跳
        this.game.input.onUp.add(this._jump, this);
    };

    update() {
        if (this.holding) { // 储力效果，简单的缩短
            let power = Math.min(Math.floor((this.game.time.now - this.holdTime) / 16), 250); // 计算力度，限制数值最大为250
            this.player.scale.y = 1 - (power > 100 ? 0.3 : 0.3 * power / 100);
            if (this.items.val[2] > 0 || this.isEasy) {
                let tarX = this.world.centerX - this.lastX + this.lastD * power * 2;
                let tarY = this.world.centerY + this.lastY - power;
                this.point.x = tarX;
                this.point.y = tarY;
            }
        }
    };

    _setItem(id, v) {
        this.items.val[id] += v;
        this.items.txt[id].text = this.items.val[id];
    };

    _jump() {
        if (!this.moving && this.holding) {
            this.moving = true;
            this.holding = false;
            this.player.scale.y = 1;
            this.point.visible = false;
            let power: number = Math.min(Math.floor((this.game.time.now - this.holdTime) / 16), 250); // 计算力度，限制数值最大为250
            let jumpX: number = this.world.centerX - this.lastX + this.lastD * power * 2;
            let jumpY: number = this.world.centerY + this.lastY - power;
            // *** 跳跃效果 ***
            let jumpTime: number = 300; // 跳跃动作时长
            // 外壳直线位移至目的地
            this.game.add.tween(this.player).to({
                x: jumpX,
                y: jumpY
            }, jumpTime, "Linear", true).onComplete.add(obj => {
                if (this._checkScore()) {
                    obj.b.animations.play("delay", 10).onComplete.addOnce(this._newPlate, this); // 这里用帧动画实现停顿效果（帧速10代表停顿十分之一秒）
                } else {
                    obj.b.animations.play("delay", 10).onComplete.addOnce(this._fall, this);
                }
            }, this);
            // 身体只做跳跃动作即可
            this.player.b.y = -40;
            this.player.b.angle = -this.lastD * 150;
            this.game.add.tween(this.player.b).to({
                angle: -this.lastD * 90,
                x: this.lastD * 20,
                y: -80
            }, jumpTime / 2, Phaser.Easing.Quadratic.Out, false).to({
                angle: 0,
                x: 0,
                y: 0
            }, jumpTime / 2, Phaser.Easing.Quadratic.In, true);
            // ******
        }
    };

    _checkScore() {
        // 检测是否跳中目标，比较player和plate2的位置，返回true或false，同时播放得分提示和光效
        if (this.items.val[2] > 0) {
            this._setItem(2, -1);
        }
        if (Math.abs(this.player.x - this.plate2.x) <= this.pArr[this.lastP]) {   // 跳中位置...
            if (this.plate2.item && this.plate2.item.alive) {
                this._setItem(this.plate2.itemID, 1);
                this.plate2.item.kill();
            }
            let addScore = 1;
            if (Math.abs(this.player.x - this.plate2.x) <= 3) { // 3像素以内，以2分递增，播放光效
                this.bonus += 2;
                addScore = this.bonus;
                this.effect.reset(this.plate2.x, this.plate2.y);
                this.effect.scale.set(0.5);
                this.effect.visible = true;
                this.effect.alpha = 1;
                this.game.add.tween(this.effect.scale).to({x: 3, y: 3}, 800, Phaser.Easing.Cubic.Out, true);
                this.game.add.tween(this.effect).to({alpha: 0}, 800, Phaser.Easing.Cubic.Out, true).onComplete.add(function (obj) {
                    obj.visible = false;
                }, this);
            } else {
                this.bonus = 0;
            }
            this._setItem(0, addScore);
            // 加分效果
            this.player.txt.reset(0, -30);
            this.player.txt.text = addScore.toString();
            this.player.txt.alpha = 1;
            this.game.add.tween(this.player.txt).to({
                y: this.player.txt.y - 50,
                alpha: 0
            }, 800, "Linear", true).onComplete.add(txt => {
                txt.kill();
            }, this);
            return true;
        } else {
            return false;
        }
    };

    _fall() {

        this.player.sendToBack();


        if (this.player.y > this.plate2.y) {
            this.plate2.sendToBack();
        }

        if (Math.abs(this.player.x - this.plate2.x) - this.pArr[this.lastP] < 12) {  // 碰到部分,倾斜（12为player身体的半宽）
            this.player.angle = (this.player.y < this.plate2.y && this.lastD > 0) || (this.player.y > this.plate2.y && this.lastD < 0) ? 30 : -30;  // 左倾斜或是右倾斜
        }
        this.game.add.tween(this.player).to({
            y: this.player.y + 100,
            alpha: 0
        }, 500, "Linear", true).onComplete.add(() => {
            this._setItem(1, -1);
            if (this.items.val[1] > 0) {
                this.player.x = this.world.centerX - this.lastX;
                this.player.y = this.world.centerY + this.lastY - 50;
                this.player.angle = 0;
                this.player.bringToTop();
                this.game.add.tween(this.player).to({
                    y: this.player.y + 50,
                    alpha: 1
                }, 200, "Linear", true).onComplete.add(() => {
                    this.moving = false;
                }, this);
            } else {
                this._overMenu();
            }
        }, this);
    };

    _newPlate(sprite: Phaser.Sprite, anim: Phaser.Animation) {
        console.log("_newPlate 随机生成一个距离")
        this.moving = false;
        let newRange = this.game.rnd.integerInRange(10, 50); // 随机生成一个距离
        let newD = this.game.rnd.sign();   // 随机方向（-1:左，1:右）
        let newX = newD * newRange * 2;    // 计算新平台的相对于上一个平台的X位置
        let newY = newRange;           // 计算新平台的相对于上一个平台的Y位置
        this.lastP = this.game.rnd.between(0, 7); // 随机平台类型（对应平台的spritesheet中随机一个帧）
        this.plate2 = this.group.getFirstDead(true, this.world.centerX + this.lastX + newX * 2, this.world.centerY - this.lastY - newY * 2, "plate", this.lastP);
        this.plate2.anchor.set(0.5, 0.4);
        this.plate2.sendToBack();
        // 随机产生道具
        if (this.game.rnd.integerInRange(0, 10) > 6) {
            if (this.plate2.item) {
                this.plate2.item.reset(0, 0);
                this.plate2.itemID = this.game.rnd.integerInRange(1, 2);
                this.plate2.item.play("item_" + this.plate2.itemID);
            } else {

                this.plate2.item = this.plate2.addChild(this.game.add.sprite(0, 0, "item")) as Phaser.Sprite;
                this.plate2.item.anchor.set(0.5, 0.9);
                this.plate2.item.animations.add("item_1", [0, 1, 2, 1], 5, true);
                this.plate2.item.animations.add("item_2", [3, 4, 5, 4], 5, true);
                this.plate2.itemID = this.game.rnd.integerInRange(1, 2);
                this.plate2.item.play("item_" + this.plate2.itemID);
            }
        }
        this.game.add.tween(this.plate2).from({alpha: 0}, 200, "Linear", true);
        this.group.forEachAlive(this._tween, this, newX, newY); // 整体往后移
        this.lastX = newX;
        this.lastY = newY;
        this.lastD = newD;
    };

    _tween(plate, newX, newY) {
        this.game.add.tween(plate).to({
            x: plate.x - this.lastX - newX,
            y: plate.y + this.lastY + newY
        }, 300, "Linear", true).onComplete.add(plate => {
            if (!plate.inWorld && plate != this.player) {
                plate.kill();
            }
        }, this);
    };

    _overMenu() {
        let box = this.game.add.sprite(this.world.centerX, this.world.centerY, "button", 3);
        box.anchor.set(0.5);
        box.scale.set(this.game.width / 80, 4);
        this.game.add.tween(box).from({alpha: 0}, 300, "Linear", true);

        let btn1 = this.game.add.sprite(this.world.centerX + 50, this.world.centerY, "button", 1);
        btn1.anchor.set(0.5);
        this.game.add.tween(btn1).from({alpha: 0}, 300, "Linear", true).onComplete.add(function (obj) {
            obj.inputEnabled = true;
            obj.events.onInputDown.add(function () {
                this.game.state.start("main");
            }, this);
        }, this);

        let btn2 = this.game.add.sprite(this.world.centerX - 50, this.world.centerY, "button", 2);
        btn2.anchor.set(0.5);
        this.game.add.tween(btn2).from({alpha: 0}, 300, "Linear", true).onComplete.add(obj => {
            obj.inputEnabled = true;
            obj.events.onInputDown.add(() => {
                this.game.state.start("menu");
            }, this);
        }, this);

        MenuState.scoreBest = this.items.val[0] > MenuState.scoreBest ? this.items.val[0] : MenuState.scoreBest;
        this.game.add.text(this.world.centerX, this.world.centerY + 50, "Best : " + MenuState.scoreBest, {
            fontSize: 16,
            fill: "#fff"
        }).anchor.set(0.5);
    };
}


class GamePlayer extends Phaser.Sprite {
    b: Phaser.Sprite;
    txt: Phaser.Text;

    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y);
    }
}

class PlateSprite extends Phaser.Sprite {
    item: Phaser.Sprite;
    itemID: number;

    constructor(game: Phaser.Game, x: number, y: number, key?: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?: string | number) {
        super(game, x, y, key, frame);
    }

}