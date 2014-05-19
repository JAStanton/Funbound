Polymer('fb-mouse', {
  ready: function() {
    this.eventSubscriptions_ = [];
    this.position = new FbMathPoint();
    this.mouseMoveEvt_ = this.setPosition.bind(this),

    window.addEventListener("mousemove", this.mouseMoveEvt_, false);
  },
  subscribe: function(callback) {
    this.eventSubscriptions_.push(callback);
  },
  informSubscribers: function() {
    this.eventSubscriptions_.forEach(function(subscription) {
      subscription();
    });
  },
  setPosition: function(event) {
    this.position.x = event.x;
    this.position.y = event.y;
    this.informSubscribers();
  },
  getPosition: function(offset) {
    if (offset) {
      return this.position.offset(offset);
    }
    return this.position;
  },
  detach: function() {
    window.removeEventListener("mousemove", this.mouseMoveEvt_, false);
  }
});
