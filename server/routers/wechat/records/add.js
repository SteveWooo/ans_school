/*
* @param answers, topic_group_id
*/
const crypto = require("crypto");
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
		//先拿题目出来
		var topics = await swc.db.models.topics.findAndCountAll({
			where : {
				topic_group_id : query.topic_group_id
			}
		})

		if(topics.count == 0){
			req.response.status = 4004;
			req.response.error_message = '找不到题组';
			next();
			return ;
		}

		if(topics.count != query.answers.length){
			req.response.status = 5000;
			req.response.error_message = '题目数量不匹配';
			next();
			return ;
		}

		//算分
		var scoreResult = {
			count : topics.count,
			right : 0
		}
		for(var i=0;i<topics.count;i++){
			var t = topics.rows[i];
			if(t.answer == query.answers[t.number]){
				scoreResult.right ++
			}
		}

		var now = +new Date();
		var id_source = [
			req.source.wechat_user.user_id,
			"user_records",
			now,
			swc.config.wechat.public_salt
		].join("&");
		var record = {
			user_record_id : crypto.createHash('md5').update(id_source).digest('hex'),
			topic_group_id : query.topic_group_id,
			answers : query.answers,
			score : scoreResult.right + "/" + scoreResult.count,

			create_at : now,
			update_at : now,
			create_by : req.source.wechat_user.user_id,
			update_by : req.source.wechat_user.user_id
		}

		var result = await swc.db.models.user_records.create(record);
		req.response.data = result;
		next();
	}catch(e){
		console.log(e);
		req.response.status = 5000;
		req.response.error_message = e.message;
		next();
		return ;
	}
}