const express = require('express');
const path = require('path');
var app = express();
app.use(express.static(path.join(__dirname, '/dist/selisetask')));

app.get('/*', function(req, res) {
	res.sendFile(path.join(__dirname+'dist/selisetask/index.html'));

});

app.listen(process.env.PORT || 8080);
