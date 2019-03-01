keke.leaves.notice = {
	datas : {
		pageNow : 1, //当前页面
		itemPerPage : 10, //每页加载的数量
		loading : false, //加载状态栏
		list : [], //数据列表
		count : 0, //总数
		//列表头名字
		itemHeader : [{
			text : "标题",
			sortable : false
		},{
			text : "简述",
			sortable : false
		},{
			text : "操作",
			sortable : false
		}]
	},
	panels : {
		show : {
			show : false,
			item : {}
		},
		add : {
			show : false,
			form : {
				title : "",
				description : "",
				content : ""
			}
		},
		update : {
			show : false,
			noticeId : '',
			form : {
				title : '',
				description : '',
				content : ''
			}
		}
	}
}