Vue.component('order', {
	data : function(){
		return {
			data : vue.global.pages.order, //数据流载入
			ctrl : vue.global.common.controllers.actions, //工具注入
		}
	},
	methods : {
		getOrder : function(options, callback){
			var scope = vue.global.pages.order;
			var that = this;
			$.ajax({
				url : vue.global.config.baseUrl + "/api/m/order/get?order_id=" + options.orderId,
				success : function(res){
					scope.datas.loading = false;
					res = vue.global.common.resHandle(res);
					if(res.status != '2000'){
						that.ctrl.alert({
							message : res.error_message
						})
						return ;
					}

					callback(res);
				},
				false : function(){
					scope.datas.loading = true;
					that.ctrl.alert({
						message : '网络错误'
					})
				}
			})
		},
		getData : function(){
			var scope = vue.global.pages.order;
			var that = this;
			scope.datas.loading = true;
			var url = vue.global.config.baseUrl + '/api/m/order/get?page=' + scope.datas.pageNow
					+ '&item_per_page=' + scope.datas.itemPerPage;
			if(scope.datas.onlyProcessing){
				url += "&status=2"
			}
			$.ajax({
				url : url,
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

		//提交更新数据操作
		updateDataSubmit : function(){
			var scope = vue.global.pages.order;
			var that = this;

			var toStatus = scope.panels.update.form.status;

			function submit(fileData){
				var form = scope.panels.update.form;
				form.order_id = scope.panels.update.order_id;
				form.status = toStatus;

				$.ajax({
					url : vue.global.config.baseUrl + '/api/m/order/update_status',
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
			if(!confirm('确定更新该订单状态吗？')){
				return ;
			}

			submit(undefined);
		},
		//更新分类内容操作
		switchUpdateDataPanel : function(item){
			var that = this
			if(item){
				this.getOrder({
					orderId : item.order_id
				}, function(res){
					that.data.panels.update.show = !that.data.panels.update.show;
					
					that.data.panels.update.item = item;
					that.data.panels.update.order_id = item.order_id;
					that.data.panels.update.form.status = item.status;
					that.data.panels.update.evaluates = res.data.evaluates;
				})

			} else {
				this.data.panels.update.show = !this.data.panels.update.show;
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
			<v-switch
				color='blue'
		      	v-model="data.datas.onlyProcessing"
		      	@change="refresh()"
		      	:label="{true:'只看进行中',false:'全部'}[data.datas.onlyProcessing]"
		    ></v-switch>
		</v-flex>
		<v-flex xs7 class="text-xs-right">
			<v-btn color="white"
			@click="refresh()">
				刷新
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
						{{props.item.service_class.name}}
					</td>
					<td>
						{{props.item.name}}:{{props.item.mobile}}
					</td>
					<td>
						{{{'1':'已完成','2':'进行中', '3':'待评价'}[props.item.status]}}
					</td>
					<td>
						<v-btn
							color="blue"
							small
							@click="switchUpdateDataPanel(props.item)">
							查看
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
		v-model="data.panels.update.show"
		width=500
		>
		<v-card>
			<v-card-title
			  class="headline blue lighten-1"
			  primary-title
			>
				订单查看
			</v-card-title>
			<v-card-text v-if="data.panels.update.item!=undefined">
				标题：{{data.panels.update.item.title}}
				<br />
				服务类别：{{data.panels.update.item.service_class == undefined ? '' : data.panels.update.item.service_class.name}}
				<br />
				描述：{{data.panels.update.item.content}}
				<br />
				提交者：{{data.panels.update.item.name}}
				<br />
				联系方式：{{data.panels.update.item.mobile}}
				<br/>
				区域：{{data.panels.update.item.position_field}}, {{data.panels.update.item.position_building}}, {{data.panels.update.item.position_room}}
				<br />
				空闲时间：{{data.panels.update.item.leisure_time}}
				<hr />
				评价星级：{{data.panels.update.evaluates == undefined ? "" : (
					data.panels.update.evaluates.count == 0 ? "" : data.panels.update.evaluates.rows[0].level+'星'
				)}}
				<br />
				评价：{{data.panels.update.evaluates == undefined ? "" : (
					data.panels.update.evaluates.count == 0 ? "" : data.panels.update.evaluates.rows[0].content
				)}}
			</v-card-text>
			<v-form
				v-if="data.panels.update.item.status == 2"
				style="padding:16px 16px 16px 16px">
				<template>
				  <v-container fluid>
				    <v-radio-group v-model="data.panels.update.form.status">
				      	<v-radio
					        label="进行中"
					        :value="2"
					    ></v-radio>
					    <v-radio
					        label="维修结束"
					        :value="3"
					    ></v-radio>
				    </v-radio-group>
				  </v-container>
				</template>
			</v-form>
			<v-divider></v-divider>
			<v-card-actions>
				<v-btn
					@click="switchUpdateDataPanel">
					关闭
				</v-btn>
				<v-btn
					v-if="!data.datas.loading && data.panels.update.item.status == 2"
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