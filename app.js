const port = process.env.PORT || 3000;
const express = require("express");
const request = require("request");

var app = express();

app.listen(port, err => {
  if (err) throw err;
  console.log(`> Ready On Server http://localhost:${port}`);
});

app.use('/', function(req, res) {
  // var url = apiServerHost + req.url;
  var options = {
    url: 'https://api.github.com/repos/jwilber/Bob_Ross_Paintings/contents/data/paintings',
    headers: {
      'User-Agent': 'request'
    }
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      let item = data[Math.floor(Math.random()*data.length)];
      res.setHeader("Content-Type", "image");
      req.pipe(request(item.download_url)).pipe(res);
    }
  }

  request(options, callback);
});