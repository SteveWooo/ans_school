/*
* @param 
*/
const crypto = require("crypto");
module.exports = async (req, res, next)=>{
	var query = req.body;
	var swc = req.swc;

	if(!query.title){
		req.response.status = 4005;
		req.response.error_message = "参数错误";
		next();
		return ;
	}

	if(!query.service_class_id || query.service_class_id.length != 32){
		req.response.status = 4005;
		req.response.error_message = "参数错误 : service_class_id";
		next();
		return ;
	}

	var now = +new Date();
	var id_source = [
		req.source.wechat_user.user_id,
		query.service_class_id,
		query.title,
		now,
		swc.config.wechat.public_salt
	].join("&");
	var order = {
		order_id : crypto.createHash('md5').update(id_source).digest('hex'),
		service_class_id : query.service_class_id,
		title : query.title,
		content : query.content,
		mobile : query.mobile,
		name : query.name,
		position_field : query.position_field,
		position_building : query.position_building,
		position_room : query.position_room,
		leisure_time : query.leisure_time,
		status : 2,

		create_at : now,
		update_at : now,
		create_by : req.source.wechat_user.user_id,
		update_by : req.source.wechat_user.user_id
	}

	try{
		var result = await swc.db.models.orders.create(order);
		req.response.data = result;
		next();
	}catch(e){
		req.response.status = 5000;
		req.response.error_message = e.message;
		next();
		return ;
	}
}