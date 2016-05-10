var React = require('react');

module.exports = React.createClass({
  propTypes:{
    list:React.PropTypes.array
  },
  getDefaultProps: function(){
    return {
      list:[]
    }
  },
  getInitialState: function(){
    return {
      list: this.props.list
    }
  },
  componentWillReceiveProps: function(nextProps){
    this.setState({
      list: nextProps.list
    })
  },
  onClick: function(e){
    if(e.target.className === "tab-cur"){
      return;
    }
    var id = 0;
    this.setState({
      list: this.state.list.map(function(item){
        if(item.title === e.target.innerHTML){
          item.cur = true;
          id = item.id;
        }else{
          item.cur = false;
        }
        return item;
      })
    });
    this.props.onClick(id);
  },
  renderItems: function(){
    this.items = this.state.list.map(function(item, i){
      return (
        <div key={i} className={item.cur ? "tab-cur" : "tab"} onClick={this.onClick}>
          {item.title}
        </div>
      )
    }.bind(this));
  },
  render: function(){
    this.renderItems();
    return (
      <div>
        {this.items}
      </div>
    )
  }
});