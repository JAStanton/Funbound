Polymer('fb-layer', {
  width: 0,
  height: 0,
  ready: function() {
    this.canvas = { width: 0, height: 0 };
    this.rotation = 0;
    this.anchor = { x: 0, y: 0 };

    // Canvas position.
    this.x = 0;
    this.y = 0;
    // Center of canvas.
    this.center = new FbMathPoint();
    // Drawing position.
    this.drawPosition = new FbMathPoint();
    // Relative position to anchor.
    this.relativePosition = new FbMathPoint();

    // Velocity
    this.velocity = new FbMathPoint();

    // For when a layer is aprt of a pool.
    this.poolIndex = -1;

    this.canvas = this.$.canvas;
    this.context = this.canvas.getContext('2d');
    this.context.webkitImageSmoothingEnabled = true;
    requestAnimationFrame(this.animate.bind(this));
  },
  rotationChanged: function() {
    this.style.webkitTransform = "rotate(" + this.rotation + "deg)";
  },
  xChanged: function() {
    this.style.left = this.x + "px";
    this.updateRelativePosition();
    this.draw();
  },
  yChanged: function() {
    this.style.top = this.y + "px";
    this.updateRelativePosition();
    this.draw();
  },
  widthChanged: function() {
    this.canvas.width = this.width;
    this.center.x = this.canvas.height / 2;
    this.updateRelativePosition();
    this.draw();
  },
  heightChanged: function() {
    this.canvas.height = this.height;
    this.center.y = this.canvas.height / 2;
    this.updateRelativePosition();
    this.draw();
  },
  updateRelativePosition: function() {
    this.relativePosition.x = this.x + (this.anchor.x / 100 * this.width);
    this.relativePosition.y = this.y + (this.anchor.y / 100 * this.height);
  },
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  draw: function() {
    this.clear();
    for (var i = this.children.length - 1; i >= 0; i--) {
      var layer = this.children[i];
      if (typeof layer.draw == "function") {
        this.context.save();
        layer.draw();
        this.context.restore();
      }
    }
  },
  animate: function() {
    requestAnimationFrame(this.animate.bind(this));
    this.draw();
  },
  setAnchor: function(x, y) {
    this.anchor.x = x * 100;
    this.anchor.y = y * 100;
    this.style.webkitTransformOrigin = this.anchor.x + "% " + this.anchor.y + "%";
  },
});
