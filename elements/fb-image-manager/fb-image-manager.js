Polymer('fb-image-manager', {
  publish: {
    state: 'ready'
  },
  ready: function() {
    this.images_ = {};
  },
  preload: function(images) {
    this.state = 'loading';
    var count = images.length;
    if(count === 0) {
      this.state = 'ready';
      return;
    }

    var loaded = 0;
    images.forEach(function(image) {
      var img = new Image();
      var fbImage = new FbImage("foo");

      // Loaded
      img.onload = function() {
        fbImage.image = img;
        loaded++;
        if (loaded === count) {
          this.state = 'ready';
        }
      }.bind(this);

      // Failed
      img.onabort = function() {
        console.log("ON ABORT");
        loaded++;
        if (loaded === count) {
          this.state = 'ready';
        }
      }.bind(this);

      this.images_[image.name] = fbImage;
      // Ready to start loading.
      img.src = image.src;
    }.bind(this));
  }
});
