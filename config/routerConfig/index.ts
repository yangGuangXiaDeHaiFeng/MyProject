export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/welcome',
          },
          {
            path: '/welcome',
            name: 'welcome',
            icon: 'smile',
            component: './Welcome',
          },
          {
            name: 'array',
            path: '/array/prototype',
            component: './jsTest/index',
          },
          {
            name: 'model',
            path: '/model/bug',
            component: './aboutModel/index',
          },
          {
            name: 'reactHook',
            path: '/model/reactHook',
            component: './reactHook/index',
          },
          {
            name: 'AboutTabs',
            path: '/model/AboutTabs',
            component: './aboutTabs/index',
          },
          {
            name: 'css',
            path: '/model/css',
            component: './css',
          },
          {
            name: 'tableForm',
            path: '/model/tableForm',
            component: './tableForm',
          },
          {
            name: 'charts',
            path: '/model/charts',
            component: './charts',
          },
          {
            name: 'chartToImg',
            path: '/model/chartToImg',
            component: './dealCharts',
          },
          {
            name: 'iframe',
            path: '/model/iframe',
            component: './iframeTest',
          },
          {
            name: 'formily',
            path: '/model/formily',
            component: './formily',
          },
          {
            path: '/admin',
            name: 'admin',
            icon: 'crown',
            component: './Admin',
            authority: ['admin'],
            routes: [
              {
                path: '/admin/sub-page',
                name: 'sub-page',
                icon: 'smile',
                component: './Welcome',
                authority: ['admin'],
              },
            ],
          },
          {
            name: 'list.table-list',
            icon: 'table',
            path: '/list',
            component: './ListTableList',
          },
          {
            component: './404',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/BasicLayout',
        authority: ['admin', 'user'],
        routes: [
          {
            name: 'array',
            path: '/array/prototype',
            component: './jsTest/index',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
