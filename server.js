var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 3000);

console.log("Simple static server running on port 3000 for the demo. (localhost:3000)");