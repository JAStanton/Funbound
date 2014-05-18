Polymer('fb-canvas', {
  publish: {
    x: 0,
    y: 0
  },
  ready: function() {
    this.position = new FbMathPoint();
    this.c = new FbMathPoint();

    this.canvas = this.$.canvas;
    this.context = this.canvas.getContext('2d');
    this.canvas.height = this.height || window.innerHeight;
    this.canvas.width = this.width || window.innerWidth;
    this.cx = this.canvas.height / 2;
    this.cy = this.canvas.width / 2;
    this.c.x = this.canvas.height / 2;
    this.c.y = this.canvas.width / 2;

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
    this.cx = this.canvas.width / 2;
    this.c.x = this.canvas.height / 2;

    this.draw();
  },
  heightChanged: function(oldValue, newValue) {
    this.canvas.height = newValue;
    this.cy = this.canvas.height / 2;
    this.c.y = this.canvas.width / 2;

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
