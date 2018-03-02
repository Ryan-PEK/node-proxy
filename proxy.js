// include dependencies
var express = require('express');
var proxy = require('http-proxy-middleware');


var app = express();
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// proxy middleware options
var options = {
        target: 'https://oapi.dingtalk.com', // target host
        changeOrigin: true,               // needed for virtual hosted sites
        ws: true,                         // proxy websockets
        pathRewrite: {
            '^/proxy/ddrobot' : '/robot/send'
        },
        router: {
            // when request.headers.host == 'dev.localhost:3000',
            // override target 'http://www.example.org' to 'http://localhost:8000'
            '/proxy/ddrobot' : 'https://oapi.dingtalk.com'
        }
    };

// create the proxy (without context)
var myProxy = proxy(options);
app.use('/proxy', myProxy);

app.listen(9902);
