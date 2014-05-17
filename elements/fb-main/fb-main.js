Polymer('fb-main', {
  ready: function() {
    this.super();
    this.windowResizeEvt_ = this.windowResize_.bind(this);

    this.terrain_ = new FbTerrain();

    this.draw();
    this.setupEvents_();
  },
  setupEvents_: function() {
    window.addEventListener('resize', this.windowResizeEvt_, false);
  },
  windowResize_: function() {
    this.height = window.innerHeight;
    this.width = window.innerWidth;

    this.terrain_.height = window.innerHeight;
    this.terrain_.width = window.innerWidth;
  },
  draw: function() {
    this.super();
    this.context.drawImage(this.terrain_.canvas, 0, 0);
  },
  detached: function() {
    window.removeEventListener('resize', this.windowResizeEvt_, false);
  },
});
