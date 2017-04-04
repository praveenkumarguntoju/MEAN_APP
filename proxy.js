var express = require('express');
var app = express();
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
var serverOne = 'http://localhost:8080';
    app.all('*', function (req, res) {
        console.log('redirecting to Server3');
        apiProxy.web(req, res, {target: ServerThree});
});
app.listen(3000);
