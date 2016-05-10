var React = require('react');
var Action = require('../../helper/action');
var Store = require('../../helper/store');
var Loading = require('../../helper/loading');
var UrlConfig = require('../../config/url');
var Toast = require('../../helper/toast');
var Cookie = require('../../helper/cookie');
var Layout = require('../../components/layout');

var edit = React.createClass({
  getInitialState:function(){
    return{
      show: false
    }
  },

  apiSuccess:function(url,body){
    this.showLoading(false);
    switch(url){
      case UrlConfig.createproduct:
        Toast.show("创建成功");
        window.to('/productmanage?id='+this.props.shopId);
        break;
      case UrlConfig.getproduct:
        React.findDOMNode(this.refs.name).value = body.name;
        // React.findDOMNode(this.refs.shopId).value = body.shopId;
        // React.findDOMNode(this.refs.shopName).value = body.shopName;
        // React.findDOMNode(this.refs.shopBacksImg).value = body.shopBacksImg;
        // React.findDOMNode(this.refs.shopAvatarImg).value = body.shopAvatarImg;
        // React.findDOMNode(this.refs.shoper).value = body.shoper;
        // React.findDOMNode(this.refs.tel).value = body.tel;
        React.findDOMNode(this.refs.category).value = body.category;
        React.findDOMNode(this.refs.authorname).value = body.authorname;
        React.findDOMNode(this.refs.unit).value = body.unit;
        React.findDOMNode(this.refs.price).value = body.price;
        React.findDOMNode(this.refs.isvalid).value = body.isvalid;
        React.findDOMNode(this.refs.stock).value = body.stock;
        React.findDOMNode(this.refs.icon).value = body.icon;
        React.findDOMNode(this.refs.queue).value = body.queue;
        React.findDOMNode(this.refs.detail).value = body.detail;
        break;
      case UrlConfig.productupdate:
        Toast.show("修改成功");
        window.to('/productmanage?id='+this.props.shopId);
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
      Action.post(UrlConfig.getproduct, {id: this.props.id});
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
      shopId: this.props.shopId,
      category: React.findDOMNode(this.refs.category).value,
      authorname: React.findDOMNode(this.refs.authorname).value,
      unit: React.findDOMNode(this.refs.unit).value,
      price: React.findDOMNode(this.refs.price).value,
      // isvalid: React.findDOMNode(this.refs.isvalid).value,
      stock: React.findDOMNode(this.refs.stock).value,
      icon: React.findDOMNode(this.refs.icon).value,
      queue: React.findDOMNode(this.refs.queue).value,
      detail: React.findDOMNode(this.refs.detail).value,
    };
    if(!this.props.id){
      params.isvalid = "Y";
      Action.post(UrlConfig.createproduct, params);
    }else{
      params.id = this.props.id;
      params.isvalid = React.findDOMNode(this.refs.isvalid).value;
      Action.post(UrlConfig.productupdate, params);
    }
    return false;
  },

  render: function() {
    return (
      <Layout captionText={"产品管理"} currentPage="shopmanage">
        <div className="container">
          <Loading showLoading={this.state.show} />
          <div className="row">
            <div className="col-lg-2 formField">
              产品名称：
            </div>
            <div className="col-lg-6 formField">
              <input type="text" ref="name" placeholder="产品名称" className="form-control" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-2">
              产品种类：
            </div>
            <div className="col-lg-6 formField">
              <input type="text" ref="category" placeholder="产品种类" className="form-control" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-2">
              创建者姓名：
            </div>
            <div className="col-lg-6 formField">
              <input type="text" ref="authorname" placeholder="创建者姓名" className="form-control" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-2">
              单位：
            </div>
            <div className="col-lg-6 formField">
              <input type="text" ref="unit" placeholder="单位" className="form-control" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-2">
              价格：
            </div>
            <div className="col-lg-6 formField">
              <input type="text" ref="price" placeholder="价格" className="form-control" />
            </div>
          </div>
          {
            this.props.id ?
              (
                <div className="row">
                  <div className="col-lg-2">
                    是否可用：
                  </div>
                  <div className="col-lg-6 formField">
                    <input type="text" ref="isvalid" placeholder="Y" className="form-control" />
                  </div>
                </div>
              ) : 
              <div></div>
          }
          
          <div className="row">
            <div className="col-lg-2">
              库存数量：
            </div>
            <div className="col-lg-6 formField">
              <input type="text" ref="stock" placeholder="库存数量" className="form-control" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-2">
              图标：
            </div>
            <div className="col-lg-6 formField">
              <input type="text" ref="icon" placeholder="图标" className="form-control" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-2">
              加入排队：
            </div>
            <div className="col-lg-6 formField">
              <input type="text" ref="queue" placeholder="" className="form-control" />
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

module.exports = edit;