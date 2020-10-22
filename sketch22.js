'use strict';

class Sketch22 extends Sketch {
  load() {
    super.load();
    //create canvas to store image copy
    this.copyCanvas = document.createElement('canvas');
    this.copyCanvas.width = this.canvas.width;
    this.copyCanvas.height = this.canvas.height;
    this.copyCtx = this.copyCanvas.getContext('2d');
    //clear canvas to prevent image from other sketch from staying
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
  draw(ctx, width, height, t) {

    //store current image 
    this.copyCtx.drawImage(ctx.canvas, 0, 0);
    //clear current image
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);
    const moveSpeed = 2 + Math.sin(t*6);
    //copy image in slightly smaller
    ctx.drawImage(this.copyCanvas, 0, 0, width, height, moveSpeed, moveSpeed, width - 2 * moveSpeed, width - 2 * moveSpeed);

    if (moveSpeed > 1.01) {return;}
    ctx.font = '80px Serif';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillStyle = `hsl(${Math.random() * 70}, 90%, 40%)`;
    const textWidth = ctx.measureText('Nevermore!').width;
    const x = Math.random() * (width - textWidth) + textWidth * 0.5;
    const y = Math.random() * (height - 80) + 40;
    const a = Math.PI * 0.1 * Math.sin(t * 3333);
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(a);
    ctx.fillText('Nevermore!', 0, 0);
    ctx.restore();
  }
}

app.sketches[22] = new Sketch22();
app.sketches[22].desc = `There is far too much termsOfVenery['raven'] in this world.`;
