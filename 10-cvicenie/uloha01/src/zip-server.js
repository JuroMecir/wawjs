const http = require('http');
const zlib = require('zlib');
const fs = require('fs');
const {pipeline}  = require("stream");

module.exports = zip_server;

function zip_server(path) {

  const requestHandler = (request, response) => {

    let gzip = zlib.createGzip();

    fs.mkdir(path, () => {
      const filename = request.headers['content-filename'];
      const writeStream = fs.createWriteStream(`${path}/${filename}`);

      pipeline(request, writeStream, (err) => {
        if (err) {
          writeStream.destroy();
          console.debug("Error occured when zipping file");
        }
      });


      pipeline(request, gzip, response, (err)=>{
        if (err) {
          console.debug("Error occured when zipping file");
        }
      });

    });
  }
  return http.createServer(requestHandler,(err) => {
        if (err) {
          console.debug("Error occured on server");
        }
      });

}
