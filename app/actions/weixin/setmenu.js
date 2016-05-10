var EvoFlux = require('evoflux');
var ajax = require('../../helper/ajax');

var BackApi = function(){ return ajax.init(global.ajaxConfigBack).api; }

module.exports = EvoFlux.createAction("setmenu", {
  post:function(data, cb){
    BackApi().post("setmenu")
      .send(data)
      .end(function(err,res){
        if(res){
          this.dispatch({
            actionType: "post",
            data: res.body
          });
          if(cb){
            cb(res.body);
          }
        }
      }.bind(this));
  }
})