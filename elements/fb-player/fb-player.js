Polymer('fb-player', {
  ready: function() {
    this.width = 25;
    this.height = 25;
    this.rotation_ = 0;
    this.super();
  },
  draw: function() {
    this.super();
    this.context.save();
    this.context.translate(this.width / 2, this.height / 2);
    this.context.rotate(this.rotation_++ * Math.PI/180);
    this.context.fillStyle = "#FF0000";
    this.context.fillRect(0, 0, this.width, this.height);
    this.context.restore();
  }
});
