Polymer('fb-player', {
  ready: function() {
    this.mouse_ = document.getElementById("fb-mouse");

    this.width = 100;
    this.height = 100;

    this.super();
  },
  draw: function() {
    this.super();
    this.context.save();
    var relativePos = this.mouse_.getPosition(this.position);

    this.context.translate(this.c.x, this.c.y);
    var degree = this.c.getAngleTo(relativePos);
    this.context.rotate(degree * Math.PI/180);
    this.context.fillStyle = "#FF0000";
    this.context.fillRect(-this.c.x, -this.c.y, this.width, this.height);
    this.context.restore();
  }
});
