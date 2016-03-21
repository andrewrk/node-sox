# node-sox

sox command line utility wrapper for Node.js. Identify and transcode audio
files.

This project has no maintainer. Email me if you would like to be the
maintainer.

## Alternative...

For a more robust alternative, consider using
[node-groove](https://github.com/andrewrk/node-groove).

 * [metadata example code](https://github.com/andrewrk/node-groove/blob/master/example/metadata.js)
 * [transcoding example code](https://github.com/andrewrk/node-groove/blob/master/example/transcode.js)

## Installation

 * Requires `sox` CLI to be installed. This can be installed via most linux
   distribution's package managers.
 * `npm install --save sox`

## Usage

### identify an audio file

```js
var sox = require('sox');

sox.identify('somefile.wav', function(err, results) {
  /* results looks like:
  {
    format: 'wav',
    duration: 1.5,
    sampleCount: 66150,
    channelCount: 1,
    bitRate: 722944,
    sampleRate: 44100,
  }
  */
});
```

### transcode an audio file

```js
var sox = require('sox');

// these options are all default, you can leave any of them off
var job = sox.transcode('source.wav', 'dest.mp3', {
  sampleRate: 44100,
  format: 'mp3',
  channelCount: 2,
  bitRate: 192 * 1024,
  compressionQuality: 5, // see `man soxformat` search for '-C' for more info
  bits: 16 // Encoded sample size in bits
});
job.on('error', function(err) {
  console.error(err);
});
job.on('progress', function(amountDone, amountTotal) {
  console.log("progress", amountDone, amountTotal);
});
job.on('src', function(info) {
  /* info looks like:
  {
    format: 'wav',
    duration: 1.5,
    sampleCount: 66150,
    channelCount: 1,
    bitRate: 722944,
    sampleRate: 44100,
  }
  */
});
job.on('dest', function(info) {
  /* info looks like:
  {
    sampleRate: 44100,
    format: 'mp3',
    channelCount: 2,
    sampleCount: 67958,
    duration: 1.540998,
    bitRate: 196608,
  }
  */
});
job.on('end', function() {
  console.log("all done");
});
job.start();
```
