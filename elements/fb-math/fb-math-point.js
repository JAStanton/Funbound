Polymer('fb-math-point', {
  x: 0,
  y: 0,
  offset: function(point) {
    var offsetPosition = new FbMathPoint();
    offsetPosition.x = this.x - point.x;
    offsetPosition.y = this.y - point.y;
    return offsetPosition;
  },
  getAngleTo: function(point) {
    var deg = -Math.atan2(-this.y + point.y, this.x - point.x) * 180 / Math.PI;
    return deg %= 360;
  },
});
