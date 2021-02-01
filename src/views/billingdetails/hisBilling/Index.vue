<!--
 * @Description: 历史账单
 * @Version: 1.0.2
 * @Author: Edision Lu
 * @Date: 2020-06-22 17:19:59
 * @LastEditor: dahuyingxiong666@gmail.com
 * @LastEditTime: 2020-07-21 15:34:39
 * @FilePath: \ccbProject\ccb_5g\src\views\billingdetails\hisBilling\Index.vue
-->
<template>
  <div class="hisbilling">
    <transition
      @after-enter="$vux.bus && $vux.bus.$emit('vux:after-view-enter')"
      :name="viewTransition"
      :css="!!direction"
    >
      <router-view></router-view>
    </transition>
    <!-- <XHisBilling></XHisBilling> -->
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "hisbilling",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      direction: state => state.vux.direction
    }),
    viewTransition() {
      let that = this;
      if (!that.direction) return "";
      return "vux-pop-" + (that.direction === "forward" ? "in" : "out");
    }
  },
  components: {
    // XHisBilling: () =>
    //   import("../../../components/billing/hisBilling/XHisBilling.vue")
  }
};
</script>
<style lang="less">
button.weui-btn,
input.weui-btn {
  width: 340px !important;
  border-radius: 30px !important;
  margin-top: 50px;
  font-size: 15px;
  letter-spacing: 5px;
  line-height: 3;
}

.weui-btn_primary {
  background-color: rgb(0, 120, 255) !important;
}
</style>
