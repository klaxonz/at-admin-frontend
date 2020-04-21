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
        @custom-emit-2="handleCustomEvent"
        >
        <el-input slot="header" v-model="searchName" size="small" style="margin-bottom: 20px" placeholder="用户名" suffix-icon="el-icon-search"> </el-input>
        <el-button slot="header" @click="handleSearchEvent" size="small" style="margin-bottom: 20px"><i class="el-icon-search"></i> 搜索</el-button>
      </d2-crud>

		</el-card>
    <info-dialog :show.sync="dialogVisible" :user-data="userData" />
	</d2-container>
</template>

<script>
import {UserList} from '@/api/user.list'
import InfoDialog from './Info'
import request from '@/plugin/axios'

export default {
  components:{InfoDialog},
  data () {
    return {
      columns: [
        {
          title: '编号',
          key: 'userId',
          width: '80'
        },
        {
          title: '用户名',
          key: 'username',
        },
        {
          title: '性别',
          key: 'genderName'
        },
        {
          title: '联系方式',
          key: 'phone'
        },
        {
          title: '用户类型',
          key: 'userNature'
        },
        {
          title: '认证状态',
          key: 'status'
        },
        {
          title: '加入时间',
          key: 'createTime'
        }
      ],
      data: [],
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
      dialogVisible: false,
      userData: {},
      searchName: ''
    }
  },
  mounted () {
		this.fetchData()
  },
  methods: {
    paginationCurrentChange (currentPage) {
      this.pagination.page = currentPage
      let param = {
        username: this.searchName
      }
      this.fetchData(param)
    },
		fetchData (param) {
      let __this = this

      if (param == undefined) {
        param = {}
      }
      if (Object.keys(param).length > 0) {
        param = Object.assign(param, this.pagination)
      } else {
        param = this. pagination
      }
			request({
        url: '/user/',
        method: 'get',
        params: param
      }).then((resp) => {
        resp.list.forEach(element => {
          // 性别
          if (element.gender == 0){
            element.genderName = "保密"
          } else if(element.gender == 1) {
            element.genderName = "男"
          } else if(element.gender == 2) {
            element.genderName = "女"
          }
          // 用户类型
          if (element.userNature == 1) {
            element.userNature = '学生'
          } else if(element.userNature == 2) {
            element.userNature = '教师'
          }
          // 认证状态
          if (element.status == 0) {
            element.status = '未认证'
          } else if(element.status == 1) {
            element.status = '已认证'
          }
        });
        this.pagination.total = resp.total
        this.data = resp.list
      })
    },
    handleSearchEvent(){
      let param = {
        username: this.searchName
      }
      this.fetchData(param)
    },
    handleCustomEvent ({index, row}) {
      this.userData = row
      this.dialogVisible = true
    },
  }
}
</script>
<style scoped>
  .el-input {
    position: relative;
    top: 0;
    width: 200px;
    margin: 0 10px 0 10px;
  }
</style>