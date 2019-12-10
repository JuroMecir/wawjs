const http = require("http");

//---------------------------------
let server = http.createServer()
server.listen(9999, "localhost")
  .on("request", (req, res) => {

    req.pipe(res);

  });
