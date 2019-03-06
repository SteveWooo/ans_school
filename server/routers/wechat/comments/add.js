/*
* @param information_id comment
*/
const crypto = require("crypto");
module.exports = async (req, res, next)=>{
	var query = req.body;
	var swc = req.swc;

	if(!query.information_id || query.information_id.length != 32){
		req.response.status = 4005;
		req.response.error_message = "参数错误";
		next();
		return ;
	}

	var now = +new Date();
	var id_source = [
		req.source.wechat_user.user_id,
		"comments",
		now,
		swc.config.wechat.public_salt
	].join("&");
	var comment = {
		comment_id : crypto.createHash('md5').update(id_source).digest('hex'),
		information_id : query.information_id,

		comment : query.comment,
		status : 1,

		create_at : now,
		update_at : now,
		create_by : req.source.wechat_user.user_id,
		update_by : req.source.wechat_user.user_id
	}

	try{
		var result = await swc.db.models.comments.create(comment);
		req.response.data = result;
		next();
	}catch(e){
		req.response.status = 5000;
		req.response.error_message = e.message;
		next();
		return ;
	}
}