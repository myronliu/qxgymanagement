var React = require('react');
var Bootstrap = require('react-bootstrap');

module.exports = React.createClass({
  getDefaultProps: function(){
    return {
      totalPage: 0,
      totalCount: 0,
      pageIndex: 1,
      hide: false
    }
  },

  getInitialState:function(){
    return {
      hide: false
    }
  },

  onChangePageCount: function(event){
    this.props.onChangePageCount(event.target.value);
  },

  onFirstBtnClick: function(){
    this.props.onFirst();
  },

  onPrevBtnClick: function(){
    if(this.props.pageIndex && this.props.pageIndex > 1){
      this.props.onPrev();
    }
  },

  onNextBtnClick: function(){
    if(this.props.pageIndex && this.props.pageIndex < this.props.totalPage){
      this.props.onNext();
    }
  },

  onLastBtnClick: function(){
    this.props.onLast();
  },

  handleSelect: function(event, selectedEvent){
    this.setState({
      pageIndex: selectedEvent.eventKey
    });
  },

  componentWillReceiveProps: function(nextProps){
    this.setState({
      hide: nextProps.hide
    })
  },

  render: function(){
    if(this.state.hide){
      return (
        <div className="hide">
        </div>
      )
    }else{
      return (
        <tfoot>
          <tr>
            <td colSpan={this.props.columns}>
              <div className="grid-paginate">
                <Bootstrap.Pager>
                  <Bootstrap.PageItem href='#' onClick={ this.onFirstBtnClick } disabled={this.props.pageIndex <= 1}>首页</Bootstrap.PageItem>&nbsp;
                  <Bootstrap.PageItem href='#' onClick={ this.onPrevBtnClick } disabled={this.props.pageIndex <= 1}>上一页</Bootstrap.PageItem>&nbsp;
                  <Bootstrap.PageItem href='#' onClick={ this.onNextBtnClick } disabled={this.props.pageIndex >= this.props.totalPage}>下一页</Bootstrap.PageItem>&nbsp;
                  <Bootstrap.PageItem href='#' onClick={ this.onLastBtnClick } disabled={this.props.pageIndex >= this.props.totalPage}>末页</Bootstrap.PageItem>
                </Bootstrap.Pager>  
              </div>

              <div className="grid-stats">
                <span className="">第 {this.props.pageIndex}/{this.props.totalPage}页 共{this.props.totalCount}条</span>
              </div>
            </td>
          </tr>
        </tfoot>
      )
    }
  }
});