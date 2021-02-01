<template>
  <div class="XTransactionDetails" v-if="showPage">
    <NoData
      :icon="require('@/assets/images/noData.png')"
      text="暂无交易明细记录"
      :imgW="widthNoData"
      :imgH="heightNoData"
      v-if="showNoData"
    ></NoData>
    <div v-else class="x-transaction-details">
      <card>
        <div class="x-filter" slot="header" @click="jumpHisBilling">
          筛选
          <span class="xiala"><i class="iconfont icon-xiala2"></i></span>
        </div>
        <div
          slot="content"
          class="card-ccb-flex card-ccb-content card-ccb-detail"
        >
          <div
            class="vux-1px-r"
            v-for="(item, index) in allList"
            :key="index"
            @click="showSlide(item, index)"
          >
            <div class="x-curr-left">
              <div class="x-curr-img">
                <img :src="dealIcon(item.Txn_Tp_Nm)" alt="" />
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
              <div v-show="every === index" class="slide animate">
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
          <!-- <div class="vux-1px-r" @click="showSlide('one')">
          <div class="x-curr-left">
            <div class="x-curr-img">
              <span class="xinyongqiatianjia"
                ><i class="iconfont icon-xinyongqiatianjia"></i
              ></span>
            </div>
            <div class="x-curr-content">
              <span class="x-curr-name">消费</span>
              <span class="x-curr-time">{{
                formatTime(new Date(), "yyyy/MM/dd")
              }}</span>
            </div>
          </div>
          <div class="x-curr-right">
            <div class="x-curr-money">
              <span class="x-curr-amount">-600</span>
              <span class="x-curr-currency">人民币</span>
            </div>
          </div>
        </div> -->
          <!-- <div class="vux-1px-r" @click="showSlide('two')">
          <div class="x-curr-left">
            <div class="x-curr-img">
              <span class="qian"><i class="iconfont icon-qian2"></i></span>
            </div>
            <div class="x-curr-content">
              <span class="x-curr-name">存入</span>
              <span class="x-curr-time">{{
                formatTime(new Date(), "yyyy/MM/dd")
              }}</span>
            </div>
          </div>
          <div class="x-curr-right">
            <div class="x-curr-money">
              <span class="x-curr-amount">4</span>
              <span class="x-curr-currency">人民币</span>
            </div>
          </div>
          <div
            v-if="every == 'two'"
            class="slide"
            :class="showContent ? 'animate' : ''"
          >
            <XBillingSummary></XBillingSummary>
          </div>
        </div> -->
          <!-- <div class="vux-1px-r" @click="showSlide('three')">
          <div class="x-curr-left">
            <div class="x-curr-img">
              <span class="xinyongqiatianjia"
                ><i class="iconfont icon-xinyongqiatianjia"></i
              ></span>
            </div>
            <div class="x-curr-content">
              <span class="x-curr-name">消费</span>
              <span class="x-curr-time">{{
                formatTime(new Date(), "yyyy/MM/dd")
              }}</span>
            </div>
          </div>
          <div class="x-curr-right">
            <div class="x-curr-money">
              <span class="x-curr-amount">-600</span>
              <span class="x-curr-currency">人民币</span>
            </div>
          </div>
          <div
            v-if="every == 'three'"
            class="slide"
            :class="showContent ? 'animate' : ''"
          >
            <XBillingSummary></XBillingSummary>
          </div>
        </div> -->
        </div>
      </card>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { Card, Scroller, LoadMore  } from "vux";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import General from "@/utils/general";
