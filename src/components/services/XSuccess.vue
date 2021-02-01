<!--
 * @Description: 服务开通成功组件
 * @Version: 1.0.2
 * @Author: Edision Lu
 * @Date: 2020-06-21 01:35:52
 * @LastEditor: dahuyingxiong666@gmail.com
 * @LastEditTime: 2020-07-21 15:47:12
 * @FilePath: \ccbProject\ccb_5g\src\components\services\XSuccess.vue
-->
<template>
  <div class="x-success">
    <div class="x-success_img">
      <img :src="this.successImg" />
    </div>
    <div class="x-success_tip">
      <span class="x-success_tip__desc">提交成功</span>
    </div>
  </div>
</template>
<script>
import successImg from "../../assets/images/success.png";
export default {
  name: "x-success",
  data() {
    return {
      successImg: successImg
    };
  }
};
</script>
<style less="lang" scoped></style>
