<template>
<div style="height:100%;width:100%">
  <!-- <section class="login-box" :style="{background:'url('+background+') no-repeat left center'}"> -->
  <section class="login-box">
    <div class="imgBox">
      <img :src="background" alt="">
    </div>
    <img :src='logoImg' alt="大航联科logo">
    <div class="box">
      <div class="form">
        <!-- <p><img :src='logoImg' alt="大航联科logo"></p> -->
        <h1 v-html="h1"></h1>
        <div class="formName el-form-item">
          <input placeholder="User" v-model="form.name">
        </div>
        <div class="el-form-item">
          <input placeholder="Password" v-model="form.password" type="password" :show-password="true">
        </div>
        <div class="setPassword">
          <span>忘记密码？</span>
          <span>我要注册</span>
        </div>
        <div @click="onSubmit">
          <button>立即登录</button>
        </div>
      </div>
    </div>
    <div class="h6">
      <p>能源管理平台</p>
      <p>ENERGY MANAGEMENT PLATFORM</p>
    </div>
  </section>
  <p>{{description}}</p>
</div>
</template>

<script>
import logoImg from './assets/img/login/logo1.png';
import background from './assets/img/login/bg.png';
export default {
  name: 'login',
  data() {
    return {
      h1: '欢迎进入能源管理平台',
      logoImg: logoImg,
      background: background,
      description: '©2019 丝路启航',
      form: {
        name: '',
        password: '',
      },
      menuTree: {}
    };
  },
  methods: {
    // 获取谷歌版本号友好提示
    getChromeVersion() {
      var arr = navigator.userAgent.split(' ');
      var chromeVersion = '';
      for (var i = 0; i < arr.length; i++) {
        if (/chrome/i.test(arr[i]))
          chromeVersion = arr[i]
      }
      if (chromeVersion) {
        return Number(chromeVersion.split('/')[1].split('.')[0]);
      } else {
        return false;
      }
    },
    //获取首页信息logo标题等
    getSysCustom() {
      // this.$gAjax(`../static/getSysCustom.json`)
      //   .then(res => {
      //     if (res.status == 1) {
      //       console.log(res)
      //       this.h1 = res.data.title;
      //       this.background = res.data.style;
      //       this.logoImg = res.data.logo;
      //       this.description = res.data.description;
      //       this.getSysVersion();
      //     }
      //   })["catch"](() => {});
    },
    getSysVersion() {
      this.$gAjax(`../static/getSysCustom.json`)
        .then(res => {
          if (res.status == 1) {
            if (true) {
              this.$confirm('当前应用不是系统最新版本，是否升级？', '版本升级提示', {
                confirmButtonText: '是',
                cancelButtonText: '否',
                closeOnClickModal: false,
                showClose: false,
                type: 'info'
              }).then(() => {
                // 发送ajax更新版本
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '取消更新'
                });
              });
            }
          }
        })["catch"](() => {});
    },
    // 点击提交
    onSubmit() {
      if (this.form.name != '' && this.form.password != '') {
        this.$gAjax(`../static/login.json`)
          .then(res => {
            if (res.status == 1) {
              this.menuTree = [{
      path: '/EnergyBox',
      name: 'EnergyBox',
      component: () =>
        import('@/EnergyBox'),
      children: [{
        path: 'AllOverview',
        name: 'AllOverview',
        mode: ['首页'],
        component: () =>
          import('@/AllOverview'),
      }, {
        path: 'EnergyAllUser',
        name: 'EnergyAllUser',
        mode: ['用户组'],
        component: () =>
          import('@/EnergyAllUser'), 
      }, {
        path: 'EnergyChange',
        name: 'EnergyChange',
        mode: ['能源转换'],
        component: () =>
          import('@/EnergyChange'),
      }, {
        path: 'EnergyCompany',
        name: 'EnergyCompany',
        mode: ['公司'],
        component: () =>
          import('@/EnergyCompany'),
      }, {
        path: 'EnergyDept',
        name: 'EnergyDept',
        mode: ['部门'],
        component: () =>
          import('@/EnergyDept'),
      }, {
        path: 'EnergyFactory',
        name: 'EnergyFactory',
        mode: ['工厂'],
        component: () =>
          import('@/EnergyFactory'),
      }, {
        path: 'EnergyNew',
        name: 'EnergyNew',
        mode: ['能源'],
        component: () =>
          import('@/EnergyNew'),
      }, {
        path: 'EnergyPrice',
        name: 'EnergyPrice',
        mode: ['价格'],
        component: () =>
          import('@/EnergyPrice'),
      }, {
        path: 'EnergyReader',
        name: 'EnergyReader',
        mode: ['阅读模式'],
        component: () =>
          import('@/EnergyReader'),
      }, {
        path: 'EnergyUnit',
        name: 'EnergyUnit',
        mode: ['单位'],
        component: () =>
          import('@/EnergyUnit'),
      }, {
        path: 'EnergyUser',
        name: 'EnergyUser',
        mode: ['用户'],
        component: () =>
          import('@/EnergyUser'),
      }]
      }],
              sessionStorage.setItem('menuTree', JSON.stringify(this.menuTree));
              this.$router.push({
                path: '/EnergyBox/AllOverview',
                // name:'LightOverview'
              })
            }
          })["catch"](() => {});
      } else {
        this.$message({
          message: '请填写完整的用户名、密码',
          type: 'error',
          showClose: true,
          duration: 3000,
        });
      }
    }
  },
  mounted() {
    let userAgent = navigator.userAgent;
    if (userAgent.indexOf("Chrome") > -1) {
      if (this.getChromeVersion() < 60) {
        console.log(userAgent.indexOf("Chrome") > -1)
        console.log(this.getChromeVersion())
        this.$message({
          message: '请使用新版本谷歌、IE11访问本页面',
          type: 'error',
          showClose: true,
          duration: 3000,
        });
      }
    } else if (userAgent.indexOf("Firefox") > -1 || userAgent.indexOf("Safari") > -1 || userAgent.indexOf("Opera") > -1 || (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !(userAgent.indexOf("Opera") > -1))) {
      this.$message({
        message: '请使用新版本谷歌、IE11访问本页面',
        type: 'error',
        showClose: true,
        duration: 3000,
      });
    }
    // if (!!window.ActiveXObject || "ActiveXObject" in window) {
    //   console.log('ie11');
    // }
    this.getSysCustom();
    let that = this;
    document.onkeydown = function(e) {
      if (e.keyCode == 13) {
        that.onSubmit();
      }
    };
  }
};
</script>

