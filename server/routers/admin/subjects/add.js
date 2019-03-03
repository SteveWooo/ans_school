/*
* @param name description
*/
const crypto = require("crypto");
module.exports = async (req, res, next)=>{
	var query = req.body;
	var swc = req.swc;

	if(!query.name){
		req.response.status = 4005;
		req.response.error_message = "参数错误";
		next();
		return ;
	}

	var now = +new Date();
	var id_source = [
		req.source.admin_user.admin_id,
		"subjects",
		now,
		swc.config.wechat.public_salt
	].join("&");
	var subject = {
		subject_id : crypto.createHash('md5').update(id_source).digest('hex'),
		name : query.name,
		description : query.description,
		status : 1,

		create_at : now,
		update_at : now,
		create_by : req.source.admin_user.admin_id,
		update_by : req.source.admin_user.admin_id
	}

	try{
		var result = await swc.db.models.subjects.create(subject);
		req.response.data = result;
		next();
	}catch(e){
		req.response.status = 5000;
		req.response.error_message = e.message;
		next();
		return ;
	}
}