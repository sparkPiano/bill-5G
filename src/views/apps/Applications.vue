<!--
 * @Description: 应用
 * @Version: 1.0.2
 * @Author: Edision Lu
 * @Date: 2020-06-03 16:32:27
 * @LastEditor: dahuyingxiong666@gmail.com
 * @LastEditTime: 2020-11-09 10:49:51
 * @FilePath: \ccbProject\ccb_5g\src\views\apps\Applications.vue
-->
<template>
  <div class="apps">
    <!-- <div class="el-logo">
      <img :src="this.logo" />
    </div>-->
    <AppGroup></AppGroup>
  </div>
</template>

<script>
// import logo from "@/assets/images/logo.png";
// @ is an alias to /src

export default {
  name: "Applications",
  data() {
    return {};
  },
  components: {
    AppGroup: () => import("@/components/appGroup/AppGroup.vue")
  }
};
</script>
<style lang="less">
@import "../../assets/styles/global.less";
@import "../../assets/styles/variables.less";
.weui-grids .weui-grid:nth-child(n + 1) .ccb-grid .weui-grid__icon {
  .first();
}
.weui-grids .weui-grid:nth-child(n + 2) .ccb-grid .weui-grid__icon {
  .second();
}
.weui-grids .weui-grid:nth-child(n + 3) .ccb-grid .weui-grid__icon {
  .third();
}
.weui-grids .weui-grid:nth-child(n + 4) .ccb-grid .weui-grid__icon {
  .fourth();
}
.weui-grids .weui-grid:nth-child(n + 5) .ccb-grid .weui-grid__icon {
  .fifth();
}
.weui-grids .weui-grid:nth-child(n + 6) .ccb-grid .weui-grid__icon {
  .sixth();
}
.weui-grids .weui-grid:nth-child(n + 7) .ccb-grid .weui-grid__icon {
  .seventh();
}
.weui-grids .weui-grid:nth-child(n + 8) .ccb-grid .weui-grid__icon {
  .eighth();
}
.weui-grids .weui-grid:nth-child(n + 9) .ccb-grid .weui-grid__icon {
  .ninth();
}
.weui-grids .weui-grid:nth-child(n + 10) .ccb-grid .weui-grid__icon {
  .tenth();
}
.iconfont {
  font-size: 15px;
  display: flex;
  display: -webkit-box;
  width: 100%;
  align-items: center;
  justify-content: center;
}
</style>
