import request from '@/plugin/axios'

export function UserList (params) {
  return request({
    url: '/api/user/list',
    method: 'get',
    params
  })
}
