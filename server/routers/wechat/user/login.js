const request = require("request");
const crypto = require("crypto");

//调用小程序官方接口
function auth_wechat(swc, query){
	return new Promise(resolve=>{
		var options = {
			url : "https://api.weixin.qq.com/sns/jscode2session?appid=" + 
				swc.config.wechat.appid + "&secret=" + 
				swc.config.wechat.secret + "&js_code=" + 
				query.js_code + "&grant_type=authorization_code"
		}
		request(options, (err, res, body)=>{
			if(typeof body == "string"){
				body = JSON.parse(body);
			}

			if(!body){
				resolve({
					status : 4003,
					message : "鉴权接口异常"
				});
				return ;
			}

			if(!body.session_key || !body.openid){
				resolve({
					status : 4003,
					message : "鉴权接口异常"
				});
				return ;
			}

			resolve({
				status : 2000,
				data : body
			})
		})
	})
}

/*
* @param session_key小程序官方session，openid小程序用户唯一标示
* 创建业务体系的session，供小程序与业务之间的通讯使用。
*/ 
function set_session(swc, user_data){
	var source = [user_data.openid, user_data.session_key, swc.config.wechat.public_salt].join("&");
	var swc_session = crypto.createHash("md5").update(source).digest("hex");

	//保存session
	global.swc.redis.openid[user_data.openid] = {
		session_key : user_data.session_key,
		swc_session : swc_session,
		user_id : crypto.createHash("md5").update([
			user_data.openid,
			swc.config.wechat.public_salt
		].join("&")).digest("hex")
	}

	//删掉原来的session
	for(var i in global.swc.redis.swc_session){
		if(global.swc.redis.swc_session[i].openid == user_data.openid){
			delete global.swc.redis.swc_session[i];
		}
	}

	//创建新的session cache
	global.swc.redis.swc_session[swc_session] = {
		openid : user_data.openid,
		session_key : user_data.session_key,
		user_id : crypto.createHash("md5").update([
			user_data.openid,
			swc.config.wechat.public_salt
		].join("&")).digest("hex")
	}

	return swc_session;
}

/*
* @param openid
* 检查此openid是否第一次打开，如果是就入库
*/
async function set_db_login(swc, options){
	var result = await swc.db.models.users.findAndCountAll({
		where : {
			openid : options.openid
		}
	})

	if(result.count == 0){
		var now = +new Date();
		var user = {
			openid : options.openid,
			user_id : crypto.createHash("md5").update([
				options.openid,
				swc.config.wechat.public_salt
			].join("&")).digest("hex"),
			avatar_url : "",
			nick_name : "",

			mobile : "",
			name : "",
			position_field : "",
			position_building : "",
			position_room : "",

			create_by : "wechat",
			create_at : now,
			update_by : "wechat",
			update_at : now
		}

		var result = await swc.db.models.users.create(user);
		return result;
	}else {
		return result.rows[0];
	}
}

/*
* @param js_code
* 小程序登陆码，通过jscode获取小程序的session
*/
async function login(req, res, next){
	var query = req.query;
	var swc = req.swc;
	if(!query.js_code){
		res.sendStatus(403);
		return ;
	}

	var result = await auth_wechat(req.swc, query);
	if(result.status != "2000"){
		res.send(JSON.stringify(result));
		return ;
	}

	var userData = await set_db_login(swc, {
		openid : result.data.openid
	})

	var swc_session = set_session(req.swc, result.data);

	//返回业务体系的session给客户端，客户端后续都用这个session进行业务通讯
	req.response = {
		status : 2000,
		data : {
			swc_session : swc_session,
			user : userData
		}
	};

	next();
}

module.exports = login;