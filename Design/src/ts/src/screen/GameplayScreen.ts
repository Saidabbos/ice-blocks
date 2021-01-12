namespace ctb.screen {

    import Gameplay = ctb.core.Gameplay;
    import Preloader = ctb.scene.Preloader;

    export class GameplayScreen extends Phaser.GameObjects.Container {
        _gameStage: Phaser.GameObjects.Image;
        _btnClose: Phaser.GameObjects.Image;

        private gameplayContainer: Phaser.GameObjects.Container;

        gameplay: Gameplay;

        _btnSound: Phaser.GameObjects.Image;

        selectableLetters:Phaser.GameObjects.Container[];
        targetBlocks:object[];

        private bgMusic:any = null;

        private character:Phaser.GameObjects.Sprite;

        tallyEmptyArray: Phaser.GameObjects.Image[];
        tally: Phaser.GameObjects.Image[];

        longIce:Phaser.GameObjects.Image;

        constructor(scene: Phaser.Scene, gameplay: Gameplay) {
            super(scene);
            this.gameplay = gameplay;window["gs"]=this;

            this._gameStage = new Phaser.GameObjects.Image(this.scene, game.scale.width / 2, game.scale.height / 2, 'BG');
            this._gameStage.setOrigin(0.5, 0.5);
            this._gameStage.setScale(1.02);
            // this._gameStage.setInteractive();
            this.add(this._gameStage);

            this._btnClose = new Phaser.GameObjects.Image(this.scene, 1025-105, 100-50,'x Button');
            this._btnClose.setInteractive({cursor: 'pointer'});
            this._btnClose["defScale"] = this._btnClose.scale;
            setupButtonTextureBased(this._btnClose, 'x Button','x Button HOVER EFFECT');
            this.add(this._btnClose);
            this._btnClose.on('pointerup', () => {
                playBtnClickAnim(this._btnClose);

                this.onCloseClick();
            });
            this._btnSound = new Phaser.GameObjects.Image(this.scene, 160-105, 100-50, 'Sound');
            this._btnSound.setInteractive({cursor: 'pointer'});
            this._btnSound["defScale"] = this._btnSound.scale;
            setupButtonTextureBased(this._btnSound, 'Sound','Sound HOVER EFFECT');
            this.add(this._btnSound);
            this._btnSound.on('pointerup', () => {
                playBtnClickAnim(this._btnSound);

                this.onSoundClick();
            });
        }


        private correctAudio = null;
        private correctAudioWord = null;
        private playCorrectAudio():void {
            if (this.correctAudio) {
                this.correctAudio.stop();
            }
            this.correctAudio = this.scene.sound.add('Make the word map');
            this.correctAudio.play();
            if (this.areYouSureWindow && this.areYouSureWindow.parentContainer == this) {
                this.correctAudio.pause();
            }

            if (this.correctAudioWord) this.correctAudioWord.stop();
        }

        public onSoundClick(): void {
            this.playCorrectAudio();
        }

        private idleDelayedCall = null;
        private playIdle:()=>void = ()=>{
            this.character.setOrigin(0.5, 0.5);
            Preloader.playAnim('idle', this.character, ()=>{
                this.idleDelayedCall = delayedCall(5000, ()=>{
                    this.playIdle();
                });
            });
        };

        public showGameplay(): void {
            setPageBackground("bg-australia");

            this.bgMusic = this.scene.sound.add("Winter bg sound");
            this.bgMusic.play();
            this.bgMusic.loop = true;

            this.gameplayContainer = new Phaser.GameObjects.Container(this.scene);
            this.add(this.gameplayContainer);

            this.gameplay.reset();

            this.prepareRound();
            this.gameplay.setupCallbacks(this.showCompleteWindow, this.showLoseWindow, ()=>{
                this.onNewRound(true);
            });

            this.createTallies();
        }

        public prepareRound():void {
            delayedCall(500, ()=>this.playCorrectAudio());

            this.gameplayContainer.removeAll();

            this.character = this.scene.add.sprite(0, 0, null);
            this.character.setPosition(750, 310);
            this.playIdle();

            this.longIce = new Phaser.GameObjects.Image(this.scene, 110, 147, 'Long Ice');
            this.longIce.setOrigin(0, 0);
            this.longIce.alpha = 0;
            this.gameplayContainer.add(this.longIce);

            let randomizedLetter:string[] = Phaser.Utils.Array.Shuffle(this.gameplay.blockLetters.slice());

            if (this.gameplay.useImages) {
                let correctWord = new Phaser.GameObjects.Image(this.scene, 750, 180, this.gameplay.correctWord);
                this.gameplayContainer.add(correctWord);
            } else {
                let correctWord:Phaser.GameObjects.Text = this.scene.add.text(750, 180, "", {
                    "fontFamily": "Quran Era font",
                    "fontSize": 90 as any,
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
            for (let i:number = 0; i < this.gameplay.getCorrectWordLettersNumber(); i++) {
                let b = {
                    x:174 + i * 133, y:215
                };
                b['alreadyFilled'] = false;
                this.targetBlocks.push(b);
                b["-letter-text"] = this.gameplay.getCorrectWordCharAt(i);
                b["-block-"] = null;
            }
            for (let i:number = 0; i < randomizedLetter.length; i++) {
                let a:Phaser.GameObjects.Container = new Phaser.GameObjects.Container(this.scene, 100 + i * 150, 525);
                a.add(a["-image-"] = new Phaser.GameObjects.Image(this.scene, 0, 0,'IceBlock'));
                a["-image-"].setOrigin(0.5, 0.5);
                this.selectableLetters.push(a);

                let txt:Phaser.GameObjects.Text | Phaser.GameObjects.Image;
                if (this.gameplay.useImages) {
                    txt = new Phaser.GameObjects.Image(this.scene, 0, 0, randomizedLetter[i]);
                    a.add(txt);
                } else {
                    txt = this.scene.add.text(0, 0, "", {
                        "fontFamily": "Quran Era font",
                        "fontSize": 55 as any,
                        "color": "#000000",
                        "align": 'center'
                    });
                    txt.setOrigin(0.5, 0.5);
                    txt.style.fixedHeight = 75;
                    txt.setText(randomizedLetter[i]);
                    a.add(txt);
                }
                a['startPosition'] = {x:a.x, y:a.y};

                a["-letter-"] = txt;
                a["-letter-text"] = randomizedLetter[i];
                this.gameplayContainer.add(a);
                a['-draggable-'] = true;
            }

            for (let a of this.selectableLetters) {
                a.setSize(a["-image-"].width, a["-image-"].height);
                a.setInteractive({cursor: 'pointer'});
                this.scene.input.setDraggable(a);

                a.on('pointerdown', () => {
                    a['-pointerdown-'] = true;
                    if (a['-draggable-']) this.scene.sound.add("drag from its spot").play();
                });
                a.on('pointerup', () => {
                    a['-pointerdown-'] = false;
                    if (!a['-draggable-']) return;
                    this.moveBridgeBackToStartPosition(a, null, true);
                });
                a.on('pointerout', () => {
                    if (!a['-draggable-']) return;
                    if (!a['-pointerdown-']) return;
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
            } else {
                this.setInputEnabled(true);
            }
            // });

            this.gameplayContainer.add(this.character);
        }

        public _update() {
            if (this.selectableLetters) {
                for (let a of this.selectableLetters) {
                    if (a.x < 0 + a["-image-"].width/2) {
                        a.x = 0 + a["-image-"].width/2;
                    } else if (a.x > game.scale.width - a["-image-"].width/2) {
                        a.x = game.scale.width - a["-image-"].width/2;
                    }
                    if (a.y < 0 + a["-image-"].height/2) {
                        a.y = a["-image-"].height/2;
                    } else if (a.y > game.scale.height - a["-image-"].height/2) {
                        a.y = game.scale.height - a["-image-"].height/2;
                    }
                }
            }
        }

        public placeAppleOverBuckets(a):void {
            if (!a.parentContainer) return;
            this.gameplayContainer.remove(a);
            this.gameplayContainer.addAt(a, this.gameplayContainer.length);
        }

        private onNewRound(showOut:boolean):void {
            this.scene.sound.add("next_round").play();

            this.setInputEnabled(false);

            if (showOut) {
                this.prepareRound();
            }
        }

        public createInput(): void {
            this.scene.input.on('drag', (pointer, block, dragX, dragY) => {
                if (!block['-draggable-']) return;

                block.x = dragX;
                block.y = dragY;
                this.gameplayContainer.bringToTop(block);

                let targetBlock:any;
                for (targetBlock of this.targetBlocks) {
                    if (targetBlock['alreadyFilled']) continue;

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


            this._btnClose.setInteractive({cursor: 'pointer', pixelPerfect:true});
        }

        private checkTargetBlockLetters():void {
            let sameLettersNum:number = 0;
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

                    if (targetBlock == this.targetBlocks[1]) continue;

                    this.scene.tweens.add({
                        targets: targetBlock['-block-'],
                        x: this.targetBlocks[1]['x'],
                        duration: 250,
                        alpha: 0,
                        ease: Phaser.Math.Easing.Sine.Out,
                        delay: 250
                    });
                    delayedCall(500, ()=>{
                        if (this.gameplay.useImages) {
                            (this.targetBlocks[1]['-block-']["-letter-"] as Phaser.GameObjects.Image).setTexture(this.gameplay.correctWord);
                        } else {
                            (this.targetBlocks[1]['-block-']["-letter-"] as Phaser.GameObjects.Text).setText(this.gameplay.correctWord);
                        }
                    });
                }
                this.scene.sound.add("Letters joining sound").play();
                delayedCall(250, ()=>this.scene.sound.add("Correct click").play())
                delayedCall(1000, ()=>this.scene.sound.add("success for corect word").play());
                this.onCorrectAnswer();
            } else {

                this.scene.sound.add("placed- wrong- snake - blocks go back").play();

                // this.scene.sound.add("Wrong attempt").play();
                delayedCall(2400, ()=>{
                    for (let targetBlock of this.targetBlocks) {
                        this.moveBridgeBackToStartPosition(targetBlock['-block-'], null, false);
                    }
                    // delayedCall(100, ()=>this.scene.sound.add("all three blocks move back after wrong").play());
                });

                delayedCall(1500, ()=>{
                    this.character.setOrigin(0.49, 0.515);
                    Preloader.playAnim('yelling_wrong', this.character, ()=>{
                        this.playIdle();
                    });
                    // this.scene.sound.add("Snake animation sfx").play();
                });

                delayedCall(2500, ()=>{
                    this.onWrongAnswer();

                    for (let targetBlock of this.targetBlocks) {
                        targetBlock['alreadyFilled'] = false;
                        targetBlock['-block-']['-draggable-'] = true;
                        targetBlock["-block-"] = null;
                    }
                });

                delayedCall(2750, ()=>{
                    this.setInputEnabled(true);
                });
            }
        }

        private moveBridgeBackToStartPosition(block, onComplete, playSound):void {
            this.scene.tweens.add({
                targets: block,
                x: block['startPosition'].x,
                y: block['startPosition'].y,
                duration: 350,
                ease: Phaser.Math.Easing.Sine.Out,
                onComplete:()=>{
                    if (onComplete) onComplete();
                }
            });
            if (Phaser.Math.Distance.Between(block['startPosition'].x, block['startPosition'].y, block.x, block.y) > 20) {
                delayedCall(100, ()=>{
                    if (playSound) {
                        this.scene.sound.add("block goes back when released").play();
                    }
                });

            }

            this.placeAppleOverBuckets(block);
        }

        public onCorrectAnswer(): boolean {
            let i: number = this.gameplay.getCurrentTotalAnswersCount();
            this.tallyEmptyArray[i].visible = false;
            this.tally[i].visible = true;

            let completed:boolean = this.gameplay.onCorrectAnswer();

            return completed;
        }

        private soundWrongDrop = null;
        public onWrongAnswer(): boolean {
            let i: number = this.gameplay.getCurrentTotalAnswersCount();
            this.tallyEmptyArray[i].visible = true;
            this.tallyEmptyArray[i].visible = true;
            this.tally[i].visible = false;

            let lost:boolean = this.gameplay.onWrongAnswer();

            // this.soundWrongDrop = this.scene.sound.add("wrong drop");
            // this.soundWrongDrop.play();
            // this.scene.sound.add("Goose no").play();

            if (this.idleDelayedCall != null) {
                destroyDelayedCall(this.idleDelayedCall);
                this.idleDelayedCall = null;
            }

            if (!lost) {
                delayedCall(650, ()=>this.playCorrectAudio());
            }

            return lost;
        }

        public onCloseClick(): void {
            this.showAreYouSurePage();
            this.scene.sound.add('warning page pop up sfx').play();
        }

        private createTallies(): void {
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

            let startX: number = 26;
            let startY: number = 148;
            let dy: number = 34;
            let tallyEmptyArrayPositions = [];
            for (let i = 0; i < 12; i++) {
                tallyEmptyArrayPositions.push({x: startX, y: startY + i * dy});
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

        public hideAllUnusedTallies():void {
            let i: number = this.gameplay.getCurrentTotalAnswersCount();
            for (let k:number = i + 1; k < this.tallyEmptyArray.length; k++) {
                this.tallyEmptyArray[k].visible = false;
                this.tally[k].visible = false;
            }
        }

        private wfsnd = null;
        private instructionPage: InstructionPage;
        public showInstructionPage(): void {
            setPageBackground("bg-blue");

            let playInstructionSound:()=>void = ()=>{
                if (this.wfsnd) {
                    this.wfsnd.stop();
                }
                this.wfsnd = this.scene.sound.add("Drag the ice blocks to make the word");
                this.wfsnd.play();
            };

            this.instructionPage = new InstructionPage(this.scene, (target) => {
                playBtnClickAnim(target);
                this.instructionPage.destroy(true);
                this.showGameplay();

                if (this.wfsnd) {
                    this.wfsnd.stop();
                }
            },(target) => {
                playBtnClickAnim(target);
                playInstructionSound();
            });
            this.add(this.instructionPage);
            playInstructionSound();
        }

        private areYouSureWindow:AreYouSureWindow;
        public showAreYouSurePage(): void {
            pauseAllDelayedCalls();
            setPageBackground("bg-blue");
            this.scene.tweens.pauseAll();

            this.pauseSounds();

            this.areYouSureWindow = new AreYouSureWindow(this.scene, ()=> {
                this.scene.tweens.resumeAll();
                this.areYouSureWindow.destroy(true);
                this.destroyGameplay();
                this.showInstructionPage();
            },()=> {
                this.scene.tweens.resumeAll();
                this.areYouSureWindow.destroy(true);
                this.unpauseSounds();
                resumeAllDelayedCalls();
                setPageBackground("bg-australia");
            });
            this.add(this.areYouSureWindow);
        }

        public showCompleteWindow: (score: number, starScore: number) => void = (score: number, starScore: number) => {
            let completeWindow: CompleteWindow = new CompleteWindow(this.scene, (target) => {
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

        public showLoseWindow: (score: number, starScore: number) => void = (score: number, starScore: number) => {
            let tryAgainWindow: TryAgainWindow = new TryAgainWindow(this.scene, (target) => {
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

        public setInputEnabled(enabled: boolean): void {
            if (enabled) {
                for (let a of this.selectableLetters) a.setInteractive({cursor: 'pointer'});
            } else {
                for (let a of this.selectableLetters) a.disableInteractive();
            }
        }

        public pauseSounds():void {
            this.scene.sound.pauseAll();
        }

        public unpauseSounds():void {
            this.scene.sound.resumeAll();
        }

        public destroyGameplay():void {
            this.setInputEnabled(false);
            this.remove(this.gameplayContainer);
            this.scene.sound.stopAll();
            destroyAllDelayedCalls();
        }
    }
}