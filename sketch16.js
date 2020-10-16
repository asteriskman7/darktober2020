'use strict';

class Sketch16 extends Sketch {
  draw(ctx, width, height, t) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);

    //draw spiderweb
    ctx.save();
    ctx.translate(width * 0.5, height * 0.5);

    const da = Math.PI * 2 / 15;
    ctx.strokeStyle = 'white';
    let a = (this.mousePoint.x + width * this.mousePoint.y) * Math.PI * 2 / (width * height);
    console.log(a);
    const angles = [];
    const rstart = [];
    const rend = [];
    //while (a < Math.PI * 2) {
    while (angles.length < 15) {
      angles.push(a);
      rstart.push(30 + 15 * Math.sin(a * 33333));
      rend.push(100 + 50 * Math.cos(a * 9999));
      a += da + da * 0.5 * Math.sin(a * 7777);
    }

    angles.forEach( (a, i) => {
      const nextA = angles[(i+1) % angles.length];
      ctx.beginPath();
      ctx.moveTo(rend[i] * Math.cos(a), rend[i] * Math.sin(a));
      ctx.lineTo(rstart[i] * Math.cos(a), rstart[i] * Math.sin(a));
      ctx.lineTo(rstart[i] * Math.cos(nextA), rstart[i] * Math.sin(nextA));
      ctx.lineTo(rend[i] * Math.cos(nextA), rend[i] * Math.sin(nextA));
      for (let j = 1; j < 4; j++) {
        const d2 = rstart[i] + 30 * j + 25 * Math.sin(a * 321);
        ctx.moveTo(d2 * Math.cos(a), d2 * Math.sin(a));
        ctx.lineTo(d2 * Math.cos(nextA), d2 * Math.sin(nextA));
      }
      ctx.stroke();
    });

    ctx.restore();

    //draw window border
    const borderWidth = 20;
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, width, borderWidth);
    ctx.fillRect(0, 0, borderWidth, height);
    ctx.fillRect(width - borderWidth, 0, borderWidth, height);
    ctx.fillRect(0, height-borderWidth, width, borderWidth);

  }
}

app.sketches[16] = new Sketch16();
app.sketches[16].desc = `Stability in life is an illusion that can be shattered in an instant.`;
