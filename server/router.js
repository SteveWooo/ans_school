/*
* 统一入口
*/
async function handleRequest(req, res, next){
	req.response = {
		status : 2000
	}
	req.response_headers = {};
	req.source = {
		wechat_user : {}, //小程序用户信息
		admin_user : {}, //后台管理员用户信息
	}
	next();
}

/*
* 统一响应出口，把req.response的内容响应给前端
*/
async function handleResponse(req, res){
	res.header("Content-Type", "application/json; charset=utf-8")
	for(var i in req.response_headers){
		res.header(i, req.response_headers[i]);
	}

	req.response.source = req.source;

	res.send(JSON.stringify(req.response));
}

//小程序接口
var wechat_routers = {
	//用户信息类
	getUserInfo : {
		module : require("./routers/wechat/user/get"),
		path : "/api/w/user/get",
		method : "get"
	},
	setWechatData : {
		module : require("./routers/wechat/user/setWechatData"),
		path : "/api/w/user/set_wechat_data",
		method : "post"
	},
	setPersonalData : {
		module : require("./routers/wechat/user/setPersonalData"),
		path : "/api/w/user/set_personal_data",
		method : "post"
	},

	//订单类
	getOrder : {
		module : require("./routers/wechat/orders/get"),
		path : "/api/w/order/get",
		method : "get"
	},
	addOrder : {
		module : require("./routers/wechat/orders/add"),
		path : "/api/w/order/add",
		method : "post"
	},
	evaluteOrder : {
		module : require("./routers/wechat/orders/evaluate"),
		path : "/api/w/order/evaluate",
		method : "post"
	},

	//自助服务类
	getClasses : {
		module : require("./routers/wechat/classes/get"),
		path : "/api/w/class/get",
		method : "get"
	},
	getSelfServices : {
		module : require("./routers/wechat/selfServices/get"),
		path : "/api/w/self_service/get",
		method : "get"
	},

	//通知类
	getNotice : {
		module : require("./routers/wechat/notices/get"),
		path : "/api/w/notice/get",
		method : "get"
	},

	//图片轮播
	getImageLoop : {
		module : require("./routers/wechat/image_loops/get"),
		path : "/api/w/image_loop/get",
		method : "get"
	}
}

//后台接口
var admin_routers = {
	//用户信息类
	createAdmin : {
		module : require("./routers/admin/user/createAdmin"),
		path : "/api/m/user/create_admin",
		method : "post"
	},
	//订单
	getOrder : {
		module : require("./routers/admin/orders/get"),
		path : "/api/m/order/get",
		method : "get"
	},
	updateOrderStatus : {
		module : require("./routers/admin/orders/updateStatus"),
		path : "/api/m/order/update_status",
		method : "post"
	},

	//分类
	addClass : {
		module : require("./routers/admin/classes/add"),
		path : "/api/m/class/add",
		method : "post"
	},
	deleteClass : {
		module : require("./routers/admin/classes/delete"),
		path : "/api/m/class/delete",
		method : "post"
	},
	getClass : {
		module : require("./routers/admin/classes/get"),
		path : "/api/m/class/get",
		method : "get"
	},
	updateClass : {
		module : require("./routers/admin/classes/update"),
		path : "/api/m/class/update",
		method : "post"
	},

	//通知类
	getNotices : {
		module : require("./routers/admin/notices/get"),
		path : "/api/m/notice/get",
		method : "get"
	},
	addNotice : {
		module : require("./routers/admin/notices/add"),
		path : "/api/m/notice/add",
		method : "post"
	},
	updateNotice : {
		module : require("./routers/admin/notices/update"),
		path : "/api/m/notice/update",
		method : "post"
	},
	deleteNotice : {
		module : require("./routers/admin/notices/delete"),
		path : "/api/m/notice/delete",
		method : "post"
	},

	//图片轮播
	getImageLoop : {
		module : require("./routers/admin/imageLoops/get"),
		path : "/api/m/image_loop/get",
		method : "get"
	},
	addImageLoop : {
		module : require("./routers/admin/imageLoops/add"),
		path : "/api/m/image_loop/add",
		method : "post"
	},
	deleteImageLoop : {
		module : require("./routers/admin/imageLoops/delete"),
		path : "/api/m/image_loop/delete",
		method : "post"
	},

	//自助维修
	getSelfServices : {
		module : require("./routers/admin/selfServices/get"),
		path : "/api/m/self_service/get",
		method : "get"
	},
	addSelfServices : {
		module : require("./routers/admin/selfServices/add"),
		path : "/api/m/self_service/add",
		method : "post"
	},
	updateSelfServices : {
		module : require("./routers/admin/selfServices/update"),
		path : "/api/m/self_service/update",
		method : "post"
	},
	deleteSlefServices : {
		module : require("./routers/admin/selfServices/delete"),
		path : "/api/m/self_service/delete",
		method : "post"
	},

	//微信用户信息
	getWechatUser : {
		module : require("./routers/admin/wechatUser/get"),
		path : "/api/m/wechat_user/get",
		method : "get"
	},

	//管理员信息
	getAdminInfo : {
		module : require("./routers/admin/user/get"),
		path : "/api/m/user/get",
		method : "get"
	}
}

//用于登陆的接口
var login_routers = {
	loginAdmin : {
		module : require("./routers/admin/user/login"),
		path : "/api/m/user/login",
		method : "post"
	},
	getCode : {
		module : require("./routers/admin/user/getCode"),
		path : "/api/m/user/get_code",
		method : "get"
	},
	loginWechat : {
		module : require("./routers/wechat/user/login"),
		path : "/api/w/user/login",
		method : "get"
	}
}

//中间件
var middlewares = {
	authWechat : {
		module : require("./middlewares/authWechat"),
	},
	authAdmin : {
		module : require("./middlewares/authAdmin"),
	}
}

/*
* 加载路由器
*/
async function router(swc){
	for(var i in login_routers){
		var r = login_routers[i];
		swc.app[r.method](r.path, (req, res, next)=>{
			req.swc = swc;
			next();
		}, 
		handleRequest, 
		r.module, 
		handleResponse);
	}

	for(var i in wechat_routers){
		var r = wechat_routers[i];
		swc.app[r.method](r.path, (req, res, next)=>{
			req.swc = swc;
			next();
		}, 
		handleRequest, 
		middlewares.authWechat.module,
		r.module, 
		handleResponse);
	}

	for(var i in admin_routers){
		var r = admin_routers[i];
		swc.app[r.method](r.path, (req, res, next)=>{
			req.swc = swc;
			next();
		}, 
		handleRequest,
		middlewares.authAdmin.module, 
		r.module, 
		handleResponse);
	}

	return swc;
}

exports.router = router;