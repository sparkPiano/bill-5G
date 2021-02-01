<template>
  <div class="zwsj">
    <img :src="icon" :width="imgW" :height="imgH" />
    <div style="color: #999;font-size: 12px;margin-top: 5px">{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: "nodata",
  props: {
    icon: {
      require: true
    },
    text: {
      require: true
    },
    imgW: {
      default: "175px"
    },
    imgH: {
      default: "95px"
    }
  }
};
</script>

<style lang="less" scoped>
.zwsj {
  padding: 120px 0;
  text-align: center;
  img {
    margin-left: 13%;
  }
}
</style>
