<template>
  <div class="search">
    <div class="bigbox">
      <!-- 输入框 -->
      <div class="inputbox">
        <input
          v-model="input"
          class="input1"
          placeholder="请输入要查找的歌曲或歌手"
          @focus="focusEvent"
          @blur="blurEvent"
        />
        <div class="keybox" v-show="isshow">
          <ul>
            <li v-for="(item,index) in keyslist" @click="inputchange(item)" :key="index">{{item}}</li>
          </ul>
        </div>
      </div>
      <!-- 搜索按钮 -->
      <div class="buttonbox">
        <!-- <el-button round>搜索</el-button> -->
        <el-button round icon="el-icon-search" class="ssbtn" @click="btnSearch">搜索</el-button>
      </div>
      <!-- 热门推荐歌曲 -->
      <div class="rmbq">
        <p>热门歌曲：</p>
        <span>双截棍</span>
        <span>小黄鸭</span>
        <span>两只老虎</span>
        <span>门前大桥下</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      input: "",
      keyslist: [],
      isshow: false
    };
  },
  methods: {
    inputchange(v) {
      this.input = v;
      this.isshow = false;
      //https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=%E5%8A%A0%E6%B2%B9&json=1
    },
    //获取焦点
    focusEvent() {
      this.isshow = true;
    },
    //失去焦点
    blurEvent() {
      // console.log(111);
      setTimeout(() => {
        this.isshow = false;
      }, 1);
    },

    btnSearch() {
      if (!this.input) {
        alert("内容不能为空");
        return;
      }
      //传参到详情界面
      this.$router.push({
        path: "/xqmusic",
        query: { res: this.input }
      });
    }
  },
  watch: {
    //监听输入框发起请求实现智能关键词提示
    input() {
      // console.log(this.input);
      this.$axios({
        // method: 'GET',
        url: `/ddd/su?wd=${this.input}&json=1`
      }).then(res => {
        // console.log(res.data);
        // console.log(res.data.substring(17));
        let ss = res.data.substring(17);
        let dd = ss.substring(0, ss.length - 2);
        // console.log(JSON.parse(dd));
        this.keyslist = JSON.parse(dd).s;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.iswidth {
  width: 0;
}

.search {
  width: 100vw;
  height: 100%;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  padding-top: 30vh;
  //background-color: #ec4141;
  background: linear-gradient(
    125deg,
    #2c3e50,
    #27ae60,
    #2980b9,
    #e74c3c,
    #8e44ad
  );
  background-size: 500%;
  animation: bg 5s linear infinite alternate-reverse;
}
@keyframes bg {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}
.inputbox {
  width: 600px;
  height: 60px;
  margin: 0 auto;

  .keybox {
    position: relative;
    top: 10px;
    //height: 60px;
    width: 300px;
    margin: 0 auto;
    background-color: #eedddb;
    border-radius: 5px;
    text-align: center;

    ul {
      li {
        //display: block;
        padding: 5px 0;
        font-size: 20px;
      }

      li:hover {
        font-size: 40px;
      }
    }
  }
}
.buttonbox {
  padding-top: 20px;
  width: 200px;
  margin: 0 auto;
  text-align: center;

  .ssbtn {
    background-color: #c6d2da2d;
    color: #fff;
  }

  .ssbtn:hover {
    background-color: #236fa32d;
    color: rgb(176, 34, 34);
    font-size: 18px;
  }
}

.input1 {
  height: 60px;
  width: 600px;
  font-size: 30px;
  text-align: center;
  border-radius: 15px;
  border: 1px solid rgb(255, 213, 213);
  background-color: #cedad318;
}

.rmbq {
  padding-top: 20px;
  width: 600px;
  height: 60px;
  margin: 0 auto;
  font-size: 16px;
}
.rmbq p {
  display: inline;
  margin-right: 10px;
}
.rmbq span {
  font-size: 14px;
  margin-right: 6px;
}
.rmbq span:hover {
  color: #ec4141;
}
</style>