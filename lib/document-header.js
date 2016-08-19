const Class = require('cify').Class;
const utils = require('ntils');

const DocumentHeader = new Class({

  constructor: function (buf) {
    this.buf = buf || this._createBuf();
  },

  _createBuf: function () {
    var buf = new Buffer(DocumentHeader.LENGTH);
    buf.fill(0);
    return buf;
  },

  get deleted() {
    if (utils.isNull(this._deleted)) {
      this._deleted = this.buf.readInt8(0);
    }
    return !!this._deleted;
  },

  set deleted(value) {
    var intValue = Number(value);
    this._deleted = intValue;
    this.buf.writeInt8(intValue);
  },

  get begin() {
    if (utils.isNull(this._begin)) {
      this._begin = this.buf.readInt32LE(1);
    }
    return this._begin;
  },

  set begin(value) {
    this._begin = value;
    this.buf.writeInt32LE(value, 1);
  },

  get end() {
    if (utils.isNull(this._end)) {
      this._end = this.buf.readInt32LE(5);
    }
    return this._end;
  },

  set end(value) {
    this._end = value;
    this.buf.writeInt32LE(value, 5);
  }

});

DocumentHeader.LENGTH = 9;

module.exports = DocumentHeader;