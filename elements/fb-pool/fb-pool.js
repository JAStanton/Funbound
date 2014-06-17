(function() {
  function PoolAllocationError(message) {
    this.message = message;
  }
  PoolAllocationError.prototype = Object.create(Error);
  // https://github.com/miohtama/objectpool.js
  Polymer('fb-pool', {
    expandFactor: 0.2,
    expandMinUnits: 16,
    elems_: [],
    freeElems_: [],
    init: function(allocator, resetor) {
      this.allocator = allocator;
      this.resetor = resetor;
      this.elems_[0] = this.allocator();
      this.freeElems_ = [0];
    },
    create: function() {
      if(!this.freeElems_.length) {
        this.expand();
      }
      var index = this.freeElems_.pop();
      var elem = this.elems_[index];
      this.resetor(elem, index);
      return elem;
    },
    get length() {
      return this.elems_.length - this.freeElems_.length;
    },
    expand: function() {
      var oldSize = this.elems_.length;
      var growth = Math.ceil(this.elems_.length * this.expandFactor);
      if(growth < this.expandMinUnits) {
        growth = this.expandMinUnits;
      }
      this.elems_.length = this.elems_.length + growth;
      for(var i=oldSize; i<this.elems_.length; i++) {
        this.elems_[i] = this.allocator();
        this.freeElems_.push(i);
      }
    },
    discard: function(n) {
      if(this.freeElems_.indexOf(n) >= 0) {
        throw new PoolAllocationError("Double-free for element index " + n);
      }
      this.freeElems_.push(n);
    },
    forEach: function(func) {
      this.elems_.forEach(func);
    },
    get: function(n) {
      return this.elems_[n];
    }
  });
})();
