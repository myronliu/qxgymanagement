var EvoFlux = require('evoflux');
module.exports = EvoFlux.createStore("gettoken", {
    init: function(){
      this.items = this.items || {};
      this.triggerTo = {
        get: "get"
      };
    },
    getItems: function(){
      return this.items;
    },
    getData:function(cb){
      this.on("get",function(){
        cb(this.items);
      }.bind(this));
    },
    saveData: function(data){
      this.items = data;
    },
    actions:{
        get:function(d){
        this.items = d.data;
      }
    }
})