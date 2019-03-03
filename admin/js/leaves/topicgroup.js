keke.leaves.topicgroup = {
	config : {
		name : "topicgroup",
		pathName : "topic_group",
		idName : "topic_group_id",
	},
	conditions : {
		subject : undefined,
	},
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
			sortable: false,
		},{
			text : "创建者",
			sortable: false,
		},{
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