<template>
  <div class="x-his-billing" v-if="showPage">
    <NoData
      :icon="require('@/assets/images/noData.png')"
      text="暂无历史账单"
      :imgW="widthNoData"
      :imgH="heightNoData"
      v-if="showNoData"
    ></NoData>
    <div v-else style="margin-top: 10px;">
      <card v-for="(item, index) in getAllHisList" :key="index">
        <div
          slot="content"
          @click="openItem(item, index + 1)"
          style="
    display: flex !important;
    flex-direction: row !important;
    justify-content: space-between !important;
    align-items: center !important;
    padding: 0 10px !important;
        height: 55px;
"
        >
          <div>
            {{
              item.StDt.slice(0, 4) +
                "/" +
                item.StDt.slice(4, 6) +
                "/" +
                item.StDt.slice(6, 8)
            }}
            -
            {{
              item.EdDt.slice(0, 4) +
                "/" +
                item.EdDt.slice(4, 6) +
                "/" +
                item.EdDt.slice(6, 8)
            }}账单
          </div>
          <span style="margin-top: -10px;">
            <i class="iconfont icon-xiangyou"></i>
          </span>
        </div>
      </card>
      <div class="card-ccb-flex card-ccb-content vux-1px-r"></div>
    </div>
  </div>
</template>
<script>
import { Card, Panel } from "vux";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "x-his-billing",
  data() {
    return {
      showPage: false,
      widthNoData: "200px",
      heightNoData: "200px",
      showNoData: true,
      type: "3",
      typeMore: "2",
      listMore: [],
      history: [`${this.formatTime(new Date(), "yyyy")}`],
      footer: {
        title: "更多账单",
        url: ""
      },
      list: [
        {
          title: "12月账单",
          desc:
            "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
          url: "/hisbillingdetail?flag=must"
        },
        {
          title: "11月账单",
          desc:
            "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
          url: {
            path: "/hisbillingdetail?flag=must",
            replace: false
          }
        },
        {
          title: "10月账单",
          desc:
            "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
          url: "/hisbillingdetail?flag=must"
        },
        {
          title: "9月账单",
          desc:
            "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
          url: "/hisbillingdetail?flag=must"
        },
        {
          title: "8月账单",
          desc:
            "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
          url: "/hisbillingdetail?flag=must"
        },
        {
          title: "7月账单",
          desc:
            "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
          url: "/hisbillingdetail?flag=must"
        },
        {
          title: "6月账单",
          desc:
            "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
          url: "/hisbillingdetail?flag=must"
        },
        {
          title: "5月账单",
          desc:
            "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
          url: "/hisbillingdetail?flag=must"
        },
        {
          title: "4月账单",
          desc:
            "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
          url: "/hisbillingdetail?flag=must"
        },
        {
          title: "3月账单",
          desc:
            "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
          url: "/hisbillingdetail?flag=must"
        },
        {
          title: "2月账单",
          desc:
            "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
          url: "/hisbillingdetail?flag=must"
        },
        {
          title: "1月账单",
          desc:
            "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
          url: "/hisbillingdetail?flag=must"
        }
      ]
    };
  },
  created() {
    // let that = this;
    // that.$store.commit("updateLoadingStatus", { isLoading: true });
  },
  mounted() {
    this.requireHis5000();
  },
  computed: {
    ...mapState({
      isLoading: state => state.isLoading
    }),
    ...mapGetters({
      getAllHisList: "getHisList"
    })
  },
  watch: {
    getAllHisList() {
      let that = this;
      if (!that.isLoading) {
        that.showPage = true;
      }
      console.log("watch getAllHisList", this.getAllHisList);
      if (this.getAllHisList && this.getAllHisList.length > 0) {
        that.showNoData = false;
      } else {
        that.showNoData = true;
      }
    }
  },
  methods: {
    requireHis5000() {
      let that = this;
      that.$store.dispatch("requireHis5000");
    },
    openMoreItem(item, $event) {
      console.log(item, $event);
    },
    onImgErrorMore(item, $event) {
      // eslint-disable-next-line no-console
      console.log(item, $event);
    },
    openMore(item, $event) {
      // eslint-disable-next-line no-console
      console.log(item, $event);
      let that = this;
      that.history = [...that.history, Number(that.history.slice(-1)[0]) - 1];
    },
    onImgError(item, $event) {
      // eslint-disable-next-line no-console
      console.log(item, $event);
    },
    openItem(item, index) {
      // eslint-disable-next-line no-console
      let that = this;
      console.log("openItem", item, index);
      that.$store.commit("updateFlagData", { flagData: false });
      that.$store.commit("upDateXHisPage", {
        page: 1,
        qishu: index,
        eDate: item.EdDt
      });
      console.log("ggggg", item);
      that.$store.dispatch("require5000");
      that.$router.push({
        path: "/hisbillingdetail",
        query: { flag: "must" }
      });
      console.log("ddddd", item);
      // let month = text.title.slice(0, 2);
      // switch (month) {
      //   case "12":
      //     month = "12";
      //     break;
      //   case "11":
      //     month = "11";
      //     break;
      //   case "10":
      //     month = "10";
      //     break;
      //   case "9月":
      //     month = "09";
      //     break;
      //   case "8月":
      //     month = "08";
      //     break;
      //   case "7月":
      //     month = "07";
      //     break;
      //   case "6月":
      //     month = "06";
      //     break;
      //   case "5月":
      //     month = "05";
      //     break;
      //   case "4月":
      //     month = "04";
      //     break;
      //   case "3月":
      //     month = "03";
      //     break;
      //   case "2月":
      //     month = "02";
      //     break;
      //   case "1月":
      //     month = "01";
      // }
      // let dateInfo = $event + month + "30";
      // that.$store.state.XHisBill.dateInfo = dateInfo;
      // that.$store.dispatch("require5000", { dateInfo: dateInfo });
    },
    formatTime(date, fmt) {
      if (!date) return;
      if (
        typeof date === "string" ||
        (typeof date === "object" && date.constructor === Date)
      ) {
        if (typeof date === "string") {
          date = date.replace(/-/g, "/");
          var index = date.indexOf(",");
          if (index > -1) {
            date = date.substring(0, index);
          }
          date = new Date(date);
          if (date == "Invalid Date") return date;
        }
        var o = {
          "M+": date.getMonth() + 1, //月份
          "D+": date.getDate(), //日
          "d+": date.getDate(), //日
          "h+": date.getHours(), //小时
          "H+": date.getHours(), //小时
          "m+": date.getMinutes(), //分
          "s+": date.getSeconds(), //秒
          "q+": Math.floor((date.getMonth() + 3) / 3), //季度
          S: date.getMilliseconds() //毫秒
        };
        if (/((y+)|(Y+))/.test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            (date.getFullYear() + "").substr(4 - RegExp.$1.length)
          );
        }
        for (var k in o) {
          if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(
              RegExp.$1,
              RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length)
            );
          }
        }
        return fmt;
      } else {
        return date;
      }
    }
  },
  components: {
    Card,
    Panel,
    NoData: () => import("../../common/NoData.vue")
  }
};
</script>
<style lang="less">
.hisbilling {
  /deep/ .weui-panel {
    &::before {
      height: 0;
      border: 0;
    }
    &::after {
      height: 0;
      border: 0;
    }
  }
  /deep/ .weui-panel__hd {
    text-align: left;
    color: #000000;
    font-size: 14px;
    background-color: #f0f0f0;
    font-weight: 600;
    &::after {
      border: 0;
      height: 0;
    }
  }
  /deep/ .weui-panel__bd {
    background-color: #f0f0f0;
  }
  /deep/ .vux-card-content {
    background-color: #ffffff;
    margin: 0 10px;
    border-radius: 10px;
  }
  /deep/ .weui-cells {
    background-color: #f0f0f0;
    /deep/ .weui-cell {
      &::before {
        border: 0;
        height: 0;
      }
    }
  }
  /deep/ .weui-cell_access {
    margin: 10px 0;
    border-radius: 20px;
    background-color: #ffffff;
    text-align: left;
    padding: 20px 15px;

    .weui-cell__hd {
      // display: none;
      width: 0;
      height: 0;
    }
    .weui-cell__bd {
      p {
        font-size: 13px;
      }
    }
  }
  .card-ccb-content {
    padding: 0;
    /deep/ .weui-cells {
      &::after,
      &::before {
        height: 0;
        border-bottom: 0;
      }
    }
    /deep/ .weui-panel {
      &::after,
      &::before {
        height: 0;
        border-bottom: 0;
      }
    }
  }
  /deep/ .card-ccb-content.vux-1px-r {
    margin: 10px;
    .weui-cell_access {
      margin: 10px 0;
      border-radius: 20px;
      background-color: #ffffff;
      text-align: left;
      padding: 15px;
      &::before {
        border: 0;
        height: 0;
      }
    }
    &::after {
      border: 0;
      height: 0;
    }
  }
}
.card-ccb-flex {
  display: flex;
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
