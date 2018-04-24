<template>
	<section>
		<!--工具条-->
		<!--<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
			    <el-date-picker
			      v-model="value4"
			      type="datetimerange"
			      :picker-options="pickerOptions2"
			      range-separator="至"
			      start-placeholder="开始日期"
			      end-placeholder="结束日期"
			      align="right">
			    </el-date-picker>
				<el-form-item>
					<el-button type="primary" v-on:click="getDate">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<template>
			<el-table :data="msg" highlight-current-row v-loading="loading" style="width: 100%;">
				<el-table-column prop="id"  label="ID"width="60">
				</el-table-column>
				<el-table-column prop="label" label="服务" width="120" >
				</el-table-column>
				<!--<el-table-column prop="createtime" label="创建时间" min-width="200" :formatter="formatTime" >
				</el-table-column>-->
				<el-table-column prop="des" label="描述" min-width="140" >
				</el-table-column>
				<el-table-column label="操作" width="150">
					<template scope="scope">
						<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</template>
		<div class="block">
		  <el-pagination
		    layout="prev, pager, next"
		    :total="users.length"
		    :current-page.sync='page'
		    @current-change="handleCurrentChange"
		    >
		  </el-pagination>
		</div>
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="服务" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<!--<el-form-item label="性别">
					<el-radio-group v-model="addForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>-->
				<!--<el-form-item label="年龄">
					<el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
				</el-form-item>-->
				<!--<el-form-item label="生日">
					<el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>
				</el-form-item>-->
				<el-form-item label="描述" prop="addr">
					<el-input v-model="addForm.addr" type="textarea" auto-complete="off"></el-input>
				</el-form-item>
				<!--<el-form-item label="服务">
					<el-select v-model="serve" placeholder="请选择专家服务">
						<el-option v-for='item in service' :label="item.service_name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="服aa务">
					<el-select v-model="serve" placeholder="请选择专家服务">
						<el-checkbox>备选项1</el-checkbox>
						<el-checkbox >备选项2</el-checkbox>
						<el-checkbox >备选项3</el-checkbox>
					</el-select>
				</el-form-item>-->
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
		<el-dialog title="编辑" :visible.sync="dialogTableVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="科室" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="描述" prop="addr">
					<el-input v-model="editForm.addr" type="textarea" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
		<!--<el-dialog title="详情" :visible.sync="dialogTableVisible" :close-on-click-modal="false">
		  <el-table :data="gridData">
		  	<el-table-column property="name" label="姓名"></el-table-column>
		    <el-table-column property="depart" label="科室" ></el-table-column>
		    <el-table-column property="addr" label="描述" ></el-table-column>
		    <el-table-column property="service" label="服务" ></el-table-column>
		  </el-table>
		</el-dialog>-->
	</section>
</template>
<script>
	import { getUserList } from '../../api/api';
	//import NProgress from 'nprogress'
	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				region:'',
				loading: false,
				users: [],
				msg:[],
				addFormVisible: false,
				addForm: {
					name: '',
					addr: '',
				},
				editForm:{
					name: '',
					addr: '',
					id:null
				},
				addFormRules: {
					name: [
						{ required: true, message: '请输入科室', trigger: 'blur' }
					],
					addr: [
						{ required: true, message: '请输入描述', trigger: 'blur' }
					]
				},
				addLoading: false,
				administrativeOffice:"",
				service:"",
				office:"",
				serve:"",
//				data: generateData(),
        		value1: [],
        		value2: [],
        		insert_doctor_service : [],
        		dialogTableVisible: false,
        		gridData: [{
		          name: '',
		          depart : '',
		          service: '',
		          addr : ''
		        }],
		        page:1
			}
		},
		methods: {
			//性别显示转换
//			formatSex: function (row, column) {
//				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
//			},
//			formatTime(time){
//				var date = new Date(time.createtime)
//	    		var day = date.toLocaleDateString()
//	    		var tim = date.toLocaleTimeString()
//	    		return time = day.split('/').join('-') + " " + tim
//			},
			//获取用户列表
			getUser: function () {
				let para = {
					JSON:{
			          	"methodName":"query.query_service_admin"
			        }
				};
				this.loading = true;
				//NProgress.start();
				getUserList(para).then((res) => {
					console.log(res)
					this.users = res.data.listMap;
					this.handleCurrentChange()
					this.loading = false;
					//NProgress.done();
				});
			},
			getList(){
				var para = {
					JSON:{
			          	"methodName":"query.query_depart_admin"
			        }
				};
				this.loading = true;
				//NProgress.start();
				getUserList(para).then((res) => {
					console.log(res)
//					this.users = res.data.listMap;
//					this.handleCurrentChange()
//					this.service = res.data.listMap
//					this.service= JSON.parse(JSON.stringify(this.service).replace(/id/g,"key"));
//					console.log(this.service)
					this.loading = false;
					//NProgress.done();
				});
//				var paras = {
//					JSON:{
//			          	"methodName":"query.query_depart_admin"
//			        }
//				};
//				this.loading = true;
//				//NProgress.start();
//				getUserList(paras).then((res) => {
//					this.administrativeOffice = res.data.listMap
//					this.administrativeOffice= JSON.parse(JSON.stringify(this.administrativeOffice).replace(/id/g,"key"));
//					console.log(this.administrativeOffice)
//					this.loading = false;
//				});
			},
//			getDoctor(){
//				var para = {
//					JSON:{
//			          	"methodName":"insert.insert_doctor_depart"
//			        }
//				};
//				this.loading = true;
//				getUserList(para).then((res) => {
////					console.log(res)
////					this.users = res.data.listMap;
////					this.handleCurrentChange()
//					this.loading = false;
//					//NProgress.done();
//				});
//			},
			handleCurrentChange(val=1){
//				console.log(val * 10)
				this.msg = this.users.slice(val * 10 - 10,val * 10)
			},
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm.name = ""
				this.addForm.addr = ""
				this.insert_doctor_depart = []
				this.insert_doctor_service = []
//				this.addForm = {
//					name: '',
//					sex: -1,
//					age: 0,
//					birth: '',
//					addr: ''
//				};
			},
