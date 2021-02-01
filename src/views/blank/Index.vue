<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: Edison Lu
 * @Date: 2021-01-08 11:34:43
 * @LastEditors: Edison Lu
 * @LastEditTime: 2021-01-08 15:19:18
-->
<template>
  <div></div>
</template>

<script>
export default {
  name: "blank",
  created() {},
  mounted() {
    let params =
      decodeURI(this.$general.getQueryStringByName("params")) ||
      decodeURI(
        this.$general.getQueryStringByName(
          "params",
          `?${location.href.split("?")[1]}`
        )
      );
    let tel =
      decodeURI(this.$general.getQueryStringByName("tel")) ||
      decodeURI(
        this.$general.getQueryStringByName(
          "tel",
          `?${location.href.split("?")[1]}`
        )
      );
    console.log(
      "blank2",
      params,
      tel,
      window.location.href,
      location.href.split("blank")[0],
      process.env.VUE_APP_URL
    );
    //http://128.192.179.186/CCBRCS/ccbsns
    window.location.href = `${process.env.VUE_APP_URL}?params=${params}&tel=${tel}`;
    console.log("blank2-ret", window.location.href, process.env.VUE_APP_URL);
  }
};
</script>
