<template>
<div class="LightTimed">
  <div class="overview">
    <p class="header">
      <span style="float:left;">数据源搜索</span>
      <span style="float:right">
           <!-- <span class="fr el-icon-plus" @click="newTable" style="float:left;height:100%;line-height:60px;margin-right: 15px;">添加能源单位</span> -->
          <el-select v-model="Comvalue" filterable placeholder="公司" style="width:160px;margin-right: 8px;" id="AllDept">
          <el-option
            v-for="(item,index) in ComOptions"
            :key="index"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="valueDept" filterable placeholder="部门" style="width:160px;margin-right: 8px;" id="AllDept1">
          <el-option
            v-for="(item,index) in groupOptions"
            :key="index"
            :label="item.label"
            :value="item.category_id">
          </el-option>
        </el-select>
        <el-select v-model="valueDept" filterable placeholder="能源" style="width:160px;margin-right: 8px;" id="AllDept2">
          <el-option
            v-for="(item,index) in groupOptions"
            :key="index"
            :label="item.label"
            :value="item.category_id">
          </el-option>
        </el-select>
        <el-select v-model="valueDept" filterable placeholder="频率" style="width:160px;margin-right: 8px;" id="AllDept3">
          <el-option
            v-for="(item,index) in groupOptions"
            :key="index"
            :label="item.label"
            :value="item.category_id">
          </el-option>
        </el-select>
        <el-select v-model="valueDept" filterable placeholder="数据源类型" style="width:160px;float:right;margin-right: 8px;" id="AllDept4">
          <el-option
            v-for="(item,index) in groupOptions"
            :key="index"
            :label="item.label"
            :value="item.category_id">
          </el-option>
        </el-select>
      </span>
     
    </p>
    <div>
      <el-table :data="tableData" stripe style="width: 100%;overflow: hidden;" :cell-style="cellStyle" :header-cell-style="headerStyle">
        <el-table-column prop="id" label="数据源编号">
        </el-table-column>
        <el-table-column prop="name" label="名称" >
          <template slot-scope="scope">
            <!-- <router-link :to="scope.row.path"> -->
            <span style="color:rgb(73, 111, 236);cursor: pointer;border-bottom:1px solid #3272f5" @click='DataSource(scope.row)'>{{scope.row.name}}</span>
        <!-- </router-link>  -->
          </template>             
        </el-table-column>
        <el-table-column prop="Company" label="公司">
        </el-table-column>
         <el-table-column prop="scene" label="部门">
        </el-table-column>
        <el-table-column prop="utility" label="类型">
        </el-table-column>
        <el-table-column prop="Until" label="单位">
        </el-table-column>
        <el-table-column prop="Type" label="数据源类型">
        </el-table-column>
        <!-- <el-table-column prop="Rate" label="数据频率">
        </el-table-column>
        <el-table-column prop="CID" label="CID">
        </el-table-column> -->
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
    <!-- <el-pagination
    layout="prev, pager, next" prev-text="上一页" next-text="下一页"
    :total="totalPage" :page-size="pageSize">
  </el-pagination> -->
    </div>
  </div>
  <el-dialog
  :title="Name"
  :visible.sync="centerDialogVisible"
  width="30%"
  center>
  <el-form ref="form" :model="form" label-width="100px" label-position="left">
  
  <!-- <el-form-item label="效用 ">
    <el-select v-model="form.group" placeholder="选择设备分组">
       <el-option v-for="item in groupOptions" :key="item.category_id" :label="item.name" :value="item.category_id">
      </el-option>
    </el-select>
  </el-form-item> -->
 <!-- <el-form-item label="聚合">
    <el-select v-model="form.group" placeholder="选择设备分组">
       <el-option v-for="item in groupOptions" :key="item.category_id" :label="item.name" :value="item.category_id">
      </el-option>
    </el-select>
  </el-form-item> -->
  <el-form-item label="数据源">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="公司名称">
    <el-input v-model="form.Company"></el-input>
  </el-form-item>
  <el-form-item label="部门">
    <el-input v-model="form.scene"></el-input>
  </el-form-item>
  <el-form-item label="能源">
    <el-input v-model="form.utility"></el-input>
  </el-form-item>
  <el-form-item label="单位">
    <el-input v-model="form.Until"></el-input>
  </el-form-item>
  <el-form-item label="数据源类型">
    <el-input v-model="form.Type"></el-input>
  </el-form-item>
  <!-- <el-form-item label="数据频率">
    <el-input v-model="form.Rate"></el-input>
  </el-form-item>
  <el-form-item label="CID">
    <el-input v-model="form.CID"></el-input>
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
  name: "LightTimed",
  data() {
    return {
      valueDept:'',//所有部门
      Name:'创建部门',//弹出框的标题
      tableData: [],
      // totalPage: 0,
      // pageSize: 6,
      centerDialogVisible: false,
      form: {
        id: '',
        name: '',
        Company: '',
        scene: '',
        utility: '',
        Until: '',
        Type: '',
        // Rate: '',
        // CID: '',
        path:'',
      },
      groupOptions: [],
       ComOptions: [{//公司
          value: '1',
          label: '海斯坦普'
        }, {
          value: '2',
          label: '法士特',
        }],
      Comvalue: '',//公司
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
    //  获取表格的数据
    getTable() {
      if (window.innerWidth <= 1366) {
        // this.pageSize = 6;
      }
      // console.log(this.pageSize)
      this.tableData = [{
        id: 0,
        name: '电表1',
        Company: '海斯坦普',
        scene: '焊接车间',
        utility: '电量',
        Until: 'kw·h',
        Type: '自动',
        // Rate: '15Mn',
        // CID: 'ccgt',
        path:'/EnergyBox/DataDetails',
      }, {
        id: 1,
        name: '电表2',
         Company: '海斯坦普',
        scene:'焊接车间',
        utility: '电量',
         Until: 'kw·h',
        Type: '自动',
        // Rate: '15Mn',
        // CID: 'ccgt',
        path:'/EnergyBox/DataDetails',
      }, 
       {
        id: 2,
        name: '电表3',
         Company: '海斯坦普',
        scene:'焊接车间',
        utility: '电量',
         Until: 'kw·h',
        Type: '自动',
        // Rate: '15Mn',
        // CID: 'ccgt',
        path:'/EnergyBox/DataDetails',
      },
       {
        id: 3,
        name: '电表4',
         Company: '海斯坦普',
        scene:'焊接车间',
        utility: '电量',
         Until: 'kw·h',
        Type: '自动',
        // Rate: '15Mn',
        // CID: 'ccgt',
        path:'/EnergyBox/DataDetails',
      },
       {
        id: 4,
        name: '电表5',
         Company: '海斯坦普',
        scene:'焊接车间',
        utility: '电量',
         Until: 'kw·h',
        Type: '自动',
        // Rate: '15Mn',
        // CID: 'ccgt',
        path:'/EnergyBox/DataDetails',
      },
      {
        id: 5,
        name: '气表1',
        time: '',
         Company: '海斯坦普',
        scene: '焊接车间',
        utility: '流量',
         Until: 'm³',
       Type: '自动',
      //  Rate: '15Mn',
      //  CID: 'ccgt',
        path:'/EnergyBox/DataDetails',
      },
       {
        id: 6,
        name: '气表2',
        time: '',
         Company: '海斯坦普',
        scene: '焊接车间',
        utility: '流量',
         Until: 'm³',
       Type: '自动',
      //  Rate: '15Mn',
      //  CID: 'ccgt',
        path:'/EnergyBox/DataDetails',
      },
       {
        id: 7,
        name: '气表3',
        time: '',
         Company: '海斯坦普',
        scene: '焊接车间',
        utility: '流量',
         Until: 'm³',
       Type: '自动',
      //  Rate: '15Mn',
      //  CID: 'ccgt',
        path:'/EnergyBox/DataDetails',
      },
       {
        id: 8,
        name: '气表4',
        time: '',
         Company: '海斯坦普',
        scene: '焊接车间',
        utility: '流量',
         Until: 'm³',
       Type: '自动',
      //  Rate: '15Mn',
      //  CID: 'ccgt',
        path:'/EnergyBox/DataDetails',
      },
       {
        id: 9,
        name: '气表5',
        time: '',
         Company: '海斯坦普',
        scene: '焊接车间',
        utility: '流量',
         Until: 'm³',
       Type: '自动',
      //  Rate: '15Mn',
      //  CID: 'ccgt',
        path:'/EnergyBox/DataDetails',
      },

       {
        id: 10,
        name: '生产数据',
        time: '',
         Company: '海斯坦普',
        scene: '焊接车间',
        utility: '产量',
         Until: '个',
       Type: '自动',
      //  Rate: '15Mn',
      //  CID: 'ccgt',
        path:'/EnergyBox/DataDetails',
      },];
      // console.log(this.tableData.length)
      // this.pageSize=this.tableData.length
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
      this.$confirm('删除此条定时信息?', '提示', {
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

    // 点击每个数据源的时候
    DataSource(v){
      console.log(v)
      // console.log(localStorage.setItem('VName',v.name))  
      this.$router.push({
        path:"/EnergyBox/DataDetails"
      })
      this.$nextTick(function() {
          // DOM 现在更新了
          this.$root.Bus.$emit("VName",v.name,'shuju');
      });
    
    },
    newTable() {
      this.Name="创建部门"
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
      console.log(row)
      this.Name="编辑节约和成本"
      this.form = {...row
      };
      this.centerDialogVisible = true;
      
    },
    ifusedChange(row) {
      console.log(row);
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
        'background-color': '#ebf1fb',
        'border-left': 'solid 1px #d8d8d8',
      }
      if (window.innerWidth > 1660) {
        if (rowIndex % 2 == 0) {
          if (columnIndex == 5) {
            style['border-right'] = 'solid 1px #d8d8d8';
          }
        } else {
          style['background-color'] = '#f7faff';
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
          style['background-color'] = '#f7faff';
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
          style['background-color'] = '#f7faff';
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
        'background-color': '#f7faff',
        'font-size': '16px',
        'color': '#496fec',
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
.LightTimed {
  width: 100%;
  height: 100%;
  position: relative;
   .el-table .el-table__row {
  opacity: 1 !important;
}
@keyframes tableShow {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 1;
  }
}
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
      }
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
  #AllDept,#AllDept1,#AllDept2,#AllDept3,#AllDept4{
    background:#f0f4fb;
  }
  .el-form-item>div {
    text-align: left;
  }
}
</style>
