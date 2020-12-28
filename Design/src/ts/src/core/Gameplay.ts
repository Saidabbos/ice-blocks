namespace ctb.core {
    export class Gameplay {
        public allLettersNames:string[] = null;

        public totalRoundsNum:number;
        public readonly failsNumToLose:number;

        private currentRound:number = 0;
        private letters:object[];
        private rounds:object[];
        public blockLetters:string[];
        public correctWord:string;

        private correctAnswersCount: number = 0;
        private wrongAnswersCount: number = 0;
        public correctAnswersCountThisRound: number = 0;
        public wrongAnswersCountThisRound: number = 0;

        private onComplete:(score:number, starScore:number)=>void;
        private onLose:(score:number, starScore:number)=>void;
        private onNewRound:()=>void = null;

        public useImages:boolean;

        private wordsLetters:object;
        public getCorrectWordCharAt(at:number):string {
            return this.wordsLetters[this.correctWord][at];
        }
        public getCorrectWordLettersNumber():number {
            return this.wordsLetters[this.correctWord].length;
        }

        constructor() {
            this.failsNumToLose = Number(game.cache.json.get('gameplay')["failsNumToLose"]);
            this.useImages = Boolean(game.cache.json.get('gameplay')["useImages"]);
        }

        public setupCallbacks(onComplete:(score:number, starScore:number)=>void, onLose:(score:number, starScore:number)=>void, onNewRound:()=>void):void {
            this.onComplete = onComplete;
            this.onLose = onLose;
            this.onNewRound = onNewRound;
        }

        public calculateScore():number {
            return this.totalRoundsNum - this.wrongAnswersCount;
        }

        public onLettersPlaced():boolean {
            if (this.correctAnswersCountThisRound == 1) {
                this.currentRound++;
                if (this.currentRound >= this.totalRoundsNum) {
                    let score:number = this.calculateScore();
                    this.onComplete(score, score);
                    return true;
                } else {
                    this.nextLetter();
                }
            }
            return false;
        }

        public nextLetterDelay:number = 0;
        public nextLetter():void {
            let fn:()=>void = ()=>{
                let thisRound = this.rounds.shift();
                this.blockLetters = thisRound["blockLetters"];
                this.correctWord = thisRound["correctWord"];

                this.correctAnswersCountThisRound = 0;
                this.wrongAnswersCountThisRound = 0;

                if (this.onNewRound) this.onNewRound();
            };
            if (this.nextLetterDelay == 0) {
                fn();
            } else {
                delayedCall(this.nextLetterDelay, fn);
            }
        }

        public onCorrectAnswer(): boolean {
            this.correctAnswersCount++;
            this.correctAnswersCountThisRound++;

            this.nextLetterDelay = 3500;

            return this.onLettersPlaced();
        }

        public onWrongAnswer(): boolean {
            this.wrongAnswersCount++;
            this.wrongAnswersCountThisRound++;

            this.nextLetterDelay = 2000;

            if (this.wrongAnswersCount >= this.failsNumToLose) {
                this.onLose(0, 0);
                return true;
            } else {
                this.onLettersPlaced();
            }
            return false;
        }

        public getCurrentTotalAnswersCount(): number {
            return this.correctAnswersCount + this.wrongAnswersCount;
        }

        public getCurrentTotalAnswersCountThisRound(): number {
            return this.correctAnswersCountThisRound + this.wrongAnswersCountThisRound;
        }

        public isNewRound():boolean {
            return this.getCurrentTotalAnswersCountThisRound() == 0;
        }

        public isRoundsComplete():boolean {
            return this.currentRound >= this.totalRoundsNum;
        }

        public getAudioKeyOfChar(letter:string):string {
            let json = game.cache.json.get('gameplay');
            let letters = json["letters"];
            for (let d of letters) {
                if (letter == d['letterName']) {
                    return d['audioKey'];
                }
            }
            return null;
        }

        public reset():void {
            this.nextLetterDelay = 0;
            this.setupCallbacks(null, null, null);

            let json = game.cache.json.get('gameplay');
            this.wordsLetters = json["wordsLetters"];
            this.rounds = json["rounds"].slice();
            this.totalRoundsNum = this.rounds.length;
            this.letters = json["letters"].slice();
            this.allLettersNames = [];
            for (let d of this.letters) this.allLettersNames.push(d["letterName"]);

            this.nextLetter();

            this.currentRound = 0;
            this.correctAnswersCount = 0;
            this.wrongAnswersCount = 0;
            this.correctAnswersCountThisRound = 0;
            this.wrongAnswersCountThisRound = 0;
        }
    }
}