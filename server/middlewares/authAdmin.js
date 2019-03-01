const crypto = require("crypto");
var get_user_cookie = async (swc, req)=>{
	let temp = req.headers.cookie;
	if(!temp){
		return {};
	}
	temp = temp.replace(/ /g, "").split(";");
	let user_cookie = {};
	for(var i=0;i<temp.length;i++){
		let t = temp[i].split("=");
		user_cookie[t[0]] = t[1];
	}

	return user_cookie;
}

async function auth(req, res, next){
	var query;
	var swc = req.swc;
	if(req.method == "GET"){
		query = req.query
	} else {
		query = req.body;
	}

	var cookie = (await get_user_cookie(swc, req))['s'];
	if(!cookie){
		req.response.status = 3002;
		req.response.hash = "login";
		req.response.error_message = "请登陆";
		next();
		return ;
	}
	cookie = cookie.split("|");
	if(cookie.length != 3){
		req.response.status = 3002;
		req.response.hash = "login";
		req.response.error_message = "请登陆";
		next();
		return ;
	}

	var now = cookie[2];
	var account = cookie[0];
	var s = cookie[1];

	var account = await swc.db.models.admins.findAndCountAll({
		where : {
			account : account
		}
	})

	if(account.count == 0){
		req.response.status = 3002;
		req.response.hash = "login";
		req.response.error_message = "请登陆";
		next();
		return ;
	}

	var s_hash = crypto.createHash("md5").update([
		account.rows[0].password,
		now,
		swc.config.wechat.public_salt
	].join("&")).digest("hex");

	if(s_hash != s){
		req.response.status = 3002;
		req.response.hash = "login";
		req.response.error_message = "请重新登陆";
		next();
		return ;
	}
	
	req.source.admin_user = {
		account : account.rows[0].account,
		name : account.rows[0].name,
		admin_id : account.rows[0].admin_id
	}
	next();
}

module.exports = auth;