'use strict';

class Sketch4 extends Sketch {
  draw(ctx, width, height, t) {
    ctx.clearRect(0, 0, width, height);

    ctx.translate(width * 0.5, height * 0.5);

    function circle(r, p, n) {
      ctx.save();
      const h = n * 3;
      ctx.strokeStyle = `hsl(${h}, 50%, ${p * 100}%)`;
      ctx.lineWidth = 2 + 4 * p;
      ctx.lineCap = 'square';

      ctx.rotate(Math.sin(p * Math.PI * 2) * n * 0.02);

      ctx.beginPath();
      ctx.moveTo(r, 0);
      const segs = 50;
      for (let i = 0; i < segs; i++) {
        const a = Math.PI * 2 * i / segs;
        const segR = r + p * (i % 2) * r * 0.3;
        const x = segR * Math.cos(a);
        const y = segR * Math.sin(a);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(r, 0);
      ctx.stroke();

      ctx.restore();
    }

    //const p = Math.pow(Math.sin(t), 6);

    function getValFromFrames(keyFrames, maxT) {
      const localT = t % maxT;
      let prev;
      let next;
      keyFrames.forEach( v => {
        if (v.t <= localT) {
          prev = v;
        }
        if (v.t > localT && next === undefined) {
          next = v;
        }
      });

      const interpT = (localT - prev.t) / (next.t - prev.t);
      const interpV = prev.v + (next.v - prev.v) * interpT;
      return interpV
    }

    const keyFrames = [
      {t: 0, v: 0},
      {t: 0.5, v: 1},
      {t: 0.75, v: 0},
      {t: 1.25, v: 1}
    ];

    const p = getValFromFrames(keyFrames, 1.25);


    for (let i = 0; i < 40; i++) {
      circle(i * 10, p, i);
    }

  }
}

app.sketches[4] = new Sketch4();
app.sketches[4].desc = `Panic is a natural response to dangerous stimuli but
it is a response that can easily become overwhelming.`;
