/*
* @param topic_group_id
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
		var subject = await swc.db.models.topic_groups.findAndCountAll({
			where : {
				topic_group_id : query.topic_group_id
			}
		})

		if(subject.count == 0){
			req.response.status = 4004;
			req.response.error_message = '找不到该科目';
			next();
			return ;
		}
		var updateform = {
			status : 2
		};

		var result = await subject.rows[0].update(updateform);
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