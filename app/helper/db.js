var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/qxgy');//；连接数据库

module.exports = mongoose;//  与users集合关联