<template>
  <div class="BoundedDeviceList">
    <div class="header">
      <el-row>
        <el-col :span="8" class="leftHeader">
          <span>设备管理</span>
        </el-col>
        <el-col :span="16" class="rightHeader">
          <el-button type="text"  icon="el-icon-plus" class="addRole" >新增角色</el-button>
          <el-button type="text"  icon="el-icon-delete" class="batchDel" >批量删除</el-button>
          <el-input style="width:200px;" placeholder="输入角色名搜索">
          </el-input>
        </el-col>
      </el-row>
    </div>
    <div class="container">
      <el-table :data="tableData" stripe :row-class-name="tabRowClassName" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: "BoundedDeviceList",//已绑定设备管理列表

  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.getData();
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
        url: 'http://192.168.2.50:9000/api/v1/energy_management_platform/meter/getUnboundMeter',
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
}
</script>
<style lang="scss" scoped type="text/css">
    .BoundedDeviceList{
      .header{

      }
      .container{
        .el-table .warning-row{
          background:#F3F9FF
        }
      }
    }
</style>
