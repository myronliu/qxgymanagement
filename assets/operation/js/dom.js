/**
 @Author: Ray -- dom帮助方法
 @Date: 2015-10-15
 */

(function(){
  // 防止IE console.log报错
  window.console = window.console || { log:function(){return;} }

  window.domHelper = {
    initTooltip: function(opts){
      var _sel = opts.target || ".tooltip";
      opts.theme = opts.theme || ".tooltipster-light";

      opts.functionReady = opts.functionReady || function(origin, tooltip){
        var closeBtnSelector = opts.closeBtn || '.tt-close,.tooltip-close';

        $(tooltip).on('click', closeBtnSelector, function(){
          $(origin).tooltipster('hide');
        });
      };
      
      $(_sel).tooltipster(opts|| {});
    },

    tooltip: function(dom, op, arg1, arg2, arg3, arg3){
      $(dom).tooltipster(op, arg1, arg2, arg3, arg3);
    }
  };
})();
