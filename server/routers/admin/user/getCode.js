/*
* @param 
*/
var svgCaptcha = require('svg-captcha');

function clearCodeCache(){
	var now = +new Date();
	for(var i in global.swc.redis.codes){
		//五分钟
		if(now - global.swc.redis.codes[i].create_at >= 5 * 60 * 1000){
			delete global.swc.redis.codes[i];
		}
	}
}

module.exports = async (req, res, next)=>{
	var query = req.body;
	var swc = req.swc;
	//进来先清理一下缓存
	// clearCodeCache();

	//创建一个验证码
	var captcha = svgCaptcha.create({  
      inverse: false,  
      fontSize: 36,  
      noise: 2,  
      width: 80,  
      height: 30,  
    });  

	var code = captcha.text.toLowerCase();

	req.session.code = code;
	res.header("Content-Type", "image/svg+xml")
	res.send(String(captcha.data));
}