<template>
    <div style="margin-top:20px">
        <BtnNav></BtnNav>
        <router-view></router-view>
    </div>
</template>
<script>
import BtnNav from '../../components/btnNav/BtnNav.vue'
export default {
    components: {
        BtnNav
    }
}
</script>
<style lang="scss">

</style>