Package.describe({
  name: 'dispatch:blaze-emitter',
  summary: 'Emit template events',
  version: '0.0.1'
});

Package.onUse(function (api) {
  api.use([
    // core
    'blaze',

    // atmosphere
    'raix:eventemitter'
  ], 'web');

  api.addFiles('blaze_emitter.js', 'web');
});

Package.onTest(function (api) {
  api.use([
    'templating',
    'test-helpers',
    'tinytest',
    'dispatch:blaze-emitter'
  ], 'web');

  api.addFiles([
    'tests.html',
    'tests.js'
  ], 'web');
});
