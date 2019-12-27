<template>
  <div class="OEE" id="OEE">
    <div class="OEEleft">
      <ul class="oeeUl">
        <li>设备</li>
        <li>
          <img src="./assets/img/oee/oee1.png" alt />
        </li>
        <li>
          <img src="./assets/img/oee/oee2.png" alt />
        </li>
        <li>
          <img src="./assets/img/oee/oee3.png" alt />
        </li>
        <li>
          <img src="./assets/img/oee/oee4.png" alt />
        </li>
        <li>
          <img src="./assets/img/oee/oee5.png" alt />
        </li>
      </ul>
      <!-- 第0个表 -->
      <div style="height:10px;clear:both"></div>
      <div class="zerDiv">
        <ul class="zeroUL">
          <li>可用性</li>
          <li>性能</li>
          <li>质量</li>
          <li>OEE</li>
        </ul>
        <ul class="zeroUL1">
          <li>83.95%</li>
          <li>69.36%</li>
          <li>93.44%</li>
          <li>54.41%</li>
        </ul>
        <ul class="zeroUL2">
          <li>
            <div class="widthCom"></div>
            <div class="widthCom1"></div>
          </li>
          <li>
            <div class="widthCom3"></div>
            <div class="widthCom4"></div>
          </li>
          <li>
            <div class="widthCom5"></div>
            <div class="widthCom6"></div>
          </li>
          <li>
            <div class="widthCom7"></div>
            <div class="widthCom8"></div>
          </li>
        </ul>
        <!-- <el-table border style="width: 100%">
          <el-table-column  label="可用性" width="180"></el-table-column>
          <el-table-column  label="性能" width="180"></el-table-column>
          <el-table-column  label="质量"></el-table-column>
          <el-table-column  label="OEE"></el-table-column>
        </el-table>-->
      </div>
      <div style="height:10px;clear:both"></div>
      <!-- 第一个表 -->
      <div class="listTable">
        <el-table
          :data="listData"
          :span-method="objectSpanMethod"
          class="tableArea"
          border
          style="width: 100%"
        >
          <el-table-column label="时间" align="center">
            <el-table-column prop="type1" label="序号" align="center" />
            <el-table-column prop="sheetType" label="工单类型" />
            <el-table-column prop="taskKey" label="taskKey" />
            <el-table-column label="操作">
              <template slot-scope="scope">
                <div>
                  <div class="conHe">
                    <p>等待时间</p>
                  </div>
                  <div class="conHe">
                    <div class="con1"></div>
                    <div class="con2"></div>
                  </div>
                  <div class="conHe">
                    <p>运行时间</p>
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
      <!-- 第二个表 -->
      <div class="listTable">
        <el-table
          :data="listData1"
          :span-method="objectSpanMethod"
          class="tableArea"
          border
          style="width: 100%"
        >
          <el-table-column label="速度" align="center">
            <el-table-column prop="type1" label="序号" align="center" width="200" />
            <el-table-column prop="sheetType" label="工单类型" />
            <el-table-column prop="taskKey" label="taskKey" />
            <el-table-column label="操作">
              <template slot-scope="scope">
                <div>
                  <div class="conHe">
                    <p style="margin-top:0px">损失速度</p>
                  </div>
                  <div class="conHe">
                    <div class="con1" style="height:20px"></div>
                    <div class="con2" style="height:90px"></div>
                  </div>
                  <div class="conHe">
                    <p>实际速度</p>
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
      <!-- 第三个表 -->
      <div class="listTable">
        <el-table
          :data="listData2"
          :span-method="objectSpanMethod"
          class="tableArea"
          border
          style="width: 100%"
        >
          <el-table-column label="产量" align="center">
            <el-table-column prop="type1" label="序号" align="center" width="200" />
            <el-table-column prop="sheetType" label="工单类型" />
            <el-table-column prop="taskKey" label="taskKey" />
            <el-table-column label="操作">
              <template slot-scope="scope">
                <div>
                  <div class="conHe">
                    <p style="margin-top:-3px">次品数量</p>
                  </div>
                  <div class="conHe">
                     <div class="con1" style="height:5px"></div>
                    <div class="con2" style="height:105px"></div>
                  </div>
                  <div class="conHe">
                    <p>合格数量</p>
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="OEEright">
      <ul class="oeeUl oeeU2">
        <li>时间</li>
        <li>
          <p>Current</p>
          <p>Shift</p>
          <p>(2)</p>
        </li>
        <li>
          <p>Current</p>
          <p>Day</p>
          <p>({{this.day}})</p>
        </li>
        <li>
          <p>Current</p>
          <p>Week</p>
          <p>({{this.Week}})</p>
        </li>
        <li>
          <p>Current</p>
          <p>Month</p>
          <p>({{this.month}})</p>
        </li>
        <li>
          <p>Current</p>
          <p>Year</p>
          <p>({{this.Year}})</p>
        </li>
      </ul>
      <!-- 第0个表 -->
      <div style="height:10px;clear:both"></div>
      <div class="zerDiv zerCon">
        <p class="sun1">六大损失</p>
        <div class="sunDiv">
          <div class="sunLeft">时间类型</div>
          <div class="sunRight">
            <ul class="sunUl">
              <li style="background-color:#8eb2d6"></li>
            </ul>
          </div>
        </div>

        <div class="sunDiv">
          <div class="sunLeft">运行时间</div>
          <div class="sunRight">
            <ul class="sunUl">
              <li style="background-color:#c0d59d;width:50%;float:left"></li>
              <li style="background-color:#eeeff1;width:50%;float:left"></li>
            </ul>
          </div>
        </div>

        <div class="sunDiv">
          <div class="sunLeft">停机</div>
          <div class="sunRight">
            <ul class="sunUl">
              <li style="background-color:#eeeff1;width:50%;float:left"></li>
              <li style="background-color:#fdbc9e;width:10%;float:left"></li>
              <li style="background-color:#eeeff1;width:40%;float:left"></li>
            </ul>
          </div>
        </div>
        <div class="sunDiv">
          <div class="sunLeft">长时停机</div>
          <div class="sunRight">
            <ul class="sunUl">
              <li style="background-color:#eeeff1;width:60%;float:left"></li>
              <li style="background-color:#fdbc9e;width:10%;float:left"></li>
              <li style="background-color:#eeeff1;width:30%;float:left"></li>
            </ul>
          </div>
        </div>
        <div class="sunDiv">
          <div class="sunLeft">速度损失</div>
          <div class="sunRight">
            <ul class="sunUl">
              <li style="background-color:#eeeff1;width:70%;float:left"></li>
              <li style="background-color:#fdbc9e;width:10%;float:left"></li>
              <li style="background-color:#eeeff1;width:20%;float:left"></li>
            </ul>
          </div>
        </div>
        <div class="sunDiv">
          <div class="sunLeft">小停机</div>
          <div class="sunRight">
            <ul class="sunUl">
              <li style="background-color:#eeeff1;width:80%;float:left"></li>
              <li style="background-color:#fdbc9e;width:10%;float:left"></li>
              <li style="background-color:#eeeff1;width:10%;float:left"></li>
            </ul>
          </div>
        </div>

        <div class="sunDiv">
          <div class="sunLeft">启动次品</div>
          <div class="sunRight">
            <ul class="sunUl">
              <li style="background-color:#eeeff1;width:90%;float:left"></li>
              <li style="background-color:#fdbc9e;width:3%;float:left"></li>
              <li style="background-color:#eeeff1;width:7%;float:left"></li>
            </ul>
          </div>
        </div>

        <div class="sunDiv">
          <div class="sunLeft">生产次品</div>
          <div class="sunRight">
            <ul class="sunUl">
              <li style="background-color:#eeeff1;width:93%;float:left"></li>
              <li style="background-color:#fdbc9e;width:7%;float:left"></li>
              
            </ul>
          </div>
        </div>
      </div>

      <div style="height:10px;clear:both"></div>
      <!-- 第一个表 -->
      <div class="listTable">
        <el-table
          :data="listDataR1"
          class="tableArea"
          border
          style="width: 100%"
        >
          <el-table-column label="可用性损失" align="center">
            <el-table-column prop="type1" label="序号" align="center" />
            <el-table-column prop="sheetType" label="工单类型" />
            <el-table-column prop="taskKey" label="taskKey" />
            <el-table-column label="操作">
              <template slot-scope="scope">
                 <div>
                  <div class="tcON" :style="{width: scope.row.id + 'px' }"></div>
                </div>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
      <!-- 第二个表 -->
      <div class="listTable">
        <el-table
          :data="listDataR2"
          class="tableArea"
          border
          style="width: 100%"
        >
          <el-table-column label="性能损失" align="center">
            <el-table-column prop="type1" label="序号" align="center" width="200" />
            <el-table-column prop="sheetType" label="工单类型" />
            <el-table-column prop="taskKey" label="taskKey" />
            <el-table-column label="操作">
              <template slot-scope="scope">
                 <div>
                  <div class="tcON" :style="{width: scope.row.id + 'px' }"></div>
                </div>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
      <!-- 第三个表 -->
      <div class="listTable">
        <el-table
          :data="listDataR3"
         
          class="tableArea"
          border
          style="width: 100%"
        >
          <el-table-column label="质量损失" align="center">
            <el-table-column prop="type1" label="序号" align="center" width="200" />
            <el-table-column prop="sheetType" label="工单类型" />
            <el-table-column prop="taskKey" label="taskKey" />
            <el-table-column label="操作">
              <template slot-scope="scope">
                <div>
                  <div class="tcON" :style="{width: scope.row.id + 'px' }"></div>
                </div>
              </template>
            </el-table-column>
          </el-table-column>
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
      Year:'',
      month:'',
      day:'',
      Week:'',
      tableData0: [
        {
          date: "83.95%",
          name: "68.36%",
          address: "93.44%",
          OEE: "54.41%"
        },
        {
          date: "83.95%",
          name: "68.36%",
          address: "93.44%",
          OEE: "54.41%"
        }
      ],
      listDataR1:[
         {
          id: 15,
          type1: "停机",
          sheetType: "00:23:00",
          taskKey: "4.97%",
          templateUrl: "/shijian_01"
        },
        {
          id: 30,
          type1: "长时停机",
          sheetType: "00:53:12",
          taskKey: "11.08%",
          templateUrl: "/shijian_02"
        },
        {
          id: 45,
          type1: "总计",
          sheetType: "01:17:03",
          taskKey: "16.05%",
          templateUrl: "/shijian_04"
        }
      ],
      listDataR2:[
         {
          id: 18,
          type1: "速度损失",
          sheetType: "01:52:36",
          taskKey: "23.46%",
          templateUrl: "/shijian_01"
        },
        {
          id: 5,
          type1: "小停机",
          sheetType: "01:10:50",
          taskKey: "2.26%",
          templateUrl: "/shijian_02"
        },
        {
          id: 15,
          type1: "总计",
          sheetType: "02:03:26",
          taskKey: "25.72%",
          templateUrl: "/shijian_04"
        }
      ],
      listDataR3:[
         {
          id: 3,
          type1: "启动产生的次品",
          sheetType: "00:04:54",
          taskKey: "1.02%",
          templateUrl: "/shijian_01"
        },
        {
          id: 5,
          type1: "生产过程中的次品",
          sheetType: "00:13:25",
          taskKey: "2.80%",
          templateUrl: "/shijian_02"
        },
        {
          id: 8,
          type1: "总计",
          sheetType: "00:18:19",
          taskKey: "3.82%",
          templateUrl: "/shijian_04"
        }
      ],
      tableData: [],
      FileView: "",
      value: [],
      rowList: [],
      spanArr: [],
      position: 0,
      listData: [],
      listData1: [],
      listData2: []
    };
  },
  methods: {
    queryData() {
      //查询操作
      this.listData = [
        {
          id: 1,
          type1: "等待时间",
          sheetType: "16:00:00",
          taskKey: "66.67%",
          templateUrl: "/shijian_01"
        },
        {
          id: 2,
          type1: "运行时间",
          sheetType: "08:00:00",
          taskKey: "33.33%",
          templateUrl: "/shijian_02"
        },
        {
          id: 3,
          type1: "总计",
          sheetType: "24:00:00",
          taskKey: "100%",
          templateUrl: "/shijian_04"
        }
      ];
      //查询操作
      this.listData1 = [
        {
          id: 1,
          type1: "损失的速度",
          sheetType: "34units/min",
          taskKey: "30.13%",
          templateUrl: "/shijian_01"
        },
        {
          id: 2,
          type1: "实际速度",
          sheetType: "84units/min",
          taskKey: "69.33%",
          templateUrl: "/shijian_02"
        },
        {
          id: 3,
          type1: "最大速度",
          sheetType: "120units/min",
          taskKey: "100%",
          templateUrl: "/shijian_04"
        }
      ];
      //查询操作
      this.listData2 = [
        {
          id: 1,
          type1: "次品产量",
          sheetType: "1537units",
          taskKey: "4.67%",
          templateUrl: "/shijian_01"
        },
        {
          id: 2,
          type1: "合格产量",
          sheetType: "32341units",
          taskKey: "95.33%",
          templateUrl: "/shijian_02"
        },
        {
          id: 3,
          type1: "总计",
          sheetType: "32878units",
          taskKey: "100%",
          templateUrl: "/shijian_04"
        }
      ];
      this.rowspan();
    },
    rowspan() {
      this.listData.forEach((item, index) => {
        if (index === 0) {
          this.spanArr.push(1);
          this.position = 0;
        } else {
          if (this.listData[index].type === this.listData[index - 1].type) {
            this.spanArr[this.position] += 1;
            this.spanArr.push(0);
          } else {
            this.spanArr.push(1);
            this.position = index;
          }
        }
      });
      this.listData1.forEach((item, index) => {
        if (index === 0) {
          this.spanArr.push(1);
          this.position = 0;
        } else {
          if (this.listData[index].type === this.listData[index - 1].type) {
            this.spanArr[this.position] += 1;
            this.spanArr.push(0);
          } else {
            this.spanArr.push(1);
            this.position = index;
          }
        }
      });
    },

    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      //表格合并行
      if (columnIndex === 3) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
    },
    // 获取今天是一年的第几周
   getWeekOfYear(){
     var today = new Date();
     var firstDay = new Date(today.getFullYear(),0, 1);
     var dayOfWeek = firstDay.getDay();
     var spendDay= 1;
     if (dayOfWeek !=0) {
      spendDay=7-dayOfWeek+1;
     }
     firstDay = new Date(today.getFullYear(),0, 1+spendDay);
     var d =Math.ceil((today.valueOf()- firstDay.valueOf())/ 86400000);
     var result =Math.ceil(d/7);
    console.log(result+1)
     return result+1;
    }, 
    // 星期几
    WeekFun(){
      var weekData="日一二三四五六"
      var str ='星期'+weekData.charAt(new Date().getDay());
      this.Week=str;
      // console.log(str);
    }
  },
  mounted() {
    this.queryData();
    this.getWeekOfYear()//第几周
    this.WeekFun()//星期几
    this.Year=this.$moment(new Date()).format('YYYY')
    this.month=this.$moment(new Date()).format('MM')
    this.day=this.$moment(new Date()).format('DD')
  }
};
</script>


