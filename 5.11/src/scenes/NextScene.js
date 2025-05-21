
export default class NextScene extends Phaser.Scene {
  constructor() {
    super({ key: 'NextScene' });
  }
   // 先接 data
  init(data) {
    // 如果 data.skipTalk3 为 true，就不再下一步显示 talk3
    this.skipTalk3 = data.skipTalk3 === true;}

  preload() {
    this.load.image('Game3bg', 'assets/Game3bg.jpg');
    this.load.image('talk3', 'assets/talk3.png');
    this.load.image('light', 'assets/light.png');
    this.load.image('dragon', 'assets/dragon.png');
    this.load.image('bird', 'assets/bird.png');
    this.load.image('tiger', 'assets/tiger.png');
    this.load.image('xuanwu','assets/xuanwu.png');
    this.load.image('returnButton','assets/return_button.png');
  }

  create() {
    const bg = this.add.image(
      this.cameras.main.width  / 2,
      this.cameras.main.height / 2,
      'Game3bg' 
    )
    .setOrigin(0.5)
    .setDisplaySize(
      this.cameras.main.width,
      this.cameras.main.height
    );
  if (!this.skipTalk3) {
   const talk3 = this.add.image(
      -100,                                         
      this.cameras.main.height + 100,              
      'talk3'
    )
    .setOrigin(0.5)
    .setDepth(10)
    .setScale(0.9);

    const targetX = this.cameras.main.width  / 2;     
    const targetY = this.cameras.main.height * 0.8;   
   
    this.tweens.add({
      targets: talk3,
      x: targetX-400,
      y: targetY-160,
      ease: 'Power1',
      duration: 1200,
      delay: 600
    });

    // 点击任意位置后，把 talk3 滑出画布左侧
this.input.once('pointerdown', () => {
  this.tweens.add({
    targets: talk3,
    x: -talk3.width,    // 往左完全移出
    duration: 800,
    ease: 'Power1'
  });
});
  }
    const centerX = this.cameras.main.width  / 2;
    const centerY = this.cameras.main.height / 2;

    const returnBtn = this.add.image(20, 20, 'returnButton')
  .setOrigin(0, 0)
  .setScale(0.7)
  .setInteractive({ useHandCursor: true })
  .setDepth(10);

returnBtn.on('pointerdown', () => {
  this.scene.start('StartScene');  // ← 用你在 main.js 里给 Game.js 定义的 scene key
});



    const light = this.add.image(centerX, centerY, 'light')
    .setOrigin(0.5);

    this.tweens.add({
      targets: light,
      angle: 360,
      duration: 20000,
      ease: 'Linear',
      repeat: -1
    });

    const dragon = this.add.image(centerX + 400, centerY  , 'dragon')
    .setOrigin(0.5)
    .setScale(0.7)
    .setDepth(20)
    .setInteractive();

    this.tweens.add({
      targets: dragon,
      angle: 360,
      duration: 12000,
      ease: 'Linear',
      repeat: -1
    });
    let flashTween;

    dragon.on('pointerover',() => {
      if (flashTween){
        flashTween.stop();
      }
      flashTween = this.tweens.add({
        targets: dragon,
        alpha:{ from: 0.7, to:1 },
        ease: 'Sine.easeInout',
        duration: 500,
        yoyo: true,
        repeat: -1
      });
      dragon.setTint(0x66ffff);
    });
  
    dragon.on('pointerout', () => {
      if(flashTween){
        flashTween.stop();
        flashTween = null;
      }
      dragon.setAlpha(1);
      dragon.clearTint();
      dragon.setBlendMode(Phaser.BlendModes.NORMAL);
    });

    dragon.on('pointerdown', () => {
       this.scene.start('Scene4');
    });
    
    const bird = this.add.image(centerX , centerY + 300 , 'bird')
    .setOrigin(0.5)
    .setScale(0.7)
    .setDepth(20)
    .setInteractive({ useHandCursor: true });

    bird.on('pointerdown', () => {
  this.scene.start('Nanfang');
   });

  // 1) 持续旋转
  this.tweens.add({
    targets: bird,
    angle: 360,
    duration: 12000,
    ease: 'Linear',
    repeat: -1
  });

  // 2) 基础呼吸闪烁
  this.tweens.add({
    targets: bird,
    alpha: { from: 0.5, to: 1 },
    ease: 'Sine.easeInOut',
    duration: 3000,
    yoyo: true,
    repeat: -1
  });

  // 3) 鼠标悬停时的“高亮+呼吸”闪烁
  let birdFlashTween;
  bird.on('pointerover', () => {
    // 如果残留旧的闪烁 tween，先停掉
    if (birdFlashTween) birdFlashTween.stop();

    // 开启新的快速闪烁
    birdFlashTween = this.tweens.add({
      targets: bird,
      alpha: { from: 0.5, to: 1 },
      ease: 'Sine.easeInOut',
      duration: 500,
      yoyo: true,
      repeat: -1
    });

    // 加个高亮 tint
    bird.setTint(0xffff99);
  });

  bird.on('pointerout', () => {
    // 停掉悬停的闪烁 tween
    if (birdFlashTween) {
      birdFlashTween.stop();
      birdFlashTween = null;
    }

    // 恢复不透明度和清除 tint
    bird.setAlpha(1);
    bird.clearTint();
  });

  const tiger = this.add.image(centerX - 400, centerY  , 'tiger')  // Y 轴下移 200px，按需调整
  .setOrigin(0.5)
  .setScale(0.7)
  .setDepth(20)
  .setInteractive({ useHandCursor: true });

  tiger.on('pointerdown', () => {
  this.scene.start('Xifang');
   });

// 1) 持续匀速旋转
this.tweens.add({
  targets: tiger,
  angle: 360,
  duration: 12000,
  ease: 'Linear',
  repeat: -1
});

// 2) 基础呼吸式闪烁
this.tweens.add({
  targets: tiger,
  alpha: { from: 0.5, to: 1 },
  ease: 'Sine.easeInOut',
  duration: 3000,
  yoyo: true,
  repeat: -1
});

// 3) 鼠标悬停时的快速闪烁 + 高亮
let tigerFlashTween;
tiger.on('pointerover', () => {
  if (tigerFlashTween) tigerFlashTween.stop();

  tigerFlashTween = this.tweens.add({
    targets: tiger,
    alpha: { from: 0.5, to: 1 },
    ease: 'Sine.easeInOut',
    duration: 500,
    yoyo: true,
    repeat: -1
  });

  tiger.setTint(0xffff99);
});

tiger.on('pointerout', () => {
  if (tigerFlashTween) {
    tigerFlashTween.stop();
    tigerFlashTween = null;
  }
  tiger.setAlpha(1);
  tiger.clearTint();
 });


 


  // —— 把 xuanwu 放到你想要的位置，比如右下角偏移 —— //
  const xuanwu = this.add.image(centerX , centerY -300, 'xuanwu')
    .setOrigin(0.5)
    .setScale(0.7)                     // 跟 dragon/bird/tiger 一致的大小
    .setDepth(20)
    .setInteractive({ useHandCursor: true });

    xuanwu.on('pointerdown', () => {
      this.scene.start('Beifang');
    });

  // 1) 匀速旋转
  this.tweens.add({
    targets: xuanwu,
    angle: 360,
    duration: 12000,
    ease: 'Linear',
    repeat: -1
  });

  // 2) 基础呼吸式闪烁
  this.tweens.add({
    targets: xuanwu,
    alpha: { from: 0.5, to: 1 },
    ease: 'Sine.easeInOut',
    duration: 3000,
    yoyo: true,
    repeat: -1
  });

  // 3) 悬停时快速闪烁 + 高亮
  let xuanwuFlashTween;
  xuanwu.on('pointerover', () => {
    if (xuanwuFlashTween) xuanwuFlashTween.stop();
    xuanwuFlashTween = this.tweens.add({
      targets: xuanwu,
      alpha: { from: 0.5, to: 1 },
      ease: 'Sine.easeInOut',
      duration: 500,
      yoyo: true,
      repeat: -1
    });
    xuanwu.setTint(0xffff99);
  });

  xuanwu.on('pointerout', () => {
    if (xuanwuFlashTween) {
      xuanwuFlashTween.stop();
      xuanwuFlashTween = null;
    }
    xuanwu.setAlpha(1);
    xuanwu.clearTint();
  });

 

}
 
  }
