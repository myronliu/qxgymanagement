var assert= require('assert');

var MUtil = require('../../mock/util');

describe('Mock Db test', function() {
  console.log("Start Mock Db test ---------")

  var _resp;

  _resp = MUtil.response(1);
  console.log(_resp);

  assert.equal(_resp.status, 1, ["消息状态应当是 1"]);

  _resp = MUtil.response("success");
  console.log(_resp);

  assert.equal(_resp.message, "success", ["消息内容应当是 success"]);

  _resp = MUtil.response(["data"]);
  console.log(_resp);

  assert.equal(_resp.body.length, 1, ["消息体长度为 1"]);


  _resp = MUtil.response(1, "success");
  console.log(_resp);

  assert.equal(_resp.status, 1, ["消息状态应当是 1"]);
  assert.equal(_resp.message, "success", ["消息内容应当是 success"]);


  _resp = MUtil.response("success", ["data1", "data2"]);
  console.log(_resp);

  assert.equal(_resp.message, "success", ["消息内容应当是 success"]);
  assert.equal(_resp.body.length, 2, ["消息体长度为 2"]);

  _resp = MUtil.response(1, "success", ["data1", "data2", "data3"]);
  console.log(_resp);

  assert.equal(_resp.status, 1, ["消息状态应当是 1"]);
  assert.equal(_resp.message, "success", ["消息内容应当是 success"]);
  assert.equal(_resp.body.length, 3, ["消息体长度为 3"]);

  _resp = MUtil.responseData('/promotion_activity_rule/:activity_id');

  console.log(_resp);

  console.log("End Mock Db test ---------");
});