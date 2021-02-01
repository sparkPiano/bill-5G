<!--
 * @Description: 验证码服务
 * @Version: 1.0.2
 * @Author: Edision Lu
 * @Date: 2020-06-20 15:20:36
 * @LastEditor: dahuyingxiong666@gmail.com
 * @LastEditTime: 2020-07-21 15:30:09
 * @FilePath: \ccbProject\ccb_5g\src\views\services\verifycode\Index.vue
-->
<template>
  <div class="verifycode">
    <XVerifyCode></XVerifyCode>
  </div>
</template>

<script>
// import logo from "@/assets/images/logo.png";
// @ is an alias to /src

export default {
  name: "verifycode",
  data() {
    return {};
  },
  components: {
    XVerifyCode: () => import("@/components/services/XVerifyCode.vue")
  }
};
</script>
<style lang="less">
.weui-cells {
  font-size: 14px !important;
  .weui-cell {
    padding: 20px 15px !important;
    .weui-label {
      width: 100px !important;
    }
  }
}
.x-checkbox {
  font-size: 12px;
  line-height: 12px;
  text-align: left;
  padding: 15px;
  input {
    margin-right: 10px;
  }
}
button.weui-btn,
input.weui-btn {
  width: 340px !important;
  border-radius: 30px !important;
  margin-top: 50px;
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
