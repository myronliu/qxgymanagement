var React = require('react');
var _ = require('underscore');
var Bootstrap = require('react-bootstrap');
var Formater = require('../helper/formater');

var StyleSheet = {
  hiddenStyle : {
    display: "none"
  }, 

  errorStyle : {
    color: "red"
  }, 

  noDataStyle: {
    textAlign: "center",
    border: "1px #ccc solid",
    backgroundColor: "#eee",
    padding: "20px"
  }  
}

// var testData = {
//  "columns":[{"key":"Num","label":"Number","type":"Number"}],
//  "items":[{"Num":6,"Picture":"http:\/\/stats.nba.com\/media\/players\/230x185\/201599.png","Name":"DeAndre Jordan","Pos":"C","Height":"6-11","Weight":250,"Birthday":"07\/21\/1988","Years":"6"}],
//  "paginate":{"page":1,"pages":3,"offset":0,"row_count":5,"total":15,"col_name":"Name","direction":"asc"}
//}

module.exports = React.createClass({

  loadLocalData: function(data){
    this.setState({local_data: data});

    var _data = this.adaptData(data);

    this.setState({paginate: _data.paginate});
    this.setState({data: _data});
  },

	loadData: function () {
    // 从服务端加载数据，暂未实现
    // var _data = {body:[]};

    // var _data ={
    //   "status": 1,
    //   "message": "error message or null",
    //   "body": [
    //     {
    //       "promotionActivityId": 123,
    //       "promotionActivityName": "推新活动",
    //       "startTime": "2014-05-12 00:00:00",
    //       "endTime": "2014-05-22 23:59:59",
    //       "registrationStartTime": "",
    //       "registrationEndTime": "",
    //       "status": 1
    //     },
    //     {
    //       "promotionActivityId": 133,
    //       "promotionActivityName": "推新活动2",
    //       "startTime": "2014-06-12 00:00:00",
    //       "endTime": "2014-06-22 23:59:59",
    //       "registrationStartTime": "",
    //       "registrationEndTime": "",
    //       "status": 1
    //     }
    //   ]
    // };

    var _data = this.state.data;

    if(this.state.local_data){
      _data = this.adaptData(this.state.local_data);
    }

    this.setState({paginate: _data.paginate});
    this.setState({data: _data});
  },

  error: function(err){
    if(err && err.message){
      this.setState({
        data: {
          errormessage: err.message
        }
      });
    }
  },

  getDefaultProps: function() {
    return {
      footer: "true",
      onRowRender: null
    };
  },

  getInitialState: function () {
    return {
      data: {
        columns: [],
        items: [],
        paginate: {
          page: 1,
          pages: 1,
          offset: 0,
          row_count: 5,
          total: 0,
          col_name: "Name",
          direction: "asc"
        }
      }
    };
  },

  componentWillMount: function(){
    if(this.props.data && this.props.data.columns && this.props.data.columns.length > 0){
      _.each(this.props.data.columns, function(col){
        if(col.formatCmpt){
          col.formatCmptFunc = React.createFactory(col.formatCmpt);
        }
      })
    }

    if(this.props.rowCount){
      this.state.data.paginate.row_count = this.props.rowCount;
    }
  },

  componentDidMount: function () {
    this.loadData();
  },

  adaptData: function(data){
    var _data = {};

    /*适配数据, 由于推广系统无分页信息，这里需要对数据进行适配*/
    if(data && data.length > 0){
      _data = _.extend({}, this.state.data, this.props.data || {});

      _data.paginate.total = data.length;
      _data.paginate.pages = Math.ceil(data.length/this.state.data.paginate.row_count);

      var _start_pos = (_data.paginate.page - 1) * _data.paginate.row_count;
      var _end_pos = _start_pos + _data.paginate.row_count;

      if(_end_pos >= _data.paginate.total){
        _end_pos = _data.paginate.total;
      }

      _data.items = data.slice(_start_pos, _end_pos);
    } else {
      _data = _.extend({
        columns: this.state.data.columns,
        paginate: this.state.data.paginate
      }, _data);
    }

    if(_data && _data.paginate && _data.items && _data.items.length > 0){
      // 刷新排序信息
      var _start_pos = (_data.paginate.page - 1) * _data.paginate.row_count;

      if(_data.items && _data.items.length > 0){
        for(var i=0; i<_data.items.length; i++){
          _data.items[i].__sequence = (_start_pos + i + 1);
        }
      }
    }

    return _data;
  },

  findSingleRowData: function(condition, joinType){
    if(!condition){
      if(!this.state.data.items || this.state.data.items.length == 0)
        return null;
      else
        return this.state.data.items[0];
    } else {
      for(var i=0; i<this.state.data.items.length; i++){
        var _item = this.state.data.items[i];

        var _isMatch = this.checkIsMatch(_item, condition, joinType);

        if(_isMatch){
          return _item;
        }
      }
    }

    return null;
  },

  findRowData: function(condition, joinType){  // condition为条件，joinType为合并功能, or|and
    if(!condition){
      return this.state.data.items;
    }

    var _rtn_items = [];

    for(var i=0; i<this.state.data.items.length; i++){
      var _item = this.state.data.items[i];

      var _isMatch = this.checkIsMatch(_item, condition, joinType);

      if(_isMatch){
        _rtn_items.push(_item);
      }
    }

    return _rtn_items;
  },

  checkIsMatch: function(item, condition, joinType){
    // 检查item是否满足对应条件
    // condition为条件，joinType为合并功能, or|and，默认and
    if(!item || !condition){
      return false;
    }

    var isMatch = false;

    if(joinType == "or"){
      isMatch = false;

      for(key in condition){
        if(condition[key] && (_item[key] &&  _item[key] == condition[key])){
          isMatch = true;
          break;
        }
      }
    } else {
      isMatch = true;

      for(key in condition){
        if(condition[key] || (!_item[key] ||  _item[key] != condition[key])){
          isMatch = false;
          break;
        }
      }
    }

    return isMatch;
  },

  getFirst: function () {
    this.setState({paginate: _.extend(this.state.paginate, {
      page: 1
    })});
    this.loadData.call(this);
  },

  getPrev: function () {
    this.setState({paginate: _.extend(this.state.paginate, {
      page: this.state.paginate.page - 1
    })});
    this.loadData.call(this);
  },

  getNext: function () {
    this.setState({paginate: _.extend(this.state.paginate, {
      page: this.state.paginate.page + 1
    })});
    this.loadData.call(this);
  },

  getLast: function () {
    this.setState({paginate: _.extend(this.state.paginate, {
      page: this.state.paginate.pages
    })});
    this.loadData.call(this);
  },

  getSelectedItems: function(){
    if(!this.state.data || !this.state.data.items || this.state.data.items.length == 0){
      return [];
    }

    var _inputs = React.findDOMNode(this). getElementsByTagName("input");
    var _sel_seqs = [];

    var _sel_rows = [];

    _.each(_inputs, function(_input){
      if(_input.name 
        && _input.name.indexOf("__sel_") == 0  
        && _input.id 
        && _input.id.indexOf(_input.name) == 0){
        if(_input.checked == true){
          // selector组件
          var _seq = _input.id.substr(_input.name.length + 1);

          _sel_seqs.push(parseInt(_seq));
        }
      }
    });

    _sel_seqs = _.uniq(_sel_seqs);

    _sel_rows = _.filter(this.state.data.items, function(_row){
      return _.contains(_sel_seqs, _row.__sequence);
    });

    _sel_rows = _.uniq(_sel_rows);

    return _sel_rows;
  },

  changeRowCount: function (e) {
    var el = e.target;
    this.setState({paginate: _.extend(this.state.paginate, {
      row_count: parseInt(el.options[el.selectedIndex].value)
    })});
    this.loadData.call(this);
  },

  sortData: function (e) {
    e.preventDefault();
    var el = e.target,
      col_name = el.getAttribute("data-column"),
      direction = el.getAttribute("data-direction");
    this.setState({paginate: _.extend(this.state.paginate, {
      col_name: col_name,
      direction: direction
    })});
    this.loadData.call(this);
  },

  render: function () {
    if(this.state.data && this.state.data.errormessage){
      return (
        <div style={StyleSheet.errorStyle}>
          {this.state.data.errormessage}
        </div>
      );
    } else if(!this.state.data || !this.state.data.items || this.state.data.items.length == 0){
      return (
        <div style={StyleSheet.noDataStyle}>
          暂无数据
        </div>
      );
    } else {
      return (
    		<div>
      		<table className="grid-table">
            <Head data={this.state.data} onSort={this.sortData} />
            <Body data={this.state.data} onRowRender={this.props.onRowRender} />
            <Foot style={this.props.footer === "false" ? StyleSheet.hiddenStyle : {}} 
              data={this.state.data} 
              onFirst={this.getFirst} 
              onPrev={this.getPrev} 
              onNext={this.getNext} 
              onLast={this.getLast} 
              onChange={this.changeRowCount} 
              onRefresh={this.loadData}/>
          </table>
    		</div>
    	);
    }
  }
});

