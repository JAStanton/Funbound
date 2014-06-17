Polymer('fb-main', {
  ready: function() {
    // Root canvas needs to be full width
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    // Load constants.
    this.constants_ = document.getElementById('fb-constants');

    // setup mouse events
    this.mouse_ = document.getElementById('fb-mouse');
    this.mouse_.subscribe("mousemove", this.mouseUpdate_.bind(this));

    // Load some images
    this.imageManager_ = document.getElementById('fb-image-manager');
    this.imageManager_.preload('bullet', '/static/images/bullet.png');
    this.imageManager_.preload('ground', '/static/images/ground.png');

    // Timestamp of last bullet shot, for staggering firing.
    this.lastBulletShotAt_ = 0;

    // Setup canvas, defaults, render loop.
    this.super();

    // Add the stage layer.
    this.stage = new FbStage();
    this.stage.backgroundColor = 'rgba(51, 113, 195, 0.8)';
    this.stage.width = this.width;
    this.stage.height = this.height;
    this.appendChild(this.stage);

    // Add our trajectory layer.
    this.trajectory = new FbTrajectory();
    this.trajectory.width = this.width;
    this.trajectory.height = this.height;
    this.appendChild(this.trajectory);

    // Add our gun layer.
    this.gun = new FbImage();
    this.gun.x = 50;
    this.gun.y = this.height - 100;
    this.gun.imageId = 'bullet';
    this.gun.setAnchor(0.5, 0.5);
    this.appendChild(this.gun);

    this.trajectory.drawPosition = this.gun.relativePosition;

    // Add our ground layer.
    this.ground = new FbImage();
    this.ground.x = 0;
    this.ground.y = this.height - 32;
    this.ground.repetition = 'repeat-x';
    this.ground.width = this.width; // this will need to be responsive.
    this.ground.imageId = 'ground';
    this.appendChild(this.ground);

    // Create a pool of bullets
    this.bulletPool = new FbPool();
    this.bulletPool.init(function() {
      var bullet = new FbImage();
      bullet.imageId = 'bullet';
      bullet.setAnchor(0.5, 0.5);
      return bullet;
    }.bind(this), function(bullet, index) {
      bullet.alive = true;
      bullet.poolIndex = index;
      bullet.drawPosition = this.gun.relativePosition;
      bullet.rotation = this.gun.rotation;
      bullet.velocity.x = Math.cos(bullet.rotation) * this.constants_.bulletSpeed;
      bullet.velocity.y = Math.sin(bullet.rotation) * this.constants_.bulletSpeed;
      if (!this.contains(bullet)) {
        this.appendChild(bullet);
      }

      setTimeout(function(bullet) {
        this.bulletPool.discard(bullet.poolIndex);
        bullet.alive = false;
      }.bind(this, bullet), 1000);

    }.bind(this));
  },
  animate: function() {
    // I should also be binding on mousedown event to fire right away in stead
    // of just checking every frame if mouse is down but **shrugs**.
    if (this.mouse_.isDown) {
      this.shootBullet_();
    }
    this.super();
  },
  shootBullet_: function() {
    if (this.lastBulletShotAt_ === undefined) this.lastBulletShotAt_ = 0;
    if (new Date().getTime() - this.lastBulletShotAt_ < this.constants_.shotDelay) return;
    this.lastBulletShotAt_ = new Date().getTime();
    this.bulletPool.create();
    this.bulletPool.forEach(function(bullet) {
      bullet.rotation = Math.atan2(bullet.velocity.y, bullet.velocity.x) * (180 / Math.PI) - 180;
      console.log(bullet.rotation);
    }, this);

  },
  mouseUpdate_: function() {
    var angle = this.gun.relativePosition.getAngleTo(this.mouse_.relativePosition);
    this.gun.rotation = (angle * (180 / Math.PI) - 180);
    this.trajectory.theta = angle * -1 - Math.PI;
  }
});
