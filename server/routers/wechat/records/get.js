/*
* @param page item_per_page | user_record_id
*/
module.exports = async (req, res, next)=>{
	var query = req.query;
	var swc = req.swc;

	if(query.user_record_id && query.user_record_id.length == 32){
		var result = await swc.db.models.user_records.findAndCountAll({
			where : {
				user_record_id : query.user_record_id
			}
		})

		if(result.count == 0){
			req.response.status = 4004;
			req.response.error_message = "找不到该资讯";
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
		var result = await swc.db.models.user_records.findAndCountAll({
			where : {
				create_by : req.source.wechat_user.user_id
			},
			include : [{
				model : swc.db.models.topic_groups,
				as : "topic_groups"
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