//			handleChange1(value, direction, movedKeys) {
//		        console.log(value, direction, movedKeys)
//		        console.log(this.value1)
//		        this.insert_doctor_depart = []
//		        for(var i = 0;i<this.value1.length;i++){
//		        	var obj = {"depart_id":value[i],"doctor_id": "0"}
//		        	this.insert_doctor_depart.push(obj)
//		        }
//		        
//		    },
//			handleChange2(value, direction, movedKeys) {
//				console.log(this.value2)
//		        console.log(value, direction, movedKeys)
//		        this.insert_doctor_service = []
//		        for(var i = 0;i<this.value2.length;i++){
//		        	var obj = {"service_id":value[i],"doctor_id": "0"}
//		        	this.insert_doctor_service.push(obj)
//		        }
//			},
			addSubmit(){
//				console.log(this.value1)
//				console.log(this.value2)
				if(this.addForm.name=="" || this.addForm.addr==""){
					alert("请填写完整信息")
					return
				}
//			   	console.log(this.insert_doctor_service)
//			   	console.log(this.insert_doctor_depart)
			   	var para = {
					JSON:{
					  "map": {
					        "service_name": this.addForm.name,
					        "des": this.addForm.addr
					  },
					  "methodName": "insert.insert_service"
					}
				};
				//NProgress.start();
				getUserList(para).then((res) => {
					console.log(res)
					if(res.data.success==true){
						alert('添加成功')
						this.addFormVisible = false
					}else{
						console.log(res)
						alert('系统错误')
					}
					this.getUser();
					this.page = 1
//					this.users = res.data.listMap;
//					this.handleCurrentChange()
					
					//NProgress.done();
				});
					   	
			},
			handleEdit: function (index, row) {
				console.log(index,row)
//				this.addForm.				
				this.dialogTableVisible = true;
				this.editForm.name = row.label
				this.editForm.addr = row.des
				this.editForm.id = row.id
//				var para = {
//					JSON:{
//			          	"map":{"id":row.id},
//			          	"methodName":"update.update_depart"
//			        }
//				};
//				getUserList(para).then((res) => {
//					console.log(res)
////					var arr1 = []
////					var arr2 = []
////					res.data.mapData.query_depart_info.forEach(function(item){
////						console.log(arr1)
////						arr1.push(item.label)
////						_this.gridData[0].depart = arr1.join(',')
////					})
////					res.data.mapData.query_service_info.forEach(function(item){
////						console.log(item)
////						arr2.push(item.label)
////						_this.gridData[0].service = arr2.join(',')
////					})
////					_this.gridData[0].name = res.data.mapData.query_doctor_info[0].label
////					_this.gridData[0].addr = res.data.mapData.query_doctor_info[0].des
////					this.users = res.data.listMap;
////					this.handleCurrentChange()
//					//NProgress.done();
//				});
				
			},
			handleDel: function (index, row) {
				console.log(index,row)
				var para = {
					JSON:{
			          	"map":{"id":row.id},
			          	"methodName":"delete.delete_service"
			        }
				};
				getUserList(para).then((res) => {
					console.log(res)
					if(res.data.success==true){
						alert('删除成功')
//						this.addFormVisible = false
					}else{
						console.log(res)
						alert('系统错误')
					}
					this.getUser();
					this.page = 1
//					var arr1 = []
//					var arr2 = []
//					res.data.mapData.query_depart_info.forEach(function(item){
//						console.log(arr1)
//						arr1.push(item.label)
//						_this.gridData[0].depart = arr1.join(',')
//					})
//					res.data.mapData.query_service_info.forEach(function(item){
//						console.log(item)
//						arr2.push(item.label)
//						_this.gridData[0].service = arr2.join(',')
//					})
//					_this.gridData[0].name = res.data.mapData.query_doctor_info[0].label
//					_this.gridData[0].addr = res.data.mapData.query_doctor_info[0].des
//					this.users = res.data.listMap;
//					this.handleCurrentChange()
					//NProgress.done();
				});
				
			},
			editSubmit(){
				if(this.editForm.name=="" || this.editForm.addr==""){
					alert("请填写完整信息")
					return
				}
				var _this = this
				var para = {
					JSON:{
					  "map": {
					        "service_name": this.editForm.name,
					        "des": this.editForm.addr,
					        "id":this.editForm.id
					  },
					  "methodName": "update.update_service"
					}
				};
				//NProgress.start();
				getUserList(para).then((res) => {
					console.log(res)
					if(res.data.success==true){
						alert('修改成功')
						_this.dialogTableVisible = false
					}else{
						console.log(res)
						alert('系统错误')
					}
					this.getUser();
					this.page = 1
//					this.users = res.data.listMap;
//					this.handleCurrentChange()
					
					//NProgress.done();
				});
			}
		},
		mounted() {
			this.getUser();
//			this.getList();
//			this.getDoctor();
		}
	};

</script>

<style>
.el-transfer-panel{
	width:180px;
}
</style>