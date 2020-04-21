// 菜单 侧边栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '用户管理',
    icon: 'folder-o',
    children: [
      { path: '/user/list', title: '用户列表' }
    ]
  },
  {
    title: '班级管理',
    icon: 'folder-o',
    children: [
      { path: '/classes/list', title: '班级列表' },
      { path: '/classes/student', title: '学生管理' }
    ]
  },
  {
    title: '教师管理',
    icon: 'folder-o',
    children: [
      { path: '/teacher/list', title: '教师列表' },
    ]
  },
  {
    title: '课程管理',
    icon: 'folder-o',
    children: [
      { path: '/course/category', title: '课程分类' },
      { path: '/course/list', title: '开课课程' },
      { path: '/course/schedule', title: '课程排课' },
    ]
  }
]
