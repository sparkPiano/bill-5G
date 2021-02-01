<template>
  <div class="x-billing-details">
    <card :header="{ title: this.timeSpec }">
      <div slot="content" class="card-ccb-flex card-ccb-content">
        <div class="vux-1px-r" @click="openCurBilling">
          <!-- <span>1130</span>
          <br /> -->
          {{ curBilling }}
        </div>
        <div class="vux-1px-r" @click="openHisBilling">
          <!-- <span>15</span>
          <br /> -->
          {{ hisBilling }}
        </div>
        <div class="vux-1px-r last" @click="openUnbilled">
          <!-- <span>25</span>
          <br /> -->
          {{ unbilled }}
        </div>
      </div>
    </card>
    <card :header="{ title: this.otherSpec }">
      <div slot="content" class="card-ccb-flex card-ccb-content">
        <div class="vux-1px-r startTime" @click="chooseStartTime">
          {{ startTime }}
        </div>
        <div class="vux-1px-r dest">
          {{ dest }}
        </div>
        <div class="vux-1px-r endTime" @click="chooseEndTime">
          {{ endTime }}
        </div>
      </div>
      <div
        slot="content"
        class="card-ccb-flex card-ccb-content"
        v-show="isShowTime"
      >
        <div class="vux-1px-r time">
          <datetime-view
            v-model="dtTime"
            ref="datetime"
            :format="format"
          ></datetime-view>
        </div>
      </div>
      <div
        slot="content"
        class="card-ccb-flex card-ccb-content"
        v-show="isShowTime"
      >
        <div class="vux-1px-r cancel" @click="cancel">
          <button type="button">{{ cancelDesc }}</button>
        </div>
        <div class="vux-1px-r confirm" @click="confirm">
          <button type="button">{{ confirmDesc }}</button>
        </div>
      </div>
    </card>
    <x-button type="primary" class="active" @click.native="searchBilling"
      >查询</x-button
    >
  </div>
</template>
<script>
/* eslint-disable */
import { Card, DatetimeView, XButton, Toast  } from "vux";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "x-billing-details",
  data() {
    return {
      timeSpec: "请选择查询的时间范围",
      otherSpec: "您也可以选择具体的起止时间查询",
      curBilling: "本期账单",
      hisBilling: "历史账单",
      unbilled: "未出账单",
      startTime: "开始时间",
      dest: "至",
      endTime: "结束时间",
      cancelDesc: "取消",
      confirmDesc: "确定",
      format: "YYYY-MM-DD",
      isShowTime: false,
      isStart: false,
      dtTime: this.formatTime(new Date(), "yyyy-MM-dd")
    };
  },
  methods: {
    cancel() {
      let that = this;
      that.isShowTime = false;
    },
    confirm() {
      let that = this;
      that.isShowTime = false;
      if (that.isStart) {
        that.startTime = that.dtTime;
        that.$store.state.XBillingDetails.startTime = that.dtTime;
      } else {
        that.endTime = that.dtTime;
        that.$store.state.XBillingDetails.endTime = that.dtTime;
      }
    },
    chooseStartTime() {
      let that = this;
      that.isShowTime = !that.isShowTime ? true : false;
      that.isStart = true;
    },
    chooseEndTime() {
      let that = this;
      that.isShowTime = !that.isShowTime ? true : false;
      that.isStart = false;
    },
    openCurBilling() {
      let that = this;
      that.$router.push({
        params: {},
        name: "curr"
      });
    },
    openHisBilling() {
      let that = this;
      that.$router.push({
        params: {},
        name: "his"
      });
    },
    openUnbilled() {
      let that = this;
      that.$router.push({
        params: {},
        name: "unbilled"
      });
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
    searchBilling() {
      let that = this;
      if(that.startTime == "开始时间") {
        that.$vux.toast.text('请选择开始时间！', 'top')
        return;
      }
      if(that.endTime == "结束时间") {
        that.$vux.toast.text('请选择结束时间！', 'top')
        return;
      }
      // that.$router.push({
      //   name: "transaction"
      // });
      that.$router.push(`/transaction?flag=not`);
    }
  },
  computed: {
    
  },
  watch: {

  },
  components: {
    Card,
    DatetimeView,
    XButton,
    Toast
  }
};
</script>
<style lang="less">
.billing {
  
 * { touch-action: pan-y; }
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
    font-size: 13px;
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
    .cancel button {
      color: #000000;
    }
    .confirm button {
      color: rgb(0, 120, 255);
    }
  }
  .startTime,
  .endTime {
    background-color: #f0f0f0;
    padding: 5px 0;
    border-radius: 5px;
    &::after{
      width: 0;
      border-right: 0;
    }
  }
  .dest {
    padding: 5px 0;
    &::after{
      width: 0;
      border-right: 0;
    }
  }
  .startTime {
    margin-left: 10px;
  }
  .endTime {
    margin-right: 10px;
  }
  .last {
    &::after {
      width: 0;
      border: 0;
    }
  }
  .time {
    flex: 1;
  }
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
