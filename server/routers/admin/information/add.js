/*
* @param cover_image title content description
*/
const crypto = require("crypto");
module.exports = async (req, res, next)=>{
	var query = req.body;
	var swc = req.swc;

	if(!query.title){
		req.response.status = 4005;
		req.response.error_message = "参数错误";
		next();
		return ;
	}

	var image = swc.common.saveImage(swc, {
		image : query.cover_image
	})
	if(!image){
		req.response.status = 4001;
		req.response.error_message = "图片保存失败";
		next();
		return ;
	}

	var now = +new Date();
	var id_source = [
		req.source.admin_user.admin_id,
		"informations",
		now,
		swc.config.wechat.public_salt
	].join("&");
	var information = {
		information_id : crypto.createHash('md5').update(id_source).digest('hex'),

		title : query.title,
		content : query.content,
		cover_url : image.filename,
		set_top : 2,
		status : 1,

		create_at : now,
		update_at : now,
		create_by : req.source.admin_user.admin_id,
		update_by : req.source.admin_user.admin_id
	}

	try{
		var result = await swc.db.models.informations.create(information);
		req.response.data = result;
		next();
	}catch(e){
		req.response.status = 5000;
		req.response.error_message = e.message;
		next();
		return ;
	}
}