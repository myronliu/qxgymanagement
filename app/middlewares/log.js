var uuid       = require('node-uuid');
var onHeaders  = require('on-headers');
var meld       = require('meld');
var superagent =  require('superagent');
var moment     = require('moment');

module.exports.commonLog = function(logger) {
  
  return function(req,res,next){

    var rid = uuid.v4().substring(0,8);

    var ip = req.ip || req.connection.remoteAddress ||
                (req.socket && req.socket.remoteAddress) ||
                (req.socket.socket && req.socket.socket.remoteAddress) ||
                '127.0.0.1';
    var start = (new Date()).getTime();

    var prefs = {};

    prefs['hry-trace-no-key'] = rid;

    prefs['ip'] = ip;
    prefs['time'] = moment(start).format('YYYY-MM-DD HH:mm:ss');

    req.log = res.log = logger.child(prefs, true);
    req.id = rid;
    
    var params = checkObj(req.body)?req.body:req.query

    req.log.info({type:"page_req",path:req.url,headers:{"ua":req.headers['user-agent']},params:params})
    onHeaders(res,function(){
      var time = (new Date()).getTime() - start + 'ms';
      res.set('X-Response-Time', time);
      
      res.log.info({type:"page_res",path:req.url,headers:{"ua":req.headers['user-agent']},executeTime:time})
    })

    next();
  }
}

module.exports.serviceApiLog = function(req, res, next) {
  return function(req, res, next){
    // console.log("=============superagent===============");
    if(superagent.post._advisor){
      if(this.reqPost && this.reqPost.remove){
        this.reqPost.remove();
      }
      if(this.reqCb && this.reqCb.remove){
        this.reqCb.remove();
      }
    }
    this.reqPost = meld.after(superagent,'post',function(request){
      // console.log("-------up start------");
      var reqTime = (new Date()).getTime();
      
      req.log.info({"type":"api_req",path:request.url});
      var headers = request.header || {};
      headers["hry_trace_no_key"]=req.id;// 若没有这个字段，会自动添加；若有，会替换这个字段的值
      request.set(headers);

      this.reqCb = meld.before(request,'callback',function(err,result){

        var executeTime = (new Date()).getTime() - reqTime + 'ms';
        if(err){
          req.log.error({"type":"api_res",path:request.url,error:err,executeTime:executeTime});
        }else{
          if(result.res.statusCode != "200"){//http status code !=200的情况，实际还应该判断30*的情况

            req.log.error({"type":"api_res",path:request.url,error: "statusCode: "+result.res.statusCode + " " + result.res.statusMessage,executeTime:executeTime});
          }else{
            var resBody = result.res.body || {};
            if(!isBusinessSucess(resBody)){//TODO：重要！！！！！！业务结果错误，根据不同的项目做相应的适配。
              req.log.error({"type":"api_res",path:request.url,error:resBody.message,executeTime:executeTime});
            }else{
              req.log.info({"type":"api_res",path:request.url,executeTime:executeTime});
            }
          }
        }
      })
    })
    next()
  }
}

function checkObj(obj){
  for(var item in obj){
    return true;
  }
  return false;
}

function isBusinessSucess(resBody){//TODO：重要！！！！！！业务成功的判断，根据不同的项目做相应的适配。
  if((resBody.responseCode && resBody.responseCode == 0)
      || (resBody.repCode && (resBody.repCode == "000" || resBody.repCode == "00" ||resBody.repCode == "0"))
  ){
    return true;
  }else{
    return false;
  }
}
