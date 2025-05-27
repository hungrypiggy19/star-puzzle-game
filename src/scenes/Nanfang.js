// src/scenes/Nanfang.js
export default class Nanfang extends Phaser.Scene {
  constructor() {
    super({ key: 'Nanfang' });
  }

  preload() {
            // ① 加载 Scene4 的背景
    this.load.image('Scene4bg', 'assets/Scene4_bg.jpg');
    this.load.image('circle',   'assets/circle.png');
    this.load.image('bird',     'assets/bird.png');
    this.load.image('stars', 'assets/stars.png');
    this.load.image('talk4','assets/talk4.png');
    this.load.image('guijinyang1',  'assets/nan/guijinyang1.png');
    this.load.image('guijinyang2',  'assets/nan/guijinyang2.png');
    this.load.image('jingmuan1',    'assets/nan/jingmuan1.png');
    this.load.image('jingmuan2',    'assets/nan/jingmuan2.png');
    this.load.image('liutuzhang1',  'assets/nan/liutuzhang1.png');
    this.load.image('liutuzhang2',  'assets/nan/liutuzhang2.png');
    this.load.image('xingrima1',    'assets/nan/xingrima1.png');
    this.load.image('xingrima2',    'assets/nan/xingrima2.png');
    this.load.image('yihuoshe1',    'assets/nan/yihuoshe1.png');
    this.load.image('yihuoshe2',    'assets/nan/yihuoshe2.png');
    this.load.image('zhangyuelu1',  'assets/nan/zhangyuelu1.png');
    this.load.image('zhangyuelu2',  'assets/nan/zhangyuelu2.png');
    this.load.image('zhenshuiyin1', 'assets/nan/zhenshuiyin1.png');
    this.load.image('zhenshuiyin2', 'assets/nan/zhenshuiyin2.png');
    this.load.image('map', 'assets/map.png');
  }



