Tinytest.addAsync('View emits events', function (test, done) {
  var invoked = {};

  var helloView = Template.hello.constructView();

  helloView.on('created', function () {
    invoked.created = true;
  });

  helloView.on('rendered', function () {
    invoked.rendered = true;
    test.equal(invoked, {created: true, rendered: true});

    // Now destroy the view.
    Blaze.remove(helloView);
  });

  helloView.on('destroyed', function () {
    invoked.destroyed = true;
    test.equal(invoked, {created: true, rendered: true, destroyed: true});
    done();
  });

  var div = document.createElement('DIV');

  // Fire the created and rendered events.
  Blaze.render(helloView, div);
});

Tinytest.addAsync('Template instance emits events', function (test, done) {
  var view = Template.hello.constructView();

  var instance = view.templateInstance();

  instance.on('testEvent', function (param1) {
    test.equal(param1, 'works');
    done();
  });

  instance.emit('testEvent', 'works');
});

Tinytest.addAsync('Template instance emits jQuery events', function (test, done) {
  Template.hello.events({
    'testEvent': function (event, template, param1) {
      test.equal(param1, 'works');
      done();
    }
  });

  var view = Template.hello.constructView().attach($('body')[0]);

  var instance = view.templateInstance();

  instance.emit('testEvent', 'works');
});

Tinytest.addAsync('Template emits events', function (test, done) {
  var invoked = {};

  Template.hello.on('created', function () {
    invoked.created = true;
  });

  Template.hello.on('rendered', function () {
    invoked.rendered = true;
    test.equal(invoked, {created: true, rendered: true});

    // Now destroy the view.
    Blaze.remove(helloView);
  });

  Template.hello.on('destroyed', function () {
    invoked.destroyed = true;
    test.equal(invoked, {created: true, rendered: true, destroyed: true});
    done();
  });

  var div = document.createElement('DIV');
  var helloView = Template.hello.constructView();

  // Fire the created and rendered events.
  Blaze.render(helloView, div);
});
