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
  },
  xChanged: function() {
    this.update();
  },
  yChanged: function() {
    this.update();
  },
  widthChanged: function(oldValue, newValue) {
    this.canvas.width = newValue;
    this.update();
  },
  heightChanged: function(oldValue, newValue) {
    this.canvas.height = newValue;
    this.update();
  },
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  draw: function() {
    this.clear();
  },
  update: function() {
    this.fire('update');
    this.draw();
  }
});
