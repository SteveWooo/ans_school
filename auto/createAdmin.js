const config = require("../config.json");
const crypto = require("crypto");
const ROOT = "root";

async function create_admins(swc, options){
	var now = +new Date();
	var source = [
		"admins",
		ROOT,
		now,
		swc.config.wechat.public_salt
	].join("&")
	console.log(source);
	var admin = {
		admin_id : crypto.createHash("md5").update(source).digest("hex"),
		account : options.account,
		password : crypto.createHash("md5").update([
			options.password,
			swc.config.wechat.public_salt].join("&")).digest("hex"),
		name : options.name,
		create_at : now,
		create_by : ROOT,
		update_at : now,
		update_by : ROOT
	}

	var result = await swc.db.models.admins.create(admin);
	return {
		admin : result
	}
}

//50706ef30033923b10b3875bddfae0be
async function create_news(swc, options){
	var now = +new Date();
	var source = [
		"news",
		options.create_by,
		now,
		swc.config.wechat.public_salt
	].join("&")
	console.log(options);
	console.log(source);
	var news = {
		news_id : crypto.createHash("md5").update(source).digest("hex"),
		club_id : options.club_id,
		title : options.title,
		content : options.content,
		create_at : now,
		create_by : options.create_by,
		update_at : now,
		update_by : options.create_by
	}

	var result = await swc.db.models.news.create(news);
	return {
		news : result
	}
}

async function create_club(swc, options){
	var now = +new Date();
	var source = [
		"clubs",
		options.create_by,
		now,
		swc.config.wechat.public_salt
	].join("&")
	var club = {
		club_id : crypto.createHash("md5").update(source).digest("hex"),
		name : options.name,
		description : options.description,
		contract : options.contract,
		create_at : now,
		create_by : options.create_by,
		update_at : now,
		update_by : options.create_by
	}

	var result = await swc.db.models.clubs.create(club);
	return {
		club : result
	}
}

async function main(){
	var swc = await require("../server/init").init(config);
	var result ;

	result = await create_admins(swc, {
		name : 'admin_root',
		type : '1',
		account : "admin",
		password : "123456"
	})


	console.log(result);
}

main();