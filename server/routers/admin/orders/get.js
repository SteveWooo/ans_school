/*
* @param page item_per_page | order_id
*/
module.exports = async (req, res, next)=>{
	var query = req.query;
	var swc = req.swc;

	if(query.order_id && query.order_id.length == 32){
		var result = await swc.db.models.orders.findAndCountAll({
			where : {
				order_id : query.order_id
			}
		})

		if(result.count == 0){
			req.response.status = 4004;
			req.response.error_message = "找不到该通知";
			next();
			return ;
		}

		var evaluates = await swc.db.models.order_evaluates.findAndCountAll({
			where : {
				order_id : result.rows[0].order_id
			}
		})

		result.evaluates = evaluates;

		req.response.data = result;
		next();
		return ;
	}

	if(!query.item_per_page){
		query.item_per_page = 10;
	}

	if(!query.page){
		query.page = 1;
	}

	if(parseInt(query.page) != query.page || parseInt(query.item_per_page) != query.item_per_page){
		req.response.status = 4005;
		req.response.error_message = "参数错误：page or item_per_page";
		next();
		return ;
	}
	query.item_per_page = parseInt(query.item_per_page);
	var condition = {};

	if(query.status && (query.status == 1 || query.status ==2 || query.status == 3)){
		condition.status = query.status;
	}

	if(query.status == 13){
		condition.status = {
			[swc.db.seq.Op.or] : ['1', '3'], //待评价或已完成
		};
	}

	try{
		var result = await swc.db.models.orders.findAndCountAll({
			where : condition,
			include : [{
				as : "service_class",
				model : swc.db.models.service_classes
			}],
			order : [["create_at", "DESC"]],
			limit : query.item_per_page,
			offset : (query.page - 1) * query.item_per_page
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