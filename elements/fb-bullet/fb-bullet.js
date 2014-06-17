Polymer('fb-bullet', {
  ready: function() {
    this.constants_ = document.getElementById('fb-constants');
    this.super();
    this.theta = 0;
  },
  draw: function() {
    this.super();
    for(var t = 0; t < 3; t += 0.03) {
        x = this.constants_.bulletSpeed * t * Math.cos(this.theta) ;
        y = this.constants_.bulletSpeed * t * Math.sin(this.theta) - 0.5 * this.constants_.gravity * t * t;

    }
  }
});
