Polymer('fb-terrain', {
  publish: {
    displace: 4,
    roughness: 0.6
  },
  draw: function() {
    this.super();
    var terPoints = this.generateMap_(this.displace, this.roughness);
    // draw the points
    this.context.beginPath();
    this.context.moveTo(0, terPoints[0]);
    for (var t = 1; t < terPoints.length; t++) {
      this.context.lineTo(t, terPoints[t]);
    }
    // finish creating the rect so we can fill it
    this.context.lineTo(this.canvas.width, this.canvas.height);
    this.context.lineTo(0, this.canvas.height);
    this.context.closePath();
    this.context.fill();
  },

  /*
   * http://www.somethinghitme.com/2013/11/11/simple-2d-terrain-with-midpoint-displacement/
   */
  generateMap_: function(displace, roughness) {
    var width = this.canvas.width;
    var height = this.canvas.height;
    displace = height / displace;
    var points = [];
    // Gives us a power of 2 based on our width
    var power = Math.pow(2, Math.ceil(Math.log(width) / (Math.log(2))));

    // Set the initial left point
    points[0] = height / 2 + (Math.random() * displace * 2) - displace;
    // set the initial right point
    points[power] = height / 2 + (Math.random() * displace * 2) - displace;
    displace *= roughness;

    // Increase the number of segments
    for (var i = 1; i < power; i *= 2) {
      // Iterate through each segment calculating the center point
      for (var j = (power / i) / 2; j < power; j += power / i) {
        points[j] = ((points[j - (power / i) / 2] + points[j + (power / i) / 2]) / 2);
        points[j] += (Math.random() * displace * 2) - displace
      }
      // reduce our random range
      displace *= roughness;
    }
    return points;
  }
});
