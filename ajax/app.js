// "use strict";
// const express = require('express');
// const path = require('path');
// const app = express();
// const request = require('request');
//  
// app.all('*', function(req, res, next) {
// res.header("Access-Control-Allow-Origin", "*");
// res.header("Access-Control-Allow-Headers", "X-Requested-With");
// res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
// res.header("X-Powered-By",' 3.2.1');
// res.header("Content-Type", "application/json;charset=utf-8");
// next();
// });
//  
// // 配置静态文件服务中间件
// let serverUrl='http://localhost:8080';//server地址
// app.use(express.static(path.join(__dirname, './')));//静态资源index.html和node代码在一个目录下
// app.use('/', function(req, res) {
//   let url = serverUrl + req.url;
//   req.pipe(request(url)).pipe(res);
// });
//  
// app.listen(3000,'127.0.0.1', function () {//前端ajax地址写 http://127.0.0.1:3000/
//   console.log('server is running at port 3000');
// });


var express = require('express');
var proxy = require('http-proxy-middleware');

var app = express();

app.all('*', function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "X-Requested-With");
res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
res.header("X-Powered-By",' 3.2.1');
res.header("Content-Type", "application/json;charset=utf-8");
next();
});

app.use(
  '/',
  proxy({ target: 'http://localhost:8080', changeOrigin: true })
);
app.listen(3000,function(){
	 console.log('server is running at port 3000');
});
