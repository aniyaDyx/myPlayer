<template>
  <div style="margin-left:50px">
    <play-list-top :playList="playList"></play-list-top>
    <play-list-music :musicList="musicList"></play-list-music>
  </div>
</template>
<script>
// import { useRoute } from 'vue-router'
import PlayListTop from "../../components/playList/PlayListTop.vue";
import PlayListMusic from "../../components/playList/PlayListMusic.vue";
import axios from "axios";
import {getMusicDetail,getMusicItemList} from "../../request/api/request"
export default {
  components: {
    PlayListTop,
    PlayListMusic
  },
  data() {
      return {
          //接收discouverMusic页面传过来的歌曲id
          id:this.$route.query.id,
          playList:{},//歌单详情
          musicList:[]
      }
  },
  methods: {
       async getDetail(ele){
            //获取歌单详情
            let res = await getMusicDetail(ele)
            this.playList = res.data.playlist;
            //  console.log(this.palyList);
            //防止页面刷新，数据丢失
            sessionStorage.setItem('creator',JSON.stringify(res.data.playlist.creator))
            //获取歌单歌曲
            let res1 = await getMusicItemList(ele)
            this.musicList = res1.data.songs
            console.log("gq",this.musicList); 
        }
  },
  mounted() {
     this.getDetail(this.id)
      // //获取对应的歌单
      // axios.get(`http://localhost:3000/playlist/detail?id=${this.id}`, {
      //           // params: {}
      //       }).then((res) => {
      //           // console.log(res);
      //           this.playList = res.data.playlist;
      //           // console.log('11111111',res.data.playlist.creator.nickname);
      //           sessionStorage.setItem('creator',JSON.stringify(res.data.playlist.creator))
      //       }).catch((err) => {
      //           console.log(err);
      //       })
      //   //获取歌单歌曲
      //   axios.get(`http://localhost:3000/playlist/track/all?id=${this.id}&limit=10&offset=0`, {
      //           // params: {}
      //       }).then((res) => {
      //           // console.log(res);
      //           this.musicList = res.data.songs;
      //           console.log(this.musicList)
      //       }).catch((err) => {
      //           console.log(err);
      //       })
      
  },
};
</script>
<style lang="">
</style>