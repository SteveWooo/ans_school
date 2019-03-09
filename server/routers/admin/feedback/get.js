/*
* @param page item_per_page  | feedback_id
*/
module.exports = async (req, res, next)=>{
	var query = req.query;
	var swc = req.swc;

	if(query.feedback_id && query.feedback_id.length == 32){
		var result = await swc.db.models.feedbacks.findAndCountAll({
			where : {
				feedback_id : query.feedback_id
			}
		})

		if(result.count == 0){
			req.response.status = 4004;
			req.response.error_message = "找不到该通知";
			next();
			return ;
		}

		req.response.data = result;
		next();
		return ;
	}

	if(!query.item_per_page){
		query.item_per_page = 10;
	}

	if(!query.page){
		query.page = 1;
	}

	if(parseInt(query.page) != query.page || parseInt(query.item_per_page) != query.item_per_page){
		req.response.status = 4005;
		req.response.error_message = "参数错误：page or item_per_page";
		next();
		return ;
	}
	query.item_per_page = parseInt(query.item_per_page);

	try{
		var result = await swc.db.models.feedbacks.findAndCountAll({
			include : [{
				as : 'user',
				model : swc.db.models.users
			}],
			order : [["create_at", "DESC"]],
			limit : query.item_per_page,
			offset : (query.page - 1) * query.item_per_page
		})

		req.response.data = result;

		next();
	}catch(e){
		req.response.status = 5000;
		req.response.error_message = e.message;
		next();
		return ;
	}
}