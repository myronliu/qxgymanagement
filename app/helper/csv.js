var fs = require("fs");
var csv = require("json2csv");
var iconv = require("iconv-lite");
var _ = require('underscore');

var Formater = require('./formater.js');

var CSVHelper = {};

/*---- 导出csv文件 ----*/

CSVHelper.export = function(data, res, userAgent){
	var _data = adaptData(data);

	// _data = {
	// 	filename : "PromotionRewards_" + Formater.formatDate(new Date(), "yyyyMMddhhmmss") + ".csv",
	// 	fields: ['Car', 'Price', 'Color'],
	// 	content: [
	// 		{"Car": "奥迪", "Price": 40000, "Color": "Blue"},
	// 		{"Car": "BMW", "Price": 35000, "Color": "Black"},
	// 		{"Car": "Porsche", "Price": 60000, "Color": "Green"}
	// 	]
	// };

	// console.log("_data-filename:" + _data.filename);

	// 解决下载文件名乱码问题
	if(userAgent.indexOf('msie') >= 0 || userAgent.indexOf('chrome') >= 0) {
	    res.setHeader('Content-Disposition', 'attachment; filename=' + encodeURIComponent(_data.filename));
	} else if(userAgent.indexOf('firefox') >= 0) {
	    res.setHeader('Content-Disposition', 'attachment; filename*="utf8\'\'' + encodeURIComponent(_data.filename)+'"');
	} else {
	    /* safari等其他非主流浏览器只能自求多福了 */
	    res.setHeader('Content-Disposition', 'attachment; filename=' + new Buffer(_data.filename).toString('binary'));
	}

  res.setHeader("Content-type", "application/octet-stream;charset=gb2312");

	csv({data: _data.content, fields: _data.fields}, function(err, csv){
		if(err)	console.log(err);

		var cont = csv;

		if(iconv.encodingExists("gbk")){
			//将json转为csv格式的content
		    //在写文件之前，转一下编码
			cont = iconv.encode(csv, "gbk");
		}

		res.send(cont);
	});
}

// 将json数据转换为符合csv导出格式
var  adaptData = function(data){
	var _data = {}, _fields=[], _items=[];

	// data格式:
	// {
	//  filename: "导出文件名",
	// 	fields: [{key:"promoterId", label:"推广会员信息", formatFunc: formatFunc},{key:"promotedId", label:"被推广会员信息"}]
	//  items: [{"promoterId": "推广会员1", "promotedId": "被推广会员1"},{"promoterId": "推广会员2", "promotedId": "被推广会员2"}]
	// }

	_.each(data.fields, function(f){
		_fields.push(f.label);
	});

	var i=0;
	_.each(data.items, function(it){
		i++;
		
		var _it = {} ;

		_.each(data.fields, function(f){
			if(f.key == "__sequence"){
				_val = i;
			} else {
				_val = it[f.key];

				if(f.formatFunc){
					_val = f.formatFunc.call(this, _val, it)
				} else if(f.enumdata){
					_val = Formater.formatEnum(_val, f.enumdata)
				}
			}

			_it[f.label] = _val || "";
		});

		_items.push(_it);
	});

	_data = {
		filename: (data.filename || "csv") + "_" + Formater.formatDate(new Date(), "yyyyMMddhhmmss") + ".csv",
		fields: _fields,
		content: _items
	}

	return _data;
}

module.exports = CSVHelper;