<template>
    <div class="navbox">
        <div class="navboxcontent">
            <ul>
                <li v-for="(item,index) in datalist" :key="index" @click="ActiveShow(index)" :class="{isActive: isActive===index}">
                    <router-link :to="item.path">{{ item.name }}</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isActive: 0,
            num:0,
            datalist: [
                {
                    path: 'discoverMusic',
                    name: '个性推荐',
                },
            
                {
                    path: '/personalrecom/toplist',
                    name: '排行榜',
                },
                {
                    path: '/personalrecom/artistlist',
                    name: '歌手',
                },
                {
                    path: '/personalrecom/new',
                    name: '最新音乐',
                }
            ]
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
}
.navbox {
    width: 1200px;
    height: 40px;
    display: flex;
    line-height: 40px;
    /* background-color: rgb(234, 234, 234); */
    font-size: 14px;
}

.navboxcontent ul {
    display: flex;
}

.navboxcontent li{
    margin-right: 30px;
}

.navboxcontent li a {
    display: inline-block;
    height: 100%;
    width: 100%;
}

.navboxcontent li:first-child {
    margin-left: -5px;
}

</style>