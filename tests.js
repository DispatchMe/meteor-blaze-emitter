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