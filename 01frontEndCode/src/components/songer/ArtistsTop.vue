<template>
  <div class="box" style="width: 600px; display: flex;margin-top:20px">
    <div class="left">
      <img :src="playList.picUrl" alt="" />
    </div>
    <div class="right">
      <div class="boxcontent">
        <div class="text">{{ playList.name }}</div>
        <p style="margin-top:10px">单曲数：{{playList.musicSize}}</p>
        <p>专辑数：{{playList.albumSize}}</p>
        <!-- <img :src="list.avatarUrl" alt="" /> -->
        
      </div>
    </div>
  </div>
</template>

<script>
// import bus from "../../utils/bus"
export default {
  name: "PlayListTop",
  props:['playList'],
  data() {
    return {
      list: []
    };
  },
   mounted(){
      
  },
  updated() {
  },
};
</script>

<style lang="scss" scoped>
.left {
  width: 130px;
  height: 130px;
  margin-left: 50px;
  // margin-top: 20px;
  margin-right: 20px;
}
.left img {
  width: 130px;
  height: 130px;
  border: 1px solid rgb(213, 209, 209);
  border-radius: 8px;
}
.right {
  margin-top: 35px;
  position: relative;
  .boxcontent {
    .text {
      font-size: 20px;
      font-weight: 600;
    }
    p {
        // margin-top: 10px;
        // position: absolute;
        width: 150px;
        height: 30px;
        // top:55px;
        color: rgb(106, 101, 101);
    }
  }
}
</style>