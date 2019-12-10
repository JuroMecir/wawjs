const bom = require("../../src/bom/bom.0.1.0.js");
const assert = require("assert");
const fs = require("fs");

describe("bom.js tests", function() {


  const bomBuffer = Buffer.from([0xEF, 0xBB, 0xBF])

  it("add bom - shell NOT add redundant bom", (done) => {

    let chunks = [];

    let file = `${__dirname}/data/with-bom.txt`;
    fs.createReadStream(file)
      .pipe(bom.add())
      .on("error", done)
      .on("data", (chunk) => chunks.push(chunk))
      .on("finish", () => {

        let chunk = Buffer.concat(chunks);

        fs.readFile(file, (err, data) => {
          assert(
            chunk.equals(data),
            `unexpected \n${JSON.stringify(chunk)}`
          );
          done();
        });

      });
  });


  it("remove bom - shall NOT remove non-existent bom", (done) => {

    let chunks = [];

    let file = `${__dirname}/data/without-bom.txt`;
    fs.createReadStream(file)
      .pipe(bom.remove())
      .on("error", done)
      .on("data", (chunk) => chunks.push(chunk))
      .on("finish", () => {

        let chunk = Buffer.concat(chunks);

        fs.readFile(file, (err, data) => {
          assert(
            chunk.equals(data),
            `unexpected \n${JSON.stringify(chunk)}`
          );
          done();
        });

      });
  });
});