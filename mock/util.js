var _ = require('underscore');

var MDb = require('./db');

module.exports = {
  response: function(){
    var _status = 0;
    var _message = "";
    var _body = [];

    if(arguments.length == 1){
      var _arg = arguments[0];
      var _argtype = typeof(_arg);

      switch(_argtype){
        case "number":
          _status = _arg;
          break;
        case "string":
          _message = _arg;
          break;
        default:
          _body = _arg;
      }
    } else if(arguments.length == 2) {
      var _arg = arguments[0];
      var _argtype = typeof(_arg);

      switch(_argtype){
        case "string":
          _message = _arg;
          _body = arguments[1];
          break;
        default:
          _status = _arg;
          _message = arguments[1];
      }
    } else if(arguments.length > 2) {
      _status = arguments[0];
      _message = arguments[1];
      _body = arguments[2];
    }

    var _resp = {
      status: _status,
      message: _message,
      body: _body
    };

    return _resp;
  },

  getDbData: function(path, dbname){
    dbname = dbname || "data";

    var _data = MDb[dbname][path];

    return _data;
  },

  responseDbData: function(path, dbname, status, message){
    dbname = dbname || "data";

    var _body = this.getDbData(path, dbname);
    
    var _resp = this.response(_body);

    if(status === 0 || status){
      _resp.status = status
    }

    if(message === "" || status){
      _resp.message = message;
    }

    return _resp;
  },

  responseData: function(path, status, message){
    var _resp = this.responseDbData(path, "data", status, message);

    return _resp;
  }
}