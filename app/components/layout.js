var React = require('react');
var _ = require('underscore');
var NotificationSystem = require('react-notification-system');

var SysHelper = require('../helper/sys');
var PageHelper = require('../helper/page');

var StyleSheet = {
  contentPanelStyle : {
    padding: "5px 0 0 10px"
  },

  pageHeadStyle: { 
    backgroundColor: "#1C75B8",
    marginBottom: 2
  }, 

  pageHeadTitleStyle: {
    color:"#fff",
    textAlign:'center',
    lineHeight:"2em",
    overflow:'hidden',
    width: '100%'
  },

  captionTitleStyle: {
    fontSize: '18px',
    fontWeight: 'bold',
    padding: '5px 10px',
    borderBottom: '1px solid #CDD4D7',
    borderLeft: '1px solid #CDD4D7'
  },

  menuActivedStyle: {
    backgroundColor: "#f0f0f0",
    color: "#4993d3",
    borderTop: '1px solid',
    borderTopColor: '#DADADA'
  }
};

var layout = React.createClass({
  getDefaultProps: function() {
    return {
      captionText : "标题",
      currentPage: "",
      menuData: []
    };
  },

  getInitialState: function(){
    return {
      menuData: this.props.menuData
    }
  },

  componentDidMount: function() {
    window.AppLayout = this;
    var _menuData = this.getUserMenuData();
    var _expandedMenuKey = null;

    if(this.props.currentPage){
      _expandedMenuKey = this.getCurrentExpandedMenuKey(_menuData, this.props.currentPage);
    } else if(_menuData && _menuData.length > 0){
      _expandedMenuKey = _menuData[0].key;
    }

    this.setState({
      menuData: _menuData || null,
      expandedMenuKey: _expandedMenuKey
    })
  },

  getUserMenuData: function(){
    // debugger;
    var _menuData = [];

    if(this.props.menuData && this.props.menuData.length > 0){
      _menuData = this.props.menuData;
    } else {
      // 从localstorage拿menuData
      var _pgState = SysHelper.getPageState();

      if(_pgState && _pgState.page && _pgState.page.menus){
        _menuData = _pgState.page.menus;
      }
    }

    var _pgMenuData = null;
    if(_menuData && _menuData.length > 0){
      _pgMenuData = _parseUserMenus(_menuData);
      if(_pgMenuData){
        var _pgMenuDataStr = JSON.stringify(_pgMenuData);

        localStorage.setItem("menus", _pgMenuDataStr);

        // 保存7天
        PageHelper.setCookie('menu_stored', true, 7);
      }
    } else if(window.localStorage && PageHelper.getCookie('menu_stored')){
      // 尝试从localStorage中获取menuData
      var _pgMenuDataStr = localStorage.getItem("menus");

      if(_pgMenuDataStr){
        _pgMenuData = JSON.parse(_pgMenuDataStr);
      }
    }

    return _pgMenuData;
  },

  // 获取当前展开菜单的键
  getCurrentExpandedMenuKey: function(menuData, currentPage){
    // debugger;
    if(!menuData || !currentPage){
      return null;
    }

    var _key = "promotion";

    var _cate = _.find(menuData, function(_cate){
      var _currMenu = _.findWhere(_cate.items, {"pageName": currentPage});
      
      return !!_currMenu;
    }.bind(this));

    if(_cate){
      _key = _cate.key;
    }

    return _key;
  },

  render: function() {
    return (
      <div>
        <NotificationSystem ref="appNotificationSystem" />
        <PageHead />
        <div className="container-fluid  page-container">
          <div className="row">
            <div className="no-padding col-sm-2" style={{height:"700px"}}>
              <PageNav currentPage={this.props.currentPage}
                expandedMenuKey={this.state.expandedMenuKey} 
                menus={this.state.menuData}  />
            </div>
            <div className="no-padding col-sm-10" style={StyleSheet.contentPanelStyle}>
              <div className="page-title-img" style={StyleSheet.captionTitleStyle}>
                <div></div>
                {this.props.captionText}
              </div>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var PageHead = React.createClass({
  getInitialState:function(){
    return {
      currentUserName: ''
    }
  },

  componentDidMount:function(){
    var _userName = "";
    _userName = PageHelper.getCookie('account');

    this.setState({currentUserName: _userName })
  },
  
  render:function(){  
    return (
      <div className="container-fluid"  style={StyleSheet.pageHeadStyle}>
        <div className="row bs-header">
          <div  className="col-md-2 col-md-offset-1">
            <a className="header_title" href="javascript:void(0);"></a>
          </div>
          <div className="col-md-4 col-md-offset-5 header-right">
            <a href="#" className="dropdown-toggle">
              <img alt="Avatar" src="/imgs/avatar2.jpg" />&nbsp;&nbsp;&nbsp;&nbsp;
              <span>欢迎您：{this.state.currentUserName}</span>
              &nbsp;&nbsp;&nbsp;&nbsp;｜&nbsp;&nbsp;&nbsp;&nbsp;
            </a> 
            <a href="/logout" className="dropdown-toggle">
              <span>退出系统</span>
            </a>
            &nbsp;&nbsp;
          </div>
        </div>   
      </div>
    );
  }
});

var PageNav = React.createClass({
  getInitialState:function(){
    return {
      flag:true,
      expandedMenuKey: "promotion"
    }
  },

  getDefaultProps: function() {
    return {
      menus: []
    };
  },

  componentWillMount: function() {
    this.setState({ 
      expandedMenuKey: this.props.expandedMenuKey 
    });
  },

  componentWillReceiveProps: function(newProps){
    if(newProps.expandedMenuKey){
      this.setState({
        expandedMenuKey: newProps.expandedMenuKey
      })
    }
  },

  componentDidMount: function() {
  },

  _toggleClick: function(menu) {
    if(this.state.expandedMenuKey !== menu.key){
      this.setState({ expandedMenuKey: menu.key });
    } else {
      this.setState({ expandedMenuKey: "none" });
    }
  },

  _onMenuItemClick: function(menuItem){
    if(!menuItem.href){
      return;
    }

    var _is_op_path = SysHelper.isOperationModulePath(menuItem.href);
    var _is_op_cont = SysHelper.isOperationModuleContent();

    if(_is_op_path && _is_op_cont && window.to){
      window.to(menuItem.href);
    } else {
      location.href = menuItem.href;
    }
  },

  render: function() {
    // debugger;
    return (
      <div className="layout-page-nav" style={StyleSheet.pageNavStyle}>
        <div className="panel panel-default fixed-top">
          { (this.props.menus || []).map(function(menu, i){
              return (
              <div key={menu.key}>
                <div className="panel-heading" >
                  <i className="menu-ico"></i>
                  <h3 className="panel-title"  onClick={ this._toggleClick.bind(null, menu) }>{menu.name}</h3>
                  <i className="menu-ico-child "></i>
                </div>
                <ul className="nav nav-pills nav-stacked fixed-top" style={ this.state.expandedMenuKey === menu.key?{ display:"block" } : {display:"none"} } >
                { (menu.items || []).map(function(item, i) {                   
                  return (
                    <li key={i} role="presentation" className="menustyle" 
                      style={ this.props.currentPage === item.pageName ? StyleSheet.menuActivedStyle : {} }>
                      <a style={StyleSheet.contentPanelStyle} onClick={ this._onMenuItemClick.bind(this, item) }>{item.title}</a>
                    </li>
                  )
                }.bind(this)) }
                </ul>
              </div>
            )
          }.bind(this)) }
        </div>
      </div>
    );
  }
});

module.exports = layout;

// ============== 分析用户菜单 ===============》
// -- by Ray on 2015-11-27

function _parseUserMenus(menuData){
  var _menus = [];

  if(!Array.isArray(menuData)){
    return _menus;
  }

  menuData.forEach(function(m){
    var _m = _getUserMenu(m);

    if(_m){
      _menus.push(_m);
    }
  });

  return _menus;
}

// 获取用户菜单
function _getUserMenu(menu){
  if(menu.name && menu.key){
    return menu;
  }

  if(menu.code == "comm" || !menu.code){
    return null;
  }

  var _m = {
    key: menu.code
  }

  _m.name = _getUserMenuTitle(menu);
  _m.items = _getUserMenuItems(menu);

  return _m;
}

// 获取菜单标题
function _getUserMenuTitle(menu){
  var _name = menu.name;

  if(_name){
    var _endIndex = _name.indexOf("-");

    if(_endIndex > 0){
      _name = _name.substr(0, _endIndex);
    }
  }

  return _name;
}

// 获取子菜单页面名
function _getUserMenuItems(menu){
  var _menuItems = [];

  var _pgMenu = null;

  if(menu && Array.isArray(menu.subMenus)){
    menu.subMenus.forEach(function(m){
      if(m.code === menu.code + ".pg"){
        _pgMenu = m;
      }
    })
  }

  if(_pgMenu && Array.isArray(_pgMenu.subMenus)){
    _pgMenu.subMenus.forEach(function(m){
      var _m = { key: m.code };

      _m.pageName = _getUserMenuPageName(m);
      _m.title = _getUserMenuTitle(m);
      _m.href = m.url;

      _menuItems.push(_m);
    })
  }

  return _menuItems;
}

// 获取菜单页面名
function _getUserMenuPageName(menu){
  var _name = menu.code;
  if(_name){
    var _parts = _name.split('.');

    if(_parts.length >= 3){
      _name = _parts[2];
    }
  }

  return _name;
}

// ============== 分析用户菜单 ===============《