var Head = React.createClass({
  render: function () {
    var that = this;
    return (
      <thead>
        <tr>
        {this.props.data.columns.map(function (column, i) {
          return <HeadCell style={column.type === "Hidden" ? StyleSheet.hiddenStyle : (column.headStyle || {"textAlign":"center"})} key={i} column={column} direction={that.props.data.paginate.direction} onSort={that.props.onSort} />
        })}
        </tr>
      </thead>
    );
  }
});

var Foot = React.createClass({
  render: function () {
    return (
      <tfoot style={this.props.style}>
        <tr>
          <td colSpan={this.props.data.columns.length}>
           <div className="grid-paginate">
               <Bootstrap.Pager>  
                   <Bootstrap.PageItem href='#'   onClick={this.props.onFirst} disabled={this.props.data.paginate.page === 1}>首页</Bootstrap.PageItem>&nbsp;
                   <Bootstrap.PageItem href='#'   onClick={this.props.data.paginate.page === 1 ? "" :  this.props.onPrev}   disabled={this.props.data.paginate.page === 1} >上一页</Bootstrap.PageItem>&nbsp;
                  <Bootstrap.PageItem href='#'    onClick={this.props.data.paginate.page === this.props.data.paginate.pages ? "" : this.props.onNext } disabled={this.props.data.paginate.page === this.props.data.paginate.pages} >下一页</Bootstrap.PageItem>&nbsp;
                   <Bootstrap.PageItem href='#'    onClick={this.props.onLast} disabled={this.props.data.paginate.page === this.props.data.paginate.pages}>末页</Bootstrap.PageItem>
               </Bootstrap.Pager>  
            </div>
            <div className="grid-stats">
                <span className="">第 {this.props.data.paginate.page} /{this.props.data.paginate.pages}页  共{this.props.data.paginate.total}条</span>
             </div>
          </td>
        </tr>
      </tfoot>
    );
  }
});

