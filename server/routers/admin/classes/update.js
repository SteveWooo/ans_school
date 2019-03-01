/*
* @param service_class_id, updatecontents
*/
module.exports = async (req, res, next)=>{
	var query = req.body;
	var swc = req.swc;

	if(!query.service_class_id){
		req.response.status = 4005;
		req.response.error_message = "参数错误";
		next();
		return ;
	}
	var image = undefined;
	if(query.icon_image){
		image = await swc.common.saveImage(swc, {
			image : query.icon_image
		})
	}

	try{
		var serviceClass = await swc.db.models.service_classes.findAndCountAll({
			where : {
				service_class_id : query.service_class_id
			}
		})

		if(serviceClass.count == 0){
			req.response.status = 4004;
			req.response.error_message = '找不到该服务';
			next();
			return ;
		}

		var updateform = {};
		if(query.name){
			updateform.name = query.name;
		}
		if(query.description){
			updateform.description = query.description;
		}
		if(image){
			updateform.icon_url = image.filename
		}

		var result = await serviceClass.rows[0].update(updateform);
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