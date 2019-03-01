keke.leaves.order = {
	datas : {
		onlyProcessing : false,
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
			text : "服务类型",
			sortable : false
		},{
			text : "提交者",
			sortable: false,
		},{
			text : "状态",
			sortable : false
		},{
			text : '操作',
			sortable : false
		}]
	},
	panels : {
		update : {
			show : false,
			orderId : '',
			item : {},
			form : {
				status : -1,
			}
		},
		show : {
			show : false,
			item : {}
		}
	}
}