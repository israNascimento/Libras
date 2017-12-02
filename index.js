const app = require('./config/express')();
var http = require('http').Server(app);

var server = http.listen(8080, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});