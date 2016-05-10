var React = require('react');

var Layout = require('../components/layout');

module.exports = React.createClass({
  render: function() {
    return (
      <Layout captionText="欢迎使用海融易系统管理后台">
        <div style={{ padding: "20px" }}>
          <h4>欢迎使用海融易系统管理后台！</h4>
          <p></p>
        </div>
      </Layout>
    );
  }
});