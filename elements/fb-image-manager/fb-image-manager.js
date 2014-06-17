Polymer('fb-image-manager', {
  publish: {
    state: 'ready'
  },
  ready: function() {
    this.staging_ = [];
    this.complete = {};
  },
  preload: function(name, src) {
    this.staging_.push({ name: name, src: src });
    this.async(this.preload_);
  },
  getImage: function(id) {
    return this.complete[id];
  },
  preload_: function() {
    // This could potentially cause a bug if I preload an image then on async
    // preload another. That would suck.
    if (this.state == 'loading') return;

    this.state = 'loading';
    var count = this.staging_.length;
    if(count === 0) {
      this.state = 'ready';
      return;
    }

    var loaded = 0;
    this.staging_.forEach(function(image) {
      var newImgage = new Image();
      // Loaded
      newImgage.onload = function() {
        loaded++;
        if (loaded === count) {
          this.state = 'ready';
        }
        this.fire(image.name + 'Loaded', { image: newImgage });
      }.bind(this);

      // Failed
      newImgage.onabort = function() {
        loaded++;
        if (loaded === count) {
          this.state = 'ready';
        }
      }.bind(this);

      this.complete[image.name] = newImgage;
      // Ready to start loading.
      newImgage.src = image.src;
    }.bind(this));

    this.staging_ = [];
  }
});
