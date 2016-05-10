var React = require('react');
var Formater = require('../helper/formater');
var Grid = require('../components/grid');
var Layout = require('../components/layout');
var SearchForm = require('../components/searchform');

var dateColumnStyle = {
  width:"100px", 
  textAlign: "center"
};

var toolbarStyle = {
  padding: "5px"
};

var dateFormat = function(dateStr){
  var _fmtValue = Formater.formatDate(dateStr, "yyyy-MM-dd");
  return _fmtValue;
};

var stateFormat = function(state){
  var _fmtValue = Formater.formatEnum(state, {"1": '已生效', "2": '未生效', "3": '已关闭'});
  return _fmtValue;
};

/*
var EditForm = React.createClass({

});
*/

var MySearchForm = React.createClass({
  render : function(){
    return (
      <SearchForm>
        <div className="row">
          <div className="col-lg-6 formField">
            <input type="text" className="form-control" placeholder="活动ID" />
          </div>
          <div className="col-lg-6 formField">
            <input type="text" className="form-control" placeholder="活动名称" />
          </div>
          <div className="col-lg-6 formField">
            <select className="form-control" placeholder="状态">
              <option selected>--请选择状态--</option>
              <option value="1">有效</option>
              <option value="2">无效</option>
              <option value="3">已关闭</option>
            </select>
          </div>
          <div className="col-lg-3 formField">
            <input type="text" className="form-control" placeholder="设置时间起" />
          </div>
          <div className="col-lg-3 formField">
            <input type="text" className="form-control" placeholder="设置时间止" />
          </div>
        </div>
      </SearchForm>
    );
  }
});

var FuncColumn = React.createClass({
  onItemView: function(e){
    console.log(this.props);
  },

  onItemEdit: function(e){
    this.props.onClick(e)
  },

  onItemClose: function(e){
    this.props.onClick(e)
  },

  onItemStart: function(e){
    this.props.onClick(e)
  },

  render : function(){
    return (
      <div>
        <input type="button" value="查看" onClick={this.onItemView} />
        <input type="button" value="编辑" onClick={this.onItemEdit} />
        <input type="button" value="关闭" onClick={this.onItemClose} />
        <input type="button" value="开启" onClick={this.onItemStart} />
      </div>
    );
  }
});

var initData = {
  columns: [
    {key:"promotionActivityId", label:"序号", type: "Sequence", style: {width:"50px", textAlign: "center"}},
    {key:"promotionActivityId", label:"推广活动标识", type: "Hidden"},
    {key:"promotionActivityName", label:"推广活动名", type: "String", style: {width:"150px", textAlign: "left"}},
    {key:"startTime", label:"开始时间", type: "String", formatFunc: dateFormat, style: dateColumnStyle},
    {key:"endTime", label:"结束时间", type: "String", formatFunc: dateFormat, style: dateColumnStyle},
    {key:"registrationStartTime", label:"注册开始时间", type: "String", formatFunc: dateFormat, style: dateColumnStyle},
    {key:"registrationEndTime", label:"注册结束时间", type: "String", formatFunc: dateFormat, style: dateColumnStyle},
    {key:"status", label:"状态", type: "String", formatFunc: stateFormat, style: {width:"60px", textAlign: "left"}},
    {key:"promotionActivityId", label:"操作", type: "Function", formatCmpt: FuncColumn, style: {textAlign: "center"}}
  ]
};

module.exports = React.createClass({
  render: function() {
    return (
      <Layout>
        <MySearchForm />
        <div className="btn-toolbar" style={toolbarStyle} role="toolbar" aria-label="工具栏">
          <button type="button" className="btn btn-default">新增推广活动</button>
        </div>
        <Grid data={initData} />
      </Layout>
    );
  }
});