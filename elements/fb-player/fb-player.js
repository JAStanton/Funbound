Polymer('fb-player', {
  observe: {
    'mouse_.position.x': 'updateRotationDegree_',
    'mouse_.position.y': 'updateRotationDegree_',
  },
  ready: function() {
    this.mouse_ = document.getElementById("fb-mouse");

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
    this.context.fillStyle = "#FF0000";
    this.context.fillRect(0, 0, this.width, this.height);
  }
});
