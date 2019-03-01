const Sequelize = require("sequelize");
async function models_defined(swc){
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
	swc.db.models.orders = swc.db.seq.define("orders", {
		order_id : {type : Sequelize.STRING(32)},
		user_id : {type : Sequelize.STRING(32)},
		service_class_id : {type : Sequelize.STRING(32)},
		title : {type : Sequelize.TEXT()},
		content : {type : Sequelize.TEXT()},
		mobile : {type : Sequelize.TEXT()},
		name : {type : Sequelize.TEXT()},

		status : {type : Sequelize.INTEGER()},

		position_field : {type : Sequelize.TEXT()},
		position_building : {type : Sequelize.TEXT()},
		position_room : {type : Sequelize.TEXT()},

		leisure_time : {type : Sequelize.TEXT()},

		create_by : {type : Sequelize.STRING(32)},
		update_by : {type : Sequelize.STRING(32)},
		create_at : {type : Sequelize.STRING()},
		update_at : {type : Sequelize.STRING()},
	})
	swc.db.models.order_evaluates = swc.db.seq.define("order_evaluates", {
		order_evaluate_id : {type : Sequelize.STRING(32)},
		order_id : {type : Sequelize.STRING(32)},
		level : {type : Sequelize.INTEGER()},
		content : {type : Sequelize.TEXT()},

		create_by : {type : Sequelize.STRING(32)},
		update_by : {type : Sequelize.STRING(32)},
		create_at : {type : Sequelize.STRING()},
		update_at : {type : Sequelize.STRING()},
	})
	swc.db.models.service_classes = swc.db.seq.define("service_classes", {
		service_class_id : {type : Sequelize.STRING(32)},
		name : {type : Sequelize.TEXT()},
		description : {type : Sequelize.TEXT()},
		icon_url : {type : Sequelize.TEXT()},

		create_by : {type : Sequelize.STRING(32)},
		update_by : {type : Sequelize.STRING(32)},
		create_at : {type : Sequelize.STRING()},
		update_at : {type : Sequelize.STRING()},
	})
	swc.db.models.self_services = swc.db.seq.define("self_services", {
		self_service_id : {type : Sequelize.STRING(32)},
		service_class_id : {type : Sequelize.STRING(32)},
		title : {type : Sequelize.TEXT()},
		content : {type : Sequelize.TEXT()},
		description : {type : Sequelize.TEXT()},
		cover_url : {type : Sequelize.TEXT()},

		create_by : {type : Sequelize.STRING(32)},
		update_by : {type : Sequelize.STRING(32)},
		create_at : {type : Sequelize.STRING()},
		update_at : {type : Sequelize.STRING()},
	})
	swc.db.models.notices = swc.db.seq.define("notices", {
		notice_id : {type : Sequelize.STRING(32)},
		title : {type : Sequelize.TEXT()},
		content : {type : Sequelize.TEXT()},
		description : {type : Sequelize.TEXT()},
		cover_url : {type : Sequelize.TEXT()},

		create_by : {type : Sequelize.STRING(32)},
		update_by : {type : Sequelize.STRING(32)},
		create_at : {type : Sequelize.STRING()},
		update_at : {type : Sequelize.STRING()},
	})
	swc.db.models.image_loops = swc.db.seq.define("image_loops", {
		image_loop_id : {type : Sequelize.STRING(32)},
		image_url : {type : Sequelize.TEXT()},
		name : {type : Sequelize.TEXT()},
		is_loop : {type : Sequelize.INTEGER},

		create_by : {type : Sequelize.STRING(32)},
		update_by : {type : Sequelize.STRING(32)},
		create_at : {type : Sequelize.STRING()},
		update_at : {type : Sequelize.STRING()},
	})
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

	//数据索引
	swc.db.models.orders.belongsTo(swc.db.models.service_classes, {
		foreignKey : "service_class_id",
		targetKey : "service_class_id",
		as : "service_class"
	})

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