'use strict';

class Sketch12 extends Sketch {
  draw(ctx, width, height, t) {
    const colors = {
      bg: 'hsl(0, 0%, 52%)',
      bgDk: 'hsl(0, 0%, 40%)',
      carpet: 'hsl(273, 47%, 44%)',
      cauld: 'hsl(217, 6%, 52%)',
      cauldBorder: 'hsl(217, 6%, 35%)',
      potion: 'hsl(99, 55%, 37%)',
      potionDk: 'hsl(99, 55%, 25%)',
      spoon: 'hsl(27, 56%, 25%)'
    };

    ctx.lineWidth = 4;
    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = colors.bgDk;
    ctx.beginPath();
    const brickHeight = 50;
    const brickWidth = 100;
    for (let i = 0; i < (height / brickHeight); i++) {
      ctx.moveTo(0, i * brickHeight);
      ctx.lineTo(width, i * brickHeight);
      const offset = i % 2 === 0 ? 0 : brickWidth * 0.5;
      for (let j = 0; j < (width / brickWidth); j++) {
        ctx.moveTo(brickWidth * j + offset, i * brickHeight);
        ctx.lineTo(brickWidth * j + offset, (i + 1) * brickHeight);
      }
    }
    ctx.stroke();
    ctx.fillStyle = colors.carpet;
    ctx.fillRect(0, 400, width, height);



    ctx.fillStyle = colors.cauld;
    ctx.strokeStyle = colors.cauldBorder;

    ctx.beginPath();
    ctx.ellipse(width * 0.5, height * 0.7, 150, 130, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    ctx.beginPath();
    ctx.ellipse(width * 0.5, height * 0.52, 130, 50, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = colors.potion;
    ctx.beginPath();
    ctx.ellipse(width * 0.5, height * 0.52, 100, 30, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = colors.spoon;
    ctx.fillRect(width * 0.5 + 70 * Math.sin(t) - 10, 0, 20, 270 + 15 * Math.cos(t));

    if (this.bubbles === undefined) {
      this.bubbles = [];
    }

    if (Math.random() > 0.94) {
      const bubble = {
        x: width * 0.5 + 140 * Math.random() - 70,
        y: height * 0.52,
        r: 5 + 15 * Math.random(),
        k: this.bubbles.length,
        alive: true
      };
      this.bubbles.push(bubble);
    }

    ctx.fillStyle = colors.potion;
    ctx.strokeStyle = colors.potionDk;
    this.bubbles.forEach( v => {
      ctx.beginPath();
      ctx.arc(v.x, v.y, v.r, 0, Math.PI * 2);
      v.y -= 3;
      v.x += Math.sin(8*t + 33333*v.k);
      if (v.y < -20) {
        v.alive = false;
      }
      ctx.fill();
      ctx.stroke();
    });

    this.bubbles = this.bubbles.filter( v => v.alive );
  }
}

app.sketches[12] = new Sketch12();
app.sketches[12].desc = `This brew will allow you to use doubles doubles to
store currency without the toil and trouble.`;