export default {
  name: "x-transaction-details",
  data() {
    return {
      showPage: false,
      key: 0,
      every: -1,
      dealType: ["存入", "消费"],
      allList: [],
      widthNoData: "200px",
      heightNoData: "200px",
      showNoData: true
    };
  },
  computed: {
    tipText () {
      // 暂无数据, 没有更多数据, 轻按加载更多
      if (!this.getAllBillList || this.getAllBillList.length === 0) {
        return '暂无数据'
      }
      return this.isLoadMore ? '轻按加载更多' : '没有更多明细了'
    },
    ...mapGetters({
      getAllBillList: "getAllBill",
    }),
    ...mapState({
      page: state => state.XBillingDetails.page,
      page_total: state => state.XBillingDetails.page_total,
      current_page_num: state => state.XBillingDetails.current_page_num,
      loading: state => state.XBillingDetails.loading,
      isLoadMore: state => state.XBillingDetails.isLoadMore,
      isLoading: state => state.isLoading
    })
  },
  watch: {
    getAllBillList() {
      console.log("watch getAllBillList", this.getAllBillList, this.page, this.page_total, this.current_page_num, this.loading, this.isLoadMore);
      let that = this;
      if (!that.isLoading) {
        that.showPage = true;
      }
      if (that.getAllBillList.length > 0) {
        that.showNoData = false;
        if (that.allList !== null) {
          that.allList = [...that.allList, ...that.getAllBillList];
        } else {
          that.allList = that.getAllBillList;
        }
      }else{
        that.showNoData = true;
      }
    },
  },
  created() {
    let that = this;
    if(that.$route.query.flag == "not") {
      that.$store.commit("dealStateList2Title", {info: ""});
      that.$store.commit("upCrdCard", { svcId: 4 });
      that.$store.commit("delCrdCard", { kahao: "" });
    }
  },
  mounted() {
    this.dealPageIssue();
    this.requireAllBill();
  },
  methods: {
    dealIcon(name) {
      if(name == "利息") {
        return require("../../../assets/images/interest.png");
      }else if(name == "存入") {
        return require("../../../assets/images/deposit.png");
      }else if(name == "费用") {
        return require("../../../assets/images/cost.png");
      }else if(name == "取现") {
        return require("../../../assets/images/cash.png");
      }else if(name == "消费") {
        return require("../../../assets/images/consumption.png");
      }else if(name == "转出") {
        return require("../../../assets/images/rollOut.png");
      }else if(name == "退货退税") {
        return require("../../../assets/images/returnOfTheRefunt.png");
      }else if(name == "其他") {
        return require("../../../assets/images/other.png");
      }
    },
    dealCNY(yuan) {
      if(yuan == "392") {
        return "日元";
      }else if(yuan == "344") {
        return "香港元";
      }else if (yuan == "446") {
        return "澳门元";
      } else if(yuan == "036") {
        return "澳大利亚元";
      }else if(yuan == "840") {
        return "美元";
      }else if(yuan == "826") {
        return "英镑";
      }else if(yuan == "458") {
        return "马来西亚林吉特";
      }else if(yuan == "978") {
        return "欧元";
      }else if(yuan == "901") {
        return "新台币";
      }else if(yuan == "124") {
        return "加拿大元";
      }else if(yuan == "156") {
        return "人民币";
      }else{
        return "未知币种";
      }
    },
    dealPageIssue() {
      let that = this;
      that.$store.commit("dealPageIssue", { page: 1 });
    },
    load () {
      if (!this.isLoadMore) {
        return
      }
      this.requireAllBill()
    },
    requireAllBill() {
      let that = this;
      that.$store.commit("updateXBillingDetailsLoading", { loading: true });
      that.$store.dispatch("requireAllBill");
    },
    jumpHisBilling() {
      let that = this;
      that.$router.push({
        params: {},
        name: "hisDetail",
      });
    },
    jumpBillingInfo() {
      let that = this;
      that.$router.push({
        params: {},
        name: "billingInfo",
      });
    },
    viewBilled() {
      let that = this;
      that.$router.push({
        params: {},
        name: "billedInfo",
      });
    },
    showSlide(item, index) {
      console.log("showSlide", item, index);
      let that = this;
      if (that.every >= 0) {
        that.every = -1;
      } else {
        that.every = index;
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
          S: date.getMilliseconds(), //毫秒
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
  },
  components: {
    LoadMore,
    Card,
    Scroller,
    XBillingSummary: () => import("../../common/XBillingSummary.vue"),
    NoData: () => import("../../common/NoData.vue"),
    collapse: () => import("@/plugins/collapse.js")
  },
};
</script>
<style lang="less">
 * { touch-action: pan-y; }
.transactionDetails {
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
    margin: 0 10px;
    border-radius: 10px;
    background-color: #f0f0f0;
    button {
      border: 0;
      width: 100%;
      background-color: #ffffff;
    }
  }
  .x-transaction-details {
    .x-filter {
      padding: 10px 30px;
      text-align: left;
      font-weight: 600;
      line-height: 16px;
      .xiala {
        font-size: 16px;
        height: 16px;
        position: relative;
        line-height: 16px;
      }
    }
    .card-ccb-detail {
      flex-direction: column;
      .vux-1px-r {
        padding: 10px;
        background-color: #ffffff;
        border-radius: 10px;
        margin: 5px 0;
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
            // span {
            //   // background-color: orange;
            //   width: 25px;
            //   height: 25px;
            //   position: relative;
            //   top: 50%;
            //   transform: translateY(-50%);
            //   border-radius: 50%;
            // }
            img {
              width: 25px;
              height: 25px;
              margin-top: 6px;
              display: inline-block;
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
          width: 0;
          height: 0;
          border: 0;
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
      .x-repayment {
        color: #0078ff;
        font-size: 15px;
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
      }
    }
    span {
      display: inline-block;
    }
    .selcurrency {
      margin-left: 30px;
    }
    .billed {
      position: absolute;
      width: 21px;
      height: 21px;
      margin-left: 5px;
      i {
        width: 16px;
        height: 16px;
        display: block;
        position: absolute;
        top: -16px;
        color: #0078ff;
      }
    }
    .detail {
      flex: 1;
      &::after {
        border: 0;
        width: 0;
      }
    }
    .card-ccb-content {
      padding: 10px 0;
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
