keke.leaves.feedback = {
	config : {
		name : "feedback",
		pathName : "feedback",
		idName : "feedback_id",
	},
	datas : {
		pageNow : 1, //当前页面
		itemPerPage : 10, //每页加载的数量
		loading : false, //加载状态栏
		list : [], //数据列表
		count : 0, //总数
		//列表头名字
		itemHeader : [{
			text : "头像",
			sortable : false
		},{
			text : "昵称",
			sortable: false,
		},{
			text : "内容",
			sortable : false
		}]
	},
	panels : {
		add : {
			show : false,
			editor : undefined,
			form : {
				title : '',
				description : ''
			}
		},
		update : {
			show : false,
			editor : undefined,
			selfServiceId : '',
			form : {
				title : '',
				description : ''
			}
		}
	}
}