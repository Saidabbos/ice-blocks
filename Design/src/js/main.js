var ctb;
(function (ctb) {
    class App extends Phaser.Game {
        constructor() {
            let config = {
                type: Phaser.AUTO,
                width: App.CANVAS_WIDTH,
                height: App.CANVAS_HEIGHT,
                scale: {
                    mode: FitScaleManager.detectBestScaleMode(),
                    autoCenter: Phaser.Scale.CENTER_BOTH
                },
                transparent: true,
                scene: {
                    create: () => {
                        this.scene.add('Boot', ctb.scene.Boot, true);
                    }
                }
            };
            super(config);
        }
    }
    App.CANVAS_WIDTH = 980;
    App.CANVAS_HEIGHT = 600;
    ctb.App = App;
})(ctb || (ctb = {}));
let game;
window.onload = () => {
    game = new ctb.App();
};
let delayedCalls = [];
function delayedCall(delay, callback, args, callbackScope) {
    let scene = game.scene.getAt(0);
    if (scene) {
        let dc = scene.time.delayedCall(delay, callback, args, callbackScope);
        delayedCalls.push(dc);
        return dc;
    }
    let t = setTimeout(callback, delay);
    delayedCalls.push(t);
    return t;
}
function pauseAllDelayedCalls() {
    for (let dc of delayedCalls) {
        if (dc instanceof Phaser.Time.TimerEvent) {
            dc.paused = true;
        }
    }
}
function resumeAllDelayedCalls() {
    for (let dc of delayedCalls) {
        if (dc instanceof Phaser.Time.TimerEvent) {
            dc.paused = false;
        }
    }
}
function destroyAllDelayedCalls() {
    for (let dc of delayedCalls) {
        if (dc instanceof Phaser.Time.TimerEvent) {
            dc.remove(false);
        }
        else {
            clearTimeout(dc);
        }
    }
    delayedCalls = [];
}
function destroyDelayedCall(dc) {
    if (dc instanceof Phaser.Time.TimerEvent) {
        dc.remove(false);
    }
    else {
        clearTimeout(dc);
    }
    let ind = delayedCalls.indexOf(dc);
    if (ind >= 0)
        delayedCalls.splice(ind, 1);
}
function setPageBackground(bg) {
    document.querySelector("html").style.backgroundImage = "url(assets/imgs/" + bg + ".jpg)";
}
function setupButton(btn, frame) {
    btn.on('pointerdown', () => { btn.setFrame(frame + '_hover' + '0000'); });
    btn.on('pointerover', () => { btn.setFrame(frame + '_hover' + '0000'); game.scene.getAt(0).sound.add("button hover").play(); });
    btn.on('pointerout', () => { btn.setFrame(frame + '0000'); });
    btn.on('pointerup', () => { btn.setFrame(frame + '0000'); game.scene.getAt(0).sound.add('activity selection - button selection').play(); });
}
function setupButtonTextureBased(btn, texture, hoverTexture) {
    btn.on('pointerdown', () => { btn.setTexture(hoverTexture); });
    btn.on('pointerover', () => { btn.setTexture(hoverTexture); game.scene.getAt(0).sound.add("button hover").play(); });
    btn.on('pointerout', () => { btn.setTexture(texture); });
    btn.on('pointerup', () => { if (btn.parentContainer)
        btn.setTexture(texture); game.scene.getAt(0).sound.add('activity selection - button selection').play(); });
}
function playBtnClickAnim(target) {
    let sc = target.hasOwnProperty("defScale") ? target["defScale"] : 1;
    target.scaleX = target.scaleY = sc;
    let scene = game.scene.getAt(0);
    scene.tweens.add({
        targets: target,
        "scaleX": 0.9 * sc,
        "scaleY": 0.9 * sc,
        duration: 100,
        yoyo: true
    });
}
/**
 * @author Roman Parada
 * This class is created to fix overlapping of bottom part of canvas by navigation bar in iOS.
 * It make a delayed resize of the canvas (like Phaser-3 FIT methods does) and it overrides Phaser-3 input window to Phaser-3 core transform methods
 *
 * How to use:
 * Just call the code line below in Boot scene's init() method of your project:
 * new FitScaleManager(this.game).setup();
 */
