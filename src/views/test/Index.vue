<!--
 * @Description: test
 * @Version: 1.0.2
 * @Author: Edision Lu
 * @Date: 2020-07-22 09:25:47
 * @LastEditor: dahuyingxiong666@gmail.com
 * @LastEditTime: 2020-09-24 10:31:09
 * @FilePath: \ccbProject\ccb_5g\src\views\test\Index.vue
-->

<template>
  <ccb-form :groupList="groupList"></ccb-form>
</template>

<script>
export default {
  name: "test",
  data() {
    return {};
  },
  components: {
    CcbForm: () => import("@/components/packages/CcbForm.vue")
  }
};
</script>
