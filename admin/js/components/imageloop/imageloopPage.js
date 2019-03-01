Vue.component('imageloop', {
	data : function(){
		return {
			data : vue.global.pages.imageloop, //数据流载入
			ctrl : vue.global.common.controllers.actions, //工具注入
		}
	},
	methods : {
		getData : function(){
			var scope = vue.global.pages.imageloop;
			var that = this;
			scope.datas.loading = true;
			$.ajax({
				url : vue.global.config.baseUrl + '/api/m/image_loop/get?page=' + scope.datas.pageNow
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
			var scope = vue.global.pages.imageloop;
			var that = this;
			var file = $('#imageloopAddImage').get(0).files[0];
			if(scope.panels.add.form.name == '' || !file){
				that.ctrl.alert({
					message : '请填写必选数据'
				});
				return ;
			}
			if(!confirm('确定新增该服务分类？')){
				return ;
			}
			//转换图片为base64

			var reader = new FileReader();
			reader.onload = function(){
				scope.datas.loading = true;
				//提交表单
				var form = scope.panels.add.form;
				form.loop_image = this.result;
				$.ajax({
					url : vue.global.config.baseUrl + '/api/m/image_loop/add',
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
			}
			try{
				reader.readAsDataURL(file);
			}catch(e){
				that.ctrl.alert({
					message : '文件读取失败'
				})
			}
		},
		//打开|关闭新增数据的对话框
		switchAddDataPanel : function(){
			this.data.panels.add.show = !this.data.panels.add.show;
			this.data.panels.add.form = {
				name : '',
			}
			$('#imageloopAddImage').val('');
		},

		//删除分类
		deleteDataSubmit : function(item){
			var scope = vue.global.pages.imageloop;
			var that = this;
			if(!confirm('确定删除数据？')){
				return ;
			}

			scope.datas.loading = true;
			//提交表单
			var form = {
				image_loop_id : item.image_loop_id
			}
			$.ajax({
				url : vue.global.config.baseUrl + '/api/m/image_loop/delete',
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
		changePage : function(page){
			var scope = vue.global.pages.imageloop;
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
				新建图片轮播
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
						<v-img 
							style="width:80px;margin:10px 10px 10px 10px;"
							:src="vue.global.config.baseResUrl + '/' + props.item.image_url">
						</v-img>
					</td>
					<td>
						{{props.item.name}}
					</td>
					<td>
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
				新增图片轮播
			</v-card-title>

			<v-form
				style="padding:16px 16px 16px 16px">
				<v-text-field
					required
					v-model=data.panels.add.form.name
					label="名称">
				</v-text-field>
				<input id="imageloopAddImage" type="file"/>
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
</v-container>
`
})