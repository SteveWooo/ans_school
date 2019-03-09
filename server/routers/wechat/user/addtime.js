/*
* @param 
*/
module.exports = async (req, res, next)=>{
	var query = req.query;
	var swc = req.swc;
	try{
		var user = await swc.db.models.users.findAndCountAll({
			where : {
				user_id : req.source.wechat_user.user_id
			}
		})

		if(user.count == 0){
			req.response.status = 3002;
			req.response.error_message = "请重新登录";
			next();
			return ;
		}

		if(user.rows[0].study_time == null){
			user.rows[0].study_time = 0;
		}
		var study_time = parseInt(user.rows[0].study_time);
		study_time += 60000;

		var result = await user.rows[0].update({
			study_time : study_time
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