// Setup event emitter for templates

Blaze.Template.prototype.emit = function () {
  if (!self._emitter) return; // only emit events if there is a listener

  this._emitter.emit.apply(this._emitter, arguments);
};

Blaze.Template.prototype.on = function (event) {
  var self = this;

  if (!self._emitter) {
    // Lazily setup the event emitter when the user listens.
    self._emitter = new EventEmitter();

    ['created', 'rendered', 'destroyed'].forEach(function (event) {
      self._callbacks[event].push(function () {
        self._emitter.emit(event);
      });
    });

    self._callbacks['destroyed'].push(function () {
      // Destroy the emitter
      self._emitter.removeAllListeners();
      self._emitter = null;
    });
  }

  self._emitter.on.apply(this._emitter, arguments);
};
