'use strict';

class Sketch11 extends Sketch {
  draw(ctx, width, height, t) {
    ctx.save();
    ctx.fillStyle = 'hsl(211, 46%, 32%)';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = 'hsl(130, 55%, 26%)';
    ctx.fillRect(0, 0.6 * height, width, 0.4 * height);

    ctx.font = '190px Arial';
    ctx.filter = 'blur(6px)';
    ctx.fillText('\u{1f333}', -50, 400);
    ctx.fillText('\u{1f3d8}\u{FE0F}', 300, 450);
    ctx.fillText('\u{1f329}\u{FE0F}', 20, 150);
    ctx.fillText('\u{1f326}\u{FE0F}', 250, 140);

    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;

    ctx.filter = '';

    if (this.drips === undefined) {
      this.drips = [];

      for (let i = 0; i < 50; i++) {
        const newDrip = {
          x: Math.floor(Math.random() * width),
          y: Math.floor(Math.random() * height),
          r: 2 * (8 + Math.floor(5 * Math.random())),
          speed: 0.1 + 0.5 * Math.random()
        };
        this.drips.push(newDrip);
      }
    }

    function coordToIndex(x, y, w) {
      x = x < 0 ? 0 : (x >= w ? w - 1 : x);
      y = y < 0 ? 0 : (y >= w ? w - 1 : y);
      return 4 * x + 4 * w * y;
    }

    this.drips.forEach( v => {
      const dripSize = v.r;
      const newImg = ctx.createImageData(dripSize, dripSize);
      const newPixels = newImg.data;

      const dripX = v.x;
      const dripY = Math.round(v.y);

      for (let y = 0; y < dripSize; y++) {
        for (let x = 0; x < dripSize; x++) {
          const pixelIndex = coordToIndex(x, y, dripSize);
          //if distance from center is greater than dripSize / 2 just map to pixel below
          const u = x - dripSize / 2;
          const v = y - dripSize / 2;
          let srcx;
          let srcy;
          const d2 = u * u + v * v;

          if (d2 > (dripSize * dripSize / 4)) {
            srcx = dripX + x;
            srcy = dripY + y;
          } else {
            const a = Math.atan2(v, u);
            const dp = Math.sqrt(d2);
            const d = dp * dp * 2;
            srcx = dripX + dripSize / 2 + Math.round(d * Math.cos(a)) ;
            srcy = dripY + dripSize / 2 - Math.round(d * Math.sin(a));
          }
          const srcIndex = coordToIndex(srcx, srcy, width);
          newPixels[pixelIndex + 0] = pixels[srcIndex + 0];
          newPixels[pixelIndex + 1] = pixels[srcIndex + 1];
          newPixels[pixelIndex + 2] = pixels[srcIndex + 2];
          newPixels[pixelIndex + 3] = 255;
        }
      }

      ctx.putImageData(newImg, dripX, dripY);
      v.y += v.speed;
      if (v.y > width + v.r) {
        v.y = -v.r;
      }
    });


    if (Math.random() > 0.98) {
      ctx.fillStyle = 'hsla(61, 100%, 95%, 0.9)';
      ctx.fillRect(0, 0, width, height);
    }

    ctx.restore();

  }
}

app.sketches[11] = new Sketch11();
app.sketches[11].desc = `Who knows what midnight lightning will awaken?`;
