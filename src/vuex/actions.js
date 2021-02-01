/*
 * @Description: 操作异步方式更新state
 * @Version: 1.0.2
 * @Author: Edision Lu
 * @Date: 2020-05-25 15:35:40
 * @LastEditor: dahuyingxiong666@gmail.com
 * @LastEditTime: 2020-09-01 15:49:04
 * @FilePath: \ccbProject\ccb_5g\src\vuex\actions.js
 */
import * as api from "./api";

const actions = {
  updateBnk_Crd_TpCd({ commit }, updatedData) {
    commit({ type: "updateBnk_Crd_TpCd", updatedData });
  },
  getCardListAysnc({ commit }, cardList) {
    commit({ type: "getCardListSync", cardList });
  },
  updateLoadingTextAsync({ commit }, loadingText) {
    commit({ type: "updateLoadingTextSync", loadingText });
  },
  updateLoginAsync({ commit }, login) {
    commit({ type: "updateLogin", login });
  },

  //请求账单明细查询
  requireAllBill({ commit }, params) {
    const asynRequireAllBill = async function() {
      try {
        let result = await api.apiRequireAllBill(params);
        console.log("actions await result", result);
        commit({ type: "requireAllBill", result });
      } catch (error) {
        console.log(error);
      }
    };
    asynRequireAllBill();
  },

  // 未出账单查询
  requireNotOutBill({ commit }, params) {
    const asynRequireNotOutBill = async function() {
      try {
        let result = await api.apiRequireNotOutBill(params);
        commit({ type: "requireNotOutBill", result });
      } catch (error) {
        console.log(error);
      }
    };
    asynRequireNotOutBill();
  },

  // 历史账单查询
  // requireHisBill({ commit }, params) {
  //   const asynRequireHisBill = async function() {
  //     try {
  //       let result = await api.apiRequireHisBill(params);
  //       commit({ type: "requireHisBill", result });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   asynRequireHisBill();
  // },

  //本期账单查询
  requireCurrBill({ commit }, params) {
    const asynRequireCurrBill = async function() {
      try {
        let rece5000 = await api.apiRequireCurr500(params);
        let result = await api.apiRequireCurrBill(rece5000);
        commit({ type: "requireCurrBill", result });
      } catch (error) {
        console.log(error);
      }
    };
    asynRequireCurrBill();
  },

  // 查询所有信用卡
  requireAllCard({ commit }, params) {
    const asynRequireAllCard = async function() {
      try {
        let result = await api.apiRequireAllCard(params);
        commit({ type: "requireAllCard", result });
      } catch (error) {
        console.log(error);
      }
    };
    asynRequireAllCard();
  },

  require5000({ commit }, params) {
    const asynRequire5000 = async function() {
      try {
        let receResult = await api.apiRequireHisBill(params);
        console.log("5G1001 返回接口的值", receResult);
        commit({ type: "requireHisBill", receResult });
      } catch (error) {
        console.log("5G1001 历史账单明细", error);
      }
    };
    asynRequire5000();
  },

  // requireAllCardList({ commit }, params) {
  //   const asynRequireAllCardList = async function() {
  //     try {
  //       let result = await api.apiRequireAllCardList(params);
  //       commit({ type: "requireAllCardList", result });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   asynRequireAllCardList();
  // }
  requireHis5000({ commit }, params) {
    const asynRequireHis5000 = async function() {
      try {
        let result = await api.apiRequireHis5000(params);
        console.log("5g1000接口返回的数据", result);
        commit({ type: "requireHis5000", result });
      } catch (error) {
        console.log("5g1000 error", error);
      }
    };
    asynRequireHis5000();
  }
};

export default actions;