var Button = React.createClass({
  render: function () {
    return (
      <button type="button" onClick={this.props.onClick} disabled={this.props.disabled}>{this.props.text}</button>
    );
  }
});

var Option = React.createClass({
  render: function () {
    return (
      <option value={this.props.value}>{this.props.value}</option>
    );
  }
});

var Body = React.createClass({
  render: function () {
    var that = this;
    return (
      <tbody>
      {this.props.data.items.map(function(item, i) {
        return <Row key={i} rowdata={item} onRowRender={that.props.onRowRender} columns={that.props.data.columns} />
      })}
      </tbody>
    );
  }
});

var Row = React.createClass({
  onSelectorCheckEvent: function(e){
    // this.props.rowdata.__selected = e.state.checked;
  },

  render: function () {
    var that = this;

    var _rowStyle = {};
    if(typeof(this.props.onRowRender) === "function"){
      _rowStyle = this.props.onRowRender(that.props.rowdata) || {};
    }

    return (
      <tr style={_rowStyle}>
      {this.props.columns.map(function (column, i) {
        return <Cell key={i} 
          column={column} 
          selectorCheckEvent={that.onSelectorCheckEvent} 
          rowdata={that.props.rowdata} 
          value={that.props.rowdata[column.key]} />
      })}
      </tr>
    );
  }
});

var HeadCell = React.createClass({
  render: function () {
    // <a href="#" data-column={this.props.column.key} data-direction={this.props.direction === "desc" ? "asc" : "desc"} role="button" tabIndex="0" onClick={this.props.onSort}>{this.props.column.label}</a>
    return (
      <th style={this.props.style}>
        {this.props.column.label}
      </th>
    );
  }
});

var Cell = React.createClass({
  getInitialState:function(){
    return ({
      checked: false
    })
  },

  onSelectorCheckStateChange: function(e){
    this.setState({
      checked: e.target.checked
    });

    if(this.props.selectorCheckEvent){
      this.props.selectorCheckEvent(this);
    }
  },

  renderInnerCell: function(){
    var _v = this.props.value;

    var column = this.props.column;
    var value = this.props.value;
    var rowdata = this.props.rowdata;

    if(typeof(column.formatFunc) === "function"){
      _v = column.formatFunc.call(column, _v, rowdata);
    } else if(column.formatCmptFunc){
      _v = column.formatCmptFunc({column: column, value: value, rowdata: rowdata})
    } else if(column.enumdata){
      _v = Formater.formatEnum(_v, column.enumdata);
    } else if(column.dateFormat){
      _v = Formater.formatDate(_v, column.dateFormat);
    }
    
    switch (column.type) {
      case 'Number':
        return _v;
        break;
      case 'String':
        return _v;
        break;
      case 'Image':
        return <img src={_v} />;
        break;
      case 'link':
        return React.createElement('a', {href: _v.link}, _v.name);
        break;
      case 'Selector':
        var _name = "__sel_rad_" + (column.name || "_");
        var _id = _name + "_" + rowdata.__sequence;

        if(column.seltype == "radiobox" || column.seltype == "single"){
          return <input type="radio" name={_name} id={_id} onChange={this.onSelectorCheckStateChange} defaultChecked={rowdata.__checked || false} />
        } else {
          return <input type="checkbox" name={_name} id={_id} onChange={this.onSelectorCheckStateChange} defaultChecked={rowdata.__checked || false} />
        }
        break;
      case 'Sequence':
        return rowdata.__sequence;
        break;
      default:
        return _v;
    }
  },

  render: function () {
    var _inner_cell = this.renderInnerCell();

    if(this.props.column.type === "Hidden"){
      return (
        <td style={StyleSheet.hiddenStyle}>{_inner_cell}</td>
      );
    } else {
      return (
        <td style={this.props.column.style}>{_inner_cell}</td>
      );
    }
  }
});
