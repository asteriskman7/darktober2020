'use strict';

class Sketch0 extends Sketch {
  draw(ctx) {
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.font = '20px Grandstander';
    ctx.fillStyle = 'orange';
    ctx.fillText('Please select a sketch from the list above', 10, 30);

  }
}

app.sketches[0] = new Sketch0();
app.sketches[0].desc = `-`;