  create() {
    
    const W = this.cameras.main.width;
    const H = this.cameras.main.height;

      // —— 1. 在这里定义所有关的坐标和边集合 —— //
    this.levels = [
    {coords: [ {x:937,y:265}, {x:1092,y:418} ,{x:938,y:592},{x:786,y:431},{x:947,y:432}],
      solutionEdges: [ [0,1],[1,2],[2,3]]
    },
    {coords: [ {x:956,y:157},{x:1117,y:270},{x:972,y:357},{x:972,y:515},{x:819,y:303} ],
      solutionEdges: [ [0,1],[1,2],[2,3],[2,4] ]
    },
    {coords: [ {x:461,y:323},{x:648,y:407},{x:776,y:650},{x:957,y:373},{x:1057,y:593},{x:1430,y:669}],
      solutionEdges: [ [0,1],[1,2],[1,3],[2,4],[3,4],[4,5]]
    },
    {coords: [ {x:959,y:93},{x:872,y:209},{x:1080,y:212},{x:967,y:306},{x:964,y:593},{x:983,y:673},{x:1047,y:747} ],
      solutionEdges: [ [0,1],[1,3],[3,2],[2,0],[3,4],[4,5],[5,6] ]
    },
    {coords: [ {x:732,y:148},{x:731,y:309},{x:671,y:467},{x:716,y:690},{x:1120,y:139},
    {x:1109,y:291},{x:1112,y:434},{x:1193,y:696}],
      solutionEdges: [ [0,1],[1,2],[2,3],[4,5],[5,6],[6,7],[1,5],[2,6] ]
    },
    {coords: [ {x:1295,y:199},{x:1494,y:267},{x:1502,y:460},{x:1388,y:495},{x:1275,y:470},{x:1151,y:553},{x:992,y:625},{x:660,y:538}],
      solutionEdges: [ [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7] ]
    },
    {coords: [ {x:561,y:157},{x:741,y:129},{x:937,y:162},{x:1159,y:115},{x:1340,y:149},{x:995,y:238},{x:882,y:238},{x:951,y:307},
    {x:953,y:376},{x:1053,y:403},{x:1212,y:402},{x:960,y:464},{x:840,y:409},{x:676,y:434},{x:975,y:535},{x:864,y:564},
    {x:980,y:624},{x:1076,y:655},{x:1180,y:708},{x:1352,y:686},{x:944,y:711},{x:825,y:747},{x:600,y:715}
     ],
      solutionEdges: [ [0,1],[1,2],[2,3],[3,4],[2,5],[5,6],[6,7],[7,8],[8,9],[9,10],[8,12],[12,13],[9,11],[12,11],[11,14],[14,15],[15,16],
      [16,17],[17,18],[18,19],[17,20],[20,21],[21,22] ]
    },
  
    // …继续添加其它关…
  ];

  // 定义通关后要显示的图片 key 对应表  //
  this.endPairs = [
    ['guijinyang1','guijinyang2'],
    ['zhenshuiyin1',  'zhenshuiyin2'],
    ['zhangyuelu1','zhangyuelu2'],
    ['xingrima1','xingrima2'],
    ['jingmuan1',  'jingmuan2'],
    ['liutuzhang1','liutuzhang2'],
    ['yihuoshe1','yishuoshe2'],
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
    .setScale(1.5);

  this.tweens.add({
    targets: stars,
    angle:360,
    duration: 60000,
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
     .setDepth(5);

    const bird = this.add.image(x, y, 'bird')
    .setOrigin(0.5)
    .setScale(0.5)
    .setDepth(20)
    .setInteractive({ useHandCursor: true });

  // 1) 匀速旋转
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

  // 3) 悬停时快速闪烁 + 高亮
  let hoverTween;
  bird.on('pointerover', () => {
    if (hoverTween) hoverTween.stop();
    hoverTween = this.tweens.add({
      targets: bird,
      alpha: { from: 0.5, to: 1 },
      ease: 'Sine.easeInOut',
      duration: 500,
      yoyo: true,
      repeat: -1
    });
    bird.setTint(0xffff99);
  });
  bird.on('pointerout', () => {
    if (hoverTween) {
      hoverTween.stop();
      hoverTween = null;
    }
    bird.setAlpha(1);
    bird.clearTint();
  });
    bird.on('pointerdown', () => {
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

  const mapOrigX     = 20;                                     // 距左边 20px
  const mapOrigY     = this.cameras.main.height - 20;         // 距底部 20px
  const mapOrigScale = 0.2;                                   // 初始缩放
  const mapZoomScale = 1.0;                                   // 点击后放到 100%
  const mapCenterX   = this.cameras.main.width  / 2;
  const mapCenterY   = this.cameras.main.height / 2;

  // 2) 创建 map 精灵
  this.mapSprite = this.add.image(mapOrigX, mapOrigY, 'map')
    .setOrigin(0, 1)               // 左下角对齐
    .setScale(mapOrigScale)
    .setDepth(5)
    .setInteractive({ useHandCursor: true });

  // 3) 状态标志
  this.mapZoomed = false;

  // 4) 点击切换放大/还原
  this.mapSprite.on('pointerdown', () => {
    if (!this.mapZoomed) {
      // 放大到中间并提层
      this.mapSprite.setDepth(1000);
      this.tweens.add({
        targets: this.mapSprite,
        x:     mapCenterX - 850,
        y:     mapCenterY + 550,
        scale: mapZoomScale,
        ease:  'Back.easeOut',
        duration: 500
      });
    } else {
      // 缩回原位并恢复层级
      this.tweens.add({
        targets: this.mapSprite,
        x:     mapOrigX,
        y:     mapOrigY,
        scale: mapOrigScale,
        ease:  'Back.easeIn',
        duration: 500,
        onComplete: () => {
          this.mapSprite.setDepth(5);
        }
      });
    }
    this.mapZoomed = !this.mapZoomed;
  });


  this.completedLines = this.add.graphics();
  this.dynamicLine    = this.add.graphics();
  this.animatedLine   = this.add.graphics();

  this.currentLevel   = 0;
  this.initPuzzle();
  this.isDrawing      = false;


  }

  

 // —— 1. initPuzzle ——  
initPuzzle() {
  // 1) 清掉旧星星、旧线
  if (this.stars) {
    this.stars.forEach(d => d.destroy());
  }
  this.completedLines.clear();
  this.dynamicLine.clear();

  // 2) 生成“要画的边”集合 requiredEdges
  const lvl = this.levels[this.currentLevel];
  this.requiredEdges = new Set(
    lvl.solutionEdges.map(([a,b]) => {
      return a < b ? `${a}-${b}` : `${b}-${a}`;
    })
  );
  // 2.1) 清掉已画过的记录
  this.drawnEdges = new Set();

  // 3) 重置绘制状态
  this.isDrawing = false;
  this.stars     = [];

  // 4) 根据 coords 生成新星星并注册点击
  lvl.coords.forEach((pos, idx) => {
    const dot = this.add.circle(pos.x, pos.y, pos.radius||8, pos.color||0xffffff)
      .setBlendMode(Phaser.BlendModes.ADD)
      .setDepth(30)
      .setInteractive({ useHandCursor: true });
    dot.on('pointerdown', () => this.onStarClick(idx));
    this.stars.push(dot);

    // （可选）呼吸动画
    this.tweens.add({
      targets: dot,
      alpha:  { from: 0.5, to: 1 },
      ease:   'Sine.easeInOut',
      duration: 3000,
      yoyo:   true,
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


 // —— 2. onStarClick ——  
onStarClick(idx) {
  const dot = this.stars[idx];

  // A. 如果还没在画线，先注册起点
  if (!this.isDrawing) {
    this.startIdx  = idx;
    this.startPos  = { x: dot.x, y: dot.y };
    this.dynamicLine.clear();
    this.input.on('pointermove', this.updateDynamicLine, this);
    this.isDrawing = true;
    console.log('★ 起点:', idx);
    return;
  }

  // B. 已有起点，这次当终点
  this.input.off('pointermove', this.updateDynamicLine, this);
  this.dynamicLine.clear();
  this.isDrawing = false;

  // 规范 key
  const a = this.startIdx, b = idx;
  const edgeKey = a < b ? `${a}-${b}` : `${b}-${a}`;

  const ok  = this.requiredEdges.has(edgeKey);
  const dup = this.drawnEdges.has(edgeKey);
  console.log('试连', edgeKey, '需要?', ok, '重复?', dup);

  // B1. 错或重复：只放弃本次，不清静态线
  if (!ok || dup) {
    console.log('✖ 放弃本次连线');
    return;
  }

  // B2. 合法：刻到静态图层
  this.completedLines
    .lineStyle(2, 0xffffff, 1)
    .lineBetween(
      this.startPos.x, this.startPos.y,
      dot.x, dot.y
    );
  this.drawnEdges.add(edgeKey);
  console.log('✔ 已刻:', edgeKey);

  // C. 通关判断
  if (this.drawnEdges.size === this.requiredEdges.size) {
    console.log('🎉 全部连完');
    this.showEndLevel();
    return;
  }

  // D. 进入下一段
  this.startIdx  = idx;
  this.startPos  = { x: dot.x, y: dot.y };
  this.dynamicLine.clear();
  this.input.on('pointermove', this.updateDynamicLine, this);
  this.isDrawing = true;
  console.log('▶ 继续下一段');
}


   dissolveImage(key, cx, cy, step = 64, size = 16) {
  // 1) 原图淡出
  const src = this.textures.get(key).getSourceImage();
  const rt  = this.add.renderTexture(0, 0, src.width, src.height)
    .draw(key, 0, 0)
    .setVisible(false)
    .setPosition(cx - src.width/2, cy - src.height/2);
  this.tweens.add({ targets: rt, alpha: 0, duration: 200 });

  // 2) 取像素到 Canvas
  const w = src.width, h = src.height;
  const canvasKey = `canvas-${key}`;
  const ctx = this.textures.createCanvas(canvasKey, w, h).getContext();
  ctx.drawImage(src, 0, 0);
  const data = ctx.getImageData(0, 0, w, h).data;
  this.textures.remove(canvasKey);

  // 3) 收集所有透明度合格的候选点
  const candidates = [];
  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      const alpha = data[(y * w + x) * 4 + 3];
      if (alpha < 10) continue;
      const r = data[(y*w + x)*4],
            g = data[(y*w + x)*4+1],
            b = data[(y*w + x)*4+2];
      const color = (r<<16)|(g<<8)|b;
      candidates.push({
        x: cx - w/2 + x,
        y: cy - h/2 + y,
        color
      });
    }
  }

  // 4) 随机打乱，只保留最多 200 个点
  Phaser.Utils.Array.Shuffle(candidates);
  const points = candidates.slice(0, 200);

  // 5) 对每个采样点创建小圆并做飞散 Tween
  points.forEach(({ x, y, color }) => {
    const dot = this.add.circle(x, y, size, color)
      .setBlendMode(Phaser.BlendModes.ADD);
    const angle = Phaser.Math.FloatBetween(0, Math.PI*2);
    const dist  = Phaser.Math.Between(w/2, w);
    this.tweens.add({
      targets: dot,
      x:      x + Math.cos(angle)*dist,
      y:      y + Math.sin(angle)*dist,
      alpha:  0,
      duration: Phaser.Math.Between(1500, 2000),
      ease:     'Cubic.easeOut',
      onComplete: () => dot.destroy()
    });
  });
}
  // … 其他
   

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


    // —— 3. showEndLevel ——  
showEndLevel() {
  const cx = this.cameras.main.width  / 2;
  const cy = this.cameras.main.height / 2;
  const [ key1, key2 ] = this.endPairs[this.currentLevel];

  // 添加两张图，初始透明
  this.endSprite  = this.add.image(cx - 300, cy, key1).setOrigin(0.5).setAlpha(0);
  this.endSprite2 = this.add.image(cx + 300, cy, key2).setOrigin(0.5).setAlpha(0);
   this.endSprite2.setScale(2);

  // 淡入+放大
  this.tweens.add({
    targets: [ this.endSprite, this.endSprite2 ],
    alpha:    1, 
    ease:     'Back.easeOut',
    duration: 500,
    onComplete: () => {
      // 等动画完，下一 tick 再注册真正的“消散+切关”点击
      this.time.delayedCall(0, () => {
        this.input.once('pointerdown', () => {
          this.endSprite.destroy();
          this.endSprite2.destroy();
          this.dissolveImage(key1, cx -150, cy, 8, 4);
          this.dissolveImage(key2, cx +150, cy, 8, 4);

          this.time.delayedCall(1200, () => {
            this.currentLevel++;
            if (this.currentLevel < this.levels.length) {
              this.initPuzzle();
            } else {
              // 全部通关后的最后逻辑
              const endImg = this.add.image(cx -200, cy +110, 'talk5')
                .setOrigin(0.5).setAlpha(0).setScale(0.9)
                .setInteractive({ useHandCursor: true });
              this.tweens.add({
                targets: endImg,
                alpha: { from: 0, to: 1 },
                duration: 600
              });
            }
          });
        });
      });
    }
  });
}

}