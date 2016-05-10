var React = require('react');
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var port    = process.env.PORT || 3006;

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development') {
  app.use(function(err,req,res,next){
    if(err){
      console.log(err);
    }
    next();
  });
}

var router = require('./router');

app.use('/promotion', router);

var server = app.listen(port,function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log("please visit:" + host + ":" + port);
});