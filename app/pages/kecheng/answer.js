var React = require('react');
var Layout = require('../../components/layout');
var ApiStore = require('../../helper/store');
var ApiAction = require('../../helper/action');
var UrlConfig = require('../../config/url');
var Loading = require('../../helper/loading');
var AnswerItem = require('../../components/answeritem');
var Toast = require('../../helper/toast');

module.exports = React.createClass({
  getInitialState: function(){
    return {
      show: false,
      answers: []
    };
  },
  
  apiSuccess:function(url,body){
    switch(url){
      case UrlConfig.questionupdate:
        this.showLoading(true);
        ApiAction.post(UrlConfig.getquestions,{});
        break;
      case UrlConfig.getanswervotes:
        this.showLoading(false);
        for(var i=0; i<body.answers.length; i++){
          for(var j=0; j< body.votes.length; j++){
            if(body.answers[i]._id === body.votes[j]._id.answerid){
              body.answers[i].vote = body.votes[j].total;
            }
          }
        }
        this.setState({
          answers: body.answers,
        })
        // this.setState({
        //   answers: body
        // })
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
    console.log(this.props.questionid)
    ApiAction.post(UrlConfig.getanswervotes,{questionid: this.props.questionid});
  },
  componentWillUnmount: function() {
    //先注释掉
    ApiStore.removeApiFun(this.apiSuccess,this.apiFail);
  },

  showLoading:function(show) {
    this.setState({show: show});
  },

  renderItem: function(){
    this.items = this.state.answers.map(function(item, i){
      return <AnswerItem key={i} data={item} />
    }.bind(this)); 
  },

  handlerEdit: function(data){
    window.to('/questionadd?id=' + data._id);
  },

  render: function() {
    this.renderItem();
    return (
      <Layout captionText={"课程管理"} currentPage="kecheng">
        <Loading showLoading={this.state.show} />
        <div>
          {this.items}
        </div>
      </Layout>
    );
  }
})