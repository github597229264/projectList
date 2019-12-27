/**
 * http请求拦截处理
 */
import axios from 'axios'
const instance = axios.create();
instance.defaults.headers = {
	'Content-Type':'application/x-www-form-urlencoded'
};
const err = (error) => {
  if (error.response) {
    const data = error.response.data
    switch (data.message) {
        case "token已经过期"://token过期
            window.vm.$message({
	            type: 'error',
	            message: '登录信息过期，请重新登录!'
          	});
           //清除token信息并跳转到登录页面
        break;
        case "用户名或密码错误":
        	if(window.vm._route.name != "login"){
        	    window.vm.$message({
		            type: 'error',
		            message: '登录信息过期，请重新登录!'
	          	});
	           //清除token信息并跳转到登录页面
	           
        	}else{
        		window.vm.$message({
		            type: 'error',
		            message: '用户名或密码不正确!'
	          	});
        	}
        break;
        case "您没有操作权限！":
	    	window.vm.$message({
	            type: 'error',
	            message: '您没有操作权限！'
          	});
        break;
    }
  }
  return Promise.reject(error)
}
instance.interceptors.request.use(config => {
    config.baseURL = window.vm.API.leansite.baseURL;
	if(config.method.toUpperCase() =="POST"){//post方式时，提交的参数转成string类型
		config.data = window.vm.qs.stringify(config.data);
	}
    //过滤拦截路径
	if(window.vm.API.leansite.constObj.requestFilter.indexOf(config.url) === -1){//拦截的请求
		let stateObj = window.vm.$store.state;
		if(stateObj.token && stateObj.token.length >0 ) {//token验证
			let submitToken = stateObj.token;
			config.headers.Authentication = encodeURIComponent(submitToken);
			return config;
	    }else{
	      	//清除登录信息并跳转到登录页面
	        
	        return;
	    }
	}else{
		return config;
	}
}, err);
// http响应拦截器
instance.interceptors.response.use(
	function(response){
		return response;
	},err);
export default instance;
