'use strict';

class Sketch19 extends Sketch {
  draw(ctx, width, height, t) {
    ctx.clearRect(0, 0, width, height);
    ctx.font = '20px Grandstander';
    ctx.fillStyle = 'orange';

    if (this.state === undefined) {
      this.state = 'requested';
      fetch('http://ip-api.com/json/')
        .then(response => response.json())
        .then(data => {
          this.state = 'received';
          this.data = data;
          console.log(data);
        })
        .catch( (error) => {
          this.state = 'failed';
          console.log(error);
        });
    }

    switch (this.state) {
      case 'requested':
        ctx.fillText("Checking your cloaked status.", 10, 30);
        console.log('requested');
        break;
      case 'received':
        ctx.fillText("You are not cloaked!", 10, 30);
        const fields = [
          {name: 'country'},
          {name: 'regionName', display: 'region'},
          {name: 'city'},
          {name: 'zip', display: 'zip code'},
          {name: 'lat'},
          {name: 'lon'}
        ];
        let nextY = 60;
        fields.forEach( v => {
          const val = this.data[v.name];
          if (val === undefined) { return; }
          ctx.fillText(`${v.display === undefined ? v.name : v.display}: ${val}`, 10, nextY);
          nextY += 30;
        });
        break;
      case 'failed':
        ctx.fillText("Looks like you're cloaked.", 10, 30);
        ctx.fillText("You're probably using an adblocker. \u{1f622}", 10, 60); 
        break;
    }

  }
}

app.sketches[19] = new Sketch19();
app.sketches[19].desc = `Not using an ad-blocker can be scary. If you aren't,
you'll see some info about your location that's trivial for any website to find.`;
