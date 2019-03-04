keke.leaves.information = {
	config : {
		name : "information",
		pathName : "information",
		idName : "information_id",
	},
	datas : {
		pageNow : 1, //当前页面
		itemPerPage : 10, //每页加载的数量
		loading : false, //加载状态栏
		list : [], //数据列表
		count : 0, //总数
		//列表头名字
		itemHeader : [{
			text : "封面图",
			sortable : false
		},{
			text : "标题",
			sortable: false,
		},{
			text : "置顶状态",
			sortable : false
		}, {
			text : "操作",
			sortable : false
		}]
	},
	panels : {
		add : {
			show : false,
			editor : undefined,
			form : {
				title : '',
				content : ''
			}
		},
		update : {
			show : false,
			editor : undefined,
			form : {
				title : '',
				content : ''
			}
		}
	}
}