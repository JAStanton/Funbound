Polymer('fb-canvas', {
  publish: {
    x: 0,
    y: 0
  },
  ready: function() {
    this.canvas = this.$.canvas;
    this.context = this.canvas.getContext('2d');
    this.canvas.height = this.height || window.innerHeight;
    this.canvas.width = this.width || window.innerWidth;

    // kicking things off.
    this.draw();
  },
  xChanged: function() {
    this.draw();
  },
  yChanged: function() {
    this.draw();
  },
  widthChanged: function(oldValue, newValue) {
    this.canvas.width = newValue;
    this.draw();
  },
  heightChanged: function(oldValue, newValue) {
    this.canvas.height = newValue;
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
