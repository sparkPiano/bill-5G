<!--
 * @Description: 确认消息组件
 * @Version: 1.0.2
 * @Author: Edision Lu
 * @Date: 2020-06-20 15:31:22
 * @LastEditor: dahuyingxiong666@gmail.com
 * @LastEditTime: 2020-07-21 15:45:40
 * @FilePath: \ccbProject\ccb_5g\src\components\services\XConfirmInfo.vue
-->
<template>
  <div class="x-confirm-info">
    <group label-margin-right=".2rem" label-align="left">
      <x-input
        title="姓名"
        placeholder="请输入姓名"
        v-model="ruleForm.name"
      ></x-input>
      <x-input
        title="手机号码"
        placeholder="请输入您预留的手机号码"
        v-model="ruleForm.phoneNum"
      ></x-input>
      <x-input
        title="绑定账号"
        placeholder="您的储蓄卡或活期存折账号"
        v-model="ruleForm.cardNo"
      ></x-input>
    </group>
    <x-button
      type="primary"
      @click.native="saveBaseInfo"
      :class="{ active: ruleForm.name && ruleForm.cardNo && ruleForm.phoneNum }"
      :disabled="!(ruleForm.name && ruleForm.cardNo && ruleForm.phoneNum)"
      >提交</x-button
    >
  </div>
</template>

<script>
// import logo from "@/assets/images/logo.png";
// @ is an alias to /src
import { Group, XInput, CheckIcon, XButton } from "vux";
export default {
  name: "x-confirm-info",
  data() {
    return {
      ruleForm: {
        name: "",
        cardNo: "",
        phoneNum: ""
      }
    };
  },
  methods: {
    saveBaseInfo() {
      let that = this;
      that.$http.post(
        "/api/postOtherInfo",
        {
          ...that.ruleForm
        },
        response => {
          // eslint-disable-next-line no-empty
          if (response.status >= 200 && response.status < 300) {
            that.$router.push({
              params: {},
              name: "successpage"
            });
          } else {
            that.$vux.alert.show({
              title: "温馨提示",
              content: "填报信息不正确",
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
        name: "successpage"
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
