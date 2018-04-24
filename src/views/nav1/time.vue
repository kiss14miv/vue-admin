<template>
	<section>
		<!--工具条-->
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
				<el-table-column prop="id" label="id"  width="60">
				</el-table-column>
				<el-table-column prop="doctor_name" label="名字" width="120" >
				</el-table-column>
				<!--<el-table-column prop="createtime" label="创建时间" min-width="200" :formatter="formatTime" >
				</el-table-column>-->
				<el-table-column prop="des" label="描述" min-width="140" >
				</el-table-column>
				<el-table-column prop="starttime" label="开始时间" min-width="200" :formatter="startTime" >
				</el-table-column>
				<el-table-column prop="endtime" label="结束时间" min-width="200" :formatter="endTime" >
				</el-table-column>
				<el-table-column prop="sex" label="类型" width="100" :formatter="formatSex" >
				</el-table-column>
				<el-table-column prop="max_count" label="人数"  >
				</el-table-column>
				<el-table-column prop="state" label="状态" :formatter="formatState" >
				</el-table-column>
				<el-table-column prop="createtime" label="创建时间" min-width="200" :formatter="createTime" >
				</el-table-column>
				<el-table-column label="操作" width="150">
					<template scope="scope">
						<!--<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
						<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">下线</el-button>
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
				<el-form-item label="专家" prop="name">
					<el-select v-model="addForm.name" placeholder="请选择">
					    <el-option
					      v-for="item in options"
					      :key="item.id"
					      :label="item.doctor_name"
					      :value="item.id">
					    </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="时间段" prop="time">
					<el-date-picker
				      v-model="value3"
				      type="datetimerange"
				      range-separator="至"
				      start-placeholder="开始日期"
				      end-placeholder="结束日期">
				    </el-date-picker>
				</el-form-item>
					
				<el-form-item label="预约类型" >
					<el-radio-group v-model="radio2">
					    <el-radio :label="0">普通预约</el-radio>
					    <el-radio :label="1">专家预约</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="人数" prop="num">
					<el-input v-model="addForm.num" type="number" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="描述" prop="addr">
					<el-input v-model="addForm.addr" type="textarea" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
					
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
		<!--<el-dialog title="编辑" :visible.sync="dialogTableVisible" :close-on-click-modal="false">
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
					num : '',
					
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
					time: [
						{ required: true, message: '请选择时间', trigger: 'blur' }
					],
					num: [
						{ required: true, message: '请输入人数', trigger: 'blur' }
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
		        page:1,
		        options: [],
		        value: '',
		        value3 : '',
		        radio2: ''
			}
		},
		methods: {
			//获取用户列表
			getUser: function () {
				let para = {
					JSON:{
			          	"methodName":"query.query_all_optionalRecord"
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
			formatSex: function (row, column) {
				return row.optype == 1 ? '专家预约' : '普通预约';
			},
			formatState(row, column){
//				console.log(row.endtime)
//				console.log(Date.parse(new Date()))
				return row.state == 0 ? '已下线' : row.endtime < Date.parse(new Date()) ? '已过期' : '正常';
			},
			startTime(time){
				var date = new Date(time.starttime)
	    		var day = date.toLocaleDateString()
	    		var tim = date.toLocaleTimeString()
	    		return time = day.split('/').join('-') + " " + tim
			},
			endTime(time){
				var date = new Date(time.endtime)
	    		var day = date.toLocaleDateString()
	    		var tim = date.toLocaleTimeString()
	    		return time = day.split('/').join('-') + " " + tim
			},
			createTime(time){
				var date = new Date(time.createtime)
	    		var day = date.toLocaleDateString()
	    		var tim = date.toLocaleTimeString()
	    		return time = day.split('/').join('-') + " " + tim
			},
			handleCurrentChange(val=1){
				this.msg = this.users.slice(val * 10 - 10,val * 10)
			},
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm.name = ""
				this.addForm.addr = ""
				let para = {
					JSON:{
			          	"methodName":"query.query_doctor_admin"
			        }
				};
				this.loading = true;
				//NProgress.start();
				getUserList(para).then((res) => {
					console.log(res)
					this.options = res.data.listMap
//					this.users = res.data.listMap;
					this.handleCurrentChange()
					this.loading = false;
					//NProgress.done();
				});
				
			},
			addSubmit(){
				console.log(this.value3)
				console.log(this.radio2)
				console.log(this.addForm.name)
				console.log(this.addForm.addr)
				console.log(this.addForm.num)
				console.log(this.value3)
				
				if(this.addForm.name=="" || this.addForm.addr=="" || this.addForm.num=="" || this.value3 == ""){
					alert("请填写完整信息")
					return
				}
				var start = new Date(this.value3[0]);  
				var end = new Date(this.value3[1]);  
				var startTime=start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate() + ' ' + start.getHours() + ':' + start.getMinutes() + ':' + start.getSeconds();
				var endTime=end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate() + ' ' + end.getHours() + ':' + end.getMinutes() + ':' + end.getSeconds();
			   	var para = {
					JSON:{
					  "map": {
					        "doctor_id": this.addForm.name,
					        "des": this.addForm.addr,
					        "starttime":startTime,
					        "endtime" : endTime,
					        "optype" : this.radio2,
					        "max_count" : this.addForm.num
					  },
					  "methodName": "insert.insert_optional"
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
				});
					   	
			},
			handleEdit: function (index, row) {
				this.dialogTableVisible = true;
				this.editForm.name = row.label
				this.editForm.addr = row.des
				this.editForm.id = row.id
				
			},
			handleDel: function (index, row) {
				console.log(row)
				if( row.state == 0){
					alert("已下线的不能再次下线")
					return
				}
				var para = {
					JSON:{
			          	"map":{"id":row.id},
			          	"methodName":"update.update_optional"
			        }
				};
				getUserList(para).then((res) => {
					console.log(res)
					if(res.data.success==true){
						alert('下线成功')
//						this.addFormVisible = false
					}else{
						console.log(res)
						alert('系统错误')
					}
					this.getUser();
					this.page = 1
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
					        "depart_name": this.editForm.name,
					        "des": this.editForm.addr,
					        "id":this.editForm.id
					  },
					  "methodName": "update.update_depart"
					}
				};
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
				});
			}
		},
		mounted() {
			this.getUser();
		}
	};

</script>

<style>
.el-transfer-panel{
	width:180px;
}
</style>