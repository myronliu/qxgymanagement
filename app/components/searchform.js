var React = require('react');
var FormHelper = require('../helper/form');

var formStyle = {
  margin: "2px 0px",
  backgroundColor: "#eee"
}

var queryPanelStyle = {
  padding: "1em"
}

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      captionText : "标题"
    };
  },

  getSearchData: function(preData, ignoreEmpty){
    var _frm;

    if(this.refs.searchFrm){
      _frm = React.findDOMNode(this.refs.searchFrm);
    } else {
      _frm = React.findDOMNode(this.refs.searchForm);
    }

    var _data = FormHelper.getFormData(_frm, preData, ignoreEmpty != false);
    
    return _data;
  },

  getSearchQueryString: function(){
    var _frm = React.findDOMNode(this.refs.searchFrm);
    var _qryStr = FormHelper.getSearchQueryString(_frm);

    return _qryStr;
  },

  render:function(){
    return (
      <form ref="searchFrm" className="row" style={formStyle}>
        <div className="col-lg-8" style={queryPanelStyle}>
          {this.props.children}
        </div>
        <div className="col-lg-4" style={queryPanelStyle}>
          <div className="formField">
            <input type="button" className="btn btn-primary" value="查询"  onClick={this.props.onClick.bind(null,this)} />
          </div>
        </div>
      </form>
    )
  }
});