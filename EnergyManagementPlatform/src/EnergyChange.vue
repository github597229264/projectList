<template>
<div class="EnergyChange">
<div class="overview">
    <p class="header">
      <span style="color:#303030">转换因子搜索</span>
      <span class="fr el-icon-plus" @click="newTable">添加新的转换因子</span>
     <span class="spanselect"> <el-select v-model="Facvalue" placeholder="请选择工厂名称">
    <el-option
      v-for="item in FacOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select></span>
    </p>
    <div>
      <el-table :data="tableData" stripe style="width: 100%;" :cell-style="cellStyle" :header-cell-style="headerStyle" :row-class-name="tableRowClassName">
        <el-table-column prop="id" label="ID ">
        </el-table-column>
        <el-table-column prop="utility" label="能源名称">
        </el-table-column>
        <el-table-column prop="ImportUnit" label="输入单位"></el-table-column>
        <el-table-column prop="Factor" label="因素"></el-table-column>               
        <el-table-column prop="reportUnit" label="报告单位"></el-table-column>
        <el-table-column prop="SetUp" label="创建日期 "></el-table-column>
        <el-table-column label="选项" width="240">
            <template slot-scope="scope">
              <el-button type="text" @click="goLightTimeSet(scope.row)" size="small" class="detailsBtn">
                <i class="el-icon-edit"></i> 编辑</el-button>
              <el-button type="text" size="small" @click="delTime(scope.row)" class="delBtn"> <i class="el-icon-circle-close"></i> 删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination
    layout="prev, pager, next" prev-text="上一页" next-text="下一页"
    :total="totalPage" :page-size="pageSize">
  </el-pagination>
    </div>
  </div>

  <el-dialog
  :title="diaTitle"
  :visible.sync="centerDialogVisible"
  width="30%"
  center>
  <el-form ref="form" :model="form" label-width="100px" label-position="left">
  <el-form-item label="效用">
     <el-select v-model="form.utility" placeholder="选择">
       <el-option v-for="item in groupOptions" :key="item.category_id" :label="item.name" :value="item.category_id">
      </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="输入单位">
    <el-select v-model="form.ImportUnit" placeholder="选择">
       <el-option v-for="item in groupOptions" :key="item.category_id" :label="item.name" :value="item.category_id">
      </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="报告单位">
    <el-select v-model="form.reportUnit" placeholder="选择">
       <el-option v-for="item in groupOptions" :key="item.category_id" :label="item.name" :value="item.category_id">
      </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="因素">
     <el-input v-model="form.Factor"></el-input>
      <!-- <el-date-picker v-model="form.time" type="datetime" placeholder="选择日期时间"> </el-date-picker> -->
  </el-form-item>
  <!-- <el-form-item label="设定周期">
    <el-input v-model="form.cycle"></el-input>
  </el-form-item>
  <el-form-item label="设备状态">
    <el-select v-model="form.state" placeholder="选择设备状态">
       <el-option label="开" value="true">
      </el-option>
      <el-option label="关" value="false">
      </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="是否启用">
    <el-switch v-model="form.ifused" active-color="#3672f5" inactive-color="#c4c4c4">
</el-switch>
  </el-form-item>
  <el-form-item label="描述">
    <el-input type="textarea" resize="none" v-model="form.desc"></el-input>
  </el-form-item> -->
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取消</el-button>
    <el-button type="primary" @click="save">保存</el-button>
  </span>
</el-dialog>
</div>
</template>

