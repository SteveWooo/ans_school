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
}

//后台接口
var admin_routers = {
	getDemo : {
		module : require('./routers/admin/subjects/get'),
		path : '/api/m/demo/get',
		method : 'get'
	},
	//科目
	getSubject : {
		module : require('./routers/admin/subjects/get'),
		path : '/api/m/subject/get',
		method : 'get'
	},
	addSubject : {
		module : require('./routers/admin/subjects/add'),
		path : '/api/m/subject/add',
		method : 'post'
	},
	updateSubject : {
		module : require('./routers/admin/subjects/update'),
		path : '/api/m/subject/update',
		method : 'post'
	},
	deleteSubject : {
		module : require('./routers/admin/subjects/delete'),
		path : '/api/m/subject/delete',
		method : 'post'
	},


	//资讯
	getInformation : {
		module : require("./routers/admin/information/get"),
		path : "/api/m/information/get",
		method : "get"
	},
	addInformation : {
		module : require("./routers/admin/information/add"),
		path : "/api/m/information/add",
		method : "post"
	},
	updateInformation : {
		module : require("./routers/admin/information/update"),
		path : "/api/m/information/update",
		method : "post"
	},
	deleteInformation : {
		module : require("./routers/admin/information/delete"),
		path : "/api/m/information/delete",
		method : "post"
	},

	//题库
	getTopicGroup : {
		module : require("./routers/admin/topicGroups/get"),
		path : "/api/m/topic_group/get",
		method : "get"
	},
	addTopicGroup : {
		module : require("./routers/admin/topicGroups/add"),
		path : "/api/m/topic_group/add",
		method : "post"
	},
	updateTopicGroup : {
		module : require("./routers/admin/topicGroups/update"),
		path : "/api/m/topic_group/update",
		method : "post"
	},
	deleteTopicGroup : {
		module : require("./routers/admin/topicGroups/delete"),
		path : "/api/m/topic_group/delete",
		method : "post"
	},

	//题目
	getTopic : {
		module : require("./routers/admin/topics/get"),
		path : "/api/m/topic/get",
		method : "get"
	},
	updateTopic : {
		module : require("./routers/admin/topics/update"),
		path : "/api/m/topic/update",
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