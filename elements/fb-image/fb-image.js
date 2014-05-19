Polymer('fb-image', {
  image: new Image(),
  ready: function() {
    this.width = this.image.width;
    this.height = this.image.height;
    this.sx = 0;
    this.sy = 0;
    this.swidth = 0;
    this.sheight = 0;

    this.super();
  },
  draw: function() {
    this.super();
    this.context.drawImage(
        this.image,
        this.sx, this.sy,
        this.swidth, this.sheight,
        0, 0,
        this.width, this.height);
  }
});
