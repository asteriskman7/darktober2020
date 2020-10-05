'use strict';

class Sketch3 extends Sketch {
  draw(ctx, width, height, t) {
    ctx.fillStyle = 'hsl(220,50%,24%)';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0.65*height, width, height);

    const theta = 5 + -t % 5;
    //const theta = 5;

    const order = theta < 2.5 ? [0, 1] : [1, 0];

    order.forEach( type => {
      switch (type) {
        case 0:
          ctx.save();
          ctx.font = '250px Arial';
          ctx.textBasline = 'bottom';
          
          const trees = ['\u{1f332}', '\u{1f333}'];

          ctx.fillText(trees[0], 20, 0.75 * height);
          ctx.fillText(trees[1], width - 220, 0.75 * height);
          ctx.restore();
          break;
        case 1:
          ctx.save();
          const gc = '\u{1f47b}';
          ctx.textAlign = 'center';

          //75 when theta = 5
          //100 when theta = 0;
          const fontSize = 50 + Math.pow(5-theta,4) * 445 / Math.pow(5, 4);
          ctx.font = `${fontSize}px Arial`;
          const ghostAlpha = 0.1 + 0.9 * (5-theta)/5;
          ctx.fillStyle = `hsla(0,0%,0%,${ghostAlpha})`;

          for (let i = 0; i < 3; i++) {
            ctx.fillText(gc, width * 0.5 + 200 * Math.sin(0.5 * t + i), 400 + 10 * Math.sin(t + i*9));
          }
          ctx.restore();
          break;
      }
    });


    //draw eyelids
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(-1, -1);
    ctx.lineTo(width+1, -1);
    ctx.lineTo(width+1, height*0.5);
    ctx.lineTo(-1, height*0.5);
    ctx.lineTo(-1, -1);
    ctx.moveTo(width * 0.5, height * 0.5);
    //2c = 2rsin(theta/2)
    //2c = width
    //width = 2r sin(theta/2)
    //width / 2sin(theta/2) =r
    //const theta = Math.PI * Math.sin(t) * Math.sin(t);
    const r = 0.5 * width / Math.sin(theta * 0.5);
    const h = r * Math.cos(theta * 0.5);
    //theta = 0 => minAngle = 3pi/2
    //theta = pi => minAngle = pi
    let minAngle = 3 * Math.PI * 0.5 - theta * 0.5;
    //theta = 0 => maxAngle = 3pi/2
    //theta = pi -> maxAngle = 2*pi
    let maxAngle = 3 * Math.PI * 0.5 + theta * 0.5;
    ctx.arc(width*0.5, width*0.5 + h, r, minAngle, maxAngle);
    ctx.fill('evenodd');

    ctx.beginPath();
    ctx.moveTo(width+1, height+1);
    ctx.lineTo(-1, height+1);
    ctx.lineTo(-1,height*0.5);
    ctx.lineTo(width+1,height*0.5);
    ctx.lineTo(width+1,height+1);
    ctx.moveTo(width * 0.5, height * 0.5);
    //theta = 0 => pi/2
    //theta = pi => 0
    minAngle = Math.PI * 0.5 - theta * 0.5;
    maxAngle = Math.PI * 0.5 + theta * 0.5;
    ctx.arc(width*0.5, width*0.5 - h, r, minAngle, maxAngle);

    ctx.fill('evenodd');
  }
}

app.sketches[3] = new Sketch3();
app.sketches[3].desc = `It's been a long night but don't fall asleep yet!`;
