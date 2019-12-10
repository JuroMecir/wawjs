\// version 0.0.0
// noop Transform

const { Transform } = require("stream");

module.exports = {
  add: function() {
    return new AddBom();
  }
  remove: function(){
  	return new RemoveBom();
  }
}
// 2. implement noop operation
class AddBom extends Transform {

  _transform(chunk, enc, cb) {

    this.push(chunk);
    cb();
  
  }
}


class RemoveBom extends Transform {

  _transform(chunk, enc, cb) {

    this.push(chunk);
    cb();
  
  }
}



