/*
* @param comment_id
*/
module.exports = async (req, res, next)=>{
	var query = req.body;
	var swc = req.swc;

	if(!query.comment_id || query.comment_id.length != 32){
		req.response.status = 4005;
		req.response.error_message = "参数错误";
		next();
		return ;
	}

	try{
		var comment = await swc.db.models.comments.findAndCountAll({
			where : {
				comment_id : query.comment_id
			}
		})

		if(comment.count == 0){
			req.response.status = 4004;
			req.response.error_message = '找不到该评论';
			next();
			return ;
		}
		if(comment.rows[0].create_by != req.source.wechat_user.user_id){
			req.response.status = 4004;
			req.response.error_message = '无权删除';
			next();
			return ;
		}
		var updateform = {
			status : 2
		};

		var result = await comment.rows[0].update(updateform);
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