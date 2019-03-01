Vue.component('notice', {
	data : function(){
		return {
			data : vue.global.pages.notice, //数据流载入
			ctrl : vue.global.common.controllers.actions, //工具注入
		}
	},
	methods : {
		getData : function(){
			var scope = vue.global.pages.notice;
			var that = this;
			scope.datas.loading = true;
			$.ajax({
				url : vue.global.config.baseUrl + '/api/m/notice/get?page=' + scope.datas.pageNow
					+ '&item_per_page=' + scope.datas.itemPerPage,
				success : function(res){
					scope.datas.loading = false;
					res = vue.global.common.resHandle(res);
					if(res.status != '2000'){
						that.ctrl.alert({
							message : res.error_message
						})
						return ;
					}

					scope.datas.list = res.data.rows;
					scope.datas.count = res.data.count;
				},
				false : function(){
					scope.datas.loading = true;
					that.ctrl.alert({
						message : '网络错误'
					})
				}
			})
		},
		refresh : function(){
			this.getData();
		},
		init : function(){
			this.getData();
		},
		/*
		* 提交数据到服务端
		*/
		addDataSubmit : function(){
			var scope = vue.global.pages.notice;
			var that = this;
			if(scope.panels.add.form.title == ''){
				that.ctrl.alert({
					message : '请填写必选数据'
				});
				return ;
			}
			if(!confirm('确定创建该通知？')){
				return ;
			}
			//封装数据提交
			scope.datas.loading = true;
			//提交表单
			var form = scope.panels.add.form;
			$.ajax({
				url : vue.global.config.baseUrl + '/api/m/notice/add',
				headers : {
					'Content-Type' : 'Application/json'
				},
				method : "post",
				data : JSON.stringify(form),
				success : function(res){
					scope.datas.loading = false;
					res = vue.global.common.resHandle(res);
					if(res.status != '2000'){
						that.ctrl.alert({
							message : res.error_message
						})
						return ;
					}
					that.ctrl.alert({
						message : '创建成功'
					})
					that.switchAddDataPanel();
					that.refresh();
				},
				false : function(){
					scope.datas.loading = false;
					that.ctrl.alert({
						message : '网络错误'
					})
				}
			})
		},
		//打开|关闭新增数据的对话框
		switchAddDataPanel : function(){
			this.data.panels.add.show = !this.data.panels.add.show;
			this.data.panels.add.form = {
				name : '',
				description : '',
				content : ''
			}
		},

		//删除分类
		deleteDataSubmit : function(item){
			var scope = vue.global.pages.notice;
			var that = this;
			if(!confirm('确定删除数据？')){
				return ;
			}

			scope.datas.loading = true;
			//提交表单
			var form = {
				notice_id : item.notice_id
			}
			$.ajax({
				url : vue.global.config.baseUrl + '/api/m/notice/delete',
				headers : {
					'Content-Type' : 'Application/json'
				},
				data : JSON.stringify(form),
				method : "post",
				success : function(res){
					scope.datas.loading = false;
					res = vue.global.common.resHandle(res);
					if(res.status != '2000'){
						that.ctrl.alert({
							message : res.error_message
						})
						return ;
					}
					that.ctrl.alert({
						message : '删除成功'
					})
					that.refresh();
				},
				false : function(){
					scope.datas.loading = false;
					that.ctrl.alert({
						message : '网络错误'
					})
				}
			})
		},

		//提交更新数据操作
		updateDataSubmit : function(){
			var scope = vue.global.pages.notice;
			var that = this;
			function submit(fileData){
				var form = scope.panels.update.form;
				form.notice_id = scope.panels.update.notice_id;
				if(fileData !== undefined){
					form.icon_image = fileData;
				}

				$.ajax({
					url : vue.global.config.baseUrl + '/api/m/notice/update',
					headers : {
						'Content-Type' : 'Application/json'
					},
					method : "post",
					data : JSON.stringify(form),
					success : function(res){
						scope.datas.loading = false;
						res = vue.global.common.resHandle(res);
						if(res.status != '2000'){
							that.ctrl.alert({
								message : res.error_message
							})
							return ;
						}
						that.ctrl.alert({
							message : '修改成功'
						})
						that.switchUpdateDataPanel();
						that.refresh();
					},
					false : function(){
						scope.datas.loading = false;
						that.ctrl.alert({
							message : '网络错误'
						})
					}
				})
			}
			if(!confirm('确定更新该通知数据吗？')){
				return ;
			}

			//获取图片，如果没有图片，则上传一个空数据，不更新
			// var file = $('#classUpdateIcon').get(0).files[0];
			// if(file === undefined){
			// 	submit(undefined);
			// } else {
			// 	var reader = new FileReader();
			// 	reader.onload = function(){
			// 		submit(this.result);
			// 	}
			// 	try{
			// 		reader.readAsDataURL(file);
			// 	}catch(e){
			// 		that.ctrl.alert({
			// 			message : '文件读取失败'
			// 		})
			// 	}
			// }

			submit(undefined);
		},
		//更新分类内容操作
		switchUpdateDataPanel : function(item){
			this.data.panels.update.show = !this.data.panels.update.show;
			this.data.panels.update.form = {
				name : item ? item.name : '',
				description : item ? item.description : '',
				content : item ? item.content : '',
			}
			if(item){
				this.data.panels.update.notice_id = item.notice_id;
			}
		},
		changePage : function(page){
			var scope = vue.global.pages.notice;
			scope.datas.pageNow = page;
			this.refresh();
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
				刷新
			</v-btn>
			<v-btn color="white"
			@click="switchAddDataPanel()">
				新建公告
			</v-btn>
		</v-flex>
		<v-flex xs12>
			<v-data-table
				dark
				hide-actions
				rows-per-page-items="10"
				:headers="data.datas.itemHeader" 
				:items="data.datas.list"
				:total-items="data.datas.count"
				:loading=data.datas.loading>
				<v-progress-linear slot="progress" color="red" indeterminate></v-progress-linear>
				<template slot="items" slot-scope="props">
					<td>
						{{props.item.title}}
					</td>
					<td>
						{{props.item.description}}
					</td>
					<td>
						<v-btn
							color="blue"
							@click="switchUpdateDataPanel(props.item)">
							修改
						</v-btn>
						<v-btn
							color="red"
							@click="deleteDataSubmit(props.item)">
							删除
						</v-btn>
					</td>
				</template>
			</v-data-table>
		</v-flex>
		<v-flex xs12>
			<div class="text-xs-right">
				<v-pagination
					v-model="data.datas.pageNow"
					dark
					@input="changePage"
					:total-visible="9"
					:length="Math.ceil(data.datas.count / data.datas.itemPerPage)"
				></v-pagination> 当前：{{data.datas.pageNow}}
			</div>
		</v-flex>
	</v-layout>

	<v-dialog 
		dark
		hide-overlay="true"
		v-model="data.panels.add.show"
		width=500
		>
		<v-card>
			<v-card-title
			  class="headline blue lighten-1"
			  primary-title
			>
				新增通告
			</v-card-title>

			<v-form
				style="padding:16px 16px 16px 16px">
				<v-text-field
					required
					v-model=data.panels.add.form.title
					label="标题">
				</v-text-field>
				<v-text-field
					required
					v-model=data.panels.add.form.description
					label="描述">
				</v-text-field>
				<v-textarea
					required
					v-model=data.panels.add.form.content
					label="内容">
				</v-textarea>
			</v-form>
			<v-divider></v-divider>
			<v-card-actions>
				<v-btn
					@click="switchAddDataPanel">
					取消
				</v-btn>
				<v-btn
					v-if="!data.datas.loading"
					@click="addDataSubmit"
					color="blue">
					确定
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>

	<v-dialog 
		dark
		hide-overlay="true"
		v-model="data.panels.update.show"
		width=500
		>
		<v-card>
			<v-card-title
			  class="headline blue lighten-1"
			  primary-title
			>
				修改分类
			</v-card-title>

			<v-form
				style="padding:16px 16px 16px 16px">
				<v-text-field
					required
					v-model=data.panels.update.form.title
					label="名称">
				</v-text-field>
				<v-text-field
					required
					v-model=data.panels.update.form.description
					label="描述">
				</v-text-field>
				<v-textarea
					required
					v-model=data.panels.update.form.content
					label="内容">
				</v-textarea>
			</v-form>
			<v-divider></v-divider>
			<v-card-actions>
				<v-btn
					@click="switchUpdateDataPanel">
					取消
				</v-btn>
				<v-btn
					v-if="!data.datas.loading"
					@click="updateDataSubmit"
					color="blue">
					确定
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</v-container>
`
})