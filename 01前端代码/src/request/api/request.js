import service from "..";

//获取轮播图
export function getBanner() {
    return service({
        method:'GET',
        url:"banner?type=0",
    })
}
//获取推荐列表
export function getMusicList() {
    return service({
        method:'GET',
        url:"/personalized?limit=10",
    })
}
//获取推荐列表详情
export function getMusicDetail(mid) {
    return service({
        method:'GET',
        url:`/playlist/detail?id=${mid}`,
    })
}
//获取推荐列表歌曲
export function getMusicItemList(mid) {
    return service({
        method:'GET',
        url:`/playlist/track/all?id=${mid}&limit=10&offset=0`,
    })
}
//获取歌曲中的歌词
export function getMusicLyric(mid) {
    return service({
        method:'GET',
        url:`/lyric?id=${mid}`,
    })
}
// mv详情页
// 获取mv地址
export function getMvSrc(mid) {
    return service({
        method: 'GET',
        url: `/mv/url?id=${mid}`,
    })
}

// 获取mv相似推荐
export function getSimiMv(mid) {
    return service({
        method: 'GET',
        url: `/simi/mv?mvid=${mid}`,
    })
}

//获取mv详情
export function getMvInfo(mid) {
    return service({
        method: 'GET',
        url: `/mv/detail?mvid=${mid}`,
    })
}

//获取歌手
export function getArtist(){
    return service({
        method: 'GET',
        url: "/top/artists?offset=0&limit=10",
    })
}
//获取歌手歌曲
export function getArtistMusic(mid){
    return service({
        method: 'GET',
        url: `/artist/top/song?id=${mid}`,
    })
}
//获取搜索后的歌曲
export function getSearch(value){
    return service({
        method: 'GET',
        url: `/search?keywords=${value}&limit=30`,
    })
}


//排行榜获取
export function getMusicRanking() {
    return service({
        method:'GET',
        url:`/toplist/detail`,
    })
}
//排行榜歌曲
export function musicP(id) {
    return service({
        method:'GET',
        url:`/playlist/detail?id=${id}`,
    })
}

// //获取mv评论
// export function getMvPL(mid){
//     return service({
//         method: 'GET',
//         url: `/comment/mv?id=${mid}`,
//     })
// }

//获取全部mv（选择类型）
export function getListMv(area, type, order, limit){
    console.log("接口",area, type, order, limit);
    return service({
        method: 'GET',

        url: `/mv/all?area=${area}&type=${type}&order=${order}&limit=${limit}`,
    })
}

// //添加到我的收藏（喜欢）
// export function setXihuanList(id,like,time){
//     console.log("接口-当前歌曲id",id,like,time);
//     return service({
//         method: 'GET',
//         url: `/like?id=${id}&lile=${like}`,
//     })
// }

// //获取我的收藏（喜欢）列表
// export function getXihuanList(uid){
//     console.log("接口-当前用户id",uid);
//     return service({
//         method: 'GET',
//         url: `/likelist?uid=${uid}`,
//     })
// }

//用户退出
export function out() {
    return service({
        method:'GET',
        url:"/logout",
    })
}
//修改用户信息
export function updataUserInfo(ele1,ele2,ele3,ele4,ele5){
    return service({
        method: 'GET',
        url: `/user/update?time=${new Date().getTime()} `,
        params:{
            gender: ele1,
            signature:ele2,
            nickname:ele3,
            birthday:ele4,
            province:ele5[0],
            city:ele5[1],
            cookie:sessionStorage.getItem('cookie')
          }   
    })
}

//获取新歌速递
export function getNewMusic(type) {
    return service({
        method: 'GET',
        url: `/top/song?type=${type}`,
    })
}
//获取新碟上架
export function getNewDiscMusic() {
    return service({
        method: 'GET',
        url: `/top/album?limit=30&area=ALL`,
    })
}





