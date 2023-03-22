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
  // -----学员端
  {
    path: '/student/course',
    component: './student-web/course',
    name: '学习课程',
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
    path: '/student/course/chat',
    component: './chat-page',
    name: '聊天窗口',
    // hideInMenu: true,
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
