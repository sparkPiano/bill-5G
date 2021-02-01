<template>
  <div class="XCurrBilling" v-if="showPage">
    <NoData
      :icon="require('@/assets/images/noData.png')"
      text="暂无本期数据~"
      :imgW="widthNoData"
      :imgH="heightNoData"
      v-if="showNoData"
    ></NoData>
    <div v-else class="x-curr-billing">
      <card
        v-if="allList123 && allList123.CrCrd_Acg_Setl_Dt && allList123.StDt"
        :header="{
          title:
            allList123.CrCrd_Acg_Setl_Dt.substr(0, 4) +
            '年' +
            allList123.CrCrd_Acg_Setl_Dt.substr(4, 2) +
            '月' +
            '(' +
            allList123.StDt.substr(4, 2) +
            '.' +
            allList123.StDt.substr(6, 2) +
            '-' +
            allList123.CrCrd_Acg_Setl_Dt.substr(4, 2) +
            '.' +
            allList123.CrCrd_Acg_Setl_Dt.substr(6, 2) +
            ')'
        }"
      >
        <div slot="content" class="card-ccb-flex card-ccb-content">
          <div class="vux-1px-r repayment-info" v-if="list1 && list1[0]">
            <!-- <div class="repaymentInfo" v-for="(item,index) in list" :key="index">
            <label :for="index"></label>
            <span :id="index" :name="index"></span>
          </div> -->
            <div class="repaymen-item">
              <span class="repaymen-item_title">还需还款</span>
              <span class="repaymen-item_detail"
                ><span class="currency x-repayment">{{ currency["CNY"] }}</span
                ><span class="amount x-repayment">{{
                  mustList[0] && mustList[0].bill_amt_left
                    ? mustList[0].bill_amt_left
                    : "0.0"
                }}</span
                ><span class="selcurrency">{{ currency["USD"] }}</span
                ><span class="amount">{{
                  mustList[1] && mustList[1].bill_amt_left
                    ? mustList[1].bill_amt_left
                    : "0.00"
                }}</span
                ><span style="margin-left:.05rem;" class="currency">{{
                  currency["EUR"]
                }}</span
                ><span class="amount">{{
                  mustList[2] && mustList[2].bill_amt_left
                    ? mustList[2].bill_amt_left
                    : "0.00"
                }}</span></span
              >
            </div>
            <div @click="viewBilled" class="repaymen-item">
              <span class="repaymen-item_title">本期全部还款额</span>
              <span class="repaymen-item_detail"
                ><span class="currency">{{ currency["CNY"] }}</span
                ><span class="amount_all">{{
                  list1[0].CrnPrd_ShldRepymt_Amt
                }}</span
                ><span class="selcurrency">{{ currency["USD"] }}</span
                ><span class="amount">
                  {{
                    list1[1] && list1[1].CrnPrd_ShldRepymt_Amt
                      ? list1[1].CrnPrd_ShldRepymt_Amt
                      : "0.00"
                  }} </span
                ><span style="margin-left:.05rem;" class="currency">{{
                  currency["EUR"]
                }}</span
                ><span class="amount"
                  >{{
                    list1[2] && list1[2].CrnPrd_ShldRepymt_Amt
                      ? list1[2].CrnPrd_ShldRepymt_Amt
                      : "0.00"
                  }}<span class="billed">
                    <img src="../../../assets/images/issue.png" alt="" /> </span
                ></span>
              </span>
            </div>
            <div class="repaymen-item" v-if="list1 && list1[0]">
              <span class="repaymen-item_title">本期最低还款额</span>
              <span class="repaymen-item_detail"
                ><span class="currency">{{ currency["CNY"] }}</span
                ><span class="amount_less">{{ list1[0].Lwst_Repy_Amt }}</span>
                <span class="selcurrency">{{ currency["USD"] }}</span
                ><span class="amount">{{
                  list1[1] && list1[1].Lwst_Repy_Amt
                    ? list1[1].Lwst_Repy_Amt
                    : "0.00"
                }}</span
                ><span style="margin-left:.05rem;" class="currency">{{
                  currency["EUR"]
                }}</span
                ><span class="amount">{{
                  list1[2] && list1[2].Lwst_Repy_Amt
                    ? list1[2].Lwst_Repy_Amt
                    : "0.00"
                }}</span>
              </span>
            </div>
            <div
              class="repaymen-item"
              v-if="allList123 && allList123.CrCrd_Acg_Setl_Dt"
            >
              <span class="repaymen-item_title">账单日</span>
              <span class="repaymen-item_detail">{{
                allList123.CrCrd_Acg_Setl_Dt.substr(0, 4) +
                  "/" +
                  allList123.CrCrd_Acg_Setl_Dt.substr(4, 2) +
                  "/" +
                  allList123.CrCrd_Acg_Setl_Dt.substr(6, 8)
              }}</span>
            </div>
            <div class="repaymen-item">
              <span class="repaymen-item_title">您本期账单的还款日为</span>
              <span class="repaymen-item_detail">{{
                allList123.Last_RepyDy.substr(0, 4) +
                  "/" +
                  allList123.Last_RepyDy.substr(4, 2) +
                  "/" +
                  allList123.Last_RepyDy.substr(6, 8)
              }}</span>
            </div>
            <div v-if="showPayDay" class="repaymen-item">
              <span class="repaymen-item_title">距还款日还剩</span>
              <span class="repaymen-item_detail">{{
                getDistanceSpecifiedTime(
                  allList123.Last_RepyDy.substr(0, 4) +
                    "/" +
                    allList123.Last_RepyDy.substr(4, 2) +
                    "/" +
                    allList123.Last_RepyDy.substr(6, 2)
                )
              }}</span>
            </div>
            <span class="billingInfo" @click="jumpBillingInfo">
              <i class="iconfont icon-xiangyou"></i>
            </span>
          </div>
        </div>
      </card>
      <card v-if="showlist3" :header="{ title: this.otherSpec }">
        <div
          slot="content"
          class="card-ccb-flex card-ccb-content card-ccb-detail"
        >
          <div
            class="vux-1px-r"
            v-for="(item, index) in list3"
            :key="index"
            @click="showSlide(item, index)"
          >
            <div class="x-curr-left">
              <div class="x-curr-img">
                <img
                  style="width: 25px;height:25px;margin-top:6px;display:inline-block;"
                  :src="dealIcon(item.Txn_Tp_Nm)"
                  alt=""
                />
              </div>
              <div class="x-curr-content">
                <span class="x-curr-name">{{ item.Txn_Tp_Nm }}</span>
                <span class="x-curr-time">{{
                  item.Crd_Ahn_Txn_Dt.substr(0, 4) +
                    "/" +
                    item.Crd_Ahn_Txn_Dt.substr(4, 2) +
                    "/" +
                    item.Crd_Ahn_Txn_Dt.substr(6, 8)
                }}</span>
              </div>
            </div>
            <div class="x-curr-right">
              <div class="x-curr-money">
                <span
                  :class="
                    item.CrCrd_Txn_AccEntr_Amt > 0
                      ? 'x-curr-red'
                      : 'x-curr-amount'
                  "
                  >{{ item.CrCrd_Txn_AccEntr_Amt }}</span
                >
                <span class="x-curr-currency">{{ dealCNY(item.Acc_SN) }}</span>
              </div>
            </div>
            <collapse>
              <div v-show="show3 && every == index" class="slide animate">
                <XBillingSummary :cnt="item"></XBillingSummary>
              </div>
            </collapse>
          </div>
          <load-more v-if="loading" tip="正在加载"></load-more>
          <load-more
            v-else
            :show-loading="false"
            @click.prevent.native="load"
            :tip="tipText"
            background-color="#fbf9fe"
          ></load-more>
        </div>
        <!-- <div slot="content" class="card-ccb-flex card-ccb-content">
        <div class="vux-1px-r detail">查看更多</div>
      </div> -->
      </card>
    </div>
  </div>
