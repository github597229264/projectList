<template>
	<div class="deviceLocaltionTree">
		<el-tree :data="deviceLocaltionList" node-key="id" :props="defaultProps" default-expand-all highlight-current current-node-key="0" :indent="10" @node-click="treeClick" :expand-on-click-node="false">
			<span class="custom-tree-node" slot-scope="{ node, data }" style="padding-right:10px;">
		    <i :class="node.level == 1?'iconfont leansite-ziyuan':'iconfont leansite-bumen'" style="color:#aee4fa;"></i>
		    <span style="display:inline-block;margin-left:5px;width:104px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{ node.label }}</span>
				<span>
		      <el-button
		        type="text"
		        size="mini"
		        icon="el-icon-plus"
		        @click="() => append(data)">
		      </el-button>
		      <el-button
		        type="text"
		        size="mini"
		        icon="el-icon-delete"
		        @click="() => remove(node, data)">
		      </el-button>
		    </span>
			</span>
		</el-tree>
	</div>
</template>
<script>
	export default {
		name: "DeviceLocaltionTree",//设备位置树
		data() {
			return {
				defaultProps: {//tree与data字段映射
          children: 'children',
          label: 'departmentName',
          id:'departmentId'
      	},
        deviceLocaltionList:[
			    {
			      "departmentId": 1,
			      "upperId": null,
			      "departmentName": "数据字典",
			      "meters": [],
			      "devices": []
			    },
			    {
			      "departmentId": 5,
			      "upperId": 1,
			      "departmentName": "海斯坦普",
			      "meters": [],
			      "devices": [
			        {
			          "deviceId": 1,
			          "departmentId": 5,
			          "departmentName": "电脑"
			        },
			        {
			          "deviceId": 2,
			          "departmentId": 5,
			          "departmentName": "鼠标"
			        },
			        {
			          "deviceId": 3,
			          "departmentId": 5,
			          "departmentName": "键盘"
			        }
			      ]
			    },
			    {
			      "departmentId": 6,
			      "upperId": 5,
			      "departmentName": "西安工厂",
			      "meters": [],
			      "devices": []
			    },
			    {
			      "departmentId": 7,
			      "upperId": 6,
			      "departmentName": "1号产线",
			      "meters": [],
			      "devices": []
			    },
			    {
			      "departmentId": 8,
			      "upperId": 6,
			      "departmentName": "2号产线",
			      "meters": [],
			      "devices": []
			    },
			    {
			      "departmentId": 9,
			      "upperId": 6,
			      "departmentName": "3号产线",
			      "meters": [],
			      "devices": []
			    },
			    {
			      "departmentId": 10,
			      "upperId": 1,
			      "departmentName": "再升科技",
			      "meters": [],
			      "devices": []
			    },
			    {
			      "departmentId": 11,
			      "upperId": 10,
			      "departmentName": "再升A工厂",
			      "meters": [],
			      "devices": []
			    },
			    {
			      "departmentId": 12,
			      "upperId": 10,
			      "departmentName": "再升B工厂",
			      "meters": [],
			      "devices": []
			    }
			  ],
			};
		},
		props: [],
		
	};
</script>
<style lang="scss" scoped type="text/css">
	.deviceLocaltionTree{
		width:300px;
		height: 100%;
		color: #303030;
		background-color: #FFFFFF;
	}
</style>