<template>
  <div class="x-billed-info">
    <card
      v-for="(item, index) in allList123.LIST1"
      :key="index"
      :header="{ title: dealCNY(item.Acc_SN) }"
    >
      <div slot="content" class="card-ccb-flex card-ccb-content">
        <div v-if="allList123.LIST1" class="vux-1px-r repayment-info">
          <!-- <div class="repaymentInfo" v-for="(item,index) in list" :key="index">
            <label :for="index"></label>
            <span :id="index" :name="index"></span>
          </div> -->
          <div class="repaymen-item">
            <span class="repaymen-item_title">上期全部还款额</span>
            <span class="repaymen-item_detail"
              ><span class="currency"></span><span class="amount"></span
              ><span class="selcurrency">{{
                item.CrCrd_LstTm_Repy_Amt
              }}</span></span
            >
          </div>
          <div class="repaymen-item">
            <span class="repaymen-item_title">消费/取现/其他费用</span>
            <span class="repaymen-item_detail"
              ><span class="currency"></span><span class="amount plus">+</span
              ><span class="selcurrency">{{
                item.CrnPrd_Dbt_Cgy_TxnAmt
              }}</span></span
            >
          </div>
          <div class="repaymen-item">
            <span class="repaymen-item_title">还款/退货/费用返还</span>
            <span class="repaymen-item_detail"
              ><span class="currency"></span><span class="amount divide">-</span
              ><span class="selcurrency">{{
                item.CrnPrd_Cr_Cgy_TxnAmt
              }}</span></span
            >
          </div>
          <div class="repaymen-item">
            <span class="repaymen-item_title">本期全部应还款</span>
            <span class="repaymen-item_detail"
              ><span class="currency"></span><span class="amount equal">=</span
              ><span class="selcurrency">{{
                item.CrnPrd_ShldRepymt_Amt
              }}</span></span
            >
          </div>
        </div>
      </div>
    </card>
  </div>
</template>
<script>
import { Card } from "vux";
export default {
  name: "x-billed-info",
  data() {
    return {
      currency: { CNY: "￥", USD: "$", EUR: "€" },
      selcurrency: ["￥0.00", "$0.00", "€0.00"],
      other_amount: "63.00",
      pre_amount_all: "120.61",
      re_amount: "121.61",
      curr_amount_all: "62.00",
      billedTitle: "人民币",
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
    console.log("XBilled mounted route", this.$route.query.allList123);
    let that = this;
    that.allList123 = that.$route.query.allList123;
  },
  methods: {
    dealCNY(yuan) {
      if (yuan == "392") {
        return "日元";
      } else if (yuan == "344") {
        return "香港元";
      } else if (yuan == "036") {
        return "澳大利亚元";
      } else if (yuan == "446") {
        return "澳门元";
      } else if (yuan == "840") {
        return "美元";
      } else if (yuan == "826") {
        return "英镑";
      } else if (yuan == "458") {
        return "马来西亚林吉特";
      } else if (yuan == "978") {
        return "欧元";
      } else if (yuan == "901") {
        return "新台币";
      } else if (yuan == "124") {
        return "加拿大元";
      } else if (yuan == "156") {
        return "人民币";
      } else {
        return "未知币种";
      }
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
  .x-billed-info {
    .card-ccb-content {
      padding: 10px 0;
    }
    .repayment-info {
      padding: 0 15px;
      &::after {
        border: 0;
        width: 0;
      }
    }
    .repaymen-item {
      display: flex;
      display: -webkit-box;
      padding: 5px 0;
      text-align: left;
      .repaymen-item_title {
        display: block;
        flex: 1;
      }
      .repaymen-item_detail {
        display: block;
        flex: 1;
        text-align: right;
        font-size: 12px !important;
        margin-left: 0 !important;
        span.amount {
          right: 80px;
          position: absolute;
        }
        span.amount.plus {
          color: #f00000;
        }
        span.amount.divide {
          color: #1bef1b;
        }
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
