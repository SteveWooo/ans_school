/*
* @param title description topics subject_id
*/
const crypto = require("crypto");
	
//解析上传上来的题目内容
//@param options : {topics : base64}
function parseTopic(swc, options){
	var resp = {
		status : 2000,
		topics : [],
		error_message : ''
	}
	//检查
	if(options.topics.indexOf(';base64,') < 0){
		resp.status = 4006;
		resp.error_message = '解析错误:上传数据非标准base64';
		return resp;
	}
	//转换json
	var topicsFile;
	try{
		var sourceFile = options.topics.substring(options.topics.indexOf(';base64,') + ';base64,'.length);
		topicsFile = (Buffer.from(sourceFile, "base64")).toString();
		console.log(typeof topicsFile)
		topicsFile = JSON.parse(topicsFile);
	}catch(e){
		console.log(e);
		resp.status = 4006;
		resp.error_message = '解析错误:' + e.message;
		return resp;
	}

	//检查json数据是否齐全
	if(!topicsFile.topics || topicsFile.topics.length == 0){
		resp.status = 4006;
		resp.error_message = '解析错误:缺少topics数组';
		return resp;
	}
	//检查具体题目内容
	for(var i=0;i<topicsFile.topics.length;i++){
		var topic = topicsFile.topics[i];
		//检查题目必备项目
		if(!topic['title'] || !topic['content'] || !topic['answer'] || !topic['explain']){
			resp.status = 4006;
			resp.error_message = '解析错误:某题目缺少数据，顺序编号：' + i + " , 标题(title)：" + topic.title;
			return resp;
			break;
		}

		//检查内容的选项数据是否齐全
		var content = topic['content'];
		if(!content.options){
			resp.status = 4006;
			resp.error_message = '解析错误:某题目内容(content)缺少选项内容，顺序编号：' + i + " , 标题(title)：" + topic.title;
			return resp;
			break;
		}

		//检查选项类型
		if(typeof content.options != 'object'){
			resp.status = 4006;
			resp.error_message = '解析错误:某题目内容(content)类型错误，顺序编号：' + i + " , 标题(title)：" + topic.title;
			return resp;
			break;
		}

		//检查答案是否有选项匹配
		if(!(topic.answer in content.options)){
			resp.status = 4006;
			resp.error_message = '解析错误:某题目答案不匹配选项内容，顺序编号：' + i + " , 标题(title)：" + topic.title;
			return resp;
			break;
		}

		try{
			topicsFile.topics[i].content = JSON.stringify(topicsFile.topics[i].content);
		}catch(e){
			console.log(e);
		}
	}

	resp.topics = topicsFile.topics;
	return resp;
}

module.exports = async (req, res, next)=>{
	var query = req.body;
	var swc = req.swc;

	if(!query.subject_id || query.subject_id.length != 32){
		req.response.status = 4005;
		req.response.error_message = "参数错误:subject_id";
		next();
		return ;
	}
	if(!query.title){
		req.response.status = 4005;
		req.response.error_message = "参数错误:title";
		next();
		return ;
	}
	if(!query.topics){
		req.response.status = 4005;
		req.response.error_message = "参数错误:topic";
		next();
		return ;
	}

	//解析题目内容
	var parseResult = parseTopic(swc, {
		topics : query.topics
	})
	//解析失败
	if(parseResult.status !== 2000){
		req.response = parseResult;
		next();
		return ;
	}

	//创建套题
	var now = +new Date();
	var id_source = [
		req.source.admin_user.admin_id,
		"topic_groups",
		now,
		swc.config.wechat.public_salt
	].join("&");
	var topic_group = {
		topic_group_id : crypto.createHash('md5').update(id_source).digest('hex'),
		subject_id : query.subject_id,
		title : query.title,
		description : query.description,
		icon_url : "",
		status : 1,

		create_at : now,
		update_at : now,
		create_by : req.source.admin_user.admin_id,
		update_by : req.source.admin_user.admin_id
	}

	//写入题目库
	try{
		for(var i=0;i<parseResult.topics.length;i++){
			//构建一个数据项
			var topic = parseResult.topics[i];

			topic.number = i;
			var topicIdSource = [
				req.source.admin_user.admin_id,
				"topics",
				i,
				now,
				swc.config.wechat.public_salt
			].join("&")
			topic.topic_id = crypto.createHash('md5').update(topicIdSource).digest('hex');
			topic.topic_group_id = topic_group.topic_group_id;
			topic.status = 1;
			topic.create_at = now;
			topic.update_at = now;
			topic.create_by = req.source.admin_user.admin_id;
			topic.update_by = req.source.admin_user.admin_id;
			await swc.db.models.topics.create(topic);
		}
	}catch(e){
		req.response.status = 5000;
		req.response.error_message = e.message;
		next();
		return ;
	}

	try{
		var result = await swc.db.models.topic_groups.create(topic_group);
		req.response.data = result;
		next();
	}catch(e){
		req.response.status = 5000;
		req.response.error_message = e.message;
		next();
		return ;
	}
}