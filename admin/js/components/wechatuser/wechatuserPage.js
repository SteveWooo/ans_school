Vue.component("wechatuser", {
	data : function(){
		return {
			data : vue.global.pages.wechatuser, //数据流载入
			ctrl : vue.global.common.controllers.actions, //工具注入
		}
	},
	methods : {
		init : function(){
			var scope = vue.global.pages.wechatuser;
			this.getData();
		},
		refresh : function(){
			var scope = vue.global.pages.wechatuser;
			this.getData();
		},
		getData : function(){
			var scope = vue.global.pages.wechatuser;
			var that = this;
			var url = vue.global.config.baseUrl + "/api/m/wechat_user/get?page=" + scope.datas.page_now
					+ "&item_per_page=" + scope.datas.item_per_page
			if(this.data.condition.name != ""){
				url += "&name=" + this.data.condition.name;
			}
			if(this.data.condition.mobile != ""){
				url += "&mobile=" + this.data.condition.mobile;
			}
			$.ajax({
				url : url,
				success : function(res){
					res = vue.global.common.resHandle(res);
					if(res.status != "2000"){
						that.ctrl.alert({
							message : res.error_message
						})
						return ;
					}

					for(var i=0;i<res.data.rows.length;i++){
						res.data.rows[i].cover_url = vue.global.config.base_res_url + res.data.rows[i].cover_url;
					}
					scope.datas.list = res.data.rows;
					scope.datas.count = res.data.count;
				}
			})
		},
		changePage : function(e){
			var scope = vue.global.pages.wechatuser;
			scope.datas.page_now = e;
			this.getData();
		}
	},
	mounted : function(){
		this.init();
	},
	template : 
`
<v-container>
	<v-layout row wrap>
		<v-flex xs5>
		</v-flex>
		<v-flex xs7 class="text-xs-right">
			<v-btn color="white"
			@click="refresh()">
				查询
			</v-btn>
		</v-flex>
		<v-flex xs12>
			<v-data-table
				dark
				hide-actions
				rows-per-page-items="10"
				:headers="data.datas.item_headers" 
				:items="data.datas.list"
				:total-items="data.datas.count"
				:loading=data.datas.loading>
				<v-progress-linear slot="progress" color="red" indeterminate></v-progress-linear>
				<template slot="items" slot-scope="props">
					<td>
						<v-img 
							style="width:80px;margin:10px 10px 10px 10px;"
							:src="props.item.avatar_url">
						</v-img>
					</td>
					<td>
						{{props.item.nick_name}}
					</td>
				</template>
			</v-data-table>
		</v-flex>
		<v-flex xs12>
			<div class="text-xs-right">
				<v-pagination
					v-model="data.datas.page_now"
					dark
					@input="changePage"
					:total-visible="9"
					:length="Math.ceil(data.datas.count / data.datas.item_per_page)"
				></v-pagination> 当前：{{data.datas.page_now}}
			</div>
		</v-flex>
	</v-layout>
</v-container>
`
})