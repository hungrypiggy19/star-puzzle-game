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
    this.load.image('map', 'assets/map.png');
  }

  create() {
    // 画布宽高 & 中心点
    const W = this.cameras.main.width;
    const H = this.cameras.main.height;
    const centerX = W / 2;
    const centerY = H / 2;




        // —— 1. 在这里定义所有关的坐标和边集合 —— //
     this.levels = [
    {coords: [ {x:892,y:194}, {x:903,y:670} ],
      solutionEdges: [ [0,1]]
    },
    {coords: [ {x:941,y:178},{x:1163,y:467},{x:918,y:708}],
      solutionEdges: [ [0,1],[1,2]]
    },
    {coords: [ {x:789,y:175},{x:1104,y:693}],
      solutionEdges: [ [0,1]]
    },
    {coords: [ {x:885,y:183},{x:1135,y:418},{x:1150,y:640},{x:953,y:651} ],
      solutionEdges: [ [0,1],[1,2],[2,3] ]
    },
    {coords: [ {x:761,y:154},{x:924,y:177},{x:966,y:300},{x:854,y:364},{x:908,y:541},{x:1089,y:677}],
      solutionEdges: [ [0,1],[1,2],[2,3],[3,4],[4,5] ]
    },
    {coords: [ {x:951,y:161},{x:954,y:351},{x:934,y:667},{x:770,y:231},{x:1173,y:233},{x:1093,y:534}],
      solutionEdges: [ [0,1],[1,2],[1,3],[1,4],[2,5]]
    },
    {coords: [ {x:1033,y:112},{x:976,y:312}, {x:992,y:444},{x:915,y:553},{x:922,y:676},{x:1130,y:409},{x:1263,y:409},{x:834,y:374},
    {x:657,y:332}],
      solutionEdges: [ [0,1],[1,2],[2,3],[3,4],[2,5],[5,6],[2,7],[7,8] ]
    },
  
    // …继续添加其它关…
  ];

  // 定义通关后要显示的图片 key 对应表  //
  this.endPairs = [
    ['xvrishu1','xvrishu2'],
    ['weiyueyan1',  'weiyueyan2'],
    ['bishuiyu1','bishuiyu2'],
    ['nvtufu1','nvtufu2'],
    ['doumuxie1',  'doumuxie2'],
    ['niujinniu1','niujinniu2'],
    ['shihuozhu1','shihuozhu2'],
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
        x:     mapCenterX - 350,
        y:     mapCenterY + 650,
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







