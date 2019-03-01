Vue.component('selfservice', {
	data : function(){
		return {
			data : vue.global.pages.selfservice, //数据流载入
			ctrl : vue.global.common.controllers.actions, //工具注入
		}
	},
	methods : {
		getData : function(){
			var scope = vue.global.pages.selfservice;
			var that = this;
			scope.datas.loading = true;
			$.ajax({
				url : vue.global.config.baseUrl + '/api/m/self_service/get?page=' + scope.datas.pageNow
					+ '&item_per_page=' + scope.datas.itemPerPage + "&service_class_id=" + scope.conditions.serviceClassId,
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
			if(this.data.conditions.serviceClassId == ""){
				this.backToClass();
				return ;
			}
			this.getData();
		},
		/*
		* 提交数据到服务端
		*/
		addDataSubmit : function(){
			var scope = vue.global.pages.selfservice;
			var that = this;
			var file = $('#selfserviceAddCover').get(0).files[0];
			if(scope.panels.add.form.title == '' || !file){
				alert('请填写完整信息')
				return ;
			}
			if(!confirm('确定新增内容？')){
				return ;
			}
			//转换图片为base64

			var reader = new FileReader();
			reader.onload = function(){
				scope.datas.loading = true;
				//提交表单
				var form = scope.panels.add.form;
				//获取封面图
				form.cover_image = this.result;
				//获取内容
				form.content = scope.panels.add.editor.txt.html();
				form.service_class_id = scope.conditions.serviceClassId;
				$.ajax({
					url : vue.global.config.baseUrl + '/api/m/self_service/add',
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
				console.log(e);
				alert('文件读取失败');
			}
		},
		//打开|关闭新增数据的对话框
		switchAddDataPanel : function(){
			var scope = vue.global.pages.selfservice;
			var that = this;
			this.data.panels.add.show = !this.data.panels.add.show;
			this.data.panels.add.form = {
				name : '',
				description : ''
			}
			if(scope.panels.add.editor === undefined){
				scope.panels.add.editor = new window.wangEditor('#selfserviceAddContent');
				scope.panels.add.editor.create();
			}
			scope.panels.add.editor.txt.html('');
			$('#selfserviceAddCover').val('');
		},

		//删除
		deleteDataSubmit : function(item){
			var scope = vue.global.pages.selfservice;
			var that = this;
			if(!confirm('确定删除数据？')){
				return ;
			}

			scope.datas.loading = true;
			//提交表单
			var form = {
				self_service_id : item.self_service_id
			}
			$.ajax({
				url : vue.global.config.baseUrl + '/api/m/self_service/delete',
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
			var scope = vue.global.pages.selfservice;
			var that = this;
			function submit(fileData){
				var form = scope.panels.update.form;
				form.self_service_id = scope.panels.update.selfServiceId;
				if(fileData !== undefined){
					form.cover_image = fileData;
				}

				//获取内容
				form.content = scope.panels.update.editor.txt.html();

				$.ajax({
					url : vue.global.config.baseUrl + '/api/m/self_service/update',
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
			if(!confirm('确定更新该分类数据吗？')){
				return ;
			}

			//获取图片，如果没有图片，则上传一个空数据，不更新
			var file = $('#selfserviceUpdateCover').get(0).files[0];
			if(file === undefined){
				submit(undefined);
			} else {
				var reader = new FileReader();
				reader.onload = function(){
					submit(this.result);
				}
				try{
					reader.readAsDataURL(file);
				}catch(e){
					alert('文件读取失败')
				}
			}
		},
		//更新分类内容操作
		switchUpdateDataPanel : function(item){
			var scope = vue.global.pages.selfservice;
			this.data.panels.update.show = !this.data.panels.update.show;
			this.data.panels.update.form = {
				title : item ? item.title : '',
				description : item ? item.description : '',
				content : item ? item.content : ''
			}
			if(scope.panels.update.editor === undefined){
				scope.panels.update.editor = new window.wangEditor('#selfserviceUpdateContent');
				scope.panels.update.editor.create();
			}
			if(item){
				this.data.panels.update.selfServiceId = item.self_service_id;
				scope.panels.update.editor.txt.html(item.content);
			}
			$('#selfserviceUpdateCover').val('');
		},
		changePage : function(page){
			var scope = vue.global.pages.selfservice;
			scope.datas.pageNow = page;
			this.refresh();
		},
		backToClass : function(){
			vue.global.pages.selfservice.conditions.serviceClassId = "";
			location.hash = "class";
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
			<v-btn color="white"
			@click="backToClass()">
				返回
			</v-btn>
		</v-flex>
		<v-flex xs7 class="text-xs-right">
			<v-btn color="white"
			@click="refresh()">
				刷新
			</v-btn>
			<v-btn color="white"
			@click="switchAddDataPanel()">
				创建自助服务
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
							@click="switchUpdateDataPanel(props.item)"
							style="width:80px;margin:10px 10px 10px 10px;"
							:src="vue.global.config.baseResUrl + '/' + props.item.cover_url">
						</v-img>
					</td>
					<td>
						{{props.item.title}}
					</td>
					<td>
						{{props.item.description}}
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
		scrollable=true
		v-model="data.panels.add.show"
		width=1000
		>
		<v-card>
			<v-card-title
			  class="headline blue lighten-1"
			  primary-title
			>
				新增自助维修
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
				<div id="selfserviceAddContent"></div>
				<label>
					封面图：
				</label>
				<input id="selfserviceAddCover" type="file"/>
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
		scrollable=true
		hide-overlay="true"
		v-model="data.panels.update.show"
		width=1000
		>
		<v-card>
			<v-card-title
			  class="headline blue lighten-1"
			  primary-title
			>
				修改自助维修
			</v-card-title>

			<v-form
				style="padding:16px 16px 16px 16px">
				<v-text-field
					required
					v-model=data.panels.update.form.title
					label="标题">
				</v-text-field>
				<v-text-field
					required
					v-model=data.panels.update.form.description
					label="描述">
				</v-text-field>
				<div id="selfserviceUpdateContent"></div>
				<label>
					封面图：
				</label>
				<input id="selfserviceUpdateCover" type="file"/>
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