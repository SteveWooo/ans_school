/*
* @param account password
*/
const crypto = require("crypto");
module.exports = async (req, res, next)=>{
	var query = req.body;
	var swc = req.swc;

	if(!query.account || !query.password || !query.code) {
		req.response.status = 4005;
		req.response.error_message = "参数错误";
		next();
		return ;
	}

	if(!req.session || !req.session.code || !query.code || req.session.code != query.code.toLowerCase()){
		req.response.status = 4005;
		req.response.error_message = "验证码错误";
		next();
		return ;
	}

	try{
		var condition = {
			account : query.account,
			password : crypto.createHash("md5").update([
				query.password,
				swc.config.wechat.public_salt].join("&")).digest("hex"),
		}
		var result = await swc.db.models.admins.findAndCountAll({
			where : condition
		})

		if(result.count == 0){
			req.response.status = 4003;
			req.response.error_message = "登陆失败";
			next();
			return ;
		}

		var now = +new Date();
		var cookie = crypto.createHash("md5").update([
			result.rows[0].password,
			now,
			swc.config.wechat.public_salt
		].join("&")).digest("hex");

		req.response_headers = {
			"Set-Cookie" : "s=" + query.account + "|" + cookie + "|" + now + "; path=/"
		}

		next();
	}catch(e){
		console.log(e);
		req.response.status = 5000;
		req.response.error_message = "系统错误";
		next();
		return ;
	}
}