Polymer('fb-image', {
  image: new Image(),
  ready: function() {
    this.width = 32;
    this.height = 32;
    this.sx = 0;
    this.sy = 0;
    this.swidth = 0;
    this.sheight = 0;

    this.super();
  },
  draw: function() {
    this.super();
    this.context.drawImage(
        this.image, 0, 0, 32, 32);
        // this.sx, this.sy,
        // this.swidth, this.sheight,
        // 0, 0,
        // this.width, this.height);
  }
});
