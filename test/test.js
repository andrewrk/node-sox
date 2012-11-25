var sox = require('../')
  , assert = require('assert')
  , path = require('path')
  , soundWav = path.join(__dirname, 'sound.wav')

describe("sox", function () {
  it("identify", function(done) {
    sox.identify(soundWav, function (err, results) {
      if (err) return done(err);
      assert.deepEqual(results, {
        format: 'wav',
        duration: 1.5,
        sampleCount: 66150,
        channelCount: 1,
        bitRate: 722944,
        sampleRate: 44100,
      });
      done();
    });
  });
  it("transcode", function(done) {
    assert.fail();
  });
});
