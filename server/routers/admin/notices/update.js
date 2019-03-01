/*
* @param notice_id, updatecontents
*/
module.exports = async (req, res, next)=>{
	var query = req.body;
	var swc = req.swc;

	if(!query.notice_id){
		req.response.status = 4005;
		req.response.error_message = "参数错误";
		next();
		return ;
	}

	try{
		var notice = await swc.db.models.notices.findAndCountAll({
			where : {
				notice_id : query.notice_id
			}
		})

		if(notice.count == 0){
			req.response.status = 4004;
			req.response.error_message = '找不到该通告';
			next();
			return ;
		}

		var updateform = {};
		if(query.title){
			updateform.title = query.title;
		}
		if(query.description){
			updateform.description = query.description;
		}
		if(query.content){
			updateform.content = query.content;
		}

		var result = await notice.rows[0].update(updateform);
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