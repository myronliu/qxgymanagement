module.exports={
    client:{
      setweixinmenu:'/menu/create',
    },
    server:{
      setweixinmenu: '/cgi-bin/menu/create?access_token='
    },
    getuser: '/manger_getuser',//管理员登录
    getordersbytype: '/manger_getordersbytype',//根据状态和shopid获取订单
    orderupdate: '/manger_orderupdate',// 更新订单状态
    getshops: '/manger_getshops',//获取所有商店信息
    shopupdate: '/manager_shopupdate',//更新商店信息
    shopregister: '/manager_shopregister',//商店注册
    getshopbyid: '/manager_getshopbyid',//通过ID获取商店信息
    getproducts: '/manager_getproducts',//通过商店ID获取产品列表
    productupdate: '/manager_productupdate',//更新产品信息
    createproduct: '/manager_createproduct',//创建产品
    getproduct: '/manager_getproduct',//根据id获取产品信息
}