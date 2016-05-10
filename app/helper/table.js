var tableHelper = {};

tableHelper.getTotalPage = function(totalCount, rowCount){
  var _pageCount = !totalCount ? 1 : Math.ceil(totalCount/rowCount);

  return _pageCount;
};

module.exports = tableHelper;