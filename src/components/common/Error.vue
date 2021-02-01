<!--
 * @Description: error
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2020-10-12 14:39:05
 * @LastEditors: Edison Lu
 * @LastEditTime: 2021-01-19 16:11:16
-->
<template>
  <div class="xnqui-error xnqui-error_page">
    <icon type="warn" is-msg></icon>
    <div
      class="xnqui-error_header"
      v-if="!!hasHeaderSlot"
      :style="{ display: headerStyle }"
    >
      <slot name="header"></slot>
    </div>
    <spinner :type="styleType" :size="''" v-if="isSpinner"></spinner>
  </div>
</template>

<script>
import { Spinner, Icon } from "vux";
export default {
  name: "error",
  data() {
    return {
      hasHeaderSlot: false
    };
  },
  props: {
    styleType: {
      type: String,
      default: "crescent"
    },
    headerStyle: {
      type: String,
      default: "block"
    },
    isSpinner: {
      type: Boolean,
      default: false
    }
  },
  created() {},
  mounted() {
    let that = this;
    that.hasHeaderSlot = !!that.$slots.header;
    that.$store.commit("updateLogin", {
      login: false
    });
  },
  methods: {},
  beforeDestroy() {},
  computed: {},
  watch: {},
  components: {
    Spinner,
    Icon
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/styles/xnqui.less";
.xnqui-error {
  padding: 0;
  margin: 0;
}
.xnqui-error_page {
  .whitepage();
  width: 100%;
}
.xnqui-error_header {
  .whiteheader();
  font-size: 14px;
  padding-top: 10px;
}
</style>
