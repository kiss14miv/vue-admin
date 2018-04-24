import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
//import Table from './views/nav1/Table.vue'
//import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
//import Page4 from './views/nav2/Page4.vue'
//import Page5 from './views/nav2/Page5.vue'
//import Page6 from './views/nav3/Page6.vue'
//import echarts from './views/charts/echarts.vue'
import Specialist from './views/nav1/specialist.vue'
import office from './views/nav1/office.vue'
import service from './views/nav1/service.vue'
import time from './views/nav1/time.vue'
import active from './views/nav1/active.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '功能中心',
        iconCls: 'el-icon-setting',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/Specialist', component: Specialist, name: '专家管理' },
            { path: '/office', component: office, name: '科室管理' },
            { path: '/service', component: service, name: '服务管理' },
            { path: '/time', component: time, name: '预约管理' },
            { path: '/active', component: active, name: '活动管理' },
//          { path: '/table', component: Table, name: 'table' },
//          { path: '/form', component: Form, name: 'bbb' },
            { path: '/user', component: user, name: '预约记录' },
        ]
    },
//  {
//      path: '/',
//      component: Home,
//      name: '导航二',
//      iconCls: 'fa fa-id-card-o',
//      children: [
//          { path: '/page4', component: Page4, name: '页面4' },
//          { path: '/page5', component: Page5, name: '页面5' }
//      ]
//  },
//  {
//      path: '/',
//      component: Home,
//      name: '',
//      iconCls: 'fa fa-address-card',
//      leaf: true,//只有一个节点
//      children: [
//          { path: '/page6', component: Page6, name: '导航三' }
//      ]
//  },
//  {
//      path: '/',
//      component: Home,
//      name: 'Charts',
//      iconCls: 'fa fa-bar-chart',
//      children: [
//          { path: '/echarts', component: echarts, name: 'echarts' }
//      ]
//  },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;