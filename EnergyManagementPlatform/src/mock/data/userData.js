import Mock from 'mockjs';
//平台用户信息
const userLoginInfo = {
	"id": 1,
	"createTime": "2018-01-02T01:32:15.000+0000",
	"updateTime": "2019-12-11T09:41:33.000+0000",
	"username": "root",
	"password": "CGUx1FN++xS+4wNDFeN6DA==",
	"nickname": "超级管理员",
	"mobile": "15151551516",
	"email": "843977358@qq.com",
	"qq": "843977358",
	"birthday": null,
	"gender": null,
	"avatar": "https://static.zhyd.me/static/img/favicon.ico",
	"userType": "ROOT",
	"regIp": null,
	"lastLoginIp": "192.168.2.15",
	"lastLoginTime": "2019-12-11T09:41:33.000+0000",
	"loginCount": 418,
	"remark": null,
	"status": 1,
	"token": "5ARoRf5ArsFLyTwza66cYQ==",
	"userId": null,
	"isAdmin": null
};
const userList = [{
		"userId": 1,
		"username": "mrbird",
		"password": "94f860c4bbfeb2f49c84e321fdda4b07",
		"deptId": 1,
		"deptName": "开发部",
		"email": "mrbird123@hotmail.com",
		"mobile": "13455533233",
		"status": "1",
		"createTime": "2017-12-27 23:47:19",
		"modifyTime": null,
		"lastLoginTime": "2019-12-19 16:40:08",
		"ssex": "2",
		"description": "我是",
		"avatar": "ubnKSIfAJTxIgXOKlciN.png",
		"roleId": "1",
		"roleName": "root",
		"sortField": null,
		"sortOrder": null,
		"createTimeFrom": null,
		"createTimeTo": null,
		"rank": null,
		"nickname": "菜鸟",
		"id": null,
		"authCacheKey": 1
	},
	{
		"userId": 2,
		"username": "scott",
		"password": "7b44a5363e3fd52435beb472e1d2b91f",
		"deptId": 6,
		"deptName": "测试部",
		"email": "scott@qq.com",
		"mobile": "15134627380",
		"status": "1",
		"createTime": "2017-12-30 00:16:39",
		"modifyTime": null,
		"lastLoginTime": "2019-12-18 18:01:34",
		"ssex": "0",
		"description": "我是scott，嗯嗯",
		"avatar": "jZUIxmJycoymBprLOUbT.png",
		"roleId": "2",
		"roleName": "注册用户",
		"sortField": null,
		"sortOrder": null,
		"createTimeFrom": null,
		"createTimeTo": null,
		"rank": null,
		"nickname": "思科特",
		"id": null,
		"authCacheKey": 2
	},
	{
		"userId": 12,
		"username": "djiao",
		"password": "552649f10640385d0728a80a4242893e",
		"deptId": 6,
		"deptName": "测试部",
		"email": "jack@hotmail.com",
		"mobile": null,
		"status": "1",
		"createTime": "2019-01-23 15:34:05",
		"modifyTime": null,
		"lastLoginTime": "2019-01-24 16:52:03",
		"ssex": "0",
		"description": null,
		"avatar": "default.jpg",
		"roleId": "72",
		"roleName": "普通用户",
		"sortField": null,
		"sortOrder": null,
		"createTimeFrom": null,
		"createTimeTo": null,
		"rank": null,
		"nickname": "焦迪",
		"id": null,
		"authCacheKey": 12
	}, {
		"userId": 13,
		"username": "ykzhang",
		"password": "3ab1fd834308c0e3c1225129e4ec7f15",
		"deptId": 1,
		"deptName": "开发部",
		"email": null,
		"mobile": null,
		"status": "1",
		"createTime": "2019-12-13 19:34:59",
		"modifyTime": null,
		"lastLoginTime": "2019-12-19 16:44:07",
		"ssex": "1",
		"description": "string",
		"avatar": "default.jpg",
		"roleId": "1",
		"roleName": "root",
		"sortField": null,
		"sortOrder": null,
		"createTimeFrom": null,
		"createTimeTo": null,
		"rank": null,
		"nickname": "张诒凯",
		"id": null,
		"authCacheKey": 13
	}
];
const roleList = [{
		id: "10001",
		roleName: "超级管理员",
		remark: "管理员",
		userIds: "张三,里斯,王五"
	},
	{
		id: "10002",
		roleName: "主管",
		remark: "管理员",
		userIds: "张三,里斯,王五"
	},
	{
		id: "10003",
		roleName: "普通用户",
		remark: "管理员",
		userIds: "张三,里斯,王五"
	},
	{
		id: "10004",
		roleName: "超级管理员",
		remark: "管理员",
		userIds: "张三,里斯,王五"
	},
	{
		id: "10005",
		roleName: "主管",
		remark: "管理员",
		userIds: "张三,里斯,王五"
	},
	{
		id: "10006",
		roleName: "普通用户",
		remark: "管理员",
		userIds: "张三,里斯,王五"
	}
];
const deptUserList = [{
	value: 'zhinan',
	label: '指南',
	children: [{
		value: 'shejiyuanze',
		label: '设计原则',
		children: [{
			value: 'yizhi',
			label: '一致'
		}, {
			value: 'fankui',
			label: '反馈'
		}, {
			value: 'xiaolv',
			label: '效率'
		}, {
			value: 'kekong',
			label: '可控'
		}]
	}, {
		value: 'daohang',
		label: '导航',
		children: [{
			value: 'cexiangdaohang',
			label: '侧向导航'
		}, {
			value: 'dingbudaohang',
			label: '顶部导航'
		}]
	}]
}, {
	value: 'zujian',
	label: '组件',
	children: [{
		value: 'basic',
		label: 'Basic',
		children: [{
			value: 'layout',
			label: 'Layout 布局'
		}, {
			value: 'color',
			label: 'Color 色彩'
		}, {
			value: 'typography',
			label: 'Typography 字体'
		}, {
			value: 'icon',
			label: 'Icon 图标'
		}, {
			value: 'button',
			label: 'Button 按钮'
		}]
	}, {
		value: 'form',
		label: 'Form',
		children: [{
			value: 'radio',
			label: 'Radio 单选框'
		}, {
			value: 'checkbox',
			label: 'Checkbox 多选框'
		}, {
			value: 'input',
			label: 'Input 输入框'
		}, {
			value: 'input-number',
			label: 'InputNumber 计数器'
		}, {
			value: 'select',
			label: 'Select 选择器'
		}, {
			value: 'cascader',
			label: 'Cascader 级联选择器'
		}, {
			value: 'switch',
			label: 'Switch 开关'
		}, {
			value: 'slider',
			label: 'Slider 滑块'
		}, {
			value: 'time-picker',
			label: 'TimePicker 时间选择器'
		}, {
			value: 'date-picker',
			label: 'DatePicker 日期选择器'
		}, {
			value: 'datetime-picker',
			label: 'DateTimePicker 日期时间选择器'
		}, {
			value: 'upload',
			label: 'Upload 上传'
		}, {
			value: 'rate',
			label: 'Rate 评分'
		}, {
			value: 'form',
			label: 'Form 表单'
		}]
	}, {
		value: 'data',
		label: 'Data',
		children: [{
			value: 'table',
			label: 'Table 表格'
		}, {
			value: 'tag',
			label: 'Tag 标签'
		}, {
			value: 'progress',
			label: 'Progress 进度条'
		}, {
			value: 'tree',
			label: 'Tree 树形控件'
		}, {
			value: 'pagination',
			label: 'Pagination 分页'
		}, {
			value: 'badge',
			label: 'Badge 标记'
		}]
	}, {
		value: 'notice',
		label: 'Notice',
		children: [{
			value: 'alert',
			label: 'Alert 警告'
		}, {
			value: 'loading',
			label: 'Loading 加载'
		}, {
			value: 'message',
			label: 'Message 消息提示'
		}, {
			value: 'message-box',
			label: 'MessageBox 弹框'
		}, {
			value: 'notification',
			label: 'Notification 通知'
		}]
	}, {
		value: 'navigation',
		label: 'Navigation',
		children: [{
			value: 'menu',
			label: 'NavMenu 导航菜单'
		}, {
			value: 'tabs',
			label: 'Tabs 标签页'
		}, {
			value: 'breadcrumb',
			label: 'Breadcrumb 面包屑'
		}, {
			value: 'dropdown',
			label: 'Dropdown 下拉菜单'
		}, {
			value: 'steps',
			label: 'Steps 步骤条'
		}]
	}, {
		value: 'others',
		label: 'Others',
		children: [{
			value: 'dialog',
			label: 'Dialog 对话框'
		}, {
			value: 'tooltip',
			label: 'Tooltip 文字提示'
		}, {
			value: 'popover',
			label: 'Popover 弹出框'
		}, {
			value: 'card',
			label: 'Card 卡片'
		}, {
			value: 'carousel',
			label: 'Carousel 走马灯'
		}, {
			value: 'collapse',
			label: 'Collapse 折叠面板'
		}]
	}]
}, {
	value: 'ziyuan',
	label: '资源',
	children: [{
		value: 'axure',
		label: 'Axure Components'
	}, {
		value: 'sketch',
		label: 'Sketch Templates'
	}, {
		value: 'jiaohu',
		label: '组件交互文档'
	}]
}];
const homeMenuList = [ //主页菜单
	{
		"id": 14,
		"createTime": "2019-12-10 23:02:52",
		"updateTime": "2019-12-10 23:02:52",
		"appUrl": "http://www.baidu.com",
		"appIcon": "../assets/img/light.png",
		"appName": "用户管理",
		"projectId": 1,
		"xaxis": "string",
		"yaxis": "string"
	},
	{
		"id": 15,
		"createTime": "2019-12-11 18:03:18",
		"updateTime": "2019-12-11 18:03:21",
		"appUrl": "http://www.baidu.com",
		"appIcon": "../assets/img/light.png",
		"appName": "系统设置",
		"projectId": 1,
		"xaxis": null,
		"yaxis": null
	},
	{
		"id": 16,
		"createTime": "2019-12-11 18:04:21",
		"updateTime": "2019-12-11 18:04:21",
		"appUrl": "http://www.baidu.com",
		"appIcon": "../assets/img/light.png",
		"appName": "数据监控",
		"projectId": 1,
		"xaxis": null,
		"yaxis": null
	},
	{
		"id": 17,
		"createTime": "2019-12-11 18:05:45",
		"updateTime": "2019-12-11 18:05:45",
		"appUrl": "http://www.baidu.com",
		"appIcon": "../assets/img/light.png",
		"appName": "部门管理",
		"projectId": 1,
		"xaxis": null,
		"yaxis": null
	},
	{
		"id": 18,
		"createTime": "2019-12-11 18:06:38",
		"updateTime": "2019-12-11 18:06:38",
		"appUrl": "http://www.baidu.com",
		"appIcon": "../assets/img/light.png",
		"appName": "产品管理",
		"projectId": 1,
		"xaxis": null,
		"yaxis": null
	}
];
export {
	userLoginInfo,
	userList,
	roleList,
	homeMenuList
};