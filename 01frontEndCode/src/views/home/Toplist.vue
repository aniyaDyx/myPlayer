<template>
  <div >
    <h2>官方榜</h2>
    <!-- <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
    <li v-for="i in count" class="infinite-list-item" :key="i">{{ i }}</li>
  </ul> -->
    <div class="RankingList" v-for="(itemb,index) in detailArr" :key="index">
      <div class="leftbox ">
        <div class="bofang">
          <div class="sanjiaoxin"></div>
        </div>
        <img :src="itemb.coverImgUrl">
      </div>
      <div class="rigthbox">
            <ul>
              <li v-for="(item,index1) in itemb.tracks.slice(0,5)" :key="index1" @click="playMusic(index1)">
                <div class="music">
                <div>
                  <span class="musicid">{{index1+1}}</span>
                  <span class="musicName">{{item.al.name}}</span>
                  </div>
                  <div class="star">{{item.ar[0].name}}</div>
                </div>
                </li>
                 <!-- <router-link to='/Toplistandlist'> -->
                    <li class="seeAll">查看全部&nbsp;>
                    </li>
                     <!-- </router-link> -->
            </ul>
            <span></span>
        </div>
        
      </div>
       <h2>全球榜</h2>
       <ul class="musiclistbig">
       <li class="musicList" v-for="(item,index) in musicList" :key="index">
         <span class="el-icon-caret-right">{{item.playCount+'次'}}</span>
         <img :src="item.coverImgUrl">
         <div>{{item.name}}</div>
       </li>
       </ul>
    </div>
   

</template>
<script>
import axios from "axios";
import { mapMutations } from "vuex";
import { getMusicRanking, musicP } from "../../request/api/request";
export default {
  data() {
    return {
      count: 40,
      music1: [],
      musicList: [],
      detailArr: [],
    };
  },
  methods: {
    async getRanking() {
      getMusicRanking().then((res) => {
        this.musicList = res.data.list.slice(4);
        const data = res.data.list.slice(0, 4);
        // console.log('555555',this.musicList);
        data.forEach(async (item) => {
          await musicP(item.id).then((res1) => {
            this.detailArr.push(res1.data.playlist);
            console.log('ttttttt',res1);
          });
        });
      });
    },
    //播放音乐
    playMusic(i) {
      // console.log(555, this.timer);
      this.updatePlayList(this.detailArr[i].tracks);
      this.updatePlayListIndex(i);
      // this.updateMusictime(this.mstime[i]);
    },
     ...mapMutations([
      "updatePlayList",
      "updatePlayListIndex",
    ]),
  },
  created() {
    this.getRanking(this.id);
  },
};
</script>
<style lang="scss" scoped>
h2 {
  // padding-left: 90px;
  font-size: 20px;
  font-weight: 700;
}

.leftbox {
  margin-right: 20px;
  position: relative;
}
.leftbox > img {
  height: 160px;
  width: 160px;
  border-radius: 5px;
}
.rigthbox {
  height: 100%;
  width: 100%;
  // background-color: bisque;
  font-size: 14px;
  position: relative;
}
.bofang {
  height: 50px;
  width: 50px;
  background-color: rgba($color: #ffff, $alpha: 0.8);
  line-height: 160px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -75%);
  border-radius: 50px;
  display: none;
}
.leftbox:hover > .bofang {
  display: block;
}
.sanjiaoxin {
  width: 0px;
  height: 0px;
  border-left: 15px solid red;
  border-bottom: 15px solid transparent;
  border-right: 15px solid transparent;
  border-top: 15px solid transparent;
  position: absolute;
  right: 0px;
  top: 10px;
}
.RankingList {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.music {
  display: flex;
  justify-content: space-between;
}
.musicid {
  margin-left: 12px;
}
.rigthbox > ul > li {
  height: 32px;
  line-height: 32px;
  border-radius: 3px;
  background-color: #e0e0e0;
}
.rigthbox > ul > li:nth-child(even) {
  background: white;
}
.rigthbox > ul > li:nth-child(odd) {
  background: rgb(239,239,239);
}
.star {
  margin-right: 10px;
}
.musicName {
  margin-left: 12px;
}
.seeAll {
  line-height: 100%;
  margin-top: 10px;
  padding: 1px 6px 1px 6px;
  color: #676767;
  border: none;
  font-size: 16px;
  background-color: white;
}
.musiclistbig {
  margin-top: 10px;
  width: 1200px;
  display: flex;
  flex-wrap: wrap;
}
.musicList {
  display: inline-block;
  margin-bottom: 30px;
  width: 18%;
  margin-right: 2%;
  font-size: 14px;
}

.musicList > img {
  height: 216px;
  width: 216px;
  border-radius: 8px;
  border: 1px solid #ddd;
}
.el-icon-caret-right {
  position: relative;
  top: 20px;
  right: -110px;
  color: rgb(179, 174, 174);
}
.musicList>img:hover{
transition: 0.3s;
transform: scale(1.1);
}
</style>