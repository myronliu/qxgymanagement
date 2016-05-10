var path = require('path');

var express = require('express');
var load = require('express-load');
//日志
var bunyan = require('bunyan');
var logMiddlware = require('./app/middlewares/log');

var cookieParser = require('cookie-parser');
var app = express();
app.use(cookieParser('dgdfgdfgdfgdfsgds',{
  httpOnly: true,
  axAge: 1800000 
}));
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var expstate = require('express-state');
expstate.extend(app);

app.set('state namespace', 'HManager');//设置client slide state的namespace。

require("node-jsx").install({ extension: ".js" });
var fs = require('fs');
var tlskey = fs.readFileSync(__dirname + '/cert/hrycert_prod.key', 'utf8');
var tlscert = fs.readFileSync(__dirname + '/cert/hrycert_prod.crt', 'utf8');//海融易的ssl证书
global.hrytls = {key:tlskey,cert:tlscert,rejectUnauthorized:false};
app.set('view engine', 'ejs');
app.set('views', __dirname + '/app/views');
app.set('etag','strong');
app.use(express.static(__dirname + '/assets'));

var port    = process.env.PORT || 3009;

// 测试代码，提交时务必注释掉!!!!! 注释掉!!!!! 注释掉!!!!!
// process.env.NODE_ENV = "uat";

var APP_ENV = process.env.NODE_ENV || "development";

console.log();
console.log(new Date());
console.log("加载系统的 “" + APP_ENV + "” 环境...");

if (APP_ENV === 'development') {
  app.use(function(err,req,res,next){
    if(err){
      console.log(err);
    }
    next();
  });
} 

if (APP_ENV === 'production' || APP_ENV === 'uat') {
  app.set('views', __dirname + '/app/distviews');//正式环境，由gulp build出一个替换js和css为min版的index.ejs
  // app.use(express.static(__dirname + '/public'));//正式时build js及其他到这里。
  app.use(function(err, req, res, next){
    if(err){
      console.log(err);
      res.redirect('/error');
    }else{
      next();
    }
  });
}

console.log();
console.log(new Date());
console.log("加载系统的 “" + APP_ENV + "” 环境配置...");

load('config',{cwd:path.join(__dirname,'./')}).into(app);

for (var environment in app.config) {
  if (environment === APP_ENV) {
    global.config = {};
    for (var key in app.config[environment]) {
      // app.set(key, app.config[environment][key]);
      global.config[key] = app.config[environment][key]; 
    }
  }else if(environment === "app"){
    for(var key in app.config.app[APP_ENV]){
      app.set(key, app.config["app"][APP_ENV][key]);
    }
  }
}

console.log(global.config);

/* setup the logger */
var log = bunyan.createLogger({
  name:"HManager"
});
app.use(logMiddlware.commonLog(log));
app.use(logMiddlware.serviceApiLog());

var router = require('./app/routes/serverrouter');
var apiRouter = require('./app/routes/api');

app.use('/', router);
app.use('/api',apiRouter);

var server = app.listen(port,function(){
  var host = server.address().address;
  var port = server.address().port;


  console.log();
  console.log(new Date());
  console.log("please visit:" + host + ":" + port);
});