Polymer('fb-trajectory', {
  marchSpeed: 20,  // Smaller is faster
  timeOffset: 0,
  ready: function() {
    this.constants_ = document.getElementById('fb-constants');
    this.super();
    this.theta = 0;
    this.rotate = 0;
    this.cvs = document.createElement("canvas");
    this.ctx = this.cvs.getContext("2d");
    this.ctx.fillStyle = "rgba(255,255,255,255.4)"
  },
  psuedoImage: function(rotate) {
    this.ctx.clearRect(0, 0, 100, 100);
    this.ctx.save();
    this.ctx.rotate(rotate);
    this.ctx.fillRect(0, 0, 10, 2);
    this.ctx.restore();
  },
  draw: function() {
    this.super();
    this.timeOffset += 1;
    this.timeOffset %= this.marchSpeed;
    for(var t = 0 + this.timeOffset / (1000 * this.marchSpeed / 60); t < 3; t += 0.03) {
        x = this.constants_.bulletSpeed * t * Math.cos(this.theta) ;
        y = this.constants_.bulletSpeed * t * Math.sin(this.theta) - 0.5 * this.constants_.gravity * t * t;
        this.psuedoImage(Math.atan2(y, x));
        this.context.drawImage(this.cvs, this.drawPosition.x + x, this.drawPosition.y-y);
    }
  }
});
