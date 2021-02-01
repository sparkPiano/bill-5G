<!--
 * @Description: actionsheet
 * @Version: 1.0.2
 * @Author: Edision Lu
 * @Date: 2020-07-22 09:26:28
 * @LastEditor: dahuyingxiong666@gmail.com
 * @LastEditTime: 2020-07-22 09:58:09
 * @FilePath: \ccbProject\ccb_5g\src\components\common\actionsheet.vue
-->

<template>
  <div class="ccb-actionsheet">
    <transition name="ccb-actionsheet_mask">
      <div class="ccbui-mask ccbui-mask_transparent"></div>
    </transition>
    <div
      class="ccbui-actionsheet"
      :class="{ 'ccbui-actionsheet_toggle': isToggle }"
    ></div>
  </div>
</template>

<script>
export default {
  name: "actionsheet",
  data() {
    return {};
  },
  props: {
    isToggle: {
      type: Boolean,
      default: false
    }
  },
  created() {},
  mounted() {},
  methods: {},
  beforeDestroy() {}
};
</script>
