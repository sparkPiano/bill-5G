<template>
  <div class="x-billing-info" v-if="allList123.LIST1">
    <card>
      <div slot="content" class="card-ccb-flex card-ccb-content">
        <div class="vux-1px-r repayment-info" @click="openCurBilling">
          <!-- <div class="repaymentInfo" v-for="(item,index) in list" :key="index">
            <label :for="index"></label>
            <span :id="index" :name="index"></span>
          </div> -->
          <div class="repaymen-item">
            <span class="repaymen-item_title">授信额度</span>
            <span class="repaymen-item_detail"
              ><span class="currency">{{ currency["CNY"] }}</span
              ><span class="amount">{{
                allList123.LIST1[0].CCrdCst_CrLine
              }}</span
              ><span class="selcurrency"></span
            ></span>
          </div>
          <div class="repaymen-item">
            <span class="repaymen-item_title">取现额度</span>
            <span class="repaymen-item_detail"
              ><span class="currency">{{ currency["CNY"] }}</span
              ><span class="amount_all">{{
                allList123.LIST1[0].CCrdCst_Encshmt_Lmt
              }}</span
              ><span class="selcurrency"></span
            ></span>
          </div>
          <div class="repaymen-item">
            <span class="repaymen-item_title">争议款/笔数</span>
            <span class="repaymen-item_detail"
              ><span class="currency">{{ currency["CNY"] }}</span
              ><span class="amount_less"
                >{{ allList123.LIST1[0].CrCrd_Dspt_Dnum }}/0</span
              >
              <span class="currency">{{ currency["USD"] }}</span
              ><span class="amount_less">
                {{
                  allList123.LIST1[1] && allList123.LIST1[1].CrCrd_Dspt_Dnum
                    ? allList123.LIST1[1].CrCrd_Dspt_Dnum
                    : "0.00"
                }}/0</span
              >
              <span class="currency">{{ currency["EUR"] }}</span
              ><span class="amount_less"
                >{{
                  allList123.LIST1[2] && allList123.LIST1[2].CrCrd_Dspt_Dnum
                    ? allList123.LIST1[2].CrCrd_Dspt_Dnum
                    : "0.00"
                }}/0</span
              >
              <!-- <span class="selcurrency">
                <span
                  v-for="(item, index) in selcurrency_less"
                  class="curr"
                  :key="index"
                  >{{ item }}/0</span
                ></span >-->
            </span>
          </div>
        </div>
      </div>
    </card>
    <div v-if="allList123.LIST2">
      <card
        v-for="(item, index) in allList123.LIST2"
        :key="index"
        style="margin-top: .15rem;"
      >
        <div
          slot="content"
          class="card-ccb-flex card-ccb-content card-ccb-detail"
        >
          <div class="vux-1px-r">
            <div class="x-curr-left">
              <div class="x-curr-img">
                <!-- <span class="xinyongqiatianjia"></span> -->
              </div>
              <div class="x-curr-content">
                <span class="x-curr-name">信用卡号</span>
                <span class="x-curr-time"></span>
              </div>
            </div>
            <div class="x-curr-right">
              <div class="x-curr-money">
                <span class="x-curr-amount"></span>
                <span class="x-curr-currency">{{ item.label }}</span>
              </div>
            </div>
          </div>
          <div class="vux-1px-r">
            <div class="x-curr-left">
              <div class="x-curr-img">
                <!-- <span class="qian"></span> -->
              </div>
              <div class="x-curr-content">
                <span class="x-curr-name">应还款额</span>
                <span class="x-curr-time"></span>
              </div>
            </div>
            <div class="x-curr-right">
              <div class="x-curr-money">
                <span class="x-curr-amount"></span>
                <span class="x-curr-currency"
                  >{{ currency["CNY"] }}{{ item.CrnPrd_ShldRepymt_Amt }}</span
                >
                <!-- <span class="amount_less"></span> -->
                <span
                  v-for="(item, index) in selcurrency_less"
                  class="curr"
                  :key="index"
                  >{{ item }}</span
                >
              </div>
            </div>
          </div>
          <div class="vux-1px-r">
            <div class="x-curr-left">
              <div class="x-curr-img"></div>
              <div class="x-curr-content">
                <span class="x-curr-name">最低还款额</span>
                <span class="x-curr-time"></span>
              </div>
            </div>
            <div class="x-curr-right">
              <div class="x-curr-money">
                <span class="x-curr-amount"></span>
                <span class="x-curr-currency"
                  >{{ currency["CNY"] }}{{ item.Lwst_Repy_Amt }}</span
                >
                <span
                  v-for="(item, index) in selcurrency_less"
                  class="curr"
                  :key="index"
                  >{{ item }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import { Card } from "vux";
export default {
  name: "x-billing-info",
  data() {
    return {
      currency: { CNY: "￥", USD: "$", EUR: "€" },
      selcurrency: ["￥0.00", "$0.00", "€0.00"],
      amount: "20000",
      amount_all: "20000",
      amount_less: "0.00",
      allList123: []
    };
  },
  computed: {
    selcurrency_less() {
      let that = this;
      return that.selcurrency.filter(function(val) {
        return val.indexOf(that.currency["CNY"]) < 0;
      });
    },
    currLess() {
      let that = this;
      return that.selcurrency
        .filter(function(val) {
          return val.indexOf(that.currency["CNY"]) < 0;
        })
        .join(" ");
    }
  },
  mounted() {
    let that = this;
    that.allList123 = that.$route.query.allList123;
  },
  methods: {
    referMore() {},
    openCurBilling() {},
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
    Card
  }
};
</script>
<style lang="less">
.currbilling {
  /deep/.weui-panel {
    &::before {
      height: 0;
      border: 0;
    }
    &::after {
      height: 0;
      border: 0;
    }
  }
  /deep/.weui-panel__hd {
    text-align: left;
    color: #000000;
    font-size: 14px;
    background-color: #f0f0f0;
    &::after {
      border: 0;
    }
  }
  /deep/.weui-panel__bd {
    background-color: #f0f0f0;
  }
  /deep/.vux-card-content {
    background-color: #ffffff;
    margin: 0 10px;
    border-radius: 10px;
    button {
      border: 0;
      width: 100%;
      background-color: #ffffff;
    }
  }
  .x-billing-info {
    margin-top: 20px !important;
    .card-ccb-detail {
      flex-direction: column;
      .vux-1px-r {
        padding: 10px 0;
        .x-curr-left,
        .x-curr-right {
          position: relative;
          display: flex;
          display: -webkit-box;
          flex-direction: row;
        }
        .x-curr-left {
          float: left;
          .x-curr-img {
            display: none;
            flex: 1;
            line-height: 20px;
            position: relative;
            text-align: center;
            span {
              background-color: orange;
              width: 25px;
              height: 25px;
              position: relative;
              top: 50%;
              transform: translateY(-50%);
              border-radius: 50%;
            }
            .qian {
              background-color: #0078ff;
            }
            i {
              font-size: 18px;
              color: #fff;
              position: relative;
              top: 50%;
              bottom: 0;
              transform: translateY(-125%);
              display: block;
              margin: 0 auto;
              line-height: inherit;
            }
          }
          .x-curr-content {
            flex: 1;
            text-align: left;
            margin: 0 10px;
          }
        }
        .x-curr-right {
          width: 70%;
          float: left;
          .x-curr-money {
            flex: 1;
            text-align: left;
            display: flex;
            display: -webkit-box;
            padding: 0 0 0 20px;
            .x-curr-amount {
              display: none;
              color: green;
            }
          }
          .x-curr-money > span {
            display: block;
            flex: 1;
          }
          .x-curr-currency {
            flex: 2 !important;
          }
        }
        &::after {
          top: 100%;
          width: 100%;
          height: 1px;
          border-right: 0;
          border-bottom: 1px solid #c7c7c7;
          transform: scale(1, 0.5);
        }
      }
    }
    .repayment-info {
      padding: 0 15px;
      &::after {
        border: 0;
        width: 0;
      }
    }
    .repaymen-item {
      padding: 5px 0;
      text-align: left;
      .repaymen-item_detail {
        margin-left: 20px;
      }
    }
    span {
      display: inline-block;
    }
    .selcurrency {
      .curr {
        padding: 0 10px;
      }
    }
    .detail {
      flex: 1;
      &::after {
        border: 0;
        width: 0;
      }
    }
  }
  .card-ccb-flex {
    display: flex;
  }
  .card-ccb-content {
    padding: 10px 15px;
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
    color: #000000;
  }
}
</style>
