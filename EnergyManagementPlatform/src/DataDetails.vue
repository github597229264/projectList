<template>
  <div class="DataDetails" id="DataDetails">
    <div class="Navigation" v-show="NavigationB">{{NavigationCon}}</div>
    <div class="topCon">
      <ul>
        <li
          v-for="(item,index) in inTop"
          :class="{activeLi:item.name==surename}"
          @click="clickLi(item)"
          :key="index"
        >{{item.name}}</li>
      </ul>
    </div>
    <!-- 趋势的版块 -->
    <div class="TrendBox publicBox" v-show="TrendBox">
      <div class="overview">
        <div class="header">
          <span style="float:left;margin-top:1.5%">数据源搜索</span>
          <span style="float:right">
            <!-- <el-select
              v-model="valueRate"
              filterable
              placeholder="频率"
              style="width:160px;margin-right: 8px; "
              id="AllDept"
            >
              <el-option
                v-for="(item,index) in valueRateOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select> -->
            <el-select
              v-model="valueType"
              filterable
              placeholder="趋势类型"
              style="width:160px;margin-right: 8px;"
              id="AllDept1"
              @change="TypeOptionsFun()"
            >
              <el-option
                v-for="(item,index) in groupTypeOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <!-- <el-select
              v-model="valueDept"
              filterable
              placeholder="查看类型"
              style="width:160px;margin-right: 8px;"
              id="AllDept2"
            >
              <el-option
                v-for="(item,index) in groupOptions"
                :key="index"
                :label="item.label"
                :value="item.category_id"
              ></el-option>
            </el-select> -->
            <el-select
              v-model="TimeLimitV"
              filterable
              placeholder="过去六月"
              style="width:160px;margin-right: 8px;"
              id="AllDept3"
              @change='OldFun'
            >
              <el-option
                v-for="(item,index) in TimeLimit"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <!-- <el-select
              v-model="valueDept"
              filterable
              placeholder="数据源类型"
              style="width:160px;margin-right: 8px;"
              id="AllDept4"
            >
              <el-option
                v-for="(item,index) in groupOptions"
                :key="index"
                :label="item.label"
                :value="item.category_id"
              ></el-option>
            </el-select> -->
            <!-- <el-date-picker v-model="value1" type="date" placeholder="选择日期" style="width: 160px;"></el-date-picker> -->
            <!-- datetimerange -->
            <el-date-picker
              v-model="QvalueData"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 230px;"
              @change="QDataChangeFun(QvalueData)"
            ></el-date-picker>
          </span>
        </div>
        <div id="historyCharts" style="width:100%;height:600px"></div>
      </div>
    </div>
    <!-- 数据 -->
    <div class="DataBox publicBox" v-show="DataBox">
      <div class="overview" id="Pmain">
        <div class="header" style="z-index: 99;">
          <span style="float:right">
            <el-date-picker
              v-model="valueData"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 230px;"
              @change="DataChangeFun(valueData)"
            ></el-date-picker>
            <el-select
              v-model="valueDept"
              filterable
              placeholder="频率"
              style="width:160px;margin-right: 8px;"
              id="AllDept1"
            >
              <el-option
                v-for="(item,index) in groupOptions"
                :key="index"
                :label="item.label"
                :value="item.category_id"
              ></el-option>
            </el-select>
          </span>
        </div>
        <!-- 数据滑块 -->
        <!-- <div id="main" style="width:100%;height:400px;"></div> -->
        <el-table
          :data="tableDataRec"
          stripe
          style="width: 100%;"
          :cell-style="cellStyle"
          :header-cell-style="headerStyle"
          class="DataTable"
          :row-class-name="tableRowClassName"
        >
          <el-table-column prop="time" label="日期 "></el-table-column>
          <el-table-column prop="reader" label="数量"></el-table-column>
          <el-table-column prop="Factor" label="转换单位"></el-table-column>
          <el-table-column prop="consumption" label="单位价格"></el-table-column>
          <el-table-column prop="cost" label="费用"></el-table-column>
          <el-table-column prop="desc" label="备注"></el-table-column>
        </el-table>
         <!-- <el-pagination
    layout="prev, pager, next" prev-text="上一页" next-text="下一页"
    :total="totalPage" :page-size="pageSize">
  </el-pagination> -->
      </div>
    </div>
    <!-- 目标和报警 -->
    <div class="TargetBox publicBox" v-show="TargetBox">
      <div class="overview">
        <p class="header">
          <span style="color:#303030">价格搜索</span>
          <span class="fr el-icon-plus" @click="newPolice" style="cursor: pointer;">添加新警报</span>
          <span
            class="fr el-icon-plus"
            @click="newTarget"
            style="cursor: pointer;color: #496fec!important;margin-top: -7px;right: 120px"
          >添加新目标</span>
        </p>
        <div>
          <p class="hetop">目标</p>
          <el-table
            :data="tableDataTarget"
            stripe
            style="width: 100%;"
            :cell-style="cellStyle"
            :header-cell-style="headerStyle"
            :row-class-name="tableRowClassName"
          >
            <el-table-column prop="name" label="目标类型 "></el-table-column>
            <el-table-column prop="time" label="日期开始"></el-table-column>
            <el-table-column prop="state" label="日期结束"></el-table-column>
            <el-table-column prop="state" label="整合"></el-table-column>
            <el-table-column prop="state" label="数据源"></el-table-column>
            <el-table-column prop="state" label="目标"></el-table-column>
            <el-table-column label="选项" width="240">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  @click="goLightTimeSet(scope.row)"
                  size="small"
                  class="detailsBtn"
                >
                  <i class="el-icon-edit"></i> 编辑
                </el-button>
                <el-button type="text" size="small" @click="delTime(scope.row)" class="delBtn">
                  <i class="el-icon-circle-close"></i> 删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div>
          <p class="hetop">警报</p>
          <el-table
            :data="tableDataPolice"
            stripe
            style="width: 100%;"
            :cell-style="cellStyle"
            :header-cell-style="headerStyle"
            :row-class-name="tableRowClassName"
          >
            <el-table-column prop="name" label="启动 "></el-table-column>
            <el-table-column prop="time" label="用户"></el-table-column>
            <el-table-column prop="state" label="分发列表"></el-table-column>
            <el-table-column prop="state" label="使用可信度闲置触发报警 "></el-table-column>
            <el-table-column prop="state" label="数最低连续前警报"></el-table-column>
            <el-table-column label="选项" width="240">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  @click="goLightTimeSet(scope.row)"
                  size="small"
                  class="detailsBtn"
                >
                  <i class="el-icon-edit"></i> 编辑
                </el-button>
                <el-button type="text" size="small" @click="delTime(scope.row)" class="delBtn">
                  <i class="el-icon-circle-close"></i> 删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!-- 创建报警 -->
      <el-dialog :title="diaTitle" :visible.sync="centerDialogVisible1" width="30%" center>
        <el-form ref="form" :model="form" label-width="100px" label-position="left">
          <div style="overflow: hidden;margin-bottom: 15px;">
            <el-form-item label="启用">
                <el-checkbox label name="type"></el-checkbox>
          </el-form-item>
            <!-- <p style="float:left;margin-left:50px">
              <span>使用可信度闲置触发报警</span>
              <el-checkbox label name="type"></el-checkbox>
            </p> -->
          </div>
          <el-form-item label="电子邮箱">
            <img src="./assets/img/DataDetails/xing.png" alt class="sign" />
            <el-input v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item label="报警间隔">
            <img src="./assets/img/DataDetails/xing.png" alt class="sign" />
            <el-input v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item label="报警升级">
            <el-checkbox label name="type"></el-checkbox>
          </el-form-item>
          <el-form-item label="分发列表">
            <el-input v-model="form.desc" placeholder="分发列表"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible1 = false">取消</el-button>
          <el-button type="primary">完成</el-button>
        </span>
      </el-dialog>
      <el-dialog :title="diaTitle" :visible.sync="centerDialogVisible2" width="800px !important" center>
        <ul class="Tip">
          <li>
            <img src="./assets/img/DataDetails/S_1.png" alt class="TipPic" @click="PicBFun_1" />
            <img src="./assets/img/AllOverview/Choose.png" alt class="ChoosePic" v-show="PicB_1" />
            <div class="TipCon">
              <p>创建固定目标</p>
              <p>创建目标设定帮助</p>
            </div>
          </li>
          <li>
            <img src="./assets/img/DataDetails/S_2.png" alt class="TipPic" @click="PicBFun_2" />
            <img src="./assets/img/AllOverview/Choose.png" alt class="ChoosePic" v-show="PicB_2" />
            <div class="TipCon">
              <p>创建回归目标</p>
              <p>该目标的生成，根据两个数据之间的相关性而生成,例如或者是目标设定的或者是导航控制台选定的。</p>
            </div>
          </li>
        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible2 = false">取消</el-button>
          <el-button type="primary" @click="NextGo">下一步</el-button>
        </span>
      </el-dialog>
      <!-- 固定目标的弹框 -->
      <el-dialog :title="diaTitle" :visible.sync="FixedTarget" width="600px !important" center>
        <el-form ref="form" :model="form" label-width="100px" label-position="left">
          <el-form-item label="日期开始">
            <el-date-picker v-model="form.time" type="date" placeholder="选择日期时间"></el-date-picker>
            <i
              class="el-icon-date"
              style="position: absolute;top: 13px;right: 25px;color: #496fec;font-weight: 600;"
            ></i>
          </el-form-item>
          <el-form-item label="目标">
            <!-- <el-input v-model="form.target" style="width:100%;float:left"></el-input> -->
            <el-input v-model="form.target" ></el-input>
            <!-- <span style="margin-left:14px">/</span> -->
            <!-- <el-form-item label style="width:45%;float:right">
              <el-select v-model="form.group" placeholder="选择">
                <el-option
                  v-for="item in groupOptions"
                  :key="item.category_id"
                  :label="item.name"
                  :value="item.category_id"
                ></el-option>
              </el-select>
            </el-form-item> -->
          </el-form-item>
          <!-- <el-form-item label="确定什么是良好的性能">
            <el-select v-model="form.group" placeholder="选择">
              <el-option
                v-for="item in groupOptions"
                :key="item.category_id"
                :label="item.name"
                :value="item.category_id"
              ></el-option>
            </el-select>
          </el-form-item> -->
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="FixedTarget = false;">取消</el-button>
          <el-button type="primary" @click="targetSubmit">完成</el-button>
        </span>
      </el-dialog>
      <!-- 创建回归目标的弹框 -->
      <el-dialog :title="diaTitle" :visible.sync="ReturnTarget" width="630px !important" center>
        <el-form ref="form" :model="form" label-width="100px" label-position="left">
          <el-form-item label="日期开始">
            <el-date-picker v-model="form.time" type="date" placeholder="选择日期时间"></el-date-picker>
            <i
              class="el-icon-date"
              style="position: absolute;top: 13px;right: 25px;color: #496fec;font-weight: 600;"
            ></i>
          </el-form-item>
          <!-- <el-form-item label="确定什么是良好的性能">
            <el-select v-model="form.group" placeholder="选择">
              <el-option
                v-for="item in groupOptions"
                :key="item.category_id"
                :label="item.name"
                :value="item.category_id"
              ></el-option>
            </el-select>
          </el-form-item> -->
          <!-- <el-form-item label="数据频率">
            <el-select v-model="form.group" placeholder="选择">
              <el-option
                v-for="item in groupOptions"
                :key="item.category_id"
                :label="item.name"
                :value="item.category_id"
              ></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="数据源">
            <!-- <el-input v-model="form.desc"></el-input> -->
                <el-cascader
            v-model="value"
            :options="Importoptions"
            @change="handleChange"></el-cascader>
          </el-form-item>
          <!-- <el-form-item label="时限">
            <el-select v-model="form.TimeLimitV" placeholder="选择">
              <el-option
                v-for="item in TimeLimit"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="请选择一个比较源">
            <el-select v-model="form.group" placeholder="选择">
              <el-option
                v-for="item in groupOptions"
                :key="item.category_id"
                :label="item.name"
                :value="item.category_id"
              ></el-option>
            </el-select>
          </el-form-item> -->
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="FixedTarget = false">取消</el-button>
          <el-button type="primary" @click='HSave'>完成</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 创建新数据源的弹框 点击手动数据源时出现-->
    <el-dialog title="创建新的数据源" :visible.sync="NewTarget" width="1000px" center id="AutoBox">
      <p>数据源的名称和位置：</p>
      <el-form ref="form" :model="form" label-width="100px" label-position="left">
        <div style="overflow: hidden;">
          <el-form-item label="Strata ID：" style="width:40%;float:left">
            <el-input v-model="form.desc" placeholder="National Grid"></el-input>
          </el-form-item>
          <el-form-item label="数据源名称：" style="width:40%;float:left;margin-left:10%">
            <el-input v-model="form.desc" placeholder></el-input>
          </el-form-item>
          <el-form-item label="读书收集：" style="width:40%;float:left;">
            <el-select v-model="form.group" placeholder="手动">
              <el-option
                v-for="item in groupOptions"
                :key="item.category_id"
                :label="item.name"
                :value="item.category_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="抄表：" style="width:40%;float:left;margin-left:10%">
            <el-select v-model="form.group" placeholder="选择">
              <el-option
                v-for="item in groupOptions"
                :key="item.category_id"
                :label="item.name"
                :value="item.category_id"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <p>实用成绩设置:</p>
        <div style="overflow: hidden;">
          <el-form-item label="效用：" style="width:40%;float:left;">
            <el-select v-model="form.group" placeholder="手动">
              <el-option
                v-for="item in groupOptions"
                :key="item.category_id"
                :label="item.name"
                :value="item.category_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="输入单位：" style="width:40%;float:left;margin-left:10%">
            <el-select v-model="form.group" placeholder="选择">
              <el-option
                v-for="item in groupOptions"
                :key="item.category_id"
                :label="item.name"
                :value="item.category_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="乘法：" style="width:40%;float:left;">
            <el-select v-model="form.group" placeholder="手动">
              <el-option
                v-for="item in groupOptions"
                :key="item.category_id"
                :label="item.name"
                :value="item.category_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="报告单位：" style="width:40%;float:left;margin-left:10%">
            <el-input v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item label="小数位数：" style="width:40%;float:left;">
            <el-input v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item label="仪表类型：" style="width:40%;float:left;margin-left:10%">
            <el-select v-model="form.group" placeholder="选择">
              <el-option
                v-for="item in groupOptions"
                :key="item.category_id"
                :label="item.name"
                :value="item.category_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="价格：" style="width:40%;float:left">
            <el-select v-model="form.group" placeholder="选择">
              <el-option
                v-for="item in groupOptions"
                :key="item.category_id"
                :label="item.name"
                :value="item.category_id"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <p>可信度设置:</p>
        <div style="overflow: hidden;">
          <el-form-item label="最大读数：" style="width:40%;float:left;">
            <el-input v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item label="最小读数：" style="width:40%;float:left;margin-left:10%">
            <el-input v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item label="限制Y轴：" style="width:40%;float:left;">
            <el-input v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item label="轴最大：" style="width:40%;float:left;margin-left:10%">
            <el-input v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item label="轴最小：" style="width:40%;float:left;">
            <el-input v-model="form.desc"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="FixedTarget = false">取消</el-button>
        <el-button type="primary">完成</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import echarts from "echarts";
