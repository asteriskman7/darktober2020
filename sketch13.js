'use strict';

class Sketch13 extends Sketch {
  draw(ctx, width, height, t) {

    const colors = {
      arch: 'hsl(48, 100%, 57%)',
      portal: `hsla(260, 100%, 55%, ${0.5 + 0.1 * Math.sin(t*2)})`,
      ground: 'green',
      sky: 'hsl(181,100%, 81%)',
    };

    if (this.people === undefined) {
      this.people = [];
    }

    if (Math.random() > 0.99 || this.people.length === 0) {
      const p = {
        x: width,
        y: 423,
        img: Math.floor(Math.random() * 2),
        alive: true
      };
      this.people.push(p);
    }
    function arch(dir) {
      ctx.save();
      ctx.strokeStyle = colors.arch;
      ctx.lineWidth = 20;
      ctx.translate(width*0.5, 150);
      ctx.beginPath();
      ctx.moveTo(-dir, 0);
      for (let x = 0; x < 100; x += 10) {
        const y = 0.035 * x * x;
        ctx.lineTo(dir * x, y);
      }
      ctx.stroke();
      ctx.restore();
    }

    //draw background
    ctx.fillStyle = colors.sky;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = colors.ground;
    ctx.fillRect(0, 400, width, height);
    //draw back of arch
    arch(-1);
    //draw humans
    const peopleChars = ['\u{1f3c3}', '\u{1f3c3}\u{200d}\u{2640}\u{fe0f}', '\u{1f404}'];
    ctx.font = '50px Arial';
    this.people.forEach( v => {
      if (v.img < 2) {
        v.x -= 2;
        if (v.x < width * 0.45) {
          v.img = 2;
        } else {
          ctx.fillText(peopleChars[v.img], v.x, v.y);
        }
      }
    });
    //draw portal
    ctx.save();
    ctx.fillStyle = colors.portal;
    ctx.translate(width*0.5, 150);
    ctx.beginPath();
    ctx.moveTo(-90, 0.035 * -90 * -90);
    for (let x = -90; x < 100; x += 10) {
      const y = 0.035 * x * x;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(-90, 0.035 * -90 * -90);
    ctx.fill();
    ctx.restore();
    //draw zombies
    this.people.forEach( v => {
      if (v.img < 2) {return;}
      v.x -= 1;
      ctx.fillText(peopleChars[v.img], v.x, v.y);
      if (v.x < -50) {
        v.alive = false;
      }
    });
    this.people = this.people.filter( v => v.alive);
    //draw front of arch
    arch(1);
    //draw bait
    ctx.font = '30px Arial';
    const burger = '\u{1f354}';
    ctx.fillText(burger, 170 + 5 * Math.sin(t), 370 + 5 * Math.sin(1.3 * t + 3333));
    ctx.fillText(burger, 145 + 5 * Math.sin(1.3*t + 7777), 370 + 5 * Math.sin(t));
    ctx.fillText(burger, 155 + 5 * Math.sin(t + 7777), 345 + 5 * Math.sin(1.3*t + 9999));

  }
}

app.sketches[13] = new Sketch13();
app.sketches[13].desc = `You live in a world where you are lead around by your brain stem.
If you don't use your higher brain functions, you will 
become someone else's dinner.`;
