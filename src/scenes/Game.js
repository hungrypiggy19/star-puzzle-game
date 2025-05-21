export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' }); 
  }

  preload() {
    this.load.image('Game_bg', 'assets/Game_bg.jpg');
    this.load.image('scene2sun', 'assets/scene2sun.png');
    this.load.image('scene2talk', 'assets/scene2talk.png');
    this.load.audio('bgm', 'assets/bgm/backgroundmusic.mp3');
    
  }

  create() {
     

     this.backgroundMusic = this.sound.add('bgm', {
    loop: true,
    volume: 0.5      // 音量 0.0–1.0，可按需调节
  });
  this.backgroundMusic.play();






    const bg = this.add.image(960, 540, 'Game_bg');
    bg.setOrigin(0.5, 0.5);

    const scaleX = this.cameras.main.width / bg.width;
    const scaleY = this.cameras.main.height / bg.height;
    const scale = Math.min(scaleX, scaleY);
    bg.setScale(scale);

    const centerX = this.cameras.main.width  / 2;  
    const centerY = this.cameras.main.height / 2; 
    const sunX = centerX - 300;
    const sunY = centerY - 300;

    const sun = this.add.image(sunX, sunY, 'scene2sun')
      .setOrigin(0.5)
      .setScale(0.9)

    const talk = this.add.image(-100, this.cameras.main.height + 100, 'scene2talk')
    .setOrigin(0.5)
    .setDepth(10)
    .setScale(0.9)



    const targetX = this.cameras.main.width  / 2;  
    const targetY = this.cameras.main.height * 0.8; 
    this.tweens.add({
      targets: talk,
      x: targetX - 300,
      y: targetY - 190 ,
      duration: 1200,
      delay: 600,
      ease: 'Power1'
    });
    this.tweens.add({
      targets: sun,
      alpha:{ from: 0.6, to: 1},
      duration: 2000,
      ease: 'Shine.easeInOut',
      yoyo:true,
      repeat:-1
    });
    this.tweens.add({
      targets: sun,
      angle: 360,
      duration: 8000,
      ease: 'Linear',
      repeat: -1
    });
    this.input.once('pointerdown',() => {
      this.scene.start('NextScene');
    });
  }
}