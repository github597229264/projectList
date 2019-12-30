<template>
  <div id="EnergyBox">
    <el-container>
      <el-header height="70px">
        <router-link to="/login">
          <img src="./assets/img/LightBox/tuichu.png" alt />退出
        </router-link>
        <span>{{time}}</span>
        <span>{{userName}}</span>
        <ul class="herderUl">
          <router-link to>
            <li @click="seChange('设置')">
              <span :class="{topClass:'设置'==itename }" style="margin-top:0px;margin-right:60px">设置</span>
            </li>
          </router-link>
          <router-link to>
            <li @click="topClickOee('OEE')">
              <span :class="{topClass:'OEE'==itename }" style="margin-top:0px;margin-right:60px">OEE</span>
            </li>
          </router-link>
          <!-- <router-link to>
            <li @click="topClickStyle('项目')">
              <span :class="{topClass:'项目'==itename }" style="margin-top:0px;margin-right:60px">项目</span>
            </li>
          </router-link> -->
          <!-- <router-link to>
            <li @click="topClickStyle('报告')">
              <span :class="{topClass:'报告'==itename }" style="margin-top:0px;margin-right:60px">报告</span>
            </li>
          </router-link> -->
          <router-link to="/EnergyBox/DataSource">
            <li @click="topClickStyle('数据源')">
              <span style="margin-top:0px;margin-right:60px" :class="{topClass:'数据源'==itename }">数据源</span>
            </li>
          </router-link>
          <router-link to="/EnergyBox/AllOverview">
            <li @click="topClickStyle('首页')">
              <!-- <router-link to="/EnergyBox/AllOverview" > -->
              <img src="./assets/img/home/shouye.jpg" alt style="margin-top:0px;margin-right:15px" />
              <!-- </router-link> -->
            </li>
          </router-link>
        </ul>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <p class="spanselect" id="sapnCon" style="margin-bottom:12px">
           <el-input v-model="searcCh" placeholder="请输入内容"></el-input>
            <!-- <el-select
              v-model="value"
              filterable
              placeholder="全部工厂"
              style="width:160px;float:right;"
              id="AllDept"
            >
              <el-option
                v-for="(item,index) in groups"
                :key="index"
                :label="item.label"
                :value="item.category_id"
              ></el-option>
            </el-select> -->
          </p>
          <p
            :class="[{'actSty':'导入数据'==twoname},dataStyle]"
            @click="clickData('导入数据')"
            style="border-top:solid 1px #505050;"
          >导入数据</p>
          <p :class="[{'actSty':'导出数据'==twoname},dataStyle]" @click="clickData('导出数据')">导出数据</p>
          <p :class="[{'actSty':'设备管理'==twoname},dataStyle]" @click="clickData('设备管理')">设备管理</p>
          <ul class="newUl">
            <li v-for="(item,index) in initData" :key="index">
              <p class="title1" @click="title1Fn(item,index)">
                <span :class="{one1Active:item.name==onename }" style="text-indent:8px">
                  {{item.name}}
                  <i class="el-icon-caret-bottom"></i>
                </span>
              </p>
              <ul v-show="item.isSubShow" class="transClass">
                <p class="title2 classone" @click="clickReport(item.name,'bao')">
                  <span :class="{oneActive:item.name==twoname }">{{item.report}}</span>
                </p>
                <li v-for="(item1,index1) in  item.child1" :key="index1">
                  <ul>
                    <li>
                      <div class="title3">
                        <span
                          class="p1 classone"
                          @click="factoryClick(item1,index1)"
                          style="text-indent:20px"
                        >
                          {{item1.name}}
                          <i class="el-icon-caret-bottom"></i>
                        </span>
                        <ul v-show="item1.isSubShow" class="transClass">
                          <p class="p1 classTwo" @click="clickReport(item1.name,'bao')">
                            <span :class="{oneActive:item1.name==twoname }">{{item1.report}}</span>
                          </p>
                          <li v-for="(item2,index2) in item.child1[index1].depart" :key="index2">
                            <span
                              class="p1 classTwo"
                              @click="departClick(item2,index2)"
                              style="text-indent:35px"
                            >
                              {{item2.name}}
                              <i class="el-icon-caret-bottom"></i>
                            </span>
                            <p
                              class="p1 classThree"
                              v-show="item2.isSubShow"
                              @click="clickReport(item2.name,'bao')"
                            >
                              <span
                                :class="{oneActive:item2.name==twoname }"
                                style="text-indent:45px"
                              >{{item2.report}}</span>
                            </p>
                            <span
                              class="assCon classThree transClass"
                              v-show="item2.isSubShow"
                              @click.left="assetsClick(item2,index)"
                              @click.right="addAssets()"
                              style="text-indent:45px"
                            >
                              资产
                              <i class="el-icon-caret-bottom"></i>
                            </span>
                            <ul class="assBot classFour transClass" v-show="item2.assetsShow">
                              <li
                                v-for="(item3,index3) in item.child1[index1].depart[index2].child2"
                                :key="index3"
                                @click="clickReport(item3.name,'yuan',item,item1,item2)"
                              >
                                <span
                                  draggable="true"
                                  @dragstart="dragstart(item3.name,item,item1,item2,$event)"
                                  :class="{oneActive:item3.name==twoname }"
                                >{{item3.name}}</span>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </el-aside>

        <!-- <el-aside width="200px">
          <ul>
            <li v-for="(item,index) in factoryList" :key="index" :class="{ active: item.active }">
              <router-link
                :to="{path: item.router}"
                @click.native="changeActive(index)"
              >{{item.project_name}}</router-link>         
            </li>
          </ul>
        </el-aside>-->
        <el-main>
        	<DeviceLocaltionTree></DeviceLocaltionTree>
          <!--<router-view @dragover.native="dragover($event)" @drop.native="drop($event)" />-->
        </el-main>
      </el-container>
      <div class="topNav" v-show="isTopShow" @click="isTopShow=false">
        <ul>
          <li v-for="(item,index) in topNavData" :key="index">
            <router-link :to="item.href" @click.native="changeTop(index)">
              <span>
                <img :src="item.img" alt />
              </span>
              <p>{{item.name}}</p>
            </router-link>
          </li>
        </ul>
      </div>
      <!--  -->
      <div class="createBox" :style="{top:topPx+'px',left:leftPx+'px'}" v-show="creBox">
        <ul>
          <li>
            <i class="el-icon-edit" style="color:#31c194"></i> 重命名
          </li>
          <li>
            <i class="el-icon-circle-close" style="color:#de3333"></i> 删除
          </li>
          <li @click="creareFun">
            <i class="el-icon-circle-plus-outline" style="color:#306ef4"></i> 创建
            <i class="el-icon-caret-right"></i>
          </li>
          <div v-show="isCreate" class="dataRea">
            <p
              v-for="(item,index) in dataRes"
              :key="index"
              @click="creReal(item.name)"
              :class="{newBg:item.name==newBgname }"
            >{{item.name}}</p>
          </div>
        </ul>
      </div>
    </el-container>
  </div>
