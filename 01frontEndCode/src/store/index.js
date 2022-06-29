import Vue from 'vue'
// 引入vuex
import Vuex from 'vuex'
// 启用vuex
Vue.use(Vuex)

//获取歌词
import {getMusicLyric} from "../request/api/request"

// 创建vuex实例
export default new Vuex.Store({
  state: {
    playList: [{
      al: {
        id: 0,//图片id
        name: '未知',
        pic: 0,
        picUrl: "https://p2.music.126.net/vVNZDKMKb6mMEXxNljaA_g==/109951165274426604.jpg",
        pic_str: ""
      },
      id: 1474411443,//歌曲id
      ar: [{name:'王心凌'}],//歌手
      name: '爱你',//歌曲名
      artists:[{name:''}],
      // ar:{
      //   name:'未知'
      // },
      lyricList:{},//歌词
    }],
    musictime: '00:00',
    playListIndex: 0,//默认播放列表下标
    isbtnShow: true,//播放/暂停按钮的显示
    detailShow: false ,//显示歌曲详情
    currentTime:0,//当前时间
    duration:0,//歌曲总长度
    artists:{},//歌手信息
    searchKey:'',//搜索后的关键字
    likedListid:[]//已喜欢的歌曲id列表
    
  },
  mutations: {
    updateIsbtnShow(state, value) {//播放/暂停按钮的显示
      state.isbtnShow = value
    },
    updatePlayList(state, value) {//播放列表
      state.playList = value;
      console.log('eee', state.playList);
    },
    updatePlayListIndex(state, value) {//播放列表下标
      state.playListIndex = value
    },
    updataDetailShow(state) {//显示歌曲详情
      state.detailShow = !state.detailShow

    },
    updateMusictime(state,value){//歌曲列表时间
      state.musictime=value;
      // console.log(state.musictime,8888);
    },
    updateLyricList(state,value){//歌词
      state.lyricList=value
    },
    updateCurrentTime(state,value){//歌曲的当前播放时间
      state.currentTime=value
      // console.log("atttttttt",state.currentTime);
    },
    updateDuration(state,value){//当点击播放这首歌时的时间
      state.duration=value
    },
    updateArtists(state,value){//歌手
      state.artists=value
      // console.log("vvvv",state.artists);
    },
    updateSearchKey(state,value){//搜索框中的关键字
      state.searchKey=value
      // console.log("vvvv",state.searchList);
    },
    //已喜欢的歌曲id列表
    liked(state, value) {//播放列表
      // console.log("仓库-已喜欢的歌曲id列表,value-", value);
      state.likedListid = value;
      console.log('11仓库-已喜欢的歌曲id列表',state.likedListid );
    },
  },
  actions: {
    async getLyric(context,value){
        let res = await getMusicLyric(value);
        // console.log('sssssss',res);
        context.commit("updateLyricList",res.data.lrc)
    }
  },
  modules: {}
})