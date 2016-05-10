var EvoFlux = require('evoflux');
module.exports = EvoFlux.createStore("setmenu", {
    init: function(){
      this.items = this.items || {};
      this.triggerTo = {
        post: "post"
      };
    },
    getItems: function(){
      return this.items;
    },
    getData:function(cb){
      this.on("post",function(){
        cb(this.items);
      }.bind(this));
    },
    actions:{
        post:function(d){
        this.items = d.data;
      }
    }
})