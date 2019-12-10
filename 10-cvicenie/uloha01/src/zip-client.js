const http = require("http");


//---------------------------------
let url = "http://localhost:9999";
let request = http.request(url, {
    method: "POST"
  })
  .on("response", (res) => {

    res.pipe(process.stdout);

  });
  
process.stdin.pipe(request);