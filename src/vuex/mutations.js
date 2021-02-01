/*
 * @Description: 操作同步方式更新state
 * @Version: 1.0.2
 * @Author: Edision Lu
 * @Date: 2020-05-25 15:35:40
 * @LastEditor: dahuyingxiong666@gmail.com
 * @LastEditTime: 2021-01-25 15:59:56
 * @FilePath: \ccbProject\ccb_5g\src\vuex\mutations.js
 */
/* eslint-disable */
const mutations = {
  UPDATE_LOADING(state, status) {
    state.isLoading = status;
    console.log("mutations", status);
  },
  UPDATE_DIRECTION(state, direction) {
    state.direction = direction;
  },
  updateBnk_Crd_TpCd(state, payload) {
    state.bankType = payload.updatedData;
  },
  getCardListSync(state, payload) {
    state.cardList = payload.cardList;
  },
  updateLoadingTextSync(state, payload) {
    state.loadingText = payload.loadingText;
  },
  updateLogin(state, payload) {
    state.login = payload.login;
  },
  updateEntryUrl(state, payload) {
    state.entryUrl = payload.entryUrl;
  },
  updateXbill(state, payload){
    state.XHisBill.isLoadMore = payload.isLoadMore;
    state.XHisBill.page = payload.page;
  },
  updateXCurrBilling(state, payload){
    state.XCurrBilling.isLoadMore = payload.isLoadMore;
    state.XCurrBilling.page = payload.page;
  },
  //请求账单明细查询
  requireAllBill(state, res) {
    let resArr = res.result.LIST1;
    if (!resArr) {
      resArr = [];
    }
    state.XBillingDetails.allData = resArr;
    state.XBillingDetails.page_total = res.result.TOTAL_PAGE;
  },
  // 更改state里面的loading状态
  updateXBillingDetailsLoading(state, res) {
    state.XBillingDetails.loading = res.loading;
    state.XUnbilled.loading = res.loading;
    state.XHisBill.loading = res.loading;
    state.XCurrBilling.loading = res.loading;
  },
  dealPageIssue(state, res) {
    state.XBillingDetails.page = res.page;
    state.XHisBill.page = res.page;
    state.XCurrBilling.page = res.page;
  },
  //请求未出账单查询
  requireNotOutBill(state, res) {
    let resArr = res.result.LIST1;
    if (!resArr) {
      resArr = [];
    }
    state.XUnbilled.allData = resArr;
    state.XUnbilled.page_total = res.result.TOTAL_PAGE;
  },
  //请求历史账单
  requireHisBill(state, res) {
    let resArr = res.receResult;
    state.XHisBill.content = resArr;
  },
  //请求本期账单查询
  requireCurrBill(state, res) {
    let resArr = res.result;
    state.XCurrBilling.content = resArr;
    console.log("mutations 本期账单", resArr, state.XCurrBilling.content);
  },
  requireAllCard(state, res) {
    let resArr = res.result.LIST1;
    state.XHisDetails.content = resArr;
  },
  dealStateList2Title(state, res) {
    state.XHisDetails.list2Title = res.info;
  },
  // upDateYearMonthDay(state, res) {
  //   state.XHisBill.yearMonthDay = res.yearMonthDay;
  // },
  upDateCrdCard(state, res) {
    state.XBillingDetails.crdCrad = res.crdCard;
  },
  upCrdCard(state, res) {
    state.XBillingDetails.svcID = res.svcId;
  },
  delCrdCard(state, res) {
    state.XBillingDetails.crdCrad = res.kahao;
  },
  updateFlagData(state, res) {
    state.XHisBill.flagData = res.flagData;
  },
  requireHis5000(state, res) {
    state.XHisBill.hisList = res.result;
  },
  upDateXHisPage(state, res) {
    state.XHisBill.page = res.page;
    state.XHisBill.qishu = res.qishu;
    state.XHisBill.eDate = res.eDate;
  },
  updateCommon(state, payload){
    state.commonAll = payload.commonAll;
  }
};
export default mutations;
