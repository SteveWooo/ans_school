const config = require("../config.json");
async function main(){
	var swc = await require("../server/init").init(config);
	await swc.db.seq.sync();
}

main();