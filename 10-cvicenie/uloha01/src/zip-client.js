const http = require('http');
const fs = require('fs');
const path = require('path');
const {pipeline}  = require("stream");
let url = "http://localhost:9999";

module.exports = zip_client;

function zip_client(file) {

  const readStream = fs.createReadStream(file);
  const writeStream = fs.createWriteStream(`${file}.gz`);

  const req = http.request(url,
    { 
      method: 'POST',
    },
    response => {
      pipeline(response, writeStream, (err) => {
        if (err) {
        	 writeStream.destroy();
             console.debug("Error ocured when writing file");
        }
      });
    }
  );

  fs.stat(file, (err, stats) => {
    if (err){
      console.debug('Error occured when opening file');
      return;
    }

    req.setHeader('Content-Length', stats.size);
    req.setHeader('Content-Filename', path.parse(file).base);

    pipeline(readStream, req, (err) => {
      if (err) {
      	 readStream.destroy();
        fs.unlinkSync(`${file}.gz`);
        console.debug("Error occured when sending file");
      }
    });
  });

  return req;
}

