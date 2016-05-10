var React = require('react');

var style={
  height: 'auto',
  overflow: 'hidden'
};

module.exports = React.createClass({
  handlerOk: function(){
    this.props.onClick(true);
  },
  handlerCancel: function(){
    this.props.onClick(false);
  },
  render: function(){
    return (
      <div className="no-padding col-sm-12">
        <div className={this.props.show ? "show" : "hide"}>
          <div className="show-style">
          </div>
          <div className="content-style">
            <div className="title-style">
              {this.props.title}
            </div>
            <div className="message-style">
              <div>
                {this.props.children}
              </div>
              <div className="btn-toolbar marginTop1em" role="toolbar">
                <button type="button" className="btn btn-primary" onClick={this.handlerCancel} >取消</button>
                <button type="button" className="btn btn-primary" onClick={this.handlerOk} >确定</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});