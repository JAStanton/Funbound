Polymer('fb-mouse', {
  ready: function() {
    this.position = new FbMathPoint();
    this.mouseMoveEvt_ = this.setPosition.bind(this);
    window.addEventListener("mousemove", this.mouseMoveEvt_, false);
  },
  setPosition: function(event) {
    this.position.x = event.x;
    this.position.y = event.y;
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
