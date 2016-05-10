var React = require('react');
var Action = require('../../helper/action');
var Store = require('../../helper/store');
var Loading = require('../../helper/loading');
var UrlConfig = require('../../config/url');
var Toast = require('../../helper/toast');
var Cookie = require('../../helper/cookie');
var Layout = require('../../components/layout');

var register = React.createClass({
  getInitialState:function(){
    return{
      show: false
    }
  },

  apiSuccess:function(url,body){
    this.showLoading(false);
    switch(url){
      case UrlConfig.shopregister:
        Toast.show("注册成功");
        window.to('/productmanage');
        break;
      case UrlConfig.getshopbyid:
        React.findDOMNode(this.refs.name).value = body.name;
        React.findDOMNode(this.refs.shopBacksImg).value = body.shopBacksImg;
        React.findDOMNode(this.refs.shopAvatarImg).value = body.shopAvatarImg;
        React.findDOMNode(this.refs.type).value = body.type;
        React.findDOMNode(this.refs.self).value = body.self;
        React.findDOMNode(this.refs.shoper).value = body.shoper;
        React.findDOMNode(this.refs.tel).value = body.tel;
        React.findDOMNode(this.refs.address).value = body.address;
        React.findDOMNode(this.refs.detail).value = body.detail;
        React.findDOMNode(this.refs.status).value = body.status;
        break;
      case UrlConfig.shopupdate:
        Toast.show("修改成功");
        window.to('/productmanage');
        break;
    }
  },

  apiFail:function(url,status,message,body){
    this.showLoading(false);
    Toast.show(message, 1500);
  },

  componentDidMount:function(){
    if(this.props.id){
      this.showLoading(true);
      Action.post(UrlConfig.getshopbyid, {id: this.props.id});
    }
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
    var params = {
      name: React.findDOMNode(this.refs.name).value,
      shopBacksImg: React.findDOMNode(this.refs.shopBacksImg).value,
      shopAvatarImg: React.findDOMNode(this.refs.shopAvatarImg).value,
      type: React.findDOMNode(this.refs.type).value,
      self: React.findDOMNode(this.refs.self).value,
      shoper: React.findDOMNode(this.refs.shoper).value,
      tel: React.findDOMNode(this.refs.tel).value,
      address: React.findDOMNode(this.refs.address).value,
      detail: React.findDOMNode(this.refs.detail).value,
      status: 1
    };
    if(!this.props.id){
      Action.post(UrlConfig.shopregister, params);
    }else{
      params.id = this.props.id;
      params.status = React.findDOMNode(this.refs.status).value;
      Action.post(UrlConfig.shopupdate, params);
    }
    return false;
  },
  render: function() {
    return (
      <Layout captionText={"商店管理"} currentPage="shopmanage">
        <div className="container">
          <Loading showLoading={this.state.show} />
          <div className="row">
            <div className="col-lg-2 formField">
              商店名称：
            </div>
            <div className="col-lg-6 formField">
              <input type="text" ref="name" placeholder="商店名称" className="form-control" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-2">
              背景图片：
            </div>
            <div className="col-lg-6 formField">
              <input type="text" ref="shopBacksImg" placeholder="背景图片" className="form-control" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-2">
              头像图片：
            </div>
            <div className="col-lg-6 formField">
              <input type="text" ref="shopAvatarImg" placeholder="头像图片" className="form-control" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-2">
              商店类型：
            </div>
            <div className="col-lg-6 formField">
              <input type="text" ref="type" placeholder="商店类型" className="form-control" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-2">
              是否自营：
            </div>
            <div className="col-lg-6 formField">
              <input type="text" ref="self" placeholder="" className="form-control" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-2">
              店主姓名：
            </div>
            <div className="col-lg-6 formField">
              <input type="text" ref="shoper" placeholder="店主" className="form-control" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-2">
              店主手机：
            </div>
            <div className="col-lg-6 formField">
              <input type="text" ref="tel" placeholder="店主手机" className="form-control" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-2">
              商家地址：
            </div>
            <div className="col-lg-6 formField">
              <input type="text" ref="address" placeholder="商家地址" className="form-control" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-2">
              详情：
            </div>
            <div className="col-lg-6 formField">
              <input type="text" ref="detail" placeholder="详情" className="form-control" />
            </div>
          </div>
          {
            this.props.id ?
              (
                <div className="row">
                  <div className="col-lg-2">
                    状态：
                  </div>
                  <div className="col-lg-6 formField">
                    <input type="text" ref="status" placeholder="状态" className="form-control" />
                  </div>
                </div>
              ) : 
              <div></div>
          }
          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
              <button type="submit" onClick={this.handleSubmit} class="btn btn-default">确定</button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

});

module.exports = register;