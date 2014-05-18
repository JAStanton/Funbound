Polymer('fb-main', {
  ready: function() {
    this.windowResizeEvt_ = this.windowResize_.bind(this);
    this.terrain_ = new FbTerrain();
    this.player_ = new FbPlayer();

    this.super(); // this will call draw once so prepare for that.
    // Start polling for changings. Events are slow... ~120ms vs browser frame rate.
    requestAnimationFrame(this.animate.bind(this));
  },
  setupEvents_: function() {
    window.addEventListener('resize', this.windowResizeEvt_, false);
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

    this.context.drawImage(this.terrain_.canvas, this.terrain_.x, this.terrain_.y);
    this.context.drawImage(this.player_.canvas, this.player_.x, this.player_.y);
  },
  animate: function() {
    requestAnimationFrame(this.animate.bind(this));
    this.player_.animate();
    this.super();
  },
  detached: function() {
    window.removeEventListener('resize', this.windowResizeEvt_, false);
  },
});
