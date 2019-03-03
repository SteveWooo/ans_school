var keke = {
	load_files : function(options, callback){
		if(options.num == options.groups.length){
			callback(options.result);
			return ;
		}

		if(options.groups[options.num].num == options.groups[options.num].files.length){
			options.num ++;
			keke.load_files(options,  callback);
			return ;
		}

		var dom = document.createElement("script");
		var group = options.groups[options.num];
		dom.src = group.files[group.num].src;
		document.body.appendChild(dom);

		dom.onload = function(){
			group.num ++;
			options.groups[options.num] = group;

			keke.load_files(options, callback);
		}
	},
	init : function(){
		//配置的加载组件列表
		var components = [
			'hello', 
			'login',
			'demo',
			'wechatuser',

			'subject',
			'topicgroup',
			'topic'
		];

		var sdk_list = {
			files : [],
			num : 0,
		}; //必备控件
		var component_list = {
			files : [],
			num : 0
		}; //组件
		var enter_list = {
			files : [],
			num : 0
		}; //入口文件
		var leaves_list = {
			files : [],
			num : 0
		}; //页面数据流

		sdk_list.files.push({
			src : "dist/jquery.min.js"
		})
		sdk_list.files.push({
			src : "dist/vue.min.js"
		})
		sdk_list.files.push({
			src : "dist/vuetify.min.js"
		})
		sdk_list.files.push({
			src : "dist/wangEditor.min.js"
		})

		for(var i=0;i<components.length;i++){
			component_list.files.push({
				src : "js/components/"+components[i]+"/"+components[i]+"Page.js"
			});
			leaves_list.files.push({
				src : "./js/leaves/"+components[i]+".js"
			})
		}

		enter_list.files.push({
			src : "js/index.js"
		})

		keke.load_files({
			num : 0,
			groups : [leaves_list, sdk_list, component_list, enter_list],
			result : {}
		}, function(result){
			console.log("loaded files");
		})
	},

	//数据流
	leaves : {}
}

keke.init();