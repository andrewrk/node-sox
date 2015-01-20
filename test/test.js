var sox = require('../')
  , assert = require('assert')
  , path = require('path')
  , mkdirp = require('mkdirp')
  , rimraf = require('rimraf')
  , soundWav = path.join(__dirname, 'sound.wav')
  , soundWavBig = path.join(__dirname, 'sound-big.wav')
  , soundMp3 = path.join(__dirname, 'sound.mp3')
  , tmpDir = path.join(__dirname, 'tmp')
  , outputMp3 = path.join(tmpDir, 'output.mp3')

describe("sox", function () {
  describe("identify", function () {
    it("wav", function(done) {
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
    it("wav-big", function(done) {
      sox.identify(soundWavBig, function (err, results) {
        if (err) return done(err);
        assert.deepEqual(results, {
          format: 'wav',
          duration: 1,
          sampleCount: 44100,
          channelCount: 2,
          bitRate: 1048576,
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
  describe("transcode", function() {
    it("creating test directory", function(done) {
      mkdirp(tmpDir, done);
    });
    it("wav -> mp3", function(done) {
      var transcode = sox.transcode(soundWav, outputMp3);
      transcode.on('error', function(err) {
        console.dir(err);
        done(err);
      });
      var progress = 0;
      var progressEventCount = 0;
      transcode.on('progress', function(amountDone, amountTotal) {
        var newProgress = amountDone / amountTotal;
        progressEventCount += 1;
        assert(newProgress >= progress);
        progress = newProgress;
      });
      var gotSrc = false;
      transcode.on('src', function(info) {
        gotSrc = true;
        assert.deepEqual(info, {
          format: 'wav',
          duration: 1.5,
          sampleCount: 66150,
          channelCount: 1,
          bitRate: 722944,
          sampleRate: 44100,
        });
      });
      var gotDest = false;
      transcode.on('dest', function(info) {
        gotDest = true;
        assert.deepEqual(info, {
          sampleRate: 44100,
          format: 'mp3',
          channelCount: 2,
          sampleCount: 67958,
          duration: 1.540998,
          bitRate: 196608,
        });
      });
      transcode.on('end', function() {
        assert(gotSrc);
        assert(gotDest);
        assert.strictEqual(progress, 1);
        assert(progressEventCount >= 3, "expected at lesat 3 progress events. got: " + progressEventCount);
        done();
      });
      transcode.start();
    });
    it("removing tmp dir", function(done) {
      rimraf(tmpDir, done);
    });
  });
});
