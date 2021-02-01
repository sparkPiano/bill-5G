<!--
 * @Description: 空白页提示
 * @Version: 1.0.2
 * @Author: Edision Lu
 * @Date: 2020-07-22 11:07:42
 * @LastEditor: dahuyingxiong666@gmail.com
 * @LastEditTime: 2020-07-23 19:18:06
 * @FilePath: \ccbProject\ccb_5g\src\components\common\Whitepage.vue
-->
<template>
  <div class="xnqui-white xnqui-white_page">
    <div
      class="xnqui-white_header"
      v-if="!!hasHeaderSlot"
      :style="{ display: headerStyle }"
    >
      <slot name="header"></slot>
    </div>
    <spinner :type="styleType" :size="''" v-if="isSpinner"></spinner>
  </div>
</template>

<script>
import { Spinner } from "vux";
export default {
  name: "whitepage",
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
    this.hasHeaderSlot = !!this.$slots.header;
  },
  methods: {},
  beforeDestroy() {},
  computed: {},
  watch: {},
  components: {
    Spinner
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/styles/xnqui.less";
.xnqui-white {
  padding: 0;
  margin: 0;
}
.xnqui-white_page {
  .whitepage();
}
.xnqui-white_header {
  .whiteheader();
}
</style>
