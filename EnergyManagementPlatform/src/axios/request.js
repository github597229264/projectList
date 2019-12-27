import axios from 'axios'
// import { Message, MessageBox } from 'element-ui'
// import store from '../store'
// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  baseURL: '',
  timeout: 25000 // 请求超时时间
});
if (process.env.NODE_ENV === 'development') {
  service.baseURL = ''
  // service.baseURL = ''
  console.log('开发环境')
  // 编译环境
} else {
  // 测试环境
  if (process.env.type === 'test') {
    console.log('测试环境')
    // service.baseURL = ''
    // 正式环境
  } else {
    console.log('生产传经')
    // service.baseURL = ''
  }
}
// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非200是抛错 可结合自己业务进行修改
     */
    const res = response.data;
    return res
    // if (res.code !== '200' && res.code !== 200) {
    // if (res.code === '4001' || res.code === 4001) {
    //     MessageBox.confirm('用户名或密码错误，请重新登录', '重新登录', {
    //     confirmButtonText: '重新登录',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //     }).then(() => {
    //     store.dispatch('FedLogOut').then(() => {
    //         location.reload() // 为了重新实例化vue-router对象 避免bug
    //     })
    //     })
    // }
    // if (res.code === '4009' || res.code === 4009) {
    //     MessageBox.confirm('该用户名已存在，请重新注册！', '重新注册', {
    //     confirmButtonText: '重新注册',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //     }).then(() => {
    //     store.dispatch('FedLogOut').then(() => {
    //         location.reload() // 为了重新实例化vue-router对象 避免bug
    //     })
    //     })
    // }
    // return Promise.reject('error')
    // } else {
    //     return res
    // }
  },
  error => {
    // Message({
    //     message: error.message,
    //     type: 'error',
    //     duration: 5 * 1000
    // });
    return Promise.reject(error)
  }
)

export default service
