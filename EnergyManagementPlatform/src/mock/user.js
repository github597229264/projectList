import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import qs from 'qs';

//-----------------------用户中心管理模块------------------------
import {
	userLoginInfo,
	userList,
	roleList,
	homeMenuList
} from './data/userData';
let _userList = userList;
let _roleList = roleList;
let _homeMenuList = homeMenuList;
export default {
	/**
	 * mock bootstrap
	 */
	bootstrap() {
		let mock = new MockAdapter(axios);
		// mock success request
		mock.onGet('/success').reply(200, {
			msg: 'success'
		});
		// mock error request
		mock.onGet('/error').reply(500, {
			msg: 'failure'
		});
		//检查登录
		mock.onPost('login').reply(config => {
			let {
				username,
				password
			} = qs.parse(config.data);
			let mockLoginUsers =userLoginInfo;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						status: 200,
						message: '登录成功',
						data: mockLoginUsers
					}]);
				}, 500);
			});
		});
		//退出系统
		mock.onGet('logout').reply(config => {
			let {
				id
			} = config.params;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						status: 200,
						msg: '退出成功'
					}]);
				}, 500);
			});
		});
		//获取用户管理列表（分页）
		mock.onGet('user').reply(config => {
			let {
				param,
				pageNum,
				pageSize
			} = config.params;
			let mockUserInfo = _userList.filter(item => {
				if(param && item.name.indexOf(param) == -1) return false;
				return true;
			});
			let total = mockUserInfo.length;
			mockUserInfo = mockUserInfo.filter((u, index) => index < pageSize * (pageNum*1+1) && index >= pageSize * (pageNum - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							status: 200,
							message: "获取成功",
							data: {
								total: total,
								rows: mockUserInfo
							}
						}
					]);
				}, 1000);
			});
		});
		//批量删除用户信息
		mock.onDelete('user/deleteUsers').reply(config => {
			let {
				userIds
			} = config.params;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						status: 200,
						msg: '删除用户成功'
					}]);
				}, 500);
			});
		});
		//添加用户
		mock.onPost('user/addUsers').reply(config => {
			let {
				password,
				name,
				username,
				roleId,
				roleName,
				phone,
				email,
			} = qs.parse(config.data);
			_userList.push({
				id:"100"+(_userList.length+1),
				password:password,
				name:"测试",
				username:username,
				roleId:roleId,
				roleName:roleName,
				phone:phone,
				email:email,
				lastLoginTime:(new Date()).toDateString(),
			});
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						status: 200,
						message: '新增用户成功',
						data: ""
					}]);
				}, 500);
			});
		});
		//修改用户
		mock.onPost('user/updateUsers').reply(config => {
			let {
				id,
				password,
				name,
				username,
				roleId,
				roleName,
				phone,
				email,
			} = qs.parse(config.data);
			let searchIndex = _userList.findIndex(function(currentValue, index,arr){
				return currentValue.id == id;
			});
			let returnInfo={
				status:200,
				message:"修改用户成功"
			};
			if(searchIndex == -1){
				returnInfo.status = 500;
				returnInfo.message = "没有找到该用户";
			}else{
				_userList[searchIndex] = {
					id:id,
					password:password,
					name:"测试",
					username:username,
					roleId:roleId,
					roleName:roleName,
					phone:phone,
					email:email,
					lastLoginTime:(new Date()).toDateString(),
				};
			}
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						status: returnInfo.status,
						message: returnInfo.message,
						data: ""
					}]);
				}, 500);
			});
		});
		//获取角色管理列表（分页）
		mock.onGet('role/roleList').reply(config => {
			let {
				param,
				pageNum,
				pageSize
			} = config.params;
			let mockRoleInfo = _roleList.filter(item => {
				if(param && item.name.indexOf(param) == -1) return false;
				return true;
			});
			let total = mockRoleInfo.length;
			mockRoleInfo = mockRoleInfo.filter((u, index) => index < pageSize * (pageNum*1+1) && index >= pageSize * (pageNum - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							status: 200,
							message: "获取成功",
							data: {
								total: total,
								list: mockRoleInfo
							}
						}
					]);
				}, 1000);
			});
		});
		//批量删除角色信息
		mock.onDelete('role/deleteRoles').reply(config => {
			let {
				roleIds
			} = config.params;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						status: 200,
						msg: '删除角色成功'
					}]);
				}, 500);
			});
		});
		//添加角色
		mock.onPost('role/addRole').reply(config => {
			let {
				roleName,
				remark,
				userIds
			} = qs.parse(config.data);
			_roleList.push({
				id:"100"+(_userList.length+1),
				remark:remark,
				roleName:roleName,
				userIds:userIds
			});
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						status: 200,
						message: '新增用户成功',
						data: ""
					}]);
				}, 500);
			});
		});
		//获取主页菜单列表
		mock.onGet('app/getAll').reply(config => {
			let {
				project_id,
			} = config.params;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							status: 200,
							message: "获取成功",
							data: _homeMenuList
						}
					]);
				}, 1000);
			});
		});
	}
}
