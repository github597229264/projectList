<template>
<div class="LightTimed">
  <div class="overview">
    <p class="header">
      <span style="float:left">公司搜索</span>
        <span class="fr el-icon-plus"  @click="newTable">添加公司</span>
    </p>
    <div>
      <el-table :data="tableData" stripe style="width: 100%;" :cell-style="cellStyle" :header-cell-style="headerStyle" :row-class-name="tableRowClassName">
        <el-table-column prop="id" label="ID">
        </el-table-column>
        <el-table-column prop="ComName" label="公司名称">
        </el-table-column>
        <el-table-column prop="city" label="城市">
        </el-table-column>
        <el-table-column prop="Tel" label="电话">
        </el-table-column>
        <el-table-column prop="SetUp" label="创建于">
        </el-table-column>
        <el-table-column label="选项" width="240">
<template slot-scope="scope">
<el-button type="text" @click="goLightTimeSet(scope.row)" size="small" class="detailsBtn">
  <i class="el-icon-edit"></i>
  编辑</el-button>
<el-button type="text" size="small" @click="delTime(scope.row)" class="delBtn">
  <i class="el-icon-circle-close"></i>
  删除</el-button>
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
  :title="Name"
  :visible.sync="centerDialogVisible"
  width="30%"
  center>
  <el-form ref="form" :model="form" label-width="100px" label-position="left">
  <el-form-item label="公司名称">
    <el-input v-model="form.ComName"></el-input>
  </el-form-item>
  <el-form-item label="城市">
    <el-input v-model="form.city"></el-input>
  </el-form-item>
  <el-form-item label="电话">
    <el-input v-model="form.Tel"></el-input>
  </el-form-item>
  <el-form-item label="创建于">
    <el-input v-model="form.SetUp"></el-input>
  </el-form-item>
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
  name: "LightTimed",
  data() {
    return {
      valueDept:'',//所有部门
      Name:'创建公司',//弹出框的标题
      tableData: [],
      totalPage:0,
      pageSize: 6,
      centerDialogVisible: false,
      form: {
        id: 0,
        ComName: '',
        city: '',
        Tel: '',
        SetUp: '',
      },
      updateId:'' //编辑id
    };
  },
  methods: {
    // 获取表格的函数
    getTable() {
      if (window.innerWidth <= 1366) {
        this.pageSize = 6;
      }
      console.log(this.pageSize)
      this.tableData = [{
        id: 0,
        ComName: '海斯坦普',
        city: '重庆',
        Tel: '86-512-57109675',
        SetUp: '2010-10-08',
      }, {
        id: 1,
        ComName: '法士特',
        city: '西安',
        Tel: '800-840-9955',
        SetUp:'2010-10-08',
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
      if(this.Name=='创建公司'){
         this.tableData.push(this.form)
      }else{
        this.tableData.forEach((v,k)=>{
            if(v.id==this.updateId){      
                v.ComName=this.form.ComName,
                v.SetUp=this.form.SetUp,
                v.Tel=this.form.Tel,
                v.city=this.form.city
            }
        })
      }
      this.centerDialogVisible = false;
      this.form = {
        id:0,
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
      this.$confirm('删除此条定时信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        console.log(row);
        // this.getTable();
        this.tableData.forEach((v,k)=>{
            if(v.id==row.id){
              this.tableData.splice(k,1)
          }
        })
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
      this.Name="创建公司"
      var tim=String(new Date().getTime())
      var str=tim.substring(tim.length-4)
      console.log(str)
      this.form = {
        id: str,
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
      console.log(row)
      this.updateId=row.id;
      this.Name="编辑公司"
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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang='scss'>
@import "./assets/styles/common";
.LightTimed {
  width: 100%;
  height: 100%;
  position: relative;
  .overview {
   width: 100%;
    background-color: #ffffff;
    // border-radius: 10px;
    padding: 0 40px 30px;
    margin-bottom: 20px;
    border: solid 1px #d8d8d8;
    @include media($m1440) {
      padding: 0 40px 15px;
    }
    p.header {
      // text-align: left;
      // height: 60px;
      // line-height: 60px;
      // border-bottom: solid 1px #d8d8d8;
      // font-size: 14px;
      // // font-weight: bold;
      // color: #202020;
      // padding: 0 40px;
      // margin: 0 -40px;
      // background-color: #f7f7f7;
      // @include position(relative, none, none, none, none);
      // @include media($m1440) {
      //   font-size: 12px;
      // }
      // >span {
      //   // font-weight: bold;
      //   font-size: 14px;
      //   color: #496fec;
      // }
      >span:last-child {
        @include position(absolute, 50%, 20px, none, none);
        transform: translateY(-50%);
        font-weight: bold;
        font-size: 16px;
        color: #496fec;
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
            // box-shadow: 0px 5px 15px 0px rgba(64, 207, 162, 0.5);
          }
          &.delBtn {
            background-color: #ef4b4c;
            // box-shadow: 0px 5px 15px 0px rgba(228, 53, 53, 0.5);
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
  #AllDept{
    background:#f0f4fb;
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
  //  .el-table--striped .el-table__body tr.el-table__row--striped td{
  //   background: none!important;
  // }
  // .el-table .warning-row {
  //   background: #f3f3f3!important;
  // }

  // .el-table .success-row {
  //   background: #fcfcfc!important;
  // }
}
</style>
