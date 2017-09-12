var gulp = require('gulp');
var swPrecache = require('sw-precache');

gulp.task('generate-sw', function() {
  var swOptions = {
    staticFileGlobs: [
      'index.html',
      '/index.html',
      'images/*.{png,svg,gif,jpg}',
      'scripts/*.js',
      'styles/*.css'
    ],
    stripPrefix: '.',
    runtimeCaching: [{
      urlPattern: /^https:\/\/query\.yahooapis\.com/,
      handler: 'networkFirst',
      options: {
        cache: {
          name: 'weatherData-v3'
        }
      }
    }]
  };
  return swPrecache.write('./service-worker.js', swOptions);
});