var express = require("express");
var cors = require("cors");
var ApiServer = express();
ApiServer.use(cors())

ApiServer.listen(3000, () => {
  console.log("Server running on port 3000");
});

ApiServer.get("/startGame", (req, res, next) => {
  res.json({id: "1", url: "JABBA"})
});

ApiServer.post('/startGame', (req, res) => {
  res.json({id: "1", url: "JABBA"})
});

ApiServer.put('/', (req, res) => {
	return res.send('Received a PUT HTTP method');
});

ApiServer.delete('/', (req, res) => {
return res.send('Received a DELETE HTTP method');
});