/*
* @param order_id level content
*/
const crypto = require("crypto");
module.exports = async (req, res, next)=>{
	var query = req.body;
	var swc = req.swc;

	if(!query.level){
		req.response.status = 4005;
		req.response.error_message = "参数错误";
		next();
		return ;
	}

	if(!query.order_id || query.order_id.length != 32){
		req.response.status = 4005;
		req.response.error_message = "参数错误 : order_id";
		next();
		return ;
	}

	var now = +new Date();
	var id_source = [
		req.source.wechat_user.user_id,
		query.order_id,
		now,
		swc.config.wechat.public_salt
	].join("&");
	var order_evalutate = {
		order_evaluate_id : crypto.createHash('md5').update(id_source).digest('hex'),
		order_id : query.order_id,
		level : query.level,
		content : query.content,

		create_at : now,
		update_at : now,
		create_by : req.source.wechat_user.user_id,
		update_by : req.source.wechat_user.user_id
	}

	try{
		var order = await swc.db.models.orders.findAndCountAll({
			where : {
				order_id : query.order_id
			}
		})
		if(order.count == 0){
			req.response.status = 4004;
			req.response.error_message = '找不到该订单';
			next();
			return ; 
		}

		var result = await swc.db.models.order_evaluates.create(order_evalutate);
		var result2 = await order.rows[0].update({
			status : 1
		})
		req.response.data = result2;
		next();
	}catch(e){
		req.response.status = 5000;
		req.response.error_message = e.message;
		next();
		return ;
	}
}