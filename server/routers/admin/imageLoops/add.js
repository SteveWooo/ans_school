/*
* @param loop_image name
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

	var image = swc.common.saveImage(swc, {
		image : query.loop_image
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
		now,
		swc.config.wechat.public_salt
	].join("&");
	var image_loop = {
		image_loop_id : crypto.createHash('md5').update(id_source).digest('hex'),
		name : query.name,
		image_url : image.filename,

		create_at : now,
		update_at : now,
		create_by : req.source.admin_user.admin_id,
		update_by : req.source.admin_user.admin_id
	}

	try{
		var result = await swc.db.models.image_loops.create(image_loop);
		req.response.data = result;
		next();
	}catch(e){
		req.response.status = 5000;
		req.response.error_message = e.message;
		next();
		return ;
	}
}