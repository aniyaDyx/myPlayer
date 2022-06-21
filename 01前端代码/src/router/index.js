import Vue from 'vue'
import VueRouter from "vue-router"
const Home = () => import('../views/Home.vue')
const DiscoverMusic= () => import('../views/home/DiscoverMusic.vue');
const Playlist = () => import('../views/playlist/Playlist.vue');
const Toplist = () => import('../views/home/Toplist.vue');
const Artistlist = () => import('../views/home/Artistlist.vue');
const New = () => import('../views/home/New.vue');
const Videos = () => import('../views/videoview/Videos.vue');
const RecentlyPlayed = () => import('../views/historyplay/RecentlyPlayed.vue');
const Collection = () => import('../views/collection/Collection.vue');
const Personalrecom= () => import('../views/home/Personalrecom.vue');
const Songer = () => import('../views/songer/Songer.vue');
const SearchM = () => import('../views/search/SearchM.vue');

const Mvdetail = () => import('../views/videoview/mvdetail.vue');

//登录
const Loginbyname= () => import('../views/user/Loginbyname.vue');
const Loginbyphone= () => import('../views/user/Loginbyphone.vue');
const Loginbycode= () => import('../views/user/Loginbycode.vue');
const Register= () => import('../views/user/Register.vue');
const Userinfo= () => import('../views/user/Userinfo.vue');
const Usernotlogoin= () => import('../views/user/Usernotlogoin.vue');

const Login = () => import('../views/Login.vue');

const Rooter = () => import('../views/rooter/Rooter.vue')
const Search = () => import('../views/search/Search.vue')
const SendMusic = () => import('../views/rooter/SendMusic.vue')
const Musicxq = () => import('../views/rooter/Musicxq.vue')
const CkMusic = () => import('../views/rooter/CkMusic.vue')

Vue.use(VueRouter) 

const routes = [
  {
    path: '/',
    component: Home,
    redirect: '/personalrecom',
    children: [
      {
        path: '/personalrecom',
        component: Personalrecom,
        redirect: '/personalrecom/discoverMusic',
        children: [
          {
            path: 'discoverMusic',
            component: DiscoverMusic,
            meta: {
              title: '个性推荐'
            }
          },
          {
            path: 'toplist',
            component: Toplist,
            meta: {
              title: '排行榜'
            }
          },
          {
            path: 'artistlist',
            component: Artistlist,
            // redirect:'Artistlist',
            meta: {
              title: '歌手'
            }
          },
          {
            path: 'new',
            component: New,
            meta: {
              title: '最新音乐'
            }
          }
        ],
        meta: {
          title: '个性推荐'
        }
      },
      {
        path: '/playlist',
        component: Playlist,
        meta: {
          title: '歌单'
        }
      },
      {
        path: '/songer',
        component: Songer,
        meta: {
          title: '歌单'
        }
      },
      {
        path: '/searchm',
        component: SearchM,
        meta: {
          title: '歌单'
        }
      },
      {
        path: '/videos',
        name: 'Videos',
        component: Videos,
        meta: {
          title: '视频'
        }
      },
      {
        path: '/recentlyplayed',
        name: 'RecentlyPlayed',
        component: RecentlyPlayed,
        meta: {
          title: '最近播放'
        }
      },
      {
        path: '/collection',
        name: 'Collection',
        component: Collection,
        meta: {
          title: '我的收藏'
        }
      },
      {
        path: '/mvdetail',
        name: 'Mvdetail',
        component: Mvdetail,
        meta: {
          title: 'MV详情页'
        }
      }
    ]
  },
  //用户登录
  {
    path: '/login',
    component: Login,
    meta:{
      title: '登录'
    }},

      //用户账号登录
    {
      path: '/loginbyname',
      name: 'Loginbyname',
      component: Loginbyname,
     mata:{
       title:'账号登录'
     }},
        //用户手机号登录
    {
      path: '/loginbyphone',
      name: 'Loginbyphone',
      component: Loginbyphone,
     mata:{
       title:'手机号登录'
     }
    },
    //用户二维码登录
    {
      path: '/loginbycode',
      name: 'Loginbycode',
      component:Loginbycode,
      mata:{
        title:'二维码登录'
      }
    },
    //用户注册
    {
      path: '/register',
      name: 'Register',
      
      component:Register,
      mata:{
        title:'注册'
      }
    },
     //个人信息页面
     {
      path: '/userinfo',
      name: 'Userinfo',

      component:Userinfo,
      mata:{
        title:'个人信息'
      }
    },

    //管理员
    {
      path: '/rooter',
      component: Rooter,
      redirect: '/searchmusic',
      children: [
        {
          path: '/searchmusic',
          component: Search,
          meta: {
            title: '查找音乐'
          },
        },
        {
          path: '/sendmusic',
          component: SendMusic,
          meta: {
            title: '发布音乐'
          },
        },
        {
          path: '/xqmusic',
          component: Musicxq,
          meta: {
            title: '音乐详情页'
          },
        },
        {
          path: '/ckmusic',
          component: CkMusic,
          meta: {
            title: '查看音乐'
          },
        }
  

        
      ]
    },

    //用户未登录
    {
      path: '/Usernotlogoin',
      name: 'Usernotlogoin',

      component:Usernotlogoin,
      mata:{
        title:'用户未登录'
      }},



]

const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'active',
})

router.beforeEach((to, from, next) => {
  console.log(to);
  console.log(from);
  if(to.path =='/collection'&& !sessionStorage.getItem("isLogin")){
    next('/Usernotlogoin')

  }else{
    next();
  }
    
 
 
})

export default router