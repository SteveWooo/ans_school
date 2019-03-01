const crypto = require("crypto");
const fs = require("fs");
	
const IMAGE_HEADERS = {
	"data:image/png;base64" : "png", 
	"data:image/jpeg;base64" : "jpeg"
}
/*
* @param image图片base64
* 保存文件到本地
*/
var saveImage = function(swc, options){
	//取文件后缀
	var file_header = options.image.substring(0, options.image.indexOf(','));
	if(!(file_header in IMAGE_HEADERS)){
		return undefined;
	}
	var filename = crypto.createHash("md5").update(options.image).digest("hex");
	filename = filename + "." + IMAGE_HEADERS[file_header];

	options.image = options.image.replace(/^data:image\/\w+;base64,/, "");

	var data_buffer = Buffer.from(options.image, 'base64');
	fs.writeFileSync(swc.config.server.base_res_path + "/" + filename, data_buffer);
	return {
		filename : filename
	}
}

exports.saveImage = saveImage;