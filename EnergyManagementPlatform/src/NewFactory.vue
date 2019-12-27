<template>
  <div class="LightSet">
    <!-- <button type="text" size="small" class="detailsBtn" style="float:right" @click="goBack">
  <img src="./assets/img/NewFactory/back.png" alt="">
    返回</button>-->
    <p @click="goBack" class="goBack">
      <img src="./assets/img/NewFactory/back.png" alt />
      返回上一级
    </p>
    <div class="overview">
      <p class="header">
        <span>基本信息</span>
      </p>
      <div class="form">
        <div>
          <label for>工厂名称</label>
          <el-input v-model="formInline.FacName"></el-input>
        </div>
        <div>
          <label for>公司名称</label>
          <el-input v-model="formInline.ComName"></el-input>
        </div>
        <div>
          <label for>创建日期</label>
          <el-input v-model="formInline.setUp"></el-input>
        </div>
        <div>
          <label for>地址</label>
          <el-input v-model="formInline.stateUploadTime"></el-input>
        </div>
        <div>
          <label for>镇/城市</label>
          <el-input v-model="formInline.city"></el-input>
        </div>
        <div>
          <label for>县</label>
          <el-input v-model="formInline.city"></el-input>
        </div>
        <div>
          <label for>邮政编码</label>
          <el-input v-model="formInline.port"></el-input>
        </div>
        <div>
          <label for>电话</label>
          <el-input v-model="formInline.tel"></el-input>
        </div>
        <div>
          <label for>传真</label>
          <el-input v-model="formInline.port"></el-input>
        </div>
      </div>
    </div>
    <div class="overview">
      <p class="header">
        <span>首选项</span>
      </p>
      <div class="form">
        <div>
          <label for>财务开始月份</label>
          <el-select v-model="projectForm.StartMouth" clearable placeholder="选择区域名">
            <el-option
              v-for="(item,index) in StartMouthData"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div>
          <label for>每周开始日期</label>
          <el-select v-model="projectForm.name" clearable placeholder="选择区域名">
            <el-option
              v-for="item in groupOptions"
              :key="item.category_id"
              :label="item.name"
              :value="item.category_id"
            ></el-option>
          </el-select>
        </div>
        <div>
          <label for>移动启动</label>
          <el-input v-model="formInline.stateUploadTime"></el-input>
        </div>
        <div>
          <label for>时区：</label>
          <el-select v-model="projectForm.name" clearable placeholder="选择区域名">
            <el-option
              v-for="item in groupOptions"
              :key="item.category_id"
              :label="item.name"
              :value="item.category_id"
            ></el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="overview">
      <p class="header">
        <span>工厂授权</span>
      </p>
      <div class="empower">
        <div class="warning">
          <span class="peopleLeft">
            显示该工厂的授权警告
            <el-checkbox v-model="checked" style="margin-left:5px"></el-checkbox>
          </span>
          <div style="float:left;height:100%" class="people">
            <el-select v-model="projectForm.name" placeholder="选择负责人" id="ChooseP">
              <el-option
                v-for="item in groupOptions"
                :key="item.category_id"
                :label="item.name"
                :value="item.category_id"
              ></el-option>
            </el-select>
          </div>
        </div>
            <!-- :data="tableData" -->
        <el-table
         :data="tableData"
          :cell-style="cellStyle"
          :header-cell-style="tableHeaderColor"
          :row-class-name="tableRowClassName"
          style="width: 100%；height:100%"
          class="AuthTable"
          @cell-dblclick="tableDbEdit"
        >
          <el-table-column label="主动授权" style="width: 100%">
            <el-table-column
              v-for="items in GrantTabData"
              prop="items.dataItem"
              :key="items.index"
              :label="items.dataName"
            >
              <template slot-scope="scope">
                <i :class="[items.isActive==false?'el-icon-close':'el-icon-check']"></i>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
      <p class="AddAuth" @click="AddAuthFun">＋添加授权</p>
    </div>
    <button @click="onSubmit" class="Hold">保存</button>
    <el-dialog title="添加授权" :visible.sync="centerDialogVisible" width="30%" center>
      <el-form ref="form" label-width="100px" label-position="left">
        <el-form-item label="授权名称">
          <el-input v-model="AuthName"></el-input>
        </el-form-item>
        <el-form-item label="是否开启授权">
          <el-switch v-model="Authvalue" active-color="#4c84ff" inactive-color="#d8e0e5"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="Save">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "LightSet",
  data() {
    return {
      GrantTabData: [],
      ShoudialogVisible: false, //授权的弹框
      CellCon: "", //授权的弹框的文字
      checked: true,
      Authvalue: false,
      centerDialogVisible: false,
      AuthName: "",
      formInline: {},
      StartMouthData:[
        {
          value:1,
          lable:'1月'
        },
         {
          value:2,
          lable:'2月'
        },
         {
          value:3,
          lable:'3月'
        },
         {
          value:4,
          lable:'4月'
        },
         {
          value:5,
          lable:'5月'
        },
         {
          value:6,
          lable:'6月'
        },
         {
          value:7,
          lable:'7月'
        },
         {
          value:8,
          lable:'8月'
        },
         {
          value:9,
          lable:'9月'
        },
         {
          value:10,
          lable:'10月'
        },

      ],
      projectForm: {
        name: "",
        StartMouth: "",
        file: ""
      },
      groupOptions: [],
      tableData: [
        {
          id: 0,
          Strata: 0,
          DataCollection: 0,
          CI: 0,
          OEE: 0,
        }
      ]
    };
  },
  methods: {
    // 点击授权修改授权
    tableDbEdit(row, column, cell, event) {
      if (event.toElement.className == "el-icon-check") {
        console.log("55555555");
        // this.tableData.Strata=1
        event.toElement.className = "el-icon-close";
      } else if (event.toElement.className == "el-icon-close") {
        console.log("8888888");
        event.toElement.className = "el-icon-check";
        // this.tableData.Strata=0
      }
    },
    GetTableFun(){
      this.GrantTabData=[
        {
          dataItem: "Strata",
          dataName: "能源管理平台",
          isActive:false
        },
        {
          dataItem: "DataCollection",
          dataName: "数据收集",
          isActive:false
        },
        {
          dataItem: "OEE",
          dataName: "OEE",
          isActive:false
        },
         {
          dataItem: "Zip",
          dataName: "文件管理器",
          isActive:false
        }
      ]
    },
    Save() {
      console.log(this.Authvalue);
      console.log(this.AuthName);
      this.centerDialogVisible = false;
      this.GrantTabData.push(
        {
          dataItem: this.AuthName,
          dataName: this.AuthName,
          isActive:this.Authvalue
        },
      );
      console.log(this.GrantTabData)
    },
    handleGoods(i, row) {
      console.log(i);
      console.log(row);
    },
    AddAuthFun() {
      this.centerDialogVisible = true;
      this.Authvalue=false;
      this.AuthName='';
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 点击返回的时候
    goBack() {
      this.$router.push({
        path: "/EnergyBox/EnergyFactory"
      });
    },
    getgroupOptions() {
      this.groupOptions = [
        {
          category_id: "02-03",
          name: "黄金糕"
        },
        {
          category_id: "01",
          name: "双皮奶"
        }
      ];
    },
    // getformInline() {
    //   this.formInline = {
    //     addr: "",
    //     num: "",
    //     dataUploadTime: "",
    //     stateUploadTime: "",
    //     ip: "",
    //     port: ""
    //   };
    // },
    gettableData() {
      if (localStorage.getItem("tableData")) {
        this.tableData = JSON.parse(localStorage.getItem("tableData"));
      }
    },
    onSubmit() {

      let ifAjax = Object.values(this.formInline).filter(item => item);
      if (ifAjax.length != 6) {
        this.$message({
          type: "info",
          message: "请填写完整"
        });
      } else {
        console.log(this.formInline);
      }
    },
    setMap() {
      var img = $("#setMap")[0].files[0];
      var _this = this;
      if (img != undefined) {
        var reader = new FileReader();
        reader.onload = function() {
          _this.projectForm.file = this.result;
        };
        reader.readAsDataURL(img);
      } else {
        this.$message({
          type: "info",
          message: "图标不能为空"
        });
      }
    },
    // 隔行换色
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 1) {
        return "warning-row ";
      } else {
        return "success-row";
      }
    },
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color: #f6f6f6;color: #303030;font-size:14px;text-align:center;height:60px";
      }
      if (rowIndex === 1) {
        return "background-color: #fdfdfd;color: #2c5ac2;font-size:14px;text-align:center;height:60px";
      }
    },
    // 改变表格样式
    cellStyle({ row, column, rowIndex, columnIndex }) {
      let style = {
        "text-align": "center",
        "font-size": "14px",
        height: "60px",
        "background-color": "#ebf1fb",
        "border-left": "solid 1px #d8d8d8"
      };
      if (window.innerWidth > 1660) {
        if (rowIndex % 2 == 0) {
          if (columnIndex == 3) {
            style["border-right"] = "solid 1px #d8d8d8";
          }
        } else {
          style["background-color"] = "#f7faff";
          if (columnIndex == 3) {
            style["border-right"] = "solid 1px #d8d8d8";
          }
        }
      } else if (window.innerWidth > 1440) {
        style["height"] = "40px";
        style["padding"] = "0px";
        if (rowIndex % 2 == 0) {
          if (columnIndex == 3) {
            style["border-right"] = "solid 1px #d8d8d8";
          }
        } else {
          style["background-color"] = "#f7faff";
          if (columnIndex == 3) {
            style["border-right"] = "solid 1px #d8d8d8";
          }
        }
      } else {
        style["height"] = "20px";
        style["padding"] = "0px";
        if (rowIndex % 2 == 0) {
          if (columnIndex == 3) {
            style["border-right"] = "solid 1px #d8d8d8";
          }
        } else {
          style["background-color"] = "#f7faff";
          if (columnIndex == 3) {
            style["border-right"] = "solid 1px #d8d8d8";
          }
        }
      }
      return style;
    }
    // headerStyle({
    //   row,
    //   column,
    //   rowIndex,
    //   columnIndex
    // }) {
    //   let style = {
    //     'background-color': '#f7faff',
    //     'font-size': '14px',
    //     'color': '#666666',
    //     'text-align': 'center',
    //     'height': '60px',
    //     'border-left': 'solid 1px #d8d8d8'
    //   }
    //   if (window.innerWidth > 1660) {
    //     if (columnIndex == 3) {
    //       style['border-right'] = 'solid 1px #d8d8d8';
    //     }
    //   } else if (window.innerWidth > 1440) {
    //     style['height'] = '40px';
    //     style['padding'] = '0px';
    //     if (columnIndex == 3) {
    //       style['border-right'] = 'solid 1px #d8d8d8';
    //     } else {
    //       style['font-size'] = '14px';
    //     }
    //   } else {
    //     style['font-size'] = '14px';
    //     style['height'] = '20px';
    //     if (columnIndex == 3) {
    //       style['border-right'] = 'solid 1px #d8d8d8';
    //     }
    //   }
    //   return style;
    // },
  },
  mounted() {
    // this.getformInline();
    this.GetTableFun()
    this.getgroupOptions();
    // this.gettableData();
   var way=localStorage.getItem('way')
    if(way=='add'){
      this.formInline=''
    }else if(way=='edit'){
      this.formInline=JSON.parse(localStorage.getItem('formCon'))
    } 
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
@import "./assets/styles/common";
.LightSet {
  width: 100%;
  height: 100%;
  .goBack {
    text-align: right;
    color: #2c5ac2;
    font-size: 14px;
    cursor: pointer;
  }
  .AuthTable {
    .el-icon-close {
      color: #f84d4d;
      font-size: 20px;
      font-weight: 600;
    }
    .el-icon-check{
       color: #007acc;
      font-size: 20px;
      font-weight: 600;
    }
  }

  .Hold {
    width: 80px;
    height: 30px;
    background: #007acc;
    border-radius: 0;
    float: right;
    margin: 10px 0;
    cursor: pointer;
  }
  button {
    width: 70px;
    height: 26px;
    color: #ffffff;
    font-size: 14px;
    padding: 0;
    border-radius: 4px;
    // margin: -36px 0;
    @include media($m1660) {
      margin: -37px 0;
    }
    &.detailsBtn {
      background-color: #3272f5;
    }
  }

  .overview {
    width: 100%;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 0 40px 30px;
    margin-bottom: 30px;
    margin-top: 24px;
    &:last-child {
      margin-bottom: 20px;
    }
    @include media($m1660) {
      margin: 30px auto 0px;
    }
    @include media($m1366) {
      margin: 20px auto 0px;
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
      > span {
        font-weight: bold;
      }
    }
    .AddAuth {
      text-align: left;
      margin-top: 20px;
      color: #2c5ac2;
      cursor: pointer;
    }
    .empower {
      .warning {
        width: 100%;
        height: 70px;
        .peopleLeft {
          float: left;
          line-height: 70px;
          margin-right: 5%;
        }
        .el-select {
          margin-top: 9%;
        }
        #ChooseP {
          height: 36px;
          background-color: #d8e0e5;
          border-radius: 4px;
          border: none;
        }
        .People {
          width: 30%;
          float: left;
          margin-left: 5%;
          label {
            float: left;
          }
          el-select {
            float: left !important;
          }
        }
      }
    }
    .form {
      height: 150px;
      @include media($m800) {
        height: 178px;
      }
      margin-bottom: 32px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      > div {
        width: 30%;
        clear: both;
        @include media($m800) {
          width: 50%;
        }
        height: 36px;
        line-height: 36px;
        &:nth-child(-n + 3) {
          margin: 20px 0;
          @include media($m800) {
            margin: 0;
          }
        }
        &:nth-of-type(4) {
          margin-bottom: 20px;
          @include media($m800) {
            margin-bottom: 0px;
          }
        }
        &:nth-child(-n + 2) {
          @include media($m800) {
            margin-top: 20px;
          }
        }
        label {
          float: left;
          width: 105px;
          text-align: left;
        }
        > div {
          float: right;
          @include position(relative, none, none, none, none);
          width: calc(100% - 105px);
          .el-input__inner {
            height: 36px;
            background-color: #d8e0e5;
            border-radius: 4px;
            border: none;
          }
        }
      }
    }
    button {
      width: 130px;
      height: 32px;
      background-image: linear-gradient(270deg, #4c84ff 0%, #2f6df2 100%),
        linear-gradient(#4c84ff, #4c84ff);
      background-blend-mode: normal, normal;
      box-shadow: 0px 5px 15px 0px rgba(53, 116, 243, 0.5);
      border-radius: 4px;
      font-size: 14px;
      color: #ffffff;
    }
    .projextSet {
      text-align: left;
      .form {
        height: 148px;
        display: inline-block;
        > div {
          margin: 14px 0;
        }
      }
      .el-table {
        margin: 18px 0;
        td:last-child .cell {
          overflow: visible;
        }
      }
      button {
        width: 100px;
        line-height: 8px;
      }
      .fileBtn {
        @include position(absolute, 2px, -100px, none, none);
        width: 80px;
        height: 32px;
        background-color: #bdcbe9;
        box-shadow: 0px 5px 15px 0px #bdcbe9;
        border-radius: 4px;
        font-size: 14px;
        line-height: 32px;
        text-align: center;
        color: #ffffff;
      }
      .detailsBtn {
        width: 80px;
        height: 30px;
        background: #40cfa2;
        box-shadow: 0px 5px 15px 0px rgba(64, 207, 162, 0.5);
        border-radius: 4px;
      }
      .delBtn {
        width: 80px;
        height: 30px;
        background: #e43535;
        box-shadow: 0px 5px 15px 0px rgba(228, 53, 53, 0.5);
        border-radius: 4px;
        margin-left: 20px;
      }
    }
  }
}
</style>
