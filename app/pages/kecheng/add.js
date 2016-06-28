var React = require('react');
var Action = require('../../helper/action');
var Store = require('../../helper/store');
var Loading = require('../../helper/loading');
var UrlConfig = require('../../config/url');
var Toast = require('../../helper/toast');
var Cookie = require('../../helper/cookie');
var Layout = require('../../components/layout');

var register = React.createClass({
  getInitialState:function(){
    return{
      show: false
    }
  },

  apiSuccess:function(url,body){
    this.showLoading(false);
    switch(url){
      case UrlConfig.questionadd:
        Toast.show("添加成功");
        window.to('/kecheng');
        break;
      case UrlConfig.getquestionbyid:
        React.findDOMNode(this.refs.title).value = body.title;
        React.findDOMNode(this.refs.votesingle).value = body.votesingle;
        React.findDOMNode(this.refs.enable).value = body.enable;
        React.findDOMNode(this.refs.sort).value = body.sort;
        break;
      case UrlConfig.questionupdate:
        Toast.show("修改成功");
        window.to('/kecheng');
        break;
    }
  },

  apiFail:function(url,status,message,body){
    this.showLoading(false);
    Toast.show(message, 1500);
  },

  componentDidMount:function(){
    if(this.props.id){
      this.showLoading(true);
      Action.post(UrlConfig.getquestionbyid, {id: this.props.id});
    }
  },

  componentWillMount:function(){
    Store.addApiFun(this.apiSuccess,this.apiFail);
  },

  showLoading:function(show) {
    this.setState({show: show})
  },

  handleSubmit:function(evt){
    evt.preventDefault();
    this.showLoading(true)
    var params = {
      title: React.findDOMNode(this.refs.title).value,
      votesingle: React.findDOMNode(this.refs.votesingle).value,
      enable: "Y",
      sort: React.findDOMNode(this.refs.sort).value,
    };
    if(!this.props.id){
      Action.post(UrlConfig.questionadd, params);
    }else{
      params.id = this.props.id;
      params.enable = React.findDOMNode(this.refs.enable).value;
      Action.post(UrlConfig.questionupdate, params);
    }
    return false;
  },
  render: function() {

// title: {type: String, index: true},
// votesingle: String,
// enable: String,
// sort: String,
// creater: String
    return (
      <Layout captionText={"课程管理"} currentPage="kecheng">
        <div className="container">
          <Loading showLoading={this.state.show} />
          <div className="row">
            <div className="col-lg-2 formField">
              题目：
            </div>
            <div className="col-lg-6 formField">
              <input type="text" ref="title" placeholder="请输入题目" className="form-control" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-2">
              投票类型：
            </div>
            <div className="col-lg-6 formField">
              <input type="text" placeholder="单一投票请填 Y" ref="votesingle" className="form-control" />
            </div>
          </div>
          {
            this.props.id ?
              (
                <div className="row">
                  <div className="col-lg-2">
                    是否激活：
                  </div>
                  <div className="col-lg-6 formField">
                    <input type="text" ref="enable" placeholder="激活请填 Y" className="form-control" />
                  </div>
                </div>
              ) : 
              <div></div>
          }
          <div className="row">
            <div className="col-lg-2">
              排序：
            </div>
            <div className="col-lg-6 formField">
              <input type="text" ref="sort" placeholder="序号" className="form-control" />
            </div>
          </div>
          
          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
              <button type="submit" onClick={this.handleSubmit} class="btn btn-default">确定</button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

});

module.exports = register;