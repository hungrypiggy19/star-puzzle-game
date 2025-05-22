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
    {coords: [ {x:676,y:513}, {x:1011,y:589} ,{x:1172,y:403}],
      solutionEdges: [ [0,1],[1,2] ]
    },
    {coords: [ {x:629,y:233},{x:989,y:713},{x:1331,y:216}],
      solutionEdges: [ [0,1],[1,2] ]
    },
    {coords: [ {x:1109,y:326},{x:802,y:419},{x:1122,y:518}],
      solutionEdges: [ [0,1],[1,2] ]
    },
    {coords: [ {x:1125,y:191},{x:966,y:213} ,{x:976,y:368},{x:787,y:454},{x:799,y:687},{x:1163,y:666},{x:1147,y:436}],
      solutionEdges: [ [0,1], [1,2],[2,3],[3,4],[4,5],[5,6],[6,2]]
    },
    {coords: [ {x:516,y:247},{x:677,y:306},{x:906,y:363},{x:1373,y:322},{x:892,y:460},{x:731,y:512},{x:526,y:676}],
      solutionEdges: [ [0,1],[1,2],[2,3],[2,4],[4,5],[5,6] ]
    },
    {coords: [ {x:605,y:203},{x:957,y:277},{x:1334,y:151},{x:1314,y:267},{x:1237,y:381},{x:1114,y:487},{x:960,y:416},{x:931,y:700},
     {x:548,y:816},{x:1295,y:873}],
      solutionEdges: [ [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,1],[6,7],[7,8],[7,9] ]
    },
    {coords: [ {x:722,y:200},{x:618,y:255},{x:529,y:345},{x:516,y:467},{x:629,y:479},
    {x:644,y:580},{x:773,y:539},{x:827,y:638},{x:954,y:654},{x:1069,y:621},{x:1179,y:628},{x:1236,y:541},
    {x:1204,y:436},{x:1128,y:370},{x:989,y:349} ],
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