<template>
<div class="LightSet2">
  <div class="overview" :class="{ onlyOne: mapSet!='light' }">
    <div class="header">
      <button class="el-icon-arrow-left" @click="goLightSet">返回</button>
      <button class="el-icon-plus" @click="centerDialogVisible = true">新增</button>
      <button @click="delLight">删除</button>
      <div class="button"><span @click="showAlignChange">对齐</span>
        <div v-if="showAlign" class="showAlignDiv">
          <img v-for="(item,index) in showAlignImg" :key="index" :src="item" alt="" @click="alignFn(index)">
        </div>
      </div>
      <el-select v-model="lightSize" placeholder="请选择" @change="lightSizeChange">
        <el-option label="灯/区域大小:100%" value="60px">
        </el-option>
        <el-option label="灯/区域大小:80%" value="48px">
        </el-option>
        <el-option label="灯/区域大小:60%" value="36px">
        </el-option>
        <el-option label="灯/区域大小:40%" value="24px">
        </el-option>
      </el-select>
    </div>
    <div class="map" @dragover="dragover($event)">
      <img :src="map" alt="">
      <div v-for="(src,index) in lights" draggable="true" :style="{left:src.x_axis*100+'%',top:src.y_axis*100+'%'}" :type="src.type" :addr="src.short_addr" :key="index" @dragend="dragend($event)">
        <el-popover v-if="src.type=='light'" placement="top-start" width="200" trigger="hover">
          <div>
            <ul>
              <li>段号地址号：{{src.short_addr}}</li>
              <li>短地址号：{{src.short_addr}}</li>
            </ul>
          </div>
          <div slot="reference">
            <img :src="lightImg" alt="" :addr="src.short_addr" :style="{width:lightSize}" @click="chooseDel(index)">
            <img :style="{width:chooseSize}" src="./assets/img/LightCtrl/choose.png" alt="" v-show="src.click">
          </div>
        </el-popover>
        <div v-else-if="src.type=='factory'">
          <img :src="factoryImg" :style="{width:lightSize}" alt="" :addr="src.name" @click="chooseDel(index)">
          <img :style="{width:chooseSize}" src="./assets/img/LightCtrl/choose.png" alt="" v-show="src.click">
        </div>
      </div>
    </div>
    <button @click="saveLights">保存</button>
  </div>
  <div class="overview setLight" v-if="mapSet=='light'">
    <div class="header">
      <span>设备信息</span>
      <button @click="getConfigForm" class="getConfigForm">导入配置表</button>
    </div>
    <div class="config">
      <div>
        <el-input placeholder="输入信息查询" v-model="searchAddr" clearable>
        </el-input>
        <a href="javaScript:void(0)" @click="searchAddrBtn">查询</a>
      </div>
      <div class="lightList">
        <div>
          <p :name="item.short_addr" v-for="(item,index) in configForm" draggable="true" :id="index" :key="index" @dragend="dragend($event)" :class="{ active: item.active }">{{item.short_addr}}</p>
        </div>
      </div>
    </div>
  </div>
  <el-dialog title="新增灯/区域" :visible.sync="centerDialogVisible" width="30%" center>
    <el-form v-if="mapSet === 'light'" ref="form" label-width="100px" label-position="left">
      <el-form-item label="段号地址号：">
        <el-input v-model="form.short_addr"></el-input>
      </el-form-item>
      <el-form-item label="短地址：">
        <el-input v-model="form.short_addr1"></el-input>
      </el-form-item>
    </el-form>
    <el-form v-else ref="form" :model="form" label-width="100px" label-position="left">
      <el-form-item label="区域名：">
        <el-input v-model="form.name"></el-input>
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
import lightImg from './assets/img/LightCtrl/light.png';
import factoryImg from './assets/img/LightCtrl/factory.png';
import leftIcon from './assets/img/LightSet/left.png';
import topIcon from './assets/img/LightSet/top.png';
import rightIcon from './assets/img/LightSet/right.png';
import bottomIcon from './assets/img/LightSet/bottom.png';
export default {
  name: "LightSet",
  data() {
    return {
      lightImg: lightImg,
      factoryImg: factoryImg,
      map: '',
      mapSet: 'light',
      configmsg: {},
      searchAddr: '',
      configForm: [],
      lights: [],
      activeLightsCalendar: [],
      lightSize: '60px',
      chooseSize: '23px',
      centerDialogVisible: false,
      form: {
        short_addr: '',
        short_addr1: '',
        name: ''
      },
      showAlign: false,
      showAlignImg: [leftIcon, rightIcon, topIcon, bottomIcon]
    };
  },
  methods: {
    lightSizeChange() {
      this.chooseSize = Number(this.lightSize.replace(/\s+|px/gi, "")) * 0.3 + 'px';
    },
    showAlignChange() {
      if (this.activeLightsCalendar.length === 0) {
        this.$message({
          type: 'info',
          message: '请添加要对齐的灯/区域'
        });
        return;
      }
      this.showAlign = !this.showAlign;
    },
    saveLights() {
      console.log(this.lights)
    },
    goLightSet() {
      this.$root.Bus.$emit("getGroupOptions", 'change');
      this.$router.push({
        path: '/EnergyBox/LightSet',
      })
    },
    alignFn(index) {
      if (this.activeLightsCalendar.length != 0) {
        if (index == 0) {
          let max = this.activeLightsCalendar[0].x_axis;
          this.activeLightsCalendar.forEach((v, i) => {
            if (v.x_axis < max) {
              max = v.x_axis;
            }
          })
          this.activeLightsCalendar.forEach((v, i) => {
            v.x_axis = max;
          })
        } else if (index == 1) {
          let max = this.activeLightsCalendar[0].x_axis;
          this.activeLightsCalendar.forEach((v, i) => {
            if (v.x_axis > max) {
              max = v.x_axis;
            }
          })
          this.activeLightsCalendar.forEach((v, i) => {
            v.x_axis = max;
          })
        } else if (index == 2) {
          let max = this.activeLightsCalendar[0].y_axis;
          this.activeLightsCalendar.forEach((v, i) => {
            if (v.y_axis < max) {
              max = v.y_axis;
            }
          })
          this.activeLightsCalendar.forEach((v, i) => {
            v.y_axis = max;
          })
        } else if (index == 3) {
          let max = this.activeLightsCalendar[0].y_axis;
          this.activeLightsCalendar.forEach((v, i) => {
            if (v.y_axis > max) {
              max = v.y_axis;
            }
          })
          this.activeLightsCalendar.forEach((v, i) => {
            v.y_axis = max;
          })
        }
      } else {
        this.$message({
          type: 'info',
          message: '请选中要对齐的灯/区域'
        });
      }
    },
    searchAddrBtn() {
      if (this.searchAddr != '') {
        let userAgent = navigator.userAgent,
          win = 0;
        if (userAgent.indexOf("Chrome") > -1) {
          win = 5;
        } else {
          win = 17;
        }
        let h = $('.lightList').height() - win,
          h1 = $('.lightList>div').height();
        this.configForm.forEach((v, i) => {
          if (v.short_addr === this.searchAddr) {
            let top = i * 30;
            if (top < h) {
              top = 0;
            } else if (top > (h1 - h)) {
              top = (h1 - h);
            }
            console.log(top)
            $('.lightList')[0].scrollTop = top;
            v.active = true;
          } else {
            v.active = false;
          }
        })
      }
    },
    save() {
      if (this.mapSet == 'light') {
        this.lights.push({
          x_axis: 0,
          y_axis: 0,
          type: this.mapSet,
          click: false,
          short_addr: this.form.short_addr,
          short_addr1: this.form.short_addr1,
          name: ''
        });
      } else {
        this.lights.push({
          x_axis: 0,
          y_axis: 0,
          type: this.mapSet,
          click: false,
          short_addr: '',
          short_addr1: '',
          name: this.form.name
        });
      }


      this.centerDialogVisible = false;
      this.form = {
        short_addr: '',
        short_addr1: '',
        name: ''
      }
    },
    chooseDel(index) {
      this.lights[index].click = this.lights[index].click == true ? false : true;
      if (this.lights[index].click) {
        this.activeLightsCalendar.push(this.lights[index]);
      } else {
        this.activeLightsCalendar.splice($.inArray(this.lights[index], this.activeLightsCalendar), 1);
      }
    },
    showLights() {
      //判断e是不是工厂
      if (this.mapSet == 'factory') {
        // _this.$gAjax(`background/select_backGround`).then(res => {
        //   if (res.state == 1) {
        this.lights = [];
        //   } else {
        //     _this.$message({
        //       type: 'info',
        //       message: '当前工厂无可用的区域'
        //     });
        //   }
        // });
      } else {
        //选中灯
        console.log(this.lights)
        this.lights = [];
      }
    },
    delLight() {
      if (this.activeLightsCalendar.length === 0) {
        this.$message({
          type: 'info',
          message: '请选中要删除的灯/区域'
        });
        return;
      }
      this.$confirm('此操作将使已布好的灯/区域清除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(this.activeLightsCalendar);
        console.log(this.lights);
        this.activeLightsCalendar.forEach((v, i) => {
          this.lights.splice(this.lights.findIndex(item => item.short_addr === v.short_addr), 1);
        })
        this.activeLightsCalendar = [];
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    getConfigForm() {
      console.log(this.configmsg)
      if (this.lights.length != 0) {
        this.$confirm('此操作将使已布好的灯/区域清除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.lights = [];
          this.configForm = [{
            x_axis: 0.2,
            y_axis: 0.8,
            type: 'light',
            click: false,
            short_addr: '03',
            active: false
          }, {
            x_axis: 0.4,
            y_axis: 0.8,
            type: 'light',
            click: false,
            short_addr: '04',
            active: false
          }]
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      } else {
        this.configForm = [{
          x_axis: 0.2,
          y_axis: 0.8,
          type: 'light',
          click: false,
          short_addr: '03',
          active: false
        }, {
          x_axis: 0.4,
          y_axis: 0.8,
          type: 'light',
          click: false,
          short_addr: '04',
          active: false
        }, {
          x_axis: 0.2,
          y_axis: 0.6,
          type: 'light',
          click: false,
          short_addr: '05',
          active: false
        }, {
          x_axis: 0.2,
          y_axis: 0.6,
          type: 'light',
          click: false,
          short_addr: '05',
          active: false
        }, {
          x_axis: 0.2,
          y_axis: 0.6,
          type: 'light',
          click: false,
          short_addr: '05',
          active: false
        }, {
          x_axis: 0.2,
          y_axis: 0.6,
          type: 'light',
          click: false,
          short_addr: '05',
          active: false
        }, {
          x_axis: 0.2,
          y_axis: 0.6,
          type: 'light',
          click: false,
          short_addr: '05',
          active: false
        }, {
          x_axis: 0.2,
          y_axis: 0.6,
          type: 'light',
          click: false,
          short_addr: '05',
          active: false
        }, {
          x_axis: 0.2,
          y_axis: 0.6,
          type: 'light',
          click: false,
          short_addr: '05',
          active: false
        }, {
          x_axis: 0.2,
          y_axis: 0.6,
          type: 'light',
          click: false,
          short_addr: '07',
          active: false
        }, {
          x_axis: 0.2,
          y_axis: 0.6,
          type: 'light',
          click: false,
          short_addr: '05',
          active: false
        }, {
          x_axis: 0.2,
          y_axis: 0.6,
          type: 'light',
          click: false,
          short_addr: '05',
          active: false
        }, {
          x_axis: 0.2,
          y_axis: 0.6,
          type: 'light',
          click: false,
          short_addr: '057',
          active: false
        }, {
          x_axis: 0.2,
          y_axis: 0.6,
          type: 'light',
          click: false,
          short_addr: '05',
          active: false
        }, {
          x_axis: 0.2,
          y_axis: 0.6,
          type: 'light',
          click: false,
          short_addr: '05',
          active: false
        }, {
          x_axis: 0.2,
          y_axis: 0.6,
          type: 'light',
          click: false,
          short_addr: '05',
          active: false
        }, {
          x_axis: 0.2,
          y_axis: 0.6,
          type: 'light',
          click: false,
          short_addr: '05',
          active: false
        }, {
          x_axis: 0.2,
          y_axis: 0.6,
          type: 'light',
          click: false,
          short_addr: '05',
          active: false
        }, {
          x_axis: 0.2,
          y_axis: 0.6,
          type: 'light',
          click: false,
          short_addr: '05',
          active: false
        }, {
          x_axis: 0.2,
          y_axis: 0.6,
          type: 'light',
          click: false,
          short_addr: '05',
          active: false
        }, {
          x_axis: 0.2,
          y_axis: 0.6,
          type: 'light',
          click: false,
          short_addr: '05',
          active: false
        }, {
          x_axis: 0.2,
          y_axis: 0.6,
          type: 'light',
          click: false,
          short_addr: '05',
          active: false
        }, {
          x_axis: 0.2,
          y_axis: 0.6,
          type: 'light',
          click: false,
          short_addr: '05',
          active: false
        }, {
          x_axis: 0.2,
          y_axis: 0.6,
          type: 'light',
          click: false,
          short_addr: '0588',
          active: false
        }, {
          x_axis: 0.2,
          y_axis: 0.6,
          type: 'light',
          click: false,
          short_addr: '05',
          active: false
        }, {
          x_axis: 0.2,
          y_axis: 0.6,
          type: 'light',
          click: false,
          short_addr: '0589',
          active: false
        }, {
          x_axis: 0.2,
          y_axis: 0.6,
          type: 'light',
          click: false,
          short_addr: '05',
          active: false
        }, {
          x_axis: 0.2,
          y_axis: 0.6,
          type: 'light',
          click: false,
          short_addr: '05',
          active: false
        }, {
          x_axis: 0.2,
          y_axis: 0.6,
          type: 'light',
          click: false,
          short_addr: '05',
          active: false
        }, {
          x_axis: 0.2,
          y_axis: 0.6,
          type: 'light',
          click: false,
          short_addr: '05',
          active: false
        }, {
          x_axis: 0.2,
          y_axis: 0.6,
          type: 'light',
          click: false,
          short_addr: '05',
          active: false
        }, {
          x_axis: 0.2,
          y_axis: 0.6,
          type: 'light',
          click: false,
          short_addr: '05',
          active: false
        }, {
          x_axis: 0.2,
          y_axis: 0.6,
          type: 'light',
          click: false,
          short_addr: '05',
          active: false
        }, {
          x_axis: 0.2,
          y_axis: 0.6,
          type: 'light',
          click: false,
          short_addr: '08',
          active: false
        }, {
          x_axis: 0.2,
          y_axis: 0.6,
          type: 'light',
          click: false,
          short_addr: '05',
          active: false
        }, {
          x_axis: 0.2,
          y_axis: 0.6,
          type: 'light',
          click: false,
          short_addr: '05',
          active: false
        }, {
          x_axis: 0.2,
          y_axis: 0.6,
          type: 'light',
          click: false,
          short_addr: '05',
          active: false
        }, {
          x_axis: 0.2,
          y_axis: 0.6,
          type: 'light',
          click: false,
          short_addr: '05',
          active: false
        }, {
          x_axis: 0.2,
          y_axis: 0.6,
          type: 'light',
          click: false,
          short_addr: '05',
          active: false
        }, {
          x_axis: 0.2,
          y_axis: 0.6,
          type: 'light',
          click: false,
          short_addr: '05555555555555555555555555555555555',
          active: false
        }, {
          x_axis: 0.2,
          y_axis: 0.6,
          type: 'light',
          click: false,
          short_addr: '05',
          active: false
        }, {
          x_axis: 0.2,
          y_axis: 0.6,
          type: 'light',
          click: false,
          short_addr: '05',
          active: false
        }, {
          x_axis: 0.2,
          y_axis: 0.6,
          type: 'light',
          click: false,
          short_addr: '05',
          active: false
        }, {
          x_axis: 0.2,
          y_axis: 0.6,
          type: 'light',
          click: false,
          short_addr: '05',
          active: false
        }, {
          x_axis: 0.2,
          y_axis: 0.6,
          type: 'light',
          click: false,
          short_addr: '05',
          active: false
        }, {
          x_axis: 0.2,
          y_axis: 0.6,
          type: 'light',
          click: false,
          short_addr: '065',
          active: false
        }]
      }
    },
    dragend(e) {
      console.log(this.lights)
      let w = $(".map").width(),
        h = $(".map").height(),
        m = 0,
        m2 = 0,
        m1 = $('.el-header').height();
      if ($('.el-main').css('padding') == '') {
        if (window.innerWidth > 1366) {
          m = 50;
          m2 = 25;
        } else {
          m = 25;
          m2 = 12;
        }
      } else {
        m = Number($('.el-main').css('padding').split(' ')[1].replace(/\s+|px/gi, ""));
        m2 = Number($('.el-main').css('padding').split(' ')[0].replace(/\s+|px/gi, ""));
      }
      let x = ((e.pageX - (220 + m)) / w),
        y = ((e.pageY - (m1 + m2 + 60)) / h);
      // console.log(x)
      // console.log(y)
      if (x >= 0 && x <= 1 && y >= 0 && y <= 1) {
        if (e.target.innerText != '') {
          this.lights.push({
            x_axis: x,
            y_axis: y,
            type: this.mapSet,
            click: false,
            short_addr: e.target.innerText,
          });
          // console.log(this.configForm);
          this.configForm.splice(this.configForm.findIndex(item => item.short_addr === e.target
            .innerText), 1);
        } else {
          this.lights.forEach((v, i) => {
            if (this.mapSet === 'light') {
              if (v.short_addr === $(e.target).attr('addr')) {
                v.x_axis = x;
                v.y_axis = y;
              }
            } else {
              if (v.name === $(e.target).attr('addr')) {
                v.x_axis = x;
                v.y_axis = y;
              }
            }
          })
        }
      }
    },
    dragover(e) {
      e.preventDefault();
    },
  },
  mounted() {
    // console.log(this.$route)
    if (localStorage.getItem('areaMsg') == null && this.$route.query.type) {
      console.log(localStorage.getItem('areaMsg') == null)
      this.$router.push({
        path: '/EnergyBox/LightSet'
      })
    } else {
      console.log('setMap')
      this.$root.Bus.$emit("goLightFault", 8);
      this.configmsg = JSON.parse(localStorage.getItem('areaMsg'));
      this.map = this.configmsg.file;
      this.mapSet = this.$route.query.type;
      this.showLights();
      // console.log(this.mapSet)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang='scss'>
@import "./assets/styles/common";
.LightSet2 {
  width: 100%;
  height: 100%;
  .overview {
    width: calc( 100% - 330px);
    @include media($m1024) {
      width: 100%;
    }
    background-color: #ffffff;
    border-radius: 10px;
    padding: 0 20px 30px;
    float: left;
    &.onlyOne {
      width: 100%;
    }
    &.setLight {
      width: 300px;
      @include media($m1024) {
        margin-top: 20px;
        width: 100%;
      }
      float: right;
      height: 100%;
    }
    .header {
      text-align: left;
      height: 60px;
      line-height: 60px;
      border-bottom: solid 1px #d9e3f3;
      font-size: 16px;
      font-weight: bold;
      color: #303030;
      padding: 0 20px;
      margin: 0 -20px;
      @include position(relative, none, none, none, none);
      @include media($m1440) {
        font-size: 14px;
      }
      >span {
        font-weight: bold;
      }
      button,
      .button {
        position: relative;
        width: 80px;
        text-align: center;
        display: inline-block;
        cursor: pointer;
        height: 32px;
        line-height: 32px;
        background-color: #ffffff;
        box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        margin-right: 15px;
        @include media($m800) {
          margin-right: 2px;
        }
        font-size: 14px;
        color: #505050;
        &:first-child {
          background-color: #417bfa;
          color: #fff;
          box-shadow: 0px 5px 10px 0px rgba(53, 116, 243, 0.4);
        }
        >span {
          display: block;
          width: 100%;
        }
      }
      .getConfigForm {
        width: 110px;
        color: #fff;
        float: right;
        background-color: #40cfa2;
        box-shadow: 0px 5px 15px 0px rgba(64, 207, 162, 0.5);
        display: block;
        margin: 14px 0 0 0;
      }
      .el-select {
        width: 160px;
        height: 32px;
        position: relative;
        top: 10px;
        .el-input {
          height: 32px;
          input {
            float: left;
            height: 32px;
            line-height: 32px;
            border: none;
            box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);
            border-radius: 4px;
            background-color: #ffffff;
          }
        }
        .el-select__caret {
          float: right;
          line-height: 32px;
        }
      }
      .showAlignDiv {
        width: 150px;
        height: 32px;
        background-color: #ffffff;
        box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        @include position(absolute, none, none, -34px, 0);
        z-index: 9;
        display: flex;
        justify-content: space-around;
        align-items: center;
        img {
          width: 17px;
          height: 16px;
          cursor: pointer;
        }
      }
    }
    .map {
      position: relative;
      >div {
        position: absolute;
        img {
          cursor: pointer;
        }
        img+img {
          display: block;
          margin: 0 auto;
        }
      }
      >img {
        width: 100%;
        height: auto;
        display: block;
        margin: 0 auto;
      }
      +button {
        width: 130px;
        height: 32px;
        background-image: linear-gradient(270deg, #4c84ff 0%, #2f6df2 100%), linear-gradient( #4c84ff, #4c84ff);
        background-blend-mode: normal, normal;
        box-shadow: 0px 5px 15px 0px rgba(53, 116, 243, 0.5);
        border-radius: 4px;
        font-size: 14px;
        color: #ffffff;
        margin-top: 20px;
      }
    }
    .config {
      height: calc( 100% - 60px);
      >div:first-child {
        clear: both;
        height: 30px;
        margin: 12px 0 16px 0;
        .el-input {
          float: left;
          width: 184px;
        }
        input {
          height: 30px;
          line-height: 30px;
          border: none;
          background-color: #ffffff;
          box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.1);
          border-radius: 4px;
          float: left;
          width: 184px;
        }
        div+a {
          width: 68px;
          height: 30px;
          line-height: 30px;
          background-image: linear-gradient(270deg, #4c84ff 0%, #2f6df2 100%), linear-gradient( #4c84ff, #4c84ff);
          background-blend-mode: normal, normal;
          box-shadow: 0px 1px 10px 0px rgba(53, 116, 243, 0.5);
          border-radius: 4px;
          font-size: 14px;
          color: #ffffff;
          float: right;
          vertical-align: middle;
        }
      }
      .lightList {
        width: 90%;
        margin: 0 auto;
        height: calc( 100% - 58px);
        overflow: auto;
        position: relative;
        div {
          @include position(absolute, 0, 0, none, 0);
          p {
            display: block;
            font-size: 14px;
            line-height: 30px;
            color: #303030;
            text-align: left;
            cursor: pointer;
            &.active {
              color: #306df2;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
}
</style>
