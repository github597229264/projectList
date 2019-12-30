<template>
  <div class="hello">
    <div class="BoundedDeviceList">
      <el-header class="DeviceMangementListHeader">
        <el-row>
          <el-col :span="8" class="leftHeader">
            <span>角色管理</span>
          </el-col>
          <el-col :span="16" class="rightHeader">
            <el-button type="text"  icon="el-icon-plus" class="addRole" >新增角色</el-button>
            <el-button type="text"  icon="el-icon-delete" class="batchDel" >批量删除</el-button>
            <el-input style="width:200px;" placeholder="输入角色名搜索">
            </el-input>

          </el-col>
        </el-row>
      </el-header>
      <div class="container">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="name" label="设备名称" width="180"></el-table-column>
          <el-table-column prop="label" label="创建时间" width="180"></el-table-column>
          <el-table-column prop="type" label="类型" width="180"></el-table-column>
          <el-table-column prop="createdtime" label="创建时间" width="180"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "UnboundDeviceList",//未绑定设备管理列表
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    /**
     * 表格自定义斑马线
     */
    tabRowClassName({row, rowIndex}) {
      let index = rowIndex + 1;
      if (index % 2 == 0) {
        return 'warning-row'
      }
    },
    /**
     * 获取列表数据
     */
    getData() {
      this.$axios({
        method: 'get',
        url: 'this.API.UnboundDeviceList',
        params: {
          'Accept':"*/*"
        }
      }).then((res) => {
        var resData = res.data;
        if(resData.code == 20001) {
          this.tableData = resData.data;
          console.log (this.tableData);
          this.pageObj.total = resData.data.total;
        } else {
          this.$message({
            type: 'error',
            message: '查询失败，请刷新重试！'
          });
        }
      }).catch((err) => {
        this.$message({
          type: 'error',
          message: '请求异常，请检查网络！'
        });
      })

    },
  }
};
</script>
<style scoped>

</style>
