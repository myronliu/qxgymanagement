var React = require('react');
var Layout = require('../../components/layout');
var ApiStore = require('../../helper/store');
var ApiAction = require('../../helper/action');
var UrlConfig = require('../../config/url');
var Loading = require('../../helper/loading');
var ProductItem = require('../../components/productitem');
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
      case UrlConfig.productupdate:
        this.showLoading(true);
        ApiAction.post(UrlConfig.getproducts,{shopId: React.findDOMNode(this.refs.shopId).value});
        break;
      case UrlConfig.getproducts:
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
    // ApiAction.post(UrlConfig.getshops,{});
    React.findDOMNode(this.refs.shopId).value = this.props.id ? this.props.id : '';
    ApiAction.post(UrlConfig.getproducts,{shopId: this.props.id});
  },
  componentWillUnmount: function() {
    //先注释掉
    ApiStore.removeApiFun(this.apiSuccess,this.apiFail);
  },

  onClickSearch: function(){
    this.showLoading(true);
    ApiAction.post(UrlConfig.getproducts,{shopId: React.findDOMNode(this.refs.shopId).value});
  },

  onClickAdd: function(){
    window.to('/productedit?shopId=' + React.findDOMNode(this.refs.shopId).value);
  },

  showLoading:function(show) {
    this.setState({show: show});
  },

  renderItem: function(){
    this.items = this.state.shops.map(function(item, i){
      return <ProductItem key={i} data={item} handlerDisabled={this.handlerDisabled} handlerEnabled={this.handlerEnabled} handlerEdit={this.handlerEdit}/>
    }.bind(this)); 
  },

  handlerDisabled: function(data){
    this.showLoading(true);
    var params = {
      id: data._id,
      name: data.name,
      shopId: data.shopId,
      shopName: data.shopName,
      shopBacksImg: data.shopBacksImg,
      shopAvatarImg: data.shopAvatarImg,
      shoper: data.shoper,
      tel: data.tel,
      category: data.category,
      authorname: data.authorname,
      unit: data.unit,
      price: data.price,
      isvalid: 'N',
      stock: data.stock,
      icon: data.icon,
      queue: data.queue,
      detail: data.detail,
      remarks: data.remarks
    };
    ApiAction.post(UrlConfig.productupdate, params);
  },

  handlerEnabled: function(data){
    this.showLoading(true);
    var params = {
      id: data._id,
      name: data.name,
      shopId: data.shopId,
      shopName: data.shopName,
      shopBacksImg: data.shopBacksImg,
      shopAvatarImg: data.shopAvatarImg,
      shoper: data.shoper,
      tel: data.tel,
      category: data.category,
      authorname: data.authorname,
      unit: data.unit,
      price: data.price,
      isvalid: 'Y',
      stock: data.stock,
      icon: data.icon,
      queue: data.queue,
      detail: data.detail,
      remarks: data.remarks
    };
    ApiAction.post(UrlConfig.productupdate, params);
  },

  handlerEdit: function(data){
    window.to('/productedit?id=' + data._id + '&shopId=' + React.findDOMNode(this.refs.shopId).value);
  },

  render: function() {
    this.renderItem();
    return (
      <Layout captionText={"产品管理"} currentPage="productmanage">
        <Loading showLoading={this.state.show} />
        <div className="row">
          <div className="col-lg-3 formField">
            <input type="text" ref="shopId" className="form-control" placeholder="shopId"/>
          </div>
          <div className="col-lg-2 formField">
            <input type="button" className="btn btn-primary form-control" value="查询"  onClick={this.onClickSearch} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-2 formField">
            <input type="button" className="btn btn-primary form-control" value="新增"  onClick={this.onClickAdd} />
          </div>
        </div>
        <div>
          {this.items}
        </div>

      </Layout>
    );
  }
})