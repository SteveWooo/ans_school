/*
* @param information_id, updatecontents
*/
module.exports = async (req, res, next)=>{
	var query = req.body;
	var swc = req.swc;

	if(!query.information_id || query.information_id.length != 32){
		req.response.status = 4005;
		req.response.error_message = "参数错误";
		next();
		return ;
	}
	var image = undefined;
	if(query.cover_image){
		image = await swc.common.saveImage(swc, {
			image : query.cover_image
		})
	}

	try{
		var information = await swc.db.models.informations.findAndCountAll({
			where : {
				information_id : query.information_id
			}
		})

		if(information.count == 0){
			req.response.status = 4004;
			req.response.error_message = '找不到该服务';
			next();
			return ;
		}
		var updateform = {};
		if(query.title){
			updateform.title = query.title;
		}
		if(query.content){
			updateform.content = query.content;
		}
		if(image){
			updateform.cover_url = image.filename;
		}

		if(query.set_top){
			updateform.set_top = query.set_top;
		}
		var result = await information.rows[0].update(updateform);
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