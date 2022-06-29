<template>
  <div class="mvplay">
    <!-- mv详情 -->
    <div class="mvxiangqing">
      <h2 class="mvxq" @click="$router.go(-1)">
        <svg class="icon zuojiantou" aria-hidden="true">
          <use xlink:href="#icon-zuojiantou1"></use>
        </svg>
        mv详情
      </h2>

      <video autoplay controls :src="mvSrc"></video>
      <!-- 歌手 -->

      <div><img :src="mvInfo.cover" alt="" class="songpersonImg" />{{ mvInfo.artistName }}</div>
      <!-- 歌名 -->
      <h2>{{ mvInfo.name }}</h2>
      <div class="fabu">
        发布时间 <span> {{ mvInfo.publishTime }}</span>
        &nbsp;&nbsp;&nbsp;
        播放次数<span>{{ mvInfo.playCount / 10000 }} 万</span>

      </div>
      <!-- mv标签 -->
      <div class="mvLabal">
        标签 <div class="mvLabalbox" v-for="(item, index) in mvInfo.videoGroup" :key="index">

          <span> {{ item.name }}</span>

        </div>
      </div>
      <!-- mv简介 -->
      <div class="jianjie">
        简介： {{ mvInfo.desc ? mvInfo.desc : '无' }}</div>
      <!-- <div class="btn">
        <div>赞</div>
        <div>收藏</div>
        <div>分享</div>
      </div> -->

    </div>

    <!-- 相关推荐 -->
    <div class="tuijian" >
      <h2 style="margin-top:50px">相关推荐</h2>
      <div class="tuijianbox">
        <div v-for="(item, index) in simiMvs" :key="index" class="item tjbox">
          <div class="tjleft">
            <svg class="icon" aria-hidden="true" id="xihuan">
              <use xlink:href="#icon-bofang"></use>
            </svg>
            <img :src="item.cover" alt="" @click="getMvid(item.id)" />
          </div>
          <div class="tjright">
            <!-- 歌名 -->
            <div class="songname">{{ item.name }}</div>
            <!-- 作者名 -->
            <div class="songperson">by {{ item.artistName }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

// 导入 axios
import axios from 'axios'
import { getMvSrc, getSimiMv, getMvInfo} from "../../request/api/request";
// import {   getMvPLdata,getMvPL } from "../../request/api/request";
export default {

  data() {
    return {
      mvid: '',
      mvSrc: '',
      simiMvs: [],
      mvInfo: [],
      plInfo:[],
      mvimgSrcArr: [
        { id: 'mvImgid', src: 'mvSrc' },
      ]
    }
  },
  methods: {
    async getMvid(ele) {
      // 获取mv地址
      let res1 = await getMvSrc(ele)
           console.log("返回mv视频路径", res1 );
      console.log("返回mv视频路径", res1.data.data.url);
      this.mvSrc = res1.data.data.url

      // 获取mv相似推荐
      let res2 = await getSimiMv(ele)
      console.log("获取mv相似推荐", res2.data.mvs);
      this.simiMvs = res2.data.mvs

      //获取mv详情
      let res3 = await getMvInfo(ele)
      console.log("获取MV的详情", res3.data.data);
      this.mvInfo = res3.data.data

      // //获取mv评论等数据
      // let res4 = await getMvPLdata(ele)
      // console.log("获取MV的评论等数据", res4);
      // this.mvInfo = res4.data

      // //获取mv评论
      // let res5 = await getMvPL(ele)
      // console.log("获取MV的评论", res5);
      // // this.mvInfo = res5.data
    },




  },
  created() {
  },
  mounted() {
    console.log("this.$route.query.mvid",this.$route.query.mvid);
     this.mvid=this.$route.query.mvid
    this.getMvid(this.mvid)
  }

}
</script>

<style lang="scss" scoped>
h2 {
  margin: 10px;

}

.mvplay {
  display: flex;
  margin-left: -100px;
}

.mvxiangqing {
  margin: 10px 100px;
}

video {
  margin-top: -60px;
  height: 480px;
  width: 700px;

}

.fabu {
  color: gray;
  font-size: 11px;
  margin: 10px;
}

.btn {
  display: flex;
}

.songpersonImg {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin: 10px;
}

.btn>div {
  font-size: 15px;

  width: 60px;
  border: 1px solid rgb(167, 167, 167);
  border-radius: 40px;
  padding: 3px 10px;
  margin: 10px;

}

input {
  width: 500px;
  height: 200px;
}

// 推荐

.tuijian {
  width: 300px;
  // background-color: beige;
}

.tuijianbox {
  position: relative;

  //  height: 800px;
  //   background-color: beige;

  justify-content: space-evenly;

  .tjbox {
    display: flex;
    margin: 5px;
    padding: 5px;
    height: 80px;
    // background-color: rgb(228, 228, 150);

    svg {
      position: absolute;
      left: 150px;
      top: 55px;
      display: none;
      width: 50px;
      height: 50px;
      // color: red;
    }

    img {
      width: 130px;
      height: 80px;
      border-radius: 10px;
    }

    .tjright {
      padding: 10px;

      .songname {
        line-height: 20px;
        font-size: 14px;
        height: 40px;
        width: 130px;
        overflow: hidden;
        text-overflow: ellipsis;
        // border: 1px solid black;
        /*弹性伸缩盒子模型显示*/
        display: -webkit-box;
        /*限制在一个块元素显示的文本的行数*/
        -webkit-line-clamp: 2;
        /*设置或检索伸缩盒对象的子元素的排列方式*/
        -webkit-box-orient: vertical;
      }

      .songperson {
        padding: 5px 0px;
        color: gray;
        font-size: 12px;
      }
    }

  }
}



// mv标签
.mvLabal {
  display: flex;
  padding: 10px;

  span {
    border: 1px solid rgb(243, 243, 243);
    border-radius: 10px;
    padding: 5px;
    margin: 15px;
    background-color: rgb(243, 243, 243);
  }
}

.jianjie {
  margin: 20px 10px;
  line-height: 30px;
}
.mvxq {
  font-weight: 700;
  line-height: 40px;
  position: relative;
  // background-color: red;
  width: 120px;
  padding: 10px;
  text-align: center;

}

.zuojiantou {
  position: absolute;
  top: 19px;
  font-weight: 700;
  height: 20px;
  width: 20px;
  line-height: 40px;
  left: 0px;
}
</style>