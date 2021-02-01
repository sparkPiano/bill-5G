<!--
 * @Description: 服务开通成功模板
 * @Version: 1.0.2
 * @Author: Edision Lu
 * @Date: 2020-06-20 15:40:57
 * @LastEditor: dahuyingxiong666@gmail.com
 * @LastEditTime: 2020-07-21 15:29:10
 * @FilePath: \ccbProject\ccb_5g\src\views\services\success\Index.vue
-->
<template>
  <div class="success">
    <XSuccess></XSuccess>
  </div>
</template>
<script>
export default {
  name: "success",
  data() {
    return {};
  },
  components: {
    XSuccess: () => import("@/components/services/XSuccess.vue")
  }
};
</script>
<style less="lang">
.x-success_img {
  position: relative;
  margin-top: 50px !important;
}
.x-success_tip {
  margin-top: 30px;
  color: rgb(39, 136, 219);
  text-align: center;
}
</style>
