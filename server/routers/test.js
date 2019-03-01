module.exports = async function (req, res, next){
	req.response = {
		status : 2000,
		openid : req.source.openid
	}
	var swc = req.swc;
	var db = swc.db;

	var result = await db.models.news.findAndCountAll({
		include : db.models.clubs
	})

	req.response.data = result;

	next();
}