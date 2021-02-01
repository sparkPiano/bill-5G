<!--
 * @Description: 登录验证
 * @Version: 1.0.2
 * @Author: Edision Lu
 * @Date: 2020-07-22 10:41:11
 * @LastEditor: dahuyingxiong666@gmail.com
 * @LastEditTime: 2020-10-12 11:11:21
 * @FilePath: \ccbProject\ccb_5g\src\views\login\Index.vue
-->
<template>
  <div class="xnqui-login">
    <xnq-white-page
      :styleType="type"
      :headerStyle="headerStyle"
      :isSpinner="isSpinner"
    >
      <span slot="header" v-html="htmlStr"></span>
    </xnq-white-page>
  </div>
</template>

<script>
import { mixin } from "../../mixins/mixin";
export default {
  name: "login",
  data() {
    return {
      htmlStr: `正在登录中`,
      type: "dots",
      headerStyle: "inline-block",
      isSpinner: true
    };
  },
  mixins: [mixin],
  props: {},
  created() {},
  mounted() {
    let that = this;
    that.$nextTick(() => {
      that.login();
    });
  },
  methods: {},
  beforeDestroy() {},
  computed: {},
  watch: {},
  components: {
    "xnq-white-page": () => import("@/components/common/Whitepage.vue")
  }
};
</script>
<style lang="less" scoped></style>
