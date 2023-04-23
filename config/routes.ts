console.log(process.env.UMI_ENV);

export default [
  {
    path: '/',
    component: './home',
    name: '首页',
    layout: true,
    hideInMenu: true,
  },
  // -----导师端
  {
    path: '/front/teacher/course',
    component: './teacher-web/course/home',
    name: '课程管理',
    layout: true,
    access: 'routerAuth',
    role: ['admin', 'teacher'],
    routes: [
      {
        path: '/front/teacher/course/tablepage',
        component: './teacher-web/course',
        name: '课程管理',
        hideInMenu: true,
      },
      {
        path: '/front/teacher/course/draw',
        component: './teacher-web/course/teacher-draw',
        name: '课程流程',
        hideInMenu: true,
      },
      {
        redirect: '/front/teacher/course/tablepage',
      },
    ],
  },
  {
    path: '/front/teacher/task',
    component: './teacher-web/task/home',
    name: '任务管理',
    access: 'routerAuth',
    role: ['admin', 'teacher'],
    layout: true,
    routes: [
      {
        path: '/front/teacher/task/tablepage',
        component: './teacher-web/task',
        name: '任务管理',
        hideInMenu: true,
      },
      {
        path: '/front/teacher/task/draw',
        component: './teacher-web/task/task-draw',
        name: '任务流程',
        hideInMenu: true,
      },
      {
        redirect: '/front/teacher/task/tablepage',
      },
    ],
  },
  //-------导师端
  {
    path: '/front/teacher/paramsManage',
    component: './teacher-web/params-manage/home',
    name: '参数管理',
    access: 'routerAuth',
    role: ['admin', 'teacher'],
    layout: true,
    routes: [
      {
        path: '/front/teacher/paramsManage/userManage',
        component: './teacher-web/params-manage/user-manage',
        name: '用户管理',
      },
      {
        path: '/front/teacher/paramsManage/ruleManage',
        component: './teacher-web/params-manage/rule-manage',
        name: '规则管理',
        access: 'routerAuth',
        role: ['admin'],
      },
      {
        path: '/front/teacher/paramsManage/systemManage',
        component: './teacher-web/params-manage/system-manage',
        name: '系统管理',
      },
      {
        path: '/front/teacher/paramsManage/intention',
        component: './teacher-web/params-manage/intention',
        name: '意图',
        hideInMenu: true,
      },
    ],
  },
  // -----学员端
  // {
  //   path: '/student/personalInfo',
  //   component: './student-web/personal-info',
  //   name: '学生端-首页',
  //   layout: true,
  // },
  {
    path: '/front/student/course',
    component: './student-web/course',
    name: '学习课程',
    access: 'routerAuth',
    role: ['admin', 'student'],
    layout: true,
  },
  {
    path: '/front/student/course/detail',
    component: './student-web/detail',
    name: '课程详情',
    hideInMenu: true,
    layout: true,
  },
  {
    path: '/front/student/learnRecord',
    component: './student-web/learn-record',
    name: '学习记录',
    access: 'routerAuth',
    role: ['admin', 'student'],
    layout: true,
  },
  {
    path: '/demo',
    component: './demo',
    name: '语音聊天demo测试',
    access: 'routerAuth',
    role: ['admin'],
    layout: true,
  },
  // {
  //   path: '/front/drawdemo',
  //   component: './draw-demo',
  //   name: '画布demo测试',
  //   access: 'routerAuth',
  //   role: ['admin'],
  //   layout: true,
  // },
  // {
  //   path: '/front/drawdemo2',
  //   component: './teacher-web/task/task-draw',
  //   name: '任务画布demo测试',
  //   access: 'routerAuth',
  //   role: ['admin'],
  //   layout: true,
  // },
  {
    path: '/front/student/chat',
    component: './chat-page',
    name: '聊天窗口',
    access: 'routerAuth',
    role: ['admin', 'student'],
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
