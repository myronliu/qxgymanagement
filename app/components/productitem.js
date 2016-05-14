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
  width: '15%',
  height: '58px',
  lineHeight: '29px'
};
var contentstyleOrder={
  display: "inline-block",
  marginLeft: "10px",
  width: '40%',
  height: '58px',
  lineHeight: '29px'
};
var contentstyleButtons = {
  display: "inline-block",
  marginLeft: "10px",
  width: '35%',
  // height: '58px',
  // lineHeight: '58px'
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
var rightRed={
  float: 'right',
  height: '28px',
  width: '66px',
  backgroundColor: '#FF146B',
  color: 'white',
  fontSize: '14px',
  textAlign: 'center',
  lineHeight: '28px',
  borderRadius: '3px',
  marginRight: '10px',
  cursor: 'pointer'
};
var rightGreen={
  float: 'right',
  height: '28px',
  width: '66px',
  backgroundColor: '#09C10F',
  color: 'white',
  fontSize: '14px',
  textAlign: 'center',
  lineHeight: '28px',
  borderRadius: '3px',
  marginRight: '10px',
  cursor: 'pointer'
};
var rightPupel={
  float: 'right',
  height: '28px',
  width: '66px',
  backgroundColor: '#7638F1',
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
  display: 'none',
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
  handlerDisabled: function(){
    this.props.handlerDisabled(this.props.data);
  },
  handlerEnabled: function(){
    this.props.handlerEnabled(this.props.data);
  },
  handlerEdit: function(){
    this.props.handlerEdit(this.props.data);
  },
  render:function(){
    return (
      <div style={swiper_div}>
        <div style={content}>
          <div style={photostyle}>
            <img
              style={imgstyle}
              src={this.props.data.icon}
            />
          </div>
          <div style={contentstyle}>
            <div style={shopname}>{this.props.data.productname}</div>
            <div style={type}>{"名称：" + this.props.data.name}</div>
            <div style={selfoperation}>{"库存：" + this.props.data.stock}</div>
          </div>
          <div style={contentstyleOrder}>
            <div style={shopname}>{"单价：" + this.props.data.price + " ／ " + this.props.data.unit}</div>
            <div style={selfoperation}>{"详情：" + this.props.data.detail}</div>
          </div>
          <div style={contentstyleButtons}>
            <div style={right} onClick={this.handlerEdit}>
              编辑
            </div>
            <div style={this.props.data.isvalid == "Y" ? rightRed : rightHide} onClick={this.handlerDisabled}>
              禁用
            </div>
            <div style={this.props.data.isvalid == "N" ? right : rightHide} onClick={this.handlerEnabled}>
              启用
            </div>
          </div>
        </div>
      </div>
    );
  }
});