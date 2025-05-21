// src/scenes/Xifang.js
export default class Xifang extends Phaser.Scene {
  constructor() {
    super({ key: 'Xifang' });
  }

  preload() {
    
    this.load.image('Scene4bg', 'assets/Scene4_bg.jpg');
    this.load.image('circle',   'assets/circle.png');
    this.load.image('stars',    'assets/stars.png');
    this.load.image('tiger',    'assets/tiger.png');
    this.load.image('talk4','assets/talk4.png');
  this.load.image('biyuewu1',     'assets/xi/biyuewu1.png');
  this.load.image('biyuewu2',     'assets/xi/biyuewu2.png');
  this.load.image('canshuiyuan1', 'assets/xi/canshuiyuan1.png');
  this.load.image('canshuiyuan2', 'assets/xi/canshuiyuan2.png');
  this.load.image('kuimulang1',   'assets/xi/kuimulang1.png');
  this.load.image('kuimulang2',   'assets/xi/kuimulang2.png');
  this.load.image('loujingou1',   'assets/xi/loujingou1.png');
  this.load.image('loujingou2',   'assets/xi/loujingou2.png');
  this.load.image('maoriji1',     'assets/xi/maoriji1.png');
  this.load.image('maoriji2',     'assets/xi/maoriji2.png');
  this.load.image('weituzhi1',    'assets/xi/weituzhi1.png');
  this.load.image('weituzhi2',    'assets/xi/weituzhi2.png');
  this.load.image('zihuohou1',    'assets/xi/zihuohou1.png');
  this.load.image('zihuohou2',    'assets/xi/zihuohou2.png');

  }

  create() {
    
    const W = this.cameras.main.width;
    const H = this.cameras.main.height;





          // —— 1. 在这里定义所有关的坐标和边集合 —— //
     this.levels = [
    {coords: [ {x:501,y:210}, {x:460,y:277} ,{x:378,y:205}],
      solutionEdges: [ [0,1],[1,2] ]
    },
    {coords: [ {x:345,y:266},{x:387,y:328},{x:445,y:284}],
      solutionEdges: [ [0,1],[1,2] ]
    },
    {coords: [ {x:434,y:264},{x:383,y:297},{x:429,y:313}],
      solutionEdges: [ [0,1],[1,2] ]
    },
    {coords: [ {x:256,y:256},{x:299,y:269} ,{x:340,y:273},{x:469,y:264},{x:344,y:309},{x:302,y:332},{x:245,y:362}],
      solutionEdges: [ [0,1], [1,2],[2,3],[1,4],[4,5],[5,6]]
    },
    {coords: [ {x:471,y:195},{x:404,y:197},{x:406,y:254},{x:363,y:294},{x:386,y:356},{x:472,y:342},{x:456,y:280}],
      solutionEdges: [ [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,2] ]
    },
    {coords: [ {x:271,y:186},{x:375,y:211},{x:500,y:183},{x:488,y:231},{x:458,y:257},{x:438,y:274},{x:381,y:257},{x:381,y:321},
     {x:290,y:362},{x:475,y:379}],
      solutionEdges: [ [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,1],[1,7],[7,8],[7,9] ]
    },
    {coords: [ {x:353,y:208},{x:324,y:221},{x:295,y:242},{x:276,y:266},{x:303,y:277},
    {x:324,y:295},{x:357,y:294},{x:370,y:306},{x:383,y:314},{x:403,y:311},{x:429,y:306},{x:443,y:288},
    {x:441,y:269},{x:433,y:250},{x:395,y:246} ],
      solutionEdges: [ [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[12,13],[13,14]]
    },
  
    // …继续添加其它关…
  ];

  // 定义通关后要显示的图片 key 对应表  //
  this.endPairs = [
    ['loujingou1','loujingou2'],
    ['weituzhi1',  'weituzhi2'],
    ['zihuohou1','zihuohou2'],
    ['biyuewu1','biyuewu2'],
    ['maoriji1',  'maoriji2'],
    ['canshuiyuan1','canshuiyuan2'],
    ['kuimulang1','kuimulang2'],
    // …等
  ];







    this.add.image(
    this.cameras.main.width  / 2, 
    this.cameras.main.height / 2, 
      'Scene4bg'
    )
    .setOrigin(0.5)  
    .setDisplaySize(
      this.cameras.main.width, 
      this.cameras.main.height
    );

     this.centerX = this.cameras.main.width  / 2;
     this.centerY = this.cameras.main.height / 2;

  
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

    const x = 75 , y = 75;
    
    const circle = this.add.image(x, y, 'circle')
     .setOrigin(0.5 )
     .setScale(0.5)
     .setDepth(5)
     .setAlpha(0.5);

    const tiger = this.add.image(x, y, 'tiger')
    .setOrigin(0.5)
    .setScale(0.5)
    .setDepth(20)
    .setInteractive({ useHandCursor: true });

  // 1) 匀速旋转
  this.tweens.add({
    targets: tiger,
    angle: 360,
    duration: 12000,
    ease: 'Linear',
    repeat: -1
  });

  // 2) 基础呼吸闪烁
  this.tweens.add({
    targets: tiger,
    alpha: { from: 0.5, to: 1 },
    ease: 'Sine.easeInOut',
    duration: 3000,
    yoyo: true,
    repeat: -1
  });

  // 3) 悬停时快速闪烁 + 高亮
  let hoverTween;
  tiger.on('pointerover', () => {
    if (hoverTween) hoverTween.stop();
    hoverTween = this.tweens.add({
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
    if (hoverTween) {
      hoverTween.stop();
      hoverTween = null;
    }
    tiger.setAlpha(1);
    tiger.clearTint();
  });
    tiger.on('pointerdown', () => {
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