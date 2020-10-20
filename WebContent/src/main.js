;;function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}function _createForOfIteratorHelper(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var a=0,r=function(){};return{s:r,n:function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,o=!0,i=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return o=e.done,e},e:function(e){i=!0,s=e},f:function(){try{o||null==n.return||n.return()}finally{if(i)throw s}}}}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_setPrototypeOf(e,t)}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function _createSuper(e){var t=_isNativeReflectConstruct();return function(){var n,a=_getPrototypeOf(e);if(t){var r=_getPrototypeOf(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return _possibleConstructorReturn(this,n)}}function _possibleConstructorReturn(e,t){return!t||"object"!==_typeof(t)&&"function"!=typeof t?_assertThisInitialized(e):t}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var game;!function(e){var t=function(t){_inherits(a,Phaser.Game);var n=_createSuper(a);function a(){var t;_classCallCheck(this,a);var r={type:Phaser.AUTO,width:a.CANVAS_WIDTH,height:a.CANVAS_HEIGHT,parent:"game-container",dom:{createContainer:!1},scale:{mode:FitScaleManager.detectBestScaleMode(),autoCenter:Phaser.Scale.CENTER_BOTH},transparent:!0,scene:{create:function(){t.scene.add("Boot",e.scene.Boot,!0)}}};return t=n.call(this,r)}return a}();t.CANVAS_WIDTH=980,t.CANVAS_HEIGHT=600,e.App=t}(ctb||(ctb={})),window.onload=function(){game=new ctb.App};var delayedCalls=[];function delayedCall(e,t,n,a){var r=game.scene.getAt(0);if(r){var s=r.time.delayedCall(e,t,n,a);return delayedCalls.push(s),s}var o=setTimeout(t,e);return delayedCalls.push(o),o}function pauseAllDelayedCalls(){var e,t=_createForOfIteratorHelper(delayedCalls);try{for(t.s();!(e=t.n()).done;){var n=e.value;n instanceof Phaser.Time.TimerEvent&&(n.paused=!0)}}catch(e){t.e(e)}finally{t.f()}}function resumeAllDelayedCalls(){var e,t=_createForOfIteratorHelper(delayedCalls);try{for(t.s();!(e=t.n()).done;){var n=e.value;n instanceof Phaser.Time.TimerEvent&&(n.paused=!1)}}catch(e){t.e(e)}finally{t.f()}}function destroyAllDelayedCalls(){var e,t=_createForOfIteratorHelper(delayedCalls);try{for(t.s();!(e=t.n()).done;){var n=e.value;n instanceof Phaser.Time.TimerEvent?n.remove(!1):clearTimeout(n)}}catch(e){t.e(e)}finally{t.f()}delayedCalls=[]}function destroyDelayedCall(e){e instanceof Phaser.Time.TimerEvent?e.remove(!1):clearTimeout(e);var t=delayedCalls.indexOf(e);t>=0&&delayedCalls.splice(t,1)}function setPageBackground(e){document.querySelector("html").style.backgroundImage="url(assets/imgs/"+e+".jpg)"}function setupButton(e,t){e.on("pointerdown",(function(){e.setFrame(t+"_hover0000")})),e.on("pointerover",(function(){e.setFrame(t+"_hover0000"),game.scene.getAt(0).sound.add("button hover").play()})),e.on("pointerout",(function(){e.setFrame(t+"0000")})),e.on("pointerup",(function(){e.setFrame(t+"0000"),game.scene.getAt(0).sound.add("activity selection - button selection").play()}))}function setupButtonTextureBased(e,t,n){e.on("pointerdown",(function(){e.setTexture(n)})),e.on("pointerover",(function(){e.setTexture(n),game.scene.getAt(0).sound.add("button hover").play()})),e.on("pointerout",(function(){e.setTexture(t)})),e.on("pointerup",(function(){e.setTexture(t),game.scene.getAt(0).sound.add("activity selection - button selection").play()}))}function playBtnClickAnim(e){var t=e.hasOwnProperty("defScale")?e.defScale:1;e.scaleX=e.scaleY=t,game.scene.getAt(0).tweens.add({targets:e,scaleX:.9*t,scaleY:.9*t,duration:100,yoyo:!0})}var ctb,FitScaleManager=function(){function e(t){var n=this;_classCallCheck(this,e),this.doResize=function(){var e=n.calculateScale(),t=n.phaserScaleManager.width*e,a=n.phaserScaleManager.height*e;n.canvasStyle.width=t+"px",n.canvasStyle.height=a+"px",n.canvasStyle.marginLeft=(window.innerWidth-t)/2+"px",n.canvasStyle.marginTop=(window.innerHeight-a)/2+"px"},this.game=t,this.canvasStyle=this.game.canvas.style,this.phaserScaleManager=this.game.scale}return _createClass(e,[{key:"setup",value:function(){this.phaserScaleManager.addListener(Phaser.Scale.Events.RESIZE,this.onResize,this),this.overridePhaserTransformMethods(),this.onResize()}},{key:"calculateScale",value:function(){return game.scale.scaleMode==Phaser.Scale.NONE?1:Math.min(window.innerWidth/this.phaserScaleManager.width,window.innerHeight/this.phaserScaleManager.height)}},{key:"overridePhaserTransformMethods",value:function(){var e=this;this.game.scale.transformX=function(t){return(t-parseInt(e.canvasStyle.marginLeft.split("px")[0]))/e.calculateScale()},this.game.scale.transformY=function(t){return(t-parseInt(e.canvasStyle.marginTop.split("px")[0]))/e.calculateScale()}}},{key:"onResize",value:function(){setTimeout(this.doResize,e.RESIZE_DELAY)}}],[{key:"detectBestScaleMode",value:function(){var e=/iPad|iPhone|iPod/.test(navigator.platform||""),t=window.navigator.userAgent.toLowerCase().indexOf("android")>-1;return e||t?Phaser.Scale.FIT:Phaser.Scale.NONE}}]),e}();FitScaleManager.RESIZE_DELAY=500,function(e){!function(e){var t=function(){function e(){_classCallCheck(this,e),this.allLettersNames=null,this.currentRound=0,this.correctAnswersCount=0,this.wrongAnswersCount=0,this.correctAnswersCountThisRound=0,this.wrongAnswersCountThisRound=0,this.onNewRound=null,this.nextLetterDelay=0,this.failsNumToLose=Number(game.cache.json.get("gameplay").failsNumToLose),this.useImages=Boolean(game.cache.json.get("gameplay").useImages)}return _createClass(e,[{key:"setupCallbacks",value:function(e,t,n){this.onComplete=e,this.onLose=t,this.onNewRound=n}},{key:"calculateScore",value:function(){return this.totalRoundsNum-this.wrongAnswersCount}},{key:"onLettersPlaced",value:function(){if(1==this.correctAnswersCountThisRound){if(this.currentRound++,this.currentRound>=this.totalRoundsNum){var e=this.calculateScore();return this.onComplete(e,e),!0}this.nextLetter()}return!1}},{key:"nextLetter",value:function(){var e=this,t=function(){var t=e.rounds.shift();e.blockLetters=t.blockLetters,e.correctWord=t.correctWord,e.correctAnswersCountThisRound=0,e.wrongAnswersCountThisRound=0,e.onNewRound&&e.onNewRound()};0==this.nextLetterDelay?t():delayedCall(this.nextLetterDelay,t)}},{key:"onCorrectAnswer",value:function(){return this.correctAnswersCount++,this.correctAnswersCountThisRound++,this.nextLetterDelay=3500,this.onLettersPlaced()}},{key:"onWrongAnswer",value:function(){return this.wrongAnswersCount++,this.wrongAnswersCountThisRound++,this.nextLetterDelay=2e3,this.wrongAnswersCount>=this.failsNumToLose?(this.onLose(0,0),!0):(this.onLettersPlaced(),!1)}},{key:"getCurrentTotalAnswersCount",value:function(){return this.correctAnswersCount+this.wrongAnswersCount}},{key:"getCurrentTotalAnswersCountThisRound",value:function(){return this.correctAnswersCountThisRound+this.wrongAnswersCountThisRound}},{key:"isNewRound",value:function(){return 0==this.getCurrentTotalAnswersCountThisRound()}},{key:"isRoundsComplete",value:function(){return this.currentRound>=this.totalRoundsNum}},{key:"getAudioKeyOfChar",value:function(e){var t,n=_createForOfIteratorHelper(game.cache.json.get("gameplay").letters);try{for(n.s();!(t=n.n()).done;){var a=t.value;if(e==a.letterName)return a.audioKey}}catch(e){n.e(e)}finally{n.f()}return null}},{key:"reset",value:function(){this.nextLetterDelay=0,this.setupCallbacks(null,null,null);var e=game.cache.json.get("gameplay");this.rounds=e.rounds.slice(),this.totalRoundsNum=this.rounds.length,this.letters=e.letters.slice(),this.allLettersNames=[];var t,n=_createForOfIteratorHelper(this.letters);try{for(n.s();!(t=n.n()).done;){var a=t.value;this.allLettersNames.push(a.letterName)}}catch(e){n.e(e)}finally{n.f()}this.nextLetter(),this.currentRound=0,this.correctAnswersCount=0,this.wrongAnswersCount=0,this.correctAnswersCountThisRound=0,this.wrongAnswersCountThisRound=0}}]),e}();e.Gameplay=t}(e.core||(e.core={}))}(ctb||(ctb={})),function(e){!function(t){var n=function(t){_inherits(a,Phaser.Scene);var n=_createSuper(a);function a(){return _classCallCheck(this,a),n.apply(this,arguments)}return _createClass(a,[{key:"init",value:function(){var e=this;this.game.scale.transformX=function(t){for(var n=0,a=game.canvas.parentElement;a;){if(a.offsetLeft){n=a.offsetLeft;break}a=a.parentElement}return(t-n)*e.game.scale.displayScale.x},this.game.scale.transformY=function(t){for(var n=0,a=game.canvas.parentElement;a;){if(a.offsetTop){n=a.offsetTop;break}a=a.parentElement}return(t-n)*e.game.scale.displayScale.y}}},{key:"create",value:function(){game.scene.remove("Boot"),game.scene.add("Preloader",e.scene.Preloader,!0)}}]),a}();t.Boot=n}(e.scene||(e.scene={}))}(ctb||(ctb={})),function(e){!function(t){var n=e.core.Gameplay,a=function(t){_inherits(r,Phaser.Scene);var a=_createSuper(r);function r(){return _classCallCheck(this,r),a.apply(this,arguments)}return _createClass(r,[{key:"create",value:function(){this.gameplay=new n,this.gameplayScreen=new e.screen.GameplayScreen(this,this.gameplay),this.children.add(this.gameplayScreen),this.gameplayScreen.showInstructionPage()}},{key:"update",value:function(){this.gameplayScreen._update()}}]),r}();t.MainScene=a}(e.scene||(e.scene={}))}(ctb||(ctb={})),function(e){!function(t){var n=function(t){_inherits(a,Phaser.Scene);var n=_createSuper(a);function a(){return _classCallCheck(this,a),n.apply(this,arguments)}return _createClass(a,[{key:"preload",value:function(){this.load.json("gameplay","assets/json/gameplay.json")}},{key:"create",value:function(){var e=this,t=game.cache.json.get("gameplay");if(t.useImages){var n,a=_createForOfIteratorHelper(t.letters);try{for(a.s();!(n=a.n()).done;){var r=n.value;this.load.image(r.letterName,"assets/imgs/letters/"+r.letterName+".png")}}catch(e){a.e(e)}finally{a.f()}var s,o=_createForOfIteratorHelper(t.rounds);try{for(o.s();!(s=o.n()).done;){var i=s.value;this.load.image(i.correctWord,"assets/imgs/words/"+i.correctWord+".png")}}catch(e){o.e(e)}finally{o.f()}}var l,c=_createForOfIteratorHelper(t.letters);try{for(c.s();!(l=c.n()).done;){var u=l.value;this.load.audio(u.audioKey,"assets/sound/mp3/letters/"+u.audioKey+".mp3")}}catch(e){c.e(e)}finally{c.f()}var d,h=_createForOfIteratorHelper(t.rounds);try{for(h.s();!(d=h.n()).done;){var p=d.value;this.load.audio(p.correctWord,"assets/sound/mp3/words/"+p.correctWord+".mp3")}}catch(e){h.e(e)}finally{h.f()}var f=this.add.text(game.scale.width/2,game.scale.height/2,"",{fontFamily:"Quran Era font",fontSize:25,color:"#000000",align:"center"});f.setOrigin(.5,.5),this.load.pack("preloader","assets/pack.json"),this.load.on("progress",(function(e){f.text=Math.ceil(100*e)+"%"}),this),this.load.on("complete",(function(){e.nextScene()})),this.load.start()}},{key:"nextScene",value:function(){game.scene.remove("Preloader"),game.scene.add("ScreenMain",e.scene.MainScene,!0)}}],[{key:"playAnim",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r=game.scene.getScene("ScreenMain");if(!r.anims.exists(e)){var s=a.ANIMS_DATA[e];r.anims.create({key:e,frames:r.anims.generateFrameNames(s.atlas,{start:s.start,end:s.end,zeroPad:s.padNum,prefix:s.prefix,suffix:""}),frameRate:s.frameRate,repeat:s.repeat})}return t.anims.currentAnim&&t.anims.currentAnim.off("complete"),t.anims.stop(),t.play(e),t.anims.currentAnim.once("complete",(function(){n&&n()})),t}}]),a}();n.ANIMS_DATA={idle:{start:0,end:51,padNum:4,prefix:"idle",repeat:0,frameRate:24,atlas:"atlas-shake"},yelling_wrong:{start:0,end:46,padNum:4,prefix:"yelling_wrong",repeat:0,frameRate:24,atlas:"atlas-shake"}},t.Preloader=n}(e.scene||(e.scene={}))}(ctb||(ctb={})),function(e){!function(e){var t=function(e){_inherits(n,Phaser.GameObjects.Container);var t=_createSuper(n);function n(e,a,r){var s;return _classCallCheck(this,n),(s=t.call(this,e))._areYouSurePage=new Phaser.GameObjects.Image(s.scene,-105,-48,"Exit warning"),s._areYouSurePage.setOrigin(0,0),s._areYouSurePage.setInteractive(),s._btnSureYes=new Phaser.GameObjects.Image(s.scene,game.scale.width/2-95,435,"btnYES1"),s._btnSureYes.setInteractive({cursor:"pointer"}),s._btnSureYes.once("pointerup",a),setupButtonTextureBased(s._btnSureYes,"btnYES1","btnYES2"),s._btnSureNo=new Phaser.GameObjects.Image(s.scene,game.scale.width/2+95,435,"btnNO1"),s._btnSureNo.setInteractive({cursor:"pointer"}),s._btnSureNo.once("pointerup",r),setupButtonTextureBased(s._btnSureNo,"btnNO1","btnNO2"),s.add(s._areYouSurePage),s.add(s._btnSureYes),s.add(s._btnSureNo),s}return n}();e.AreYouSureWindow=t}(e.screen||(e.screen={}))}(ctb||(ctb={})),function(e){!function(e){var t=function(e){_inherits(n,Phaser.GameObjects.Container);var t=_createSuper(n);function n(e,a,r,s){var o;_classCallCheck(this,n),(o=t.call(this,e)).music=null,o.setPosition(-104.5,-48),o._bgComplete=new Phaser.GameObjects.Image(o.scene,0,0,"Completion page LATEST UPDATED"),o._bgComplete.setOrigin(0,0),o._bgComplete.setInteractive(),o._cup=new Phaser.GameObjects.Image(o.scene,400,410,"Trophy"),o._btnBack=new Phaser.GameObjects.Image(o.scene,570,570,"btnBACK1"),o._btnReplay=new Phaser.GameObjects.Image(o.scene,720,570,"btnReplay1"),o._btnNext=new Phaser.GameObjects.Image(o.scene,870,570,"btnNEXT1");var i=new Phaser.GameObjects.Image(o.scene,620,440,"Collected Points");o.totalScoreTxt=o.scene.add.text(845,352,"",{fontFamily:"Kids Rock Demo",fontSize:35,color:"#F49F1C",align:"center",stroke:"#70451A",strokeThickness:6}),o.totalScoreTxt.setOrigin(.5,.5);var l=o.totalScoreTxt.context.createLinearGradient(0,0,0,o.totalScoreTxt.height);return l.addColorStop(0,"#FFFF00"),l.addColorStop(1,"#C17316"),o.totalScoreTxt.setFill(l),o.starScoreTxt=o.scene.add.text(648,433,"",{fontFamily:"Kids Rock Demo",fontSize:24,color:"#FFFFFF",align:"center"}),o.starScoreTxt.setOrigin(.5,.5),o.add([o._bgComplete,i,o._cup,o._btnBack,o._btnReplay,o._btnNext,o.totalScoreTxt,o.starScoreTxt]),o._btnBack.setInteractive({cursor:"pointer"}),o._btnBack.on("pointerup",(function(){a(o._btnBack)})),setupButtonTextureBased(o._btnBack,"btnBACK1","btnBACK2"),o._btnReplay.setInteractive({cursor:"pointer"}),o._btnReplay.once("pointerup",(function(){r(o._btnReplay),o.music&&o.music.stop()})),setupButtonTextureBased(o._btnReplay,"btnReplay1","btnReplay2"),o._btnNext.setInteractive({cursor:"pointer"}),o._btnNext.on("pointerup",(function(){s(o._btnNext)})),setupButtonTextureBased(o._btnNext,"btnNEXT1","btnNEXT2"),o}return _createClass(n,[{key:"show",value:function(e,t){this._cup.scale=1.25,this.scene.tweens.add({targets:this._cup,scale:1,duration:500,ease:Phaser.Math.Easing.Back.Out}),this.totalScoreTxt.text=String(e),this.starScoreTxt.text=String(t),this.music=this.scene.sound.add("Activity completion fantastic"),this.music.play()}}]),n}();e.CompleteWindow=t}(e.screen||(e.screen={}))}(ctb||(ctb={})),function(e){!function(t){var n=e.scene.Preloader,a=function(e){_inherits(r,Phaser.GameObjects.Container);var a=_createSuper(r);function r(e,s){var o;return _classCallCheck(this,r),(o=a.call(this,e)).bgMusic=null,o.correctAudio=null,o.correctAudioWord=null,o.idleDelayedCall=null,o.playIdle=function(){o.character.setOrigin(.5,.5),n.playAnim("idle",o.character,(function(){o.idleDelayedCall=delayedCall(5e3,(function(){o.playIdle()}))}))},o.soundWrongDrop=null,o.wfsnd=null,o.showCompleteWindow=function(e,n){var a=new t.CompleteWindow(o.scene,(function(e){playBtnClickAnim(e)}),(function(e){playBtnClickAnim(e),o.destroyGameplay(),o.remove(a),o.showInstructionPage()}),(function(e){playBtnClickAnim(e)}));o.setInputEnabled(!1),delayedCall(2e3,(function(){setPageBackground("bg-blue"),o.add(a),a.show(e,n),o.bgMusic.stop()}))},o.showLoseWindow=function(e,n){var a=new t.TryAgainWindow(o.scene,(function(e){playBtnClickAnim(e)}),(function(e){playBtnClickAnim(e),o.destroyGameplay(),o.remove(a),o.showInstructionPage()}));o.setInputEnabled(!1),delayedCall(1500,(function(){setPageBackground("bg-blue"),o.add(a),a.show(e,n),o.bgMusic.stop()}))},o.gameplay=s,window.gs=_assertThisInitialized(o),o._gameStage=new Phaser.GameObjects.Image(o.scene,game.scale.width/2,game.scale.height/2,"BG"),o._gameStage.setOrigin(.5,.5),o._gameStage.setScale(1.02),o._gameStage.setInteractive(),o.add(o._gameStage),o._btnClose=new Phaser.GameObjects.Image(o.scene,920,50,"x Button"),o._btnClose.setInteractive({cursor:"pointer"}),o._btnClose.defScale=o._btnClose.scale,setupButtonTextureBased(o._btnClose,"x Button","x Button HOVER EFFECT"),o.add(o._btnClose),o._btnClose.on("pointerup",(function(){playBtnClickAnim(o._btnClose),o.onCloseClick()})),o._btnSound=new Phaser.GameObjects.Image(o.scene,55,50,"Sound"),o._btnSound.setInteractive({cursor:"pointer"}),o._btnSound.defScale=o._btnSound.scale,setupButtonTextureBased(o._btnSound,"Sound","Sound HOVER EFFECT"),o.add(o._btnSound),o._btnSound.on("pointerup",(function(){playBtnClickAnim(o._btnSound),o.onSoundClick()})),o}return _createClass(r,[{key:"playCorrectAudio",value:function(){this.correctAudio&&this.correctAudio.stop(),this.correctAudio=this.scene.sound.add("Make the word map"),this.correctAudio.play(),this.areYouSureWindow&&this.areYouSureWindow.parentContainer==this&&this.correctAudio.pause(),this.correctAudioWord&&this.correctAudioWord.stop()}},{key:"onSoundClick",value:function(){this.playCorrectAudio()}},{key:"showGameplay",value:function(){var e=this;setPageBackground("bg-australia"),this.bgMusic=this.scene.sound.add("Winter bg sound"),this.bgMusic.play(),this.bgMusic.loop=!0,this.gameplayContainer=new Phaser.GameObjects.Container(this.scene),this.add(this.gameplayContainer),this.gameplay.reset(),this.prepareRound(),this.gameplay.setupCallbacks(this.showCompleteWindow,this.showLoseWindow,(function(){e.onNewRound(!0)})),this.createTallies()}},{key:"prepareRound",value:function(){var e=this;delayedCall(500,(function(){return e.playCorrectAudio()})),this.gameplayContainer.removeAll(),this.character=this.scene.add.sprite(0,0,null),this.character.setPosition(750,310),this.playIdle(),this.longIce=new Phaser.GameObjects.Image(this.scene,110,147,"Long Ice"),this.longIce.setOrigin(0,0),this.longIce.alpha=0,this.gameplayContainer.add(this.longIce);var t=Phaser.Utils.Array.Shuffle(this.gameplay.blockLetters.slice());if(this.gameplay.useImages){var n=new Phaser.GameObjects.Image(this.scene,750,180,this.gameplay.correctWord);this.gameplayContainer.add(n)}else{var a=this.scene.add.text(750,180,"",{fontFamily:"Quran Era font",fontSize:90,color:"#000000",align:"center"});a.setOrigin(.5,.5),a.style.fixedHeight=140,a.setText(this.gameplay.correctWord),this.gameplayContainer.add(a)}this.selectableLetters=[],this.targetBlocks=[];for(var r=0;r<this.gameplay.correctWord.length;r++){var s={x:174+133*r,y:215,alreadyFilled:!1};this.targetBlocks.push(s),s["-letter-text"]=this.gameplay.correctWord.charAt(this.gameplay.correctWord.length-1-r),s["-block-"]=null}for(var o=0;o<t.length;o++){var i=new Phaser.GameObjects.Container(this.scene,100+150*o,525);i.add(i["-image-"]=new Phaser.GameObjects.Image(this.scene,0,0,"IceBlock")),i["-image-"].setOrigin(.5,.5),this.selectableLetters.push(i);var l=void 0;this.gameplay.useImages?(l=new Phaser.GameObjects.Image(this.scene,0,0,t[o]),i.add(l)):((l=this.scene.add.text(0,0,"",{fontFamily:"Quran Era font",fontSize:55,color:"#000000",align:"center"})).setOrigin(.5,.5),l.style.fixedHeight=75,l.setText(t[o]),i.add(l)),i.startPosition={x:i.x,y:i.y},i["-letter-"]=l,i["-letter-text"]=t[o],this.gameplayContainer.add(i),i["-draggable-"]=!0}var c,u=_createForOfIteratorHelper(this.selectableLetters);try{var d=function(){var t=c.value;t.setSize(t["-image-"].width,t["-image-"].height),t.setInteractive({cursor:"pointer"}),e.scene.input.setDraggable(t),t.on("pointerdown",(function(){t["-pointerdown-"]=!0,t["-draggable-"]&&e.scene.sound.add("drag from its spot").play()})),t.on("pointerup",(function(){t["-pointerdown-"]=!1,t["-draggable-"]&&e.moveBridgeBackToStartPosition(t,null,!0)})),t.on("pointerout",(function(){t["-draggable-"]&&t["-pointerdown-"]&&e.moveBridgeBackToStartPosition(t,null,!0)}))};for(u.s();!(c=u.n()).done;)d()}catch(e){u.e(e)}finally{u.f()}this.createInput(),this.setInputEnabled(!1),this.gameplay.isNewRound()&&this.gameplay.isRoundsComplete()||this.setInputEnabled(!0),this.gameplayContainer.add(this.character)}},{key:"_update",value:function(){if(this.selectableLetters){var e,t=_createForOfIteratorHelper(this.selectableLetters);try{for(t.s();!(e=t.n()).done;){var n=e.value;n.x<0+n["-image-"].width/2?n.x=0+n["-image-"].width/2:n.x>game.scale.width-n["-image-"].width/2&&(n.x=game.scale.width-n["-image-"].width/2),n.y<0+n["-image-"].height/2?n.y=n["-image-"].height/2:n.y>game.scale.height-n["-image-"].height/2&&(n.y=game.scale.height-n["-image-"].height/2)}}catch(e){t.e(e)}finally{t.f()}}}},{key:"placeAppleOverBuckets",value:function(e){e.parentContainer&&(this.gameplayContainer.remove(e),this.gameplayContainer.addAt(e,this.gameplayContainer.length))}},{key:"onNewRound",value:function(e){this.scene.sound.add("next_round").play(),this.setInputEnabled(!1),e&&this.prepareRound()}},{key:"createInput",value:function(){var e=this;this.scene.input.on("drag",(function(t,n,a,r){if(n["-draggable-"]){var s;n.x=a,n.y=r,e.gameplayContainer.bringToTop(n);var o,i=_createForOfIteratorHelper(e.targetBlocks);try{for(i.s();!(o=i.n()).done;)(s=o.value).alreadyFilled||Math.abs(n.x-s.x)<25&&Math.abs(n.y-s.y)<60&&n.y>s.y-7&&(n["-draggable-"]=!1,s.alreadyFilled=!0,e.scene.tweens.add({targets:n,x:s.x,y:s.y,duration:300,ease:Phaser.Math.Easing.Back.Out}),s["-block-"]=n,e.checkTargetBlockLetters())}catch(e){i.e(e)}finally{i.f()}}})),this._btnClose.setInteractive({cursor:"pointer",pixelPerfect:!0})}},{key:"checkTargetBlockLetters",value:function(){var e,t=this,a=0,r=_createForOfIteratorHelper(this.targetBlocks);try{for(r.s();!(e=r.n()).done;){var s=e.value;if(!s["-block-"])return void this.scene.sound.add("Placing block above").play();s["-letter-text"]==s["-block-"]["-letter-text"]&&a++}}catch(e){r.e(e)}finally{r.f()}if(this.setInputEnabled(!1),a==this.targetBlocks.length){this.scene.sound.add("Placing block above").play(),this.scene.tweens.add({targets:this.longIce,alpha:1,duration:250,ease:Phaser.Math.Easing.Linear});var o,i=_createForOfIteratorHelper(this.targetBlocks);try{for(i.s();!(o=i.n()).done;){var l=o.value;this.scene.tweens.add({targets:l["-block-"]["-image-"],alpha:0,duration:250,ease:Phaser.Math.Easing.Linear}),l!=this.targetBlocks[1]&&(this.scene.tweens.add({targets:l["-block-"],x:this.targetBlocks[1].x,duration:250,alpha:0,ease:Phaser.Math.Easing.Sine.Out,delay:250}),delayedCall(500,(function(){t.targetBlocks[1]["-block-"]["-letter-"].setText(t.gameplay.correctWord)})))}}catch(e){i.e(e)}finally{i.f()}this.scene.sound.add("Letters joining sound").play(),delayedCall(250,(function(){return t.scene.sound.add("Correct click").play()})),delayedCall(1e3,(function(){return t.scene.sound.add("success for corect word").play()})),this.onCorrectAnswer()}else this.scene.sound.add("placed- wrong- snake - blocks go back").play(),delayedCall(2400,(function(){var e,n=_createForOfIteratorHelper(t.targetBlocks);try{for(n.s();!(e=n.n()).done;){var a=e.value;t.moveBridgeBackToStartPosition(a["-block-"],null,!1)}}catch(e){n.e(e)}finally{n.f()}})),delayedCall(1500,(function(){t.character.setOrigin(.49,.515),n.playAnim("yelling_wrong",t.character,(function(){t.playIdle()}))})),delayedCall(2500,(function(){t.onWrongAnswer();var e,n=_createForOfIteratorHelper(t.targetBlocks);try{for(n.s();!(e=n.n()).done;){var a=e.value;a.alreadyFilled=!1,a["-block-"]["-draggable-"]=!0,a["-block-"]=null}}catch(e){n.e(e)}finally{n.f()}})),delayedCall(2750,(function(){t.setInputEnabled(!0)}))}},{key:"moveBridgeBackToStartPosition",value:function(e,t,n){var a=this;this.scene.tweens.add({targets:e,x:e.startPosition.x,y:e.startPosition.y,duration:350,ease:Phaser.Math.Easing.Sine.Out,onComplete:function(){t&&t()}}),Phaser.Math.Distance.Between(e.startPosition.x,e.startPosition.y,e.x,e.y)>20&&delayedCall(100,(function(){n&&a.scene.sound.add("block goes back when released").play()})),this.placeAppleOverBuckets(e)}},{key:"onCorrectAnswer",value:function(){var e=this.gameplay.getCurrentTotalAnswersCount();return this.tallyEmptyArray[e].visible=!1,this.tally[e].visible=!0,this.gameplay.onCorrectAnswer()}},{key:"onWrongAnswer",value:function(){var e=this,t=this.gameplay.getCurrentTotalAnswersCount();this.tallyEmptyArray[t].visible=!0,this.tallyEmptyArray[t].visible=!0,this.tally[t].visible=!1;var n=this.gameplay.onWrongAnswer();return null!=this.idleDelayedCall&&(destroyDelayedCall(this.idleDelayedCall),this.idleDelayedCall=null),n||delayedCall(650,(function(){return e.playCorrectAudio()})),n}},{key:"onCloseClick",value:function(){this.showAreYouSurePage(),this.scene.sound.add("warning page pop up sfx").play()}},{key:"createTallies",value:function(){if(this.tally){var e,t=_createForOfIteratorHelper(this.tallyEmptyArray);try{for(t.s();!(e=t.n()).done;){var n=e.value;n.visible=!1,this.bringToTop(n)}}catch(e){t.e(e)}finally{t.f()}var a,r=_createForOfIteratorHelper(this.tally);try{for(r.s();!(a=r.n()).done;){var s=a.value;s.visible=!1,this.bringToTop(s)}}catch(e){r.e(e)}finally{r.f()}}else{for(var o=[],i=0;i<12;i++)o.push({x:26,y:148+34*i});this.tallyEmptyArray=[],this.tally=[];for(var l=0,c=o;l<c.length;l++){var u=c[l],d=new Phaser.GameObjects.Image(this.scene,u.x,u.y,"tally Empty");this.tallyEmptyArray.push(d),d.visible=!1;var h=new Phaser.GameObjects.Image(this.scene,u.x,u.y,"tally");this.tally.push(h)}var p,f=_createForOfIteratorHelper(this.tallyEmptyArray);try{for(f.s();!(p=f.n()).done;){var y=p.value;this.add(y)}}catch(e){f.e(e)}finally{f.f()}var g,m=_createForOfIteratorHelper(this.tally);try{for(m.s();!(g=m.n()).done;){var v=g.value;this.add(v),v.visible=!1}}catch(e){m.e(e)}finally{m.f()}}}},{key:"hideAllUnusedTallies",value:function(){for(var e=this.gameplay.getCurrentTotalAnswersCount()+1;e<this.tallyEmptyArray.length;e++)this.tallyEmptyArray[e].visible=!1,this.tally[e].visible=!1}},{key:"showInstructionPage",value:function(){var e=this;setPageBackground("bg-blue");var n=function(){e.wfsnd&&e.wfsnd.stop(),e.wfsnd=e.scene.sound.add("Drag the ice blocks to make the word"),e.wfsnd.play()};this.instructionPage=new t.InstructionPage(this.scene,(function(t){playBtnClickAnim(t),e.remove(e.instructionPage),e.showGameplay(),e.wfsnd&&e.wfsnd.stop()}),(function(e){playBtnClickAnim(e),n()})),this.add(this.instructionPage),n()}},{key:"showAreYouSurePage",value:function(){var e=this;pauseAllDelayedCalls(),setPageBackground("bg-blue"),this.scene.tweens.pauseAll(),this.pauseSounds(),this.areYouSureWindow=new t.AreYouSureWindow(this.scene,(function(){e.scene.tweens.resumeAll(),e.remove(e.areYouSureWindow),e.destroyGameplay(),e.showInstructionPage()}),(function(){e.scene.tweens.resumeAll(),e.remove(e.areYouSureWindow),e.unpauseSounds(),resumeAllDelayedCalls(),setPageBackground("bg-australia")})),this.add(this.areYouSureWindow)}},{key:"setInputEnabled",value:function(e){if(e){var t,n=_createForOfIteratorHelper(this.selectableLetters);try{for(n.s();!(t=n.n()).done;){t.value.setInteractive({cursor:"pointer"})}}catch(e){n.e(e)}finally{n.f()}}else{var a,r=_createForOfIteratorHelper(this.selectableLetters);try{for(r.s();!(a=r.n()).done;){a.value.disableInteractive()}}catch(e){r.e(e)}finally{r.f()}}}},{key:"pauseSounds",value:function(){this.scene.sound.pauseAll()}},{key:"unpauseSounds",value:function(){this.scene.sound.resumeAll()}},{key:"destroyGameplay",value:function(){this.setInputEnabled(!1),this.remove(this.gameplayContainer),this.scene.sound.stopAll(),destroyAllDelayedCalls()}}]),r}();t.GameplayScreen=a}(e.screen||(e.screen={}))}(ctb||(ctb={})),function(e){!function(e){var t=function(e){_inherits(n,Phaser.GameObjects.Container);var t=_createSuper(n);function n(e,a,r){var s;return _classCallCheck(this,n),(s=t.call(this,e))._instructionPage=new Phaser.GameObjects.Image(s.scene,-105,-48,"Instructions page  ALL ACTIVITY  TITLEs"),s._instructionPage.setOrigin(0,0),s._instructionPage.setInteractive(),s._instructionPageTitle=new Phaser.GameObjects.Image(s.scene,495,105,"Ice Blocks"),s._instructionPageTitle.setScale(.75),s._btnPlay=new Phaser.GameObjects.Image(s.scene,game.scale.width/2,430,"btnPLAY1"),s._btnPlay.setInteractive({cursor:"pointer"}),s._btnPlay.once("pointerup",a),setupButtonTextureBased(s._btnPlay,"btnPLAY1","btnPLAY2"),s.instrTxt=s.scene.add.text(game.scale.width/2,game.scale.height/2,"Drag the ice blocks to make the word.",{fontFamily:"Kids Rock Demo",fontSize:30,color:"#43425D",align:"center"}),s.instrTxt.setOrigin(.5,.5),s.instrTxt.setWordWrapWidth(600),s.instrTxt.setLineSpacing(5),s._btnSoundInstruction=new Phaser.GameObjects.Image(s.scene,695,106,"Sound"),s._btnSoundInstruction.setInteractive({cursor:"pointer"}),s._btnSoundInstruction.on("pointerup",r),s._btnSoundInstruction.defScale=s._btnSoundInstruction.scale,setupButtonTextureBased(s._btnSoundInstruction,"Sound","Sound HOVER EFFECT"),s.add(s._instructionPage),s.add(s._instructionPageTitle),s.add(s.instrTxt),s.add(s._btnPlay),s.add(s._btnSoundInstruction),s}return n}();e.InstructionPage=t}(e.screen||(e.screen={}))}(ctb||(ctb={})),function(e){!function(e){var t=function(e){_inherits(n,Phaser.GameObjects.Container);var t=_createSuper(n);function n(e,a,r){var s;_classCallCheck(this,n),(s=t.call(this,e)).music=null,s.setPosition(-106,-48),s._bg=new Phaser.GameObjects.Image(s.scene,0,0,"Try again page"),s._bg.setOrigin(0,0),s._bg.setInteractive(),s._star=new Phaser.GameObjects.Image(s.scene,400,415,"Break Star"),s._btnBack=new Phaser.GameObjects.Image(s.scene,600,580,"btnBACK1"),s._btnReplay=new Phaser.GameObjects.Image(s.scene,765,580,"btnReplay1"),s.totalScoreTxt=s.scene.add.text(830,355,"",{fontFamily:"Kids Rock Demo",fontSize:35,color:"#F49F1C",align:"center",stroke:"#70451A",strokeThickness:6}),s.totalScoreTxt.setOrigin(.5,.5);var o=s.totalScoreTxt.context.createLinearGradient(0,0,0,s.totalScoreTxt.height);return o.addColorStop(0,"#FFFF00"),o.addColorStop(1,"#C17316"),s.totalScoreTxt.setFill(o),s.starScoreTxt=s.scene.add.text(635,431,"",{fontFamily:"Kids Rock Demo",fontSize:24,color:"#FFFFFF",align:"center"}),s.starScoreTxt.setOrigin(.5,.5),s.add([s._bg,s._star,s._btnBack,s._btnReplay,s.totalScoreTxt,s.starScoreTxt]),s._btnBack.setInteractive({cursor:"pointer"}),s._btnBack.on("pointerup",(function(){a(s._btnBack)})),setupButtonTextureBased(s._btnBack,"btnBACK1","btnBACK2"),s._btnReplay.setInteractive({cursor:"pointer"}),s._btnReplay.once("pointerup",(function(){r(s._btnReplay),s.music&&s.music.stop()})),setupButtonTextureBased(s._btnReplay,"btnReplay1","btnReplay2"),s}return _createClass(n,[{key:"show",value:function(e,t){this._star.scale=1.25,this.scene.tweens.add({targets:this._star,scale:1,duration:500,ease:Phaser.Math.Easing.Back.Out}),this.totalScoreTxt.text=String(e),this.starScoreTxt.text=String(t),this.music=this.scene.sound.add("Fail - close one"),this.music.play()}}]),n}();e.TryAgainWindow=t}(e.screen||(e.screen={}))}(ctb||(ctb={}));
//# sourceMappingURL=main.js.map