</template>

<script>
	import DeviceLocaltionTree from './components/DeviceLocaltionTree.vue';
export default {
  name: "EnergyBox",
  components:{
  	DeviceLocaltionTree//设备位置树
  },
  data() {
    return {
      searcCh:"",
      itename: "", //上侧导航栏设置
      newBgname: "", //存储数据源的名字
      creBox: false, //点击资产出现弹框
      isCreate: false, //点击创建数据源
      topPx: 0, //资产弹框的位置
      leftPx: 0, //资产弹框的位置
      value: "", //当前选择的公司
      dataStyle: "dataStyle",
      dataName: "",
      dataRes: [
        {
          name: "自动数据源"
        },
        {
          name: "手动数据源"
        }
      ],
      time: "",
      userName: "",
      factoryList: [],
      menuTree: "",
      onename: "", //1级
      twoname: "", //2级
      isTopShow: false,
      topNavData: [
        {
          name: "公司",
          img: require("./assets/img/header/company.png"),
          href: "/EnergyBox/EnergyCompany"
        },
        {
          name: "工厂",
          img: require("./assets/img/header/factory.png"),
          href: "/EnergyBox/EnergyFactory"
        },
        {
          name: "车间",
          img: require("./assets/img/header/department.png"),
          href: "/EnergyBox/EnergyDept"
        },
        {
          name: "用户设置",
          img: require("./assets/img/header/UserSettings.png"),
          href: "/EnergyBox/EnergyUser"
        },
        {
          name: "转换",
          img: require("./assets/img/header/Transformation.png"),
          href: "/EnergyBox/EnergyChange"
        },
        {
          name: "能源",
          img: require("./assets/img/header/energy.png"),
          href: "/EnergyBox/EnergyNew"
        },
        {
          name: "单位",
          img: require("./assets/img/header/unit.png"),
          href: "/EnergyBox/EnergyUnit"
        },
        {
          name: "价格",
          img: require("./assets/img/header/price.png"),
          href: "/EnergyBox/EnergyPrice"
        },
        {
          name: "手动抄表",
          img: require("./assets/img/header/Manual.png"),
          href: "/EnergyBox/EnergyReader"
        },
        // {
        //   name: "活动日志",
        //   img: require("./assets/img/header/Journal.png"),
        //   href: "/EnergyBox/EnergyUser"
        // },
        {
          name: "用户组",
          img: require("./assets/img/header/usergroup.png"),
          href: "/EnergyBox/EnergyAllUser"
        }
      ],
      groups: [
        {
          category_id: "1",
          label: "海斯坦普工厂1"
        },
        {
          category_id: "2",
          label: "海斯坦普工厂2"
        }
      ],
      initData: [
        {
          name: "法士特",
          isSubShow: false,
           report: "主页",
          child1: [
            {
              report: "主页",
              name: "西安工厂",
              isSubShow: false,
              depart: [
                {
                  name: "焊接车间",
                  report: "主页",
                  isSubShow: false,
                  assetsShow: false,
                  child2: [
                    {
                      name: "1号机床电表电量"
                    },
                    {
                      name: "2号机床电表电量"
                    },
                    {
                      name: "3号机床电表电量"
                    },
                    {
                      name: "4号机床电表电量"
                    },
                  ]
                },
              ]
            }
          ]
        },
        {
          name: "海斯坦普",
          isSubShow: false,
          report: "主页",
         child1: [
            {
              report: "主页",
              name: "重庆工厂",
              isSubShow: false,
              depart: [
                {
                  name: "焊接车间",
                  report: "主页",
                  isSubShow: false,
                  assetsShow: false,
                  child2: [
                    {
                      name: "电表1电量"
                    },
                    {
                      name: "电表2电量"
                    },
                    {
                      name: "电表3电量"
                    },
                    {
                      name: "电表4电量"
                    },
                    {
                      name: "电表5电量"
                    },
                  
                    {
                      name: "气表1流量"
                    },
                    {
                      name: "气表2流量"
                    },
                     {
                      name: "气表3流量"
                    },
                    {
                      name: "气表4流量"
                    },
                    {
                      name: "气表5流量"
                    },
                    {
                      name:"生产数据"
                    }
                  ]
                },
                {
                  name: "衬套车间",
                  isSubShow: false,
                  assetsShow: false,
                   report: "主页",
                  child2: [
                    {
                      name: "数据源3"
                    },
                    {
                      name: "数据源4"
                    }
                  ]
                }
              ]
            },
            {
               report: "主页",
              name: "沈阳工厂",
              isSubShow: false,
              depart: [
                {
                  name: "焊接车间",
                  report: "主页",
                  isSubShow: false,
                  assetsShow: false,
                  child2: [
                   {
                      name: "电表1电量"
                    },
                    {
                      name: "电表2电量"
                    },
                    {
                      name: "电表3电量"
                    },
                    {
                      name: "电表4电量"
                    },
                    {
                      name: "电表5电量"
                    },
                  
                    {
                      name: "气表1流量"
                    },
                    {
                      name: "气表2流量"
                    },
                     {
                      name: "气表3流量"
                    },
                    {
                      name: "气表4流量"
                    },
                    {
                      name: "气表5流量"
                    },
                    {
                      name:"生产数据"
                    }
                  ]
                },
              ]
            }
          ]
        }
      ]
    };
  },
  methods: {
    // 导入数据和导出数据
    clickData(ex) {
      this.twoname = ex;
      let path = '';
      switch (this.twoname){
      	case '导出数据':
      		path = "/EnergyBox/Export";
      		break;
      	case '导入数据':
      		path = "/EnergyBox/Import";
      		break;
      	case '设备管理':
      		path = "/deviceManagement";
      		break;
      	default:
      		break;
      }
      this.$router.push(path);
    },
    drop(e) {
      e.preventDefault();
      // console.log(e)
      // var data = e.dataTransfer.getData("infoName");
      var urlStr = window.location.hash;
      var index = urlStr.lastIndexOf("/");
      urlStr = urlStr.substring(index + 1, urlStr.length);
      if (urlStr == "AllOverview") {
        this.$root.Bus.$emit("ElEdrag", e.srcElement.classList[0]);
      } else {
        this.$message({
          showClose: true,
          message: "当前页面不可以拖拽数据源",
          type: "warning"
        });
      }
    },
    dragover(e) {
      e.preventDefault();
    },
    dragstart(e,e1,e2,e3, ev) {
      // ev.dataTransfer.setData("infoName", "");
      console.log(e);
      console.log(e1);
      console.log(e2);
      console.log(e3);
      var reaCon = [];
      // var xcon = ["Coal", "CCGT", "oil", "Nuclear", "w", "OCGT"];
      var xcon = [];
      for (var i = 0; i < 12; i++) {
        reaCon.push(Math.floor(Math.random() * 10));
        xcon.push(i+1+"月")
      }
     
      localStorage.setItem("company",e1.name)
      localStorage.setItem("factory",e2.name)
      localStorage.setItem("dept",e3.name)
      localStorage.setItem("dataCon", JSON.stringify(reaCon));
      localStorage.setItem("realname", e);
      localStorage.setItem("xcon", JSON.stringify(xcon));
    },
    topClickStyle(name) {
      this.itename = name;
      this.isTopShow = false;
    },
    // 点击公司
    title1Fn(item, ind) {
      this.initData.forEach(i => {
        // 判断如果数据中的menuList[i]的show属性不等于当前数据的isSubShow属性那么menuList[i]等于false
        if (i.isSubShow !== this.initData[ind].isSubShow) {
          i.isSubShow = false;
        }
      });
      item.isSubShow = !item.isSubShow;
      this.onename = item.name;
    },
    // 点击工厂
    factoryClick(item, index) {
      console.log(item);
      item.isSubShow = !item.isSubShow;
    },
    // 点击部门
    departClick(item, index) {
      console.log(item);
      item.isSubShow = !item.isSubShow;
      item.assetsShow = !item.assetsShow;
      if (item.isSubShow == false) {
        item.assetsShow = false;
      }
    },
    // 鼠标左键  资产
    assetsClick(item) {
      console.log(item);
      item.assetsShow = !item.assetsShow;
    },
    // 点击所有的报告
    clickReport(name, t, item, item1, item2) {
      this.twoname = name;
      if (t == "yuan") {
        // console.log(item,item1,item2)
        let navCon =
          item.name + ">>" + item1.name + ">>" + item2.name + ">>" + name;
        this.$router.push("/EnergyBox/DataDetails");
        var yuanCon = [];
        for (var i = 0; i < 6; i++) {
          yuanCon.push(Math.floor(Math.random() * 10));
        }
        this.$nextTick(function() {
          // DOM 现在更新了
          this.$root.Bus.$emit("dataDeta", yuanCon,navCon);
        });
      }
      if (t == "bao") {
        this.$router.push("/EnergyBox/AllOverview");
        this.itename = "首页";
      }
    },
    // 鼠标右键  资产
    addAssets() {
      event.cancelBubble = true;
      event.preventDefault();
      this.creBox = !this.creBox;
      this.isCreate = false;
      this.topPx = event.offsetY + 580;
      this.leftPx = event.offsetX + 20;
      // setTimeout(() => {
      //   this.creBox=false;
      // }, 5000);
    },
    // 点击创建数据源
    creareFun() {
      this.isCreate = !this.isCreate;
    },
    // 点击跳转数据源详情页面
    creReal(name) {
      this.newBgname = name;
      this.isCreate = false;
      this.creBox = false;
      this.$router.push({
        path: "/EnergyBox/DataDetails"
      });
      this.$root.Bus.$emit("nameFun", name);
    },
    // 点击设置上层导航栏出现
    seChange(name) {
      this.itename = name;
      this.isTopShow = !this.isTopShow;
    },
  
    topClickOee(name){
      this.itename = name;
      this.$router.push({
        path: "/EnergyBox/OEE"
      });
    },
    // 点击某个项导航栏消失
    changeTop() {
      this.isTopShow = false;
    },
    // 获取右上角实时时间
    getTime() {
      this.time = this.$moment(new Date()).format("YYYY.MM.DD HH:mm");
    },
    // 获取侧边栏并跳到首页
    getRouter() {
      this.factoryList = [];
      this.menuTree = sessionStorage.getItem("menuTree");
      if (!this.menuTree) {
        this.$router.push({
          path: "/Login"
          // name:'LightOverview'
        });
      }
      this.userName = "张三";
      this.$router.options.routes[2].children.forEach((v, i) => {
        if (this.menuTree) {
          // 根据权限判断侧边栏的显示隐藏
          if (v.path !== "SetMap") {
            this.factoryList.push({
              project_name: v.mode[0],
              active: this.$route.name == v.path ? true : false,
              router: `/EnergyBox/${v.path}`
            });
          }
        }
      });
    },
    // 切换侧边栏
    changeActive(index) {
      console.log(index);
      this.factoryList.forEach((v, i) => {
        if (i == index) {
          v.active = true;
        } else {
          v.active = false;
        }
      });
    }
  },
  created() {
    this.getRouter();
    this.$root.Bus.$on("goLightFault", num => {
      if (num) {
        this.changeActive(num);
      }
    });
  },
  mounted() {
    let _this = this;
    var urlStr = window.location.hash;
    var index = urlStr.lastIndexOf("/");
    urlStr = urlStr.substring(index + 1, urlStr.length);
    // console.log(urlStr);
    if (urlStr == "DataSource") {
      _this.itename = "数据源";
    }
    _this.onename = this.initData[0].name;
    _this.getTime();
    setInterval(function() {
      _this.getTime();
    }, 60000);
  }
};
</script>

