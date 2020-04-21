<template>
   <d2-container>
		<el-card>
			<d2-crud
				ref="d2Crud"
				:columns="columns"
				:data="data"
				:pagination="pagination"
				@pagination-current-change="paginationCurrentChange"
				:rowHandle="rowHandle"
				@custom-emit-1="handleCustomEvent"
				>
     		</d2-crud>
		</el-card>
	</d2-container>
</template>

<script>
import request from '@/plugin/axios'

export default {
	data() {
		return {
			columns: [
				{
					title: '学号',
					key: 'studentNo',
					width: '200'
				},
				{
					title: '姓名',
					key: 'studentName',
					width: '200'
				},
				{
					title: '性别',
					key: 'genderName',
					width: '200'
				},
				{
					title: '班级',
					key: 'className',
					width: '200'
				},
				{
					title: '出勤率',
					key: 'attendanceRate',
					width: '200'
				},
			],
			data: [],
			options: {

			},
			pagination: {
				page: 1,
				pageSize: 6,
				total: 0
			},
			rowHandle: {
				custom: [
					{
						text: '查看',
						type: 'info',
						size: 'small',
						emit: 'custom-emit-1'
					},
					{
						text: '移除',
						type: 'danger',
						size: 'small',
						emit: 'custom-emit-2'
					}
				]
			},
		}
	},
	created() {
		this.fetchData()
	},
	methods: {
		paginationCurrentChange (page) {
      this.pagination.page = page
      this.fetchData()
    },
		fetchData() {
			let __this = this

			request({
				url: '/student/',
				method: 'get',
				params: __this.pagination
			}).then(response => {
				response.list.forEach(element => {
					if (element.gender == 0) {
						element.genderName = '保密'
					} else if (element.gender == 1) {
						element.genderName = '男'
					} else if (element.gender == 2) {
						element.genderName = '女'
					}
				});
				this.data = response.list
				this.pagination.total = response.total
			})
		}
	}
}
</script>

<style>

</style>