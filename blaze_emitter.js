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

Blaze.View.prototype.off = function () {
  var self = this;

  if (!self._emitter) return;

  self._emitter.off.apply(self._emitter, arguments);
};

// Setup event helpers on template instances

Blaze.TemplateInstance.prototype.on = function () {
  var view = this.view;
  return view.on.apply(view, arguments);
};

Blaze.TemplateInstance.prototype.emit = function () {
  var view = this.view;
  return view.emit.apply(view, arguments);
};

Blaze.TemplateInstance.prototype.off = function () {
  var view = this.view;
  return view.off.apply(view, arguments);
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
