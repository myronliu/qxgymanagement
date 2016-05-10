var React = require('react');
var Formater = require('../helper/formater');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      format: "YYYY-MM-DD hh:mm:ss",
      istime: true,
      istoday: false,
      placeholder: ""
    };
  },

  getInitialState: function() {
    return {
    };
  },

  componentWillMount: function () {
  },

  componentDidMount: function () {
  },

  getValue: function(){
    return React.findDOMNode(this.refs.dateTimeField).value;
  },

  getDateValue: function(){
    var _inputValue = React.findDOMNode(this.refs.dateTimeField).value;
    if(!_inputValue){
      return null;
    } else {
      return new Date(_inputValue);
    }
  },

  setValue: function(date){
    var _inputValue = Formater.formatDate(date, this.props.format);
    
    React.findDOMNode(this.refs.dateTimeField).value = _inputValue;
  },

  _onFieldClick: function(){
    event.preventDefault();
    
    laydate({
      format: this.props.format,
      istime: this.props.istime,
      istoday: this.props.istoday
    });
  },

  render: function() {
    return (
      <input type="text" ref="dateTimeField" {...this.props} onClick={this._onFieldClick}/>
    );
  }
});
