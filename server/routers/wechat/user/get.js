/*
* @param 
*/
module.exports = async (req, res, next)=>{
	var query = req.body;
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

		req.response.data = user;
		next();
	}catch(e){
		req.response.status = 5000;
		req.response.error_message = e.message;
		next();
		return ;
	}
}