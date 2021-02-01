/*
 * @Description: 存储共享状态数据
 * @Version: 1.0.2
 * @Author: Edision Lu
 * @Date: 2020-05-25 15:35:40
 * @LastEditor: dahuyingxiong666@gmail.com
 * @LastEditTime: 2021-01-25 17:10:08
 * @FilePath: \ccbProject\ccb_5g\src\vuex\state.js
 */

const state = {
  isLoading: false,
  direction: "forward",
  bankType: [],
  cardList: [],
  loadingText: "加载中...",
  entryUrl: document.location.href,
  login: false,
  //请求账单明细数据对象XBillingDetails
  XBillingDetails: {
    svcID: "4",
    crdCrad: "", //信用卡
    isLoadMore: true,
    loading: true,
    startTime: "",
    endTime: "",
    allData: null,
    page: 1, //当前页
    page_total: "", //总页数
    current_page_num: 10 //当前页条数
  },
  //未出账单
  XUnbilled: {
    isLoadMore: true,
    loading: true,
    allData: null,
    page: 1, //当前页
    page_total: "", //总页数
    current_page_num: 10 //当前页条数
  },
  //当前账单
  XCurrBilling: {
    isLoadMore: true,
    loading: true,
    content: null,
    page: 1, //当前页
    page_total: "", //总页数
    current_page_num: 10 //当前页条数
  },
  //历史账单
  XHisBill: {
    qishu: "", //期数
    eDate: "", //结束时间
    hisList: [],
    flagData: false,
    dateInfo: "",
    yearMonthDay: "",
    isLoadMore: true,
    loading: true,
    content: null,
    page: 1, //当前页
    page_total: "", //总页数
    current_page_num: 10 //当前页条数
  },
  //XHisDetails
  XHisDetails: {
    newListTitle: "", //加密后的信用卡卡号
    list2Title: "", //交易类型
    content: null,
    allData: null,
    page: 1, //当前页
    current_page_num: 10 //当前页条数
  },
  commonAll: {}
};
export default state;
