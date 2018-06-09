const express = require("express");
const app = express();
const http = require("http").Server(app);
const port = 3000;

app.use(express.static(__dirname + "/public"));
app.get("/", (req, res) =>
  res.sendFile("index.html", { root: __dirname + "/views" })
);

require("./sockets/index.js")(http);

http.listen(port, function() {
  console.log("listening on *:3000");
});
