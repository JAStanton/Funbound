Polymer('fb-stage', {
  publish: {
    backgroundColor: "rgba(0, 0, 0, 0)"
  },
  draw: function() {
    this.super();
    this.context.fillStyle = this.backgroundColor;
    this.context.fillRect(0, 0, this.width, this.height);
  }
});
