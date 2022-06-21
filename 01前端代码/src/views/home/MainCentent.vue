<template>
    <div class="main">
        <div class="aside">
          <ul>
            <li v-for="(item,index) in leftList" :key="index" @click="ActiveShow(index)" :class="{isActive: isActive==index}">
                <router-link :to="item.path">{{ item.name }}</router-link>
            </li>
          </ul>
        </div>
        
      </div>
</template>
<script>
export default {
    components: {
    },
    data() {
        return {
            leftList: [
                {
                    path: '/personalrecom',
                    name: '发现音乐'
                },
                {
                    path: '/videos',
                    name: '视频'
                },
                {
                    path: '/recentlyplayed',
                    name: '最近播放'
                },
                {
                    path: '/collection',
                    name: '我的收藏'
                }
            ],
            isActive: 0
        }
    },
    methods: {
        ActiveShow(n) {
            this.isActive = n;
        }
    },
}
</script>
<style lang="scss" scoped>
.isActive {
    font-size: 16px;
    font-weight: 700;
    background-color: #e0e0e0;
}

.main {
  position: relative;
  left: 0;
  top: 0;
}

.aside {
  width: 200px;
  position: absolute;
  left: 0;
  top: 0;
  font-size: 14px;
}

.aside ul {
  border-right: 1px solid #ccc;
}

.aside li {
  height: 40px;
  width: 160px;
  padding: 0 20px;
  margin-bottom: 3px;
  line-height: 40px;
}

.aside li a {
    display: inline-block;
    height: 40px;
    width: 160px;
}

.main-right {
  position: relative;
  /* background-color: antiquewhite; */
  top: 0;
  left: 200px;
  padding-top: 10px;
  padding-left: 20px;
  height: 600px;
}
</style>