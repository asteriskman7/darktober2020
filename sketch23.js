'use strict';

class Sketch23 extends Sketch {
  draw(ctx, width, height, t) {

    //sky
    ctx.fillStyle = 'hsl(211, 53%, 14%)';
    ctx.fillRect(0, 0, width, height);

    //moon
    ctx.save();
    ctx.fillStyle = 'hsl(29, 66%, 53%)';
    ctx.shadowColor = ctx.fillStyle;
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(width*0.5, height*0.55, 50, 0, 6.28);
    ctx.fill();
    ctx.restore();

    //ground
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0.6*height, width, height);

    //banks
    let nextY = height;
    for (let i = 0; i < 15; i++) {
      ctx.fillStyle = `hsl(${75 + Math.sin(i * 4573 ) * 40}, 80%, 30%)`;
      const p0 = [0, nextY];
      const p1 = [50 + (10 - i) * 5, nextY];
      const p2 = [10 * 25, 0.6 * height];
      const p3 = [0, 0.6 * height];
      ctx.beginPath();
      ctx.moveTo(p0[0], p0[1]);
      ctx.lineTo(p1[0], p1[1]);
      ctx.lineTo(p2[0], p2[1]);
      ctx.lineTo(p3[0], p3[1]);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(width - p0[0], p0[1]);
      ctx.lineTo(width - p1[0], p1[1]);
      ctx.lineTo(width - p2[0], p2[1]);
      ctx.lineTo(width - p3[0], p3[1]);
      ctx.fill();
      nextY -= 10;
    }

    //river
    ctx.fillStyle = 'hsl(201, 63%, 30%)';
    ctx.save();
    ctx.translate(width * 0.5, height * 0.6);
    nextY = 0;
    const step = 2;
    while (nextY <= height * 0.4) {
      const width = nextY + 20;
      const xpos = (-width / 2) + (0.1 * width / 2 ) * Math.sin(width*0.2) ;
      ctx.fillRect(xpos, nextY, width, step);
      nextY += step;
    }
    ctx.restore();

    //trees
    function tree(x, y, h, w) {
      //x,y is the base pos
      ctx.save();
      ctx.translate(x, y-h);
      //center of the tree is x=0
      ctx.fillStyle = 'hsl(39, 74%, 21%)';
      ctx.fillRect(0 - w * 0.05, 0, w * 0.1, h);
      ctx.lineWidth = w * 0.03;
      //80 - 140
      ctx.strokeStyle = `hsl(${110 + 60 * Math.sin(x*y*h*w)}, 74%, 21%)`;
      ctx.beginPath();
      const yStep = 5;
      const count = h / yStep - 5;
      for (let i = 0; i < count; i++) {
        ctx.moveTo(0, i * yStep);
        ctx.lineTo(-w/2, i * yStep + 25);
        ctx.moveTo(0, i * yStep);
        ctx.lineTo(w/2, i * yStep + 25);
      }
      ctx.stroke();
      ctx.restore();
    }

    for (let i = 0; i < 20; i++) {
      const ypos = height * 0.63 + i * 2;
      const xpos = Math.abs((40 + (20 - i) * 6) * Math.sin(i * 3333));
      const h = 150 + Math.sin(i * 2423) * 100;
      const w = 100 + Math.sin(i * 342342) * 20;
      tree(xpos, ypos, h, w);
      tree(width - xpos, ypos, h, w);
    }

    //fog
    ctx.fillStyle = `hsla(201, 100%, 94%, 0.2)`;
    ctx.save();
    ctx.translate(width * 0.5, height * 0.6);
    ctx.beginPath();
    for (let i = 0; i < 20; i++) {
      const xpos = 100 * Math.sin(0.2*t + i * 2432423);
      const ypos = 50+50 * Math.sin(0.2*t*1.3 + i * 23423);
      const r = 50 + 30 * Math.sin(i * 53453);
      ctx.moveTo(xpos, ypos);
      ctx.arc(xpos, ypos, r, 0, 6.28);
    }
    ctx.fill();
    ctx.restore();


  }
}

app.sketches[23] = new Sketch23();
app.sketches[23].desc = `Who knows what specters may materialize out of the fog on a sticky summer night?`;
