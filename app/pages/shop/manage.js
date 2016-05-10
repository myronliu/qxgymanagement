var React = require('react');
var Layout = require('../../components/layout');
var ApiStore = require('../../helper/store');
var ApiAction = require('../../helper/action');
var UrlConfig = require('../../config/url');
var Loading = require('../../helper/loading');
var ShopItem = require('../../components/shopitem');
var Toast = require('../../helper/toast');

module.exports = React.createClass({
  getInitialState: function(){
    return {
      show: false,
      shops: []
    };
  },
  
  apiSuccess:function(url,body){
    switch(url){
      case UrlConfig.shopupdate:
        this.showLoading(true);
        ApiAction.post(UrlConfig.getshops,{});
        break;
      case UrlConfig.getshops:
        this.showLoading(false);
        this.setState({
          shops: body
        })
        break;
    }
  },

  apiFail:function(url,status,message,body){
    this.showLoading(false);
    Toast.show(message, 1500);
  },

  componentWillMount: function(){
    ApiStore.addApiFun(this.apiSuccess,this.apiFail);
  },

  componentDidMount: function(){
    //先注释掉
    this.showLoading(true);
    ApiAction.post(UrlConfig.getshops,{});
  },
  componentWillUnmount: function() {
    //先注释掉
    ApiStore.removeApiFun(this.apiSuccess,this.apiFail);
  },

  onClick: function(){
    window.to('/shopedit');
  },

  showLoading:function(show) {
    this.setState({show: show});
  },

  renderItem: function(){
    this.items = this.state.shops.map(function(item, i){
      return <ShopItem key={i} data={item} handlerDisabled={this.handlerDisabled} handlerEnabled={this.handlerEnabled} handlerEdit={this.handlerEdit}/>
    }.bind(this)); 
  },

  handlerDisabled: function(data){
    this.showLoading(true);
    var params = {
      id: data._id,
      name: data.name,
      shopBacksImg: data.shopBacksImg,
      shopAvatarImg: data.shopAvatarImg,
      type: data.type,
      self: data.self,
      shoper: data.shoper,
      tel: data.tel,
      address: data.address,
      detail: data.detail,
      status: 0
    };
    ApiAction.post(UrlConfig.shopupdate, params);
  },

  handlerEnabled: function(data){
    this.showLoading(true);
    var params = {
      id: data._id,
      name: data.name,
      shopBacksImg: data.shopBacksImg,
      shopAvatarImg: data.shopAvatarImg,
      type: data.type,
      self: data.self,
      shoper: data.shoper,
      tel: data.tel,
      address: data.address,
      detail: data.detail,
      status: 1
    };
    ApiAction.post(UrlConfig.shopupdate, params);
  },

  handlerEdit: function(data){
    window.to('/shopedit?id=' + data._id);
  },

  render: function() {
    this.renderItem();
    return (
      <Layout captionText={"商店管理"} currentPage="shopmanage">
        <Loading showLoading={this.state.show} />
        <div className="row">
          <div className="col-lg-2 formField">
            <input type="button" className="btn btn-primary form-control" value="新增"  onClick={this.onClick} />
          </div>
        </div>

        <div>
          {this.items}
        </div>

      </Layout>
    );
  }
})