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
  {coords: [ {x:400,y:200, radius:8}, {x:370,y:400 ,radius:6} ],  // 关卡一的星星
    solutionEdges: [[0, 1] ]                        
  },
  {coords: [ {x:300,y:150}, {x:400,y:300}, {x:500,y:300} ,{x:550,y:150}],
    solutionEdges: [ [0,1],[1,2],[2,3]  ]                    
  },
  {coords: [ {x:400,y:200}, {x:300,y:300}, {x:450, y:400}, {x:550,y:300}],
   solutionEdges:[
    [0,1],[1,2],[2,3],[3,0]]
   },
   {coords: [ {x:350,y:200}, {x:450,y:300}, {x:400,y:350} ,{x:500,y:450}],
    solutionEdges: [ [0,1],[1,2],[2,3]  ]                    
  },
   {coords: [ {x:450,y:200}, {x:350,y:300}, {x:300,y:400} ],
    solutionEdges: [ [0,1],[1,2]  ]                    
  },
  {coords: [ {x:350,y:300}, {x:300,y:300}, {x:300,y:400} ,{x:400,y:500},{x:500,y:450},{x:450,y:350},{x:400,y:200}],
    solutionEdges: [ [0,1],[1,2],[2,3],[3,4],[4,5],[5,6]  ] ,                   
  },
  {coords: [ {x:300,y:300}, {x:400,y:200}, {x:500,y:250} ,{x:550,y:400}],
    solutionEdges: [ [0,1],[1,2],[2,3]  ]                    
  },
  ];
  
   this.completedLines = this.add.graphics();
   this.dynamicLine   = this.add.graphics();
   this.isDrawing     = false;
   this.currentConnection = 0;

   this.stars         = [];


   this.endPairs = [
    ['endLevel',     'endLevel2'],      // 关卡0
    ['kangjinlong1', 'kangjinlong2'],   // 关卡1
    ['ditumo1',      'ditumo2'],        // 关卡2
    ['fangritu1',    'fangritu2'],      // 关卡3
    ['jishuibao1',   'jishuibao2'],     // 关卡4
    ['weihuohu1',    'weihuohu2'],      // 关卡5
    ['xinyuehu1',    'xinyuehu2'],      // 关卡6
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

  

  
  initPuzzle(){
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
  
     
onStarClick(idx) {


  const dot = this.stars[idx];

  // 如果当前没有在画线，则本次点击为「起点点击」
  if (!this.isDrawing) {
    this.startIdx = idx;
    this.startPos = { x: dot.x, y: dot.y };
    // 
    this.dynamicLine.clear();
    // 3) 监听鼠标移动，动态画线
    this.input.on('pointermove', this.updateDynamicLine, this);
    this.isDrawing = true;

    console.log('★ 开始画线，起点 idx=', idx);
    return;
  }


  this.input.off('pointermove', this.updateDynamicLine, this);
  this.dynamicLine.clear();

const a = this.startIdx, b = idx;
const edgeKey = a < b ? `${a}-${b}` : `${b}-${a}`;
console.log(
  '🔸 试连边', edgeKey,
  '需要吗?', this.requiredEdges.has(edgeKey),
  '已画过?', this.drawnEdges.has(edgeKey)
);

if (!this.requiredEdges.has(edgeKey) || this.drawnEdges.has(edgeKey)) {
  // 失败重置
  this.completedLines.clear();
  this.drawnEdges.clear();
  this.isDrawing = false;
  return;
}
//合法刻印记录

  this.completedLines
    .lineStyle(2, 0xffffff, 1)
    .lineBetween(this.startPos.x, this.startPos.y,  dot.x, dot.y);
    this.drawnEdges.add(edgeKey);
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
}