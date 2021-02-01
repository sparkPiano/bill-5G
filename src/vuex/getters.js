/*
 * @Description: 用于共享函数操作更新state
 * @Version: 1.0.2
 * @Author: Edision Lu
 * @Date: 2020-05-25 15:35:40
 * @LastEditor: dahuyingxiong666@gmail.com
 * @LastEditTime: 2020-07-21 15:23:58
 * @FilePath: \ccbProject\ccb_5g\src\vuex\getters.js
 */

/* eslint-disable */
const getters = {
  // eslint-disable-next-line no-unused-vars
  getCardList: (state, getters) => {
    return state.cardList;
  },
  getAllBill: (state, getters) => {
    return state.XBillingDetails.allData;
  },
  getCurrBill: (state, getters) => state.XCurrBilling.content,
  getAllCard: (state, getters) => state.XHisDetails.content,
  getHisBill: (state, getters) => state.XHisBill.content,
  getNotOutBill: (state, getters) => state.XUnbilled.allData,
  getHisList: (state, getters) => state.XHisBill.hisList,
  getIsLoading: (state, getters) => state.isLoading
};

export default getters;
