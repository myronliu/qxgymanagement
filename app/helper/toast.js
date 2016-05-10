var _ = require('underscore');

var Toast  = {};

Toast.success = function(msg, duration){
  Toast.show(msg, duration, "success");
}

Toast.error = function(msg, duration){
  Toast.show(msg, duration, "error");
}

Toast.warn = function(msg, duration){
  Toast.show(msg, duration, "warning");
}

Toast.info = function(msg, duration){
  Toast.show(msg, duration, "info");
}

Toast.message = function(msg, duration){
  Toast.show(msg, duration, "info");
}

Toast.show = function(msg, duration, level){
  duration = isNaN(duration) ? 5000 : duration;
  level = level || "info";

  if(window.AppLayout && window.AppLayout.refs.appNotificationSystem){
    window.AppLayout.refs.appNotificationSystem.addNotification({
      message: msg,
      level: level,
      autoDismiss: (duration / 1000)
    });
  } else {
    var m = document.createElement('div');
    m.setAttribute("name","toast-message");

    var s = document.createElement('div');
    m.style.cssText=" position:relative;top: -720px; float: right; height: 42px; width: 0px; border-bottom-left-radius:6px;border-top-left-radius:6px;";
    s.innerHTML = msg;
    s.style.cssText="padding:12px;font-size:16px; opacity: 0.9; height: 1; color: rgb(255, 255, 255); line-height: 1.5em; text-align: center; border-radius: 0.3em; z-index: 999999; font-weight: bold; margin: 0px auto;";
    m.appendChild(s);

    switch(level) {
      case "success":
        m.style.backgroundColor="#0395DE";
        break;
      case "error":
        m.style.backgroundColor="#d9534f";
        break;
      case "warning":
        m.style.backgroundColor="#FBBF6A";
        break;
      case "info":
      default:  
        m.style.backgroundColor="#0395DE";
    }

    var div_length=document.getElementsByName("toast-message").length;

    if(div_length < 1){
      document.body.appendChild(m);
      m.style.webkitAnimation = 'toast-in  1s forwards';
    }

    setTimeout(function() {
      var d = 0.5;
      m.style.webkitAnimation = 'toast-out  1s forwards';
      setTimeout(function() { 
        document.body.removeChild(m);
      }, d * 3000);
    }, duration);
  }
};

// params: {msg, title, duration, level}
Toast.notify = function(params){
  if(!window.AppNotificationSystem){
    return;
  }

  if(params.title === "" || params.title === 0){
    params.title = "";
  } else {
    switch(level) {
      case "success":
        params.title = params.title || "提示";
        break;
      case "error":
        params.title = params.title || "错误";
        break;
      case "warning":
        params.title = params.title || "警告";
        break;
      case "info":
      default:
        params.title = params.title || "提示";
    }
  }

  var _notification = _.extend({
    autoDismiss: 5,
    dismissible: true,
    action: null,
    actionState: false
  }, params)

  window.AppNotificationSystem.addNotification(_notification);
}

module.exports = Toast;