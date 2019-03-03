/*
* @param subject_id, updatecontents
*/
module.exports = async (req, res, next)=>{
	var query = req.body;
	var swc = req.swc;

	if(!query.subject_id || query.subject_id.length != 32){
		req.response.status = 4005;
		req.response.error_message = "参数错误";
		next();
		return ;
	}

	try{
		var subject = await swc.db.models.subjects.findAndCountAll({
			where : {
				subject_id : query.subject_id
			}
		})

		if(subject.count == 0){
			req.response.status = 4004;
			req.response.error_message = '找不到该科目';
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

		var result = await subject.rows[0].update(updateform);
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