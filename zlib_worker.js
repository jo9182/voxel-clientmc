// Generated by CoffeeScript 1.7.0
(function() {
  var ever, zlib;

  zlib = require('zlib-browserify');

  ever = require('ever');

  module.exports = function() {
    return ever(this).on('message', function(ev) {
      var compressedArrayBuffer, compressedArrayView, compressedBuffer, id;
      compressedArrayBuffer = ev.data.compressed;
      compressedArrayView = new Uint8Array(compressedArrayBuffer);
      compressedBuffer = new Buffer(compressedArrayView);
      id = ev.data.id;
      console.log('worker decomp start ' + id + ' len' + compressedBuffer.length);
      return zlib.inflate(compressedBuffer, (function(_this) {
        return function(err, decompressed) {
          var decompressedBuffer;
          console.log('worker err' + err);
          if (err) {
            _this.postMessage({
              id: id,
              err: err.toString()
            });
            return;
          }
          decompressedBuffer = decompressed.buffer;
          return _this.postMessage({
            id: id,
            decompressed: decompressedBuffer
          }, [decompressedBuffer]);
        };
      })(this));
    });
  };

}).call(this);
