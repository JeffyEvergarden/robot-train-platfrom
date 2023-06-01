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
    path: '/front/teacher/teacher-home',
    component: './teacher-web/teacher-home',
    name: '首页',
    layout: true,
    access: 'routerAuth',
    role: ['admin', 'teacher'],
  },
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
    btnMenu: [
      {
        title: '新增',
        key: 'teacher_course_add_btn',
      },
      {
        title: '课程复制',
        key: 'teacher_course_copy_btn',
      },
      {
        title: '信息编辑',
        key: 'teacher_course_infoEdit_btn',
      },
      {
        title: '流程编辑',
        key: 'teacher_course_processEdit_btn',
      },
      {
        title: '发布',
        key: 'teacher_course_publish_btn',
      },
      {
        title: '下线',
        key: 'teacher_course_down_btn',
      },
      {
        title: '删除',
        key: 'teacher_course_delete_btn',
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
    btnMenu: [
      {
        title: '新增',
        key: 'teacher_task_add_btn',
      },
      {
        title: '编辑',
        key: 'teacher_task_edit_btn',
      },
      {
        title: '流程编辑',
        key: 'teacher_task_processEdit_btn',
      },
      {
        title: '删除',
        key: 'teacher_task_delete_btn',
      },
    ],
  },
  {
    path: '/front/teacher/dataManage',
    component: './teacher-web/data-manage/home',
    name: '数据管理',
    access: 'routerAuth',
    role: ['admin', 'teacher'],
    layout: true,
    routes: [
      {
        path: '/front/teacher/dataManage/tablepage',
        component: './teacher-web/data-manage',
        name: '数据管理',
        hideInMenu: true,
      },
      {
        path: '/front/teacher/dataManage/detailData',
        component: './teacher-web/data-manage/detailData',
        name: '详细数据',
        hideInMenu: true,
      },
      {
        redirect: '/front/teacher/dataManage/tablepage',
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
        access: 'routerAuth',
        btnMenu: [
          {
            title: '用户管理',
            key: 'paramsManage_userManage_user_btn',
            children: [
              {
                title: '同步',
                key: 'paramsManage_userManage_user_sameStep_btn',
              },
              {
                title: '编辑',
                key: 'paramsManage_userManage_user_edit_btn',
              },
            ],
          },
          {
            title: '组别管理',
            key: 'paramsManage_userManage_rule_btn',
            children: [
              {
                title: '新增',
                key: 'paramsManage_userManage_rule_add_btn',
              },
              {
                title: '编辑',
                key: 'paramsManage_userManage_rule_edit_btn',
              },
              {
                title: '删除',
                key: 'paramsManage_userManage_rule_delete_btn',
              },
            ],
          },
          {
            title: '职场管理',
            key: 'paramsManage_userManage_workplace_btn',
            children: [
              {
                title: '新增',
                key: 'paramsManage_userManage_workplace_add_btn',
              },
              {
                title: '编辑',
                key: 'paramsManage_userManage_workplace_edit_btn',
              },
              {
                title: '删除',
                key: 'paramsManage_userManage_workplace_delete_btn',
              },
            ],
          },
          {
            title: '角色管理',
            key: 'paramsManage_userManage_role_btn',
            children: [
              {
                title: '同步',
                key: 'paramsManage_userManage_role_sameStep_btn',
              },
              {
                title: '编辑',
                key: 'paramsManage_userManage_role_edit_btn',
              },
            ],
          },
        ],
      },
      {
        path: '/front/teacher/paramsManage/ruleManage',
        component: './teacher-web/params-manage/rule-manage',
        name: '规则管理',
        access: 'routerAuth',
        role: ['admin'],
        btnMenu: [
          {
            title: '评分比例配置',
            key: 'paramsManage_ruleManage_score_btn',
          },
          {
            title: '服务规则配置',
            key: 'paramsManage_ruleManage_service_btn',
          },
          {
            title: '话术合格配置',
            key: 'paramsManage_ruleManage_dialogCom_btn',
          },
        ],
      },
      {
        path: '/front/teacher/paramsManage/systemManage',
        component: './teacher-web/params-manage/system-manage',
        name: '系统管理',
        access: 'routerAuth',
        btnMenu: [
          {
            title: '新增',
            key: 'paramsManage_systemManage_add_btn',
          },
          {
            title: '编辑',
            key: 'paramsManage_systemManage_edit_btn',
          },
          {
            title: '删除',
            key: 'paramsManage_systemManagee_delete_btn',
          },
          {
            title: '意图管理',
            key: 'paramsManage_systemManage_intention_btn',
          },
        ],
      },
      {
        path: '/front/teacher/paramsManage/intention',
        component: './teacher-web/params-manage/intention',
        name: '意图管理',
        access: 'routerAuth',
        hideInMenu: true,
        btnMenu: [
          {
            title: '新增',
            key: 'paramsManage_intention_add_btn',
          },
          {
            title: '编辑',
            key: 'paramsManage_intention_edit_btn',
          },
          {
            title: '删除',
            key: 'paramsManage_intention_delete_btn',
          },
          {
            title: '同步',
            key: 'paramsManage_intention_sameStep_btn',
          },
        ],
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
    path: '/front/student/student-home',
    component: './student-web/student-home',
    name: '首页',
    layout: true,
    access: 'routerAuth',
    role: ['admin', 'student'],
  },
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
  // {
  //   path: '/front/demo',
  //   component: './demo',
  //   name: '语音聊天demo测试',
  //   access: 'routerAuth',
  //   role: ['admin'],
  //   layout: true,
  // },
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
