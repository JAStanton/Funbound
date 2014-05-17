Polymer('fb-canvas', {
  ready: function() {
    this.canvas = this.$.canvas;
    this.context = this.canvas.getContext('2d');
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
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
  }
});
