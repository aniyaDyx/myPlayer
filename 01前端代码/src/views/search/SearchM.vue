<template>
  <div>
      <!-- <ArtistsTop :playList="playList"/> -->
      <ArtistsMusic :musicList="musicList"/>
  </div>
</template>
<script>
// import { useRoute } from 'vue-router'
// import ArtistsTop from "../../components/songer/ArtistsTop.vue";
import ArtistsMusic from "../../components/search/ArtistsMusic.vue";

// import bus from "../../utils/bus";
import {mapState} from "vuex"
// import { getArtistMusic} from "../../request/api/request";
import axios from "axios"
import { getSearch } from "../../request/api/request"
export default {
  components: {
    // ArtistsTop,
    ArtistsMusic,
  },
  data() {
    return {
      //接收discouverMusic页面传过来的歌曲id
    //   id: this.$route.query.id,
    //   secrchkeys: '', //歌单详情
      musicList: [],
    };
  },
  computed:{
  },
  methods: {
     async getSearch(){
      let res = await getSearch(this.$store.state.searchKey);
      console.log('songs',res);
      this.musicList = res.data.result.songs;
      // this.$store.commit('updateSearchKey',res.data.result.songs);
      // console.log(this.key,res.data.result.songs);
    }
  },
  mounted() {
    //  this.musicList=this.$store.state.searchList
    // console.log('ggg',this.$store.state.searchList);
    this.getSearch()
  }
   
  }

</script>
<style lang="">
</style>