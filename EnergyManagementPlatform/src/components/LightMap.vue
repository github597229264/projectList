<template>
<div class="LightMap">
  <el-card style="width:100%;" class="imgNOPadding">
    <div slot="header" class="clearfix">
      <span>卡片名称</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="showParent">返回上级</el-button>
    </div>
    <div id="normalMap">
      <img id="mapChange" style="width:100%;height:auto;" :src='img' />
      <div v-for="(src,index) in lights" :style="{left:src.x_axis*100+'%',top:src.y_axis*100+'%'}" :type="src.type" :key="index">
        <el-popover placement="top-start" width="200" trigger="hover">
          <div>
            <ul>
              <li>1</li>
              <li>2</li>
              <li>3</li>
            </ul>
          </div>
          <div slot="reference">
            <img :src="lightImg" alt="" @click="showChildren(index)">
            <img :src="lightImg" alt="" v-show="src.click">
          </div>
        </el-popover>
      </div>
    </div>
  </el-card>
</div>
</template>

<script>
import logoImg from '../assets/img/login/logo.png';
import logoImg1 from '../assets/img/LightBox/tuichu.png';
export default {
  name: "LightMap",
  data() {
    return {
      img: logoImg,
      lightImg: logoImg,
      lights: [{
        x_axis: 0,
        y_axis: 0,
        type: 'factory',
        click: false,
      }, {
        x_axis: 0.6,
        y_axis: 0.4,
        type: 'factory',
        click: false,
      }, {
        x_axis: 0.2,
        y_axis: 0.7,
        type: 'factory',
        click: false,
      }],
      activeLightsCalendar: {},
      nowBg: 0,
      time: null,
    }
  },
  methods: {
    showParent() {
      this.nowBg = 0;
      this.img = logoImg;
      this.lights = [{
        x_axis: 0,
        y_axis: 0,
        type: 'factory',
      }, {
        x_axis: 0.6,
        y_axis: 0.4,
        type: 'factory',
      }, {
        x_axis: 0.2,
        y_axis: 0.7,
        type: 'factory',
      }];
      // 获取背景图片
      // this.$gAjax(`background/select_backGround?${Math.random() * 100}`).then(res => {
      //   if (res.state == 1) {
      //     this.img = res.data.backGround;
      //   } else {
      //     this.$Message.info(res.stateInfo);
      //   }
      // });
      // // 获取工厂位置数量
      // this.$gAjax(`elecGroup/select_treeNode?${Math.random() * 100}`).then(res => {
      //   if (res.state == 1 && res.data.length != 0) {
      //     this.lights = res.data;
      //   } else {
      //     this.$message({
      //       type: 'info',
      //       message: '当前无工厂'
      //     });
      //   }
      // });
    },
    showChildren(index) {
      //判断e是不是工厂，是工厂可以进入下面的灯
      if (this.nowBg == 0) {
        clearTimeout(this.time);
        var _this = this;
        this.time = setTimeout(function() {
          // _this.$gAjax(`background/select_backGround`).then(res => {
          //   if (res.state == 1) {
          _this.nowBg = 1;
          _this.img = logoImg1;
          _this.lights = [{
            x_axis: 0.4,
            y_axis: 0,
            type: 'light',
            click: false,
          }, {
            x_axis: 0.6,
            y_axis: 0.2,
            type: 'light',
            click: false,
          }, {
            x_axis: 0.2,
            y_axis: 0.8,
            type: 'light',
            click: false,
          }];
          //   } else {
          //     _this.$message({
          //       type: 'info',
          //       message: '当前工厂无可用的灯'
          //     });
          //   }
          // });
        }, 300);
      } else {
        //选中灯
        // console.log(this.lights[index].click)
        this.lights[index].click = this.lights[index].click == true ? false : true;
      }
    },
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang='scss' scoped>
@import "../assets/styles/common";
.LightMap {
  width: 100%;
  height: 100%;
  #normalMap {
    position: relative;
    overflow: hidden;
    height: auto;
    >div {
      position: absolute;
    }
  }
}
</style>
