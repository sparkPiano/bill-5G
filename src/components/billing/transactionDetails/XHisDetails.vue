<template>
  <div class="x-his-details">
    <div v-transfer-dom>
      <actionsheet
        :menus="menus"
        v-model="showMenu"
        @on-click-menu="selectMenu"
        @on-after-hide="onHide"
        @on-after-show="onShow"
        @on-click-menu-delete="onDelete"
        show-cancel
      ></actionsheet>
    </div>
    <div v-transfer-dom>
      <confirm
        class="x-his-dialog"
        v-model="isShowConfirm"
        :title="jiaoyiTitle"
        @on-cancel="onCancelConfirm"
        @on-confirm="onConfirm"
        @on-show="onShowConfirm"
        @on-hide="onHideConfirm"
      >
        <checker
          v-model="checkVal"
          type="radio"
          default-item-class="x-his-details_item"
          selected-item-class="x-his-details_item__selected"
          @on-change="getSelectedVal"
        >
          <checker-item
            style="box-sizing: border-box;"
            v-for="item in typeList"
            :key="item.id"
            :value="item.val"
            @on-item-click="triggerItem"
            >{{ item.val }}</checker-item
          >
        </checker>
      </confirm>
    </div>
    <card>
      <div class="x-filter" slot="header">
        筛选
        <span class="xiala"><i class="iconfont icon-xiala2"></i></span>
      </div>
      <div slot="content" class="card-ccb-flex card-ccb-content">
        <group>
          <cell
            v-for="item in list"
            :key="item.id"
            :title="item.title"
            is-link
            :border-intent="false"
            :arrow-direction="key == item.id && showContent ? 'up' : 'down'"
            @click.native="showSelItem(item.id, item.type, item.title)"
          >
            <div class="selectedContent">
              <span>{{ listTitle }}</span>
            </div>
          </cell>
        </group>
      </div>
      <div
        style="margin-top: -0.2rem;"
        slot="content"
        class="card-ccb-flex card-ccb-content"
      >
        <group>
          <cell
            v-for="item in list2"
            :key="item.id"
            :title="item.title"
            is-link
            :border-intent="false"
            :arrow-direction="key == item.id && showContent ? 'up' : 'down'"
            @click.native="showSelItem(item.id, item.type, item.title)"
          >
            <div class="selectedContent">
              <span>{{ list2Title }}</span>
            </div>
          </cell>
        </group>
      </div>
    </card>
    <x-button
      type="primary"
      :class="{ active: checkVal.length > 0 || selectedItem }"
      @click.native="search"
      >确认</x-button
    >
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import {
  Card,
  Actionsheet,
  TransferDom,
  Flexbox,
  FlexboxItem,
  Confirm,
  Checker,
  CheckerItem,
  XButton
} from "vux";
export default {
  name: "x-his-details",
  directives: {
    TransferDom
  },
  data() {
    return {
      listTitle: "全部",
      newListTitle: "",
      list2Title: "全部",
      jiaoyiTitle: "",
      key: "",
      isShowConfirm: false,
      showContent: false,
      type: "3",
      showMenu: false,
      menus: [
        // {
        //   label: "6221****9090",
        //   type: "primary",
        //   value: "6221****9090",
        //   aaa: "1"
        // },
        // {
        //   label: "6227****9999",
        //   type: "primary",
        //   value: "6227****9999",
        //   bbb: "1"
        // }
      ],
      list: [
        {
          id: "1",
          title: "信用卡卡号",
          type: 1
        }
      ],
      list2: [
        {
          id: "2",
          title: "交易类型",
          type: 2
        }
      ],
      typeList: [
        {
          id: 1,
          val: "全部",
          title: "全部"
        },
        {
          id: 2,
          val: "存入",
          title: "存入"
        },
        {
          id: 3,
          val: "费用",
          title: "费用"
        },
        {
          id: 4,
          val: "利息",
          title: "利息"
        },
        {
          id: 5,
          val: "取现",
          title: "取现"
        },
        {
          id: 6,
          val: "消费",
          title: "消费"
        },
        {
          id: 7,
          val: "转出",
          title: "转出"
        },
        {
          id: 8,
          val: "退货退税",
          title: "退货退税"
        },
        {
          id: 9,
          val: "其他",
          title: "其他"
        }
      ],
      checkVal: "全部",
      selectedItem: ""
    };
  },
  computed: {
    ...mapGetters({
      getAllCardList: "getAllCard"
    })
  },
  watch: {
    getAllCardList() {
      let that = this;
      let dealMenus = [];
      console.log("getAllCardList", this.getAllCardList);
      that.menus = [{ label: "全部", value: "全部" }, ...that.getAllCardList];
      that.listTitle = that.menus[0].label;
      that.newListTitle = that.menus[0].CrCrd_CardNo;
    }
  },
  created() {
    let that = this;
    that.requireAllCard();
  },
  methods: {
    requireAllCard() {
      let that = this;
      that.$store.dispatch("requireAllCard");
    },
    search() {
      let that = this;
      console.log(
        "信用卡卡号, 交易类型",
        that.listTitle,
        that.list2Title,
        that.newListTitle
      );
      that.$store.commit("upCrdCard", { svcId: 3 });
      that.$store.commit("upDateCrdCard", { crdCard: that.newListTitle });
      if (that.list2Title == "全部") {
        that.list2Title = "";
      }
      if (that.listTitle == "全部") {
        that.$store.commit("upCrdCard", { svcId: 4 });
        that.$store.commit("delCrdCard", { kahao: "" });
      }
      that.$store.state.XHisDetails.list2Title = that.list2Title;
      that.$router.push(`/transaction?flag=must`);
    },
    getSelectedVal(val) {
      // eslint-disable-next-line no-console
    },
    triggerItem(itemVal, itemDisabled) {
      // eslint-disable-next-line no-console
    },
    showSelItem(id, type, title) {
      let that = this;
      // eslint-disable-next-line no-console
      console.log(id);
      that.key = id;
      that.showContent = !that.showContent ? true : false;
      switch (type) {
        case 1: {
          that.showMenu = true;
          break;
        }
        case 2: {
          that.isShowConfirm = true;
          that.jiaoyiTitle = title;
          break;
        }
      }
    },
    onShowConfirm() {
      // eslint-disable-next-line no-console
    },
    onHideConfirm() {
      // eslint-disable-next-line no-console
    },
    onCancelConfirm() {
      let that = this;
      // eslint-disable-next-line no-console
      that.showContent = false;
      console.log("交易类型取消", that.checkVal);
    },
    onConfirm() {
      let that = this;
      // eslint-disable-next-line no-console
      that.showContent = false;
      that.list2Title = that.checkVal;
      console.log("交易类型确认", that.checkVal);
    },
    selectMenu(key, item) {
      // eslint-disable-next-line no-console
      console.log("信用卡卡号", key, item);
      let that = this;
      that.showContent = false;
      that.selectedItem = item;
      if (item && item.value) {
        that.listTitle = item.value;
        that.newListTitle = item.CrCrd_CardNo;
      }
    },
    onShow() {},
    onHide() {
      let that = this;
      that.showContent = false;
    },
    onDelete() {},
    onImgError(item, $event) {
      // eslint-disable-next-line no-console
      console.log(item, $event);
    },
    openItem(item, $event) {
      // eslint-disable-next-line no-console
      console.log(item, $event);
    },
    jumpHisBilling() {
      let that = this;
      that.$router.push({
        params: {},
        name: "hisDetail"
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
    }
  },
  components: {
    Card,
    // Panel,
    Actionsheet,
    // eslint-disable-next-line vue/no-unused-components
    Flexbox,
    // eslint-disable-next-line vue/no-unused-components
    FlexboxItem,
    Confirm,
    Checker,
    CheckerItem,
    XButton
  }
};
</script>
<style lang="less">
@import "../../../assets/styles/variables.less";
* {
  touch-action: pan-y;
}
.x-his-dialog {
  .weui-dialog__bd {
    display: flex;
  }
}
.x-his-details_item {
  width: @flexNine;
  height: 35px;
  line-height: 35px;
  text-align: center;
  border-radius: 3px;
  border: 1px solid #ccc;
  background-color: #fff;
  margin: 5px;
  box-sizing: border-box;
}
.vux-checker-box {
  display: flex;
  // flex-direction: row;
  flex-wrap: wrap;
  // width: 100%;
  // display: -webkit-box;
}
.vux-checker-item {
  display: block !important;
}
.x-his-details_item__selected {
  background: #ffffff url(../../../assets/images/active1.png) no-repeat right
    bottom;
  border-color: #1890ff;
  background-size: 25px;
  color: #1890ff;
}
.transactionDetails {
  .x-his-details {
    button.weui-btn,
    input.weui-btn {
      margin-top: 250px !important;
    }
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
    .x-filter {
      padding: 10px 30px;
      text-align: left;
      font-weight: 600;
      line-height: 16px;
    }
    .vux-cell-primary {
      text-align: left;
      font-size: 13px;
    }
    .weui-cells {
      background-color: #f0f0f0;
      .weui-cell {
        padding: 20px;
        margin: 10px 0;
        border-radius: 10px;
        background-color: #ffffff;
      }
      &::before,
      &::after {
        height: 0;
        border: 0;
      }
    }
    .selectedContent {
      font-size: 13px;
      margin-right: 5px;
      padding-top: 5px;
      span {
        vertical-align: middle;
      }
    }
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
              transform: translateY(-128%);
              display: block;
              margin: 0 auto;
              line-height: inherit;
            }
          }
          .x-curr-content {
            flex: 2;
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
    /deep/.vux-label-desc {
      display: block;
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
.weui-actionsheet_toggle {
  border-radius: 10px;
}
.weui-actionsheet__menu {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.weui-actionsheet__cell {
  font-size: 14px;
}
</style>
