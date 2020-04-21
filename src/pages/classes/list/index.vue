<template>
  <d2-container>
		<el-card>
			<el-row>
				<el-col :span="4">
					<div class="grid-content bg-purple">
						<el-tree 
							:data="treeData" 
							:props="defaultProps" 
							accordion
							@node-click="handleNodeClick">
						</el-tree>
					</div>
				</el-col>
  			<el-col :span="20">
					<div class="grid-content bg-purple-light">
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
					</div>
				</el-col>
			</el-row>

			
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
					title: '学院',
					key: 'collegeName',
				},
				{
					title: '专业',
					key: 'majorName',
				},
				{
					title: '班级',
					key: 'className',
					width: '250'
				},
				{
					title: '年级',
					key: 'grade',
				},
				{
					title: '出勤率',
					key: 'attendanceRate',
				},
			],
			data: [],
			treeData: [],
			defaultProps: {
				children: 'children',
				label: 'label'
			},
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
				url: '/class/',
				method: 'get',
				params: __this.pagination
			}).then(response => {
				this.data = response.list
				this.pagination.total = response.total
			})
			// 树形导航数据
			request({
				url: '/class/tree',
				method: 'get'
			}).then(response => {
				let rawData = response
				let makeData = []
				rawData.forEach(element => {
					let tree = {}
					tree.id = element.collegeId
					tree.label = element.collegeName
					tree.children = []
					element.list.forEach(row => {
						let sencodeLevel = {}
						sencodeLevel.id = row.majorId
						sencodeLevel.label = row.majorName
						tree.children.push(sencodeLevel)
					})
					makeData.push(tree)
				});
				this.treeData = makeData
			})
		},
		fetchMajorData() {
			let param = {
				'page': this.pagination.page,
				'pageSize': this.pagination.pageSize,
				'majorId': this.majorId
			}
			request({
				url: '/class/major/',
				method: 'get',
				params: param
			}).then(response => {
				this.data = response.list
				this.pagination.total = response.total
			})
	},
		handleNodeClick(data) {
			if(data.children == undefined) {
				this.majorId = data.id
				this.pagination.page = 1
				this.pagination.pageSize = 6
				this.pagination.total = 0
				this.fetchMajorData()			
			}
		},

	}
}
</script>

