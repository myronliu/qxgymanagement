var React = require('react');

module.exports = React.createClass({
  propTypes:{
    show: React.PropTypes.bool
  },
  getDefaultProps: function(){
    return {
      show: false
    }
  },
  getInitialState: function(){
    return {
      show: this.props.show
    }
  },
  componentWillReceiveProps: function(nextProps){
    this.setState({
      show: nextProps.show
    })
  },
  handleClick: function(){
    this.setState({
      show: false
    })
    if(this.props.handleClosePopUp){
      this.props.handleClosePopUp();
    }
  },
  render: function(){
    return (
      <div className={this.state.show ? "show" : "hide"} >
        <div className="pop-background">
        </div>
        <div className="pop-content">
          <div className="pop-title">
            <div className="pop-title-left">
              {this.props.title}
            </div>
            <div className="pop-title-right" onClick={this.handleClick}>
              X
            </div>
          </div>
          {this.props.children}
        </div>
      </div>
    )
  }
});