<style lang='scss'>
@import "./assets/styles/common";
#OEE {
  .el-table td, .el-table th.is-leaf {
    border-bottom: solid 1px #EBEEF5 !important;
}
  width: 100%;
  height: 100%;
  .OEEleft {
    width: 49.5%;
    height: 100%;
    float: left;
    background: #ebeef7;
    margin-bottom: 20px;
  }
  .oeeUl li {
    width: 16.6%;
    float: left;
    height: 80px;
    font-size: 18px;
    text-align: center;
    line-height: 80px;
    border: solid 1px #ddd;
    background-color: #fff;
    img {
      width: 80px;
      height: 75px;
    }
  }
  .OEEright {
    width: 49.5%;
    height: 100%;
    float: right;
    // background: #ac0;

    .oeeU2 li {
      line-height: 25px;
      &:nth-child(1) {
        line-height: 80px;
      }
    }
    .sun1 {
      background-color: #d0d7dd;
      height: 48px;
      line-height: 48px;
      font-size: 16px;
    }
    .sunLeft {
      float: left;
      width: 30%;
      border: solid 1px #ddd;
      height: 22px;
      box-sizing: border-box;
      line-height: 22px;
      border-bottom: none;
    }
    .sunRight {
      float: left;
      width: 70%;
      border-right: solid 1px #ddd;
    }
    .sunUl li {
      height: 22px;
      border: solid 1px #ddd;
      box-sizing: border-box;
      border-bottom: none;
          border-right: none;
    }
    .zerCon{
      height: 226px;
    border: solid 1px #ddd;
    width: 100%;
    }
    .tcON{
      height: 15px;
      background-color: #ffc097;
    }
  }
  .listTable {
    margin-bottom: 10px;
    .conHe {
      height: 100%;
      width: 40%;
      float: left;
      p {
        margin-top: 50px;
      }
    }
    .conHe:nth-child(2) {
      width: 20%;
    }
    .conHe:nth-child(3) {
      float: right;
      p {
        margin-top: 71px;
        margin-left: 8px;
      }
    }
    .con1 {
      height: 80px;
      background-color: #fcbe8f;
    }
    .con2 {
      height: 30px;
      background-color: #8eb2d6;
    }
  }
  thead tr:nth-child(2) {
    display: none !important;
  }
  // .zerDiv{
  //   margin:5px 0px;
  // }
  .zeroUL li {
    width: 25%;
    float: left;
    height: 48px;
    background-color: #d0d7e1;
    line-height: 48px;
    font-size: 16px;
  }
  .zeroUL1 li {
    width: 25%;
    float: left;
    height: 48px;
    background-color: #ecf0f3;
    line-height: 48px;
    border: solid 1px #ddd;
    box-sizing: border-box;
  }
  .zeroUL2 li {
    width: 25%;
    float: left;
    height: 130px;
    background-color: #ecf0f3;
    line-height: 48px;
    border: solid 1px #ddd;
    box-sizing: border-box;
  }
  .widthCom {
    width: 40px;
    height: 20px;
    background-color: #fff;
    margin: 0 auto;
    border: solid 1px #ddd;
    border-bottom: none;
    margin-top: 9px;
  }
  .widthCom1 {
    width: 40px;
    height: 90px;
    background-color: #90b1d4;
    margin: 0 auto;
    border: solid 1px #ddd;
  }

  .widthCom3 {
    width: 40px;
    height: 40px;
    background-color: #fff;
    margin: 0 auto;
    border: solid 1px #ddd;
    border-bottom: none;
    margin-top: 9px;
  }
  .widthCom4 {
    width: 40px;
    height: 70px;
    background-color: #90b1d4;
    margin: 0 auto;
    border: solid 1px #ddd;
  }

  .widthCom5 {
    width: 40px;
    height: 10px;
    background-color: #fff;
    margin: 0 auto;
    border: solid 1px #ddd;
    border-bottom: none;
    margin-top: 9px;
  }
  .widthCom6 {
    width: 40px;
    height: 100px;
    background-color: #90b1d4;
    margin: 0 auto;
    border: solid 1px #ddd;
  }

  .widthCom7 {
    width: 80px;
    height: 30px;
    background-color: #fff;
    margin: 0 auto;
    border: solid 1px #ddd;
    border-bottom: none;
    margin-top: 9px;
  }
  .widthCom8 {
    width: 80px;
    height: 80px;
    background-color: #dd9598;
    margin: 0 auto;
    border: solid 1px #ddd;
  }
}
</style>
