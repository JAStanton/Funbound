Polymer('fb-terrain', {
  ready: function() {
    this.super();
    this.draw();
  },
  draw: function() {
    this.super();

    var centerX = this.width / 2;
    var centerY = this.height / 2;
    var radius = 70;

    this.context.beginPath();
    this.context.arc(radius + 10, radius + 30, radius, 0, 2 * Math.PI, false);
    this.context.fillStyle = 'green';
    this.context.fill();
    this.context.lineWidth = 2;
    this.context.strokeStyle = '#003300';
    this.context.stroke();
  }
});
