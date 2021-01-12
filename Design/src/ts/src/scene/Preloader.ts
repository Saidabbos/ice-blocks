module ctb.scene {

    export class Preloader extends Phaser.Scene {

        public static readonly ANIMS_DATA:object = {
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

        preload() {
            this.load.json('gameplay', 'assets/json/gameplay.json');
        }

        create() {
            let json = game.cache.json.get('gameplay');
            if (json["useImages"]) {
                for (let l of json["letters"]) {
                    this.load.image(l["letterName"], "assets/imgs/letters/"+l["letterName"]+".png");
                }
                for (let r of json["rounds"]) {
                    this.load.image(r["correctWord"], "assets/imgs/words/"+r["correctWord"]+".png");
                }
            }
            for (let l of json["letters"]) {
                this.load.audio(l["audioKey"], "assets/sound/mp3/letters/"+l["audioKey"]+".mp3");
            }
            for (let r of json["rounds"]) {
                this.load.audio(r["correctWord"], "assets/sound/mp3/words/"+r["correctWord"]+".mp3");
            }

            let progressTxt:Phaser.GameObjects.Text = this.add.text(game.scale.width/2, game.scale.height/2, "", {
                "fontFamily": "Quran Era font",
                "fontSize": 25,
                "color": "#000000",
                "align": 'center'
            });
            progressTxt.setOrigin(0.5, 0.5);

            this.load.pack('preloader', 'assets/pack.json');

            this.load.on('progress', (value:number) => {
                progressTxt.text = Math.ceil(value * 100) + "%";
            }, this);

            this.load.on('complete', () => {
                this.nextScene();
            });

            this.load.start();
        }

        public static playAnim(animKey:string, sprite:Phaser.GameObjects.Sprite, onComplete:()=>void = null):Phaser.GameObjects.Sprite {
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
            sprite.on('animationcomplete', ()=>{
                if (onComplete) onComplete();
            });
            return sprite;
        }

        private nextScene():void {
            game.scene.remove('Preloader');
            game.scene.add('ScreenMain', ctb.scene.MainScene, true);
        }
    }
}