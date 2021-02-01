<!--
 * @Description: 首页
 * @Version: 1.0.2
 * @Author: Edision Lu
 * @Date: 2020-05-25 15:18:58
 * @LastEditor: dahuyingxiong666@gmail.com
 * @LastEditTime: 2020-09-25 19:02:05
 * @FilePath: \ccbProject\ccb_5g\src\views\home\Home.vue
-->
<template>
  <div class="home">
    <!-- <div class="el-logo">
      <img :src="this.logo" />
    </div>-->
    <HomeGroup></HomeGroup>
  </div>
</template>

<script>
// import logo from "@/assets/images/logo.png";
// @ is an alias to /src
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "home",
  data() {
    return {};
  },
  created() {
    let that = this;
    console.log("created", that.$route.params.login);
  },
  mounted() {
    let that = this;
    console.log("mounted", that.$route.params.login);
  },
  components: {
    HomeGroup: () => import("@/components/homeGroup/HomeGroup.vue")
  }
};
</script>
<style lang="less" scoped></style>
