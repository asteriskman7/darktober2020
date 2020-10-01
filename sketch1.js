'use strict';

class Sketch1 extends Sketch {
  draw(ctx, width, height, t) {
    const rows = 10;
    const rowHeight = height / (2 * rows);
    const tPercent = ((10 * t) % rowHeight) / rowHeight;
    for (let i = 0; i < rows; i++) {
      ctx.fillStyle = `hsl(0, 0%, ${0.3*(100 - 100 * (i - tPercent) / (rows-1))}%)`;
      ctx.fillRect(0, -((10 * t) % rowHeight) + i * rowHeight + 1, width, rowHeight);
      ctx.fillRect(0, ((10 * t) % rowHeight) + height - (i+1) * rowHeight, width, rowHeight);
    }
  }
}

app.sketches[1] = new Sketch1();
app.sketches[1].desc = `Walking slowly into a dark corridor.`;
