<template>
  <div class="box" style="width: 600px; display: flex;margin-top:20px">
    <div class="left">
      <img :src="playList.coverImgUrl" alt="" />
    </div>
    <div class="right">
      <div class="boxcontent">
        <div class="text">{{ playList.name }}</div>
        <!-- <div>{{playlist.creator}}</div> -->
        <img :src="list.avatarUrl" alt="" />
        <span>{{ list.nickname }}></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayListTop",
  props: ["playList"],
  data() {
    return {
      list: {
        nickname: "",
        avatarUrl: "",
      },
    };
  },
  updated() {
    // console.log(this.playlist);
    // if(this.playList.creator==""){
    //     this.list=JSON.parse(sessionStorage.getItem('creator'))

    // }
    this.list.nickname = JSON.parse(sessionStorage.getItem("creator")).nickname;
    this.list.avatarUrl = JSON.parse(
      sessionStorage.getItem("creator")
    ).avatarUrl;
    // console.log(JSON.parse(sessionStorage.getItem("creator")).nickname);
    // this.list.push(this.playList.creator.nickname);
    // this.list.push(this.playList.creator.avatarUrl);
    // console.log(this.list);
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
    img {
      margin-top: 15px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    span {
        margin-left: 10px;
        position: absolute;
        top:65px;
        color: rgb(106, 101, 101);
    }
  }
}
</style>