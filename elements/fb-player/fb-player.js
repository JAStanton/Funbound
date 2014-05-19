Polymer('fb-player', {
  ready: function() {
    this.mouse_ = document.getElementById("fb-mouse");
    this.mouse_.subscribe(this.updateRotationDegree_.bind(this));

    this.width = 100;
    this.height = 100;

    this.super();
  },
  updateRotationDegree_:  function() {
    var relativePos = this.mouse_.getPosition(this.center);
    this.rotationDegree = this.center.getAngleTo(relativePos);
  },
  draw: function() {
    this.super();
    this.context.fillStyle = "rgb(200,0,0)";
    this.context.fillRect(0, 0, this.width, this.height);
  }
});