<style scoped lang='scss'>
@import "./assets/styles/common";
.login-box {
  height: 100%; // background: url('./assets/img/login/bg.png') no-repeat center top/cover;
  position: relative;
  overflow: hidden;
  @include media($m1660) {
    background-size: contain !important;
  }
  ;
  >.imgBox {
    @include position(absolute, 0, none, none, 0);
    width: 66%;
    height: 100%;
    overflow: hidden;
    background-color: #273988;
    img {
      height: 100%;
    }
  }
  >img {
    @include position(absolute, 90px, none, none, 80px);
    @include media($m1440) {
      left: 60px;
    }
    ;
    @include media($m800) {
      width: 150px;
      left: 20px;
    }
    ;
  }
  >.h6 {
    @include position(absolute, none, none, 190px, 80px);
    @include media($m1440) {
      left: 60px;
    }
    ;
    @include media($m800) {
      left: 20px;
    }
    ;
    p:first-child {
      font-weight: bold;
      font-size: 16px;
      color: #ffffff;
      text-align: left;
      margin-bottom: 30px;
      @include media($m1366) {
        font-size: 14px;
      }
      ;
      @include media($m800) {
        font-size: 12px;
      }
      ;
    }
    p:last-child {
      font-weight: bold;
      font-family: arialbd;
      font-size: 50px;
      color: #ffffff;
      @include media($m1366) {
        font-size: 40px;
      }
      ;
      @include media($m1024) {
        font-size: 30px;
      }
      ;
      @include media($m800) {
        font-size: 20px;
      }
      ;
    }
  }
  div.box {
    width: 34%;
    height: 100%;
    @include position(absolute, 0, 0, none, none);
    .form {
      width: 380px;
      height: 450px;
      color: #303030;
      @include position(absolute, 50%, none, none, 50%);
      background-color: #fff;
      transform: translate(-50%, -50%);
      @include media($m1024) {
        width: 300px;
      }
      ;
      @include media($m800) {
        width: 200px;
      }
      ;
      h1 {
        font-size: 18px;
        font-weight: bold;
        color: #303030;
        margin: 50px 0;
        @include media($m800) {
          font-size: 14px;
        }
        ;
      }
      .el-form-item {
        padding: 0 13px;
        overflow: hidden;
        &.formName {
          margin-bottom: 38px;
          @include media($m800) {
            margin-bottom: 20px;
          }
          ;
        }
        input {
          border: none;
          border-bottom: solid 1px #c4c4c4;
          border-radius: 0;
          background-color: transparent;
          font-size: 16px;
          height: 32px;
          line-height: 32px;
          outline: none;
          width: 100%;
          @include media($m800) {
            font-size: 12px;
          }
          ;
        }
      }
      .setPassword {
        padding: 0 13px;
        display: flex;
        justify-content: space-between;
        margin-top: -10px;
        span {
          cursor: pointer;
          color: #306df2;
          font-size: 14px;
          @include media($m800) {
            font-size: 12px;
          }
          ;
        }
      }
      >div:last-child {
        box-shadow: 0px 20px 40px 0px rgba(53, 116, 243, 0.4);
        margin: 68px auto 0;
        border-radius: 44%;
        width: 350px;
        height: 40px;
        @include media($m1024) {
          width: 300px;
        }
        ;
        @include media($m1024) {
          width: 200px;
        }
        ;
        >button {
          width: 350px;
          height: 40px;
          background-image: linear-gradient(270deg, #4c84ff 0%, #2f6df2 100%), linear-gradient( #4c84ff, #4c84ff);
          border-radius: 4px;
          font-size: 16px;
          color: #ffffff;
          @include media($m1024) {
            width: 300px;
          }
          ;
          @include media($m1024) {
            width: 200px;
          }
          ;
        }
      }
    }
  }
  &+p {
    @include position(fixed, none, none, 18px, 50%);
    transform: translateX(-50%);
    color: #ffffff;
  }
}
</style>
