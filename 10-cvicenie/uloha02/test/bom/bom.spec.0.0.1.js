const bom = require("../../src/bom/bom.0.1.0.js");

const assert = require("assert");
const fs = require("fs");

describe("bom.js tests", function() {


  const bomBuffer = Buffer.from([0xEF, 0xBB, 0xBF])

  // 3. define first test
  it("add bom - shell add bom to file", function(done) {

    // collect all chunks, for asserts
    let chunks = [];

    // 4. create sample files
    let file = `${__dirname}/data/without-bom.txt`;
    fs.createReadStream(file)
      // !!!
      .pipe(bom.add())
      // !!!
      .on("error", done)
      .on("data", (chunk) => chunks.push(chunk))
      .on("finish", () => {

        let chunk = Buffer.concat(chunks);
  
        assert(Buffer.isBuffer(chunk));
        assert.equal(chunk.indexOf(bomBuffer), 0);
        assert.equal(chunk[3], 0x2f);
        assert.equal(chunk.length, 3 + 10); //bom and data
        done();
      })
  });




  it("remove bom - shall remove bom from file", function(done) {

    // collect all chunks, for asserts
    let chunks = [];

    // 4. create sample files
    let file = `${__dirname}/data/with-bom.txt`;
    fs.createReadStream(file)
      .pipe(bom.remove())
      .on("error", done)
      .on("data", (chunk) => chunks.push(chunk))
      .on("finish", () => {

        let chunk = Buffer.concat(chunks);
  
        assert(Buffer.isBuffer(chunk));
        assert.equal(!chunk.indexOf(bomBuffer), 0);
        assert.equal(chunk[0], 0x2f);
        assert.equal(chunk.length,10 - 3); //data - 3 znaky, 
        done();
      })
  });

});