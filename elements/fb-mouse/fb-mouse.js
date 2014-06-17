Polymer('fb-mouse', {
  ready: function() {
    this.eventSubscriptions_ = [];
    this.relativePosition = new FbMathPoint();
    this.mouseMoveEvt_ = this.setPosition_.bind(this),
    this.mouseUpEvt_ = this.mouseUp_.bind(this),
    this.mouseDownEvt_ = this.mouseDown_.bind(this),
    this.mouseLeaveEvt_ = this.mouseLeave_.bind(this),

    window.addEventListener("mousemove", this.mouseMoveEvt_, false);
    window.addEventListener("mouseleave", this.mouseLeaveEvt_, false);
    window.addEventListener("mousedown", this.mouseDownEvt_, false);
    window.addEventListener("mouseup", this.mouseUpEvt_, false);

    this.isDown = false;
  },
  subscribe: function(type, callback) {
    this.eventSubscriptions_.push({type: type, callback: callback});
  },
  informSubscribers_: function(type) {
    this.eventSubscriptions_
      .filter(function(obj) {
        return obj.type == type;
      })
      .forEach(function(obj) {
        obj.callback();
      });
  },
  setPosition_: function(event) {
    this.relativePosition.x = event.x;
    this.relativePosition.y = event.y;
    this.informSubscribers_("mousemove");
  },
  getPosition: function(offset) {
    if (offset) {
      return this.relativePosition.offset(offset);
    }
    return this.relativePosition;
  },
  mouseLeave_: function() {
    this.isDown = false;
    this.informSubscribers_("mouseleave");
  },
  mouseUp_: function() {
    this.isDown = false;
    this.informSubscribers_("mouseup");
  },
  mouseDown_: function() {
    this.isDown = true;
    this.informSubscribers_("mousedown");
  },
  detach: function() {
    window.removeEventListener("mousemove", this.mouseMoveEvt_, false);
    window.removeEventListener("mousedown", this.mouseMoveEvt_, false);
    window.removeEventListener("mouseup", this.mouseMoveEvt_, false);
    window.removeEventListener("mouseleave", this.mouseLeaveEvt_, false);
  }
});
