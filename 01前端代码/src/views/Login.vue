<template>
  <div class="bbox">
    <div class="top">
      <div class="topp">
        登录
       <router-link to="/" >  <i class="el-icon-close"  style="color:white">  </i> </router-link>
      </div>
    </div>
    <div class="mid">
        <img src="https://p6.music.126.net/obj/wo3DlcOGw6DClTvDisK1/9647707645/c8e7/4d8d/1895/6dff82b63181104bbac7cf3743c8b613.png" alt=""style="width:250px;" >
        <router-link to="/loginbyname"><el-button type="primary" style="width:280px;height:33px">用户名登录</el-button></router-link>
       <router-link to="/loginbyphone"><el-button type="primary" style="width:280px;height:33px">短信登录</el-button></router-link>
        <router-link to="/register"><el-button type="primary" style="width:280px;height:33px" >注册</el-button></router-link>
         </div>
 <router-link to="/loginbycode"><img src="https://p6.music.126.net/obj/wo3DlcOGw6DClTvDisK1/9656441793/9f07/c197/3af2/f07b8d6ef20964be159ce812841fc9d2.png" alt="" class="code"></el-button></router-link>
  </div>
</template>

<style lang="scss" scoped>
.bbox {
  margin: auto;
  position: relative;
  width: 700px;
  // height: 370px;
  background-color: #fff;
  border: #333 solid 1px;
}
.top {
  width: 700px;
  height: 50px;
  background-color: rgb(49, 35, 35);
  color: white;
}
.topp {
  font-weight: bold;
  margin-left: 18px;
  margin-right: 18px;
  padding-top: 16px;
  display: flex;
  justify-content: space-between;
}
.mid{
    margin-top: 8px;
    // margin-left: 52px;
   padding-left: 93px;
    padding-top: 21px;
    padding-bottom: 10px;
    margin: auto;
    width: 400px;
    display: flex;
    flex-wrap:wrap;
     align-items:center;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);


}

.mima{
    margin-top: 20px;
}
// .right{
//        width: 210px;
//     height: 260px;
//     // background-color: red;
//     position: absolute;
//     float:right;
//         right: 20px;
//     top:67px;
//     border-left-style: dashed 2px;
//     box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
//     z-index:1000
// }
.mid button{
    background-color: rgb(49, 125, 200);
    color: #fff;
   margin-top: 15px;


   
   }
   .mid img{
       margin-bottom:10px ;
   }
   .code{
     position: absolute;
     bottom: 0;
     right:0;
     width: 50px;
     height: 50px;
   }


</style>