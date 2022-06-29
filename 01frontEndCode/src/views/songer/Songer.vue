<template>
  <div>
      <ArtistsTop :playList="playList"/>
      <ArtistsMusic :musicList="musicList"/>
  </div>
</template>
<script>
// import { useRoute } from 'vue-router'
import ArtistsTop from "../../components/songer/ArtistsTop.vue";
import ArtistsMusic from "../../components/songer/ArtistsMusic.vue";
import axios from "axios";
// import bus from "../../utils/bus";
import {mapState} from "vuex"
import { getArtistMusic} from "../../request/api/request";
export default {
  components: {
    ArtistsTop,
    ArtistsMusic,
  },
  data() {
    return {
      //接收discouverMusic页面传过来的歌曲id
      name: this.$route.query.name,
      playList: {}, //歌单详情
      musicList: [],
    };
  },
  computed:{
  },
  methods: {
    async getGeShouMusic() {
      // let res = await getArtistMusic(this.id);
      // console.log("99998",res);
      // this.musicList = res.data.songs;
      // console.log('name',this.name);
      axios.get("http://127.0.0.1:7001/song", {
        params: {
          name:this.name
        }
    }).then(res => {
        console.log('song',res);
        // this.artists = res.data.data;
        this.musicList = res.data.songs;
    })
    },
  },
  created() {
      this.playList=this.$store.state.artists
    //   console.log(99999,this.playList);
      this.getGeShouMusic()
    //  this.getDetail(this.id);
    // 监听事件，监听的就是触发的时候的事件 名字需要对应
  }
};
</script>
<style lang="" scoped>

</style>