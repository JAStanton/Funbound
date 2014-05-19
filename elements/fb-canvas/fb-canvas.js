Polymer('fb-canvas', {
  observe: {
    'position.x': 'xChanged',
    'position.y': "yChanged",
  },
  ready: function() {
    this.position = new FbMathPoint();
    this.center = new FbMathPoint();

    this.canvas = this.$.canvas;
    this.context = this.canvas.getContext('2d');
    this.context.webkitImageSmoothingEnabled = true;

    this.canvas.height = this.height || window.innerHeight;
    this.canvas.width = this.width || window.innerWidth;
    this.center.x = this.canvas.height / 2;
    this.center.y = this.canvas.width / 2;
    this.rotationalDegree = 0;

    // kicking things off.
    this.draw();
  },
  xChanged: function(old, newValue) {
    this.position.x = newValue;
    this.draw();
  },
  yChanged: function(old, newValue) {
    this.position.y = newValue;
    this.draw();
  },
  widthChanged: function(oldValue, newValue) {
    this.canvas.width = newValue;
    this.center.x = this.canvas.height / 2;

    this.draw();
  },
  heightChanged: function(oldValue, newValue) {
    this.canvas.height = newValue;
    this.center.y = this.canvas.width / 2;
    this.draw();
  },
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  draw: function() {
    this.clear();
    // implement your thing here.
  },
  animate: function() {
    this.draw();
  }
});
