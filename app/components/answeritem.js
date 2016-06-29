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
  display: "none",
  // display: "inline-block",
  height: "58px",
  float: "left",
  marginTop: "7px"
};
var imgstyle={
  width: "40px",
  height: "40px",
};
var contentstyle={
  display: "block",
  marginLeft: "10px",
  width: '35%',
  height: '29px',
  lineHeight: '29px'
};
var contentstyleOrder={
  display: "block",
  marginLeft: "10px",
  width: '40%',
  height: '29px',
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
  fontSize:"10px",
  display: "inline-block"
};
var selfoperation={
  fontSize:"10px",
  display: "inline-block",
  marginLeft:"30px"
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
  render:function(){
    return (
      <div style={swiper_div}>
        <div style={content}>
          <div style={photostyle}>
            <img
              style={imgstyle}
              src={this.props.data.shopAvatarImg}
            />
          </div>

          <div style={contentstyle}>
            <div style={type}>{"答题人：" + this.props.data.author}</div>
            <div style={selfoperation}>{"票数：" + this.props.data.vote}</div>
          </div>
          <div style={contentstyleOrder}>
            <div style={shopname}>{"答案：" + this.props.data.answer}</div>
          </div>
        </div>
      </div>
    );
  }
});