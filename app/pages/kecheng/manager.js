var React = require('react');
var Layout = require('../../components/layout');
var ApiStore = require('../../helper/store');
var ApiAction = require('../../helper/action');
var UrlConfig = require('../../config/url');
var Loading = require('../../helper/loading');
var QuestionItem = require('../../components/questionitem');
var Toast = require('../../helper/toast');

module.exports = React.createClass({
  getInitialState: function(){
    return {
      show: false,
      questions: []
    };
  },
  
  apiSuccess:function(url,body){
    switch(url){
      case UrlConfig.questionupdate:
        this.showLoading(true);
        ApiAction.post(UrlConfig.getquestions,{});
        break;
      case UrlConfig.getquestions:
        this.showLoading(false);
        this.setState({
          questions: body
        })
        break;
    }
  },

  apiFail:function(url,status,message,body){
    this.showLoading(false);
    Toast.show(message, 1500);
  },

  componentWillMount: function(){
    ApiStore.addApiFun(this.apiSuccess,this.apiFail);
  },

  componentDidMount: function(){
    //先注释掉
    this.showLoading(true);
    ApiAction.post(UrlConfig.getquestions,{});
  },
  componentWillUnmount: function() {
    //先注释掉
    ApiStore.removeApiFun(this.apiSuccess,this.apiFail);
  },

  onClick: function(){
    window.to('/questionadd');
  },

  showLoading:function(show) {
    this.setState({show: show});
  },

  renderItem: function(){
    this.items = this.state.questions.map(function(item, i){
      return <QuestionItem key={i} data={item} handlerDisabled={this.handlerDisabled} handlerEnabled={this.handlerEnabled} handlerEdit={this.handlerEdit} handlerAnswer={this.handlerAnswer}/>
    }.bind(this)); 
  },

  handlerDisabled: function(data){
    this.showLoading(true);
    var params = {
      id: data._id,
      title: data.title,
      votesingle: data.votesingle,
      enable: 'N',
      sort: data.sort,
      creater: data.creater
    };
    ApiAction.post(UrlConfig.questionupdate, params);
  },

  handlerEnabled: function(data){
    this.showLoading(true);
    var params = {
      id: data._id,
      title: data.title,
      votesingle: data.votesingle,
      enable: 'Y',
      sort: data.sort,
      creater: data.creater
    };
    ApiAction.post(UrlConfig.questionupdate, params);
  },

  handlerEdit: function(data){
    window.to('/questionadd?id=' + data._id);
  },

  handlerAnswer: function(data){
    window.to('/answers?questionid=' + data._id)
  },

  render: function() {
    this.renderItem();
    return (
      <Layout captionText={"课程管理"} currentPage="kecheng">
        <Loading showLoading={this.state.show} />
        <div className="row">
          <div className="col-lg-2 formField">
            <input type="button" className="btn btn-primary form-control" value="新增"  onClick={this.onClick} />
          </div>
        </div>

        <div>
          {this.items}
        </div>

      </Layout>
    );
  }
})