<script>
export default {
  name: "EnergyChange",
  data() {
    return {
      diaTitle:"创建因素",
       FacOptions: [{//工厂
          value: '1',
          label: '海斯坦普工厂1'
        }, {
          value: '2',
          label: '海斯坦普工厂2',
        },{
          value: '3',
          label: '法士特工厂1',
        }],
      Facvalue: '',//工厂
      tableData: [],
      totalPage: 0,
      pageSize: 6,
      centerDialogVisible: false,
      form: {
        id: 0,
        utility: '',
        ImportUnit: '',
        Factor: '',
        reportUnit: '',
        SetUp: '', 
      },
      groupOptions: [],
    };
  },
  methods: {
    getgroupOptions() {
      this.groupOptions = [{
        category_id: '02-03',
        name: '黄金糕'
      }, {
        category_id: '01',
        name: '双皮奶'
      }, ]
    },
    getTable() {
      if (window.innerWidth <= 1366) {
        this.pageSize = 6;
      }
      console.log(this.pageSize)
      this.tableData = [{
        id: 0,
        utility: '电流',
        ImportUnit: 'mA',
        Factor: '1000',
        reportUnit: 'A',
        SetUp: '2018-03',
      }, {
        id: 1,
        utility: '电压',
        ImportUnit: 'mV',
        Factor: '1000',
        reportUnit: 'V',
        SetUp: '2018-10',
      }];
      this.totalPage=this.tableData.length
      // this.$gAjax(`background/select_backGround?${Math.random() * 100}`).then(res => {
      //   if (res.state == 1) {
      //     this.tableData = res.data;
      //   } else {
      //     this.$Message.info(res.stateInfo);
      //   }
      // });
    },
    save() {
      console.log(this.form);
      this.centerDialogVisible = false;
      this.form = {
        id: 0,
        name: '',
        time: '',
        state: '',
        ifused: false,
        group: '',
        cycle: '',
        desc: ''
      };
    },
    delTime(row) {
      this.$confirm('删除此条能源转换信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        console.log(row);
        this.getTable();
        this.$message({
          type: 'success',
          message: '设置成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消设置'
        });
      });
    },
    newTable() {
      this.form = {
        id: 0,
        name: '',
        time: '',
        state: '',
        ifused: false,
        group: '',
        cycle: '',
        desc: ''
      };
      this.centerDialogVisible = true;
    },
    goLightTimeSet(row) {
      this.diaTitle="编辑因素"
      console.log(row)
      this.form = { ...row
      };
      // console.log(this.form.ifused)
      // this.form.ifused = String(this.form.ifused);
      this.centerDialogVisible = true;
    },
    ifusedChange(row) {
      console.log(row);
    },
    // 隔行换色
        tableRowClassName({row, rowIndex}) {
          if(rowIndex%2==1){
            return 'warning-row ';
          }else{
            return 'success-row';
          }
        },
    // 改变表格样式
    cellStyle({
      row,
      column,
      rowIndex,
      columnIndex
    }) {   
      let style = {
        'text-align': 'center',
        'font-size': '14px',
        'height': '56px',
        'color': '303030',
        // 'background-color': '#fcfcfc',
        'border-left': 'solid 1px #d8d8d8',
      }
      if (window.innerWidth > 1660) {
        if (rowIndex % 2 == 0) {
          if (columnIndex == 5) {
            style['border-right'] = 'solid 1px #d8d8d8';
          }
        } else {
          // style['background-color'] = '#f7faff';
          if (columnIndex == 5) {
            style['border-right'] = 'solid 1px #d8d8d8';
          }
        }
      } else if (window.innerWidth > 1440) {
        style['height'] = '40px';
        style['padding'] = '0px';
        if (rowIndex % 2 == 0) {
          if (columnIndex == 5) {
            style['border-right'] = 'solid 1px #d8d8d8';
          }
        } else {
          // style['background-color'] = '#f7faff';
          if (columnIndex == 5) {
            style['border-right'] = 'solid 1px #d8d8d8';
          }
        }
      } else {
        style['height'] = '20px';
        style['padding'] = '0px';
        if (rowIndex % 2 == 0) {
          if (columnIndex == 5) {
            style['border-right'] = 'solid 1px #d8d8d8';
          }
        } else {
          // style['background-color'] = '#f7faff';
          if (columnIndex == 5) {
            style['border-right'] = 'solid 1px #d8d8d8';
          }
        }
      }
      return style;
    },
    headerStyle({
      row,
      column,
      rowIndex,
      columnIndex
    }) {
      let style = {
        'background-color': '#f3f3f3',
        'font-size': '14px',
        'font-weight': '100',
        'color': '#2c5ac2',
        'text-align': 'center',
        'height': '56px',
        'border-left': 'solid 1px #d8d8d8'
      }
      if (window.innerWidth > 1660) {
        if (columnIndex == 5) {
          style['border-right'] = 'solid 1px #d8d8d8';
        }
      } else if (window.innerWidth > 1440) {
        style['height'] = '40px';
        style['padding'] = '0px';
        if (columnIndex == 5) {
          style['border-right'] = 'solid 1px #d8d8d8';
        } else {
          style['font-size'] = '14px';
        }
      } else {
        style['font-size'] = '14px';
        style['height'] = '20px';
        if (columnIndex == 5) {
          style['border-right'] = 'solid 1px #d8d8d8';
        }
      };
      return style;
    },


  },
  mounted() {
    this.getTable();
    this.getgroupOptions();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang='scss'>
@import "./assets/styles/common";
.EnergyChange {
  width: 100%;
  height: 100%;
  position: relative;
  .overview {
    width: 100%;
    background-color: #ffffff;
    // border-radius: 10px;
    padding: 0 40px 30px;
    margin-bottom: 20px;
    @include media($m1440) {
      padding: 0 40px 15px;
    }
    p.header {
      text-align: left;
      height: 60px;
      line-height: 60px;
      border-bottom: solid 1px #d9e3f3;
      font-size: 16px;
      font-weight: bold;
      color: #303030;
      padding: 0 40px;
      margin: 0 -40px;
      @include position(relative, none, none, none, none);
      @include media($m1440) {
        font-size: 14px;
      }
      >span {
        font-weight: bold;
        font-size: 16px;
        color: #496fec;
      }
      .fr{
          @include position(absolute, 41%, 197px, none, none);
      }
      .spanselect{
        display: inline-block;
        width: 160px;
        .el-input__inner{
              background-color: #f0f4fb;
              border-radius: 4px;
              border: 1px solid #f0f4fb;
              color:#303030,
        }
        .el-select .el-input .el-select__caret {
          color: #303030;
        }
      }
      >span:last-child {
        @include position(absolute, 50%, 20px, none, none);
        transform: translateY(-50%);
        font-weight: bold;  
        cursor: pointer;
        @include media($m1440) {
          font-size: 14px;
        }
      }
    }
    .el-table {
      margin: 30px 0;
      @include media($m1440) {
        margin: 20px 0;
      }
      td {
        padding: 0;
        button {
          width: 70px;
          height: 26px;
          color: #ffffff;
          font-size: 14px;
          padding: 0;
          border-radius: 4px;
          margin: 10px 0;
          @include media($m1660) {
            margin: 7px 0;
          }
           &.detailsBtn {
            background-color: #3d619b;
          }
          &.delBtn {
            background-color: #ef4b4c;
            margin-left: 20px;
          }
        }
        &:last-child .cell {
          overflow: visible;
        }
      }
    }
    ul.el-pager li.active {
      color: #496fec;
      background: url('./assets/img/LightTimed/hover.png') no-repeat center 20px;
      font-weight: bold;
    }
  }
  .el-form-item>div {
    text-align: left;
  }
  .el-switch.is-checked .el-switch__core {
    box-shadow: 0px 5px 15px 0px rgba(53, 116, 243, 0.5);
  }
  .el-switch .el-switch__core {
    box-shadow: 0px 5px 15px 0px rgba(144, 144, 144, 0.5);
  }
  .routerView {
    @include position(absolute,
    0,
    0,
    0,
    0);
    z-index: 3;
    background: #fff;
  }
}
</style>
