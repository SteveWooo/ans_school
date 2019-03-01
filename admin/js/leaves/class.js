keke.leaves.class = {
	datas : {
		pageNow : 1, //当前页面
		itemPerPage : 10, //每页加载的数量
		loading : false, //加载状态栏
		list : [], //数据列表
		count : 0, //总数
		//列表头名字
		itemHeader : [{
			text : "图标",
			sortable : false
		},{
			text : "服务分类名称",
			sortable : false
		},{
			text : "描述",
			sortable: false,
		},{
			text : "操作",
			sortable : false
		}]
	},
	panels : {
		add : {
			show : false,
			form : {
				name : "",
				description : "",
			}
		},
		update : {
			show : false,
			serviceClassId : '',
			form : {
				name : '',
				description : '',
			}
		}
	}
}