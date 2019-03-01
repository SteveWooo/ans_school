keke.leaves.news = {
	datas : {
		page_now : 1, //当前页面
		item_per_page : 10, //每页加载的数量
		loading : false, //加载状态栏
		list : [], //数据列表
		count : 0, //总数
		//列表头名字
		item_headers : [{
			text : "封面图",
			sortable : false
		},{
			text : "标题",
			sortable: false,
		},{
			text : "所属社团",
			sortable : false
		}, {
			text : "状态",
			sortable : false
		}, {
			text : "置顶",
			sortable : false
		}]
	},
	panels : {
		show_detail : {
			show : false,
			item : {}
		}
	}
}