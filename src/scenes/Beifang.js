// src/scenes/Beifang.js
export default class Beifang extends Phaser.Scene {
  constructor() {
    super({ key: 'Beifang' });
  }

  preload() {
    
    this.load.image('Scene4bg', 'assets/Scene4_bg.jpg'); 
    this.load.image('circle',   'assets/circle.png');
    this.load.image('xuanwu',   'assets/xuanwu.png');
    this.load.image('stars', 'assets/stars.png');
    this.load.image('talk4','assets/talk4.png');
    this.load.image('bishuiyu1',  'assets/bei/bishuiyu1.png');
    this.load.image('bishuiyu2',  'assets/bei/bishuiyu2.png');
    this.load.image('doumuxie1',    'assets/bei/doumuxie1.png');
    this.load.image('doumuxie2',    'assets/bei/doumuxie2.png');
    this.load.image('niujinniu1',  'assets/bei/niujinniu1.png');
    this.load.image('niujinniu2',  'assets/bei/niujinniu2.png');
    this.load.image('nvtufu1',    'assets/bei/nvtufu1.png');
    this.load.image('nvtufu2',    'assets/bei/nvtufu2.png');
    this.load.image('shihuozhu1',    'assets/bei/shihuozhu1.png');
    this.load.image('shihuozhu2',    'assets/bei/shihuozhu2.png');
    this.load.image('weiyueyan1',  'assets/bei/weiyueyan1.png');
    this.load.image('weiyueyan2',  'assets/bei/weiyueyan2.png');
    this.load.image('xvrishu1', 'assets/bei/xvrishu1.png');
    this.load.image('xvrishu2', 'assets/bei/xvrishu2.png');
  }

