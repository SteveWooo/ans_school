/*
* @param topic_group_id, updatecontents
*/
module.exports = async (req, res, next)=>{
	var query = req.body;
	var swc = req.swc;

	if(!query.topic_group_id || query.topic_group_id.length != 32){
		req.response.status = 4005;
		req.response.error_message = "参数错误";
		next();
		return ;
	}

	try{
		var topic_group = await swc.db.models.topic_groups.findAndCountAll({
			where : {
				topic_group_id : query.topic_group_id
			}
		})

		if(topic_group.count == 0){
			req.response.status = 4004;
			req.response.error_message = '找不到该服务';
			next();
			return ;
		}
		var updateform = {};
		if(query.title){
			updateform.title = query.title;
		}
		if(query.description){
			updateform.description = query.description;
		}

		var result = await topic_group.rows[0].update(updateform);
		req.response.data = result;
		next();
	}catch(e){
		req.response.status = 5000;
		req.response.error_message = e.message;
		next();
		return ;
	}

	next();
}