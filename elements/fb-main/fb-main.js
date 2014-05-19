Polymer('fb-main', {
  observe: {
    'imageManager_.state': 'imageManagerStateChange'
  },
  imageManagerStateChange: function(oldValue, newValue) {
    console.log("imageManagerStateChange", oldValue, newValue);
  },
  ready: function() {
    this.windowResizeEvt_ = this.windowResize_.bind(this);
    this.mouse_ = document.getElementById("fb-mouse");
    this.imageManager_ = document.getElementById("fb-image-manager");

    this.imageManager_.preload([{
      name: "bullet",
      src: "/static/images/bullet.png"
    },{
      name: "explosion",
      src: "/static/images/explosion.png"
    }]);

    this.terrain_ = new FbTerrain();
    this.player_ = new FbPlayer();
    this.player_.setAttribute("mouse-model", "fb-mouse");
    this.player_.position.x = 100;
    this.player_.position.y = 100;

    this.super(); // this will call draw once so prepare for that.
    // Start polling for changings. Events are slow... ~120ms vs browser frame rate.
    requestAnimationFrame(this.animate.bind(this));
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
  // Inspiration for rotation http://jsfiddle.net/FWvYg/
  draw: function() {
    this.super();
    this.context.drawImage(this.terrain_.canvas, this.terrain_.position.x, this.terrain_.position.y);

    this.context.save();
    this.context.translate(this.player_.position.x, this.player_.position.y);
    this.context.rotate(this.player_.rotationDegree);
    this.context.drawImage(this.player_.canvas, -this.player_.center.x, -this.player_.height / 2);
    this.context.restore();
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
