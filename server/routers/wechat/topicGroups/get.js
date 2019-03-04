/*
* @param page item_per_page | topic_group_id | subject_id
*/
module.exports = async (req, res, next)=>{
	var query = req.query;
	var swc = req.swc;

	if(query.topic_group_id && query.topic_group_id.length == 32){
		var result = await swc.db.models.topic_groups.findAndCountAll({
			where : {
				topic_group_id : query.topic_group_id
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

	if(!query.subject_id || query.subject_id.length != 32){
		req.response.status = 4005;
		req.response.error_message = "参数错误：subject_id";
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
		var topicGroups = await swc.db.models.topic_groups.findAndCountAll({
			where : {
				subject_id : query.subject_id,
				status : 1
			},
			order : [["create_at", "DESC"]],
			limit : query.item_per_page,
			offset : (query.page - 1) * query.item_per_page
		})

		//查分
		for(var i=0;i<topicGroups.count;i++){
			var record = await swc.db.models.user_records.findAndCountAll({
				where : {
					topic_group_id : topicGroups.rows[i].topic_group_id,
					create_by : req.source.wechat_user.user_id
				},
				order : [["create_at", "DESC"]],
			})
			if(record.count > 0){
				topicGroups.rows[i].dataValues.user_record = record.rows[0];
			}
		}

		req.response.data = topicGroups;

		next();
	}catch(e){
		console.log(e);
		req.response.status = 5000;
		req.response.error_message = e.message;
		next();
		return ;
	}
}