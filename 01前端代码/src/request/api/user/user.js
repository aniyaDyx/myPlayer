import request from '@/utils/request.js'

// 获取用户信息
export const getUserAccount = function (cookier) {

  return request.get('/user/account', {
    params: {
      cookie: cookier,
      timestamp: new Date().getTime(),
      withCredentials: true
    }
  })
}
//添加到我的收藏（喜欢）
export const setXihuanList = function (id,like) {
console.log("添加到我的收藏（喜欢）");
   return request.get(`/like?cookie=${sessionStorage.getItem("cookie")}`, {
     params: {
      id: id,
      like:like,
      timestamp: new Date().getTime(),
      withCredentials: true,
     }
   })
 }
   //获取我的收藏（喜欢）列表
export const getXihuanList = function (uid) {
  console.log("获取我的收藏（喜欢）的id");
     return request.get(`/likelist?cookie=${sessionStorage.getItem("cookie")}`, {
       params: {
        uid: uid,
        timestamp: new Date().getTime(),
        withCredentials: true,
       }
     })
   }

   //根据收藏（喜欢）列表id-获取歌曲详情
   export const getLikeList = function (ids) {
    console.log("ur-获取我的收藏（喜欢）获取歌曲详情");
       return request.get('/song/detail', {
         params: {
          ids: ids,
          // timestamp: new Date().getTime(),
          withCredentials: true,
         }
       })
     }