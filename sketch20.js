'use strict';

class Sketch20 extends Sketch {
  draw(ctx, width, height, t) {
    ctx.clearRect(0, 0, width, height);
    //ctx.fillStyle = 'hsl(56, 23%, 30%)';
    //ctx.fillRect(0, 0, width, height);
    const cfill = 'hsl(56, 6%, 81%)';
    const coutline = 'hsl(56, 6%, 39%)';

    ctx.fillStyle = cfill;
    ctx.strokeStyle = coutline;

    function drawBone(x, y, s, a) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(a);
      ctx.lineWidth = 4 * s / 300;

      ctx.beginPath();
      ctx.moveTo(-s/2, -s*0.1);
      ctx.lineTo( s/2, -s*0.1);
      ctx.arc(s*0.6, -s*0.1 + s * 0.05, s*0.1, 5 * Math.PI / 4, 8.6 * Math.PI / 4);
      ctx.arc(s*0.6,  s*0.1 - s * 0.05, s*0.1, 7 * Math.PI / 4, 11 * Math.PI / 4);

      ctx.lineTo(s/2, s*0.1);
      ctx.lineTo(-s/2, s*0.1);

      ctx.arc(-s*0.6,  s*0.1 - s * 0.05, s*0.1, 1 * Math.PI / 4, 5 * Math.PI / 4);
      ctx.arc(-s*0.6, -s*0.1 + s * 0.05, s*0.1, 3.4 * Math.PI / 4, 7 * Math.PI / 4);

      ctx.lineTo(-s/2, -s*0.1);
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    }

    if (this.bones === undefined) {
      this.bones = [];
      for (let i = 0; i < 100; i++) {
        const newBone = {
          x: Math.random() * width,
          y: Math.random() * height,
          s: 10 + Math.random() * 200,
          t0: Math.random() * 999,
          type: Math.floor(Math.random() * 2),
          vy: Math.random() * 3,
          vt: 1 + Math.random() * 2,
        };
        this.bones.push(newBone);
      }
    }

    this.bones.forEach( v => {
      let a;
      if (v.type === 0) {
        a = v.vt * Math.sin(v.t0 + t);
      } else {
        a = v.t0 + t * v.vt;
      }
      drawBone(v.x, v.y, v.s, a);
      v.y += v.vy;
      if (v.y > width + v.s) {
        v.y = -v.s;
      }
    });

  }
}

app.sketches[20] = new Sketch20();
app.sketches[20].desc = `Maybe this would be a good day to stay indoors.`;
