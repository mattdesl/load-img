require('jsdom-global')();

var loadImage = require('../');
var baboon = require('baboon-image-uri');
var test = require('tape');

test('loads a Image for the browser', function (t) {
  t.plan(4);
  var ret = loadImage(baboon, (err, img) => {
    if (err) return t.fail(err);
    t.equal(ret, img, 'callback provides same return image');
    t.equal(img.width, 128, 'width');
    t.equal(img.height, 128, 'height');
  });
  t.ok(ret instanceof window.HTMLImageElement || ret instanceof window.Image, 'returns image');
});

test('handles error callback', function (t) {
  t.plan(1);
  loadImage('does_not_exist.jpg', (err) => {
    if (!err) return t.fail('Expected an error from callback');
    t.ok(true, 'Received error callback');
  });
});

test('handles crossOrigin and non-cb parameter', function (t) {
  t.plan(1);
  var img = loadImage(baboon, { crossOrigin: 'anonymous' });
  t.equal(img.crossOrigin, 'anonymous', 'sets crossOrigin');
});