<style lang='scss'>
@import "./assets/styles/common";
#EnergyBox {
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .el-container {
    height: 100%;
    background-color: #f0f4fb;
    .dataStyle {
      text-align: left;
      height: 52px;
      border-bottom: solid 1px #505050;
      line-height: 52px;
      font-size: 15px;
      cursor: pointer;
      text-indent: 8px;
    }
    .actSty {
      border-left: 3px solid #4c84ff;
      font-weight: bold;
      color: #2c5ac2;
      background-color: #eeeeee;
    }
    .createBox {
      position: absolute;
      ul {
        // width: 102px;
        background-color: #454545;
        padding: 0px 2px;
        // border-radius: 4px;
        // box-shadow: -1px 0px 6px #999;
        position: relative;
        li {
          padding: 0 20px;
          height: 28px;
          text-align: left;
          border-bottom: solid 1px #606060;
          color: #fff;
          line-height: 28px;
          padding-left: 18px;
          box-sizing: border-box;
          cursor: pointer;
        }
        .dataRea {
          position: absolute;
          left: 90px;
          top: 58px;
          background-color: #454545;
          // border-radius: 4px;
          // box-shadow: -1px 0px 6px #999;
          padding: 0px 2px;
          width: 100px;
          line-height: 28px;
          p {
            height: 28px;
            border-bottom: solid 1px #505050;
            cursor: pointer;
            color: #fff;
          }
          .newBg {
            background-color: #606060;
          }
        }
      }
    }
    .newUl li {
      text-align: left;
      font-size: 15px !important
    }
    .classone {
      box-sizing: border-box;
    }
    .title2 span {
      text-indent: 20px;
      width: 100%;
      display: inline-block;
      height: 52px;
    }
    .p1 span {
      text-indent: 35px;
      width: 100%;
      display: inline-block;
      height: 52px;
    }
    .classTwo {
      box-sizing: border-box;
    }
    .classThree {
      box-sizing: border-box;
    }
    .classFour li {
      box-sizing: border-box;
      span {
        text-indent: 60px;
        width: 100%;
        display: inline-block;
        height: 52px;
      }
    }
    .newUl .title1 {
      height: 52px;
      border-bottom: solid 1px #505050;
      font-size: 15px;
      cursor: pointer;
      position: relative;
      span {
        width: 100%;
        display: inline-block;
        height: 20px;
        margin-top: 20px;
        i {
          position: absolute;
          top: 36%;
          right: 12px;
        }
      }
    }
    .one1Active {
      font-weight: bold;
    }
    .oneActive {
      border-left: 3px solid #4c84ff;
      display: inline-block;
      height: 52px;
      font-weight: bold;
      color: #2c5ac2;
      background-color: #eeeeee;
      width: 100%;
    }
    .title2,
    .title3 {
      line-height: 52px;
      cursor: pointer;
      font-size: 15px;
    }
    .title2 {
      border-bottom: solid 1px #505050;
      box-sizing: border-box;
      position: relative;
      i {
        position: absolute;
        right: 2px;
        top: 34%;
      }
    }
    .title3 {
      .p1,
      .classThree {
        width: 100%;
        display: inline-block;
        border-bottom: solid 1px #505050;
        position: relative;
        i {
          position: absolute;
          right: 2px;
          top: 34%;
        }
      }
    }
    .assCon {
      display: inline-block;
      width: 100%;
      border-bottom: solid 1px #505050;
    }
    .assBot li {
      width: 100%;
      border-bottom: solid 1px #505050;
    }
    .active21 {
      font-weight: bold;
      color: #4c84ff !important;
    }
    .active22 {
      color: #4c84ff !important;
    }

    #sapnCon {
      margin-top: 9px;
      display: inline-block;
      width: 160px;
      .el-input__inner {
        background-color: #606060;
        border-radius: 4px;
        border: 1px solid #606060;
        color: #fff;
        height: 30px;
        border-radius: 0px;
      }
      .el-input__icon {
        line-height: 30px;
      }
      .el-select .el-input .el-select__caret {
        color: #fff;
      }
    }
  }
  .el-header {
    position: relative;
    background: #ffffff url("./assets/img/LightBox/daohanglan1920.png")
      no-repeat left center;
    line-height: 35px;
    @include media($m1660) {
      line-height: 30px;
      background: #ffffff url("./assets/img/LightBox/daohanglan1920.png")
        no-repeat left center;
      height: 64px !important;
    }
    @include media($m1366) {
      line-height: 25px;
      background: #ffffff url("./assets/img/LightBox/daohanglan1920.png")
        no-repeat left center;
      height: 50px !important;
    }
    padding: 0 50px 0 0;
    span,
    a {
      float: right;
      font-size: 14px;
      @include media($m1440) {
        font-size: 12px;
      }
      color: #303030;
    }
    a {
      color: #4c84ff;
    }
    span {
      margin-right: 20px;
      @include media($m1366) {
        margin-right: 35px !important;
      }
    }
    img {
      margin-top: -2px;
      vertical-align: middle;
      @include media($m1440) {
        width: 24px;
      }
    }
    .herderUl {
      position: absolute;
      bottom: 3px;
      right: 0;

      li {
        float: left;
        background-color: #f0f0f0;
        width: 160px;
        border-left: solid 1px #e0e5eb;
        color: #303030;
        cursor: pointer;
        @include media($m1366) {
          width: 100px;
        }
      }
      > li:first-child {
        width: 58px;
        border-left: none;
      }
    }
  }
  .el-aside {
    margin-top: 1px;
    background-color: #282931;
    text-align: center;
    height: 100%;
    padding: 0 0 0 20px;
    color: #fff;
 
  }
  .el-main {
    background-color: #eee;
    text-align: center;
    height: 100%;
    overflow: auto;
    padding: 25px 50px;
    @include media($m1366) {
      padding: 12px 25px;
    }
  }
  .transClass {
    animation: tableShow1 0.4s ease-in-out forwards;
  }
  @keyframes tableShow1 {
    0% {
      opacity: 0.2;
    }
    50% {
      opacity: 0.6;
    }
    100% {
      opacity: 1;
    }
  }
  .topNav {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    top: 7%;
    z-index: 999;
    ul {
      width: 76%;
      padding: 30px;
      background-color: #fff;
      position: fixed;
      top: 7.5%;
      right: 50px;
    }
    li {
      margin-bottom: 8px;
      float: left;
      width: 155px;
      span {
        background-color: #e8ecf4;
        width: 101px;
        height: 72px;
        display: inline-block;
        padding-top: 7px;
        padding-left: 3px;
        border-radius: 4px;
      }
      p {
        line-height: 42px;
        color: #303030;
        font-size: 14px;
      }
    }
  }
  .topClass {
    color: #3272f5 !important;
    border-bottom: solid 1px #3272f5;
  }
}
</style>
