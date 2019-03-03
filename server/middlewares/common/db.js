const Sequelize = require("sequelize");
async function models_defined(swc){
	//用户表
	swc.db.models.users = swc.db.seq.define("users", {
		openid : {type : Sequelize.STRING(32)},
		user_id : {type : Sequelize.STRING(32)},
		nick_name : {type : Sequelize.STRING()},
		avatar_url : {type : Sequelize.STRING()},

		mobile : {type : Sequelize.TEXT()},
		name : {type : Sequelize.TEXT()},
		position_field : {type : Sequelize.TEXT()},
		position_building : {type : Sequelize.TEXT()},
		position_room : {type : Sequelize.TEXT()},

		create_by : {type : Sequelize.STRING(32)},
		update_by : {type : Sequelize.STRING(32)},
		create_at : {type : Sequelize.STRING()},
		update_at : {type : Sequelize.STRING()},
	})
	//管理员表
	swc.db.models.admins = swc.db.seq.define("admins", {
		admin_id : {type : Sequelize.STRING(32)},
		account : {type : Sequelize.STRING()},
		password : {type : Sequelize.STRING(32)},
		name : {type : Sequelize.STRING},

		create_by : {type : Sequelize.STRING(32)},
		update_by : {type : Sequelize.STRING(32)},
		create_at : {type : Sequelize.STRING()},
		update_at : {type : Sequelize.STRING()},
	})
	//资讯表
	swc.db.models.informations = swc.db.seq.define("informations", {
		onformation_id : {type : Sequelize.STRING(32)},

		title : {type : Sequelize.TEXT()},
		content : {type : Sequelize.TEXT()},

		status : {type : Sequelize.INTEGER()},
		set_top : {type : Sequelize.INTEGER()}, //是否首页轮播

		create_by : {type : Sequelize.STRING(32)},
		update_by : {type : Sequelize.STRING(32)},
		create_at : {type : Sequelize.STRING()},
		update_at : {type : Sequelize.STRING()},
	})
	//科目表
	swc.db.models.subjects = swc.db.seq.define("subjects", {
		subject_id : {type : Sequelize.STRING(32)},
		name : {type : Sequelize.TEXT()}, //科目名称
		description : {type : Sequelize.TEXT()}, //科目简介
		
		status : {type : Sequelize.INTEGER()},

		create_by : {type : Sequelize.STRING(32)},
		update_by : {type : Sequelize.STRING(32)},
		create_at : {type : Sequelize.STRING()},
		update_at : {type : Sequelize.STRING()},
	})
	//试卷套题表
	swc.db.models.topic_groups = swc.db.seq.define("topic_groups", {
		topic_group_id : {type : Sequelize.STRING(32)},
		subject_id : {type : Sequelize.STRING(32)},
		title : {type : Sequelize.TEXT()},
		description : {type : Sequelize.TEXT()},
		icon_url : {type : Sequelize.TEXT()},

		status : {type : Sequelize.INTEGER()},

		create_by : {type : Sequelize.STRING(32)},
		update_by : {type : Sequelize.STRING(32)},
		create_at : {type : Sequelize.STRING()},
		update_at : {type : Sequelize.STRING()},
	})
	//题目表
	swc.db.models.topics = swc.db.seq.define("topics", {
		topic_id : {type : Sequelize.STRING(32)},
		topic_group_id : {type : Sequelize.STRING(32)},
		title : {type : Sequelize.TEXT()}, //题目
		number : {type : Sequelize.INTEGER()}, //题目编号，非常重要，从0开始
		explain : {type : Sequelize.TEXT()}, //详解
		content : {type : Sequelize.TEXT()}, //json : {options : [{number : "A", content : "content"}]}
		answer : {type : Sequelize.TEXT()},
		status : {type : Sequelize.INTEGER()},

		create_by : {type : Sequelize.STRING(32)},
		update_by : {type : Sequelize.STRING(32)},
		create_at : {type : Sequelize.STRING()},
		update_at : {type : Sequelize.STRING()},
	})
	//考试记录表
	swc.db.models.user_records = swc.db.seq.define("user_records", {
		topic_group_id : {type : Sequelize.STRING(32)}, //题组
		answers : {type : Sequelize.TEXT()}, //回答选项，一个字符串 ABCAADDBB
		score : {type : Sequelize.TEXT()}, //得分

		create_by : {type : Sequelize.STRING(32)}, //user_id
		update_by : {type : Sequelize.STRING(32)},
		create_at : {type : Sequelize.STRING()},
		update_at : {type : Sequelize.STRING()},
	})

	//数据索引
	swc.db.models.subjects.belongsTo(swc.db.models.admins, {
		foreignKey : 'create_by',
		targetKey : 'admin_id',
		as : 'admin'
	})
	swc.db.models.topic_groups.belongsTo(swc.db.models.admins, {
		foreignKey : 'create_by',
		targetKey : 'admin_id',
		as : 'admin'
	})
	// swc.db.models.orders.belongsTo(swc.db.models.service_classes, {
	// 	foreignKey : "service_class_id",
	// 	targetKey : "service_class_id",
	// 	as : "service_class"
	// })

	return swc;
}

module.exports = async (swc)=>{
	var seq = new Sequelize(swc.config.mysql.database, swc.config.mysql.user, swc.config.mysql.password, {
		host : swc.config.mysql.host,
		dialect : "mysql",
		port : swc.config.mysql.port || 3306,
		operatorsAliases: false,
		pool : {
			max : 5,
			min : 0,
			acquire : 30000,
			idle : 10000,
		},
		define: {
	    	timestamps: false
	 	},
	 	logging : false
	})
	//检查连接情况
	try{
		var res = await seq.authenticate();
	}catch(e){
		throw "Unable to connect database :" + e.message
	}

	swc.db = {
		seq : seq,
		models : {}
	}
	//定义orm模型
	swc = await models_defined(swc);
	return swc;
}