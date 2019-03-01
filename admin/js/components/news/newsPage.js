Vue.component("news", {
	data : function(){
		return {
			news : vue.global.pages.news, //数据流载入
			ctrl : vue.global.common.controllers.actions, //工具注入
		}
	},
	methods : {
		init : function(){
			var scope = vue.global.pages.news;
			this.get_data();
		},
		get_data : function(){
			var scope = vue.global.pages.news;
			var that = this;
			$.ajax({
				url : vue.global.config.base_url + "/api/p/news/get?page=" + scope.datas.page_now
					+ "&item_per_page=" + scope.datas.item_per_page,
				success : function(res){
					res = vue.global.common.res_handle(res);
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
		change_page : function(e){
			var scope = vue.global.pages.news;
			scope.datas.page_now = e;
			this.get_data();
		},

		show_detail_panel : function(item){
			var scope = vue.global.pages.news;
			scope.panels.show_detail.item = {};
			if(typeof item.images == "object"){

			} else if(item.images == ""){
				item.images = [];
			} else {
				item.images = item.images.split(",");
				for(var i=0;i<item.images.length;i++){
					item.images[i] = vue.global.config.base_res_url + item.images[i];
				}
			}
			
			scope.panels.show_detail.item = item;
			scope.panels.show_detail.show = !scope.panels.show_detail.show;
		},
		
		//修改活动状态
		change_status : function(item){
			if(item.news_status == 2){
				return ;
			}
			if(!confirm("确定切换活动状态?")){
				return ;
			}
			var that = this;

			$.ajax({
				url : vue.global.config.base_url + "/api/m/news/change_status",
				headers : {
					'Content-Type' : "Application/json"
				},
				method : "post",
				data : JSON.stringify({
					news_id : item.news_id,
					news_status : {1:3,3:1}[item.news_status]
				}),
				success : function(res){
					res = vue.global.common.res_handle(res);
					if(res.status !== 2000){
						that.ctrl.alert({
							message : res.error_message
						});
						return ;
					}

					that.ctrl.alert({
						message : "切换成功"
					})
					that.get_data();
				}
			})
		},

		//修改置顶状态
		change_top : function(item){
			if(!confirm("确定切换活动置顶状态?")){
				return ;
			}

			var that = this;

			$.ajax({
				url : vue.global.config.base_url + "/api/m/news/set_top",
				headers : {
					'Content-Type' : "Application/json"
				},
				method : "post",
				data : JSON.stringify({
					news_id : item.news_id,
					is_top : {1:2,2:1}[item.is_top]
				}),
				success : function(res){
					res = vue.global.common.res_handle(res);
					if(res.status !== 2000){
						that.ctrl.alert({
							message : res.error_message
						});
						return ;
					}

					that.ctrl.alert({
						message : "切换成功"
					})
					that.get_data();
				}
			})
		}
	},
	mounted : function(){
		this.init();
	},
	template : 
`
<v-container>
	<v-layout row wrap>
		<v-flex xs12>
			<v-data-table
				dark
				hide-actions
				rows-per-page-items="10"
				:headers="news.datas.item_headers" 
				:items="news.datas.list"
				:total-items="news.datas.count"
				:loading=news.datas.loading>
				<v-progress-linear slot="progress" color="red" indeterminate></v-progress-linear>
				<template slot="items" slot-scope="props">
					<td>
						<v-img 
							style="width:80px;margin:10px 10px 10px 10px;"
							:src="props.item.cover_url">
						</v-img>
					</td>
					<td @click="show_detail_panel(props.item)">
						{{props.item.title}}
					</td>
					<td>
						{{props.item.club.name}}
					</td>
					<td @click="change_status(props.item)">
						{{ {1:'上线',3:'下线',2:'待审核'}[props.item.news_status] }}
					</td>
					<td @click="change_top(props.item)">
						{{ {1:'已置顶',2:'不置顶'}[props.item.is_top] }}
					</td>
				</template>
			</v-data-table>
		</v-flex>
		<v-flex xs12>
			<div class="text-xs-right">
				<v-pagination
					v-model="news.datas.page_now"
					dark
					@input="change_page"
					:total-visible="9"
					:length="Math.ceil(news.datas.count / news.datas.item_per_page)"
				></v-pagination> 当前：{{news.datas.page_now}}
			</div>
		</v-flex>
	</v-layout>

	<v-dialog 
		dark
		hide-overlay="true"
		v-model="news.panels.show_detail.show"
		width=500
		>
		<v-card>
			<v-card-title
			  class="headline blue lighten-1"
			  primary-title
			>
				详情
			</v-card-title>

			<v-form
				v-if="news.datas.list.length !== 0"
				style="padding:16px 16px 16px 16px">
				<v-text-field
					required
					v-model=news.panels.show_detail.item.title
					label="标题">
				</v-text-field>
				<v-text-field
					required
					v-model=news.panels.show_detail.item.content
					label="内容">
				</v-text-field>
				<v-layout row wrap>
					<v-flex xs3 v-for="item in news.panels.show_detail.item.images">
						<v-img style="margin:10px 10px 10px 10px" :src="item">
						</v-img>
					</v-flex>
				</v-layout>
				

			</v-form>

			<v-divider></v-divider>
		</v-card>
	</v-dialog>
</v-container>
`
})