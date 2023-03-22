export default [
  {
    path: '/',
    component: './home',
    name: '首页',
    layout: true,
    hideInMenu: true,
  },
  {
    path: '/demo',
    component: './demo',
    name: '语音聊天demo测试',
    layout: true,
  },
  {
    path: '/drawdemo',
    component: './draw-demo',
    name: '画布demo测试',
    layout: true,
  },
  // -----导师端
  {
    path: '/teacher/course',
    component: './teacher-web/course',
    name: '课程管理',
    layout: true,
  },
  //-------导师端
  {
    path: '/teacher/paramsManage',
    component: './teacher-web/params-manage/home',
    name: '参数管理',
    layout: true,
    routes: [
      {
        path: '/teacher/paramsManage/userManage',
        component: './teacher-web/params-manage/user-manage',
        name: '用户管理',
      },
      {
        path: '/teacher/paramsManage/ruleManage',
        component: './teacher-web/params-manage/rule-manage',
        name: '规则管理',
      },
      {
        path: '/teacher/paramsManage/systemManage',
        component: './teacher-web/params-manage/system-manage',
        name: '系统管理',
      },
    ],
  },
  // -----学员端
  {
    path: '/student/personalInfo',
    component: './student-web/personal-info',
    name: '首页',
    layout: true,
  },
  {
    path: '/student/course',
    component: './student-web/course',
    name: '学习课程',
    layout: true,
  },
  {
    path: '/student/learnRecord',
    component: './student-web/learn-record',
    name: '学习记录',
    layout: true,
  },
  {
    path: '/student/course/detail',
    component: './student-web/detail',
    name: '课程详情',
    hideInMenu: true,
    layout: true,
  },
  {
    path: '/login',
    layout: false,
    hideInMenu: true,
    name: '登录',
    component: './user/Login',
    noAuth: true,
  },
  { path: '/403', component: './403', layout: true, hideInMenu: true },
  { component: './404', layout: true, hideInMenu: true },
];