import { setTimeout } from "timers";
let ecStat = require("echarts-stat");
export default {
  name: "DataDetails",
  data() {
    return {
      DataTarget:localStorage.getItem('target')==undefined?50:localStorage.getItem('target'),
      NavigationB:true,
      NavigationCon:'',//导航的内容
      valueType:0,//趋势类型的值
      mychart: null,
      BigArr: [], //滑块的值
      StartDate: "", //滑块开始时间
      EndDate: "", //滑块结束时间
      value1: "", //创建目标的开始时间
      PicB_1: false,
      PicB_2: false,
      activeName: "first",
      groupOptions: [],
      valueRate:'',//频率
      valueDept: "", //所有部门
      diaTitle: "创建报警",
      // diaTitle1:"创建目标",
      surename: "趋势",
      TrendBox: true, //趋势的盒子
      DataBox: false, //数据的盒子
      TargetBox: false, //数据的盒子
      QvalueData:[],//趋势版块时间间隔的值
      // QvalueData: [
      //   new Date(new Date().setHours(0, 0, 0, 0)),
      //   new Date(new Date().setHours(23, 59, 59, 59))
      // ], //趋势数据的时间值
      valueData: [
        (this.$moment(new Date()).format('YYYY-MM'))+'-01',
        new Date(new Date().setHours(23, 59, 59, 59))
      ], //数据的时间值
      Hvalue: [], //滑块的坐标值
      // NewHvalue: [], //滑块的坐标值
      QHvalue:[],//趋势滑块的坐标值
      inTop: [
        //切换导航菜单
        {
          name: "趋势"
        },
        {
          name: "数据"
        },
        {
          name: "目标和报警"
        }
        // {
        //   name: "设置"
        // }
      ],
      valueRateOptions:[
        {
          label: "5分钟",
          value: 0
        },
         {
          label: "15分钟",
          value: 1
        },
         {
          label: "30分钟",
          value: 2
        },
         {
          label: "1小时",
          value: 3
        },

      ],
      groupTypeOptions:[
         {
          label: "固定趋势图",
          value: 0
        },
         {
          label: "回归趋势图",
          value: 1
        },
      ],//趋势类型
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶",
          disabled: true
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      tableDataRec: [],//数据的表格
      tableDataTarget:[],
      tableDataPolice:[],
      totalPage: 0,
      pageSize: 10,
      centerDialogVisible1: false, //创建报警弹框
      centerDialogVisible2: false, //创建目标弹框
      FixedTarget: false, //创建固定目标
      ReturnTarget: false, //创建回归目标
      NewTarget: false, //创建自动数据源
      form: {
        id: 0,
        OK: "",
        trigger: "",
        state: "",
        ifused: false,
        group: "",
        cycle: "",
        desc: "",
        target:'',
      },
      // historyCharts:null,
      TimeLimit: [
        {
          value: "1",
          label: "过去1个月"
        },
        {
          value: "2",
          label: "过去2个月"
        },
        {
          value: "3",
          label: "过去3个月"
        },
        {
          value: "4",
          label: "过去4个月"
        },
        {
          value: "5",
          label: "过去5个月"
        },
        {
          value: "6",
          label: "过去6个月"
        }
      ],
      TimeLimitV: "",
      groupOptions: [],
      MonthTop:'',//过去某月的开始月份
      option1:'',
      Importoptions: [
         {
          value: 'fst',
          label: '法士特',
          children: [{
            value: 'chongqing',
            label: '重庆工厂',
            children: [{
              value: 'D1',
              label: '电表1电量'
            }, {
              value: 'D2',
              label: '电表2电量'
            }, {
              value: 'Q1',
              label: '气表1流量'
            }]
          }, {
            value: 'shenyang',
            label: '沈阳工厂',
            children: [{
              value: 'Q2',
              label: '气表2流量'
            }, {
              value: 'shengchan',
              label: '生产数据'
            }]
          }]
        }, 
         {
          value: 'hstp',
          label: '海斯坦普',
          children: [{
            value: 'chongqing',
            label: '重庆工厂',
            children: [{
              value: 'D1',
              label: '电表1电量'
            }, {
              value: 'D2',
              label: '电表2电量'
            }, {
              value: 'Q1',
              label: '气表1流量'
            }]
          }, {
            value: 'shenyang',
            label: '沈阳工厂',
            children: [{
              value: 'Q2',
              label: '气表2流量'
            }, {
              value: 'shengchan',
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
        var N=value[value.length-1]
        console.log();
        if(N=='D1'){
          this.DataName='电表1电量'
        }else if(N=='D2'){
          this.DataName='电表2电量'
        }else if(N=='Q1'){
          this.DataName='气表1流量'
        }else if(N=='Q2'){
          this.DataName='气表2流量'
        }else if(N=='shengchan'){
          this.DataName='生产数据'
        }
      },
    getdatatime(){//默认显示今天
      var TimeS=(this.$moment(new Date()).format('YYYY-MM'))+'-01'
      this.QvalueData.push(TimeS,this.$moment(new Date()).format("YYYY-MM-DD"));   
    },
    // Tab表格的切换
    clickLi(item) {
      //切换导航菜单
      this.surename = item.name;
      if (item.name == "趋势") {
        this.TrendBox = true;
        this.DataBox = false;
        this.TargetBox = false;
        // this.Hvalue = [];
        this.QHvalue = [];   
        this.QHvalue.push((this.$moment(new Date()).format('YYYY-MM'))+'-01');
        this.QHvalue.push(this.$moment(this.valueData[1]).format("YYYY-MM-DD"));
        this.QvalueData=[(this.$moment(new Date()).format('YYYY-MM'))+'-01',this.$moment(this.valueData[1]).format("YYYY-MM-DD")]//初始化开始的值
        this.QDataChangeFun(this.QHvalue)
        console.log(this.option1)
        this.TimeLimitV=''//过去几个月的选框为空
        console.log("dddddddddddddd")
      } else if (item.name == "数据") {
        this.TrendBox = false;
        this.DataBox = true;
        this.TargetBox = false;
        this.Hvalue = [];
        this.Hvalue.push(this.$moment(this.valueData[0]).format("YYYY-MM-DD"));
        this.Hvalue.push(this.$moment(this.valueData[1]).format("YYYY-MM-DD"));
        this.valueData=[(this.$moment(new Date()).format('YYYY-MM'))+'-01',this.$moment(new Date()).format("YYYY-MM-DD")]//数据模块的时间插件
        this.DataChangeFun(this.valueData)
      } else if (item.name == "目标和报警") {
        this.TrendBox = false;
        this.DataBox = false;
        this.TargetBox = true;
      }
    },
    // 创建目标的固定目标
    PicBFun_1() {
      this.PicB_2 = false;
      this.PicB_1 = true;
    },
    // 创建目标的回归目标
    PicBFun_2() {
      this.PicB_1 = false;
      this.PicB_2 = true;
    },
    
    // 点击弹框的下一步
    NextGo() {
      if (this.PicB_1 == true) {
        this.FixedTarget = true;
        this.diaTitle = "创建固定目标";
        this.centerDialogVisible2 = false; //创建目标弹框
      } else if (this.PicB_2 == true) {
        this.ReturnTarget = true;
        this.diaTitle = "创建回归目标";
        this.centerDialogVisible2 = false; //创建目标弹框
      } else {
        this.$message({
          type: "warning",
          message: "请选择目标类型"
        });
        this.centerDialogVisible2 = true; //创建目标弹框
      }
    },
    //   新增目标
    newTarget() {
      this.PicB_1 = false;
      this.PicB_2 = false;
      this.centerDialogVisible2 = true;
      this.diaTitle = "创建目标";
    },
    // 新增报警
    newPolice() {
      this.centerDialogVisible1 = true;
      this.diaTitle = "创建报警";
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 点击新增固定目标的确定时
    targetSubmit(){    
      localStorage.setItem('target',this.form.target)
      localStorage.setItem('Htarget',0)
      this.DataTarget=this.form.target
      this.FixedTarget = false;
      // this.ChartFun(this.QHvalue)
      // if(!Htarget){
      //   var Sarr=this.option1.series
      //   var Arr=Sarr.pop()
      //   console.log(this.option1)
      //   this.option1.series.markLine.data=[{
      //               yAxis: this.DataTarget,
      //           }]
      //   this.option1.series=Sarr
      //   this.historyCharts = this.echarts.init(
      //     document.getElementById("historyCharts")
      //   ); //定义
      //   this.historyCharts.clear();
      //   this.historyCharts.setOption(this.option1,true); //展示
      // }
    },
    // 趋势版块的时间变化
    QDataChangeFun(v){
      this.TimeLimitV=''
      let dateValueStart = this.$moment(v[0]).format("YYYY-MM-DD");
      let dateValueEnd = this.$moment(v[1]).format("YYYY-MM-DD");
      this.QHvalue = [];
      this.QHvalue.push(dateValueStart);
      this.QHvalue.push(dateValueEnd);
      this.QHvalue=this.getYearAndMonthAndDay(dateValueStart, dateValueEnd); //调用获取时间段之间的所有时间
       if(this.valueType==0){
         var Htarget=JSON.parse(localStorage.getItem('Htarget'))
         this.ChartFun(this.QHvalue)
         if(Htarget != 0){
            var obj= {
            name: "数据",
            type: "line",
            smooth: true,
            symbol: "none",
            sampling: "average",
            itemStyle: {
              color: "red"
            },
            data: Htarget,
            markLine: {
                silent: true,
                lineStyle:{
                    color: "red",
                },    
            }
          }
         
        this.option1.series[0].markLine.data=[]
        this.option1.series.push(obj)
        this.historyCharts = this.echarts.init(
          document.getElementById("historyCharts")
        ); //定义
        this.historyCharts.clear();
        this.historyCharts.setOption(this.option1,true); //展示
        
         }else{
           this.ChartFun(this.QHvalue)
           this.option1.series[0].markLine.data=[{
                    yAxis: this.DataTarget
               }]
          console.log(this.option1.series[0].markLine.data)
          this.historyCharts = this.echarts.init(document.getElementById("historyCharts"))//定义
          this.historyCharts.clear();
          this.historyCharts.setOption(this.option1,true); //展示 
         }
               
      }else{
        this.RegChartFun(this.QHvalue)
      }

    },
    //数据版块的时间插件变化的函数
    DataChangeFun(v) {
      let dateValueStart = this.$moment(v[0]).format("YYYY-MM-DD");
      let dateValueEnd = this.$moment(v[1]).format("YYYY-MM-DD");
      this.Hvalue = [];
      this.Hvalue.push(dateValueStart);
      this.Hvalue.push(dateValueEnd);
      this.Hvalue =this.getYearAndMonthAndDay(dateValueStart, dateValueEnd); //调用获取时间段之间的所有时间
      this.getTable();
    },
    // 定义getDate
    getDate(datestr) {
      var temp = datestr.split("-");
      var date = new Date(temp[0], temp[1], temp[2]);
      return date;
    },
    // 拿到一个时间段时获取中间所有的时间
    getYearAndMonthAndDay(start, end) {
      var date_all = [],
        i = 0;
      var startTime = this.getDate(start);
      var endTime = this.getDate(end);
      while (endTime.getTime() - startTime.getTime() >= 0) {
        var year = startTime.getFullYear();
        var month =
          startTime.getMonth().toString().length == 1
            ? "0" + startTime.getMonth().toString()
            : startTime.getMonth().toString();
           
        var day =
          startTime.getDate().toString().length == 1
            ? "0" + startTime.getDate()
            : startTime.getDate();  
        date_all[i] = year + "-" + month + "-" + day;
        startTime.setDate(startTime.getDate() + 1);
        i += 1;
      }
      //date_all要的时间间隔中的所有时间
      return date_all;
    },

  
    // 趋势图
    ChartFun(QH) {
      var data = [Math.random() * 100];

      for (var i = 1; i < 200; i++) {
        data.push(Math.random() * 100);
      }
      this.option1 = {
        tooltip: {
        trigger: 'axis',
        position: function (pt) {
            return [pt[0], '10%'];
        }
        },
        xAxis: {
          type: "category",
          axisLine: {
            lineStyle: {
              color: "#eee" // x坐标轴的轴线颜色
            }
          },
          axisLabel: {
            color: "#707070" //刻度线标签颜色
          },
          data:QH
        },
        yAxis: {
          type: "value",
          title:'gW',
          axisLabel: {
            color: "#707070", //刻度线标签颜色
            // formatter:'{value}()'
          },
          axisLine: {
            lineStyle: {
              color: "#fff" // x坐标轴的轴线颜色
            }
          }
        },
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 100  
          },
          {
            start: 0,
            end: 10,
            handleIcon:
              "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
            handleSize: "80%",
            handleStyle: {
              color: "#fff",
              shadowBlur: 3,
              shadowColor: "rgba(0, 0, 0, 0.6)",
              shadowOffsetX: 2,
              shadowOffsetY: 2
            }
          }
        ],
        series: [
          {
            name: "数据",
            type: "line",
            smooth: true,
            symbol: "none",
            sampling: "average",
            itemStyle: {
              color: "#5da4da"
            },
            data: data,
            markLine: {
                silent: true,
                lineStyle:{
                    color: "red",
                },    
                data: [{
                    yAxis: this.DataTarget,
                }]
            }
          },
        ]
      };

      this.historyCharts = this.echarts.init(
        document.getElementById("historyCharts")
      ); //定义
      this.historyCharts.clear();
      this.historyCharts.setOption(this.option1,true); //展示
    },
    // 回归图
    RegChartFun(QH){
      var data=[]  
      for(var i=0;i<QH.length;i++){
         data.push([Math.random()*10,Math.random()*10])
      }
    var myRegression = ecStat.regression('linear', data);
    myRegression.points.sort(function(a, b) {
        return a[0] - b[0];
    });

    var option1 = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        xAxis: {
            type: 'value',
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            },
        },
        yAxis: {
            type: 'value',
            min: 0,
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            },
        },
        series: [{
            name: 'scatter',
            type: 'scatter',
            label: {
                emphasis: {
                    show: true,
                    position: 'left',
                    textStyle: {
                        color: 'blue',
                        fontSize: 16
                    }
                }
            },
            data: data
        }, {
            name: 'line',
            type: 'line',
            showSymbol: false,
            data: myRegression.points,
            markPoint: {
                itemStyle: {
                    normal: {
                        color: 'transparent'
                    }
                },
                label: {
                    normal: {
                        show: true,
                        position: 'left',
                        formatter: myRegression.expression,
                        textStyle: {
                            color: '#333',
                            fontSize: 14
                        }
                    }
                },
                data: [{
                    coord: myRegression.points[myRegression.points.length - 1]
                }]
            }
        }]
    };

      this.historyCharts = this.echarts.init(
        document.getElementById("historyCharts")
      ); //定义
      this.historyCharts.clear();
      this.historyCharts.setOption(option1,true); //展示
    },

    //  获取过去几个月的时间
      getPreMonth(date,Num) { 
        var arr = date.split('-'); 
        var year = arr[0]; //获取当前日期的年份 
        var month = arr[1]; //获取当前日期的月份 
        var day = arr[2]; //获取当前日期的日 
        var days = new Date(year, month, 0); 
        days = days.getDate(); //获取当前日期中月的天数 
        var year2 = year; 
        var month2 = parseInt(month) - Num; 
        if (month2 == 0) { 
            year2 = parseInt(year2) - 1; 
            month2 = 12; 
        } 
        var day2 = day; 
        var days2 = new Date(year2, month2, 0); 
        days2 = days2.getDate(); 
        if (day2 > days2) { 
            day2 = days2; 
        } 
        if (month2 < 10) { 
            month2 = '0' + month2; 
        } 
        var t2 = year2 + '-' + month2 + '-' + day2; 
        this.MonthTop=year2 + '-' + month2
        var T2=t2.split('-')
        this.getDaysInMonth(T2[0],T2[1])
    },
    // 切换过去的几个月的时间插件的时候
    OldFun(){   
      var Y=parseInt(this.$moment(this.QvalueData[0]).format("YYYY"))
      var M=parseInt(this.$moment(this.QvalueData[0]).format("MM"))
      var samllM=M - this.TimeLimitV
      var OldS=Y +'-'+ samllM +'-'+ '01'
      var OldE=this.$moment(this.QvalueData[0]).format("YYYY-MM-DD")
      var D=this.getYearAndMonthAndDay(OldS,OldE)
      if(this.valueType==0){
        var Htarget=JSON.parse(localStorage.getItem('Htarget'))
         this.ChartFun(D)
         if(Htarget != 0){
            var obj= {
            name: "数据",
            type: "line",
            smooth: true,
            symbol: "none",
            sampling: "average",
            itemStyle: {
              color: "red"
            },
            data: Htarget,
            markLine: {
                silent: true,
                lineStyle:{
                    color: "red",
                },    
            }
          }
         
        this.option1.series[0].markLine.data=[]
        this.option1.series.push(obj)
        this.historyCharts = this.echarts.init(
          document.getElementById("historyCharts")
        ); //定义
        this.historyCharts.clear();
        this.historyCharts.setOption(this.option1,true); //展示
        
         }else{
           this.ChartFun(D)
           this.option1.series[0].markLine.data=[{
                    yAxis: this.DataTarget
               }]
          console.log(this.option1.series[0].markLine.data)
          this.historyCharts = this.echarts.init(document.getElementById("historyCharts"))//定义
          this.historyCharts.clear();
          this.historyCharts.setOption(this.option1,true); //展示 
         }
        // this.ChartFun(D)
      }else{
        this.RegChartFun(D)
      }
    },
    // 获取过去的几个月有多少天
     getDaysInMonth(year,month){
      month = parseInt(month,10);  //parseInt(number,type)这个函数后面如果不跟第2个参数来表示进制的话，默认是10进制。
      var temp = new Date(year,month,0);//过去的某月的天数
      this.QvalueData=[]//趋势版块时间间隔的值
      this.QHvalue=[]//滑块值的数组
      this.QvalueData.push(this.MonthTop +'-01',this.MonthTop +'-'+temp.getDate()); //
      this.QHvalue=this.getYearAndMonthAndDay(this.MonthTop +'-01',this.MonthTop +'-'+temp.getDate()); //调用获取时间段之间的所有时间的函数
      var NewArr=[]
      var New1=new Date(this.MonthTop +'-01')
      var New2=new Date(this.MonthTop +'-'+temp.getDate())
      NewArr.push(New1,New2)
      this.QDataChangeFun(NewArr)//调用趋势版块的时间变化的函数
    },
    
    // 点击回归目标的完成
    HSave(){
      var data = [Math.random() * 100];
      for (var i = 1; i < 200; i++) {
        data.push(Math.round((Math.random() - 0.5) * 30 + data[i - 1]));
      }
      console.log(data)
       localStorage.setItem('Htarget',JSON.stringify(data))
        this.ReturnTarget = false;
    },
    // 切换趋势类型
    TypeOptionsFun(){
      if(this.valueType==0){
          // this.ChartFun(this.QHvalue)
          if(this.valueType==0){
        var Htarget=JSON.parse(localStorage.getItem('Htarget'))
         this.ChartFun(this.QHvalue)
         if(Htarget != 0){
            var obj= {
            name: "数据",
            type: "line",
            smooth: true,
            symbol: "none",
            sampling: "average",
            itemStyle: {
              color: "red"
            },
            data: Htarget,
            markLine: {
                silent: true,
                lineStyle:{
                    color: "red",
                },    
            }
          }
         
        this.option1.series[0].markLine.data=[]
        this.option1.series.push(obj)
        this.historyCharts = this.echarts.init(
          document.getElementById("historyCharts")
        ); //定义
        this.historyCharts.clear();
        this.historyCharts.setOption(this.option1,true); //展示
        
         }else{
           this.ChartFun(this.QHvalue)
           this.option1.series[0].markLine.data=[{
                    yAxis: this.DataTarget
               }]
          console.log(this.option1.series[0].markLine.data)
          this.historyCharts = this.echarts.init(document.getElementById("historyCharts"))//定义
          this.historyCharts.clear();
          this.historyCharts.setOption(this.option1,true); //展示 
         }
        }
      }else if(this.valueType==1){
        this.RegChartFun(this.QHvalue)
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
    // 改变表格样式
    cellStyle({ row, column, rowIndex, columnIndex }) {
      let style = {
        "text-align": "center",
        "font-size": "14px",
        height: "56px",
        // "background-color": "#ebf1fb",
        "border-left": "solid 1px #d8d8d8"
      };
      if (window.innerWidth > 1660) {
        if (rowIndex % 2 == 0) {
          if (columnIndex == 5) {
            style["border-right"] = "solid 1px #d8d8d8";
          }
        } else {
          // style["background-color"] = "#f7faff";
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
          // style["background-color"] = "#f7faff";
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
          // style["background-color"] = "#f7faff";
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
    },
    getTable() {
      // if (window.innerWidth <= 1366) {
      //   this.pageSize = 6;
      // }
      // var a=this.NewHvalue
      this.pageSize = 10;
      this.tableDataRec = [];
      this.totalPage=this.Hvalue.length
      this.Hvalue.forEach((k, v) => {
        this.tableDataRec.push({
          id: v,
          time: k,
          reader: (Math.random()*1000).toFixed(1),
          Factor: "0.01",
          consumption: "1.5",
          cost: (Math.random()*10000).toFixed(0),
          desc: ""
        });
      });
      // this.$gAjax(`background/select_backGround?${Math.random() * 100}`).then(res => {
      //   if (res.state == 1) {
      //     this.tableData = res.data;
      //   } else {
      //     this.$Message.info(res.stateInfo);
      //   }
      // });
    },
    init() {
      //关键三 
      setTimeout(() => {
        window.addEventListener("resize", () => {
          this.historyCharts.resize();
          var he = $("#DataDetails").width() - 80;
          $("#historyCharts").css("width", he + "px");
          $("#historyCharts div").css("width", he + "px");
          $("#historyCharts canvas").css("width", he + "px");
          $("#historyCharts canvas").attr("width", he);
        });
      }, 20);
    },
    destroyed() {   //关键四
        window.removeEventListener('resize', this.init, 20)
      },

  },

  mounted() {
    this.getdatatime()//趋势的当前时间
    this.init();
    this.destroyed();
    var that = this;
    setTimeout(function() {
      that.getTable();
    }, 200);
    this.QHvalue.push(this.$moment(this.QvalueData[0]).format("YYYY-MM-DD"));
    this.QHvalue.push(this.$moment(this.QvalueData[1]).format("YYYY-MM-DD"));
    // this.ChartFun(this.QHvalue);
    this.QDataChangeFun(this.QHvalue)
    this.Hvalue.push(this.$moment(this.valueData[0]).format("YYYY-MM-DD"));
    this.Hvalue.push(this.$moment(this.valueData[1]).format("YYYY-MM-DD"));

    this.$root.Bus.$on("nameFun", e => {
      if (e == "手动数据源") {
        this.NewTarget = true;
      } else {
        this.NewTarget = false;
      }
     
    });
    //  点击侧栏的数据源名称
    this.$root.Bus.$on("dataDeta", (e,nav) => {
      // 点击数据源传过来的内容，重新渲染趋势图 
        // 导航 
        this.NavigationCon=nav
        this.inTop=[]
        this.inTop.push(
        { 
          name: "趋势"
        },
        { 
          name: "数据"
        },
        { 
          name: "目标和报警"
        })
         this.surename ='趋势';
        this.TrendBox=true //趋势的盒子
        this.DataBox=false //数据的盒子
        this.TargetBox=false //数据的盒子
        this.NavigationB=true
          var he = $("#DataDetails").width() - 80;
          $("#historyCharts").css("width", he + "px");
          $("#historyCharts div").css("width", he + "px");
          $("#historyCharts canvas").css("width", he + "px");
          $("#historyCharts canvas").attr("width", he);
           this.ChartFun(this.QHvalue);
           this.init();
    });
    this.$root.Bus.$on("VName", (e,D) => {
        this.inTop=[]
        this.inTop.push(
        { 
          name: "数据"
        })
        this.TrendBox=false //趋势的盒子
        this.DataBox=true //数据的盒子
        this.TargetBox=false //数据的盒子
        this.NavigationB=false
    })
  }
  // watch:{
  //   window.addEventListener('resize',this.sizeFun)
  // },
};
</script>


<style lang='scss'>
@import "./assets/styles/common";
#DataDetails {
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
  .Navigation{
    width: 100%;
    height: 30px;
    position: fixed;
    top: 71px;
    left: 200px;
    text-align: left;
    font-size: 14px;
    line-height: 25px;
    padding-left: 10px;
     @media screen and (max-width: 1366px) {
      top: 50px;
    }
  }
  .topCon {
    width: 100%;
    position: fixed;
    top:100px;
    height: 40px;
    background-color: #d4dbe8;
    left: 200px;
    text-align: left;
    // z-index: 99;
    @media screen and (max-width: 1366px) {
      top:73px;
    }
    padding-left: 20px;
    box-sizing: border-box;
    overflow: hidden;
    ul {
      position: relative;
    }
    li {
      float: left;
      height: 30px;
      line-height: 30px;
      text-align: center;
      margin-top: 8px;
      background-color: #e7ebf2;
      margin-right: 3px;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      padding: 0 10px;
      color: #6485bc;
      cursor: pointer;
    }
    .activeLi {
      margin-top: 8px;
      background-color: #f0f4fb;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      color: #fbad33;
      font-weight: bold;
      height: 36px;
    }
  }
  .publicBox {
    margin-top: 3%;
    .overview {
      border-radius: 0px;
      border: solid 1px #d8d8d8;
      margin-top: 60px;
      .header {
        background-color: #f7f7f7;
        border-bottom: solid 1px #d8d8d8;
        font-size: 14px;
        color: #202020;
        @include media($m1440) {
          font-size: 12px;
        }
      }
    }
  }
  #AutoBox {
    p {
      line-height: 30px;
      font-weight: 600;
      color: #303030;
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
    div.header {
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
        font-size: 12px;
      }
      > span {
        font-weight: bold;
      }
      > span:last-child {
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
      .fr {
        @include position(absolute, 38%, 170px, none, none);
      }
      .spanselect {
        display: inline-block;
        width: 160px;
        .el-select .el-input .el-select__caret {
          color: #303030;
        }
      }
      ul.el-pager li.active {
        color: #496fec;
        background: url("./assets/img/LightTimed/hover.png") no-repeat center
          20px;
        font-weight: bold;
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
          font-size: 16px;
          color: #496fec;
        }
        > span:last-child {
          @include position(absolute, 50%, 20px, none, none);
          transform: translateY(-50%);
          font-weight: bold;
          cursor: pointer;
          @include media($m1440) {
            font-size: 14px;
          }
        }
      }
    }
    #AllDept,
    #AllDept1,
    #AllDept2,
    #AllDept3,
    #AllDept4 {
      // background: #ac0 !important;
      .el-input__inner {
        background-color: #f0f4fb !important;
        border-radius: 4px;
        border: 1px solid #f0f4fb;
        color: #303030;
      }
    }
    //    #historyCharts {
    //       width: 1000px;
    //       height: 600px;
    //     }
  }
  .Tip {
    li {
      overflow: hidden;
      border-bottom: 1px solid #eee;
      padding: 10px;
      position: relative;
      .TipPic {
        float: left;
      }
      .ChoosePic {
        position: absolute;
        left: 11px;
        top: 11px;
      }
      .TipCon {
        // float: left;
        margin: 4% 0 0 19%;
        line-height: 20px;
        p:nth-of-type(1) {
          color: #2f6df2;
          font-weight: 600;
        }
      }
    }
  }
  .sign {
    width: 7px;
    height: 7px;
    position: absolute;
    right: 15px;
    top: 15px;
    z-index: 9;
  }
  .DataTable {
    margin-top: 2%;
    // min-height: 400px;
  }
  .hetop {
    height: 60px;
    line-height: 60px;
    text-align: left;
    font-size: 14px;
    font-weight: bold;
    color: #4c84ff;
    > i:first-child {
      color: #31c194;
      font-size: 16px;
    }
    > i:last-child {
      color: #de3333;
      font-size: 16px;
    }
  }
  .el-table {
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
  .el-form-item > div {
    text-align: left;
  }
  .el-switch.is-checked .el-switch__core {
    box-shadow: 0px 5px 15px 0px rgba(53, 116, 243, 0.5);
  }
  .el-switch .el-switch__core {
    box-shadow: 0px 5px 15px 0px rgba(144, 144, 144, 0.5);
  }
  .routerView {
    @include position(absolute, 0, 0, 0, 0);
    z-index: 3;
    background: #fff;
  }
}
.el-dialog {
  width: 1000px !important;
}
.is-active {
  color: #fbad33 !important;
}
.el-tabs--border-card > .el-tabs__content {
  background-color: #f0f4fb;
}
.el-tabs__nav-scroll {
  background-color: #d4dbe8 !important;
}
.el-form-item__label {
  padding: 0 !important;
}
</style>
