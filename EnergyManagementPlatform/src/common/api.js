import axios from 'axios'
/**
 * 能源管理平台接口api
 */
const interface_s = {
	baseURL: 'http://192.168.2.41:9527/api/v1/',//非生产环境
	prodBaseURL:"http://192.168.2.59:9527/api/v1/",//生产环境
	//登录模块
	login: "login", //登录
	logout:"logout",//退出系统
	//公共模块
	getThirdApp: 'app/getAll', //获取主页第三方应用菜单
	//用户中心
	userListByNameOrUserName:'user',//用户列表
	
	//常量对象
	constObj: {
		pageIndex:1,
		pageSize:10,
		requestFilter: [ //拦截器不拦截的请求集合
			'login', //登录
		],
		vueFilter: [ //拦截器不拦截的vue界面集合
		],
        loginInfo:'LEANSITEPAAS-USER',//user信息
	}
}
//配置生产环境和非生产环境之间的切换
if(process.env.NODE_ENV == 'development') { //非生产环境
	interface_s.baseURL = interface_s.baseURL;
}else if(process.env.NODE_ENV == 'production') { //生产环境
	interface_s.baseURL = interface_s.prodBaseURL;
}
export default interface_s;
