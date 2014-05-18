Polymer('fb-main', {
  ready: function() {
    this.super();
    this.windowResizeEvt_ = this.windowResize_.bind(this);

    this.terrain_ = new FbTerrain();
    this.player_ = new FbPlayer();

    this.draw();
    this.setupEvents_();
  },
  setupEvents_: function() {
    window.addEventListener('resize', this.windowResizeEvt_, false);
    this.player_.addEventListener('update', this.draw.bind(this));
  },
  windowResize_: function() {
    this.height = window.innerHeight;
    this.width = window.innerWidth;

    this.terrain_.height = window.innerHeight;
    this.terrain_.width = window.innerWidth;
  },
  draw: function() {
    this.super();
    this.context.drawImage(this.terrain_.canvas, this.terrain_.x, this.terrain_.y);
    this.context.drawImage(this.player_.canvas, this.player_.x, this.player_.y);
  },
  detached: function() {
    window.removeEventListener('resize', this.windowResizeEvt_, false);
  },
});
