<template>


    <div class="box" style="margin-left: 50px;margin-top:30px">
        <h2 style="margin-top: 20px">我的收藏</h2>

        <div class="layui-form">
            <table class="layui-table" style="width: 1200px !important">
                <colgroup>
                    <col width="30" />
                    <col />
                    <col width="60" />
                    <col />

                    <col width="300" />
                </colgroup>
                <thead>
                    <tr>
                        <th></th>
                        <th>歌曲标题</th>
                        <th>时长</th>
                        <th>歌手</th>
                        <th>专辑</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in musicList" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
                            <svg class="icon" aria-hidden="true" style="margin-right: 5px" @click="playMusic(index)">
                                <use xlink:href="#icon-bofanganniu"></use>
                            </svg>
                            {{ item.name }}
                            <svg class="icon" aria-hidden="true" style="margin-right: 5px" v-if="item.fee === 1">
                                <use xlink:href="#icon-vip-l"></use>
                            </svg>
                            <svg class="icon" aria-hidden="true" style="margin-right: 5px" v-if="item.mv != 0"
                                @click="toMV(item.mv)">
                                <use xlink:href="#icon-MV"></use>
                            </svg>
                        </td>
                        <td>{{ musicTime(item.dt) }}</td>
                        <td>
                            <span v-for="(ele, i) in item.ar" :key="i">
                                <span v-if="i == 1">/</span>
                                {{ ele.name }}
                            </span>
                        </td>
                        <td>{{ item.al.name }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

</template>
<script>

import { mapMutations } from "vuex";
import { getXihuanList, getLikeList } from '../../request/api/user/user'
export default {

    data() {
        return {
            userid: '',
            // liked:[],
            musicList: []
        }
    },

    created() {

    },
    mounted() {
        // console.log("co--userid", sessionStorage.getItem("userid"));
        this.userid = sessionStorage.getItem("userid");
        // console.log("this.userid", this.userid);
        this.getxihuan(this.userid);
    },
    methods: {
        async getxihuan(ele) {
            // 获取我的收藏（喜欢）
            let res1 = await getXihuanList(ele);

            // console.log("1111返回我的收藏（喜欢）", res1.data.ids);
            this.liked(res1.data.ids);
            for (let i = 0; i < res1.data.ids.length; i++) {
                // console.log(res1.data.ids[i]);
                let res2 = await getLikeList(res1.data.ids[i])
                // console.log("1111获取我的收藏（喜欢）歌曲详情", res2.data.songs);
                this.musicList.push(res2.data.songs[0])

            }
            console.log("我的收藏（喜欢）歌曲详情this.musicList", this.musicList);
        },

        musicTime(mt) {
            let allsecond = parseInt(mt / 1000); //歌曲总时长
            let mimute = parseInt(allsecond / 60); //歌曲的分钟数
            let second = allsecond % 60; //歌曲的秒数
            let timer;
            // console.log('hhhhh',second);updateMusictime
            if (second === 0) {
                second = "00";
            } else if (second < 10 && second > 0) {
                second = '0' + second
            }
            if (mimute < 10) {
                timer = "0" + mimute + ":" + second;
            } else {
                timer = mimute + ":" + second;
            }
            // this.mstime.push(timer);
            return timer;
        },
        playMusic(i) {
            // console.log(555, this.timer);
            this.updatePlayList(this.musicList);
            this.updatePlayListIndex(i);
            // this.updateMusictime(this.mstime[i]);
        },
        // 去mv详情页
        toMV(id) {
            //  console.log("去mv详情页",id);
            this.$router.push('/mvdetail?mvid=' + id)

        },
        ...mapMutations([
            "updatePlayList",
            "updatePlayListIndex",
            "updateMusictime",
            "updateMusictime",
            "liked"
        ]),

    },
    watch: {
        musictime() {
            // console.log(999999999999);
        },
    },

}
</script>
<style lang="scss" scoped>
h2 {
    font-weight: bolder;
    margin: 20px;

}

.icon {
    width: 17px;
    height: 17px;
}
</style>