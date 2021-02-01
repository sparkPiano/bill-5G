<!--
 * @Description: 未出账单
 * @Version: 1.0.2
 * @Author: Edision Lu
 * @Date: 2020-06-22 17:20:07
 * @LastEditor: dahuyingxiong666@gmail.com
 * @LastEditTime: 2020-07-21 15:33:35
 * @FilePath: \ccbProject\ccb_5g\src\views\billingdetails\unbilled\Index.vue
-->
<template>
  <div class="unbilled">
    <XUnbilled></XUnbilled>
  </div>
</template>
<script>
export default {
  name: "unbilled",
  data() {
    return {};
  },
  components: {
    XUnbilled: () =>
      import("../../../components/billing/unbilled/XUnbilled.vue")
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
