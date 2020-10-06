'use strict';

class Sketch6 extends Sketch {
  draw(ctx, width, height, t) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);
    const green = 'hsl(112, 100%, 50%)';

    ctx.strokeStyle = green;
    ctx.shadowColor = green;
    ctx.fillStyle = green;
    ctx.shadowBlur = 20;
    ctx.lineWidth = 4;

    const pi = Math.PI;
    const pi2 = Math.PI * 2;
    const pi_2 = Math.PI * 0.5;
    const pi_4 = Math.PI * 0.25;

    function square(s, a) {
      ctx.save();
      ctx.rotate(a);
      ctx.beginPath();
      ctx.moveTo(-s, -s);
      ctx.lineTo(s, -s);
      ctx.lineTo(s, s);
      ctx.lineTo(-s, s);
      ctx.lineTo(-s, -s);
      ctx.stroke();
      ctx.restore();
    }

    function circle(r, moveAngle, moveDist) {
      const x = moveDist * Math.cos(moveAngle);
      const y = moveDist * Math.sin(moveAngle);
      ctx.beginPath();
      ctx.arc(x, y, r, 0, pi2);
      ctx.stroke();
    }

    function char(font, r, angle, s, dx, dy) {
      ctx.save();
      ctx.font = font;
      const x = r * Math.cos(angle);
      const y = r * Math.sin(angle);
      ctx.translate(x, y);
      ctx.rotate(angle + pi_2);
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.fillText(s, dx|0, dy|0);
      ctx.restore();
    }

    //make center of canvas 0,0
    ctx.translate(width*0.5, height*0.5);

    //outer circle
    circle(200, 0, 0);

    square(50, t);
    const as1 = 1.6*t;
    const as2 = 1.3*t
    square(100, as2);
    square(100, as1 + pi_4);

    circle(20, as1, 100);
    circle(20, as1 + pi_2, 100);
    circle(20, as1 + pi, 100);
    circle(20, as1 + 3 * pi_2, 100);

    circle(5, as2 + pi_4, 120);
    circle(5, as2 + pi_4 + pi_2, 120);
    circle(5, as2 + pi_4 + pi, 120);
    circle(5, as2 + pi_4 + 3 * pi_2, 120);

    circle(25, 0, 0);

    square(50, -t);

    circle(140, 0, 0);

    char('70px Arial', 0, t, '\u{26e7}', 0, 7);

    //const spell = 'helloworld'.split``; //['\u{024A}'];
    const spell = [];
    for (let i = 68617; i <= 68660; i+=3) {
      spell.push(String.fromCharCode(i));
    }

    spell.forEach( (v, i) => {
      const angle = pi2 * i / spell.length - 0.8*t;
      char('40px Arial', 168, angle, v);
    });

  }
}

app.sketches[6] = new Sketch6();
app.sketches[6].desc = `Magic allows the caster to use words and symbols
to control the physical world. How is this different than programming?`;
