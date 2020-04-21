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
					title: '编号',
					key: 'teacherId',
				},
				{
					title: '教师名称',
					key: 'teacherName',
				},
				{
					title: '性别',
					key: 'genderName',
					width: '250'
				},
				{
					title: '加入时间',
					key: 'addTime',
				}
			],
			data: [],
      options: {},
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
			majorId: 0
		}
	},
	created() {
		this.fetchData()
	},
	methods: {
		paginationCurrentChange (page) {
			this.pagination.page = page
			if (this.majorId > 0) {
				this.fetchMajorData()
			} else {
				this.fetchData()
			}
		},
		fetchData() {
			let __this = this

			// 表格数据
			request({
				url: '/teacher/',
				method: 'get',
				params: __this.pagination
			}).then(response => {

				response.list.forEach(element => {
					if (element.gender == 0) {
						element.genderName = '保密'
					} else if(element.gender == 1) {
						element.genderName = '男'
					} else if(element.gender == 2){
						element.genderName = '女'
					}
				});

				this.data = response.list
				this.pagination.total = response.total
			})
		
		},
	
	}
}
</script>

