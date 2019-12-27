import axios from 'axios'
/**
 * 能源管理平台接口api
 */
const interface_s = {
	baseURL: 'http://192.168.2.50:9000/api/v1/energy_management_platform/',//非生产环境
	prodBaseURL:"http://192.168.2.59:9527/api/v1/",//生产环境
	//登录模块
	login: "login", //登录
	//设备位置模块
	getAllDepartments:'department/findAllDepartments',//获取所有设备位置列表
	
	//常量对象
	constObj: {
		pageIndex:1,
		pageSize:10,
		requestFilter: [ //拦截器不拦截的请求集合
			
		],
		vueFilter: [ //拦截器不拦截的vue界面集合
		],
        loginInfo:'ENERGYMANAGEMENT-',//user信息
	}
}
//配置生产环境和非生产环境之间的切换
if(process.env.NODE_ENV == 'development') { //非生产环境
	interface_s.baseURL = interface_s.baseURL;
}else if(process.env.NODE_ENV == 'production') { //生产环境
	interface_s.baseURL = interface_s.prodBaseURL;
}
export default interface_s;
