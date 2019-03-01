const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
async function init(config){
	var swc = {
		config : config,
		app : express(),
		common : {
			saveImage : require("./middlewares/common/images").saveImage
		}
	}

	//定义全局变量
	global.swc = {
		redis : {
			openid : {}, //openid 表
			swc_session : {}, //swc_session 表
			codes : {}, //验证码表
		}
	}

	//资源
	swc.app.use("/res", express.static("res"));
	//管理后台
	swc.app.use("/admin", express.static("admin"));

	//中间件
	swc.app.use(bodyParser.urlencoded({extended: false}));
	swc.app.use(bodyParser.json({"limit":"10000kb"}));
	swc.app.use(session({
		secret: 'secret', 
		cookie: {
			maxAge: 60000
		},
		saveUninitialized: true,
		resave: false,
	}));

	//路由定义
	swc = await require('./router').router(swc);
	//数据库orm定义
	swc = await require("./middlewares/common/db")(swc);

	swc.startup = async function (swc){
		swc.app.listen(swc.config.server.port, ()=>{
			console.log("listen at : " + swc.config.server.port)
		})
	}
	return swc;
}

exports.init = init;