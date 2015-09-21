Package.describe({
  name: 'dispatch:blaze-emitter',
  summary: 'Emit template events',
  version: '0.0.9',
  git: 'https://github.com/DispatchMe/meteor-blaze-emitter'
});

Package.onUse(function (api) {
  api.versionsFrom('1.0');

  api.use([
    // core
    'blaze',
    'jquery',
    'underscore',

    // atmosphere
    'raix:eventemitter@0.1.3'
  ], 'web');

  api.addFiles('blaze_emitter.js', 'web');
});

Package.onTest(function (api) {
  api.use([
    'templating',
    'test-helpers',
    'tinytest',
    'dispatch:blaze-emitter',
    'dispatch:view-extensions'
  ], 'web');

  api.addFiles([
    'tests.html',
    'tests.js'
  ], 'web');
});
