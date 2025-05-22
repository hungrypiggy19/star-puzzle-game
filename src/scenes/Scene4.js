// src/scenes/Scene4.js
export default class Scene4 extends Phaser.Scene {
  constructor() {
    super({ key: 'Scene4' });
  }

  preload() {this.load.image('Scene4bg', 'assets/Scene4_bg.jpg');
            this.load.image('dragon', 'assets/dragon.png');
            this.load.image('circle', 'assets/circle.png');
            this.load.image('stars', 'assets/stars.png');
            this.load.image('talk4','assets/talk4.png');
            this.load.image('endLevel', 'assets/endLevel.png');
            this.load.image('endLevel2','assets/endLevel2.png');
            this.load.image('kangjinlong1','assets/kangjinlong1.png');
            this.load.image('kangjinlong2','assets/kangjinlong2.png');
            this.load.image('ditumo1',  'assets/ditumo1.png');
            this.load.image('ditumo2',  'assets/ditumo2.png');
            this.load.image('fangritu1', 'assets/fangritu1.png');
            this.load.image('fangritu2', 'assets/fangritu2.png');
            this.load.image('jishuibao1','assets/jishuibao1.png');
            this.load.image('jishuibao2','assets/jishuibao2.png');
            this.load.image('weihuohu1','assets/weihuohu1.png');
            this.load.image('weihuohu2','assets/weihuohu2.png');
            this.load.image('xinyuehu1','assets/xinyuehu1.png');
            this.load.image('xinyuehu2','assets/xinyuehu2.png');
            this.load.image('talk5','assets/talk5.png');

    
  }

  create() {
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

    const x = 75 , y = 75;
    
    const circle = this.add.image(x, y, 'circle')
     .setOrigin(0.5 )
     .setScale(0.5)
     .setDepth(5);

    const dragon = this.add.image(x, y, 'dragon')
      .setOrigin(0.5)
      .setScale(0.3)
      .setDepth(10)
      .setInteractive({ useHandCursor: true });
      dragon.on('pointerdown',() => {
        this.scene.start('NextScene',{skipTalk3: true});
      });
    
    this.tweens.add({
    targets: dragon,
    angle: 360,       
    ease: 'Linear',    
    duration: 13000,   
    repeat: -1         
  });

  
  this.tweens.add({
    targets: dragon,
    alpha: { from: 0.5, to: 1 },  
    ease: 'Sine.easeInOut',        
    duration: 3000,                
    yoyo: true,                    
    repeat: -1                    
  });
   
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

   this.currentLevel = 0;
   this.levels = [
  {coords: [ {x:594,y:483, radius:12}, {x:1175,y:490 ,radius:8} ],  // 关卡一的星星
    solutionEdges: [[0, 1] ]                        
  },
  {coords: [ {x:796,y:312}, {x:961,y:357}, {x:1022,y:499} ],
    solutionEdges: [ [0,1],[1,2]  ]                    
  },
  {coords: [ {x:637,y:341}, {x:766,y:548}, {x:1120, y:519}, {x:1276,y:265}],
   solutionEdges:[
    [0,1],[1,2],[2,3]]
   },
   {coords: [ {x:525,y:432}, {x:761,y:531}, {x:983,y:548} ,{x:1193,y:413}],
    solutionEdges: [ [0,1],[1,2],[2,3]  ]                    
  },
   {coords: [ {x:638,y:603}, {x:816,y:383}, {x:1080,y:387},{x:1089,y:625} ],
    solutionEdges: [ [0,1],[1,2],[2,3]  ]                    
  },
  {coords: [ {x:747,y:344}, {x:1151,y:325}, {x:1196,y:586} ,{x:754,y:541}],
    solutionEdges: [ [0,1],[1,2],[2,3],[3,0] ] ,                   
  },
  {coords: [ {x:592,y:415}, {x:774,y:631}, {x:906,y:612} ,{x:1163,y:654},{x:989,y:481},{x:1089,y:399},{x:954,y:381}],
    solutionEdges: [ [0,1],[1,2],[2,3],[4,5]  ]                    
  },
  ];
  
   this.completedLines = this.add.graphics();
   this.dynamicLine   = this.add.graphics();
   this.isDrawing     = false;
   this.currentConnection = 0;

   this.stars         = [];


   this.endPairs = [
    ['endLevel',     'endLevel2'],      // 关卡0
    ['xinyuehu1', 'xinyuehu2'],   // 关卡1
    ['kangjinlong1',  'kangjinlong2'],        // 关卡2
    ['fangritu1',    'fangritu2'],      // 关卡3
    ['jishuibao1',   'jishuibao2'],     // 关卡4
    ['ditumo1',    'ditumo2'],      // 关卡5
    ['weihuohu1',    'weihuohu2'],      // 关卡6
    // …如果有更多关，继续 push 对应 key …
  ];

  //



  
   this.initPuzzle();

  const H = this.cameras.main.height;
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
  // … 其他方法，例如 updateDynamicLine、initPuzzle …

  

  
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

updateDynamicLine(pointer) {
  this.dynamicLine.clear()
    .lineStyle(2, 0xffffff, 1)
    .beginPath()
    .moveTo(this.startPos.x, this.startPos.y)
    .lineTo(pointer.x, pointer.y)
    .strokePath();
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

// —— 3. showEndLevel ——  
showEndLevel() {
  const cx = this.cameras.main.width  / 2;
  const cy = this.cameras.main.height / 2;
  const [ key1, key2 ] = this.endPairs[this.currentLevel];

  // 添加两张图，初始透明
  this.endSprite  = this.add.image(cx - 150, cy, key1).setOrigin(0.5).setAlpha(0);
  this.endSprite2 = this.add.image(cx + 150, cy, key2).setOrigin(0.5).setAlpha(0);

  // 淡入+放大
  this.tweens.add({
    targets: [ this.endSprite, this.endSprite2 ],
    alpha:    1, scaleX: 1, scaleY: 1,
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
              const endImg = this.add.image(cx -100, cy +75, 'talk5')
                .setOrigin(0.5).setAlpha(0).setScale(0.5)
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