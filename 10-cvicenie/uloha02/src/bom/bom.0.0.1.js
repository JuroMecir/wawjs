const { Transform } = require("stream");

module.exports = {

  add: function() {
    return new AddBom();
  },
  remove: function() {
    return new RemoveBom();
  }
}


class AddBom extends Transform {

  constructor() {
    super();
    this.isFirstCall = true
  }
  _transform(chunk, enc, cb) {
    if (this.isFirstCall) {

      const bufBom = Buffer.from([0xEF, 0xBB, 0xBF]);
      this.push(bufBom);
      this.push(chunk);

      this.isFirstCall = false;
    } else {
      this.push(chunk);
    }
    cb();
  }
}


class RemoveBom extends Transform {

  constructor() {
    super();
    this.isFirstCall = true
  }
  _transform(chunk, enc, cb) {
    if (this.isFirstCall) {

      const bufBom = Buffer.from([0xEF, 0xBB, 0xBF]);
      chunk = chunk.slice(3);   // natvrdo odrezem prve tri znaky
      this.push(chunk);

      this.isFirstCall = false;
    } else {
      this.push(chunk);
    }
    cb();
  }
}