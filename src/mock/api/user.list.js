export default [
  {
    path: '/api/user/list',
    method: 'get',
    handle ({ params, Repeat }) {
      let { pageSize } = params
      return {
        code: 0,
        msg: '获取数据成功',
        data: {
          page: {
            total: 1000
          },
          list: Repeat(pageSize, {
            'username': '@cname',
            'number': '201610214732',
            'gender|1': ['男', '女'],
            'college|1': ['信息科学与工程学院', '化学工程技术学院', '人文历史学院', '马克思学院', '管理学院'],
            'grade|1': ['大一', '大二', '大三', '大四',],
            'className|1': ['物联网161班', '物联网162班', '物联网163班', '物联网164班'],
            'attendanceRate': '@integer(60,100)' + '%',
          })
        }
			}
    }
  }
]
