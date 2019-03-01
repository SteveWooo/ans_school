/*
* @param image_loop_id
*/
module.exports = async (req, res, next)=>{
	var query = req.body;
	var swc = req.swc;

	if(!query.image_loop_id){
		req.response.status = 4005;
		req.response.error_message = "参数错误";
		next();
		return ;
	}

	try{
		var result = await swc.db.models.image_loops.destroy({
			where : {
				image_loop_id : query.image_loop_id
			}
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