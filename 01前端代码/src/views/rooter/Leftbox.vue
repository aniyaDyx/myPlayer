<template>
  <div class>
    <div class="aside">
      <ul>
        <li
          v-for="(item, index) in leftList"
          :key="index"
          @click="ActiveShow(index)"
          :class="{ isActive: isActive == index }"
        >
          <router-link :to="item.path">{{ item.name }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      leftList: [
        {
          path: "/searchmusic",
          name: "查找",
        },
        {
          path: "/sendmusic",
          name: "发布",
        },
        {
          path: "/ckmusic",
          name: "查看",
        },
      ],
      isActive: 0,
    };
  },
  methods: {
    ActiveShow(n) {
      this.isActive = n;
    },
  },
};
</script>
<style lang="scss" scoped>
.isActive {
  font-size: 26px;
  font-weight: 700;
  //background-color: #e0e0e0;
}

.aside {
  //width: 160px;
  position: absolute;
  left: 20px;
  top: 0;
  font-size: 18px;
}

.aside ul {
  display: flex;
}

.aside li {
  height: 60px;
  //width: 100px;
  padding: 0 10px;
  line-height: 60px;
}

.aside li a {
  display: inline-block;
  height: 40px;
  width: 60px;
}
</style>