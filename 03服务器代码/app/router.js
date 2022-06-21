'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  //1、用户名登录 register
  router.post('/loginbyname', controller.user.loginbyname)
  //2、注册
  router.post('/register', controller.user.register)
  //3、判断登录状态
  // router.post('/judgeULogin', controller.user.judgeULogin);
  //4、获取用户名和头像
  // router.post('/showUinfo', controller.user.showUinfo);

  //查找歌手
  router.get('/artists', controller.music.artists);

  //获取歌手
  router.get('/ar', controller.music.ar);
  //获取歌手歌曲
  router.get('/song', controller.music.song);


  

    //更新歌手
    router.get('/gsup', controller.music.gsup);
    //歌曲列表
    router.get('/songss', controller.music.songss);
  
  //查找歌曲
  router.get('/songs', controller.music.songs);

  //测试添加歌曲
  router.get('/dd', controller.music.dd);
  router.get('/dd1', controller.music.dd1);

  //更新歌表的数据
  router.get('/songs23', controller.music.updataSongs);
  //删除数据delsongs
  router.get('/delsongs', controller.music.delSongs);

};
