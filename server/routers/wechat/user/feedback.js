/*
* @param name description
*/
const crypto = require("crypto");
module.exports = async (req, res, next)=>{
	var query = req.body;
	var swc = req.swc;

	if(!query.content){
		req.response.status = 4005;
		req.response.error_message = "参数错误:content为空";
		next();
		return ;
	}

	var now = +new Date();
	var id_source = [
		req.source.wechat_user.user_id,
		"feedbacks",
		now,
		swc.config.wechat.public_salt
	].join("&");
	var feedback = {
		feedback_id : crypto.createHash('md5').update(id_source).digest('hex'),
		content : query.content,

		create_at : now,
		update_at : now,
		create_by : req.source.wechat_user.user_id,
		update_by : req.source.wechat_user.user_id
	}

	try{
		var result = await swc.db.models.feedbacks.create(feedback);
		req.response.data = result;
		next();
	}catch(e){
		req.response.status = 5000;
		req.response.error_message = e.message;
		next();
		return ;
	}
}