  create() {
    // 画布宽高 & 中心点
    const W = this.cameras.main.width;
    const H = this.cameras.main.height;
    const centerX = W / 2;
    const centerY = H / 2;




        // —— 1. 在这里定义所有关的坐标和边集合 —— //
     this.levels = [
    {coords: [ {x:368,y:138}, {x:423,y:160} ,{x:426,y:210},{x:388,y:215},{x:370,y:258},{x:387,y:314}],
      solutionEdges: [ [0,1],[1,2],[2,3],[3,4],[4,5] ]
    },
    {coords: [ {x:380,y:144},{x:384,y:209},{x:378,y:313},{x:334,y:179},{x:424,y:173},{x:432,y:280}],
      solutionEdges: [ [0,1],[1,2],[1,3],[1,4],[2,5] ]
    },
    {coords: [ {x:374,y:153},{x:429,y:181},{x:430,y:256},{x:377,y:259}],
      solutionEdges: [ [0,1],[1,2],[2,3] ]
    },
    {coords: [ {x:404,y:229},{x:403,y:365} ],
      solutionEdges: [ [0,1] ]
    },
    {coords: [ {x:368,y:173},{x:439,y:234},{x:393,y:282}],
      solutionEdges: [ [0,1],[1,2] ]
    },
    {coords: [ {x:397,y:140},{x:380,y:240},{x:384,y:296},{x:365,y:335},{x:367,y:370},{x:346,y:273},{x:310,y:261},{x:415,y:282},
     {x:459,y:279}],
      solutionEdges: [ [0,1],[1,2],[2,3],[3,4],[2,5],[5,6],[2,7],[7,8] ]
    },
    {coords: [ {x:385,y:164},{x:374,y:348} ],
      solutionEdges: [ [0,1] ]
    },
  
    // …继续添加其它关…
  ];

  // 定义通关后要显示的图片 key 对应表  //
  this.endPairs = [
    ['doumuxie1','doumuxie2'],
    ['niujinniu1',  'niujinniu2'],
    ['nvtufu1','nvtufu2'],
    ['xvrishu1','xvrishu2'],
    ['weiyueyan1',  'weiyueyan2'],
    ['shihuozhu1','shihuozhu2'],
    ['bishuiyu1','bishuiyu2'],
    // …等
  ];








    this.centerX = this.cameras.main.width  / 2;
    this.centerY = this.cameras.main.height / 2;
    this.add.image(centerX, centerY, 'Scene4bg')
      .setOrigin(0.5)
      .setDisplaySize(W, H);

    // —— 圆点 —— //
    const stars = this.add.image(this.centerX, this.centerY, 'stars')
    .setOrigin(0.5)
    .setDepth(0)
    .setScale(1.3);

  this.tweens.add({
    targets: stars,
    angle:360,
    duration: 30000,
    ease: 'Linear',
    repeat: -1
  });
  this.tweens.add({
    targets: stars,
    alpha: {from:0.2, to: 1},
    duration: 5000,
    ease: 'Sine.easeInout',
    yoyo: true,
    repeat: -1
  });


    this.add.image(75, 75, 'circle')
      .setOrigin(0.5)
      .setScale(0.5)
      .setDepth(5);

    

    const x = 75;
    const y = 75;
    const xuanwu = this.add.image(x, y, 'xuanwu')
      .setOrigin(0.5)
      .setScale(0.5)
      .setDepth(20)
      .setInteractive({ useHandCursor: true });
      

    // 持续旋转
    this.tweens.add({
      targets: xuanwu,
      angle: 360,
      duration: 12000,
      ease: 'Linear',
      repeat: -1
    });

    // 呼吸闪烁
    this.tweens.add({
      targets: xuanwu,
      alpha: { from: 0.5, to: 1 },
      ease: 'Sine.easeInOut',
      duration: 3000,
      yoyo: true,
      repeat: -1
    });

    // 悬停高亮闪烁
    let hoverTween;
    xuanwu.on('pointerover', () => {
      if (hoverTween) hoverTween.stop();
      hoverTween = this.tweens.add({
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
      if (hoverTween) { hoverTween.stop(); hoverTween = null; }
      xuanwu.setAlpha(1);
      xuanwu.clearTint();
    });
     xuanwu.on('pointerdown', () => {
    this.scene.start('NextScene', { skipTalk3: true });
  });


    //老头说话代码

  this.talk4 = this.add.image(
    -200,           // x：画布左侧外 200px
    H + 200,        // y：画布底部外 200px
    'talk4'
  )
  .setOrigin(0.5)
  .setDepth(20)
  .setScale(0.9);

  // 3. talk4 滑入动画
  this.tweens.add({
    targets: this.talk4,
    x: 400,         // 目标 x 坐标（左下区域）
    y: H * 0.8 - 190,     // 目标 y 坐标（画布 80% 高度）
    ease: 'Power1',
    duration: 1200,
    delay: 600
  });

  // 4. 全局点击一次就把 talk4 滑出
  this.input.once('pointerdown', () => {
    this.tweens.add({
      targets: this.talk4,
      x: -this.talk4.width,  // 滑到画布左侧外
      ease: 'Power1',
      duration: 800
    });
  });


  this.currentLevel   = 0;
  this.initPuzzle();
  this.isDrawing      = false;

  }


 initPuzzle(){

  this.dynamicLine    = this.add.graphics();
  this.completedLines = this.add.graphics();

    if (this.stars) {
    this.stars.forEach(dot => dot.destroy());
  }

  // —— 2) 清空所有连线 —— 
  this.completedLines.clear();
  this.dynamicLine.clear();

  // —— 2.5) 初始化本关需要的边集合 ——  
const lvl = this.levels[this.currentLevel];
this.requiredEdges = new Set(
  lvl.solutionEdges.map(([a,b]) => {
    // 把无向边 a–b 规范成 "小索引–大索引" 字符串
    const [i,j] = a < b ? [a,b] : [b,a];
    return `${i}-${j}`;
  })
);
this.drawnEdges = new Set();


  // —— 3) 重置状态计数 —— 
  this.stars            = [];
 

  // —— 4) 取出本关的数据 —— 

  const coords          = lvl.coords;     // 坐标列表


  // —— 5) 根据 coords 生成星星点并注册点击 —— 
  coords.forEach((pos, idx) => {
    const dot = this.add.circle(pos.x, pos.y, 
                                 pos.radius || 8, 
                                 pos.color  ||0xffffff)
      .setBlendMode(Phaser.BlendModes.ADD)
      .setDepth(30)
      .setInteractive({ useHandCursor: true });

    // 点击第 idx 颗星时调用 onStarClick(idx)
    dot.on('pointerdown', () => this.onStarClick(idx));

    this.stars.push(dot);
    this.tweens.add({
      targets: dot,
      alpha: {from:0.5, to: 1 },
      duration: 3000,
      ease: 'Sine.easeInout',
      yoyo:true,
      repeat: -1
    });

    });

 
}

updateDynamicLine(pointer) {
  this.dynamicLine.clear()
    .lineStyle(2, 0xffffff, 1)
    .beginPath()
    .moveTo(this.startPos.x, this.startPos.y)
    .lineTo(pointer.x, pointer.y)
    .strokePath();
}


 onStarClick(idx) {


  const dot = this.stars[idx];

  // 如果当前没有在画线，则本次点击为「起点点击」
  if (!this.isDrawing) {
    this.startIdx = idx;
    this.startPos = { x: dot.x, y: dot.y };
    console.log('开始拖线');
    // 
    this.dynamicLine.clear();
    // 3) 监听鼠标移动，动态画线
    this.input.on('pointermove', this.updateDynamicLine, this);
    this.isDrawing = true;

    console.log('★ 开始画线，起点 idx=', idx);
    return;
  }

//B
  this.input.off('pointermove', this.updateDynamicLine, this);
  this.dynamicLine.clear();
//C
  const a = this.startIdx, b = idx;
  const edgeKey = a < b ? `${a}-${b}` : `${b}-${a}`;
  console.log('试连边', edgeKey,
    '需要吗?', this.requiredEdges.has(edgeKey),
    '已画过?', this.drawnEdges.has(edgeKey));

  // 如果不在 requiredEdges 或 已经画过，就 **只重置绘制状态**（不删静态线、不删 drawnEdges）
  if (!this.requiredEdges.has(edgeKey) || this.drawnEdges.has(edgeKey)) {
    this.isDrawing = false;      // 下一次点击就能当新起点
    return;
}
//D

this.completedLines
    .lineStyle(2, 0xffffff, 1)
    .lineBetween(this.startPos.x, this.startPos.y, dot.x, dot.y);
  this.drawnEdges.add(edgeKey);
 this.input.off('pointermove', this.updateDynamicLine, this);
this.dynamicLine.clear();    // 可选：把画到一半的拖线也清掉
this.isDrawing = false;

  if (this.drawnEdges.size >= this.requiredEdges.size) {
    console.log('🎉 通关啦！');

  const cx = this.cameras.main.width  / 2;
  const cy = this.cameras.main.height / 2;

  const [ key1 , key2 ] = this.endPairs[this.currentLevel];
    this.endSprite = this.add.image(cx -150, cy, key1)
    .setOrigin(0.5)
    .setAlpha(1);
  this.endSprite2 = this.add.image(cx +150, cy,  key2)
      .setOrigin(0.5)
      .setAlpha(1);
    const src = this.textures.get(key1).getSourceImage();
    const desiredWidth = 300;
    const scale = desiredWidth / src.width;
    this.endSprite.setScale(scale)
    this.endSprite2.setScale(scale);
    this.tweens.add({
      targets: [this.endSprite, this.endSprite2 ],
      alpha:1,
      scaleX:1,
      scaleY:1,
      ease: 'Back.easeOut',
      duration:500,
    });
      this.time.delayedCall(0, () => {
      this.input.once('pointerdown', () => {
      this.completedLines.clear();
      this.dynamicLine.clear();
      this.endSprite.destroy();
      this.endSprite2.destroy();
      this.dissolveImage(key1, cx -150, cy, 8, 4);
      this.dissolveImage(key2, cx + 150, cy,   8, 4);
      this.time.delayedCall(1200, () => {
        this.currentLevel++;
        if (this.currentLevel < this.levels.length) {
          this.initPuzzle();
        } else {
          const endImg = this.add.image(cx-100, cy+75, 'talk5')
    .setOrigin(0.5)
    .setAlpha(1)
    .setScale(0.5)
    .setInteractive({ useHandCursor: true });

  // 2）给它加个淡入动画（可选）
  this.tweens.add({
    targets: endImg,
    alpha: { from: 0, to: 1 },
    duration: 600,
    ease: 'Linear'
  })
        }
      }, [], this);
    });
  });
  return;
  }

this.startIdx   = idx;
this.startPos   = { x: dot.x, y: dot.y };
this.dynamicLine.clear();
this.input.on('pointermove', this.updateDynamicLine, this);
this.isDrawing  = true;


 
}



dissolveImage(key, cx, cy, step = 2, size = 1) {
    // --------- start of dissolveImage code ---------
    // 1) 把整张图画到一个不可见的 RenderTexture 上
    const src = this.textures.get(key).getSourceImage();
    const rt  = this.add.renderTexture(0, 0, src.width, src.height)
      .draw(key, 0, 0)
      .setVisible(false);

    rt.setPosition(cx - src.width/2, cy - src.height/2);

    // 2) 让原图淡出
    this.tweens.add({
      targets: rt,
      alpha: 0,
      duration: 200
    });

    // 3) 从 RenderTexture 取像素到 Canvas
    const canvasKey = `canvas-${key}`;
    const w = src.width, h = src.height;
    const ctx = this.textures.createCanvas(canvasKey, w, h).getContext();
    ctx.drawImage(src, 0, 0);
    const imgData = ctx.getImageData(0, 0, w, h).data;

    // 4) 按 step 间隔遍历，生成小粒子并飞散
    for (let y = 0; y < h; y += step) {
      for (let x = 0; x < w; x += step) {
        const i = (y * w + x) * 4;
        const alpha = imgData[i+3];
        if (alpha < 10) continue;
        const color = (imgData[i] << 16) | (imgData[i+1] << 8) | imgData[i+2];
        const px = cx - w/2 + x;
        const py = cy - h/2 + y;

        const dot = this.add.circle(px, py, size, color)
          .setBlendMode(Phaser.BlendModes.ADD);

        const angle = Phaser.Math.FloatBetween(0, Math.PI*2);
        const dist  = Phaser.Math.Between(w/2, w);

        this.tweens.add({
          targets: dot,
          x: px + Math.cos(angle) * dist,
          y: py + Math.sin(angle) * dist,
          alpha: 0,
          duration: Phaser.Math.Between(1200, 1800),
          ease: 'Cubic.easeOut',
          onComplete: () => dot.destroy()
        });
      }
    }

    // 5) 删除临时 Canvas 纹理
    this.textures.remove(canvasKey);
    // --------- end of dissolveImage code ---------
  }
   

   drawAnimatedLine(x1, y1, x2, y2) {
  const animG     = this.animatedLine;
  const staticG   = this.completedLines;

  // 一开始清空上一条动画线，不碰已经画好的 staticG
  animG.clear();
  animG.lineStyle(2, 0xffffaa, 1);

  const progress = { t: 0 };

  this.tweens.add({
    targets: progress,
    t: 1,
    duration: 400,
    ease: 'Linear',

    onUpdate: () => {
      // 先清掉上一次动画线
      animG.clear();
      animG.lineStyle(2, 0xffffaa, 1);

      // 插值出当前端点
      const nx = Phaser.Math.Linear(x1, x2, progress.t);
      const ny = Phaser.Math.Linear(y1, y2, progress.t);

      // 画动画线
      animG.beginPath()
           .moveTo(x1, y1)
           .lineTo(nx, ny)
           .strokePath();
    },

    onComplete: () => {
      // 动画完毕：把这条“完整线”绘到 staticG 上
      staticG.lineStyle(2, 0xffffaa, 1)
             .lineBetween(x1, y1, x2, y2);

      // 清空动画图层为下一条做准备
      animG.clear();
    }
  });
}







}