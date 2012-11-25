var sox = require('../')
  , assert = require('assert')
  , path = require('path')

describe("sox", function () {
  describe("identify", function () {
    it("wav", function(done) {
      sox.identify(path.join(__dirname, 'sound.wav'), function (err, results) {
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
    it("mp3", function(done) {
      sox.identify(path.join(__dirname, 'sound.mp3'), function (err, results) {
        if (err) return done(err);
        assert.deepEqual(results, {
          format: 'mp3',
          duration: 1.070998,
          sampleCount: 47231,
          channelCount: 1,
          bitRate: 132096,
          sampleRate: 44100,
        });
        done();
      });
    });
  });
  it("transcode", function(done) {
    assert.fail();
  });
});
