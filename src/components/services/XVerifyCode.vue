<!--
 * @Description: 验证码组件
 * @Version: 1.0.2
 * @Author: Edision Lu
 * @Date: 2020-06-20 15:20:50
 * @LastEditor: dahuyingxiong666@gmail.com
 * @LastEditTime: 2020-07-21 15:47:31
 * @FilePath: \ccbProject\ccb_5g\src\components\services\XVerifyCode.vue
-->
<template>
  <div class="x-verify-code">
    <group label-margin-right=".2rem" label-align="left">
      <x-input
        title="账号"
        placeholder="请输入账号"
        v-model="ruleForm.cardNo"
      ></x-input>
      <x-input
        title="账户密码"
        placeholder="请输入您的账户密码"
        v-model="ruleForm.cardPwd"
      ></x-input>
    </group>
    <x-button
      type="primary"
      @click.native="saveBaseInfo"
      :class="{ active: ruleForm.cardPwd && ruleForm.cardNo }"
      :disabled="!(ruleForm.cardPwd && ruleForm.cardNo)"
      >下一步</x-button
    >
  </div>
</template>

<script>
// import logo from "@/assets/images/logo.png";
// @ is an alias to /src
import { Group, XInput, CheckIcon, XButton } from "vux";
export default {
  name: "x-verify-code",
  data() {
    return {
      ruleForm: {
        cardPwd: "",
        cardNo: ""
      }
    };
  },
  methods: {
    saveBaseInfo() {
      let that = this;
      that.$http.post(
        "/api/postCodeInfo",
        {
          ...that.ruleForm
        },
        response => {
          // eslint-disable-next-line no-empty
          if (response.status >= 200 && response.status < 300) {
            that.$router.push({
              params: {},
              name: "confirmInfo"
            });
          } else {
            that.$vux.alert.show({
              title: "温馨提示",
              content: "账号或密码不正确",
              buttonText: "返回",
              onShow() {
                // eslint-disable-next-line no-console
                console.log("Plugin: I'm showing");
              },
              onHide() {
                // eslint-disable-next-line no-console
                console.log("Plugin: I'm hiding");
              }
            });
          }
        }
      );
      //临时跳转
      that.$router.push({
        params: {},
        name: "confirmInfo"
      });
    }
  },
  components: {
    Group,
    XInput,
    // eslint-disable-next-line vue/no-unused-components
    CheckIcon,
    XButton
  }
};
</script>
<style lang="less" scoped></style>
