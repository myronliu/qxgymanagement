var _ = require('underscore');

var Converter = {};

Converter.convertArrayData = function(arr, keys, converter){
	_data = [];

	_.each(arr, function(it){
		var _it = Converter.convertObjectData(it, keys, converter);

		_data.push(_it);
	});

	return _data;
};

// 对目标对象指定keys值，使用converter进行转换
Converter.convertObjectData = function(obj, keys, converter){
	var _obj = _.clone(obj);

	_.each(keys, function(_k){
		var _v = obj[_k];
		_obj[_k] = converter(_v);
	});
	return _obj;
};

// 元转换为分
Converter.yuanToFen = function (yuan) {
	if(!yuan){
		return 0;
	}

	return yuan * 100;
}

// 分转换为元
Converter.fenToYuan = function (fen) {
	if(!fen){
		return 0;
	}
	
	return fen / 100;
}

// 分转换为元字符串
Converter.fenToYuanStr = function (fen) {
	if(!fen){
		return 0;
	}
	
	var f_x = fen / 100;
	var s_x = f_x.toString();

	var pos_dec = s_x.indexOf('.');
	if (pos_dec < 0)
	{
		pos_dec = s_x.length;
		s_x += '.';
	}

	while (s_x.length <= pos_dec + 2)
	{
		s_x += '0';
	}

	s_x += "元";

	return s_x;
}



module.exports = Converter;