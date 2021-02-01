<!--
 * @Description: 首页组
 * @Version: 1.0.2
 * @Author: Edision Lu
 * @Date: 2020-06-05 10:54:42
 * @LastEditor: dahuyingxiong666@gmail.com
 * @LastEditTime: 2020-09-29 17:34:30
 * @FilePath: \ccbProject\ccb_5g\src\components\homeGroup\HomeGroup.vue
-->
<template>
  <div>
    <card :header="{ title: this.wallet }">
      <div slot="content" class="card-ccb-flex card-ccb-content">
        <div class="vux-1px-r" @click="openServices">
          <span>1130</span>
          <br />
          {{ point }}
        </div>
        <div class="vux-1px-r">
          <span>15</span>
          <br />
          {{ coupon }}
        </div>
        <div class="vux-1px-r">
          <span>25</span>
          <br />
          {{ giftCard }}
        </div>
        <div>
          <span>100</span>
          <br />
          {{ cash }}
        </div>
      </div>
    </card>
    <card>
      <div slot="content" class="card-padding">
        <panel
          :header="header"
          :footer="footer"
          :list="list"
          :type="type"
          @on-img-error="onImgError"
        ></panel>
      </div>
    </card>
    <card>
      <img slot="header" :src="this.pic" style="width:100%;display:block;" />
      <div slot="content" class="card-padding">
        <p style="color:#999;font-size:12px;">Posted on January 21, 2015</p>
        <p style="font-size:14px;line-height:1.2;">
          Quisque eget vestibulum nulla. Quisque quis dui quis ex ultricies
          efficitur vitae non felis. Phasellus quis nibh hendrerit..
        </p>
      </div>
    </card>
  </div>
</template>

<script>
import pic from "../../assets/images/banner-1.jpg";
import { Divider, Card, Panel } from "vux";

export default {
  name: "HomeGroup",
  data() {
    return {
      wallet: "服务项",
      point: "开通服务",
      coupon: "今天",
      giftCard: "本周",
      cash: "本月",
      productDetails: "商品详情",
      more: "查看更多",
      pic: pic,
      header: "历史账单列表",
      type: "4",
      list: [
        {
          src: "http://somedomain.somdomain/x.jpg",
          fallbackSrc: "http://placeholder.qiniudn.com/60x60/3cc51f/ffffff",
          title: "消费",
          desc: "xxx 消费 -600 元",
          url: "/component/cell",
          meta: {
            source: "消费",
            date: this.$general.formatTime(new Date(), "yyyy年MM月dd日"),
            other: "其他信息"
          }
        },
        {
          src: "http://placeholder.qiniudn.com/60x60/3cc51f/ffffff",
          title: "存入",
          desc: "xxx 存入 6300 元",
          url: {
            path: "/component/radio",
            replace: false
          },
          meta: {
            source: "存入",
            date: this.$general.formatTime(new Date(), "yyyy年MM月dd日"),
            other: "其他信息"
          }
        }
      ],
      footer: {
        title: "更多",
        url: "http://vux.li"
      }
    };
  },
  methods: {
    onImgError(item, $event) {
      // eslint-disable-next-line no-console
      console.log(item, $event);
    },
    openServices() {
      let that = this;
      that.$router.push({
        name: "services",
        params: {}
      });
    }
  },
  components: {
    Card,
    // eslint-disable-next-line vue/no-unused-components
    Divider,
    Panel
  }
};
</script>

<style scoped lang="less">
// @import '~vux/src/styles/1px.less';
.weui-panel:before {
  border: 0;
}
.card-ccb-flex {
  display: flex;
}
.card-ccb-content {
  padding: 10px 0;
}
.card-padding {
  padding: 15px;
  text-align: left;
}
.card-ccb-flex > div {
  flex: 1;
  text-align: center;
  font-size: 12px;
}
.card-ccb-flex span {
  color: #f74c31;
}
</style>
