var EvoFlux = require('evoflux');
var ajax = require('../../helper/ajax');

var BackApi = function(){ return ajax.init(global.ajaxConfigWeixin).api; }

module.exports = EvoFlux.createAction("gettoken", {
  // 获取所有活动
  get:function (data, cb) {
    BackApi().get("cgi-bin/token")
      .query(data || {})
      .end(function(err,res){
        var _body = res ? res.body : {};

        if(cb){
          cb(_body);
        }else{
          if(res){
            this.dispatch({
              actionType: "get",
              data: _body
            });
          }
        }
      }.bind(this));
  }
})