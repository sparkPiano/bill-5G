<!--
 * @Description: 服务开通模板
 * @Version: 1.0.2
 * @Author: Edision Lu
 * @Date: 2020-06-19 16:49:52
 * @LastEditor: dahuyingxiong666@gmail.com
 * @LastEditTime: 2020-07-21 15:28:15
 * @FilePath: \ccbProject\ccb_5g\src\views\services\Index.vue
-->
<template>
  <div class="services">
    <XServices></XServices>
  </div>
</template>

<script>
// import logo from "@/assets/images/logo.png";
// @ is an alias to /src

export default {
  name: "services",
  data() {
    return {};
  },
  components: {
    XServices: () => import("@/components/services/XServices.vue")
  }
};
</script>
<style lang="less">
.weui-cells {
  font-size: 14px !important;
  .weui-cell {
    padding: 20px 15px !important;
    &::before {
      right: 15px !important;
    }
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
.x-additional {
  position: relative;
  &::before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 0.01rem;
    border-top: 0.01rem solid #d9d9d9;
    color: #d9d9d9;
    -webkit-transform-origin: 0 0;
    -ms-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    -ms-transform: scaleY(0.5);
    transform: scaleY(0.5);
    left: 15px;
    right: 15px;
  }
  .weui-cell__bd {
    width: 102px !important;
  }
  .weui-cell__ft {
    width: 120px !important;
  }
}
.x-bind-card_input__additionalCode {
  position: absolute;
  width: 120px;
  height: 44px;
  right: 15px;
  font-size: 34px;
  color: #1890ff;
  text-align: center;
  border: 0;
  background-color: gray;
  line-height: 44px;
  top: 50%;
  transform: translate(0, -50%);
}
</style>
