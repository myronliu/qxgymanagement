var React = require('react');
var Action = require('../helper/action');
var Store = require('../helper/store');
var Loading = require('../helper/loading');
var UrlConfig = require('../config/url');
var Toast = require('../helper/toast');
var Cookie = require('../helper/cookie');

var login = React.createClass({
  getInitialState:function(){
    return{
      show: false
    }
  },

  apiSuccess:function(url,body){
    this.showLoading(false);
    switch(url){
      case UrlConfig.getuser:
        Cookie.setCookie('account', body.account);
        Cookie.setCookie('token', body.token);
        if(this.props.fromUrl){
          window.to(this.props.fromUrl);
        }else{
          window.to('/home');
        }
        debugger;
        break;
    }
  },

  apiFail:function(url,status,message,body){
    this.showLoading(false);
    Toast.show(message, 1500);
  },

  componentDidMount:function(){
  },

  componentWillMount:function(){
    Store.addApiFun(this.apiSuccess,this.apiFail);
  },

  showLoading:function(show) {
    this.setState({show: show})
  },

  handleSubmit:function(evt){
    evt.preventDefault();
    this.showLoading(true)
    Action.post(UrlConfig.getuser,{account: React.findDOMNode(this.refs.username).value, password: React.findDOMNode(this.refs.userpwd).value})
    return false;
  },
  render: function() {
    return (
      <div className="login-panel container">
        <Loading showLoading={this.state.show} />
        <section className="login-box row-fluid">
          <div className="title">管理后台</div>
          <div className="caption">用户登录：</div>
          <div className="login-form">
            <form onSubmit={this.handleSubmit} name="form" noValidate={true}>
              <div className="input-group">
                <span className="input-group-addon"></span>
                <input type="text" name="username" className="form-control" placeholder="登录名" required={true} ref="username" />
              </div>
              <div className="input-group">
                <span className="input-group-addon"></span>
                <input type="password" name="userpwd" className="form-control" placeholder="登录密码" required={true} ref="userpwd" />
              </div>
              <div className="input-group verify-code">
                <input type="text" name="verifycode" className="form-control" placeholder="请输入验证码" required={true} ref="verifycode" />
                <span className="input-group-addon verify-code">X8L9</span>
              </div>
              <div className="error-message">请输入用户名！</div>
              <div className="submit-button"><input type="submit" className="btn btn-primary" value="登录" name="login"/></div>
            </form>
          </div>
        </section>

        <section> 
          <div className="copy-right">© 2012 - 2016　 版权所有</div>
        </section>
      </div>
    );
  }

});

module.exports = login;