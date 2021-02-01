<!--
 * @Description: 账单明细
 * @Version: 1.0.2
 * @Author: Edision Lu
 * @Date: 2020-06-22 12:42:48
 * @LastEditor: dahuyingxiong666@gmail.com
 * @LastEditTime: 2020-07-21 15:33:08
 * @FilePath: \ccbProject\ccb_5g\src\views\billingdetails\Index.vue
-->
<template>
  <div class="billing">
    <XBillingDetails></XBillingDetails>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  name: "billing",
  data() {
    return {};
  },
  components: {
    XBillingDetails: () =>
      import("../../components/billing/XBillingDetails.vue")
  },
  mounted() {
    
  },
  methods: {

  },
  watch: {

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
