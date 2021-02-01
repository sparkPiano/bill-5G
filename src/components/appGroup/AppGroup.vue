<!--
 * @Description: 应用组
 * @Version: 1.0.2
 * @Author: Edision Lu
 * @Date: 2020-06-03 18:41:02
 * @LastEditor: dahuyingxiong666@gmail.com
 * @LastEditTime: 2020-11-09 10:51:21
 * @FilePath: \ccbProject\ccb_5g\src\components\appGroup\AppGroup.vue
-->
<template>
  <div>
    <group-title>
      <span>服务应用</span>
    </group-title>
    <grid :cols="4">
      <grid-item
        v-for="(item, index) in list"
        :key="index"
        :link="item.component"
      >
        <!-- <img slot="icon" src="../assets/grid_icon.png" /> -->
        <div class="ccb-grid">
          <div class="weui-grid__icon">
            <i class="iconfont icon-kexue"></i>
          </div>
          <p class="weui-grid__label">
            <span v-html="item.name"></span>
          </p>
        </div>
      </grid-item>
    </grid>
    <group-title>
      <span>3 columns</span>
    </group-title>
    <grid :show-lr-borders="false" :show-vertical-dividers="false">
      <grid-item link="/component/cell">
        <div class="ccb-grid">
          <div class="weui-grid__icon">
            <i class="iconfont icon-kexue"></i>
          </div>
          <p class="weui-grid__label">
            <span v-html="toCell"></span>
          </p>
        </div>
      </grid-item>
      <grid-item :link="{ path: '/component/cell' }">
        <div class="ccb-grid">
          <div class="weui-grid__icon">
            <i class="iconfont icon-kexue"></i>
          </div>
          <p class="weui-grid__label">
            <span v-html="toCell"></span>
          </p>
        </div>
      </grid-item>
      <grid-item link="/component/cell" @on-item-click="onItemClick">
        <div class="ccb-grid">
          <div class="weui-grid__icon">
            <i class="iconfont icon-kexue"></i>
          </div>
          <p class="weui-grid__label">
            <span v-html="toCell"></span>
          </p>
        </div>
      </grid-item>
    </grid>
    <group-title>
      <span>4 columns</span>
    </group-title>
    <grid :show-lr-borders="false">
      <grid-item v-for="i in 4" :key="i">
        <div class="ccb-grid">
          <div class="weui-grid__icon">
            <i class="iconfont icon-kexue"></i>
          </div>
          <p class="weui-grid__label">
            <span v-html="nine"></span>
          </p>
        </div>
      </grid-item>
    </grid>
    <group-title>
      <span>{{ customContent }}</span>
    </group-title>
    <grid :show-vertical-dividers="false">
      <grid-item v-for="i in 5" :key="i">
        <div class="ccb-grid">
          <div class="weui-grid__icon">
            <i class="iconfont icon-kexue"></i>
          </div>
          <p class="weui-grid__label">
            <span v-html="nine"></span>
          </p>
        </div>
      </grid-item>
    </grid>
    <group-title>
      <span>{{ customCol }}</span>
    </group-title>
    <grid :cols="3" :show-lr-borders="false">
      <grid-item v-for="i in 9" :key="i">
        <div class="ccb-grid">
          <div class="weui-grid__icon">
            <i class="iconfont icon-kexue"></i>
          </div>
          <p class="weui-grid__label">
            <span v-html="nine"></span>
          </p>
        </div>
      </grid-item>
    </grid>
  </div>
</template>
<script>
import { Grid, GridItem, GroupTitle } from "vux";
const applist = require("../../assets/json/apps.json");
export default {
  name: "AppGroup",
  data() {
    return {
      nine: "服务开通",
      toCell: "跳转到Cell",
      customContent: "自定义内容",
      customCol: "自定义列",
      list: applist
    };
  },
  created() {},
  components: {
    Grid,
    GridItem,
    GroupTitle
  },
  methods: {
    onItemClick() {
      // eslint-disable-next-line no-console
      console.log("on item click");
    }
  }
};
</script>

<style lang="less" scoped>
.grid-center {
  display: block;
  text-align: center;
  color: #666;
}
.weui-grids {
  background-color: #ffffff;
  padding: 0;
  &:after {
    width: 0;
    border-left: none;
  }
  .weui-grid {
    -moz-box-sizing: border-box; /* Firefox */
    -webkit-box-sizing: border-box; /* Safari */
    box-sizing: border-box;
    color: #fff;
    .ccb-grid {
      position: relative;
      -moz-box-sizing: border-box; /* Firefox */
      -webkit-box-sizing: border-box; /* Safari */
      box-sizing: border-box;
      border-radius: 20px;
      // border: 1px solid #c5c5c5;
      .weui-grid__icon {
        width: 37.5px;
        height: 37.5px;
        line-height: 37.5px;
        border-radius: 50%;
        position: relative;
      }
      .weui-grid__label {
        font-size: 12px;
      }
    }
    &:before {
      width: 0;
      border-right: none;
    }
    &:after {
      height: 0;
      border-bottom: none;
    }
  }
}
.weui-cells__title {
  &:before {
    content: "|";
    font-size: 20px;
    background-color: #f00000;
    background-size: cover;
    color: #f00000;
    padding-right: 4px;
  }
  span {
    margin: 0 7.5px;
    text-shadow: 4px 4px 8px #000;
  }
}
</style>
