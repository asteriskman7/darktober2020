'use strict';

class Sketch7 extends Sketch {
  draw(ctx, width, height, t) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);
    ctx.font = '20px Grandstander';
    ctx.fillStyle = 'white';

    const msg = `Unfortunately, today's sketch has gone missing. I'm not sure exactly what happened but please accept my apologies. Tomorrow's sketch will surely be present. Please ignore the rumors suggesting that this sketch is haunted. There's no proof of that and franky, I find it kind of offensive. The photos of the author worshiping demons under the full moon are total fabrications and if I find the person who took them, I'm going to press charges immediately.`;

    let nextX = 10;
    let nextY = 30;
    const words = [];
    msg.split` `.forEach( (v, i) => {
      const measure = ctx.measureText(v + ' ');
      if (nextX + measure.width > 500) {
        nextY += 30;
        nextX = 10;
      }
      words.push({ s: v, x: nextX, y: nextY, w: measure.width });
      nextX += measure.width;
    });

    let dt = 0;
    let p = 0;
    if (t % 10 > (10 - 3.14)) {
      dt = (t % 10) - 10;
      p = Math.sin(dt) * Math.sin(dt);
    }

    words.forEach( (v, i) => {
      ctx.save();
      let x = v.x + 1*Math.sin(t + 666*i*i);
      let y = v.y + 2*Math.cos(3*t + Math.pow(666,i));
      if (Math.tan(t+i) > 1) {
        x += 1;
      }
      let l = 100;
      let b = 0;
      const tx = 100 * Math.sin(i * 33333);
      const ty = 100 * Math.sin(i * 77777);
      x += tx * p + 5 * Math.sin(dt * 9) ;
      y += ty * p + 5 * Math.sin(dt * 9) ;
      const a = 0.1 * Math.sin(dt * 9);
      ctx.translate(x + v.w * 0.5, y);
      ctx.rotate(a);
      ctx.translate(-x - v.w * 0.5, -y);
      l = (1-p) * 100;
      b = 20 * p;
      ctx.fillStyle = `hsl(0, 0%, ${l}%)`;
      ctx.shadowColor = 'white';
      ctx.shadowBlur = b;
      ctx.fillText(v.s, x, y);
      ctx.restore();
    });

    ctx.font = '350px Arial';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillStyle = `rgba(0,0,0,${p*0.15})`;
    ctx.fillText('\u{1f47f}', width * 0.5, height * 0.5);

  }
}

app.sketches[7] = new Sketch7();
app.sketches[7].desc = `-`;
