<!--
 * @Description: 当前账单
 * @Version: 1.0.2
 * @Author: Edision Lu
 * @Date: 2020-06-22 17:19:52
 * @LastEditor: dahuyingxiong666@gmail.com
 * @LastEditTime: 2020-07-21 15:35:08
 * @FilePath: \ccbProject\ccb_5g\src\views\billingdetails\currentBilling\Index.vue
-->
<template>
  <div class="currbilling">
    <transition
      @after-enter="$vux.bus && $vux.bus.$emit('vux:after-view-enter')"
      :name="viewTransition"
      :css="!!direction"
    >
      <router-view></router-view>
    </transition>
    <!-- <XCurrBilling></XCurrBilling> -->
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "currbilling",
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
    // XCurrBilling: () =>
    //   import("../../../components/billing/currBilling/XCurrBilling.vue")
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
  opacity: 0.5;
}
button.weui-btn.active,
input.weui-btn.active {
  opacity: 1;
}

.weui-btn_primary {
  background-color: rgb(0, 120, 255) !important;
}
</style>
