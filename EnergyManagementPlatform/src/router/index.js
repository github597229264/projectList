import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/login';

Vue.use(Router)
let router = new Router({
	routes: [{
			path: '/',
			redirect: {
				name: 'Login'
			},
		},
		{
			path: '/Login',
			name: 'Login',
			mode: ['登陆'],
			component: Login,
		},
		{
			path: '/EnergyBox',
			name: 'EnergyBox',
			component: () =>
				import('@/EnergyBox'),
			children: [{
					path: 'AllOverview',
					name: 'AllOverview',
					mode: ['首页'],
					component: () =>
						import('@/AllOverview'),
				},
				{
					path: 'DataSource',
					name: 'DataSource',
					mode: ['数据源'],
					component: () =>
						import('@/DataSource'),
				},
				{
					path: 'OEE',
					name: 'OEE',
					mode: ['OEE'],
					component: () =>
						import('@/OEE'),
				},
				{
					path: 'DataDetails',
					name: 'DataDetails',
					mode: ['数据源详情'],
					component: () =>
						import('@/DataDetails'),
				},
				{
					path: 'EnergyAllUser',
					name: 'EnergyAllUser',
					mode: ['用户组'],
					component: () =>
						import('@/EnergyAllUser'),
				}, {
					path: 'EnergyChange',
					name: 'EnergyChange',
					mode: ['能源转换'],
					component: () =>
						import('@/EnergyChange'),
				}, {
					path: 'EnergyCompany',
					name: 'EnergyCompany',
					mode: ['公司'],
					component: () =>
						import('@/EnergyCompany'),
				}, {
					path: 'EnergyDept',
					name: 'EnergyDept',
					mode: ['部门'],
					component: () =>
						import('@/EnergyDept'),
				}, {
					path: 'EnergyFactory',
					name: 'EnergyFactory',
					mode: ['工厂'],
					component: () =>
						import('@/EnergyFactory'),
					// children: [{
					//   path: 'NewFactory',
					//   name: 'NewFactory',
					//   mode: ['新增工厂'],
					//   component: () =>
					//     import('@/NewFactory'),
					// }]
				},
				{
					path: 'NewFactory',
					name: 'NewFactory',
					mode: ['新增工厂'],
					component: () =>
						import('@/NewFactory'),
				},
				{
					path: 'EnergyNew',
					name: 'EnergyNew',
					mode: ['能源'],
					component: () =>
						import('@/EnergyNew'),
				}, {
					path: 'EnergyPrice',
					name: 'EnergyPrice',
					mode: ['价格'],
					component: () =>
						import('@/EnergyPrice'),
				}, {
					path: 'EnergyReader',
					name: 'EnergyReader',
					mode: ['阅读模式'],
					component: () =>
						import('@/EnergyReader'),
				}, {
					path: 'EnergyUnit',
					name: 'EnergyUnit',
					mode: ['单位'],
					component: () =>
						import('@/EnergyUnit'),
				}, {
					path: 'EnergyUser',
					name: 'EnergyUser',
					mode: ['用户'],
					component: () =>
						import('@/EnergyUser'),
				},
				{
					path: 'Export',
					name: 'Export',
					mode: ['导出数据'],
					component: () =>
						import('@/Export'),
				},
				{
					path: 'Import',
					name: 'Import',
					mode: ['导入数据'],
					component: () =>
						import('@/Import'),
				},
				{
					path: 'deviceManagement',
					name: 'deviceManagement',
					mode: ['设备管理'],
					component: () =>
						import('@/Import'),
				},
			]
		},
		{
			path: '/*',
			name: 'error-404',
			meta: {
				title: '404-页面不存在'
			},
			component: () =>
				import('@/components/error-page/404'),
		}
	]
});

router.beforeEach((to, from, next) => {
	let menuTree = JSON.parse(sessionStorage.getItem('menuTree'));
	// console.log(from.name)
	// console.log(to.name)
	if(from.name == null || to.name == "Login") {
		// router.options.routes[2].children = [];
		next();
	} else {
		if(menuTree != null) {
			// console.log(from)
			// console.log(to)
			if(to.fullPath == '/EnergyBox') {
				next({
					path: '/Login'
				})
			}
			// if (from.meta[0] && from.meta[0] == 0) {
			// console.log(1111)
			next();
			// }else{

			// }
		} else {
			// console.log('menuTree = null')
			next({
				path: '/Login'
			})
		}
	}
})

export default router;