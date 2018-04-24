<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
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
		</el-col>

		<!--列表-->
		<template>
			<el-table :data="msg" highlight-current-row v-loading="loading" style="width: 100%;">
				<el-table-column prop="id" label="ID"  width="60">
				</el-table-column>
				<el-table-column prop="patient_name" label="姓名" width="120" >
				</el-table-column>
				<el-table-column prop="sex" label="性别" width="100" :formatter="formatSex" >
				</el-table-column>
				<el-table-column prop="age" label="年龄" width="100" >
				</el-table-column>
				<el-table-column prop="phone" label="手机号" width="180" >
				</el-table-column>
				<el-table-column prop="optional_id" label="预约时段ID">
				</el-table-column>
				<el-table-column prop="doctor_name" label="预约医生" width="120" >
				</el-table-column>
				<el-table-column prop="createtime" label="创建时间" min-width="200" :formatter="formatTime" >
				</el-table-column>
				<el-table-column prop="remark" label="留言" min-width="180" >
				</el-table-column>
			</el-table>
		</template>
		<div class="block">
		  <!--<span class="demonstration">大于 7 页时的效果</span>-->
		  <el-pagination
		    layout="prev, pager, next"
		    :total="users.length"
		    @current-change="handleCurrentChange"
		    >
		  </el-pagination>
		</div>
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
				loading: false,
				users: [],
				msg:[],
				pickerOptions2: {
			        shortcuts: [{
			            text: '最近一周',
			            onClick(picker) {
			              const end = new Date();
			              const start = new Date();
			              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
			              picker.$emit('pick', [start, end]);
			            }
			        }, {
			            text: '最近一个月',
			            onClick(picker) {
			              const end = new Date();
			              const start = new Date();
			              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
			              picker.$emit('pick', [start, end]);
			            }
			        }, {
			            text: '最近三个月',
			            onClick(picker) {
			              const end = new Date();
			              const start = new Date();
			              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
			              picker.$emit('pick', [start, end]);
			            }
			        }]
				},
				value4: ''
			}
		},
		methods: {
			//性别显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
			formatTime(time){
				var date = new Date(time.createtime)
	    		var day = date.toLocaleDateString()
	    		var tim = date.toLocaleTimeString()
	    		return time = day.split('/').join('-') + " " + tim
			},
			//获取用户列表
			getUser: function () {
				let para = {
					JSON:{
			          	"methodName":"query.query_all_oderinfo"
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
			handleCurrentChange(val=1){
				console.log(val * 10)
				this.msg = this.users.slice(val * 10 - 10,val * 10)
				console.log(this.msg)
			},
			getDate(){
				if(this.value4==""){
					return
				}else{
					var start = new Date(this.value4[0]);  
					var end = new Date(this.value4[1]);  
					var startTime=start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate() + ' ' + start.getHours() + ':' + start.getMinutes() + ':' + start.getSeconds();
					var endTime=end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate() + ' ' + end.getHours() + ':' + end.getMinutes() + ':' + end.getSeconds();
					
				}
				this.loading = true;
				var para = {
					JSON:{
						"map":{"startTime":startTime,"endTime":endTime},
			          	"methodName":"query.query_all_oderinfo"
			        }
				};	
				getUserList(para).then((res) => {
					console.log(res)
					this.loading = false;
					this.users = res.data.listMap;
					this.handleCurrentChange()
					//NProgress.done();
				});
			}
		},
		mounted() {
			this.getUser();
		}
	};

</script>

<style scoped>

</style>