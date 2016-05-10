var React = require('react');

global.window = global;

if(!window.React){
  global.React = window.React = React;
}

React.initializeTouchEvents(true);
var host = window.location.host;
var apiAddress = "/api/";//todo 开发环境使用的api地址。

global.ajaxConfig = {url:apiAddress, header:{"Content-Type":"application/json"}};
global.ajaxConfigWeixin = {url:apiAddress, header:{"Content-Type":"application/json"}};

var router = require('./app/routes/clientrouter');

