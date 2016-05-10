var React = require('react');

var swiper_div={
  padding: "10px",
  paddingBottom: "0px",
  marginBottom: "10px",
  backgroundColor: "white",
  marginBottom: '10px',
  borderTop: '4px solid',
  borderTopColor: 'darkgrey',
  paddingTight: '40px'
};
var content={
  display: "inline-block",
  width: '100%',
  borderBottom: 'solid 1px',
  borderBottomColor: '#CECECE'
};
var content_address={
  display: "inline-block",
  width: '100%',
  paddingBottom:'10px',
  paddingTop:'10px'
};
var icon_style={
  display: "inline-block",
  width: '29%',
  textAlign: 'center',
  height: '58px',
  verticalAlign: 'middle',
};
var photostyle={
  display: "inline-block",
  height: "58px",
  float: "left",
  marginTop: "7px"
};
var imgstyle={
  width: "40px",
  height: "40px",
};
var contentstyle={
  display: "inline-block",
  marginLeft: "10px",
  width: '70%'
};
var contentstyleOrder={
  display: "inline-block",
  marginLeft: "10px",
  width: '100%'
};
var shopname={
  fontSize: "15px",
  fontWeight: "bold"
};
var type={
  fontSize:"10px"
};
var selfoperation={
  fontSize:"10px"
};
var rightstyle_add={
  display: 'inline-block',
  width: '20px',
  float: 'right'
};
var rightstyle_num={
  display: 'inline-block',
  color:'red',
  fontWeight:'bold'
};
var rightstyle_sub={
  display: 'inline-block',
  width: '20px',
  float: 'left'
};
var rightimg={
  width: "20px",
  height: "20px",
};
var left = {
  float: 'left',
  height: '28px',
  fontSize: '14px',
  lineHeight: '28px',
  color: '#5DC333'
};
var right={
  float: 'right',
  height: '28px',
  width: '66px',
  backgroundColor: '#FF7514',
  color: 'white',
  fontSize: '14px',
  textAlign: 'center',
  lineHeight: '28px',
  borderRadius: '3px',
  marginRight: '10px',
  cursor: 'pointer'
};
var rightHide={
  float: 'right',
  height: '28px',
  width: '66px',
  backgroundColor: '#FF7514',
  color: 'white',
  fontSize: '14px',
  textAlign: 'center',
  lineHeight: '28px',
  borderRadius: '3px',
  marginRight: '10px',
  display: 'none'
};

module.exports = React.createClass({
  getDefaultProps: function(){
    data:{}
  },
  getInitialState: function(){
    return {
      count: 0
    }
  },
  componentDidMount: function(){
    
  },
  renderItems: function(){
    return this.props.data.list.map(function(item, index){
      return (
        <div key={index} style={content}>
          <div style={photostyle}>
            <img
              style={imgstyle}
              src={item.productimg}
            />
          </div>
          <div style={contentstyle}>
            <div style={shopname}>{item.productname}</div>
            <div style={type}>{"价格：" + item.price + "元／"+item.unit}</div>
            <div style={selfoperation}>{"数量：" + item.count}</div>
          </div>
        </div>
      )
    });
  },
  handlerReject: function(){
    this.props.onClick(this.props.data, 6);
  },
  handlerPass: function(){
    this.props.onClick(this.props.data, 1);
  },
  handlerDeliver: function(){
    this.props.onClick(this.props.data, 2);
  },
  handlerFinish: function(){
    this.props.onClick(this.props.data, 3);
  },
  render:function(){
    var statusMessage = "未知";
    //0: 待接单； 1: 审核通过； 2: 配送中； 3: 完成； 4: 取消； 5: 失败； 6：未通过
    switch(this.props.data.status.toString()){
      case "0":
        statusMessage = "待接单";
        break;
      case "1":
        statusMessage = "审核通过";
        break;
      case "2":
        statusMessage = "配送中";
        break;
      case "3":
        statusMessage = "完成";
        break;
      case "4":
        statusMessage = "取消";
        break;
      case "5":
        statusMessage = "失败";
        break;
      case "6":
        statusMessage = "未通过";
        break;
    }
    return (
      <div style={swiper_div}>
        {this.renderItems()}
        <div style={content_address}>
          <div style={contentstyleOrder}>
            <div style={shopname}>{this.props.data.name + "  " + this.props.data.tel}</div>
            <div style={type}>{"订单号：" + this.props.data.voucherId}</div>
            <div style={type}>{"订单创建时间：" + this.props.data.ordertime}</div>
            <div style={selfoperation}>{"地址：" + this.props.data.address}</div>
            <div style={selfoperation}>
              <div style={left}>{"状态：" + statusMessage}</div>
              <div style={this.props.data.status == "0" ? right : rightHide} onClick={this.handlerReject}>
                拒绝
              </div>
              <div style={this.props.data.status == "0" ? right : rightHide} onClick={this.handlerPass}>
                通过
              </div>
              <div style={this.props.data.status == "1" ? right : rightHide} onClick={this.handlerDeliver}>
                配送中
              </div>
              <div style={this.props.data.status == "1" ? right : rightHide} onClick={this.handlerFinish}>
                完成
              </div>
              <div style={this.props.data.status == "2" ? right : rightHide} onClick={this.handlerFinish}>
                完成
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});