export class Start extends Phaser.Scene {

    constructor() {
        super({key: 'StartScene' });
    }

    preload() {
        this.load.image('start_bg', 'assets/start_bg.jpg');
        this.load.image('start_button', 'assets/start_button.png');

        this.load.image('yun', 'assets/yun.png');
        this.load.image('yunn', 'assets/yunn.png');
        this.load.image('start_text','assets/start_text.png');
    }

create() {
  // 1) 背景 & 缩放（你已有，无需改动）
  const bg = this.add.image(960, 540, 'start_bg').setOrigin(0.5);
  const scale = Math.min(
    this.cameras.main.width  / bg.width,
    this.cameras.main.height / bg.height
  );
  bg.setScale(scale);

  // 2) 计算中心与偏移
  const W       = this.cameras.main.width;
  const H       = this.cameras.main.height;
  const centerX = W / 2;
  const centerY = H / 2;


  // 3) Start 按钮 —— 先声明，再 bringToTop
  const startButton = this.add.image(centerX, centerY+200, 'start_button')
    .setInteractive()
    .on('pointerdown', () => this.scene.start('GameScene'));
  this.children.bringToTop(startButton);


  // —— yun ——  
  const yunStartX  = -200;    // 初始 X
  const yunStartY  = 400;    // 初始 Y
  const yunTargetX = 500;    // Tween 结束后 X
  const yunTargetY = 400;    // Tween 结束后 Y
  const yun = this.add.image(yunStartX, yunStartY, 'yun')
    .setOrigin(0.5)
    .setDepth(10)
    .setAlpha(0.5);

  // —— yunn ——  
  const yunnStartX  = W +500; // 初始 X
  const yunnStartY  = 700;     // 初始 Y
  const yunnTargetX = W -300; // Tween 结束后 X
  const yunnTargetY = 700;     // Tween 结束后 Y
  const yunn = this.add.image(yunnStartX, yunnStartY, 'yunn')
    .setOrigin(0.5)
    .setDepth(10);

  // 1）创建图片，先把它置于画布中央（或任意你想放的位置）
const startText = this.add.image(centerX-480, centerY, 'start_text')
  .setOrigin(0.5)
  .setDepth(15)

// 2）拿到它的原始宽高
const imgW = startText.width;
const imgH = startText.height;

// 3）从顶部开始裁剪，高度从 0 → imgH，宽度始终为全图宽
startText.setCrop(0, 0, imgW, 0);

// 4）用一个 Tween Counter，让裁剪矩形高度逐帧增加
this.tweens.addCounter({
  from: 0,
  to: imgH,
  duration: 1200,    // 你想要的渐变时长（ms）
  ease: 'Linear',
  onUpdate: tween => {
    const h = tween.getValue();
    // y 方向从 0 开始，裁剪高度为 h
    startText.setCrop(0, 0, imgW, h);
  }
});

  // 5) 用你自己定好的“目标坐标”来做移动动画
  this.tweens.add({
    targets: yun,
    x: yunTargetX,
    y: yunTargetY,
    duration: 1200,
    ease: 'Back',
    delay: 500
  });
  this.tweens.add({
    targets: yunn,
    x: yunnTargetX,
    y: yunnTargetY,
    duration: 1200,
    ease: 'Back',
    delay: 500
  });

}
}
