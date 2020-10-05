'use strict';

class Sketch5 extends Sketch {
  draw(ctx, width, height, t, mousePoint) {
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = 'brown';
    ctx.fillRect(0, height * 0.62, width, height);

    const colors = {
      rOutline: 'hsl(217, 10%, 43%)',
      rFill: 'hsl(217, 17%, 64%)',
      rFillDark: 'hsl(217, 17%, 50%)',
      bMain: 'hsl(32, 25%, 45%)'
    };

    const drawThroat = () => {
      ctx.strokeStyle = colors.rOutline;

      ctx.fillStyle = colors.rFillDark;
      ctx.fillRect(150, 200, width - 300, 100);
      ctx.strokeRect(150, 200, width - 300, 100);
    };

    const drawHead = () => {
      ctx.save();
      ctx.strokeStyle = colors.rOutline;

      ctx.fillStyle = colors.rFill;

      const toothSize = 15;
      //bottom teeth
      for (let i = 0; i < 7; i++) {
        const x = 150 + 2 * i * toothSize;
        const y = 300 - toothSize;
        ctx.fillRect(x, y, toothSize, toothSize);
        ctx.strokeRect(x, y, toothSize, toothSize);
      }
      //top teeth
      const topY = 150 + 50 * Math.sin(2 * t);
      for (let i = 0; i < 7; i++) {
        const x = 150 + 2 * i * toothSize + toothSize;
        const y = topY + 100;
        ctx.fillRect(x, y, toothSize, toothSize);
        ctx.strokeRect(x, y, toothSize, toothSize);
      }
      //bottom mouth
      ctx.fillRect(150, 300, width - 300, 100);
      ctx.strokeRect(150, 300, width - 300, 100);
      //top mouth
      ctx.fillRect(150, topY, width - 300, 100);
      ctx.strokeRect(150, topY, width - 300, 100);
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(256 - 50, topY + 50, 10, 0, 6.28);
      ctx.arc(256 + 50, topY + 50, 10, 0, 6.28);
      ctx.fill();
      const eyeX = 5 * Math.sin(t) * Math.sin(t);
      ctx.fillStyle = 'black';
      ctx.beginPath();
      ctx.arc(256 - 50 - eyeX, topY + 55, 5, 0, 6.28);
      ctx.arc(256 + 50 - eyeX, topY + 55, 5, 0, 6.28);
      ctx.fill();

      ctx.restore();
    };

    const drawBelt = () => {
      ctx.save();
      ctx.strokeStyle = colors.bMain;
      ctx.lineWidth = 20;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(0, 400);
      ctx.lineTo(150, 300);
      ctx.lineTo(300, 300);
      ctx.stroke();
      ctx.restore();
    };


    const people = ['\u{1f3c3}', '\u{1f3c3}\u{200d}\u{2640}\u{fe0f}', '\u{1f483}', '\u{1f57a}']
    if (this.people === undefined) {
      this.people = [];
    }
    if (this.blood === undefined) {
      this.blood = [];
    }

    while (this.people.length < 10) {
      const minT = this.people.reduce( (acc, e) => Math.min(acc, e.t), Infinity);
      const newPerson = {
        char: people[Math.floor(Math.random() * people.length)],
        t: this.people.length === 0 ? 5 : minT - 2,
        dead: false
      }
      this.people.push(newPerson);
    }

    const drawPeople = () => {
      ctx.font = '30px Arial';
      this.blood.forEach( v => {
        ctx.fillStyle = `hsla(${v.h}, 87%, 40%, ${1 - v.t / 10})`;
        ctx.beginPath();
        ctx.arc(v.x, v.y, v.r, 0, 6.28);
        v.t += 0.033;
        ctx.fill();
        ctx.strokeStyle = `hsla(${v.h}, 87%, 30%, ${(1 - v.t / 10) * 0.5})`;
        ctx.beginPath();
        ctx.arc(v.x, v.y, v.r, 0, 6.28);
        v.t += 0.033;
        ctx.stroke();
      });

      ctx.fillStyle = 'red';
      const topY = 150 + 50 * Math.sin(2 * t);
      this.people.forEach( v => {
        if (topY < 160) {
          v.t += 0.033;
        }
        const x = 0 + 20 * v.t;
        const y = Math.max(280, 390 - 13 * v.t);
        ctx.fillText(v.char, x, y);
        if (y === 280 && topY > 195) { 
          for (let i = 0; i < 1; i++) {
            this.blood.push({x: x - 40 + 80 * Math.random(), 
              y: y - 40 * Math.random(), 
              t: 0, h: Math.random() * 8,
              r: 5 + 20 * Math.random()});
          }
        }
        if (x > width * 0.5 && topY > 180) {
          v.dead = true;
        }
      });


      this.people = this.people.filter( v => !v.dead );
      this.blood = this.blood.filter( v => v.t < 10);
    };

    drawThroat();
    drawBelt();
    drawPeople();
    drawHead();

  }
}

app.sketches[5] = new Sketch5();
app.sketches[5].desc = `Can a robot be evil?`;
