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
    this.windowResize_();
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
    this.context.save();
    this.context.fillStyle = "rgba(0, 0, 200, 0.5)";
    this.context.fillRect (0, 0, this.width, this.height);
    this.context.restore();

    this.context.drawImage(this.terrain_.canvas, this.terrain_.position.x, this.terrain_.position.y);

    this.context.save();
    this.context.translate(this.player_.position.x, this.player_.position.y);
    this.context.rotate(this.player_.rotationDegree);
    this.context.drawImage(this.player_.canvas, -this.player_.center.x, -this.player_.height / 2);
    this.context.restore();

    if (this.imageManager_.images["bullet"] && this.imageManager_.images["bullet"].image.width > 0) {
      var bullet = this.imageManager_.images["bullet"];
      bullet.draw();
      this.context.drawImage(bullet.canvas, 200, 300);
    }
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
