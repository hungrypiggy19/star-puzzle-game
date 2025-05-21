import { Start } from './scenes/Start.js';
import GameScene from './scenes/Game.js';
import NextScene from './scenes/NextScene.js';
import Scene4     from './scenes/Scene4.js';
import Nanfang    from './scenes/Nanfang.js';
import Beifang    from './scenes/Beifang.js';
import Xifang     from './scenes/Xifang.js';


const config = {
    type: Phaser.AUTO,
    width:1920,
    height:1080,

    scale: {
    mode: Phaser.Scale.FIT,            // 等比拉伸
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
   parent: 'phaser-game',
    scene: [ Start, GameScene, NextScene, Scene4, Nanfang, Beifang, Xifang, ],
};

new Phaser.Game(config);

            