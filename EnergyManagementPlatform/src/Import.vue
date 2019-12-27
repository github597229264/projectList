<template>
  <div class="Import">
    <div class="overview">
      <p class="header">
        <span style="color:#303030">手动导入数据</span>
      </p>
      <p class="tip">此页面允许您批量导入到系统中读取数据</p>
      <!-- <p>要上传一个文件，点击“浏览”按钮，找到要上传的文件然后点击上传“CSV”</p> -->
      <!-- <p class="FileUp">
          <span>
            <input type="text" style="background:#f0f4fb;width:260px;height:30px;float:left" v-model="FileView">
            <input id="setLogo" type="file" accept=".xlsx,.xls"  multiple style="float:left; opacity: 0" @change="setLogo">
          </span>
          <button class="Look">浏览</button>
      </p> -->
        <el-cascader
      v-model="value"
      :options="options"
      @change="handleChange"></el-cascader>
      <el-button type="primary" class="ImportData" @click='ImportData'>导入数据</el-button>
    </div>
    <div class="overview">
      <p class="header">
        <span style="color:#303030">导入数据</span>
      </p>
      <div style="margin-top: 2%;">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%;"
          :cell-style="cellStyle"
          :header-cell-style="headerStyle"
          :row-class-name="tableRowClassName"
        >
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="name" label="数据源名称"></el-table-column>
          <el-table-column prop="desc" label="时间"></el-table-column>
          <el-table-column prop="Com" label="公司"></el-table-column>
          <el-table-column prop="Fac" label="工厂"></el-table-column>
          <el-table-column prop="Dept" label="车间"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Import",
  data() {
    return {
      tableData: [],
      FileView:'',
      value: [],
      DataName:'',
      ComNmae:'',
      FacName:'',
      DeptName:'焊接',
      options: [
         {
          value: '法士特',
          label: '法士特',
          children: [{
            value: '重庆工厂',
            label: '重庆工厂',
            children: [{
              value: '电表1电量',
              label: '电表1电量'
            }, {
              value: '电表2电量',
              label: '电表2电量'
            }, {
              value: '气表1流量',
              label: '气表1流量'
            }]
          }, {
            value: '沈阳工厂',
            label: '沈阳工厂',
            children: [{
              value: '气表2流量',
              label: '气表2流量'
            }, {
              value: '生产数据',
              label: '生产数据'
            }]
          }]
        }, 
         {
          value: '海斯坦普',
          label: '海斯坦普',
          children: [{
            value: '重庆工厂',
            label: '重庆工厂',
            children: [{
              value: '电表1电量',
              label: '电表1电量'
            }, {
              value: '电表2电量',
              label: '电表2电量'
            }, {
              value: '气表1流量',
              label: '气表1流量'
            }]
          }, {
            value: '沈阳工厂',
            label: '沈阳工厂',
            children: [{
              value: '气表2流量',
              label: '气表2流量'
            }, {
              value: '生产数据',
              label: '生产数据'
            }]
          }]
        },
        ] 
    };
  },
  methods: {
    // 点击选择导入的数据
     handleChange(value) {
        console.log(value);
        this.DataName=value[value.length-1]
        this.ComNmae=value[0]
        this.FacName=value[1]
        console.log();
        // if(N=='D1'){
        //   this.DataName='电表1电量'
        // }else if(N=='D2'){
        //   this.DataName='电表2电量'
        // }else if(N=='Q1'){
        //   this.DataName='气表1流量'
        // }else if(N=='Q2'){
        //   this.DataName='气表2流量'
        // }else if(N=='shengchan'){
        //   this.DataName='生产数据'
        // }
      },
    //  setLogo() {
    //   var FileData = $("#setLogo")[0].files;
    //   var FileArr=[]
    //   for(var i=0;i<FileData.length;i++){
    //     FileArr.push(FileData[i].name)
    //   }
    // this.FileView=FileArr.join(', ')
    // },
    // onSubmit() {
    //   console.log("submit!");
    // },

    ImportData(){
      console.log(this.DataName)
      this.tableData.push({
          desc:'',
          Com:this.ComNmae,
          Fac:this.FacName,
          Dept:this.DeptName,
          id: this.tableData.length+1,
          name: this.DataName==''?'':this.DataName,
          desc: this.$moment(new Date()).format('YYYY-MM-DD HH:mm')
      })
      this.value=[]
    },
    // 获取表格数据
    getTable() {
      if (window.innerWidth <= 1366) {
        this.pageSize = 6;
      }
      this.tableData = [
        // {
        //   id: 0,
        //   name: "电表1",
        //   desc: ""
        // },
        // {
        //   id: 1,
        //   name: "电表1",
        //   desc: " "
        // }
      ];
    },
    // 隔行换色
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 1) {
        return "warning-row ";
      } else {
        return "success-row";
      }
    },
    // 改变表格样式
    cellStyle({ row, column, rowIndex, columnIndex }) {
      let style = {
        "text-align": "center",
        "font-size": "14px",
        height: "56px",
        color: "303030",
        // 'background-color': '#fcfcfc',
        "border-left": "solid 1px #d8d8d8"
      };
      if (window.innerWidth > 1660) {
        if (rowIndex % 2 == 0) {
          if (columnIndex == 5) {
            style["border-right"] = "solid 1px #d8d8d8";
          }
        } else {
          // style['background-color'] = '#f7faff';
          if (columnIndex == 5) {
            style["border-right"] = "solid 1px #d8d8d8";
          }
        }
      } else if (window.innerWidth > 1440) {
        style["height"] = "40px";
        style["padding"] = "0px";
        if (rowIndex % 2 == 0) {
          if (columnIndex == 5) {
            style["border-right"] = "solid 1px #d8d8d8";
          }
        } else {
          // style['background-color'] = '#f7faff';
          if (columnIndex == 5) {
            style["border-right"] = "solid 1px #d8d8d8";
          }
        }
      } else {
        style["height"] = "20px";
        style["padding"] = "0px";
        if (rowIndex % 2 == 0) {
          if (columnIndex == 5) {
            style["border-right"] = "solid 1px #d8d8d8";
          }
        } else {
          // style['background-color'] = '#f7faff';
          if (columnIndex == 5) {
            style["border-right"] = "solid 1px #d8d8d8";
          }
        }
      }
      return style;
    },
    headerStyle({ row, column, rowIndex, columnIndex }) {
      let style = {
        "background-color": "#f3f3f3",
        "font-size": "14px",
        "font-weight": "100",
        color: "#2c5ac2",
        "text-align": "center",
        height: "56px",
        "border-left": "solid 1px #d8d8d8"
      };
      if (window.innerWidth > 1660) {
        if (columnIndex == 5) {
          style["border-right"] = "solid 1px #d8d8d8";
        }
      } else if (window.innerWidth > 1440) {
        style["height"] = "40px";
        style["padding"] = "0px";
        if (columnIndex == 5) {
          style["border-right"] = "solid 1px #d8d8d8";
        } else {
          style["font-size"] = "14px";
        }
      } else {
        style["font-size"] = "14px";
        style["height"] = "20px";
        if (columnIndex == 5) {
          style["border-right"] = "solid 1px #d8d8d8";
        }
      }
      return style;
    }
  },
  mounted() {
    this.getTable();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang='scss'>
@import "./assets/styles/common";
.Import {
  width: 100%;
  height: 100%;
  position: relative;
  .overview {
    width: 100%;
    background-color: #ffffff;
    // border-radius: 10px;
    padding: 0 40px 30px;
    margin-bottom: 20px;
    text-align: left;
    @include media($m1440) {
      padding: 0 40px 15px;
    }
    p.header {
      text-align: left;
      height: 50px;
      line-height: 50px;
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
      span {
        float: left;
      }
    }
  }
  p {
    line-height: 30px;
    font-size: 14px;
    .el-input__inner {
      height: 30px;
      border-radius: 4px;
      border: 1px solid #f0f4fb;
      color: #303030;
    }
    .el-form-item__content {
      height: 30px;
    }
    .Look {
      color:#fff;
      margin-left:-240px;
      width: 80px;
      height: 30px;
      line-height: 7px;
      background: #3d619b;
      border: none;
    }
  }
  .FileUp {
    margin-top: 30px;
  }
  .tip {
    margin-top: 2%;
  }
  .ImportData {
    width: 130px;
    height: 30px;
    background-color: #007acc;
    line-height: 7px;
    margin-top: 30px;
    border: none;
  }
}
</style>
