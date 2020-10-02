'use strict';

class Sketch2 extends Sketch {
  draw(ctx, width, height, t, mousePoint) {
    ctx.fillStyle = 'hsl(190, 100%, 50%)';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, height * 0.62, width, height);

    const createArm = (x, y, l, a, w) => {
      ctx.save();
      ctx.strokeStyle = 'green';
      ctx.lineWidth = w;
      ctx.lineCap = 'round';
      ctx.translate(x, y);
      ctx.rotate(a);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      for (let i = 0; i < 10; i++) {
        ctx.lineTo((9 * Math.sin(i + 3*t + x)), (- (i+1) * l / 10));
      }
      ctx.stroke();
      ctx.restore();
    }
  
    const cx = 256;
    const cy = 400;
    const dx = mousePoint.x - cx;
    const dy = mousePoint.y - cy;
    const eyeAngle = Math.atan2(dy, dx);
    const mouseDist = Math.sqrt(dx * dx + dy * dy);
    const eyeDist = Math.min(10, mouseDist);

    for (let i = 0; i < 8; i++) {
      const x = 100 + i * 45;
      const y = 400;
      const l = 200 - Math.abs(x - 250); 
      const a = 2 * (x - 250) / 250; 
      const w = 30 - 20 * Math.abs(x - 250) / 250
      createArm(x, y, l, a + 0.2 * dx / 512, w);
    }

    //body
    ctx.fillStyle = 'hsl(120, 100%, 20%)';
    ctx.beginPath();
    ctx.arc(256, 425, 100, Math.PI, 0);
    ctx.fill();

    //eye
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(256, 400, 20, 0, 6.28);
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(cx + eyeDist * Math.cos(eyeAngle), cy + eyeDist * Math.sin(eyeAngle), 10, 0, 6.28);
    ctx.fill();
    

  }
}

app.sketches[2] = new Sketch2();
app.sketches[2].desc = `No matter the appearence of a creature, you can never
be quite sure of it's intentions.`;
