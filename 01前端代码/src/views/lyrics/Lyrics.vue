<template>
  <div class="lyrbox">
    <img :src="playList[playListIndex].al.picUrl" class="bg" v-if="playList[playListIndex].al!=undefined " />
    <img :src="`https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg`" class="bg" v-else />
    <div class="marginbox" style="z-index: 10000">
      <div class="top">
        <div style="font-size: 30px">
          {{ this.$store.state.playList[playListIndex].name }}
        </div>
        <div style="font-size: 20px; color: #111">
          <!-- {{ this.$store.state.playList[playListIndex].ar[0].name }} -->
          <span class="bfperson" v-if="this.$store.state.playList[playListIndex].ar!==undefined">{{ playList[playListIndex].ar[0].name }}</span>
        <span class="bfperson" v-else>{{ this.$store.state.playList[playListIndex].artists[0].name }}</span>
        </div>
      </div>
      <div class="content" style="display: flex">
        <div class="left">
          <img
            src="../../assets/cizhen.png"
            class="cizhen"
            :class="{ cizhen_active: !isbtnShow }"
          />
          <img
           v-if="playList[playListIndex].al!=undefined " 
            :src="playList[playListIndex].al.picUrl"
            class="centerimg"
            :class="{ cipan_run: !isbtnShow, cipan_paused: isbtnShow }"
            
          />
           <img
            :src="`https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg`"
            class="centerimg"
            :class="{ cipan_run: !isbtnShow, cipan_paused: isbtnShow }"
            v-else 
          />
          <img src="../../assets/cipan.png" class="cipan" />
        </div>
        <div class="right" ref="musicLyric">
          <div class="lyric">
            <p v-for="(item,index) in lyrics" :key="index" :class="{active:(currentTime *1000>=item.time && currentTime*1000<item.pre)}">
              {{item.lyc}}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState} from "vuex";
export default {
  components: {
    name: "Lyrics",
  },
  data() {
    return {
      mstime: "",
    };
  },
  methods:{
    getrgb(){
      let rgb =document.body.style.backgroundColor
      console.log(rgb);
    }
  },
  mounted() {
    console.log("gggggggg", this.$store.state.musictime);
    // console.log(this.playListIndex);
    this.getrgb()

  },
  computed: {
    ...mapState([
      "playList",
      "playListIndex",
      "musictime",
      "isbtnShow",
      "lyricList",
      "currentTime"
    ]),
    lyrics() {
      //对歌词进行处理
      let arr;
      if (this.lyricList.lyric) {
        arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
          let min = item.slice(1, 3); //获取分钟
          let second = item.slice(4, 6); //秒
          let mill = item.slice(7, 10); //毫秒
          let lyc = item.slice(11, item.length); //获取歌词
          let time = parseInt(min)*60*1000+parseInt(second)*1000+parseInt(mill);//对应时间对应歌词的处理
          if (isNaN(Number(mill))) {
            //毫秒数为三位时
            mill = item.slice(7, 9);
            lyc = item.slice(10, item.length);
            time = parseInt(min)*60*1000+parseInt(second)*1000+parseInt(mill);
          }
          // console.log(this.currentTime);
          // console.log(min,second,mill,lyc);
          return { min, second, mill, lyc ,time};
        });
        arr.forEach((item,i) => {
          if(i===arr.length-1 || isNaN(arr[i+1].time)){
            item.pre=10000
          }else {
            item.pre=arr[i+1].time
          }
        });
      }
      // console.log(arr);
      return arr;
    },
  },
  watch:{
    currentTime(){//处理歌词滚动
      let p = document.querySelector(".active");
      // console.log(666,[p]);
      if(p){
        if(p.offsetTop>200){
        this.$refs.musicLyric.scrollTop=(p.offsetTop-210);
      }
      }
      
      // console.log([this.$refs.musicLyric]);
    }
  }
};
</script>
<style lang="scss" scoped>
.lyrbox {
  width: 100%;
  height: 90vh;
  //   background-color: red;
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    z-index: -2;
    filter: blur(170px);
    // z-index: 1;
  }
}
.marginbox {
  margin: 0 auto;
  width: 80%;
  height: 100%;
  //   background-color: yellow;
  .top {
    padding-top: 50px;
    div {
      text-align: center;
      width: 800px;
      height: 50px;
      margin: 0 auto;
    }
  }
}
.left {
  width: 200px;
  height: 500px;
  position: relative;
  left: 90px;
  .cizhen {
    width: 100px;
    position: absolute;
    top: 0;
    left: 120px;
    z-index: 1000;
    transform-origin: 0 0;
    transform: rotate(-30deg);
    transition: all 2s;
  }
  .cizhen_active {
    width: 100px;
    position: absolute;
    top: 0;
    left: 120px;
    z-index: 1000;
    transform-origin: 0 0;
    transform: rotate(0deg);
    transition: all 2s;
  }

  .centerimg {
    position: absolute;
    top: 120px;
    left: 47px;
    width: 189px;
    height: 189px;
    border-radius: 50%;
    animation: routate_img 10s linear infinite;
  }
  .cipan {
    width: 280px;
    position: absolute;
    top: 80px;
    left: 0;
  }
  @keyframes routate_img {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
  .cipan_run {
    animation-play-state: running;
  }
  .cipan_paused {
    animation-play-state: paused;
  }
}
.right {
  position: relative;
  // background-color: yellow;
  left: 230px;
  width: 500px;
  height: 440px;
  text-align: center;
  overflow: scroll;
   overflow: hidden;
  p {
    margin-bottom: 15px;
  }
  .active {
    font-size: 20px;
    font-weight: 300px;
  }
}
</style>