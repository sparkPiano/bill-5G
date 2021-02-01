<!--
 * @Description: 登录验证
 * @Version: 1.0.2
 * @Author: Edision Lu
 * @Date: 2020-07-22 10:41:11
 * @LastEditor: dahuyingxiong666@gmail.com
 * @LastEditTime: 2021-01-19 16:07:36
 * @FilePath: \ccbProject\ccb_5g\src\views\login\Index.vue
-->
<template>
  <div class="xnqui-error">
    <xnq-error
      :styleType="type"
      :headerStyle="headerStyle"
      :isSpinner="isSpinner"
    >
      <span slot="header" v-html="htmlStr"></span>
    </xnq-error>
  </div>
</template>

<script>
export default {
  name: "x-error",
  data() {
    return {
      htmlStr: `账单查询信息已过期，请重新查询`,
      type: "dots",
      headerStyle: "block",
      isSpinner: false
    };
  },
  props: {},
  created() {
    let that = this;
    let errStr = that.$base64.decode(
      decodeURI(that.$general.getQueryStringByName("errstr")) ||
        decodeURI(
          that.$general.getQueryStringByName(
            "errstr",
            `?${location.href.split("?")[1]}`
          )
        )
    );
    if (errStr) {
      that.htmlStr = errStr;
    }
  },
  mounted() {
    let that = this;
  },
  methods: {},
  beforeDestroy() {},
  computed: {},
  watch: {},
  components: {
    "xnq-error": () => import("@/components/common/Error.vue")
  }
};
</script>
<style lang="less" scoped></style>
