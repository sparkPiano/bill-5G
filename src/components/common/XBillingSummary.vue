<template>
  <div class="vux-1px-r repayment-info">
    <!-- <div class="repaymentInfo" v-for="(item,index) in list" :key="index">
            <label :for="index"></label>
            <span :id="index" :name="index"></span>
          </div> -->
    <div class="repaymen-item">
      <span class="repaymen-item_title">交易日</span>
      <span class="repaymen-item_detail"
        ><span class="currency"></span><span class="amount"></span
        ><span class="selcurrency">{{
          cnt.Crd_Ahn_Txn_Dt.substr(0, 4) +
            "/" +
            cnt.Crd_Ahn_Txn_Dt.substr(4, 2) +
            "/" +
            cnt.Crd_Ahn_Txn_Dt.substr(6, 8)
        }}</span></span
      >
    </div>
    <div class="repaymen-item">
      <span class="repaymen-item_title">卡号后四位</span>
      <span class="repaymen-item_detail"
        ><span class="currency"></span><span class="amount"></span
        ><span class="selcurrency">{{
          cnt.label.substr(cnt.label.length - 4)
        }}</span></span
      >
    </div>
    <div class="repaymen-item">
      <span class="repaymen-item_title">交易类型</span>
      <span class="repaymen-item_detail"
        ><span class="currency"></span><span class="amount"></span
        ><span class="selcurrency">{{ cnt.Txn_Tp_Nm }}</span></span
      >
    </div>
    <div class="repaymen-item">
      <span class="repaymen-item_title">交易币种/金额</span>
      <span class="repaymen-item_detail"
        ><span class="currency"></span><span class="amount"></span
        ><span class="selcurrency"
          >{{ dealCNY(cnt.Crd_Ahn_Inf_TnCcy_Cd) }}/{{ cnt.Ahn_TxnAmt }}</span
        ></span
      >
    </div>
    <div class="repaymen-item">
      <span class="repaymen-item_title">记账日</span>
      <span class="repaymen-item_detail"
        ><span class="currency"></span><span class="amount"></span
        ><span class="selcurrency">{{
          cnt.AcMd_Dt.substr(0, 4) +
            "/" +
            cnt.AcMd_Dt.substr(4, 2) +
            "/" +
            cnt.AcMd_Dt.substr(6, 8)
        }}</span></span
      >
    </div>
    <div class="repaymen-item">
      <span class="repaymen-item_title">结算币种/金额</span>
      <span class="repaymen-item_detail"
        ><span class="currency"></span><span class="amount"></span
        ><span class="selcurrency"
          >{{ dealCNY(cnt.Acc_SN) }}/{{ cnt.CrCrd_Txn_AccEntr_Amt }}</span
        ></span
      >
    </div>
    <div class="repaymen-item">
      <span class="repaymen-item_title">交易描述</span>
      <span class="repaymen-item_detail"
        ><span class="currency"></span><span class="amount"></span
        ><span class="selcurrency">{{ cnt.Txn_Nm_Dsc }}</span></span
      >
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  props: {
    cnt: {
      type: Object
    }
  },
  data() {
    return {};
  },
  created() {},
  computed: {},
  methods: {
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
    dealCNY(yuan) {
      if (yuan == "392") {
        return "日元";
      } else if (yuan == "446") {
        return "澳门元";
      } else if (yuan == "344") {
        return "香港元";
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
  }
};
</script>
<style lang="less" scoped>
.repaymen-item {
  display: flex;
  display: -webkit-box;
  .repaymen-item_title {
    display: block;
    flex: 1;
  }
  .repaymen-item_detail {
    display: block;
    flex: 1;
    text-align: right;
    color: #a4a4a4 !important;
    font-size: 10px !important;
    margin-left: 0 !important;
    span {
      color: #a4a4a4 !important;
      margin-left: 0 !important;
    }
  }
}
</style>
