<!--
 * @Description: 服务开通组件
 * @Version: 1.0.2
 * @Author: Edision Lu
 * @Date: 2020-06-19 16:51:20
 * @LastEditor: dahuyingxiong666@gmail.com
 * @LastEditTime: 2020-09-28 10:11:19
 * @FilePath: \ccbProject\ccb_5g\src\components\services\XServices.vue
-->
<template>
  <div class="x-services">
    <group label-margin-right=".2rem" label-align="left">
      <x-input
        title="姓名"
        placeholder="请输入姓名"
        v-model="ruleForm.name"
      ></x-input>
      <x-input
        title="绑定账号"
        placeholder="您的储蓄卡或活期存折账号"
        v-model="ruleForm.cardNo"
      ></x-input>
      <x-input
        title="手机后四位"
        placeholder="您预留的手机后四位"
        v-model="ruleForm.phoneNum"
      ></x-input>
      <div class="x-additional">
        <x-input
          title="附加码"
          placeholder="请输入附加码"
          v-model="ruleForm.additionalCode"
          @on-change="verifyAdditionalCode"
        >
        </x-input>
        <div
          class="x-bind-card_input__additionalCode"
          id="add"
          @click="refreshAdditionalCode"
        ></div>
      </div>
    </group>
    <!-- <group>
      <selector v-model="value1" :options="plainList"></selector>
    </group> -->
    <div class="x-checkbox">
      <span @click="chhooseItem">
        <input type="checkbox" v-model="isAgree" :checked="isAgree" />{{
          agreeDesc
        }}
      </span>
      <a :href="url" class="x-alink">{{ proto }}</a>
    </div>
    <x-button
      type="primary"
      @click.native="saveBaseInfo"
      :class="{
        active:
          isAgree &&
          ruleForm.name &&
          ruleForm.cardNo &&
          ruleForm.phoneNum &&
          ruleForm.additionalCode
      }"
      :disabled="
        !(
          isAgree &&
          ruleForm.name &&
          ruleForm.cardNo &&
          ruleForm.phoneNum &&
          ruleForm.additionalCode
        )
      "
      >下一步</x-button
    >
  </div>
</template>

<script>
// import logo from "@/assets/images/logo.png";
// @ is an alias to /src
import { Group, XInput, CheckIcon, XButton, Selector } from "vux";
export default {
  name: "x-services",
  data() {
    return {
      isAgree: false,
      agreeDesc: "我已阅读并同意",
      proto: "《5G消息服务协议》",
      url: "",
      ruleForm: {
        name: "",
        cardNo: "",
        phoneNum: "",
        additionalCode: ""
      },
      verifyCodeObj: null,
      plainList: ["广东", "广西"],
      value1: "广西"
    };
  },
  mounted() {
    let that = this;
    that.$nextTick(() => {
      const options = {
        id: "add",
        type: "blend"
      };
      const addCodeObj = new that.$verifyCode(options);
      that.addCodeObj = addCodeObj;
    });
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    verifyAdditionalCode(e) {
      // eslint-disable-next-line no-debugger
      let that = this;
      if (e.length == 5) {
        const res = that.addCodeObj.validate(that.ruleForm.additionalCode);
        if (res) {
          that.$vux.alert.show({
            title: "提示",
            content: `验证码验证通过`,
            onShow() {
              console.log("Plugin: I'm showing");
            },
            onHide() {
              console.log("Plugin: I'm hiding");
            }
          });
        } else {
          that.$vux.alert.show({
            title: "提示",
            content: `验证码填写错误`,
            onShow() {
              console.log("Plugin: I'm showing");
            },
            onHide() {
              console.log("Plugin: I'm hiding");
            }
          });
        }
      }
    },
    refreshAdditionalCode() {
      //初始化验证码
      let that = this;
      // eslint-disable-next-line no-console
      console.log(that.addCodeObj);
      that.addCodeObj.refresh();
    },
    chhooseItem() {
      this.isAgree = this.isAgree ? false : true;
    },
    saveBaseInfo() {
      let that = this;
      that.$http.post(
        "/api/postBaseInfo",
        {
          ...that.ruleForm
        },
        response => {
          // eslint-disable-next-line no-empty
          if (response.status >= 200 && response.status < 300) {
            that.$router.push({
              params: {},
              name: "verifycode"
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
        name: "verifycode"
      });
    }
  },
  components: {
    Group,
    XInput,
    CheckIcon,
    XButton,
    Selector
  }
};
</script>
<style lang="less" scoped></style>
