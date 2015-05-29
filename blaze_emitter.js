// Setup event emitter for views

Blaze.View.prototype.on = function (event) {
  var self = this;

  if (!self._emitter) {
    // Lazily setup the event emitter when the user listens.
    self._emitter = new EventEmitter();

    self._callbacks.created.push(function () {
      self._emitter.emit('created');
    });

    self._callbacks.rendered.push(function () {
      self._emitter.emit('rendered');
    });

    self._callbacks.destroyed.push(function () {
      self._emitter.emit('destroyed');

      // Destroy the emitter
      self._emitter.removeAllListeners();
      self._emitter = null;
    });
  }

  self._emitter.on.apply(self._emitter, arguments);
};

Blaze.View.prototype.emit = function () {
  var self = this;

  if (!self._emitter) return; // only emit events if there is a listener

  self._emitter.emit.apply(self._emitter, arguments);
};

// Setup a global listener for templates

Blaze.Template.prototype.on = function (eventName, listener) {
  // When the view is created -- attach the listener
  this._callbacks.created.push(function () {
    var templateInstance = this;
    templateInstance.view.on(eventName, listener);
    if (eventName === 'created') listener();
  });
};
