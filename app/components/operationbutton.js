var React = require('react');
module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      operations: [],
      params: {}
    };
  },

  onItemClick: function(target, evt) {
    evt.preventDefault();

    if(typeof(target.handler) === "function"){
      target.handler(target, this.props.params);
    } else if(typeof(target.click) === "function"){
      target.click(target, this.props.params);
    }
  },

  render : function(){
    var me=this;

    return (
      <div className="operation-center" style={{"width":this.props.tdwidth}}>
        <div className="operation">   
          {this.props.operations.map(function(item, i){
            return (
              <div key={i}>
                <p className={item.icon || item.type}></p>
                <p><a href="#" onClick={me.onItemClick.bind(me, item)}>{item.name}</a></p>
              </div>
            )}
          )}
        </div>
      </div>    
    );
  }
});

