var React = require('react');
var Layout = require('../../components/layout');
var ApiStore = require('../../helper/store');
var ApiAction = require('../../helper/action');
var UrlConfig = require('../../config/url');
var Loading = require('../../helper/loading');
var OrderItem = require('../../components/orderitem');
var Toast = require('../../helper/toast');

module.exports = React.createClass({
  getInitialState: function(){
    return {
      show: false,
      orders: []
    };
  },
  
  apiSuccess:function(url,body){
    this.showLoading(false);
    switch(url){
      case UrlConfig.orderupdate:
        this.showLoading(true);
        ApiAction.post(UrlConfig.getordersbytype,{shopId: React.findDOMNode(this.refs.shopId).value, status: React.findDOMNode(this.refs.status).value});
        break;
      case UrlConfig.getordersbytype:
        var arr = [];
        var voucherId = "";
        for(var i = 0; i < body.length; i++){
          if(voucherId != body[i].voucherId){
            var time = new Date(parseInt(body[i].createTime));
            var d = time.getFullYear() + '-' + (time.getMonth()+1) + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes();
            voucherId = body[i].voucherId;
            var item = {};
            item.name = body[i].buyerName;
            item.tel = body[i].buyerTel;
            item.ordertime = d;
            item.address = body[i].buyerAddress;
            item.voucherId = body[i].voucherId;
            item.status = body[i].status;
            item.list = [];
            var order = {};
            order.productname = body[i].productName;
            order.productimg = body[i].productIcon;
            order.price = body[i].price;
            order.count = body[i].count;
            order.unit = body[i].unit;
            item.list.push(order);
            arr.push(item);
          }else{
            var item = arr[arr.length-1];
            var order = {};
            order.productname = body[i].productName;
            order.productimg = body[i].productIcon;
            order.price = body[i].price;
            order.count = body[i].count;
            order.unit = body[i].unit;
            item.list.push(order);
          }
        }
        this.setState({
          orders: arr
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
    React.findDOMNode(this.refs.shopId).value = this.props.id ? this.props.id : '';
    ApiAction.post(UrlConfig.getordersbytype,{shopId: this.props.id, status: 0});
  },
  componentWillUnmount: function() {
    //先注释掉
    ApiStore.removeApiFun(this.apiSuccess,this.apiFail);
  },

  onClick: function(){
    this.showLoading(true);
    ApiAction.post(UrlConfig.getordersbytype,{shopId: React.findDOMNode(this.refs.shopId).value, status: React.findDOMNode(this.refs.status).value});
  },

  showLoading:function(show) {
    this.setState({show: show});
  },

  renderItem: function(){
    this.items = this.state.orders.map(function(item, i){
      return <OrderItem key={i} data={item} onClick={this.handleTouch}/>
    }.bind(this)); 
  },

  handleTouch: function(data, status){
    this.showLoading(true);
    ApiAction.post(UrlConfig.orderupdate,{voucherId: data.voucherId, status: status});
  },

  render: function() {
    //0: 待接单； 1: 审核通过； 2: 配送中； 3: 完成； 4: 取消； 5: 失败；
    this.renderItem();
    return (
      <Layout captionText={"订单管理"} currentPage="orderaudit">
        <Loading showLoading={this.state.show} />
        <div className="row">
          <div className="col-lg-3 formField">
            <select className="form-control" placeholder="状态" ref="status">
              <option>--请选择订单状态--</option>
              <option value="0" selected>待接单</option>
              <option value="1">审核通过</option>
              <option value="2">配送中</option>
              <option value="3">已完成</option>
              <option value="4">已取消</option>
              <option value="5">失败</option>
              <option value="6">未通过</option>
            </select>
          </div>
          <div className="col-lg-3 formField">
            <input type="text" ref="shopId" className="form-control" placeholder="shopId"/>
          </div>
          <div className="col-lg-2 formField">
            <input type="button" className="btn btn-primary form-control" value="查询"  onClick={this.onClick} />
          </div>
        </div>

        <div>
          {this.items}
        </div>

      </Layout>
    );
  }
})