class FitScaleManager {
    constructor(game) {
        this.doResize = () => {
            let scale = this.calculateScale();
            let newCanvasWidth = this.phaserScaleManager.width * scale;
            let newCanvasHeight = this.phaserScaleManager.height * scale;
            this.canvasStyle.width = newCanvasWidth + 'px';
            this.canvasStyle.height = newCanvasHeight + 'px';
            this.canvasStyle.marginLeft = (window.innerWidth - newCanvasWidth) / 2 + 'px';
            this.canvasStyle.marginTop = (window.innerHeight - newCanvasHeight) / 2 + 'px';
        };
        this.game = game;
        this.canvasStyle = this.game.canvas.style;
        this.phaserScaleManager = this.game.scale;
    }
    static detectBestScaleMode() {
        let iOS = /iPad|iPhone|iPod/.test(navigator.platform || "");
        let isAndroid = window.navigator.userAgent.toLowerCase().indexOf("android") > -1;
        return iOS || isAndroid ? Phaser.Scale.FIT : Phaser.Scale.NONE;
    }
    ;
    /**
     * Just call this method once in Boot scene's init() method
     */
    setup() {
        this.phaserScaleManager.addListener(Phaser.Scale.Events.RESIZE, this.onResize, this);
        this.overridePhaserTransformMethods();
        this.onResize();
    }
    calculateScale() {
        if (game.scale.scaleMode == Phaser.Scale.NONE)
            return 1;
        return Math.min(window.innerWidth / this.phaserScaleManager.width, window.innerHeight / this.phaserScaleManager.height);
    }
    overridePhaserTransformMethods() {
        this.game.scale.transformX = (pageX) => {
            return (pageX - parseInt(this.canvasStyle.marginLeft.split("px")[0])) / this.calculateScale();
        };
        this.game.scale.transformY = (pageY) => {
            return (pageY - parseInt(this.canvasStyle.marginTop.split("px")[0])) / this.calculateScale();
        };
    }
    onResize() {
        setTimeout(this.doResize, FitScaleManager.RESIZE_DELAY);
    }
}
FitScaleManager.RESIZE_DELAY = 500;
var ctb;
(function (ctb) {
    var core;
    (function (core) {
        class Gameplay {
            constructor() {
                this.allLettersNames = null;
                this.currentRound = 0;
                this.correctAnswersCount = 0;
                this.wrongAnswersCount = 0;
                this.correctAnswersCountThisRound = 0;
                this.wrongAnswersCountThisRound = 0;
                this.onNewRound = null;
                this.nextLetterDelay = 0;
                this.failsNumToLose = Number(game.cache.json.get('gameplay')["failsNumToLose"]);
                this.useImages = Boolean(game.cache.json.get('gameplay')["useImages"]);
            }
            getCorrectWordCharAt(at) {
                return this.wordsLetters[this.correctWord][at];
            }
            getCorrectWordLettersNumber() {
                return this.wordsLetters[this.correctWord].length;
            }
            setupCallbacks(onComplete, onLose, onNewRound) {
                this.onComplete = onComplete;
                this.onLose = onLose;
                this.onNewRound = onNewRound;
            }
            calculateScore() {
                return this.totalRoundsNum - this.wrongAnswersCount;
            }
            onLettersPlaced() {
                if (this.correctAnswersCountThisRound == 1) {
                    this.currentRound++;
                    if (this.currentRound >= this.totalRoundsNum) {
                        let score = this.calculateScore();
                        this.onComplete(score, score);
                        return true;
                    }
                    else {
                        this.nextLetter();
                    }
                }
                return false;
            }
            nextLetter() {
                let fn = () => {
                    let thisRound = this.rounds.shift();
                    this.blockLetters = thisRound["blockLetters"];
                    this.correctWord = thisRound["correctWord"];
                    this.correctAnswersCountThisRound = 0;
                    this.wrongAnswersCountThisRound = 0;
                    if (this.onNewRound)
                        this.onNewRound();
                };
                if (this.nextLetterDelay == 0) {
                    fn();
                }
                else {
                    delayedCall(this.nextLetterDelay, fn);
                }
            }
            onCorrectAnswer() {
                this.correctAnswersCount++;
                this.correctAnswersCountThisRound++;
                this.nextLetterDelay = 3500;
                return this.onLettersPlaced();
            }
            onWrongAnswer() {
                this.wrongAnswersCount++;
                this.wrongAnswersCountThisRound++;
                this.nextLetterDelay = 2000;
                if (this.wrongAnswersCount >= this.failsNumToLose) {
                    this.onLose(0, 0);
                    return true;
                }
                else {
                    this.onLettersPlaced();
                }
                return false;
            }
            getCurrentTotalAnswersCount() {
                return this.correctAnswersCount + this.wrongAnswersCount;
            }
            getCurrentTotalAnswersCountThisRound() {
                return this.correctAnswersCountThisRound + this.wrongAnswersCountThisRound;
            }
            isNewRound() {
                return this.getCurrentTotalAnswersCountThisRound() == 0;
            }
            isRoundsComplete() {
                return this.currentRound >= this.totalRoundsNum;
            }
            getAudioKeyOfChar(letter) {
                let json = game.cache.json.get('gameplay');
                let letters = json["letters"];
                for (let d of letters) {
                    if (letter == d['letterName']) {
                        return d['audioKey'];
                    }
                }
                return null;
            }
            reset() {
                this.nextLetterDelay = 0;
                this.setupCallbacks(null, null, null);
                let json = game.cache.json.get('gameplay');
                this.wordsLetters = json["wordsLetters"];
                this.rounds = json["rounds"].slice();
                this.totalRoundsNum = this.rounds.length;
                this.letters = json["letters"].slice();
                this.allLettersNames = [];
                for (let d of this.letters)
                    this.allLettersNames.push(d["letterName"]);
                this.nextLetter();
                this.currentRound = 0;
                this.correctAnswersCount = 0;
                this.wrongAnswersCount = 0;
                this.correctAnswersCountThisRound = 0;
                this.wrongAnswersCountThisRound = 0;
            }
        }
        core.Gameplay = Gameplay;
    })(core = ctb.core || (ctb.core = {}));
})(ctb || (ctb = {}));
var ctb;
(function (ctb) {
    var scene;
    (function (scene) {
        class Boot extends Phaser.Scene {
            init() {
                new FitScaleManager(this.game).setup();
            }
            create() {
                game.scene.remove('Boot');
                game.scene.add('Preloader', ctb.scene.Preloader, true);
            }
        }
        scene.Boot = Boot;
    })(scene = ctb.scene || (ctb.scene = {}));
})(ctb || (ctb = {}));
var ctb;
(function (ctb) {
    var scene;
    (function (scene) {
        var Gameplay = ctb.core.Gameplay;
        class MainScene extends Phaser.Scene {
            create() {
                this.gameplay = new Gameplay();
                this.gameplayScreen = new ctb.screen.GameplayScreen(this, this.gameplay);
                this.children.add(this.gameplayScreen);
                this.gameplayScreen.showInstructionPage();
            }
            update() {
                this.gameplayScreen._update();
            }
        }
        scene.MainScene = MainScene;
    })(scene = ctb.scene || (ctb.scene = {}));
})(ctb || (ctb = {}));
var ctb;
(function (ctb) {
    var scene;
    (function (scene) {
        class Preloader extends Phaser.Scene {
            preload() {
                this.load.json('gameplay', 'assets/json/gameplay.json');
            }
            create() {
                let json = game.cache.json.get('gameplay');
                if (json["useImages"]) {
                    for (let l of json["letters"]) {
                        this.load.image(l["letterName"], "assets/imgs/letters/" + l["letterName"] + ".png");
                    }
                    for (let r of json["rounds"]) {
                        this.load.image(r["correctWord"], "assets/imgs/words/" + r["correctWord"] + ".png");
                    }
                }
                for (let l of json["letters"]) {
                    this.load.audio(l["audioKey"], "assets/sound/mp3/letters/" + l["audioKey"] + ".mp3");
                }
                for (let r of json["rounds"]) {
                    this.load.audio(r["correctWord"], "assets/sound/mp3/words/" + r["correctWord"] + ".mp3");
                }
                let progressTxt = this.add.text(game.scale.width / 2, game.scale.height / 2, "", {
                    "fontFamily": "Quran Era font",
                    "fontSize": 25,
                    "color": "#000000",
                    "align": 'center'
                });
                progressTxt.setOrigin(0.5, 0.5);
                this.load.pack('preloader', 'assets/pack.json');
                this.load.on('progress', (value) => {
                    progressTxt.text = Math.ceil(value * 100) + "%";
                }, this);
                this.load.on('complete', () => {
                    this.nextScene();
                });
                this.load.start();
            }
            static playAnim(animKey, sprite, onComplete = null) {
                let mainScene = game.scene.getScene('ScreenMain');
                if (!mainScene.anims.exists(animKey)) {
                    let data = Preloader.ANIMS_DATA[animKey];
                    mainScene.anims.create({
                        key: animKey,
                        frames: mainScene.anims.generateFrameNames(data['atlas'], {
                            start: data['start'], end: data['end'], zeroPad: data['padNum'],
                            prefix: data['prefix'], suffix: ''
                        }),
                        frameRate: data['frameRate'],
                        repeat: data['repeat']
                    });
                }
                if (sprite.anims.currentAnim) {
                    sprite.off('animationcomplete');
                }
                sprite.anims.stop();
                sprite.play(animKey);
                sprite.on('animationcomplete', () => {
                    if (onComplete)
                        onComplete();
                });
                return sprite;
            }
            nextScene() {
                game.scene.remove('Preloader');
                game.scene.add('ScreenMain', ctb.scene.MainScene, true);
            }
        }
        Preloader.ANIMS_DATA = {
            'idle': {
                'start': 0,
                'end': 51,
                'padNum': 4,
                'prefix': 'idle',
                'repeat': 0,
                'frameRate': 24,
                'atlas': 'atlas-shake'
            },
            'yelling_wrong': {
                'start': 0,
                'end': 46,
                'padNum': 4,
                'prefix': 'yelling_wrong',
                'repeat': 0,
                'frameRate': 24,
                'atlas': 'atlas-shake'
            }
        };
        scene.Preloader = Preloader;
    })(scene = ctb.scene || (ctb.scene = {}));
})(ctb || (ctb = {}));
var ctb;
(function (ctb) {
    var screen;
    (function (screen) {
        class AreYouSureWindow extends Phaser.GameObjects.Container {
            constructor(scene, onYes, onNo) {
                super(scene);
                this._areYouSurePage = new Phaser.GameObjects.Image(this.scene, -105, 0 - 48, 'Exit warning');
                this._areYouSurePage.setOrigin(0, 0);
                // this._areYouSurePage.setInteractive();
                this._btnSureYes = new Phaser.GameObjects.Image(this.scene, game.scale.width / 2 - 95, 485 - 50, 'btnYES1');
                this._btnSureYes.setInteractive({ cursor: 'pointer' });
                this._btnSureYes.once('pointerup', onYes);
                setupButtonTextureBased(this._btnSureYes, 'btnYES1', 'btnYES2');
                this._btnSureNo = new Phaser.GameObjects.Image(this.scene, game.scale.width / 2 + 95, 485 - 50, 'btnNO1');
                this._btnSureNo.setInteractive({ cursor: 'pointer' });
                this._btnSureNo.once('pointerup', onNo);
                setupButtonTextureBased(this._btnSureNo, 'btnNO1', 'btnNO2');
                this.add(this._areYouSurePage);
                this.add(this._btnSureYes);
                this.add(this._btnSureNo);
            }
        }
        screen.AreYouSureWindow = AreYouSureWindow;
    })(screen = ctb.screen || (ctb.screen = {}));
})(ctb || (ctb = {}));
var ctb;
(function (ctb) {
    var screen;
    (function (screen) {
        class CompleteWindow extends Phaser.GameObjects.Container {
            constructor(scene, onBack, onReplay, onNext) {
                super(scene);
                this.music = null;
                this.setPosition(-104.5, -48);
                this._bgComplete = new Phaser.GameObjects.Image(this.scene, 0, 0, 'Completion page LATEST UPDATED');
                this._bgComplete.setOrigin(0, 0);
                // this._bgComplete.setInteractive();
                this._cup = new Phaser.GameObjects.Image(this.scene, 400, 410, 'Trophy');
                this._btnBack = new Phaser.GameObjects.Image(this.scene, 570, 570, 'btnBACK1');
                this._btnReplay = new Phaser.GameObjects.Image(this.scene, 720, 570, 'btnReplay1');
                this._btnNext = new Phaser.GameObjects.Image(this.scene, 870, 570, 'btnNEXT1');
                let _CollectedPoints = new Phaser.GameObjects.Image(this.scene, 620, 440, 'Collected Points');
                this.totalScoreTxt = this.scene.add.text(845, 352, "", {
                    "fontFamily": "Kids Rock Demo",
                    "fontSize": 35,
                    "color": "#F49F1C",
                    "align": 'center',
                    'stroke': '#70451A',
                    'strokeThickness': 6
                });
                this.totalScoreTxt.setOrigin(0.5, 0.5);
                let grd = this.totalScoreTxt.context.createLinearGradient(0, 0, 0, this.totalScoreTxt.height);
                grd.addColorStop(0, '#FFFF00');
                grd.addColorStop(1, '#C17316');
                this.totalScoreTxt.setFill(grd);
                this.starScoreTxt = this.scene.add.text(648, 433, "", {
                    "fontFamily": "Kids Rock Demo",
                    "fontSize": 24,
                    "color": "#FFFFFF",
                    "align": 'center'
                });
                this.starScoreTxt.setOrigin(0.5, 0.5);
                this.add([
                    this._bgComplete,
                    _CollectedPoints,
                    this._cup,
                    this._btnBack,
                    this._btnReplay,
                    this._btnNext,
                    this.totalScoreTxt,
                    this.starScoreTxt
                ]);
                this._btnBack.setInteractive({ cursor: 'pointer' });
                this._btnBack.on('pointerup', () => {
                    onBack(this._btnBack);
                    // if (this.music) {
                    //     this.music.stop();
                    // }
                });
                setupButtonTextureBased(this._btnBack, 'btnBACK1', 'btnBACK2');
                this._btnReplay.setInteractive({ cursor: 'pointer' });
                this._btnReplay.once('pointerup', () => {
                    onReplay(this._btnReplay);
                    if (this.music) {
                        this.music.stop();
                    }
                });
                setupButtonTextureBased(this._btnReplay, 'btnReplay1', 'btnReplay2');
                this._btnNext.setInteractive({ cursor: 'pointer' });
                this._btnNext.on('pointerup', () => {
                    onNext(this._btnNext);
                    // if (this.music) {
                    //     this.music.stop();
                    // }
                });
                setupButtonTextureBased(this._btnNext, 'btnNEXT1', 'btnNEXT2');
            }
            show(score, starScore) {
                this._cup.scale = 1.25;
                this.scene.tweens.add({
                    targets: this._cup,
                    "scale": 1,
                    duration: 500,
                    ease: Phaser.Math.Easing.Back.Out
                });
                this.totalScoreTxt.text = String(score);
                this.starScoreTxt.text = String(starScore);
                // let music = this.scene.sound.add("viktory");
                this.music = this.scene.sound.add("Activity completion fantastic");
                this.music.play();
            }
        }
        screen.CompleteWindow = CompleteWindow;
    })(screen = ctb.screen || (ctb.screen = {}));
})(ctb || (ctb = {}));
var ctb;
(function (ctb) {
    var screen;
    (function (screen) {
        var Preloader = ctb.scene.Preloader;
        class GameplayScreen extends Phaser.GameObjects.Container {
            constructor(scene, gameplay) {
                super(scene);
                this.bgMusic = null;
                this.correctAudio = null;
                this.correctAudioWord = null;
                this.idleDelayedCall = null;
                this.playIdle = () => {
                    this.character.setOrigin(0.5, 0.5);
                    Preloader.playAnim('idle', this.character, () => {
                        this.idleDelayedCall = delayedCall(5000, () => {
                            this.playIdle();
                        });
                    });
                };
                this.soundWrongDrop = null;
                this.wfsnd = null;
                this.showCompleteWindow = (score, starScore) => {
                    let completeWindow = new screen.CompleteWindow(this.scene, (target) => {
                        playBtnClickAnim(target);
                    }, (target) => {
                        playBtnClickAnim(target);
                        this.destroyGameplay();
                        completeWindow.destroy(true);
                        this.showInstructionPage();
                    }, (target) => {
                        playBtnClickAnim(target);
                    });
                    this.setInputEnabled(false);
                    delayedCall(2000, () => {
                        setPageBackground("bg-blue");
                        this.add(completeWindow);
                        completeWindow.show(score, starScore);
                        this.bgMusic.stop();
                    });
                };
                this.showLoseWindow = (score, starScore) => {
                    let tryAgainWindow = new screen.TryAgainWindow(this.scene, (target) => {
                        playBtnClickAnim(target);
                    }, (target) => {
                        playBtnClickAnim(target);
                        this.destroyGameplay();
                        tryAgainWindow.destroy(true);
                        this.showInstructionPage();
                    });
                    this.setInputEnabled(false);
                    delayedCall(1500, () => {
                        setPageBackground("bg-blue");
                        this.add(tryAgainWindow);
                        tryAgainWindow.show(score, starScore);
                        this.bgMusic.stop();
                    });
                };
                this.gameplay = gameplay;
                window["gs"] = this;
                this._gameStage = new Phaser.GameObjects.Image(this.scene, game.scale.width / 2, game.scale.height / 2, 'BG');
                this._gameStage.setOrigin(0.5, 0.5);
                this._gameStage.setScale(1.02);
                // this._gameStage.setInteractive();
                this.add(this._gameStage);
                this._btnClose = new Phaser.GameObjects.Image(this.scene, 1025 - 105, 100 - 50, 'x Button');
                this._btnClose.setInteractive({ cursor: 'pointer' });
                this._btnClose["defScale"] = this._btnClose.scale;
                setupButtonTextureBased(this._btnClose, 'x Button', 'x Button HOVER EFFECT');
                this.add(this._btnClose);
                this._btnClose.on('pointerup', () => {
                    playBtnClickAnim(this._btnClose);
                    this.onCloseClick();
                });
                this._btnSound = new Phaser.GameObjects.Image(this.scene, 160 - 105, 100 - 50, 'Sound');
                this._btnSound.setInteractive({ cursor: 'pointer' });
                this._btnSound["defScale"] = this._btnSound.scale;
                setupButtonTextureBased(this._btnSound, 'Sound', 'Sound HOVER EFFECT');
                this.add(this._btnSound);
                this._btnSound.on('pointerup', () => {
                    playBtnClickAnim(this._btnSound);
                    this.onSoundClick();
                });
            }
            playCorrectAudio() {
                if (this.correctAudio) {
                    this.correctAudio.stop();
                }
                this.correctAudio = this.scene.sound.add('Make the word map');
                this.correctAudio.play();
                if (this.areYouSureWindow && this.areYouSureWindow.parentContainer == this) {
                    this.correctAudio.pause();
                }
                if (this.correctAudioWord)
                    this.correctAudioWord.stop();
            }
            onSoundClick() {
                this.playCorrectAudio();
            }
            showGameplay() {
                setPageBackground("bg-australia");
                this.bgMusic = this.scene.sound.add("Winter bg sound");
                this.bgMusic.play();
                this.bgMusic.loop = true;
                this.gameplayContainer = new Phaser.GameObjects.Container(this.scene);
                this.add(this.gameplayContainer);
                this.gameplay.reset();
                this.prepareRound();
                this.gameplay.setupCallbacks(this.showCompleteWindow, this.showLoseWindow, () => {
                    this.onNewRound(true);
                });
                this.createTallies();
            }
            prepareRound() {
                delayedCall(500, () => this.playCorrectAudio());
                this.gameplayContainer.removeAll();
                this.character = this.scene.add.sprite(0, 0, null);
                this.character.setPosition(750, 310);
                this.playIdle();
                this.longIce = new Phaser.GameObjects.Image(this.scene, 110, 147, 'Long Ice');
                this.longIce.setOrigin(0, 0);
                this.longIce.alpha = 0;
                this.gameplayContainer.add(this.longIce);
                let randomizedLetter = Phaser.Utils.Array.Shuffle(this.gameplay.blockLetters.slice());
                if (this.gameplay.useImages) {
                    let correctWord = new Phaser.GameObjects.Image(this.scene, 750, 180, this.gameplay.correctWord);
                    this.gameplayContainer.add(correctWord);
                }
                else {
                    let correctWord = this.scene.add.text(750, 180, "", {
                        "fontFamily": "Quran Era font",
                        "fontSize": 90,
                        "color": "#000000",
                        "align": 'center'
                    });
                    correctWord.setOrigin(0.5, 0.5);
                    correctWord.style.fixedHeight = 140;
                    correctWord.setText(this.gameplay.correctWord);
                    this.gameplayContainer.add(correctWord);
                }
                this.selectableLetters = [];
                this.targetBlocks = [];
                for (let i = 0; i < this.gameplay.getCorrectWordLettersNumber(); i++) {
                    let b = {
                        x: 174 + i * 133, y: 215
                    };
                    b['alreadyFilled'] = false;
                    this.targetBlocks.push(b);
                    b["-letter-text"] = this.gameplay.getCorrectWordCharAt(i);
                    b["-block-"] = null;
                }
                for (let i = 0; i < randomizedLetter.length; i++) {
                    let a = new Phaser.GameObjects.Container(this.scene, 100 + i * 150, 525);
                    a.add(a["-image-"] = new Phaser.GameObjects.Image(this.scene, 0, 0, 'IceBlock'));
                    a["-image-"].setOrigin(0.5, 0.5);
                    this.selectableLetters.push(a);
                    let txt;
                    if (this.gameplay.useImages) {
                        txt = new Phaser.GameObjects.Image(this.scene, 0, 0, randomizedLetter[i]);
                        a.add(txt);
                    }
                    else {
                        txt = this.scene.add.text(0, 0, "", {
                            "fontFamily": "Quran Era font",
                            "fontSize": 55,
                            "color": "#000000",
                            "align": 'center'
                        });
                        txt.setOrigin(0.5, 0.5);
                        txt.style.fixedHeight = 75;
                        txt.setText(randomizedLetter[i]);
                        a.add(txt);
                    }
                    a['startPosition'] = { x: a.x, y: a.y };
                    a["-letter-"] = txt;
                    a["-letter-text"] = randomizedLetter[i];
                    this.gameplayContainer.add(a);
                    a['-draggable-'] = true;
                }
                for (let a of this.selectableLetters) {
                    a.setSize(a["-image-"].width, a["-image-"].height);
                    a.setInteractive({ cursor: 'pointer' });
                    this.scene.input.setDraggable(a);
                    a.on('pointerdown', () => {
                        a['-pointerdown-'] = true;
                        if (a['-draggable-'])
                            this.scene.sound.add("drag from its spot").play();
                    });
                    a.on('pointerup', () => {
                        a['-pointerdown-'] = false;
                        if (!a['-draggable-'])
                            return;
                        this.moveBridgeBackToStartPosition(a, null, true);
                    });
                    a.on('pointerout', () => {
                        if (!a['-draggable-'])
                            return;
                        if (!a['-pointerdown-'])
                            return;
                        this.moveBridgeBackToStartPosition(a, null, true);
                    });
                }
                this.createInput();
                this.setInputEnabled(false);
                // delayedCall(1200, ()=>{
                if (this.gameplay.isNewRound()) {
                    if (!this.gameplay.isRoundsComplete()) {
                        // delayedCall(2000, ()=>{
                        this.setInputEnabled(true);
                        // });
                    }
                }
                else {
                    this.setInputEnabled(true);
                }
                // });
                this.gameplayContainer.add(this.character);
            }
            _update() {
                if (this.selectableLetters) {
                    for (let a of this.selectableLetters) {
                        if (a.x < 0 + a["-image-"].width / 2) {
                            a.x = 0 + a["-image-"].width / 2;
                        }
                        else if (a.x > game.scale.width - a["-image-"].width / 2) {
                            a.x = game.scale.width - a["-image-"].width / 2;
                        }
                        if (a.y < 0 + a["-image-"].height / 2) {
                            a.y = a["-image-"].height / 2;
                        }
                        else if (a.y > game.scale.height - a["-image-"].height / 2) {
                            a.y = game.scale.height - a["-image-"].height / 2;
                        }
                    }
                }
            }
            placeAppleOverBuckets(a) {
                if (!a.parentContainer)
                    return;
                this.gameplayContainer.remove(a);
                this.gameplayContainer.addAt(a, this.gameplayContainer.length);
            }
            onNewRound(showOut) {
                this.scene.sound.add("next_round").play();
                this.setInputEnabled(false);
                if (showOut) {
                    this.prepareRound();
                }
            }
            createInput() {
                this.scene.input.on('drag', (pointer, block, dragX, dragY) => {
                    if (!block['-draggable-'])
                        return;
                    block.x = dragX;
                    block.y = dragY;
                    this.gameplayContainer.bringToTop(block);
                    let targetBlock;
                    for (targetBlock of this.targetBlocks) {
                        if (targetBlock['alreadyFilled'])
                            continue;
                        if (Math.abs(block.x - targetBlock.x) < 25 && Math.abs(block.y - targetBlock.y) < 60 && (block.y > targetBlock.y - 7)) {
                            block['-draggable-'] = false;
                            targetBlock['alreadyFilled'] = true;
                            this.scene.tweens.add({
                                targets: block,
                                x: targetBlock.x,
                                y: targetBlock.y,
                                duration: 300,
                                ease: Phaser.Math.Easing.Back.Out
                            });
                            targetBlock["-block-"] = block;
                            this.checkTargetBlockLetters();
                        }
                    }
                });
                this._btnClose.setInteractive({ cursor: 'pointer', pixelPerfect: true });
            }
            checkTargetBlockLetters() {
                let sameLettersNum = 0;
                for (let targetBlock of this.targetBlocks) {
                    if (!targetBlock['-block-']) {
                        this.scene.sound.add("Placing block above").play();
                        return;
                    }
                    if (targetBlock["-letter-text"] == targetBlock['-block-']["-letter-text"]) {
                        sameLettersNum++;
                    }
                }
                this.setInputEnabled(false);
                if (sameLettersNum == this.targetBlocks.length) {
                    this.scene.sound.add("Placing block above").play();
                    this.scene.tweens.add({
                        targets: this.longIce,
                        alpha: 1,
                        duration: 250,
                        ease: Phaser.Math.Easing.Linear,
                    });
                    for (let targetBlock of this.targetBlocks) {
                        this.scene.tweens.add({
                            targets: targetBlock['-block-']["-image-"],
                            alpha: 0,
                            duration: 250,
                            ease: Phaser.Math.Easing.Linear
                        });
                        if (targetBlock == this.targetBlocks[1])
                            continue;
                        this.scene.tweens.add({
                            targets: targetBlock['-block-'],
                            x: this.targetBlocks[1]['x'],
                            duration: 250,
                            alpha: 0,
                            ease: Phaser.Math.Easing.Sine.Out,
                            delay: 250
                        });
                        delayedCall(500, () => {
                            if (this.gameplay.useImages) {
                                this.targetBlocks[1]['-block-']["-letter-"].setTexture(this.gameplay.correctWord);
                            }
                            else {
                                this.targetBlocks[1]['-block-']["-letter-"].setText(this.gameplay.correctWord);
                            }
                        });
                    }
                    this.scene.sound.add("Letters joining sound").play();
                    delayedCall(250, () => this.scene.sound.add("Correct click").play());
                    delayedCall(1000, () => this.scene.sound.add("success for corect word").play());
                    this.onCorrectAnswer();
                }
                else {
                    this.scene.sound.add("placed- wrong- snake - blocks go back").play();
                    // this.scene.sound.add("Wrong attempt").play();
                    delayedCall(2400, () => {
                        for (let targetBlock of this.targetBlocks) {
                            this.moveBridgeBackToStartPosition(targetBlock['-block-'], null, false);
                        }
                        // delayedCall(100, ()=>this.scene.sound.add("all three blocks move back after wrong").play());
                    });
                    delayedCall(1500, () => {
                        this.character.setOrigin(0.49, 0.515);
                        Preloader.playAnim('yelling_wrong', this.character, () => {
                            this.playIdle();
                        });
                        // this.scene.sound.add("Snake animation sfx").play();
                    });
                    delayedCall(2500, () => {
                        this.onWrongAnswer();
                        for (let targetBlock of this.targetBlocks) {
                            targetBlock['alreadyFilled'] = false;
                            targetBlock['-block-']['-draggable-'] = true;
                            targetBlock["-block-"] = null;
                        }
                    });
                    delayedCall(2750, () => {
                        this.setInputEnabled(true);
                    });
                }
            }
            moveBridgeBackToStartPosition(block, onComplete, playSound) {
                this.scene.tweens.add({
                    targets: block,
                    x: block['startPosition'].x,
                    y: block['startPosition'].y,
                    duration: 350,
                    ease: Phaser.Math.Easing.Sine.Out,
                    onComplete: () => {
                        if (onComplete)
                            onComplete();
                    }
                });
                if (Phaser.Math.Distance.Between(block['startPosition'].x, block['startPosition'].y, block.x, block.y) > 20) {
                    delayedCall(100, () => {
                        if (playSound) {
                            this.scene.sound.add("block goes back when released").play();
                        }
                    });
                }
                this.placeAppleOverBuckets(block);
            }
            onCorrectAnswer() {
                let i = this.gameplay.getCurrentTotalAnswersCount();
                this.tallyEmptyArray[i].visible = false;
                this.tally[i].visible = true;
                let completed = this.gameplay.onCorrectAnswer();
                return completed;
            }
            onWrongAnswer() {
                let i = this.gameplay.getCurrentTotalAnswersCount();
                this.tallyEmptyArray[i].visible = true;
                this.tallyEmptyArray[i].visible = true;
                this.tally[i].visible = false;
                let lost = this.gameplay.onWrongAnswer();
                // this.soundWrongDrop = this.scene.sound.add("wrong drop");
                // this.soundWrongDrop.play();
                // this.scene.sound.add("Goose no").play();
                if (this.idleDelayedCall != null) {
                    destroyDelayedCall(this.idleDelayedCall);
                    this.idleDelayedCall = null;
                }
                if (!lost) {
                    delayedCall(650, () => this.playCorrectAudio());
                }
                return lost;
            }
            onCloseClick() {
                this.showAreYouSurePage();
                this.scene.sound.add('warning page pop up sfx').play();
            }
            createTallies() {
                if (this.tally) {
                    for (let te of this.tallyEmptyArray) {
                        te.visible = false;
                        this.bringToTop(te);
                    }
                    for (let t of this.tally) {
                        t.visible = false;
                        this.bringToTop(t);
                    }
                    return;
                }
                let startX = 26;
                let startY = 148;
                let dy = 34;
                let tallyEmptyArrayPositions = [];
                for (let i = 0; i < 12; i++) {
                    tallyEmptyArrayPositions.push({ x: startX, y: startY + i * dy });
                }
                this.tallyEmptyArray = [];
                this.tally = [];
                for (let p of tallyEmptyArrayPositions) {
                    let _BeehiveEmpty = new Phaser.GameObjects.Image(this.scene, p['x'], p['y'], 'tally Empty');
                    this.tallyEmptyArray.push(_BeehiveEmpty);
                    _BeehiveEmpty.visible = false;
                    let _Beehive = new Phaser.GameObjects.Image(this.scene, p['x'], p['y'], 'tally');
                    this.tally.push(_Beehive);
                }
                for (let bea of this.tallyEmptyArray) {
                    this.add(bea);
                }
                for (let bee of this.tally) {
                    this.add(bee);
                    bee.visible = false;
                }
            }
            hideAllUnusedTallies() {
                let i = this.gameplay.getCurrentTotalAnswersCount();
                for (let k = i + 1; k < this.tallyEmptyArray.length; k++) {
                    this.tallyEmptyArray[k].visible = false;
                    this.tally[k].visible = false;
                }
            }
            showInstructionPage() {
                setPageBackground("bg-blue");
                let playInstructionSound = () => {
                    if (this.wfsnd) {
                        this.wfsnd.stop();
                    }
                    this.wfsnd = this.scene.sound.add("Drag the ice blocks to make the word");
                    this.wfsnd.play();
                };
                this.instructionPage = new screen.InstructionPage(this.scene, (target) => {
                    playBtnClickAnim(target);
                    this.instructionPage.destroy(true);
                    this.showGameplay();
                    if (this.wfsnd) {
                        this.wfsnd.stop();
                    }
                }, (target) => {
                    playBtnClickAnim(target);
                    playInstructionSound();
                });
                this.add(this.instructionPage);
                playInstructionSound();
            }
            showAreYouSurePage() {
                pauseAllDelayedCalls();
                setPageBackground("bg-blue");
                this.scene.tweens.pauseAll();
                this.pauseSounds();
                this.areYouSureWindow = new screen.AreYouSureWindow(this.scene, () => {
                    this.scene.tweens.resumeAll();
                    this.areYouSureWindow.destroy(true);
                    this.destroyGameplay();
                    this.showInstructionPage();
                }, () => {
                    this.scene.tweens.resumeAll();
                    this.areYouSureWindow.destroy(true);
                    this.unpauseSounds();
                    resumeAllDelayedCalls();
                    setPageBackground("bg-australia");
                });
                this.add(this.areYouSureWindow);
            }
            setInputEnabled(enabled) {
                if (enabled) {
                    for (let a of this.selectableLetters)
                        a.setInteractive({ cursor: 'pointer' });
                }
                else {
                    for (let a of this.selectableLetters)
                        a.disableInteractive();
                }
            }
            pauseSounds() {
                this.scene.sound.pauseAll();
            }
            unpauseSounds() {
                this.scene.sound.resumeAll();
            }
            destroyGameplay() {
                this.setInputEnabled(false);
                this.remove(this.gameplayContainer);
                this.scene.sound.stopAll();
                destroyAllDelayedCalls();
            }
        }
        screen.GameplayScreen = GameplayScreen;
    })(screen = ctb.screen || (ctb.screen = {}));
})(ctb || (ctb = {}));
var ctb;
(function (ctb) {
    var screen;
    (function (screen) {
        class InstructionPage extends Phaser.GameObjects.Container {
            constructor(scene, onPlayClick, onSndClick) {
                super(scene);
                this._instructionPage = new Phaser.GameObjects.Image(this.scene, 0 - 105, 0 - 48, 'Instructions page  ALL ACTIVITY  TITLEs');
                this._instructionPage.setOrigin(0, 0);
                // this._instructionPage.setInteractive();
                this._instructionPageTitle = new Phaser.GameObjects.Image(this.scene, 495, 105, 'Ice Blocks');
                this._instructionPageTitle.setScale(0.75);
                this._btnPlay = new Phaser.GameObjects.Image(this.scene, game.scale.width / 2, 480 - 50, 'btnPLAY1');
                this._btnPlay.setInteractive({ cursor: 'pointer' });
                this._btnPlay.once('pointerup', onPlayClick);
                setupButtonTextureBased(this._btnPlay, 'btnPLAY1', 'btnPLAY2');
                this.instrTxt = this.scene.add.text(game.scale.width / 2, game.scale.height / 2, "Drag the ice blocks to make the word.", {
                    "fontFamily": "Kids Rock Demo",
                    "fontSize": 30,
                    "color": "#43425D",
                    "align": 'center'
                });
                this.instrTxt.setOrigin(0.5, 0.5);
                this.instrTxt.setWordWrapWidth(600);
                this.instrTxt.setLineSpacing(5);
                this._btnSoundInstruction = new Phaser.GameObjects.Image(this.scene, 800 - 105, 156 - 50, 'Sound');
                this._btnSoundInstruction.setInteractive({ cursor: 'pointer' });
                this._btnSoundInstruction.on('pointerup', onSndClick);
                this._btnSoundInstruction["defScale"] = this._btnSoundInstruction.scale;
                setupButtonTextureBased(this._btnSoundInstruction, 'Sound', 'Sound HOVER EFFECT');
                this.add(this._instructionPage);
                this.add(this._instructionPageTitle);
                this.add(this.instrTxt);
                this.add(this._btnPlay);
                this.add(this._btnSoundInstruction);
            }
        }
        screen.InstructionPage = InstructionPage;
    })(screen = ctb.screen || (ctb.screen = {}));
})(ctb || (ctb = {}));
var ctb;
(function (ctb) {
    var screen;
    (function (screen) {
        class TryAgainWindow extends Phaser.GameObjects.Container {
            constructor(scene, onBack, onReplay) {
                super(scene);
                this.music = null;
                this.setPosition(-106, -48);
                this._bg = new Phaser.GameObjects.Image(this.scene, 0, 0, 'Try again page');
                this._bg.setOrigin(0, 0);
                // this._bg.setInteractive();
                this._star = new Phaser.GameObjects.Image(this.scene, 400, 415, 'Break Star');
                this._btnBack = new Phaser.GameObjects.Image(this.scene, 600, 580, 'btnBACK1');
                this._btnReplay = new Phaser.GameObjects.Image(this.scene, 765, 580, 'btnReplay1');
                this.totalScoreTxt = this.scene.add.text(830, 355, "", {
                    "fontFamily": "Kids Rock Demo",
                    "fontSize": 35,
                    "color": "#F49F1C",
                    "align": 'center',
                    'stroke': '#70451A',
                    'strokeThickness': 6
                });
                this.totalScoreTxt.setOrigin(0.5, 0.5);
                let grd = this.totalScoreTxt.context.createLinearGradient(0, 0, 0, this.totalScoreTxt.height);
                grd.addColorStop(0, '#FFFF00');
                grd.addColorStop(1, '#C17316');
                this.totalScoreTxt.setFill(grd);
                this.starScoreTxt = this.scene.add.text(635, 431, "", {
                    "fontFamily": "Kids Rock Demo",
                    "fontSize": 24,
                    "color": "#FFFFFF",
                    "align": 'center'
                });
                this.starScoreTxt.setOrigin(0.5, 0.5);
                this.add([
                    this._bg,
                    this._star,
                    this._btnBack,
                    this._btnReplay,
                    this.totalScoreTxt,
                    this.starScoreTxt
                ]);
                this._btnBack.setInteractive({ cursor: 'pointer' });
                this._btnBack.on('pointerup', () => {
                    onBack(this._btnBack);
                    // if (this.music) {
                    //     this.music.stop();
                    // }
                });
                setupButtonTextureBased(this._btnBack, 'btnBACK1', 'btnBACK2');
                this._btnReplay.setInteractive({ cursor: 'pointer' });
                this._btnReplay.once('pointerup', () => {
                    onReplay(this._btnReplay);
                    if (this.music) {
                        this.music.stop();
                    }
                });
                setupButtonTextureBased(this._btnReplay, 'btnReplay1', 'btnReplay2');
            }
            show(score, starScore) {
                this._star.scale = 1.25;
                this.scene.tweens.add({
                    targets: this._star,
                    "scale": 1,
                    duration: 500,
                    ease: Phaser.Math.Easing.Back.Out
                });
                this.totalScoreTxt.text = String(score);
                this.starScoreTxt.text = String(starScore);
                this.music = this.scene.sound.add("Fail - close one");
                this.music.play();
            }
        }
        screen.TryAgainWindow = TryAgainWindow;
    })(screen = ctb.screen || (ctb.screen = {}));
})(ctb || (ctb = {}));
//# sourceMappingURL=main.js.map