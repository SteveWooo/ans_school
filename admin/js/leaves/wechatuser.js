keke.leaves.wechatuser = {
	condition : {
		mobile : "",
		name : ""
	},
	datas : {
		page_now : 1, //当前页面
		item_per_page : 10, //每页加载的数量
		loading : false, //加载状态栏
		list : [], //数据列表
		count : 0, //总数
		//列表头名字
		item_headers : [{
			text : "头像",
			sortable : false
		},{
			text : "昵称",
			sortable: false,
		}]
	},
	panels : {
		show_detail : {
			show : false,
			item : {}
		}
	}
}