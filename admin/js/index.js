var vue = new Vue({
	el : '#app',
	data : {
		router_name : {
			'login' : '登陆',
			'subject' : '科目管理',
			'topicgroup' : '题库管理',
			'topic' : '题目管理',
			'information' : '资讯管理',
			'wechatuser' : '用户管理',
			'record' : '成绩查询',
			'feedback' : '反馈管理'
		},
		router : "",
		global : {
			common : {
				resHandle : function(res){
					if(typeof res != "object"){
						res = JSON.parse(res);
					}
					if(res.status == "3002"){
						let hash = res.hash;
						location.hash = hash;
						return res;
					}
					return res;
				},
				resErrHandle : function(res){
					alert(res.error_message);
				},

				//控制器们
				controllers : {
					actions : {
						/*
						* options : { message : 弹窗消息体 }
						*/
						alert : function(options){
							vue.global.common.controllers.leaves.alert.message = options == undefined ? 
								"default alert" : options.message;
							//清除上一次的计时器
							if(vue.global.common.controllers.leaves.alert.timeout_instance){
								clearTimeout(vue.global.common.controllers.leaves.alert.timeout_instance);
							}
							vue.global.common.controllers.leaves.alert.show = true;
							vue.global.common.controllers.leaves.alert.timeout_instance = setTimeout(function(){
								vue.global.common.controllers.leaves.alert.show = false;
								vue.global.common.controllers.leaves.alert.timeout_instance = undefined;
							}, 1200)
						}
					},
					leaves : {
						alert : {
							show : false,
							message : "test",
							timeout_instance : undefined
						}
					}
				},

				//管理员数据
				adminData : undefined,
				initHandle : function(){
					var hash = location.hash;
					//登陆页面不需要获取管理员信息
					if(hash == "login"){
						return ;
					}
					$.ajax({
						url : vue.global.config.base_url + "/api/m/admin/get_admin",
						type : "post",
						success : function(res){
							res = vue.global.common.res_handle(res);
							if(res.status != "2000"){
								alert(res.error_message);
								return res;
							}
							vue.global.common.admin_data = res.source.admin_data;
							return res;
						},
						error : function(){
							alert("网络错误");
						}
					})
				},

				tools : {
					timetranfers : function(date){
					    var date = new Date(date * 1);//如果date为13位不需要乘1000
					    var Y = date.getFullYear() + '-';
					    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
					    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
					    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
					    var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
					    var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
					    return Y+M+D+h+m+s;
					}
				}
			},
			pages : keke.leaves,
			config : {
				number : 1,
				baseUrl : location.origin,
				baseResUrl : location.origin + "/res",
			}
		},
		index : {
			drawer: false,
			menu : [{
				text : "登陆",
				icon: 'history',
				router : "login"
			},{
				text : "科目管理",
				icon: 'history',
				router : "subject"
			},{
				text : "资讯管理",
				icon: 'history',
				router : "information"
			},{
				text : "微信用户管理",
				icon: 'history',
				router : "wechatuser"
			},{
				text : "用户反馈管理",
				icon: 'history',
				router : "feedback"
			}]
		}
	},
	methods : {
		router_init : function(){
			var that = this;
			//监听路由
			this.router = location.hash.substring(1);
			window.onhashchange = function(){
				that.router = location.hash.substring(1);
			}
			history.pushState(null, null, document.URL);
			//禁用返回事件
			window.addEventListener('popstate', function () {
			    history.pushState(null, null, document.URL);
			});
			//禁用F5刷新按钮(mac无解)
			document.onkeydown = function(e){
				if(e.keyCode == 16){
					e.keyCode = 0;
					e.cancelBubble = true;
					return false;
				}
			}

			//拉管理员信息
			$.ajax({
				url : that.global.config.baseUrl + "/api/m/user/get",
				success : function(res){
					res = that.global.common.resHandle(res);
					if(res.status != 2000){
						return ;
					}

					that.global.common.adminData = res.source.admin_user;
				}
			})
		},
		init : function(){
			this.router_init();
		},
		drawerRouter : function(r){
			location.hash = r;
			this.index.drawer = !this.index.drawer;
		},

		toLoginPage : function(){
			location.hash = "login";
		}
	},
	mounted : function(){
		this.init();
	}
})