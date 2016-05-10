/**
 @Author: Mike --表单验证
 @Date: 2015-09-09
 */

(function(){
 
  window.formHelper = {
    // 复发元素事件（这里主要用于触发隐藏域的change事件）
    triggerEvent: function(el, evtName){
       $(el).trigger(evtName);
    },

    getFieldDom: function(frm, name){
      var fld = $(frm).find("[name='" + name + "']");
      return fld.length > 0 ? fld[0] : null;
    },

    setFieldValue: function(frm, name, val){
      $(frm).find("[name='" + name + "']").val(val);
    },

    getFieldValue: function(frm, name){
      return $(frm).find("[name='" + name + "']").val();
    },

    serializeString: function(frm){
      var _frm = frm;
      var _qryStr = $(_frm).serialize();

      return _qryStr;
    },

    serializeData: function(frm, preData, ignoreEmpty){
      var _frm = frm;
      var _arrData = $(_frm).serializeArray();
        // console.log(_arrData);
      var _frmData = {};
    $(frm).find("input[type!='button'],select,textarea").each(function(){
      
        //排除空值字段
          if($(this).val().replace(/(^\s*)|(\s*$)/g, "") !== "" && $(this).val().replace(/(^\s*)|(\s*$)/g, "") !== "undefined" &&  ! $(this).attr("data-ignore")){

             if($(this).attr("type") === "radio"  && $(this).attr("checked") ==="checked") {
               var _name=$(this).attr("data-name");
               $("input[name='"+_name+"']").val(parseInt($(this).val()));
             }

            //input值类型转换
            if($(this).attr("data-type") !=="" && $(this).attr("data-type") !=="undefined" ) {
              var _toCovent=$(this).attr("data-type") ;
              //console.log(_toCovent);
              switch(_toCovent) {
                  case "number" :
                    $(this).val(parseInt($(this).val())) ;
                    break;
                    case "float" :
                    $(this).val(parseFloat($(this).val()));
                    break;
                    case "datetime" :
                    var _date=new Date($(this).val());
                    $(this).val(_date.getFullYear()+"-"+(_date.getMonth()+1) + "-" + _date.getDate() + " 00:00:00");
                    break;
                }
                  if($(this).attr("name")) {
                   _frmData[$(this).attr("name")] = $(this).val();
                  }
            } else {
              if($(this).attr("name")) {
                 _frmData[$(this).attr("name")] = $(this).val();
               }
            
            }
          }
      
    });
      var _data = {};

      if(!preData){
        _data = _frmData;
      } else {
        _data = $.extend({}, preData, _frmData);
      }

      return _data;
    },

    // 初始化表单验证
    initFormValidation: function(frm){
      var self = this;
      $(frm).find("input,select,textarea").each(function(){
        self.initFieldValidation(frm, this);
      });
    },

    // 初始化表单域验证
    initFieldValidation: function(frm, fld){
      var self = this;
      var vtrigger = $(fld).attr("data-vtrigger");

      if(!fld.bindedVTrigger && vtrigger){
        var _vts = vtrigger.split(',');

        var vfunc = function(){
          self.verifyField(frm, fld);
        }

        $.each(_vts, function(i, t){
          if("submit" != t){
            $(fld).on(t, vfunc)
          }
        })

        fld.bindedVTrigger = true;
      }
    },

    // 显示服务器端错误
    serverError: function(frm, error) {
      // 显示或隐藏info hint
      var formHint = $(frm).find("[data-vtarget='form:servererror']");
      
      if(!error){
        formHint.find(".content").html("");
        formHint.removeClass("show");
        formHint.addClass("hide");
      } else {
        formHint.find(".content").html("error");
        formHint.addClass("show");
        formHint.removeClass("hide");
      }
    },

    // 表单验证方法
    validateForm: function(frm) {
      var self = this;

      var flag = true;

      if(typeof frm === "string"){
        frm = "#" + frm;
      }
      
      $(frm).find("input,select,textarea").each(function(){
        // 只对有name属性的域进行验证
        if($(this).attr("name")){
          if(!self.verifyField(frm, this)){
            flag = false;
          }
        }
      });

      // 显示或隐藏info hint
      var formHint = $(frm).find("[data-vtarget='form:validate']");

      if(!flag){
        formHint.addClass("show");
        formHint.removeClass("hide");
      } else {
        formHint.addClass("hide");
        formHint.removeClass("show");
      }

      return flag;
    },

    // 验证单个表单域
    verifyField: function(frm, fld){
      var self = this;

      var flag = true;

      // 执行验证的表单域的name属性不能为空
      var fldName = $(fld).attr("name");
      if(!fldName){ 
        console.log("请为表单名提供name属性");
        return true;
      }

      var required = $(fld).attr("required") || $(fld).attr("data-required");
      var vrulesStr = $(fld).attr("data-vrules");
      var vrules = vrulesStr ? $.parseJSON(vrulesStr) : [];

      if(required){
        flag = self.doVerify(frm, fld, "required", vrules); 
      }

      if(flag && vrulesStr){
        if(flag && vrules){
          for(var r in vrules){
            flag = self.doVerify(frm, fld, r, vrules);

            // 遇到一次验证错误则中断验证
            if(!flag){ break; }
          }
        }
      }

      // 显示或隐藏info hint
      var infoHint = $(frm).find("[data-vtarget='" + fldName + ":info']");
      if(flag){
        infoHint.addClass("show");
        infoHint.addClass("hide");
      } else {
        infoHint.addClass("hide");
        infoHint.removeClass("show");
      }

      return flag;
    },

    doVerify: function(frm, fld, rkey, rules){
      var self = this;

      var flag = true;
      var val = $(fld).val();

      var isempty = !val;

      if($(fld).attr("data-type") === "number" 
        || rules["type"] == "currency"){
        isempty = (val == 0);
      }

      if(isempty && rkey !== "custom"){
        // 空值且非自定义验证时，首先验证required
        flag = !(rkey == "required");
      } else if(!rkey || !rules) {
        // 确保rkey和rules不为空
        flag = true;
      } else {
        var rule = rules[rkey];

        switch(rkey){
          // 最大长度验证
          case "minlength":
            flag = val.toString().length < rule;
            break;
          // 最大长度验证
          case "maxlength":
            flag = val.toString().length > rule;
            break;
          // 值类型验证
          case "type":
            flag = self.doVerifyFieldType(rule, val);
            break;
          // 不等于
          case "noequal":
            flag = (val.toString() !== rule.toString())
            break;
          case "equal":
            flag = (val.toString() === rule.toString())
            break;
          // 范围验证
          case "range":
            var fltVal = parseFloat(val);
            if(fltVal <= rule[0] || rule[1] && fltVal >= rule[1]){
              flag = false;
            }
            break;
          case "regex":
            flag = rule.test(val);
            break;
          // 自定义验证
          case "custom":  
            if(rule) {
              flag = this.runValidateFunction(rule);
            }
            break;
        }
      }

      // 显示或隐藏errorhint
      var fldName = $(fld).attr("name");
      var errorHints = $(frm).find("[data-vtarget^='" + fldName + ":']");
      var errorHint = $(frm).find("[data-vtarget='" + fldName + ":" + rkey + "']");

      errorHint.addClass("hide"); 
      errorHints.removeClass("show");
      if(!flag){ 
        errorHint.addClass("show"); 
        errorHints.removeClass("hide");
      }

      return flag;
    },

    // 注册验证方法
    registerValidateFunction: function(name, arg1, arg2){
      if(!window._sys_validate_functions){
        window._sys_validate_functions = {};
      }

      if(arguments.length === 2){
        window._sys_validate_functions[name] = {
          name: name,
          validator: arg1
        }
      } else if(arguments.length === 3){
        window._sys_validate_functions[name] = {
          name: name,
          options: arg1,
          validator: arg2
        }
      }
    },

    // 获取验证方法
    getValidateFunction: function(name){
      if(window._sys_validate_functions && window._sys_validate_functions[name]){
        return window._sys_validate_functions[name];
      }

      return null;
    },

    runValidateFunction: function(name){
      if(window.formHelper && window.formHelper.getValidateFunction){
        var _vfunc_obj = window.formHelper.getValidateFunction(name);

        if(_vfunc_obj && typeof _vfunc_obj.validator === "function"){
          return _vfunc_obj.validator(_vfunc_obj.options, _vfunc_obj);
        }
      }

      return false;
    },

    // 删除验证方法
    removeValidateFunction: function(name){
      if(window._sys_validate_functions && window._sys_validate_functions[name]){
        window._sys_validate_functions[name] = null;
        delete window._sys_validate_functions[name];
      }
    },

    doVerifyFieldType: function(type, val){
      var flag = true;

      var typeRegs = {
        'email': /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i,
        'url': /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
        'number': /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/,
        'integer': /^[-+]?[0-9]+$/,
        'mobile': /^((1)+\d{10})$/,
        'currency': /^\d{1,13}(\.\d{1,2})?$/  //最长15位，小数点后最多两位
      }

      if(!typeRegs[type]){
        flag = false;
      } else {
        flag = typeRegs[type].test(val);
      }

      return flag;
    }
  };
})();
