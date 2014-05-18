Polymer('fb-player', {
  ready: function() {
    this.width = 25;
    this.height = 25;
    this.super();
    this.draw();
    setInterval(function() {
      this.x++;
      this.y++;
    }.bind(this), 10);
  },
  draw: function() {
    this.super();
    this.context.fillStyle = "#FF0000";
    this.context.fillRect(0, 0, this.width, this.height);
  }
});
