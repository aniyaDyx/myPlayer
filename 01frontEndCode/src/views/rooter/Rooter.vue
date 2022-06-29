
<!-- 管理员界面首页 -->

<template>
  <div class="box">
    <!-- 头部导航栏 -->
    <div class="header">
      <!-- <HeaderNav /> -->
    </div>

    <div class="xh">
      <el-button @click="btnShow" class="btnbox" icon="el-icon-s-tools"></el-button>
      <div v-show="isshow" class="ddd">
        <Leftbox />
      </div>
    </div>

    <!-- 内容主体区域 -->
    <div class="main">
      <div class="cententbox">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderNav from "../../components/headerNav/HeaderNav.vue";
import Leftbox from "./Leftbox.vue";

export default {
  components: {
    HeaderNav,
    Leftbox
  },
  data() {
    return {
      isshow: true
    };
  },
  methods: {
    btnShow() {
      this.isshow = !this.isshow;
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  //overflow-y: hidden;

  .xh {
    position: fixed;
    z-index: 99;
    .btnbox {
      position: absolute;
      top: 10px;
      left: 10px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: none;
      background-color: rgba(255, 255, 255, 0);
      text-align: center;
      padding: 0;
      font-size: 40px;
    }
    .ddd {
      position: relative;
      top: 10px;
      left: 60px;
      height: 60px;
    }
  }

  .header {
    position: absolute;
    height: 60px;
    width: 100%;
    top: 0;
    //z-index: 99;
  }

  .main {
    //position: absolute;
    //top: 60px;
    //left: 0;
    //padding-top: 40px;
    //height: 100vh;

    //overflow: scroll;
    //background-color: antiquewhite;

    .cententbox {
      width: 1200px;
      margin: 0 auto;
    }
  }
}
</style>