</template>
<script>
import { Card, LoadMore } from "vux";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "x-curr-billing",
  data() {
    return {
      showPayDay: true,
      showPage: false,
      widthNoData: "200px",
      heightNoData: "200px",
      showNoData: true,
      CrnPrd_ShldRepymt_Amt: "",
      showlist3: false,
      Lwst_Repy_Amt: "",
      // repaymentDate: `${this.formatTime(
      //   new Date(),
      //   "yyyy年MM月"
      // )} (${this.formatTime(
      //   new this.$dateFormat().getPreMonth(
      //     this.formatTime(new Date(), "yyyy-MM-dd")
      //   ),
      //   "M."
      // )}26-${this.formatTime(new Date(), "M.")}25)`,
      billingDate: `${this.formatTime(new Date(), "yyyy/MM/")}25`,
      currBillingDate: `${this.formatTime(new Date(), "yyyy/MM/dd")}`,
      otherSpec: "已出账单明细",
      currency: { CNY: "￥", USD: "$", EUR: "€" },
      selcurrency: ["￥0.00", "$0.00", "€0.00"],
      amount: "0.95",
      amount_all: "62.00",
      amount_less: "62.00",
      showContent: false,
      key: 0,
      oldIndex: "",
      show3: false,
      every: "-1",
      dealType: ["存入", "消费"],
      allList123: [], //所有
      list1: [], //客户的账单汇总
      list2: [], //账户的账单汇总
      list3: [], //已出账单的账单明细
      mustList: [] //账单头的还需还款
    };
  },
  computed: {
    tipText() {
      // 暂无数据, 没有更多数据, 轻按加载更多
      if (!this.list3 || this.list3.length === 0) {
        return "暂无数据";
      }
      return this.isLoadMore ? "轻按加载更多" : "没有更多明细了";
    },
    selcurrency_all() {
      let that = this;
      return that.selcurrency
        .filter(function(val) {
          return val.indexOf(that.currency["CNY"]) < 0;
        })
        .join(" ");
    },
    selcurrency_less() {
      let that = this;
      return that.selcurrency
        .filter(function(val) {
          return val.indexOf(that.currency["CNY"]) < 0;
        })
        .join(" ");
    },
    remaining() {
      let that = this;
      return (
        (new Date(that.billingDate + " 00:00:00").getTime() -
          new Date(that.currBillingDate + " 00:00:00")) /
        (1000 * 60 * 60 * 24)
      );
    },
    ...mapGetters({
      getAllCurrBill: "getCurrBill"
    }),
    ...mapState({
      page: state => state.XCurrBilling.page,
      page_total: state => state.XCurrBilling.page_total,
      current_page_num: state => state.XCurrBilling.current_page_num,
      loading: state => state.XCurrBilling.loading,
      isLoadMore: state => state.XCurrBilling.isLoadMore,
      isLoading: state => state.isLoading
    })
  },
  watch: {
    getAllCurrBill() {
      let that = this;
      if (!that.isLoading) {
        that.showPage = true;
      }
      that.allList123 = that.getAllCurrBill;
      console.log("watch getAllCurrBill", that.getAllCurrBill);
      if (that.list3 && that.list3.length > 0) {
        that.list3 =
          that.list3 && that.getAllCurrBill.LIST3
            ? [...that.list3, ...that.getAllCurrBill.LIST3]
            : [];
      } else {
        that.list3 = that.getAllCurrBill.LIST3 ? that.getAllCurrBill.LIST3 : [];
      }
      if (that.list3.length > 0) {
        that.showlist3 = true;
      } else {
        that.showlist3 = false;
      }
      that.mustList = that.getAllCurrBill.zdmx.bills
        ? that.getAllCurrBill.zdmx.bills
        : [];
      that.list1 = that.getAllCurrBill.LIST1 ? that.getAllCurrBill.LIST1 : [];
      if (that.list1 && that.list1.length > 0) {
        that.showNoData = false;
      } else {
        that.showNoData = true;
      }
    }
  },
  created() {
    let that = this;
    that.dealPageIssue();
    that.requireCurrBill();
  },
  mounted() {
    console.log("AAAAAAAAAAAAAAAAAA");
  },
  methods: {
    getDistanceSpecifiedTime(dateTime) {
      console.log("dataTime", dateTime);
      let that = this;
      let t1 = new Date(dateTime).getTime();
      console.log("t1", t1);
      let t2 = new Date(that.formatTime(new Date(), "yyyy-MM-dd")).getTime();
      console.log("t2", t2);
      let t3 = t1 - t2;
      console.log("t3", t3);
      let res = t3 / (24 * 3600 * 1000);
      res = Math.ceil(res);
      console.log("res", res);
      if (res < 0) {
        that.showPayDay = false;
        console.log("showPayDay", that.showPayDay);
        return false;
      }
      return res + "天";
    },
    load() {
      if (!this.isLoadMore) {
        return;
      }
      this.requireCurrBill();
    },
    dealPageIssue() {
      let that = this;
      that.$store.commit("dealPageIssue", { page: 1 });
    },
    requireCurrBill() {
      let that = this;
      that.$store.commit("updateXBillingDetailsLoading", { loading: true });
      that.$store.dispatch("requireCurrBill");
    },
    referMore() {},
    openCurBilling() {},
    jumpBillingInfo() {
      let that = this;
      that.$router.push({
        query: {
          allList123: that.allList123
        },
        name: "billingInfo"
      });
    },
    viewBilled() {
      let that = this;
      that.$router.push({
        query: {
          allList123: that.allList123
        },
        name: "billedInfo"
      });
    },
    showSlide(item, index) {
      console.log("showSlide", item, index);
      let that = this;
      if (that.oldIndex === index) {
        that.show3 = !that.show3;
      } else {
        that.oldIndex = index;
        that.every = index;
        that.show3 = true;
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
    },
    dealIcon(name) {
      if (name == "利息") {
        return require("../../../assets/images/interest.png");
      } else if (name == "存入") {
        return require("../../../assets/images/deposit.png");
      } else if (name == "费用") {
        return require("../../../assets/images/cost.png");
      } else if (name == "取现") {
        return require("../../../assets/images/cash.png");
      } else if (name == "消费") {
        return require("../../../assets/images/consumption.png");
      } else if (name == "转出") {
        return require("../../../assets/images/rollOut.png");
      } else if (name == "退货退税") {
        return require("../../../assets/images/returnOfTheRefunt.png");
      } else if (name == "其他") {
        return require("../../../assets/images/other.png");
      }
    },
    dealCNY(yuan) {
      if (yuan == "392") {
        return "日元";
      } else if (yuan == "344") {
        return "香港元";
      } else if (yuan == "446") {
        return "澳门元";
      } else if (yuan == "036") {
        return "澳大利亚元";
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
    }
  },
  components: {
    Card,
    LoadMore,
    XBillingSummary: () => import("../../common/XBillingSummary.vue"),
    NoData: () => import("../../common/NoData.vue"),
    collapse: () => import("@/plugins/collapse.js")
  }
};
</script>
<style lang="less">
* {
  touch-action: pan-y;
}
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
    font-weight: 600;
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
  .x-curr-billing {
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
            display: flex;
            align-items: center;
            // flex: 1;
            // line-height: 20px;
            // position: relative;
            // text-align: center;
            // margin-top: 2px;
            // span {
            //   // background-color: orange;
            //   width: 25px;
            //   height: 25px;
            //   position: relative;
            //   top: 50%;
            //   transform: translateY(-50%);
            //   border-radius: 50%;
            // }
            // img {
            //   width: 25px;
            //   height: 25px;
            //   margin-top: 6px;
            //   display: inline-block;
            // }
            .qian {
              background-color: #0078ff;
            }
            i {
              font-size: 18px;
              color: #fff;
              position: relative;
              top: 50%;
              bottom: 0;
              transform: translateY(-128%);
              display: block;
              margin: 0 auto;
              line-height: inherit;
            }
          }
          .x-curr-content {
            display: flex;
            flex-direction: column;
            text-align: left;
            margin: 0 10px;
          }
        }
        .x-curr-right {
          float: right;
          .x-curr-money {
            flex: 1;
            text-align: right;
            span {
              display: block;
            }
            .x-curr-amount {
              color: green;
            }
            .x-curr-red {
              color: red;
            }
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
        .billed img {
          width: 20px;
          height: 20px;
        }
      }
      .x-repayment {
        color: #0078ff;
        font-size: 20px;
      }
    }
    .billingInfo {
      position: absolute;
      width: 50px;
      height: 50px;
      display: block;
      top: 50%;
      transform: translateY(-50%);
      right: 0;
      i {
        display: block;
        position: absolute;
        font-size: 30px;
        line-height: 30px;
        right: 0;
        top: -50%;
        transform: translateY(40%);
        color: #a4a4a4;
        line-height: inherit;
      }
    }
    span {
      display: inline-block;
    }
    .selcurrency {
      margin-left: 30px;
    }
    // .billed {
    //   position: absolute;
    //   width: 21px;
    //   height: 21px;
    //   margin-left: 5px;
    //   z-index: 999;
    //   img {
    //     width: 16px;
    //     height: 16px;
    //     display: block;
    //     position: absolute;
    //     top: -16px;
    //     color: #0078ff;
    //     line-height: inherit;
    //   }
    // }
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
.slide {
  position: relative;
  clear: both;
  padding: 0 20px;
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.5s cubic-bezier(0, 1, 0, 1) -0.1s;
}
.animate {
  max-height: 9999px;
  transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
  transition-delay: 0s;
}
</style>
